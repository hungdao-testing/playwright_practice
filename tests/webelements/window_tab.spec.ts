import {expect, test} from '@playwright/test';


test("tc01: windows/tab @window", async({page}) => {

    await page.goto("https://automationfc.github.io/basic-form/index.html")
    await page.waitForSelector("a:has-text('GOOGLE')");
    await page.waitForSelector("a:has-text('FACEBOOK')");
    await page.waitForSelector("a:has-text('TIKI')");


    const [googleTab] = await Promise.all([
        page.waitForEvent('popup'),
        page.click("a:has-text('GOOGLE')")
    ])
    await page.waitForLoadState();
    expect(await googleTab.title()).toEqual("Google");
    await googleTab.fill('[name="q"]', "google");
    await page.bringToFront();

    const [facebookTab] = await Promise.all([
        page.waitForEvent('popup'),
        page.click("a:has-text('FACEBOOK')")
    ])
    await page.waitForLoadState();
    expect(await facebookTab.title()).toEqual("Facebook – log in or sign up");
    await googleTab.bringToFront()
    await googleTab.fill('[name="q"]', "");
    await googleTab.fill('[name="q"]', "Facebook – log in or sign up");
    await page.bringToFront()




})