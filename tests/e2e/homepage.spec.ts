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

test.describe('Homepage', () => {
  test.beforeEach(async ({ context, page }) => {
    await seedTestData(context);
    await page.goto('/');
  });

  test('should display homepage for anonymous users', async ({ page }) => {
    await mockClerkAuth(page.context(), null);
    await page.goto('/');

    await expect(page).toHaveTitle(/TimeKill/);
    await expect(page.getByRole('heading', { name: /Transform your notes/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Get Started Free/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Sign In/i })).toBeVisible();
  });

  test('should display navigation menu correctly for anonymous users', async ({ page }) => {
    await mockClerkAuth(page.context(), null);
    await page.goto('/');

    const nav = page.getByRole('navigation');
    await expect(nav.getByRole('link', { name: /TimeKill/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /Features/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /Pricing/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /Sign In/i })).toBeVisible();
  });

  test('should display different content for authenticated users', async ({ page }) => {
    await mockClerkAuth(page.context(), TEST_USERS.free);
    await page.goto('/');

    await expect(page.getByRole('link', { name: /Dashboard/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Create Set/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Sign Out/i })).toBeVisible();
  });

  test('should navigate to pricing page from homepage', async ({ page }) => {
    await page.getByRole('link', { name: /Pricing/i }).click();
    await expect(page).toHaveURL(/.*\/pricing/);
    await expect(page.getByRole('heading', { name: /Simple, Transparent Pricing/i })).toBeVisible();
  });

  test('should navigate to sign-in page', async ({ page }) => {
    await page.getByRole('link', { name: /Sign In/i }).click();
    await expect(page).toHaveURL(/.*\/sign-in/);
  });

  test('should display statistics on homepage', async ({ page }) => {
    await expect(page.getByText(/1,250/)).toBeVisible(); // Total users
    await expect(page.getByText(/5,678/)).toBeVisible(); // Total sets
    await expect(page.getByText(/45,678/)).toBeVisible(); // Total pairs
  });

  test('should display feature highlights', async ({ page }) => {
    await expect(page.getByText(/AI-Powered Learning/i)).toBeVisible();
    await expect(page.getByText(/Multiple Study Modes/i)).toBeVisible();
    await expect(page.getByText(/Smart Progress Tracking/i)).toBeVisible();
  });

  test('should have working CTA buttons', async ({ page }) => {
    const getStartedBtn = page.getByRole('link', { name: /Get Started Free/i }).first();
    await expect(getStartedBtn).toBeVisible();
    await expect(getStartedBtn).toHaveAttribute('href', /\/create|\/sign-up/);
  });

  test('should be responsive on mobile viewports', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE

    await expect(page.getByRole('heading', { name: /Transform your notes/i })).toBeVisible();
    
    // Check mobile navigation
    const mobileMenuButton = page.getByRole('button', { name: /menu/i });
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await expect(page.getByRole('link', { name: /Pricing/i })).toBeVisible();
    }
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: /TimeKill/i })).toBeFocused();
    
    await page.keyboard.press('Tab');
    const nextFocused = page.locator(':focus');
    await expect(nextFocused).toBeVisible();
  });

  test('should have proper accessibility roles and labels', async ({ page }) => {
    await expect(page.getByRole('banner')).toBeVisible(); // Header
    await expect(page.getByRole('main')).toBeVisible(); // Main content
    await expect(page.getByRole('navigation')).toBeVisible(); // Navigation
    
    // Check for proper heading hierarchy
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();
  });
});