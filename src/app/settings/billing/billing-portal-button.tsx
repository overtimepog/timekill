'use client';

import { useState } from 'react';
import { Button } from '../../components/ui/button';

export default function BillingPortalButton() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create billing portal session');
      }
      
      // Redirect to billing portal
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating billing portal session:', error);
      alert('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };
  
  return (
    <Button
      variant="primary"
      onClick={handleClick}
      isLoading={isLoading}
      disabled={isLoading}
    >
      Manage Subscription
    </Button>
  );
}