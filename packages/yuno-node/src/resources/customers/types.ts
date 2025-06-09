import type { Customer, BillingAddress, Phone, Nullable, Metadata, ShippingAddress, Document } from "../../types";

export type CustomerInput = Customer & {
    merchant_customer_id?: string;
    gender?: string;
    date_of_birth?: string;
    nationality?: string;
    document?: Partial<Document>;
    phone?: Partial<Phone>;
    billing_address?: Partial<BillingAddress>;
    shipping_address?: Partial<ShippingAddress>;
};
  
export type CustomerResponse = Customer & {
    id: string;
    merchant_customer_id: string;
    gender: string | null;
    date_of_birth: string | null;
    nationality: string | null;
    document: Nullable<Document> | null;
    phone: Nullable<Phone> | null;
    billing_address: Nullable<BillingAddress> | null;
    shipping_address: Nullable<ShippingAddress> | null;
    metadata: Metadata[];
    created_at: string;
    updated_at: string;
    merchant_customer_created_at: string;
};