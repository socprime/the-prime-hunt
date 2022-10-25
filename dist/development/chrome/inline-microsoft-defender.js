/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./common/checkers.ts":
/*!****************************!*\
  !*** ./common/checkers.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isAllowedProtocol = exports.isNumberInString = exports.isNotEmpty = exports.isString = void 0;
const types_1 = __webpack_require__(/*! ./types */ "./common/types.ts");
const isString = (value) => {
    return typeof value === 'string';
};
exports.isString = isString;
const isNotEmpty = (str) => {
    if (!(0, exports.isString)(str)) {
        return false;
    }
    return str.trim() !== '';
};
exports.isNotEmpty = isNotEmpty;
const isNumberInString = (str) => {
    if (typeof str !== 'string') {
        return false;
    }
    const sValue = str.trim();
    if (!/^[.0-9]*$/.test(sValue)) {
        return false;
    }
    return !Number.isNaN(parseFloat(sValue));
};
exports.isNumberInString = isNumberInString;
const isAllowedProtocol = (protocol, mode) => {
    if (mode === types_1.Mode.development) {
        return true;
    }
    const nProtocol = protocol.trim().toLowerCase();
    return nProtocol === 'https:' || nProtocol === 'https';
};
exports.isAllowedProtocol = isAllowedProtocol;


/***/ }),

/***/ "./common/helpers.ts":
/*!***************************!*\
  !*** ./common/helpers.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.capitalizeFirstLetter = exports.formatString = exports.deduplicateArray = exports.parseJSONSafe = exports.clearExtraSpaces = exports.uuid = exports.isFlatObjectsEqual = void 0;
const isFlatObjectsEqual = (obj1, obj2) => {
    const keysObj1 = Object.keys(obj1);
    const keysObj2 = Object.keys(obj2);
    if (keysObj1.length !== keysObj2.length) {
        return false;
    }
    return !keysObj1.some(key => obj1[key] !== obj2[key]);
};
exports.isFlatObjectsEqual = isFlatObjectsEqual;
const uuid = () => {
    return Math.random().toString(36).substring(5)
        + Date.now().toString(36)
        + Math.random().toString(36).substring(5);
};
exports.uuid = uuid;
const clearExtraSpaces = (str) => str.replace(/ +/g, ' ');
exports.clearExtraSpaces = clearExtraSpaces;
const parseJSONSafe = (obj, fallback) => {
    try {
        return JSON.parse(obj);
    }
    catch (e) {
        return fallback;
    }
};
exports.parseJSONSafe = parseJSONSafe;
const deduplicateArray = (arr) => {
    return [
        ...Array.from(new Set([
            ...arr,
        ])),
    ];
};
exports.deduplicateArray = deduplicateArray;
const formatString = (pattern, parts, keyFormat) => {
    return Object.keys(parts || {})
        .map(name => ({
        value: parts[name],
        key: keyFormat ? keyFormat(name) : `%${name}`,
    }))
        .reduce((result, d) => {
        return result.replace(new RegExp(d.key, 'g'), d.value);
    }, pattern) || pattern;
};
exports.formatString = formatString;
const capitalizeFirstLetter = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
exports.capitalizeFirstLetter = capitalizeFirstLetter;


/***/ }),

/***/ "./common/types.ts":
/*!*************************!*\
  !*** ./common/types.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapType = exports.LogLevel = exports.Mode = void 0;
var Mode;
(function (Mode) {
    Mode["production"] = "production";
    Mode["development"] = "development";
})(Mode = exports.Mode || (exports.Mode = {}));
var LogLevel;
(function (LogLevel) {
    LogLevel["info"] = "info";
    LogLevel["debug"] = "debug";
    LogLevel["error"] = "error";
    LogLevel["warn"] = "warn";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
const mapType = (struct) => struct;
exports.mapType = mapType;


/***/ }),

