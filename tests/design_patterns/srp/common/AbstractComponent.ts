import { Page } from "@playwright/test";

export default abstract class AbstractComponent{

    protected page: Page;

    constructor(page: Page){
        this.page = page;
    }

    public abstract isDisplayed(): Promise<boolean>;
}