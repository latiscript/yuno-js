import {
    ApiKeys,
    Settings,
  } from "../../types";
  
  import { requestHandler } from "../../internal/request-handler";
  import { CheckoutSessionInput, CheckoutSessionPaymentMethodsResponse, CheckoutSessionResponse } from "./types";

  type CheckoutSessionConfig = {
    apiKeys: ApiKeys;
    settings: Settings;
  };
  
  export function handleCheckoutSessionMethods(config: CheckoutSessionConfig) {
    return {
      create: createCheckoutSession(config.apiKeys, config.settings),
      retrievePaymentMethods: retrieveCheckoutSessionPaymentMethods(config.apiKeys),
    };
  }
  
  function createCheckoutSession(apiKeys: ApiKeys, settings: Settings) {
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

      const response = await requestHandler<CheckoutSessionResponse>({
        path: "/v1/checkout/sessions",
        method: "POST",
        apiKeys,
        body,
      });

      console.log(response, 'response')
  
      return response;
    };
  }
  
  function retrieveCheckoutSessionPaymentMethods(apiKeys: ApiKeys) {
    return async function retrieveCheckoutSessionPaymentMethodsInner(
      checkoutSessionId: string,
    ) {
      return await requestHandler<CheckoutSessionPaymentMethodsResponse>({
        path: `/v1/checkout/sessions/${checkoutSessionId}/payment-methods`,
        method: "GET",
        apiKeys,
      });
    };
  }  