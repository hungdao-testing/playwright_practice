import { Page } from "@playwright/test";
import AbstractComponent from "../common/AbstractComponent";

export default class ResultStat extends AbstractComponent{
    

    private stat = "div#result-stats";



    constructor(page: Page){
        super(page)
    }

    public async isDisplayed() {
        await this.page.waitForSelector(this.stat, {state: 'visible'});
    }

    public async getStat(){
        return await this.page.innerText(this.stat);
    }



}