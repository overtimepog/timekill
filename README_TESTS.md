# TimeKill Comprehensive Test Suite

This document describes the complete automated test suite for the TimeKill application, including unit tests, integration tests, and end-to-end browser automation using Playwright.

## Quick Start

To run the complete test suite:

```bash
./tests.sh
```

This single command will execute all tests, install dependencies, and generate comprehensive reports.

## Test Suite Overview

The test suite includes:

- **Unit Tests**: 90%+ coverage for core functionality
- **Integration Tests**: API route testing with mocked external services  
- **End-to-End Tests**: Full browser automation with Playwright
- **Performance Tests**: Baseline performance monitoring
- **Accessibility Tests**: WCAG compliance verification

## Command Options

### Available Flags

```bash
./tests.sh                 # Run all tests (90% coverage threshold)
./tests.sh --ci-mode       # CI mode (80% coverage, headless browsers)
./tests.sh --skip-ui       # Skip Playwright tests, run only unit/integration
./tests.sh --headed        # Force headed browser mode for debugging
./tests.sh --help          # Show help information
```

### Examples

```bash
# Local development with headed browsers
./tests.sh --headed

# CI/GitHub Actions
./tests.sh --ci-mode

# Quick unit test validation
./tests.sh --skip-ui

# Debug end-to-end issues
./tests.sh --headed --ci-mode=false
```

## Prerequisites

### Node.js Dependencies

The test runner automatically installs required dependencies:

```bash
npm install --save-dev @playwright/test vitest @testing-library/react @testing-library/jest-dom jsdom msw @vitest/coverage-v8
```

### Browser Installation

Playwright browsers are automatically installed on first run:

```bash
npx playwright install --with-deps chromium firefox webkit
```

For manual installation or troubleshooting:

```bash
# Install all browsers
npx playwright install --with-deps

# Install specific browser
npx playwright install chromium

# Install system dependencies (Linux)
npx playwright install-deps
```

## Test Structure

```
/tests/
├── unit/                          # Unit tests (Vitest)
│   ├── api/                       # API route logic
│   │   ├── parse-content.test.ts  # Content parsing tests
│   │   ├── humanize.test.ts       # Text humanizer tests
│   │   └── stripe.test.ts         # Stripe integration tests
│   ├── components/                # React component tests
│   │   ├── pricing-card.test.tsx  # Pricing component tests
│   │   └── navbar.test.tsx        # Navigation tests
│   └── core/                      # Business logic tests
│       ├── gemini.test.ts         # AI integration tests
│       └── humanizer.test.ts      # Text processing tests
├── integration/                   # Integration tests (Vitest)
│   ├── api-parse-notes.test.ts    # Full API workflow tests
│   └── api-stripe.test.ts         # Payment flow tests
├── e2e/                           # End-to-end tests (Playwright)
│   ├── helpers/                   # Test utilities
│   │   ├── auth.ts                # Authentication helpers
│   │   └── fixtures.ts            # Test data and mocks
│   ├── homepage.spec.ts           # Landing page tests
│   ├── pricing.spec.ts            # Pricing page tests
│   ├── create-set.spec.ts         # Study set creation tests
│   ├── study-modes.spec.ts        # Flashcards, quiz, learn mode tests
│   ├── dashboard.spec.ts          # User dashboard tests
│   ├── humanizer.spec.ts          # Text humanizer tests
│   ├── auth.spec.ts               # Authentication flow tests
│   ├── settings.spec.ts           # Settings and billing tests
│   └── artifacts/                 # Generated screenshots, videos
└── helpers/                       # Shared test utilities
    ├── mocks.ts                   # Global mocks and fixtures
    └── types.ts                   # Test type definitions
```

## Test Categories

### Unit Tests (Vitest)

**Coverage Target**: 90% lines, functions, branches, statements

Tests individual functions and components in isolation:

- API route handlers
- React components with React Testing Library
- Business logic functions
- Utility functions
- Error handling and edge cases

**Key Features**:
- Fast execution (<5 seconds total)
- Comprehensive mocking of external dependencies
- Boundary condition testing
- Input validation testing

### Integration Tests (Vitest)

Tests multi-component interactions and data flows:

- Complete API request/response cycles
- Database operations (mocked)
- Authentication flows
- Payment processing workflows
- Cross-service communication

**Key Features**:
- Mock external APIs (Stripe, AI services, Redis)
- Test realistic data flows
- Verify error propagation
- Test rate limiting and usage quotas

### End-to-End Tests (Playwright)

**Browser Coverage**: Chromium, Firefox, WebKit, Mobile (iOS/Android)

Tests complete user journeys in real browsers:

- User authentication and authorization
- Study set creation and management
- All study modes (flashcards, quiz, learn)
- Payment and subscription flows
- Text humanization workflows
- Responsive design across viewports
- Accessibility compliance

