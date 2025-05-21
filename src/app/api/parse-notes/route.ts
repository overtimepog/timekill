import { NextRequest, NextResponse } from 'next/server';
import { extractPairsFromNotes } from '../../../../packages/core/lib/gemini';
import { requireLogin, requireSubscription } from '../../../../packages/core/lib/auth';
import { prisma } from '../../../../packages/core/lib/prisma';
import { type Pair } from '../../../../packages/core/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const user = await requireLogin();
    
    // Parse request body
    const body = await request.json();
    const { notes, language, maxPairs } = body;
    
    // Validate input
    if (!notes || typeof notes !== 'string') {
      return NextResponse.json(
        { error: 'Notes are required and must be a string' },
        { status: 400 }
      );
    }
    
    // Check notes length
    if (notes.length > 10000) {
      // Check if user has Pro subscription for longer notes
      try {
        await requireSubscription('pro');
      } catch (error) {
        return NextResponse.json(
          { error: 'Notes exceed maximum length. Upgrade to Pro for longer notes.' },
          { status: 403 }
        );
      }
    }
    
    // Extract pairs
    const pairs = await extractPairsFromNotes(notes, user.id, {
      language: language || 'English',
      maxPairs: maxPairs || 20,
    });
    
    // Save submission and pairs to database
    const submission = await prisma.noteSubmission.create({
      data: {
        userId: user.id,
        rawText: notes,
        language: language || 'English',
        metadata: {
          maxPairs: maxPairs || 20,
          sourceLength: notes.length,
        },
      },
    });
    
    // Batch create all pairs
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
    
    // Return the pairs
    return NextResponse.json({
      submission: {
        id: submission.id,
        createdAt: submission.createdAt,
      },
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

// Rate limiting for this endpoint
export const config = {
  runtime: 'edge', // Optional: Deploy to edge for faster response
};