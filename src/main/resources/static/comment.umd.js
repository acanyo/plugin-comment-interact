(function(p,$){typeof exports=="object"&&typeof module<"u"?$(exports):typeof define=="function"&&define.amd?define(["exports"],$):(p=typeof globalThis<"u"?globalThis:p||self,$(p.CommentInteract={}))})(this,(function(p){"use strict";const $=globalThis,j=$.ShadowRoot&&($.ShadyCSS===void 0||$.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,L=Symbol(),F=new WeakMap;let J=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==L)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(j&&t===void 0){const r=e!==void 0&&e.length===1;r&&(t=F.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&F.set(e,t))}return t}toString(){return this.cssText}};const ct=s=>new J(typeof s=="string"?s:s+"",void 0,L),ht=(s,...t)=>{const e=s.length===1?s[0]:t.reduce(((r,o,i)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+s[i+1]),s[0]);return new J(e,s,L)},lt=(s,t)=>{if(j)s.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const e of t){const r=document.createElement("style"),o=$.litNonce;o!==void 0&&r.setAttribute("nonce",o),r.textContent=e.cssText,s.appendChild(r)}},K=j?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return ct(e)})(s):s;const{is:mt,defineProperty:dt,getOwnPropertyDescriptor:pt,getOwnPropertyNames:ut,getOwnPropertySymbols:ft,getPrototypeOf:$t}=Object,R=globalThis,Z=R.trustedTypes,gt=Z?Z.emptyScript:"",vt=R.reactiveElementPolyfillSupport,E=(s,t)=>s,M={toAttribute(s,t){switch(t){case Boolean:s=s?gt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},D=(s,t)=>!mt(s,t),G={attribute:!0,type:String,converter:M,reflect:!1,useDefault:!1,hasChanged:D};Symbol.metadata??=Symbol("metadata"),R.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=G){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),o=this.getPropertyDescriptor(t,r,e);o!==void 0&&dt(this.prototype,t,o)}}static getPropertyDescriptor(t,e,r){const{get:o,set:i}=pt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:o,set(n){const c=o?.call(this);i?.call(this,n),this.requestUpdate(t,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??G}static _$Ei(){if(this.hasOwnProperty(E("elementProperties")))return;const t=$t(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(E("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(E("properties"))){const e=this.properties,r=[...ut(e),...ft(e)];for(const o of r)this.createProperty(o,e[o])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[r,o]of e)this.elementProperties.set(r,o)}this._$Eh=new Map;for(const[e,r]of this.elementProperties){const o=this._$Eu(e,r);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const o of r)e.unshift(K(o))}else t!==void 0&&e.push(K(t));return e}static _$Eu(t,e){const r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return lt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){const r=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,r);if(o!==void 0&&r.reflect===!0){const i=(r.converter?.toAttribute!==void 0?r.converter:M).toAttribute(e,r.type);this._$Em=t,i==null?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(t,e){const r=this.constructor,o=r._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const i=r.getPropertyOptions(o),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:M;this._$Em=o;const c=n.fromAttribute(e,i.type);this[o]=c??this._$Ej?.get(o)??c,this._$Em=null}}requestUpdate(t,e,r){if(t!==void 0){const o=this.constructor,i=this[t];if(r??=o.getPropertyOptions(t),!((r.hasChanged??D)(i,e)||r.useDefault&&r.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:o,wrapped:i},n){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),i!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[o,i]of this._$Ep)this[o]=i;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[o,i]of r){const{wrapped:n}=i,c=this[o];n!==!0||this._$AL.has(o)||c===void 0||this.C(o,void 0,i,c)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((r=>r.hostUpdate?.())),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[E("elementProperties")]=new Map,A[E("finalized")]=new Map,vt?.({ReactiveElement:A}),(R.reactiveElementVersions??=[]).push("2.1.1");const B=globalThis,H=B.trustedTypes,Q=H?H.createPolicy("lit-html",{createHTML:s=>s}):void 0,X="$lit$",g=`lit$${Math.random().toFixed(9).slice(2)}$`,Y="?"+g,_t=`<${Y}>`,_=document,k=()=>_.createComment(""),S=s=>s===null||typeof s!="object"&&typeof s!="function",I=Array.isArray,yt=s=>I(s)||typeof s?.[Symbol.iterator]=="function",q=`[ 	
\f\r]`,C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,tt=/-->/g,et=/>/g,y=RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),rt=/'/g,ot=/"/g,st=/^(?:script|style|textarea|title)$/i,bt=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),u=bt(1),x=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),it=new WeakMap,b=_.createTreeWalker(_,129);function nt(s,t){if(!I(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Q!==void 0?Q.createHTML(t):t}const At=(s,t)=>{const e=s.length-1,r=[];let o,i=t===2?"<svg>":t===3?"<math>":"",n=C;for(let c=0;c<e;c++){const a=s[c];let m,d,h=-1,f=0;for(;f<a.length&&(n.lastIndex=f,d=n.exec(a),d!==null);)f=n.lastIndex,n===C?d[1]==="!--"?n=tt:d[1]!==void 0?n=et:d[2]!==void 0?(st.test(d[2])&&(o=RegExp("</"+d[2],"g")),n=y):d[3]!==void 0&&(n=y):n===y?d[0]===">"?(n=o??C,h=-1):d[1]===void 0?h=-2:(h=n.lastIndex-d[2].length,m=d[1],n=d[3]===void 0?y:d[3]==='"'?ot:rt):n===ot||n===rt?n=y:n===tt||n===et?n=C:(n=y,o=void 0);const v=n===y&&s[c+1].startsWith("/>")?" ":"";i+=n===C?a+_t:h>=0?(r.push(m),a.slice(0,h)+X+a.slice(h)+g+v):a+g+(h===-2?c:v)}return[nt(s,i+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]};class P{constructor({strings:t,_$litType$:e},r){let o;this.parts=[];let i=0,n=0;const c=t.length-1,a=this.parts,[m,d]=At(t,e);if(this.el=P.createElement(m,r),b.currentNode=this.el.content,e===2||e===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(o=b.nextNode())!==null&&a.length<c;){if(o.nodeType===1){if(o.hasAttributes())for(const h of o.getAttributeNames())if(h.endsWith(X)){const f=d[n++],v=o.getAttribute(h).split(g),z=/([.?@])?(.*)/.exec(f);a.push({type:1,index:i,name:z[2],strings:v,ctor:z[1]==="."?wt:z[1]==="?"?Et:z[1]==="@"?kt:N}),o.removeAttribute(h)}else h.startsWith(g)&&(a.push({type:6,index:i}),o.removeAttribute(h));if(st.test(o.tagName)){const h=o.textContent.split(g),f=h.length-1;if(f>0){o.textContent=H?H.emptyScript:"";for(let v=0;v<f;v++)o.append(h[v],k()),b.nextNode(),a.push({type:2,index:++i});o.append(h[f],k())}}}else if(o.nodeType===8)if(o.data===Y)a.push({type:2,index:i});else{let h=-1;for(;(h=o.data.indexOf(g,h+1))!==-1;)a.push({type:7,index:i}),h+=g.length-1}i++}}static createElement(t,e){const r=_.createElement("template");return r.innerHTML=t,r}}function w(s,t,e=s,r){if(t===x)return t;let o=r!==void 0?e._$Co?.[r]:e._$Cl;const i=S(t)?void 0:t._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),i===void 0?o=void 0:(o=new i(s),o._$AT(s,e,r)),r!==void 0?(e._$Co??=[])[r]=o:e._$Cl=o),o!==void 0&&(t=w(s,o._$AS(s,t.values),o,r)),t}class xt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,o=(t?.creationScope??_).importNode(e,!0);b.currentNode=o;let i=b.nextNode(),n=0,c=0,a=r[0];for(;a!==void 0;){if(n===a.index){let m;a.type===2?m=new U(i,i.nextSibling,this,t):a.type===1?m=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(m=new St(i,this,t)),this._$AV.push(m),a=r[++c]}n!==a?.index&&(i=b.nextNode(),n++)}return b.currentNode=_,o}p(t){let e=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class U{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,o){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=w(this,t,e),S(t)?t===l||t==null||t===""?(this._$AH!==l&&this._$AR(),this._$AH=l):t!==this._$AH&&t!==x&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):yt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==l&&S(this._$AH)?this._$AA.nextSibling.data=t:this.T(_.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=P.createElement(nt(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(e);else{const i=new xt(o,this),n=i.u(this.options);i.p(e),this.T(n),this._$AH=i}}_$AC(t){let e=it.get(t.strings);return e===void 0&&it.set(t.strings,e=new P(t)),e}k(t){I(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,o=0;for(const i of t)o===e.length?e.push(r=new U(this.O(k()),this.O(k()),this,this.options)):r=e[o],r._$AI(i),o++;o<e.length&&(this._$AR(r&&r._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class N{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,o,i){this.type=1,this._$AH=l,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=l}_$AI(t,e=this,r,o){const i=this.strings;let n=!1;if(i===void 0)t=w(this,t,e,0),n=!S(t)||t!==this._$AH&&t!==x,n&&(this._$AH=t);else{const c=t;let a,m;for(t=i[0],a=0;a<i.length-1;a++)m=w(this,c[r+a],e,a),m===x&&(m=this._$AH[a]),n||=!S(m)||m!==this._$AH[a],m===l?t=l:t!==l&&(t+=(m??"")+i[a+1]),this._$AH[a]=m}n&&!o&&this.j(t)}j(t){t===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class wt extends N{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===l?void 0:t}}class Et extends N{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==l)}}class kt extends N{constructor(t,e,r,o,i){super(t,e,r,o,i),this.type=5}_$AI(t,e=this){if((t=w(this,t,e,0)??l)===x)return;const r=this._$AH,o=t===l&&r!==l||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==l&&(r===l||o);o&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class St{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}}const Ct=B.litHtmlPolyfillSupport;Ct?.(P,U),(B.litHtmlVersions??=[]).push("3.3.1");const Pt=(s,t,e)=>{const r=e?.renderBefore??t;let o=r._$litPart$;if(o===void 0){const i=e?.renderBefore??null;r._$litPart$=o=new U(t.insertBefore(k(),i),i,void 0,e??{})}return o._$AI(s),o};const V=globalThis;class O extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Pt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return x}}O._$litElement$=!0,O.finalized=!0,V.litElementHydrateSupport?.({LitElement:O});const Ut=V.litElementPolyfillSupport;Ut?.({LitElement:O}),(V.litElementVersions??=[]).push("4.2.1");const Ot=s=>(t,e)=>{e!==void 0?e.addInitializer((()=>{customElements.define(s,t)})):customElements.define(s,t)};const Tt={attribute:!0,type:String,converter:M,reflect:!1,hasChanged:D},Rt=(s=Tt,t,e)=>{const{kind:r,metadata:o}=e;let i=globalThis.litPropertyMetadata.get(o);if(i===void 0&&globalThis.litPropertyMetadata.set(o,i=new Map),r==="setter"&&((s=Object.create(s)).wrapped=!0),i.set(e.name,s),r==="accessor"){const{name:n}=e;return{set(c){const a=t.get.call(this);t.set.call(this,c),this.requestUpdate(n,a,s)},init(c){return c!==void 0&&this.C(n,void 0,s,c),c}}}if(r==="setter"){const{name:n}=e;return function(c){const a=this[n];t.call(this,c),this.requestUpdate(n,a,s)}}throw Error("Unsupported decorator location: "+r)};function at(s){return(t,e)=>typeof e=="object"?Rt(s,t,e):((r,o,i)=>{const n=o.hasOwnProperty(i);return o.constructor.createProperty(i,r),n?Object.getOwnPropertyDescriptor(o,i):void 0})(s,t,e)}function W(s){return at({...s,state:!0,attribute:!1})}const Mt=ht`
  :host {
    display: block;
    --comment-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    
    --comment-text-color: #374151;
    --comment-text-color-dark: #e5e7eb;
    --comment-bg-color: #ffffff;
    --comment-bg-color-dark: #1f2937;
    --comment-border-color: #e5e7eb;
    --comment-border-color-dark: #4b5563;
    --comment-hover-bg: #f9fafb;
    --comment-hover-bg-dark: #374151;
    --comment-author-color: #111827;
    --comment-author-color-dark: #f3f4f6;
    --comment-time-color: #6b7280;
    --comment-time-color-dark: #9ca3af;
    --comment-content-color: #374151;
    --comment-content-color-dark: #e5e7eb;
    --comment-link-color: #6366f1;
    --comment-link-color-dark: #818cf8;
    --comment-link-hover-color: #4f46e5;
    --comment-link-hover-color-dark: #a5b4fc;
    --comment-avatar-bg: #e5e7eb;
    --comment-avatar-bg-dark: #4b5563;
    --comment-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    --comment-shadow-dark: 0 1px 3px rgba(0, 0, 0, 0.3);
    --comment-empty-color: #9ca3af;
    --comment-empty-color-dark: #6b7280;
    --comment-loading-color: #9ca3af;
    --comment-loading-color-dark: #6b7280;

    font-family: var(--comment-font-family);
    color: var(--comment-text-color);
    font-size: 14px;
    line-height: 1.6;
    box-sizing: border-box;
  }

  * {
    box-sizing: border-box;
  }

  .comment-container {
    width: 100%;
    max-width: 100%;
  }

  .comment-loading,
  .comment-empty {
    padding: 24px;
    text-align: center;
    color: var(--comment-empty-color);
    font-size: 14px;
  }

  .comment-error {
    padding: 24px;
    text-align: center;
    color: var(--comment-error-color, #ef4444);
    font-size: 14px;
  }

  .error-message {
    margin-bottom: 12px;
    color: var(--comment-error-color, #ef4444);
  }

  .error-retry {
    padding: 8px 16px;
    background: var(--comment-link-color, #6366f1);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.2s ease;
  }

  .error-retry:hover {
    background: var(--comment-link-hover-color, #4f46e5);
  }

  .comment-error.dark {
    color: var(--comment-error-color-dark, #f87171);
  }

  .comment-error.dark .error-message {
    color: var(--comment-error-color-dark, #f87171);
  }

  .comment-error.dark .error-retry {
    background: var(--comment-link-color-dark, #818cf8);
  }

  .comment-error.dark .error-retry:hover {
    background: var(--comment-link-hover-color-dark, #a5b4fc);
  }

  .comment-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .comment-item {
    background: var(--comment-bg-color);
    border: 1px solid var(--comment-border-color);
    border-radius: 8px;
    padding: 16px;
    transition: all 0.2s ease;
    position: relative;
  }

  .comment-item:hover {
    background: var(--comment-hover-bg);
    box-shadow: var(--comment-shadow);
  }

  .comment-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
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
    font-size: 16px;
    font-weight: 600;
    color: var(--comment-text-color);
    overflow: hidden;
  }

  .comment-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .comment-meta {
    flex: 1;
    min-width: 0;
  }

  .comment-author {
    font-size: 15px;
    font-weight: 600;
    color: var(--comment-author-color);
    margin: 0 0 4px 0;
    line-height: 1.4;
    word-break: break-word;
  }

  .comment-time {
    font-size: 12px;
    color: var(--comment-time-color);
    margin: 0;
    line-height: 1.4;
  }

  .comment-content {
    color: var(--comment-content-color);
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
    word-break: break-word;
    white-space: pre-wrap;
  }

  .comment-content p {
    margin: 0 0 8px 0;
  }

  .comment-content p:last-child {
    margin-bottom: 0;
  }

  .comment-replies {
    margin-top: 16px;
    padding-left: 56px;
    border-left: 2px solid var(--comment-border-color);
  }

  .comment-replies .comment-item {
    margin-bottom: 12px;
  }

  .comment-replies .comment-item:last-child {
    margin-bottom: 0;
  }

  /* 暗色主题 */
  :host .comment-item.dark {
    background: var(--comment-bg-color-dark);
    border-color: var(--comment-border-color-dark);
  }

  :host .comment-item.dark:hover {
    background: var(--comment-hover-bg-dark);
    box-shadow: var(--comment-shadow-dark);
  }

  :host .comment-item.dark .comment-author {
    color: var(--comment-author-color-dark);
  }

  :host .comment-item.dark .comment-time {
    color: var(--comment-time-color-dark);
  }

  :host .comment-item.dark .comment-content {
    color: var(--comment-content-color-dark);
  }

  :host .comment-item.dark .comment-avatar {
    background: var(--comment-avatar-bg-dark);
    color: var(--comment-text-color-dark);
  }

  :host .comment-item.dark .comment-replies {
    border-left-color: var(--comment-border-color-dark);
  }

  :host .comment-loading.dark,
  :host .comment-empty.dark {
    color: var(--comment-empty-color-dark);
  }

  /* 移动端优化 */
  @media (max-width: 640px) {
    :host {
      font-size: 13px;
    }

    .comment-item {
      padding: 12px;
    }

    .comment-avatar {
      width: 32px;
      height: 32px;
      font-size: 14px;
    }

    .comment-replies {
      padding-left: 44px;
    }

    .comment-author {
      font-size: 14px;
    }

    .comment-content {
      font-size: 13px;
    }
  }
`;async function Ht(s){if(!s)return[];const e=`${Nt()}/${encodeURIComponent(s)}`;try{const r=await fetch(e);if(!r.ok)throw new Error(`获取评论失败: ${r.status} ${r.statusText}`);return(await r.json()).items||[]}catch(r){throw r instanceof Error?r:new Error("获取评论失败")}}function Nt(){return window.__COMMENT_API_BASE__||"http://localhost:8090/apis/api.comment.interact.xhhao.com/v1alpha1/comments"}var zt=Object.defineProperty,jt=Object.getOwnPropertyDescriptor,T=(s,t,e,r)=>{for(var o=r>1?void 0:r?jt(t,e):t,i=s.length-1,n;i>=0;i--)(n=s[i])&&(o=(r?n(t,e,o):n(o))||o);return r&&o&&zt(t,e,o),o};p.CommentReference=class extends O{constructor(){super(...arguments),this.name="",this.comments=[],this.isLoading=!1,this.error=null,this.hasRequested=!1}connectedCallback(){super.connectedCallback(),this.name&&!this.hasRequested&&(this.hasRequested=!0,setTimeout(()=>{this.fetchComments()},0))}disconnectedCallback(){super.disconnectedCallback()}async fetchComments(){if(!(!this.name||this.isLoading||this.error)){this.isLoading=!0,this.error=null;try{const t=await Ht(this.name);this.comments=t||[],this.error=null}catch(t){const e=t instanceof Error?t.message:"获取评论失败";this.error=e,this.comments=[]}finally{this.isLoading=!1}}}formatTime(t){if(!t)return"";try{return new Date(t).toLocaleString("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"})}catch{return t}}getAvatarText(t){return t?t.charAt(0).toUpperCase():"?"}renderComment(t){return u`
      <div class="comment-item">
        <div class="comment-header">
          <div class="comment-avatar">
            ${t.avatar?u`<img src="${t.avatar}" alt="${t.displayName||""}" />`:u`${this.getAvatarText(t.displayName)}`}
          </div>
          <div class="comment-meta">
            <div class="comment-author">${t.displayName||"匿名用户"}</div>
            ${t.createdAt?u`<div class="comment-time">${this.formatTime(t.createdAt)}</div>`:""}
          </div>
        </div>
        <div class="comment-content">
          ${t.content||t.raw||"暂无内容"}
        </div>
        ${t.replies&&t.replies.length>0?u`
              <div class="comment-replies">
                ${t.replies.map(e=>this.renderComment(e))}
              </div>
            `:""}
      </div>
    `}render(){return this.error?u`
        <div class="comment-error">
          <div class="error-message">${this.error}</div>
          <button 
            type="button" 
            class="error-retry" 
            @click="${t=>{t.preventDefault(),t.stopPropagation(),this.error=null,this.fetchComments()}}">重试</button>
        </div>
      `:this.isLoading?u`
        <div class="comment-loading">加载中...</div>
      `:this.comments.length===0?u`
        <div class="comment-empty">暂无评论</div>
      `:u`
      <div class="comment-container">
        <ul class="comment-list">
          ${this.comments.map(t=>u`<li>${this.renderComment(t)}</li>`)}
        </ul>
      </div>
    `}},p.CommentReference.styles=Mt,T([at({type:String})],p.CommentReference.prototype,"name",2),T([W()],p.CommentReference.prototype,"comments",2),T([W()],p.CommentReference.prototype,"isLoading",2),T([W()],p.CommentReference.prototype,"error",2),p.CommentReference=T([Ot("comment-reference")],p.CommentReference),Object.defineProperty(p,Symbol.toStringTag,{value:"Module"})}));
