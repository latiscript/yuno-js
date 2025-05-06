import { ApiKeys } from "../types";

type ApiKeyPrefixToEnvironmentSuffix = {
  dev: "-dev";
  staging: "-staging";
  sandbox: "-sandbox";
  prod: "";
};
type ApiKeyPrefix = keyof ApiKeyPrefixToEnvironmentSuffix;
type EnvironmentSuffix = ApiKeyPrefixToEnvironmentSuffix[ApiKeyPrefix];
type FetchMethods = "POST" | "GET";
type RequestOptions = {
  method: FetchMethods;
  path?: string;
  apiKeys: ApiKeys;
  body?: unknown;
  idempotencyKey?: string;
};

export async function requestHandler<TReturn>(
  opts: RequestOptions,
): Promise<TReturn> {
  const { method, path, apiKeys, body, idempotencyKey } = opts;

  const methodHasPayload = method === "POST" && body;

  return await fetch(
    `${generateBaseUrlApi(apiKeys.publicApiKey)}${path ?? ""}`,
    {
      method,
      headers: setHeaders({ apiKeys, idempotencyKey }),
      body: methodHasPayload ? JSON.stringify(body) : undefined,
    },
  ).then((res) => res.json());
}

type HeadersOps = {
  apiKeys: ApiKeys;
  idempotencyKey?: string;
};

function setHeaders(opts: HeadersOps) {
  const { publicApiKey, privateSecretKey } = opts.apiKeys;
  const idempotencyKey = opts.idempotencyKey;

  const defaultHeaders = {
    "public-api-key": publicApiKey,
    "private-secret-key": privateSecretKey,
    "Content-Type": "application/json",
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
  prod: "",
} as ApiKeyPrefixToEnvironmentSuffix;

function generateBaseUrlApi(publicApiKey: string) {
  const [apiKeyPrefix] = publicApiKey.split("_");
  const environmentSuffix = apiKeyPrefixToEnvironmentSuffix[
    apiKeyPrefix as ApiKeyPrefix
  ] as EnvironmentSuffix;
  const baseURL = `https://api${environmentSuffix}.y.uno`;

  return baseURL;
}
