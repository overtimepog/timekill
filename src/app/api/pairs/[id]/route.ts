import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '../../../../../packages/core/lib/prisma';

// PATCH /api/pairs/[id] - Update a pair
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get the current user
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Safely extract the ID from params (await Promise)
    const resolvedParams = await params;
    const pairId = resolvedParams.id;
    
    // Add a type check for pairId
    if (typeof pairId !== 'string') {
      return NextResponse.json({ error: 'Pair ID is missing or not a string' }, { status: 400 });
    }
    
    // Parse the request body
    const body = await request.json();
    
    // Validate and sanitize input
    const updates: Record<string, string> = {};
    const allowedFields = ['term', 'definition', 'question', 'answer'];
    
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if (typeof body[field] !== 'string') {
          return NextResponse.json({ error: `${field} must be a string` }, { status: 400 });
        }
        const sanitized = body[field].trim();
        if (sanitized.length === 0) {
          return NextResponse.json({ error: `${field} cannot be empty` }, { status: 400 });
        }
        if (sanitized.length > 2000) {
          return NextResponse.json({ error: `${field} too long (max 2000 characters)` }, { status: 400 });
        }
        updates[field] = sanitized;
      }
    }
    
    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }
    
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
    
    // Update the pair with the validated fields
    const updatedPair = await prisma.pair.update({
      where: {
        id: pairId,
      },
      data: updates,
    });
    
    return NextResponse.json(updatedPair);
  } catch (error) {
    console.error('Error updating pair:', error);
    return NextResponse.json({ error: 'Failed to update pair' }, { status: 500 });
  }
}