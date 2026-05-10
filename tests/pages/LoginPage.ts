import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navigates to the login page.
   */
  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  /**
   * Performs login and waits for either successful navigation or an error message.
   * @param username - The username to enter.
   * @param password - The password to enter.
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    await Promise.race([
      this.page.waitForURL('**/inventory.html', { timeout: 5000 }),
      this.errorMessage.waitFor({ state: 'visible', timeout: 5000 }),
    ]);
  }

  /**
   * Checks if the user is logged in by verifying the URL.
   * @returns A promise that resolves to true if logged in, false otherwise.
   */
  async isLoggedIn(): Promise<boolean> {
    return this.page.url().includes('inventory.html');
  }

  /**
   * Checks if the error message is visible.
   * @returns A promise that resolves to true if the error message is visible, false otherwise.
   */
  async hasErrorMessage(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  /**
   * Clears the password input field.
   */
  async clearPassword(): Promise<void> {
    await this.passwordInput.clear();
  }

  /**
   * Gets the text content of the error message.
   * @returns A promise that resolves to the error message text.
   */
  async getErrorMessage(): Promise<string | null> {
    return await this.errorMessage.textContent();
  }
}
