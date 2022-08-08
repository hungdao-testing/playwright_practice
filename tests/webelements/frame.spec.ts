import { expect, Frame, test } from "@playwright/test";


test("Frame @frame", async ({ page }) => {
    await page.goto("https://kyna.vn/");
    expect(await page.title()).toEqual("Kyna.vn - Học online cùng chuyên gia");

    const facebookFrame = await (await page.$(".face-content iframe"))!.contentFrame();
    const numberOfLiked = await facebookFrame!.locator("._1drq").innerText();
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
