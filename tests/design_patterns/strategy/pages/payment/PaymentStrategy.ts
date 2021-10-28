export type ICreditCard = { "cc": string, "year": string, "cvv": string }
export type INetBanking = { "bank": string, "account": string, "pin": string }

export type TPaymentData = {
    CREDIT_CARD: ICreditCard,
    NET_BANKING: INetBanking
}

export type TPaymentSelection = keyof TPaymentData;
export type TPaymentObject<T extends TPaymentSelection> = T extends any ? {
    type: T;
    data: TPaymentData[T];
} : never;


export interface IPaymentStrategy {
    enterPaymentInformation(paymentDetails: TPaymentObject<TPaymentSelection>['data']): Promise<void>
}
