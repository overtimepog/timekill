#!/usr/bin/env node

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
 * TimeKill Test Runner
 * 
 * This script runs all tests for the TimeKill application.
 * 
 * Usage:
 *   node run_tests.mjs          # Run all tests with normal coverage threshold
 *   node run_tests.mjs --ci-mode # Run all tests with reduced coverage for CI
 * 
 * To install test dependencies:
 *   npm install --save-dev vitest c8 @vitest/coverage-c8 msw @testing-library/react @testing-library/jest-dom
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set testing environment variables
process.env.NODE_ENV = 'test';
process.env.VITEST = 'true';

// Check if running in CI mode
const ciMode = process.argv.includes('--ci-mode');
const coverageThreshold = ciMode ? 80 : 90;

// Create a vitest.config.js file if it doesn't exist
const vitestConfigPath = path.join(__dirname, 'vitest.config.js');
if (!existsSync(vitestConfigPath)) {
  console.log('Creating vitest.config.js file...');
  execSync(`
    cat > ${vitestConfigPath} << EOL
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    include: ['./tests/**/*.test.{js,jsx,ts,tsx}'],
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'tests/**',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/setup.{js,ts}',
      ],
      thresholds: {
        lines: ${coverageThreshold},
        functions: ${coverageThreshold},
        branches: ${coverageThreshold},
        statements: ${coverageThreshold},
      },
    },
  },
});
EOL
  `);
}

// Create a test setup file if it doesn't exist
const setupDir = path.join(__dirname, 'tests');
const setupPath = path.join(setupDir, 'setup.js');
if (!existsSync(setupDir)) {
  mkdirSync(setupDir, { recursive: true });
}
if (!existsSync(setupPath)) {
  console.log('Creating test setup file...');
  execSync(`
    cat > ${setupPath} << EOL
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
EOL
  `);
}

// Define test file paths based on pattern
const testPattern = path.join(__dirname, 'tests', '**', '*.test.{js,jsx,ts,tsx}');

// Check if there are any test files
try {
  const testFiles = execSync(`find ./tests -name "*.test.js" -o -name "*.test.jsx" -o -name "*.test.ts" -o -name "*.test.tsx" | wc -l`, { encoding: 'utf-8' });
  
  if (parseInt(testFiles.trim()) === 0) {
    console.error('No test files found in the ./tests directory!');
    console.error('Please make sure test files are created before running this script.');
    process.exit(1);
  }
} catch (error) {
  console.error('Error checking for test files:', error.message);
  process.exit(1);
}

// Run the tests
try {
  console.log(`Running tests with ${ciMode ? 'CI' : 'normal'} coverage threshold (${coverageThreshold}%)...`);
  
  // Execute all tests with coverage
  execSync(`npx vitest run --coverage`, { stdio: 'inherit' });
  
  console.log('All tests passed successfully!');
  process.exit(0);
} catch (error) {
  console.error('Tests failed:', error.message);
  process.exit(1);
}