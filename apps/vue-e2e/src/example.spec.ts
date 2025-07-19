import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect h1 to contain "Form Builder" which is the actual title
  expect(await page.locator('h1').innerText()).toContain('Form Builder');
});

test('renders form builder page', async ({ page }) => {
  await page.goto('/');

  // Check that the page loads successfully
  await expect(page).toHaveTitle(/Form Builder/);

  // Check that the header is present
  await expect(page.locator('header')).toBeVisible();
});

test('has proper navigation structure', async ({ page }) => {
  await page.goto('/');

  // Check that the main container is present
  await expect(page.locator('.container')).toBeVisible();
});
