/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./common/checkers.ts":
/*!****************************!*\
  !*** ./common/checkers.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isAllowedProtocol": () => (/* binding */ isAllowedProtocol),
/* harmony export */   "isDate": () => (/* binding */ isDate),
/* harmony export */   "isDomainName": () => (/* binding */ isDomainName),
/* harmony export */   "isEmail": () => (/* binding */ isEmail),
/* harmony export */   "isIpV4": () => (/* binding */ isIpV4),
/* harmony export */   "isIpV6": () => (/* binding */ isIpV6),
/* harmony export */   "isMD5": () => (/* binding */ isMD5),
/* harmony export */   "isMacAddress": () => (/* binding */ isMacAddress),
/* harmony export */   "isNotEmpty": () => (/* binding */ isNotEmpty),
/* harmony export */   "isNotEmptyArray": () => (/* binding */ isNotEmptyArray),
/* harmony export */   "isNumberInString": () => (/* binding */ isNumberInString),
/* harmony export */   "isObject": () => (/* binding */ isObject),
/* harmony export */   "isSHA1": () => (/* binding */ isSHA1),
/* harmony export */   "isSHA256": () => (/* binding */ isSHA256),
/* harmony export */   "isSHA512": () => (/* binding */ isSHA512),
/* harmony export */   "isString": () => (/* binding */ isString),
/* harmony export */   "isUrl": () => (/* binding */ isUrl)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./common/types.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./common/helpers.ts");


const isString = (value) => {
    return typeof value === 'string';
};
const isNotEmptyArray = (arr) => {
    return arr.length > 0;
};
const isNotEmpty = (str) => {
    if (!isString(str)) {
        return false;
    }
    return str?.trim?.() !== '';
};
const isEmail = (email) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};
const isMD5 = (md5) => {
    return /^[a-f0-9]{32}$/.test(md5);
};
const isSHA1 = (sha1) => {
    return /^[a-fA-F0-9]{40}$/.test(sha1);
};
const isSHA256 = (sha256) => {
    return /^[a-fA-F0-9]{64}$/.test(sha256);
};
const isSHA512 = (sha512) => {
    return /^[a-fA-F0-9]{128}$/.test(sha512);
};
const isIpV4 = (ip) => {
    return /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/.test(ip);
};
const isIpV6 = (ip) => {
    return /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/.test(ip);
};
const isMacAddress = (address) => {
    return /^[a-fA-F0-9]{2}([:|-][a-fA-F0-9]{2}){5}$/.test(address);
};
const isDomainName = (domainName) => {
    return /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/.test(domainName);
};
const isUrl = (url) => {
    return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(url);
};
const isNumberInString = (str) => {
    if (typeof str === 'number') {
        return true;
    }
    if (typeof str !== 'string') {
        return false;
    }
    const sValue = str.trim();
    if (!/^[-.0-9]*$/.test(sValue)
        || (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.indexOfAll)(sValue, '.').length > 1) {
        return false;
    }
    return !Number.isNaN(parseFloat(sValue));
};
const isAllowedProtocol = (protocol, mode) => {
    if (mode === _types__WEBPACK_IMPORTED_MODULE_0__.Mode.development) {
        return true;
    }
    const nProtocol = protocol.trim().toLowerCase();
    return nProtocol === 'https:' || nProtocol === 'https';
};
const isDate = (value) => {
    return new Date(typeof value === 'string' && isNumberInString(value)
        ? parseInt(value, 10)
        : value).getTime() > 567982800000;
};
const isObject = (obj) => {
    return typeof obj === 'object'
        && !Array.isArray(obj)
        && obj !== null
        && typeof obj !== 'function';
};


/***/ }),

/***/ "./common/helpers.ts":
/*!***************************!*\
  !*** ./common/helpers.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildEmailUrl": () => (/* binding */ buildEmailUrl),
/* harmony export */   "capitalizeFirstLetter": () => (/* binding */ capitalizeFirstLetter),
/* harmony export */   "clearExtraSpaces": () => (/* binding */ clearExtraSpaces),
/* harmony export */   "clearLineBreaks": () => (/* binding */ clearLineBreaks),
/* harmony export */   "createNonDuplicateValue": () => (/* binding */ createNonDuplicateValue),
/* harmony export */   "debounce": () => (/* binding */ debounce),
/* harmony export */   "deduplicateArray": () => (/* binding */ deduplicateArray),
/* harmony export */   "deserializeDataInResult": () => (/* binding */ deserializeDataInResult),
/* harmony export */   "formatBinaryDate": () => (/* binding */ formatBinaryDate),
/* harmony export */   "formatDate": () => (/* binding */ formatDate),
/* harmony export */   "formatString": () => (/* binding */ formatString),
/* harmony export */   "getUrlParamsSafe": () => (/* binding */ getUrlParamsSafe),
/* harmony export */   "indexOfAll": () => (/* binding */ indexOfAll),
/* harmony export */   "initValues": () => (/* binding */ initValues),
/* harmony export */   "isFlatObjectsEqual": () => (/* binding */ isFlatObjectsEqual),
/* harmony export */   "isValidDate": () => (/* binding */ isValidDate),
/* harmony export */   "iterateObjectsRecursively": () => (/* binding */ iterateObjectsRecursively),
/* harmony export */   "parseJSONSafe": () => (/* binding */ parseJSONSafe),
/* harmony export */   "serializeDataInResult": () => (/* binding */ serializeDataInResult),
/* harmony export */   "sleep": () => (/* binding */ sleep),
/* harmony export */   "sortNumbers": () => (/* binding */ sortNumbers),
/* harmony export */   "sortStrings": () => (/* binding */ sortStrings),
/* harmony export */   "splitByLines": () => (/* binding */ splitByLines),
/* harmony export */   "suuid": () => (/* binding */ suuid),
/* harmony export */   "uuid": () => (/* binding */ uuid)
/* harmony export */ });
/* harmony import */ var _checkers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkers */ "./common/checkers.ts");

const isFlatObjectsEqual = (obj1, obj2) => {
    const keysObj1 = Object.keys(obj1);
    const keysObj2 = Object.keys(obj2);
    if (keysObj1.length !== keysObj2.length) {
        return false;
    }
    return !keysObj1.some((key) => obj1[key] !== obj2[key]);
};
const uuid = () => {
    return Math.random().toString(36).substring(5)
        + Date.now().toString(36)
        + Math.random().toString(36).substring(5);
};
const suuid = () => {
    return `@@--${uuid()}`;
};
const clearExtraSpaces = (str) => str.replace(/ +/g, ' ');
const clearLineBreaks = (str) => str
    .trim()
    .replace(/(\r\n|\n|\r)/gm, ' ');
