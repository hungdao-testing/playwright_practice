import { Locator, Page } from "@playwright/test";
import GoogleEnglish from "./GoogleEnglish";


export default class GoogleFrench extends GoogleEnglish{

    private language: Locator;

    constructor(page: Page){
        super(page);
        this.language = this.page.locator("div#gws-output-pages-elements-homepage_additional_languages__als a");
    }

    async launchSite(): Promise<void> {
        await this.page.goto("https://www.google.fr");
    }


}