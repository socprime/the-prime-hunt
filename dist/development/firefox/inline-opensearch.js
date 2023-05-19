/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./common/checkers.ts":
/*!****************************!*\
  !*** ./common/checkers.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isObject = exports.isDate = exports.isAllowedProtocol = exports.isNumberInString = exports.isNotEmpty = exports.isString = void 0;
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
    if (typeof str === 'number') {
        return true;
    }
    if (typeof str !== 'string') {
        return false;
    }
    const sValue = str.trim();
    if (!/^[-.0-9]*$/.test(sValue)
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
const isDate = (value) => {
    return new Date(typeof value === 'string' && (0, exports.isNumberInString)(value)
        ? parseInt(value)
        : value).getTime() > 567982800000;
};
exports.isDate = isDate;
const isObject = (obj) => {
    return typeof obj === 'object'
        && !Array.isArray(obj)
        && obj !== null
        && typeof obj !== 'function';
};
exports.isObject = isObject;


/***/ }),

/***/ "./common/helpers.ts":
/*!***************************!*\
  !*** ./common/helpers.ts ***!
  \***************************/
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
exports.getUrlParamsSafe = exports.iterateObjectsRecursively = exports.sleep = exports.indexOfAll = exports.sortNumbers = exports.debounce = exports.formatDate = exports.formatBinaryDate = exports.createNonDuplicateValue = exports.capitalizeFirstLetter = exports.formatString = exports.deduplicateArray = exports.parseJSONSafe = exports.splitByLines = exports.clearLineBreaks = exports.clearExtraSpaces = exports.uuid = exports.isFlatObjectsEqual = void 0;
const checkers_1 = __webpack_require__(/*! ./checkers */ "./common/checkers.ts");
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
const splitByLines = (str, removeEmpty = false) => {
    const regexp = new RegExp(/(\r\n|\n|\r)/, 'gm');
    let res = str.split(regexp);
    if (removeEmpty) {
        res = res.filter(r => r && r !== '\r\n' && r !== '\n' && r !== '\r');
    }
    return res;
};
exports.splitByLines = splitByLines;
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
        'M': (0, exports.formatBinaryDate)(data.getMonth() + 1),
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
const sleep = (sec) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(null);
        }, sec * 1000);
    });
});
exports.sleep = sleep;
const iterateObjectsRecursively = (obj, keyPath, settings) => {
    const { separator = '.', onIteration } = settings || {};
    return Object.keys(obj || {}).reduce((result, key) => {
        const path = keyPath.length ? `${keyPath}${separator}${key}` : key;
        const value = obj[key];
        if (typeof onIteration === 'function' && !(onIteration === null || onIteration === void 0 ? void 0 : onIteration(path, key, value, keyPath))) {
            return keyPath.length ? [...result, keyPath] : result;
        }
        return [
            ...result,
            ...((0, checkers_1.isObject)(value)
                ? (0, exports.iterateObjectsRecursively)(value, path, settings)
                : [path]),
        ];
    }, []);
};
exports.iterateObjectsRecursively = iterateObjectsRecursively;
const getUrlParamsSafe = (url, paramName) => {
    try {
        return new URL(url)[paramName] || '';
    }
    catch (e) {
        return '';
    }
};
exports.getUrlParamsSafe = getUrlParamsSafe;


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

