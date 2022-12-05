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
const helpers_1 = __webpack_require__(/*! ./helpers */ "./common/helpers.ts");
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
    if (!/^[.0-9]*$/.test(sValue)
        || (0, helpers_1.indexOfAll)(sValue, '.').length > 1) {
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
exports.indexOfAll = exports.sortNumbers = exports.debounce = exports.formatDate = exports.formatBinaryDate = exports.createNonDuplicateValue = exports.capitalizeFirstLetter = exports.formatString = exports.deduplicateArray = exports.parseJSONSafe = exports.clearLineBreaks = exports.clearExtraSpaces = exports.uuid = exports.isFlatObjectsEqual = void 0;
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
const clearLineBreaks = (str) => str
    .trim()
    .replace(/(\r\n|\n|\r)/gm, ' ');
exports.clearLineBreaks = clearLineBreaks;
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
const createNonDuplicateValue = (value, values) => {
    if (!values.includes(value)) {
        return value;
    }
    let increment = 1;
    let wordRoot = value;
    let searchedWordRoot = wordRoot.slice(0, wordRoot.length - 1);
    while (values.includes(searchedWordRoot)) {
        wordRoot = searchedWordRoot;
        searchedWordRoot = searchedWordRoot.slice(0, searchedWordRoot.length - 1);
    }
    while (values.includes(`${wordRoot}${increment}`)) {
        increment++;
    }
    return `${wordRoot}${increment}`;
};
exports.createNonDuplicateValue = createNonDuplicateValue;
const formatBinaryDate = (value) => {
    const sValue = typeof value === 'string'
        ? value
        : String(value);
    return sValue.length > 1
        ? sValue
        : `0${sValue}`;
};
exports.formatBinaryDate = formatBinaryDate;
const formatDate = (pattern, data) => {
    return (0, exports.formatString)(pattern, {
        'Y': String(data.getFullYear()),
        'M': (0, exports.formatBinaryDate)(data.getMonth()),
        'm': (0, exports.formatBinaryDate)(data.getMinutes()),
        's': (0, exports.formatBinaryDate)(data.getSeconds()),
        'ms': (0, exports.formatBinaryDate)(data.getMilliseconds()),
        'd': (0, exports.formatBinaryDate)(data.getDate()),
        'h': (0, exports.formatBinaryDate)(data.getHours()),
    });
};
exports.formatDate = formatDate;
const debounce = (func, timeoutMs) => {
    let timeoutID;
    return function (...args) {
        const context = this;
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => func.apply(context, args), timeoutMs);
    };
};
exports.debounce = debounce;
const sortNumbers = (a, b) => {
    if (a > b) {
        return 1;
    }
    if (a < b) {
        return -1;
    }
    return 0;
};
exports.sortNumbers = sortNumbers;
const indexOfAll = (str, search) => {
    const indexes = [];
    let i = -1;
    while ((i = str.indexOf(search, i + 1)) >= 0) {
        indexes.push(i);
    }
    return indexes;
};
exports.indexOfAll = indexOfAll;


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

