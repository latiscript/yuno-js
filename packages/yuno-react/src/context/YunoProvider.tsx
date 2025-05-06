import type { Language, YunoInstance } from "@yuno-payments/sdk-web-types";
import { useEffect, useState } from "react";

import { YunoContext } from "./YunoContext";
import { loadScript } from "@yuno-payments/sdk-web";

type LoadScriptEnv = Exclude<
  NonNullable<Parameters<typeof loadScript>[0]>["env"],
  undefined
>;

interface Props {
  children: React.ReactNode;
  publicApiKey: string;
  countryCode?: string;
  language?: Language;
  env?: LoadScriptEnv;
}

export function YunoProvider(props: Props) {
  const { children, publicApiKey, countryCode, language, env } = props;
  const [yunoInstance, setYunoInstance] = useState<YunoInstance | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      setIsLoading(true);
      const yuno = await loadScript({
        env: env || "prod",
      });
      const instance = await yuno.initialize(publicApiKey);
      setYunoInstance(instance);
      setIsLoading(false);
    })();
  }, []);

  return (
    <YunoContext.Provider
      value={{ yunoInstance, countryCode, language, isLoading }}
    >
      {children}
    </YunoContext.Provider>
  );
}
