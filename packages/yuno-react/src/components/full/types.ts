import {
  Language,
  MountCheckoutArgs,
  StartCheckoutArgs,
} from "@yuno-payments/sdk-web-types";

export interface FullProps {
  config: Omit<StartCheckoutArgs, "language" | "countryCode"> & {
    countryCode?: string;
    language?: Language;
  };
  mount?: MountCheckoutArgs;
  className?: string;
}