const splitByLines = (str, removeEmpty = false) => {
    const regexp = /(\r\n|\n|\r)/gm;
    let res = str.split(regexp);
    if (removeEmpty) {
        res = res.filter((r) => r && r !== '\r\n' && r !== '\n' && r !== '\r');
    }
    return res;
};
const parseJSONSafe = (obj, fallback) => {
    try {
        return JSON.parse(obj);
    }
    catch (e) {
        return fallback;
    }
};
const deduplicateArray = (arr) => {
    return [
        ...Array.from(new Set([
            ...arr,
        ])),
    ];
};
const formatString = (pattern, parts, keyFormat) => {
    return Object.keys(parts || {})
        .filter((name) => {
        return typeof parts[name] === 'string';
    })
        .map((name) => ({
        value: parts[name],
        key: keyFormat ? keyFormat(name) : `%${name}`,
    }))
        .reduce((result, d) => {
        return result.replace(new RegExp(d.key, 'g'), d.value);
    }, pattern) || pattern;
};
const capitalizeFirstLetter = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
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
const formatBinaryDate = (value) => {
    const sValue = typeof value === 'string'
        ? value
        : String(value);
    return sValue.length > 1
        ? sValue
        : `0${sValue}`;
};
const formatDate = (pattern, data) => {
    return formatString(pattern, {
        Y: String(data.getFullYear()),
        M: formatBinaryDate(data.getMonth() + 1),
        m: formatBinaryDate(data.getMinutes()),
        s: formatBinaryDate(data.getSeconds()),
        ms: formatBinaryDate(data.getMilliseconds()),
        d: formatBinaryDate(data.getDate()),
        h: formatBinaryDate(data.getHours()),
        fM: String(data.toLocaleString('default', { month: 'long' })),
    });
};
const debounce = (func, timeoutMs) => {
    let timeoutID;
    return function (...args) {
        const context = this;
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => func.apply(context, args), timeoutMs);
    };
};
const sortNumbers = (a, b) => {
    if (a > b) {
        return 1;
    }
    if (a < b) {
        return -1;
    }
    return 0;
};
const sortStrings = (a, b, order = 'ascending') => {
    const result = a.localeCompare(b);
    if (result === 0 || order === 'ascending') {
        return result;
    }
    return result === 1 ? -1 : 1;
};
const indexOfAll = (str, search) => {
    const indexes = [];
    let i = -1;
    while ((i = str.indexOf(search, i + 1)) >= 0) {
        indexes.push(i);
    }
    return indexes;
};
const sleep = async (sec) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, sec * 1000);
    });
};
const iterateObjectsRecursively = (obj, keyPath, settings) => {
    const { separator = '.', onIteration } = settings || {};
    return Object.keys(obj || {}).reduce((result, key) => {
        const path = keyPath.length ? `${keyPath}${separator}${key}` : key;
        const value = obj[key];
        if (typeof onIteration === 'function' && !onIteration?.(path, key, value, keyPath)) {
            return keyPath.length ? [...result, keyPath] : result;
        }
        return [
            ...result,
            ...((0,_checkers__WEBPACK_IMPORTED_MODULE_0__.isObject)(value)
                ? iterateObjectsRecursively(value, path, settings)
                : [path]),
        ];
    }, []);
};
const getUrlParamsSafe = (url, paramName) => {
    try {
        return new URL(url)[paramName] || '';
    }
    catch (e) {
        return '';
    }
};
const deserializeDataInResult = (result, errors = []) => {
    if (result.error && typeof result.error !== 'string') {
        errors.push(result.error);
    }
    if (result.error && typeof result.error === 'string') {
        result.error = new Error(result.error);
        errors.push(result.error);
    }
    (result.batch || []).map((r) => {
        return deserializeDataInResult(r, errors);
    });
    return { result, errors };
};
const serializeDataInResult = (result, errors = []) => {
    if (result.error && typeof result.error === 'string') {
        errors.push(result.error);
    }
    if (result.error && typeof result.error !== 'string') {
        result.error = result.error.message;
        errors.push(result.error);
    }
    (result.batch || []).map((r) => {
        return serializeDataInResult(r, errors);
    });
    return { result, errors };
};
const buildEmailUrl = (params) => {
    const { to, subject, cc, body, } = params;
    const sendTo = to.length ? `${to.join(',')}` : '';
    const copyTo = `cc=${cc?.length ? cc.join(',') : ''}`;
    const subj = `subject=${subject || ''}`;
    const text = `body=${body || ''}`;
    return `${encodeURI(`mailto:${sendTo}?${copyTo}&${subj}`)}&${text}`;
};
const initValues = (obj, values) => {
    Object.keys(values).forEach((key) => {
        const o = obj;
        if (typeof o[key] === 'undefined') {
            o[key] = values[key];
        }
    });
    return obj;
};
const isValidDate = (d) => {
    // eslint-disable-next-line no-restricted-globals
    return d instanceof Date && !isNaN(d);
};


/***/ }),

/***/ "./common/types.ts":
/*!*************************!*\
  !*** ./common/types.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LogLevel": () => (/* binding */ LogLevel),
/* harmony export */   "Mode": () => (/* binding */ Mode),
/* harmony export */   "mapType": () => (/* binding */ mapType)
/* harmony export */ });
var Mode;
(function (Mode) {
    Mode["production"] = "production";
    Mode["development"] = "development";
})(Mode || (Mode = {}));
var LogLevel;
(function (LogLevel) {
    LogLevel["info"] = "info";
    LogLevel["debug"] = "debug";
    LogLevel["error"] = "error";
    LogLevel["warn"] = "warn";
})(LogLevel || (LogLevel = {}));
const mapType = (struct) => struct;


/***/ }),

/***/ "./extension/app/resources/resources-types.ts":
/*!****************************************************!*\
  !*** ./extension/app/resources/resources-types.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BoundedResourceTypeID": () => (/* binding */ BoundedResourceTypeID),
/* harmony export */   "QueryTabID": () => (/* binding */ QueryTabID),
/* harmony export */   "boundedResourcesTypeIDs": () => (/* binding */ boundedResourcesTypeIDs),
/* harmony export */   "serviceResourcesTypesIDs": () => (/* binding */ serviceResourcesTypesIDs)
/* harmony export */ });
var BoundedResourceTypeID;
(function (BoundedResourceTypeID) {
    BoundedResourceTypeID["Accounts"] = "Accounts";
    BoundedResourceTypeID["Assets"] = "Assets";
})(BoundedResourceTypeID || (BoundedResourceTypeID = {}));
const QueryTabID = '@@#Query#';
const boundedResourcesTypeIDs = Object.keys(BoundedResourceTypeID);
const serviceResourcesTypesIDs = [QueryTabID, ...boundedResourcesTypeIDs];


/***/ }),

/***/ "./extension/app/types/types-app-messages.ts":
/*!***************************************************!*\
  !*** ./extension/app/types/types-app-messages.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessageToApp": () => (/* binding */ MessageToApp)
/* harmony export */ });
/* harmony import */ var _common_loggers_loggers_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/loggers/loggers-helpers */ "./extension/common/loggers/loggers-helpers.ts");

var MessageToApp;
(function (MessageToApp) {
    MessageToApp["AppShowExtension"] = "AppShowExtension";
    MessageToApp["AppTakeResourceData"] = "AppTakeResourceData";
    MessageToApp["AppTakeNewResourceData"] = "AppTakeNewResourceData";
    MessageToApp["AppSyncWatchers"] = "AppSyncWatchers";
    MessageToApp["AppQueryHasHash"] = "AppQueryHasHash";
    MessageToApp["AppQueryHasSpecifyFields"] = "AppQueryHasSpecifyFields";
    MessageToApp["AppSetLoadingState"] = "AppSetLoadingState";
    MessageToApp["AppToggleShowExtension"] = "AppToggleShowExtension";
    MessageToApp["AppSendToBackground"] = "AppSendToBackground";
    MessageToApp["AppSendMessageOutside"] = "AppSendMessageOutside";
    MessageToApp["AppTakeQuery"] = "AppTakeQuery";
    MessageToApp["AppSetDebugMode"] = "AppSetDebugMode";
    MessageToApp["AppTakeCallbackMessageResult"] = "AppTakeCallbackMessageResult";
})(MessageToApp || (MessageToApp = {}));
Object.values(MessageToApp).forEach((type) => {
    if ((0,_common_loggers_loggers_helpers__WEBPACK_IMPORTED_MODULE_0__.getExecutingContextByMessageType)(type) !== 'app') {
        throw new Error(`Wrong app message type "${type}"`);
    }
});


/***/ }),

/***/ "./extension/background/types/types-background-messages.ts":
/*!*****************************************************************!*\
  !*** ./extension/background/types/types-background-messages.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessageToBackground": () => (/* binding */ MessageToBackground)
/* harmony export */ });
/* harmony import */ var _common_loggers_loggers_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/loggers/loggers-helpers */ "./extension/common/loggers/loggers-helpers.ts");