/***/ "./extension/background/types/types-background-messages.ts":
/*!*****************************************************************!*\
  !*** ./extension/background/types/types-background-messages.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageToBackground = void 0;
const loggers_helpers_1 = __webpack_require__(/*! ../../common/loggers/loggers-helpers */ "./extension/common/loggers/loggers-helpers.ts");
var MessageToBackground;
(function (MessageToBackground) {
    MessageToBackground["BGRunClearData"] = "BGRunClearData";
    MessageToBackground["BGModifyQuery"] = "BGModifyQuery";
    MessageToBackground["BGSetQuery"] = "BGSetQuery";
    MessageToBackground["BGGetQuery"] = "BGGetQuery";
    MessageToBackground["BGDirectMessageToApp"] = "BGDirectMessageToApp";
    MessageToBackground["BGSendMessageOutside"] = "BGSendMessageOutside";
    MessageToBackground["BGSetWatchers"] = "BGSetWatchers";
    MessageToBackground["BGRegisterPlatformTab"] = "BGRegisterPlatformTab";
    MessageToBackground["BGToggleShowExtension"] = "BGToggleShowExtension";
    MessageToBackground["BGSetDebugMode"] = "BGSetDebugMode";
    MessageToBackground["BGDirectMessageToInline"] = "BGDirectMessageToInline";
})(MessageToBackground = exports.MessageToBackground || (exports.MessageToBackground = {}));
Object.values(MessageToBackground).forEach(type => {
    if ((0, loggers_helpers_1.getExecutingContextByMessageType)(type) !== 'background') {
        throw new Error(`Wrong background message type "${type}"`);
    }
});


/***/ }),

