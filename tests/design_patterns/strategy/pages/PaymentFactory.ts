import { IPaymentStrategy, TPaymentSelection } from "./payment/PaymentStrategy";
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

  public static setPayment(type: TPaymentSelection) {
    const map: Record<TPaymentSelection, IPaymentStrategy> = {
      "CREDIT_CARD": new CreditCard(PaymentFactory.getPageInstance()),
      "NET_BANKING": new NetBanking(PaymentFactory.getPageInstance())
    }
    return map[type];
  }


}



