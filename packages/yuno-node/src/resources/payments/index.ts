import type { ApiKeys } from "../../types";
import type { IssuersResponse, PaymentCancelInput, PaymentCancelResponse, PaymentInput, PaymentRefundInput, PaymentRefundResponse, PaymentResponse } from "./types";

import { randomUUID } from "crypto";
import { requestHandler } from "../../internal/request-handler";

type PaymentsConfig = {
  apiKeys: ApiKeys;
};

export function handlePayments(config: PaymentsConfig) {
  return {
    create: createPayment(config.apiKeys),
    retrieve: retrievePayment(config.apiKeys),
    refund: refundPayment(config.apiKeys),
    cancel: cancelPayment(config.apiKeys),
    retrieveIssuers: retrieveIssuers(config.apiKeys),
  };
}

function createPayment(apiKeys: ApiKeys) {
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

function retrievePayment(apiKeys: ApiKeys) {
  return async function retrievePaymentInner(paymentId: string) {
    return await requestHandler<PaymentResponse>({
      path: `/v1/payments/${paymentId}`,
      method: "GET",
      apiKeys,
    });
  };
}

function refundPayment(apiKeys: ApiKeys) {
  return async function refundPaymentInner(paymentId: string, transactionId: string, refund: PaymentRefundInput) {
    const body = {
        ...refund,
        account_id: apiKeys.accountCode,
    }

    return await requestHandler<PaymentRefundResponse>({
      path: `/v1/payments/${paymentId}/transactions/${transactionId}/refund`,
      method: "POST",
      apiKeys,
      body,
    });
  };
}

function cancelPayment(apiKeys: ApiKeys) {
  return async function cancelPaymentInner(paymentId: string, transactionId: string, cancel: PaymentCancelInput) {
    const body = cancel;

    return await requestHandler<PaymentCancelResponse>({
      path: `/v1/payments/${paymentId}/transactions/${transactionId}/cancel`,
      method: "POST",
      apiKeys,
      body,
    });
  };
}

function retrieveIssuers(apiKeys: ApiKeys) {
  return async function retrieveIssuersInner(paymentMethod: string) {
    return await requestHandler<IssuersResponse>({
      path: `/v1/issuers?payment_method=${paymentMethod}`,
      method: "GET",
      apiKeys,
    });
  };
}
