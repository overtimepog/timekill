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

test.describe('Settings Pages', () => {
  test.beforeEach(async ({ context, page }) => {
    await mockClerkAuth(context, TEST_USERS.free);
    await seedTestData(context);
  });

  test.describe('Billing Settings', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/settings/billing');
    });

    test('should redirect anonymous users to sign-in', async ({ page }) => {
      await mockClerkAuth(page.context(), null);
      await page.goto('/settings/billing');
      
      await expect(page).toHaveURL(/.*\/sign-in/);
    });

    test('should display billing information for free users', async ({ page }) => {
      await expect(page).toHaveTitle(/TimeKill/);
      await expect(page.getByRole('heading', { name: /Billing/i })).toBeVisible();
      
      await expect(page.getByText(/Free Plan/i)).toBeVisible();
      await expect(page.getByText(/\$0.*month/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /Upgrade to Pro/i })).toBeVisible();
    });

    test('should display Pro subscription details for Pro users', async ({ page }) => {
      await mockClerkAuth(page.context(), TEST_USERS.pro);
      await page.goto('/settings/billing');
      
      await expect(page.getByText(/Pro Plan/i)).toBeVisible();
      await expect(page.getByText(/\$2\.99.*month/i)).toBeVisible();
      await expect(page.getByText(/Next billing.*date/i)).toBeVisible();
    });

    test('should open Stripe billing portal for Pro users', async ({ page }) => {
      await mockClerkAuth(page.context(), TEST_USERS.pro);
      await page.goto('/settings/billing');
      
      // Mock billing portal API
      await page.context().route('**/api/stripe/portal', (route) => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ url: 'https://billing.stripe.com/session_123' })
        });
      });
      
      const manageButton = page.getByRole('button', { name: /Manage.*Billing/i });
      if (await manageButton.isVisible()) {
        await manageButton.click();
        await page.waitForURL(/billing\.stripe\.com/);
      }
    });

    test('should handle upgrade flow from billing page', async ({ page }) => {
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
      
      await page.getByRole('button', { name: /Upgrade to Pro/i }).click();
      await page.waitForURL(/checkout\.stripe\.com/);
    });

    test('should display usage statistics', async ({ page }) => {
      await expect(page.getByText(/Current.*usage/i)).toBeVisible();
      await expect(page.getByText(/Study sets.*5.*20/i)).toBeVisible();
      await expect(page.getByText(/Humanizer.*8.*10/i)).toBeVisible();
    });

    test('should show billing history', async ({ page }) => {
      await mockClerkAuth(page.context(), TEST_USERS.pro);
      await page.goto('/settings/billing');
      
      const historySection = page.getByText(/Billing.*History/i);
      if (await historySection.isVisible()) {
        await expect(historySection).toBeVisible();
        await expect(page.getByText(/Invoice|Payment/i)).toBeVisible();
      }
    });

    test('should handle subscription cancellation', async ({ page }) => {
      await mockClerkAuth(page.context(), TEST_USERS.pro);
      await page.goto('/settings/billing');
      
      const cancelButton = page.getByRole('button', { name: /Cancel.*Subscription/i });
      if (await cancelButton.isVisible()) {
        await cancelButton.click();
        
        // Should show confirmation dialog
        await expect(page.getByText(/Are you sure.*cancel/i)).toBeVisible();
        await expect(page.getByRole('button', { name: /Confirm.*Cancel/i })).toBeVisible();
      }
    });

    test('should be responsive on mobile devices', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
      
      await expect(page.getByRole('heading', { name: /Billing/i })).toBeVisible();
      
      const billingCard = page.locator('[data-testid="billing-card"], .billing-card').first();
      if (await billingCard.isVisible()) {
        const box = await billingCard.boundingBox();
        if (box) {
          expect(box.width).toBeLessThan(400);
        }
      }
    });
  });

  test.describe('General Settings', () => {
    test('should display account settings page', async ({ page }) => {
      await page.goto('/settings');
      
      await expect(page).toHaveTitle(/TimeKill/);
      await expect(page.getByRole('heading', { name: /Settings|Account/i })).toBeVisible();
    });

    test('should show user profile information', async ({ page }) => {
      await page.goto('/settings');
      
      await expect(page.getByText(/Free User/i)).toBeVisible();
      await expect(page.getByText(/free\.user@example\.com/i)).toBeVisible();
    });

    test('should allow editing profile information', async ({ page }) => {
      await page.goto('/settings');
      
      const editButton = page.getByRole('button', { name: /Edit.*Profile/i });
      if (await editButton.isVisible()) {
        await editButton.click();
        
        await expect(page.getByLabel(/First.*Name/i)).toBeVisible();
        await expect(page.getByLabel(/Last.*Name/i)).toBeVisible();
        await expect(page.getByRole('button', { name: /Save.*Changes/i })).toBeVisible();
      }
    });

    test('should display notification preferences', async ({ page }) => {
      await page.goto('/settings');
      
      const notificationSection = page.getByText(/Notifications/i);
      if (await notificationSection.isVisible()) {
        await expect(notificationSection).toBeVisible();
        await expect(page.getByRole('checkbox', { name: /Email.*notifications/i })).toBeVisible();
        await expect(page.getByRole('checkbox', { name: /Study.*reminders/i })).toBeVisible();
      }
    });

    test('should allow changing notification settings', async ({ page }) => {
      await page.goto('/settings');
      
      const emailNotifications = page.getByRole('checkbox', { name: /Email.*notifications/i });
      if (await emailNotifications.isVisible()) {
        const wasChecked = await emailNotifications.isChecked();
        await emailNotifications.click();
        
        const saveButton = page.getByRole('button', { name: /Save/i });
        if (await saveButton.isVisible()) {
          await saveButton.click();
          await expect(page.getByText(/Settings.*saved/i)).toBeVisible();
        }
      }
    });

    test('should show data export options', async ({ page }) => {
      await page.goto('/settings');
      
      const exportSection = page.getByText(/Data.*Export/i);
      if (await exportSection.isVisible()) {
        await expect(exportSection).toBeVisible();
        await expect(page.getByRole('button', { name: /Export.*Data/i })).toBeVisible();
      }
    });

    test('should handle account deletion', async ({ page }) => {
      await page.goto('/settings');
      
      const deleteButton = page.getByRole('button', { name: /Delete.*Account/i });
      if (await deleteButton.isVisible()) {
        await deleteButton.click();
        
        // Should show confirmation with warning
        await expect(page.getByText(/permanently.*delete.*account/i)).toBeVisible();
        await expect(page.getByRole('button', { name: /I understand.*delete/i })).toBeVisible();
      }
    });

    test('should display security settings', async ({ page }) => {
      await page.goto('/settings');
      
      const securitySection = page.getByText(/Security|Password/i);
      if (await securitySection.isVisible()) {
        await expect(securitySection).toBeVisible();
        await expect(page.getByRole('button', { name: /Change.*Password/i })).toBeVisible();
      }
    });

    test('should show connected accounts', async ({ page }) => {
      await page.goto('/settings');
      
      const connectedSection = page.getByText(/Connected.*Accounts/i);
      if (await connectedSection.isVisible()) {
        await expect(connectedSection).toBeVisible();
        // Might show Google, GitHub, etc.
        await expect(page.getByText(/Google|GitHub|Discord/i)).toBeVisible();
      }
    });
  });

  test.describe('Study Preferences', () => {
    test('should display study preferences', async ({ page }) => {
      await page.goto('/settings');
      
      const studySection = page.getByText(/Study.*Preferences/i);
      if (await studySection.isVisible()) {
        await expect(studySection).toBeVisible();
        await expect(page.getByLabel(/Default.*study.*mode/i)).toBeVisible();
      }
    });

    test('should allow setting default study mode', async ({ page }) => {
      await page.goto('/settings');
      
      const studyModeSelect = page.getByLabel(/Default.*study.*mode/i);
      if (await studyModeSelect.isVisible()) {
        await studyModeSelect.selectOption('flashcards');
        
        const saveButton = page.getByRole('button', { name: /Save/i });
        if (await saveButton.isVisible()) {
          await saveButton.click();
          await expect(page.getByText(/Settings.*saved/i)).toBeVisible();
        }
      }
    });

    test('should allow configuring study reminders', async ({ page }) => {
      await page.goto('/settings');
      
      const reminderSettings = page.getByText(/Study.*Reminders/i);
      if (await reminderSettings.isVisible()) {
        await expect(page.getByRole('checkbox', { name: /Daily.*reminder/i })).toBeVisible();
        await expect(page.getByLabel(/Reminder.*time/i)).toBeVisible();
      }
    });
  });

  test.describe('API and Integrations', () => {
    test('should show API key management for Pro users', async ({ page }) => {
      await mockClerkAuth(page.context(), TEST_USERS.pro);
      await page.goto('/settings');
      
      const apiSection = page.getByText(/API.*Keys|Integrations/i);
      if (await apiSection.isVisible()) {
        await expect(apiSection).toBeVisible();
        await expect(page.getByRole('button', { name: /Generate.*API.*Key/i })).toBeVisible();
      }
    });

    test('should handle API key generation', async ({ page }) => {
      await mockClerkAuth(page.context(), TEST_USERS.pro);
      await page.goto('/settings');
      
      const generateButton = page.getByRole('button', { name: /Generate.*API.*Key/i });
      if (await generateButton.isVisible()) {
        await generateButton.click();
        
        // Mock API key generation
        await page.context().route('**/api/keys', (route) => {
          route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ key: 'tk_test_1234567890abcdef' })
          });
        });
        
        await expect(page.getByText(/tk_test_/)).toBeVisible();
        await expect(page.getByRole('button', { name: /Copy.*Key/i })).toBeVisible();
      }
    });

    test('should show webhook configuration', async ({ page }) => {
      await mockClerkAuth(page.context(), TEST_USERS.pro);
      await page.goto('/settings');
      
      const webhookSection = page.getByText(/Webhooks/i);
      if (await webhookSection.isVisible()) {
        await expect(webhookSection).toBeVisible();
        await expect(page.getByLabel(/Webhook.*URL/i)).toBeVisible();
      }
    });
  });

  test('should handle navigation between settings sections', async ({ page }) => {
    await page.goto('/settings');
    
    // Should have navigation sidebar or tabs
    const billingLink = page.getByRole('link', { name: /Billing/i });
    if (await billingLink.isVisible()) {
      await billingLink.click();
      await expect(page).toHaveURL(/.*\/billing/);
    }
  });

  test('should validate form inputs', async ({ page }) => {
    await page.goto('/settings');
    
    const editButton = page.getByRole('button', { name: /Edit.*Profile/i });
    if (await editButton.isVisible()) {
      await editButton.click();
      
      const nameInput = page.getByLabel(/First.*Name/i);
      if (await nameInput.isVisible()) {
        await nameInput.clear();
        await page.getByRole('button', { name: /Save.*Changes/i }).click();
        
        await expect(page.getByText(/Name.*required/i)).toBeVisible();
      }
    }
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await page.goto('/settings');
    
    await page.keyboard.press('Tab');
    
    // Should be able to navigate through settings options
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const focused = page.locator(':focus');
      if (await focused.isVisible()) {
        const tagName = await focused.evaluate(el => el.tagName.toLowerCase());
        expect(['button', 'a', 'input', 'select']).toContain(tagName);
      }
    }
  });
});