import { NextRequest, NextResponse } from 'next/server';
import { humanizeText } from '../../../../packages/core/lib/humanizer';
import { requireLogin, requireSubscription } from '../../../../packages/core/lib/auth';
import { PrismaClient } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const user = await requireLogin();
    
    // Parse request body
    const body = await request.json();
    const { text, options } = body;
    
    // Validate input
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required and must be a string' },
        { status: 400 }
      );
    }
    
    // Check text length
    if (text.length > 2000) {
      // Check if user has Pro subscription for longer texts
      try {
        await requireSubscription('pro');
      } catch (error) {
        return NextResponse.json(
          { error: 'Text exceeds maximum length. Upgrade to Pro for longer texts.' },
          { status: 403 }
        );
      }
    }
    
    // Process advanced options (Pro features)
    if (options && Object.keys(options).length > 0) {
      try {
        await requireSubscription('pro');
      } catch (error) {
        return NextResponse.json(
          { error: 'Advanced humanization options require a Pro subscription.' },
          { status: 403 }
        );
      }
    }
    
    // Humanize the text - we don't need to wrap this in try/catch since
    // the humanizeText function handles its own database errors gracefully
    let optionsToUse = options || {};
    
    // In development or test, ensure we provide mocked clients if needed
    if (process.env.NODE_ENV !== 'production') {
      // MockPrismaClient is already handled in the humanizeText function
      optionsToUse = { ...optionsToUse };
    }
    
    const result = await humanizeText(text, user.id, optionsToUse);
    
    // Return the humanized text and stats
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error humanizing text:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while humanizing text' },
      { status: error.status || 500 }
    );
  }
}

// Configure edge runtime for better performance
export const config = {
  runtime: 'edge',
};