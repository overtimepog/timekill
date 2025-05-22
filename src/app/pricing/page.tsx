import { Navbar } from '../components/navbar';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { prisma } from '../../../packages/core/lib/prisma';
import { stripe } from '../../../packages/core/lib/stripe';
import PricingButton from './pricing-button';
import { CheckCircleIcon } from '@heroicons/react/24/solid'; 

const freePlan = {
  id: 'free',
  name: 'Free Plan',
  description: 'Get started with core features, perfect for trying out TimeKill.',
  price: '$0',
  period: 'forever',
  features: [
    '5 document limit per conversion',
    '5,000 character limit per conversion',
    'Unlimited pairs per Set',
    '20 Study Sets per month',
    '10 humanizer credits per month',
  ],
  limitations: [] as string[], 
  priceId: '', 
  cta: 'Get Started Free',
  isCurrentPlan: false,
  highlight: false,
};

export default async function PricingPage() {
  const user = await currentUser();
  
  let subscription = null;
  let stripeProducts: { data: unknown[] } = { data: [] }; 
  
  try {
    if (user) {
      subscription = await prisma.subscription.findUnique({
        where: {
          userId: user.id,
        },
      });
    }
    
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
    });
    stripeProducts = products;
    
    // Debug: Log what we're getting from Stripe
    console.log('=== STRIPE DEBUG INFO ===');
    console.log('Products found:', stripeProducts.data.length);
    stripeProducts.data.forEach((product, index) => {
      const prod = product as {
        id: string;
        name: string;
        active: boolean;
        metadata?: Record<string, string>;
        default_price?: unknown;
      };
      console.log(`Product ${index + 1}:`, {
        id: prod.id,
        name: prod.name,
        active: prod.active,
        metadata: prod.metadata,
        default_price: prod.default_price
      });
    });
    console.log('=== END STRIPE DEBUG ===');
  } catch (error) {
    console.error('Error fetching pricing data:', error);
  }

  // Add fallback Pro plan if no Stripe products are found
  const fallbackProPlan = {
    id: 'pro-fallback',
    name: 'TimekillPro',
    description: 'For serious students and professionals who need unlimited access.',
    price: '$2.99',
    period: 'per month',
    features: [
      'Unlimited document conversions',
      'Unlimited study sets',
      'All study modes including learn mode',
      '50 humanizer credits per month',
      'Advanced humanizer settings',
      'Priority AI processing',
      'No character limits',
      'Email support',
    ],
    limitations: [],
    priceId: 'price_1RQKRH4MJK50EYMQrXDySiGs', // Default Pro price ID
    cta: '',
    isCurrentPlan: false,
    highlight: true,
  };

  // Process Stripe products or use fallback
  const stripeBasedPlans = stripeProducts.data.map((product: unknown) => {
    const productData = product as { 
      id: string; 
      name: string; 
      description?: string; 
      default_price?: unknown; 
      metadata?: { features?: string; limitations?: string }; 
    };
    const price = productData.default_price as {
      id?: string;
      unit_amount?: number;
      recurring?: {
        interval?: string;
      };
    };
    const amount = price?.unit_amount ? (price.unit_amount / 100).toFixed(2) : '0';
    const interval = price?.recurring?.interval;

    let features: string[] = [];
    try {
      if (productData.metadata?.features) {
        const parsed = JSON.parse(productData.metadata.features);
        if (Array.isArray(parsed)) features = parsed; 
      }
    } catch (e) {
      console.error('Failed to parse features from Stripe metadata for product:', productData.id, e);
      features = []; 
    }

    let limitations: string[] = [];
    try {
      if (productData.metadata?.limitations) {
        const parsed = JSON.parse(productData.metadata.limitations);
        if (Array.isArray(parsed)) limitations = parsed; 
      }
    } catch (e) {
      console.error('Failed to parse limitations from Stripe metadata for product:', productData.id, e);
      limitations = []; 
    }

    return {
      id: productData.id,
      name: productData.name,
      description: productData.description || '',
      price: price ? `$${amount}` : 'Contact us',
      period: price?.recurring ? `per ${interval}` : '',
      features: features,
      limitations: limitations,
      priceId: price?.id || '',
      cta: '', 
      isCurrentPlan: false,
      highlight: productData.name?.toLowerCase().includes('pro'), 
    };
  });

  // Always include fallback Pro plan if no Stripe Pro plan exists
  const hasProPlan = stripeBasedPlans.some(plan => 
    plan.name?.toLowerCase().includes('pro') && plan.features.length > 0
  );

  let processedPlans = [freePlan];
  
  if (stripeBasedPlans.length > 0 && hasProPlan) {
    console.log('Using Stripe-based plans:', stripeBasedPlans.length);
    processedPlans.push(...stripeBasedPlans);
  } else {
    console.log('Using fallback Pro plan - Stripe plans:', stripeBasedPlans.length, 'Has Pro:', hasProPlan);
    processedPlans.push(fallbackProPlan);
  }
  
  console.log('Final processed plans:', processedPlans.map(p => ({ name: p.name, features: p.features.length })));

  processedPlans = processedPlans.map(plan => {
    let ctaText = 'Upgrade Now';
    let isCurrent = false;

    if (subscription) {
      if (plan.name?.toLowerCase() === subscription.plan?.toLowerCase()) {
        ctaText = 'Your Current Plan';
        isCurrent = true;
      } else if (plan.id === 'free' && subscription.plan?.toLowerCase() !== 'free') {
        ctaText = 'Downgrade to Free';
      } else if (plan.id !== 'free' && subscription.plan?.toLowerCase() === 'free') {
        ctaText = `Upgrade to ${plan.name}`;
      } else if (plan.id !== 'free' && subscription.plan?.toLowerCase() !== 'free' && plan.name?.toLowerCase() !== subscription.plan?.toLowerCase()) {
        ctaText = `Switch to ${plan.name}`;
      }
    } else {
      if (plan.id === 'free') {
        ctaText = 'Get Started Free';
      } else {
        ctaText = `Get ${plan.name}`;
      }
    }
    
    if (!user && plan.name?.toLowerCase().includes('pro')) {
        ctaText = 'Upgrade Now';
    }

    return {
      ...plan,
      cta: ctaText,
      isCurrentPlan: isCurrent,
    };
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Simple, Transparent Pricing
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Choose the plan that works for you. No hidden fees. Cancel anytime.
              </p>
            </div>

            {processedPlans.length === 1 && processedPlans[0].id === 'free' && (
              <div className="text-center p-8 bg-secondary rounded-lg border border-border">
                <p className="text-lg text-muted-foreground">
                  Pricing information is currently unavailable. Please check back later or contact support.
                  You can still get started with our Free Plan.
                </p>
              </div>
            )}

            <div className={`grid grid-cols-1 ${processedPlans.length > 1 ? 'md:grid-cols-2' : ''} gap-8 items-stretch`}>
              {processedPlans.map((plan) => (
                <PricingCard
                  key={plan.id}
                  planName={plan.name}
                  price={plan.price}
                  period={plan.period}
                  description={plan.description}
                  features={plan.features}
                  limitations={plan.limitations}
                  priceId={plan.priceId}
                  cta={plan.cta}
                  isCurrentPlan={plan.isCurrentPlan}
                  highlight={plan.highlight}
                  isLoggedIn={!!user}
                />
              ))}
            </div>
          </div>

          <div className="mt-16 md:mt-24 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-secondary p-6 rounded-lg border border-border">
                <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
                <p className="opacity-80">
                  We accept all major credit cards, including Visa, Mastercard, American Express, and Discover, processed securely via Stripe.
                </p>
              </div>
              <div className="bg-secondary p-6 rounded-lg border border-border">
                <h3 className="text-lg font-medium mb-2">Can I cancel my subscription anytime?</h3>
                <p className="opacity-80">
                  Yes, you can cancel your Pro subscription at any time. You&apos;ll retain access to Pro features until the end of your current billing period.
                </p>
              </div>
              <div className="bg-secondary p-6 rounded-lg border border-border">
                <h3 className="text-lg font-medium mb-2">How do conversions and sets work?</h3>
                <p className="opacity-80">
                  Each time you paste a document and generate flashcards, that counts as one conversion that creates a study set. Free accounts are limited to 20 conversions per month.
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

          <div className="mt-12 md:mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 p-8 md:p-12 rounded-lg text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need a custom plan for your team or school?</h2>
            <p className="text-lg opacity-90 mb-6">
              We offer special rates for educational institutions and teams. Contact us to learn more.
            </p>
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-blue-700 rounded-lg hover:bg-gray-100 text-lg font-medium inline-block shadow-md transition-transform transform hover:scale-105"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

interface PricingCardProps {
  planName: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  limitations: string[];
  priceId: string;
  cta: string;
  isCurrentPlan?: boolean;
  highlight?: boolean;
  isLoggedIn?: boolean;
}

function PricingCard({
  planName,
  price,
  period,
  description,
  features,
  limitations, 
  priceId,
  cta,
  isCurrentPlan = false,
  highlight = false,
  isLoggedIn = false,
}: PricingCardProps) {
  return (
    <div
      className={`p-6 md:p-8 rounded-xl shadow-lg flex flex-col justify-between border
        ${highlight ? 'border-blue-500 bg-blue-500/5 ring-2 ring-blue-500' : 'border-border bg-secondary'}
      `}
    >
      <div>
        <h2 className={`text-2xl font-semibold ${highlight ? 'text-blue-600' : ''}`}>{planName}</h2>
        <p className="text-4xl font-bold my-4">
          {price} <span className="text-sm font-normal text-muted-foreground">{period}</span>
        </p>
        <p className="text-muted-foreground min-h-[40px] mb-6 text-sm">{description}</p>
        
        <PricingButton 
          planName={planName} 
          priceId={priceId} 
          cta={cta} 
          isCurrentPlan={isCurrentPlan} 
          highlight={highlight} 
          isLoggedIn={isLoggedIn}
        />

        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">What&apos;s included</p>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircleIcon className={`h-5 w-5 mr-2 flex-shrink-0 ${highlight ? 'text-blue-500' : 'text-green-500'}`} />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          {limitations && limitations.length > 0 && (
            <>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-6 mb-3">Limitations</p>
              <ul className="space-y-2">
                {limitations.map((limitation, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 text-amber-500" /> 
                    <span className="text-sm">{limitation}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}