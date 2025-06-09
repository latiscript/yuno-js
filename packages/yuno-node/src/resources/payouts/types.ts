import type { Amount, Transaction, Metadata, BillingAddress, Phone, Document } from "../../types";

export type PayoutInput = {
    account_id: string;
    merchant_reference: string;
    description?: string;
    country: string;
    purpose: PayoutPurpose;
    amount: Amount;
    beneficiary: PayoutBeneficiary;
    withdrawal_method: PayoutWithdrawalMethod;
    metadata?: Metadata[];
}
  
export type PayoutResponse = {
    id: string;
    account_id: string;
    status: string;
    merchant_reference: string;
    purpose: PayoutPurpose;
    country: string;
    description: string;
    amount: Amount;
    beneficiary: PayoutBeneficiary;
    metadata: Metadata[];
    created_at: Date;
    updated_at: Date;
    transactions: Transaction[];
}

export type PayoutPurpose = 'FAMILY_AND_FRIENDS' | 'PERSONAL_TRANSFER' | 'REMITTANCES' | 'PROVIDER_SERVICES' | 'ADVERTISING_SERVICES' | 'REPRESENTATION_SERVICES' | 'ADVISORY_SERVICES' | 'FREELANCER_SERVICES' | 'OTHER';

export type PayoutBeneficiary = {
  merchant_beneficiary_id: string;
  national_entity?: string;
  first_name?: string;
  last_name?: string;
  legal_name?: string;
  email?: string;
  country: string;
  date_of_birth?: string;
  document?: Document;
  phone?: Phone;
  address?: BillingAddress;
}

export type PayoutWithdrawalMethod = {
  type: string;
  provider_id: string;
  vaulted_token?: string;
  original_transaction_id?: string;
  on_hold?: boolean;
  detail?: {
    bank_transfer: any
    wallet: any
  }
}
