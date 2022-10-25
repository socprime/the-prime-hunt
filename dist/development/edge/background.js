/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./common/Http.ts":
/*!************************!*\
  !*** ./common/Http.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.http = exports.Http = void 0;
class Http {
    request(url, params, callbacks) {
        const responseType = (callbacks === null || callbacks === void 0 ? void 0 : callbacks.onJSONSuccess) ? 'json' : 'text';
        fetch(url, params)
            .then(response => responseType === 'json'
            ? response.json()
            : response.text())
            .then(response => {
            var _a, _b;
            return responseType === 'json'
                ? (_a = callbacks === null || callbacks === void 0 ? void 0 : callbacks.onJSONSuccess) === null || _a === void 0 ? void 0 : _a.call(callbacks, response)
                : (_b = callbacks === null || callbacks === void 0 ? void 0 : callbacks.onTextSuccess) === null || _b === void 0 ? void 0 : _b.call(callbacks, response);
        })
            .catch(e => {
            var _a;
            (_a = callbacks === null || callbacks === void 0 ? void 0 : callbacks.onError) === null || _a === void 0 ? void 0 : _a.call(callbacks, e);
        });
    }
    get(params, callbacks) {
        return this.request(params.url, {
            headers: (params === null || params === void 0 ? void 0 : params.headers) || {},
            method: 'GET',
        }, callbacks);
    }
    post(params, callbacks) {
        return this.request(params.url, {
            headers: (params === null || params === void 0 ? void 0 : params.headers) || {},
            method: 'POST',
            body: params.body || '',
        }, callbacks);
    }
}
exports.Http = Http;
exports.http = new Http();


/***/ }),

/***/ "./common/Register.ts":
/*!****************************!*\
  !*** ./common/Register.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Register = void 0;
class Register {
    constructor() {
        this.storage = new Map();
    }
    set(key, value) {
        this.storage.set(key, value);
        return value;
    }
    get(key) {
        return this.storage.get(key);
    }
    remove(key) {
        if (this.storage.has(key)) {
            this.storage.delete(key);
            return true;
        }
        return false;
    }
    has(key) {
        return this.storage.has(key);
    }
}
exports.Register = Register;


/***/ }),

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

/***/ "./extension/app/types/types-app-common.ts":
/*!*************************************************!*\
  !*** ./extension/app/types/types-app-common.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoadingKey = void 0;
var LoadingKey;
(function (LoadingKey) {
    LoadingKey["resourcesAdding"] = "resourcesAdding";
    LoadingKey["fieldAdding"] = "fieldAdding";
    LoadingKey["fieldRemoving"] = "fieldRemoving";
})(LoadingKey = exports.LoadingKey || (exports.LoadingKey = {}));


/***/ }),

/***/ "./extension/app/types/types-app-messages.ts":
/*!***************************************************!*\
  !*** ./extension/app/types/types-app-messages.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageToApp = void 0;
const common_helpers_1 = __webpack_require__(/*! ../../common/common-helpers */ "./extension/common/common-helpers.ts");
var MessageToApp;
(function (MessageToApp) {
    MessageToApp["AppShowExtension"] = "AppShowExtension";
    MessageToApp["AppTakeResourceData"] = "AppTakeResourceData";
    MessageToApp["AppTakeNewResourceData"] = "AppTakeNewResourceData";
    MessageToApp["AppClearResourceData"] = "AppClearResourceData";
    MessageToApp["AppAddFieldToWatch"] = "AppAddFieldToWatch";
    MessageToApp["AppSetLoadingState"] = "AppSetLoadingState";
})(MessageToApp = exports.MessageToApp || (exports.MessageToApp = {}));
Object.values(MessageToApp).forEach(type => {
    if ((0, common_helpers_1.getExecutingContextByMessageType)(type) !== 'app') {
        throw new Error(`Wrong app message type "${type}"`);
    }
});


/***/ }),

/***/ "./extension/background/background-listeners.ts":
/*!******************************************************!*\
  !*** ./extension/background/background-listeners.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const background_services_listeners_1 = __webpack_require__(/*! ./services/background-services-listeners */ "./extension/background/services/background-services-listeners.ts");
const types_background_common_1 = __webpack_require__(/*! ./types/types-background-common */ "./extension/background/types/types-background-common.ts");
const background_services_1 = __webpack_require__(/*! ./services/background-services */ "./extension/background/services/background-services.ts");
const types_app_messages_1 = __webpack_require__(/*! ../app/types/types-app-messages */ "./extension/app/types/types-app-messages.ts");
const common_listeners_1 = __webpack_require__(/*! ../common/common-listeners */ "./extension/common/common-listeners.ts");
const types_background_messages_1 = __webpack_require__(/*! ./types/types-background-messages */ "./extension/background/types/types-background-messages.ts");
const types_content_messages_1 = __webpack_require__(/*! ../content/types/types-content-messages */ "./extension/content/types/types-content-messages.ts");
const PlatformResolver_1 = __webpack_require__(/*! ./platforms/PlatformResolver */ "./extension/background/platforms/PlatformResolver.ts");
const types_app_common_1 = __webpack_require__(/*! ../app/types/types-app-common */ "./extension/app/types/types-app-common.ts");
const loggers_debug_1 = __webpack_require__(/*! ../common/loggers/loggers-debug */ "./extension/common/loggers/loggers-debug.ts");
const helpers_1 = __webpack_require__(/*! ../../common/helpers */ "./common/helpers.ts");
const loggers = (__webpack_require__(/*! ../common/loggers */ "./extension/common/loggers/index.ts").loggers.addPrefix)((0, loggers_debug_1.getDebugPrefix)('background'))
    .addPrefix('listeners');
background_services_listeners_1.addListener(types_background_common_1.BGListenerType.OnExtensionIconClicked, (tab) => {
    if (!tab.id) {
        return loggers
            .error()
            .log(`${types_background_common_1.BGListenerType.OnExtensionIconClicked}: there is no tab id`, tab);
    }
    (0, background_services_1.sendMessageFromBackground)(tab.id, {
        type: types_app_messages_1.MessageToApp.AppShowExtension,
    });
    (0, background_services_1.sendMessageFromBackground)(tab.id, {
        type: types_content_messages_1.MessageToContent.CSConnectPlatform,
    });
});
background_services_listeners_1.addListener(types_background_common_1.BGListenerType.OnBrowserTabRemoved, (tabId) => {
    (0, background_services_1.unregisterPlatformTabs)([tabId]);
});
background_services_listeners_1.addListener(types_background_common_1.BGListenerType.OnBeforeRequest, () => { }, {
    urls: ['<all_urls>'],
}, ['requestBody']);
background_services_listeners_1.addListener(types_background_common_1.BGListenerType.OnBeforeSendHeaders, () => { }, {
    urls: ['<all_urls>'],
}, ['requestHeaders']);
background_services_listeners_1.addListener(types_background_common_1.BGListenerType.OnMessage, (message, sender) => {
    var _a, _b;
    if (!((_a = sender.tab) === null || _a === void 0 ? void 0 : _a.id)) {
        return loggers
            .error()
            .log(`${types_background_common_1.BGListenerType.OnMessage} ${message.type}: there is no tab id`, sender, message);
    }
    if ((0, common_listeners_1.isMessageMatched)(() => types_background_messages_1.MessageToBackground.BGRunClearData === message.type, message, sender)) {
        (0, background_services_1.sendMessageFromBackground)(sender.tab.id, {
            type: types_app_messages_1.MessageToApp.AppClearResourceData,
        });
    }
    if ((0, common_listeners_1.isMessageMatched)(() => types_background_messages_1.MessageToBackground.BGModifyQuery === message.type, message, sender)) {
        (0, background_services_1.sendMessageFromBackground)(sender.tab.id, Object.assign(Object.assign({}, message), { id: `${message.id}--background-modify-query`, type: types_content_messages_1.MessageToContent.CSModifyQuery }));
    }
    if ((0, common_listeners_1.isMessageMatched)(() => types_background_messages_1.MessageToBackground.BGSetWatchers === message.type, message, sender)) {
        const { platformID, watchers, action } = message.payload;
        (_b = PlatformResolver_1.platformResolver.resolve(platformID)) === null || _b === void 0 ? void 0 : _b.setWatchers(watchers, sender.tab.id);
        (0, background_services_1.sendMessageFromBackground)(sender.tab.id, {
            id: `background-set-watchers--${(0, helpers_1.uuid)()}`,
            type: types_app_messages_1.MessageToApp.AppSetLoadingState,
            payload: {
                loading: false,
                key: action === 'add'
                    ? types_app_common_1.LoadingKey.fieldAdding
                    : types_app_common_1.LoadingKey.fieldRemoving,
            },
        });
    }
    if ((0, common_listeners_1.isMessageMatched)(() => types_background_messages_1.MessageToBackground.BGAddFieldToWatch === message.type, message, sender)) {
        (0, background_services_1.sendMessageFromBackground)(sender.tab.id, Object.assign(Object.assign({}, message), { id: `${message.id}--background-add-field`, type: types_app_messages_1.MessageToApp.AppAddFieldToWatch }));
    }
    if ((0, common_listeners_1.isMessageMatched)(() => types_background_messages_1.MessageToBackground.BGRegisterPlatformTab === message.type, message, sender)) {
        const { platformID } = message.payload;
        (0, background_services_1.registerPlatformTab)(platformID, sender.tab.id);
    }
});
loggers.debug().log('mounted');


/***/ }),

