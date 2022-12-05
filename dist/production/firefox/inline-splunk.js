(()=>{"use strict";var e={7838:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isAllowedProtocol=t.isNumberInString=t.isNotEmpty=t.isString=void 0;const r=n(9068),o=n(412);t.isString=e=>"string"==typeof e;t.isNotEmpty=e=>!!(0,t.isString)(e)&&""!==e.trim();t.isNumberInString=e=>{if("string"!=typeof e)return!1;const t=e.trim();return!(!/^[.0-9]*$/.test(t)||(0,o.indexOfAll)(t,".").length>1)&&!Number.isNaN(parseFloat(t))};t.isAllowedProtocol=(e,t)=>{if(t===r.Mode.development)return!0;const n=e.trim().toLowerCase();return"https:"===n||"https"===n}},412:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.indexOfAll=t.sortNumbers=t.debounce=t.formatDate=t.formatBinaryDate=t.createNonDuplicateValue=t.capitalizeFirstLetter=t.formatString=t.deduplicateArray=t.parseJSONSafe=t.clearLineBreaks=t.clearExtraSpaces=t.uuid=t.isFlatObjectsEqual=void 0;t.isFlatObjectsEqual=(e,t)=>{const n=Object.keys(e),r=Object.keys(t);return n.length===r.length&&!n.some((n=>e[n]!==t[n]))};t.uuid=()=>Math.random().toString(36).substring(5)+Date.now().toString(36)+Math.random().toString(36).substring(5);t.clearExtraSpaces=e=>e.replace(/ +/g," ");t.clearLineBreaks=e=>e.trim().replace(/(\r\n|\n|\r)/gm," ");t.parseJSONSafe=(e,t)=>{try{return JSON.parse(e)}catch(e){return t}};t.deduplicateArray=e=>[...Array.from(new Set([...e]))];t.formatString=(e,t,n)=>Object.keys(t||{}).map((e=>({value:t[e],key:n?n(e):`%${e}`}))).reduce(((e,t)=>e.replace(new RegExp(t.key,"g"),t.value)),e)||e;t.capitalizeFirstLetter=e=>`${e.charAt(0).toUpperCase()}${e.slice(1)}`;t.createNonDuplicateValue=(e,t)=>{if(!t.includes(e))return e;let n=1,r=e,o=r.slice(0,r.length-1);for(;t.includes(o);)r=o,o=o.slice(0,o.length-1);for(;t.includes(`${r}${n}`);)n++;return`${r}${n}`};t.formatBinaryDate=e=>{const t="string"==typeof e?e:String(e);return t.length>1?t:`0${t}`};t.formatDate=(e,n)=>(0,t.formatString)(e,{Y:String(n.getFullYear()),M:(0,t.formatBinaryDate)(n.getMonth()),m:(0,t.formatBinaryDate)(n.getMinutes()),s:(0,t.formatBinaryDate)(n.getSeconds()),ms:(0,t.formatBinaryDate)(n.getMilliseconds()),d:(0,t.formatBinaryDate)(n.getDate()),h:(0,t.formatBinaryDate)(n.getHours())});t.debounce=(e,t)=>{let n;return function(...r){const o=this;clearTimeout(n),n=setTimeout((()=>e.apply(o,r)),t)}};t.sortNumbers=(e,t)=>e>t?1:e<t?-1:0;t.indexOfAll=(e,t)=>{const n=[];let r=-1;for(;(r=e.indexOf(t,r+1))>=0;)n.push(r);return n}},9068:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.mapType=t.LogLevel=t.Mode=void 0,function(e){e.production="production",e.development="development"}(t.Mode||(t.Mode={})),function(e){e.info="info",e.debug="debug",e.error="error",e.warn="warn"}(t.LogLevel||(t.LogLevel={}));t.mapType=e=>e},8401:(e,t)=>{var n;Object.defineProperty(t,"__esModule",{value:!0}),t.boundedResourcesTypeIDs=t.BoundedResourceTypeID=void 0,function(e){e.Accounts="Accounts",e.Assets="Assets"}(n=t.BoundedResourceTypeID||(t.BoundedResourceTypeID={})),t.boundedResourcesTypeIDs=Object.keys(n)},5099:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isRuntimeGetUrlSupported=t.isTabsSendMessageSupported=t.isTabsQuerySupported=t.isOnBeforeSendHeadersSupported=t.isOnBeforeRequestSupported=t.isBrowserActionOnClickedSupported=t.isActionOnClickedSupported=t.isTabsOnRemovedSupported=t.isRuntimeOnMessageExternalSupported=t.isRuntimeOnMessageSupported=t.isRuntimeSendMessageSupported=t.isAddEventListenerSupported=t.isPostMessageSupported=void 0;const r=n(332),o=n(5482).loggers.addPrefix("api-support");t.isPostMessageSupported=(...e)=>!!(null===window||void 0===window?void 0:window.postMessage)||(o.warn().log("API window.postMessage is not supported",...e),!1);t.isAddEventListenerSupported=(...e)=>!!(null===window||void 0===window?void 0:window.addEventListener)||(o.warn().log("API window.addEventListener is not supported",...e),!1);t.isRuntimeSendMessageSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,r.getBrowserContext)())||void 0===t?void 0:t.runtime)||void 0===n?void 0:n.sendMessage)||(o.warn().log("API runtime.sendMessage is not supported",...e),!1)};t.isRuntimeOnMessageSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,r.getBrowserContext)().runtime)||void 0===t?void 0:t.onMessage)||void 0===n?void 0:n.addListener)||(o.warn().log("API runtime.onMessage.addListener is not supported",...e),!1)};t.isRuntimeOnMessageExternalSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,r.getBrowserContext)().runtime)||void 0===t?void 0:t.onMessageExternal)||void 0===n?void 0:n.addListener)||(o.warn().log("API runtime.onMessageExternal.addListener is not supported",...e),!1)};t.isTabsOnRemovedSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,r.getBrowserContext)().tabs)||void 0===t?void 0:t.onRemoved)||void 0===n?void 0:n.addListener)||(o.warn().log("API tabs.onRemoved.addListener is not supported",...e),!1)};t.isActionOnClickedSupported=(...e)=>{var t,n,s;return!!(null===(s=null===(n=null===(t=(0,r.getBrowserContext)())||void 0===t?void 0:t.action)||void 0===n?void 0:n.onClicked)||void 0===s?void 0:s.addListener)||(o.warn().log("API action.onClicked.addListener is not supported",...e),!1)};t.isBrowserActionOnClickedSupported=(...e)=>{var t,n,s;return!!(null===(s=null===(n=null===(t=(0,r.getBrowserContext)())||void 0===t?void 0:t.browserAction)||void 0===n?void 0:n.onClicked)||void 0===s?void 0:s.addListener)||(o.warn().log("API browserAction.onClicked.addListener is not supported",...e),!1)};t.isOnBeforeRequestSupported=(...e)=>{var t,n,s;return!!(null===(s=null===(n=null===(t=(0,r.getBrowserContext)())||void 0===t?void 0:t.webRequest)||void 0===n?void 0:n.onBeforeRequest)||void 0===s?void 0:s.addListener)||(o.warn().log("API webRequest.onBeforeRequest is not supported",...e),!1)};t.isOnBeforeSendHeadersSupported=(...e)=>{var t,n,s;return!!(null===(s=null===(n=null===(t=(0,r.getBrowserContext)())||void 0===t?void 0:t.webRequest)||void 0===n?void 0:n.onBeforeSendHeaders)||void 0===s?void 0:s.addListener)||(o.warn().log("API webRequest.onBeforeSendHeaders is not supported",...e),!1)};t.isTabsQuerySupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,r.getBrowserContext)())||void 0===t?void 0:t.tabs)||void 0===n?void 0:n.query)||(o.warn().log("API tabs.query is not supported",...e),!1)};t.isTabsSendMessageSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,r.getBrowserContext)())||void 0===t?void 0:t.tabs)||void 0===n?void 0:n.sendMessage)||(o.warn().log("API tabs.sendMessage is not supported",...e),!1)};t.isRuntimeGetUrlSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,r.getBrowserContext)())||void 0===t?void 0:t.runtime)||void 0===n?void 0:n.getURL)||(o.warn().log("API runtime.getURL is not supported",...e),!1)}},332:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,s){function i(e){try{a(r.next(e))}catch(e){s(e)}}function d(e){try{a(r.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,d)}a((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.createFormDataString=t.compareVersions=t.getVersionFromString=t.removeDoubleQuotesAround=t.buildQueryParts=t.getElementsUnderCursor=t.downloadFile=t.copyToClipboard=t.createClassName=t.waitHTMLElement=t.isInsideIframe=t.mountHTMLElement=t.cssObjectToString=t.getExecutingContextByMessageType=t.getWebAccessibleUrl=t.getBrowserContext=void 0;const o=n(5099);t.getBrowserContext=()=>"undefined"!=typeof browser?browser:chrome;t.getWebAccessibleUrl=e=>(0,o.isRuntimeGetUrlSupported)(e)?(0,t.getBrowserContext)().runtime.getURL(e):"";t.getExecutingContextByMessageType=e=>{let t=e.slice(0,3).toLowerCase();return"app"===t?"app":(t=t.slice(0,2),"bg"===t?"background":"cs"===t?"content":"is"===t?"inline":"unknown")};t.cssObjectToString=e=>Object.keys(e).reduce(((t,n)=>t+`${n}:${e[n]};`),"");t.mountHTMLElement=(e,n,r)=>{const o=document.createElement(e);return(null==r?void 0:r.attributes)&&Object.keys(r.attributes).forEach((e=>{var n;o.setAttribute(e,"style"===e?(0,t.cssObjectToString)(r.attributes[e]):(null===(n=r.attributes)||void 0===n?void 0:n[e])||"")})),(null==r?void 0:r.innerHtml)&&(o.innerHTML=r.innerHtml),(null==r?void 0:r.innerText)&&(o.innerText=r.innerText),n&&n.append(o),o};t.isInsideIframe=()=>{try{return window.self!==window.top}catch(e){return!0}};t.waitHTMLElement=(e,t=document)=>r(void 0,void 0,void 0,(function*(){return new Promise((n=>{new MutationObserver(((r,o)=>{const s=t.querySelector(e);s&&(o.disconnect(),n(s))})).observe(t,{childList:!0,subtree:!0})}))}));t.createClassName=e=>e.filter(Boolean).join(" ");t.copyToClipboard=e=>{const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-99999px",t.style.top="-99999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)};t.downloadFile=(e,t,n)=>{const r=document.createElement("a");r.setAttribute("href",encodeURI(`data:text/csv;charset=utf-8,${t}`)),r.setAttribute("download",`${n}.csv`),document.body.appendChild(r),r.click(),document.body.removeChild(r)};t.getElementsUnderCursor=(e,t)=>{const n=e.clientX,r=e.clientY,o=[],s=[];let i=document.elementFromPoint(n,r);for(;"HTML"!==i.tagName;){const e=i.style.pointerEvents;if(!i)break;(!t||t&&t(i))&&o.push(i),s.push({savedPointerEvents:e,element:i}),i.style.pointerEvents="none",i=document.elementFromPoint(n,r)}return s.forEach((({element:e,savedPointerEvents:t})=>{t?e.style.pointerEvents=t:e.style.removeProperty("pointer-events"),e.getAttribute("style")||e.removeAttribute("style")})),o};t.buildQueryParts=(e,t,n,r)=>Object.keys(e).reduce(((o,s)=>(o.push(e[s].map((e=>`${r.leftOperand(s)} ${t} ${r.rightOperand(e)}`)).join(n)),o)),[]).join(n);t.removeDoubleQuotesAround=e=>{let t=e;return'"'===e[0]&&(t=t.slice(1)),'"'===e[e.length-1]&&(t=t.slice(0,e.length-2)),t};t.getVersionFromString=e=>{if("string"!=typeof e||!/^[.0-9]+$/.test(e))return 0;const t=parseInt(e.replace(/\./g,""));return isNaN(t)?0:t};t.compareVersions=(e,n)=>{const r=(0,t.getVersionFromString)(e),o=(0,t.getVersionFromString)(n);return r===o?"equal":r>o?"greater":"less"};t.createFormDataString=e=>{const t=[];for(const[n,r]of Object.entries(e))t.push(`${encodeURIComponent(n)}=${encodeURIComponent(r)}`);return t.join("&").replace(/%20/g,"+")}},3799:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isMessageMatched=void 0;const r=n(5482);t.isMessageMatched=(e,t,...n)=>!!e()&&(r.loggers.debug().log(`got ${t.type} message`,t,...n),!0)},1595:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.version=t.logLevel=t.mode=t.backgroundPlatformIDFromENV=t.contentPlatformIDFromENV=void 0;const r=n(3319),o=n(9068);t.contentPlatformIDFromENV=(Object.values(r.PlatformID).includes(null),null),t.backgroundPlatformIDFromENV=(Object.values(r.PlatformID).includes(null),null),t.mode="production"===o.Mode.production?o.Mode.production:o.Mode.development,t.logLevel=Object.keys(o.LogLevel).includes("info")?"info":o.LogLevel.info,t.version="1.1.0"},5482:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Loggers=t.stopLogging=t.startLogging=t.loggers=void 0;const r=n(9068),o=n(1595);let s=!0;t.startLogging=()=>s=!0;t.stopLogging=()=>s=!1;class i{constructor(e="",t=r.LogLevel.info){this.prefix="",this.level=r.LogLevel.info,this.prefix=e,this.level=t}createInstance(e="",t=r.LogLevel.info){return new i(e,t)}log(...e){s&&(o.mode===r.Mode.production&&this.level===r.LogLevel.debug&&o.logLevel!==r.LogLevel.debug||o.mode!==r.Mode.production&&console[this.level===r.LogLevel.error?"error":this.level===r.LogLevel.warn?"warn":"log"](this.prefix||"==>",...e))}error(){return this.createInstance(`ERROR: ${this.prefix}`,r.LogLevel.error)}warn(){return this.createInstance(`WARN: ${this.prefix}`,r.LogLevel.warn)}info(){return this.createInstance(`INFO: ${this.prefix}`,r.LogLevel.info)}debug(){return this.createInstance(`DEBUG: ${this.prefix}`,r.LogLevel.debug)}addPrefix(e){return this.createInstance([this.prefix,e].join(" "),this.level)}setLevel(e){return this.createInstance(this.prefix,e)}setPrefix(e){return t.loggers=this.addPrefix(e),t.loggers}}t.Loggers=i,t.loggers=new i},1846:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DebugID=t.getDebugPrefix=void 0;const r=n(9068);t.getDebugPrefix=e=>"background"===e?"bg ==>":"content"===e?"cs ==>":"inline"===e?"is ==>":"app"===e?"app ==>":"unknown ==>";const o=(0,r.mapType)("debug-external-der3edc3op3e4dde44rt");!function(e){e[e.debugIDExternal=o]="debugIDExternal"}(t.DebugID||(t.DebugID={}))},3319:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PlatformName=t.PlatformID=t.Browser=void 0,function(e){e.chrome="chrome",e.firefox="firefox",e.edge="edge"}(t.Browser||(t.Browser={})),function(e){e.MicrosoftSentinel="MicrosoftSentinel",e.MicrosoftDefender="MicrosoftDefender",e.Splunk="Splunk",e.QRadar="QRadar"}(t.PlatformID||(t.PlatformID={})),function(e){e.MicrosoftSentinel="Microsoft Sentinel",e.MicrosoftDefender="Microsoft Defender For Endpoint",e.Splunk="Splunk",e.QRadar="IBM QRadar"}(t.PlatformName||(t.PlatformName={}))},409:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SplunkPlatform=void 0;const r=n(5404),o=n(3319),s=n(7281),i=n(3799),d=n(8312),a=n(6994),l=n(4689),u=n(332),c=n(770),p=n(8401),g=n(7838),f=n(412);let m;class v{constructor(){this.defaultWatchers={[p.BoundedResourceTypeID.Accounts]:(0,f.deduplicateArray)(["src_user","src_user_bunit","user","Account_Name","User","src_user_name","user_name"]),[p.BoundedResourceTypeID.Assets]:(0,f.deduplicateArray)(["dest_host","dst","dest_nt_host","src_host","src_nt_host","src","dest","dest_name","dest_host","dvc","dvc_host","dest_dns","src_dns","ComputerName","DestinationHostname","SourceHostname"])},this.extensionDefaultPosition=v.extensionDefaultPosition}static normalizedValue(e){const t=(0,g.isNumberInString)(e)?parseFloat(e):e;return"number"==typeof t?t:`"${t}"`}static buildQueryParts(e,t){return(0,u.buildQueryParts)(t,"exclude"===e?"!=":"==","exclude"===e?" and ":" or ",{leftOperand:e=>e,rightOperand:e=>v.normalizedValue(e)})}buildQueryParts(e,t){return v.buildQueryParts(e,t)}getID(){return v.id}getName(){return o.PlatformName.Splunk}static setListeners(){s.addListener(r.ListenerType.OnMessage,(e=>{(0,i.isMessageMatched)((()=>d.MessageToContent.CSModifyQuery===e.type),e)&&(0,a.sendMessageFromContent)(Object.assign(Object.assign({},e),{id:`${e.id}--content-modify-query`,type:l.MessageToInline.ISModifyQuery}),!1)}))}static connectInlineListener(){(0,u.mountHTMLElement)("script",document.body,{attributes:{src:(0,u.getWebAccessibleUrl)(c.splunkInline),type:"text/javascript","data-type":"inline-listener"}})}connect(){v.setListeners(),v.connectInlineListener(),m.debug().log("connected")}}t.SplunkPlatform=v,v.id=o.PlatformID.Splunk,v.extensionDefaultPosition={top:0,left:0,width:480,height:480},m=n(5482).loggers.addPrefix(v.id)},7281:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.addListener=void 0;const r=n(5404),o=n(332),s=n(1846),i=n(5099),d={};t.addListener=(e,t,...n)=>{var r;null===(r=d[e])||void 0===r||r.call(d,((...e)=>{t(...e)}),...n)};const a=[];d[r.ListenerType.OnMessage]=(e,...t)=>{if((0,i.isRuntimeOnMessageSupported)()){const n=(0,o.getBrowserContext)().runtime.onMessage;a.push((()=>{n.removeListener(e)})),n.addListener(((...t)=>{e(...t)}),...t)}if(!(0,i.isAddEventListenerSupported)())return;const n=n=>{const r=n.data;n.origin===window.location.origin&&r.externalType===s.DebugID.debugIDExternal&&e(n.data,...t)};a.push((()=>{window.removeEventListener("message",n)})),window.addEventListener("message",n)}},6994:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.sendMessageFromApp=t.sendMessageFromContent=t.sendMessage=void 0;const r=n(332),o=n(412),s=n(5099),i=n(5482).loggers.addPrefix("services");t.sendMessage=(e,t,n=!0)=>{var i;t.id=`${t.id?`${t.id}--`:""}${(0,o.uuid)()}`;const d="sendMessage";try{if(!n&&!(0,s.isPostMessageSupported)(t))return;if(!n)return window.postMessage(t),e.debug().log("postMessage",t);if(!(0,s.isRuntimeSendMessageSupported)())return;null===(i=(0,r.getBrowserContext)().runtime.sendMessage(t))||void 0===i||i.catch((n=>e.error().addPrefix(d).log(n,t))),e.debug().addPrefix(d).log(t)}catch(n){e.error().addPrefix(d).log(n,t)}};t.sendMessageFromContent=(e,n=!0)=>(0,t.sendMessage)(i.addPrefix("message-from-content"),e,n);t.sendMessageFromApp=(e,n=!0)=>(0,t.sendMessage)(i.addPrefix("message-from-app"),e,n)},5404:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ListenerType=void 0,function(e){e.OnMessage="OnMessage"}(t.ListenerType||(t.ListenerType={}))},8312:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MessageToContent=void 0;const r=n(332);var o;!function(e){e.CSModifyQuery="CSModifyQuery",e.CSConnectPlatform="CSConnectPlatform"}(o=t.MessageToContent||(t.MessageToContent={})),Object.values(o).forEach((e=>{if("content"!==(0,r.getExecutingContextByMessageType)(e))throw new Error(`Wrong content message type "${e}"`)}))},6459:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.buildNewQuery=t.getEditor=void 0;const r=n(412);t.getEditor=e=>{try{return ace.edit(e)}catch(e){return null}};t.buildNewQuery=(e,t,n)=>{var o;const s=`${"show all"===n?(null===(o=e.split("|").shift())||void 0===o?void 0:o.trim())||"<unknown>":e} ${t}`;return(0,r.clearExtraSpaces)(s)}},4689:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MessageToInline=void 0;const r=n(332);var o;!function(e){e.ISModifyQuery="ISModifyQuery"}(o=t.MessageToInline||(t.MessageToInline={})),Object.values(o).forEach((e=>{if("inline"!==(0,r.getExecutingContextByMessageType)(e))throw new Error(`Wrong inline message type "${e}"`)}))},770:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.accessibleResources=t.qRadarInline=t.splunkInline=t.microsoftDefenderInline=t.microsoftSentinelInline=t.appStyles=void 0;const r=n(3319);t.appStyles="app-styles.css",t.microsoftSentinelInline="inline-microsoft-sentinel.js",t.microsoftDefenderInline="inline-microsoft-defender.js",t.splunkInline="inline-splunk.js",t.qRadarInline="inline-qradar.js",t.accessibleResources={[r.PlatformID.MicrosoftSentinel]:[t.microsoftSentinelInline],[r.PlatformID.MicrosoftDefender]:[t.microsoftDefenderInline],[r.PlatformID.Splunk]:[t.splunkInline],[r.PlatformID.QRadar]:[t.qRadarInline],app:[t.appStyles]}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var s=t[r]={exports:{}};return e[r].call(s.exports,s,s.exports,n),s.exports}(()=>{const e=n(1846);n(5482).loggers.setPrefix((0,e.getDebugPrefix)("inline"))})(),(()=>{const e=n(3799),t=n(4689),r=n(6459),o=new(n(409).SplunkPlatform),s=n(5482).loggers.addPrefix(o.getID());window.addEventListener("message",(n=>{const i=n.data;if((0,e.isMessageMatched)((()=>t.MessageToInline.ISModifyQuery===i.type),i,n)){const e=document.querySelector("pre.ace_editor"),t=(0,r.getEditor)(e);if(!t)return s.error().log("editor not found",ace);const{resources:n,modifyType:d}=i.payload,a=` | where ${o.buildQueryParts(d,n)}`;t.setValue((0,r.buildNewQuery)(t.getValue(),a,d))}})),s.debug().log("mounted")})()})();