/***/ "./extension/app/resources/resources-types.ts":
/*!****************************************************!*\
  !*** ./extension/app/resources/resources-types.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.boundedResourcesTypeIDs = exports.BoundedResourceTypeID = void 0;
var BoundedResourceTypeID;
(function (BoundedResourceTypeID) {
    BoundedResourceTypeID["Accounts"] = "Accounts";
    BoundedResourceTypeID["Assets"] = "Assets";
})(BoundedResourceTypeID = exports.BoundedResourceTypeID || (exports.BoundedResourceTypeID = {}));
exports.boundedResourcesTypeIDs = Object.keys(BoundedResourceTypeID);


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
exports.createFormDataString = exports.compareVersions = exports.getVersionFromString = exports.removeDoubleQuotesAround = exports.buildQueryParts = exports.getElementsUnderCursor = exports.downloadFile = exports.copyToClipboard = exports.createClassName = exports.waitHTMLElement = exports.isInsideIframe = exports.mountHTMLElement = exports.cssObjectToString = exports.getExecutingContextByMessageType = exports.getWebAccessibleUrl = exports.getBrowserContext = void 0;
const api_support_1 = __webpack_require__(/*! ./api-support */ "./extension/common/api-support.ts");
const getBrowserContext = () => typeof browser !== 'undefined' ? browser : chrome;
exports.getBrowserContext = getBrowserContext;
const getWebAccessibleUrl = (path) => {
    return (0, api_support_1.isRuntimeGetUrlSupported)(path)
        ? (0, exports.getBrowserContext)().runtime.getURL(path)
        : '';
};
exports.getWebAccessibleUrl = getWebAccessibleUrl;
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
const downloadFile = (type, content, name) => {
    const prefix = type === 'csv'
        ? 'data:text/csv;charset=utf-8,'
        : 'data:text/csv;charset=utf-8,';
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(`${prefix}${content}`));
    link.setAttribute('download', `${name}.csv`);
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
const createFormDataString = (data) => {
    const urlEncodedDataPairs = [];
    for (const [name, value] of Object.entries(data)) {
        urlEncodedDataPairs.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
    }
    return urlEncodedDataPairs
        .join('&')
        .replace(/%20/g, '+');
};
exports.createFormDataString = createFormDataString;


/***/ }),

/***/ "./extension/common/common-listeners.ts":
/*!**********************************************!*\
  !*** ./extension/common/common-listeners.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isMessageMatched = void 0;
const loggers_1 = __webpack_require__(/*! ./loggers */ "./extension/common/loggers/index.ts");
const isMessageMatched = (matchCondition, message, ...otherInfo) => {
    if (matchCondition()) {
        loggers_1.loggers
            .debug()
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
exports.version = "1.1.0";


/***/ }),

/***/ "./extension/common/loggers/index.ts":
/*!*******************************************!*\
  !*** ./extension/common/loggers/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Loggers = exports.stopLogging = exports.startLogging = exports.loggers = void 0;
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
    setPrefix(prefix) {
        exports.loggers = this.addPrefix(prefix);
        return exports.loggers;
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
exports.PlatformName = exports.PlatformID = exports.Browser = void 0;
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
    PlatformID["QRadar"] = "QRadar";
})(PlatformID = exports.PlatformID || (exports.PlatformID = {}));
var PlatformName;
(function (PlatformName) {
    PlatformName["MicrosoftSentinel"] = "Microsoft Sentinel";
    PlatformName["MicrosoftDefender"] = "Microsoft Defender For Endpoint";
    PlatformName["Splunk"] = "Splunk";
    PlatformName["QRadar"] = "IBM QRadar";
})(PlatformName = exports.PlatformName || (exports.PlatformName = {}));


/***/ }),

