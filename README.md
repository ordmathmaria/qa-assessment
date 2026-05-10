# QA Assessment - SauceDemo E2E Tests

## Cómo Ejecutar los Tests Localmente

This project contains end-to-end tests for the **SauceDemo** application using **Playwright**.

---

## Prerequisites

- **Node.js** >= 18 (LTS recommended)
- **npm** >= 9
- Internet connection (tests run against https://www.saucedemo.com)

---

## Installation

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `@playwright/test` - E2E testing framework
- `@types/node` - TypeScript types for Node.js

### 2. Install Playwright Browsers

```bash
npx playwright install
```

Or with system dependencies:

```bash
npx playwright install --with-deps
```

---

## Running Tests

### Run All Tests (Headless)

```bash
npm test
```

**Output:**
- Terminal report with test results
- HTML report generated in `playwright-report/`

### Run Tests in UI Mode (Recommended for Development)

```bash
npm run test:ui
```

This opens the Playwright Test UI where you can:
- See each test step by step
- Take screenshots
- Inspect elements
- Debug issues interactively

### Run Tests with Browser Visible

```bash
npm run test:headed
```

Tests run with visible browser window so you can see what's happening.

### Run Tests in Debug Mode

```bash
npm run test:debug
```

Opens Playwright Inspector for step-by-step debugging.

---

## Viewing Test Reports

### View HTML Report

```bash
npm run test:report
```

Opens the interactive HTML report in your default browser showing:
- Test timeline
- Each test step
- Screenshots on failure
- Videos on failure (if enabled)
- Full execution traces

---

## Running Specific Tests

### Run a Single Test File

```bash
npx playwright test tests/e2e/login.spec.ts
```

### Run Tests Matching a Pattern

```bash
npx playwright test --grep "Login"
```

### Run a Specific Test Case

```bash
npx playwright test -g "TC-FE-001"
```

---

## Test Structure

```
tests/
├── e2e/                          # Test specifications
│   ├── login.spec.ts            # Authentication tests (3 tests)
│   ├── checkout.spec.ts         # Purchase flow tests (2 tests)
│   └── security.spec.ts         # Security tests (1 test)
├── pages/                        # Page Object Models
│   ├── LoginPage.ts             # Login page interactions
│   ├── InventoryPage.ts         # Products page interactions
│   ├── CartPage.ts              # Shopping cart interactions
│   └── CheckoutPage.ts          # Checkout form interactions
└── data/                        # Test data
    └── testData.ts              # Centralized test data & credentials
```

---

## Test Cases Implemented

| Test File | Count | Test Cases |
|-----------|-------|-----------|
| `login.spec.ts` | 3 | TC-FE-001, TC-FE-002, TC-FE-004 |
| `checkout.spec.ts` | 2 | TC-INT-001, TC-EDGE-002 |
| `security.spec.ts` | 1 | TC-SEC-001 |
| **TOTAL** | **6** | |

### Test Descriptions

#### Authentication (3 tests)
- **TC-FE-001:** Standard user logs in successfully
- **TC-FE-002:** Invalid credentials show error message
- **TC-FE-004:** Locked user cannot log in

#### Purchase Flow (2 tests)
- **TC-INT-001:** Complete purchase from login to confirmation
- **TC-EDGE-002:** Checkout works with special characters

#### Security (1 test)
- **TC-SEC-001:** SQL injection payload is blocked

---

## SauceDemo Credentials

All credentials use password: `secret_sauce`

| Username | Description | Used in Tests |
|----------|-------------|---------------|
| `standard_user` | Normal user - all features work | Yes - All tests |
| `locked_out_user` | Account locked out | Yes - TC-FE-004 |
| `problem_user` | Broken images & form behavior | No - Not in current tests |
| `performance_glitch_user` | Slow responses | No - Not in current tests |
| `error_user` | Triggers errors | No - Not in current tests |
| `visual_user` | Visual inconsistencies | No - Not in current tests |

---

## Configuration

### Playwright Config (`playwright.config.ts`)

Key settings:

```typescript
{
  testDir: './tests',                          // Test location
  baseURL: 'https://www.saucedemo.com',       // Base URL
  timeout: 30 * 1000,                         // Test timeout: 30s
  reporter: ['html'],                         // HTML report
  use: {
    screenshot: 'only-on-failure',            // Screenshots only on failure
    video: 'retain-on-failure',               // Videos only on failure
    trace: 'on-first-retry',                  // Trace on first retry
  },
  projects: [
    { name: 'chromium' }                      // Only Chromium browser
  ]
}
```

### Environment Variables (Optional)

You can override test data via environment variables:

```bash
# Run with custom user
STANDARD_USER=custom_user npm test

# Or with multiple variables
STANDARD_USER=user1 USER_PASSWORD=pass1 npm test
```

---

## Troubleshooting

### Problem: Tests fail with "Playwright not found"

**Solution:**
```bash
npx playwright install --with-deps
```

### Problem: "Error: Playwright Test did not expect test.describe()"

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npx playwright install --with-deps
```

### Problem: Tests time out or are very slow

**Possible causes:**
- SauceDemo server is slow
- Internet connection issue
- Too many tests running in parallel

**Solution:**
```bash
# Run with single worker (slower but more stable)
npx playwright test --workers=1

# Increase timeout (in playwright.config.ts)
timeout: 60 * 1000  // 60 seconds
```

### Problem: "Connection refused" when running tests

**Cause:** SauceDemo might be temporarily down

**Verify:**
- Open https://www.saucedemo.com in your browser
- If it loads, check your internet connection
- Check firewall/proxy settings

---

## Test Results

### Console Output

```
TC-FE-001: Standard User Successful Login PASS 2s
TC-FE-002: Invalid Credentials Login PASS 1s
TC-FE-004: Locked User Login PASS 1s
TC-INT-001: Standard user completes purchase PASS 5s
TC-EDGE-002: Special characters in checkout PASS 4s
TC-SEC-001: SQL Injection Protection on Login PASS 1s

6 passed (14s)
```

### HTML Report

After tests complete:
```bash
npm run test:report
```

Opens interactive report with:
- Test timeline
- Pass/fail status
- Execution time
- Screenshots (on failure)
- Videos (on failure)
- Full traces (on retry)

---

## CI/CD Integration

Tests automatically run on:
- **Push to `main` branch**
- **Pull requests**

See `.github/workflows/e2e-tests.yml` for CI configuration.

### Download CI Artifacts

After CI run completes:
1. Go to GitHub Actions tab
2. Click on workflow run
3. Scroll to "Artifacts" section
4. Download:
   - `playwright-report` - HTML test report
   - `test-results` - Screenshots, videos, traces

---

## Page Object Pattern

Tests use the **Page Object Model** pattern for maintainability:

```typescript
// GOOD: Using Page Objects
const loginPage = new LoginPage(page);
await loginPage.login('user', 'pass');

// BAD: Direct selectors (avoid)
await page.locator('[data-test="username"]').fill('user');
```

### Benefits:
- Changes to selectors = 1 place to update
- Readable and semantic test code
- Easy to maintain and scale
- Reusable across multiple tests

---

## Learning Resources

### Playwright Documentation
- [Official Docs](https://playwright.dev/)
- [API Reference](https://playwright.dev/docs/api/class-test)
- [Best Practices](https://playwright.dev/docs/best-practices)

### Page Object Model
- [Playwright POM Guide](https://playwright.dev/docs/pom)
- [Best Practices](https://testingwithplaywright.com/page-object-model/)

### Test Organization
- `tests/e2e/` - Test specifications (what to test)
- `tests/pages/` - Page objects (how to interact)
- `tests/data/` - Test data (what data to use)

---

## Notes

### Test Independence

Each test:
- Has its own setup via `beforeEach()`
- Can run independently (no test order dependency)
- Cleans up after itself
- Uses no hard-coded waits (only smart waits)

### Selectors Strategy

All selectors use `data-test` attributes:
```typescript
page.locator('[data-test="username"]')  // Stable
page.locator('.user-input')             // Fragile (CSS can change)
```

### Wait Strategy

Smart waits using Playwright's built-in:
```typescript
await page.waitForURL('**/inventory.html')  // Wait for navigation
await element.waitFor({ state: 'visible' }) // Wait for element
```

No hard-coded sleeps like:
```typescript
await page.waitForTimeout(1000)  // AVOID
```

---

## Next Steps

1. **Install dependencies:**
   ```bash
   npm install && npx playwright install --with-deps
   ```

2. **Run tests locally:**
   ```bash
   npm test
   ```

3. **View results:**
   ```bash
   npm run test:report
   ```

4. **Explore code:**
   - Check `tests/e2e/` for test specs
   - Check `tests/pages/` for Page Objects
   - Check `TEST_PLAN.md` for test strategy

---

## Support

If tests fail:

1. Check `TEST_PLAN.md` for test description
2. Check `BUG_REPORT.md` for known issues
3. View HTML report: `npm run test:report`
4. Check console output for error messages
5. Try running in UI mode: `npm run test:ui`

---

## Additional Documentation

- **`TEST_PLAN.md`** - Test strategy, risk assessment, 12 test cases
- **`BUG_REPORT.md`** - 2 detailed bug reports found during testing
- **`.github/workflows/e2e-tests.yml`** - CI/CD workflow configuration
- **`playwright.config.ts`** - Playwright configuration

---

## Author

QA Engineer Assessment - Psynth  
Generated: May 2026

---

## Quick Reference

| Task | Command |
|------|---------|
| Install | `npm install && npx playwright install --with-deps` |
| Run all tests | `npm test` |
| Run with UI | `npm run test:ui` |
| Run with browser visible | `npm run test:headed` |
| Debug mode | `npm run test:debug` |
| View report | `npm run test:report` |
| Run single file | `npx playwright test tests/e2e/login.spec.ts` |
| Run matching pattern | `npx playwright test --grep "Login"` |

---

End of README
