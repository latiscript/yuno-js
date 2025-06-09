export type Nullable<T extends {}> = {
  [K in keyof T]: T[K] | null;
};

export type Document = {
  document_type: string;
  document_number: string;
};

export type Phone = {
  number: string;
  country_code: string;
};

export type BillingAddress = {
  address_line_1: string;
  address_line_2: string;
  country: string;
  state: string;
  city: string;
  zip_code: string;
  neighborhood: string;
};

export type ShippingAddress = {
  address_line_1: string;
  address_line_2: string;
  country: string;
  state: string;
  city: string;
  zip_code: string;
  neighborhood: string;
};

export type Customer = {
  first_name: string;
  last_name: string;
  email: string;
  country: string | undefined;
};

export type Amount = {
  currency: string | undefined;
  value: number;
};

export type CardData = {
  number: string;
  expiration_month: number;
  expiration_year: number;
  security_code: string;
  holder_name: string;
  type?: string;
};

export type TokenData = {
  number: string;
  holder_name?: string;
  expiration_month: number;
  expiration_year: number;
  cryptogram: string;
  electronic_commerce_indicator?: string;
  token_requestor_id?: string;
};

export type NetworkToken = {
  token_data: TokenData;
};

export type ThreeDSecure = {
  three_d_secure_setup_id?: string;
  version?: string;
  electronic_commerce_indicator?: string;
  cryptogram?: string;
  token_requestor_id?: string;
  directory_server_transaction_id?: string;
};

export type StoredCredentials = {
  reason: string;
  usage: string;
  stored_credentials_id: string;
  network_transaction_id: string;
};

export type CardDetail = {
  capture?: boolean;
  installments?: number;
  first_installment_deferral?: number;
  soft_descriptor?: string;
  card_data?: CardData;
  network_token?: NetworkToken;
  three_d_secure?: ThreeDSecure;
  verify?: boolean;
  stored_credentials?: StoredCredentials;
};

export type TicketDetail = {
  benefit_type: string;
  ticket_number: string;
  ticket_provider: string;
  ticket_url: string;
};

export type WalletDetail = {
  cryptogram: string;
};

export type PaymentMethodDetail = {
  card?: CardDetail;
  ticket?: TicketDetail;
  wallet?: WalletDetail;
};

export type CustomerPayer = {
  id?: string;
  merchant_customer_id?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  date_of_birth?: string;
  email?: string;
  nationality?: string;
  document?: Document;
  phone?: Phone;
  billing_address?: BillingAddress;
  shipping_address?: ShippingAddress;
  ip_address?: string;
}

export type Workflow = 'SDK_CHECKOUT' | 'DIRECT' | 'REDIRECT'

export type PaymentMethod<TWorkflow extends Workflow = Workflow> = TWorkflow extends 'SDK_CHECKOUT'
  ? {
    token: string;
    vaulted_token?: string;
    type?: string;
    detail?: PaymentMethodDetail;
    vault_on_success?: boolean;
  } : {
    token?: string;
    vaulted_token?: string;
    type?: string;
    detail?: PaymentMethodDetail;
    vault_on_success?: boolean;
  };

export type CheckoutSession = {
  customer_id?: string;
  merchant_order_id: string;
  payment_description: string;
  country: string | undefined;
  amount: Amount;
  sdk_action_required?: boolean;
};

export type ApiKeys = {
  accountCode: string;
  publicApiKey: string;
  privateSecretKey: string;
};

export type Settings = {
  countryCode?: string;
  currency?: string;
  idempotencyKey?: string;
};

export type FraudScreening = {
  stand_alone?: boolean;
};

export type Liability = {
  processing_fee: string;
  chargebacks: boolean;
};

export type SplitMarketplace = {
  recipient_id: string;
  provider_recipient_id: string;
  type: string;
  merchant_reference: string;
  amount: Amount;
  liability: Liability;
};

export type Metadata = {
  key: string;
  value: string;
};

export type Checkout<TWorkflow extends Workflow = Workflow> = TWorkflow extends 'SDK_CHECKOUT'
  ? {
      session: string;
      sdk_action_required?: boolean;
    }
  : {
      session?: string;
      sdk_action_required?: boolean;
  };

export type PaymentMethodData = {
  vaulted_token: string;
  type: string;
  vault_on_success: boolean;
  token: string;
  detail?: {
    redirect_url?: string;
  };
  payment_method_detail: {
    wallet: {
      verify: boolean;
      capture: boolean;
      installments: number;
      installments_plan_id: string;
      first_installment_deferral: number;
      installments_type: string;
      installment_amount: string;
      soft_descriptor: string;
      authorization_code: string;
      retrieval_reference_number: string;
      voucher: string;
      card_data: {
        holder_name: string;
        iin: string;
        lfd: string;
        number_length: number;
        security_code_length: number;
        brand: string;
        issuer_name: string;
        issuer_code: string;
        category: string;
        type: string;
        three_d_secure: {
          version: string;
          electronic_commerce_indicator: string;
          cryptogram: string;
          transaction_id: string;
          directory_server_transaction_id: string;
          pares_status: string;
          acs_id: string;
        };
      };
      stored_credentials: {
        reason: string;
        usage: string;
        subscription_agreement_id: string;
        network_transaction_id: string;
      };
      redirect_url: string;
    };
    card: {
      verify: boolean;
      capture: boolean;
      installments: number;
      installments_plan_id: string;
      first_installment_deferral: number;
      installments_type: string;
      installment_amount: string;
      soft_descriptor: string;
      authorization_code: string;
      retrieval_reference_number: string;
      voucher: string;
      card_data: {
        holder_name: string;
        iin: string;
        lfd: string;
        number_length: number;
        security_code_length: number;
        brand: string;
        issuer_name: string;
        issuer_code: string;
        category: string;
        type: string;
        three_d_secure: {
          version: string;
          electronic_commerce_indicator: string;
          cryptogram: string;
          transaction_id: string;
          directory_server_transaction_id: string;
          pares_status: string;
          acs_id: string;
        };
      };
      stored_credentials: {
        reason: string;
        usage: string;
        subscription_agreement_id: string;
        network_transaction_id: string;
      };
    };
  };
}

export type ProviderData = {
  id: string;
  transaction_id: string;
  account_id: string;
  status: string;
  status_detail: string;
  response_message: string;
  iso8583_response_code: string;
  iso8583_response_message: string;
  raw_response: {
    value: string;
  }
  third_party_transaction_id: string;
}

export type Transaction = {
  id: string;
  type: string;
  status: string;
  category: string;
  amount: number;
  provider_id: string;
  response_code: string;
  description: string;
  merchant_reference: string | null
  payment_method: PaymentMethodData;
  provider_data: ProviderData;
  three_d_secure_action_required: boolean | null;
  created_at: Date;
  updated_at: Date;
};