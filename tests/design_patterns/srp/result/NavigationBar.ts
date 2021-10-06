import { Page } from "@playwright/test";
import AbstractComponent from "../common/AbstractComponent";


export default class NavigationBar extends AbstractComponent{
    
    private bar = "div#hdtb";
    private images = 'a:has-text("Hình ảnh")'
    private news = "a:has-text('Tin tức')"


    constructor(page: Page){
        super(page)
    }

    public async isDisplayed() {
        await this.page.waitForSelector(this.bar, {state: 'visible'});
        return true;
    }

    public async goToImageTab(){
        await this.page.click(this.images);
    }

    
    public async goToNewsTab(){
        await this.page.click(this.news);
    }
}