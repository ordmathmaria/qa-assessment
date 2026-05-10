import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
  }

  /**
   * Fills the customer information and proceeds to the overview page.
   * @param firstName - Customer's first name.
   * @param lastName - Customer's last name.
   * @param postalCode - Customer's postal code.
   */
  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
    await this.page.waitForURL('**/checkout-step-two.html');
  }

  /**
   * Completes the checkout process.
   */
  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
    await this.page.waitForURL('**/checkout-complete.html');
  }

  /**
   * Gets the confirmation text after a successful checkout.
   * @returns A promise that resolves to the confirmation text.
   */
  async getConfirmationText(): Promise<string | null> {
    return await this.completeHeader.textContent();
  }

  /**
   * Verifies if the current page is the first step of the checkout process.
   * @returns A promise that resolves to true if on checkout step one, false otherwise.
   */
  async isOnCheckoutStepOne(): Promise<boolean> {
    return this.page.url().includes('checkout-step-one.html');
  }

  /**
   * Verifies if the current page is the second step of the checkout process.
   * @returns A promise that resolves to true if on checkout step two, false otherwise.
   */
  async isOnCheckoutStepTwo(): Promise<boolean> {
    return this.page.url().includes('checkout-step-two.html');
  }

  /**
   * Extracts the subtotal amount from the overview page.
   * @returns A promise that resolves to the subtotal as a number.
   */
  async getSubtotal(): Promise<number> {
    const text = await this.subtotalLabel.textContent();
    return this.extractPrice(text);
  }

  /**
   * Extracts the tax amount from the overview page.
   * @returns A promise that resolves to the tax as a number.
   */
  async getTax(): Promise<number> {
    const text = await this.taxLabel.textContent();
    return this.extractPrice(text);
  }

  /**
   * Extracts the total amount from the overview page.
   * @returns A promise that resolves to the total as a number.
   */
  async getTotal(): Promise<number> {
    const text = await this.totalLabel.textContent();
    return this.extractPrice(text);
  }

  /**
   * Verifies if the total is correctly calculated as subtotal + tax.
   * @returns A promise that resolves to true if the calculation is correct, false otherwise.
   */
  async verifyTotalCalculation(): Promise<boolean> {
    const subtotal = await this.getSubtotal();
    const tax = await this.getTax();
    const total = await this.getTotal();
    return Math.abs((subtotal + tax) - total) < 0.01;
  }

  /**
   * Retrieves the list of items in the checkout summary.
   * @returns A promise that resolves to an array of product names.
   */
  async getCartItems(): Promise<string[]> {
    const locators = this.page.locator('[data-test="inventory-item-name"]');
    const count = await locators.count();
    const items: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await locators.nth(i).textContent();
      if (text) items.push(text);
    }
    return items;
  }

  /**
   * Helper method to extract numerical price from a string like "Item: $29.99".
   * @param text - The text containing the price.
   * @returns The parsed price as a number, or 0 if no match is found.
   */
  private extractPrice(text: string | null): number {
    if (!text) return 0;
    const match = text.match(/\$([\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
  }
}
