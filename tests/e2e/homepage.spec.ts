import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Homepage', () => {
  test('should display hero section with logo and tagline', async ({ page }) => {
    await page.goto('/');

    // Check for logo
    await expect(page.getByRole('img', { name: /BlackCardinal Logo/i })).toBeVisible();

    // Check for tagline
    await expect(page.getByRole('heading', { name: /Luxury That Speaks Volumes/i })).toBeVisible();

    // Check for CTAs
    await expect(page.getByRole('link', { name: /Shop Merch/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Book BYOA/i })).toBeVisible();

    // Check for impact note
    await expect(page.getByText(/5% of all net profits support autism nonprofits/i)).toBeVisible();
  });

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/');

    // Check for skip link
    await expect(page.getByRole('link', { name: /Skip to main content/i })).toBeInViewport();

    // Check header navigation
    const nav = page.getByRole('navigation', { name: /Main navigation/i });
    await expect(nav).toBeVisible();

    // Desktop nav links
    await expect(page.getByRole('link', { name: /^Store$/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Founding 50/i })).toBeVisible();
  });

  test('should pass accessibility audit', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Logo should be visible
    await expect(page.getByRole('img', { name: /BlackCardinal Logo/i })).toBeVisible();

    // Mobile menu button should be visible
    await expect(page.getByRole('button', { name: /Open menu/i })).toBeVisible();

    // Click menu button
    await page.getByRole('button', { name: /Open menu/i }).click();

    // Mobile nav should appear
    await expect(page.getByRole('navigation', { name: /Mobile navigation/i })).toBeVisible();
  });

  test('should respect reduced motion preference', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    // Scroll indicator should not animate
    const chevron = page.locator('[aria-label="Scroll down"]');
    if (await chevron.isVisible()) {
      const hasAnimation = await chevron.evaluate((el) => 
        window.getComputedStyle(el).animationName !== 'none'
      );
      expect(hasAnimation).toBe(false);
    }
  });
});

