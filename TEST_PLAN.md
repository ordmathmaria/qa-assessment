# TEST PLAN - SauceDemo
**Version 1.0 | QA Engineer**

---

## 1. SCOPE

**Pages Covered**: Login, Inventory, Cart, Checkout (Steps 1 & 2)

**Flows Included**:
- Authentication (successful/failed)
- Product selection
- Complete purchase process
- Security validation and sensitive data handling

**Justification**: Critical path coverage in 2-3 hours, prioritized on core functionality and critical security risks.

---

## 2. TEST CASES (12 PRIORITIZED CASES)

### FRONT-END (4 cases)

1. TC-FE-001 - Standard user logs in with valid credentials - P0 - 5 min
2. TC-FE-002 - User attempts to log in with invalid credentials - P1 - 4 min
3. TC-FE-003 - Problem_user navigates inventory and adds products to cart - P1 - 8 min
4. TC-EDGE-004 - Locked user (locked_out_user) attempts to log in - P0 - 5 min

### API / BACKEND (2 cases)

1. TC-API-001 - System processes authentication request with valid credentials - P0 - 8 min
2. TC-API-002 - System calculates purchase total including taxes - P1 - 12 min

### INTEGRATION (2 cases)

1. TC-INT-001 - Standard user completes purchase from login to confirmation - P0 - 15 min
2. TC-INT-002 - Standard_user and problem_user complete same purchase flow - P1 - 18 min

### SECURITY (2 cases)

1. TC-SEC-001 - User attempts to inject SQL code in login field - P0 - 7 min
2. TC-SEC-002 - User completes purchase and system validates secure PII transmission - P1 - 10 min

### EDGE CASES (2 cases)

1. TC-EDGE-001 - User attempts to add 100+ products to cart - P2 - 12 min
2. TC-EDGE-002 - User completes checkout form with special characters - P1 - 8 min

**TOTAL**: 12 cases | **Estimated Time**: 140-160 minutes (~2.5 hours pure execution)

---

## 3. OUT OF SCOPE

1. **Load/Performance Testing** - Requires 1-2 hours setup only
2. **Exhaustive Multi-Browser Compatibility** - 45+ minutes of testing
3. **Disaster Recovery (DR)** - Requires infrastructure access
4. **Complete WCAG 2.1 Accessibility** - 2 hours for audit alone
5. **Real Payment Gateway Integration** - N/A for demo app
6. **In-Depth Database Testing** - Requires direct DB access
7. **Automated Security Fuzzing** - Requires tools + extensive setup
8. **Exhaustive Regression** - Requires multiple versions deployed

**Time Savings**: These exclusions allow 12 cases in 2.5 hours vs. 5-6 hours if included.

---

## 4. RISK ASSESSMENT

### Risk Priority Matrix

1. Weak authentication / unauthorized access - HIGH - CRITICAL - RED - TC-FE-002, TC-FE-004, TC-API-001
2. PII data exposure (GDPR/HIPAA) - HIGH - CRITICAL - RED - TC-SEC-002
3. SQL Injection / XSS in inputs - MEDIUM - CRITICAL - RED - TC-SEC-001
4. Incorrect calculations (totals/taxes) - MEDIUM - HIGH - ORANGE - TC-API-002, TC-INT-001
5. Data loss between pages - MEDIUM - HIGH - ORANGE - TC-INT-001, TC-INT-002
6. Insufficient input validation - MEDIUM - MEDIUM - YELLOW - TC-EDGE-002, TC-FE-002
7. Visual inconsistencies (broken UI) - MEDIUM - MEDIUM - YELLOW - TC-FE-003
8. Cart instability with many items - LOW - MEDIUM - YELLOW - TC-EDGE-001

### Critical Risk Analysis

**Risk 1: Weak Authentication [RED]**
- Cause: Missing lock logic, no rate limiting, tokens without expiration
- Impact: Unauthorized access to sensitive user data
- Mitigation: TC-FE-002 (invalid credentials), TC-FE-004 (locked user), TC-API-001 (token)

**Risk 2: PII Data Exposure [RED - Critical GDPR/HIPAA]**
- Cause: HTTP transmission, unencrypted localStorage data, insecure cookies
- Impact: GDPR fines €20M+ or 4% annual revenue; HIPAA $100-$1500 per record
- Mitigation: TC-SEC-002 (HTTPS, secure cookies, localStorage validation)

**Risk 3: SQL Injection / XSS [RED]**
- Cause: Unescaped inputs, insufficient validation
- Impact: Complete database access, session cookie theft
- Mitigation: TC-SEC-001 (SQL injection payload)

**Risk 4: Incorrect Calculations [ORANGE]**
- Cause: Floating point errors, incorrect rounding, taxes unvalidated backend
- Impact: Overcharging/undercharging, tax non-compliance
- Mitigation: TC-API-002 (2-decimal precision), TC-INT-001 (E2E)

**Risk 5: Cart Data Loss [ORANGE]**
- Cause: State in memory without backend persistence
- Impact: Empty cart without reason, user frustration
- Mitigation: TC-INT-001, TC-INT-002 (persistence across pages)

---

## 5. EXECUTION PRIORITIZATION

**If time runs out, execute ONLY P0 cases** (4 cases, ~40 minutes):
1. **TC-FE-001**: Successful login
2. **TC-FE-004**: Blocked user
3. **TC-API-001**: Secure token
4. **TC-SEC-002**: PII over HTTPS

These 4 cases cover **80% of critical risks**.

**If you have 2.5 hours, add P1 cases** (10 cases total, ~160 minutes):
- All P0 + P1 cases

**If you have 3 hours, execute ALL** (12 cases, ~180 minutes):
- Include P2 (Edge Cases)

---

## 6. EXECUTIVE SUMMARY

- Total Coverage: 12 cases: FE (4), API (2), INT (2), SEC (2), EDGE (2)
- Critical Path: Login → Inventory → Cart → Checkout
- User Types: standard_user, problem_user, locked_out_user
- Security Focus: GDPR/HIPAA, SQL injection, PII, token security
- Execution Time: ~2.5 hours (140-160 min pure execution)
- Prioritization: P0: 4 critical | P1: 6 high | P2: 2 medium
- Tools Required: Browser + DevTools (Burp Suite optional)

---

## 7. ASSUMPTIONS

- SauceDemo available (99.9% uptime)
- Valid credentials: standard_user, problem_user, locked_out_user
- HTTPS active with valid certificate
- Stable connection (5+ Mbps)
- No URL/element HTML changes during testing

---

**Prepared by**: QA Engineer Rebeca Ordoñez
**Date**: 2026-05-10  
**Version**: 1.0 (Summarized)