/***/ "./extension/background/platforms/AbstractPlatform.ts":
/*!************************************************************!*\
  !*** ./extension/background/platforms/AbstractPlatform.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractPlatform = void 0;
const background_services_listeners_1 = __webpack_require__(/*! ../services/background-services-listeners */ "./extension/background/services/background-services-listeners.ts");
const background_services_1 = __webpack_require__(/*! ../services/background-services */ "./extension/background/services/background-services.ts");
const types_app_messages_1 = __webpack_require__(/*! ../../app/types/types-app-messages */ "./extension/app/types/types-app-messages.ts");
const helpers_1 = __webpack_require__(/*! ../../../common/helpers */ "./common/helpers.ts");
class AbstractPlatform {
    constructor() {
        this.lastResponse = null;
        this.watchingResources = {};
        this.emptyFieldValue = '';
        this.interceptorsIDs = new Set();
    }
    addValueToResource(parent, key, value) {
        var _a;
        const values = parent[key] || new Set();
        const normalizedValue = typeof value === 'number'
            ? String(value)
            : (_a = value === null || value === void 0 ? void 0 : value.trim) === null || _a === void 0 ? void 0 : _a.call(value);
        if (normalizedValue && normalizedValue !== this.emptyFieldValue) {
            values.add(normalizedValue);
        }
        if (values.size) {
            parent[key] = values;
        }
    }
    unregister() {
        Array.from(this.interceptorsIDs).forEach(id => {
            (0, background_services_listeners_1.removeBGInterceptor)(id);
            this.interceptorsIDs.delete(id);
        });
    }
    setWatchers(watchers, tabID) {
        this.watchingResources = watchers;
        if (!this.lastResponse) {
            return;
        }
        const parsedResponse = this.parseResponse(this.lastResponse);
        (0, background_services_1.sendMessageFromBackground)(tabID, {
            id: `re-parsed-last-response--${(0, helpers_1.uuid)()}`,
            type: types_app_messages_1.MessageToApp.AppTakeResourceData,
            payload: {
                services: (0, background_services_1.normalizeParsedResource)(parsedResponse.services),
                assets: (0, background_services_1.normalizeParsedResource)(parsedResponse.assets),
                accounts: (0, background_services_1.normalizeParsedResource)(parsedResponse.accounts),
            },
        });
    }
}
exports.AbstractPlatform = AbstractPlatform;


/***/ }),

/***/ "./extension/background/platforms/PlatformResolver.ts":
/*!************************************************************!*\
  !*** ./extension/background/platforms/PlatformResolver.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.platformResolver = exports.PlatformResolver = void 0;
const Register_1 = __webpack_require__(/*! ../../../common/Register */ "./common/Register.ts");
const types_common_1 = __webpack_require__(/*! ../../common/types/types-common */ "./extension/common/types/types-common.ts");
const MicrosoftSentinelPlatform_1 = __webpack_require__(/*! ./microsoft-sentinel/MicrosoftSentinelPlatform */ "./extension/background/platforms/microsoft-sentinel/MicrosoftSentinelPlatform.ts");
const envs_1 = __webpack_require__(/*! ../../common/envs */ "./extension/common/envs.ts");
const MicrosoftDefenderPlatform_1 = __webpack_require__(/*! ./microsoft-defender-for-endpoint/MicrosoftDefenderPlatform */ "./extension/background/platforms/microsoft-defender-for-endpoint/MicrosoftDefenderPlatform.ts");
const SplunkPlatform_1 = __webpack_require__(/*! ./splunk/SplunkPlatform */ "./extension/background/platforms/splunk/SplunkPlatform.ts");
class PlatformResolver {
    constructor() {
        this.platforms = new Register_1.Register();
    }
    getPlatform(platformID) {
        if (!this.platforms.has(platformID)) {
            switch (platformID) {
                case types_common_1.PlatformID.MicrosoftSentinel: {
                    this.platforms.set(platformID, new MicrosoftSentinelPlatform_1.MicrosoftSentinelPlatform());
                    break;
                }
                case types_common_1.PlatformID.MicrosoftDefender: {
                    this.platforms.set(platformID, new MicrosoftDefenderPlatform_1.MicrosoftDefenderPlatform());
                    break;
                }
                case types_common_1.PlatformID.Splunk: {
                    this.platforms.set(platformID, new SplunkPlatform_1.SplunkPlatform());
                }
            }
        }
        return this.platforms.get(platformID);
    }
    resolve(platformID) {
        return envs_1.backgroundPlatformIDFromENV
            ? this.getPlatform(envs_1.backgroundPlatformIDFromENV)
            : this.getPlatform(platformID);
    }
}
exports.PlatformResolver = PlatformResolver;
exports.platformResolver = new PlatformResolver();


/***/ }),

/***/ "./extension/background/platforms/background-platforms-helpers.ts":
/*!************************************************************************!*\
  !*** ./extension/background/platforms/background-platforms-helpers.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNormalizedWatchers = exports.removeFieldFromWatching = exports.addFieldToWatch = void 0;
const helpers_1 = __webpack_require__(/*! ../../../common/helpers */ "./common/helpers.ts");
const addFieldToWatch = (watchers, fieldName, type) => {
    const fieldsNames = watchers[type] || [];
    if (!fieldsNames.includes(fieldName)) {
        fieldsNames.push(fieldName);
    }
    watchers[type] = (0, helpers_1.deduplicateArray)(fieldsNames);
    return watchers;
};
exports.addFieldToWatch = addFieldToWatch;
const removeFieldFromWatching = (watchers, fieldName, type) => {
    watchers[type] = (watchers[type] || [])
        .filter(f => f !== fieldName);
    return watchers;
};
exports.removeFieldFromWatching = removeFieldFromWatching;
const getNormalizedWatchers = (watchers) => {
    const fieldsNames = new Set();
    const mapFieldNameToType = new Map();
    Object.keys(watchers).forEach((type) => {
        const names = watchers[type];
        names.forEach(name => {
            fieldsNames.add(name);
            const types = mapFieldNameToType.get(name) || [];
            types.push(type);
            mapFieldNameToType.set(name, types);
        });
    });
    return { fieldsNames, mapFieldNameToType };
};
exports.getNormalizedWatchers = getNormalizedWatchers;


/***/ }),

/***/ "./extension/background/platforms/microsoft-defender-for-endpoint/MicrosoftDefenderPlatform.ts":
/*!*****************************************************************************************************!*\
  !*** ./extension/background/platforms/microsoft-defender-for-endpoint/MicrosoftDefenderPlatform.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MicrosoftDefenderPlatform = void 0;
const AbstractPlatform_1 = __webpack_require__(/*! ../AbstractPlatform */ "./extension/background/platforms/AbstractPlatform.ts");
const types_common_1 = __webpack_require__(/*! ../../../common/types/types-common */ "./extension/common/types/types-common.ts");
const loggers_debug_1 = __webpack_require__(/*! ../../../common/loggers/loggers-debug */ "./extension/common/loggers/loggers-debug.ts");
const background_services_listeners_1 = __webpack_require__(/*! ../../services/background-services-listeners */ "./extension/background/services/background-services-listeners.ts");
const types_background_common_1 = __webpack_require__(/*! ../../types/types-background-common */ "./extension/background/types/types-background-common.ts");
const microsoft_defender_watchers_1 = __webpack_require__(/*! ./microsoft-defender-watchers */ "./extension/background/platforms/microsoft-defender-for-endpoint/microsoft-defender-watchers.ts");
const background_platforms_helpers_1 = __webpack_require__(/*! ../background-platforms-helpers */ "./extension/background/platforms/background-platforms-helpers.ts");
const background_services_1 = __webpack_require__(/*! ../../services/background-services */ "./extension/background/services/background-services.ts");
const types_app_messages_1 = __webpack_require__(/*! ../../../app/types/types-app-messages */ "./extension/app/types/types-app-messages.ts");
const types_app_common_1 = __webpack_require__(/*! ../../../app/types/types-app-common */ "./extension/app/types/types-app-common.ts");
const helpers_1 = __webpack_require__(/*! ../../../../common/helpers */ "./common/helpers.ts");
const Http_1 = __webpack_require__(/*! ../../../../common/Http */ "./common/Http.ts");
const loggers = (__webpack_require__(/*! ../../../common/loggers */ "./extension/common/loggers/index.ts").loggers.addPrefix)((0, loggers_debug_1.getDebugPrefix)('background'))
    .addPrefix(types_common_1.PlatformID.MicrosoftDefender);
