import {expect, test} from '@playwright/test'


test("drag and drop @dragdop", async({page}) => {

    await page.goto("https://demos.telerik.com/kendo-ui/dragdrop/angular")
    await page.waitForSelector("h3:has-text('Drag and Drop')");

    await page.dragAndDrop("#draggable", "#droptarget");
   
    const displayedMessage = await page.locator("#droptarget").innerText();
    expect(displayedMessage).toEqual("You did great!")


})