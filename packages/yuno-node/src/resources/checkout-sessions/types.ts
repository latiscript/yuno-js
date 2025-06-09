import type { CheckoutSession, Metadata } from "../../types";

export type CheckoutSessionPaymentMethod = {
    name: string;
    vaulted_token: string | null;
    description: string;
    type: string;
    category: string;
    icon: string;
    last_successfully_used: boolean | null;
    last_successfully_used_at: string | null;
    checkout: {
      session: string;
      sdk_required_action: boolean;
      conditions: {
        enabled: boolean;
        rules: string;
      };
    };
    card_data?: {
      iin: string;
      lfd: string;
      expiration_month: number;
      expiration_year: number;
      number_length: number;
      security_code_length: number;
      brand: string;
      issuer: string;
      issuer_code?: string | null;
      category: string;
      type: string;
    };
    preferred: boolean;
};

export type CheckoutSessionInput = CheckoutSession & {
    callback_url?: string;
    metadata?: Metadata[];
};
  
export type CheckoutSessionResponse = CheckoutSession & {
    callback_url: string | null;
    checkout_session: string;
    created_at: Date;
    metadata: Metadata[];
    workflow: string;
};

export type CheckoutSessionPaymentMethodsResponse = CheckoutSessionPaymentMethod[];
