import { Page } from "@playwright/test";

export default abstract class GooglePage{

    protected page: Page;
    constructor(page: Page){
        this.page = page;
    }


    abstract launchSite(): Promise<void>;
    abstract search(keyword: string): Promise<void>;
    abstract getResultsCount(): Promise<number>;

}