import { McpServer, ResourceTemplate, } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { YunoClient } from "@yuno-js/node";
import { z } from "zod";
let yunoClient;
// Create an MCP server
const server = new McpServer({
    name: "yuno-api-mcp",
    version: "1.0.0",
});
// Add initialization tool
server.tool("initializeYuno", {
    accountCode: z.string(),
    publicApiKey: z.string(),
    privateSecretKey: z.string(),
    countryCode: z.string().optional(),
    currency: z.string().optional(),
}, async ({ accountCode, publicApiKey, privateSecretKey, countryCode = "CO", currency = "COP", }) => {
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
});
server.tool("createCustomer", {
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    country: z.string(),
}, async ({ first_name, last_name, email, country }) => {
    const customer = await yunoClient.customers.create({
        first_name,
        last_name,
        email,
        country,
    });
    return { content: [{ type: "text", text: customer.id }] };
});
// Add an addition tool
server.tool("createCheckoutSession", { customer_id: z.string(), country: z.string(), amount: z.number() }, async ({ customer_id, country, amount }) => {
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
        content: [{ type: "text", text: checkoutSession.checkout_session }],
    };
});
server.tool("createPayment", { checkout_session_id: z.string().optional(), amount: z.number() }, async ({ checkout_session_id, amount }) => {
    try {
        const payload = checkout_session_id
            ? {
                description: "Test payment",
                merchant_order_id: "1234",
                country: "CO",
                amount: {
                    currency: "COP",
                    value: amount,
                },
                payment_method: {
                    type: "MERCADO_PAGO_CHECKOUT_PRO",
                },
                workflow: "REDIRECT",
                checkout: {
                    session: checkout_session_id,
                },
            }
            : {
                description: "Test payment",
                merchant_order_id: "1234",
                country: "CO",
                amount: {
                    currency: "COP",
                    value: amount,
                },
                payment_method: {
                    type: "MERCADO_PAGO_CHECKOUT_PRO",
                },
                workflow: "REDIRECT",
            };
        const payment = await yunoClient.payments.create(payload);
        return {
            content: [
                {
                    type: "text",
                    text: `this is the payment id: ${payment.id} and the redirect url: ${payment.payment_method.payment_method_detail.wallet.redirect_url}`,
                },
            ],
        };
    }
    catch (error) {
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
// Add a dynamic greeting resource
server.resource("greeting", new ResourceTemplate("greeting://{name}", { list: undefined }), async (uri, { name }) => ({
    contents: [
        {
            uri: uri.href,
            text: `Hello, ${name}!`,
        },
    ],
}));
// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
