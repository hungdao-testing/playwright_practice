import { Page } from "@playwright/test";

export default class Order{
    
    private page: Page;
    private buyNow: string = "#buy";
    private orderNumber: string = "#ordernumber";

    constructor(page: Page){
        this.page = page;

    }

    public async placeOrder(): Promise<string>{
        await this.page.click(this.buyNow);
        return await this.page.innerText(this.orderNumber);
    }


}