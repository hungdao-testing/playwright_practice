import { Page } from "@playwright/test";
import AbstractComponent from "./AbstractComponent";


export default class SearchSuggestion extends AbstractComponent{

    private suggestions = "li.sbct";

    constructor(page: Page){
        super(page);
    }

    public async isDisplayed() {
        await this.page.waitForSelector(this.suggestions, {state: 'visible'});
        return true;
    }

    public async clickSuggestionByIndex(index: number){
        const suggestionList = await this.page.$$(this.suggestions);
        await suggestionList[index - 1].click();
    }
    
}