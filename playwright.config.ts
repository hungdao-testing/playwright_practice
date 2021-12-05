import { PlaywrightTestConfig } from "@playwright/test";




const config: PlaywrightTestConfig = {
  testDir: "tests",
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    navigationTimeout: 120000,
  },
  projects:[
      {
        name: 'Chromium',
        use: {
          // Configure the browser to use.
          browserName: 'chromium',
        },
      }
  ]
};
export default config;
