import { Locator, Page } from "@playwright/test";
import GooglePage from "./GooglePage";


export default class GoogleEnglish extends GooglePage{

    private searchBox: Locator;
    private results: Locator;

    constructor(page: Page){
        super(page);
        this.searchBox = page.locator('[name="q"]');
        this.results = page.locator('div.yuRUbf');
    }


    async launchSite(): Promise<void> {
        await this.page.goto("https://www.google.com");
    }

    async search(keyword: string): Promise<void> {
        await this.searchBox.fill("");
        await this.searchBox.type(keyword, {delay: 100});
        const searchBtn = await this.page.waitForSelector('[name="btnK"]')

        await Promise.all([
            await searchBtn.click(),
            await this.page.waitForNavigation()
            
        ]);
    }

    async getResultsCount(): Promise<number> {
        
        const results  = await this.results.elementHandles();
        return results.length;
    }
    
}