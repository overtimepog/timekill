import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '../../../../../packages/core/lib/stripe';
import { requireLogin } from '../../../../../packages/core/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Authenticate the user
    const user = await requireLogin();
    
    // Parse the request body
    const { priceId } = await request.json();
    
    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      );
    }
    
    // Create a checkout session
    const session = await createCheckoutSession(user.id, priceId, 'subscription');
    
    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while creating the checkout session';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}