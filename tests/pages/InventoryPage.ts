import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  /**
   * Adds a product to the shopping cart.
   * @param productName - The name of the product to add.
   */
  async addItemToCart(productName: string): Promise<void> {
    await this.page.locator(`[data-test="add-to-cart-${productName}"]`).click();
  }

  /**
   * Navigates to the shopping cart page.
   */
  async goToCart(): Promise<void> {
    await this.shoppingCartLink.click();
    await this.page.waitForURL('**/cart.html');
  }

  /**
   * Returns the number of items currently in the shopping cart.
   * @returns A promise that resolves to the item count.
   */
  async getCartItemCount(): Promise<number> {
    const badge = this.page.locator('[data-test="shopping-cart-badge"]');
    if (await badge.isVisible()) {
      const text = await badge.textContent();
      return text ? parseInt(text, 10) : 0;
    }
    return 0;
  }

  /**
   * Verifies if the current page is the inventory page.
   * @returns A promise that resolves to true if on the inventory page, false otherwise.
   */
  async isOnInventoryPage(): Promise<boolean> {
    return this.page.url().includes('inventory.html');
  }

  /**
   * Counts the number of products listed on the inventory page.
   * @returns A promise that resolves to the total number of products.
   */
  async getProductCount(): Promise<number> {
    return await this.page.locator('[data-test="inventory-item"]').count();
  }

  /**
   * Gets the name of the first product in the inventory list.
   * @returns A promise that resolves to the product name.
   */
  async getFirstProductName(): Promise<string> {
    return await this.page.locator('[data-test="inventory-item-name"]').first().textContent() || '';
  }
}
