import "dotenv/config";

import { YunoClient } from "@latiscript/yuno-node";

export const yunoClient = YunoClient.initialize({
  accountCode: process.env.ACCOUNT_CODE!,
  publicApiKey: process.env.PUBLIC_API_KEY!,
  privateSecretKey: process.env.PRIVATE_SECRET_KEY!,
  countryCode: "CO",
  currency: "COP",
});
