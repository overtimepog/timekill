// Import testing libraries
import '@testing-library/jest-dom';
import { afterEach, beforeAll, afterAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { setupServer } from 'msw/node';

// Setup Mock Service Worker
export const server = setupServer();

// Set up global test environment
beforeAll(() => {
  // Start MSW server
  server.listen({ onUnhandledRequest: 'warn' });
  
  // Seed random number generation for deterministic tests
  const mockMath = Object.create(global.Math);
  mockMath.random = vi.fn(() => 0.5);
  global.Math = mockMath;
  
  // Mock fetch globally
  global.fetch = vi.fn();
});

// Clean up after each test
afterEach(() => {
  cleanup();
  server.resetHandlers();
  vi.clearAllMocks();
});

// Clean up after all tests
afterAll(() => {
  server.close();
});