/***/ "./extension/content/platforms/QRadarPlatform.ts":
/*!*******************************************************!*\
  !*** ./extension/content/platforms/QRadarPlatform.ts ***!
  \*******************************************************/
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
exports.QRadarPlatform = void 0;
const types_content_common_1 = __webpack_require__(/*! ../types/types-content-common */ "./extension/content/types/types-content-common.ts");
const types_common_1 = __webpack_require__(/*! ../../common/types/types-common */ "./extension/common/types/types-common.ts");
const resources_types_1 = __webpack_require__(/*! ../../app/resources/resources-types */ "./extension/app/resources/resources-types.ts");
const common_helpers_1 = __webpack_require__(/*! ../../common/common-helpers */ "./extension/common/common-helpers.ts");
const checkers_1 = __webpack_require__(/*! ../../../common/checkers */ "./common/checkers.ts");
const content_services_listeners_1 = __webpack_require__(/*! ../services/content-services-listeners */ "./extension/content/services/content-services-listeners.ts");
const common_listeners_1 = __webpack_require__(/*! ../../common/common-listeners */ "./extension/common/common-listeners.ts");
const types_content_messages_1 = __webpack_require__(/*! ../types/types-content-messages */ "./extension/content/types/types-content-messages.ts");
const content_services_1 = __webpack_require__(/*! ../services/content-services */ "./extension/content/services/content-services.ts");
const types_inline_messages_1 = __webpack_require__(/*! ../../inline/types/types-inline-messages */ "./extension/inline/types/types-inline-messages.ts");
const public_resources_1 = __webpack_require__(/*! ../../manifest/public-resources */ "./extension/manifest/public-resources.ts");
let loggers;
class QRadarPlatform {
    constructor() {
        this.defaultWatchers = {
            [resources_types_1.BoundedResourceTypeID.Accounts]: [
                'Account Name',
                'Recipients',
                'Sender',
                'Target Username',
                'Username',
            ],
            [resources_types_1.BoundedResourceTypeID.Assets]: [
                'Client Hostname',
                'Destination Hostname',
                'Destination IP',
                'Hostname',
                'Machine Identifier',
                'Recipient Host',
                'Sender Host',
                'Source Hostname',
                'Source Workstation',
                'Source IP',
                'Source Asset Name',
                'Destination Asset Name',
            ],
        };
        this.extensionDefaultPosition = QRadarPlatform.extensionDefaultPosition;
    }
    static normalizedValue(value) {
        const nValue = (0, checkers_1.isNumberInString)(value)
            ? parseFloat(value)
            : value;
        return typeof nValue === 'number'
            ? nValue
            : `'${nValue}'`;
    }
    buildQueryParts(type, resources) {
        return (0, common_helpers_1.buildQueryParts)(resources, type === 'exclude' ? '!=' : '==', type === 'exclude' ? ' AND ' : ' OR ', {
            leftOperand: (v) => `"${v}"`,
            rightOperand: (v) => QRadarPlatform.normalizedValue(v),
        });
    }
    connect() {
        QRadarPlatform.setListeners();
        loggers.debug().log('connected');
    }
    static setListeners() {
        content_services_listeners_1.addListener(types_content_common_1.ListenerType.OnMessage, (message) => __awaiter(this, void 0, void 0, function* () {
            if (!document.querySelector('#aceEditor')) {
                return;
            }
            const query = `script[src$="${public_resources_1.qRadarInline}"]`;
            if (!document.querySelector(query)) {
                QRadarPlatform.connectInlineListener();
                yield (0, common_helpers_1.waitHTMLElement)(query);
            }
            if ((0, common_listeners_1.isMessageMatched)(() => types_content_messages_1.MessageToContent.CSModifyQuery === message.type, message)) {
                (0, content_services_1.sendMessageFromContent)(Object.assign(Object.assign({}, message), { id: `${message.id}--content-modify-query`, type: types_inline_messages_1.MessageToInline.ISModifyQuery }), false);
            }
        }));
    }
    static connectInlineListener() {
        (0, common_helpers_1.mountHTMLElement)('script', document.body, {
            attributes: {
                src: (0, common_helpers_1.getWebAccessibleUrl)(public_resources_1.qRadarInline),
                type: 'text/javascript',
                'data-type': 'inline-listener',
            },
        });
    }
    getID() {
        return types_common_1.PlatformID.QRadar;
    }
    getName() {
        return types_common_1.PlatformName.QRadar;
    }
}
exports.QRadarPlatform = QRadarPlatform;
QRadarPlatform.extensionDefaultPosition = {
    top: 0,
    left: 0,
    width: 500,
    height: 400,
};
QRadarPlatform.id = types_common_1.PlatformID.QRadar;
loggers = (__webpack_require__(/*! ../../common/loggers */ "./extension/common/loggers/index.ts").loggers.addPrefix)(QRadarPlatform.id);


/***/ }),

