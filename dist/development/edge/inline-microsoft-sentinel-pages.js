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

/***/ "./extension/inline/microsoft-sentinel-pages/helpers/index.ts":
/*!********************************************************************!*\
  !*** ./extension/inline/microsoft-sentinel-pages/helpers/index.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getQueryByMonacoContainerInnerText": () => (/* binding */ getQueryByMonacoContainerInnerText),
/* harmony export */   "getQueryNextByLabelText": () => (/* binding */ getQueryNextByLabelText)
/* harmony export */ });
const getQueryNextByLabelText = (labelText) => {
    let query = '';
    const ruleLabelElements = Array.from(document.querySelectorAll('label[data-testid="DetailsPanelBodyItemTitle"]') || []).filter((el) => el.innerText === labelText);
    if (ruleLabelElements.length < 1) {
        return '';
    }
    ruleLabelElements.forEach((el) => {
        const preQuery = el.nextSibling.innerText?.trim?.();
        if (preQuery && preQuery.length > 0) {
            query = preQuery;
        }
    });
    return query;
};
const getQueryByMonacoContainerInnerText = () => {
    let query = '';
    Array.from(document
        .querySelectorAll('.react-monaco-editor-container'))
        .forEach((el) => {
        const preQuery = el.innerText?.trim?.();
        if (preQuery && preQuery.length > 0) {
            query = preQuery;
        }
    });
    return query;
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
/*!**************************************************************************************!*\
  !*** ./extension/inline/microsoft-sentinel-pages/inline-microsoft-sentinel-pages.ts ***!
  \**************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_types_types_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/types/types-common */ "./extension/common/types/types-common.ts");
/* harmony import */ var _common_common_listeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/common-listeners */ "./extension/common/common-listeners.ts");
/* harmony import */ var _types_types_inline_messages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/types-inline-messages */ "./extension/inline/types/types-inline-messages.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers */ "./extension/inline/helpers/index.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers */ "./extension/inline/microsoft-sentinel-pages/helpers/index.ts");





const loggers = (__webpack_require__(/*! ../../common/loggers */ "./extension/common/loggers/index.ts").loggers.addPrefix)(_common_types_types_common__WEBPACK_IMPORTED_MODULE_0__.PlatformID.MicrosoftSentinel)
    .addPrefix('pages');
window.addEventListener('message', (event) => {
    const message = event.data;
    if ((0,_common_common_listeners__WEBPACK_IMPORTED_MODULE_1__.isMessageMatched)(() => _types_types_inline_messages__WEBPACK_IMPORTED_MODULE_2__.MessageToInline.ISGetQuery === message.type, message, event)) {
        let query = '';
        const { meta } = message.payload;
        if (!query && meta?.type === 'EditMigrationRule') {
            query = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.getQueryNextByLabelText)('Source Query');
            (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.sendQueryToApp)(query);
            return;
        }
        if (!query) {
            query = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.getQueryNextByLabelText)('Rule query');
        }
        if (!query) {
            query = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.getQueryNextByLabelText)('Source Query');
        }
        if (!query) {
            query = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.getQueryByMonacoContainerInnerText)();
        }
        (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.sendQueryToApp)(query);
    }
});
loggers.debug().log('mounted');

})();

/******/ })()
;