class MicrosoftDefenderPlatform extends AbstractPlatform_1.AbstractPlatform {
    constructor() {
        super();
        this.watchingResources = microsoft_defender_watchers_1.microsoftDefenderWatchers;
        this.emptyFieldValue = '';
    }
    static sendLoading(tabID, loading) {
        (0, background_services_1.sendMessageFromBackground)(tabID, {
            type: types_app_messages_1.MessageToApp.AppSetLoadingState,
            payload: {
                loading,
                key: types_app_common_1.LoadingKey.resourcesAdding,
            },
        });
    }
    getID() {
        return MicrosoftDefenderPlatform.id;
    }
    parseResponse(response) {
        const id = (0, helpers_1.uuid)();
        loggers.debug().log('started parse response...', id, this.watchingResources);
        const results = {
            'assets': {},
            'accounts': {},
            'services': {},
        };
        const { mapFieldNameToType, fieldsNames } = (0, background_platforms_helpers_1.getNormalizedWatchers)(this.watchingResources);
        ((response === null || response === void 0 ? void 0 : response.Results) || []).forEach(document => {
            Array.from(fieldsNames).forEach(fieldName => {
                if (document === null || document === void 0 ? void 0 : document[fieldName]) {
                    const types = mapFieldNameToType.get(fieldName);
                    types.forEach(t => {
                        this.addValueToResource(results[t], fieldName, document[fieldName]);
                    });
                }
            });
        });
        loggers.debug().log('finished parse response', id);
        return {
            services: results.services,
            accounts: results.accounts,
            assets: results.assets,
        };
    }
    register() {
        const urlsProcessing = new Set();
        const bodyData = new Map();
        this.interceptorsIDs.add((0, background_services_listeners_1.setBGInterceptor)(types_background_common_1.BGListenerType.OnBeforeRequest, (id, params, isMatched) => {
            const details = params.listenerParams[0];
            const { href } = new URL(details.url);
            if (!isMatched(() => {
                var _a, _b, _c, _d;
                return !(urlsProcessing.has(details.url)
                    || details.method !== 'POST'
                    || !microsoft_defender_watchers_1.microsoftDefenderPostsUrls.some(p => href.indexOf(p) > -1)
                    || !((_d = (_c = (_b = (_a = details.requestBody) === null || _a === void 0 ? void 0 : _a.raw) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.bytes) === null || _d === void 0 ? void 0 : _d.byteLength)
                    || details.requestBody.raw[0].bytes.byteLength < 5);
            }, params, id)) {
                return;
            }
            bodyData.set(details.url, details.requestBody.raw[0].bytes);
        }));
        this.interceptorsIDs.add((0, background_services_listeners_1.setBGInterceptor)(types_background_common_1.BGListenerType.OnBeforeSendHeaders, (id, params, isMatched) => {
            const details = params.listenerParams[0];
            const { href } = new URL(details.url);
            if (!isMatched(() => !(urlsProcessing.has(details.url)
                || details.method !== 'POST'
                || !microsoft_defender_watchers_1.microsoftDefenderPostsUrls.some(p => href.indexOf(p) > -1)
                || !bodyData.has(details.url)
                || !details.requestHeaders), params, id)) {
                return;
            }
            const bodyBytes = bodyData.get(details.url);
            const bodyStr = new TextDecoder().decode(bodyBytes);
            urlsProcessing.add(details.url);
            const removeAttached = () => {
                urlsProcessing.delete(details.url);
                bodyData.delete(details.url);
            };
            MicrosoftDefenderPlatform.sendLoading(details.tabId, true);
            Http_1.http.post({
                url: details.url,
                body: bodyBytes,
                headers: details.requestHeaders.reduce((res, header) => {
                    res[header.name] = header.value;
                    return res;
                }, {}),
            }, {
                onJSONSuccess: (response) => {
                    const parsedResponse = this.parseResponse(response);
                    (0, background_services_1.sendMessageFromBackground)(details.tabId, {
                        id: `parsed-response--${(0, helpers_1.uuid)()}`,
                        type: types_app_messages_1.MessageToApp.AppTakeNewResourceData,
                        payload: {
                            services: (0, background_services_1.normalizeParsedResource)(parsedResponse.services),
                            assets: (0, background_services_1.normalizeParsedResource)(parsedResponse.assets),
                            accounts: (0, background_services_1.normalizeParsedResource)(parsedResponse.accounts),
                        },
                    });
                    this.lastResponse = response;
                    removeAttached();
                },
                onError: (e) => {
                    loggers
                        .error()
                        .addPrefix('failed webRequest post')
                        .log(e, details.method, details.url, bodyStr);
                    MicrosoftDefenderPlatform.sendLoading(details.tabId, false);
                    removeAttached();
                },
            });
        }));
        loggers.debug().log('registered');
    }
    unregister() {
        super.unregister();
        loggers.debug().log('unregistered');
    }
}
exports.MicrosoftDefenderPlatform = MicrosoftDefenderPlatform;
MicrosoftDefenderPlatform.id = types_common_1.PlatformID.MicrosoftDefender;


/***/ }),

/***/ "./extension/background/platforms/microsoft-defender-for-endpoint/microsoft-defender-watchers.ts":
/*!*******************************************************************************************************!*\
  !*** ./extension/background/platforms/microsoft-defender-for-endpoint/microsoft-defender-watchers.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.microsoftDefenderPostsUrls = exports.microsoftDefenderWatchers = void 0;
exports.microsoftDefenderWatchers = {
    'accounts': [
        'AccountName',
    ],
    'assets': [
        'DeviceName',
    ],
    'services': [],
};
exports.microsoftDefenderPostsUrls = [
    'https://api-eu.securitycenter.windows.com/api/',
    'https://security.microsoft.com/apiproxy/mtp/huntingService/queryExecutor',
];


/***/ }),

/***/ "./extension/background/platforms/microsoft-sentinel/MicrosoftSentinelPlatform.ts":
/*!****************************************************************************************!*\
  !*** ./extension/background/platforms/microsoft-sentinel/MicrosoftSentinelPlatform.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MicrosoftSentinelPlatform = void 0;
const types_background_common_1 = __webpack_require__(/*! ../../types/types-background-common */ "./extension/background/types/types-background-common.ts");
const types_common_1 = __webpack_require__(/*! ../../../common/types/types-common */ "./extension/common/types/types-common.ts");
const background_services_listeners_1 = __webpack_require__(/*! ../../services/background-services-listeners */ "./extension/background/services/background-services-listeners.ts");
const loggers_debug_1 = __webpack_require__(/*! ../../../common/loggers/loggers-debug */ "./extension/common/loggers/loggers-debug.ts");
const AbstractPlatform_1 = __webpack_require__(/*! ../AbstractPlatform */ "./extension/background/platforms/AbstractPlatform.ts");
const microsoft_sentinel_watchers_1 = __webpack_require__(/*! ./microsoft-sentinel-watchers */ "./extension/background/platforms/microsoft-sentinel/microsoft-sentinel-watchers.ts");
const background_platforms_helpers_1 = __webpack_require__(/*! ../background-platforms-helpers */ "./extension/background/platforms/background-platforms-helpers.ts");
const background_services_1 = __webpack_require__(/*! ../../services/background-services */ "./extension/background/services/background-services.ts");
const types_app_messages_1 = __webpack_require__(/*! ../../../app/types/types-app-messages */ "./extension/app/types/types-app-messages.ts");
const types_app_common_1 = __webpack_require__(/*! ../../../app/types/types-app-common */ "./extension/app/types/types-app-common.ts");
const Http_1 = __webpack_require__(/*! ../../../../common/Http */ "./common/Http.ts");
const helpers_1 = __webpack_require__(/*! ../../../../common/helpers */ "./common/helpers.ts");
const loggers = (__webpack_require__(/*! ../../../common/loggers */ "./extension/common/loggers/index.ts").loggers.addPrefix)((0, loggers_debug_1.getDebugPrefix)('background'))
    .addPrefix(types_common_1.PlatformID.MicrosoftSentinel);
class MicrosoftSentinelPlatform extends AbstractPlatform_1.AbstractPlatform {
    constructor() {
        super();
        this.watchingResources = microsoft_sentinel_watchers_1.microsoftSentinelWatchers;
        this.emptyFieldValue = '-';
    }
    static sendLoading(tabID, loading) {
        (0, background_services_1.sendMessageFromBackground)(tabID, {
            type: types_app_messages_1.MessageToApp.AppSetLoadingState,
            payload: {
                loading,
                key: types_app_common_1.LoadingKey.resourcesAdding,
            },
        });
    }
    getID() {
        return MicrosoftSentinelPlatform.id;
    }
    register() {
        const urlsProcessing = new Set();
        const bodyData = new Map();
        this.interceptorsIDs.add((0, background_services_listeners_1.setBGInterceptor)(types_background_common_1.BGListenerType.OnBeforeRequest, (id, params, isMatched) => {
            const details = params.listenerParams[0];
            const { href } = new URL(details.url);
            if (!isMatched(() => {
                var _a, _b, _c, _d, _e;
                return !(urlsProcessing.has(details.url)
                    || details.method !== 'POST'
                    || !microsoft_sentinel_watchers_1.microsoftSentinelPostsUrls.some(p => href.indexOf(p) > -1)
                    || !((_d = (_c = (_b = (_a = details.requestBody) === null || _a === void 0 ? void 0 : _a.raw) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.bytes) === null || _d === void 0 ? void 0 : _d.byteLength)
                    || ((_e = details.requestBody) === null || _e === void 0 ? void 0 : _e.raw[0].bytes.byteLength) < 5);
            }, params, id)) {
                return;
            }
            bodyData.set(details.url, details.requestBody.raw[0].bytes);
        }));
        this.interceptorsIDs.add((0, background_services_listeners_1.setBGInterceptor)(types_background_common_1.BGListenerType.OnBeforeSendHeaders, (id, params, isMatched) => {
            const details = params.listenerParams[0];
            const { href } = new URL(details.url);
            if (!isMatched(() => !(urlsProcessing.has(details.url)
                || details.method !== 'POST'
                || !microsoft_sentinel_watchers_1.microsoftSentinelPostsUrls.some(p => href.indexOf(p) > -1)
                || !bodyData.has(details.url)
                || !details.requestHeaders), params, id)) {
                return;
            }
            urlsProcessing.add(details.url);
            const removeAttached = () => {
                urlsProcessing.delete(details.url);
                bodyData.delete(details.url);
            };
            const bodyBytes = bodyData.get(details.url);
            const bodyStr = new TextDecoder().decode(bodyBytes);
            MicrosoftSentinelPlatform.sendLoading(details.tabId, true);
            Http_1.http.post({
                url: details.url,
                body: bodyBytes,
                headers: details.requestHeaders.reduce((res, header) => {
                    res[header.name] = header.value;
                    return res;
                }, {}),
            }, {
                onJSONSuccess: (response) => {
                    const parsedResponse = this.parseResponse(response);
                    (0, background_services_1.sendMessageFromBackground)(details.tabId, {
                        id: `parsed-response--${(0, helpers_1.uuid)()}`,
                        type: types_app_messages_1.MessageToApp.AppTakeNewResourceData,
                        payload: {
                            services: (0, background_services_1.normalizeParsedResource)(parsedResponse.services),
                            assets: (0, background_services_1.normalizeParsedResource)(parsedResponse.assets),
                            accounts: (0, background_services_1.normalizeParsedResource)(parsedResponse.accounts),
                        },
                    });
                    this.lastResponse = response;
                    removeAttached();
                },
                onError: (e) => {
                    loggers
                        .error()
                        .addPrefix('failed webRequest post')
                        .log(e, details.method, details.url, bodyStr);
                    removeAttached();
                    MicrosoftSentinelPlatform.sendLoading(details.tabId, false);
                },
            });
        }));
        loggers.debug().log('registered');
    }
    unregister() {
        super.unregister();
        loggers.debug().log('unregistered');
    }
    parseResponse(response) {
        var _a, _b, _c, _d;
        const id = (0, helpers_1.uuid)();
        loggers.debug().log('started parse response...', id, this.watchingResources);
        const results = {
            'assets': {},
            'accounts': {},
            'services': {},
        };
        const { mapFieldNameToType, fieldsNames } = (0, background_platforms_helpers_1.getNormalizedWatchers)(this.watchingResources);
        const mappedFieldNamesToIndex = (((_b = (_a = response === null || response === void 0 ? void 0 : response.tables) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.columns) || [])
            .reduce((map, d, index) => {
            map.set(d.name, index);
            return map;
        }, new Map()) || new Map();
        (((_d = (_c = response === null || response === void 0 ? void 0 : response.tables) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.rows) || []).forEach((row) => {
            Array.from(fieldsNames).forEach(fieldName => {
                if (mappedFieldNamesToIndex.has(fieldName)) {
                    const types = mapFieldNameToType.get(fieldName);
                    types.forEach(t => {
                        this.addValueToResource(results[t], fieldName, row[mappedFieldNamesToIndex.get(fieldName)]);
                    });
                }
            });
        });
        loggers.debug().log('finished parse response', id);
        return {
            services: results.services,
            accounts: results.accounts,
            assets: results.assets,
        };
    }
}
exports.MicrosoftSentinelPlatform = MicrosoftSentinelPlatform;
MicrosoftSentinelPlatform.id = types_common_1.PlatformID.MicrosoftSentinel;


/***/ }),

/***/ "./extension/background/platforms/microsoft-sentinel/microsoft-sentinel-watchers.ts":
/*!******************************************************************************************!*\
  !*** ./extension/background/platforms/microsoft-sentinel/microsoft-sentinel-watchers.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.microsoftSentinelPostsUrls = exports.microsoftSentinelWatchers = void 0;
exports.microsoftSentinelWatchers = {
    'accounts': [
        'UserName',
        'Account',
        'SubjectUserName',
        'TargetUserName',
    ],
    'assets': [
        'Computer',
    ],
    'services': [],
};
exports.microsoftSentinelPostsUrls = [
    'https://api.loganalytics.io',
];


/***/ }),

