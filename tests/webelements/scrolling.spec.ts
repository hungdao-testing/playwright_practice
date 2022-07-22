import { test, expect, Locator, chromium } from '@playwright/test';

async function scrollToInsideLocator(toText: string, outsideLocator: Locator, insideLocator: string) {
  let numRecord = parseInt((await outsideLocator.locator(insideLocator).locator('td').first().innerText()).trim());
  let innerLocator = outsideLocator.locator(insideLocator);

  for (let i = 1; i <= numRecord; i++) {
    console.log("Init number of record:: ", numRecord)
    console.log("Init i:: ", i)

    let desiredLocator = innerLocator.filter({ hasText: toText });
    let isDesiredLocatorVisible = await desiredLocator.isVisible();
    if (isDesiredLocatorVisible) {
      await desiredLocator.hover()
      return desiredLocator
    };

    await outsideLocator.locator(insideLocator).first().scrollIntoViewIfNeeded();
    await outsideLocator.locator(insideLocator).last().hover();
    numRecord = parseInt((await outsideLocator.locator(insideLocator).locator('td').first().innerText()).trim())

    console.log("Update number of record:: ", numRecord)
  }
}

async function scrollToInsideLocator2(toText: string, outsideLocator: Locator, insideLocator: string) {
  let innerLocator = outsideLocator.locator(insideLocator);
  let desiredLocator = innerLocator.filter({ hasText: toText });
  let isDesiredLocatorVisible = await desiredLocator.isVisible();

  while (!isDesiredLocatorVisible) {
    desiredLocator = innerLocator.filter({ hasText: toText });
    isDesiredLocatorVisible = await desiredLocator.isVisible();
    await outsideLocator.locator(insideLocator).first().scrollIntoViewIfNeeded();
    await outsideLocator.locator(insideLocator).last().hover();
  }

  return desiredLocator;
}

test.describe.parallel('Virtual loading table', () => {
  test('Chrome - Scroll to find a record and get content', async ({ }) => {
    const browser = await chromium.launch();
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();
    await page.goto('http://primefaces.org/primeng/table/virtualscroll');
    const tableLocator = page.locator('#pr_id_2-table');

    await tableLocator.waitFor({ state: 'visible' });
    // await page.pause()
    const innerLocator = await scrollToInsideLocator('222', tableLocator, 'tr');

    if (!innerLocator) throw Error('No Locator found to grab text');
    const text = await innerLocator.locator('td').last().innerText();
    console.log("TEXT:: ", text)
    expect(text.length).toBeGreaterThan(1);
    await page.pause();
  });
});
