export type CreditCardObj = { "cc": string, "year": string, "cvv": string }
export type NetBankingObj = { "bank": string, "account": string, "pin": string }

// Ref: https://stackoverflow.com/questions/53392498/avoid-typescript-casting-inside-a-switch
export type PaymentTypeMap = {
    CREDIT_CARD: CreditCardObj,
    NET_BANKING: NetBankingObj
}

export type PaymentType = keyof PaymentTypeMap;
export type PaymentObject<T extends PaymentType> = T extends any ? {
    type: T;
    data: PaymentTypeMap[T];
} : never;


export interface IPaymentStrategy {
    enterPaymentInformation(paymentDetails: PaymentObject<PaymentType>['data']): Promise<void>
}