**Key Features**:
- Automatic screenshots on failure
- Video recording for debugging
- Network request interception and mocking
- Mobile viewport testing (iPhone, iPad, Android)
- Cross-browser testing (Chromium, Firefox, WebKit)
- Keyboard navigation testing
- Accessibility compliance testing
- Real browser automation with headed/headless modes

## Running Individual Test Types

### Unit Tests Only

```bash
npx vitest run tests/unit
npx vitest run tests/unit --coverage
npx vitest watch tests/unit          # Watch mode for development
```

### Integration Tests Only

```bash
npx vitest run tests/integration
```

### End-to-End Tests Only

```bash
npx playwright test
npx playwright test --headed         # Headed mode (watch browsers)
npx playwright test --project=chromium  # Specific browser only
npx playwright test tests/e2e/homepage.spec.ts  # Specific test file
npx playwright test --grep="authentication"  # Tests matching pattern
npx playwright test --debug          # Interactive debug mode
```

### With Coverage

```bash
npx vitest run --coverage
npx vitest run tests/unit --coverage --reporter=html
```

## Browser Configuration

### Supported Browsers

- **Chromium**: Latest stable (primary)
- **Firefox**: Latest stable
- **WebKit**: Latest stable (Safari engine)
- **Mobile Chrome**: Pixel 5 simulation
- **Mobile Safari**: iPhone 12 simulation

### Viewport Testing

- **Desktop**: 1280×800 (default)
- **Mobile**: 375×667 (iPhone SE)
- **Tablet**: 768×1024 (iPad)
- **Large Desktop**: 1920×1080

### Browser Features Tested

- JavaScript interactions
- Form submissions
- File uploads
- Drag and drop
- Keyboard navigation
- Touch gestures (mobile)
- Local storage
- Session storage
- Clipboard operations

## Mock Strategy

### External Service Mocks

All external dependencies are mocked to ensure:
- Deterministic test results
- Fast execution
- No real API calls or charges
- Isolated testing environment

**Mocked Services**:
- **Stripe**: Payment processing and webhooks
- **Clerk**: User authentication
- **Prisma**: Database operations
- **Redis**: Caching and rate limiting
- **AI Services**: Content generation and humanization
- **Email Services**: Notifications

### Test Data

Realistic test data is provided via fixtures:

```typescript
// Example usage in tests
import { SAMPLE_NOTES, SAMPLE_STUDY_SETS } from './helpers/fixtures';

test('should create study set from biology notes', async ({ page }) => {
  await page.fill('[data-testid="notes-input"]', SAMPLE_NOTES.biology);
  // ... rest of test
});
```

## Coverage Reports

### Unit Test Coverage

Target: **90%** for lines, functions, branches, statements

```bash
# Generate coverage report
npx vitest run --coverage

# View HTML report
open coverage/index.html
```

Coverage exclusions:
- Configuration files
- Test files themselves
- Generated code
- Type definition files
- Development-only code

### End-to-End Coverage

Playwright tests provide **functional coverage** ensuring:
- All user-facing features work
- Critical user journeys complete successfully
- Cross-browser compatibility
- Mobile responsiveness
- Accessibility compliance

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Test Suite
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: ./tests.sh --ci-mode
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: |
            coverage/
            playwright-report/
            tests/e2e/artifacts/
```

### Environment Variables

Required for full test execution:

```bash
# Test environment
NODE_ENV=test
VITEST=true

# Mock configurations (tests use mock values)
STRIPE_SECRET_KEY=sk_test_mock
STRIPE_WEBHOOK_SECRET=whsec_mock
CLERK_SECRET_KEY=sk_test_mock
DATABASE_URL=file:./test.db
REDIS_URL=redis://localhost:6379/15
```

## Troubleshooting

### Common Issues

#### Playwright Browser Installation

**Linux (Ubuntu/Debian)**:
```bash
# Install system dependencies
sudo npx playwright install-deps
npx playwright install
```

**macOS**:
```bash
# Install Homebrew if needed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
npx playwright install
```

**Windows**:
```bash
# Run as Administrator
npx playwright install
```

#### Memory Issues

For large test suites:
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
./tests.sh
```

#### Port Conflicts

If development server port (3000) is occupied:
```bash
# Kill existing processes
npx kill-port 3000
./tests.sh
```

#### Test Timeouts

For slow CI environments:
```bash
# Increase timeouts in playwright.config.ts
export PLAYWRIGHT_TIMEOUT=60000
./tests.sh --ci-mode
```

### Debug Mode

#### Enable Playwright Debug Mode

```bash
# Interactive debug mode
npx playwright test --debug

# Headed mode with slow motion
npx playwright test --headed --slowMo=500

# Specific test with trace
npx playwright test homepage.spec.ts --trace=on
```

