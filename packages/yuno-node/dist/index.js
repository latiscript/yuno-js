var nanoid = require('nanoid');
var crypto = require('crypto');

async function requestHandler(opts) {
    const { method, path, apiKeys, body, idempotencyKey } = opts;
    const methodHasPayload = method === "POST" && body;
    return await fetch(`${generateBaseUrlApi(apiKeys.publicApiKey)}${path ?? ""}`, {
        method,
        headers: setHeaders({
            apiKeys,
            idempotencyKey
        }),
        body: methodHasPayload ? JSON.stringify(body) : undefined
    }).then((res)=>res.json());
}
function setHeaders(opts) {
    const { publicApiKey, privateSecretKey } = opts.apiKeys;
    const idempotencyKey = opts.idempotencyKey;
    const defaultHeaders = {
        "public-api-key": publicApiKey,
        "private-secret-key": privateSecretKey,
        "Content-Type": "application/json"
    };
    if (idempotencyKey) {
        defaultHeaders["x-idempotency-key"] = idempotencyKey;
    }
    return defaultHeaders;
}
const apiKeyPrefixToEnvironmentSuffix = {
    dev: "-dev",
    staging: "-staging",
    sandbox: "-sandbox",
    prod: ""
};
function generateBaseUrlApi(publicApiKey) {
    const [apiKeyPrefix] = publicApiKey.split("_");
    const environmentSuffix = apiKeyPrefixToEnvironmentSuffix[apiKeyPrefix];
    const baseURL = `https://api${environmentSuffix}.y.uno`;
    return baseURL;
}

function handleCheckoutSessionMethods(config) {
    return {
        create: createCheckoutSession(config.apiKeys, config.settings)
    };
}
function createCheckoutSession(apiKeys, settings) {
    return async function createCheckoutSessionInner(checkoutSession) {
        const body = {
            ...checkoutSession,
            account_id: apiKeys.accountCode,
            country_code: checkoutSession.country ?? settings.countryCode,
            amount: {
                currency: checkoutSession.amount.currency ?? settings.currency,
                value: checkoutSession.amount.value
            }
        };
        return await requestHandler({
            path: "/v1/checkout/sessions",
            method: "POST",
            apiKeys,
            body
        });
    };
}

function handleCustomerMethods(config) {
    return {
        create: createCustomer(config.apiKeys, config.settings)
    };
}
/**
 * @param {string} merchant_customer_id - Optional parameter, if you don't pass a value Yuno will generate one for you
 */ function createCustomer(apiKeys, settings) {
    return async function createCustomerInner(customer) {
        const body = {
            ...customer,
            merchant_customer_id: customer.merchant_customer_id ?? nanoid.nanoid(),
            country_code: customer.country ?? settings.countryCode
        };
        return await requestHandler({
            path: "/v1/customers",
            method: "POST",
            apiKeys,
            body
        });
    };
}

function handlePayments(config) {
    return {
        create: createPayment(config.apiKeys)
    };
}
function createPayment(apiKeys) {
    return async function createPaymentInner(payment, idempotencyKey) {
        const body = {
            ...payment,
            account_id: apiKeys.accountCode
        };
        return await requestHandler({
            path: "/v1/payments",
            method: "POST",
            apiKeys,
            body,
            idempotencyKey: idempotencyKey ?? crypto.randomUUID()
        });
    };
}

const isServer = typeof window === "undefined";

const YunoClient = {
    initialize: initYunoClient
};
function initYunoClient(options) {
    if (!options.accountCode) {
        throw new Error(`You must pass your Yuno's account code.`);
    }
    if (!options.publicApiKey) {
        throw new Error(`You must pass your Yuno's public api key.`);
    }
    if (!options.privateSecretKey) {
        throw new Error(`You must pass your Yuno's private secret key.`);
    }
    if (!isServer) {
        throw new Error(`You're trying to use @yuno/node in a non-server environment. This is not supported by default.`);
    }
    const config = {
        apiKeys: options,
        settings: {
            countryCode: options.countryCode,
            currency: options.currency
        }
    };
    return {
        customers: handleCustomerMethods(config),
        checkoutSessions: handleCheckoutSessionMethods(config),
        payments: handlePayments(config)
    };
}

exports.YunoClient = YunoClient;
