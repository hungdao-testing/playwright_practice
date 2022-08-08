import { chromium, expect, firefox, Frame, test } from "@playwright/test";

test.describe.parallel("Popup - dialog", () => {
    test("Javacodegeek dialog", async ({ page }) => {
        await page.goto("https://www.javacodegeeks.com/", {
            waitUntil: "domcontentloaded",
        });
        await page.waitForSelector(
            'div[class="ulp-window ulp-window-middle-center"]'
        );
        await page.fill('div input[name="ulp-email"] >> nth=1', "abc@gmail.com");
        const title = await page.innerText(
            '[class="ulp-layer ulp-animated ulp-bounceInDown"]'
        );
        expect(title).toEqual("Want to take your Java skills to the next level?");
        await page.click("text=/No Thanks!/");
        await page.waitForLoadState();
    });

    test("Popup with Url", async ({ page }) => {
        await page.goto(
            "https://www.seleniumeasy.com/test/window-popup-modal-demo.html"
        );
        const [popup] = await Promise.all([
            page.waitForEvent("popup"),
            page.click('a[title="Follow @seleniumeasy on Twitter"]'),
        ]);
        await page.waitForLoadState();
        expect(popup.url()).toEqual(
            "https://twitter.com/intent/follow?screen_name=seleniumeasy"
        );
        await popup.click('div[role="button"]:has-text("No, thanks")');
        await page.bringToFront();
        const [popup1] = await Promise.all([
            page.waitForEvent("popup"),
            page.click('a[title="Follow @seleniumeasy on Facebook"]'),
        ]);
        expect(popup1.url()).toEqual("https://www.facebook.com/seleniumeasy");
        popup1.close({ runBeforeUnload: true });
    });

    // test.only("Share screen dialog @sharescreen", async ({ }) => {
    //     const context = await firefox.launch({
           
    //         // args: [

    //         //     '--auto-select-desktop-capture-source=Entire Screen, Screen 1',

    //         // ],
    //         firefoxUserPrefs: {"media.getusermedia.screensharing.enabled": true},
    //         headless: false,
    //         ignoreDefaultArgs: true,

    //     });
    //     const page = await context.newPage();
    //     await page.goto("https://www.screenleap.com/login");
    //     // const signinBtn = page.locator('#loginNav');
    //     // await signinBtn.waitFor({state: 'visible'});
    //     // await signinBtn.click();
    //     await page.pause();
    //     await page.waitForSelector('h2:has-text("Sign In")', { state: "visible" });
    //     const emailAddressField = page.locator("input#emailAddress");
    //     const passwordField = page.locator("input#password");
    //     const signInBtn = page.locator("input#signin");

    //     await emailAddressField.type("qa.one@yopmail.com");
    //     await passwordField.type("12345678x@X");
    //     await signInBtn.click();

    //     await page.waitForLoadState();
    //     const meetNowBtn = page.locator("input#meetNowButton");

    //     // let entireScreenTab;

    //     await meetNowBtn.click();
    //     await page.waitForURL(
    //         /^(https:\/\/www\.screenleap.com\/.)(screenShareCode=.*&)(participantId=.*)/
    //     );

    //     await page.waitForSelector("div#screenleapScreenButton", {
    //         state: "visible",
    //     });
    //     // page.on('dialog', dialog => {
    //     //     console.log('INFO:: Dialog is displaying')
    //     // })
    //     // page.on('popup', async popup => {
    //     //     await popup.waitForLoadState();
    //     //     let title = await popup.title();
    //     //     console.log("TITLE: ", title)
    //     //   })

    //     // await page.click('Window')

    //     // await startMeetingBtn.click()
    // });
});