/***/ "./extension/common/api-support.ts":
/*!*****************************************!*\
  !*** ./extension/common/api-support.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isRuntimeGetUrlSupported = exports.isTabsSendMessageSupported = exports.isTabsQuerySupported = exports.isOnBeforeSendHeadersSupported = exports.isOnBeforeRequestSupported = exports.isBrowserActionOnClickedSupported = exports.isActionOnClickedSupported = exports.isTabsOnRemovedSupported = exports.isRuntimeOnMessageExternalSupported = exports.isRuntimeOnMessageSupported = exports.isRuntimeSendMessageSupported = exports.isAddEventListenerSupported = exports.isPostMessageSupported = void 0;
const common_helpers_1 = __webpack_require__(/*! ./common-helpers */ "./extension/common/common-helpers.ts");
const loggers = (__webpack_require__(/*! ../common/loggers */ "./extension/common/loggers/index.ts").loggers.addPrefix)('api-support');
const isPostMessageSupported = (...logData) => {
    if (!(window === null || window === void 0 ? void 0 : window.postMessage)) {
        loggers
            .warn()
            .log('API window.postMessage is not supported', ...logData);
        return false;
    }
    return true;
};
exports.isPostMessageSupported = isPostMessageSupported;
const isAddEventListenerSupported = (...logData) => {
    if (!(window === null || window === void 0 ? void 0 : window.addEventListener)) {
        loggers
            .warn()
            .log('API window.addEventListener is not supported', ...logData);
        return false;
    }
    return true;
};
exports.isAddEventListenerSupported = isAddEventListenerSupported;
const isRuntimeSendMessageSupported = (...logData) => {
    var _a, _b;
    if (!((_b = (_a = (0, common_helpers_1.getBrowserContext)()) === null || _a === void 0 ? void 0 : _a.runtime) === null || _b === void 0 ? void 0 : _b.sendMessage)) {
        loggers
            .warn()
            .log('API runtime.sendMessage is not supported', ...logData);
        return false;
    }
    return true;
};
exports.isRuntimeSendMessageSupported = isRuntimeSendMessageSupported;
const isRuntimeOnMessageSupported = (...logData) => {
    var _a, _b;
    if (!((_b = (_a = (0, common_helpers_1.getBrowserContext)().runtime) === null || _a === void 0 ? void 0 : _a.onMessage) === null || _b === void 0 ? void 0 : _b.addListener)) {
        loggers
            .warn()
            .log('API runtime.onMessage.addListener is not supported', ...logData);
        return false;
    }
    return true;
};
exports.isRuntimeOnMessageSupported = isRuntimeOnMessageSupported;
const isRuntimeOnMessageExternalSupported = (...logData) => {
    var _a, _b;
    if (!((_b = (_a = (0, common_helpers_1.getBrowserContext)().runtime) === null || _a === void 0 ? void 0 : _a.onMessageExternal) === null || _b === void 0 ? void 0 : _b.addListener)) {
        loggers
            .warn()
            .log('API runtime.onMessageExternal.addListener is not supported', ...logData);
        return false;
    }
    return true;
};
exports.isRuntimeOnMessageExternalSupported = isRuntimeOnMessageExternalSupported;
const isTabsOnRemovedSupported = (...logData) => {
    var _a, _b;
    if (!((_b = (_a = (0, common_helpers_1.getBrowserContext)().tabs) === null || _a === void 0 ? void 0 : _a.onRemoved) === null || _b === void 0 ? void 0 : _b.addListener)) {
        loggers
            .warn()
            .log('API tabs.onRemoved.addListener is not supported', ...logData);
        return false;
    }
    return true;
};
exports.isTabsOnRemovedSupported = isTabsOnRemovedSupported;
const isActionOnClickedSupported = (...logData) => {
    var _a, _b, _c;
    if (!((_c = (_b = (_a = (0, common_helpers_1.getBrowserContext)()) === null || _a === void 0 ? void 0 : _a.action) === null || _b === void 0 ? void 0 : _b.onClicked) === null || _c === void 0 ? void 0 : _c.addListener)) {
        loggers
            .warn()
            .log('API action.onClicked.addListener is not supported', ...logData);
        return false;
    }
    return true;
};
exports.isActionOnClickedSupported = isActionOnClickedSupported;
const isBrowserActionOnClickedSupported = (...logData) => {
    var _a, _b, _c;
    if (!((_c = (_b = (_a = (0, common_helpers_1.getBrowserContext)()) === null || _a === void 0 ? void 0 : _a.browserAction) === null || _b === void 0 ? void 0 : _b.onClicked) === null || _c === void 0 ? void 0 : _c.addListener)) {
        loggers
            .warn()
            .log('API browserAction.onClicked.addListener is not supported', ...logData);
        return false;
    }
    return true;
};
exports.isBrowserActionOnClickedSupported = isBrowserActionOnClickedSupported;
const isOnBeforeRequestSupported = (...logData) => {
    var _a, _b, _c;
    if (!((_c = (_b = (_a = (0, common_helpers_1.getBrowserContext)()) === null || _a === void 0 ? void 0 : _a.webRequest) === null || _b === void 0 ? void 0 : _b.onBeforeRequest) === null || _c === void 0 ? void 0 : _c.addListener)) {
        loggers
            .warn()
            .log('API webRequest.onBeforeRequest is not supported', ...logData);
        return false;
    }
    return true;
};
exports.isOnBeforeRequestSupported = isOnBeforeRequestSupported;
const isOnBeforeSendHeadersSupported = (...logData) => {
    var _a, _b, _c;
    if (!((_c = (_b = (_a = (0, common_helpers_1.getBrowserContext)()) === null || _a === void 0 ? void 0 : _a.webRequest) === null || _b === void 0 ? void 0 : _b.onBeforeSendHeaders) === null || _c === void 0 ? void 0 : _c.addListener)) {
        loggers
            .warn()
            .log('API webRequest.onBeforeSendHeaders is not supported', ...logData);
        return false;
    }
    return true;
};
exports.isOnBeforeSendHeadersSupported = isOnBeforeSendHeadersSupported;
const isTabsQuerySupported = (...logData) => {
    var _a, _b;
    if (!((_b = (_a = (0, common_helpers_1.getBrowserContext)()) === null || _a === void 0 ? void 0 : _a.tabs) === null || _b === void 0 ? void 0 : _b.query)) {
        loggers
            .warn()
            .log('API tabs.query is not supported', ...logData);
        return false;
    }
    return true;
};
exports.isTabsQuerySupported = isTabsQuerySupported;
const isTabsSendMessageSupported = (...logData) => {
    var _a, _b;
    if (!((_b = (_a = (0, common_helpers_1.getBrowserContext)()) === null || _a === void 0 ? void 0 : _a.tabs) === null || _b === void 0 ? void 0 : _b.sendMessage)) {
        loggers
            .warn()
            .log('API tabs.sendMessage is not supported', ...logData);
        return false;
    }
    return true;
};
exports.isTabsSendMessageSupported = isTabsSendMessageSupported;
const isRuntimeGetUrlSupported = (...logData) => {
    var _a, _b;
    if (!((_b = (_a = (0, common_helpers_1.getBrowserContext)()) === null || _a === void 0 ? void 0 : _a.runtime) === null || _b === void 0 ? void 0 : _b.getURL)) {
        loggers
            .warn()
            .log('API runtime.getURL is not supported', ...logData);
        return false;
    }
    return true;
};
exports.isRuntimeGetUrlSupported = isRuntimeGetUrlSupported;


