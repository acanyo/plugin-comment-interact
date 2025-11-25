(function(l,_){typeof exports=="object"&&typeof module<"u"?_(exports):typeof define=="function"&&define.amd?define(["exports"],_):(l=typeof globalThis<"u"?globalThis:l||self,_(l.CommentReference={}))})(this,(function(l){"use strict";const _=globalThis,W=_.ShadowRoot&&(_.ShadyCSS===void 0||_.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol(),it=new WeakMap;let at=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==X)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(W&&t===void 0){const r=e!==void 0&&e.length===1;r&&(t=it.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&it.set(e,t))}return t}toString(){return this.cssText}};const Et=n=>new at(typeof n=="string"?n:n+"",void 0,X),V=(n,...t)=>{const e=n.length===1?n[0]:t.reduce(((r,o,s)=>r+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+n[s+1]),n[0]);return new at(e,n,X)},Pt=(n,t)=>{if(W)n.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const e of t){const r=document.createElement("style"),o=_.litNonce;o!==void 0&&r.setAttribute("nonce",o),r.textContent=e.cssText,n.appendChild(r)}},ct=W?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return Et(e)})(n):n;const{is:Tt,defineProperty:Ut,getOwnPropertyDescriptor:Ot,getOwnPropertyNames:Bt,getOwnPropertySymbols:Mt,getPrototypeOf:Dt}=Object,j=globalThis,ht=j.trustedTypes,Rt=ht?ht.emptyScript:"",Nt=j.reactiveElementPolyfillSupport,M=(n,t)=>n,z={toAttribute(n,t){switch(t){case Boolean:n=n?Rt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},Z=(n,t)=>!Tt(n,t),lt={attribute:!0,type:String,converter:z,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??=Symbol("metadata"),j.litPropertyMetadata??=new WeakMap;let U=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=lt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),o=this.getPropertyDescriptor(t,r,e);o!==void 0&&Ut(this.prototype,t,o)}}static getPropertyDescriptor(t,e,r){const{get:o,set:s}=Ot(this.prototype,t)??{get(){return this[e]},set(i){this[e]=i}};return{get:o,set(i){const c=o?.call(this);s?.call(this,i),this.requestUpdate(t,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??lt}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;const t=Dt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){const e=this.properties,r=[...Bt(e),...Mt(e)];for(const o of r)this.createProperty(o,e[o])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[r,o]of e)this.elementProperties.set(r,o)}this._$Eh=new Map;for(const[e,r]of this.elementProperties){const o=this._$Eu(e,r);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const o of r)e.unshift(ct(o))}else t!==void 0&&e.push(ct(t));return e}static _$Eu(t,e){const r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Pt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){const r=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,r);if(o!==void 0&&r.reflect===!0){const s=(r.converter?.toAttribute!==void 0?r.converter:z).toAttribute(e,r.type);this._$Em=t,s==null?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,e){const r=this.constructor,o=r._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const s=r.getPropertyOptions(o),i=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:z;this._$Em=o;const c=i.fromAttribute(e,s.type);this[o]=c??this._$Ej?.get(o)??c,this._$Em=null}}requestUpdate(t,e,r){if(t!==void 0){const o=this.constructor,s=this[t];if(r??=o.getPropertyOptions(t),!((r.hasChanged??Z)(s,e)||r.useDefault&&r.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:o,wrapped:s},i){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,i??e??this[t]),s!==!0||i!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[o,s]of this._$Ep)this[o]=s;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[o,s]of r){const{wrapped:i}=s,c=this[o];i!==!0||this._$AL.has(o)||c===void 0||this.C(o,void 0,s,c)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((r=>r.hostUpdate?.())),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};U.elementStyles=[],U.shadowRootOptions={mode:"open"},U[M("elementProperties")]=new Map,U[M("finalized")]=new Map,Nt?.({ReactiveElement:U}),(j.reactiveElementVersions??=[]).push("2.1.1");const J=globalThis,F=J.trustedTypes,dt=F?F.createPolicy("lit-html",{createHTML:n=>n}):void 0,mt="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,pt="?"+A,Ht=`<${pt}>`,C=document,D=()=>C.createComment(""),R=n=>n===null||typeof n!="object"&&typeof n!="function",K=Array.isArray,It=n=>K(n)||typeof n?.[Symbol.iterator]=="function",Q=`[ 	
\f\r]`,N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ut=/-->/g,ft=/>/g,S=RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),gt=/'/g,$t=/"/g,vt=/^(?:script|style|textarea|title)$/i,Lt=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),$=Lt(1),b=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),bt=new WeakMap,E=C.createTreeWalker(C,129);function yt(n,t){if(!K(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return dt!==void 0?dt.createHTML(t):t}const jt=(n,t)=>{const e=n.length-1,r=[];let o,s=t===2?"<svg>":t===3?"<math>":"",i=N;for(let c=0;c<e;c++){const a=n[c];let m,u,h=-1,p=0;for(;p<a.length&&(i.lastIndex=p,u=i.exec(a),u!==null);)p=i.lastIndex,i===N?u[1]==="!--"?i=ut:u[1]!==void 0?i=ft:u[2]!==void 0?(vt.test(u[2])&&(o=RegExp("</"+u[2],"g")),i=S):u[3]!==void 0&&(i=S):i===S?u[0]===">"?(i=o??N,h=-1):u[1]===void 0?h=-2:(h=i.lastIndex-u[2].length,m=u[1],i=u[3]===void 0?S:u[3]==='"'?$t:gt):i===$t||i===gt?i=S:i===ut||i===ft?i=N:(i=S,o=void 0);const d=i===S&&n[c+1].startsWith("/>")?" ":"";s+=i===N?a+Ht:h>=0?(r.push(m),a.slice(0,h)+mt+a.slice(h)+A+d):a+A+(h===-2?c:d)}return[yt(n,s+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]};class H{constructor({strings:t,_$litType$:e},r){let o;this.parts=[];let s=0,i=0;const c=t.length-1,a=this.parts,[m,u]=jt(t,e);if(this.el=H.createElement(m,r),E.currentNode=this.el.content,e===2||e===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(o=E.nextNode())!==null&&a.length<c;){if(o.nodeType===1){if(o.hasAttributes())for(const h of o.getAttributeNames())if(h.endsWith(mt)){const p=u[i++],d=o.getAttribute(h).split(A),g=/([.?@])?(.*)/.exec(p);a.push({type:1,index:s,name:g[2],strings:d,ctor:g[1]==="."?Ft:g[1]==="?"?qt:g[1]==="@"?Wt:q}),o.removeAttribute(h)}else h.startsWith(A)&&(a.push({type:6,index:s}),o.removeAttribute(h));if(vt.test(o.tagName)){const h=o.textContent.split(A),p=h.length-1;if(p>0){o.textContent=F?F.emptyScript:"";for(let d=0;d<p;d++)o.append(h[d],D()),E.nextNode(),a.push({type:2,index:++s});o.append(h[p],D())}}}else if(o.nodeType===8)if(o.data===pt)a.push({type:2,index:s});else{let h=-1;for(;(h=o.data.indexOf(A,h+1))!==-1;)a.push({type:7,index:s}),h+=A.length-1}s++}}static createElement(t,e){const r=C.createElement("template");return r.innerHTML=t,r}}function O(n,t,e=n,r){if(t===b)return t;let o=r!==void 0?e._$Co?.[r]:e._$Cl;const s=R(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(n),o._$AT(n,e,r)),r!==void 0?(e._$Co??=[])[r]=o:e._$Cl=o),o!==void 0&&(t=O(n,o._$AS(n,t.values),o,r)),t}let zt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,o=(t?.creationScope??C).importNode(e,!0);E.currentNode=o;let s=E.nextNode(),i=0,c=0,a=r[0];for(;a!==void 0;){if(i===a.index){let m;a.type===2?m=new B(s,s.nextSibling,this,t):a.type===1?m=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(m=new Xt(s,this,t)),this._$AV.push(m),a=r[++c]}i!==a?.index&&(s=E.nextNode(),i++)}return E.currentNode=C,o}p(t){let e=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}};class B{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,o){this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=O(this,t,e),R(t)?t===f||t==null||t===""?(this._$AH!==f&&this._$AR(),this._$AH=f):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):It(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==f&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(C.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=H.createElement(yt(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(e);else{const s=new zt(o,this),i=s.u(this.options);s.p(e),this.T(i),this._$AH=s}}_$AC(t){let e=bt.get(t.strings);return e===void 0&&bt.set(t.strings,e=new H(t)),e}k(t){K(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,o=0;for(const s of t)o===e.length?e.push(r=new B(this.O(D()),this.O(D()),this,this.options)):r=e[o],r._$AI(s),o++;o<e.length&&(this._$AR(r&&r._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,o,s){this.type=1,this._$AH=f,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=f}_$AI(t,e=this,r,o){const s=this.strings;let i=!1;if(s===void 0)t=O(this,t,e,0),i=!R(t)||t!==this._$AH&&t!==b,i&&(this._$AH=t);else{const c=t;let a,m;for(t=s[0],a=0;a<s.length-1;a++)m=O(this,c[r+a],e,a),m===b&&(m=this._$AH[a]),i||=!R(m)||m!==this._$AH[a],m===f?t=f:t!==f&&(t+=(m??"")+s[a+1]),this._$AH[a]=m}i&&!o&&this.j(t)}j(t){t===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ft extends q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===f?void 0:t}}class qt extends q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==f)}}class Wt extends q{constructor(t,e,r,o,s){super(t,e,r,o,s),this.type=5}_$AI(t,e=this){if((t=O(this,t,e,0)??f)===b)return;const r=this._$AH,o=t===f&&r!==f||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==f&&(r===f||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Xt{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){O(this,t)}}const Vt={I:B},Zt=J.litHtmlPolyfillSupport;Zt?.(H,B),(J.litHtmlVersions??=[]).push("3.3.1");const Jt=(n,t,e)=>{const r=e?.renderBefore??t;let o=r._$litPart$;if(o===void 0){const s=e?.renderBefore??null;r._$litPart$=o=new B(t.insertBefore(D(),s),s,void 0,e??{})}return o._$AI(n),o};const G=globalThis;let P=class extends U{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Jt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return b}};P._$litElement$=!0,P.finalized=!0,G.litElementHydrateSupport?.({LitElement:P});const Kt=G.litElementPolyfillSupport;Kt?.({LitElement:P}),(G.litElementVersions??=[]).push("4.2.1");const Y=n=>(t,e)=>{e!==void 0?e.addInitializer((()=>{customElements.define(n,t)})):customElements.define(n,t)};const Qt={attribute:!0,type:String,converter:z,reflect:!1,hasChanged:Z},Gt=(n=Qt,t,e)=>{const{kind:r,metadata:o}=e;let s=globalThis.litPropertyMetadata.get(o);if(s===void 0&&globalThis.litPropertyMetadata.set(o,s=new Map),r==="setter"&&((n=Object.create(n)).wrapped=!0),s.set(e.name,n),r==="accessor"){const{name:i}=e;return{set(c){const a=t.get.call(this);t.set.call(this,c),this.requestUpdate(i,a,n)},init(c){return c!==void 0&&this.C(i,void 0,n,c),c}}}if(r==="setter"){const{name:i}=e;return function(c){const a=this[i];t.call(this,c),this.requestUpdate(i,a,n)}}throw Error("Unsupported decorator location: "+r)};function v(n){return(t,e)=>typeof e=="object"?Gt(n,t,e):((r,o,s)=>{const i=o.hasOwnProperty(s);return o.constructor.createProperty(s,r),i?Object.getOwnPropertyDescriptor(o,s):void 0})(n,t,e)}function w(n){return v({...n,state:!0,attribute:!1})}const Yt=(n,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(n,t,e),e);function te(n,t){return(e,r,o)=>{const s=i=>i.renderRoot?.querySelector(n)??null;return Yt(e,r,{get(){return s(this)}})}}const tt={ATTRIBUTE:1,CHILD:2},et=n=>(...t)=>({_$litDirective$:n,values:t});let rt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};class ot extends rt{constructor(t){if(super(t),this.it=f,t.type!==tt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===f||t==null)return this._t=void 0,this.it=t;if(t===b)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}ot.directiveName="unsafeHTML",ot.resultType=1;const ee=et(ot),re=V`
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
`;function _t(n){return n?.charAt(0).toUpperCase()??""}async function oe(n){const e=new TextEncoder().encode(n),r=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(r)).map(s=>s.toString(16).padStart(2,"0")).join("")}async function At(n){if(!n)return null;if(n.userAvatar)return n.userAvatar;if(n.email){const t=n.email.trim().toLowerCase();if(t)try{return`https://weavatar.com/avatar/${await oe(t)}`}catch(e){return console.error("Failed to generate avatar URL:",e),null}}return null}async function ne(n){const t=`/apis/api.comment.interact.xhhao.com/v1alpha1/comments/${encodeURIComponent(n)}`,e=await fetch(t);if(!e.ok)throw new Error(`获取评论失败: ${e.status} ${e.statusText}`);const r=await e.json();return r.kind==="Comment"?r:r.data?r.data:null}async function se(n){const e=`/apis/api.comment.interact.xhhao.com/v1alpha1/commentList?${new URLSearchParams({group:n.group,kind:n.kind,name:n.name,size:"100",replySize:"100"}).toString()}`,r=await fetch(e);if(!r.ok)throw new Error(`获取评论列表失败: ${r.status} ${r.statusText}`);const o=await r.json(),s=[];if(Array.isArray(o.items)){const i=o.items;for(const c of i)if(s.push(wt(c)),c.replies?.items)for(const a of c.replies.items)s.push(wt(a))}return s}function wt(n){const t=n.spec.owner.annotations?.["email-hash"];return{kind:"Comment",name:n.metadata.name,displayName:n.spec.owner.displayName,content:n.spec.content,raw:n.spec.raw,metadataName:n.metadata.name,approved:n.spec.approved,userAvatar:t?`https://weavatar.com/avatar/${t}`:void 0}}function ie(){const n=["html.dark:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[class~='dark']:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[class*='dark']:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[data-color-scheme='dark']:not([data-color-scheme='light'])","html[data-theme='dark']:not([data-theme='light'])","html[theme='dark']:not([theme='light'])","[data-color-scheme='dark']:not([data-color-scheme='light'])","[data-theme='dark']:not([data-theme='light'])","[theme='dark']:not([theme='light'])"],t=document.documentElement,e=document.body;return n.some(o=>{try{return t.matches(o)||e.matches(o)}catch{return!1}})||t.classList.contains("dark")||t.getAttribute("data-theme")==="dark"||t.getAttribute("data-color-scheme")==="dark"||t.getAttribute("theme")==="dark"}function ae(n){const t=new MutationObserver(n);return t.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","theme"]}),t.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","theme"]}),t}var ce=Object.defineProperty,he=Object.getOwnPropertyDescriptor,x=(n,t,e,r)=>{for(var o=r>1?void 0:r?he(t,e):t,s=n.length-1,i;s>=0;s--)(i=n[s])&&(o=(r?i(t,e,o):i(o))||o);return r&&o&&ce(t,e,o),o};l.CommentReference=class extends P{constructor(){super(...arguments),this.name="",this.commentData=null,this.isLoading=!1,this.error="",this.isDark=!1,this.hasFetched=!1,this.avatarUrl=null}connectedCallback(){super.connectedCallback(),this.detectTheme(),this.observeTheme(),this.name&&!this.hasFetched&&this.fetchComment()}disconnectedCallback(){super.disconnectedCallback(),console.log("Component disconnected"),this.themeObserver&&this.themeObserver.disconnect()}detectTheme(){this.isDark=ie()}observeTheme(){this.themeObserver=ae(()=>{this.detectTheme()})}async fetchComment(){if(!this.name){this.error="缺少评论名称";return}if(!this.hasFetched){this.hasFetched=!0,this.isLoading=!0,this.error="";try{const t=await ne(this.name);t?(this.commentData=t,this.avatarUrl=await At(t)):(this.error="未找到评论数据",this.commentData=null,this.avatarUrl=null)}catch(t){this.error=t instanceof Error?t.message:"获取评论失败",this.commentData=null,this.avatarUrl=null,console.error("Error fetching comment:",t)}finally{this.isLoading=!1}}}renderCommentContent(){return this.commentData?$`
      <div class="comment-header">
        <div class="comment-avatar">
          ${this.avatarUrl?$`<img src="${this.avatarUrl}" alt="${this.commentData.displayName}">`:$`<span class="comment-avatar-placeholder">${_t(this.commentData.displayName)}</span>`}
        </div>
        <div class="comment-info">
          <div class="comment-author">${this.commentData.displayName}</div>
        </div>
      </div>
      <div class="comment-content">${ee(this.commentData.raw)}</div>
    `:""}render(){return this.isLoading?$`
        <div class="comment-container ${this.isDark?"dark":""}">
          <div class="comment-loading">加载中...</div>
        </div>
      `:this.error?$`
        <div class="comment-container ${this.isDark?"dark":""}">
          <div class="comment-error">${this.error}</div>
        </div>
      `:this.commentData?$`
      <div class="comment-container ${this.isDark?"dark":""}">
        ${this.renderCommentContent()}
      </div>
    `:$`
        <div class="comment-container ${this.isDark?"dark":""}">
          <div class="comment-empty">暂无评论数据</div>
        </div>
      `}},l.CommentReference.styles=re,x([v({type:String})],l.CommentReference.prototype,"name",2),x([w()],l.CommentReference.prototype,"commentData",2),x([w()],l.CommentReference.prototype,"isLoading",2),x([w()],l.CommentReference.prototype,"error",2),x([w()],l.CommentReference.prototype,"isDark",2),x([w()],l.CommentReference.prototype,"hasFetched",2),x([w()],l.CommentReference.prototype,"avatarUrl",2),l.CommentReference=x([Y("comment-reference")],l.CommentReference);const xt="important",le=" !"+xt,de=et(class extends rt{constructor(n){if(super(n),n.type!==tt.ATTRIBUTE||n.name!=="style"||n.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(n){return Object.keys(n).reduce(((t,e)=>{const r=n[e];return r==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`}),"")}update(n,[t]){const{style:e}=n.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const r of this.ft)t[r]==null&&(this.ft.delete(r),r.includes("-")?e.removeProperty(r):e[r]=null);for(const r in t){const o=t[r];if(o!=null){this.ft.add(r);const s=typeof o=="string"&&o.endsWith(le);r.includes("-")||s?e.setProperty(r,s?o.slice(0,-11):o,s?xt:""):e[r]=o}}return b}});const{I:me}=Vt,kt=()=>document.createComment(""),I=(n,t,e)=>{const r=n._$AA.parentNode,o=t===void 0?n._$AB:t._$AA;if(e===void 0){const s=r.insertBefore(kt(),o),i=r.insertBefore(kt(),o);e=new me(s,i,n,n.options)}else{const s=e._$AB.nextSibling,i=e._$AM,c=i!==n;if(c){let a;e._$AQ?.(n),e._$AM=n,e._$AP!==void 0&&(a=n._$AU)!==i._$AU&&e._$AP(a)}if(s!==o||c){let a=e._$AA;for(;a!==s;){const m=a.nextSibling;r.insertBefore(a,o),a=m}}}return e},T=(n,t,e=n)=>(n._$AI(t,e),n),pe={},ue=(n,t=pe)=>n._$AH=t,fe=n=>n._$AH,nt=n=>{n._$AR(),n._$AA.remove()};const Ct=(n,t,e)=>{const r=new Map;for(let o=t;o<=e;o++)r.set(n[o],o);return r},ge=et(class extends rt{constructor(n){if(super(n),n.type!==tt.CHILD)throw Error("repeat() can only be used in text expressions")}dt(n,t,e){let r;e===void 0?e=t:t!==void 0&&(r=t);const o=[],s=[];let i=0;for(const c of n)o[i]=r?r(c,i):i,s[i]=e(c,i),i++;return{values:s,keys:o}}render(n,t,e){return this.dt(n,t,e).values}update(n,[t,e,r]){const o=fe(n),{values:s,keys:i}=this.dt(t,e,r);if(!Array.isArray(o))return this.ut=i,s;const c=this.ut??=[],a=[];let m,u,h=0,p=o.length-1,d=0,g=s.length-1;for(;h<=p&&d<=g;)if(o[h]===null)h++;else if(o[p]===null)p--;else if(c[h]===i[d])a[d]=T(o[h],s[d]),h++,d++;else if(c[p]===i[g])a[g]=T(o[p],s[g]),p--,g--;else if(c[h]===i[g])a[g]=T(o[h],s[g]),I(n,a[g+1],o[h]),h++,g--;else if(c[p]===i[d])a[d]=T(o[p],s[d]),I(n,o[h],o[p]),p--,d++;else if(m===void 0&&(m=Ct(i,d,g),u=Ct(c,h,p)),m.has(c[h]))if(m.has(c[p])){const y=u.get(i[d]),st=y!==void 0?o[y]:null;if(st===null){const St=I(n,o[h]);T(St,s[d]),a[d]=St}else a[d]=T(st,s[d]),I(n,o[h],st),o[y]=null;d++}else nt(o[p]),p--;else nt(o[h]),h++;for(;d<=g;){const y=I(n,a[g+1]);T(y,s[d]),a[d++]=y}for(;h<=p;){const y=o[h++];y!==null&&nt(y)}return this.ut=i,ue(n,a),b}}),$e=V`
  :host {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none; /* 默认不阻挡底部内容交互 */
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
    pointer-events: auto; /* 弹幕本身可以交互（如悬停暂停） */
    will-change: transform;
    transition: background-color 0.2s;
    cursor: default;
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

  .barrage-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .barrage-avatar-placeholder {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #555;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    color: #fff;
    text-transform: uppercase;
  }

  .barrage-content {
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* 简单的动画定义，实际运行会通过 JS 动态计算时长 */
  @keyframes moveLeft {
    from {
      transform: translateX(100vw);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;var ve=Object.defineProperty,be=Object.getOwnPropertyDescriptor,k=(n,t,e,r)=>{for(var o=r>1?void 0:r?be(t,e):t,s=n.length-1,i;s>=0;s--)(i=n[s])&&(o=(r?i(t,e,o):i(o))||o);return r&&o&&ve(t,e,o),o};l.CommentBarrage=class extends P{constructor(){super(...arguments),this.comments=[],this.rows=8,this.baseTime=10,this.loop=!0,this.height=0,this.activeBarrages=[],this.isPlaying=!1,this.currentIndex=0,this.trackAvailability=[],this.spawnInterval=1e3,this.lastSpawnTime=0,this.loopLogic=()=>{if(!this.isPlaying)return;const t=performance.now();this.activeBarrages=this.activeBarrages.filter(e=>t<e.startTime+e.duration*1e3+500),t-this.lastSpawnTime>this.spawnInterval&&(this.comments.length>0&&this.trySpawnNext(),this.lastSpawnTime=t),this.animationFrameId=requestAnimationFrame(this.loopLogic)}}connectedCallback(){super.connectedCallback(),this.trackAvailability=new Array(this.rows).fill(0),this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}updated(t){t.has("rows")&&(this.trackAvailability=new Array(this.rows).fill(0))}start(){this.isPlaying||(this.isPlaying=!0,this.loopLogic())}pause(){this.isPlaying=!1,this.animationFrameId&&cancelAnimationFrame(this.animationFrameId)}stop(){this.pause(),this.activeBarrages=[],this.currentIndex=0,this.trackAvailability.fill(0)}addBarrage(t){this.spawnBarrage(t)}setComments(t){this.comments=t,this.currentIndex>=this.comments.length&&this.loop&&(this.currentIndex=0)}async fetchComments(t){console.log("Fetching comments for post:",t)}async trySpawnNext(){if(this.currentIndex>=this.comments.length)if(this.loop)this.currentIndex=0;else return;const t=this.comments[this.currentIndex];await this.spawnBarrage(t)?(this.currentIndex++,this.spawnInterval=500+Math.random()*1500):this.spawnInterval=200}async spawnBarrage(t){const e=Date.now();let r=-1;const o=[];for(let d=0;d<this.rows;d++)this.trackAvailability[d]<=e&&o.push(d);if(o.length===0)return!1;r=o[Math.floor(Math.random()*o.length)];const s=this.baseTime+(Math.random()*2-1),c=50+t.content.length*14,m=(this.container?.clientWidth||1e3)/s,u=(c+100)/m*1e3;this.trackAvailability[r]=e+u;const h=await At(t),p={id:Math.random().toString(36).substr(2,9),data:t,top:r*(100/this.rows),duration:s,avatarUrl:h,startTime:performance.now()};return this.activeBarrages=[...this.activeBarrages,p],!0}render(){return $`
      <div class="barrage-container">
        ${ge(this.activeBarrages,t=>t.id,t=>$`
            <div
              class="barrage-item"
              style=${de({top:`${t.top}%`,animationDuration:`${t.duration}s`,animationName:"moveLeft"})}
              @animationend=${()=>this.removeBarrage(t.id)}
            >
              <div class="barrage-avatar">
                ${t.avatarUrl?$`<img src="${t.avatarUrl}" alt="${t.data.displayName}" class="barrage-avatar">`:$`<div class="barrage-avatar-placeholder">${_t(t.data.displayName)}</div>`}
              </div>
              <span class="barrage-content" title="${t.data.content}">${t.data.content}</span>
            </div>
          `)}
      </div>
    `}removeBarrage(t){this.activeBarrages=this.activeBarrages.filter(e=>e.id!==t)}},l.CommentBarrage.styles=$e,k([v({type:Array})],l.CommentBarrage.prototype,"comments",2),k([v({type:Number})],l.CommentBarrage.prototype,"rows",2),k([v({type:Number})],l.CommentBarrage.prototype,"baseTime",2),k([v({type:Boolean})],l.CommentBarrage.prototype,"loop",2),k([v({type:Number})],l.CommentBarrage.prototype,"height",2),k([w()],l.CommentBarrage.prototype,"activeBarrages",2),k([te(".barrage-container")],l.CommentBarrage.prototype,"container",2),l.CommentBarrage=k([Y("comment-barrage")],l.CommentBarrage);var ye=Object.defineProperty,_e=Object.getOwnPropertyDescriptor,L=(n,t,e,r)=>{for(var o=r>1?void 0:r?_e(t,e):t,s=n.length-1,i;s>=0;s--)(i=n[s])&&(o=(r?i(t,e,o):i(o))||o);return r&&o&&ye(t,e,o),o};l.XhhaoBarrage=class extends P{constructor(){super(...arguments),this.kind="",this.group="",this.name="",this.comments=[],this.hasFetched=!1}connectedCallback(){super.connectedCallback(),this.kind&&this.group&&this.name&&!this.hasFetched&&this.fetchData()}async fetchData(){this.hasFetched=!0;try{const t=await se({kind:this.kind,group:this.group,name:this.name});this.comments=t}catch(t){console.error("Error fetching barrage comments:",t)}}render(){return this.comments.length===0?$``:$`
      <comment-barrage
        .comments=${this.comments}
        .rows=${8}
        .loop=${!0}
      ></comment-barrage>
    `}},l.XhhaoBarrage.styles=V`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    }
    comment-barrage {
      width: 100%;
      height: 100%;
    }
  `,L([v({type:String})],l.XhhaoBarrage.prototype,"kind",2),L([v({type:String})],l.XhhaoBarrage.prototype,"group",2),L([v({type:String})],l.XhhaoBarrage.prototype,"name",2),L([w()],l.XhhaoBarrage.prototype,"comments",2),l.XhhaoBarrage=L([Y("xhhao-barrage")],l.XhhaoBarrage),Object.defineProperty(l,Symbol.toStringTag,{value:"Module"})}));
