/**
 * API route for parsing documents and generating term-definition pairs
 * 
 * This route handles the POST /api/parse-notes request to process
 * user-submitted documents and generate flashcards and quiz items.
 */

import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '../../../../packages/core/lib/prisma';
import { extractPairsFromNotes } from '../../../../packages/core/lib/gemini';
import { trackNewSet } from '../../../../packages/core/lib/stats/tracker';
import { canUserCreateDocument, validateDocumentLength } from '../../../../packages/core/lib/usage-tracker';



/**
 * Process documents and generate pairs
 */
export async function POST(request: NextRequest) {
  try {
    // Get the current user
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Parse the request body
    const body = await request.json();
    const { notes } = body;
    
    // Validate document content
    if (!notes || typeof notes !== 'string') {
      return NextResponse.json(
        { error: 'Document content is required and must be a string' },
        { status: 400 }
      );
    }
    
    // Check document length limits
    const lengthValidation = await validateDocumentLength(user.id, notes.length);
    if (!lengthValidation.valid) {
      return NextResponse.json(
        { error: lengthValidation.reason },
        { status: 403 }
      );
    }

    // Check if user can create a new document
    const documentCheck = await canUserCreateDocument(user.id);
    if (!documentCheck.allowed) {
      return NextResponse.json(
        { error: documentCheck.reason },
        { status: 403 }
      );
    }
    
    // Create the submission record
    const submission = await prisma.noteSubmission.create({
      data: {
        userId: user.id,
        rawText: notes,
        language: 'auto-detect', // Auto-detect language instead of specifying
        metadata: {
          sourceLength: notes.length,
          numPairs: 0, // Initialize numPairs to 0
          setName: body.setName || `Set from ${new Date().toLocaleDateString()}` // Add set name, default if not provided
        },
      },
    });
    
    // Track the new set for stats
    await trackNewSet(submission.id, user.id);
    
    // Extract pairs from the document
    const pairs = await extractPairsFromNotes(notes, user.id, {});
    
    // Define the type for term-definition pairs
    interface TermDefinitionPair {
      term: string;
      definition: string;
      question: string;
      answer: string;
    }
    
    // Update the submission record with the actual number of pairs
    await prisma.noteSubmission.update({
      where: { id: submission.id },
      data: {
        metadata: {
          numPairs: pairs.length,
        },
      },
    });
    
    // Store the pairs in the database
    await prisma.pair.createMany({
      data: pairs.map((pair: TermDefinitionPair, index: number) => ({
        userId: user.id,
        submissionId: submission.id,
        term: pair.term,
        definition: pair.definition,
        question: pair.question,
        answer: pair.answer,
        order: index,
      })),
    });
    
    // Return the submission and pairs
    return NextResponse.json({
      submission,
      pairs,
    });
  } catch (error) {
    console.error('Error parsing document:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while parsing document';
    const errorStatus = (error as { status?: number }).status || 500;
    return NextResponse.json(
      { error: errorMessage },
      { status: errorStatus }
    );
  }
}