var MessageToBackground;
(function (MessageToBackground) {
    MessageToBackground["BGDirectMessageToApp"] = "BGDirectMessageToApp";
    MessageToBackground["BGDirectMessageToInline"] = "BGDirectMessageToInline";
    MessageToBackground["BGSetWatchers"] = "BGSetWatchers";
    MessageToBackground["BGRegisterPlatformTab"] = "BGRegisterPlatformTab";
    MessageToBackground["BGToggleShowExtension"] = "BGToggleShowExtension";
    MessageToBackground["BGSetDebugMode"] = "BGSetDebugMode";
    MessageToBackground["BGTakeCallbackMessage"] = "BGTakeCallbackMessage";
})(MessageToBackground || (MessageToBackground = {}));
Object.values(MessageToBackground).forEach((type) => {
    if ((0,_common_loggers_loggers_helpers__WEBPACK_IMPORTED_MODULE_0__.getExecutingContextByMessageType)(type) !== 'background') {
        throw new Error(`Wrong background message type "${type}"`);
    }
});


/***/ }),

/***/ "./extension/common/api-support.ts":
/*!*****************************************!*\
  !*** ./extension/common/api-support.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isActionOnClickedSupported": () => (/* binding */ isActionOnClickedSupported),
/* harmony export */   "isAddEventListenerSupported": () => (/* binding */ isAddEventListenerSupported),
/* harmony export */   "isBrowserActionOnClickedSupported": () => (/* binding */ isBrowserActionOnClickedSupported),
/* harmony export */   "isOnBeforeRequestSupported": () => (/* binding */ isOnBeforeRequestSupported),
/* harmony export */   "isOnBeforeSendHeadersSupported": () => (/* binding */ isOnBeforeSendHeadersSupported),
/* harmony export */   "isPostMessageSupported": () => (/* binding */ isPostMessageSupported),
/* harmony export */   "isRuntimeGetUrlSupported": () => (/* binding */ isRuntimeGetUrlSupported),
/* harmony export */   "isRuntimeOnInstalledSupported": () => (/* binding */ isRuntimeOnInstalledSupported),
/* harmony export */   "isRuntimeOnMessageExternalSupported": () => (/* binding */ isRuntimeOnMessageExternalSupported),
/* harmony export */   "isRuntimeOnMessageSupported": () => (/* binding */ isRuntimeOnMessageSupported),
/* harmony export */   "isRuntimeSendMessageSupported": () => (/* binding */ isRuntimeSendMessageSupported),
/* harmony export */   "isTabsOnRemovedSupported": () => (/* binding */ isTabsOnRemovedSupported),
/* harmony export */   "isTabsQuerySupported": () => (/* binding */ isTabsQuerySupported),
/* harmony export */   "isTabsSendMessageSupported": () => (/* binding */ isTabsSendMessageSupported)
/* harmony export */ });
/* harmony import */ var _common_extension_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common-extension-helpers */ "./extension/common/common-extension-helpers.ts");

const loggers = (__webpack_require__(/*! ./loggers */ "./extension/common/loggers/index.ts").loggers.addPrefix)('api-support');
const isPostMessageSupported = (...logData) => {
    if (!window?.postMessage) {
        loggers
            .warn()
            .log('API window.postMessage is not supported', ...logData);
        return false;
    }
    return true;
};
const isAddEventListenerSupported = (...logData) => {
    if (!window?.addEventListener) {
        loggers
            .warn()
            .log('API window.addEventListener is not supported', ...logData);
        return false;
    }
    return true;
};
const isRuntimeSendMessageSupported = (...logData) => {
    if (!(0,_common_extension_helpers__WEBPACK_IMPORTED_MODULE_0__.getBrowserContext)()?.runtime?.sendMessage) {
        loggers
            .warn()
            .log('API runtime.sendMessage is not supported', ...logData);
        return false;
    }
    return true;
};
const isRuntimeOnInstalledSupported = (...logData) => {
    if (!(0,_common_extension_helpers__WEBPACK_IMPORTED_MODULE_0__.getBrowserContext)().runtime?.onInstalled?.addListener) {
        loggers
            .warn()
            .log('API runtime.onInstalled.addListener is not supported', ...logData);
        return false;
    }
    return true;
};
const isRuntimeOnMessageSupported = (...logData) => {
    if (!(0,_common_extension_helpers__WEBPACK_IMPORTED_MODULE_0__.getBrowserContext)().runtime?.onMessage?.addListener) {
        loggers
            .warn()
            .log('API runtime.onMessage.addListener is not supported', ...logData);
        return false;
    }
    return true;
};
const isRuntimeOnMessageExternalSupported = (...logData) => {
    if (!(0,_common_extension_helpers__WEBPACK_IMPORTED_MODULE_0__.getBrowserContext)().runtime?.onMessageExternal?.addListener) {
        loggers
            .warn()
            .log('API runtime.onMessageExternal.addListener is not supported', ...logData);
        return false;
    }
    return true;
};
const isTabsOnRemovedSupported = (...logData) => {
    if (!(0,_common_extension_helpers__WEBPACK_IMPORTED_MODULE_0__.getBrowserContext)().tabs?.onRemoved?.addListener) {
        loggers
            .warn()
            .log('API tabs.onRemoved.addListener is not supported', ...logData);
        return false;
    }
    return true;
};
const isActionOnClickedSupported = (...logData) => {
    if (!(0,_common_extension_helpers__WEBPACK_IMPORTED_MODULE_0__.getBrowserContext)()?.action?.onClicked?.addListener) {
        loggers
            .warn()
            .log('API action.onClicked.addListener is not supported', ...logData);
        return false;
    }
    return true;
};
const isBrowserActionOnClickedSupported = (...logData) => {
    if (!(0,_common_extension_helpers__WEBPACK_IMPORTED_MODULE_0__.getBrowserContext)()?.browserAction?.onClicked?.addListener) {
        loggers
            .warn()
            .log('API browserAction.onClicked.addListener is not supported', ...logData);
        return false;
    }
    return true;
};
const isOnBeforeRequestSupported = (...logData) => {
    if (!(0,_common_extension_helpers__WEBPACK_IMPORTED_MODULE_0__.getBrowserContext)()?.webRequest?.onBeforeRequest?.addListener) {
        loggers
            .warn()
            .log('API webRequest.onBeforeRequest is not supported', ...logData);
        return false;
    }
    return true;
};
const isOnBeforeSendHeadersSupported = (...logData) => {
    if (!(0,_common_extension_helpers__WEBPACK_IMPORTED_MODULE_0__.getBrowserContext)()?.webRequest?.onBeforeSendHeaders?.addListener) {
        loggers
            .warn()
            .log('API webRequest.onBeforeSendHeaders is not supported', ...logData);
        return false;
    }
    return true;
};
const isTabsQuerySupported = (...logData) => {
    if (!(0,_common_extension_helpers__WEBPACK_IMPORTED_MODULE_0__.getBrowserContext)()?.tabs?.query) {
        loggers
            .warn()
            .log('API tabs.query is not supported', ...logData);
        return false;
    }
    return true;
};
const isTabsSendMessageSupported = (...logData) => {
    if (!(0,_common_extension_helpers__WEBPACK_IMPORTED_MODULE_0__.getBrowserContext)()?.tabs?.sendMessage) {
        loggers
            .warn()
            .log('API tabs.sendMessage is not supported', ...logData);
        return false;
    }
    return true;
};
const isRuntimeGetUrlSupported = (...logData) => {
    if (!(0,_common_extension_helpers__WEBPACK_IMPORTED_MODULE_0__.getBrowserContext)()?.runtime?.getURL) {
        loggers
            .warn()
            .log('API runtime.getURL is not supported', ...logData);
        return false;
    }
    return true;
};


/***/ }),

/***/ "./extension/common/common-extension-helpers.ts":
/*!******************************************************!*\
  !*** ./extension/common/common-extension-helpers.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getBrowserContext": () => (/* binding */ getBrowserContext),
/* harmony export */   "getWebAccessibleUrl": () => (/* binding */ getWebAccessibleUrl)
/* harmony export */ });
/* harmony import */ var _api_support__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api-support */ "./extension/common/api-support.ts");

