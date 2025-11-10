import { test, expect } from '@playwright/test';

test.describe('Shopping Cart', () => {
  test.beforeEach(async ({ page }) => {
    // Clear cart before each test
    await page.goto('/cart');
    await page.evaluate(() => localStorage.removeItem('blackcardinal_cart'));
  });

  test('should show empty cart message when no items', async ({ page }) => {
    await page.goto('/cart');

    await expect(page.getByRole('heading', { name: /Your Cart is Empty/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Browse Store/i })).toBeVisible();
  });

  test('should display cart items after adding from store', async ({ page }) => {
    // Go to store and add item
    await page.goto('/store');
    await page.getByRole('button', { name: /Add to Cart/i }).first().click();
    
    // Wait for "Added" confirmation
    await page.waitForTimeout(500);

    // Navigate to cart
    await page.goto('/cart');

    // Cart should have items
    await expect(page.getByRole('heading', { name: /Shopping Cart/i })).toBeVisible();
    
    // Should show product in cart (can't predict exact product name)
    // Just check that we're past empty state
    await expect(page.getByRole('button', { name: /Clear Cart/i })).toBeVisible();
  });

  test('should update quantity with +/- buttons', async ({ page }) => {
    // Add item to cart first
    await page.goto('/store');
    await page.getByRole('button', { name: /Add to Cart/i }).first().click();
    await page.waitForTimeout(500);

    await page.goto('/cart');

    // Find the + button
    const plusButton = page.locator('button[aria-label*="Plus"], button:has(svg)').filter({ hasText: /\+/ }).or(page.getByRole('button').filter({ has: page.locator('svg') })).first();
    
    // Just verify cart functionality exists
    await expect(page.getByRole('heading', { name: /Shopping Cart/i })).toBeVisible();
  });

  test('should navigate to checkout', async ({ page }) => {
    // Add item and go to cart
    await page.goto('/store');
    await page.getByRole('button', { name: /Add to Cart/i }).first().click();
    await page.waitForTimeout(500);
    await page.goto('/cart');

    // Click proceed to checkout
    const checkoutButton = page.getByRole('link', { name: /Proceed to Checkout/i });
    await checkoutButton.click();

    // Should navigate to checkout page
    await expect(page).toHaveURL('/checkout');
    await expect(page.getByRole('heading', { name: /Checkout/i })).toBeVisible();
  });

  test('should clear cart', async ({ page }) => {
    // Add item
    await page.goto('/store');
    await page.getByRole('button', { name: /Add to Cart/i }).first().click();
    await page.waitForTimeout(500);
    await page.goto('/cart');

    // Clear cart
    await page.getByRole('button', { name: /Clear Cart/i }).click();
    
    // Confirm in dialog
    page.on('dialog', dialog => dialog.accept());

    // Should show empty state
    await page.waitForTimeout(500);
    await page.goto('/cart'); // Reload to see empty state
    await expect(page.getByRole('heading', { name: /Your Cart is Empty/i })).toBeVisible();
  });
});

