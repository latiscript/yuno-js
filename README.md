# yuno-js

> **Unofficial Yuno SDK for Node.js & React**

---

**This is _not_ an official Yuno repository.**

This project is an open-source initiative, born in Latin America and aiming to empower developers all over the world with easy, modern tools to integrate [Yuno](https://y.uno/) payment solutions into their Node.js and React applications. It is built by a Yuno employee, but is not an official product—just a community-driven effort to make integration easier for everyone, especially in the Latin American region. Contributions and usage are welcome from everywhere!

## 🌎 About This Project

**yuno-js** is a set of unofficial wrappers and SDKs for the [Yuno payment platform](https://docs.y.uno/), designed to:

- Simplify integration with Yuno in both Node.js and React projects
- Provide a developer-friendly, TypeScript-first experience
- Offer tools and examples for both backend and frontend
- Encourage global and especially Latin American collaboration

## 🚩 Why Unofficial?

This project is not affiliated with or endorsed by Yuno. It is built by the community (and by a Yuno employee in a personal capacity), using only public documentation and APIs. Our goal is to:

- Fill gaps in the official SDK ecosystem
- Provide rapid iteration and community-driven features
- Make it easier to use Yuno with modern frameworks

## ✨ Features

- **Node.js SDK**: Easy backend integration for payments, customers, checkout sessions, and payouts
- **React SDK**: Plug-and-play components for seamless checkout experiences
- **TypeScript Support**: Full type safety and autocompletion
- **Latin American Focus**: Designed and tested with regional needs in mind, but works globally

## 📦 Packages

- [`@latiscript/yuno-node`](./packages/yuno-node): Node.js SDK for Yuno (payments, customers, checkout sessions, payouts)
- [`@latiscript/yuno-react`](./packages/yuno-react): React SDK for Yuno
- [`@latiscript/yuno-api-mcp`](./packages/yuno-api-mcp): (Legacy) MCP server exposing Yuno API as tools
- [`@latiscript/yuno-js-sdk-mcp`](./packages/yuno-js-sdk-mcp): (Legacy) MCP server for the Yuno web SDK

## 🚀 Quick Start

### 1. Install a Package

```bash
# For Node.js
npm install @latiscript/yuno-node

# For React
npm install @latiscript/yuno-react
```

### 2. Use in Your Project

#### Node.js Example

```js
import { YunoClient } from '@latiscript/yuno-node';

const yuno = YunoClient.initialize({
  accountCode: process.env.ACCOUNT_CODE,
  publicApiKey: process.env.PUBLIC_API_KEY,
  privateSecretKey: process.env.PRIVATE_SECRET_KEY,
  // Optional:
  // countryCode: 'CO',
  // currency: 'COP',
});

// Create a customer
const customer = await yuno.customers.create({
  email: 'customer@example.com',
  country: 'CO',
});
```

#### React Example

```jsx
import { YunoProvider, Full } from '@latiscript/yuno-react';

function App() {
  return (
    <YunoProvider countryCode="CO" language="es" publicApiKey={process.env.REACT_APP_YUNO_PUBLIC_API_KEY}>
      <Full config={{ checkoutSession: 'your_checkout_session_id' }} />
    </YunoProvider>
  );
}
```

## 🤝 Contributing

We **welcome contributions** from everyone! Whether you are from Latin America or anywhere else, your ideas, bug reports, and pull requests are appreciated. Please see [`CONTRIBUTING.md`](./packages/yuno-node/CONTRIBUTING.md) for guidelines. Just open an issue or PR and let's build together.

- Search [existing issues](https://github.com/latiscript/yuno-js/issues) before opening a new one.
- For questions, open an issue or start a discussion on GitHub.

## 📚 Documentation

- [Official Yuno Docs](https://docs.y.uno/)
- [@latiscript/yuno-node README](./packages/yuno-node/README.md)
- [@latiscript/yuno-react README](./packages/yuno-react/README.md)

## 🛡️ License

MIT — see each package for details.

## 🙏 Acknowledgements

- Inspired by the official [Yuno SDK](https://github.com/yuno-payments/yuno-sdk-web)
- Built with ❤️ in Latin America, for the world

---

> _This project is not affiliated with Yuno. For official support, visit [Yuno's documentation](https://docs.y.uno/)._