/***/ "./extension/background/platforms/splunk/SplunkPlatform.ts":
/*!*****************************************************************!*\
  !*** ./extension/background/platforms/splunk/SplunkPlatform.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SplunkPlatform = void 0;
const AbstractPlatform_1 = __webpack_require__(/*! ../AbstractPlatform */ "./extension/background/platforms/AbstractPlatform.ts");
const types_common_1 = __webpack_require__(/*! ../../../common/types/types-common */ "./extension/common/types/types-common.ts");
const loggers_debug_1 = __webpack_require__(/*! ../../../common/loggers/loggers-debug */ "./extension/common/loggers/loggers-debug.ts");
const background_services_listeners_1 = __webpack_require__(/*! ../../services/background-services-listeners */ "./extension/background/services/background-services-listeners.ts");
const types_background_common_1 = __webpack_require__(/*! ../../types/types-background-common */ "./extension/background/types/types-background-common.ts");
const splunk_watchers_1 = __webpack_require__(/*! ./splunk-watchers */ "./extension/background/platforms/splunk/splunk-watchers.ts");
const Http_1 = __webpack_require__(/*! ../../../../common/Http */ "./common/Http.ts");
const helpers_1 = __webpack_require__(/*! ../../../../common/helpers */ "./common/helpers.ts");
const background_platforms_helpers_1 = __webpack_require__(/*! ../background-platforms-helpers */ "./extension/background/platforms/background-platforms-helpers.ts");
const background_services_1 = __webpack_require__(/*! ../../services/background-services */ "./extension/background/services/background-services.ts");
const types_app_messages_1 = __webpack_require__(/*! ../../../app/types/types-app-messages */ "./extension/app/types/types-app-messages.ts");
const types_app_common_1 = __webpack_require__(/*! ../../../app/types/types-app-common */ "./extension/app/types/types-app-common.ts");
const loggers = (__webpack_require__(/*! ../../../common/loggers */ "./extension/common/loggers/index.ts").loggers.addPrefix)((0, loggers_debug_1.getDebugPrefix)('background'))
    .addPrefix(types_common_1.PlatformID.Splunk);
class SplunkPlatform extends AbstractPlatform_1.AbstractPlatform {
    constructor() {
        super();
        this.watchingResources = splunk_watchers_1.splunkWatchers;
        this.emptyFieldValue = '-';
    }
    static sendLoading(tabID, loading) {
        (0, background_services_1.sendMessageFromBackground)(tabID, {
            type: types_app_messages_1.MessageToApp.AppSetLoadingState,
            payload: {
                loading,
                key: types_app_common_1.LoadingKey.resourcesAdding,
            },
        });
    }
    static sendParsedData(tabID, parsedResponse, isNew = false) {
        (0, background_services_1.sendMessageFromBackground)(tabID, {
            id: `parsed-response--${(0, helpers_1.uuid)()}`,
            type: isNew ? types_app_messages_1.MessageToApp.AppTakeNewResourceData : types_app_messages_1.MessageToApp.AppTakeResourceData,
            payload: {
                services: (0, background_services_1.normalizeParsedResource)(parsedResponse.services),
                assets: (0, background_services_1.normalizeParsedResource)(parsedResponse.assets),
                accounts: (0, background_services_1.normalizeParsedResource)(parsedResponse.accounts),
            },
        });
    }
    getID() {
        return SplunkPlatform.id;
    }
    parseContent() {
        const results = {
            'assets': {},
            'accounts': {},
            'services': {},
        };
        return {
            accounts: results.accounts,
            assets: results.assets,
            services: results.services,
        };
    }
    parseSummary(response) {
        const results = {
            'assets': {},
            'accounts': {},
            'services': {},
        };
        const { mapFieldNameToType, fieldsNames } = (0, background_platforms_helpers_1.getNormalizedWatchers)(this.watchingResources);
        const fields = (response === null || response === void 0 ? void 0 : response.fields) || {};
        if (Object.keys(fields).length > 0) {
            Array.from(fieldsNames).forEach(fieldName => {
                var _a, _b;
                if (fields === null || fields === void 0 ? void 0 : fields[fieldName]) {
                    const distinctValues = ((_b = (_a = fields[fieldName]) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.map(m => m === null || m === void 0 ? void 0 : m.value)) || [];
                    if (distinctValues.length < 1) {
                        return;
                    }
                    const types = mapFieldNameToType.get(fieldName);
                    types.forEach(t => {
                        distinctValues.forEach(v => {
                            this.addValueToResource(results[t], fieldName, v);
                        });
                    });
                }
            });
        }
        return {
            accounts: results.accounts,
            assets: results.assets,
            services: results.services,
        };
    }
    parseStatistic(response) {
        const results = {
            'assets': {},
            'accounts': {},
            'services': {},
        };
        const { mapFieldNameToType, fieldsNames } = (0, background_platforms_helpers_1.getNormalizedWatchers)(this.watchingResources);
        ((response === null || response === void 0 ? void 0 : response.rows) || []).forEach(row => {
            row.forEach((fieldsValues, index) => {
                var _a, _b;
                const fieldName = (_b = (_a = response === null || response === void 0 ? void 0 : response.fields) === null || _a === void 0 ? void 0 : _a[index]) === null || _b === void 0 ? void 0 : _b.name;
                if (!fieldName || !fieldsNames.has(fieldName)) {
                    return;
                }
                const types = mapFieldNameToType.get(fieldName);
                types.forEach(t => {
                    if (Array.isArray(fieldsValues)) {
                        fieldsValues.forEach(v => {
                            this.addValueToResource(results[t], fieldName, v);
                        });
                    }
                    else {
                        this.addValueToResource(results[t], fieldName, fieldsValues);
                    }
                });
            });
        });
        return {
            accounts: results.accounts,
            assets: results.assets,
            services: results.services,
        };
    }
    parseResponse(response) {
        const id = (0, helpers_1.uuid)();
        loggers.debug().log('started parse response...', id, this.watchingResources);
        const parsedResult = (response === null || response === void 0 ? void 0 : response.rows)
            ? this.parseStatistic(response)
            : this.parseSummary(response);
        loggers.debug().log('finished parse response', id);
        return parsedResult;
    }
    register() {
        let currentJobID = '';
        let countRequests = 0;
        let timeoutID;
        const urlsProcessing = new Set();
        this.interceptorsIDs.add((0, background_services_listeners_1.setBGInterceptor)(types_background_common_1.BGListenerType.OnBeforeSendHeaders, (id, params, isMatched) => {
            const details = params.listenerParams[0];
            const { href } = new URL(details.url);
            if (isMatched(() => {
                if (details.method !== 'GET' || urlsProcessing.has(href)) {
                    return false;
                }
                const jobID = (0, splunk_watchers_1.matchSplunkSummaryUrl)(href);
                if (jobID && jobID === currentJobID) {
                    SplunkPlatform.sendLoading(details.tabId, true);
                    countRequests++;
                }
                if (!jobID || jobID === currentJobID) {
                    return false;
                }
                clearTimeout(timeoutID);
                countRequests = 0;
                currentJobID = jobID;
                return true;
            }, params, id)) {
                const urlDetails = new URL(details.url);
                urlDetails.searchParams.set('top_count', '9999999999');
                urlDetails.searchParams.set('output_mode', 'json');
                urlDetails.searchParams.delete('_');
                urlsProcessing.add(urlDetails.href);
                const cleanArtifacts = () => {
                    currentJobID = '';
                    countRequests = 0;
                    urlsProcessing.delete(urlDetails.href);
                };
                const getData = (isFirst = false) => {
                    SplunkPlatform.sendLoading(details.tabId, true);
                    const totalRequests = countRequests;
                    Http_1.http.get({
                        url: urlDetails.href,
                        headers: details.requestHeaders.reduce((res, header) => {
                            res[header.name] = header.value;
                            return res;
                        }, {}),
                    }, {
                        onJSONSuccess: (response) => {
                            SplunkPlatform.sendParsedData(details.tabId, this.parseResponse(response), isFirst);
                            this.lastResponse = response;
                            timeoutID = setTimeout(() => {
                                if (countRequests > totalRequests) {
                                    getData();
                                }
                                else {
                                    cleanArtifacts();
                                }
                            }, 3000);
                        },
                        onError: (e) => {
                            loggers.error().log(e, details.url);
                            clearTimeout(timeoutID);
                            cleanArtifacts();
                            SplunkPlatform.sendLoading(details.tabId, false);
                        },
                    });
                };
                timeoutID = setTimeout(() => {
                    getData(true);
                }, 1000);
            }
        }, () => {
            clearTimeout(timeoutID);
        }));
        this.interceptorsIDs.add((0, background_services_listeners_1.setBGInterceptor)(types_background_common_1.BGListenerType.OnBeforeSendHeaders, (id, params, isMatched) => {
            const details = params.listenerParams[0];
            const { href } = new URL(details.url);
            if (isMatched(() => {
                if (details.method !== 'GET' || urlsProcessing.has(href)) {
                    return false;
                }
                const jobID = (0, splunk_watchers_1.matchSplunkResultsUrl)(href);
                if (jobID && jobID === currentJobID) {
                    SplunkPlatform.sendLoading(details.tabId, true);
                    countRequests++;
                }
                if (!jobID || jobID === currentJobID) {
                    return false;
                }
                clearTimeout(timeoutID);
                countRequests = 0;
                currentJobID = jobID;
                return true;
            }, params, id)) {
                const urlDetails = new URL(details.url);
                urlDetails.searchParams.set('count', '9999999999');
                urlDetails.searchParams.set('show_metadata', 'true');
                urlDetails.searchParams.set('offset', '0');
                urlDetails.searchParams.set('output_mode', 'json_rows');
                urlDetails.searchParams.delete('_');
                urlsProcessing.add(urlDetails.href);
                const cleanArtifacts = () => {
                    currentJobID = '';
                    countRequests = 0;
                    urlsProcessing.delete(urlDetails.href);
                };
                const getData = (isFirst = false) => {
                    SplunkPlatform.sendLoading(details.tabId, true);
                    const totalRequests = countRequests;
                    Http_1.http.get({
                        url: urlDetails.href,
                        headers: details.requestHeaders.reduce((res, header) => {
                            res[header.name] = header.value;
                            return res;
                        }, {}),
                    }, {
                        onJSONSuccess: (response) => {
                            SplunkPlatform.sendParsedData(details.tabId, this.parseResponse(response), isFirst);
                            this.lastResponse = response;
                            timeoutID = setTimeout(() => {
                                if (countRequests > totalRequests) {
                                    getData();
                                }
                                else {
                                    cleanArtifacts();
                                }
                            }, 3000);
                        },
                        onError: (e) => {
                            loggers.error().log(e, details.url);
                            clearTimeout(timeoutID);
                            cleanArtifacts();
                            SplunkPlatform.sendLoading(details.tabId, false);
                        },
                    });
                };
                timeoutID = setTimeout(() => {
                    getData(true);
                }, 1000);
            }
        }, () => {
            clearTimeout(timeoutID);
        }));
        loggers.debug().log('registered');
    }
    unregister() {
        super.unregister();
        loggers.debug().log('unregistered');
    }
}
exports.SplunkPlatform = SplunkPlatform;
SplunkPlatform.id = types_common_1.PlatformID.Splunk;


/***/ }),

