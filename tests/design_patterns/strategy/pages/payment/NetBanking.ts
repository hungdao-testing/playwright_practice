import { INetBanking, IPaymentStrategy } from "./PaymentStrategy";
import { Page } from '@playwright/test';


export default class NetBanking implements IPaymentStrategy {

    private page: Page;
    private bank: string = "#bank";
    private account: string = "#acc_number";
    private pin: string = "#pin";

    constructor(page: Page) {
        this.page = page;
    }

    async enterPaymentInformation(paymentDetails: INetBanking): Promise<void> {
        await this.page.locator(this.bank).selectOption(paymentDetails.bank);
        await this.page.locator(this.account).type(paymentDetails.account);
        await this.page.locator(this.pin).type(paymentDetails.pin);
    }


}