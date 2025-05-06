import { YunoContext } from "../context/YunoContext";
import type { YunoInstance } from "@yuno-payments/sdk-web-types";
import { useContext } from "react";

export const useYuno = (): {
  yuno: YunoInstance | null;
  isLoading: boolean;
} => {
  const { yunoInstance, isLoading } = useContext(YunoContext);

  console.log("yunoInstance!!!", yunoInstance);

  const value = {
    yuno: yunoInstance,
    isLoading,
  };

  console.log("value", value);

  return value;
};
