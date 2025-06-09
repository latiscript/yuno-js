import type{ Amount, Checkout, CheckoutSession, CustomerPayer, FraudScreening, Metadata, PaymentMethod, ProviderData, SplitMarketplace, Transaction, Workflow } from "../../types";

export type PaymentInputBase = {
    description: string;
    country: string | undefined;
    merchant_order_id: string;
    amount: Amount;
    payment_method: PaymentMethod;
    callback_url?: string;
    fraud_screening?: FraudScreening;
    split_marketplace?: SplitMarketplace[];
    metadata?: Metadata[];
  };
  
export type PaymentInput =
    | ({
        workflow: 'SDK_CHECKOUT';
        checkout: Checkout<'SDK_CHECKOUT'>;
        } & PaymentInputBase)
    | ({
        workflow?: Exclude<Workflow, 'SDK_CHECKOUT'>;
        checkout?: Checkout<Exclude<Workflow, 'SDK_CHECKOUT'>>;
        } & PaymentInputBase);

export type PaymentResponse = {
    id: string;
    account_id: string;
    description: string;
    country: string;
    status: string;
    sub_status: string;
    merchant_order_id: string;
    created_at: Date;
    updated_at: Date;
    amount: Amount;
    checkout: CheckoutSession;
    payment_method: PaymentMethodData;
    transactions?: Transaction[];
};

export type PaymentRefundInput = {
    merchant_reference: string;
    description?: string;
    reason?: 'DUPLICATE' | 'FRAUDULENT' | 'REQUESTED_BY_CUSTOMER'
    amount?: Amount;
    response_additional_data?: {
      receipt?: boolean;
      receipt_language?: string;
    }
    customer_payer?: CustomerPayer;
  }
  
  export type PaymentRefundResponse = {
    id: string;
    account_id: string;
    description: string;
    country: string;
    status: string;
    sub_status: string;
    merchant_order_id: string;
    created_at: string;
    updated_at: string;
    amount: Amount;
    checkout: {
      session: string
    }
    payment_method: PaymentMethod
    customer_payer: CustomerPayer
    additional_data: string
    transactions: Transaction[]
    transactions_history: string
    metadata: Metadata[]
    fraud_screeing: string
    payment_link_id: string
    subscription_code: string
    routing_rules: string
    simplified_mode: boolean
  }
  
  export type PaymentCancelInput = {
    merchant_reference: string;
    description?: string;
    reason?: string;
    response_additional_data?: {
      receipt?: boolean;
      receipt_language?: string;
    }
  }
  
  export type PaymentCancelResponse = {
    id: string;
    type: string;
    status: string;
    category: string;
    amount: Amount & {
      captured?: number;
      currency_conversion?: string;
      refunded?: number;
    };
    merchant_reference: string;
    created_at: string;
    updated_at: string;
    provider_data: ProviderData;
    response_code: string;
    response_message: string;
    customer_payer: string;
    simplified_mode: boolean;
    receipt: boolean;
    receipt_url: string;
    receipt_language: string;
  }

export type Issuer = {
    id: string;
    name: string;
  }
  
  export type IssuersResponse = {
    issuers: Issuer[]
  }