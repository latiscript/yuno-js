# @yuno-js/node

> Node.js SDK for Yuno payment platform integration

A Node.js SDK that provides a simple and efficient way to integrate Yuno's payment processing capabilities into your Node.js applications.

## Features

- TypeScript support
- Checkout session management
- Customer management
- Payment processing
- Environment-based configuration
- Idempotency support for payments

## Requirements

- Node.js 14.0.0 or higher
- A valid Yuno account with API credentials

## Installation

```bash
# npm
npm install @yuno-js/node

# Yarn
yarn add @yuno-js/node

# pnpm
pnpm add @yuno-js/node
```

## Configuration

### Environment Variables

Create a `.env` file in your project root:

```env
ACCOUNT_CODE=your_account_code
PUBLIC_API_KEY=your_public_api_key
PRIVATE_SECRET_KEY=your_private_secret_key
```

## Usage

### Initialize YunoClient

```ts
// utils/yuno.ts
import "dotenv/config";
import { YunoClient } from "@yuno-js/node";

export const yunoClient = YunoClient.initialize({
  accountCode: process.env.ACCOUNT_CODE,
  publicApiKey: process.env.PUBLIC_API_KEY,
  privateSecretKey: process.env.PRIVATE_SECRET_KEY,
});
```

### API Examples

#### Express.js Integration

```ts
import express from "express";
import cors from "cors";
import type {
  CheckoutSessionInput,
  CustomerInput,
  PaymentInput,
} from "@yuno-js/node";
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

// Create a customer
app.post("/customers", async (req, res) => {
  const body = req.body as CustomerInput;
  const customer = await yunoClient.customers.create(body);
  res.json(customer).status(200);
});

// Create a payment
app.post("/payments", async (req, res) => {
  const body = req.body as PaymentInput;
  const payment = await yunoClient.payments.create(body);
  res.json(payment).status(200);
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
```

#### Customers

```ts
// Create a customer
const customer = await yunoClient.customers.create({
  email: "customer@example.com",
  country: "US",
  // ... other customer options
});
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
```

## TypeScript Support

The SDK is written in TypeScript and provides type definitions for all available methods and responses. This ensures type safety and better developer experience.

## Error Handling

The SDK handles API errors and provides meaningful error messages. All API calls are wrapped in try-catch blocks to handle potential errors gracefully.

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues, bugs, or feature requests, please [open an issue](https://github.com/yourusername/yuno/issues) in our GitHub repository. For official Yuno support, please visit [Yuno's official documentation](https://docs.yuno.com).
