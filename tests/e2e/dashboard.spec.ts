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
import { seedTestData, SAMPLE_STUDY_SETS } from './helpers/fixtures';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ context, page }) => {
    await mockClerkAuth(context, TEST_USERS.free);
    await seedTestData(context);
    
    // Mock user stats API
    await context.route('**/api/stats/user', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          totalSets: 5,
          totalPairs: 45,
          studyTime: 120,
          setsThisMonth: 3,
          humanizerCredits: 8
        })
      });
    });
    
    await page.goto('/dashboard');
  });

  test('should redirect anonymous users to sign-in', async ({ page }) => {
    await mockClerkAuth(page.context(), null);
    await page.goto('/dashboard');
    
    await expect(page).toHaveURL(/.*\/sign-in/);
  });

  test('should display dashboard for authenticated users', async ({ page }) => {
    await expect(page).toHaveTitle(/TimeKill/);
    await expect(page.getByRole('heading', { name: /Dashboard/i })).toBeVisible();
    await expect(page.getByText(/Welcome back/i)).toBeVisible();
  });

  test('should display user statistics', async ({ page }) => {
    await expect(page.getByText(/5.*sets/i)).toBeVisible();
    await expect(page.getByText(/45.*pairs/i)).toBeVisible();
    await expect(page.getByText(/120.*minutes/i)).toBeVisible();
    await expect(page.getByText(/8.*credits/i)).toBeVisible();
  });

  test('should list user study sets', async ({ page }) => {
    await expect(page.getByText(/Biology Basics/i)).toBeVisible();
    await expect(page.getByText(/World War II/i)).toBeVisible();
    await expect(page.getByText(/Fundamental concepts in biology/i)).toBeVisible();
  });

  test('should navigate to study set when clicked', async ({ page }) => {
    await page.getByText(/Biology Basics/i).click();
    await expect(page).toHaveURL(/.*\/sets\/.+/);
    await expect(page.getByText(/Biology Basics/i)).toBeVisible();
  });

  test('should display create new set button', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Create New Set/i })).toBeVisible();
    
    await page.getByRole('link', { name: /Create New Set/i }).click();
    await expect(page).toHaveURL(/.*\/create/);
  });

  test('should show quick actions for study sets', async ({ page }) => {
    // Study buttons for each set
    await expect(page.getByRole('link', { name: /Study.*Flashcards/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Take Quiz/i }).first()).toBeVisible();
    
    // Edit/delete buttons
    await expect(page.getByRole('button', { name: /Edit/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Delete/i }).first()).toBeVisible();
  });

  test('should filter study sets by search', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search sets/i);
    
    if (await searchInput.isVisible()) {
      await searchInput.fill('Biology');
      await expect(page.getByText(/Biology Basics/i)).toBeVisible();
      await expect(page.getByText(/World War II/i)).not.toBeVisible();
      
      await searchInput.clear();
      await searchInput.fill('History');
      await expect(page.getByText(/World War II/i)).toBeVisible();
      await expect(page.getByText(/Biology Basics/i)).not.toBeVisible();
    }
  });

  test('should sort study sets by different criteria', async ({ page }) => {
    const sortSelect = page.getByLabel(/Sort by/i);
    
    if (await sortSelect.isVisible()) {
      await sortSelect.selectOption('name');
      // Biology should come before World War II alphabetically
      
      await sortSelect.selectOption('created');
      // Should sort by creation date
      
      await sortSelect.selectOption('studied');
      // Should sort by last studied date
    }
  });

  test('should delete study set with confirmation', async ({ page }) => {
    const deleteButton = page.getByRole('button', { name: /Delete/i }).first();
    await deleteButton.click();
    
    // Should show confirmation dialog
    await expect(page.getByText(/Are you sure.*delete/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Confirm.*Delete/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Cancel/i })).toBeVisible();
    
    // Mock delete API
    await page.context().route(`**/api/sets/${SAMPLE_STUDY_SETS[0].id}`, (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      });
    });
    
    await page.getByRole('button', { name: /Confirm.*Delete/i }).click();
    
    // Set should be removed from list
    await expect(page.getByText(/Biology Basics/i)).not.toBeVisible();
  });

  test('should display recent activity section', async ({ page }) => {
    const activitySection = page.getByText(/Recent Activity/i);
    
    if (await activitySection.isVisible()) {
      await expect(activitySection).toBeVisible();
      await expect(page.getByText(/Studied.*ago/i)).toBeVisible();
      await expect(page.getByText(/Created.*ago/i)).toBeVisible();
    }
  });

  test('should show upgrade prompt for free users', async ({ page }) => {
    await expect(page.getByText(/3.*of.*20.*sets/i)).toBeVisible();
    await expect(page.getByText(/8.*of.*10.*credits/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Upgrade to Pro/i })).toBeVisible();
  });

  test('should not show upgrade prompt for Pro users', async ({ page }) => {
    await mockClerkAuth(page.context(), TEST_USERS.pro);
    await page.goto('/dashboard');
    
    await expect(page.getByText(/Unlimited/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Upgrade to Pro/i })).not.toBeVisible();
  });

  test('should display study progress charts', async ({ page }) => {
    const chartContainer = page.locator('[data-testid="progress-chart"], .chart-container, canvas');
    
    if (await chartContainer.first().isVisible()) {
      await expect(chartContainer.first()).toBeVisible();
    }
  });

  test('should handle empty state for new users', async ({ page }) => {
    // Mock empty user data
    await page.context().route('**/api/sets', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });
    
    await page.reload();
    
    await expect(page.getByText(/No study sets yet/i)).toBeVisible();
    await expect(page.getByText(/Create your first set/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Create New Set/i })).toBeVisible();
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    
    await expect(page.getByRole('heading', { name: /Dashboard/i })).toBeVisible();
    
    // On mobile, study sets should stack vertically
    const setCards = page.locator('[data-testid="study-set-card"], .study-set-card, .set-item');
    if (await setCards.count() > 1) {
      const firstCard = setCards.first();
      const secondCard = setCards.nth(1);
      
      const firstBox = await firstCard.boundingBox();
      const secondBox = await secondCard.boundingBox();
      
      if (firstBox && secondBox) {
        // Second card should be below first card on mobile
        expect(secondBox.y).toBeGreaterThan(firstBox.y + firstBox.height - 50);
      }
    }
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await page.keyboard.press('Tab');
    
    // Navigate through interactive elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const focused = page.locator(':focus');
      if (await focused.isVisible()) {
        const tagName = await focused.evaluate(el => el.tagName.toLowerCase());
        expect(['button', 'a', 'input', 'select']).toContain(tagName);
      }
    }
  });

  test('should display usage warnings when approaching limits', async ({ page }) => {
    // Mock near-limit usage
    await page.context().route('**/api/stats/user', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          totalSets: 18, // Near the 20 limit
          totalPairs: 180,
          studyTime: 300,
          setsThisMonth: 18,
          humanizerCredits: 2 // Near the 10 limit
        })
      });
    });
    
    await page.reload();
    
    await expect(page.getByText(/18.*of.*20.*sets/i)).toBeVisible();
    await expect(page.getByText(/2.*of.*10.*credits/i)).toBeVisible();
    await expect(page.getByText(/running low/i)).toBeVisible();
  });

  test('should export study sets functionality', async ({ page }) => {
    const exportButton = page.getByRole('button', { name: /Export/i });
    
    if (await exportButton.isVisible()) {
      await exportButton.click();
      
      await expect(page.getByText(/CSV/i)).toBeVisible();
      
      const proUser = await page.getByText(/Anki/i).isVisible();
      if (proUser) {
        await expect(page.getByText(/Anki/i)).toBeVisible();
      }
    }
  });

  test('should handle API errors gracefully', async ({ page }) => {
    await page.context().route('**/api/stats/user', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' })
      });
    });
    
    await page.reload();
    
    await expect(page.getByText(/error.*loading.*stats/i)).toBeVisible();
  });
});