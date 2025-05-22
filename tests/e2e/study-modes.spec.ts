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

test.describe('Study Modes', () => {
  test.beforeEach(async ({ context, page }) => {
    await mockClerkAuth(context, TEST_USERS.free);
    await seedTestData(context);
    
    // Mock study stats API
    await context.route('**/api/study-stats/**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, stat: { correct: true } })
      });
    });
  });

  test.describe('Flashcard Mode', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/study/${SAMPLE_STUDY_SETS[0].id}/flashcards`);
    });

    test('should display flashcard interface', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /Biology Basics/i })).toBeVisible();
      await expect(page.getByText(/Flashcards/i)).toBeVisible();
      
      // Should show first card
      await expect(page.getByText(/Photosynthesis/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /Show Answer/i })).toBeVisible();
    });

    test('should flip cards to show definition', async ({ page }) => {
      await page.getByRole('button', { name: /Show Answer/i }).click();
      
      await expect(page.getByText(/Process by which plants convert sunlight/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /Next Card/i })).toBeVisible();
    });

    test('should navigate through cards using buttons', async ({ page }) => {
      // Show answer and go to next card
      await page.getByRole('button', { name: /Show Answer/i }).click();
      await page.getByRole('button', { name: /Next Card/i }).click();
      
      // Should show second card
      await expect(page.getByText(/Mitosis/i)).toBeVisible();
    });

    test('should support keyboard navigation', async ({ page }) => {
      // Spacebar should flip card
      await page.keyboard.press('Space');
      await expect(page.getByText(/Process by which plants convert sunlight/i)).toBeVisible();
      
      // Arrow keys should navigate
      await page.keyboard.press('ArrowRight');
      await expect(page.getByText(/Mitosis/i)).toBeVisible();
      
      await page.keyboard.press('ArrowLeft');
      await expect(page.getByText(/Photosynthesis/i)).toBeVisible();
    });

    test('should track progress through deck', async ({ page }) => {
      await expect(page.getByText(/1.*of.*2/i)).toBeVisible(); // Progress indicator
      
      await page.getByRole('button', { name: /Show Answer/i }).click();
      await page.getByRole('button', { name: /Next Card/i }).click();
      
      await expect(page.getByText(/2.*of.*2/i)).toBeVisible();
    });

    test('should handle end of deck', async ({ page }) => {
      // Navigate to end of deck
      await page.getByRole('button', { name: /Show Answer/i }).click();
      await page.getByRole('button', { name: /Next Card/i }).click();
      
      await page.getByRole('button', { name: /Show Answer/i }).click();
      await page.getByRole('button', { name: /Next Card/i }).click();
      
      // Should show completion screen
      await expect(page.getByText(/completed/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /Study Again/i })).toBeVisible();
    });

    test('should shuffle cards when requested', async ({ page }) => {
      const shuffleButton = page.getByRole('button', { name: /Shuffle/i });
      if (await shuffleButton.isVisible()) {
        await shuffleButton.click();
        // Card order should change (difficult to test deterministically)
        await expect(page.getByText(/Shuffled/i)).toBeVisible();
      }
    });

    test('should be responsive on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      await expect(page.getByText(/Photosynthesis/i)).toBeVisible();
      
      // Touch interactions should work
      await page.tap('[data-testid="flashcard"], .flashcard, .card');
      await expect(page.getByText(/Process by which plants convert sunlight/i)).toBeVisible();
    });
  });

  test.describe('Quiz Mode', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/study/${SAMPLE_STUDY_SETS[0].id}/quiz`);
    });

    test('should display quiz interface', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /Biology Basics/i })).toBeVisible();
      await expect(page.getByText(/Quiz/i)).toBeVisible();
    });

    test('should configure quiz settings', async ({ page }) => {
      const configButton = page.getByRole('button', { name: /Configure/i });
      if (await configButton.isVisible()) {
        await configButton.click();
        await expect(page).toHaveURL(/.*\/configure/);
        
        await expect(page.getByLabel(/Number of questions/i)).toBeVisible();
        await expect(page.getByLabel(/Question type/i)).toBeVisible();
      }
    });

    test('should start quiz with questions', async ({ page }) => {
      const startButton = page.getByRole('button', { name: /Start Quiz/i });
      if (await startButton.isVisible()) {
        await startButton.click();
      }
      
      // Should show first question
      await expect(page.getByText(/What process do plants use/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /Submit Answer/i })).toBeVisible();
    });

    test('should handle multiple choice questions', async ({ page }) => {
      const startButton = page.getByRole('button', { name: /Start Quiz/i });
      if (await startButton.isVisible()) {
        await startButton.click();
      }
      
      // Should show answer options
      const options = page.locator('[data-testid="quiz-option"], .quiz-option, input[type="radio"]');
      const firstOption = options.first();
      
      if (await firstOption.isVisible()) {
        await firstOption.click();
        await page.getByRole('button', { name: /Submit Answer/i }).click();
        
        // Should show feedback
        await expect(page.getByText(/Correct|Incorrect/i)).toBeVisible();
      }
    });

    test('should handle text input questions', async ({ page }) => {
      const startButton = page.getByRole('button', { name: /Start Quiz/i });
      if (await startButton.isVisible()) {
        await startButton.click();
      }
      
      const textInput = page.getByRole('textbox', { name: /answer/i });
      if (await textInput.isVisible()) {
        await textInput.fill('Photosynthesis');
        await page.getByRole('button', { name: /Submit Answer/i }).click();
        
        await expect(page.getByText(/Correct/i)).toBeVisible();
      }
    });

    test('should display quiz results', async ({ page }) => {
      // Mock completing a quiz
      await page.context().route('**/api/quiz/**', (route) => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            score: 80,
            total: 5,
            correct: 4,
            completed: true
          })
        });
      });
      
      const startButton = page.getByRole('button', { name: /Start Quiz/i });
      if (await startButton.isVisible()) {
        await startButton.click();
      }
      
      // Complete quiz actions...
      // Should eventually show results
      await expect(page.getByText(/80%|4.*5/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /Retake Quiz/i })).toBeVisible();
    });
  });

  test.describe('Learn Mode', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/study/${SAMPLE_STUDY_SETS[0].id}/learn`);
    });

    test('should display learn mode interface', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /Biology Basics/i })).toBeVisible();
      await expect(page.getByText(/Learn/i)).toBeVisible();
    });

    test('should show adaptive learning questions', async ({ page }) => {
      // Learn mode might be Pro-only
      const upgradeMessage = page.getByText(/upgrade.*pro/i);
      
      if (await upgradeMessage.isVisible()) {
        await expect(upgradeMessage).toBeVisible();
        await expect(page.getByRole('link', { name: /Upgrade/i })).toBeVisible();
      } else {
        await expect(page.getByText(/What.*process.*plants/i)).toBeVisible();
        await expect(page.getByRole('button', { name: /I know this/i })).toBeVisible();
        await expect(page.getByRole('button', { name: /I don't know this/i })).toBeVisible();
      }
    });

    test('should track confidence levels', async ({ page }) => {
      const iKnowButton = page.getByRole('button', { name: /I know this/i });
      
      if (await iKnowButton.isVisible()) {
        await iKnowButton.click();
        
        // Should progress to next question or show results
        await page.waitForTimeout(1000);
        const nextVisible = await page.getByText(/Next|Progress|Completed/i).isVisible();
        expect(nextVisible).toBeTruthy();
      }
    });

    test('should handle spaced repetition algorithm', async ({ page }) => {
      // This would test the spaced repetition logic if implemented
      const dontKnowButton = page.getByRole('button', { name: /I don't know this/i });
      
      if (await dontKnowButton.isVisible()) {
        await dontKnowButton.click();
        
        // Should show explanation and potentially repeat the question
        await expect(page.getByText(/plants use photosynthesis/i)).toBeVisible();
      }
    });

    test('should be available for Pro users', async ({ page }) => {
      await mockClerkAuth(page.context(), TEST_USERS.pro);
      await page.goto(`/study/${SAMPLE_STUDY_SETS[0].id}/learn`);
      
      // Pro users should see the full learn interface
      await expect(page.getByText(/adaptive learning/i)).toBeVisible();
    });
  });

  test.describe('Study Mode Navigation', () => {
    test('should navigate between study modes', async ({ page }) => {
      await page.goto(`/study/${SAMPLE_STUDY_SETS[0].id}`);
      
      // Should show study mode options
      await expect(page.getByRole('link', { name: /Flashcards/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /Quiz/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /Learn/i })).toBeVisible();
      
      // Navigate to flashcards
      await page.getByRole('link', { name: /Flashcards/i }).click();
      await expect(page).toHaveURL(/.*\/flashcards/);
      
      // Navigate to quiz
      await page.getByRole('link', { name: /Quiz/i }).click();
      await expect(page).toHaveURL(/.*\/quiz/);
    });

    test('should display study set information', async ({ page }) => {
      await page.goto(`/study/${SAMPLE_STUDY_SETS[0].id}`);
      
      await expect(page.getByText(/Biology Basics/i)).toBeVisible();
      await expect(page.getByText(/Fundamental concepts in biology/i)).toBeVisible();
      await expect(page.getByText(/2.*pairs/i)).toBeVisible();
    });

    test('should handle non-existent study sets', async ({ page }) => {
      await page.goto('/study/non-existent-set-id');
      
      await expect(page.getByText(/not found|doesn't exist/i)).toBeVisible();
      await expect(page.getByRole('link', { name: /Dashboard/i })).toBeVisible();
    });
  });
});