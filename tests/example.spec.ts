import { test, expect } from '@playwright/test';

test('homepage has no visual regressions on load', async ({ page }) => {
  await page.goto('http://localhost:3000');
  // Wait for the background image to load to ensure a stable screenshot
  await page.waitForSelector('[data-testid="hero-background"]');
  await expect(page).toHaveScreenshot('homepage.png');
});

test('hero section parallax animation works on scroll', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Wait for the hero section to be fully visible
  await page.waitForSelector('[data-testid="hero-container"]');

  // Programmatically scroll the page down by 500 pixels over 2 seconds
  await page.evaluate(() => {
    window.scrollTo({
      top: 500,
      behavior: 'smooth'
    });
  });

  // Wait for the scroll to finish and animations to play
  await page.waitForTimeout(2000); 
  
  // The video recording will capture this entire interaction.
  // We can add a final screenshot here to have a static check of the end state.
  await expect(page).toHaveScreenshot('homepage-scrolled.png');
});
