import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '../../../../../packages/core/lib/prisma';

// PATCH /api/pairs/[id] - Update a pair
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the current user
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Safely extract the ID from params
    const { id: pairId } = params;
    
    // Parse the request body
    const body = await request.json();
    
    // Get the pair and verify ownership through the submission
    const existingPair = await prisma.pair.findUnique({
      where: {
        id: pairId,
      },
      include: {
        submission: true,
      },
    });
    
    if (!existingPair) {
      return NextResponse.json({ error: 'Pair not found' }, { status: 404 });
    }
    
    // Check if the submission belongs to the user
    if (existingPair.submission.userId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Update the pair with the provided fields
    const updatedPair = await prisma.pair.update({
      where: {
        id: pairId,
      },
      data: {
        term: body.term ?? existingPair.term,
        definition: body.definition ?? existingPair.definition,
        question: body.question ?? existingPair.question,
        answer: body.answer ?? existingPair.answer,
      },
    });
    
    return NextResponse.json(updatedPair);
  } catch (error) {
    console.error('Error updating pair:', error);
    return NextResponse.json({ error: 'Failed to update pair' }, { status: 500 });
  }
}