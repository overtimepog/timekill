#!/bin/bash

# MIT License
#
# Copyright (c) 2025 TimeKill
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

set -e

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Parse command line arguments
CI_MODE=false
SKIP_UI=false
HEADED=false
HELP=false

for arg in "$@"; do
    case $arg in
        --ci-mode)
            CI_MODE=true
            shift
            ;;
        --skip-ui)
            SKIP_UI=true
            shift
            ;;
        --headed)
            HEADED=true
            shift
            ;;
        --help)
            HELP=true
            shift
            ;;
        *)
            echo -e "${RED}Unknown option: $arg${NC}"
            HELP=true
            ;;
    esac
done

if [ "$HELP" = true ]; then
    echo "TimeKill Test Runner"
    echo ""
    echo "Usage: ./tests.sh [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --ci-mode     Run in CI mode (headless browsers, 80% coverage threshold)"
    echo "  --skip-ui     Skip Playwright end-to-end tests"
    echo "  --headed      Force headed browser mode (even in CI)"
    echo "  --help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./tests.sh                 # Run all tests with normal coverage (90%)"
    echo "  ./tests.sh --ci-mode       # Run all tests in CI mode (80% coverage, headless)"
    echo "  ./tests.sh --skip-ui       # Run only unit and integration tests"
    echo "  ./tests.sh --headed        # Force headed browser for debugging"
    exit 0
fi

echo -e "${BLUE}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                     TimeKill Test Suite                      ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Set environment variables
export NODE_ENV=test
export VITEST=true

# Determine coverage threshold
if [ "$CI_MODE" = true ]; then
    COVERAGE_THRESHOLD=80
    echo -e "${YELLOW}Running in CI mode (coverage threshold: ${COVERAGE_THRESHOLD}%)${NC}"
else
    COVERAGE_THRESHOLD=90
    echo -e "${GREEN}Running in normal mode (coverage threshold: ${COVERAGE_THRESHOLD}%)${NC}"
fi

# Create test artifacts directory
mkdir -p tests/e2e/artifacts

echo ""
echo -e "${BLUE}📋 Pre-flight checks...${NC}"

# Check if package.json exists and install dependencies if needed
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ package.json not found${NC}"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
fi

# Install Playwright if not already installed
if [ ! -d "node_modules/@playwright/test" ]; then
    echo -e "${YELLOW}🎭 Installing Playwright...${NC}"
    npm install --save-dev @playwright/test
fi

# Install Playwright browsers if needed (and not skipping UI tests)
if [ "$SKIP_UI" = false ]; then
    echo -e "${YELLOW}🌐 Checking Playwright browsers...${NC}"
    
    # Check if browsers are installed
    if npx playwright install --dry-run > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Playwright browsers already installed${NC}"
    else
        echo -e "${YELLOW}Installing Playwright browsers (this may take a few minutes)...${NC}"
        if ! npx playwright install --with-deps; then
            echo -e "${RED}❌ Failed to install Playwright browsers${NC}"
            echo -e "${YELLOW}Trying to install without system dependencies...${NC}"
            npx playwright install chromium firefox webkit
        fi
    fi
fi

# Check for required test files
if [ ! -d "tests" ]; then
    echo -e "${RED}❌ Tests directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Pre-flight checks complete${NC}"
echo ""

# Start test execution
echo -e "${BLUE}🧪 Running test suite...${NC}"
echo ""

# Track overall test status
TEST_EXIT_CODE=0

# Function to handle test failure
handle_test_failure() {
    local test_type=$1
    local exit_code=$2
    echo -e "${RED}❌ ${test_type} tests failed (exit code: ${exit_code})${NC}"
    TEST_EXIT_CODE=$exit_code
}

# 1. Run unit tests
echo -e "${BLUE}🔬 Running unit tests...${NC}"
if ! npx vitest run tests/unit --coverage.enabled=true --coverage.thresholds.lines=$COVERAGE_THRESHOLD --coverage.thresholds.functions=$COVERAGE_THRESHOLD --coverage.thresholds.branches=$COVERAGE_THRESHOLD --coverage.thresholds.statements=$COVERAGE_THRESHOLD; then
    handle_test_failure "Unit" $?
fi
echo ""

# 2. Run integration tests
echo -e "${BLUE}🔗 Running integration tests...${NC}"
if ! npx vitest run tests/integration; then
    handle_test_failure "Integration" $?
fi
echo ""

# 3. Run Playwright tests (unless skipped)
if [ "$SKIP_UI" = false ]; then
    echo -e "${BLUE}🎭 Running end-to-end tests with Playwright...${NC}"
    
    # Determine browser mode
    if [ "$CI_MODE" = true ] && [ "$HEADED" = false ]; then
        BROWSER_MODE="--headed=false"
        echo -e "${YELLOW}Running in headless mode${NC}"
    else
        BROWSER_MODE="--headed=true"
        echo -e "${YELLOW}Running in headed mode${NC}"
    fi
    
    # Run Playwright tests with proper configuration
    PLAYWRIGHT_CMD="npx playwright test $BROWSER_MODE --reporter=html,line --output-dir=tests/e2e/artifacts"
    
    if ! $PLAYWRIGHT_CMD; then
        handle_test_failure "End-to-end" $?
    else
        echo -e "${GREEN}✓ End-to-end tests completed successfully${NC}"
        
        # Generate and display report path
        REPORT_PATH="$(pwd)/playwright-report/index.html"
        if [ -f "$REPORT_PATH" ]; then
            echo -e "${BLUE}📊 Playwright HTML report: file://${REPORT_PATH}${NC}"
        fi
    fi
    echo ""
else
    echo -e "${YELLOW}⏭️  Skipping end-to-end tests (--skip-ui flag)${NC}"
    echo ""
fi

# 4. Display coverage information
echo -e "${BLUE}📊 Test Coverage Summary${NC}"
if [ -f "coverage/index.html" ]; then
    COVERAGE_PATH="$(pwd)/coverage/index.html"
    echo -e "${GREEN}Coverage report: file://${COVERAGE_PATH}${NC}"
fi

# Final status
echo ""
echo -e "${BLUE}╔═══════════════════════════════════════════════════════════════╗${NC}"
if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo -e "${BLUE}║${GREEN}                    ✅ ALL TESTS PASSED                       ${BLUE}║${NC}"
else
    echo -e "${BLUE}║${RED}                    ❌ SOME TESTS FAILED                      ${BLUE}║${NC}"
fi
echo -e "${BLUE}╚═══════════════════════════════════════════════════════════════╝${NC}"

# Exit with appropriate code
exit $TEST_EXIT_CODE