/***/ "./extension/background/platforms/splunk/splunk-watchers.ts":
/*!******************************************************************!*\
  !*** ./extension/background/platforms/splunk/splunk-watchers.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.matchSplunkResultsUrl = exports.matchSplunkSummaryUrl = exports.splunkWatchers = void 0;
const helpers_1 = __webpack_require__(/*! ../../../../common/helpers */ "./common/helpers.ts");
const checkers_1 = __webpack_require__(/*! ../../../../common/checkers */ "./common/checkers.ts");
const envs_1 = __webpack_require__(/*! ../../../common/envs */ "./extension/common/envs.ts");
exports.splunkWatchers = {
    accounts: (0, helpers_1.deduplicateArray)([
        'src_user',
        'src_user_bunit',
        'user',
        'Account_Name',
        'User',
        'src_user_name',
        'user_name',
    ]),
    assets: (0, helpers_1.deduplicateArray)([
        'dest_host',
        'dst',
        'dest_nt_host',
        'src_host',
        'src_nt_host',
        'src',
        'dest',
        'dest_name',
        'dest_host',
        'dvc',
        'dvc_host',
        'dest_dns',
        'src_dns',
        'ComputerName',
        'DestinationHostname',
        'SourceHostname',
    ]),
    services: [],
};
const matchSplunkSummaryUrl = (url) => {
    var _a;
    const { protocol, href } = new URL(url);
    if (!(0, checkers_1.isAllowedProtocol)(protocol, envs_1.mode)) {
        return undefined;
    }
    return (_a = href.match(/\/search\/jobs\/([.0-9]+)\/summary/)) === null || _a === void 0 ? void 0 : _a[1];
};
exports.matchSplunkSummaryUrl = matchSplunkSummaryUrl;
const matchSplunkResultsUrl = (url) => {
    var _a;
    const { protocol, href } = new URL(url);
    if (!(0, checkers_1.isAllowedProtocol)(protocol, envs_1.mode)) {
        return undefined;
    }
    return (_a = href.match(/\/search\/jobs\/([.0-9]+)\/results/)) === null || _a === void 0 ? void 0 : _a[1];
};
exports.matchSplunkResultsUrl = matchSplunkResultsUrl;


/***/ }),

/***/ "./extension/background/services/background-services-listeners.ts":
/*!************************************************************************!*\
  !*** ./extension/background/services/background-services-listeners.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addListener = exports.removeBGInterceptor = exports.setBGInterceptor = exports.isBGInterceptorMatched = exports.interceptors = void 0;
const types_background_common_1 = __webpack_require__(/*! ../types/types-background-common */ "./extension/background/types/types-background-common.ts");
const common_helpers_1 = __webpack_require__(/*! ../../common/common-helpers */ "./extension/common/common-helpers.ts");
const types_1 = __webpack_require__(/*! ../../../common/types */ "./common/types.ts");
const helpers_1 = __webpack_require__(/*! ../../../common/helpers */ "./common/helpers.ts");
const loggers_debug_1 = __webpack_require__(/*! ../../common/loggers/loggers-debug */ "./extension/common/loggers/loggers-debug.ts");
const api_support_1 = __webpack_require__(/*! ../../common/api-support */ "./extension/common/api-support.ts");
const loggers = (__webpack_require__(/*! ../../common/loggers */ "./extension/common/loggers/index.ts").loggers.addPrefix)((0, loggers_debug_1.getDebugPrefix)('background'))
    .addPrefix('listeners');
const listeners = {};
exports.interceptors = {};
listeners[types_background_common_1.BGListenerType.OnMessage] = (listener, ...otherProps) => {
    if ((0, api_support_1.isRuntimeOnMessageSupported)()) {
        (0, common_helpers_1.getBrowserContext)().runtime.onMessage.addListener(listener, ...otherProps);
    }
    if (!(0, api_support_1.isRuntimeOnMessageExternalSupported)()) {
        return;
    }
    const boundedListener = (...params) => {
        const message = params[0];
        const info = params[1];
        if (new URL(info.url).origin !== info.origin
            || message.externalType !== loggers_debug_1.DebugID.debugIDExternal) {
            return;
        }
        listener(...params);
    };
    (0, common_helpers_1.getBrowserContext)().runtime.onMessageExternal.addListener(boundedListener);
};
listeners[types_background_common_1.BGListenerType.OnBrowserTabRemoved] = (listener, ...otherProps) => {
    if (!(0, api_support_1.isTabsOnRemovedSupported)()) {
        return;
    }
    (0, common_helpers_1.getBrowserContext)().tabs.onRemoved.addListener(listener, ...otherProps);
};
listeners[types_background_common_1.BGListenerType.OnExtensionIconClicked] = (listener, ...otherProps) => {
    const context = (0, common_helpers_1.getBrowserContext)();
    const contextAction = typeof context.action !== 'undefined' ? 'action' : 'browserAction';
    if (contextAction === 'action' && !(0, api_support_1.isActionOnClickedSupported)()) {
        return;
    }
    if (contextAction === 'browserAction' && !(0, api_support_1.isBrowserActionOnClickedSupported)()) {
        return;
    }
    context[contextAction].onClicked.addListener(listener, ...otherProps);
};
listeners[types_background_common_1.BGListenerType.OnBeforeRequest] = (listener, ...otherProps) => {
    if (!(0, api_support_1.isOnBeforeRequestSupported)()) {
        return;
    }
    (0, common_helpers_1.getBrowserContext)().webRequest.onBeforeRequest.addListener(listener, ...otherProps);
};
listeners[types_background_common_1.BGListenerType.OnBeforeSendHeaders] = (listener, ...otherProps) => {
    if (!(0, api_support_1.isOnBeforeSendHeadersSupported)()) {
        return;
    }
    (0, common_helpers_1.getBrowserContext)().webRequest.onBeforeSendHeaders.addListener(listener, ...otherProps);
};
const isBGInterceptorMatched = (type, matchCondition, ...otherInfo) => {
    if (matchCondition()) {
        loggers
            .debug()
            .log(`intercepted ${type}`, ...otherInfo);
        return true;
    }
    return false;
};
exports.isBGInterceptorMatched = isBGInterceptorMatched;
const setBGInterceptor = (type, interceptor, onUnregister) => {
    const identifiedInterceptor = (0, types_1.mapType)(interceptor);
    identifiedInterceptor.id = (0, helpers_1.uuid)();
    if (typeof onUnregister === 'function') {
        identifiedInterceptor.unregister = onUnregister;
    }
    exports.interceptors[type] = [
        ...(exports.interceptors[type] || []),
        identifiedInterceptor,
    ];
    return identifiedInterceptor.id;
};
exports.setBGInterceptor = setBGInterceptor;
const removeBGInterceptor = (id, type) => {
    (type ? [type] : Object.keys(exports.interceptors)).forEach((t) => {
        exports.interceptors[t] = exports.interceptors[t].filter(interceptor => {
            if (interceptor.id === id && typeof interceptor.unregister === 'function') {
                interceptor.unregister();
            }
            return interceptor.id !== id;
        });
    });
};
exports.removeBGInterceptor = removeBGInterceptor;
const addListener = (type, listener, ...otherProps) => {
    var _a;
    (_a = listeners[type]) === null || _a === void 0 ? void 0 : _a.call(listeners, (...params) => {
        (exports.interceptors[type] || []).forEach(interceptor => {
            if (!interceptor || typeof interceptor !== 'function') {
                return;
            }
            interceptor(interceptor.id, {
                listenerParams: params,
                createListenerParams: [listener, ...otherProps],
            }, (matchCondition, ...otherInfo) => (0, exports.isBGInterceptorMatched)(type, matchCondition, ...otherInfo));
        });
        listener(...params);
    }, ...otherProps);
};
exports.addListener = addListener;


