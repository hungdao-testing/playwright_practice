import { test, expect, Locator, chromium, firefox } from '@playwright/test';

async function scrollToRowId(rowId: string, tableLocator: Locator, selectorOfRowId: string) {
  await tableLocator.locator('tbody').hover();
  let isScroll = true;
  while (isScroll) {
    // wait for lazy-loading (on test case 'with Lazy Loading') to be disappeared (detach from DOM)
    await tableLocator.locator('tbody').page().waitForSelector('.p-scroller-loading', {state: 'hidden'})

    // intermediate selector: get all rows has id containing text `rowId`
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
  test('with Preloaded Data - Scroll to find a record and get content @preload', async ({}, testInfo) => {
    const browser = await chromium.launch({headless: true});
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();
    await page.goto('http://primefaces.org/primeng/table/virtualscroll');
    const tableLocator = page.locator('#pr_id_2-table');

    await tableLocator.waitFor({ state: 'visible' });
    const innerLocator = await scrollToRowId('25', tableLocator, 'tr >> td:nth-child(1)');
    if (!innerLocator) throw Error('No Locator found to grab text');
   
    const text = await innerLocator.innerText();
    
  
    expect(text.length).toBeGreaterThan(1);

  });
  test('with Lazy Loading from a Remote Datasource - Scroll to find a record and get content @lazy-loading', async ({}) => {
    const browser = await firefox.launch({headless: true});
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();
    await page.goto('http://primefaces.org/primeng/table/virtualscroll');
    const tableLocator = page.locator('#pr_id_3-table');

    await tableLocator.waitFor({ state: 'visible' });
    const innerLocator = await scrollToRowId('25', tableLocator, 'tr >> td:nth-child(1)');
    if (!innerLocator) throw Error('No Locator found to grab text');
    const text = await innerLocator.innerText();
    
    expect(text.length).toBeGreaterThan(1);

  });
});
