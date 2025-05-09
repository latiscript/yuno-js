import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { YunoClient } from "@yuno-js/node";
import { z } from "zod";

let yunoClient: ReturnType<typeof YunoClient.initialize>;

// Create an MCP server
const server = new McpServer({
  name: "yuno-api-mcp",
  version: "1.0.0",
});

server.tool(
  "initializeYuno",
  {
    accountCode: z.string(),
    publicApiKey: z.string(),
    privateSecretKey: z.string(),
    countryCode: z.string().optional(),
    currency: z.string().optional(),
  },
  async ({ accountCode, publicApiKey, privateSecretKey, countryCode = "CO", currency = "COP" }) => {
    yunoClient = YunoClient.initialize({
      accountCode,
      publicApiKey,
      privateSecretKey,
      countryCode,
      currency,
    });
    return {
      content: [{ type: "text", text: "Yuno client initialized successfully" }],
    };
  }
);

server.tool(
  "createCustomer",
  {
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    country: z.string(),
  },
  async ({ first_name, last_name, email, country }) => {
    const customer = await yunoClient.customers.create({
      first_name,
      last_name,
      email,
      country,
    });
    return { content: [{ type: "text", text: `${JSON.stringify(customer, null, 4)}` }] };
  }
);

server.tool(
  "createCheckoutSession",
  { customer_id: z.string(), country: z.string(), amount: z.number() },
  async ({ customer_id, country, amount }) => {
    const checkoutSession = await yunoClient.checkoutSessions.create({
      amount: {
        currency: "COP",
        value: amount,
      },
      customer_id,
      merchant_order_id: "123",
      payment_description: "Test payment",
      country,
    });
    return {
      content: [{ type: "text", text: `${JSON.stringify(checkoutSession, null, 4)}` }],
    };
  }
);

server.tool("createPaymentWithOtt", 'with SDK_CHECKOUT workflow', { checkout_session_id: z.string(), amount: z.number(), ott: z.string() }, async ({ checkout_session_id, amount, ott }) => {
  try {
    const payment = await yunoClient.payments.create({
      description: "Test payment",
      merchant_order_id: "1234",
      country: "CO",
      amount: {
        currency: "COP",
        value: amount,
      },
      payment_method: {
        token: ott,
      },
      workflow: "SDK_CHECKOUT",
      checkout: {
        session: checkout_session_id,
      },
    });
    return {
      content: [
        {
          type: "text",
          text: `${JSON.stringify(payment, null, 4)}`,
        },
      ],
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        content: [{ type: "text", text: error.message }],
      };
    }
    return {
      content: [{ type: "text", text: "An unknown error occurred" }],
    };
  }
});

server.tool("createPaymentWithCheckoutSession", 'with REDIRECT workflow and checkout session id', { checkout_session_id: z.string(), amount: z.number(), payment_method: z.string() }, async ({ checkout_session_id, amount, payment_method }) => {
  try {
    const payment = await yunoClient.payments.create({
      description: "Test payment",
      country: "CO",
      merchant_order_id: "1234",
      amount: {
      currency: "COP",
      value: amount,
    },
    payment_method: {
      type: payment_method,
    },
    workflow: "REDIRECT",
    checkout: {
      session: checkout_session_id,
    },
  })
  return {
    content: [
      {
        type: "text",
        text: `${JSON.stringify(payment, null, 4)}`,
      },
    ],
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        content: [{ type: "text", text: error.message }],
      };
    }
    return {
      content: [{ type: "text", text: "An unknown error occurred" }],
    };
  }
});

server.tool("createPaymentWithoutCheckoutSession", 'with REDIRECT workflow and without checkout session id', { amount: z.number(), payment_method: z.string() }, async ({ amount, payment_method }) => {
  try {
    const payment = await yunoClient.payments.create({
      description: "Test payment",
      country: "CO",
      merchant_order_id: "1234",
      amount: {
      currency: "COP",
      value: amount,
    },
    payment_method: {
      type: payment_method,
    },
    workflow: "REDIRECT",
  });
  return {
    content: [
      {
        type: "text",
        text: `${JSON.stringify(payment, null, 4)}`,
      },
    ],
  };
  } catch (error) {
    if (error instanceof Error) {
      return {
        content: [{ type: "text", text: error.message }],
      };
    }
    return {
      content: [{ type: "text", text: "An unknown error occurred" }],
    };
  }
});

server.tool("retrievePayment", { payment_id: z.string() }, async ({ payment_id }) => {
  try {
    const payment = await yunoClient.payments.retrieve(payment_id);
    return {
      content: [{ type: "text", text: `${JSON.stringify(payment, null, 4)}` }],
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        content: [{ type: "text", text: error.message }],
      };
    }
    return {
      content: [{ type: "text", text: "An unknown error occurred" }],
    };
  }
});

server.tool("retrieveYunoNodeDocs", async () => {
  try {
    const yunoNodeDocs = await fetch("https://raw.githubusercontent.com/latiscript/yuno-js/refs/heads/main/packages/yuno-node/README.md");
    const yunoNodeDocsText = await yunoNodeDocs.text();

    const yunoNodeExample = await fetch("https://raw.githubusercontent.com/latiscript/yuno-js/refs/heads/main/examples/react-express/express/src/index.ts");
    const yunoNodeExampleText = await yunoNodeExample.text();
    return {
      content: [{ type: "text", text: yunoNodeDocsText }, { type: "text", text: yunoNodeExampleText }],
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        content: [{ type: "text", text: error.message }],
      };
    }
    return {
      content: [{ type: "text", text: "An unknown error occurred" }],
    };
  }
});

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
