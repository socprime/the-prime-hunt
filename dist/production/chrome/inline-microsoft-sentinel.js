(()=>{"use strict";var e={7838:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isDate=t.isAllowedProtocol=t.isNumberInString=t.isNotEmpty=t.isString=void 0;const o=n(9068),r=n(412);t.isString=e=>"string"==typeof e;t.isNotEmpty=e=>!!(0,t.isString)(e)&&""!==e.trim();t.isNumberInString=e=>{if("number"==typeof e)return!0;if("string"!=typeof e)return!1;const t=e.trim();return!(!/^[.0-9]*$/.test(t)||(0,r.indexOfAll)(t,".").length>1)&&!Number.isNaN(parseFloat(t))};t.isAllowedProtocol=(e,t)=>{if(t===o.Mode.development)return!0;const n=e.trim().toLowerCase();return"https:"===n||"https"===n};t.isDate=e=>new Date("string"==typeof e&&(0,t.isNumberInString)(e)?parseInt(e):e).getTime()>5679828e5},412:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.indexOfAll=t.sortNumbers=t.debounce=t.formatDate=t.formatBinaryDate=t.createNonDuplicateValue=t.capitalizeFirstLetter=t.formatString=t.deduplicateArray=t.parseJSONSafe=t.splitByLines=t.clearLineBreaks=t.clearExtraSpaces=t.uuid=t.isFlatObjectsEqual=void 0;t.isFlatObjectsEqual=(e,t)=>{const n=Object.keys(e),o=Object.keys(t);return n.length===o.length&&!n.some((n=>e[n]!==t[n]))};t.uuid=()=>Math.random().toString(36).substring(5)+Date.now().toString(36)+Math.random().toString(36).substring(5);t.clearExtraSpaces=e=>e.replace(/ +/g," ");t.clearLineBreaks=e=>e.trim().replace(/(\r\n|\n|\r)/gm," ");t.splitByLines=(e,t=!1)=>{const n=new RegExp(/(\r\n|\n|\r)/,"gm");let o=e.split(n);return t&&(o=o.filter((e=>e&&"\r\n"!==e&&"\n"!==e&&"\r"!==e))),o};t.parseJSONSafe=(e,t)=>{try{return JSON.parse(e)}catch(e){return t}};t.deduplicateArray=e=>[...Array.from(new Set([...e]))];t.formatString=(e,t,n)=>Object.keys(t||{}).map((e=>({value:t[e],key:n?n(e):`%${e}`}))).reduce(((e,t)=>e.replace(new RegExp(t.key,"g"),t.value)),e)||e;t.capitalizeFirstLetter=e=>`${e.charAt(0).toUpperCase()}${e.slice(1)}`;t.createNonDuplicateValue=(e,t)=>{if(!t.includes(e))return e;let n=1,o=e,r=o.slice(0,o.length-1);for(;t.includes(r);)o=r,r=r.slice(0,r.length-1);for(;t.includes(`${o}${n}`);)n++;return`${o}${n}`};t.formatBinaryDate=e=>{const t="string"==typeof e?e:String(e);return t.length>1?t:`0${t}`};t.formatDate=(e,n)=>(0,t.formatString)(e,{Y:String(n.getFullYear()),M:(0,t.formatBinaryDate)(n.getMonth()+1),m:(0,t.formatBinaryDate)(n.getMinutes()),s:(0,t.formatBinaryDate)(n.getSeconds()),ms:(0,t.formatBinaryDate)(n.getMilliseconds()),d:(0,t.formatBinaryDate)(n.getDate()),h:(0,t.formatBinaryDate)(n.getHours())});t.debounce=(e,t)=>{let n;return function(...o){const r=this;clearTimeout(n),n=setTimeout((()=>e.apply(r,o)),t)}};t.sortNumbers=(e,t)=>e>t?1:e<t?-1:0;t.indexOfAll=(e,t)=>{const n=[];let o=-1;for(;(o=e.indexOf(t,o+1))>=0;)n.push(o);return n}},9068:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.mapType=t.LogLevel=t.Mode=void 0,function(e){e.production="production",e.development="development"}(t.Mode||(t.Mode={})),function(e){e.info="info",e.debug="debug",e.error="error",e.warn="warn"}(t.LogLevel||(t.LogLevel={}));t.mapType=e=>e},8401:(e,t)=>{var n;Object.defineProperty(t,"__esModule",{value:!0}),t.boundedResourcesTypeIDs=t.BoundedResourceTypeID=void 0,function(e){e.Accounts="Accounts",e.Assets="Assets"}(n=t.BoundedResourceTypeID||(t.BoundedResourceTypeID={})),t.boundedResourcesTypeIDs=Object.keys(n)},5099:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isRuntimeGetUrlSupported=t.isTabsSendMessageSupported=t.isTabsQuerySupported=t.isOnBeforeSendHeadersSupported=t.isOnBeforeRequestSupported=t.isBrowserActionOnClickedSupported=t.isActionOnClickedSupported=t.isTabsOnRemovedSupported=t.isRuntimeOnMessageExternalSupported=t.isRuntimeOnMessageSupported=t.isRuntimeSendMessageSupported=t.isAddEventListenerSupported=t.isPostMessageSupported=void 0;const o=n(1393),r=n(5482).loggers.addPrefix("api-support");t.isPostMessageSupported=(...e)=>!!(null===window||void 0===window?void 0:window.postMessage)||(r.warn().log("API window.postMessage is not supported",...e),!1);t.isAddEventListenerSupported=(...e)=>!!(null===window||void 0===window?void 0:window.addEventListener)||(r.warn().log("API window.addEventListener is not supported",...e),!1);t.isRuntimeSendMessageSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,o.getBrowserContext)())||void 0===t?void 0:t.runtime)||void 0===n?void 0:n.sendMessage)||(r.warn().log("API runtime.sendMessage is not supported",...e),!1)};t.isRuntimeOnMessageSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,o.getBrowserContext)().runtime)||void 0===t?void 0:t.onMessage)||void 0===n?void 0:n.addListener)||(r.warn().log("API runtime.onMessage.addListener is not supported",...e),!1)};t.isRuntimeOnMessageExternalSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,o.getBrowserContext)().runtime)||void 0===t?void 0:t.onMessageExternal)||void 0===n?void 0:n.addListener)||(r.warn().log("API runtime.onMessageExternal.addListener is not supported",...e),!1)};t.isTabsOnRemovedSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,o.getBrowserContext)().tabs)||void 0===t?void 0:t.onRemoved)||void 0===n?void 0:n.addListener)||(r.warn().log("API tabs.onRemoved.addListener is not supported",...e),!1)};t.isActionOnClickedSupported=(...e)=>{var t,n,i;return!!(null===(i=null===(n=null===(t=(0,o.getBrowserContext)())||void 0===t?void 0:t.action)||void 0===n?void 0:n.onClicked)||void 0===i?void 0:i.addListener)||(r.warn().log("API action.onClicked.addListener is not supported",...e),!1)};t.isBrowserActionOnClickedSupported=(...e)=>{var t,n,i;return!!(null===(i=null===(n=null===(t=(0,o.getBrowserContext)())||void 0===t?void 0:t.browserAction)||void 0===n?void 0:n.onClicked)||void 0===i?void 0:i.addListener)||(r.warn().log("API browserAction.onClicked.addListener is not supported",...e),!1)};t.isOnBeforeRequestSupported=(...e)=>{var t,n,i;return!!(null===(i=null===(n=null===(t=(0,o.getBrowserContext)())||void 0===t?void 0:t.webRequest)||void 0===n?void 0:n.onBeforeRequest)||void 0===i?void 0:i.addListener)||(r.warn().log("API webRequest.onBeforeRequest is not supported",...e),!1)};t.isOnBeforeSendHeadersSupported=(...e)=>{var t,n,i;return!!(null===(i=null===(n=null===(t=(0,o.getBrowserContext)())||void 0===t?void 0:t.webRequest)||void 0===n?void 0:n.onBeforeSendHeaders)||void 0===i?void 0:i.addListener)||(r.warn().log("API webRequest.onBeforeSendHeaders is not supported",...e),!1)};t.isTabsQuerySupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,o.getBrowserContext)())||void 0===t?void 0:t.tabs)||void 0===n?void 0:n.query)||(r.warn().log("API tabs.query is not supported",...e),!1)};t.isTabsSendMessageSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,o.getBrowserContext)())||void 0===t?void 0:t.tabs)||void 0===n?void 0:n.sendMessage)||(r.warn().log("API tabs.sendMessage is not supported",...e),!1)};t.isRuntimeGetUrlSupported=(...e)=>{var t,n;return!!(null===(n=null===(t=(0,o.getBrowserContext)())||void 0===t?void 0:t.runtime)||void 0===n?void 0:n.getURL)||(r.warn().log("API runtime.getURL is not supported",...e),!1)}},1393:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getExecutingContextByMessageType=t.getWebAccessibleUrl=t.getBrowserContext=void 0;const o=n(5099);t.getBrowserContext=()=>"undefined"!=typeof browser?browser:chrome;t.getWebAccessibleUrl=e=>(0,o.isRuntimeGetUrlSupported)(e)?(0,t.getBrowserContext)().runtime.getURL(e):"";t.getExecutingContextByMessageType=e=>{let t=e.slice(0,3).toLowerCase();return"app"===t?"app":(t=t.slice(0,2),"bg"===t?"background":"cs"===t?"content":"is"===t?"inline":"unknown")}},332:function(e,t){var n=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function s(e){try{l(o.next(e))}catch(e){i(e)}}function d(e){try{l(o.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,d)}l((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.createFormDataString=t.compareVersions=t.getVersionFromString=t.removeDoubleQuotesAround=t.removeQuotesAround=t.removeBracketsAround=t.buildQueryParts=t.getElementsUnderCursor=t.downloadFile=t.copyToClipboard=t.createClassName=t.waitHTMLElement=t.isInsideIframe=t.mountHTMLElement=t.cssObjectToString=void 0;t.cssObjectToString=e=>Object.keys(e).reduce(((t,n)=>t+`${n}:${e[n]};`),"");t.mountHTMLElement=(e,n,o)=>{const r=document.createElement(e);return(null==o?void 0:o.attributes)&&Object.keys(o.attributes).forEach((e=>{var n;r.setAttribute(e,"style"===e?(0,t.cssObjectToString)(o.attributes[e]):(null===(n=o.attributes)||void 0===n?void 0:n[e])||"")})),(null==o?void 0:o.innerHtml)&&(r.innerHTML=o.innerHtml),(null==o?void 0:o.innerText)&&(r.innerText=o.innerText),n&&n.append(r),r};t.isInsideIframe=()=>{try{return window.self!==window.top}catch(e){return!0}};t.waitHTMLElement=(e,t=document)=>n(void 0,void 0,void 0,(function*(){return new Promise((n=>{new MutationObserver(((o,r)=>{const i=t.querySelector(e);i&&(r.disconnect(),n(i))})).observe(t,{childList:!0,subtree:!0})}))}));t.createClassName=e=>e.filter(Boolean).join(" ");t.copyToClipboard=e=>{const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-99999px",t.style.top="-99999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)};t.downloadFile=(e,t,n)=>{const o=document.createElement("a");o.setAttribute("href",encodeURI(`data:text/csv;charset=utf-8,${t}`)),o.setAttribute("download",`${n}.csv`),document.body.appendChild(o),o.click(),document.body.removeChild(o)};t.getElementsUnderCursor=(e,t)=>{const n=e.clientX,o=e.clientY,r=[],i=[];let s=document.elementFromPoint(n,o);for(;"HTML"!==s.tagName;){const e=s.style.pointerEvents;if(!s)break;(!t||t&&t(s))&&r.push(s),i.push({savedPointerEvents:e,element:s}),s.style.pointerEvents="none",s=document.elementFromPoint(n,o)}return i.forEach((({element:e,savedPointerEvents:t})=>{t?e.style.pointerEvents=t:e.style.removeProperty("pointer-events"),e.getAttribute("style")||e.removeAttribute("style")})),r};t.buildQueryParts=(e,t,n,o,r,i)=>{const s=[];Object.keys(e).forEach((o=>{s.push(e[o].map((e=>`${r.leftOperand(o)}${t(o,e)}${r.rightOperand(e)}`)).join(n))}));const d=s.join(o);return i?`${i} ${d}`:d};t.removeBracketsAround=e=>{let t=e;return"("===e[0]&&(t=t.slice(1)),")"===e[e.length-1]&&(t=t.slice(0,e.length-2)),t};t.removeQuotesAround=e=>{let t=e;return'"'!==e[0]&&"'"!==e[0]||(t=t.slice(1)),'"'!==e[e.length-1]&&"'"!==e[e.length-1]||(t=t.slice(0,e.length-2)),t};t.removeDoubleQuotesAround=e=>{let t=e;return'"'===e[0]&&(t=t.slice(1)),'"'===e[e.length-1]&&(t=t.slice(0,e.length-2)),t};t.getVersionFromString=e=>{if("string"!=typeof e||!/^[.0-9]+$/.test(e))return 0;const t=parseInt(e.replace(/\./g,""));return isNaN(t)?0:t};t.compareVersions=(e,n)=>{const o=(0,t.getVersionFromString)(e),r=(0,t.getVersionFromString)(n);return o===r?"equal":o>r?"greater":"less"};t.createFormDataString=e=>{const t=[];for(const[n,o]of Object.entries(e))t.push(`${encodeURIComponent(n)}=${encodeURIComponent(o)}`);return t.join("&").replace(/%20/g,"+")}},3799:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isMessageMatched=void 0;const o=n(5482);t.isMessageMatched=(e,t,...n)=>!!e()&&(o.loggers.debug().log(`got ${t.type} message`,t,...n),!0)},1595:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.version=t.logLevel=t.mode=t.backgroundPlatformIDFromENV=t.contentPlatformIDFromENV=void 0;const o=n(3319),r=n(9068);t.contentPlatformIDFromENV=(Object.values(o.PlatformID).includes(null),null),t.backgroundPlatformIDFromENV=(Object.values(o.PlatformID).includes(null),null),t.mode="production"===r.Mode.production?r.Mode.production:r.Mode.development,t.logLevel=Object.keys(r.LogLevel).includes("info")?"info":r.LogLevel.info,t.version="1.1.2"},5482:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Loggers=t.stopLogging=t.startLogging=t.loggers=void 0;const o=n(9068),r=n(1595);let i=!0;t.startLogging=()=>i=!0;t.stopLogging=()=>i=!1;class s{constructor(e="",t=o.LogLevel.info){this.prefix="",this.level=o.LogLevel.info,this.prefix=e,this.level=t}createInstance(e="",t=o.LogLevel.info){return new s(e,t)}log(...e){i&&(r.mode===o.Mode.production&&this.level===o.LogLevel.debug&&r.logLevel!==o.LogLevel.debug||r.mode!==o.Mode.production&&console[this.level===o.LogLevel.error?"error":this.level===o.LogLevel.warn?"warn":"log"](this.prefix||"==>",...e))}error(){return this.createInstance(`ERROR: ${this.prefix}`,o.LogLevel.error)}warn(){return this.createInstance(`WARN: ${this.prefix}`,o.LogLevel.warn)}info(){return this.createInstance(`INFO: ${this.prefix}`,o.LogLevel.info)}debug(){return this.createInstance(`DEBUG: ${this.prefix}`,o.LogLevel.debug)}addPrefix(e){return this.createInstance([this.prefix,e].join(" "),this.level)}setLevel(e){return this.createInstance(this.prefix,e)}setPrefix(e){return t.loggers=this.addPrefix(e),t.loggers}}t.Loggers=s,t.loggers=new s},1846:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DebugID=t.getDebugPrefix=void 0;const o=n(9068);t.getDebugPrefix=e=>"background"===e?"bg ==>":"content"===e?"cs ==>":"inline"===e?"is ==>":"app"===e?"app ==>":"unknown ==>";const r=(0,o.mapType)("debug-external-der3edc3op3e4dde44rt");!function(e){e[e.debugIDExternal=r]="debugIDExternal"}(t.DebugID||(t.DebugID={}))},3319:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PlatformName=t.PlatformID=t.Browser=void 0,function(e){e.chrome="chrome",e.firefox="firefox",e.edge="edge"}(t.Browser||(t.Browser={})),function(e){e.MicrosoftSentinel="MicrosoftSentinel",e.MicrosoftDefender="MicrosoftDefender",e.Splunk="Splunk",e.QRadar="QRadar",e.Elastic="Elastic",e.ArcSight="ArcSight"}(t.PlatformID||(t.PlatformID={})),function(e){e.MicrosoftSentinel="Microsoft Sentinel",e.MicrosoftDefender="Microsoft Defender For Endpoint",e.Splunk="Splunk",e.QRadar="IBM QRadar",e.Elastic="Elastic",e.ArcSight="ArcSight"}(t.PlatformName||(t.PlatformName={}))},366:function(e,t,n){var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function s(e){try{l(o.next(e))}catch(e){i(e)}}function d(e){try{l(o.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,d)}l((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.MicrosoftSentinelPlatform=void 0;const r=n(6994),i=n(3319),s=n(5404),d=n(7281),l=n(8312),a=n(332),u=n(4689),c=n(3799),g=n(1595),p=n(770),f=n(7838),m=n(8401),v=n(1393);let y;class b{constructor(){this.defaultWatchers={[m.BoundedResourceTypeID.Accounts]:["UserName","Account","SubjectUserName","TargetUserName"],[m.BoundedResourceTypeID.Assets]:["Computer"]},this.extensionDefaultPosition=b.extensionDefaultPosition}static normalizedValue(e){const t=(0,f.isNumberInString)(e)?parseFloat(e):e;return"number"==typeof t?t:`"${t.replace(/\\/g,"\\\\")}"`}static buildQueryParts(e,t,n=!1){return(0,a.buildQueryParts)(t,(()=>"exclude"===e?" != ":" == "),"exclude"===e?" and ":" or ","exclude"===e?" and ":" or ",{leftOperand:e=>e,rightOperand:e=>b.normalizedValue(e)},n?"where":void 0)}buildQueryParts(e,t,n){return b.buildQueryParts(e,t,n)}getID(){return b.id}getName(){return i.PlatformName.MicrosoftSentinel}static connectInlineListener(){(0,a.mountHTMLElement)("script",document.body,{attributes:{src:(0,v.getWebAccessibleUrl)(p.microsoftSentinelInline),type:"text/javascript","data-type":"inline-listener"}})}static setListeners(){d.addListener(s.ListenerType.OnMessage,(e=>o(this,void 0,void 0,(function*(){if(!g.contentPlatformIDFromENV&&!document.querySelector("la-main-view"))return;const t=`script[src$="${p.microsoftSentinelInline}"]`;document.querySelector(t)||(b.connectInlineListener(),yield(0,a.waitHTMLElement)(t)),(0,c.isMessageMatched)((()=>l.MessageToContent.CSModifyQuery===e.type),e)&&(0,r.sendMessageFromContent)(Object.assign(Object.assign({},e),{id:`${e.id}--content-modify-query`,type:u.MessageToInline.ISModifyQuery}),!1)})))),y.debug().log("listeners were set")}connect(){b.setListeners(),y.debug().log("connected")}}t.MicrosoftSentinelPlatform=b,b.id=i.PlatformID.MicrosoftSentinel,b.extensionDefaultPosition={top:0,left:0,width:500,height:400},y=n(5482).loggers.addPrefix(b.id)},7281:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.addListener=void 0;const o=n(5404),r=n(1846),i=n(5099),s=n(1393),d={};t.addListener=(e,t,...n)=>{var o;null===(o=d[e])||void 0===o||o.call(d,((...e)=>{t(...e)}),...n)};const l=[];d[o.ListenerType.OnMessage]=(e,...t)=>{if((0,i.isRuntimeOnMessageSupported)()){const n=(0,s.getBrowserContext)().runtime.onMessage;l.push((()=>{n.removeListener(e)})),n.addListener(((...t)=>{e(...t)}),...t)}if(!(0,i.isAddEventListenerSupported)())return;const n=n=>{const o=n.data;n.origin===window.location.origin&&o.externalType===r.DebugID.debugIDExternal&&e(n.data,...t)};l.push((()=>{window.removeEventListener("message",n)})),window.addEventListener("message",n)}},6994:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.sendMessageFromApp=t.sendMessageFromContent=t.sendMessage=void 0;const o=n(412),r=n(5099),i=n(1393),s=n(5482).loggers.addPrefix("services");t.sendMessage=(e,t,n=!0)=>{var s;t.id=`${t.id?`${t.id}--`:""}${(0,o.uuid)()}`;const d="sendMessage";try{if(!n&&!(0,r.isPostMessageSupported)(t))return;if(!n)return window.postMessage(t),e.debug().log("postMessage",t);if(!(0,r.isRuntimeSendMessageSupported)())return;null===(s=(0,i.getBrowserContext)().runtime.sendMessage(t))||void 0===s||s.catch((n=>e.error().addPrefix(d).log(n,t))),e.debug().addPrefix(d).log(t)}catch(n){e.error().addPrefix(d).log(n,t)}};t.sendMessageFromContent=(e,n=!0)=>(0,t.sendMessage)(s.addPrefix("message-from-content"),e,n);t.sendMessageFromApp=(e,n=!0)=>(0,t.sendMessage)(s.addPrefix("message-from-app"),e,n)},5404:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ListenerType=void 0,function(e){e.OnMessage="OnMessage"}(t.ListenerType||(t.ListenerType={}))},8312:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MessageToContent=void 0;const o=n(1393);var r;!function(e){e.CSModifyQuery="CSModifyQuery",e.CSConnectPlatform="CSConnectPlatform"}(r=t.MessageToContent||(t.MessageToContent={})),Object.values(r).forEach((e=>{if("content"!==(0,o.getExecutingContextByMessageType)(e))throw new Error(`Wrong content message type "${e}"`)}))},665:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.buildNewQuery=t.buildNewJsonQuery=t.getEditorIndexByFormattedUri=t.getLastContentLine=t.getContentFocusedLines=t.checkEditorExists=t.getEditorByIndex=void 0;const o=n(412);t.getEditorByIndex=e=>monaco.editor.getModels()[e];t.checkEditorExists=()=>{var e,t;return!!(null===(t=null===(e=null===monaco||void 0===monaco?void 0:monaco.editor)||void 0===e?void 0:e.getModels)||void 0===t?void 0:t.call(e))};t.getContentFocusedLines=e=>{var n;const o=(0,t.getEditorByIndex)(e),r=[];for(let e=1;e<=o.getLineCount();e++)o.getLineDecorations(e).some((e=>e.options.className))&&""!==(null===(n=o.getLineContent(e))||void 0===n?void 0:n.trim())&&r.push(e);return r};t.getLastContentLine=e=>{var n;const o=(0,t.getEditorByIndex)(e).getLinesContent();for(;""===(null===(n=o[o.length-1])||void 0===n?void 0:n.trim());)o.splice(o.length-1);return o.length>0?o.length:1};t.getEditorIndexByFormattedUri=e=>monaco.editor.getModels().findIndex((t=>t.uri._formatted===e));t.buildNewJsonQuery=(e,n,r)=>{var i;const s=(0,t.getEditorByIndex)(e),d=(0,o.parseJSONSafe)(s.getValue(),null),l=d&&d.Query?d.Query:"",a=`${"show all"===r?(null===(i=l.split("|").shift())||void 0===i?void 0:i.trim())||"<unknown>":l} ${n}`;return JSON.stringify({Query:a},null,3)};t.buildNewQuery=(e,n,r)=>{let i="";const s=(0,t.getEditorByIndex)(e),d=s.getLinesContent(),l=(0,t.getContentFocusedLines)(e);if("show all"===r&&l.length<1){i=`${d.map((e=>e.split("|").shift())).filter(Boolean).pop()||"<unknown>"} ${n}`}if("show all"===r&&l.length>=1){const e=d[l[0]-1].split("|").shift();d.splice(l[0]-1,l.length,`${e} ${n}`),i=d.join("\n")}if("show all"!==r){const o=l.length>0?l[l.length-1]:(0,t.getLastContentLine)(e),r=s.getLineContent(o)||"<unknown>";d[o-1]=`${r} ${n}`,i=d.join("\n")}return(0,o.clearExtraSpaces)(i)}},4689:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MessageToInline=void 0;const o=n(1393);var r;!function(e){e.ISModifyQuery="ISModifyQuery"}(r=t.MessageToInline||(t.MessageToInline={})),Object.values(r).forEach((e=>{if("inline"!==(0,o.getExecutingContextByMessageType)(e))throw new Error(`Wrong inline message type "${e}"`)}))},770:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.accessibleResources=t.arcSightInline=t.elasticInline=t.qRadarInline=t.splunkInline=t.microsoftDefenderInline=t.microsoftSentinelInline=t.appStyles=void 0;const o=n(3319);t.appStyles="app-styles.css",t.microsoftSentinelInline="inline-microsoft-sentinel.js",t.microsoftDefenderInline="inline-microsoft-defender.js",t.splunkInline="inline-splunk.js",t.qRadarInline="inline-qradar.js",t.elasticInline="inline-elastic.js",t.arcSightInline="inline-arcsight.js",t.accessibleResources={[o.PlatformID.MicrosoftSentinel]:[t.microsoftSentinelInline],[o.PlatformID.MicrosoftDefender]:[t.microsoftDefenderInline],[o.PlatformID.Splunk]:[t.splunkInline],[o.PlatformID.QRadar]:[t.qRadarInline],[o.PlatformID.Elastic]:[t.elasticInline],[o.PlatformID.ArcSight]:[t.arcSightInline],app:[t.appStyles]}}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,n),i.exports}(()=>{const e=n(1846);n(5482).loggers.setPrefix((0,e.getDebugPrefix)("inline"))})(),(()=>{const e=n(4689),t=n(3799),o=n(665),r=new(n(366).MicrosoftSentinelPlatform),i=n(5482).loggers.addPrefix(r.getID());let s=0;window.addEventListener("message",(n=>{const d=n.data;if((0,t.isMessageMatched)((()=>e.MessageToInline.ISModifyQuery===d.type),d,n)){if(!(0,o.checkEditorExists)())return i.error().log("editor not found",monaco);if(null===(l=(()=>{const e=document.querySelector('.monaco-editor[data-uri^="inmemory:"]');if(!e)return null;const t=e.getAttribute("data-uri")||"#failed",n=(0,o.getEditorIndexByFormattedUri)(t);return"number"==typeof n&&n>-1?n:null})())||(s!==l&&(s=l,i.debug().log("The editor index is set to",l)),0))return i.info().log("Can not determine the editor index");const e=(0,o.getEditorByIndex)(s),{resources:t,modifyType:n}=d.payload,a=`| ${r.buildQueryParts(n,t,!0)}`;e.setValue((0,o.buildNewQuery)(s,a,n))}var l})),i.debug().log("mounted")})()})();