type Nullable<T extends {}> = {
    [K in keyof T]: T[K] | null;
};
type Document = {
    document_type: string;
    document_number: string;
};
type Phone = {
    number: string;
    country_code: string;
};
type BillingAddress = {
    address_line_1: string;
    address_line_2: string;
    country: string;
    state: string;
    city: string;
    zip_code: string;
};
type ShippingAddress = {
    address_line_1: string;
    address_line_2: string;
    country: string;
    state: string;
    city: string;
    zip_code: string;
};
type Customer = {
    first_name: string;
    last_name: string;
    email: string;
    country: string;
};
type Amount = {
    currency: string;
    value: number;
};
type CardData = {
    number: string;
    expiration_month: number;
    expiration_year: number;
    security_code: string;
    holder_name: string;
    type?: string;
};
type TokenData = {
    number: string;
    holder_name?: string;
    expiration_month: number;
    expiration_year: number;
    cryptogram: string;
    electronic_commerce_indicator?: string;
    token_requestor_id?: string;
};
type NetworkToken = {
    token_data: TokenData;
};
type ThreeDSecure = {
    three_d_secure_setup_id?: string;
    version?: string;
    electronic_commerce_indicator?: string;
    cryptogram?: string;
    token_requestor_id?: string;
    directory_server_transaction_id?: string;
};
type StoredCredentials = {
    reason: string;
    usage: string;
    stored_credentials_id: string;
    network_transaction_id: string;
};
type CardDetail = {
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
type TicketDetail = {
    benefit_type: string;
    ticket_number: string;
    ticket_provider: string;
    ticket_url: string;
};
type WalletDetail = {
    cryptogram: string;
};
type PaymentMethodDetail = {
    card?: CardDetail;
    ticket?: TicketDetail;
    wallet?: WalletDetail;
};
type PaymentMethod = {
    token?: string;
    vaulted_token?: string;
    type?: string;
    detail?: PaymentMethodDetail;
    vault_on_success?: boolean;
};
type CustomerInput = Customer & {
    merchant_customer_id?: string;
    gender?: string;
    date_of_birth?: string;
    nationality?: string;
    document?: Partial<Document>;
    phone?: Partial<Phone>;
    billing_address?: Partial<BillingAddress>;
    shipping_address?: Partial<ShippingAddress>;
};
type CustomerResponse = Customer & {
    id: string;
    merchant_customer_id: string;
    gender: string | null;
    date_of_birth: string | null;
    nationality: string | null;
    document: Nullable<Document> | null;
    phone: Nullable<Phone> | null;
    billing_address: Nullable<BillingAddress> | null;
    shipping_address: Nullable<ShippingAddress> | null;
    created_at: string;
    updated_at: string;
};
type CheckoutSession = {
    customer_id?: string;
    merchant_order_id: string;
    payment_description: string;
    country: string;
    amount: Amount;
    sdk_action_required?: boolean;
};
type CheckoutSessionInput = CheckoutSession & {
    callback_url?: string;
    metadata?: any;
};
type CheckoutSessionResponse = CheckoutSession & {
    callback_url: string | null;
    checkout_session: string;
    created_at: Date;
    metadata: any;
    workflow: string;
};
type ApiKeys = {
    accountCode: string;
    publicApiKey: string;
    privateSecretKey: string;
};
type Settings = {
    countryCode?: string;
    currency?: string;
    idempotencyKey?: string;
};
type FraudScreening = {
    stand_alone?: boolean;
};
type Liability = {
    processing_fee: string;
    chargebacks: boolean;
};
type SplitMarketplace = {
    recipient_id: string;
    provider_recipient_id: string;
    type: string;
    merchant_reference: string;
    amount: Amount;
    liability: Liability;
};
type Metadata = {
    key: string;
    value: string;
};
type PaymentInput = {
    description: string;
    country: string;
    merchant_order_id: string;
    amount: Amount;
    payment_method: PaymentMethod;
    checkout?: Checkout;
    workflow?: string;
    callback_url?: string;
    fraud_screening?: FraudScreening;
    split_marketplace?: SplitMarketplace[];
    metadata?: Metadata[];
};
type Checkout = {
    session: string;
    sdk_action_required?: boolean;
};
type PaymentMethodData = {
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
};
type ProviderData = {
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
    };
    third_party_transaction_id: string;
};
type Transaction = {
    id: string;
    type: string;
    status: string;
    category: string;
    amount: number;
    provider_id: string;
    response_code: string;
    description: string;
    merchant_reference: string | null;
    payment_method: PaymentMethodData;
    provider_data: ProviderData;
    three_d_secure_action_required: boolean | null;
    created_at: Date;
    updated_at: Date;
};
type PaymentResponse = {
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

type YunoClientOptions = {
    accountCode: string;
    publicApiKey: string;
    privateSecretKey: string;
    countryCode?: string;
    currency?: string;
};
declare const YunoClient: {
    initialize: typeof initYunoClient;
};
declare function initYunoClient(options: YunoClientOptions): {
    customers: {
        create: (customer: CustomerInput) => Promise<CustomerResponse>;
    };
    checkoutSessions: {
        create: (checkoutSession: CheckoutSessionInput) => Promise<CheckoutSessionResponse>;
    };
    payments: {
        create: (payment: PaymentInput, idempotencyKey?: string) => Promise<PaymentResponse>;
        retrieve: (paymentId: string) => Promise<PaymentResponse>;
    };
};

export { YunoClient };
export type { ApiKeys, Checkout, CheckoutSession, CheckoutSessionInput, CheckoutSessionResponse, CustomerInput, CustomerResponse, PaymentInput, PaymentMethodData, PaymentResponse, ProviderData, Settings, Transaction, YunoClientOptions };
