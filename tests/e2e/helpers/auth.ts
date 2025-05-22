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

import { Page, BrowserContext } from '@playwright/test';

export interface TestUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  subscription?: 'free' | 'pro';
}

export const TEST_USERS = {
  free: {
    id: 'user_test_free_123',
    email: 'free.user@example.com',
    firstName: 'Free',
    lastName: 'User',
    subscription: 'free' as const,
  },
  pro: {
    id: 'user_test_pro_456',
    email: 'pro.user@example.com',
    firstName: 'Pro',
    lastName: 'User',
    subscription: 'pro' as const,
  },
  anonymous: {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
  },
};

export async function mockClerkAuth(context: BrowserContext, user: TestUser | null = null) {
  if (!user) {
    // Mock anonymous user
    await context.addInitScript(() => {
      (window as any).__CLERK_FRONTEND_API = 'test';
      (window as any).__clerk_ssr_state = { 
        user: null, 
        session: null 
      };
    });
    return;
  }

  // Mock authenticated user
  await context.addInitScript((userData) => {
    (window as any).__CLERK_FRONTEND_API = 'test';
    (window as any).__clerk_ssr_state = {
      user: {
        id: userData.id,
        emailAddresses: [{ emailAddress: userData.email }],
        firstName: userData.firstName,
        lastName: userData.lastName,
      },
      session: {
        id: 'session_test_123',
        user: userData,
      },
    };
  }, user);

  // Set cookies for authenticated state
  await context.addCookies([
    {
      name: '__session',
      value: 'test-session-token',
      domain: 'localhost',
      path: '/',
    },
  ]);
}

export async function loginAs(page: Page, user: TestUser) {
  await mockClerkAuth(page.context(), user);
  await page.goto('/');
  
  // Wait for auth state to be established
  await page.waitForFunction(() => {
    return (window as any).__clerk_ssr_state?.user !== undefined;
  });
}

export async function logout(page: Page) {
  await mockClerkAuth(page.context(), null);
  await page.goto('/');
}