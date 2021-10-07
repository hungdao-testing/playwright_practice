import { expect, test } from '@playwright/test';
import { GoogleFactory } from './page/GoogleFactory';
import GooglePage from './page/GooglePage';


test.describe.parallel('Google Factory @factory', () => {

    let googlePage: GooglePage;

    test("Arabic", async ({ page }) => {
        googlePage = GoogleFactory.get("ARABIC", page);
    
        await googlePage.launchSite();
        await googlePage.search("covid ");
        const resultCount = await googlePage.getResultsCount();
        console.log(resultCount);
    })
    
    test("English", async ({ page }) => {
        googlePage = GoogleFactory.get("ENGLISH", page);
    
        await googlePage.launchSite();
        await googlePage.search("covid ");
        const resultCount = await googlePage.getResultsCount();
        console.log(resultCount);
    })

    test("French", async ({ page }) => {
        googlePage = GoogleFactory.get("FRENCH", page);
    
        await googlePage.launchSite();
        await googlePage.search("covid ");
        const resultCount = await googlePage.getResultsCount();
        console.log(resultCount);
    })

})