/***/ "./extension/common/api-support.ts":
/*!*****************************************!*\
  !*** ./extension/common/api-support.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isRuntimeGetUrlSupported = exports.isTabsSendMessageSupported = exports.isTabsQuerySupported = exports.isOnBeforeSendHeadersSupported = exports.isOnBeforeRequestSupported = exports.isBrowserActionOnClickedSupported = exports.isActionOnClickedSupported = exports.isTabsOnRemovedSupported = exports.isRuntimeOnMessageExternalSupported = exports.isRuntimeOnMessageSupported = exports.isRuntimeSendMessageSupported = exports.isAddEventListenerSupported = exports.isPostMessageSupported = void 0;
const common_extension_helpers_1 = __webpack_require__(/*! ./common-extension-helpers */ "./extension/common/common-extension-helpers.ts");
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
    if (!((_b = (_a = (0, common_extension_helpers_1.getBrowserContext)()) === null || _a === void 0 ? void 0 : _a.runtime) === null || _b === void 0 ? void 0 : _b.sendMessage)) {
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
    if (!((_b = (_a = (0, common_extension_helpers_1.getBrowserContext)().runtime) === null || _a === void 0 ? void 0 : _a.onMessage) === null || _b === void 0 ? void 0 : _b.addListener)) {
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
    if (!((_b = (_a = (0, common_extension_helpers_1.getBrowserContext)().runtime) === null || _a === void 0 ? void 0 : _a.onMessageExternal) === null || _b === void 0 ? void 0 : _b.addListener)) {
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
    if (!((_b = (_a = (0, common_extension_helpers_1.getBrowserContext)().tabs) === null || _a === void 0 ? void 0 : _a.onRemoved) === null || _b === void 0 ? void 0 : _b.addListener)) {
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
    if (!((_c = (_b = (_a = (0, common_extension_helpers_1.getBrowserContext)()) === null || _a === void 0 ? void 0 : _a.action) === null || _b === void 0 ? void 0 : _b.onClicked) === null || _c === void 0 ? void 0 : _c.addListener)) {
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
    if (!((_c = (_b = (_a = (0, common_extension_helpers_1.getBrowserContext)()) === null || _a === void 0 ? void 0 : _a.browserAction) === null || _b === void 0 ? void 0 : _b.onClicked) === null || _c === void 0 ? void 0 : _c.addListener)) {
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
    if (!((_c = (_b = (_a = (0, common_extension_helpers_1.getBrowserContext)()) === null || _a === void 0 ? void 0 : _a.webRequest) === null || _b === void 0 ? void 0 : _b.onBeforeRequest) === null || _c === void 0 ? void 0 : _c.addListener)) {
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
    if (!((_c = (_b = (_a = (0, common_extension_helpers_1.getBrowserContext)()) === null || _a === void 0 ? void 0 : _a.webRequest) === null || _b === void 0 ? void 0 : _b.onBeforeSendHeaders) === null || _c === void 0 ? void 0 : _c.addListener)) {
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
    if (!((_b = (_a = (0, common_extension_helpers_1.getBrowserContext)()) === null || _a === void 0 ? void 0 : _a.tabs) === null || _b === void 0 ? void 0 : _b.query)) {
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
    if (!((_b = (_a = (0, common_extension_helpers_1.getBrowserContext)()) === null || _a === void 0 ? void 0 : _a.tabs) === null || _b === void 0 ? void 0 : _b.sendMessage)) {
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
    if (!((_b = (_a = (0, common_extension_helpers_1.getBrowserContext)()) === null || _a === void 0 ? void 0 : _a.runtime) === null || _b === void 0 ? void 0 : _b.getURL)) {
        loggers
            .warn()
            .log('API runtime.getURL is not supported', ...logData);
        return false;
    }
    return true;
};
exports.isRuntimeGetUrlSupported = isRuntimeGetUrlSupported;


/***/ }),

/***/ "./extension/common/common-extension-helpers.ts":
/*!******************************************************!*\
  !*** ./extension/common/common-extension-helpers.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getWebAccessibleUrl = exports.getBrowserContext = void 0;
const api_support_1 = __webpack_require__(/*! ./api-support */ "./extension/common/api-support.ts");
const getBrowserContext = () => typeof browser !== 'undefined' ? browser : chrome;
exports.getBrowserContext = getBrowserContext;
const getWebAccessibleUrl = (path) => {
    return (0, api_support_1.isRuntimeGetUrlSupported)(path)
        ? (0, exports.getBrowserContext)().runtime.getURL(path)
        : '';
};
exports.getWebAccessibleUrl = getWebAccessibleUrl;


/***/ }),

/***/ "./extension/common/common-helpers.ts":
/*!********************************************!*\
  !*** ./extension/common/common-helpers.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports) {


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
exports.createFormDataString = exports.compareVersions = exports.getVersionFromString = exports.removeDoubleQuotesAround = exports.removeQuotesAround = exports.removeBracketsAround = exports.buildQueryParts = exports.getElementsUnderCursor = exports.downloadFile = exports.copyToClipboard = exports.createClassName = exports.waitHTMLElement = exports.isInsideIframe = exports.mountHTMLElement = exports.cssObjectToString = void 0;
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
    el.style.opacity = '0';
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
const buildQueryParts = (resources, getOperator, valuesSeparator, fieldsSeparator, decorators, prefix) => {
    const queryParts = [];
    Object.keys(resources).forEach(fieldName => {
        queryParts.push(resources[fieldName]
            .map(v => `${decorators.leftOperand(fieldName)}${getOperator(fieldName, v)}${decorators.rightOperand(v)}`)
            .join(valuesSeparator));
    });
    const queryPartsStr = queryParts.join(fieldsSeparator);
    return prefix
        ? `${prefix} ${queryPartsStr}`
        : queryPartsStr;
};
exports.buildQueryParts = buildQueryParts;
const removeBracketsAround = (str) => {
    let result = str;
    if (str[0] === '(') {
        result = result.slice(1);
    }
    if (str[str.length - 1] === ')') {
        result = result.slice(0, str.length - 2);
    }
    return result;
};
exports.removeBracketsAround = removeBracketsAround;
const removeQuotesAround = (str) => {
    let result = str;
    if (str[0] === '"' || str[0] === "'") {
        result = result.slice(1);
    }
    if (str[str.length - 1] === '"' || str[str.length - 1] === "'") {
        result = result.slice(0, str.length - 2);
    }
    return result;
};
exports.removeQuotesAround = removeQuotesAround;
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
exports.version = "1.3.0";


/***/ }),

/***/ "./extension/common/loggers/index.ts":
/*!*******************************************!*\
  !*** ./extension/common/loggers/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setLoggers = exports.Loggers = exports.setDebugMode = exports.loggers = void 0;
const types_1 = __webpack_require__(/*! ../../../common/types */ "./common/types.ts");
const envs_1 = __webpack_require__(/*! ../envs */ "./extension/common/envs.ts");
let isDebugMode = envs_1.mode === types_1.Mode.development || envs_1.logLevel === types_1.LogLevel.debug;
const setDebugMode = (debugMode) => {
    isDebugMode = debugMode;
};
exports.setDebugMode = setDebugMode;
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
        if (this.level === types_1.LogLevel.debug && !isDebugMode) {
            return;
        }
        console[this.level === types_1.LogLevel.error
            ? 'error'
            : this.level === types_1.LogLevel.warn
                ? 'warn'
                : 'log'](this.prefix || '==>', ...params);
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
const setLoggers = (newLoggers) => {
    exports.loggers = newLoggers;
};
exports.setLoggers = setLoggers;


/***/ }),

