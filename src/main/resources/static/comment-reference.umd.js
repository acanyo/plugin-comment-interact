(function(l,w){typeof exports=="object"&&typeof module<"u"?w(exports):typeof define=="function"&&define.amd?define(["exports"],w):(l=typeof globalThis<"u"?globalThis:l||self,w(l.CommentReference={}))})(this,(function(l){"use strict";const w=globalThis,q=w.ShadowRoot&&(w.ShadyCSS===void 0||w.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),it=new WeakMap;let at=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(q&&t===void 0){const r=e!==void 0&&e.length===1;r&&(t=it.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&it.set(e,t))}return t}toString(){return this.cssText}};const Et=o=>new at(typeof o=="string"?o:o+"",void 0,W),V=(o,...t)=>{const e=o.length===1?o[0]:t.reduce(((r,n,s)=>r+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+o[s+1]),o[0]);return new at(e,o,W)},St=(o,t)=>{if(q)o.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const e of t){const r=document.createElement("style"),n=w.litNonce;n!==void 0&&r.setAttribute("nonce",n),r.textContent=e.cssText,o.appendChild(r)}},ct=q?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return Et(e)})(o):o;const{is:Pt,defineProperty:Tt,getOwnPropertyDescriptor:Bt,getOwnPropertyNames:Ut,getOwnPropertySymbols:Ot,getPrototypeOf:Mt}=Object,z=globalThis,ht=z.trustedTypes,Dt=ht?ht.emptyScript:"",Rt=z.reactiveElementPolyfillSupport,D=(o,t)=>o,j={toAttribute(o,t){switch(t){case Boolean:o=o?Dt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},Z=(o,t)=>!Pt(o,t),lt={attribute:!0,type:String,converter:j,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??=Symbol("metadata"),z.litPropertyMetadata??=new WeakMap;let U=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=lt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),n=this.getPropertyDescriptor(t,r,e);n!==void 0&&Tt(this.prototype,t,n)}}static getPropertyDescriptor(t,e,r){const{get:n,set:s}=Bt(this.prototype,t)??{get(){return this[e]},set(i){this[e]=i}};return{get:n,set(i){const c=n?.call(this);s?.call(this,i),this.requestUpdate(t,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??lt}static _$Ei(){if(this.hasOwnProperty(D("elementProperties")))return;const t=Mt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(D("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(D("properties"))){const e=this.properties,r=[...Ut(e),...Ot(e)];for(const n of r)this.createProperty(n,e[n])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[r,n]of e)this.elementProperties.set(r,n)}this._$Eh=new Map;for(const[e,r]of this.elementProperties){const n=this._$Eu(e,r);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const n of r)e.unshift(ct(n))}else t!==void 0&&e.push(ct(t));return e}static _$Eu(t,e){const r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return St(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){const r=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,r);if(n!==void 0&&r.reflect===!0){const s=(r.converter?.toAttribute!==void 0?r.converter:j).toAttribute(e,r.type);this._$Em=t,s==null?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(t,e){const r=this.constructor,n=r._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const s=r.getPropertyOptions(n),i=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:j;this._$Em=n;const c=i.fromAttribute(e,s.type);this[n]=c??this._$Ej?.get(n)??c,this._$Em=null}}requestUpdate(t,e,r){if(t!==void 0){const n=this.constructor,s=this[t];if(r??=n.getPropertyOptions(t),!((r.hasChanged??Z)(s,e)||r.useDefault&&r.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:n,wrapped:s},i){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,i??e??this[t]),s!==!0||i!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),n===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[n,s]of this._$Ep)this[n]=s;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[n,s]of r){const{wrapped:i}=s,c=this[n];i!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,s,c)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((r=>r.hostUpdate?.())),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};U.elementStyles=[],U.shadowRootOptions={mode:"open"},U[D("elementProperties")]=new Map,U[D("finalized")]=new Map,Rt?.({ReactiveElement:U}),(z.reactiveElementVersions??=[]).push("2.1.1");const J=globalThis,F=J.trustedTypes,mt=F?F.createPolicy("lit-html",{createHTML:o=>o}):void 0,dt="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,pt="?"+x,Nt=`<${pt}>`,E=document,R=()=>E.createComment(""),N=o=>o===null||typeof o!="object"&&typeof o!="function",K=Array.isArray,Ht=o=>K(o)||typeof o?.[Symbol.iterator]=="function",Q=`[ 	
\f\r]`,H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ut=/-->/g,ft=/>/g,S=RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),gt=/'/g,$t=/"/g,vt=/^(?:script|style|textarea|title)$/i,It=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),v=It(1),b=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),bt=new WeakMap,P=E.createTreeWalker(E,129);function yt(o,t){if(!K(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return mt!==void 0?mt.createHTML(t):t}const Lt=(o,t)=>{const e=o.length-1,r=[];let n,s=t===2?"<svg>":t===3?"<math>":"",i=H;for(let c=0;c<e;c++){const a=o[c];let p,u,h=-1,m=0;for(;m<a.length&&(i.lastIndex=m,u=i.exec(a),u!==null);)m=i.lastIndex,i===H?u[1]==="!--"?i=ut:u[1]!==void 0?i=ft:u[2]!==void 0?(vt.test(u[2])&&(n=RegExp("</"+u[2],"g")),i=S):u[3]!==void 0&&(i=S):i===S?u[0]===">"?(i=n??H,h=-1):u[1]===void 0?h=-2:(h=i.lastIndex-u[2].length,p=u[1],i=u[3]===void 0?S:u[3]==='"'?$t:gt):i===$t||i===gt?i=S:i===ut||i===ft?i=H:(i=S,n=void 0);const d=i===S&&o[c+1].startsWith("/>")?" ":"";s+=i===H?a+Nt:h>=0?(r.push(p),a.slice(0,h)+dt+a.slice(h)+x+d):a+x+(h===-2?c:d)}return[yt(o,s+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]};class I{constructor({strings:t,_$litType$:e},r){let n;this.parts=[];let s=0,i=0;const c=t.length-1,a=this.parts,[p,u]=Lt(t,e);if(this.el=I.createElement(p,r),P.currentNode=this.el.content,e===2||e===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=P.nextNode())!==null&&a.length<c;){if(n.nodeType===1){if(n.hasAttributes())for(const h of n.getAttributeNames())if(h.endsWith(dt)){const m=u[i++],d=n.getAttribute(h).split(x),g=/([.?@])?(.*)/.exec(m);a.push({type:1,index:s,name:g[2],strings:d,ctor:g[1]==="."?jt:g[1]==="?"?Ft:g[1]==="@"?Xt:X}),n.removeAttribute(h)}else h.startsWith(x)&&(a.push({type:6,index:s}),n.removeAttribute(h));if(vt.test(n.tagName)){const h=n.textContent.split(x),m=h.length-1;if(m>0){n.textContent=F?F.emptyScript:"";for(let d=0;d<m;d++)n.append(h[d],R()),P.nextNode(),a.push({type:2,index:++s});n.append(h[m],R())}}}else if(n.nodeType===8)if(n.data===pt)a.push({type:2,index:s});else{let h=-1;for(;(h=n.data.indexOf(x,h+1))!==-1;)a.push({type:7,index:s}),h+=x.length-1}s++}}static createElement(t,e){const r=E.createElement("template");return r.innerHTML=t,r}}function O(o,t,e=o,r){if(t===b)return t;let n=r!==void 0?e._$Co?.[r]:e._$Cl;const s=N(t)?void 0:t._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),s===void 0?n=void 0:(n=new s(o),n._$AT(o,e,r)),r!==void 0?(e._$Co??=[])[r]=n:e._$Cl=n),n!==void 0&&(t=O(o,n._$AS(o,t.values),n,r)),t}let zt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,n=(t?.creationScope??E).importNode(e,!0);P.currentNode=n;let s=P.nextNode(),i=0,c=0,a=r[0];for(;a!==void 0;){if(i===a.index){let p;a.type===2?p=new M(s,s.nextSibling,this,t):a.type===1?p=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(p=new qt(s,this,t)),this._$AV.push(p),a=r[++c]}i!==a?.index&&(s=P.nextNode(),i++)}return P.currentNode=E,n}p(t){let e=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}};class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,n){this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=O(this,t,e),N(t)?t===f||t==null||t===""?(this._$AH!==f&&this._$AR(),this._$AH=f):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ht(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==f&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(E.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:r}=t,n=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=I.createElement(yt(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===n)this._$AH.p(e);else{const s=new zt(n,this),i=s.u(this.options);s.p(e),this.T(i),this._$AH=s}}_$AC(t){let e=bt.get(t.strings);return e===void 0&&bt.set(t.strings,e=new I(t)),e}k(t){K(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,n=0;for(const s of t)n===e.length?e.push(r=new M(this.O(R()),this.O(R()),this,this.options)):r=e[n],r._$AI(s),n++;n<e.length&&(this._$AR(r&&r._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,n,s){this.type=1,this._$AH=f,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=f}_$AI(t,e=this,r,n){const s=this.strings;let i=!1;if(s===void 0)t=O(this,t,e,0),i=!N(t)||t!==this._$AH&&t!==b,i&&(this._$AH=t);else{const c=t;let a,p;for(t=s[0],a=0;a<s.length-1;a++)p=O(this,c[r+a],e,a),p===b&&(p=this._$AH[a]),i||=!N(p)||p!==this._$AH[a],p===f?t=f:t!==f&&(t+=(p??"")+s[a+1]),this._$AH[a]=p}i&&!n&&this.j(t)}j(t){t===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class jt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===f?void 0:t}}class Ft extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==f)}}class Xt extends X{constructor(t,e,r,n,s){super(t,e,r,n,s),this.type=5}_$AI(t,e=this){if((t=O(this,t,e,0)??f)===b)return;const r=this._$AH,n=t===f&&r!==f||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==f&&(r===f||n);n&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class qt{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){O(this,t)}}const Wt={I:M},Vt=J.litHtmlPolyfillSupport;Vt?.(I,M),(J.litHtmlVersions??=[]).push("3.3.1");const Zt=(o,t,e)=>{const r=e?.renderBefore??t;let n=r._$litPart$;if(n===void 0){const s=e?.renderBefore??null;r._$litPart$=n=new M(t.insertBefore(R(),s),s,void 0,e??{})}return n._$AI(o),n};const G=globalThis;let T=class extends U{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Zt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return b}};T._$litElement$=!0,T.finalized=!0,G.litElementHydrateSupport?.({LitElement:T});const Jt=G.litElementPolyfillSupport;Jt?.({LitElement:T}),(G.litElementVersions??=[]).push("4.2.1");const Y=o=>(t,e)=>{e!==void 0?e.addInitializer((()=>{customElements.define(o,t)})):customElements.define(o,t)};const Kt={attribute:!0,type:String,converter:j,reflect:!1,hasChanged:Z},Qt=(o=Kt,t,e)=>{const{kind:r,metadata:n}=e;let s=globalThis.litPropertyMetadata.get(n);if(s===void 0&&globalThis.litPropertyMetadata.set(n,s=new Map),r==="setter"&&((o=Object.create(o)).wrapped=!0),s.set(e.name,o),r==="accessor"){const{name:i}=e;return{set(c){const a=t.get.call(this);t.set.call(this,c),this.requestUpdate(i,a,o)},init(c){return c!==void 0&&this.C(i,void 0,o,c),c}}}if(r==="setter"){const{name:i}=e;return function(c){const a=this[i];t.call(this,c),this.requestUpdate(i,a,o)}}throw Error("Unsupported decorator location: "+r)};function $(o){return(t,e)=>typeof e=="object"?Qt(o,t,e):((r,n,s)=>{const i=n.hasOwnProperty(s);return n.constructor.createProperty(s,r),i?Object.getOwnPropertyDescriptor(n,s):void 0})(o,t,e)}function y(o){return $({...o,state:!0,attribute:!1})}const Gt=(o,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(o,t,e),e);function Yt(o,t){return(e,r,n)=>{const s=i=>i.renderRoot?.querySelector(o)??null;return Gt(e,r,{get(){return s(this)}})}}const tt={ATTRIBUTE:1,CHILD:2},et=o=>(...t)=>({_$litDirective$:o,values:t});let rt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};class ot extends rt{constructor(t){if(super(t),this.it=f,t.type!==tt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===f||t==null)return this._t=void 0,this.it=t;if(t===b)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}ot.directiveName="unsafeHTML",ot.resultType=1;const te=et(ot),ee=V`
  :host {
    display: block;
    margin-bottom: 0.8rem;

    /* Light theme colors */
    --comment-bg-color: #ffffff;
    --comment-border-color: #e5e7eb;
    --comment-text-color: #374151;
    --comment-text-secondary: #6b7280;
    --comment-author-color: #111827;
    --comment-time-color: #9ca3af;
    --comment-reply-bg: #f9fafb;
    --comment-hover-bg: #f3f4f6;
    --comment-avatar-bg: #e5e7eb;

    /* Dark theme colors */
    --comment-bg-color-dark: #1f2937;
    --comment-border-color-dark: #374151;
    --comment-text-color-dark: #e5e7eb;
    --comment-text-secondary-dark: #9ca3af;
    --comment-author-color-dark: #f3f4f6;
    --comment-time-color-dark: #6b7280;
    --comment-reply-bg-dark: #111827;
    --comment-hover-bg-dark: #374151;
    --comment-avatar-bg-dark: #4b5563;

    font-family: inherit;
    font-size: 14px;
    line-height: 1.6;
  }

  :host(:last-child) {
    margin-bottom: 0;
  }

  .comment-container {
    background: var(--comment-bg-color);
    border: 1px solid var(--comment-border-color);
    border-radius: 16px;
    padding: 12px 16px;
    color: var(--comment-text-color);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    max-width: 100%;
    width: fit-content;
  }

  .comment-loading,
  .comment-error,
  .comment-empty {
    padding: 16px;
    text-align: center;
    color: var(--comment-text-secondary);
    font-size: 14px;
    width: 100%;
    box-sizing: border-box;
  }

  .comment-error {
    color: #ef4444;
  }

  .comment-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 6px;
  }

  .comment-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--comment-avatar-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
  }

  .comment-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .comment-avatar-placeholder {
    font-size: 18px;
    font-weight: 600;
    color: var(--comment-text-secondary);
    text-transform: uppercase;
  }

  .comment-info {
    flex: 1;
    min-width: 0;
  }

  .comment-author {
    font-size: 15px;
    font-weight: 500;
    color: var(--comment-author-color);
    margin: 0;
    line-height: 1.4;
  }

  .comment-content {
    font-size: 14px;
    line-height: 1.6;
    color: var(--comment-text-color);
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
  }

  /* Rich Text Styles */
  .comment-content p {
    margin: 0 0 8px 0;
  }

  .comment-content p:last-child {
    margin-bottom: 0;
  }

  .comment-content a {
    color: #3b82f6;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
  }

  .comment-content a:hover {
    border-bottom-color: #3b82f6;
  }

  .comment-content img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 8px 0;
  }

  .comment-content blockquote {
    margin: 8px 0;
    padding: 8px 12px;
    border-left: 4px solid var(--comment-border-color);
    background: var(--comment-hover-bg);
    color: var(--comment-text-secondary);
    border-radius: 0 4px 4px 0;
  }

  .comment-content code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 13px;
    padding: 2px 4px;
    background: #f3f4f6;
    border-radius: 4px;
    color: #1f2937;
  }

  .comment-content pre {
    margin: 8px 0;
    padding: 12px;
    background: #1f2937; /* 浅色模式下的代码块也用深色背景 */
    border-radius: 8px;
    overflow-x: auto;
    border: 1px solid transparent;
  }

  /* 强制覆盖 pre 内部 code 的背景色 */
  .comment-content pre code {
    padding: 0;
    background: transparent !important;
    color: #e5e7eb; /* 浅色文字 */
    white-space: pre;
  }

  .comment-content ul,
  .comment-content ol {
    margin: 8px 0;
    padding-left: 24px;
  }

  .comment-content li {
    margin-bottom: 4px;
  }

  /* Dark theme adjustments for rich text */
  :host(.dark) .comment-content a,
  .comment-container.dark .comment-content a {
    color: #60a5fa;
  }

  :host(.dark) .comment-content a:hover,
  .comment-container.dark .comment-content a:hover {
    border-bottom-color: #60a5fa;
  }

  :host(.dark) .comment-content blockquote,
  .comment-container.dark .comment-content blockquote {
    background: rgba(255, 255, 255, 0.05); /* 更融合的半透明背景 */
    border-left-color: var(--comment-border-color-dark);
    color: var(--comment-text-secondary-dark);
  }

  :host(.dark) .comment-content code,
  .comment-container.dark .comment-content code {
    background: rgba(255, 255, 255, 0.1);
    color: var(--comment-text-color-dark);
  }

  :host(.dark) .comment-content pre,
  .comment-container.dark .comment-content pre {
    background: #000000; /* 暗色模式下代码块用纯黑 */
    border-color: #374151;
  }

  /* 暗色模式下代码块内部文字颜色 */
  :host(.dark) .comment-content pre code,
  .comment-container.dark .comment-content pre code {
    background: transparent !important;
    color: #e5e7eb;
  }

  /* Dark theme */
  :host(.dark) .comment-container,
  .comment-container.dark {
    background: var(--comment-bg-color-dark);
    border-color: var(--comment-border-color-dark);
    color: var(--comment-text-color-dark);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  :host(.dark) .comment-author,
  .comment-container.dark .comment-author {
    color: var(--comment-author-color-dark);
  }

  :host(.dark) .comment-content,
  .comment-container.dark .comment-content {
    color: var(--comment-text-color-dark);
  }

  :host(.dark) .comment-content a,
  .comment-container.dark .comment-content a {
    color: #60a5fa;
  }

  :host(.dark) .comment-avatar,
  .comment-container.dark .comment-avatar {
    background: var(--comment-avatar-bg-dark);
  }

  :host(.dark) .comment-avatar-placeholder,
  .comment-container.dark .comment-avatar-placeholder {
    color: var(--comment-text-secondary-dark);
  }

  :host(.dark) .comment-loading,
  :host(.dark) .comment-empty,
  .comment-container.dark .comment-loading,
  .comment-container.dark .comment-empty {
    color: var(--comment-text-secondary-dark);
  }

  /* Responsive */
  @media (max-width: 640px) {
    .comment-container {
      padding: 10px 14px;
      border-radius: 14px;
    }

    .comment-header {
      gap: 8px;
      margin-bottom: 5px;
    }

    .comment-avatar {
      width: 36px;
      height: 36px;
    }

    .comment-avatar-placeholder {
      font-size: 16px;
    }

    .comment-author {
      font-size: 14px;
    }

    .comment-content {
      font-size: 13px;
      line-height: 1.5;
    }
  }
`;function re(o){return o?.charAt(0).toUpperCase()??""}async function oe(o){const e=new TextEncoder().encode(o),r=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(r)).map(s=>s.toString(16).padStart(2,"0")).join("")}async function ne(o){if(!o)return null;if(o.userAvatar)return o.userAvatar;if(o.email){const t=o.email.trim().toLowerCase();if(t)try{return`https://weavatar.com/avatar/${await oe(t)}`}catch(e){return console.error("Failed to generate avatar URL:",e),null}}return null}async function se(o){const t=`/apis/api.comment.interact.xhhao.com/v1alpha1/comments/${encodeURIComponent(o)}`,e=await fetch(t);if(!e.ok)throw new Error(`获取评论失败: ${e.status} ${e.statusText}`);const r=await e.json();return r.kind==="Comment"?r:r.data?r.data:null}async function ie(o){const e=`/apis/api.comment.interact.xhhao.com/v1alpha1/commentList?${new URLSearchParams({group:o.group,kind:o.kind,name:o.name,size:"100",replySize:"100"}).toString()}`,r=await fetch(e);if(!r.ok)throw new Error(`获取评论列表失败: ${r.status} ${r.statusText}`);const n=await r.json(),s=[];if(Array.isArray(n.items)){const i=n.items;for(const c of i)if(s.push(_t(c)),c.replies?.items)for(const a of c.replies.items)s.push(_t(a))}return s}function _t(o){const t=o.spec.owner.annotations?.["email-hash"];return{kind:"Comment",name:o.metadata.name,displayName:o.spec.owner.displayName,content:o.spec.content,raw:o.spec.raw,metadataName:o.metadata.name,approved:o.spec.approved,userAvatar:t?`https://weavatar.com/avatar/${t}`:void 0}}function ae(){const o=["html.dark:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[class~='dark']:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[class*='dark']:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[data-color-scheme='dark']:not([data-color-scheme='light'])","html[data-theme='dark']:not([data-theme='light'])","html[theme='dark']:not([theme='light'])","[data-color-scheme='dark']:not([data-color-scheme='light'])","[data-theme='dark']:not([data-theme='light'])","[theme='dark']:not([theme='light'])"],t=document.documentElement,e=document.body;return o.some(n=>{try{return t.matches(n)||e.matches(n)}catch{return!1}})||t.classList.contains("dark")||t.getAttribute("data-theme")==="dark"||t.getAttribute("data-color-scheme")==="dark"||t.getAttribute("theme")==="dark"}function ce(o){const t=new MutationObserver(o);return t.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","theme"]}),t.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","theme"]}),t}var he=Object.defineProperty,le=Object.getOwnPropertyDescriptor,k=(o,t,e,r)=>{for(var n=r>1?void 0:r?le(t,e):t,s=o.length-1,i;s>=0;s--)(i=o[s])&&(n=(r?i(t,e,n):i(n))||n);return r&&n&&he(t,e,n),n};l.CommentReference=class extends T{constructor(){super(...arguments),this.name="",this.commentData=null,this.isLoading=!1,this.error="",this.isDark=!1,this.hasFetched=!1,this.avatarUrl=null}connectedCallback(){super.connectedCallback(),this.detectTheme(),this.observeTheme(),this.name&&!this.hasFetched&&this.fetchComment()}disconnectedCallback(){super.disconnectedCallback(),console.log("Component disconnected"),this.themeObserver&&this.themeObserver.disconnect()}detectTheme(){this.isDark=ae()}observeTheme(){this.themeObserver=ce(()=>{this.detectTheme()})}async fetchComment(){if(!this.name){this.error="缺少评论名称";return}if(!this.hasFetched){this.hasFetched=!0,this.isLoading=!0,this.error="";try{const t=await se(this.name);t?(this.commentData=t,this.avatarUrl=await ne(t)):(this.error="未找到评论数据",this.commentData=null,this.avatarUrl=null)}catch(t){this.error=t instanceof Error?t.message:"获取评论失败",this.commentData=null,this.avatarUrl=null,console.error("Error fetching comment:",t)}finally{this.isLoading=!1}}}renderCommentContent(){return this.commentData?v`
      <div class="comment-header">
        <div class="comment-avatar">
          ${this.avatarUrl?v`<img src="${this.avatarUrl}" alt="${this.commentData.displayName}">`:v`<span class="comment-avatar-placeholder">${re(this.commentData.displayName)}</span>`}
        </div>
        <div class="comment-info">
          <div class="comment-author">${this.commentData.displayName}</div>
        </div>
      </div>
      <div class="comment-content">${te(this.commentData.raw)}</div>
    `:""}render(){return this.isLoading?v`
        <div class="comment-container ${this.isDark?"dark":""}">
          <div class="comment-loading">加载中...</div>
        </div>
      `:this.error?v`
        <div class="comment-container ${this.isDark?"dark":""}">
          <div class="comment-error">${this.error}</div>
        </div>
      `:this.commentData?v`
      <div class="comment-container ${this.isDark?"dark":""}">
        ${this.renderCommentContent()}
      </div>
    `:v`
        <div class="comment-container ${this.isDark?"dark":""}">
          <div class="comment-empty">暂无评论数据</div>
        </div>
      `}},l.CommentReference.styles=ee,k([$({type:String})],l.CommentReference.prototype,"name",2),k([y()],l.CommentReference.prototype,"commentData",2),k([y()],l.CommentReference.prototype,"isLoading",2),k([y()],l.CommentReference.prototype,"error",2),k([y()],l.CommentReference.prototype,"isDark",2),k([y()],l.CommentReference.prototype,"hasFetched",2),k([y()],l.CommentReference.prototype,"avatarUrl",2),l.CommentReference=k([Y("comment-reference")],l.CommentReference);const At="important",me=" !"+At,de=et(class extends rt{constructor(o){if(super(o),o.type!==tt.ATTRIBUTE||o.name!=="style"||o.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(o){return Object.keys(o).reduce(((t,e)=>{const r=o[e];return r==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`}),"")}update(o,[t]){const{style:e}=o.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const r of this.ft)t[r]==null&&(this.ft.delete(r),r.includes("-")?e.removeProperty(r):e[r]=null);for(const r in t){const n=t[r];if(n!=null){this.ft.add(r);const s=typeof n=="string"&&n.endsWith(me);r.includes("-")||s?e.setProperty(r,s?n.slice(0,-11):n,s?At:""):e[r]=n}}return b}});const{I:pe}=Wt,wt=()=>document.createComment(""),L=(o,t,e)=>{const r=o._$AA.parentNode,n=t===void 0?o._$AB:t._$AA;if(e===void 0){const s=r.insertBefore(wt(),n),i=r.insertBefore(wt(),n);e=new pe(s,i,o,o.options)}else{const s=e._$AB.nextSibling,i=e._$AM,c=i!==o;if(c){let a;e._$AQ?.(o),e._$AM=o,e._$AP!==void 0&&(a=o._$AU)!==i._$AU&&e._$AP(a)}if(s!==n||c){let a=e._$AA;for(;a!==s;){const p=a.nextSibling;r.insertBefore(a,n),a=p}}}return e},B=(o,t,e=o)=>(o._$AI(t,e),o),ue={},fe=(o,t=ue)=>o._$AH=t,ge=o=>o._$AH,nt=o=>{o._$AR(),o._$AA.remove()};const xt=(o,t,e)=>{const r=new Map;for(let n=t;n<=e;n++)r.set(o[n],n);return r},$e=et(class extends rt{constructor(o){if(super(o),o.type!==tt.CHILD)throw Error("repeat() can only be used in text expressions")}dt(o,t,e){let r;e===void 0?e=t:t!==void 0&&(r=t);const n=[],s=[];let i=0;for(const c of o)n[i]=r?r(c,i):i,s[i]=e(c,i),i++;return{values:s,keys:n}}render(o,t,e){return this.dt(o,t,e).values}update(o,[t,e,r]){const n=ge(o),{values:s,keys:i}=this.dt(t,e,r);if(!Array.isArray(n))return this.ut=i,s;const c=this.ut??=[],a=[];let p,u,h=0,m=n.length-1,d=0,g=s.length-1;for(;h<=m&&d<=g;)if(n[h]===null)h++;else if(n[m]===null)m--;else if(c[h]===i[d])a[d]=B(n[h],s[d]),h++,d++;else if(c[m]===i[g])a[g]=B(n[m],s[g]),m--,g--;else if(c[h]===i[g])a[g]=B(n[h],s[g]),L(o,a[g+1],n[h]),h++,g--;else if(c[m]===i[d])a[d]=B(n[m],s[d]),L(o,n[h],n[m]),m--,d++;else if(p===void 0&&(p=xt(i,d,g),u=xt(c,h,m)),p.has(c[h]))if(p.has(c[m])){const A=u.get(i[d]),st=A!==void 0?n[A]:null;if(st===null){const Ct=L(o,n[h]);B(Ct,s[d]),a[d]=Ct}else a[d]=B(st,s[d]),L(o,n[h],st),n[A]=null;d++}else nt(n[m]),m--;else nt(n[h]),h++;for(;d<=g;){const A=L(o,a[g+1]);B(A,s[d]),a[d++]=A}for(;h<=m;){const A=n[h++];A!==null&&nt(A)}return this.ut=i,fe(o,a),b}}),ve=V`
  :host {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
  }

  .barrage-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 10;
  }

  .barrage-item {
    position: absolute;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 20px;
    color: #fff;
    font-size: 14px;
    white-space: nowrap;
    user-select: none;
    pointer-events: auto;
    will-change: transform;
    transition: background-color 0.2s;
    cursor: default;
    animation-timing-function: linear !important;
    animation-fill-mode: forwards;
  }

  .barrage-item:hover {
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 20;
    animation-play-state: paused;
  }

  .barrage-item.paused {
    animation-play-state: paused !important;
    z-index: 20;
  }

  .barrage-author {
    font-weight: bold;
    color: #ffcd38;
    margin-right: 4px;
  }

  .barrage-content {
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @keyframes moveLeft {
    from {
      transform: translateX(100vw);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;var be=Object.defineProperty,ye=Object.getOwnPropertyDescriptor,C=(o,t,e,r)=>{for(var n=r>1?void 0:r?ye(t,e):t,s=o.length-1,i;s>=0;s--)(i=o[s])&&(n=(r?i(t,e,n):i(n))||n);return r&&n&&be(t,e,n),n};function kt(o){const t=document.createElement("div");return t.innerHTML=o,t.textContent||t.innerText||""}l.CommentBarrage=class extends T{constructor(){super(...arguments),this.comments=[],this.rows=8,this.baseTime=10,this.loop=!0,this.height=0,this.activeBarrages=[],this.isPlaying=!1,this.currentIndex=0,this.trackAvailability=[],this.spawnInterval=1e3,this.lastSpawnTime=0,this.loopLogic=()=>{if(!this.isPlaying)return;const t=performance.now();if(this.activeBarrages=this.activeBarrages.filter(e=>t<e.startTime+e.duration*1e3),t-this.lastSpawnTime>this.spawnInterval&&(this.comments.length>0&&this.trySpawnNext(),this.lastSpawnTime=t),!this.loop&&this.currentIndex>=this.comments.length&&this.activeBarrages.length===0){this.stop(),this.dispatchEvent(new CustomEvent("barrage-complete",{bubbles:!0,composed:!0}));return}this.animationFrameId=requestAnimationFrame(this.loopLogic)}}connectedCallback(){super.connectedCallback(),this.trackAvailability=new Array(this.rows).fill(0),this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}updated(t){t.has("rows")&&(this.trackAvailability=new Array(this.rows).fill(0))}start(){this.isPlaying||(this.isPlaying=!0,this.loopLogic())}pause(){this.isPlaying=!1,this.animationFrameId&&cancelAnimationFrame(this.animationFrameId)}stop(){this.pause(),this.activeBarrages=[],this.currentIndex=0,this.trackAvailability.fill(0)}addBarrage(t){this.spawnBarrage(t)}setComments(t){this.comments=t,this.currentIndex>=this.comments.length&&this.loop&&(this.currentIndex=0)}async trySpawnNext(){if(this.currentIndex>=this.comments.length)if(this.loop)this.currentIndex=0;else return;const t=this.comments[this.currentIndex];await this.spawnBarrage(t)?(this.currentIndex++,this.spawnInterval=500+Math.random()*1500):this.spawnInterval=200}async spawnBarrage(t){const e=Date.now();let r=-1;const n=[];for(let m=0;m<this.rows;m++)this.trackAvailability[m]<=e&&n.push(m);if(n.length===0)return!1;r=n[Math.floor(Math.random()*n.length)];const s=this.baseTime+(Math.random()*2-1),c=50+t.content.length*14,p=(this.container?.clientWidth||1e3)/s,u=(c+100)/p*1e3;this.trackAvailability[r]=e+u;const h={id:Math.random().toString(36).substr(2,9),data:t,top:r*(100/this.rows),duration:s,startTime:performance.now()};return this.activeBarrages=[...this.activeBarrages,h],!0}render(){return v`
      <div class="barrage-container">
        ${$e(this.activeBarrages,t=>t.id,t=>v`
            <div
              class="barrage-item"
              style=${de({top:`${t.top}%`,animationDuration:`${t.duration}s`,animationName:"moveLeft"})}
              @animationend=${()=>this.removeBarrage(t.id)}
            >
              <span class="barrage-author">${t.data.displayName}:</span>
              <span class="barrage-content" title="${kt(t.data.content)}">${kt(t.data.content)}</span>
            </div>
          `)}
      </div>
    `}removeBarrage(t){this.activeBarrages=this.activeBarrages.filter(e=>e.id!==t)}},l.CommentBarrage.styles=ve,C([$({type:Array})],l.CommentBarrage.prototype,"comments",2),C([$({type:Number})],l.CommentBarrage.prototype,"rows",2),C([$({type:Number})],l.CommentBarrage.prototype,"baseTime",2),C([$({type:Boolean})],l.CommentBarrage.prototype,"loop",2),C([$({type:Number})],l.CommentBarrage.prototype,"height",2),C([y()],l.CommentBarrage.prototype,"activeBarrages",2),C([Yt(".barrage-container")],l.CommentBarrage.prototype,"container",2),l.CommentBarrage=C([Y("comment-barrage")],l.CommentBarrage);var _e=Object.defineProperty,Ae=Object.getOwnPropertyDescriptor,_=(o,t,e,r)=>{for(var n=r>1?void 0:r?Ae(t,e):t,s=o.length-1,i;s>=0;s--)(i=o[s])&&(n=(r?i(t,e,n):i(n))||n);return r&&n&&_e(t,e,n),n};l.XhhaoBarrage=class extends T{constructor(){super(...arguments),this.kind="",this.group="",this.name="",this.speed=20,this.rows=8,this.loop=!1,this.comments=[],this.isVisible=!0,this.hasFetched=!1}connectedCallback(){super.connectedCallback(),this.parentElement!==document.body&&setTimeout(()=>{document.body.appendChild(this)},0),this.kind&&this.group&&this.name&&!this.hasFetched&&this.fetchData()}async fetchData(){this.hasFetched=!0;try{const t=await ie({kind:this.kind,group:this.group,name:this.name});this.comments=t}catch(t){console.error("Error fetching barrage comments:",t)}}handleClose(){this.isVisible=!1,setTimeout(()=>{this.remove()},300)}handleBarrageComplete(){this.handleClose()}render(){return!this.isVisible||this.comments.length===0?v``:v`
      <comment-barrage
        .comments=${this.comments}
        .rows=${this.rows}
        .baseTime=${this.speed}
        .loop=${this.loop}
        @barrage-complete=${this.handleBarrageComplete}
      ></comment-barrage>
      <button class="close-button" @click=${this.handleClose}>
        ✕ 关闭弹幕
      </button>
    `}},l.XhhaoBarrage.styles=V`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 2147483647; /* Maximum z-index value */
    }
    comment-barrage {
      width: 100%;
      height: 100%;
    }
    .close-button {
      position: fixed;
      bottom: 20px;
      left: 20px;
      padding: 8px 16px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 20px;
      cursor: pointer;
      pointer-events: auto;
      font-size: 14px;
      z-index: 2147483647; /* Maximum z-index value */
      transition: all 0.2s;
      user-select: none;
    }
    .close-button:hover {
      background: rgba(0, 0, 0, 0.9);
      transform: scale(1.05);
    }
  `,_([$({type:String})],l.XhhaoBarrage.prototype,"kind",2),_([$({type:String})],l.XhhaoBarrage.prototype,"group",2),_([$({type:String})],l.XhhaoBarrage.prototype,"name",2),_([$({type:Number})],l.XhhaoBarrage.prototype,"speed",2),_([$({type:Number})],l.XhhaoBarrage.prototype,"rows",2),_([$({type:Boolean,converter:o=>o!==null&&o!=="false"})],l.XhhaoBarrage.prototype,"loop",2),_([y()],l.XhhaoBarrage.prototype,"comments",2),_([y()],l.XhhaoBarrage.prototype,"isVisible",2),l.XhhaoBarrage=_([Y("xhhao-barrage")],l.XhhaoBarrage),Object.defineProperty(l,Symbol.toStringTag,{value:"Module"})}));
