import {
  ApiKeys,
  CheckoutSessionInput,
  CheckoutSessionResponse,
  Settings,
} from "../types";

import { requestHandler } from "../internal/request-handler";

type CheckoutSessionConfig = {
  apiKeys: ApiKeys;
  settings: Settings;
};

export function handleCheckoutSessionMethods(config: CheckoutSessionConfig) {
  return {
    create: createCheckoutSession(config.apiKeys, config.settings),
  };
}

export function createCheckoutSession(apiKeys: ApiKeys, settings: Settings) {
  return async function createCheckoutSessionInner(
    checkoutSession: CheckoutSessionInput,
  ) {
    const body = {
      ...checkoutSession,
      account_id: apiKeys.accountCode,
      country_code: checkoutSession.country ?? settings.countryCode,
      amount: {
        currency: checkoutSession.amount.currency ?? settings.currency,
        value: checkoutSession.amount.value,
      },
    };

    return await requestHandler<CheckoutSessionResponse>({
      path: "/v1/checkout/sessions",
      method: "POST",
      apiKeys,
      body,
    });
  };
}