#### View Test Reports

```bash
# Playwright HTML report
npx playwright show-report

# Coverage report
open coverage/index.html

# View artifacts
ls -la tests/e2e/artifacts/
```

### Performance Debugging

Monitor test execution times:

```bash
# Verbose test output
npx vitest run --reporter=verbose

# Playwright test timing
npx playwright test --reporter=line,html
```

## Best Practices

### Writing Tests

1. **Descriptive Test Names**: Use clear, specific test names
2. **Arrange-Act-Assert**: Follow AAA pattern
3. **Independent Tests**: Each test should be isolated
4. **Realistic Data**: Use meaningful test data
5. **Error Cases**: Test both success and failure paths

### Test Maintenance

1. **Regular Updates**: Keep tests in sync with features
2. **Flaky Test Resolution**: Fix intermittent failures immediately
3. **Performance Monitoring**: Watch for test execution time increases
4. **Coverage Monitoring**: Maintain high coverage percentages

### Debugging Tips

1. **Use Page Inspector**: `await page.pause()` in Playwright tests
2. **Screenshot on Failure**: Automatically captured in `tests/e2e/artifacts/`
3. **Video Recording**: Available for failed tests
4. **Network Logs**: Monitor API calls in browser tests
5. **Console Logs**: Check for JavaScript errors

## Contributing

When adding new features:

1. **Write Tests First**: TDD approach recommended
2. **Update Documentation**: Keep this README current
3. **Test Multiple Browsers**: Verify cross-browser compatibility
4. **Mobile Testing**: Test responsive behavior
5. **Accessibility**: Include a11y tests for new UI features

## Performance Benchmarks

### Expected Execution Times

- **Unit Tests**: <10 seconds
- **Integration Tests**: <30 seconds  
- **End-to-End Tests**: <8 minutes (headed), <5 minutes (headless)
- **Total Suite**: <10 minutes (with full browser matrix)
- **Single Browser E2E**: <3 minutes (Chromium only)

### Optimization Tips

- Run unit tests first (fail fast)
- Use `--skip-ui` for rapid iteration
- Parallelize tests in CI with multiple workers
- Cache `node_modules` and browser binaries
- Use headed mode only for debugging

## Reporting Issues

For test-related issues:

1. **Check Logs**: Review console output and artifacts
2. **Reproduce Locally**: Verify issue outside CI
3. **Provide Context**: Include environment details
4. **Share Artifacts**: Include screenshots, videos, logs
5. **Minimal Reproduction**: Create simplified test case

## Advanced Configuration

### Custom Test Runners

For specialized testing needs, extend the base configuration:

```typescript
// vitest.config.custom.ts
import { defineConfig } from 'vitest/config';
import baseConfig from './vitest.config.mjs';

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    // Custom configurations
    timeout: 30000,
    testTimeout: 60000,
  },
});
```

### Playwright Extensions

```typescript
// playwright.config.custom.ts
import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

export default defineConfig({
  ...baseConfig,
  projects: [
    ...baseConfig.projects,
    {
      name: 'custom-browser',
      use: { /* custom browser settings */ },
    },
  ],
});
```

## Complete Test Coverage

The TimeKill test suite now provides **comprehensive coverage** across all application layers:

### 🧪 Unit Tests (90%+ Coverage)
- **API Routes**: All endpoints tested with edge cases
- **Business Logic**: Core functions with boundary testing
- **Authentication**: User sync, permissions, and session handling
- **Data Processing**: Content parsing and humanization logic
- **Error Handling**: Graceful failure scenarios

### 🔗 Integration Tests
- **End-to-End API Workflows**: Complete request/response cycles
- **Database Operations**: Mocked Prisma interactions
- **External Service Integration**: Stripe, Clerk, AI services
- **Cross-Component Communication**: Data flow validation

### 🎭 End-to-End Browser Tests
- **Complete User Journeys**: From sign-up to study completion
- **Cross-Browser Compatibility**: Chromium, Firefox, WebKit
- **Mobile Responsiveness**: iPhone, iPad, Android viewports
- **Accessibility Compliance**: WCAG guidelines
- **Real User Interactions**: Clicks, forms, navigation
- **Payment Flows**: Stripe checkout and billing
- **Study Mode Testing**: Flashcards, quizzes, adaptive learning

### 🔍 Test Categories Covered
- **Authentication & Authorization**: Sign-in, sign-up, permissions
- **Study Set Management**: Creation, editing, deletion
- **Learning Modes**: All study types with progress tracking
- **Payment Processing**: Subscriptions and billing management
- **Text Humanization**: AI text processing workflows
- **Settings & Preferences**: User configuration options
- **Error States**: Network failures, rate limits, validation errors
- **Performance**: Load testing and response time validation

This comprehensive test suite ensures high-quality, reliable software delivery with confidence in every release.