import Stripe from 'stripe';
import { prisma } from './prisma';

// Initialize Stripe client
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

// Create a Stripe checkout session
export async function createCheckoutSession(userId: string, priceId: string, mode: 'subscription' | 'payment') {
  try {
    // Get or create a Stripe customer
    const customer = await getOrCreateStripeCustomer(userId);
    
    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.stripeCustomerId!,
      mode,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://timekill.app'}/settings/billing?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://timekill.app'}/settings/billing?canceled=true`,
      metadata: {
        userId,
      },
    });
    
    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

// Create a billing portal session
export async function createBillingPortalSession(userId: string) {
  try {
    // Get the customer
    const customer = await getOrCreateStripeCustomer(userId);
    
    if (!customer.stripeCustomerId) {
      throw new Error('User does not have a Stripe customer ID');
    }
    
    // Create the portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customer.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://timekill.app'}/settings/billing`,
    });
    
    return session;
  } catch (error) {
    console.error('Error creating billing portal session:', error);
    throw error;
  }
}

// Get or create a Stripe customer for a user
async function getOrCreateStripeCustomer(userId: string) {
  // Check if the user already has a subscription with a Stripe customer ID
  const subscription = await prisma.subscription.findUnique({
    where: {
      userId,
    },
    include: {
      user: true,
    },
  });
  
  // If the user has a customer ID, return it
  if (subscription?.stripeCustomerId) {
    return subscription;
  }
  
  // Get the user
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  
  if (!user) {
    throw new Error('User not found');
  }
  
  // Create a new Stripe customer
  const customer = await stripe.customers.create({
    email: user.email,
    metadata: {
      userId,
    },
  });
  
  // Create or update the subscription record
  const updatedSubscription = await prisma.subscription.upsert({
    where: {
      userId,
    },
    update: {
      stripeCustomerId: customer.id,
    },
    create: {
      userId,
      stripeCustomerId: customer.id,
      status: 'incomplete',
      plan: 'free',
    },
  });
  
  return updatedSubscription;
}

// Process a webhook event from Stripe
export async function handleStripeWebhook(event: Stripe.Event) {
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Update the user's subscription
        await handleCheckoutSessionCompleted(session);
        break;
      }
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        
        // Update the subscription status
        await handleInvoicePaymentSucceeded(invoice);
        break;
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        
        // Update the subscription status
        await handleInvoicePaymentFailed(invoice);
        break;
      }
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Update the subscription status
        await handleSubscriptionUpdated(subscription);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Update the subscription status
        await handleSubscriptionDeleted(subscription);
        break;
      }
    }
  } catch (error) {
    console.error('Error handling Stripe webhook:', error);
    throw error;
  }
}

// Handle a completed checkout session
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  
  if (!userId) {
    throw new Error('No user ID found in session metadata');
  }
  
  // Get the subscription
  if (session.mode === 'subscription' && session.subscription) {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    
    // Update the user's subscription
    await prisma.subscription.update({
      where: {
        userId,
      },
      data: {
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0].price.id,
        status: subscription.status,
        plan: getPlanFromPriceId(subscription.items.data[0].price.id),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
    });
    
    // Update user metadata in Clerk
    // In a real app, you'd use the Clerk API to sync the subscription status
  }
}

// Handle a successful invoice payment
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  if (!invoice.subscription) return;
  
  // Get the subscription
  const subscription = await stripe.subscriptions.retrieve(
    invoice.subscription as string
  );
  
  // Get the user from the customer
  const customer = await stripe.customers.retrieve(subscription.customer as string);
  
  if (!customer || customer.deleted) {
    throw new Error('Customer not found or deleted');
  }
  
  const userId = customer.metadata.userId;
  
  if (!userId) {
    throw new Error('No user ID found in customer metadata');
  }
  
  // Update the subscription
  await prisma.subscription.update({
    where: {
      stripeCustomerId: customer.id,
    },
    data: {
      status: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  });
}

// Handle a failed invoice payment
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  if (!invoice.subscription) return;
  
  // Get the subscription
  const subscription = await stripe.subscriptions.retrieve(
    invoice.subscription as string
  );
  
  // Get the user from the customer
  const customer = await stripe.customers.retrieve(subscription.customer as string);
  
  if (!customer || customer.deleted) {
    throw new Error('Customer not found or deleted');
  }
  
  const userId = customer.metadata.userId;
  
  if (!userId) {
    throw new Error('No user ID found in customer metadata');
  }
  
  // Update the subscription
  await prisma.subscription.update({
    where: {
      stripeCustomerId: customer.id,
    },
    data: {
      status: subscription.status,
    },
  });
}

// Handle a subscription update
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  // Get the user from the customer
  const customer = await stripe.customers.retrieve(subscription.customer as string);
  
  if (!customer || customer.deleted) {
    throw new Error('Customer not found or deleted');
  }
  
  const userId = customer.metadata.userId;
  
  if (!userId) {
    throw new Error('No user ID found in customer metadata');
  }
  
  // Update the subscription
  await prisma.subscription.update({
    where: {
      stripeCustomerId: customer.id,
    },
    data: {
      status: subscription.status,
      stripePriceId: subscription.items.data[0].price.id,
      plan: getPlanFromPriceId(subscription.items.data[0].price.id),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  });
}

// Handle a subscription deletion
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  // Get the user from the customer
  const customer = await stripe.customers.retrieve(subscription.customer as string);
  
  if (!customer || customer.deleted) {
    throw new Error('Customer not found or deleted');
  }
  
  const userId = customer.metadata.userId;
  
  if (!userId) {
    throw new Error('No user ID found in customer metadata');
  }
  
  // Update the subscription
  await prisma.subscription.update({
    where: {
      stripeCustomerId: customer.id,
    },
    data: {
      status: 'canceled',
      plan: 'free',
    },
  });
}

// Helper function to get the plan name from the price ID
function getPlanFromPriceId(priceId: string): string {
  // In a real app, you'd have a mapping of price IDs to plan names
  if (priceId.includes('pro')) {
    return 'pro';
  }
  
  return 'free';
}