import { randomUUID } from "crypto";
import type { ApiKeys } from "../../types";
import { requestHandler } from "../../internal/request-handler";
import { PayoutInput, PayoutResponse } from "./types";

type PayoutsConfig = {
  apiKeys: ApiKeys;
};

export function handlePayouts(config: PayoutsConfig) {
  return {
    create: createPayout(config.apiKeys),
    retrieve: retrievePayout(config.apiKeys),
  };
}

function createPayout(apiKeys: ApiKeys) {
  return async function createPayoutInner(
    payout: PayoutInput,
    idempotencyKey?: string,
  ) {
    const body = { ...payout, account_id: apiKeys.accountCode };

    return await requestHandler<PayoutResponse>({
      path: "/v1/payouts",
      method: "POST",
      apiKeys,
      body,
      idempotencyKey: idempotencyKey ?? randomUUID(),
    });
  };
}

function retrievePayout(apiKeys: ApiKeys) {
  return async function retrievePayoutInner(payoutId: string) {
    return await requestHandler<PayoutResponse>({
      path: `/v1/payouts/${payoutId}`,
      method: "GET",
      apiKeys,
    });
  };
}