/***/ "./extension/common/loggers/loggers-debug.ts":
/*!***************************************************!*\
  !*** ./extension/common/loggers/loggers-debug.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DebugID = void 0;
const types_1 = __webpack_require__(/*! ../../../common/types */ "./common/types.ts");
const loggers_helpers_1 = __webpack_require__(/*! ./loggers-helpers */ "./extension/common/loggers/loggers-helpers.ts");
var DebugID;
(function (DebugID) {
    DebugID[DebugID["debugIDExternal"] = (0, types_1.mapType)( false || loggers_helpers_1.debugID)] = "debugIDExternal";
})(DebugID = exports.DebugID || (exports.DebugID = {}));


/***/ }),

/***/ "./extension/common/loggers/loggers-helpers.ts":
/*!*****************************************************!*\
  !*** ./extension/common/loggers/loggers-helpers.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.debugID = exports.getExecutingContextByMessageType = exports.getDebugPrefix = void 0;
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
const getExecutingContextByMessageType = (messageType) => {
    let prefix = (messageType || '').slice(0, 3).toLowerCase();
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
exports.debugID = 'debug-external-der3edc3op3e4dde44rt';


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
    PlatformID["Elastic"] = "Elastic";
    PlatformID["OpenSearch"] = "OpenSearch";
    PlatformID["ArcSight"] = "ArcSight";
    PlatformID["Athena"] = "Athena";
})(PlatformID = exports.PlatformID || (exports.PlatformID = {}));
var PlatformName;
(function (PlatformName) {
    PlatformName["MicrosoftSentinel"] = "Microsoft Sentinel";
    PlatformName["MicrosoftDefender"] = "Microsoft Defender For Endpoint";
    PlatformName["Splunk"] = "Splunk";
    PlatformName["QRadar"] = "IBM QRadar";
    PlatformName["Elastic"] = "Elastic";
    PlatformName["OpenSearch"] = "OpenSearch";
    PlatformName["ArcSight"] = "ArcSight";
    PlatformName["Athena"] = "Amazon Athena";
})(PlatformName = exports.PlatformName || (exports.PlatformName = {}));


/***/ }),