/***/ "./extension/content/services/content-services-listeners.ts":
/*!******************************************************************!*\
  !*** ./extension/content/services/content-services-listeners.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addListener = void 0;
const types_content_common_1 = __webpack_require__(/*! ../types/types-content-common */ "./extension/content/types/types-content-common.ts");
const common_helpers_1 = __webpack_require__(/*! ../../common/common-helpers */ "./extension/common/common-helpers.ts");
const loggers_debug_1 = __webpack_require__(/*! ../../common/loggers/loggers-debug */ "./extension/common/loggers/loggers-debug.ts");
const api_support_1 = __webpack_require__(/*! ../../common/api-support */ "./extension/common/api-support.ts");
const listeners = {};
const addListener = (type, listener, ...otherProps) => {
    var _a;
    (_a = listeners[type]) === null || _a === void 0 ? void 0 : _a.call(listeners, (...params) => {
        listener(...params);
    }, ...otherProps);
};
exports.addListener = addListener;
const removeListenersCallbacks = [];
listeners[types_content_common_1.ListenerType.OnMessage] = (listener, ...otherProps) => {
    if ((0, api_support_1.isRuntimeOnMessageSupported)()) {
        const action = (0, common_helpers_1.getBrowserContext)().runtime.onMessage;
        removeListenersCallbacks.push(() => {
            action.removeListener(listener);
        });
        action.addListener((...params) => {
            listener(...params);
        }, ...otherProps);
    }
    if (!(0, api_support_1.isAddEventListenerSupported)()) {
        return;
    }
    const boundedListener = (event) => {
        const message = event.data;
        if (event.origin !== window.location.origin
            || message.externalType !== loggers_debug_1.DebugID.debugIDExternal) {
            return;
        }
        listener(event.data, ...otherProps);
    };
    removeListenersCallbacks.push(() => {
        window.removeEventListener('message', boundedListener);
    });
    window.addEventListener('message', boundedListener);
};


/***/ }),

/***/ "./extension/content/services/content-services.ts":
/*!********************************************************!*\
  !*** ./extension/content/services/content-services.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sendMessageFromApp = exports.sendMessageFromContent = exports.sendMessage = void 0;
const common_helpers_1 = __webpack_require__(/*! ../../common/common-helpers */ "./extension/common/common-helpers.ts");
const helpers_1 = __webpack_require__(/*! ../../../common/helpers */ "./common/helpers.ts");
const api_support_1 = __webpack_require__(/*! ../../common/api-support */ "./extension/common/api-support.ts");
const serviceLoggers = (__webpack_require__(/*! ../../common/loggers */ "./extension/common/loggers/index.ts").loggers.addPrefix)('services');
const sendMessage = (loggers, message, runtime = true) => {
    var _a;
    message.id = `${message.id ? `${message.id}--` : ''}${(0, helpers_1.uuid)()}`;
    const logPrefix = 'sendMessage';
    try {
        if (!runtime && !(0, api_support_1.isPostMessageSupported)(message)) {
            return;
        }
        if (!runtime) {
            window.postMessage(message);
            return loggers.debug().log('postMessage', message);
        }
        if (!(0, api_support_1.isRuntimeSendMessageSupported)()) {
            return;
        }
        (_a = (0, common_helpers_1.getBrowserContext)().runtime.sendMessage(message)) === null || _a === void 0 ? void 0 : _a.catch((e) => loggers.error().addPrefix(logPrefix).log(e, message));
        loggers.debug().addPrefix(logPrefix).log(message);
    }
    catch (e) {
        loggers.error().addPrefix(logPrefix).log(e, message);
    }
};
exports.sendMessage = sendMessage;
const sendMessageFromContent = (message, runtime = true) => {
    return (0, exports.sendMessage)(serviceLoggers.addPrefix('message-from-content'), message, runtime);
};
exports.sendMessageFromContent = sendMessageFromContent;
const sendMessageFromApp = (message, runtime = true) => {
    return (0, exports.sendMessage)(serviceLoggers.addPrefix('message-from-app'), message, runtime);
};
exports.sendMessageFromApp = sendMessageFromApp;


/***/ }),

/***/ "./extension/content/types/types-content-common.ts":
/*!*********************************************************!*\
  !*** ./extension/content/types/types-content-common.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListenerType = void 0;
var ListenerType;
(function (ListenerType) {
    ListenerType["OnMessage"] = "OnMessage";
})(ListenerType = exports.ListenerType || (exports.ListenerType = {}));


/***/ }),

/***/ "./extension/content/types/types-content-messages.ts":
/*!***********************************************************!*\
  !*** ./extension/content/types/types-content-messages.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageToContent = void 0;
const common_helpers_1 = __webpack_require__(/*! ../../common/common-helpers */ "./extension/common/common-helpers.ts");
var MessageToContent;
(function (MessageToContent) {
    MessageToContent["CSModifyQuery"] = "CSModifyQuery";
    MessageToContent["CSConnectPlatform"] = "CSConnectPlatform";
})(MessageToContent = exports.MessageToContent || (exports.MessageToContent = {}));
Object.values(MessageToContent).forEach(type => {
    if ((0, common_helpers_1.getExecutingContextByMessageType)(type) !== 'content') {
        throw new Error(`Wrong content message type "${type}"`);
    }
});


