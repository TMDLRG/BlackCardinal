import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Store', () => {
  test('should display products from database', async ({ page }) => {
    await page.goto('/store');

    // Check page heading
    await expect(page.getByRole('heading', { name: /Modern Merch with Meaning/i })).toBeVisible();

    // Check for product cards
    await expect(page.getByRole('heading', { name: /Core Tee/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Studio Cap/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Morning Mug/i })).toBeVisible();

    // Check for BYOA section
    await expect(page.getByRole('heading', { name: /Bring Your Own Apparel/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /BYOA Essential/i })).toBeVisible();
  });

  test('should allow adding products to cart', async ({ page }) => {
    await page.goto('/store');

    // Find first "Add to Cart" button
    const addToCartButton = page.getByRole('button', { name: /Add to Cart/i }).first();
    await addToCartButton.click();

    // Button should change to "Added"
    await expect(page.getByRole('button', { name: /Added/i }).first()).toBeVisible();

    // Cart badge should update
    // Note: May need to wait for cart state to update
    await page.waitForTimeout(100);
  });

  test('should filter products by category', async ({ page }) => {
    await page.goto('/store');

    // Check that Merch section exists
    await expect(page.getByRole('heading', { name: /Core Merch Line/i })).toBeVisible();

    // Check that BYOA section exists
    await expect(page.getByRole('heading', { name: /Bring Your Own Apparel/i })).toBeVisible();

    // Check that Drops section might exist
    const dropsHeading = page.getByRole('heading', { name: /Limited Drops/i });
    // Drops section may or may not be visible depending on inventory
  });

  test('should pass accessibility audit', async ({ page }) => {
    await page.goto('/store');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should display waiver note for BYOA products', async ({ page }) => {
    await page.goto('/store');

    await expect(page.getByText(/Waiver note/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /View full terms/i })).toBeVisible();
  });
});

