(()=>{"use strict";var e={1428:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isObject=t.isDate=t.isAllowedProtocol=t.isNumberInString=t.isUrl=t.isDomainName=t.isMacAddress=t.isIpV6=t.isIpV4=t.isSHA512=t.isSHA256=t.isSHA1=t.isMD5=t.isEmail=t.isNotEmpty=t.isNotEmptyArray=t.isString=void 0;const r=n(58667),o=n(29674);t.isString=e=>"string"==typeof e;t.isNotEmptyArray=e=>e.length>0;t.isNotEmpty=e=>!!(0,t.isString)(e)&&""!==e.trim();t.isEmail=e=>/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e);t.isMD5=e=>/^[a-f0-9]{32}$/.test(e);t.isSHA1=e=>/^[a-fA-F0-9]{40}$/.test(e);t.isSHA256=e=>/^[a-fA-F0-9]{64}$/.test(e);t.isSHA512=e=>/^[a-fA-F0-9]{128}$/.test(e);t.isIpV4=e=>/(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/.test(e);t.isIpV6=e=>/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/.test(e);t.isMacAddress=e=>/^[a-fA-F0-9]{2}([:|-][a-fA-F0-9]{2}){5}$/.test(e);t.isDomainName=e=>/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/.test(e);t.isUrl=e=>/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(e);t.isNumberInString=e=>{if("number"==typeof e)return!0;if("string"!=typeof e)return!1;const t=e.trim();return!(!/^[-.0-9]*$/.test(t)||(0,o.indexOfAll)(t,".").length>1)&&!Number.isNaN(parseFloat(t))};t.isAllowedProtocol=(e,t)=>{if(t===r.Mode.development)return!0;const n=e.trim().toLowerCase();return"https:"===n||"https"===n};t.isDate=e=>new Date("string"==typeof e&&(0,t.isNumberInString)(e)?parseInt(e,10):e).getTime()>5679828e5;t.isObject=e=>"object"==typeof e&&!Array.isArray(e)&&null!==e&&"function"!=typeof e},29674:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,s){function i(e){try{l(r.next(e))}catch(e){s(e)}}function a(e){try{l(r.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}l((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.serializeDataInResult=t.getUrlParamsSafe=t.iterateObjectsRecursively=t.sleep=t.indexOfAll=t.sortStrings=t.sortNumbers=t.debounce=t.formatDate=t.formatBinaryDate=t.createNonDuplicateValue=t.capitalizeFirstLetter=t.formatString=t.deduplicateArray=t.parseJSONSafe=t.splitByLines=t.clearLineBreaks=t.clearExtraSpaces=t.uuid=t.isFlatObjectsEqual=void 0;const o=n(1428);t.isFlatObjectsEqual=(e,t)=>{const n=Object.keys(e),r=Object.keys(t);return n.length===r.length&&!n.some((n=>e[n]!==t[n]))};t.uuid=()=>Math.random().toString(36).substring(5)+Date.now().toString(36)+Math.random().toString(36).substring(5);t.clearExtraSpaces=e=>e.replace(/ +/g," ");t.clearLineBreaks=e=>e.trim().replace(/(\r\n|\n|\r)/gm," ");t.splitByLines=(e,t=!1)=>{const n=new RegExp(/(\r\n|\n|\r)/,"gm");let r=e.split(n);return t&&(r=r.filter((e=>e&&"\r\n"!==e&&"\n"!==e&&"\r"!==e))),r};t.parseJSONSafe=(e,t)=>{try{return JSON.parse(e)}catch(e){return t}};t.deduplicateArray=e=>[...Array.from(new Set([...e]))];t.formatString=(e,t,n)=>Object.keys(t||{}).map((e=>({value:t[e],key:n?n(e):`%${e}`}))).reduce(((e,t)=>e.replace(new RegExp(t.key,"g"),t.value)),e)||e;t.capitalizeFirstLetter=e=>`${e.charAt(0).toUpperCase()}${e.slice(1)}`;t.createNonDuplicateValue=(e,t)=>{if(!t.includes(e))return e;let n=1,r=e,o=r.slice(0,r.length-1);for(;t.includes(o);)r=o,o=o.slice(0,o.length-1);for(;t.includes(`${r}${n}`);)n++;return`${r}${n}`};t.formatBinaryDate=e=>{const t="string"==typeof e?e:String(e);return t.length>1?t:`0${t}`};t.formatDate=(e,n)=>(0,t.formatString)(e,{Y:String(n.getFullYear()),M:(0,t.formatBinaryDate)(n.getMonth()+1),m:(0,t.formatBinaryDate)(n.getMinutes()),s:(0,t.formatBinaryDate)(n.getSeconds()),ms:(0,t.formatBinaryDate)(n.getMilliseconds()),d:(0,t.formatBinaryDate)(n.getDate()),h:(0,t.formatBinaryDate)(n.getHours())});t.debounce=(e,t)=>{let n;return function(...r){const o=this;clearTimeout(n),n=setTimeout((()=>e.apply(o,r)),t)}};t.sortNumbers=(e,t)=>e>t?1:e<t?-1:0;t.sortStrings=(e,t,n="ascending")=>{const r=e.localeCompare(t);return 0===r||"ascending"===n?r:1===r?-1:1};t.indexOfAll=(e,t)=>{const n=[];let r=-1;for(;(r=e.indexOf(t,r+1))>=0;)n.push(r);return n};t.sleep=e=>r(void 0,void 0,void 0,(function*(){return new Promise((t=>{setTimeout((()=>{t(null)}),1e3*e)}))}));t.iterateObjectsRecursively=(e,n,r)=>{const{separator:s=".",onIteration:i}=r||{};return Object.keys(e||{}).reduce(((a,l)=>{const d=n.length?`${n}${s}${l}`:l,u=e[l];return"function"!=typeof i||(null==i?void 0:i(d,l,u,n))?[...a,...(0,o.isObject)(u)?(0,t.iterateObjectsRecursively)(u,d,r):[d]]:n.length?[...a,n]:a}),[])};t.getUrlParamsSafe=(e,t)=>{try{return new URL(e)[t]||""}catch(e){return""}};t.serializeDataInResult=e=>(e.error&&"string"!=typeof e.error&&(e.error=e.error.message),e)},58667:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.mapType=t.LogLevel=t.Mode=void 0,function(e){e.production="production",e.development="development"}(t.Mode||(t.Mode={})),function(e){e.info="info",e.debug="debug",e.error="error",e.warn="warn"}(t.LogLevel||(t.LogLevel={}));t.mapType=e=>e},43378:(e,t)=>{var n;Object.defineProperty(t,"__esModule",{value:!0}),t.boundedResourcesTypeIDs=t.BoundedResourceTypeID=void 0,function(e){e.Accounts="Accounts",e.Assets="Assets"}(n=t.BoundedResourceTypeID||(t.BoundedResourceTypeID={})),t.boundedResourcesTypeIDs=Object.keys(n)},83755:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MessageToBackground=void 0;const r=n(36421);var o;!function(e){e.BGRunClearData="BGRunClearData",e.BGModifyQuery="BGModifyQuery",e.BGSetQuery="BGSetQuery",e.BGGetQuery="BGGetQuery",e.BGDirectMessageToApp="BGDirectMessageToApp",e.BGSendMessageOutside="BGSendMessageOutside",e.BGSetWatchers="BGSetWatchers",e.BGRegisterPlatformTab="BGRegisterPlatformTab",e.BGToggleShowExtension="BGToggleShowExtension",e.BGSetDebugMode="BGSetDebugMode",e.BGDirectMessageToInline="BGDirectMessageToInline",e.BGIntegrationWork="BGIntegrationWork"}(o=t.MessageToBackground||(t.MessageToBackground={})),Object.values(o).forEach((e=>{if("background"!==(0,r.getExecutingContextByMessageType)(e))throw new Error(`Wrong background message type "${e}"`)}))},82486:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isRuntimeGetUrlSupported=t.isTabsSendMessageSupported=t.isTabsQuerySupported=t.isOnBeforeSendHeadersSupported=t.isOnBeforeRequestSupported=t.isBrowserActionOnClickedSupported=t.isActionOnClickedSupported=t.isTabsOnRemovedSupported=t.isRuntimeOnMessageExternalSupported=t.isRuntimeOnMessageSupported=t.isRuntimeSendMessageSupported=t.isAddEventListenerSupported=t.isPostMessageSupported=void 0;const r=n(11315),o=n(32224).loggers.addPrefix("api-support");t.isPostMessageSupported=(...e)=>!!(null===window||void 0===window?void 0:window.postMessage)||(o.warn().log("API window.postMessage is not supported",...e),!1);t.isAddEventListenerSupported=(...e)=>!!(null===window||void 0===window?void 0:window.addEventListener)||(o.warn().log("API window.addEventListener is not supported",...e),!1);t.isRuntimeSendMessageSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,r.getBrowserContext)())||void 0===t?void 0:t.runtime)||void 0===n?void 0:n.sendMessage)||(o.warn().log("API runtime.sendMessage is not supported",...e),!1)};t.isRuntimeOnMessageSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,r.getBrowserContext)().runtime)||void 0===t?void 0:t.onMessage)||void 0===n?void 0:n.addListener)||(o.warn().log("API runtime.onMessage.addListener is not supported",...e),!1)};t.isRuntimeOnMessageExternalSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,r.getBrowserContext)().runtime)||void 0===t?void 0:t.onMessageExternal)||void 0===n?void 0:n.addListener)||(o.warn().log("API runtime.onMessageExternal.addListener is not supported",...e),!1)};t.isTabsOnRemovedSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,r.getBrowserContext)().tabs)||void 0===t?void 0:t.onRemoved)||void 0===n?void 0:n.addListener)||(o.warn().log("API tabs.onRemoved.addListener is not supported",...e),!1)};t.isActionOnClickedSupported=(...e)=>{var t,n,s;return!!(null===(s=null===(n=null===(t=(0,r.getBrowserContext)())||void 0===t?void 0:t.action)||void 0===n?void 0:n.onClicked)||void 0===s?void 0:s.addListener)||(o.warn().log("API action.onClicked.addListener is not supported",...e),!1)};t.isBrowserActionOnClickedSupported=(...e)=>{var t,n,s;return!!(null===(s=null===(n=null===(t=(0,r.getBrowserContext)())||void 0===t?void 0:t.browserAction)||void 0===n?void 0:n.onClicked)||void 0===s?void 0:s.addListener)||(o.warn().log("API browserAction.onClicked.addListener is not supported",...e),!1)};t.isOnBeforeRequestSupported=(...e)=>{var t,n,s;return!!(null===(s=null===(n=null===(t=(0,r.getBrowserContext)())||void 0===t?void 0:t.webRequest)||void 0===n?void 0:n.onBeforeRequest)||void 0===s?void 0:s.addListener)||(o.warn().log("API webRequest.onBeforeRequest is not supported",...e),!1)};t.isOnBeforeSendHeadersSupported=(...e)=>{var t,n,s;return!!(null===(s=null===(n=null===(t=(0,r.getBrowserContext)())||void 0===t?void 0:t.webRequest)||void 0===n?void 0:n.onBeforeSendHeaders)||void 0===s?void 0:s.addListener)||(o.warn().log("API webRequest.onBeforeSendHeaders is not supported",...e),!1)};t.isTabsQuerySupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,r.getBrowserContext)())||void 0===t?void 0:t.tabs)||void 0===n?void 0:n.query)||(o.warn().log("API tabs.query is not supported",...e),!1)};t.isTabsSendMessageSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,r.getBrowserContext)())||void 0===t?void 0:t.tabs)||void 0===n?void 0:n.sendMessage)||(o.warn().log("API tabs.sendMessage is not supported",...e),!1)};t.isRuntimeGetUrlSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,r.getBrowserContext)())||void 0===t?void 0:t.runtime)||void 0===n?void 0:n.getURL)||(o.warn().log("API runtime.getURL is not supported",...e),!1)}},11315:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getWebAccessibleUrl=t.getBrowserContext=void 0;const r=n(82486);t.getBrowserContext=()=>"undefined"!=typeof browser?browser:chrome;t.getWebAccessibleUrl=e=>(0,r.isRuntimeGetUrlSupported)(e)?(0,t.getBrowserContext)().runtime.getURL(e):""},79943:function(e,t){var n=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,s){function i(e){try{l(r.next(e))}catch(e){s(e)}}function a(e){try{l(r.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}l((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.createFormDataString=t.compareVersions=t.getVersionFromString=t.removeDoubleQuotesAround=t.removeQuotesAround=t.removeBracketsAround=t.buildQueryParts=t.getElementsUnderCursor=t.downloadFile=t.copyToClipboard=t.createClassName=t.waitHTMLElement=t.isInsideIframe=t.mountHTMLElement=t.cssObjectToString=void 0;t.cssObjectToString=e=>Object.keys(e).reduce(((t,n)=>t+`${n}:${e[n]};`),"");t.mountHTMLElement=(e,n,r)=>{const o=document.createElement(e);return(null==r?void 0:r.attributes)&&Object.keys(r.attributes).forEach((e=>{var n;o.setAttribute(e,"style"===e?(0,t.cssObjectToString)(r.attributes[e]):(null===(n=r.attributes)||void 0===n?void 0:n[e])||"")})),(null==r?void 0:r.innerHtml)&&(o.innerHTML=r.innerHtml),(null==r?void 0:r.innerText)&&(o.innerText=r.innerText),n&&n.append(o),o};t.isInsideIframe=()=>{try{return window.self!==window.top}catch(e){return!0}};t.waitHTMLElement=(e,t=document)=>n(void 0,void 0,void 0,(function*(){return new Promise((n=>{new MutationObserver(((r,o)=>{const s=t.querySelector(e);s&&(o.disconnect(),n(s))})).observe(t,{childList:!0,subtree:!0})}))}));t.createClassName=e=>e.filter(Boolean).join(" ");t.copyToClipboard=e=>{const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.opacity="0",t.style.position="absolute",t.style.left="-99999px",t.style.top="-99999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)};t.downloadFile=(e,t,n)=>{const r=document.createElement("a");r.setAttribute("href",encodeURI(`data:text/csv;charset=utf-8,${t}`)),r.setAttribute("download",`${n}.csv`),document.body.appendChild(r),r.click(),document.body.removeChild(r)};t.getElementsUnderCursor=(e,t)=>{const n=e.clientX,r=e.clientY,o=[],s=[];let i=document.elementFromPoint(n,r);for(;"HTML"!==i.tagName;){const e=i.style.pointerEvents;if(!i)break;(!t||t&&t(i))&&o.push(i),s.push({savedPointerEvents:e,element:i}),i.style.pointerEvents="none",i=document.elementFromPoint(n,r)}return s.forEach((({element:e,savedPointerEvents:t})=>{t?e.style.pointerEvents=t:e.style.removeProperty("pointer-events"),e.getAttribute("style")||e.removeAttribute("style")})),o};t.buildQueryParts=(e,t,n,r,o,s)=>{const i=[];Object.keys(e).forEach((r=>{i.push(e[r].map((e=>`${o.leftOperand(r)}${t(r,e)}${o.rightOperand(e)}`)).join(n))}));const a=i.join(r);return s?`${s} ${a}`:a};t.removeBracketsAround=e=>{let t=e;return"("===e[0]&&(t=t.slice(1)),")"===e[e.length-1]&&(t=t.slice(0,e.length-2)),t};t.removeQuotesAround=e=>{let t=e;return'"'!==e[0]&&"'"!==e[0]||(t=t.slice(1)),'"'!==e[e.length-1]&&"'"!==e[e.length-1]||(t=t.slice(0,e.length-2)),t};t.removeDoubleQuotesAround=e=>{let t=e;return'"'===e[0]&&(t=t.slice(1)),'"'===e[e.length-1]&&(t=t.slice(0,e.length-2)),t};t.getVersionFromString=e=>{if("string"!=typeof e||!/^[.0-9]+$/.test(e))return 0;const t=parseInt(e.replace(/\./g,""),10);return Number.isNaN(t)?0:t};t.compareVersions=(e,n)=>{const r=(0,t.getVersionFromString)(e),o=(0,t.getVersionFromString)(n);return r===o?"equal":r>o?"greater":"less"};t.createFormDataString=e=>{const t=[];for(const[n,r]of Object.entries(e))t.push(`${encodeURIComponent(n)}=${encodeURIComponent(r)}`);return t.join("&").replace(/%20/g,"+")}},46102:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isMessageMatched=void 0;const r=n(32224);t.isMessageMatched=(e,t,...n)=>!!e()&&(r.loggers.debug().log(`got ${t.type} message`,t,...n),!0)},16478:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.version=t.logLevel=t.mode=t.backgroundPlatformIDFromENV=t.contentPlatformIDFromENV=void 0;const r=n(77131),o=n(58667);t.contentPlatformIDFromENV=(Object.values(r.PlatformID).includes(null),null),t.backgroundPlatformIDFromENV=(Object.values(r.PlatformID).includes(null),null),t.mode="production"===o.Mode.production?o.Mode.production:o.Mode.development,t.logLevel=Object.keys(o.LogLevel).includes("info")?"info":o.LogLevel.info,t.version="1.4.1"},32224:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.setLoggers=t.Loggers=t.setDebugMode=t.loggers=void 0;const r=n(58667),o=n(16478);let s=o.mode===r.Mode.development||o.logLevel===r.LogLevel.debug;t.setDebugMode=e=>{s=e};class i{constructor(e="",t=r.LogLevel.info){this.prefix="",this.level=r.LogLevel.info,this.prefix=e,this.level=t}createInstance(e="",t=r.LogLevel.info){return new i(e,t)}log(...e){(this.level!==r.LogLevel.debug||s)&&console[this.level===r.LogLevel.error?"error":this.level===r.LogLevel.warn?"warn":"log"](this.prefix||"==>",...e)}error(){return this.createInstance(`ERROR: ${this.prefix}`,r.LogLevel.error)}warn(){return this.createInstance(`WARN: ${this.prefix}`,r.LogLevel.warn)}info(){return this.createInstance(`INFO: ${this.prefix}`,r.LogLevel.info)}debug(){return this.createInstance(`DEBUG: ${this.prefix}`,r.LogLevel.debug)}addPrefix(e){return this.createInstance([this.prefix,e].join(" "),this.level)}setLevel(e){return this.createInstance(this.prefix,e)}setPrefix(e){return t.loggers=this.addPrefix(e),t.loggers}}t.Loggers=i,t.loggers=new i;t.setLoggers=e=>{t.loggers=e}},78017:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DebugID=void 0;const r=n(58667),o=n(36421);!function(e){e[e.debugIDExternal=(0,r.mapType)(o.debugID)]="debugIDExternal"}(t.DebugID||(t.DebugID={}))},36421:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.debugID=t.getExecutingContextByMessageType=t.getDebugPrefix=void 0;t.getDebugPrefix=e=>"background"===e?"bg ==>":"content"===e?"cs ==>":"inline"===e?"is ==>":"app"===e?"app ==>":"unknown ==>";t.getExecutingContextByMessageType=e=>{let t=(e||"").slice(0,3).toLowerCase();return"app"===t?"app":(t=t.slice(0,2),"bg"===t?"background":"cs"===t?"content":"is"===t?"inline":"unknown")},t.debugID="debug-external-der3edc3op3e4dde44rt"},77131:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PlatformName=t.PlatformID=t.Browser=void 0,function(e){e.chrome="chrome",e.firefox="firefox",e.edge="edge"}(t.Browser||(t.Browser={})),function(e){e.MicrosoftSentinel="MicrosoftSentinel",e.MicrosoftDefender="MicrosoftDefender",e.Splunk="Splunk",e.QRadar="QRadar",e.Elastic="Elastic",e.OpenSearch="OpenSearch",e.ArcSight="ArcSight",e.Athena="Athena",e.LogScale="LogScale"}(t.PlatformID||(t.PlatformID={})),function(e){e.MicrosoftSentinel="Microsoft Sentinel",e.MicrosoftDefender="Microsoft Defender For Endpoint",e.Splunk="Splunk",e.QRadar="IBM QRadar",e.Elastic="Elastic",e.OpenSearch="OpenSearch",e.ArcSight="ArcSight",e.Athena="Amazon Athena",e.LogScale="Falcon LogScale"}(t.PlatformName||(t.PlatformName={}))},47255:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractContentPlatform=void 0;const r=n(46102),o=n(59927),s=n(17639),i=n(24526),a=n(83755);t.AbstractContentPlatform=class{constructor(){this.fields=new Set}static processInlineListeners(e){if((0,r.isMessageMatched)((()=>o.MessageToContent.CSModifyQuery===e.type),e)&&(0,s.sendMessageFromContent)(Object.assign(Object.assign({},e),{id:`${e.id}--${e.type}`,type:i.MessageToInline.ISModifyQuery}),!1),(0,r.isMessageMatched)((()=>o.MessageToContent.CSSetQuery===e.type),e)&&(0,s.sendMessageFromContent)(Object.assign(Object.assign({},e),{id:`${e.id}--${e.type}`,type:i.MessageToInline.ISSetQuery}),!1),(0,r.isMessageMatched)((()=>o.MessageToContent.CSGetQuery===e.type),e)&&(0,s.sendMessageFromContent)(Object.assign(Object.assign({},e),{id:`${e.id}--${e.type}`,type:i.MessageToInline.ISGetQuery}),!1),(0,r.isMessageMatched)((()=>o.MessageToContent.CSSendMessageOutside===e.type),e)&&(0,s.sendMessageFromContent)(Object.assign(Object.assign({},e),{id:`${e.id}--${e.type}`,type:a.MessageToBackground.BGSendMessageOutside})),(0,r.isMessageMatched)((()=>o.MessageToContent.CSSetDebugMode===e.type),e)){const{debugMode:t}=e.payload;n(32224).setDebugMode(t),(0,s.sendMessageFromContent)(Object.assign(Object.assign({},e),{id:`${e.id}--${e.type}`,type:i.MessageToInline.ISSetDebugMode}),!1)}if((0,r.isMessageMatched)((()=>o.MessageToContent.CSDirectMessageToApp===e.type),e)&&(0,s.sendMessageFromContent)({id:`${e.id}--${e.type}`,type:a.MessageToBackground.BGDirectMessageToApp,payload:e.payload}),(0,r.isMessageMatched)((()=>o.MessageToContent.CSDirectMessageToInline===e.type),e)){const{type:t,payload:n}=e.payload;(0,s.sendMessageFromContent)({id:`${e.id}--${e.type}`,type:t,payload:n},!1)}}}},50646:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.OpenSearchPlatform=void 0;const r=n(87922),o=n(43378),s=n(77131),i=n(1428),a=n(79943),l=n(16195),d=n(28430),u=n(11315),c=n(47255);let g;class p extends c.AbstractContentPlatform{constructor(){super(...arguments),this.defaultWatchers={[o.BoundedResourceTypeID.Accounts]:["user.name","related.user","user.full_name","winlog.event_data.SubjectUserName","winlog.event_data.TargetUserName","winlog.user.name"],[o.BoundedResourceTypeID.Assets]:["host.hostname","host.name","winlog.computer_name"]},this.extensionDefaultPosition=p.extensionDefaultPosition}static buildQueryParts(e,t,n=!1){const r="include"===e?"AND":"AND NOT",o={};return Object.keys(t).forEach((e=>{t[e].length>1?o[e]=[`(${t[e].map((e=>p.normalizedValue(e))).join(" OR ")})`]:o[e]=t[e]})),(0,a.buildQueryParts)(o,(()=>":"),"exclude"===e?" AND NOT ":" OR ","exclude"===e?" AND NOT ":" AND ",{leftOperand:e=>e,rightOperand:e=>p.normalizedValue(e)},n?r:void 0)}getID(){return p.id}getName(){return s.PlatformName.OpenSearch}static setListeners(){d.addListener(r.ListenerType.OnMessage,(e=>{c.AbstractContentPlatform.processInlineListeners(e)})),g.debug().log("listeners were set")}static connectInlineListener(){(0,a.mountHTMLElement)("script",document.body,{attributes:{src:(0,u.getWebAccessibleUrl)(l.openSearchInline),type:"text/javascript","data-type":"inline-listener"}}),g.debug().log("inline mounted")}connect(){p.setListeners(),p.connectInlineListener(),g.debug().log("connected")}buildQueryParts(e,t,n){return p.buildQueryParts(e,t,n)}}t.OpenSearchPlatform=p,p.id=s.PlatformID.OpenSearch,p.extensionDefaultPosition={top:0,left:0,width:480,height:480},p.normalizedValue=e=>{const t=(0,i.isNumberInString)(e)?parseFloat(e):String(e).trim();return"number"==typeof t||"("===t[0]||")"===t[t.length-1]?t:`"${t.replace(/"/g,'\\"')}"`},g=n(32224).loggers.addPrefix(p.id)},28430:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.addListener=void 0;const r=n(87922),o=n(78017),s=n(82486),i=n(11315),a=n(36421),l={};t.addListener=(e,t,...n)=>{var r;null===(r=l[e])||void 0===r||r.call(l,((...e)=>{t(...e)}),...n)};const d=[];l[r.ListenerType.OnMessage]=(e,...t)=>{if((0,s.isRuntimeOnMessageSupported)()){const n=(0,i.getBrowserContext)().runtime.onMessage;d.push((()=>{n.removeListener(e)})),n.addListener(((...t)=>{e(...t)}),...t)}if(!(0,s.isAddEventListenerSupported)())return;const n=n=>{const r=n.data;n.origin!==window.location.origin||"content"!==(0,a.getExecutingContextByMessageType)(r.type)&&r.externalType!==o.DebugID.debugIDExternal||e(n.data,...t)};d.push((()=>{window.removeEventListener("message",n)})),window.addEventListener("message",n)}},17639:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.sendMessageFromApp=t.sendMessageFromContent=t.sendMessage=void 0;const r=n(29674),o=n(82486),s=n(11315),i=n(32224).loggers.addPrefix("services");t.sendMessage=(e,t,n=!0)=>{var i;t.id=`${t.id?`${t.id}--`:""}${(0,r.uuid)()}`;const a="sendMessage";try{return n||(0,o.isPostMessageSupported)(t)?n?(0,o.isRuntimeSendMessageSupported)()?(null===(i=(0,s.getBrowserContext)().runtime.sendMessage(t))||void 0===i||i.catch((n=>e.error().addPrefix(a).log(n,t))),e.debug().addPrefix(a).log(t),t):t:(window.postMessage(t),e.debug().log("postMessage",t),t):t}catch(n){return e.error().addPrefix(a).log(n,t),t}};t.sendMessageFromContent=(e,n=!0)=>(0,t.sendMessage)(i.addPrefix("message-from-content"),e,n);t.sendMessageFromApp=(e,n=!0)=>(0,t.sendMessage)(i.addPrefix("message-from-app"),e,n)},87922:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ListenerType=void 0,function(e){e.OnMessage="OnMessage"}(t.ListenerType||(t.ListenerType={}))},59927:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MessageToContent=void 0;const r=n(36421);var o;!function(e){e.CSModifyQuery="CSModifyQuery",e.CSSetQuery="CSSetQuery",e.CSGetQuery="CSGetQuery",e.CSSendMessageOutside="CSSendMessageOutside",e.CSConnectPlatform="CSConnectPlatform",e.CSSetDebugMode="CSSetDebugMode",e.CSDirectMessageToApp="CSDirectMessageToApp",e.CSDirectMessageToInline="CSDirectMessageToInline"}(o=t.MessageToContent||(t.MessageToContent={})),Object.values(o).forEach((e=>{if("content"!==(0,r.getExecutingContextByMessageType)(e))throw new Error(`Wrong content message type "${e}"`)}))},24526:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MessageToInline=void 0;const r=n(36421);var o;!function(e){e.ISModifyQuery="ISModifyQuery",e.ISSetQuery="ISSetQuery",e.ISGetQuery="ISGetQuery",e.ISSetDebugMode="ISSetDebugMode",e.ISRemoveHash="ISRemoveHash",e.ISRemoveFieldSpecification="ISRemoveFieldSpecification"}(o=t.MessageToInline||(t.MessageToInline={})),Object.values(o).forEach((e=>{if("inline"!==(0,r.getExecutingContextByMessageType)(e))throw new Error(`Wrong inline message type "${e}"`)}))},16195:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.accessibleResources=t.logScaleInline=t.openSearchInline=t.arcSightInline=t.elasticInline=t.qRadarInline=t.splunkInline=t.amazonAthenaInline=t.microsoftDefenderInline=t.microsoftSentinelInline=t.appStyles=void 0;const r=n(77131);t.appStyles="app-styles.css",t.microsoftSentinelInline="inline-microsoft-sentinel.js",t.microsoftDefenderInline="inline-microsoft-defender.js",t.amazonAthenaInline="inline-amazon-athena.js",t.splunkInline="inline-splunk.js",t.qRadarInline="inline-qradar.js",t.elasticInline="inline-elastic.js",t.arcSightInline="inline-arcsight.js",t.openSearchInline="inline-opensearch.js",t.logScaleInline="inline-logscale.js",t.accessibleResources={[r.PlatformID.MicrosoftSentinel]:[t.microsoftSentinelInline],[r.PlatformID.MicrosoftDefender]:[t.microsoftDefenderInline],[r.PlatformID.Splunk]:[t.splunkInline],[r.PlatformID.QRadar]:[t.qRadarInline],[r.PlatformID.Elastic]:[t.elasticInline],[r.PlatformID.ArcSight]:[t.arcSightInline],[r.PlatformID.Athena]:[t.amazonAthenaInline],[r.PlatformID.OpenSearch]:[t.openSearchInline],[r.PlatformID.LogScale]:[t.logScaleInline],app:[t.appStyles]}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var s=t[r]={exports:{}};return e[r].call(s.exports,s,s.exports,n),s.exports}(()=>{const e=n(36421);n(32224).loggers.setPrefix((0,e.getDebugPrefix)("inline"))})(),(()=>{const e=n(46102),t=n(24526),r=new(n(50646).OpenSearchPlatform),o=n(32224).loggers.addPrefix(r.getID());window.addEventListener("message",(s=>{const i=s.data;if((0,e.isMessageMatched)((()=>t.MessageToInline.ISModifyQuery===i.type),i,s)){const e=document.querySelector('.euiTextArea[data-test-subj="queryInput"]');if(!e)return o.warn().log("query input not found");const t=e.value,{resources:n,modifyType:s}=i.payload;if("show all"===s)return e.value=r.buildQueryParts(s,n),void e.click();const a=r.buildQueryParts(s,n,!0);e.value=`${t} ${a}`,e.click()}if((0,e.isMessageMatched)((()=>t.MessageToInline.ISSetDebugMode===i.type),i,s)){const{debugMode:e}=i.payload;n(32224).setDebugMode(e)}})),o.debug().log("mounted")})()})();