import { test, expect } from '@playwright/test';

test("Jquery dropdown ", async ({ page }) => {
    await page.goto("https://jqueryui.com/resources/demos/selectmenu/default.html");
    await page.waitForSelector("#number-button");

    await page.locator("#number-button").click();
    const items = await page.$$("#number-menu li.ui-menu-item");
    for (const item of items) {
        if (await item.innerText() === '19') {
            await item.click()
        }
    }
    const selectedValue = await page.locator("#number-button .ui-selectmenu-text").innerText();
    expect(selectedValue).toEqual('19')

})

test("Angular dropdown", async ({ page }) => {
    await page.goto("https://ej2.syncfusion.com/angular/demos/?_ga=2.262049992.437420821.1575083417-524628264.1575083417#/material/drop-down-list/data-binding");
    await page.waitForSelector("text=/Local Data/");
    await Promise.all([
        page.locator('ejs-dropdownlist[id="games"]').click(),
        page.waitForSelector("#games_popup")
    ]);

    // const innerHtml =await page.locator("#games_popup").innerHTML()
    // console.log(innerHtml)
    const options = await page.$$("#games_popup li");
    for (const option of options) {
        if (await option.innerText() === 'Football') {
            await option.click()
        }
    }
    const selectedValue = await page.locator("ejs-dropdownlist option").innerText();

    expect(selectedValue).toEqual("Football")

})

test("React dropdown @dropdown", async ({ page }) => {
    await page.goto("https://react.semantic-ui.com/maximize/dropdown-example-selection/");
    await page.waitForSelector("text=/Select Friend/");
    await Promise.all([
        page.locator('div[role="listbox"]').click(),
        page.waitForSelector('div[class="visible menu transition"]')
    ]);

    // const innerHtml =await page.locator("#games_popup").innerHTML()
    // console.log(innerHtml)
    const options = await page.$$('div[class="visible menu transition"] div');
    for (const option of options) {
        if (await option.innerText() === 'Christian') {
            await option.click()
        }
    }
    const selectedValue = await page.locator('div[role="listbox"] div >> nth=0').innerText();

    expect(selectedValue).toEqual("Christian")

})