import { useContext, useEffect } from "react";

import { LiteProps } from "./types";
import { StartCheckoutArgs } from "@yuno-payments/sdk-web-types";
import { YunoContext } from "@context/YunoContext";
import { useYuno } from "@hooks/useYuno";

export function Lite(props: LiteProps) {
  const { config, mount } = props;
  const { countryCode, language } = useContext(YunoContext);
  const { yuno, isLoading } = useYuno();

  useEffect(() => {
    const start = async () => {
      if (isLoading || !yuno?.startCheckout || !yuno?.mountCheckoutLite) {
        return;
      }

      if (config.elementSelector) {
        config.elementSelector = "#yuno-lite";
      }

      if (!config.countryCode && countryCode) {
        config.countryCode = countryCode;
      } else if (!config.countryCode) {
        throw new Error("countryCode is required");
      }

      if (!config.language && language) {
        config.language = language;
      } else if (!config.language) {
        throw new Error("language is required");
      }

      await yuno?.startCheckout(config as StartCheckoutArgs);
      await yuno?.mountCheckoutLite(mount);
    };

    start();
  }, [isLoading, yuno, config, countryCode, language]);

  return <div id="yuno-lite" />;
}
