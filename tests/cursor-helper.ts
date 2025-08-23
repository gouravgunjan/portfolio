import { Page } from '@playwright/test';

/**
 * Injects a script into the page to create a fake mouse cursor that will be visible in video recordings.
 * @param page The Playwright page object.
 */
export async function addCursor(page: Page) {
  await page.evaluate(() => {
    const cursor = document.createElement('div');
    cursor.id = 'playwright-mouse-cursor';
    cursor.style.position = 'fixed';
    cursor.style.top = '0';
    cursor.style.left = '0';
    cursor.style.width = '40px'; // Adjusted for a more natural size
    cursor.style.height = '40px'; // Adjusted for a more natural size
    // The SVG for the cursor is encoded and set as the background image
    cursor.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="white" stroke="black" stroke-width="2" d="M4 3l14 8-10 1 3 9-4-7-3 5V3z"/></svg>')`;
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '999999';
    cursor.style.transition = 'transform 0.1s ease'; // Smooth movement
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  });
}