/***/ }),

/***/ "./extension/common/common-helpers.ts":
/*!********************************************!*\
  !*** ./extension/common/common-helpers.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.compareVersions = exports.getVersionFromString = exports.removeDoubleQuotesAround = exports.buildQueryParts = exports.getElementsUnderCursor = exports.downloadFile = exports.copyToClipboard = exports.createClassName = exports.waitHTMLElement = exports.isInsideIframe = exports.mountHTMLElement = exports.cssObjectToString = exports.getExecutingContextByMessageType = exports.getPlatformNameByID = exports.getWebAccessibleUrl = exports.getBrowserContext = void 0;
const types_common_1 = __webpack_require__(/*! ./types/types-common */ "./extension/common/types/types-common.ts");
const api_support_1 = __webpack_require__(/*! ./api-support */ "./extension/common/api-support.ts");
const getBrowserContext = () => typeof browser !== 'undefined' ? browser : chrome;
exports.getBrowserContext = getBrowserContext;
const getWebAccessibleUrl = (path) => {
    return (0, api_support_1.isRuntimeGetUrlSupported)(path)
        ? (0, exports.getBrowserContext)().runtime.getURL(path)
        : '';
};
exports.getWebAccessibleUrl = getWebAccessibleUrl;
const getPlatformNameByID = (platformID) => {
    if (platformID === types_common_1.PlatformID.MicrosoftSentinel) {
        return 'Microsoft Sentinel';
    }
    if (platformID === types_common_1.PlatformID.MicrosoftDefender) {
        return 'Microsoft Defender For Endpoint';
    }
    if (platformID === types_common_1.PlatformID.Splunk) {
        return 'Splunk';
    }
    return 'Unknown Platform';
};
exports.getPlatformNameByID = getPlatformNameByID;
const getExecutingContextByMessageType = (message) => {
    let prefix = message.slice(0, 3).toLowerCase();
    if (prefix === 'app') {
        return 'app';
    }
    prefix = prefix.slice(0, 2);
    return prefix === 'bg'
        ? 'background'
        : prefix === 'cs'
            ? 'content'
            : prefix === 'is'
                ? 'inline'
                : 'unknown';
};
exports.getExecutingContextByMessageType = getExecutingContextByMessageType;
const cssObjectToString = (styles) => Object.keys(styles)
    .reduce((res, key) => res += `${key}:${styles[key]};`, '');
