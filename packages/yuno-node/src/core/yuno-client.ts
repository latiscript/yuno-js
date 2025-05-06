import { handleCheckoutSessionMethods } from "../resources/checkout-sessions";
import { handleCustomerMethods } from "../resources/customers";
import { handlePayments } from "../resources/payments";
import { isServer } from "../internal/utils";

export type YunoClientOptions = {
  accountCode: string;
  publicApiKey: string;
  privateSecretKey: string;
  countryCode?: string;
  currency?: string;
};

export const YunoClient = {
  initialize: initYunoClient,
};

function initYunoClient(options: YunoClientOptions) {
  if (!options.accountCode) {
    throw new Error(`You must pass your Yuno's account code.`);
  }

  if (!options.publicApiKey) {
    throw new Error(`You must pass your Yuno's public api key.`);
  }

  if (!options.privateSecretKey) {
    throw new Error(`You must pass your Yuno's private secret key.`);
  }

  if (!isServer) {
    throw new Error(`You're trying to use @yuno-js/node in a non-server environment. This is not supported by default.`);
  }

  const config = {
    apiKeys: options,
    settings: {
      countryCode: options.countryCode,
      currency: options.currency,
    },
  };

  return {
    customers: handleCustomerMethods(config),
    checkoutSessions: handleCheckoutSessionMethods(config),
    payments: handlePayments(config),
  };
}
