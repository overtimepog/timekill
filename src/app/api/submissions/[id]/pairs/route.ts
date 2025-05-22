import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../packages/core/lib/prisma';
import { requireLogin } from '../../../../../../packages/core/lib/auth';

// Import Pair type from Prisma client if needed
// import { Pair } from '@prisma/client';

// Follow Next.js route handler parameter pattern exactly
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate the user
    const user = await requireLogin();
    
    // Get the submission ID from the route
    const { id: submissionId } = await params;
    
    // Verify the submission exists and belongs to the user
    const submission = await prisma.noteSubmission.findUnique({
      where: {
        id: submissionId,
        userId: user.id,
      },
    });
    
    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found or unauthorized' },
        { status: 404 }
      );
    }
    
    // Parse the request body
    const body = await request.json();
    const { pairs } = body;
    
    if (!Array.isArray(pairs)) {
      return NextResponse.json(
        { error: 'Invalid pairs data' },
        { status: 400 }
      );
    }
    
    // Use transaction to ensure atomicity
    try {
      await prisma.$transaction(async (tx) => {
        // Delete existing pairs for this submission
        await tx.pair.deleteMany({
          where: {
            submissionId,
            userId: user.id,
          },
        });
        
        // Validate pairs before creating
        for (const pair of pairs) {
          if (!pair.term || !pair.definition || !pair.question || !pair.answer) {
            throw new Error('Invalid pair data: missing required fields');
          }
          if (typeof pair.term !== 'string' || typeof pair.definition !== 'string' || 
              typeof pair.question !== 'string' || typeof pair.answer !== 'string') {
            throw new Error('Invalid pair data: fields must be strings');
          }
        }
        
        // Create new pairs
        await tx.pair.createMany({
          data: pairs.map(pair => ({
            term: pair.term.trim(),
            definition: pair.definition.trim(),
            question: pair.question.trim(),
            answer: pair.answer.trim(),
            userId: user.id,
            submissionId,
          })),
        });
      });
    } catch (error) {
      console.error('Error updating pairs:', error instanceof Error ? error.message : 'Unknown error');
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Failed to update pairs' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      {
        success: true,
        message: 'Pairs updated successfully',
      },
      {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error('Error updating pairs:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while updating pairs';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}