exports.cssObjectToString = cssObjectToString;
const mountHTMLElement = (element, mountElement, options) => {
    const elem = document.createElement(element);
    if (options === null || options === void 0 ? void 0 : options.attributes) {
        Object.keys(options.attributes).forEach(key => {
            var _a;
            elem.setAttribute(key, key === 'style'
                ? (0, exports.cssObjectToString)(options.attributes[key])
                : ((_a = options.attributes) === null || _a === void 0 ? void 0 : _a[key]) || '');
        });
    }
    if (options === null || options === void 0 ? void 0 : options.innerHtml) {
        elem.innerHTML = options.innerHtml;
    }
    if (options === null || options === void 0 ? void 0 : options.innerText) {
        elem.innerText = options.innerText;
    }
    if (mountElement) {
        mountElement.append(elem);
    }
    return elem;
};
exports.mountHTMLElement = mountHTMLElement;
const isInsideIframe = () => {
    try {
        return window.self !== window.top;
    }
    catch (e) {
        return true;
    }
};
exports.isInsideIframe = isInsideIframe;
const waitHTMLElement = (query, rootElement = document) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise(resolve => {
        new MutationObserver((_, observer) => {
            const element = rootElement.querySelector(query);
            if (element) {
                observer.disconnect();
                resolve(element);
            }
        }).observe(rootElement, { childList: true, subtree: true });
    });
});
exports.waitHTMLElement = waitHTMLElement;
const createClassName = (list) => list.filter(Boolean).join(' ');
exports.createClassName = createClassName;
const copyToClipboard = (str) => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-99999px';
    el.style.top = '-99999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};
exports.copyToClipboard = copyToClipboard;
const downloadFile = (type, content) => {
    const prefix = type === 'csv'
        ? 'data:text/csv;charset=utf-8,'
        : 'data:text/csv;charset=utf-8,';
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(`${prefix}${content}`));
    link.setAttribute('download', 'extension-resources.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
exports.downloadFile = downloadFile;
const getElementsUnderCursor = (e, filter) => {
    const x = e.clientX;
    const y = e.clientY;
    const filtered = [];
    const elements = [];
    let elementMouseIsOver = document.elementFromPoint(x, y);
    while (elementMouseIsOver.tagName !== 'HTML') {
        const savedPointerEvents = elementMouseIsOver.style.pointerEvents;
        if (!elementMouseIsOver) {
            break;
        }
        if (!filter
            || (filter && filter(elementMouseIsOver))) {
            filtered.push(elementMouseIsOver);
        }
        elements.push({
            savedPointerEvents,
            element: elementMouseIsOver,
        });
        elementMouseIsOver.style.pointerEvents = 'none';
        elementMouseIsOver = document.elementFromPoint(x, y);
    }
    elements.forEach(({ element, savedPointerEvents }) => {
        if (savedPointerEvents) {
            element.style.pointerEvents = savedPointerEvents;
        }
        else {
            element.style.removeProperty('pointer-events');
        }
        if (!element.getAttribute('style')) {
            element.removeAttribute('style');
        }
    });
    return filtered;
};
exports.getElementsUnderCursor = getElementsUnderCursor;
const buildQueryParts = (resources, operator, separator, decorators) => {
    return Object.keys(resources).reduce((result, fieldName) => {
        result.push(resources[fieldName]
            .map(v => `${decorators.leftOperand(fieldName)} ${operator} ${decorators.rightOperand(v)}`)
            .join(separator));
        return result;
    }, []).join(separator);
};
exports.buildQueryParts = buildQueryParts;
const removeDoubleQuotesAround = (str) => {
    let result = str;
    if (str[0] === '"') {
        result = result.slice(1);
    }
    if (str[str.length - 1] === '"') {
        result = result.slice(0, str.length - 2);
    }
    return result;
};
exports.removeDoubleQuotesAround = removeDoubleQuotesAround;
const getVersionFromString = (version) => {
    if (typeof version !== 'string'
        || !/^[.0-9]+$/.test(version)) {
        return 0;
    }
    const result = parseInt(version.replace(/\./g, ''));
    return isNaN(result) ? 0 : result;
};
exports.getVersionFromString = getVersionFromString;
const compareVersions = (version1, version2) => {
    const nVersion1 = (0, exports.getVersionFromString)(version1);
    const nVersion2 = (0, exports.getVersionFromString)(version2);
    return nVersion1 === nVersion2
        ? 'equal'
        : nVersion1 > nVersion2
            ? 'greater'
            : 'less';
};
exports.compareVersions = compareVersions;


/***/ }),

