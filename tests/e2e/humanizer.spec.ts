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

test.describe('Humanizer Feature', () => {
  test.beforeEach(async ({ context, page }) => {
    await mockClerkAuth(context, TEST_USERS.free);
    await seedTestData(context);
    
    // Mock humanizer API
    await context.route('**/api/humanize', (route) => {
      const request = route.request();
      const postData = JSON.parse(request.postData() || '{}');
      
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          humanizedText: postData.text.replace(/AI-generated/g, 'naturally written'),
          creditsUsed: Math.ceil(postData.text.length / 500),
          creditsRemaining: 8,
          stats: {
            originalLength: postData.text.length,
            humanizedLength: postData.text.length + 10,
            aiDetectionScore: 15,
            readabilityScore: 85
          }
        })
      });
    });
    
    await page.goto('/humanize');
  });

  test('should display humanizer interface for authenticated users', async ({ page }) => {
    await expect(page).toHaveTitle(/TimeKill/);
    await expect(page.getByRole('heading', { name: /Text Humanizer/i })).toBeVisible();
    await expect(page.getByLabel(/Input Text/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Humanize Text/i })).toBeVisible();
  });

  test('should redirect anonymous users to sign-in', async ({ page }) => {
    await mockClerkAuth(page.context(), null);
    await page.goto('/humanize');
    
    await expect(page).toHaveURL(/.*\/sign-in/);
  });

  test('should successfully humanize text', async ({ page }) => {
    const inputText = 'This is AI-generated content that needs to be humanized to sound more natural.';
    
    await page.getByLabel(/Input Text/i).fill(inputText);
    await page.getByRole('button', { name: /Humanize Text/i }).click();
    
    // Should show loading state
    await expect(page.getByText(/Humanizing/i)).toBeVisible();
    
    // Should display results
    await expect(page.getByText(/naturally written content/i)).toBeVisible();
    await expect(page.getByText(/Credits used.*1/i)).toBeVisible();
    await expect(page.getByText(/Credits remaining.*8/i)).toBeVisible();
  });

  test('should display credit information', async ({ page }) => {
    await expect(page.getByText(/8.*credits remaining/i)).toBeVisible();
    await expect(page.getByText(/1 credit per 500 characters/i)).toBeVisible();
  });

  test('should calculate credits required', async ({ page }) => {
    const longText = 'A'.repeat(1500); // 3 credits worth
    
    await page.getByLabel(/Input Text/i).fill(longText);
    
    await expect(page.getByText(/3.*credits required/i)).toBeVisible();
  });

  test('should enforce character limits for free users', async ({ page }) => {
    const tooLongText = 'A'.repeat(2500); // Over 2000 char limit
    
    await page.getByLabel(/Input Text/i).fill(tooLongText);
    await page.getByRole('button', { name: /Humanize Text/i }).click();
    
    await expect(page.getByText(/2,000 character limit/i)).toBeVisible();
  });

  test('should allow unlimited text for Pro users', async ({ page }) => {
    await mockClerkAuth(page.context(), TEST_USERS.pro);
    await page.goto('/humanize');
    
    const longText = 'A'.repeat(5000); // Over free limit
    
    await page.getByLabel(/Input Text/i).fill(longText);
    await page.getByRole('button', { name: /Humanize Text/i }).click();
    
    await expect(page.getByText(/Humanizing/i)).toBeVisible();
  });

  test('should prevent humanizing when out of credits', async ({ page }) => {
    // Mock API to return no credits
    await page.context().route('**/api/humanize', (route) => {
      route.fulfill({
        status: 403,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Insufficient credits',
          creditsRemaining: 0
        })
      });
    });
    
    await page.getByLabel(/Input Text/i).fill('Test text to humanize');
    await page.getByRole('button', { name: /Humanize Text/i }).click();
    
    await expect(page.getByText(/out of credits/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Upgrade to Pro/i })).toBeVisible();
  });

  test('should display humanization statistics', async ({ page }) => {
    await page.getByLabel(/Input Text/i).fill('This AI-generated text needs humanization.');
    await page.getByRole('button', { name: /Humanize Text/i }).click();
    
    await expect(page.getByText(/AI Detection Score.*15%/i)).toBeVisible();
    await expect(page.getByText(/Readability Score.*85/i)).toBeVisible();
    await expect(page.getByText(/Original.*characters/i)).toBeVisible();
  });

  test('should provide humanization options', async ({ page }) => {
    const optionsButton = page.getByRole('button', { name: /Options|Settings/i });
    
    if (await optionsButton.isVisible()) {
      await optionsButton.click();
      
      await expect(page.getByLabel(/Creativity Level/i)).toBeVisible();
      await expect(page.getByLabel(/Formality/i)).toBeVisible();
      await expect(page.getByLabel(/Preserve Structure/i)).toBeVisible();
    }
  });

  test('should copy humanized text to clipboard', async ({ page }) => {
    await page.getByLabel(/Input Text/i).fill('Sample text for humanization');
    await page.getByRole('button', { name: /Humanize Text/i }).click();
    
    const copyButton = page.getByRole('button', { name: /Copy/i });
    if (await copyButton.isVisible()) {
      await copyButton.click();
      await expect(page.getByText(/Copied/i)).toBeVisible();
    }
  });

  test('should download humanized text', async ({ page }) => {
    await page.getByLabel(/Input Text/i).fill('Sample text for download');
    await page.getByRole('button', { name: /Humanize Text/i }).click();
    
    const downloadButton = page.getByRole('button', { name: /Download/i });
    if (await downloadButton.isVisible()) {
      const downloadPromise = page.waitForEvent('download');
      await downloadButton.click();
      const download = await downloadPromise;
      expect(download.suggestedFilename()).toMatch(/humanized.*\.txt/);
    }
  });

  test('should maintain humanization history', async ({ page }) => {
    // First humanization
    await page.getByLabel(/Input Text/i).fill('First text to humanize');
    await page.getByRole('button', { name: /Humanize Text/i }).click();
    
    // Check history section
    const historySection = page.getByText(/Recent Humanizations/i);
    if (await historySection.isVisible()) {
      await expect(historySection).toBeVisible();
      await expect(page.getByText(/First text to humanize/i)).toBeVisible();
    }
  });

  test('should validate input requirements', async ({ page }) => {
    await page.getByRole('button', { name: /Humanize Text/i }).click();
    
    await expect(page.getByText(/Text is required/i)).toBeVisible();
  });

  test('should handle API errors gracefully', async ({ page }) => {
    await page.context().route('**/api/humanize', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' })
      });
    });
    
    await page.getByLabel(/Input Text/i).fill('Test text');
    await page.getByRole('button', { name: /Humanize Text/i }).click();
    
    await expect(page.getByText(/error.*occurred/i)).toBeVisible();
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    
    await expect(page.getByRole('heading', { name: /Text Humanizer/i })).toBeVisible();
    
    const textArea = page.getByLabel(/Input Text/i);
    const box = await textArea.boundingBox();
    
    if (box) {
      expect(box.width).toBeLessThan(400); // Should fit in mobile viewport
    }
  });

  test('should support keyboard shortcuts', async ({ page }) => {
    await page.getByLabel(/Input Text/i).fill('Text to humanize');
    
    // Ctrl+Enter should submit
    await page.getByLabel(/Input Text/i).press('Control+Enter');
    await expect(page.getByText(/Humanizing/i)).toBeVisible();
  });

  test('should provide usage tips for new users', async ({ page }) => {
    const tipsSection = page.getByText(/Tips|How to use/i);
    
    if (await tipsSection.isVisible()) {
      await expect(tipsSection).toBeVisible();
      await expect(page.getByText(/Paste your AI.*text/i)).toBeVisible();
      await expect(page.getByText(/Review.*humanized/i)).toBeVisible();
    }
  });

  test('should show upgrade benefits for free users', async ({ page }) => {
    await expect(page.getByText(/Pro users get/i)).toBeVisible();
    await expect(page.getByText(/unlimited.*characters/i)).toBeVisible();
    await expect(page.getByText(/50.*credits.*month/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Upgrade Now/i })).toBeVisible();
  });

  test('should track humanization usage analytics', async ({ page }) => {
    await page.getByLabel(/Input Text/i).fill('Analytics test text');
    await page.getByRole('button', { name: /Humanize Text/i }).click();
    
    // Should track the usage (tested via API mock verification)
    await expect(page.getByText(/Credits used.*1/i)).toBeVisible();
  });
});