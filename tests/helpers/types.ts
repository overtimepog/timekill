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

/**
 * Type definitions for test files
 */

import { Mock } from 'vitest';

// Mock Clerk user types
export interface ClerkUser {
  id: string;
  emailAddresses: Array<{ emailAddress: string }>;
  [key: string]: unknown;
}

// Redis client types
export interface MockRedisClient {
  get: Mock;
  set: Mock;
  incr: Mock;
  expire: Mock;
  del: Mock;
}

// Global fetch mock type
export interface MockFetchResponse {
  ok: boolean;
  json: () => Promise<unknown>;
  [key: string]: unknown;
}

// API request types
export interface ParseNotesRequest {
  notes: string;
  language?: string;
  maxPairs?: number;
}

// Pair type
export interface Pair {
  id: string;
  term: string;
  definition: string;
  question: string;
  answer: string;
  order: number;
}

// GeminiOptions type
export interface GeminiOptions {
  language?: string;
  maxPairs?: number;
  _mockRedisClient?: MockRedisClient;
  _mockRateLimit?: number;
  _mockApiError?: boolean;
}

// HumanizerOptions type
export interface HumanizerOptions {
  _mockRedisClient?: MockRedisClient;
  _mockPrismaClient?: unknown;
}