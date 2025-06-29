import { NextRequest, NextResponse } from 'next/server';
import { humanizeText } from '../../../../packages/core/lib/humanizer';
import { requireLogin, requireSubscription, syncUserWithClerk } from '../../../../packages/core/lib/auth';
import { canUserUseHumanizer, trackHumanizerUsage } from '../../../../packages/core/lib/usage-tracker';

export async function POST(request: NextRequest) {
  try {
    // Authenticate user and ensure they exist in our database
    const clerkUser = await requireLogin();
    const user = await syncUserWithClerk(clerkUser);
    
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
    
    // Check if user can use humanizer credits
    const creditsNeeded = Math.ceil(text.length / 500); // 1 credit per 500 characters
    const creditCheck = await canUserUseHumanizer(user.id, creditsNeeded);
    if (!creditCheck.allowed) {
      return NextResponse.json(
        { error: creditCheck.reason },
        { status: 403 }
      );
    }

    // Check text length
    if (text.length > 2000) {
      // Check if user has Pro subscription for longer texts
      try {
        await requireSubscription('pro');
      } catch {
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
      } catch {
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
    
    // Track humanizer credit usage
    await trackHumanizerUsage(user.id, creditsNeeded);
    
    // Return the humanized text and stats
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error humanizing text:', error instanceof Error ? error.message : 'Unknown error');
    
    // Don't leak error details to client in production
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Failed to process text' },
        { status: 500 }
      );
    }
    
    // In development, provide more details
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while humanizing text';
    const errorStatus = (error as { status?: number }).status || 500;
    return NextResponse.json(
      { error: errorMessage },
      { status: errorStatus }
    );
  }
}

// Configure edge runtime for better performance
export const config = {
  runtime: 'edge',
};