/***/ "./extension/common/common-listeners.ts":
/*!**********************************************!*\
  !*** ./extension/common/common-listeners.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isMessageMatched = void 0;
const loggers_1 = __webpack_require__(/*! ./loggers */ "./extension/common/loggers/index.ts");
const loggers_debug_1 = __webpack_require__(/*! ./loggers/loggers-debug */ "./extension/common/loggers/loggers-debug.ts");
const common_helpers_1 = __webpack_require__(/*! ./common-helpers */ "./extension/common/common-helpers.ts");
const isMessageMatched = (matchCondition, message, ...otherInfo) => {
    if (matchCondition()) {
        loggers_1.loggers
            .debug()
            .addPrefix((0, loggers_debug_1.getDebugPrefix)((0, common_helpers_1.getExecutingContextByMessageType)(message.type)))
            .log(`got ${message.type} message`, message, ...otherInfo);
        return true;
    }
    return false;
};
exports.isMessageMatched = isMessageMatched;


/***/ }),

/***/ "./extension/common/envs.ts":
/*!**********************************!*\
  !*** ./extension/common/envs.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.version = exports.logLevel = exports.mode = exports.backgroundPlatformIDFromENV = exports.contentPlatformIDFromENV = void 0;
const types_common_1 = __webpack_require__(/*! ./types/types-common */ "./extension/common/types/types-common.ts");
const types_1 = __webpack_require__(/*! ../../common/types */ "./common/types.ts");
exports.contentPlatformIDFromENV = Object.values(types_common_1.PlatformID).includes(null)
    ? null
    : null;
exports.backgroundPlatformIDFromENV = Object.values(types_common_1.PlatformID).includes(null)
    ? null
    : null;
exports.mode = "development" === types_1.Mode.production
    ? types_1.Mode.production
    : types_1.Mode.development;
exports.logLevel = Object.keys(types_1.LogLevel).includes("info")
    ? "info"
    : types_1.LogLevel.info;
exports.version = "1.0.2";


/***/ }),

/***/ "./extension/common/loggers/index.ts":
/*!*******************************************!*\
  !*** ./extension/common/loggers/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loggers = exports.Loggers = exports.stopLogging = exports.startLogging = void 0;
const types_1 = __webpack_require__(/*! ../../../common/types */ "./common/types.ts");
const envs_1 = __webpack_require__(/*! ../envs */ "./extension/common/envs.ts");
let logging = true;
const startLogging = () => logging = true;
exports.startLogging = startLogging;
const stopLogging = () => logging = false;
exports.stopLogging = stopLogging;
class Loggers {
    constructor(prefix = '', level = types_1.LogLevel.info) {
        this.prefix = '';
        this.level = types_1.LogLevel.info;
        this.prefix = prefix;
        this.level = level;
    }
    createInstance(prefix = '', level = types_1.LogLevel.info) {
        return new Loggers(prefix, level);
    }
    log(...params) {
        if (!logging) {
            return;
        }
        if (envs_1.mode === types_1.Mode.production
            && this.level === types_1.LogLevel.debug
            && envs_1.logLevel !== types_1.LogLevel.debug) {
            return;
        }
        if (envs_1.mode !== types_1.Mode.production) {
            console[this.level === types_1.LogLevel.error
                ? 'error'
                : this.level === types_1.LogLevel.warn
                    ? 'warn'
                    : 'log'](this.prefix || '==>', ...params);
        }
    }
    error() {
        return this.createInstance(`ERROR: ${this.prefix}`, types_1.LogLevel.error);
    }
    warn() {
        return this.createInstance(`WARN: ${this.prefix}`, types_1.LogLevel.warn);
    }
    info() {
        return this.createInstance(`INFO: ${this.prefix}`, types_1.LogLevel.info);
    }
    debug() {
        return this.createInstance(`DEBUG: ${this.prefix}`, types_1.LogLevel.debug);
    }
    addPrefix(prefix) {
        return this.createInstance([this.prefix, prefix].join(' '), this.level);
    }
    setLevel(level) {
        return this.createInstance(this.prefix, level);
    }
}
exports.Loggers = Loggers;
exports.loggers = new Loggers();