const getBrowserContext = () => (typeof browser !== 'undefined' ? browser : chrome);
const getWebAccessibleUrl = (path) => {
    return (0,_api_support__WEBPACK_IMPORTED_MODULE_0__.isRuntimeGetUrlSupported)(path)
        ? getBrowserContext().runtime.getURL(path)
        : '';
};


/***/ }),

/***/ "./extension/common/common-helpers.ts":
/*!********************************************!*\
  !*** ./extension/common/common-helpers.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildQueryParts": () => (/* binding */ buildQueryParts),
/* harmony export */   "compareVersions": () => (/* binding */ compareVersions),
/* harmony export */   "copyToClipboard": () => (/* binding */ copyToClipboard),
/* harmony export */   "createClassName": () => (/* binding */ createClassName),
/* harmony export */   "createFormDataString": () => (/* binding */ createFormDataString),
/* harmony export */   "cssObjectToString": () => (/* binding */ cssObjectToString),
/* harmony export */   "downloadFile": () => (/* binding */ downloadFile),
/* harmony export */   "getElementsUnderCursor": () => (/* binding */ getElementsUnderCursor),
/* harmony export */   "getVersionFromString": () => (/* binding */ getVersionFromString),
/* harmony export */   "isInsideIframe": () => (/* binding */ isInsideIframe),
/* harmony export */   "mountHTMLElement": () => (/* binding */ mountHTMLElement),
/* harmony export */   "openMailTo": () => (/* binding */ openMailTo),
/* harmony export */   "removeBracketsAround": () => (/* binding */ removeBracketsAround),
/* harmony export */   "removeDoubleQuotesAround": () => (/* binding */ removeDoubleQuotesAround),
/* harmony export */   "removeQuotesAround": () => (/* binding */ removeQuotesAround),
/* harmony export */   "waitHTMLElement": () => (/* binding */ waitHTMLElement)
/* harmony export */ });
const cssObjectToString = (styles) => Object.keys(styles)
    .reduce((res, key) => {
    res += `${key}:${styles[key]};`;
    return res;
}, '');
const mountHTMLElement = (element, mountElement, options) => {
    const elem = document.createElement(element);
    if (options?.attributes) {
        Object.keys(options.attributes).forEach((key) => {
            elem.setAttribute(key, key === 'style'
                ? cssObjectToString(options.attributes[key])
                : options.attributes?.[key] || '');
        });
    }
    if (options?.innerHtml) {
        elem.innerHTML = options.innerHtml;
    }
    if (options?.innerText) {
        elem.innerText = options.innerText;
    }
    if (mountElement) {
        mountElement.append(elem);
    }
    return elem;
};
const isInsideIframe = () => {
    try {
        return window.self !== window.top;
    }
    catch (e) {
        return true;
    }
};
const waitHTMLElement = async (query, rootElement = document) => {
    return new Promise((resolve) => {
        new MutationObserver((_, observer) => {
            const element = rootElement.querySelector(query);
            if (element) {
                observer.disconnect();
                resolve(element);
            }
        }).observe(rootElement, { childList: true, subtree: true });
    });
};
const createClassName = (list) => list.filter(Boolean).join(' ');
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
const openMailTo = (url) => {
    const link = document.createElement('a');
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
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
const buildQueryParts = (resources, getOperator, valuesSeparator, fieldsSeparator, decorators, prefix) => {
    const queryParts = [];
    Object.keys(resources).forEach((fieldName) => {
        queryParts.push(resources[fieldName]
            .map((v) => `${decorators.leftOperand(fieldName)}${getOperator(fieldName, v)}${decorators.rightOperand(v)}`)
            .join(valuesSeparator));
    });
    const queryPartsStr = queryParts.join(fieldsSeparator);
    return prefix
        ? `${prefix} ${queryPartsStr}`
        : queryPartsStr;
};
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
const getVersionFromString = (version) => {
    if (typeof version !== 'string'
        || !/^[.0-9]+$/.test(version)) {
        return 0;
    }
    const result = parseInt(version.replace(/\./g, ''), 10);
    return Number.isNaN(result) ? 0 : result;
};
const compareVersions = (version1, version2) => {
    const nVersion1 = getVersionFromString(version1);
    const nVersion2 = getVersionFromString(version2);
    return nVersion1 === nVersion2
        ? 'equal'
        : nVersion1 > nVersion2
            ? 'greater'
            : 'less';
};
const createFormDataString = (data) => {
    const urlEncodedDataPairs = [];
    for (const [name, value] of Object.entries(data)) {
        urlEncodedDataPairs.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
    }
    return urlEncodedDataPairs
        .join('&')
        .replace(/%20/g, '+');
};


/***/ }),

/***/ "./extension/common/common-listeners.ts":
/*!**********************************************!*\
  !*** ./extension/common/common-listeners.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isMessageMatched": () => (/* binding */ isMessageMatched)
/* harmony export */ });
/* harmony import */ var _loggers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loggers */ "./extension/common/loggers/index.ts");

const isMessageMatched = (matchCondition, message, ...otherInfo) => {
    if (matchCondition()) {
        _loggers__WEBPACK_IMPORTED_MODULE_0__.loggers.debug()
            .log(`got ${message.type} message`, message, ...otherInfo);
        return true;
    }
    return false;
};


/***/ }),

/***/ "./extension/common/envs.ts":
/*!**********************************!*\
  !*** ./extension/common/envs.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "backgroundPlatformIDFromENV": () => (/* binding */ backgroundPlatformIDFromENV),
/* harmony export */   "contentPlatformIDFromENV": () => (/* binding */ contentPlatformIDFromENV),
/* harmony export */   "logLevel": () => (/* binding */ logLevel),
/* harmony export */   "mode": () => (/* binding */ mode),
/* harmony export */   "version": () => (/* binding */ version)
/* harmony export */ });
/* harmony import */ var _types_types_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types/types-common */ "./extension/common/types/types-common.ts");
/* harmony import */ var _common_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/types */ "./common/types.ts");


const contentPlatformIDFromENV = Object.values(_types_types_common__WEBPACK_IMPORTED_MODULE_0__.PlatformID).includes(null)
    ? null
    : null;
const backgroundPlatformIDFromENV = Object.values(_types_types_common__WEBPACK_IMPORTED_MODULE_0__.PlatformID).includes(null)
    ? null
    : null;
const mode = "development" === _common_types__WEBPACK_IMPORTED_MODULE_1__.Mode.production
    ? _common_types__WEBPACK_IMPORTED_MODULE_1__.Mode.production
    : _common_types__WEBPACK_IMPORTED_MODULE_1__.Mode.development;
const logLevel = Object.keys(_common_types__WEBPACK_IMPORTED_MODULE_1__.LogLevel).includes("info")
    ? "info"
    : _common_types__WEBPACK_IMPORTED_MODULE_1__.LogLevel.info;
const version = "1.4.5";


/***/ }),

/***/ "./extension/common/loggers/index.ts":
/*!*******************************************!*\
  !*** ./extension/common/loggers/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Loggers": () => (/* binding */ Loggers),
/* harmony export */   "loggers": () => (/* binding */ loggers),
/* harmony export */   "setDebugMode": () => (/* binding */ setDebugMode),
/* harmony export */   "setLoggers": () => (/* binding */ setLoggers)
/* harmony export */ });
/* harmony import */ var _common_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../common/types */ "./common/types.ts");
/* harmony import */ var _envs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../envs */ "./extension/common/envs.ts");


