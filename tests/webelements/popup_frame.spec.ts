import { expect, Frame, test } from "@playwright/test";

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

test("Javacodegeek dialog", async ({ page }) => {
    await page.goto("https://www.javacodegeeks.com/", { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('div[class="ulp-window ulp-window-middle-center"]');
    await page.fill('div input[name="ulp-email"] >> nth=1', 'abc@gmail.com')
    const title = await page.innerText('[class="ulp-layer ulp-animated ulp-bounceInDown"]')
    expect(title).toEqual("Want to take your Java skills to the next level?")
    await page.click("text=/No Thanks!/")
    await page.waitForLoadState()

})


test("Frame", async ({ page }) => {
    await page.goto("https://kyna.vn/");
    expect(await page.title()).toEqual("Kyna.vn - Học online cùng chuyên gia");

    const facebookFrame = await (await page.$(".face-content iframe")).contentFrame();
    const numberOfLiked = await facebookFrame.locator("._1drq").innerText();
    expect(numberOfLiked).toContain("167K")

    await page.click('.nav-item a:has-text("Đăng nhập")');
    await page.waitForSelector('.k-popup-account-mb-content .modal-title');
    // const popup = page.on('popup', async popup => {
    //     await popup.waitForLoadState();
    // })

    await page.fill('input#user-login', 'automationfc.vn@gmail.com');
    await page.fill('input#user-password', 'automationfc.vn@gmail.com');

    await Promise.all([
        page.click('button#btn-submit-login'),
        page.waitForLoadState()
    ])

    const text = await page.innerText("#user-options")
    expect(text.trim()).toContain("Automation FC")

})

test("Popup with Url", async ({ page }) => {

    await page.goto('https://www.seleniumeasy.com/test/window-popup-modal-demo.html');
    const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        page.click('a[title="Follow @seleniumeasy on Twitter"]')
    ]);
    await page.waitForLoadState();
    expect(popup.url()).toEqual("https://twitter.com/intent/follow?screen_name=seleniumeasy")
    await popup.click('div[role="button"]:has-text("No, thanks")');
    await page.bringToFront();
    const [popup1] = await Promise.all([
        page.waitForEvent('popup'),
        page.click('a[title="Follow @seleniumeasy on Facebook"]')
        
    ]);
    expect(popup1.url()).toEqual("https://www.facebook.com/seleniumeasy")
    popup1.close({runBeforeUnload: true})
})