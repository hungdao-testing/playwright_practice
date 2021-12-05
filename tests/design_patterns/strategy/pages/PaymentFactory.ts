import { IPaymentStrategy, PaymentType } from "./payment/PaymentStrategy";
import CreditCard from "./payment/CreditCard";
import NetBanking from "./payment/NetBanking";
import { Page } from "@playwright/test";


export default class PaymentFactory {

  private static _page: Page;
  
  public static setPageInstance(page: Page){
    this._page = page;
  }

  public static getPageInstance(){
    return this._page;
  }

  public static setPayment(type: PaymentType) {
    const map: Record<PaymentType, IPaymentStrategy> = {
      "CREDIT_CARD": new CreditCard(PaymentFactory.getPageInstance()),
      "NET_BANKING": new NetBanking(PaymentFactory.getPageInstance())
    }
    return map[type];
  }


}