let loggers;
let isDebugMode = _envs__WEBPACK_IMPORTED_MODULE_1__.mode === _common_types__WEBPACK_IMPORTED_MODULE_0__.Mode.development || _envs__WEBPACK_IMPORTED_MODULE_1__.logLevel === _common_types__WEBPACK_IMPORTED_MODULE_0__.LogLevel.debug;
const setDebugMode = (debugMode) => {
    isDebugMode = debugMode;
};
class Loggers {
    prefix = '';
    level = _common_types__WEBPACK_IMPORTED_MODULE_0__.LogLevel.info;
    createInstance(prefix = '', level = _common_types__WEBPACK_IMPORTED_MODULE_0__.LogLevel.info) {
        return new Loggers(prefix, level);
    }
    constructor(prefix = '', level = _common_types__WEBPACK_IMPORTED_MODULE_0__.LogLevel.info) {
        this.prefix = prefix;
        this.level = level;
    }
    log(...params) {
        if (this.level === _common_types__WEBPACK_IMPORTED_MODULE_0__.LogLevel.debug && !isDebugMode) {
            return;
        }
        console[this.level === _common_types__WEBPACK_IMPORTED_MODULE_0__.LogLevel.error
            ? 'error'
            : this.level === _common_types__WEBPACK_IMPORTED_MODULE_0__.LogLevel.warn
                ? 'warn'
                : 'log'](this.prefix || '==>', ...params);
    }
    error() {
        return this.createInstance(`ERROR: ${this.prefix}`, _common_types__WEBPACK_IMPORTED_MODULE_0__.LogLevel.error);
    }
    warn() {
        return this.createInstance(`WARN: ${this.prefix}`, _common_types__WEBPACK_IMPORTED_MODULE_0__.LogLevel.warn);
    }
    info() {
        return this.createInstance(`INFO: ${this.prefix}`, _common_types__WEBPACK_IMPORTED_MODULE_0__.LogLevel.info);
    }
    debug() {
        return this.createInstance(`DEBUG: ${this.prefix}`, _common_types__WEBPACK_IMPORTED_MODULE_0__.LogLevel.debug);
    }
    addPrefix(prefix) {
        return this.createInstance([this.prefix, prefix].join(' '), this.level);
    }
    setLevel(level) {
        return this.createInstance(this.prefix, level);
    }
    setPrefix(prefix) {
        loggers = this.addPrefix(prefix);
        return loggers;
    }
}
loggers = new Loggers();
const setLoggers = (newLoggers) => {
    loggers = newLoggers;
};


/***/ }),

/***/ "./extension/common/loggers/loggers-debug.ts":
/*!***************************************************!*\
  !*** ./extension/common/loggers/loggers-debug.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DebugID": () => (/* binding */ DebugID)
/* harmony export */ });
/* harmony import */ var _common_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../common/types */ "./common/types.ts");
/* harmony import */ var _loggers_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loggers-helpers */ "./extension/common/loggers/loggers-helpers.ts");


var DebugID;
(function (DebugID) {
    DebugID[DebugID["debugIDExternal"] = (0,_common_types__WEBPACK_IMPORTED_MODULE_0__.mapType)( false || _loggers_helpers__WEBPACK_IMPORTED_MODULE_1__.debugID)] = "debugIDExternal";
})(DebugID || (DebugID = {}));


/***/ }),

/***/ "./extension/common/loggers/loggers-helpers.ts":
/*!*****************************************************!*\
  !*** ./extension/common/loggers/loggers-helpers.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "debugID": () => (/* binding */ debugID),
/* harmony export */   "getDebugPrefix": () => (/* binding */ getDebugPrefix),
/* harmony export */   "getExecutingContextByMessageType": () => (/* binding */ getExecutingContextByMessageType)
/* harmony export */ });
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
const debugID = 'debug-external-der3edc3op3e4dde44rt';


/***/ }),

/***/ "./extension/common/types/types-common.ts":
/*!************************************************!*\
  !*** ./extension/common/types/types-common.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Browser": () => (/* binding */ Browser),
/* harmony export */   "PlatformID": () => (/* binding */ PlatformID),
/* harmony export */   "PlatformName": () => (/* binding */ PlatformName),
/* harmony export */   "PlatformQueryID": () => (/* binding */ PlatformQueryID),
/* harmony export */   "SiemType": () => (/* binding */ SiemType)
/* harmony export */ });
var Browser;
(function (Browser) {
    Browser["chrome"] = "chrome";
    Browser["firefox"] = "firefox";
    Browser["edge"] = "edge";
})(Browser || (Browser = {}));
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
    PlatformID["LogScale"] = "LogScale";
    PlatformID["Chronicle"] = "Chronicle";
})(PlatformID || (PlatformID = {}));
var PlatformQueryID;
(function (PlatformQueryID) {
    PlatformQueryID["ElasticEQl"] = "ElasticEql";
})(PlatformQueryID || (PlatformQueryID = {}));
var SiemType;
(function (SiemType) {
    SiemType["Sentinel"] = "ala";
    SiemType["Defender"] = "mdatp";
    SiemType["Splunk"] = "splunk";
    SiemType["Qradar"] = "qradar";
    SiemType["ElasticEQL"] = "es-eql";
    SiemType["ElasticLucene"] = "elasticsearch";
    SiemType["ArcSight"] = "arcsight-keyword";
    SiemType["Athena"] = "athena";
    SiemType["LogScale"] = "humio";
    SiemType["Chronicle"] = "chronicle-query";
    SiemType["OpenSearch"] = "opendistro-query";
})(SiemType || (SiemType = {}));
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
    PlatformName["LogScale"] = "Falcon LogScale";
    PlatformName["Chronicle"] = "Chronicle";
})(PlatformName || (PlatformName = {}));


/***/ }),

/***/ "./extension/content/platforms/AbstractContentPlatform.ts":
/*!****************************************************************!*\
  !*** ./extension/content/platforms/AbstractContentPlatform.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractContentPlatform": () => (/* binding */ AbstractContentPlatform)
/* harmony export */ });
/* harmony import */ var _common_common_listeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/common-listeners */ "./extension/common/common-listeners.ts");
/* harmony import */ var _types_types_content_messages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/types-content-messages */ "./extension/content/types/types-content-messages.ts");
/* harmony import */ var _services_content_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/content-services */ "./extension/content/services/content-services.ts");
/* harmony import */ var _inline_types_types_inline_messages__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../inline/types/types-inline-messages */ "./extension/inline/types/types-inline-messages.ts");
/* harmony import */ var _background_types_types_background_messages__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../background/types/types-background-messages */ "./extension/background/types/types-background-messages.ts");





class AbstractContentPlatform {
    fields = new Set();
    static processInlineListeners(message) {
        // if (isMessageMatched(
        //   () => MessageToContent.CSSendMessageOutside === message.type,
        //   message,
        // )) {
        //   sendMessageFromContent({
        //     ...message,
        //     id: `${message.id}--${message.type}`,
        //     type: MessageToBackground.BGSendMessageOutside,
        //   });
        // }
        if ((0,_common_common_listeners__WEBPACK_IMPORTED_MODULE_0__.isMessageMatched)(() => _types_types_content_messages__WEBPACK_IMPORTED_MODULE_1__.MessageToContent.CSSetDebugMode === message.type, message)) {
            const { debugMode } = message.payload;
            (__webpack_require__(/*! ../../common/loggers */ "./extension/common/loggers/index.ts").setDebugMode)(debugMode);
            (0,_services_content_services__WEBPACK_IMPORTED_MODULE_2__.sendMessageFromContent)({
                ...message,
                id: `${message.id}--${message.type}`,
                type: _inline_types_types_inline_messages__WEBPACK_IMPORTED_MODULE_3__.MessageToInline.ISSetDebugMode,
            }, false);
        }
        if ((0,_common_common_listeners__WEBPACK_IMPORTED_MODULE_0__.isMessageMatched)(() => _types_types_content_messages__WEBPACK_IMPORTED_MODULE_1__.MessageToContent.CSDirectMessageToApp === message.type, message)) {
            (0,_services_content_services__WEBPACK_IMPORTED_MODULE_2__.sendMessageFromContent)({
                id: `${message.id}--${message.type}`,
                type: _background_types_types_background_messages__WEBPACK_IMPORTED_MODULE_4__.MessageToBackground.BGDirectMessageToApp,
                payload: message.payload,
            });
        }
        if ((0,_common_common_listeners__WEBPACK_IMPORTED_MODULE_0__.isMessageMatched)(() => _types_types_content_messages__WEBPACK_IMPORTED_MODULE_1__.MessageToContent.CSDirectMessageToInline === message.type, message)) {
            const { type, payload } = message.payload;
            (0,_services_content_services__WEBPACK_IMPORTED_MODULE_2__.sendMessageFromContent)({
                id: `${message.id}--${message.type}`,
                type,
                payload,
            }, false);
        }
    }
}


