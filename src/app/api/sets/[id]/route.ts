import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '../../../../../packages/core/lib/prisma';

// PATCH /api/sets/[id] - Update a set
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const id = params.id;
    const body = await request.json();
    
    // Verify the set belongs to the user
    const existingSet = await prisma.noteSubmission.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });
    
    if (!existingSet) {
      return NextResponse.json({ error: 'Set not found' }, { status: 404 });
    }
    
    // Update the set
    const updatedSet = await prisma.noteSubmission.update({
      where: {
        id,
      },
      data: {
        metadata: body.metadata,
      },
    });
    
    return NextResponse.json(updatedSet);
  } catch (error) {
    console.error('Error updating set:', error);
    return NextResponse.json({ error: 'Failed to update set' }, { status: 500 });
  }
}

// DELETE /api/sets/[id] - Delete a set
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const id = params.id;
    
    // Verify the set belongs to the user
    const existingSet = await prisma.noteSubmission.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });
    
    if (!existingSet) {
      return NextResponse.json({ error: 'Set not found' }, { status: 404 });
    }
    
    // Delete all pairs associated with the set
    await prisma.pair.deleteMany({
      where: {
        submissionId: id,
      },
    });
    
    // Delete the set
    await prisma.noteSubmission.delete({
      where: {
        id,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting set:', error);
    return NextResponse.json({ error: 'Failed to delete set' }, { status: 500 });
  }
}
