# @yuno-js/react

> ⚠️ **DISCLAIMER**: This is NOT the official Yuno SDK. This is an unofficial React wrapper for the Yuno payment platform. For the official SDK and support, please visit [Yuno's official documentation](https://docs.yuno.com).

A React SDK for integrating Yuno payment solutions into your React applications. This package provides a simple and efficient way to implement Yuno's payment processing capabilities in your React projects.

## Features

- Easy integration with React applications
- TypeScript support
- Context-based state management
- Customizable checkout experience
- Multiple payment method support
- Full and Lite checkout modes

## Requirements

- React 16.8.0 or higher
- A valid Yuno API key

## Installation

Choose your preferred package manager:

```bash
# Using npm
npm install @yuno-js/react

# Using Yarn
yarn add @yuno-js/react

# Using pnpm
pnpm add @yuno-js/react
```

> Note: For backend integration, you can use our unofficial Node.js SDK (`@yuno-js/node`).

## Configuration

### 1. Add your Yuno Public API Key

Create or modify your `.env` file:

```env
VITE_PUBLIC_API_KEY=your_yuno_public_api_key_here
```

## Usage

### 1. Initialize Yuno Provider

Wrap your application with the `YunoProvider` at the root level:

```tsx
import { YunoProvider } from "@yuno-js/react";

function App() {
  return (
    <YunoProvider
      countryCode="CO"
      language="es"
      publicApiKey={import.meta.env.VITE_PUBLIC_API_KEY}
    >
      <YourApp />
    </YunoProvider>
  );
}

export default App;
```

### 2. Using the Full Checkout Component

The `Full` component provides a complete checkout experience:

```tsx
import { Full, useYuno } from "@yuno-js/react";

export default function CheckoutComponent() {
  const { yuno, isLoading } = useYuno();

  const handlePayment = () => {
    if (!isLoading && yuno?.startPayment) {
      yuno.startPayment();
    }
  };

  return (
    <div className="checkout-container">
      <Full
        className="w-1/2"
        config={{
          checkoutSession: "your_checkout_session_id",
          yunoCreatePayment: async (ott) => {
            // Handle payment creation with your backend
            const response = await fetch("/api/payments", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                token: ott,
                // Add other payment details
              }),
            });
            const data = await response.json();

            if (data.checkout.sdk_action_required) {
              yuno?.continuePayment();
            }
          },
        }}
      />
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}
```

### 3. Using the Lite Checkout Component

For a more compact checkout experience, use the `Lite` component:

```tsx
import { Lite, useYuno } from "@yuno-js/react";

export default function LiteCheckoutComponent() {
  const { yuno, isLoading } = useYuno();

  return (
    <div className="checkout-container">
      <Lite
        config={{
          checkoutSession: "your_checkout_session_id",
          yunoCreatePayment: async (ott) => {
            // Handle payment creation
            // Similar to Full component implementation
          },
        }}
        mount={
          {
            // Additional mount options if needed
          }
        }
      />
    </div>
  );
}
```

## API Reference

### YunoProvider Props

| Prop         | Type   | Required | Description                                 |
| ------------ | ------ | -------- | ------------------------------------------- |
| publicApiKey | string | Yes      | Your Yuno public API key                    |
| countryCode  | string | Yes      | Country code for the checkout (e.g., "CO")  |
| language     | string | Yes      | Language code for the checkout (e.g., "es") |

### Components

#### Full Component Props

| Prop      | Type   | Required | Description                           |
| --------- | ------ | -------- | ------------------------------------- |
| config    | object | Yes      | Configuration object for the checkout |
| mount     | object | No       | Additional mount options              |
| className | string | No       | CSS class name for the container      |

#### Lite Component Props

| Prop   | Type   | Required | Description                           |
| ------ | ------ | -------- | ------------------------------------- |
| config | object | Yes      | Configuration object for the checkout |
| mount  | object | No       | Additional mount options              |

### useYuno Hook

Returns an object with:

- `yuno`: The Yuno client instance
- `isLoading`: Boolean indicating if the client is still initializing

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues, bugs, or feature requests, please [open an issue](https://github.com/yourusername/yuno/issues) in our GitHub repository. For official Yuno support, please visit [Yuno's official documentation](https://docs.yuno.com).
