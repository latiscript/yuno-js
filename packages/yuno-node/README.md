# @latiscript/yuno-node

> **Unofficial package — not affiliated with or endorsed by Yuno.**

> Node.js SDK for Yuno payment platform integration

A Node.js SDK that provides a simple and efficient way to integrate Yuno's payment processing capabilities into your Node.js applications.

## Features

- TypeScript support
- Checkout session management (create, retrieve payment methods)
- Customer management (create, retrieve)
- Payment processing (create, retrieve, refund, cancel, retrieve issuers)
- Payouts (create, retrieve)
- Environment-based configuration
- Idempotency support for payments and payouts

## Requirements

- Node.js 14.0.0 or higher
- A valid Yuno account with API credentials

## Installation

```bash
# npm
npm install @latiscript/yuno-node

# Yarn
yarn add @latiscript/yuno-node

# pnpm
pnpm add @latiscript/yuno-node
```

## Configuration

### Environment Variables

Create a `.env` file in your project root:

```env
ACCOUNT_CODE=your_account_code
PUBLIC_API_KEY=your_public_api_key
PRIVATE_SECRET_KEY=your_private_secret_key
```

### Initialization

You can optionally provide default `countryCode` and `currency` for your client:

```ts
import "dotenv/config";
import { YunoClient } from "@latiscript/yuno-node";

export const yunoClient = YunoClient.initialize({
  accountCode: process.env.ACCOUNT_CODE,
  publicApiKey: process.env.PUBLIC_API_KEY,
  privateSecretKey: process.env.PRIVATE_SECRET_KEY,
  countryCode: "US", // Optional
  currency: "USD",   // Optional
});
```

## Usage

### API Examples

#### Express.js Integration

```ts
import express from "express";
import cors from "cors";
import type {
  CheckoutSessionInput,
  CustomerInput,
  PaymentInput,
  PayoutInput,
} from "@latiscript/yuno-node";
import "dotenv/config";
import { yunoClient } from "./utils/yuno";

const app = express();

app.use(cors());
app.use(express.json());

// Create a checkout session
app.post("/checkout/sessions", async (req, res) => {
  const body = req.body as CheckoutSessionInput;
  const checkoutSession = await yunoClient.checkoutSessions.create(body);
  res.json(checkoutSession).status(200);
});

// Retrieve payment methods for a checkout session
app.get("/checkout/sessions/:id/payment-methods", async (req, res) => {
  const paymentMethods = await yunoClient.checkoutSessions.retrievePaymentMethods(req.params.id);
  res.json(paymentMethods).status(200);
});

// Create a customer
app.post("/customers", async (req, res) => {
  const body = req.body as CustomerInput;
  const customer = await yunoClient.customers.create(body);
  res.json(customer).status(200);
});

// Retrieve a customer
app.get("/customers/:id", async (req, res) => {
  const customer = await yunoClient.customers.retrieve(req.params.id);
  res.json(customer).status(200);
});

// Create a payment
app.post("/payments", async (req, res) => {
  const body = req.body as PaymentInput;
  const payment = await yunoClient.payments.create(body);
  res.json(payment).status(200);
});

// Retrieve a payment
app.get("/payments/:id", async (req, res) => {
  const payment = await yunoClient.payments.retrieve(req.params.id);
  res.json(payment).status(200);
});

// Refund a payment
app.post("/payments/:id/transactions/:transactionId/refund", async (req, res) => {
  const refund = await yunoClient.payments.refund(req.params.id, req.params.transactionId, req.body);
  res.json(refund).status(200);
});

// Cancel a payment
app.post("/payments/:id/transactions/:transactionId/cancel", async (req, res) => {
  const cancel = await yunoClient.payments.cancel(req.params.id, req.params.transactionId, req.body);
  res.json(cancel).status(200);
});

// Retrieve issuers for a payment method
app.get("/issuers/:paymentMethod", async (req, res) => {
  const issuers = await yunoClient.payments.retrieveIssuers(req.params.paymentMethod);
  res.json(issuers).status(200);
});

// Create a payout
app.post("/payouts", async (req, res) => {
  const body = req.body as PayoutInput;
  const payout = await yunoClient.payouts.create(body);
  res.json(payout).status(200);
});

// Retrieve a payout
app.get("/payouts/:id", async (req, res) => {
  const payout = await yunoClient.payouts.retrieve(req.params.id);
  res.json(payout).status(200);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

### Available Methods

#### Checkout Sessions

```ts
// Create a checkout session
const checkoutSession = await yunoClient.checkoutSessions.create({
  amount: {
    currency: "USD",
    value: 1000,
  },
  country: "US",
  // ... other checkout session options
});

// Retrieve payment methods for a checkout session
const paymentMethods = await yunoClient.checkoutSessions.retrievePaymentMethods("checkout-session-id");
```

#### Customers

```ts
// Create a customer
const customer = await yunoClient.customers.create({
  email: "customer@example.com",
  country: "US",
  // ... other customer options
});

// Retrieve a customer
const customer = await yunoClient.customers.retrieve("customer-id");
```

#### Payments

```ts
// Create a payment with idempotency key
const payment = await yunoClient.payments.create(
  {
    amount: {
      currency: "USD",
      value: 1000,
    },
    // ... other payment options
  },
  "unique-idempotency-key",
);

// Retrieve a payment
const payment = await yunoClient.payments.retrieve("payment-id");

// Refund a payment
const refund = await yunoClient.payments.refund("payment-id", "transaction-id", {
  // ... refund options
});

// Cancel a payment
const cancel = await yunoClient.payments.cancel("payment-id", "transaction-id", {
  // ... cancel options
});

// Retrieve issuers for a payment method
const issuers = await yunoClient.payments.retrieveIssuers("payment-method");
```

#### Payouts (New)

```ts
// Create a payout with idempotency key
const payout = await yunoClient.payouts.create(
  {
    merchant_reference: "your-unique-reference",
    country: "US",
    purpose: "FREELANCER_SERVICES",
    amount: {
      currency: "USD",
      value: 5000,
    },
    beneficiary: {
      merchant_beneficiary_id: "beneficiary-id",
      country: "US",
      // ... other beneficiary details
    },
    withdrawal_method: {
      type: "bank_transfer",
      provider_id: "provider-id",
      // ... other withdrawal method details
    },
    // ... other payout options
  },
  "unique-idempotency-key",
);

// Retrieve a payout
const payout = await yunoClient.payouts.retrieve("payout-id");
```

## TypeScript Support

The SDK is written in TypeScript and provides type definitions for all available methods and responses. This ensures type safety and better developer experience.

### Notable Types
- `CheckoutSessionInput`, `CheckoutSessionPaymentMethod`
- `CustomerInput`, `CustomerResponse`
- `PaymentInput`, `PaymentResponse`, `PaymentRefundInput`, `PaymentRefundResponse`, `PaymentCancelInput`, `PaymentCancelResponse`
- `PayoutInput`, `PayoutResponse`, `PayoutPurpose`, `PayoutBeneficiary`, `PayoutWithdrawalMethod`

## Error Handling

The SDK handles API errors and provides meaningful error messages. All API calls are wrapped in try-catch blocks to handle potential errors gracefully.

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues, bugs, or feature requests, please [open an issue](https://github.com/yourusername/yuno/issues) in our GitHub repository. For official Yuno support, please visit [Yuno's official documentation](https://docs.yuno.com).
