import type { Amount, CustomerPayer, Metadata } from "../../types";

export type PaymentLinkTax = {
    type: string;
    tax_base: number;
    value: number;
    percentage: number;
}
  
export type PaymentLinkAvaibility = {
    start_at?: string;
    finish_at?: string;
}
  
export type PaymentLinkInput = {
    account_id: string;
    description: string;
    country: string;
    merchant_order_id: string;
    amount: Amount;
    capture?: boolean;
    taxes?: PaymentLinkTax[]
    customer_payer?: CustomerPayer;
    callback_url?: string;
    one_time_use?: boolean;
    avaibility?: PaymentLinkAvaibility;
    payment_method_types?: string[];
    metadata?: Metadata[];
    vault_on_success?: boolean;
}

export type PaymentLinkResponse = {
    code: string;
    country: string;
    avaiability: PaymentLinkAvaibility;
    status: string;
    merchant_order_id: string;
    description: string;
    amount: Amount;
    capture: boolean;
    metadata: Metadata[];
    split_payment_methods: boolean;
    payment_method_types: string[];
    one_time_use: boolean;
    payments: string
    callback_url: string;
    installments_plan: string;
    customer_payer: CustomerPayer;
    taxes: PaymentLinkTax[];
    account_code: string;
    checkout_url: string;
    payments_number: number;
    merchant_image: string;
}