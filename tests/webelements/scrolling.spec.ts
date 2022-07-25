import { test, expect, Locator, chromium, firefox } from '@playwright/test';

async function scrollToRowId(rowId: string, tableLocator: Locator, selectorOfRowId: string) {
  await tableLocator.locator('tbody').hover();
  let isScroll = true;
  while (isScroll) {
    await tableLocator.locator('tbody').page().waitForSelector('.p-scroller-loading', {state: 'hidden'})
    let queryLocator = tableLocator.locator(`*css=${selectorOfRowId}`).filter({ hasText: rowId });
    let isVisible = await queryLocator.isVisible();
    if (isVisible) {
      isScroll = false;
      await queryLocator.hover()
      return queryLocator;
    }
    await tableLocator.locator('tbody').page().mouse.wheel(0, 10);
    
  }
}

test.describe.parallel('Virtual scrolling', () => {
  test('with Preloaded Data - Scroll to find a record and get content', async ({}, testInfo) => {
    const browser = await chromium.launch({headless: true});
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();
    await page.goto('http://primefaces.org/primeng/table/virtualscroll');
    const tableLocator = page.locator('#pr_id_2-table');

    await tableLocator.waitFor({ state: 'visible' });
    const innerLocator = await scrollToRowId('25', tableLocator, 'tr >> td:nth-child(1)');
    if (!innerLocator) throw Error('No Locator found to grab text');
    await innerLocator.screenshot({path: 'preloaded.png'})
    
    const text = await innerLocator.innerText();
    
    console.log("Preloaded Data::", text)
    expect(text.length).toBeGreaterThan(1);

  });
  test('with Lazy Loading from a Remote Datasource - Scroll to find a record and get content', async ({}) => {
    const browser = await firefox.launch({headless: true});
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();
    await page.goto('http://primefaces.org/primeng/table/virtualscroll');
    const tableLocator = page.locator('#pr_id_3-table');

    await tableLocator.waitFor({ state: 'visible' });
    const innerLocator = await scrollToRowId('25', tableLocator, 'tr >> td:nth-child(1)');
    if (!innerLocator) throw Error('No Locator found to grab text');
    await innerLocator.screenshot({path: 'lazyloaded.png'})
    const text = await innerLocator.innerText();
    console.log("Lazy Loading::", text)
    expect(text.length).toBeGreaterThan(1);

  });
});
