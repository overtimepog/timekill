/**
 * API route for parsing notes and generating term-definition pairs
 * 
 * This route handles the POST /api/parse-notes request to process
 * user-submitted notes and generate flashcards and quiz items.
 */

import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '../../../../packages/core/lib/prisma';
import { extractPairsFromNotes } from '../../../../packages/core/lib/gemini';

// Maximum note length for free users
const FREE_USER_MAX_NOTE_LENGTH = 10000;

/**
 * Process notes and generate pairs
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
    const { notes, language, maxPairs } = body;
    
    // Validate notes
    if (!notes || typeof notes !== 'string') {
      return NextResponse.json(
        { error: 'Notes are required and must be a string' },
        { status: 400 }
      );
    }
    
    // Check note length for free users
    if (notes.length > FREE_USER_MAX_NOTE_LENGTH) {
      // Check if the user has a pro subscription
      const subscription = await prisma.subscription.findUnique({
        where: { userId: user.id },
      });
      
      if (!subscription || subscription.status !== 'active' || subscription.plan !== 'pro') {
        return NextResponse.json(
          { error: 'Notes exceed maximum length. Upgrade to Pro for longer notes.' },
          { status: 403 }
        );
      }
    }
    
    // Create the submission record
    const submission = await prisma.noteSubmission.create({
      data: {
        userId: user.id,
        rawText: notes,
        language: language,
        metadata: {
          maxPairs: maxPairs,
          sourceLength: notes.length,
        },
      },
    });
    
    // Extract pairs from the notes
    const pairs = await extractPairsFromNotes(notes, user.id, {
      language,
      maxPairs,
    });
    
    // Store the pairs in the database
    await prisma.pair.createMany({
      data: pairs.map((pair, index) => ({
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
  } catch (error: any) {
    console.error('Error parsing notes:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while parsing notes' },
      { status: error.status || 500 }
    );
  }
}