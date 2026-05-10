import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testData } from '../data/testData';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC-FE-001: Standard User Successful Login', async ({ page }) => {
    const { username, password } = testData.users.standardUser;
    await loginPage.login(username, password);
    
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('TC-FE-002: Invalid Credentials Login', async ({ page }) => {
    const { username, password } = testData.users.invalidUser;
    await loginPage.login(username, password);

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Epic sadface: Username and password do not match any user in this service');
  });

  test('TC-FE-004: Locked User Login', async ({ page }) => {
    const { username, password } = testData.users.lockedOutUser;
    await loginPage.login(username, password);

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Epic sadface: Sorry, this user has been locked out.');
  });
});