/***/ }),

/***/ "./extension/background/services/background-services.ts":
/*!**************************************************************!*\
  !*** ./extension/background/services/background-services.ts ***!
  \**************************************************************/
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
exports.waitBGMessage = exports.registerPlatformsOnOpenedTabs = exports.unregisterPlatformTabs = exports.registerPlatformTab = exports.normalizeParsedResource = exports.sendMessageFromBackground = void 0;
const types_background_common_1 = __webpack_require__(/*! ../types/types-background-common */ "./extension/background/types/types-background-common.ts");
const common_helpers_1 = __webpack_require__(/*! ../../common/common-helpers */ "./extension/common/common-helpers.ts");
const PlatformResolver_1 = __webpack_require__(/*! ../platforms/PlatformResolver */ "./extension/background/platforms/PlatformResolver.ts");
const PlatformResolver_2 = __webpack_require__(/*! ../../content/platforms/PlatformResolver */ "./extension/content/platforms/PlatformResolver.ts");
const background_services_listeners_1 = __webpack_require__(/*! ./background-services-listeners */ "./extension/background/services/background-services-listeners.ts");
const loggers_debug_1 = __webpack_require__(/*! ../../common/loggers/loggers-debug */ "./extension/common/loggers/loggers-debug.ts");
const helpers_1 = __webpack_require__(/*! ../../../common/helpers */ "./common/helpers.ts");
const api_support_1 = __webpack_require__(/*! ../../common/api-support */ "./extension/common/api-support.ts");
const loggers = (__webpack_require__(/*! ../../common/loggers */ "./extension/common/loggers/index.ts").loggers.addPrefix)((0, loggers_debug_1.getDebugPrefix)('background'))
    .addPrefix('services');
const sendMessageFromBackground = (tabID, message) => {
    var _a;
    const context = (0, common_helpers_1.getBrowserContext)();
    message.id = message.id || (0, helpers_1.uuid)();
    if (!(0, api_support_1.isTabsSendMessageSupported)(message, tabID)) {
        return;
    }
    const logPrefix = 'sendMessageFromBackground';
    try {
        (_a = context.tabs.sendMessage(tabID, message)) === null || _a === void 0 ? void 0 : _a.catch((e) => loggers.error().addPrefix(logPrefix).log(e, message));
        loggers.debug().addPrefix(logPrefix).log(message);
    }
    catch (e) {
        loggers.error().addPrefix(logPrefix).log(e, message);
    }
};
exports.sendMessageFromBackground = sendMessageFromBackground;
const normalizeParsedResource = (parsedResource) => {
    const result = {};
    Object.keys(parsedResource || {})
        .forEach(fieldName => {
        result[fieldName] = Array.from(parsedResource[fieldName]);
    });
    return result;
};
exports.normalizeParsedResource = normalizeParsedResource;
const registeredPlatforms = new Map();
const registerPlatformTab = (platformID, tabID) => {
    if (!tabID) {
        return loggers.warn().log('No tab id for register', platformID);
    }
    const platform = PlatformResolver_1.platformResolver.resolve(platformID);
    const alreadyRegisteredPlatformID = registeredPlatforms.get(tabID);
    if (!platform
        || alreadyRegisteredPlatformID === platformID) {
        return;
    }
    platform.register();
    registeredPlatforms.set(tabID, platformID);
    loggers.debug().log('registered platform tab', platformID, tabID);
};
exports.registerPlatformTab = registerPlatformTab;
const isExistPlatformTab = (platformID) => Array.from(registeredPlatforms).some(([, id]) => id === platformID);
const unregisterPlatformTabs = (tabsIDs) => {
    const deletedPlatformIDs = (tabsIDs || []).reduce((ids, tabID) => {
        if (!tabID) {
            return loggers.warn().log('No tab id for unregister', tabID);
        }
        const platformID = registeredPlatforms.get(tabID);
        if (platformID) {
            ids.add(platformID);
            registeredPlatforms.delete(tabID);
            loggers.debug().log('unregistered platform tab', tabID);
        }
        return ids;
    }, new Set());
    Array.from(deletedPlatformIDs).forEach(platformID => {
        if (isExistPlatformTab(platformID)) {
            return;
        }
        const platform = PlatformResolver_1.platformResolver.resolve(platformID);
        if (!platform) {
            return loggers.warn().log('can not resolve platform for unregister', platformID);
        }
        platform.unregister();
    });
    if (registeredPlatforms.size < 1) {
        loggers.info().log('there are no platforms tabs left');
    }
};
exports.unregisterPlatformTabs = unregisterPlatformTabs;
const registerPlatformsOnOpenedTabs = () => {
    const context = (0, common_helpers_1.getBrowserContext)();
    if (!(0, api_support_1.isTabsQuerySupported)()) {
        return;
    }
    context.tabs.query({}, (tabs) => {
        tabs.forEach(tab => {
            if (!(tab === null || tab === void 0 ? void 0 : tab.url)) {
                return;
            }
            const platform = PlatformResolver_2.PlatformResolver.resolveByUrl(tab.url);
            if (platform) {
                (0, exports.registerPlatformTab)(platform.getID(), tab.id);
            }
        });
    });
};
exports.registerPlatformsOnOpenedTabs = registerPlatformsOnOpenedTabs;
const waitBGMessage = (type) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        (0, background_services_listeners_1.setBGInterceptor)(types_background_common_1.BGListenerType.OnMessage, (id, params, isMatched) => {
            const message = params.listenerParams[0];
            if (isMatched(() => message.type === type, message, params, id)) {
                resolve(message.payload);
                (0, background_services_listeners_1.removeBGInterceptor)(id, types_background_common_1.BGListenerType.OnMessage);
            }
        });
    });
});
exports.waitBGMessage = waitBGMessage;


/***/ }),

/***/ "./extension/background/types/types-background-common.ts":
/*!***************************************************************!*\
  !*** ./extension/background/types/types-background-common.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BGListenerType = void 0;
var BGListenerType;
(function (BGListenerType) {
    BGListenerType["OnMessage"] = "OnMessage";
    BGListenerType["OnBeforeRequest"] = "OnBeforeRequest";
    BGListenerType["OnBrowserTabRemoved"] = "OnBrowserTabRemoved";
    BGListenerType["OnBeforeSendHeaders"] = "OnBeforeSendHeaders";
    BGListenerType["OnExtensionIconClicked"] = "OnExtensionIconClicked";
})(BGListenerType = exports.BGListenerType || (exports.BGListenerType = {}));


/***/ }),

/***/ "./extension/background/types/types-background-messages.ts":
/*!*****************************************************************!*\
  !*** ./extension/background/types/types-background-messages.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageToBackground = void 0;
const common_helpers_1 = __webpack_require__(/*! ../../common/common-helpers */ "./extension/common/common-helpers.ts");
var MessageToBackground;
(function (MessageToBackground) {
    MessageToBackground["BGRunClearData"] = "BGRunClearData";
    MessageToBackground["BGModifyQuery"] = "BGModifyQuery";
    MessageToBackground["BGSetWatchers"] = "BGSetWatchers";
    MessageToBackground["BGRegisterPlatformTab"] = "BGRegisterPlatformTab";
    MessageToBackground["BGAddFieldToWatch"] = "BGAddFieldToWatch";
})(MessageToBackground = exports.MessageToBackground || (exports.MessageToBackground = {}));
Object.values(MessageToBackground).forEach(type => {
    if ((0, common_helpers_1.getExecutingContextByMessageType)(type) !== 'background') {
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

/***/ "./extension/content/platforms/PlatformResolver.ts":
/*!*********************************************************!*\
  !*** ./extension/content/platforms/PlatformResolver.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.platformResolver = exports.PlatformResolver = void 0;
const MicrosoftSentinelPlatform_1 = __webpack_require__(/*! ./microsoft-sentinel/MicrosoftSentinelPlatform */ "./extension/content/platforms/microsoft-sentinel/MicrosoftSentinelPlatform.ts");
const types_common_1 = __webpack_require__(/*! ../../common/types/types-common */ "./extension/common/types/types-common.ts");
const envs_1 = __webpack_require__(/*! ../../common/envs */ "./extension/common/envs.ts");
const MicrosoftDefenderPlatform_1 = __webpack_require__(/*! ./microsoft-defender-for-endpoint/MicrosoftDefenderPlatform */ "./extension/content/platforms/microsoft-defender-for-endpoint/MicrosoftDefenderPlatform.ts");
const SplunkPlatform_1 = __webpack_require__(/*! ./splunk/SplunkPlatform */ "./extension/content/platforms/splunk/SplunkPlatform.ts");
const checkers_1 = __webpack_require__(/*! ../../../common/checkers */ "./common/checkers.ts");
class PlatformResolver {
    static getPlatform(platformID) {
        switch (platformID) {
            case types_common_1.PlatformID.MicrosoftSentinel: {
                return new MicrosoftSentinelPlatform_1.MicrosoftSentinelPlatform();
            }
            case types_common_1.PlatformID.MicrosoftDefender: {
                return new MicrosoftDefenderPlatform_1.MicrosoftDefenderPlatform();
            }
            case types_common_1.PlatformID.Splunk: {
                return new SplunkPlatform_1.SplunkPlatform();
            }
        }
    }
    static resolveByUrl(url) {
        const { host, protocol, href } = new URL(url);
        if (!(0, checkers_1.isAllowedProtocol)(protocol, envs_1.mode)) {
            return;
        }
        return /(portal.azure.com|reactblade.portal.azure.net|logsextension.hosting.portal.azure.net)$/.test(host)
            ? PlatformResolver.getPlatform(types_common_1.PlatformID.MicrosoftSentinel)
            : /(security.microsoft.com\/)/.test(href)
                ? PlatformResolver.getPlatform(types_common_1.PlatformID.MicrosoftDefender)
                : undefined;
    }
    static resolveByContent() {
        if (document.querySelector('a[aria-label^="splunk"]')) {
            return PlatformResolver.getPlatform(types_common_1.PlatformID.Splunk);
        }
        return undefined;
    }
    resolve() {
        if (envs_1.contentPlatformIDFromENV) {
            return PlatformResolver.getPlatform(envs_1.contentPlatformIDFromENV);
        }
        return PlatformResolver.resolveByUrl(document.location.href)
            || PlatformResolver.resolveByContent();
    }
}
exports.PlatformResolver = PlatformResolver;
exports.platformResolver = new PlatformResolver();


/***/ }),

