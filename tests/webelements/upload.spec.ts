import { test, expect } from '@playwright/test';



test("Upload", async ({ page }) => {

    await page.goto("https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_fileupload_get");
    await page.waitForSelector("#iframecontainer")

    const frameEle = await page.$("div#iframewrapper iframe");
    const frameContent = await frameEle!.contentFrame();
    expect(await frameContent!.innerText('h3')).toEqual("A demonstration of how to access a File Upload Button")
    // await frameContent.waitForSelector("input#myFile")
    await frameContent!.setInputFiles("input#myFile", './upload_files/image1.jpg');
})

test("Upload multiple file @debug", async({page}) => {
    await page.goto("https://blueimp.github.io/jQuery-File-Upload/");
    await page.waitForSelector('input[type="file"]');

    const uploadFiles = ['image1.jpg', 'image2.jpg'];


    await page.setInputFiles('input[type="file"]', ['./upload_files/image1.jpg', './upload_files/image2.jpg']);
    await page.waitForLoadState()

    const startButtons = await page.$$('tr button:has-text("Start")');
    for(const button of startButtons){
        await button.click();
    }
    await page.waitForLoadState('networkidle');

    const deleteButtons = await page.$$('tr button:has-text("Delete")');
    expect(deleteButtons.length).toEqual(2);

    // const image1 = page.locator('table tr:has(td:has-text("image1.jpg"))');
    // const startButtonOfImage1 = image1.locator('td button:has-text("Start")')
    // await startButtonOfImage1.click();
    // const isDeleteButtonDisplayed = await image1.locator('td button:has-text("Delete")').isEnabled();
    // expect(isDeleteButtonDisplayed).toBeTruthy()

})