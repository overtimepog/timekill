import { Navbar } from '../components/navbar';
import { currentUser } from '@clerk/nextjs';
import Link from 'next/link';
import { prisma } from '../../../packages/core/lib/prisma';
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
  
  const plans = [
    {
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
      priceId: 'price_1RQKRH4MJK50EYMQrXDySiGs', // Replace with your actual price ID
      cta: subscription?.plan === 'pro' && subscription?.status === 'active' ? 'Current Plan' : 'Upgrade Now',
      highlight: true,
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600">
              Choose the plan that works for you. No hidden fees. Cancel anytime.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-lg shadow-sm border ${
                  plan.highlight ? 'border-blue-400' : 'border-gray-200'
                } overflow-hidden`}
              >
                {plan.highlight && (
                  <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold">{plan.name}</h2>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600"> {plan.period}</span>
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
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                      What's included
                    </h3>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {plan.limitations.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                        Limitations
                      </h3>
                      <ul className="space-y-3">
                        {plan.limitations.map((limitation) => (
                          <li key={limitation} className="flex items-start">
                            <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-gray-700">{limitation}</span>
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
              <div>
                <h3 className="text-lg font-medium mb-2">Can I cancel my subscription?</h3>
                <p className="text-gray-600">
                  Yes, you can cancel your subscription at any time. You'll still have access to Pro features until the end of your billing period.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">How do notes conversions work?</h3>
                <p className="text-gray-600">
                  Each time you paste notes and generate flashcards, that counts as one conversion. Free accounts are limited to 50 conversions per month.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">What are humanizer credits?</h3>
                <p className="text-gray-600">
                  Humanizer credits let you convert AI-sounding text to more natural human-like text. Free accounts get 10 credits per month.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Can I export my flashcards?</h3>
                <p className="text-gray-600">
                  Yes, all users can export their flashcards as CSV. Pro users can also export in Anki-compatible format.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
            <h2 className="text-2xl font-bold mb-4">Need a custom plan for your team or school?</h2>
            <p className="text-lg text-blue-800 mb-6">
              We offer special rates for educational institutions and teams. Contact us to learn more.
            </p>
            <Link
              href="/contact"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-medium inline-block"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}