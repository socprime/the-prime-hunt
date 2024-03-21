(()=>{"use strict";var e,t={8667:(e,t,n)=>{var r,o;n.d(t,{AR:()=>r,in:()=>o,mr:()=>s}),function(e){e.production="production",e.development="development"}(r||(r={})),function(e){e.info="info",e.debug="debug",e.error="error",e.warn="warn"}(o||(o={}));const s=e=>e},6478:(e,t,n)=>{n.d(t,{hw:()=>i,xJ:()=>s});var r=n(7131),o=n(8667);Object.values(r.WM).includes(null),Object.values(r.WM).includes(null);const s="production"===o.AR.production?o.AR.production:o.AR.development,i=Object.keys(o.in).includes("info")?"info":o.in.info},2224:(e,t,n)=>{n.d(t,{Et:()=>s,yD:()=>a});var r=n(8667),o=n(6478);let s,i=o.xJ===r.AR.development||o.hw===r.in.debug;const a=e=>{i=e};class c{prefix="";level=r.in.info;createInstance(e="",t=r.in.info){return new c(e,t)}constructor(e="",t=r.in.info){this.prefix=e,this.level=t}log(...e){(this.level!==r.in.debug||i)&&console[this.level===r.in.error?"error":this.level===r.in.warn?"warn":"log"](this.prefix||"==>",...e)}error(){return this.createInstance(`ERROR: ${this.prefix}`,r.in.error)}warn(){return this.createInstance(`WARN: ${this.prefix}`,r.in.warn)}info(){return this.createInstance(`INFO: ${this.prefix}`,r.in.info)}debug(){return this.createInstance(`DEBUG: ${this.prefix}`,r.in.debug)}addPrefix(e){return this.createInstance([this.prefix,e].join(" "),this.level)}setLevel(e){return this.createInstance(this.prefix,e)}setPrefix(e){return s=this.addPrefix(e),s}}s=new c},6421:(e,t,n)=>{n.d(t,{k$:()=>o,kW:()=>r,qK:()=>s});const r=e=>"background"===e?"bg ==>":"content"===e?"cs ==>":"inline"===e?"is ==>":"app"===e?"app ==>":"unknown ==>",o=e=>{let t=(e||"").slice(0,3).toLowerCase();return"app"===t?"app":(t=t.slice(0,2),"bg"===t?"background":"cs"===t?"content":"is"===t?"inline":"unknown")},s="debug-external-der3edc3op3e4dde44rt"},7131:(e,t,n)=>{var r,o,s,i,a;n.d(t,{S9:()=>i,WM:()=>o,if:()=>a}),function(e){e.chrome="chrome",e.firefox="firefox",e.edge="edge"}(r||(r={})),function(e){e.MicrosoftSentinel="MicrosoftSentinel",e.MicrosoftDefender="MicrosoftDefender",e.Splunk="Splunk",e.QRadar="QRadar",e.Elastic="Elastic",e.OpenSearch="OpenSearch",e.ArcSight="ArcSight",e.Athena="Athena",e.LogScale="LogScale",e.Chronicle="Chronicle"}(o||(o={})),function(e){e.ElasticEQl="ElasticEql"}(s||(s={})),function(e){e.Sentinel="ala",e.Defender="mdatp",e.Splunk="splunk",e.Qradar="qradar",e.ElasticEQL="es-eql",e.ElasticLucene="elasticsearch",e.ArcSight="arcsight-keyword",e.Athena="athena",e.LogScale="humio",e.Chronicle="chronicle-query",e.OpenSearch="opendistro-query"}(i||(i={})),function(e){e.MicrosoftSentinel="Microsoft Sentinel",e.MicrosoftDefender="Microsoft Defender For Endpoint",e.Splunk="Splunk",e.QRadar="IBM QRadar",e.Elastic="Elastic",e.OpenSearch="OpenSearch",e.ArcSight="ArcSight",e.Athena="Amazon Athena",e.LogScale="Falcon LogScale",e.Chronicle="Chronicle"}(a||(a={}))}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var s=n[e]={exports:{}};return t[e](s,s.exports,r),s.exports}r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e=r(6421),r(2224).Et.setPrefix((0,e.kW)("inline")),(()=>{var e,t=r(6421);!function(e){e.ISModifyQuery="ISModifyQuery",e.ISSetQuery="ISSetQuery",e.ISGetQuery="ISGetQuery",e.ISSetDebugMode="ISSetDebugMode",e.ISRemoveHash="ISRemoveHash",e.ISRemoveFieldSpecification="ISRemoveFieldSpecification"}(e||(e={})),Object.values(e).forEach((e=>{if("inline"!==(0,t.k$)(e))throw new Error(`Wrong inline message type "${e}"`)}));var n=r(2224);const o=(e,t,...r)=>!!e()&&(n.Et.debug().log(`got ${t.type} message`,t,...r),!0);var s=r(8667);const i=e=>{if("number"==typeof e)return!0;if("string"!=typeof e)return!1;const t=e.trim();return!(!/^[-.0-9]*$/.test(t)||c(t,".").length>1)&&!Number.isNaN(parseFloat(t))},a=()=>Math.random().toString(36).substring(5)+Date.now().toString(36)+Math.random().toString(36).substring(5),c=(e,t)=>{const n=[];let r=-1;for(;(r=e.indexOf(t,r+1))>=0;)n.push(r);return n};var l;!function(e){e.CSConnectPlatform="CSConnectPlatform",e.CSSetDebugMode="CSSetDebugMode",e.CSDirectMessageToApp="CSDirectMessageToApp",e.CSDirectMessageToInline="CSDirectMessageToInline"}(l||(l={})),Object.values(l).forEach((e=>{if("content"!==(0,t.k$)(e))throw new Error(`Wrong content message type "${e}"`)}));const d=()=>"undefined"!=typeof browser?browser:chrome,p=r(2224).Et.addPrefix("api-support"),u=(...e)=>!!d()?.runtime?.getURL||(p.warn().log("API runtime.getURL is not supported",...e),!1),g=r(2224).Et.addPrefix("services"),f=(e,t,n=!0)=>{t.id=`${t.id?`${t.id}--`:""}${a()}`;const r="sendMessage";try{return n||((...e)=>!!window?.postMessage||(p.warn().log("API window.postMessage is not supported",...e),!1))(t)?n?((...e)=>!!d()?.runtime?.sendMessage||(p.warn().log("API runtime.sendMessage is not supported",...e),!1))()?(d().runtime.sendMessage(t)?.catch((n=>e.error().addPrefix(r).log(n,t))),e.debug().addPrefix(r).log(t),t):t:(window.postMessage(t),e.debug().log("postMessage",t),t):t}catch(n){return e.error().addPrefix(r).log(n,t),t}},h=(e,t=!0)=>f(g.addPrefix("message-from-content"),e,t);var S;!function(e){e.BGDirectMessageToApp="BGDirectMessageToApp",e.BGDirectMessageToInline="BGDirectMessageToInline",e.BGSetWatchers="BGSetWatchers",e.BGRegisterPlatformTab="BGRegisterPlatformTab",e.BGToggleShowExtension="BGToggleShowExtension",e.BGSetDebugMode="BGSetDebugMode",e.BGTakeCallbackMessage="BGTakeCallbackMessage"}(S||(S={})),Object.values(S).forEach((e=>{if("background"!==(0,t.k$)(e))throw new Error(`Wrong background message type "${e}"`)}));class y{fields=new Set;static processInlineListeners(t){if(o((()=>l.CSSetDebugMode===t.type),t)){const{debugMode:n}=t.payload;r(2224).yD(n),h({...t,id:`${t.id}--${t.type}`,type:e.ISSetDebugMode},!1)}if(o((()=>l.CSDirectMessageToApp===t.type),t)&&h({id:`${t.id}--${t.type}`,type:S.BGDirectMessageToApp,payload:t.payload}),o((()=>l.CSDirectMessageToInline===t.type),t)){const{type:e,payload:n}=t.payload;h({id:`${t.id}--${t.type}`,type:e,payload:n},!1)}}}var w,M=r(7131);!function(e){e.Accounts="Accounts",e.Assets="Assets"}(w||(w={}));Object.keys(w);const b=(e,t,n)=>{const r=document.createElement(e);return n?.attributes&&Object.keys(n.attributes).forEach((e=>{var t;r.setAttribute(e,"style"===e?(t=n.attributes[e],Object.keys(t).reduce(((e,n)=>e+`${n}:${t[n]};`),"")):n.attributes?.[e]||"")})),n?.innerHtml&&(r.innerHTML=n.innerHtml),n?.innerText&&(r.innerText=n.innerText),t&&t.append(r),r},m="inline-logscale.js";M.WM.MicrosoftSentinel,M.WM.MicrosoftDefender,M.WM.Splunk,M.WM.QRadar,M.WM.Elastic,M.WM.ArcSight,M.WM.Athena,M.WM.OpenSearch,M.WM.LogScale,M.WM.Chronicle;var A,$;!function(e){e.OnMessage="OnMessage"}(A||(A={})),function(e){e[e.debugIDExternal=(0,s.mr)(t.qK)]="debugIDExternal"}($||($={}));const v={},D=[];let E;v[A.OnMessage]=(e,...n)=>{if(((...e)=>!!d().runtime?.onMessage?.addListener||(p.warn().log("API runtime.onMessage.addListener is not supported",...e),!1))()){const t=d().runtime.onMessage;D.push((()=>{t.removeListener(e)})),t.addListener(((...t)=>{e(...t)}),...n)}if(!((...e)=>!!window?.addEventListener||(p.warn().log("API window.addEventListener is not supported",...e),!1))())return;const r=r=>{const o=r.data;r.origin!==window.location.origin||"content"!==(0,t.k$)(o.type)&&o.externalType!==$.debugIDExternal||e(r.data,...n)};D.push((()=>{window.removeEventListener("message",r)})),window.addEventListener("message",r)};class x extends y{static id=M.WM.LogScale;static platformName=M.if.LogScale;defaultWatchers={[w.Accounts]:["windows.UserID","windows.EventData.User","windows.EventData.SubjectUserName"],[w.Assets]:["@collect.host","windows.Computer","windows.EventData.DestinationIp","windows.EventData.DestinationHostname","windows.EventData.SourceIp","windows.EventData.SourceHostname"]};extensionDefaultPosition={top:0,left:0,width:480,height:480};static normalizedValue(e){const t=i(e)?parseFloat(e):e;return"number"==typeof t?t:`"${t.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}"`}static buildQueryParts(e,t,n=!1){const r="exclude"===e?"NOT":"",o=((e,t,n,r,o,s)=>{const i=[];Object.keys(e).forEach((r=>{i.push(e[r].map((e=>`${o.leftOperand(r)}${t(r,e)}${o.rightOperand(e)}`)).join(n))}));const a=i.join(r);return s?`${s} ${a}`:a})(Object.keys(t).reduce(((e,n)=>(t[n]?.length>1?e[`$$$${n}`]=[`$$$in(field="${n}", values=${JSON.stringify(t[n].map((e=>i(e)?parseInt(e,10):e)))})`]:e[n]=t[n],e)),{}),(e=>"$"===e[0]&&"$"===e[1]&&"$"===e[2]?"":" = "),"exclude"===e?" | NOT ":" | ","exclude"===e?" | NOT ":" | ",{leftOperand:e=>"$"===e[0]&&"$"===e[1]&&"$"===e[2]?"":e,rightOperand:e=>"string"==typeof e&&"$"===e[0]&&"$"===e[1]&&"$"===e[2]?e.substring(3,e.length):x.normalizedValue(e)},n?r:void 0);return o}buildQueryParts(e,t,n){return x.buildQueryParts(e,t,n)}static connectInlineListener(){var e;b("script",document.body,{attributes:{src:(e=m,u(e)?d().runtime.getURL(e):""),type:"text/javascript","data-type":"inline-listener"}})}static setListeners(){((e,t,...n)=>{v[e]?.(((...e)=>{t(...e)}),...n)})(A.OnMessage,(async e=>{y.processInlineListeners(e)})),E.debug().log("listeners were set")}connect(){x.setListeners(),x.connectInlineListener(),E.debug().log("connected")}getID(){return x.id}getName(){return x.platformName}getType(){return M.S9.LogScale}}var I;E=r(2224).Et.addPrefix(x.id),function(e){e.AppShowExtension="AppShowExtension",e.AppTakeResourceData="AppTakeResourceData",e.AppTakeNewResourceData="AppTakeNewResourceData",e.AppSyncWatchers="AppSyncWatchers",e.AppQueryHasHash="AppQueryHasHash",e.AppQueryHasSpecifyFields="AppQueryHasSpecifyFields",e.AppSetLoadingState="AppSetLoadingState",e.AppToggleShowExtension="AppToggleShowExtension",e.AppSendToBackground="AppSendToBackground",e.AppSendMessageOutside="AppSendMessageOutside",e.AppTakeQuery="AppTakeQuery",e.AppSetDebugMode="AppSetDebugMode",e.AppTakeCallbackMessageResult="AppTakeCallbackMessageResult"}(I||(I={})),Object.values(I).forEach((e=>{if("app"!==(0,t.k$)(e))throw new Error(`Wrong app message type "${e}"`)}));const k=new x,T=r(2224).Et.addPrefix(k.getID()),L=()=>{const e=document.querySelector("#query-input")?.editor?.model;return e?{editor:e}:(T.error().log("editor not found"),{})};window.addEventListener("message",(t=>{const n=t.data;if(o((()=>e.ISModifyQuery===n.type),n,t)){const{editor:e}=L();if(!e)return;const{resources:t,modifyType:r}=n.payload;let o=k.buildQueryParts(r,t,!0);"show all"!==r&&(o=`| ${o}`),e.setValue(((e,t,n,r=!0)=>{let o="";const s=e.getLinesContent(),i=(e=>{const t=[];for(let n=1;n<=e.getLineCount();n++)e.getLineDecorations(n).some((e=>e.options.className))&&""!==e.getLineContent(n)?.trim()&&t.push(n);return t})(e);if("show all"===n&&i.length<1){const e=s.map((e=>e.split("|").shift())).filter(Boolean).pop()||"<unknown>";o=`${r?`${e} `:""}${t}`}if("show all"===n&&i.length>=1){const e=s[i[0]-1].split("|").shift();s.splice(i[0]-1,i.length,`${r?`${e} `:""}${t}`),o=s.join("\n")}if("show all"!==n){const n=i.length>0?i[i.length-1]:(e=>{const t=e.getLinesContent();for(;""===t[t.length-1]?.trim();)t.splice(t.length-1);return t.length>0?t.length:1})(e),r=e.getLineContent(n)||"<unknown>";s[n-1]=`${r} ${t}`,o=s.join("\n")}return o.replace(/ +/g," ")})(e,o,r,!1))}if(o((()=>e.ISSetQuery===n.type),n,t)){const{editor:e}=L();if(!e)return;const{value:t}=n.payload;e.setValue(t)}if(o((()=>e.ISGetQuery===n.type),n,t)){const{editor:e}=L();if(!e)return;s=e.getValue(),window.postMessage({id:a(),type:l.CSDirectMessageToApp,payload:{type:I.AppTakeQuery,payload:{queryValue:s}}})}var s;if(o((()=>e.ISSetDebugMode===n.type),n,t)){const{debugMode:e}=n.payload;r(2224).yD(e)}})),T.debug().log("mounted")})()})();