/***/ "./extension/content/platforms/microsoft-defender-for-endpoint/MicrosoftDefenderPlatform.ts":
/*!**************************************************************************************************!*\
  !*** ./extension/content/platforms/microsoft-defender-for-endpoint/MicrosoftDefenderPlatform.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MicrosoftDefenderPlatform = void 0;
const types_content_common_1 = __webpack_require__(/*! ../../types/types-content-common */ "./extension/content/types/types-content-common.ts");
const loggers_debug_1 = __webpack_require__(/*! ../../../common/loggers/loggers-debug */ "./extension/common/loggers/loggers-debug.ts");
const types_common_1 = __webpack_require__(/*! ../../../common/types/types-common */ "./extension/common/types/types-common.ts");
const content_services_listeners_1 = __webpack_require__(/*! ../../services/content-services-listeners */ "./extension/content/services/content-services-listeners.ts");
const common_helpers_1 = __webpack_require__(/*! ../../../common/common-helpers */ "./extension/common/common-helpers.ts");
const content_services_1 = __webpack_require__(/*! ../../services/content-services */ "./extension/content/services/content-services.ts");
const types_background_messages_1 = __webpack_require__(/*! ../../../background/types/types-background-messages */ "./extension/background/types/types-background-messages.ts");
const common_listeners_1 = __webpack_require__(/*! ../../../common/common-listeners */ "./extension/common/common-listeners.ts");
const types_content_messages_1 = __webpack_require__(/*! ../../types/types-content-messages */ "./extension/content/types/types-content-messages.ts");
const types_inline_messages_1 = __webpack_require__(/*! ../../../inline/types/types-inline-messages */ "./extension/inline/types/types-inline-messages.ts");
const public_resources_1 = __webpack_require__(/*! ../../../manifest/public-resources */ "./extension/manifest/public-resources.ts");
const helpers_1 = __webpack_require__(/*! ../../../../common/helpers */ "./common/helpers.ts");
const loggers = (__webpack_require__(/*! ../../../common/loggers */ "./extension/common/loggers/index.ts").loggers.addPrefix)((0, loggers_debug_1.getDebugPrefix)('content'))
    .addPrefix(types_common_1.PlatformID.MicrosoftDefender);
class MicrosoftDefenderPlatform {
    constructor() {
        this.extensionDefaultPosition = MicrosoftDefenderPlatform.extensionDefaultPosition;
    }
    getID() {
        return MicrosoftDefenderPlatform.id;
    }
    static setListeners() {
        content_services_listeners_1.addListener(types_content_common_1.ListenerType.OnMessage, (message) => {
            if ((0, common_listeners_1.isMessageMatched)(() => types_content_messages_1.MessageToContent.CSModifyQuery === message.type, message)) {
                (0, content_services_1.sendMessageFromContent)(Object.assign(Object.assign({}, message), { id: `${message.id}--content-modify-query`, type: types_inline_messages_1.MessageToInline.ISModifyQuery }), false);
            }
        });
        loggers.debug().log('listeners were set');
    }
    static connectMouseDown() {
        document.addEventListener('mousedown', (e) => {
            var _a, _b;
            if (!e.altKey) {
                return;
            }
            const elements = (0, common_helpers_1.getElementsUnderCursor)(e, elem => {
                return elem.classList.contains('mtk20')
                    || (elem.tagName === 'SPAN'
                        && Array.from(elem.classList).join(',').indexOf('cellName') > -1
                        && !!elem.closest('[role="columnheader"]'));
            });
            const text = elements.length > 1
                ? null
                : (0, common_helpers_1.removeDoubleQuotesAround)(((_b = (_a = elements[0]) === null || _a === void 0 ? void 0 : _a.innerText) === null || _b === void 0 ? void 0 : _b.trim()) || '');
            if (!text) {
                return;
            }
            (0, content_services_1.sendMessageFromContent)({
                id: `content-add-field--${(0, helpers_1.uuid)()}`,
                type: types_background_messages_1.MessageToBackground.BGAddFieldToWatch,
                payload: {
                    fieldName: text,
                },
            });
        });
        loggers.debug().log('mousedown event was set successfully');
    }
    static connectInlineListener() {
        (0, common_helpers_1.mountHTMLElement)('script', document.body, {
            attributes: {
                src: (0, common_helpers_1.getWebAccessibleUrl)(public_resources_1.microsoftDefenderInline),
                type: 'text/javascript',
                'data-type': 'inline-listener',
            },
        });
    }
    connect() {
        MicrosoftDefenderPlatform.setListeners();
        MicrosoftDefenderPlatform.connectMouseDown();
        MicrosoftDefenderPlatform.connectInlineListener();
        loggers.debug().log('connected');
    }
}
exports.MicrosoftDefenderPlatform = MicrosoftDefenderPlatform;
MicrosoftDefenderPlatform.id = types_common_1.PlatformID.MicrosoftDefender;
MicrosoftDefenderPlatform.extensionDefaultPosition = {
    top: 0,
    left: 0,
    width: 480,
    height: 480,
};


/***/ }),

/***/ "./extension/content/platforms/microsoft-sentinel/MicrosoftSentinelPlatform.ts":
/*!*************************************************************************************!*\
  !*** ./extension/content/platforms/microsoft-sentinel/MicrosoftSentinelPlatform.ts ***!
  \*************************************************************************************/
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
exports.MicrosoftSentinelPlatform = void 0;
const types_background_messages_1 = __webpack_require__(/*! ../../../background/types/types-background-messages */ "./extension/background/types/types-background-messages.ts");
const content_services_1 = __webpack_require__(/*! ../../services/content-services */ "./extension/content/services/content-services.ts");
const types_common_1 = __webpack_require__(/*! ../../../common/types/types-common */ "./extension/common/types/types-common.ts");
const types_content_common_1 = __webpack_require__(/*! ../../types/types-content-common */ "./extension/content/types/types-content-common.ts");
const content_services_listeners_1 = __webpack_require__(/*! ../../services/content-services-listeners */ "./extension/content/services/content-services-listeners.ts");
const types_content_messages_1 = __webpack_require__(/*! ../../types/types-content-messages */ "./extension/content/types/types-content-messages.ts");
const common_helpers_1 = __webpack_require__(/*! ../../../common/common-helpers */ "./extension/common/common-helpers.ts");
const types_inline_messages_1 = __webpack_require__(/*! ../../../inline/types/types-inline-messages */ "./extension/inline/types/types-inline-messages.ts");
const loggers_debug_1 = __webpack_require__(/*! ../../../common/loggers/loggers-debug */ "./extension/common/loggers/loggers-debug.ts");
const common_listeners_1 = __webpack_require__(/*! ../../../common/common-listeners */ "./extension/common/common-listeners.ts");
const envs_1 = __webpack_require__(/*! ../../../common/envs */ "./extension/common/envs.ts");
const public_resources_1 = __webpack_require__(/*! ../../../manifest/public-resources */ "./extension/manifest/public-resources.ts");
const microsoft_sentinel_helpers_1 = __webpack_require__(/*! ./microsoft-sentinel-helpers */ "./extension/content/platforms/microsoft-sentinel/microsoft-sentinel-helpers.ts");
const helpers_1 = __webpack_require__(/*! ../../../../common/helpers */ "./common/helpers.ts");
const loggers = (__webpack_require__(/*! ../../../common/loggers */ "./extension/common/loggers/index.ts").loggers.addPrefix)((0, loggers_debug_1.getDebugPrefix)('content'))
    .addPrefix(types_common_1.PlatformID.MicrosoftSentinel);
class MicrosoftSentinelPlatform {
    constructor() {
        this.extensionDefaultPosition = MicrosoftSentinelPlatform.extensionDefaultPosition;
    }
    getID() {
        return MicrosoftSentinelPlatform.id;
    }
    static connectMouseDown() {
        document.addEventListener('mousedown', (e) => {
            var _a, _b;
            if (!e.altKey) {
                return;
            }
            const elements = (0, common_helpers_1.getElementsUnderCursor)(e, elem => {
                return elem.classList.contains('ag-header-cell-text')
                    || elem.classList.contains('ag-group-value');
            });
            const text = elements.length > 1 ? null : (_b = (_a = elements[0]) === null || _a === void 0 ? void 0 : _a.innerText) === null || _b === void 0 ? void 0 : _b.trim();
            if (!text) {
                return;
            }
            (0, content_services_1.sendMessageFromContent)({
                id: `content-add-field--${(0, helpers_1.uuid)()}`,
                type: types_background_messages_1.MessageToBackground.BGAddFieldToWatch,
                payload: {
                    fieldName: (0, microsoft_sentinel_helpers_1.normalizeFieldValue)(text),
                },
            });
        });
        loggers.debug().log('mousedown event was set successfully');
    }
    static connectInlineListener() {
        (0, common_helpers_1.mountHTMLElement)('script', document.body, {
            attributes: {
                src: (0, common_helpers_1.getWebAccessibleUrl)(public_resources_1.microsoftSentinelInline),
                type: 'text/javascript',
                'data-type': 'inline-listener',
            },
        });
    }
    static setListeners() {
        content_services_listeners_1.addListener(types_content_common_1.ListenerType.OnMessage, (message) => __awaiter(this, void 0, void 0, function* () {
            if (!envs_1.contentPlatformIDFromENV
                && !document.querySelector('la-main-view')) {
                return;
            }
            const query = `script[src$="${public_resources_1.microsoftSentinelInline}"]`;
            if (!document.querySelector(query)) {
                MicrosoftSentinelPlatform.connectInlineListener();
                MicrosoftSentinelPlatform.connectMouseDown();
                yield (0, common_helpers_1.waitHTMLElement)(query);
            }
            if ((0, common_listeners_1.isMessageMatched)(() => types_content_messages_1.MessageToContent.CSModifyQuery === message.type, message)) {
                (0, content_services_1.sendMessageFromContent)(Object.assign(Object.assign({}, message), { id: `${message.id}--content-modify-query`, type: types_inline_messages_1.MessageToInline.ISModifyQuery }), false);
            }
        }));
        loggers.debug().log('listeners were set');
    }
    connect() {
        MicrosoftSentinelPlatform.setListeners();
        loggers.debug().log('connected');
    }
}
exports.MicrosoftSentinelPlatform = MicrosoftSentinelPlatform;
MicrosoftSentinelPlatform.id = types_common_1.PlatformID.MicrosoftSentinel;
MicrosoftSentinelPlatform.extensionDefaultPosition = {
    top: 0,
    left: 0,
    width: 500,
    height: 400,
};


