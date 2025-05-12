"use server";

import type { CheckoutSessionInput, CustomerInput } from "@latiscript/yuno-node";

import { PaymentInput } from "@latiscript/yuno-node";
import { yunoClient } from "@/utils/yuno";

export async function createYunoCustomer(customer: CustomerInput) {
  const customerResponse = await yunoClient.customers.create(customer);
  
  return customerResponse;
}

export async function createYunoCheckoutSession(
  checkout: CheckoutSessionInput,
) {
  const checkoutSessionResponse =
    await yunoClient.checkoutSessions.create(checkout);

  return checkoutSessionResponse;
}

export async function createYunoPayment(payment: PaymentInput) {
  const paymentResponse = await yunoClient.payments.create(payment);

  return paymentResponse;
}
