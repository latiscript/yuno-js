import { randomUUID } from "crypto";
import type { ApiKeys } from "../../types";
import { requestHandler } from "../../internal/request-handler";
import { PaymentLinkInput, PaymentLinkResponse } from "./types";

type PaymentLinksConfig = {
  apiKeys: ApiKeys;
};

export function handlePaymentLinks(config: PaymentLinksConfig) {
  return {
    create: createPaymentLink(config.apiKeys),
    retrieve: retrievePaymentLink(config.apiKeys),
  };
}

export function createPaymentLink(apiKeys: ApiKeys) {
  return async function createPaymentLinkInner(
    paymentLink: PaymentLinkInput,
    idempotencyKey?: string,
  ) {
    const body = { ...paymentLink, account_id: apiKeys.accountCode };

    return await requestHandler<PaymentLinkResponse>({
      path: "/v1/payment-links",
      method: "POST",
      apiKeys,
      body,
      idempotencyKey: idempotencyKey ?? randomUUID(),
    });
  };
}

export function retrievePaymentLink(apiKeys: ApiKeys) {
  return async function retrievePaymentLinkInner(paymentLinkId: string) {
    return await requestHandler<PaymentLinkResponse>({
      path: `/v1/payment-links/${paymentLinkId}`,
      method: "GET",
      apiKeys,
    });
  };
}
