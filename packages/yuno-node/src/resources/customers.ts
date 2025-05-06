import { ApiKeys, CustomerInput, CustomerResponse, Settings } from "../types";

import { nanoid } from "nanoid";
import { requestHandler } from "../internal/request-handler";

type CustomerConfig = {
  apiKeys: ApiKeys;
  settings: {
    countryCode?: string;
  };
};

export function handleCustomerMethods(config: CustomerConfig) {
  return {
    create: createCustomer(config.apiKeys, config.settings),
  };
}

/**
 * @param {string} merchant_customer_id - Optional parameter, if you don't pass a value Yuno will generate one for you
 */
function createCustomer(
  apiKeys: ApiKeys,
  settings: CustomerConfig["settings"],
) {
  return async function createCustomerInner(customer: CustomerInput) {
    const body = {
      ...customer,
      merchant_customer_id: customer.merchant_customer_id ?? nanoid(),
      country_code: customer.country ?? settings.countryCode,
    };

    return await requestHandler<CustomerResponse>({
      path: "/v1/customers",
      method: "POST",
      apiKeys,
      body,
    });
  };
}
