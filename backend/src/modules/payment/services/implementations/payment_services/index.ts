
export enum SUPPORTED_PAYMENT_SERVICES {
    STRIPE = "STRIPE"
}

export interface PAYMENT_METHOD {
    name : SUPPORTED_PAYMENT_SERVICES,
    access_key : string,
    access_secret : string
}