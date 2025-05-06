import * as react_jsx_runtime from 'react/jsx-runtime';
import { Language, YunoInstance, StartCheckoutArgs, MountCheckoutArgs, MountCheckoutLiteArgs } from '@yuno-payments/sdk-web-types';
import { loadScript } from '@yuno-payments/sdk-web';

type LoadScriptEnv = Exclude<NonNullable<Parameters<typeof loadScript>[0]>["env"], undefined>;
interface Props {
    children: React.ReactNode;
    publicApiKey: string;
    countryCode?: string;
    language?: Language;
    env?: LoadScriptEnv;
}
declare function YunoProvider(props: Props): react_jsx_runtime.JSX.Element;

declare const useYuno: () => {
    yuno: YunoInstance | null;
    isLoading: boolean;
};

interface FullProps {
    config: Omit<StartCheckoutArgs, "language" | "countryCode"> & {
        countryCode?: string;
        language?: Language;
    };
    mount?: MountCheckoutArgs;
    className?: string;
}

declare function Full(props: FullProps): react_jsx_runtime.JSX.Element;

interface LiteProps {
    config: Omit<StartCheckoutArgs, "language" | "countryCode"> & {
        countryCode?: string;
        language?: Language;
    };
    mount: MountCheckoutLiteArgs;
}

declare function Lite(props: LiteProps): react_jsx_runtime.JSX.Element;

interface PayButtonProps {
    id?: string;
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
}

declare function PayButton(props: PayButtonProps): react_jsx_runtime.JSX.Element;

export { Full, Lite, PayButton, YunoProvider, useYuno };
