'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/button';

type PricingButtonProps = {
  planName: string;
  priceId: string;
  isCurrentPlan: boolean;
  isLoggedIn: boolean;
  cta: string;
  highlight: boolean;
};

export default function PricingButton({
  planName,
  priceId,
  isCurrentPlan,
  isLoggedIn,
  cta,
  highlight,
}: PricingButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = async () => {
    // If not logged in, redirect to sign up
    if (!isLoggedIn) {
      router.push('/sign-up');
      return;
    }
    
    // If this is the current plan, redirect to billing settings
    if (isCurrentPlan) {
      router.push('/settings/billing');
      return;
    }
    
    // If this is the free plan, redirect to dashboard
    if (planName.toLowerCase() === 'free') {
      router.push('/dashboard');
      return;
    }
    
    // Create a checkout session
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }
      
      // Redirect to checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };
  
  // Determine the button variant based on the plan status
  let variant: 'primary' | 'secondary' | 'green' = isCurrentPlan 
    ? 'green' 
    : highlight 
      ? 'primary' 
      : 'secondary';
      
  return (
    <Button 
      variant={variant}
      onClick={handleClick}
      isLoading={isLoading}
      fullWidth
      disabled={isLoading}
      className={isCurrentPlan ? 'bg-green-900/20 text-green-400 border border-green-900/30 hover:bg-green-900/30' : ''}
    >
      {isLoading ? 'Processing...' : cta}
    </Button>
  );
}