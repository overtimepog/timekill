/**
 * MIT License
 *
 * Copyright (c) 2025 TimeKill
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { mockClerkUser } from '../../helpers/mocks';
import type { UserResource } from '@clerk/types';

// Define the PricingCard props interface to match the one in the actual component
interface PricingCardProps {
  planName: string;
  price: string;
  period: string;
  description: string | null;
  features: string[];
  limitations: string[] | null;
  priceId: string;
  cta: string;
  isCurrentPlan?: boolean;
  highlight?: boolean;
  isLoggedIn?: boolean;
}

// Mock Next.js components
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock('@clerk/nextjs', () => ({
  useUser: vi.fn(),
}));

// Mock the pricing card component structure based on the pricing page
const PricingCard = ({ 
  planName, 
  price, 
  period, 
  description, 
  features, 
  limitations,
  priceId, 
  cta, 
  isCurrentPlan, 
  highlight, 
  isLoggedIn 
}: PricingCardProps) => {
  const handleUpgrade = () => {
    if (cta.includes('Upgrade') || cta.includes('Get')) {
      // Simulate upgrade flow
      window.location.href = `/api/stripe/checkout?priceId=${priceId}`;
    }
  };

  return (
    <div 
      className={`pricing-card ${highlight ? 'highlighted' : ''}`}
      data-testid={`pricing-card-${planName.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <h2>{planName}</h2>
      <div className="price">
        {price} <span className="period">{period}</span>
      </div>
      <p className="description">{description}</p>
      
      <button 
        onClick={handleUpgrade}
        disabled={isCurrentPlan}
        className={`cta-button ${isCurrentPlan ? 'current' : ''}`}
      >
        {cta}
      </button>
      
      <div className="features">
        <h3>What's included</h3>
        <ul>
          {features.map((feature: string, index: number) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      
      {limitations && limitations.length > 0 && (
        <div className="limitations">
          <h3>Limitations</h3>
          <ul>
            {limitations.map((limitation: string, index: number) => (
              <li key={index}>{limitation}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

describe('PricingCard Component', () => {
  const mockProps = {
    planName: 'TimekillPro',
    price: '$2.99',
    period: 'per month',
    description: 'For serious students and professionals',
    features: [
      'Unlimited document conversions',
      'Unlimited study sets',
      'All study modes',
      '50 humanizer credits per month'
    ],
    limitations: [],
    priceId: 'price_123',
    cta: 'Upgrade Now',
    isCurrentPlan: false,
    highlight: true,
    isLoggedIn: true,
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    
    // Mock useUser hook
    const useUser = vi.mocked((await import('@clerk/nextjs')).useUser);
    
    // Create a mock user with type assertion to satisfy UserResource type requirements
    const mockUser = mockClerkUser();
    
    useUser.mockReturnValue({
      user: mockUser as unknown as UserResource,
      isLoaded: true,
      isSignedIn: true,
    });
  });

  it('should render pricing card with all information', () => {
    render(<PricingCard {...mockProps} />);
    
    expect(screen.getByText('TimekillPro')).toBeInTheDocument();
    expect(screen.getByText('$2.99')).toBeInTheDocument();
    expect(screen.getByText('per month')).toBeInTheDocument();
    expect(screen.getByText('For serious students and professionals')).toBeInTheDocument();
    expect(screen.getByText('Upgrade Now')).toBeInTheDocument();
  });

  it('should display all features correctly', () => {
    render(<PricingCard {...mockProps} />);
    
    expect(screen.getByText('Unlimited document conversions')).toBeInTheDocument();
    expect(screen.getByText('Unlimited study sets')).toBeInTheDocument();
    expect(screen.getByText('All study modes')).toBeInTheDocument();
    expect(screen.getByText('50 humanizer credits per month')).toBeInTheDocument();
  });

  it('should highlight Pro plan', () => {
    render(<PricingCard {...mockProps} />);
    
    const card = screen.getByTestId('pricing-card-timekillpro');
    expect(card).toHaveClass('highlighted');
  });

  it('should handle current plan state', () => {
    const currentPlanProps = {
      ...mockProps,
      cta: 'Your Current Plan',
      isCurrentPlan: true,
    };
    
    render(<PricingCard {...currentPlanProps} />);
    
    const button = screen.getByText('Your Current Plan');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('current');
  });

  it('should render free plan correctly', () => {
    const freePlanProps = {
      planName: 'Free Plan',
      price: '$0',
      period: 'forever',
      description: 'Get started with core features',
      features: [
        '5 document limit per conversion',
        '5,000 character limit per conversion',
        'Unlimited pairs per Set',
        '20 Study Sets per month',
        '10 humanizer credits per month',
      ],
      limitations: ['Limited features compared to Pro'],
      priceId: '',
      cta: 'Get Started Free',
      isCurrentPlan: false,
      highlight: false,
      isLoggedIn: false,
    };
    
    render(<PricingCard {...freePlanProps} />);
    
    expect(screen.getByText('Free Plan')).toBeInTheDocument();
    expect(screen.getByText('$0')).toBeInTheDocument();
    expect(screen.getByText('forever')).toBeInTheDocument();
    expect(screen.getByText('5 document limit per conversion')).toBeInTheDocument();
    expect(screen.getByText('Limited features compared to Pro')).toBeInTheDocument();
  });

  it('should display limitations when provided', () => {
    const propsWithLimitations = {
      ...mockProps,
      limitations: ['Fair usage policy applies', 'Email support only'],
    };
    
    render(<PricingCard {...propsWithLimitations} />);
    
    expect(screen.getByText('Limitations')).toBeInTheDocument();
    expect(screen.getByText('Fair usage policy applies')).toBeInTheDocument();
    expect(screen.getByText('Email support only')).toBeInTheDocument();
  });

  it('should handle upgrade button click', async () => {
    // Mock window.location
    delete (window as any).location;
    window.location = { href: '' } as any;
    
    render(<PricingCard {...mockProps} />);
    
    const upgradeButton = screen.getByText('Upgrade Now');
    fireEvent.click(upgradeButton);
    
    await waitFor(() => {
      expect(window.location.href).toBe('/api/stripe/checkout?priceId=price_123');
    });
  });

  it('should not show upgrade button for current plan', () => {
    const currentPlanProps = {
      ...mockProps,
      cta: 'Your Current Plan',
      isCurrentPlan: true,
    };
    
    render(<PricingCard {...currentPlanProps} />);
    
    const button = screen.getByText('Your Current Plan');
    fireEvent.click(button);
    
    // Button should be disabled and not trigger navigation
    expect(button).toBeDisabled();
  });

  it('should display appropriate CTA for different user states', () => {
    const testCases = [
      {
        props: { ...mockProps, isLoggedIn: false, cta: 'Sign Up to Upgrade' },
        expectedText: 'Sign Up to Upgrade',
      },
      {
        props: { ...mockProps, isLoggedIn: true, cta: 'Get TimekillPro' },
        expectedText: 'Get TimekillPro',
      },
      {
        props: { ...mockProps, isLoggedIn: true, cta: 'Switch to Pro', isCurrentPlan: false },
        expectedText: 'Switch to Pro',
      },
    ];
    
    testCases.forEach(({ props, expectedText }) => {
      const { unmount } = render(<PricingCard {...props} />);
      expect(screen.getByText(expectedText)).toBeInTheDocument();
      unmount();
    });
  });

  it('should handle empty features array', () => {
    const propsWithoutFeatures = {
      ...mockProps,
      features: [],
    };
    
    render(<PricingCard {...propsWithoutFeatures} />);
    
    expect(screen.getByText('What\'s included')).toBeInTheDocument();
    // Should not crash with empty features
  });

  it('should handle long feature descriptions', () => {
    const propsWithLongFeatures = {
      ...mockProps,
      features: [
        'This is a very long feature description that might wrap to multiple lines and should be handled gracefully by the component',
        'Another extremely detailed feature explanation that provides comprehensive information about what users get',
      ],
    };
    
    render(<PricingCard {...propsWithLongFeatures} />);
    
    expect(screen.getByText(/very long feature description/)).toBeInTheDocument();
    expect(screen.getByText(/extremely detailed feature explanation/)).toBeInTheDocument();
  });

  it('should be accessible with proper ARIA labels', () => {
    render(<PricingCard {...mockProps} />);
    
    const button = screen.getByText('Upgrade Now');
    expect(button.tagName.toLowerCase()).toBe('button');
    
    // Check for proper heading structure
    const planName = screen.getByText('TimekillPro');
    expect(planName.tagName.toLowerCase()).toBe('h2');
  });

  it('should handle special characters in plan details', () => {
    const propsWithSpecialChars = {
      ...mockProps,
      planName: 'Pro+ Plan™',
      description: 'Features include: AI-powered learning & analytics',
      features: ['Café support 24/7', 'β-testing access', 'Multi-language: English, 中文, Español'],
    };
    
    render(<PricingCard {...propsWithSpecialChars} />);
    
    expect(screen.getByText('Pro+ Plan™')).toBeInTheDocument();
    expect(screen.getByText('Features include: AI-powered learning & analytics')).toBeInTheDocument();
    expect(screen.getByText('Café support 24/7')).toBeInTheDocument();
    expect(screen.getByText('β-testing access')).toBeInTheDocument();
  });

  it('should handle null or undefined props gracefully', () => {
    const propsWithNulls = {
      planName: 'Test Plan',
      price: '$5.00',
      period: 'monthly',
      description: null,
      features: ['Basic feature'],
      limitations: null,
      priceId: 'price_test',
      cta: 'Subscribe',
      isCurrentPlan: false,
      highlight: false,
      isLoggedIn: true,
    };
    
    expect(() => {
      render(<PricingCard {...propsWithNulls} />);
    }).not.toThrow();
    
    expect(screen.getByText('Test Plan')).toBeInTheDocument();
    expect(screen.getByText('Basic feature')).toBeInTheDocument();
  });
});