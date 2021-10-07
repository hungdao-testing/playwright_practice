import { test, expect } from '@playwright/test';
import GoogleMainPage from './main/GoogleMainPage';
import GoogleResult from './result/GoogleResult';


let googleMainPage: GoogleMainPage;
let googleResultPage: GoogleResult;

test('Search keyword @srp', async ({ page }) => {
    const keyword = "playwright";
    const index = 3;

    googleMainPage = new GoogleMainPage(page);
    googleResultPage = new GoogleResult(page);

    await googleMainPage.goto();
    expect(await googleMainPage.searchWidget.isDisplayed()).toBeTruthy();

    await googleMainPage.searchWidget.enter(keyword);
    expect(await googleMainPage.searchSuggestion.isDisplayed());

    await googleMainPage.searchSuggestion.clickSuggestionByIndex(index);
    expect(await googleResultPage.navigationBar.isDisplayed()).toBeTruthy();

    await googleResultPage.searchWidget.enter("selenium");
    expect(await googleResultPage.searchSuggestion.isDisplayed()).toBeTruthy();

    await googleResultPage.searchSuggestion.clickSuggestionByIndex(index);
    await googleResultPage.navigationBar.goToNewsTab();

    const stat = await googleResultPage.resultStat.getStat();
    console.log(stat)


})