(()=>{"use strict";var e={7838:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isDate=t.isAllowedProtocol=t.isNumberInString=t.isNotEmpty=t.isString=void 0;const o=n(9068),r=n(412);t.isString=e=>"string"==typeof e;t.isNotEmpty=e=>!!(0,t.isString)(e)&&""!==e.trim();t.isNumberInString=e=>{if("number"==typeof e)return!0;if("string"!=typeof e)return!1;const t=e.trim();return!(!/^[-.0-9]*$/.test(t)||(0,r.indexOfAll)(t,".").length>1)&&!Number.isNaN(parseFloat(t))};t.isAllowedProtocol=(e,t)=>{if(t===o.Mode.development)return!0;const n=e.trim().toLowerCase();return"https:"===n||"https"===n};t.isDate=e=>new Date("string"==typeof e&&(0,t.isNumberInString)(e)?parseInt(e):e).getTime()>5679828e5},412:function(e,t){var n=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,s){function i(e){try{d(o.next(e))}catch(e){s(e)}}function a(e){try{d(o.throw(e))}catch(e){s(e)}}function d(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}d((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.sleep=t.indexOfAll=t.sortNumbers=t.debounce=t.formatDate=t.formatBinaryDate=t.createNonDuplicateValue=t.capitalizeFirstLetter=t.formatString=t.deduplicateArray=t.parseJSONSafe=t.splitByLines=t.clearLineBreaks=t.clearExtraSpaces=t.uuid=t.isFlatObjectsEqual=void 0;t.isFlatObjectsEqual=(e,t)=>{const n=Object.keys(e),o=Object.keys(t);return n.length===o.length&&!n.some((n=>e[n]!==t[n]))};t.uuid=()=>Math.random().toString(36).substring(5)+Date.now().toString(36)+Math.random().toString(36).substring(5);t.clearExtraSpaces=e=>e.replace(/ +/g," ");t.clearLineBreaks=e=>e.trim().replace(/(\r\n|\n|\r)/gm," ");t.splitByLines=(e,t=!1)=>{const n=new RegExp(/(\r\n|\n|\r)/,"gm");let o=e.split(n);return t&&(o=o.filter((e=>e&&"\r\n"!==e&&"\n"!==e&&"\r"!==e))),o};t.parseJSONSafe=(e,t)=>{try{return JSON.parse(e)}catch(e){return t}};t.deduplicateArray=e=>[...Array.from(new Set([...e]))];t.formatString=(e,t,n)=>Object.keys(t||{}).map((e=>({value:t[e],key:n?n(e):`%${e}`}))).reduce(((e,t)=>e.replace(new RegExp(t.key,"g"),t.value)),e)||e;t.capitalizeFirstLetter=e=>`${e.charAt(0).toUpperCase()}${e.slice(1)}`;t.createNonDuplicateValue=(e,t)=>{if(!t.includes(e))return e;let n=1,o=e,r=o.slice(0,o.length-1);for(;t.includes(r);)o=r,r=r.slice(0,r.length-1);for(;t.includes(`${o}${n}`);)n++;return`${o}${n}`};t.formatBinaryDate=e=>{const t="string"==typeof e?e:String(e);return t.length>1?t:`0${t}`};t.formatDate=(e,n)=>(0,t.formatString)(e,{Y:String(n.getFullYear()),M:(0,t.formatBinaryDate)(n.getMonth()+1),m:(0,t.formatBinaryDate)(n.getMinutes()),s:(0,t.formatBinaryDate)(n.getSeconds()),ms:(0,t.formatBinaryDate)(n.getMilliseconds()),d:(0,t.formatBinaryDate)(n.getDate()),h:(0,t.formatBinaryDate)(n.getHours())});t.debounce=(e,t)=>{let n;return function(...o){const r=this;clearTimeout(n),n=setTimeout((()=>e.apply(r,o)),t)}};t.sortNumbers=(e,t)=>e>t?1:e<t?-1:0;t.indexOfAll=(e,t)=>{const n=[];let o=-1;for(;(o=e.indexOf(t,o+1))>=0;)n.push(o);return n};t.sleep=e=>n(void 0,void 0,void 0,(function*(){return new Promise((t=>{setTimeout((()=>{t(null)}),1e3*e)}))}))},9068:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.mapType=t.LogLevel=t.Mode=void 0,function(e){e.production="production",e.development="development"}(t.Mode||(t.Mode={})),function(e){e.info="info",e.debug="debug",e.error="error",e.warn="warn"}(t.LogLevel||(t.LogLevel={}));t.mapType=e=>e},8401:(e,t)=>{var n;Object.defineProperty(t,"__esModule",{value:!0}),t.boundedResourcesTypeIDs=t.BoundedResourceTypeID=void 0,function(e){e.Accounts="Accounts",e.Assets="Assets"}(n=t.BoundedResourceTypeID||(t.BoundedResourceTypeID={})),t.boundedResourcesTypeIDs=Object.keys(n)},8918:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MessageToBackground=void 0;const o=n(1518);var r;!function(e){e.BGRunClearData="BGRunClearData",e.BGModifyQuery="BGModifyQuery",e.BGSetQuery="BGSetQuery",e.BGGetQuery="BGGetQuery",e.BGDirectMessageToApp="BGDirectMessageToApp",e.BGSendMessageOutside="BGSendMessageOutside",e.BGSetWatchers="BGSetWatchers",e.BGRegisterPlatformTab="BGRegisterPlatformTab",e.BGToggleShowExtension="BGToggleShowExtension",e.BGSetDebugMode="BGSetDebugMode",e.BGDirectMessageToInline="BGDirectMessageToInline"}(r=t.MessageToBackground||(t.MessageToBackground={})),Object.values(r).forEach((e=>{if("background"!==(0,o.getExecutingContextByMessageType)(e))throw new Error(`Wrong background message type "${e}"`)}))},5099:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isRuntimeGetUrlSupported=t.isTabsSendMessageSupported=t.isTabsQuerySupported=t.isOnBeforeSendHeadersSupported=t.isOnBeforeRequestSupported=t.isBrowserActionOnClickedSupported=t.isActionOnClickedSupported=t.isTabsOnRemovedSupported=t.isRuntimeOnMessageExternalSupported=t.isRuntimeOnMessageSupported=t.isRuntimeSendMessageSupported=t.isAddEventListenerSupported=t.isPostMessageSupported=void 0;const o=n(1393),r=n(5482).loggers.addPrefix("api-support");t.isPostMessageSupported=(...e)=>!!(null===window||void 0===window?void 0:window.postMessage)||(r.warn().log("API window.postMessage is not supported",...e),!1);t.isAddEventListenerSupported=(...e)=>!!(null===window||void 0===window?void 0:window.addEventListener)||(r.warn().log("API window.addEventListener is not supported",...e),!1);t.isRuntimeSendMessageSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,o.getBrowserContext)())||void 0===t?void 0:t.runtime)||void 0===n?void 0:n.sendMessage)||(r.warn().log("API runtime.sendMessage is not supported",...e),!1)};t.isRuntimeOnMessageSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,o.getBrowserContext)().runtime)||void 0===t?void 0:t.onMessage)||void 0===n?void 0:n.addListener)||(r.warn().log("API runtime.onMessage.addListener is not supported",...e),!1)};t.isRuntimeOnMessageExternalSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,o.getBrowserContext)().runtime)||void 0===t?void 0:t.onMessageExternal)||void 0===n?void 0:n.addListener)||(r.warn().log("API runtime.onMessageExternal.addListener is not supported",...e),!1)};t.isTabsOnRemovedSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,o.getBrowserContext)().tabs)||void 0===t?void 0:t.onRemoved)||void 0===n?void 0:n.addListener)||(r.warn().log("API tabs.onRemoved.addListener is not supported",...e),!1)};t.isActionOnClickedSupported=(...e)=>{var t,n,s;return!!(null===(s=null===(n=null===(t=(0,o.getBrowserContext)())||void 0===t?void 0:t.action)||void 0===n?void 0:n.onClicked)||void 0===s?void 0:s.addListener)||(r.warn().log("API action.onClicked.addListener is not supported",...e),!1)};t.isBrowserActionOnClickedSupported=(...e)=>{var t,n,s;return!!(null===(s=null===(n=null===(t=(0,o.getBrowserContext)())||void 0===t?void 0:t.browserAction)||void 0===n?void 0:n.onClicked)||void 0===s?void 0:s.addListener)||(r.warn().log("API browserAction.onClicked.addListener is not supported",...e),!1)};t.isOnBeforeRequestSupported=(...e)=>{var t,n,s;return!!(null===(s=null===(n=null===(t=(0,o.getBrowserContext)())||void 0===t?void 0:t.webRequest)||void 0===n?void 0:n.onBeforeRequest)||void 0===s?void 0:s.addListener)||(r.warn().log("API webRequest.onBeforeRequest is not supported",...e),!1)};t.isOnBeforeSendHeadersSupported=(...e)=>{var t,n,s;return!!(null===(s=null===(n=null===(t=(0,o.getBrowserContext)())||void 0===t?void 0:t.webRequest)||void 0===n?void 0:n.onBeforeSendHeaders)||void 0===s?void 0:s.addListener)||(r.warn().log("API webRequest.onBeforeSendHeaders is not supported",...e),!1)};t.isTabsQuerySupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,o.getBrowserContext)())||void 0===t?void 0:t.tabs)||void 0===n?void 0:n.query)||(r.warn().log("API tabs.query is not supported",...e),!1)};t.isTabsSendMessageSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,o.getBrowserContext)())||void 0===t?void 0:t.tabs)||void 0===n?void 0:n.sendMessage)||(r.warn().log("API tabs.sendMessage is not supported",...e),!1)};t.isRuntimeGetUrlSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,o.getBrowserContext)())||void 0===t?void 0:t.runtime)||void 0===n?void 0:n.getURL)||(r.warn().log("API runtime.getURL is not supported",...e),!1)}},1393:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getWebAccessibleUrl=t.getBrowserContext=void 0;const o=n(5099);t.getBrowserContext=()=>"undefined"!=typeof browser?browser:chrome;t.getWebAccessibleUrl=e=>(0,o.isRuntimeGetUrlSupported)(e)?(0,t.getBrowserContext)().runtime.getURL(e):""},332:function(e,t){var n=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,s){function i(e){try{d(o.next(e))}catch(e){s(e)}}function a(e){try{d(o.throw(e))}catch(e){s(e)}}function d(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}d((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.createFormDataString=t.compareVersions=t.getVersionFromString=t.removeDoubleQuotesAround=t.removeQuotesAround=t.removeBracketsAround=t.buildQueryParts=t.getElementsUnderCursor=t.downloadFile=t.copyToClipboard=t.createClassName=t.waitHTMLElement=t.isInsideIframe=t.mountHTMLElement=t.cssObjectToString=void 0;t.cssObjectToString=e=>Object.keys(e).reduce(((t,n)=>t+`${n}:${e[n]};`),"");t.mountHTMLElement=(e,n,o)=>{const r=document.createElement(e);return(null==o?void 0:o.attributes)&&Object.keys(o.attributes).forEach((e=>{var n;r.setAttribute(e,"style"===e?(0,t.cssObjectToString)(o.attributes[e]):(null===(n=o.attributes)||void 0===n?void 0:n[e])||"")})),(null==o?void 0:o.innerHtml)&&(r.innerHTML=o.innerHtml),(null==o?void 0:o.innerText)&&(r.innerText=o.innerText),n&&n.append(r),r};t.isInsideIframe=()=>{try{return window.self!==window.top}catch(e){return!0}};t.waitHTMLElement=(e,t=document)=>n(void 0,void 0,void 0,(function*(){return new Promise((n=>{new MutationObserver(((o,r)=>{const s=t.querySelector(e);s&&(r.disconnect(),n(s))})).observe(t,{childList:!0,subtree:!0})}))}));t.createClassName=e=>e.filter(Boolean).join(" ");t.copyToClipboard=e=>{const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.opacity="0",t.style.position="absolute",t.style.left="-99999px",t.style.top="-99999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)};t.downloadFile=(e,t,n)=>{const o=document.createElement("a");o.setAttribute("href",encodeURI(`data:text/csv;charset=utf-8,${t}`)),o.setAttribute("download",`${n}.csv`),document.body.appendChild(o),o.click(),document.body.removeChild(o)};t.getElementsUnderCursor=(e,t)=>{const n=e.clientX,o=e.clientY,r=[],s=[];let i=document.elementFromPoint(n,o);for(;"HTML"!==i.tagName;){const e=i.style.pointerEvents;if(!i)break;(!t||t&&t(i))&&r.push(i),s.push({savedPointerEvents:e,element:i}),i.style.pointerEvents="none",i=document.elementFromPoint(n,o)}return s.forEach((({element:e,savedPointerEvents:t})=>{t?e.style.pointerEvents=t:e.style.removeProperty("pointer-events"),e.getAttribute("style")||e.removeAttribute("style")})),r};t.buildQueryParts=(e,t,n,o,r,s)=>{const i=[];Object.keys(e).forEach((o=>{i.push(e[o].map((e=>`${r.leftOperand(o)}${t(o,e)}${r.rightOperand(e)}`)).join(n))}));const a=i.join(o);return s?`${s} ${a}`:a};t.removeBracketsAround=e=>{let t=e;return"("===e[0]&&(t=t.slice(1)),")"===e[e.length-1]&&(t=t.slice(0,e.length-2)),t};t.removeQuotesAround=e=>{let t=e;return'"'!==e[0]&&"'"!==e[0]||(t=t.slice(1)),'"'!==e[e.length-1]&&"'"!==e[e.length-1]||(t=t.slice(0,e.length-2)),t};t.removeDoubleQuotesAround=e=>{let t=e;return'"'===e[0]&&(t=t.slice(1)),'"'===e[e.length-1]&&(t=t.slice(0,e.length-2)),t};t.getVersionFromString=e=>{if("string"!=typeof e||!/^[.0-9]+$/.test(e))return 0;const t=parseInt(e.replace(/\./g,""));return isNaN(t)?0:t};t.compareVersions=(e,n)=>{const o=(0,t.getVersionFromString)(e),r=(0,t.getVersionFromString)(n);return o===r?"equal":o>r?"greater":"less"};t.createFormDataString=e=>{const t=[];for(const[n,o]of Object.entries(e))t.push(`${encodeURIComponent(n)}=${encodeURIComponent(o)}`);return t.join("&").replace(/%20/g,"+")}},3799:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isMessageMatched=void 0;const o=n(5482);t.isMessageMatched=(e,t,...n)=>!!e()&&(o.loggers.debug().log(`got ${t.type} message`,t,...n),!0)},1595:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.version=t.logLevel=t.mode=t.backgroundPlatformIDFromENV=t.contentPlatformIDFromENV=void 0;const o=n(3319),r=n(9068);t.contentPlatformIDFromENV=(Object.values(o.PlatformID).includes(null),null),t.backgroundPlatformIDFromENV=(Object.values(o.PlatformID).includes(null),null),t.mode="production"===r.Mode.production?r.Mode.production:r.Mode.development,t.logLevel=Object.keys(r.LogLevel).includes("info")?"info":r.LogLevel.info,t.version="1.2.5"},5482:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.setLoggers=t.Loggers=t.setDebugMode=t.loggers=void 0;const o=n(9068),r=n(1595);let s=r.mode===o.Mode.development||r.logLevel===o.LogLevel.debug;t.setDebugMode=e=>{s=e};class i{constructor(e="",t=o.LogLevel.info){this.prefix="",this.level=o.LogLevel.info,this.prefix=e,this.level=t}createInstance(e="",t=o.LogLevel.info){return new i(e,t)}log(...e){(this.level!==o.LogLevel.debug||s)&&console[this.level===o.LogLevel.error?"error":this.level===o.LogLevel.warn?"warn":"log"](this.prefix||"==>",...e)}error(){return this.createInstance(`ERROR: ${this.prefix}`,o.LogLevel.error)}warn(){return this.createInstance(`WARN: ${this.prefix}`,o.LogLevel.warn)}info(){return this.createInstance(`INFO: ${this.prefix}`,o.LogLevel.info)}debug(){return this.createInstance(`DEBUG: ${this.prefix}`,o.LogLevel.debug)}addPrefix(e){return this.createInstance([this.prefix,e].join(" "),this.level)}setLevel(e){return this.createInstance(this.prefix,e)}setPrefix(e){return t.loggers=this.addPrefix(e),t.loggers}}t.Loggers=i,t.loggers=new i;t.setLoggers=e=>{t.loggers=e}},1846:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DebugID=void 0;const o=n(9068),r=n(1518);!function(e){e[e.debugIDExternal=(0,o.mapType)(r.debugID)]="debugIDExternal"}(t.DebugID||(t.DebugID={}))},1518:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.debugID=t.getExecutingContextByMessageType=t.getDebugPrefix=void 0;t.getDebugPrefix=e=>"background"===e?"bg ==>":"content"===e?"cs ==>":"inline"===e?"is ==>":"app"===e?"app ==>":"unknown ==>";t.getExecutingContextByMessageType=e=>{let t=(e||"").slice(0,3).toLowerCase();return"app"===t?"app":(t=t.slice(0,2),"bg"===t?"background":"cs"===t?"content":"is"===t?"inline":"unknown")},t.debugID="debug-external-der3edc3op3e4dde44rt"},3319:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PlatformName=t.PlatformID=t.Browser=void 0,function(e){e.chrome="chrome",e.firefox="firefox",e.edge="edge"}(t.Browser||(t.Browser={})),function(e){e.MicrosoftSentinel="MicrosoftSentinel",e.MicrosoftDefender="MicrosoftDefender",e.Splunk="Splunk",e.QRadar="QRadar",e.Elastic="Elastic",e.OpenSearch="OpenSearch",e.ArcSight="ArcSight",e.Athena="Athena"}(t.PlatformID||(t.PlatformID={})),function(e){e.MicrosoftSentinel="Microsoft Sentinel",e.MicrosoftDefender="Microsoft Defender For Endpoint",e.Splunk="Splunk",e.QRadar="IBM QRadar",e.Elastic="Elastic",e.OpenSearch="OpenSearch",e.ArcSight="ArcSight",e.Athena="Amazon Athena"}(t.PlatformName||(t.PlatformName={}))},1086:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractContentPlatform=void 0;const o=n(3799),r=n(8312),s=n(6994),i=n(4689),a=n(8918);t.AbstractContentPlatform=class{static processInlineListeners(e){if((0,o.isMessageMatched)((()=>r.MessageToContent.CSModifyQuery===e.type),e)&&(0,s.sendMessageFromContent)(Object.assign(Object.assign({},e),{id:`${e.id}--${e.type}`,type:i.MessageToInline.ISModifyQuery}),!1),(0,o.isMessageMatched)((()=>r.MessageToContent.CSSetQuery===e.type),e)&&(0,s.sendMessageFromContent)(Object.assign(Object.assign({},e),{id:`${e.id}--${e.type}`,type:i.MessageToInline.ISSetQuery}),!1),(0,o.isMessageMatched)((()=>r.MessageToContent.CSGetQuery===e.type),e)&&(0,s.sendMessageFromContent)(Object.assign(Object.assign({},e),{id:`${e.id}--${e.type}`,type:i.MessageToInline.ISGetQuery}),!1),(0,o.isMessageMatched)((()=>r.MessageToContent.CSSendMessageOutside===e.type),e)&&(0,s.sendMessageFromContent)(Object.assign(Object.assign({},e),{id:`${e.id}--${e.type}`,type:a.MessageToBackground.BGSendMessageOutside})),(0,o.isMessageMatched)((()=>r.MessageToContent.CSSetDebugMode===e.type),e)){const{debugMode:t}=e.payload;n(5482).setDebugMode(t),(0,s.sendMessageFromContent)(Object.assign(Object.assign({},e),{id:`${e.id}--${e.type}`,type:i.MessageToInline.ISSetDebugMode}),!1)}if((0,o.isMessageMatched)((()=>r.MessageToContent.CSDirectMessageToApp===e.type),e)&&(0,s.sendMessageFromContent)({id:`${e.id}--${e.type}`,type:a.MessageToBackground.BGDirectMessageToApp,payload:e.payload}),(0,o.isMessageMatched)((()=>r.MessageToContent.CSDirectMessageToInline===e.type),e)){const{type:t,payload:n}=e.payload;(0,s.sendMessageFromContent)({id:`${e.id}--${e.type}`,type:t,payload:n},!1)}}}},8026:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.OpenSearchPlatform=void 0;const o=n(5404),r=n(8401),s=n(3319),i=n(7838),a=n(332),d=n(770),l=n(7281),u=n(1393),c=n(1086);let g;class p extends c.AbstractContentPlatform{constructor(){super(...arguments),this.defaultWatchers={[r.BoundedResourceTypeID.Accounts]:["user.name","related.user","user.full_name","winlog.event_data.SubjectUserName","winlog.event_data.TargetUserName","winlog.user.name"],[r.BoundedResourceTypeID.Assets]:["host.hostname","host.name","winlog.computer_name"]},this.extensionDefaultPosition=p.extensionDefaultPosition}static buildQueryParts(e,t,n=!1){const o="include"===e?"AND":"AND NOT",r={};return Object.keys(t).forEach((e=>{t[e].length>1?r[e]=[`(${t[e].map((e=>p.normalizedValue(e))).join(" OR ")})`]:r[e]=t[e]})),(0,a.buildQueryParts)(r,(()=>":"),"exclude"===e?" AND NOT ":" OR ","exclude"===e?" AND NOT ":" AND ",{leftOperand:e=>e,rightOperand:e=>p.normalizedValue(e)},n?o:void 0)}getID(){return p.id}getName(){return s.PlatformName.OpenSearch}static setListeners(){l.addListener(o.ListenerType.OnMessage,(e=>{c.AbstractContentPlatform.processInlineListeners(e)})),g.debug().log("listeners were set")}static connectInlineListener(){(0,a.mountHTMLElement)("script",document.body,{attributes:{src:(0,u.getWebAccessibleUrl)(d.openSearchInline),type:"text/javascript","data-type":"inline-listener"}}),g.debug().log("inline mounted")}connect(){p.setListeners(),p.connectInlineListener(),g.debug().log("connected")}buildQueryParts(e,t,n){return p.buildQueryParts(e,t,n)}}t.OpenSearchPlatform=p,p.id=s.PlatformID.OpenSearch,p.extensionDefaultPosition={top:0,left:0,width:480,height:480},p.normalizedValue=e=>{let t=(0,i.isNumberInString)(e)?parseFloat(e):String(e).trim();return"number"==typeof t||"("===t[0]||")"===t[t.length-1]?t:`"${t.replace(/"/g,'\\"')}"`},g=n(5482).loggers.addPrefix(p.id)},7281:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.addListener=void 0;const o=n(5404),r=n(1846),s=n(5099),i=n(1393),a=n(1518),d={};t.addListener=(e,t,...n)=>{var o;null===(o=d[e])||void 0===o||o.call(d,((...e)=>{t(...e)}),...n)};const l=[];d[o.ListenerType.OnMessage]=(e,...t)=>{if((0,s.isRuntimeOnMessageSupported)()){const n=(0,i.getBrowserContext)().runtime.onMessage;l.push((()=>{n.removeListener(e)})),n.addListener(((...t)=>{e(...t)}),...t)}if(!(0,s.isAddEventListenerSupported)())return;const n=n=>{const o=n.data;n.origin!==window.location.origin||"content"!==(0,a.getExecutingContextByMessageType)(o.type)&&o.externalType!==r.DebugID.debugIDExternal||e(n.data,...t)};l.push((()=>{window.removeEventListener("message",n)})),window.addEventListener("message",n)}},6994:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.sendMessageFromApp=t.sendMessageFromContent=t.sendMessage=void 0;const o=n(412),r=n(5099),s=n(1393),i=n(5482).loggers.addPrefix("services");t.sendMessage=(e,t,n=!0)=>{var i;t.id=`${t.id?`${t.id}--`:""}${(0,o.uuid)()}`;const a="sendMessage";try{return n||(0,r.isPostMessageSupported)(t)?n?(0,r.isRuntimeSendMessageSupported)()?(null===(i=(0,s.getBrowserContext)().runtime.sendMessage(t))||void 0===i||i.catch((n=>e.error().addPrefix(a).log(n,t))),e.debug().addPrefix(a).log(t),t):t:(window.postMessage(t),e.debug().log("postMessage",t),t):t}catch(n){return e.error().addPrefix(a).log(n,t),t}};t.sendMessageFromContent=(e,n=!0)=>(0,t.sendMessage)(i.addPrefix("message-from-content"),e,n);t.sendMessageFromApp=(e,n=!0)=>(0,t.sendMessage)(i.addPrefix("message-from-app"),e,n)},5404:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ListenerType=void 0,function(e){e.OnMessage="OnMessage"}(t.ListenerType||(t.ListenerType={}))},8312:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MessageToContent=void 0;const o=n(1518);var r;!function(e){e.CSModifyQuery="CSModifyQuery",e.CSSetQuery="CSSetQuery",e.CSGetQuery="CSGetQuery",e.CSSendMessageOutside="CSSendMessageOutside",e.CSConnectPlatform="CSConnectPlatform",e.CSSetDebugMode="CSSetDebugMode",e.CSDirectMessageToApp="CSDirectMessageToApp",e.CSDirectMessageToInline="CSDirectMessageToInline"}(r=t.MessageToContent||(t.MessageToContent={})),Object.values(r).forEach((e=>{if("content"!==(0,o.getExecutingContextByMessageType)(e))throw new Error(`Wrong content message type "${e}"`)}))},4689:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MessageToInline=void 0;const o=n(1518);var r;!function(e){e.ISModifyQuery="ISModifyQuery",e.ISSetQuery="ISSetQuery",e.ISGetQuery="ISGetQuery",e.ISSetDebugMode="ISSetDebugMode",e.ISRemoveHash="ISRemoveHash",e.ISRemoveFieldSpecification="ISRemoveFieldSpecification"}(r=t.MessageToInline||(t.MessageToInline={})),Object.values(r).forEach((e=>{if("inline"!==(0,o.getExecutingContextByMessageType)(e))throw new Error(`Wrong inline message type "${e}"`)}))},770:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.accessibleResources=t.openSearchInline=t.arcSightInline=t.elasticInline=t.qRadarInline=t.splunkInline=t.amazonAthenaInline=t.microsoftDefenderInline=t.microsoftSentinelInline=t.appStyles=void 0;const o=n(3319);t.appStyles="app-styles.css",t.microsoftSentinelInline="inline-microsoft-sentinel.js",t.microsoftDefenderInline="inline-microsoft-defender.js",t.amazonAthenaInline="inline-amazon-athena.js",t.splunkInline="inline-splunk.js",t.qRadarInline="inline-qradar.js",t.elasticInline="inline-elastic.js",t.arcSightInline="inline-arcsight.js",t.openSearchInline="inline-opensearch.js",t.accessibleResources={[o.PlatformID.MicrosoftSentinel]:[t.microsoftSentinelInline],[o.PlatformID.MicrosoftDefender]:[t.microsoftDefenderInline],[o.PlatformID.Splunk]:[t.splunkInline],[o.PlatformID.QRadar]:[t.qRadarInline],[o.PlatformID.Elastic]:[t.elasticInline],[o.PlatformID.ArcSight]:[t.arcSightInline],[o.PlatformID.Athena]:[t.amazonAthenaInline],[o.PlatformID.OpenSearch]:[t.openSearchInline],app:[t.appStyles]}}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var s=t[o]={exports:{}};return e[o].call(s.exports,s,s.exports,n),s.exports}(()=>{const e=n(1518);n(5482).loggers.setPrefix((0,e.getDebugPrefix)("inline"))})(),(()=>{const e=n(3799),t=n(4689),o=new(n(8026).OpenSearchPlatform),r=n(5482).loggers.addPrefix(o.getID());window.addEventListener("message",(s=>{const i=s.data;if((0,e.isMessageMatched)((()=>t.MessageToInline.ISModifyQuery===i.type),i,s)){const e=document.querySelector('.euiTextArea[data-test-subj="queryInput"]');if(!e)return r.warn().log("query input not found");const t=e.value,{resources:n,modifyType:s}=i.payload;if("show all"===s)return e.value=o.buildQueryParts(s,n),void e.click();const a=o.buildQueryParts(s,n,!0);e.value=`${t} ${a}`,e.click()}if((0,e.isMessageMatched)((()=>t.MessageToInline.ISSetDebugMode===i.type),i,s)){const{debugMode:e}=i.payload;n(5482).setDebugMode(e)}})),r.debug().log("mounted")})()})();