/***/ }),

/***/ "./extension/content/platforms/QRadarPlatform.ts":
/*!*******************************************************!*\
  !*** ./extension/content/platforms/QRadarPlatform.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QRadarPlatform": () => (/* binding */ QRadarPlatform)
/* harmony export */ });
/* harmony import */ var _types_types_content_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/types-content-common */ "./extension/content/types/types-content-common.ts");
/* harmony import */ var _common_types_types_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/types/types-common */ "./extension/common/types/types-common.ts");
/* harmony import */ var _app_resources_resources_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app/resources/resources-types */ "./extension/app/resources/resources-types.ts");
/* harmony import */ var _common_common_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/common-helpers */ "./extension/common/common-helpers.ts");
/* harmony import */ var _common_checkers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/checkers */ "./common/checkers.ts");
/* harmony import */ var _services_content_services_listeners__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/content-services-listeners */ "./extension/content/services/content-services-listeners.ts");
/* harmony import */ var _manifest_public_resources__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../manifest/public-resources */ "./extension/manifest/public-resources.ts");
/* harmony import */ var _common_common_extension_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../common/common-extension-helpers */ "./extension/common/common-extension-helpers.ts");
/* harmony import */ var _AbstractContentPlatform__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./AbstractContentPlatform */ "./extension/content/platforms/AbstractContentPlatform.ts");









let loggers;
class QRadarPlatform extends _AbstractContentPlatform__WEBPACK_IMPORTED_MODULE_8__.AbstractContentPlatform {
    static normalizedValue(value) {
        const nValue = (0,_common_checkers__WEBPACK_IMPORTED_MODULE_4__.isNumberInString)(value)
            ? parseFloat(value)
            : value;
        return typeof nValue === 'number'
            ? nValue
            : `'${nValue.replace(/'/g, '"')}'`;
    }
    buildQueryParts(type, resources, withPrefix = false) {
        const prefix = 'where';
        return (0,_common_common_helpers__WEBPACK_IMPORTED_MODULE_3__.buildQueryParts)(resources, () => (type === 'exclude' ? ' != ' : ' == '), type === 'exclude' ? ' AND ' : ' OR ', type === 'exclude' ? ' AND ' : ' OR ', {
            leftOperand: (v) => `"${v}"`,
            rightOperand: (v) => QRadarPlatform.normalizedValue(v),
        }, withPrefix ? prefix : undefined);
    }
    connect() {
        QRadarPlatform.setListeners();
        loggers.debug().log('connected');
    }
    static setListeners() {
        (0,_services_content_services_listeners__WEBPACK_IMPORTED_MODULE_5__.addListener)(_types_types_content_common__WEBPACK_IMPORTED_MODULE_0__.ListenerType.OnMessage, async (message) => {
            if (!document.querySelector('#aceEditor')) {
                return;
            }
            const query = `script[src$="${_manifest_public_resources__WEBPACK_IMPORTED_MODULE_6__.qRadarInline}"]`;
            if (!document.querySelector(query)) {
                QRadarPlatform.connectInlineListener();
                await (0,_common_common_helpers__WEBPACK_IMPORTED_MODULE_3__.waitHTMLElement)(query);
            }
            _AbstractContentPlatform__WEBPACK_IMPORTED_MODULE_8__.AbstractContentPlatform.processInlineListeners(message);
        });
    }
    static connectInlineListener() {
        (0,_common_common_helpers__WEBPACK_IMPORTED_MODULE_3__.mountHTMLElement)('script', document.body, {
            attributes: {
                src: (0,_common_common_extension_helpers__WEBPACK_IMPORTED_MODULE_7__.getWebAccessibleUrl)(_manifest_public_resources__WEBPACK_IMPORTED_MODULE_6__.qRadarInline),
                type: 'text/javascript',
                'data-type': 'inline-listener',
            },
        });
    }
    static extensionDefaultPosition = {
        top: 0,
        left: 0,
        width: 500,
        height: 400,
    };
    defaultWatchers = {
        [_app_resources_resources_types__WEBPACK_IMPORTED_MODULE_2__.BoundedResourceTypeID.Accounts]: [
            'Account Name',
            'Recipients',
            'Sender',
            'Target Username',
            'Username',
        ],
        [_app_resources_resources_types__WEBPACK_IMPORTED_MODULE_2__.BoundedResourceTypeID.Assets]: [
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
    extensionDefaultPosition = QRadarPlatform.extensionDefaultPosition;
    static id = _common_types_types_common__WEBPACK_IMPORTED_MODULE_1__.PlatformID.QRadar;
    getID() {
        return _common_types_types_common__WEBPACK_IMPORTED_MODULE_1__.PlatformID.QRadar;
    }
    getName() {
        return _common_types_types_common__WEBPACK_IMPORTED_MODULE_1__.PlatformName.QRadar;
    }
    getType() {
        return _common_types_types_common__WEBPACK_IMPORTED_MODULE_1__.SiemType.Qradar;
    }
}
loggers = (__webpack_require__(/*! ../../common/loggers */ "./extension/common/loggers/index.ts").loggers.addPrefix)(QRadarPlatform.id);


/***/ }),

/***/ "./extension/content/services/content-services-listeners.ts":
/*!******************************************************************!*\
  !*** ./extension/content/services/content-services-listeners.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addListener": () => (/* binding */ addListener)
/* harmony export */ });
/* harmony import */ var _types_types_content_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/types-content-common */ "./extension/content/types/types-content-common.ts");
/* harmony import */ var _common_loggers_loggers_debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/loggers/loggers-debug */ "./extension/common/loggers/loggers-debug.ts");
/* harmony import */ var _common_api_support__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/api-support */ "./extension/common/api-support.ts");
/* harmony import */ var _common_common_extension_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/common-extension-helpers */ "./extension/common/common-extension-helpers.ts");
/* harmony import */ var _common_loggers_loggers_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/loggers/loggers-helpers */ "./extension/common/loggers/loggers-helpers.ts");





const listeners = {};
const addListener = (type, listener, ...otherProps) => {
    listeners[type]?.((...params) => {
        listener(...params);
    }, ...otherProps);
};
const removeListenersCallbacks = [];
listeners[_types_types_content_common__WEBPACK_IMPORTED_MODULE_0__.ListenerType.OnMessage] = (listener, ...otherProps) => {
    if ((0,_common_api_support__WEBPACK_IMPORTED_MODULE_2__.isRuntimeOnMessageSupported)()) {
        const action = (0,_common_common_extension_helpers__WEBPACK_IMPORTED_MODULE_3__.getBrowserContext)().runtime.onMessage;
        removeListenersCallbacks.push(() => {
            action.removeListener(listener);
        });
        action.addListener((...params) => {
            listener(...params);
        }, ...otherProps);
    }
    if (!(0,_common_api_support__WEBPACK_IMPORTED_MODULE_2__.isAddEventListenerSupported)()) {
        return;
    }
    const boundedListener = (event) => {
        const message = event.data;
        if (event.origin !== window.location.origin
            || ((0,_common_loggers_loggers_helpers__WEBPACK_IMPORTED_MODULE_4__.getExecutingContextByMessageType)(message.type) !== 'content'
                && message.externalType !== _common_loggers_loggers_debug__WEBPACK_IMPORTED_MODULE_1__.DebugID.debugIDExternal)) {
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sendMessage": () => (/* binding */ sendMessage),
/* harmony export */   "sendMessageFromApp": () => (/* binding */ sendMessageFromApp),
/* harmony export */   "sendMessageFromContent": () => (/* binding */ sendMessageFromContent)
/* harmony export */ });
/* harmony import */ var _common_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../common/helpers */ "./common/helpers.ts");
/* harmony import */ var _common_api_support__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/api-support */ "./extension/common/api-support.ts");
/* harmony import */ var _common_common_extension_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/common-extension-helpers */ "./extension/common/common-extension-helpers.ts");



