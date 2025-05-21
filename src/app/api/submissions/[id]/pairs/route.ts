import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../packages/core/lib/prisma';
import { requireLogin } from '../../../../../../packages/core/lib/auth';
import { type Pair } from '../../../../../../packages/core/lib/gemini';

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
    
    // Start a transaction to update all pairs
    await prisma.$transaction(async (tx) => {
      // Delete existing pairs for this submission
      await tx.pair.deleteMany({
        where: {
          submissionId,
          userId: user.id,
        },
      });
      
      // Create the updated pairs
      await tx.pair.createMany({
        data: pairs.map((pair: Pair, index: number) => ({
          userId: user.id,
          submissionId,
          term: pair.term,
          definition: pair.definition,
          question: pair.question,
          answer: pair.answer,
          order: index,
        })),
      });
    });
    
    return NextResponse.json({
      success: true,
      message: 'Pairs updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating pairs:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while updating pairs' },
      { status: 500 }
    );
  }
}