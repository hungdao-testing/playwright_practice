import { PlaywrightTestConfig } from "@playwright/test";




const config: PlaywrightTestConfig = {
  testDir: "tests",
  timeout: 50 * 60 * 1000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    navigationTimeout: 1200000,
    
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
