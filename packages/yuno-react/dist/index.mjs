import { _ as _async_to_generator } from './cc-BU0zEyYq.mjs';
import { jsx } from 'react/jsx-runtime';
import { createContext, useState, useEffect, useContext } from 'react';
import { loadScript } from '@yuno-payments/sdk-web';

const YunoContext = createContext({
    yunoInstance: null,
    countryCode: undefined,
    language: undefined,
    isLoading: true
});

function YunoProvider(props) {
    const { children, publicApiKey, countryCode, language, env } = props;
    const [yunoInstance, setYunoInstance] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        void _async_to_generator(function*() {
            setIsLoading(true);
            const yuno = yield loadScript({
                env: env || "prod"
            });
            const instance = yield yuno.initialize(publicApiKey);
            setYunoInstance(instance);
            setIsLoading(false);
        })();
    }, []);
    return /*#__PURE__*/ jsx(YunoContext.Provider, {
        value: {
            yunoInstance,
            countryCode,
            language,
            isLoading
        },
        children: children
    });
}

const useYuno = ()=>{
    const { yunoInstance, isLoading } = useContext(YunoContext);
    console.log("yunoInstance!!!", yunoInstance);
    const value = {
        yuno: yunoInstance,
        isLoading
    };
    console.log("value", value);
    return value;
};

function Full(props) {
    const { config, mount, className } = props;
    const { isLoading, yuno } = useYuno();
    const { countryCode, language } = useContext(YunoContext);
    useEffect(()=>{
        const start = /*#__PURE__*/ _async_to_generator(function*() {
            if (isLoading || !(yuno == null ? void 0 : yuno.startCheckout) || !(yuno == null ? void 0 : yuno.mountCheckout)) {
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
            yield yuno == null ? void 0 : yuno.startCheckout(config);
            yield yuno == null ? void 0 : yuno.mountCheckout(mount || {});
        });
        start();
    }, [
        isLoading,
        yuno,
        config,
        countryCode,
        language
    ]);
    return /*#__PURE__*/ jsx("div", {
        id: "yuno-full",
        className: className
    });
}

function Lite(props) {
    const { config, mount } = props;
    const { countryCode, language } = useContext(YunoContext);
    const { yuno, isLoading } = useYuno();
    useEffect(()=>{
        const start = /*#__PURE__*/ _async_to_generator(function*() {
            if (isLoading || !(yuno == null ? void 0 : yuno.startCheckout) || !(yuno == null ? void 0 : yuno.mountCheckoutLite)) {
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
            yield yuno == null ? void 0 : yuno.startCheckout(config);
            yield yuno == null ? void 0 : yuno.mountCheckoutLite(mount);
        });
        start();
    }, [
        isLoading,
        yuno,
        config,
        countryCode,
        language
    ]);
    return /*#__PURE__*/ jsx("div", {
        id: "yuno-lite"
    });
}

function PayButton(props) {
    const { id, onClick, className, children } = props;
    const buttonId = id || "pay-button";
    return /*#__PURE__*/ jsx("button", {
        id: buttonId,
        onClick: onClick,
        className: className,
        children: children
    });
}

export { Full, Lite, PayButton, YunoProvider, useYuno };
