import { test, expect } from '@playwright/test';

test('homepage has no visual regressions', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot();
});
