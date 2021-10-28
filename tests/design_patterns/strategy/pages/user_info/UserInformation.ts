import {ElementHandle, Locator, Page} from '@playwright/test';


export default class UserInformation{
    
    private firstName: string = "#fn";
    private lastName: string = "#ln";
    private email: string = "#email";
    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async enterDetails(fn: string, ln: string, email: string){
        await this.page.fill(this.firstName, fn);
        await this.page.fill(this.lastName, ln);
        await this.page.fill(this.email, email);
    }

 

}