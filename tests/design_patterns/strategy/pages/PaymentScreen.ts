import { Page } from '@playwright/test';
import UserInformation from './user_info/UserInformation';
import Order from './order/Order';
import {TPaymentObject, TPaymentSelection } from './payment/PaymentStrategy';
import PaymentFactory from './PaymentFactory';


export default class PaymentScreen {

    protected page: Page;
    private userInformation: UserInformation;
    private order: Order;


    constructor(page: Page) {
        this.page = page;
        this.userInformation = new UserInformation(page);
        this.order = new Order(page);
    }

    async goto(){
        await this.page.goto("https://vins-udemy.s3.amazonaws.com/ds/strategy.html")
    }

    async doPayment(paymentInfo: TPaymentObject<TPaymentSelection>){
        PaymentFactory.setPageInstance(this.page);
        await PaymentFactory.setPayment(paymentInfo.type).enterPaymentInformation(paymentInfo.data)
    }

    async enterUser(fn: string, ln: string, email: string){
        await this.userInformation.enterDetails(fn, ln, email);
    }

    async getOrder(){
        return this.order.placeOrder();
    }

}