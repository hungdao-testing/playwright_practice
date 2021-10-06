import { Page } from "@playwright/test";
import AbstractComponent from "./AbstractComponent";


export default class SearchWidget extends AbstractComponent{

    private searchBox = '[name="q"]';

    constructor(page: Page){
        super(page)
    }

    public async enter(keyword: string){
        await this.page.fill(this.searchBox, "");
        await this.page.type(this.searchBox, keyword, {delay: 100})
    }

    public async isDisplayed() {
        await this.page.waitForSelector(this.searchBox, {state: 'visible'});
        return true;
    }
    
}