/***/ "./extension/content/platforms/AbstractContentPlatform.ts":
/*!****************************************************************!*\
  !*** ./extension/content/platforms/AbstractContentPlatform.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractContentPlatform = void 0;
const common_listeners_1 = __webpack_require__(/*! ../../common/common-listeners */ "./extension/common/common-listeners.ts");
const types_content_messages_1 = __webpack_require__(/*! ../types/types-content-messages */ "./extension/content/types/types-content-messages.ts");
const content_services_1 = __webpack_require__(/*! ../services/content-services */ "./extension/content/services/content-services.ts");
const types_inline_messages_1 = __webpack_require__(/*! ../../inline/types/types-inline-messages */ "./extension/inline/types/types-inline-messages.ts");
const types_background_messages_1 = __webpack_require__(/*! ../../background/types/types-background-messages */ "./extension/background/types/types-background-messages.ts");
class AbstractContentPlatform {
    constructor() {
        this.fields = new Set();
    }
    static processInlineListeners(message) {
        if ((0, common_listeners_1.isMessageMatched)(() => types_content_messages_1.MessageToContent.CSModifyQuery === message.type, message)) {
            (0, content_services_1.sendMessageFromContent)(Object.assign(Object.assign({}, message), { id: `${message.id}--${message.type}`, type: types_inline_messages_1.MessageToInline.ISModifyQuery }), false);
        }
        if ((0, common_listeners_1.isMessageMatched)(() => types_content_messages_1.MessageToContent.CSSetQuery === message.type, message)) {
            (0, content_services_1.sendMessageFromContent)(Object.assign(Object.assign({}, message), { id: `${message.id}--${message.type}`, type: types_inline_messages_1.MessageToInline.ISSetQuery }), false);
        }
        if ((0, common_listeners_1.isMessageMatched)(() => types_content_messages_1.MessageToContent.CSGetQuery === message.type, message)) {
            (0, content_services_1.sendMessageFromContent)(Object.assign(Object.assign({}, message), { id: `${message.id}--${message.type}`, type: types_inline_messages_1.MessageToInline.ISGetQuery }), false);
        }
        if ((0, common_listeners_1.isMessageMatched)(() => types_content_messages_1.MessageToContent.CSSendMessageOutside === message.type, message)) {
            (0, content_services_1.sendMessageFromContent)(Object.assign(Object.assign({}, message), { id: `${message.id}--${message.type}`, type: types_background_messages_1.MessageToBackground.BGSendMessageOutside }));
        }
        if ((0, common_listeners_1.isMessageMatched)(() => types_content_messages_1.MessageToContent.CSSetDebugMode === message.type, message)) {
            const { debugMode } = message.payload;
            (__webpack_require__(/*! ../../common/loggers */ "./extension/common/loggers/index.ts").setDebugMode)(debugMode);
            (0, content_services_1.sendMessageFromContent)(Object.assign(Object.assign({}, message), { id: `${message.id}--${message.type}`, type: types_inline_messages_1.MessageToInline.ISSetDebugMode }), false);
        }
        if ((0, common_listeners_1.isMessageMatched)(() => types_content_messages_1.MessageToContent.CSDirectMessageToApp === message.type, message)) {
            (0, content_services_1.sendMessageFromContent)({
                id: `${message.id}--${message.type}`,
                type: types_background_messages_1.MessageToBackground.BGDirectMessageToApp,
                payload: message.payload,
            });
        }
        if ((0, common_listeners_1.isMessageMatched)(() => types_content_messages_1.MessageToContent.CSDirectMessageToInline === message.type, message)) {
            const { type, payload } = message.payload;
            (0, content_services_1.sendMessageFromContent)({
                id: `${message.id}--${message.type}`,
                type,
                payload,
            }, false);
        }
    }
}
exports.AbstractContentPlatform = AbstractContentPlatform;


/***/ }),

