import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testData } from '../data/testData';

test.describe('Security Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC-SEC-001: SQL Injection Protection on Login', async ({ page }) => {
    const { username, password } = testData.security.sqlInjection;
    
    await loginPage.login(username, password);
    
    const error = await loginPage.getErrorMessage();
    expect(error).toBeDefined();
    expect(error).toContain('Epic sadface');
    await expect(page).not.toHaveURL(/inventory.html/);
  });
});