/***/ }),

/***/ "./extension/content/platforms/microsoft-sentinel/microsoft-sentinel-helpers.ts":
/*!**************************************************************************************!*\
  !*** ./extension/content/platforms/microsoft-sentinel/microsoft-sentinel-helpers.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.buildMicrosoftSentinelQueryParts = exports.normalizedValue = exports.normalizeFieldValue = void 0;
const common_helpers_1 = __webpack_require__(/*! ../../../common/common-helpers */ "./extension/common/common-helpers.ts");
const checkers_1 = __webpack_require__(/*! ../../../../common/checkers */ "./common/checkers.ts");
const normalizeFieldValue = (value) => {
    return value.indexOf('[UTC]') > -1
        ? value.split('[UTC]').shift().trim()
        : value;
};
exports.normalizeFieldValue = normalizeFieldValue;
const normalizedValue = (value) => {
    const nValue = (0, checkers_1.isNumberInString)(value)
        ? parseFloat(value)
        : value;
    return typeof nValue === 'number'
        ? nValue
        : `"${nValue.replace(/\\/g, '\\\\')}"`;
};
exports.normalizedValue = normalizedValue;
const buildMicrosoftSentinelQueryParts = (type, resources) => {
    return (0, common_helpers_1.buildQueryParts)(resources, type === 'exclude' ? '!=' : '==', type === 'exclude' ? ' and ' : ' or ', {
        leftOperand: (v) => v,
        rightOperand: (v) => (0, exports.normalizedValue)(v),
    });
};
exports.buildMicrosoftSentinelQueryParts = buildMicrosoftSentinelQueryParts;


/***/ }),

/***/ "./extension/content/platforms/splunk/SplunkPlatform.ts":
/*!**************************************************************!*\
  !*** ./extension/content/platforms/splunk/SplunkPlatform.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SplunkPlatform = void 0;
const types_content_common_1 = __webpack_require__(/*! ../../types/types-content-common */ "./extension/content/types/types-content-common.ts");
const types_common_1 = __webpack_require__(/*! ../../../common/types/types-common */ "./extension/common/types/types-common.ts");
const content_services_listeners_1 = __webpack_require__(/*! ../../services/content-services-listeners */ "./extension/content/services/content-services-listeners.ts");
const common_listeners_1 = __webpack_require__(/*! ../../../common/common-listeners */ "./extension/common/common-listeners.ts");
const types_content_messages_1 = __webpack_require__(/*! ../../types/types-content-messages */ "./extension/content/types/types-content-messages.ts");
const content_services_1 = __webpack_require__(/*! ../../services/content-services */ "./extension/content/services/content-services.ts");
const types_inline_messages_1 = __webpack_require__(/*! ../../../inline/types/types-inline-messages */ "./extension/inline/types/types-inline-messages.ts");
const loggers_debug_1 = __webpack_require__(/*! ../../../common/loggers/loggers-debug */ "./extension/common/loggers/loggers-debug.ts");
const common_helpers_1 = __webpack_require__(/*! ../../../common/common-helpers */ "./extension/common/common-helpers.ts");
const public_resources_1 = __webpack_require__(/*! ../../../manifest/public-resources */ "./extension/manifest/public-resources.ts");
const types_background_messages_1 = __webpack_require__(/*! ../../../background/types/types-background-messages */ "./extension/background/types/types-background-messages.ts");
const helpers_1 = __webpack_require__(/*! ../../../../common/helpers */ "./common/helpers.ts");
const loggers = (__webpack_require__(/*! ../../../common/loggers */ "./extension/common/loggers/index.ts").loggers.addPrefix)((0, loggers_debug_1.getDebugPrefix)('content'))
    .addPrefix(types_common_1.PlatformID.Splunk);
class SplunkPlatform {
    constructor() {
        this.extensionDefaultPosition = SplunkPlatform.extensionDefaultPosition;
    }
    static normalizeValue(value) {
        if (typeof value !== 'string') {
            return '';
        }
        return (0, common_helpers_1.removeDoubleQuotesAround)(value
            .replace('=', '')
            .trim());
    }
    getID() {
        return SplunkPlatform.id;
    }
    static setListeners() {
        content_services_listeners_1.addListener(types_content_common_1.ListenerType.OnMessage, (message) => {
            if ((0, common_listeners_1.isMessageMatched)(() => types_content_messages_1.MessageToContent.CSModifyQuery === message.type, message)) {
                (0, content_services_1.sendMessageFromContent)(Object.assign(Object.assign({}, message), { id: `${message.id}--content-modify-query`, type: types_inline_messages_1.MessageToInline.ISModifyQuery }), false);
            }
        });
    }
    static connectMouseDown() {
        document.addEventListener('mousedown', (e) => {
            var _a, _b;
            if (!e.altKey) {
                return;
            }
            const elements = (0, common_helpers_1.getElementsUnderCursor)(e, elem => {
                return (elem.tagName === 'SPAN'
                    && elem.classList.contains('t')
                    && elem.classList.contains('h')
                    && !!elem.closest('.event')) || (elem.tagName === 'SPAN'
                    && elem.classList.contains('field')
                    && !!elem.closest('.event')) || (Array.from(elem.attributes)
                    .map(el => el.name)
                    .includes('data-sort-key'));
            });
            const text = elements.length > 1
                ? null
                : SplunkPlatform.normalizeValue(((_a = elements[0]) === null || _a === void 0 ? void 0 : _a.innerText) || ((_b = elements[0]) === null || _b === void 0 ? void 0 : _b.getAttribute('data-sort-key')));
            if (!text) {
                return;
            }
            (0, content_services_1.sendMessageFromContent)({
                id: `content-add-field--${(0, helpers_1.uuid)()}`,
                type: types_background_messages_1.MessageToBackground.BGAddFieldToWatch,
                payload: {
                    fieldName: text,
                },
            });
        });
        loggers.debug().log('mousedown event was set successfully');
    }
    static connectInlineListener() {
        (0, common_helpers_1.mountHTMLElement)('script', document.body, {
            attributes: {
                src: (0, common_helpers_1.getWebAccessibleUrl)(public_resources_1.splunkInline),
                type: 'text/javascript',
                'data-type': 'inline-listener',
            },
        });
    }
    connect() {
        SplunkPlatform.setListeners();
        SplunkPlatform.connectMouseDown();
        SplunkPlatform.connectInlineListener();
        loggers.debug().log('connected');
    }
}
exports.SplunkPlatform = SplunkPlatform;
SplunkPlatform.id = types_common_1.PlatformID.Splunk;
SplunkPlatform.extensionDefaultPosition = {
    top: 0,
    left: 0,
    width: 480,
    height: 480,
};


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
const loggers_debug_1 = __webpack_require__(/*! ../../common/loggers/loggers-debug */ "./extension/common/loggers/loggers-debug.ts");
const helpers_1 = __webpack_require__(/*! ../../../common/helpers */ "./common/helpers.ts");
const api_support_1 = __webpack_require__(/*! ../../common/api-support */ "./extension/common/api-support.ts");
const serviceLoggers = (__webpack_require__(/*! ../../common/loggers */ "./extension/common/loggers/index.ts").loggers.addPrefix)('services');
const sendMessage = (loggers, message, runtime = true) => {
    var _a;
    message.id = message.id || (0, helpers_1.uuid)();
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
    return (0, exports.sendMessage)(serviceLoggers.addPrefix((0, loggers_debug_1.getDebugPrefix)('content')), message, runtime);
};
exports.sendMessageFromContent = sendMessageFromContent;
const sendMessageFromApp = (message, runtime = true) => {
    return (0, exports.sendMessage)(serviceLoggers.addPrefix((0, loggers_debug_1.getDebugPrefix)('app')), message, runtime);
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
exports.accessibleResources = exports.splunkInline = exports.microsoftDefenderInline = exports.microsoftSentinelInline = exports.appStyles = void 0;
const types_common_1 = __webpack_require__(/*! ../common/types/types-common */ "./extension/common/types/types-common.ts");
exports.appStyles = 'app-styles.css';
exports.microsoftSentinelInline = 'inline-microsoft-sentinel.js';
exports.microsoftDefenderInline = 'inline-microsoft-defender.js';
exports.splunkInline = 'inline-splunk.js';
exports.accessibleResources = {
    [types_common_1.PlatformID.MicrosoftSentinel]: [exports.microsoftSentinelInline],
    [types_common_1.PlatformID.MicrosoftDefender]: [exports.microsoftDefenderInline],
    [types_common_1.PlatformID.Splunk]: [exports.splunkInline],
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************************!*\
  !*** ./extension/background.ts ***!
  \*********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const background_services_1 = __webpack_require__(/*! ./background/services/background-services */ "./extension/background/services/background-services.ts");
__webpack_require__(/*! ./background/background-listeners */ "./extension/background/background-listeners.ts");
(0, background_services_1.registerPlatformsOnOpenedTabs)();

})();

/******/ })()
;