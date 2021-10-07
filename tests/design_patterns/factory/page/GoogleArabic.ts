import { Locator, Page } from "@playwright/test";
import GoogleEnglish from "./GoogleEnglish";


export default class GoogleArabic extends GoogleEnglish {

    private language: Locator;
    private keyboardBtn: Locator;
    private keyboard: Locator;

    constructor(page: Page) {
        super(page)
        this.language = this.page.locator("div#gws-output-pages-elements-homepage_additional_languages__als a");
        this.keyboardBtn = this.page.locator("span.ly0Ckb");
        this.keyboard = this.page.locator("#kbd");
    }

    async launchSite(): Promise<void> {
        await this.page.goto("https://www.google.com.sa");
        const arabicLang = await this.language.elementHandles();
        await Promise.all([
            arabicLang[0].click(),
            this.page.waitForNavigation()
        ])
    }

    async search(keyword: string): Promise<void> {
        await this.keyboardBtn.click();
        await this.keyboard.isVisible();
        await super.search(keyword);
    }

    getResultsCount(): Promise<number> {
        return super.getResultsCount();
    }



}