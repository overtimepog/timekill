/**
 * API route for parsing content and generating term-definition pairs
 * 
 * This route handles the POST /api/parse-content request to process
 * user-submitted content and generate flashcards and quiz items.
 * Allows users to name their study sets.
 */

import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '../../../../packages/core/lib/prisma';
import { extractPairsFromNotes } from '../../../../packages/core/lib/gemini';
import { trackNewSet } from '../../../../packages/core/lib/stats/tracker';

// Maximum content length for free users
const FREE_USER_MAX_CONTENT_LENGTH = 10000;

/**
 * Process content and generate pairs
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
    const { notes, setName } = body;
    
    // Validate content
    if (!notes || typeof notes !== 'string') {
      return NextResponse.json(
        { error: 'Content is required and must be a string' },
        { status: 400 }
      );
    }
    
    // Check content length for free users
    if (notes.length > FREE_USER_MAX_CONTENT_LENGTH) {
      // Check if the user has a pro subscription
      const subscription = await prisma.subscription.findUnique({
        where: { userId: user.id },
      });
      
      if (!subscription || subscription.status !== 'active' || subscription.plan !== 'pro') {
        return NextResponse.json(
          { error: 'Content exceeds maximum length. Upgrade to Pro for longer content.' },
          { status: 403 }
        );
      }
    }
    
    // Create the submission record with the user-provided set name
    const submission = await prisma.noteSubmission.create({
      data: {
        userId: user.id,
        rawText: notes,
        language: 'auto-detect', // Auto-detect language instead of specifying
        metadata: {
          sourceLength: notes.length,
          setName: setName || `Set ${new Date().toLocaleDateString()}`, // Use provided name or default
        },
      },
    });
    
    // Track the new set for stats
    await trackNewSet(submission.id, user.id);
    
    // Extract pairs from the content
    const pairs = await extractPairsFromNotes(notes, user.id, {});
    
    // Define the type for term-definition pairs
    interface TermDefinitionPair {
      term: string;
      definition: string;
      question: string;
      answer: string;
    }
    
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
    console.error('Error parsing content:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while parsing content';
    const errorStatus = (error as { status?: number }).status || 500;
    return NextResponse.json(
      { error: errorMessage },
      { status: errorStatus }
    );
  }
}
