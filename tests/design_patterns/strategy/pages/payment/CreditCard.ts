import { CreditCardObj, IPaymentStrategy } from "./PaymentStrategy";
import { Page } from '@playwright/test';



export default class CreditCard  implements IPaymentStrategy {

    private page: Page;
    private cc: string = "#cc";
    private year: string = "#year";
    private cvv: string = "#cvv";

    constructor(page: Page){
        this.page = page;
    }

    async enterPaymentInformation(paymentDetails: CreditCardObj) {
        await this.page.locator(this.cc).type(paymentDetails.cc);
        await this.page.locator(this.cvv).type(paymentDetails.cvv);
        await this.page.locator(this.year).type(paymentDetails.year);
    }


}