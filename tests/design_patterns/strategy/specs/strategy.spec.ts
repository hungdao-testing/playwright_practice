import { expect, test } from '@playwright/test';
import { TPaymentObject, TPaymentSelection } from '../pages/payment/PaymentStrategy';
import PaymentScreen from '../pages/PaymentScreen';




test.describe.parallel('Payment Strategy @strategy', () => {

    let paymentPage: PaymentScreen;

    test("Credit card @creditcard", async ({ page }) => {

        const credit_card: TPaymentObject<TPaymentSelection> = {
            "type": "CREDIT_CARD",
            "data": {
                "year": "2010",
                "cc": "1231212",
                "cvv": "345"
            }
        }
        paymentPage = new PaymentScreen(page);
        await paymentPage.goto();
        await paymentPage.enterUser("test", "last", "use@gmail.com");
        await paymentPage.doPayment(credit_card);

        const orderNum = await paymentPage.getOrder();
        expect(orderNum.length).toBeGreaterThanOrEqual(3);
    })

    test("Net Banking @netbanking", async ({ page }) => {

        const net_banking: TPaymentObject<TPaymentSelection> = {
            "type": "NET_BANKING",
            "data": {
                bank: "WELLS FARGO",
                account: "myaccount123",
                pin: "789789"
            }
        }
        paymentPage = new PaymentScreen(page);
        await paymentPage.goto();
        await paymentPage.enterUser("test", "last", "use@gmail.com");
        await paymentPage.doPayment(net_banking);

        const orderNum = await paymentPage.getOrder();
        expect(orderNum.length).toBeGreaterThanOrEqual(3);
    })



})

