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

import { Page } from '@playwright/test';

/**
 * Discovers all routes in the application by crawling through links
 * @param page - Playwright page instance
 * @returns Array of discovered route paths
 */
export async function collectRoutes(page: Page): Promise<string[]> {
  const visited = new Set<string>();
  const queue: string[] = ['/'];
  
  // Add known static routes
  const staticRoutes = [
    '/',
    '/dashboard',
    '/create',
    '/humanize',
    '/pricing',
    '/settings/profile',
    '/settings/billing',
    '/sign-in',
    '/sign-up',
    '/sign-out'
  ];
  
  staticRoutes.forEach(route => queue.push(route));
  
  while (queue.length > 0) {
    const path = queue.shift()!;
    if (visited.has(path)) continue;
    
    try {
      await page.goto(`http://localhost:3001${path}`, { 
        waitUntil: 'networkidle',
        timeout: 30000
      });
      visited.add(path);
      
      // Extract all internal links
      const hrefs = await page.$$eval('a[href^="/"]:not([target="_blank"])', 
        els => els.map(a => (a as HTMLAnchorElement).getAttribute('href'))
          .filter(Boolean)
          .filter(href => !href!.includes('#'))
      );
      
      hrefs.forEach(href => {
        if (href && !visited.has(href)) {
          queue.push(href);
        }
      });
    } catch (error) {
      console.warn(`Failed to crawl route ${path}:`, error);
    }
  }
  
  return Array.from(visited).sort();
}

/**
 * Gets interactive elements selector for testing
 */
export const getInteractiveSelector = (): string => [
  'button:not([disabled]):not([data-e2e-skip])',
  '[role="button"]:not([disabled]):not([data-e2e-skip])',
  'a[href]:not([href^="#"]):not([data-e2e-skip])',
  'input:not([type="hidden"]):not([disabled]):not([data-e2e-skip])',
  'textarea:not([disabled]):not([data-e2e-skip])',
  'select:not([disabled]):not([data-e2e-skip])',
  '[data-testid]:not([disabled]):not([data-e2e-skip])'
].join(',');