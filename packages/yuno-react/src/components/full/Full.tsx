import { useContext, useEffect } from "react";

import { FullProps } from "./types";
import { StartCheckoutArgs } from "@yuno-payments/sdk-web-types";
import { YunoContext } from "@context/YunoContext";
import { useYuno } from "@hooks/useYuno";

export function Full(props: FullProps) {
  const { config, mount, className } = props;
  const { isLoading, yuno } = useYuno();
  const { countryCode, language } = useContext(YunoContext);

  useEffect(() => {
    const start = async () => {
      if (isLoading || !yuno?.startCheckout || !yuno?.mountCheckout) {
        return;
      }

      if (!config.elementSelector) {
        config.elementSelector = "#yuno-full";
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
      await yuno?.mountCheckout(mount || {});
    };

    start();
  }, [isLoading, yuno, config, countryCode, language]);

  return <div id="yuno-full" className={className} />;
}
