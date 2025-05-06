Object.defineProperty(exports, '__esModule', { value: true });

var cc = require('./cc-DF6UvQmH.js');
var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var sdkWeb = require('@yuno-payments/sdk-web');

const YunoContext = react.createContext({
    yunoInstance: null,
    countryCode: undefined,
    language: undefined,
    isLoading: true
});

function YunoProvider(props) {
    const { children, publicApiKey, countryCode, language, env } = props;
    const [yunoInstance, setYunoInstance] = react.useState(null);
    const [isLoading, setIsLoading] = react.useState(true);
    react.useEffect(()=>{
        void cc._async_to_generator(function*() {
            setIsLoading(true);
            const yuno = yield sdkWeb.loadScript({
                env: env || "prod"
            });
            const instance = yield yuno.initialize(publicApiKey);
            setYunoInstance(instance);
            setIsLoading(false);
        })();
    }, []);
    return /*#__PURE__*/ jsxRuntime.jsx(YunoContext.Provider, {
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
    const { yunoInstance, isLoading } = react.useContext(YunoContext);
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
    const { countryCode, language } = react.useContext(YunoContext);
    react.useEffect(()=>{
        const start = /*#__PURE__*/ cc._async_to_generator(function*() {
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
    return /*#__PURE__*/ jsxRuntime.jsx("div", {
        id: "yuno-full",
        className: className
    });
}

function Lite(props) {
    const { config, mount } = props;
    const { countryCode, language } = react.useContext(YunoContext);
    const { yuno, isLoading } = useYuno();
    react.useEffect(()=>{
        const start = /*#__PURE__*/ cc._async_to_generator(function*() {
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
    return /*#__PURE__*/ jsxRuntime.jsx("div", {
        id: "yuno-lite"
    });
}

function PayButton(props) {
    const { id, onClick, className, children } = props;
    const buttonId = id || "pay-button";
    return /*#__PURE__*/ jsxRuntime.jsx("button", {
        id: buttonId,
        onClick: onClick,
        className: className,
        children: children
    });
}

exports.Full = Full;
exports.Lite = Lite;
exports.PayButton = PayButton;
exports.YunoProvider = YunoProvider;
exports.useYuno = useYuno;
