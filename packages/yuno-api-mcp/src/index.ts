import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { YunoClient } from "@yuno-js/node";
import { env } from "process";
import { z } from "zod";
import { randomUUID } from "node:crypto";
let yunoClient: ReturnType<typeof YunoClient.initialize>;

// Create an MCP server
const server = new McpServer({
  name: "yuno-api-mcp",
  version: "1.0.0",
});

server.tool(
  "initializeYuno",
  {
    accountCode: z.string().optional(),
    publicApiKey: z.string().optional(),
    privateSecretKey: z.string().optional(),
    countryCode: z.string().optional(),
    currency: z.string().optional(),
  },
  async ({ accountCode, publicApiKey, privateSecretKey, countryCode = "CO", currency = "COP" }) => {
    try {
      yunoClient = YunoClient.initialize({
        accountCode: (env.YUNO_ACCOUNT_CODE as string ?? accountCode) as string,
      publicApiKey: (env.YUNO_PUBLIC_API_KEY as string ?? publicApiKey) as string,
      privateSecretKey: (env.YUNO_PRIVATE_SECRET_KEY as string ?? privateSecretKey) as string,
      countryCode,
      currency,
    });
    return {
      content: [{ type: "text", text: "Yuno client initialized successfully" }],
    };
    } catch (error) {
      if (error instanceof Error) {
        return { content: [{ type: "text", text: error.message }] };
      }
      return { content: [{ type: "text", text: "An unknown error occurred" }] };
    }
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
    try {
      const customer = await yunoClient.customers.create({
        first_name,
        last_name,
        email,
        country,
    });
    return { content: [{ type: "text", text: customer.id }] };
    } catch (error) {
      if (error instanceof Error) {
        return { content: [{ type: "text", text: error.message }] };
      }
      return { content: [{ type: "text", text: "An unknown error occurred" }] };
    }
  }
);

server.tool(
  "createCheckoutSession",
  { customer_id: z.string(), country: z.string(), amount: z.number(), description: z.string().optional(), merchant_order_id: z.string().optional(), currency: z.string().optional() },
  async ({ customer_id, country, amount, description, merchant_order_id, currency }) => {
    try {
      const checkoutSession = await yunoClient.checkoutSessions.create({
        amount: {
          currency,
        value: amount,
      },
      customer_id,
      merchant_order_id: merchant_order_id ?? randomUUID(),
      payment_description: description ?? "Test payment",
      country,
    });
    return {
      content: [{ type: "text", text: `${JSON.stringify(checkoutSession, null, 4)}` }],
    };
    } catch (error) {
      if (error instanceof Error) {
        return { content: [{ type: "text", text: error.message }] };
      }
      return { content: [{ type: "text", text: "An unknown error occurred" }] };
    }
  }
);

server.tool("createPaymentWithOtt", 'with SDK_CHECKOUT workflow', { checkout_session_id: z.string(), amount: z.number(), ott: z.string(), description: z.string().optional(), merchant_order_id: z.string().optional(), country: z.string().optional(), currency: z.string().optional() }, async ({ description, checkout_session_id, amount, ott, merchant_order_id, country, currency }) => {
  try {
    const payment = await yunoClient.payments.create({
      description: description ?? "Test payment",
      merchant_order_id: merchant_order_id ?? randomUUID(),
      country,
      amount: {
        currency,
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

server.tool("createPaymentWithDirectWorkflow", 'with DIRECT workflow', {  amount: z.number(), payment_method: z.string(), description: z.string().optional(), merchant_order_id: z.string().optional(), country: z.string().optional(), currency: z.string().optional() }, async ({ description, amount, payment_method, merchant_order_id, country, currency }) => {
  try {
    const payment = await yunoClient.payments.create({
      description: description ?? "Test payment",
      country,
      merchant_order_id: merchant_order_id ?? randomUUID(),
      amount: {
      currency,
      value: amount,
    },
    payment_method: {
      type: payment_method,
    },
    workflow: "DIRECT"
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

server.tool("createPaymentWithRedirectWorkflow", 'with REDIRECT workflow', { amount: z.number(), payment_method: z.string(), description: z.string().optional(), merchant_order_id: z.string().optional(), country: z.string().optional(), currency: z.string().optional() }, async ({ description, amount, payment_method, merchant_order_id, country, currency }) => {
  try {
    const payment = await yunoClient.payments.create({
      description: description ?? "Test payment",
      country,
      merchant_order_id: merchant_order_id ?? randomUUID(),
      amount: {
      currency,
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