/***/ }),

/***/ "./extension/inline/helpers/ace-editor-helpers.ts":
/*!********************************************************!*\
  !*** ./extension/inline/helpers/ace-editor-helpers.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.buildNewQuery = exports.getEditor = void 0;
const helpers_1 = __webpack_require__(/*! ../../../common/helpers */ "./common/helpers.ts");
const getEditor = (element) => {
    try {
        return ace.edit(element);
    }
    catch (e) {
        return null;
    }
};
exports.getEditor = getEditor;
const buildNewQuery = (currentQuery, suffix, modifyType) => {
    var _a;
    const newQuery = `${modifyType === 'show all'
        ? ((_a = currentQuery.split('|').shift()) === null || _a === void 0 ? void 0 : _a.trim())
            || '<unknown>'
        : currentQuery} ${suffix}`;
    return (0, helpers_1.clearExtraSpaces)(newQuery);
};
exports.buildNewQuery = buildNewQuery;


/***/ }),

/***/ "./extension/inline/helpers/aql-builder.ts":
/*!*************************************************!*\
  !*** ./extension/inline/helpers/aql-builder.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.buildNewQuery = exports.addWhere = exports.parseQueryString = void 0;
const helpers_1 = __webpack_require__(/*! ../../../common/helpers */ "./common/helpers.ts");
const parseQueryString = (query) => {
    const normalizedQuery = (0, helpers_1.clearExtraSpaces)((0, helpers_1.clearLineBreaks)(query)).trim();
    const { indexes, mappedIndexes } = [
        'select',
        'where',
        'from',
        'last',
        'start',
        'stop',
        'limit',
        'like',
        'order by',
        'group by',
        'having',
        'ilike',
    ].reduce((result, predicate) => {
        const index = normalizedQuery.search(new RegExp(`${predicate === 'select' ? '^' : '(\\s|\\t)'}${predicate}(\\s|\\t)`, 'gi'));
        if (index > -1) {
            result.indexes.add(index);
            result.mappedIndexes.set(index, predicate);
        }
        return result;
    }, {
        indexes: new Set(),
        mappedIndexes: new Map(),
    });
    const sortedIndexes = Array.from(indexes).sort(helpers_1.sortNumbers);
    return sortedIndexes.reduce((r, index, i) => {
        const predicate = mappedIndexes.get(index);
        const startIndex = index;
        const endIndex = sortedIndexes[i + 1] || normalizedQuery.length;
        r[predicate] = normalizedQuery.substring(startIndex, endIndex)
            .replace(new RegExp(predicate, 'gi'), '')
            .trim();
        return r;
    }, {});
};
exports.parseQueryString = parseQueryString;
const addWhere = (currentWhere, addingWhere, separator) => {
    return currentWhere.length < 1
        ? addingWhere
        : `(${currentWhere}) ${separator} ${addingWhere}`;
};
exports.addWhere = addWhere;
const buildNewQuery = (parsedQuery) => {
    let result = `SELECT ${parsedQuery.select}`;
    if (parsedQuery.from) {
        result += ` FROM ${parsedQuery.from}`;
    }
    if (parsedQuery.where) {
        result += ` WHERE ${parsedQuery.where}`;
    }
    if (parsedQuery['group by']) {
        result += ` GROUP BY ${parsedQuery['group by']}`;
    }
    if (parsedQuery.having) {
        result += ` HAVING ${parsedQuery.having}`;
    }
    if (parsedQuery['order by']) {
        result += ` ORDER BY ${parsedQuery['order by']}`;
    }
    if (parsedQuery.like) {
        result += ` LIKE ${parsedQuery.like}`;
    }
    if (parsedQuery.ilike) {
        result += ` ILIKE ${parsedQuery.ilike}`;
    }
    if (parsedQuery.limit) {
        result += ` LIMIT ${parsedQuery.limit}`;
    }
    if (parsedQuery.last) {
        result += ` LAST ${parsedQuery.last}`;
    }
    if (parsedQuery.start) {
        result += ` START ${parsedQuery.start}`;
    }
    if (parsedQuery.stop) {
        result += ` STOP ${parsedQuery.stop}`;
    }
    return result;
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


/***/ }),

