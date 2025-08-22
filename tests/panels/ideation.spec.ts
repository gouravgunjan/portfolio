import { test, expect } from '@playwright/test';

test.describe('Ideation Panel', () => {
  test('should have a parallax effect on mouse movement', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await expect(page).toHaveScreenshot('ideation-panel-initial-state.png');

    const parallaxContainer = page.locator('[data-testid="ideation-parallax-container"]');

    const initialTransform = await parallaxContainer.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });

    await page.mouse.move(100, 100);

    const transformAfterMove = await parallaxContainer.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });

    expect(initialTransform).not.toEqual(transformAfterMove);
  });
});