/***/ "./extension/content/platforms/OpenSearchPlatform.ts":
/*!***********************************************************!*\
  !*** ./extension/content/platforms/OpenSearchPlatform.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OpenSearchPlatform = void 0;
const types_content_common_1 = __webpack_require__(/*! ../types/types-content-common */ "./extension/content/types/types-content-common.ts");
const resources_types_1 = __webpack_require__(/*! ../../app/resources/resources-types */ "./extension/app/resources/resources-types.ts");
const types_common_1 = __webpack_require__(/*! ../../common/types/types-common */ "./extension/common/types/types-common.ts");
const checkers_1 = __webpack_require__(/*! ../../../common/checkers */ "./common/checkers.ts");
const common_helpers_1 = __webpack_require__(/*! ../../common/common-helpers */ "./extension/common/common-helpers.ts");
const public_resources_1 = __webpack_require__(/*! ../../manifest/public-resources */ "./extension/manifest/public-resources.ts");
const content_services_listeners_1 = __webpack_require__(/*! ../services/content-services-listeners */ "./extension/content/services/content-services-listeners.ts");
const common_extension_helpers_1 = __webpack_require__(/*! ../../common/common-extension-helpers */ "./extension/common/common-extension-helpers.ts");
const AbstractContentPlatform_1 = __webpack_require__(/*! ./AbstractContentPlatform */ "./extension/content/platforms/AbstractContentPlatform.ts");
let loggers;
class OpenSearchPlatform extends AbstractContentPlatform_1.AbstractContentPlatform {
    constructor() {
        super(...arguments);
        this.defaultWatchers = {
            [resources_types_1.BoundedResourceTypeID.Accounts]: [
                'user.name',
                'related.user',
                'user.full_name',
                'winlog.event_data.SubjectUserName',
                'winlog.event_data.TargetUserName',
                'winlog.user.name',
            ],
            [resources_types_1.BoundedResourceTypeID.Assets]: [
                'host.hostname',
                'host.name',
                'winlog.computer_name',
            ],
        };
        this.extensionDefaultPosition = OpenSearchPlatform.extensionDefaultPosition;
    }
    static buildQueryParts(type, resources, withPrefix = false) {
        const prefix = type === 'include'
            ? 'AND'
            : 'AND NOT';
        const normalizedResources = {};
        Object.keys(resources).forEach(fieldName => {
            if (resources[fieldName].length > 1) {
                normalizedResources[fieldName] = [
                    `(${resources[fieldName]
                        .map(rn => OpenSearchPlatform.normalizedValue(rn))
                        .join(' OR ')})`,
                ];
            }
            else {
                normalizedResources[fieldName] = resources[fieldName];
            }
        });
        return (0, common_helpers_1.buildQueryParts)(normalizedResources, () => type === 'exclude' ? ':' : ':', type === 'exclude' ? ' AND NOT ' : ' OR ', type === 'exclude' ? ' AND NOT ' : ' AND ', {
            leftOperand: (v) => v,
            rightOperand: (v) => OpenSearchPlatform.normalizedValue(v),
        }, withPrefix ? prefix : undefined);
    }
    getID() {
        return OpenSearchPlatform.id;
    }
    getName() {
        return types_common_1.PlatformName.OpenSearch;
    }
    static setListeners() {
        content_services_listeners_1.addListener(types_content_common_1.ListenerType.OnMessage, (message) => {
            AbstractContentPlatform_1.AbstractContentPlatform.processInlineListeners(message);
        });
        loggers.debug().log('listeners were set');
    }
    static connectInlineListener() {
        (0, common_helpers_1.mountHTMLElement)('script', document.body, {
            attributes: {
                src: (0, common_extension_helpers_1.getWebAccessibleUrl)(public_resources_1.openSearchInline),
                type: 'text/javascript',
                'data-type': 'inline-listener',
            },
        });
        loggers.debug().log('inline mounted');
    }
    connect() {
        OpenSearchPlatform.setListeners();
        OpenSearchPlatform.connectInlineListener();
        loggers.debug().log('connected');
    }
    buildQueryParts(type, resources, withPrefix) {
        return OpenSearchPlatform.buildQueryParts(type, resources, withPrefix);
    }
}
exports.OpenSearchPlatform = OpenSearchPlatform;
OpenSearchPlatform.id = types_common_1.PlatformID.OpenSearch;
OpenSearchPlatform.extensionDefaultPosition = {
    top: 0,
    left: 0,
    width: 480,
    height: 480,
};
OpenSearchPlatform.normalizedValue = (value) => {
    let nValue = (0, checkers_1.isNumberInString)(value)
        ? parseFloat(value)
        : String(value).trim();
    if (typeof nValue === 'number') {
        return nValue;
    }
    if (nValue[0] === '(' || nValue[nValue.length - 1] === ')') {
        return nValue;
    }
    return `"${nValue
        .replace(/"/g, '\\"')}"`;
};
loggers = (__webpack_require__(/*! ../../common/loggers */ "./extension/common/loggers/index.ts").loggers.addPrefix)(OpenSearchPlatform.id);


/***/ }),