/***/ }),

/***/ "./extension/common/loggers/loggers-debug.ts":
/*!***************************************************!*\
  !*** ./extension/common/loggers/loggers-debug.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DebugID = exports.getDebugPrefix = void 0;
const types_1 = __webpack_require__(/*! ../../../common/types */ "./common/types.ts");
const getDebugPrefix = (context) => {
    return context === 'background'
        ? 'bg ==>'
        : context === 'content'
            ? 'cs ==>'
            : context === 'inline'
                ? 'is ==>'
                : context === 'app'
                    ? 'app ==>'
                    : 'unknown ==>';
};
exports.getDebugPrefix = getDebugPrefix;
const debugID = (0, types_1.mapType)( false || 'debug-external-der3edc3op3e4dde44rt');
var DebugID;
(function (DebugID) {
    DebugID[DebugID["debugIDExternal"] = debugID] = "debugIDExternal";
})(DebugID = exports.DebugID || (exports.DebugID = {}));


/***/ }),

/***/ "./extension/common/types/types-common.ts":
/*!************************************************!*\
  !*** ./extension/common/types/types-common.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlatformID = exports.Browser = void 0;
var Browser;
(function (Browser) {
    Browser["chrome"] = "chrome";
    Browser["firefox"] = "firefox";
    Browser["edge"] = "edge";
})(Browser = exports.Browser || (exports.Browser = {}));
var PlatformID;
(function (PlatformID) {
    PlatformID["MicrosoftSentinel"] = "MicrosoftSentinel";
    PlatformID["MicrosoftDefender"] = "MicrosoftDefender";
    PlatformID["Splunk"] = "Splunk";
})(PlatformID = exports.PlatformID || (exports.PlatformID = {}));


/***/ }),

/***/ "./extension/content/platforms/microsoft-defender-for-endpoint/microsoft-defender-helpers.ts":
/*!***************************************************************************************************!*\
  !*** ./extension/content/platforms/microsoft-defender-for-endpoint/microsoft-defender-helpers.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.buildMicrosoftDefenderQueryParts = exports.normalizedValue = void 0;
const common_helpers_1 = __webpack_require__(/*! ../../../common/common-helpers */ "./extension/common/common-helpers.ts");
const checkers_1 = __webpack_require__(/*! ../../../../common/checkers */ "./common/checkers.ts");
const normalizedValue = (value) => {
    const nValue = (0, checkers_1.isNumberInString)(value)
        ? parseFloat(value)
        : value;
    return typeof nValue === 'number'
        ? nValue
        : `\"${nValue.replace(/\\/g, '\\\\')}\"`;
};
exports.normalizedValue = normalizedValue;
const buildMicrosoftDefenderQueryParts = (type, resources) => {
    return (0, common_helpers_1.buildQueryParts)(resources, type === 'exclude' ? '!=' : '==', type === 'exclude' ? ' and ' : ' or ', {
        leftOperand: (v) => v,
        rightOperand: (v) => (0, exports.normalizedValue)(v),
    });
};
exports.buildMicrosoftDefenderQueryParts = buildMicrosoftDefenderQueryParts;


/***/ }),

