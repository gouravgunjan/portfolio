import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '/app/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['blob', { outputDir: 'blob-report' }], ['./video-metadata-reporter.ts']],
  use: {
    trace: 'on-first-retry',
    headless: true,
    video: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  expect: {
    toHaveScreenshot: {
      threshold: 0,
    },
  },
  
});