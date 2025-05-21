# TimeKill Automated Test Suite

This document describes how to run and maintain the automated test suite for the TimeKill application.

## Running Tests

### Prerequisites

Before running the tests, make sure you have the necessary dependencies installed:

```bash
npm install --save-dev vitest c8 @vitest/coverage-c8 msw @testing-library/react @testing-library/jest-dom
```

### Running the Test Suite

To run the complete test suite:

```bash
node run_tests.mjs
```

This will execute all tests and report test coverage. The script will fail if coverage falls below the defined threshold (90% by default).

### CI Mode

For running in CI environments with a reduced coverage threshold (80%):

```bash
node run_tests.mjs --ci-mode
```

### Running Individual Tests

To run a specific test file:

```bash
npx vitest run tests/unit/gemini.test.ts
```

To run tests in watch mode during development:

```bash
npx vitest watch
```

## Test Structure

The test suite is organized as follows:

- `/tests/unit/`: Unit tests for individual components and utilities
- `/tests/integration/`: Integration tests for API routes and multi-component interactions
- `/tests/e2e/`: End-to-end tests for complete user flows
- `/tests/helpers/`: Shared test helpers, mocks, and fixtures

## Mock Implementations

Test mocks are centralized in `/tests/helpers/mocks.ts`. These include:

- Mock PrismaClient with stubbed repository methods
- Mock Clerk user authentication
- Mock Redis client
- Mock Stripe client
- Sample test data for notes and pairs

## Adding New Tests

When adding new tests, follow these principles:

1. **Test Isolation**: Each test should be independent and not rely on the state of other tests.
2. **Descriptive Names**: Use clear, descriptive test names that explain what's being tested.
3. **Setup/Teardown**: Use `beforeEach` and `afterEach` hooks for setup and cleanup.
4. **Mocking Dependencies**: Use the provided helpers to mock external dependencies.
5. **Code Coverage**: Ensure all code paths are tested, including error conditions.

### Example Test Structure

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockDependency } from '../helpers/mocks';
import { functionUnderTest } from '../../path/to/function';

describe('Component or function name', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Additional setup
  });

  it('should do something specific under certain conditions', async () => {
    // Arrange: Set up test conditions
    
    // Act: Call the function or component under test
    
    // Assert: Verify expectations
  });
  
  it('should handle error cases appropriately', async () => {
    // Test error handling
  });
});
```

## Coverage Thresholds

The test suite enforces minimum coverage thresholds:

- Normal mode: 90% for lines, functions, branches, and statements
- CI mode: 80% for lines, functions, branches, and statements

## Next Steps for Testing

Here are areas to focus on for future test development:

1. **E2E Testing**: Implement Playwright tests for critical user flows:
   - User authentication flow
   - Note submission and pair generation
   - Study mode interactions
   - Subscription management

2. **Component Testing**: Add tests for React components using React Testing Library:
   - UI components like FlashcardDeck, QuizComponent, and LearnComponent
   - Form components with validation logic
   - Navigation and layout components

3. **API Testing**: Extend API route tests:
   - Test all endpoints including error conditions
   - Test rate limiting behavior
   - Test authentication/authorization correctly restricts access

4. **Performance Testing**: Add benchmark tests for critical functionality:
   - Notes parsing performance
   - Humanizer utility performance
   - Caching effectiveness

5. **Security Testing**: Add tests for security-related functionality:
   - Authentication bypass attempts
   - Authorization restrictions
   - Data validation and sanitization

## Troubleshooting Common Issues

- **Missing Dependencies**: If you encounter errors about missing modules, run `npm install` to update dependencies.
- **Environment Variables**: Tests expect certain environment variables to be defined. Use a `.env.test` file to set testing-specific values.
- **Mocking Problems**: If tests fail due to unexpected mock behavior, check if the mock implementation properly mimics the real dependency.
- **Timeouts**: For tests that involve async operations, you might need to increase the timeout using `vi.setConfig({ testTimeout: 10000 })`.

## Maintaining the Test Suite

As the application evolves:

1. Keep test mocks up-to-date with any changes to external dependencies.
2. Refactor tests when refactoring application code to maintain coverage.
3. Remove obsolete tests to keep the suite efficient.
4. Regularly review the test suite for performance issues and opportunities for improvement.