/***/ "./extension/content/services/content-services-listeners.ts":
/*!******************************************************************!*\
  !*** ./extension/content/services/content-services-listeners.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addListener = void 0;
const types_content_common_1 = __webpack_require__(/*! ../types/types-content-common */ "./extension/content/types/types-content-common.ts");
const loggers_debug_1 = __webpack_require__(/*! ../../common/loggers/loggers-debug */ "./extension/common/loggers/loggers-debug.ts");
const api_support_1 = __webpack_require__(/*! ../../common/api-support */ "./extension/common/api-support.ts");
const common_extension_helpers_1 = __webpack_require__(/*! ../../common/common-extension-helpers */ "./extension/common/common-extension-helpers.ts");
const loggers_helpers_1 = __webpack_require__(/*! ../../common/loggers/loggers-helpers */ "./extension/common/loggers/loggers-helpers.ts");
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
        const action = (0, common_extension_helpers_1.getBrowserContext)().runtime.onMessage;
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
            || ((0, loggers_helpers_1.getExecutingContextByMessageType)(message.type) !== 'content'
                && message.externalType !== loggers_debug_1.DebugID.debugIDExternal)) {
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
const helpers_1 = __webpack_require__(/*! ../../../common/helpers */ "./common/helpers.ts");
const api_support_1 = __webpack_require__(/*! ../../common/api-support */ "./extension/common/api-support.ts");
const common_extension_helpers_1 = __webpack_require__(/*! ../../common/common-extension-helpers */ "./extension/common/common-extension-helpers.ts");
const serviceLoggers = (__webpack_require__(/*! ../../common/loggers */ "./extension/common/loggers/index.ts").loggers.addPrefix)('services');
const sendMessage = (loggers, message, runtime = true) => {
    var _a;
    message.id = `${message.id ? `${message.id}--` : ''}${(0, helpers_1.uuid)()}`;
    const logPrefix = 'sendMessage';
    try {
        if (!runtime && !(0, api_support_1.isPostMessageSupported)(message)) {
            return message;
        }
        if (!runtime) {
            window.postMessage(message);
            loggers.debug().log('postMessage', message);
            return message;
        }
        if (!(0, api_support_1.isRuntimeSendMessageSupported)()) {
            return message;
        }
        (_a = (0, common_extension_helpers_1.getBrowserContext)().runtime.sendMessage(message)) === null || _a === void 0 ? void 0 : _a.catch((e) => loggers.error().addPrefix(logPrefix).log(e, message));
        loggers.debug().addPrefix(logPrefix).log(message);
        return message;
    }
    catch (e) {
        loggers.error().addPrefix(logPrefix).log(e, message);
        return message;
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
const loggers_helpers_1 = __webpack_require__(/*! ../../common/loggers/loggers-helpers */ "./extension/common/loggers/loggers-helpers.ts");
var MessageToContent;
(function (MessageToContent) {
    MessageToContent["CSModifyQuery"] = "CSModifyQuery";
    MessageToContent["CSSetQuery"] = "CSSetQuery";
    MessageToContent["CSGetQuery"] = "CSGetQuery";
    MessageToContent["CSSendMessageOutside"] = "CSSendMessageOutside";
    MessageToContent["CSConnectPlatform"] = "CSConnectPlatform";
    MessageToContent["CSSetDebugMode"] = "CSSetDebugMode";
    MessageToContent["CSDirectMessageToApp"] = "CSDirectMessageToApp";
    MessageToContent["CSDirectMessageToInline"] = "CSDirectMessageToInline";
})(MessageToContent = exports.MessageToContent || (exports.MessageToContent = {}));
Object.values(MessageToContent).forEach(type => {
    if ((0, loggers_helpers_1.getExecutingContextByMessageType)(type) !== 'content') {
        throw new Error(`Wrong content message type "${type}"`);
    }
});


/***/ }),

/***/ "./extension/inline/types/types-inline-messages.ts":
/*!*********************************************************!*\
  !*** ./extension/inline/types/types-inline-messages.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageToInline = void 0;
const loggers_helpers_1 = __webpack_require__(/*! ../../common/loggers/loggers-helpers */ "./extension/common/loggers/loggers-helpers.ts");
var MessageToInline;
(function (MessageToInline) {
    MessageToInline["ISModifyQuery"] = "ISModifyQuery";
    MessageToInline["ISSetQuery"] = "ISSetQuery";
    MessageToInline["ISGetQuery"] = "ISGetQuery";
    MessageToInline["ISSetDebugMode"] = "ISSetDebugMode";
    MessageToInline["ISRemoveHash"] = "ISRemoveHash";
    MessageToInline["ISRemoveFieldSpecification"] = "ISRemoveFieldSpecification";
})(MessageToInline = exports.MessageToInline || (exports.MessageToInline = {}));
Object.values(MessageToInline).forEach(type => {
    if ((0, loggers_helpers_1.getExecutingContextByMessageType)(type) !== 'inline') {
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
exports.accessibleResources = exports.openSearchInline = exports.arcSightInline = exports.elasticInline = exports.qRadarInline = exports.splunkInline = exports.amazonAthenaInline = exports.microsoftDefenderInline = exports.microsoftSentinelInline = exports.appStyles = void 0;
const types_common_1 = __webpack_require__(/*! ../common/types/types-common */ "./extension/common/types/types-common.ts");
exports.appStyles = 'app-styles.css';
exports.microsoftSentinelInline = 'inline-microsoft-sentinel.js';
exports.microsoftDefenderInline = 'inline-microsoft-defender.js';
exports.amazonAthenaInline = 'inline-amazon-athena.js';
exports.splunkInline = 'inline-splunk.js';
exports.qRadarInline = 'inline-qradar.js';
exports.elasticInline = 'inline-elastic.js';
exports.arcSightInline = 'inline-arcsight.js';
exports.openSearchInline = 'inline-opensearch.js';
exports.accessibleResources = {
    [types_common_1.PlatformID.MicrosoftSentinel]: [exports.microsoftSentinelInline],
    [types_common_1.PlatformID.MicrosoftDefender]: [exports.microsoftDefenderInline],
    [types_common_1.PlatformID.Splunk]: [exports.splunkInline],
    [types_common_1.PlatformID.QRadar]: [exports.qRadarInline],
    [types_common_1.PlatformID.Elastic]: [exports.elasticInline],
    [types_common_1.PlatformID.ArcSight]: [exports.arcSightInline],
    [types_common_1.PlatformID.Athena]: [exports.amazonAthenaInline],
    [types_common_1.PlatformID.OpenSearch]: [exports.openSearchInline],
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
const loggers_helpers_1 = __webpack_require__(/*! ./common/loggers/loggers-helpers */ "./extension/common/loggers/loggers-helpers.ts");
(__webpack_require__(/*! ./common/loggers */ "./extension/common/loggers/index.ts").loggers.setPrefix)((0, loggers_helpers_1.getDebugPrefix)('inline'));

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
var exports = __webpack_exports__;
/*!**********************************************************!*\
  !*** ./extension/inline/opensearch/inline-opensearch.ts ***!
  \**********************************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_listeners_1 = __webpack_require__(/*! ../../common/common-listeners */ "./extension/common/common-listeners.ts");
const types_inline_messages_1 = __webpack_require__(/*! ../types/types-inline-messages */ "./extension/inline/types/types-inline-messages.ts");
const OpenSearchPlatform_1 = __webpack_require__(/*! ../../content/platforms/OpenSearchPlatform */ "./extension/content/platforms/OpenSearchPlatform.ts");
const platform = new OpenSearchPlatform_1.OpenSearchPlatform();
const loggers = (__webpack_require__(/*! ../../common/loggers */ "./extension/common/loggers/index.ts").loggers.addPrefix)(platform.getID());
const getInput = () => {
    return document.querySelector('.euiTextArea[data-test-subj="queryInput"]');
};
window.addEventListener('message', (event) => {
    const message = event.data;
    if ((0, common_listeners_1.isMessageMatched)(() => types_inline_messages_1.MessageToInline.ISModifyQuery === message.type, message, event)) {
        const input = getInput();
        if (!input) {
            return loggers.warn().log('query input not found');
        }
        const currentValue = input.value;
        const { resources, modifyType } = message.payload;
        if (modifyType === 'show all') {
            input.value = platform.buildQueryParts(modifyType, resources);
            input.click();
            return;
        }
        const suffix = platform.buildQueryParts(modifyType, resources, true);
        input.value = `${currentValue} ${suffix}`;
        input.click();
    }
    if ((0, common_listeners_1.isMessageMatched)(() => types_inline_messages_1.MessageToInline.ISSetDebugMode === message.type, message, event)) {
        const { debugMode } = message.payload;
        (__webpack_require__(/*! ../../common/loggers */ "./extension/common/loggers/index.ts").setDebugMode)(debugMode);
    }
});
loggers.debug().log('mounted');

})();

/******/ })()
;