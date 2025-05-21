import { NextRequest, NextResponse } from 'next/server';
import { Stripe } from 'stripe';
import { handleStripeWebhook } from '../../../../../packages/core/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');
    
    if (!signature) {
      return NextResponse.json(
        { error: 'No signature found' },
        { status: 400 }
      );
    }
    
    // Parse the webhook event
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2023-10-16',
    });
    
    let event: Stripe.Event;
    
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      );
    } catch (error: any) {
      console.error('Error verifying webhook signature:', error);
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${error.message}` },
        { status: 400 }
      );
    }
    
    // Process the webhook event
    await handleStripeWebhook(event);
    
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Error handling webhook:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while handling the webhook' },
      { status: 500 }
    );
  }
}

// Don't verify CSRF token for webhook requests
export const config = {
  api: {
    bodyParser: false,
  },
};