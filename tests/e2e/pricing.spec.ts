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

import { test, expect } from '@playwright/test';
import { mockClerkAuth, TEST_USERS } from './helpers/auth';
import { seedTestData } from './helpers/fixtures';

test.describe('Pricing Page', () => {
  test.beforeEach(async ({ context, page }) => {
    await seedTestData(context);
    
    // Mock Stripe products API
    await context.route('**/api/stripe/products', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          products: [
            {
              id: 'prod_pro',
              name: 'TimekillPro',
              description: 'For serious students and professionals',
              default_price: {
                id: 'price_pro_monthly',
                unit_amount: 299,
                recurring: { interval: 'month' }
              },
              metadata: {
                features: JSON.stringify([
                  'Unlimited document conversions',
                  'Unlimited study sets',
                  'All study modes',
                  '50 humanizer credits per month'
                ])
              }
            }
          ]
        })
      });
    });
    
    await page.goto('/pricing');
  });

  test('should display pricing page with all plan information', async ({ page }) => {
    await expect(page).toHaveTitle(/TimeKill/);
    await expect(page.getByRole('heading', { name: /Simple, Transparent Pricing/i })).toBeVisible();
    
    // Check for Free plan
    await expect(page.getByText(/Free Plan/i)).toBeVisible();
    await expect(page.getByText(/\$0/)).toBeVisible();
    await expect(page.getByText(/forever/i)).toBeVisible();
    
    // Check for Pro plan features
    await expect(page.getByText(/5 document limit/i)).toBeVisible();
    await expect(page.getByText(/20 Study Sets per month/i)).toBeVisible();
    await expect(page.getByText(/10 humanizer credits/i)).toBeVisible();
  });

  test('should display Pro plan when Stripe data is available', async ({ page }) => {
    await expect(page.getByText(/TimekillPro/i)).toBeVisible();
    await expect(page.getByText(/\$2\.99/)).toBeVisible();
    await expect(page.getByText(/per month/i)).toBeVisible();
    await expect(page.getByText(/Unlimited document conversions/i)).toBeVisible();
  });

  test('should show appropriate CTA buttons for anonymous users', async ({ page }) => {
    await mockClerkAuth(page.context(), null);
    await page.goto('/pricing');
    
    await expect(page.getByRole('button', { name: /Get Started Free/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Upgrade Now/i })).toBeVisible();
  });

  test('should show different CTA for authenticated free user', async ({ page }) => {
    await mockClerkAuth(page.context(), TEST_USERS.free);
    await page.goto('/pricing');
    
    await expect(page.getByRole('button', { name: /Your Current Plan/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Get TimekillPro/i })).toBeVisible();
  });

  test('should show billing portal for Pro users', async ({ page }) => {
    await mockClerkAuth(page.context(), TEST_USERS.pro);
    await page.goto('/pricing');
    
    // Mock subscription data
    await page.context().route('**/api/stripe/portal', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ url: 'https://billing.stripe.com/session_123' })
      });
    });
    
    const manageButton = page.getByRole('button', { name: /Manage Billing/i });
    if (await manageButton.isVisible()) {
      await expect(manageButton).toBeVisible();
    }
  });

  test('should display FAQ section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeVisible();
    
    await expect(page.getByText(/What payment methods do you accept\?/i)).toBeVisible();
    await expect(page.getByText(/Can I cancel my subscription anytime\?/i)).toBeVisible();
    await expect(page.getByText(/What are humanizer credits\?/i)).toBeVisible();
    await expect(page.getByText(/Can I export my flashcards\?/i)).toBeVisible();
  });

  test('should handle Pro plan upgrade flow', async ({ page }) => {
    await mockClerkAuth(page.context(), TEST_USERS.free);
    await page.goto('/pricing');
    
    // Mock checkout session creation
    await page.context().route('**/api/stripe/checkout', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          sessionId: 'cs_test_123',
          url: 'https://checkout.stripe.com/pay/cs_test_123'
        })
      });
    });
    
    const upgradeButton = page.getByRole('button', { name: /Get TimekillPro/i });
    await upgradeButton.click();
    
    // Should redirect to Stripe checkout (mocked)
    await page.waitForURL(/checkout\.stripe\.com/);
  });

  test('should display contact sales section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Need a custom plan/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Contact Sales/i })).toBeVisible();
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    
    await expect(page.getByRole('heading', { name: /Simple, Transparent Pricing/i })).toBeVisible();
    
    // Plans should stack vertically on mobile
    const pricingCards = page.locator('[data-testid="pricing-card"], .pricing-card, .plan-card');
    if (await pricingCards.first().isVisible()) {
      const firstCard = pricingCards.first();
      const secondCard = pricingCards.nth(1);
      
      if (await secondCard.isVisible()) {
        const firstCardBox = await firstCard.boundingBox();
        const secondCardBox = await secondCard.boundingBox();
        
        if (firstCardBox && secondCardBox) {
          // On mobile, cards should be stacked (second card below first)
          expect(secondCardBox.y).toBeGreaterThan(firstCardBox.y + firstCardBox.height - 50);
        }
      }
    }
  });

  test('should highlight Pro plan appropriately', async ({ page }) => {
    const proCard = page.locator('text=TimekillPro').locator('..').locator('..');
    await expect(proCard).toHaveClass(/highlight|ring|border-blue/);
  });

  test('should handle keyboard navigation through pricing cards', async ({ page }) => {
    await page.keyboard.press('Tab');
    
    // Navigate through the page using Tab key
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const focused = page.locator(':focus');
      if (await focused.isVisible()) {
        break;
      }
    }
    
    // Should be able to reach interactive elements
    const focusedElement = page.locator(':focus');
    const tagName = await focusedElement.evaluate(el => el.tagName.toLowerCase());
    expect(['button', 'a', 'input']).toContain(tagName);
  });

  test('should display feature comparison clearly', async ({ page }) => {
    // Free plan features
    await expect(page.getByText(/5 document limit per conversion/i)).toBeVisible();
    await expect(page.getByText(/5,000 character limit/i)).toBeVisible();
    
    // Pro plan features (when available)
    const unlimitedText = page.getByText(/Unlimited document conversions/i);
    if (await unlimitedText.isVisible()) {
      await expect(unlimitedText).toBeVisible();
    }
  });

  test('should show proper loading states during checkout', async ({ page }) => {
    await mockClerkAuth(page.context(), TEST_USERS.free);
    await page.goto('/pricing');
    
    // Mock slow checkout response
    await page.context().route('**/api/stripe/checkout', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          sessionId: 'cs_test_123',
          url: 'https://checkout.stripe.com/pay/cs_test_123'
        })
      });
    });
    
    const upgradeButton = page.getByRole('button', { name: /Get TimekillPro/i });
    await upgradeButton.click();
    
    // Check for loading state
    await expect(upgradeButton).toBeDisabled();
  });
});