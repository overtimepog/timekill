import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '../../../../../packages/core/lib/prisma';

// PATCH /api/sets/[id] - Update a set
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const body = await request.json();
    
    // Validate input
    if (!body.metadata || typeof body.metadata !== 'object') {
      return NextResponse.json({ error: 'Invalid metadata' }, { status: 400 });
    }
    
    // Only allow specific metadata fields to be updated
    const allowedFields = ['name', 'description', 'tags', 'difficulty'];
    const sanitizedMetadata: Record<string, string | number | string[]> = {};
    
    for (const [key, value] of Object.entries(body.metadata)) {
      if (allowedFields.includes(key)) {
        if (typeof value === 'string') {
          // Sanitize string values
          sanitizedMetadata[key] = value.trim().slice(0, 500); // Limit length
        } else if (Array.isArray(value) && key === 'tags') {
          // Handle tags array
          sanitizedMetadata[key] = value
            .filter(tag => typeof tag === 'string')
            .map(tag => tag.trim().slice(0, 50))
            .slice(0, 10); // Max 10 tags
        } else if (typeof value === 'number' && key === 'difficulty') {
          // Handle difficulty level
          sanitizedMetadata[key] = Math.max(1, Math.min(5, Math.floor(value)));
        }
      }
    }
    
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
        metadata: sanitizedMetadata,
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
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
    
    // Use transaction to ensure atomicity
    await prisma.$transaction(async (tx) => {
      // Delete all pairs associated with the set
      await tx.pair.deleteMany({
        where: {
          submissionId: id,
        },
      });
      
      // Delete the set
      await tx.noteSubmission.delete({
        where: {
          id,
        },
      });
    });
    
    // Return success with cache invalidation headers to ensure stats update immediately
    return NextResponse.json(
      { success: true },
      {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error('Error deleting set:', error);
    return NextResponse.json({ error: 'Failed to delete set' }, { status: 500 });
  }
}
