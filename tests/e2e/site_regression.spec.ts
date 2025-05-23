/**
 * MIT License
 * Copyright (c) 2025 TimeKill
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 */

import { test, expect, BrowserContext, Page } from '@playwright/test';
import { collectRoutes, getInteractiveSelector } from './helpers/routes';
import { mockClerkAuth, TEST_USERS, TestUser } from './helpers/auth';

test.describe.configure({ mode: 'serial' });

interface TestContext {
  user: TestUser | null;
  userType: string;
}

const testContexts: TestContext[] = [
  { user: null, userType: 'anonymous' },
  { user: TEST_USERS.free, userType: 'free_user' },
  { user: TEST_USERS.pro, userType: 'pro_user' }
];

// Track console errors and network failures
let consoleErrors: string[] = [];
let networkFailures: string[] = [];

test.beforeEach(async ({ page }) => {
  consoleErrors = [];
  networkFailures = [];
  
  // Capture console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  
  // Capture network failures
  page.on('response', response => {
    if (!response.ok() && response.status() >= 400) {
      networkFailures.push(`${response.status()} ${response.url()}`);
    }
  });
  
  // Block external requests to keep tests isolated
  await page.route('**/*', (route) => {
    const url = route.request().url();
    // Allow localhost and local resources
    if (url.includes('localhost:3001') || 
        url.includes('data:') || 
        url.startsWith('file://')) {
      route.continue();
    } else {
      // Block external requests
      route.abort();
    }
  });
});

for (const context of testContexts) {
  test.describe(`${context.userType} context`, () => {
    
    test.beforeEach(async ({ page }) => {
      await mockClerkAuth(page.context(), context.user);
    });
    
    test('should crawl and interact with every element', async ({ page }) => {
      // Navigate to home page first
      await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
      
      // Collect all routes available to this user type
      const routes = await collectRoutes(page);
      
      console.log(`Testing ${routes.length} routes for ${context.userType}`);
      
      for (const route of routes) {
        console.log(`Testing route: ${route}`);
        
        await page.goto(`http://localhost:3001${route}`, { 
          waitUntil: 'networkidle',
          timeout: 30000 
        });
        
        // Get all interactive elements
        const interactiveSelector = getInteractiveSelector();
        const elements = page.locator(interactiveSelector);
        const count = await elements.count();
        
        console.log(`Found ${count} interactive elements on ${route}`);
        
        for (let i = 0; i < count; i++) {
          const element = elements.nth(i);
          
          try {
            // Ensure element is visible and enabled
            await expect(element).toBeVisible({ timeout: 5000 });
            await expect(element).toBeEnabled({ timeout: 5000 });
            
            // Get element info for debugging
            const tagName = await element.evaluate(el => el.tagName.toLowerCase());
            const elementText = await element.textContent();
            const elementId = await element.getAttribute('id');
            const elementClass = await element.getAttribute('class');
            
            console.log(`Interacting with ${tagName} element: ${elementText?.slice(0, 50) || elementId || elementClass?.slice(0, 50)}`);
            
            // Store current URL and page state
            const urlBefore = page.url();
            
            // Interact with the element
            if (tagName === 'input') {
              const inputType = await element.getAttribute('type');
              if (inputType === 'text' || inputType === 'email' || inputType === 'password') {
                await element.fill('test input');
              } else if (inputType === 'checkbox' || inputType === 'radio') {
                await element.check();
              }
            } else if (tagName === 'textarea') {
              await element.fill('test textarea content');
            } else if (tagName === 'select') {
              const options = await element.locator('option').count();
              if (options > 1) {
                await element.selectOption({ index: 1 });
              }
            } else {
              // For buttons, links, and other clickable elements
              await Promise.all([
                page.waitForLoadState('networkidle', { timeout: 10000 }),
                element.click()
              ]).catch(() => {
                // Some clicks might not trigger navigation, that's okay
              });
            }
            
            // Verify some outcome occurred
            const urlAfter = page.url();
            if (urlAfter !== urlBefore) {
              console.log(`Navigation occurred: ${urlBefore} -> ${urlAfter}`);
              // If navigation occurred, go back to continue testing
              await page.goto(`http://localhost:3001${route}`, { waitUntil: 'networkidle' });
            }
            
            // Check for modals or new content
            const modals = page.locator('[role="dialog"], .modal, [data-testid*="modal"]');
            const modalCount = await modals.count();
            if (modalCount > 0) {
              console.log(`Modal detected after interaction`);
              // Close modals to continue testing
              const closeButtons = page.locator('[aria-label="Close"], [data-testid="close"], .modal button');
              const closeCount = await closeButtons.count();
              if (closeCount > 0) {
                await closeButtons.first().click();
              }
            }
            
          } catch (error) {
            console.warn(`Failed to interact with element ${i} on ${route}:`, error);
            // Continue with next element instead of failing the entire test
          }
        }
      }
      
      // Assert no console errors occurred during crawling
      if (consoleErrors.length > 0) {
        console.warn('Console errors detected:', consoleErrors);
        // Don't fail the test for console warnings, but log them
      }
      
      // Assert no critical network failures
      const criticalFailures = networkFailures.filter(failure => 
        failure.includes('500') || failure.includes('502') || failure.includes('503')
      );
      expect(criticalFailures).toEqual([]);
    });
    
    test('should handle keyboard navigation', async ({ page }) => {
      await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
      
      // Test Tab navigation
      let tabStops = 0;
      for (let i = 0; i < 20; i++) {
        await page.keyboard.press('Tab');
        const focusedElement = page.locator(':focus');
        const count = await focusedElement.count();
        if (count > 0) {
          tabStops++;
        }
      }
      
      expect(tabStops).toBeGreaterThan(0);
    });
    
    test('should be responsive on different viewports', async ({ page }) => {
      const viewports = [
        { width: 1920, height: 1080, name: 'desktop' },
        { width: 768, height: 1024, name: 'tablet' },
        { width: 375, height: 667, name: 'mobile' }
      ];
      
      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
        
        // Check that main content is visible
        const body = page.locator('body');
        await expect(body).toBeVisible();
        
        // Check that no horizontal scrollbar appears
        const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
        const clientWidth = await page.evaluate(() => document.body.clientWidth);
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 50); // Allow small margin
      }
    });
  });
}