const serviceLoggers = (__webpack_require__(/*! ../../common/loggers */ "./extension/common/loggers/index.ts").loggers.addPrefix)('services');
const sendMessage = (loggers, message, runtime = true) => {
    message.id = `${message.id ? `${message.id}--` : ''}${(0,_common_helpers__WEBPACK_IMPORTED_MODULE_0__.uuid)()}`;
    const logPrefix = 'sendMessage';
    try {
        if (!runtime && !(0,_common_api_support__WEBPACK_IMPORTED_MODULE_1__.isPostMessageSupported)(message)) {
            return message;
        }
        if (!runtime) {
            window.postMessage(message);
            loggers.debug().log('postMessage', message);
            return message;
        }
        if (!(0,_common_api_support__WEBPACK_IMPORTED_MODULE_1__.isRuntimeSendMessageSupported)()) {
            return message;
        }
        (0,_common_common_extension_helpers__WEBPACK_IMPORTED_MODULE_2__.getBrowserContext)().runtime.sendMessage(message)
            ?.catch((e) => loggers.error().addPrefix(logPrefix).log(e, message));
        loggers.debug().addPrefix(logPrefix).log(message);
        return message;
    }
    catch (e) {
        loggers.error().addPrefix(logPrefix).log(e, message);
        return message;
    }
};
const sendMessageFromContent = (message, runtime = true) => {
    return sendMessage(serviceLoggers.addPrefix('message-from-content'), message, runtime);
};
const sendMessageFromApp = (message, runtime = true) => {
    return sendMessage(serviceLoggers.addPrefix('message-from-app'), message, runtime);
};


/***/ }),

/***/ "./extension/content/types/types-content-common.ts":
/*!*********************************************************!*\
  !*** ./extension/content/types/types-content-common.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ListenerType": () => (/* binding */ ListenerType)
/* harmony export */ });
var ListenerType;
(function (ListenerType) {
    ListenerType["OnMessage"] = "OnMessage";
})(ListenerType || (ListenerType = {}));


/***/ }),

/***/ "./extension/content/types/types-content-messages.ts":
/*!***********************************************************!*\
  !*** ./extension/content/types/types-content-messages.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessageToContent": () => (/* binding */ MessageToContent)
/* harmony export */ });
/* harmony import */ var _common_loggers_loggers_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/loggers/loggers-helpers */ "./extension/common/loggers/loggers-helpers.ts");

var MessageToContent;
(function (MessageToContent) {
    // CSSendMessageOutside = 'CSSendMessageOutside',
    MessageToContent["CSConnectPlatform"] = "CSConnectPlatform";
    MessageToContent["CSSetDebugMode"] = "CSSetDebugMode";
    MessageToContent["CSDirectMessageToApp"] = "CSDirectMessageToApp";
    MessageToContent["CSDirectMessageToInline"] = "CSDirectMessageToInline";
})(MessageToContent || (MessageToContent = {}));
Object.values(MessageToContent).forEach((type) => {
    if ((0,_common_loggers_loggers_helpers__WEBPACK_IMPORTED_MODULE_0__.getExecutingContextByMessageType)(type) !== 'content') {
        throw new Error(`Wrong content message type "${type}"`);
    }
});


/***/ }),

/***/ "./extension/inline/helpers/ace-editor-helpers.ts":
/*!********************************************************!*\
  !*** ./extension/inline/helpers/ace-editor-helpers.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildNewQuery": () => (/* binding */ buildNewQuery),
/* harmony export */   "getEditor": () => (/* binding */ getEditor)
/* harmony export */ });
/* harmony import */ var _common_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../common/helpers */ "./common/helpers.ts");

const getEditor = (element) => {
    try {
        return ace.edit(element);
    }
    catch (e) {
        return null;
    }
};
const buildNewQuery = (currentQuery, suffix, modifyType) => {
    const newQuery = `${modifyType === 'show all'
        ? currentQuery.split('|').shift()?.trim()
            || '<unknown>'
        : currentQuery} ${suffix}`;
    return (0,_common_helpers__WEBPACK_IMPORTED_MODULE_0__.clearExtraSpaces)(newQuery);
};


/***/ }),

/***/ "./extension/inline/helpers/aql-builder.ts":
/*!*************************************************!*\
  !*** ./extension/inline/helpers/aql-builder.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addWhere": () => (/* binding */ addWhere),
/* harmony export */   "buildNewQuery": () => (/* binding */ buildNewQuery),
/* harmony export */   "parseQueryString": () => (/* binding */ parseQueryString)
/* harmony export */ });
/* harmony import */ var _common_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../common/helpers */ "./common/helpers.ts");

const parseQueryString = (query) => {
    const normalizedQuery = (0,_common_helpers__WEBPACK_IMPORTED_MODULE_0__.clearExtraSpaces)((0,_common_helpers__WEBPACK_IMPORTED_MODULE_0__.clearLineBreaks)(query)).trim();
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
    const sortedIndexes = Array.from(indexes).sort(_common_helpers__WEBPACK_IMPORTED_MODULE_0__.sortNumbers);
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
const addWhere = (currentWhere, addingWhere, separator) => {
    return currentWhere.length < 1
        ? addingWhere
        : `(${currentWhere}) ${separator} ${addingWhere}`;
};
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


/***/ }),

/***/ "./extension/inline/helpers/index.ts":
/*!*******************************************!*\
  !*** ./extension/inline/helpers/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sendQueryToApp": () => (/* binding */ sendQueryToApp)
/* harmony export */ });
/* harmony import */ var _common_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../common/helpers */ "./common/helpers.ts");
/* harmony import */ var _content_types_types_content_messages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../content/types/types-content-messages */ "./extension/content/types/types-content-messages.ts");
/* harmony import */ var _app_types_types_app_messages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app/types/types-app-messages */ "./extension/app/types/types-app-messages.ts");



const sendQueryToApp = (query, meta) => {
    if (!query && !meta) {
        return;
    }
    window.postMessage({
        id: (0,_common_helpers__WEBPACK_IMPORTED_MODULE_0__.uuid)(),
        type: _content_types_types_content_messages__WEBPACK_IMPORTED_MODULE_1__.MessageToContent.CSDirectMessageToApp,
        payload: {
            type: _app_types_types_app_messages__WEBPACK_IMPORTED_MODULE_2__.MessageToApp.AppTakeQuery,
            payload: { queryValue: query, queryMeta: meta },
        },
    });
};


/***/ }),

/***/ "./extension/inline/types/types-inline-messages.ts":
/*!*********************************************************!*\
  !*** ./extension/inline/types/types-inline-messages.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessageToInline": () => (/* binding */ MessageToInline)
/* harmony export */ });
/* harmony import */ var _common_loggers_loggers_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/loggers/loggers-helpers */ "./extension/common/loggers/loggers-helpers.ts");

var MessageToInline;
(function (MessageToInline) {
    MessageToInline["ISModifyQuery"] = "ISModifyQuery";
    MessageToInline["ISSetQuery"] = "ISSetQuery";
    MessageToInline["ISGetQuery"] = "ISGetQuery";
    MessageToInline["ISSetDebugMode"] = "ISSetDebugMode";
    MessageToInline["ISRemoveHash"] = "ISRemoveHash";
    MessageToInline["ISRemoveFieldSpecification"] = "ISRemoveFieldSpecification";
})(MessageToInline || (MessageToInline = {}));
Object.values(MessageToInline).forEach((type) => {
    if ((0,_common_loggers_loggers_helpers__WEBPACK_IMPORTED_MODULE_0__.getExecutingContextByMessageType)(type) !== 'inline') {
        throw new Error(`Wrong inline message type "${type}"`);
    }
});


