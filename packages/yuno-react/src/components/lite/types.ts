import {
  Language,
  MountCheckoutLiteArgs,
  StartCheckoutArgs,
} from "@yuno-payments/sdk-web-types";

export interface LiteProps {
  config: Omit<StartCheckoutArgs, "language" | "countryCode"> & {
    countryCode?: string;
    language?: Language;
  };
  mount: MountCheckoutLiteArgs;
}
