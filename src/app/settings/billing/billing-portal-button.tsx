'use client';

import { useState } from 'react';

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
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
    >
      {isLoading ? 'Loading...' : 'Manage Subscription'}
    </button>
  );
}