/***/ "./extension/inline/helpers/monaco-editor-helpers.ts":
/*!***********************************************************!*\
  !*** ./extension/inline/helpers/monaco-editor-helpers.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.buildNewQuery = exports.buildNewJsonQuery = exports.getEditorIndexByFormattedUri = exports.getLastContentLine = exports.getContentFocusedLines = exports.checkEditorExists = exports.getEditorByIndex = void 0;
const helpers_1 = __webpack_require__(/*! ../../../common/helpers */ "./common/helpers.ts");
const getEditorByIndex = (index) => {
    return monaco.editor.getModels()[index];
};
exports.getEditorByIndex = getEditorByIndex;
const checkEditorExists = () => {
    var _a, _b;
    return !!((_b = (_a = monaco === null || monaco === void 0 ? void 0 : monaco.editor) === null || _a === void 0 ? void 0 : _a.getModels) === null || _b === void 0 ? void 0 : _b.call(_a));
};
exports.checkEditorExists = checkEditorExists;
const getContentFocusedLines = (editorIndex) => {
    var _a;
    const editor = (0, exports.getEditorByIndex)(editorIndex);
    const result = [];
    for (let i = 1; i <= editor.getLineCount(); i++) {
        if (editor.getLineDecorations(i).some(l => l.options.className)
            && ((_a = editor.getLineContent(i)) === null || _a === void 0 ? void 0 : _a.trim()) !== '') {
            result.push(i);
        }
    }
    return result;
};
exports.getContentFocusedLines = getContentFocusedLines;
const getLastContentLine = (editorIndex) => {
    var _a;
    const editor = (0, exports.getEditorByIndex)(editorIndex);
    const contentLines = editor.getLinesContent();
    while (((_a = contentLines[contentLines.length - 1]) === null || _a === void 0 ? void 0 : _a.trim()) === '') {
        contentLines.splice(contentLines.length - 1);
    }
    return contentLines.length > 0 ? contentLines.length : 1;
};
exports.getLastContentLine = getLastContentLine;
const getEditorIndexByFormattedUri = (uri) => {
    return monaco.editor.getModels().findIndex(model => {
        return model.uri._formatted === uri;
    });
};
exports.getEditorIndexByFormattedUri = getEditorIndexByFormattedUri;
const buildNewJsonQuery = (editorIndex, suffix, modifyType) => {
    var _a;
    const editor = (0, exports.getEditorByIndex)(editorIndex);
    const currentEditorValue = (0, helpers_1.parseJSONSafe)(editor.getValue(), null);
    const currentQuery = (!currentEditorValue || !currentEditorValue.Query)
        ? ''
        : currentEditorValue.Query;
    const newQuery = `${modifyType === 'show all'
        ? ((_a = currentQuery.split('|').shift()) === null || _a === void 0 ? void 0 : _a.trim())
            || '<unknown>'
        : currentQuery} ${suffix}`;
    return JSON.stringify({
        Query: newQuery,
    }, null, 3);
};
exports.buildNewJsonQuery = buildNewJsonQuery;
const buildNewQuery = (editorIndex, suffix, modifyType) => {
    let newQuery = '';
    const editor = (0, exports.getEditorByIndex)(editorIndex);
    const editorLines = editor.getLinesContent();
    const focusedLines = (0, exports.getContentFocusedLines)(editorIndex);
    if (modifyType === 'show all' && focusedLines.length < 1) {
        const prefix = editorLines
            .map((l) => l.split('|').shift())
            .filter(Boolean).pop()
            || '<unknown>';
        newQuery = `${prefix} ${suffix}`;
    }
    if (modifyType === 'show all' && focusedLines.length >= 1) {
        const prefix = editorLines[focusedLines[0] - 1].split('|').shift();
        editorLines.splice(focusedLines[0] - 1, focusedLines.length, `${prefix} ${suffix}`);
        newQuery = editorLines.join('\n');
    }
    if (modifyType !== 'show all') {
        const lastEditorLineIndex = focusedLines.length > 0
            ? focusedLines[focusedLines.length - 1]
            : (0, exports.getLastContentLine)(editorIndex);
        const lastEditorLine = editor.getLineContent(lastEditorLineIndex) || '<unknown>';
        editorLines[lastEditorLineIndex - 1] = `${lastEditorLine} ${suffix}`;
        newQuery = editorLines.join('\n');
    }
    return (0, helpers_1.clearExtraSpaces)(newQuery);
};
exports.buildNewQuery = buildNewQuery;


/***/ }),

