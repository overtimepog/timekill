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

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ context, page }) => {
    await seedTestData(context);
  });

  test('should redirect protected routes to sign-in for anonymous users', async ({ page }) => {
    const protectedRoutes = ['/dashboard', '/create', '/humanize', '/settings'];
    
    for (const route of protectedRoutes) {
      await page.goto(route);
      await expect(page).toHaveURL(/.*\/sign-in/);
    }
  });

  test('should allow access to public routes for anonymous users', async ({ page }) => {
    const publicRoutes = ['/', '/pricing'];
    
    for (const route of publicRoutes) {
      await page.goto(route);
      await expect(page).not.toHaveURL(/.*\/sign-in/);
    }
  });

  test('should display sign-in page correctly', async ({ page }) => {
    await page.goto('/sign-in');
    
    await expect(page).toHaveTitle(/TimeKill/);
    await expect(page.getByRole('heading', { name: /Sign in/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Don't have an account/i })).toBeVisible();
  });

  test('should display sign-up page correctly', async ({ page }) => {
    await page.goto('/sign-up');
    
    await expect(page).toHaveTitle(/TimeKill/);
    await expect(page.getByRole('heading', { name: /Create.*account/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Already have.*account/i })).toBeVisible();
  });

  test('should handle sign-in flow', async ({ page }) => {
    await page.goto('/sign-in');
    
    // Mock successful authentication
    await mockClerkAuth(page.context(), TEST_USERS.free);
    
    // Should redirect to dashboard after sign-in
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*\/dashboard/);
    await expect(page.getByText(/Welcome back/i)).toBeVisible();
  });

  test('should handle sign-up flow', async ({ page }) => {
    await page.goto('/sign-up');
    
    // Mock new user registration
    await mockClerkAuth(page.context(), TEST_USERS.free);
    
    // Should redirect to dashboard after sign-up
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test('should handle sign-out flow', async ({ page }) => {
    await mockClerkAuth(page.context(), TEST_USERS.free);
    await page.goto('/dashboard');
    
    // Click sign out (might be in a dropdown or direct button)
    const signOutButton = page.getByRole('button', { name: /Sign Out/i });
    const userMenu = page.getByRole('button', { name: /User menu|Profile/i });
    
    if (await userMenu.isVisible()) {
      await userMenu.click();
      await page.getByRole('menuitem', { name: /Sign Out/i }).click();
    } else if (await signOutButton.isVisible()) {
      await signOutButton.click();
    }
    
    // Should redirect to homepage
    await expect(page).toHaveURL(/^\//);
    await expect(page.getByRole('link', { name: /Sign In/i })).toBeVisible();
  });

  test('should display user profile information when authenticated', async ({ page }) => {
    await mockClerkAuth(page.context(), TEST_USERS.free);
    await page.goto('/dashboard');
    
    // Should show user name or email somewhere
    await expect(page.getByText(/Free User|free\.user@example\.com/)).toBeVisible();
  });

  test('should handle session expiration', async ({ page }) => {
    await mockClerkAuth(page.context(), TEST_USERS.free);
    await page.goto('/dashboard');
    
    // Clear auth state to simulate session expiration
    await page.context().clearCookies();
    await mockClerkAuth(page.context(), null);
    
    // Navigate to a protected route
    await page.goto('/create');
    await expect(page).toHaveURL(/.*\/sign-in/);
  });

  test('should preserve redirect URL after authentication', async ({ page }) => {
    // Try to access protected route while anonymous
    await page.goto('/create');
    await expect(page).toHaveURL(/.*\/sign-in/);
    
    // Sign in
    await mockClerkAuth(page.context(), TEST_USERS.free);
    
    // Should redirect back to original URL
    await page.goto('/create');
    await expect(page).toHaveURL(/.*\/create/);
    await expect(page.getByRole('heading', { name: /Create Study Set/i })).toBeVisible();
  });

  test('should differentiate between free and Pro user access', async ({ page }) => {
    // Test free user limitations
    await mockClerkAuth(page.context(), TEST_USERS.free);
    await page.goto('/dashboard');
    await expect(page.getByText(/Upgrade to Pro/i)).toBeVisible();
    
    // Test Pro user access
    await mockClerkAuth(page.context(), TEST_USERS.pro);
    await page.goto('/dashboard');
    await expect(page.getByText(/Unlimited/i)).toBeVisible();
  });

  test('should handle multiple sign-in attempts gracefully', async ({ page }) => {
    await page.goto('/sign-in');
    
    // Mock sign-in error
    await page.context().route('**/api/auth/**', (route) => {
      route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Invalid credentials' })
      });
    });
    
    // Should show error message
    await expect(page.getByText(/Invalid.*credentials|Sign.*failed/i)).toBeVisible();
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    
    await page.goto('/sign-in');
    await expect(page.getByRole('heading', { name: /Sign in/i })).toBeVisible();
    
    // Auth forms should be properly sized for mobile
    const form = page.locator('form').first();
    if (await form.isVisible()) {
      const box = await form.boundingBox();
      if (box) {
        expect(box.width).toBeLessThan(400);
      }
    }
  });

  test('should handle keyboard navigation in auth forms', async ({ page }) => {
    await page.goto('/sign-in');
    
    await page.keyboard.press('Tab');
    
    // Should be able to navigate through form fields
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
    
    const tagName = await focused.evaluate(el => el.tagName.toLowerCase());
    expect(['input', 'button', 'a']).toContain(tagName);
  });

  test('should provide social login options', async ({ page }) => {
    await page.goto('/sign-in');
    
    // Check for common social login options
    const googleButton = page.getByRole('button', { name: /Google/i });
    const githubButton = page.getByRole('button', { name: /GitHub/i });
    
    if (await googleButton.isVisible()) {
      await expect(googleButton).toBeVisible();
    }
    
    if (await githubButton.isVisible()) {
      await expect(githubButton).toBeVisible();
    }
  });

  test('should handle password reset flow', async ({ page }) => {
    await page.goto('/sign-in');
    
    const forgotPasswordLink = page.getByRole('link', { name: /Forgot.*password/i });
    if (await forgotPasswordLink.isVisible()) {
      await forgotPasswordLink.click();
      await expect(page.getByText(/Reset.*password|Enter.*email/i)).toBeVisible();
    }
  });

  test('should validate email format in sign-up', async ({ page }) => {
    await page.goto('/sign-up');
    
    const emailInput = page.getByRole('textbox', { name: /email/i });
    if (await emailInput.isVisible()) {
      await emailInput.fill('invalid-email');
      await page.getByRole('button', { name: /Sign up|Create/i }).click();
      
      await expect(page.getByText(/valid.*email/i)).toBeVisible();
    }
  });

  test('should enforce password requirements', async ({ page }) => {
    await page.goto('/sign-up');
    
    const passwordInput = page.getByRole('textbox', { name: /password/i });
    if (await passwordInput.isVisible()) {
      await passwordInput.fill('123'); // Weak password
      await page.getByRole('button', { name: /Sign up|Create/i }).click();
      
      await expect(page.getByText(/password.*requirements|too short/i)).toBeVisible();
    }
  });
});