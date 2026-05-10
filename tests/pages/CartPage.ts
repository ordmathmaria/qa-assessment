import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  /**
   * Clicks the checkout button and waits for navigation to the first checkout step.
   */
  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.page.waitForURL('**/checkout-step-one.html');
  }

  /**
   * Verifies if the current page is the cart page.
   * @returns A promise that resolves to true if on the cart page, false otherwise.
   */
  async isOnCartPage(): Promise<boolean> {
    return this.page.url().includes('cart.html');
  }

  /**
   * Returns the number of items currently in the cart.
   * @returns A promise that resolves to the number of cart items.
   */
  async getCartItemCount(): Promise<number> {
    return await this.page.locator('[data-test="cart-item"]').count();
  }

  /**
   * Retrieves the names of all items currently in the cart.
   * @returns A promise that resolves to an array of product names.
   */
  async getCartItemNames(): Promise<string[]> {
    const locators = this.page.locator('[data-test="inventory-item-name"]');
    const count = await locators.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await locators.nth(i).textContent();
      if (text) names.push(text);
    }
    return names;
  }

  /**
   * Verifies if a specific product is present in the cart.
   * @param productName - The name of the product to verify.
   * @returns A promise that resolves to true if the product is in the cart, false otherwise.
   */
  async verifyProductInCart(productName: string): Promise<boolean> {
    const items = await this.getCartItemNames();
    return items.includes(productName);
  }

  /**
   * Checks if the shopping cart is empty.
   * @returns A promise that resolves to true if the cart is empty, false otherwise.
   */
  async isCartEmpty(): Promise<boolean> {
    return (await this.getCartItemCount()) === 0;
  }
}
