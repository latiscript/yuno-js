import { YunoClient } from "@latiscript/yuno-node";

export const yunoClient = YunoClient.initialize({
  accountCode: process.env.YUNO_ACCOUNT_CODE!,
  publicApiKey: process.env.YUNO_PUBLIC_API_KEY!,
  privateSecretKey: process.env.YUNO_PRIVATE_SECRET_KEY!
})