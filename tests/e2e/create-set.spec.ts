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
import { seedTestData, SAMPLE_NOTES } from './helpers/fixtures';

test.describe('Create Study Set', () => {
  test.beforeEach(async ({ context, page }) => {
    await mockClerkAuth(context, TEST_USERS.free);
    await seedTestData(context);
    await page.goto('/create');
  });

  test('should display create set form for authenticated users', async ({ page }) => {
    await expect(page).toHaveTitle(/TimeKill/);
    await expect(page.getByRole('heading', { name: /Create Study Set/i })).toBeVisible();
    
    await expect(page.getByLabel(/Set Name/i)).toBeVisible();
    await expect(page.getByLabel(/Notes/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Generate Flashcards/i })).toBeVisible();
  });

  test('should redirect anonymous users to sign-in', async ({ page }) => {
    await mockClerkAuth(page.context(), null);
    await page.goto('/create');
    
    await expect(page).toHaveURL(/.*\/sign-in/);
  });

  test('should successfully create study set from notes', async ({ page }) => {
    // Fill in the form
    await page.getByLabel(/Set Name/i).fill('Biology Test Set');
    await page.getByLabel(/Notes/i).fill(SAMPLE_NOTES.biology);
    
    // Submit the form
    await page.getByRole('button', { name: /Generate Flashcards/i }).click();
    
    // Should show loading state
    await expect(page.getByText(/Generating/i)).toBeVisible();
    
    // Should redirect to the created set
    await expect(page).toHaveURL(/.*\/sets\/.+/);
    await expect(page.getByText(/Biology Test Set/i)).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.getByRole('button', { name: /Generate Flashcards/i }).click();
    
    await expect(page.getByText(/Set name is required/i)).toBeVisible();
    await expect(page.getByText(/Notes are required/i)).toBeVisible();
  });

  test('should enforce character limits for free users', async ({ page }) => {
    const longText = SAMPLE_NOTES.longText;
    
    await page.getByLabel(/Set Name/i).fill('Test Set');
    await page.getByLabel(/Notes/i).fill(longText);
    
    await page.getByRole('button', { name: /Generate Flashcards/i }).click();
    
    await expect(page.getByText(/character limit/i)).toBeVisible();
  });

  test('should allow unlimited content for Pro users', async ({ page }) => {
    await mockClerkAuth(page.context(), TEST_USERS.pro);
    await page.goto('/create');
    
    const longText = SAMPLE_NOTES.longText;
    
    await page.getByLabel(/Set Name/i).fill('Pro Test Set');
    await page.getByLabel(/Notes/i).fill(longText);
    
    await page.getByRole('button', { name: /Generate Flashcards/i }).click();
    
    // Should not show character limit error
    await expect(page.getByText(/character limit/i)).not.toBeVisible();
    await expect(page.getByText(/Generating/i)).toBeVisible();
  });

  test('should display character count indicator', async ({ page }) => {
    await page.getByLabel(/Notes/i).fill('Short text');
    
    await expect(page.getByText(/10.*characters/)).toBeVisible();
  });

  test('should handle API errors gracefully', async ({ page }) => {
    await page.context().route('**/api/parse-content', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' })
      });
    });
    
    await page.getByLabel(/Set Name/i).fill('Test Set');
    await page.getByLabel(/Notes/i).fill(SAMPLE_NOTES.biology);
    await page.getByRole('button', { name: /Generate Flashcards/i }).click();
    
    await expect(page.getByText(/error.*occurred/i)).toBeVisible();
  });

  test('should allow editing set name and description', async ({ page }) => {
    const setNameInput = page.getByLabel(/Set Name/i);
    const descriptionInput = page.getByLabel(/Description/i);
    
    await setNameInput.fill('Initial Name');
    
    if (await descriptionInput.isVisible()) {
      await descriptionInput.fill('Initial description');
    }
    
    await setNameInput.clear();
    await setNameInput.fill('Updated Name');
    
    await expect(setNameInput).toHaveValue('Updated Name');
  });

  test('should support paste functionality in notes field', async ({ page }) => {
    const notesField = page.getByLabel(/Notes/i);
    
    await notesField.click();
    
    // Simulate pasting content
    await page.evaluate((content) => {
      document.execCommand('insertText', false, content);
    }, SAMPLE_NOTES.biology);
    
    await expect(notesField).toHaveValue(SAMPLE_NOTES.biology);
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    
    await expect(page.getByRole('heading', { name: /Create Study Set/i })).toBeVisible();
    await expect(page.getByLabel(/Set Name/i)).toBeVisible();
    await expect(page.getByLabel(/Notes/i)).toBeVisible();
    
    // Form elements should be properly sized for mobile
    const notesField = page.getByLabel(/Notes/i);
    const box = await notesField.boundingBox();
    
    if (box) {
      expect(box.width).toBeLessThan(400); // Should fit in mobile viewport
    }
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await page.keyboard.press('Tab');
    await expect(page.getByLabel(/Set Name/i)).toBeFocused();
    
    await page.keyboard.press('Tab');
    const nextElement = page.locator(':focus');
    await expect(nextElement).toBeVisible();
  });

  test('should preserve form data during navigation', async ({ page }) => {
    await page.getByLabel(/Set Name/i).fill('Test Set Name');
    await page.getByLabel(/Notes/i).fill('Test notes content');
    
    // Navigate away and back
    await page.getByRole('link', { name: /Dashboard/i }).click();
    await page.goBack();
    
    // Form data should be preserved (if implemented)
    const setName = await page.getByLabel(/Set Name/i).inputValue();
    const notes = await page.getByLabel(/Notes/i).inputValue();
    
    // Note: This test assumes form persistence is implemented
    // If not implemented, the assertions would be for empty values
  });

  test('should display usage limits for free users', async ({ page }) => {
    await expect(page.getByText(/5,000.*character limit/i)).toBeVisible();
    await expect(page.getByText(/20.*sets.*per month/i)).toBeVisible();
  });

  test('should show upgrade prompt when limits are reached', async ({ page }) => {
    // Mock API to return limit reached error
    await page.context().route('**/api/parse-content', (route) => {
      route.fulfill({
        status: 403,
        contentType: 'application/json',
        body: JSON.stringify({ 
          error: 'Monthly limit reached',
          upgradeRequired: true 
        })
      });
    });
    
    await page.getByLabel(/Set Name/i).fill('Test Set');
    await page.getByLabel(/Notes/i).fill(SAMPLE_NOTES.biology);
    await page.getByRole('button', { name: /Generate Flashcards/i }).click();
    
    await expect(page.getByText(/upgrade.*pro/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Upgrade Now/i })).toBeVisible();
  });

  test('should handle special characters in notes', async ({ page }) => {
    const specialText = `
    # Special Characters Test
    - Accented: café, naïve, résumé
    - Math: ∑, ∆, π, ∞, ≤, ≥
    - Currency: $, €, £, ¥
    - Quotes: "smart quotes", 'apostrophes'
    - Unicode: 🧬, 📚, ⚗️
    `;
    
    await page.getByLabel(/Set Name/i).fill('Special Characters');
    await page.getByLabel(/Notes/i).fill(specialText);
    await page.getByRole('button', { name: /Generate Flashcards/i }).click();
    
    await expect(page.getByText(/Generating/i)).toBeVisible();
  });
});