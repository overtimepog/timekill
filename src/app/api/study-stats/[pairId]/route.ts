import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../packages/core/lib/prisma';
import { requireLogin } from '../../../../../packages/core/lib/auth';

// Follow Next.js route handler parameter pattern exactly
export async function POST(
  request: NextRequest,
  { params }: { params: { pairId: string } }
) {
  try {
    // Authenticate the user
    const user = await requireLogin();
    
    // Get the pair ID from the route
    const pairId = params.pairId;
    
    // Parse the request body
    const body = await request.json();
    const { correct, confidence } = body;
    
    // Verify the pair exists and belongs to the user
    const pair = await prisma.pair.findUnique({
      where: {
        id: pairId,
        userId: user.id,
      },
    });
    
    if (!pair) {
      return NextResponse.json(
        { error: 'Pair not found or unauthorized' },
        { status: 404 }
      );
    }
    
    // Get the current study stat or create a new one
    const stat = await prisma.studyStat.upsert({
      where: {
        userId_pairId: {
          userId: user.id,
          pairId,
        },
      },
      update: {
        correctCount: {
          increment: correct ? 1 : 0,
        },
        incorrectCount: {
          increment: correct ? 0 : 1,
        },
        lastReviewed: new Date(),
        confidence: confidence || undefined,
        status: getStatus(confidence),
      },
      create: {
        userId: user.id,
        pairId,
        correctCount: correct ? 1 : 0,
        incorrectCount: correct ? 0 : 1,
        lastReviewed: new Date(),
        confidence: confidence || null,
        status: getStatus(confidence),
      },
    });
    
    return NextResponse.json({
      success: true,
      stat,
    });
  } catch (error: any) {
    console.error('Error updating study stats:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while updating study stats' },
      { status: 500 }
    );
  }
}

// Helper function to determine the status based on confidence
function getStatus(confidence: number | undefined): string {
  if (!confidence) {
    return 'unseen';
  }
  
  if (confidence <= 2) {
    return 'learning';
  } else if (confidence <= 4) {
    return 'reviewing';
  } else {
    return 'mastered';
  }
}