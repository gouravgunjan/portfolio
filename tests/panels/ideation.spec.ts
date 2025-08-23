import { test, expect } from '@playwright/test';
import { addCursor } from '../cursor-helper';

test.describe('Ideation Panel', () => {
  test('should have a parallax effect on mouse movement', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Take the screenshot before adding the cursor
    await expect(page).toHaveScreenshot('ideation-panel-initial-state.png');

    // Add the cursor for the video recording
    await addCursor(page);

    const parallaxContainer = page.locator('[data-testid="ideation-parallax-container"]');

    const initialTransform = await parallaxContainer.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });

    // Move the mouse to trigger the parallax effect and ensure the video captures it.
    await page.mouse.move(100, 100, { steps: 10 });
    await page.waitForTimeout(500); // Pause to make the effect visible in the video
    await page.mouse.move(page.viewportSize()!.width - 100, page.viewportSize()!.height - 100, { steps: 10 });
    await page.waitForTimeout(1000); // Ensure video has some length

    const transformAfterMove = await parallaxContainer.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });

    expect(initialTransform).not.toEqual(transformAfterMove);
  });
});
