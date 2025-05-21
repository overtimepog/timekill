import { NextRequest, NextResponse } from 'next/server';
import { createBillingPortalSession } from '../../../../../packages/core/lib/stripe';
import { requireLogin } from '../../../../../packages/core/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Authenticate the user
    const user = await requireLogin();
    
    // Create a billing portal session
    const session = await createBillingPortalSession(user.id);
    
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating billing portal session:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while creating the billing portal session' },
      { status: 500 }
    );
  }
}