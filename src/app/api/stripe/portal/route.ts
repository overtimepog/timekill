import { NextResponse } from 'next/server';
import { createBillingPortalSession } from '../../../../../packages/core/lib/stripe';
import { requireLogin } from '../../../../../packages/core/lib/auth';

export async function POST() {
  try {
    // Authenticate the user
    const user = await requireLogin();
    
    // Create a billing portal session
    const session = await createBillingPortalSession(user.id);
    
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating billing portal session:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while creating the billing portal session';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}