/***/ }),

/***/ "./extension/manifest/public-resources.ts":
/*!************************************************!*\
  !*** ./extension/manifest/public-resources.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "accessibleResources": () => (/* binding */ accessibleResources),
/* harmony export */   "amazonAthenaInline": () => (/* binding */ amazonAthenaInline),
/* harmony export */   "appStyles": () => (/* binding */ appStyles),
/* harmony export */   "arcSightInline": () => (/* binding */ arcSightInline),
/* harmony export */   "chronicleInline": () => (/* binding */ chronicleInline),
/* harmony export */   "elasticInline": () => (/* binding */ elasticInline),
/* harmony export */   "logScaleInline": () => (/* binding */ logScaleInline),
/* harmony export */   "microsoftDefenderInline": () => (/* binding */ microsoftDefenderInline),
/* harmony export */   "microsoftSentinelInline": () => (/* binding */ microsoftSentinelInline),
/* harmony export */   "microsoftSentinelPagesInline": () => (/* binding */ microsoftSentinelPagesInline),
/* harmony export */   "openSearchInline": () => (/* binding */ openSearchInline),
/* harmony export */   "qRadarInline": () => (/* binding */ qRadarInline),
/* harmony export */   "splunkInline": () => (/* binding */ splunkInline)
/* harmony export */ });
/* harmony import */ var _common_types_types_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/types/types-common */ "./extension/common/types/types-common.ts");

const appStyles = 'app-styles.css';
const microsoftSentinelInline = 'inline-microsoft-sentinel.js';
const microsoftSentinelPagesInline = 'inline-microsoft-sentinel-pages.js';
const microsoftDefenderInline = 'inline-microsoft-defender.js';
const amazonAthenaInline = 'inline-amazon-athena.js';
const splunkInline = 'inline-splunk.js';
const qRadarInline = 'inline-qradar.js';
const elasticInline = 'inline-elastic.js';
const arcSightInline = 'inline-arcsight.js';
const openSearchInline = 'inline-opensearch.js';
const logScaleInline = 'inline-logscale.js';
const chronicleInline = 'inline-chronicle.js';
const accessibleResources = {
    [_common_types_types_common__WEBPACK_IMPORTED_MODULE_0__.PlatformID.MicrosoftSentinel]: [microsoftSentinelInline, microsoftSentinelPagesInline],
    [_common_types_types_common__WEBPACK_IMPORTED_MODULE_0__.PlatformID.MicrosoftDefender]: [microsoftDefenderInline],
    [_common_types_types_common__WEBPACK_IMPORTED_MODULE_0__.PlatformID.Splunk]: [splunkInline],
    [_common_types_types_common__WEBPACK_IMPORTED_MODULE_0__.PlatformID.QRadar]: [qRadarInline],
    [_common_types_types_common__WEBPACK_IMPORTED_MODULE_0__.PlatformID.Elastic]: [elasticInline],
    [_common_types_types_common__WEBPACK_IMPORTED_MODULE_0__.PlatformID.ArcSight]: [arcSightInline],
    [_common_types_types_common__WEBPACK_IMPORTED_MODULE_0__.PlatformID.Athena]: [amazonAthenaInline],
    [_common_types_types_common__WEBPACK_IMPORTED_MODULE_0__.PlatformID.OpenSearch]: [openSearchInline],
    [_common_types_types_common__WEBPACK_IMPORTED_MODULE_0__.PlatformID.LogScale]: [logScaleInline],
    [_common_types_types_common__WEBPACK_IMPORTED_MODULE_0__.PlatformID.Chronicle]: [chronicleInline],
    app: [appStyles],
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
var __webpack_exports__ = {};
/*!*****************************!*\
  !*** ./extension/inline.ts ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_loggers_loggers_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/loggers/loggers-helpers */ "./extension/common/loggers/loggers-helpers.ts");

(__webpack_require__(/*! ./common/loggers */ "./extension/common/loggers/index.ts").loggers.setPrefix)((0,_common_loggers_loggers_helpers__WEBPACK_IMPORTED_MODULE_0__.getDebugPrefix)('inline'));

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!**************************************************!*\
  !*** ./extension/inline/qradar/inline-qradar.ts ***!
  \**************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _content_platforms_QRadarPlatform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../content/platforms/QRadarPlatform */ "./extension/content/platforms/QRadarPlatform.ts");
/* harmony import */ var _common_common_listeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/common-listeners */ "./extension/common/common-listeners.ts");
/* harmony import */ var _types_types_inline_messages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/types-inline-messages */ "./extension/inline/types/types-inline-messages.ts");
/* harmony import */ var _helpers_ace_editor_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/ace-editor-helpers */ "./extension/inline/helpers/ace-editor-helpers.ts");
/* harmony import */ var _helpers_aql_builder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/aql-builder */ "./extension/inline/helpers/aql-builder.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers */ "./extension/inline/helpers/index.ts");






const platform = new _content_platforms_QRadarPlatform__WEBPACK_IMPORTED_MODULE_0__.QRadarPlatform();
const loggers = (__webpack_require__(/*! ../../common/loggers */ "./extension/common/loggers/index.ts").loggers.addPrefix)(platform.getID());
const getEditor = () => {
    return (0,_helpers_ace_editor_helpers__WEBPACK_IMPORTED_MODULE_3__.getEditor)(document.querySelector('#aceEditor'));
};
window.addEventListener('message', (event) => {
    const message = event.data;
    if ((0,_common_common_listeners__WEBPACK_IMPORTED_MODULE_1__.isMessageMatched)(() => _types_types_inline_messages__WEBPACK_IMPORTED_MODULE_2__.MessageToInline.ISModifyQuery === message.type, message, event)) {
        const editor = getEditor();
        if (!editor) {
            loggers.error().log('editor not found', ace);
            return;
        }
        const { resources, modifyType } = message.payload;
        let parsedQuery = (0,_helpers_aql_builder__WEBPACK_IMPORTED_MODULE_4__.parseQueryString)(editor.getValue());
        if (modifyType === 'show all') {
            parsedQuery = {
                select: parsedQuery.select,
                from: parsedQuery.from,
            };
        }
        parsedQuery.where = (0,_helpers_aql_builder__WEBPACK_IMPORTED_MODULE_4__.addWhere)(parsedQuery.where || '', platform.buildQueryParts(modifyType, resources), 'AND');
        editor.setValue((0,_helpers_aql_builder__WEBPACK_IMPORTED_MODULE_4__.buildNewQuery)(parsedQuery));
    }
    if ((0,_common_common_listeners__WEBPACK_IMPORTED_MODULE_1__.isMessageMatched)(() => _types_types_inline_messages__WEBPACK_IMPORTED_MODULE_2__.MessageToInline.ISSetQuery === message.type, message, event)) {
        const editor = getEditor();
        if (!editor) {
            return;
        }
        const { value } = message.payload;
        editor.setValue(value);
    }
    if ((0,_common_common_listeners__WEBPACK_IMPORTED_MODULE_1__.isMessageMatched)(() => _types_types_inline_messages__WEBPACK_IMPORTED_MODULE_2__.MessageToInline.ISGetQuery === message.type, message, event)) {
        const editor = getEditor();
        if (!editor) {
            return;
        }
        (0,_helpers__WEBPACK_IMPORTED_MODULE_5__.sendQueryToApp)(editor.getValue());
    }
    if ((0,_common_common_listeners__WEBPACK_IMPORTED_MODULE_1__.isMessageMatched)(() => _types_types_inline_messages__WEBPACK_IMPORTED_MODULE_2__.MessageToInline.ISSetDebugMode === message.type, message, event)) {
        const { debugMode } = message.payload;
        (__webpack_require__(/*! ../../common/loggers */ "./extension/common/loggers/index.ts").setDebugMode)(debugMode);
    }
});
loggers.debug().log('mounted');

})();

/******/ })()
;