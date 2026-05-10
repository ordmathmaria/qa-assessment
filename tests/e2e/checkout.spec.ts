import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { testData } from '../data/testData';

test.describe('Checkout Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    
    await loginPage.goto();
    const { username, password } = testData.users.standardUser;
    await loginPage.login(username, password);
  });

  test('TC-INT-001: Standard user completes purchase from login to confirmation', async ({ page }) => {
    // Add product to cart
    await inventoryPage.addItemToCart(testData.checkout.product);
    await inventoryPage.goToCart();
    
    // Proceed to checkout
    await cartPage.clickCheckout();
    
    // Fill checkout information
    await checkoutPage.fillInformation(
      testData.checkout.firstName,
      testData.checkout.lastName,
      testData.checkout.postalCode
    );
    
    // Finish purchase
    await checkoutPage.finishCheckout();
    
    // Verify confirmation
    const confirmationText = await checkoutPage.getConfirmationText();
    expect(confirmationText).toBe('Thank you for your order!');
    await expect(page).toHaveURL(/checkout-complete.html/);
  });

  test('TC-EDGE-002: Special characters in checkout information', async ({ page }) => {
    await inventoryPage.addItemToCart(testData.checkout.product);
    await inventoryPage.goToCart();
    await cartPage.clickCheckout();
    
    await checkoutPage.fillInformation(
      testData.checkout.specialChars.firstName,
      testData.checkout.specialChars.lastName,
      testData.checkout.specialChars.postalCode
    );
    
    await checkoutPage.finishCheckout();
    
    const confirmationText = await checkoutPage.getConfirmationText();
    expect(confirmationText).toBe('Thank you for your order!');
    await expect(page).toHaveURL(/checkout-complete.html/);
  });
});
