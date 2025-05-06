import { ApiKeys, PaymentInput, PaymentResponse, Settings } from "../types";

import { randomUUID } from "crypto";
import { requestHandler } from "../internal/request-handler";

type PaymentsConfig = {
  apiKeys: ApiKeys;
};

export function handlePayments(config: PaymentsConfig) {
  return {
    create: createPayment(config.apiKeys),
  };
}

export function createPayment(apiKeys: ApiKeys) {
  return async function createPaymentInner(
    payment: PaymentInput,
    idempotencyKey?: string,
  ) {
    const body = { ...payment, account_id: apiKeys.accountCode };

    return await requestHandler<PaymentResponse>({
      path: "/v1/payments",
      method: "POST",
      apiKeys,
      body,
      idempotencyKey: idempotencyKey ?? randomUUID(),
    });
  };
}
