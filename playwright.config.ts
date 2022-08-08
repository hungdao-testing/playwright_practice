import { PlaywrightTestConfig } from "@playwright/test";
import path from "path";




const config: PlaywrightTestConfig = {
  testDir: path.join(__dirname, 'tests'),
  testMatch: '*.spec.ts',
  timeout: 50 * 60 * 1000,
  workers: 2,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    navigationTimeout: 1200000,

  },
  projects: [
    {
      name: 'ui-chrome',
      testDir: path.join(__dirname, 'tests/webelements'),
      use: {
        // Configure the browser to use.
        browserName: 'chromium',
        headless: false,
      },
    },
    // {
    //   name: 'ui-firefox',
    //   testDir: path.join(__dirname, 'tests/webelements'),
    //   use: {
    //     // Configure the browser to use.
    //     browserName: 'firefox',

    //   },
    // }
  ]
};
export default config;