/***/ "./extension/inline/types/types-inline-messages.ts":
/*!*********************************************************!*\
  !*** ./extension/inline/types/types-inline-messages.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageToInline = void 0;
const common_helpers_1 = __webpack_require__(/*! ../../common/common-helpers */ "./extension/common/common-helpers.ts");
var MessageToInline;
(function (MessageToInline) {
    MessageToInline["ISModifyQuery"] = "ISModifyQuery";
})(MessageToInline = exports.MessageToInline || (exports.MessageToInline = {}));
Object.values(MessageToInline).forEach(type => {
    if ((0, common_helpers_1.getExecutingContextByMessageType)(type) !== 'inline') {
        throw new Error(`Wrong inline message type "${type}"`);
    }
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*******************************************************!*\
  !*** ./extension/inline/inline-microsoft-defender.ts ***!
  \*******************************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const types_inline_messages_1 = __webpack_require__(/*! ./types/types-inline-messages */ "./extension/inline/types/types-inline-messages.ts");
const loggers_debug_1 = __webpack_require__(/*! ../common/loggers/loggers-debug */ "./extension/common/loggers/loggers-debug.ts");
const types_common_1 = __webpack_require__(/*! ../common/types/types-common */ "./extension/common/types/types-common.ts");
const common_listeners_1 = __webpack_require__(/*! ../common/common-listeners */ "./extension/common/common-listeners.ts");
const microsoft_defender_helpers_1 = __webpack_require__(/*! ../content/platforms/microsoft-defender-for-endpoint/microsoft-defender-helpers */ "./extension/content/platforms/microsoft-defender-for-endpoint/microsoft-defender-helpers.ts");
const monaco_editor_helpers_1 = __webpack_require__(/*! ./helpers/monaco-editor-helpers */ "./extension/inline/helpers/monaco-editor-helpers.ts");
const loggers = (__webpack_require__(/*! ../common/loggers */ "./extension/common/loggers/index.ts").loggers.addPrefix)((0, loggers_debug_1.getDebugPrefix)('inline'))
    .addPrefix(types_common_1.PlatformID.MicrosoftDefender);
let editorIndex = 2;
const setIndex = (index) => {
    if (index === null) {
        return false;
    }
    if (editorIndex !== index) {
        editorIndex = index;
        loggers.debug().log('The editor index is set to', index);
    }
    return true;
};
const getCurrentEditorIndex = () => {
    let responseEditors = Array.from(document.querySelectorAll('.response-editor .monaco-editor[data-uri^="inmemory:"]')).filter(e => e.scrollWidth > 5);
    const editorHtml = Array.from(document.querySelectorAll('.monaco-editor[data-uri^="inmemory:"]'))
        .filter(e => e.scrollWidth > 5)
        .filter(e => !responseEditors.includes(e))[0];
    if (!editorHtml) {
        return null;
    }
    const uri = editorHtml
        .getAttribute('data-uri') || '#failed';
    const index = (0, monaco_editor_helpers_1.getEditorIndexByFormattedUri)(uri);
    return typeof index === 'number' && index > -1 ? index : null;
};
window.addEventListener('message', (event) => {
    const message = event.data;
    if ((0, common_listeners_1.isMessageMatched)(() => types_inline_messages_1.MessageToInline.ISModifyQuery === message.type, message, event)) {
        if (!(0, monaco_editor_helpers_1.checkEditorExists)()) {
            return loggers.error().log('editor not found', monaco);
        }
        if (!setIndex(getCurrentEditorIndex())) {
            return loggers.info().log('Can not determine the editor index');
        }
        const { resources, modifyType } = message.payload;
        const { href } = document.location;
        const suffix = ` | where ${(0, microsoft_defender_helpers_1.buildMicrosoftDefenderQueryParts)(modifyType, resources)}`;
        const editor = (0, monaco_editor_helpers_1.getEditorByIndex)(editorIndex);
        const newQuery = href.indexOf('security.microsoft.com/v2/advanced-hunting') > -1
            ? (0, monaco_editor_helpers_1.buildNewQuery)(editorIndex, suffix, modifyType)
            : (0, monaco_editor_helpers_1.buildNewJsonQuery)(editorIndex, suffix, modifyType);
        editor.setValue(newQuery);
    }
});
loggers.debug().log('mounted');

})();

/******/ })()
;