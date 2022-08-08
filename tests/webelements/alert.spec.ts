import { test, expect } from '@playwright/test';

test.describe.parallel('Alert @alert', () => {
    test("Accept Alert", async ({ page }) => {
        await page.goto("https://automationfc.github.io/basic-form/index.html");
        await page.waitForLoadState();


        let message = '';
        page.on('dialog', dialog => {
            dialog.accept();
            message = dialog.message();
        });
        await page.click('button:has-text("Click for JS Alert")');
        expect(message).toEqual("I am a JS Alert")
        expect(await page.locator("#result").innerText()).toEqual("You clicked an alert successfully")
    })

    test("Confirm Alert - Confirm", async ({ page }) => {
        await page.goto("https://automationfc.github.io/basic-form/index.html");
        await page.waitForLoadState();


        let message = '';
        page.on('dialog', dialog => {
            dialog.accept();
            message = dialog.message();
        });
        await page.click('button:has-text("Click for JS Confirm")');
        expect(message).toEqual("I am a JS Confirm")
        expect(await page.locator("#result").innerText()).toEqual("You clicked: Ok")
    })

    test("Confirm Alert - Dismiss", async ({ page }) => {
        await page.goto("https://automationfc.github.io/basic-form/index.html");
        await page.waitForLoadState();


        let message = '';
        page.on('dialog', dialog => {
            dialog.dismiss();
            message = dialog.message();
        });
        await page.click('button:has-text("Click for JS Confirm")');
        expect(message).toEqual("I am a JS Confirm")
        expect(await page.locator("#result").innerText()).toEqual("You clicked: Cancel")
    })

    test("JS prompt - Accept", async ({ page }) => {
        await page.goto("https://automationfc.github.io/basic-form/index.html");
        await page.waitForLoadState();


        let message = '';
        page.on('dialog', dialog => {
            dialog.accept("playwright")
            message = dialog.message();
        });
        await page.click('button:has-text("Click for JS Prompt")');
        expect(message).toEqual("I am a JS prompt")
        expect(await page.locator("#result").innerText()).toEqual("You entered: playwright")
    })
})
