import type { Language, YunoInstance } from "@yuno-payments/sdk-web-types";

import { createContext } from "react";

export const YunoContext = createContext<{
  yunoInstance: YunoInstance | null;
  countryCode: string | undefined;
  language: Language | undefined;
  isLoading: boolean;
}>({
  yunoInstance: null,
  countryCode: undefined,
  language: undefined,
  isLoading: true,
});
