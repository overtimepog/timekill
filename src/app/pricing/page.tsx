import { Navbar } from '../components/navbar';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { prisma } from '../../../packages/core/lib/prisma';
import { stripe } from '../../../packages/core/lib/stripe';
import PricingButton from './pricing-button';

export default async function PricingPage() {
  const user = await currentUser();
  
  // Get the user's subscription if they're logged in
  let subscription = null;
  if (user) {
    subscription = await prisma.subscription.findUnique({
      where: {
        userId: user.id,
      },
    });
  }
  
  // Fetch products from Stripe
  const stripeProducts = await stripe.products.list({
    active: true,
    expand: ['data.default_price'],
  });
  
  // Format the products for display
  const plans = stripeProducts.data.map(product => {
    const price = product.default_price as {
      id?: string;
      unit_amount?: number;
      recurring?: {
        interval?: string;
      };
    };
    const amount = price?.unit_amount ? (price.unit_amount / 100).toFixed(2) : '0';
    const interval = price?.recurring?.interval;
    
    return {
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: price ? `$${amount}` : 'Free',
      period: price?.recurring ? `per ${interval}` : 'forever',
      features: product.metadata.features ? JSON.parse(product.metadata.features) : [],
      limitations: product.metadata.limitations ? JSON.parse(product.metadata.limitations) : [],
      priceId: price?.id || '',
      cta: product.name.toLowerCase() === (subscription?.plan || 'free') ? 'Current Plan' : 
           product.name === 'Free' ? (user ? 'Current Plan' : 'Sign Up') : 'Upgrade Now',
      highlight: product.metadata.highlight === 'true',
    };
  });
  
  // If no products are found, provide fallback plans
  if (plans.length === 0) {
    plans.push(
      {
        id: 'free',
        name: 'Free',
        description: 'Great for trying out the platform',
        price: '$0',
        period: 'forever',
        features: [
          '50 notes conversions per month',
          '20 pairs per conversion',
          'Basic flashcards and quizzes',
          '10 humanizer credits',
        ],
        limitations: [
          'Limited to 1000 characters per note',
          'No advanced study modes',
          'No advanced humanizer settings',
        ],
        priceId: '', // No price ID for free plan
        cta: user ? 'Current Plan' : 'Sign Up',
        highlight: false,
      },
      {
        id: 'pro',
        name: 'Pro',
        description: 'For serious students and professionals',
        price: '$9.99',
        period: 'per month',
        features: [
          'Unlimited notes conversions',
          'Up to 50 pairs per conversion',
          'All study modes including learn mode',
          'Unlimited humanizer credits',
          'Advanced humanizer settings',
          'Priority AI processing',
          'No character limits',
          'Email support',
        ],
        limitations: [],
        priceId: 'price_1RQKRH4MJK50EYMQrXDySiGs',
        cta: subscription?.plan === 'pro' && subscription?.status === 'active' ? 'Current Plan' : 'Upgrade Now',
        highlight: true,
      }
    );
  }
  
  // Sort plans by price (free first, then ascending)
  plans.sort((a, b) => {
    if (a.price === 'Free' || a.price === '$0') return -1;
    if (b.price === 'Free' || b.price === '$0') return 1;
    return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl">
              Choose the plan that works for you. No hidden fees. Cancel anytime.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id || plan.name}
                className={`bg-secondary rounded-lg shadow-md border ${
                  plan.highlight ? 'border-primary' : 'border-border'
                } overflow-hidden`}
              >
                {plan.highlight && (
                  <div className="bg-accent text-black text-center py-2 text-sm font-medium">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold">{plan.name}</h2>
                  <p className="mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="opacity-80"> {plan.period}</span>
                  </div>
                  
                  <PricingButton
                    planName={plan.name}
                    priceId={plan.priceId}
                    isCurrentPlan={
                      plan.name.toLowerCase() === (subscription?.plan || 'free') &&
                      (!plan.priceId || subscription?.status === 'active')
                    }
                    isLoggedIn={!!user}
                    cta={plan.cta}
                    highlight={plan.highlight}
                  />
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">
                      What&apos;s included
                    </h3>
                    <ul className="space-y-3">
                      {plan.features.map((feature: string) => (
                        <li key={feature} className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {plan.limitations.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">
                        Limitations
                      </h3>
                      <ul className="space-y-3">
                        {plan.limitations.map((limitation: string) => (
                          <li key={limitation} className="flex items-start">
                            <svg className="h-5 w-5 text-foreground/50 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-foreground/80">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 text-left">
              <div className="bg-secondary p-6 rounded-lg border border-border">
                <h3 className="text-lg font-medium mb-2">Can I cancel my subscription?</h3>
                <p className="opacity-80">
                  Yes, you can cancel your subscription at any time. You&apos;ll still have access to Pro features until the end of your billing period.
                </p>
              </div>
              
              <div className="bg-secondary p-6 rounded-lg border border-border">
                <h3 className="text-lg font-medium mb-2">How do notes conversions work?</h3>
                <p className="opacity-80">
                  Each time you paste notes and generate flashcards, that counts as one conversion. Free accounts are limited to 50 conversions per month.
                </p>
              </div>
              
              <div className="bg-secondary p-6 rounded-lg border border-border">
                <h3 className="text-lg font-medium mb-2">What are humanizer credits?</h3>
                <p className="opacity-80">
                  Humanizer credits let you convert AI-sounding text to more natural human-like text. Free accounts get 10 credits per month.
                </p>
              </div>
              
              <div className="bg-secondary p-6 rounded-lg border border-border">
                <h3 className="text-lg font-medium mb-2">Can I export my flashcards?</h3>
                <p className="opacity-80">
                  Yes, all users can export their flashcards as CSV. Pro users can also export in Anki-compatible format.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-tips-bg p-8 rounded-lg border border-tips-border text-center">
            <h2 className="text-2xl font-bold mb-4">Need a custom plan for your team or school?</h2>
            <p className="text-lg text-tips-text mb-6">
              We offer special rates for educational institutions and teams. Contact us to learn more.
            </p>
            <Link
              href="/contact"
              className="px-6 py-3 bg-accent text-black rounded-lg hover:bg-accent/80 text-lg font-medium inline-block"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}