/***/ "./extension/manifest/public-resources.ts":
/*!************************************************!*\
  !*** ./extension/manifest/public-resources.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.accessibleResources = exports.qRadarInline = exports.splunkInline = exports.microsoftDefenderInline = exports.microsoftSentinelInline = exports.appStyles = void 0;
const types_common_1 = __webpack_require__(/*! ../common/types/types-common */ "./extension/common/types/types-common.ts");
exports.appStyles = 'app-styles.css';
exports.microsoftSentinelInline = 'inline-microsoft-sentinel.js';
exports.microsoftDefenderInline = 'inline-microsoft-defender.js';
exports.splunkInline = 'inline-splunk.js';
exports.qRadarInline = 'inline-qradar.js';
exports.accessibleResources = {
    [types_common_1.PlatformID.MicrosoftSentinel]: [exports.microsoftSentinelInline],
    [types_common_1.PlatformID.MicrosoftDefender]: [exports.microsoftDefenderInline],
    [types_common_1.PlatformID.Splunk]: [exports.splunkInline],
    [types_common_1.PlatformID.QRadar]: [exports.qRadarInline],
    app: [exports.appStyles],
};


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
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
var exports = {};
/*!*****************************!*\
  !*** ./extension/inline.ts ***!
  \*****************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const loggers_debug_1 = __webpack_require__(/*! ./common/loggers/loggers-debug */ "./extension/common/loggers/loggers-debug.ts");
(__webpack_require__(/*! ./common/loggers */ "./extension/common/loggers/index.ts").loggers.setPrefix)((0, loggers_debug_1.getDebugPrefix)('inline'));

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
var exports = __webpack_exports__;
/*!*******************************************!*\
  !*** ./extension/inline/inline-qradar.ts ***!
  \*******************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const QRadarPlatform_1 = __webpack_require__(/*! ../content/platforms/QRadarPlatform */ "./extension/content/platforms/QRadarPlatform.ts");
const common_listeners_1 = __webpack_require__(/*! ../common/common-listeners */ "./extension/common/common-listeners.ts");
const types_inline_messages_1 = __webpack_require__(/*! ./types/types-inline-messages */ "./extension/inline/types/types-inline-messages.ts");
const ace_editor_helpers_1 = __webpack_require__(/*! ./helpers/ace-editor-helpers */ "./extension/inline/helpers/ace-editor-helpers.ts");
const aql_builder_1 = __webpack_require__(/*! ./helpers/aql-builder */ "./extension/inline/helpers/aql-builder.ts");
const platform = new QRadarPlatform_1.QRadarPlatform();
const loggers = (__webpack_require__(/*! ../common/loggers */ "./extension/common/loggers/index.ts").loggers.addPrefix)(platform.getID());
window.addEventListener('message', (event) => {
    const message = event.data;
    if ((0, common_listeners_1.isMessageMatched)(() => types_inline_messages_1.MessageToInline.ISModifyQuery === message.type, message, event)) {
        const element = document.querySelector('#aceEditor');
        const editor = (0, ace_editor_helpers_1.getEditor)(element);
        if (!editor) {
            return loggers.error().log('editor not found', ace);
        }
        const { resources, modifyType } = message.payload;
        let parsedQuery = (0, aql_builder_1.parseQueryString)(editor.getValue());
        if (modifyType === 'show all') {
            parsedQuery = {
                select: parsedQuery.select,
                from: parsedQuery.from,
            };
        }
        parsedQuery.where = (0, aql_builder_1.addWhere)(parsedQuery.where || '', platform.buildQueryParts(modifyType, resources), 'AND');
        editor.setValue((0, aql_builder_1.buildNewQuery)(parsedQuery));
    }
});
loggers.debug().log('mounted');

})();

/******/ })()
;