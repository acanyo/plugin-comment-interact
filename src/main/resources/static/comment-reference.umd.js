(function(l,_){typeof exports=="object"&&typeof module<"u"?_(exports):typeof define=="function"&&define.amd?define(["exports"],_):(l=typeof globalThis<"u"?globalThis:l||self,_(l.CommentReference={}))})(this,(function(l){"use strict";const _=globalThis,G=_.ShadowRoot&&(_.ShadyCSS===void 0||_.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol(),ht=new WeakMap;let mt=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==Z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(G&&t===void 0){const r=e!==void 0&&e.length===1;r&&(t=ht.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&ht.set(e,t))}return t}toString(){return this.cssText}};const Dt=n=>new mt(typeof n=="string"?n:n+"",void 0,Z),F=(n,...t)=>{const e=n.length===1?n[0]:t.reduce(((r,o,a)=>r+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+n[a+1]),n[0]);return new mt(e,n,Z)},Nt=(n,t)=>{if(G)n.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const e of t){const r=document.createElement("style"),o=_.litNonce;o!==void 0&&r.setAttribute("nonce",o),r.textContent=e.cssText,n.appendChild(r)}},dt=G?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return Dt(e)})(n):n;const{is:Mt,defineProperty:Ut,getOwnPropertyDescriptor:Rt,getOwnPropertyNames:Ot,getOwnPropertySymbols:It,getPrototypeOf:jt}=Object,W=globalThis,pt=W.trustedTypes,Ht=pt?pt.emptyScript:"",zt=W.reactiveElementPolyfillSupport,R=(n,t)=>n,X={toAttribute(n,t){switch(t){case Boolean:n=n?Ht:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},J=(n,t)=>!Mt(n,t),ut={attribute:!0,type:String,converter:X,reflect:!1,useDefault:!1,hasChanged:J};Symbol.metadata??=Symbol("metadata"),W.litPropertyMetadata??=new WeakMap;let N=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ut){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),o=this.getPropertyDescriptor(t,r,e);o!==void 0&&Ut(this.prototype,t,o)}}static getPropertyDescriptor(t,e,r){const{get:o,set:a}=Rt(this.prototype,t)??{get(){return this[e]},set(s){this[e]=s}};return{get:o,set(s){const c=o?.call(this);a?.call(this,s),this.requestUpdate(t,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ut}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;const t=jt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){const e=this.properties,r=[...Ot(e),...It(e)];for(const o of r)this.createProperty(o,e[o])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[r,o]of e)this.elementProperties.set(r,o)}this._$Eh=new Map;for(const[e,r]of this.elementProperties){const o=this._$Eu(e,r);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const o of r)e.unshift(dt(o))}else t!==void 0&&e.push(dt(t));return e}static _$Eu(t,e){const r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Nt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){const r=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,r);if(o!==void 0&&r.reflect===!0){const a=(r.converter?.toAttribute!==void 0?r.converter:X).toAttribute(e,r.type);this._$Em=t,a==null?this.removeAttribute(o):this.setAttribute(o,a),this._$Em=null}}_$AK(t,e){const r=this.constructor,o=r._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const a=r.getPropertyOptions(o),s=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:X;this._$Em=o;const c=s.fromAttribute(e,a.type);this[o]=c??this._$Ej?.get(o)??c,this._$Em=null}}requestUpdate(t,e,r){if(t!==void 0){const o=this.constructor,a=this[t];if(r??=o.getPropertyOptions(t),!((r.hasChanged??J)(a,e)||r.useDefault&&r.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:o,wrapped:a},s){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),a!==!0||s!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[o,a]of this._$Ep)this[o]=a;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[o,a]of r){const{wrapped:s}=a,c=this[o];s!==!0||this._$AL.has(o)||c===void 0||this.C(o,void 0,a,c)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((r=>r.hostUpdate?.())),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};N.elementStyles=[],N.shadowRootOptions={mode:"open"},N[R("elementProperties")]=new Map,N[R("finalized")]=new Map,zt?.({ReactiveElement:N}),(W.reactiveElementVersions??=[]).push("2.1.1");const K=globalThis,q=K.trustedTypes,ft=q?q.createPolicy("lit-html",{createHTML:n=>n}):void 0,gt="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,bt="?"+x,Lt=`<${bt}>`,E=document,O=()=>E.createComment(""),I=n=>n===null||typeof n!="object"&&typeof n!="function",tt=Array.isArray,Ft=n=>tt(n)||typeof n?.[Symbol.iterator]=="function",et=`[ 	
\f\r]`,j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,vt=/-->/g,At=/>/g,B=RegExp(`>|${et}(?:([^\\s"'>=/]+)(${et}*=${et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),$t=/'/g,yt=/"/g,wt=/^(?:script|style|textarea|title)$/i,Wt=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),g=Wt(1),$=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),_t=new WeakMap,T=E.createTreeWalker(E,129);function xt(n,t){if(!tt(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ft!==void 0?ft.createHTML(t):t}const Xt=(n,t)=>{const e=n.length-1,r=[];let o,a=t===2?"<svg>":t===3?"<math>":"",s=j;for(let c=0;c<e;c++){const i=n[c];let m,u,h=-1,d=0;for(;d<i.length&&(s.lastIndex=d,u=s.exec(i),u!==null);)d=s.lastIndex,s===j?u[1]==="!--"?s=vt:u[1]!==void 0?s=At:u[2]!==void 0?(wt.test(u[2])&&(o=RegExp("</"+u[2],"g")),s=B):u[3]!==void 0&&(s=B):s===B?u[0]===">"?(s=o??j,h=-1):u[1]===void 0?h=-2:(h=s.lastIndex-u[2].length,m=u[1],s=u[3]===void 0?B:u[3]==='"'?yt:$t):s===yt||s===$t?s=B:s===vt||s===At?s=j:(s=B,o=void 0);const p=s===B&&n[c+1].startsWith("/>")?" ":"";a+=s===j?i+Lt:h>=0?(r.push(m),i.slice(0,h)+gt+i.slice(h)+x+p):i+x+(h===-2?c:p)}return[xt(n,a+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]};class H{constructor({strings:t,_$litType$:e},r){let o;this.parts=[];let a=0,s=0;const c=t.length-1,i=this.parts,[m,u]=Xt(t,e);if(this.el=H.createElement(m,r),T.currentNode=this.el.content,e===2||e===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(o=T.nextNode())!==null&&i.length<c;){if(o.nodeType===1){if(o.hasAttributes())for(const h of o.getAttributeNames())if(h.endsWith(gt)){const d=u[s++],p=o.getAttribute(h).split(x),b=/([.?@])?(.*)/.exec(d);i.push({type:1,index:a,name:b[2],strings:p,ctor:b[1]==="."?Vt:b[1]==="?"?Qt:b[1]==="@"?Yt:V}),o.removeAttribute(h)}else h.startsWith(x)&&(i.push({type:6,index:a}),o.removeAttribute(h));if(wt.test(o.tagName)){const h=o.textContent.split(x),d=h.length-1;if(d>0){o.textContent=q?q.emptyScript:"";for(let p=0;p<d;p++)o.append(h[p],O()),T.nextNode(),i.push({type:2,index:++a});o.append(h[d],O())}}}else if(o.nodeType===8)if(o.data===bt)i.push({type:2,index:a});else{let h=-1;for(;(h=o.data.indexOf(x,h+1))!==-1;)i.push({type:7,index:a}),h+=x.length-1}a++}}static createElement(t,e){const r=E.createElement("template");return r.innerHTML=t,r}}function M(n,t,e=n,r){if(t===$)return t;let o=r!==void 0?e._$Co?.[r]:e._$Cl;const a=I(t)?void 0:t._$litDirective$;return o?.constructor!==a&&(o?._$AO?.(!1),a===void 0?o=void 0:(o=new a(n),o._$AT(n,e,r)),r!==void 0?(e._$Co??=[])[r]=o:e._$Cl=o),o!==void 0&&(t=M(n,o._$AS(n,t.values),o,r)),t}let qt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,o=(t?.creationScope??E).importNode(e,!0);T.currentNode=o;let a=T.nextNode(),s=0,c=0,i=r[0];for(;i!==void 0;){if(s===i.index){let m;i.type===2?m=new U(a,a.nextSibling,this,t):i.type===1?m=new i.ctor(a,i.name,i.strings,this,t):i.type===6&&(m=new Gt(a,this,t)),this._$AV.push(m),i=r[++c]}s!==i?.index&&(a=T.nextNode(),s++)}return T.currentNode=E,o}p(t){let e=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}};class U{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,o){this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=M(this,t,e),I(t)?t===f||t==null||t===""?(this._$AH!==f&&this._$AR(),this._$AH=f):t!==this._$AH&&t!==$&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ft(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==f&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(E.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=H.createElement(xt(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(e);else{const a=new qt(o,this),s=a.u(this.options);a.p(e),this.T(s),this._$AH=a}}_$AC(t){let e=_t.get(t.strings);return e===void 0&&_t.set(t.strings,e=new H(t)),e}k(t){tt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,o=0;for(const a of t)o===e.length?e.push(r=new U(this.O(O()),this.O(O()),this,this.options)):r=e[o],r._$AI(a),o++;o<e.length&&(this._$AR(r&&r._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class V{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,o,a){this.type=1,this._$AH=f,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=a,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=f}_$AI(t,e=this,r,o){const a=this.strings;let s=!1;if(a===void 0)t=M(this,t,e,0),s=!I(t)||t!==this._$AH&&t!==$,s&&(this._$AH=t);else{const c=t;let i,m;for(t=a[0],i=0;i<a.length-1;i++)m=M(this,c[r+i],e,i),m===$&&(m=this._$AH[i]),s||=!I(m)||m!==this._$AH[i],m===f?t=f:t!==f&&(t+=(m??"")+a[i+1]),this._$AH[i]=m}s&&!o&&this.j(t)}j(t){t===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Vt extends V{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===f?void 0:t}}class Qt extends V{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==f)}}class Yt extends V{constructor(t,e,r,o,a){super(t,e,r,o,a),this.type=5}_$AI(t,e=this){if((t=M(this,t,e,0)??f)===$)return;const r=this._$AH,o=t===f&&r!==f||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,a=t!==f&&(r===f||o);o&&this.element.removeEventListener(this.name,this,r),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Gt{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}}const Zt={I:U},Jt=K.litHtmlPolyfillSupport;Jt?.(H,U),(K.litHtmlVersions??=[]).push("3.3.1");const Kt=(n,t,e)=>{const r=e?.renderBefore??t;let o=r._$litPart$;if(o===void 0){const a=e?.renderBefore??null;r._$litPart$=o=new U(t.insertBefore(O(),a),a,void 0,e??{})}return o._$AI(n),o};const rt=globalThis;let k=class extends N{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Kt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return $}};k._$litElement$=!0,k.finalized=!0,rt.litElementHydrateSupport?.({LitElement:k});const te=rt.litElementPolyfillSupport;te?.({LitElement:k}),(rt.litElementVersions??=[]).push("4.2.1");const Q=n=>(t,e)=>{e!==void 0?e.addInitializer((()=>{customElements.define(n,t)})):customElements.define(n,t)};const ee={attribute:!0,type:String,converter:X,reflect:!1,hasChanged:J},re=(n=ee,t,e)=>{const{kind:r,metadata:o}=e;let a=globalThis.litPropertyMetadata.get(o);if(a===void 0&&globalThis.litPropertyMetadata.set(o,a=new Map),r==="setter"&&((n=Object.create(n)).wrapped=!0),a.set(e.name,n),r==="accessor"){const{name:s}=e;return{set(c){const i=t.get.call(this);t.set.call(this,c),this.requestUpdate(s,i,n)},init(c){return c!==void 0&&this.C(s,void 0,n,c),c}}}if(r==="setter"){const{name:s}=e;return function(c){const i=this[s];t.call(this,c),this.requestUpdate(s,i,n)}}throw Error("Unsupported decorator location: "+r)};function v(n){return(t,e)=>typeof e=="object"?re(n,t,e):((r,o,a)=>{const s=o.hasOwnProperty(a);return o.constructor.createProperty(a,r),s?Object.getOwnPropertyDescriptor(o,a):void 0})(n,t,e)}function A(n){return v({...n,state:!0,attribute:!1})}const oe=(n,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(n,t,e),e);function ne(n,t){return(e,r,o)=>{const a=s=>s.renderRoot?.querySelector(n)??null;return oe(e,r,{get(){return a(this)}})}}const ot={ATTRIBUTE:1,CHILD:2},nt=n=>(...t)=>({_$litDirective$:n,values:t});let at=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};class st extends at{constructor(t){if(super(t),this.it=f,t.type!==ot.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===f||t==null)return this._t=void 0,this.it=t;if(t===$)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}st.directiveName="unsafeHTML",st.resultType=1;const kt=nt(st),ae=F`
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

  .comment-source {
    font-size: 12px;
    color: var(--comment-text-secondary);
    margin-top: 2px;
    line-height: 1.4;
  }

  .comment-source a {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s, color 0.2s;
  }

  .comment-source a:hover {
    color: var(--comment-text-color);
    border-bottom-color: var(--comment-text-color);
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

  :host(.dark) .comment-source,
  .comment-container.dark .comment-source {
    color: var(--comment-text-secondary-dark);
  }

  :host(.dark) .comment-source a:hover,
  .comment-container.dark .comment-source a:hover {
    color: var(--comment-text-color-dark);
    border-bottom-color: var(--comment-text-color-dark);
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
`;function se(n){return n?.charAt(0).toUpperCase()??""}let z=null;async function ie(){return z||(await Ct("data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=")?(z="avif",console.log("Browser supports AVIF format"),"avif"):await Ct("data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=")?(z="webp",console.log("Browser supports WebP format"),"webp"):(z="jpg",console.log("Browser fallback to JPG format"),"jpg"))}function Ct(n){return new Promise(t=>{const e=new Image;e.onload=()=>t(!0),e.onerror=()=>t(!1),e.src=n})}async function ce(n){const e=new TextEncoder().encode(n),r=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(r)).map(a=>a.toString(16).padStart(2,"0")).join("")}async function it(n){if(!n)return null;if(n.userAvatar)return n.userAvatar;if(n.email){const t=n.email.trim().toLowerCase();if(t)try{const e=await ce(t),r=await ie();return console.log("Avatar format detected:",r),console.log("Avatar URL:",`https://weavatar.com/avatar/${e}.${r}`),`https://weavatar.com/avatar/${e}.${r}`}catch(e){return console.error("Failed to generate avatar URL:",e),null}}return null}async function le(n){const t=`/apis/api.comment.interact.xhhao.com/v1alpha1/comments/${encodeURIComponent(n)}`,e=await fetch(t);if(!e.ok)throw new Error(`获取评论失败: ${e.status} ${e.statusText}`);const r=await e.json();if(r.kind==="Comment"||r.kind==="Reply")return r;if(r&&typeof r=="object"&&(r.content||r.raw)){const o=r;return o.name||(o.name=o.metadataName||"unknown"),o.displayName||(o.displayName="匿名用户"),o}return r.data?r.data:null}async function he(n){const e=`/apis/api.comment.interact.xhhao.com/v1alpha1/commentList?${new URLSearchParams({group:n.group,kind:n.kind,name:n.name,size:"100",replySize:"100"}).toString()}`,r=await fetch(e);if(!r.ok)throw new Error(`获取评论列表失败: ${r.status} ${r.statusText}`);const o=await r.json(),a=[];if(Array.isArray(o.items)){const s=o.items;for(const c of s)if(a.push(Y(c)),c.replies?.items)for(const i of c.replies.items)a.push(Y(i))}return a}async function me(n){const t=`/apis/api.comment.interact.xhhao.com/v1alpha1/comments/${encodeURIComponent(n)}/replies?replySize=100`,e=await fetch(t);if(!e.ok)throw new Error(`获取评论回复失败: ${e.status} ${e.statusText}`);const r=await e.json(),o=Y(r),a=[],s=new Map;if(s.set(o.name,o),r.replies?.items)for(const c of r.replies.items){const i=Y(c);a.push(i),s.set(i.name,i)}return a.forEach(c=>{let i="";if(c.quoteReply){const m=s.get(c.quoteReply);m&&(i=m.displayName)}else if(c.commentName){const m=s.get(c.commentName);m&&(i=m.displayName)}if(i){const m=`<span class="mention">@${i}</span> `;c.content.trim().startsWith("<p>")?c.content=c.content.replace("<p>",`<p>${m}`):c.content=m+c.content}}),{comment:o,replies:a}}function Y(n){const t=n.spec.owner.annotations?.["email-hash"];return{kind:"Comment",name:n.metadata.name,displayName:n.owner?.displayName||n.spec.owner.displayName,content:n.spec.content,raw:n.spec.raw,metadataName:n.metadata.name,approved:n.spec.approved,userAvatar:n.owner?.avatar||void 0,email:n.owner?.email||(n.owner?.kind==="Email"?n.owner.name:void 0)||n.spec.owner.email,emailHash:t,quoteReply:n.spec.quoteReply,commentName:n.spec.commentName,creationTime:n.spec.creationTime||n.metadata.creationTimestamp}}function de(){const n=["html.dark:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[class~='dark']:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[class*='dark']:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[data-color-scheme='dark']:not([data-color-scheme='light'])","html[data-theme='dark']:not([data-theme='light'])","html[theme='dark']:not([theme='light'])","[data-color-scheme='dark']:not([data-color-scheme='light'])","[data-theme='dark']:not([data-theme='light'])","[theme='dark']:not([theme='light'])"],t=document.documentElement,e=document.body;return n.some(o=>{try{return t.matches(o)||e.matches(o)}catch{return!1}})||t.classList.contains("dark")||t.getAttribute("data-theme")==="dark"||t.getAttribute("data-color-scheme")==="dark"||t.getAttribute("theme")==="dark"}function pe(n){const t=new MutationObserver(n);return t.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","theme"]}),t.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","theme"]}),t}var ue=Object.defineProperty,fe=Object.getOwnPropertyDescriptor,C=(n,t,e,r)=>{for(var o=r>1?void 0:r?fe(t,e):t,a=n.length-1,s;a>=0;a--)(s=n[a])&&(o=(r?s(t,e,o):s(o))||o);return r&&o&&ue(t,e,o),o};l.CommentReference=class extends k{constructor(){super(...arguments),this.name="",this.commentData=null,this.isLoading=!1,this.error="",this.isDark=!1,this.hasFetched=!1,this.avatarUrl=null}connectedCallback(){super.connectedCallback(),this.detectTheme(),this.observeTheme(),this.name&&!this.commentData&&!this.isLoading&&this.fetchComment()}disconnectedCallback(){super.disconnectedCallback(),this.themeObserver&&this.themeObserver.disconnect()}detectTheme(){this.isDark=de()}observeTheme(){this.themeObserver=pe(()=>{this.detectTheme()})}async fetchComment(){if(!this.name){this.error="缺少评论名称";return}if(!this.hasFetched){this.hasFetched=!0,this.isLoading=!0,this.error="";try{const t=await le(this.name);t?(this.commentData=t,this.avatarUrl=await it(t)):(this.error="未找到评论数据",this.commentData=null,this.avatarUrl=null)}catch(t){this.error=t instanceof Error?t.message:"获取评论失败",this.commentData=null,this.avatarUrl=null,console.error("Error fetching comment:",t)}finally{this.isLoading=!1}}}renderCommentContent(){if(!this.commentData)return"";const t=this.commentData.refPost&&this.commentData.refUrl?g`
          <div class="comment-source">
            来源于: <a href="${this.commentData.refUrl}" target="_blank">
              ${this.commentData.refPost}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 2px; vertical-align: middle;">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        `:"";return g`
      <div class="comment-header">
        <div class="comment-avatar">
          ${this.avatarUrl?g`<img src="${this.avatarUrl}" alt="${this.commentData.displayName}">`:g`<span class="comment-avatar-placeholder">${se(this.commentData.displayName)}</span>`}
        </div>
        <div class="comment-info">
          <div class="comment-author">${this.commentData.displayName}</div>
          ${t}
        </div>
      </div>
      <div class="comment-content">${kt(this.commentData.raw)}</div>
    `}render(){return this.isLoading?g`
        <div class="comment-container ${this.isDark?"dark":""}">
          <div class="comment-loading">加载中...</div>
        </div>
      `:this.error?g`
        <div class="comment-container ${this.isDark?"dark":""}">
          <div class="comment-error">${this.error}</div>
        </div>
      `:this.commentData?g`
      <div class="comment-container ${this.isDark?"dark":""}">
        ${this.renderCommentContent()}
      </div>
    `:g`
        <div class="comment-container ${this.isDark?"dark":""}">
          <div class="comment-empty">暂无评论数据</div>
        </div>
      `}},l.CommentReference.styles=ae,C([v({type:String})],l.CommentReference.prototype,"name",2),C([A()],l.CommentReference.prototype,"commentData",2),C([A()],l.CommentReference.prototype,"isLoading",2),C([A()],l.CommentReference.prototype,"error",2),C([A()],l.CommentReference.prototype,"isDark",2),C([A()],l.CommentReference.prototype,"hasFetched",2),C([A()],l.CommentReference.prototype,"avatarUrl",2),l.CommentReference=C([Q("comment-reference")],l.CommentReference);const ge=F`
  :host {
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.5;

    /* Modern Palette - Compact & Refined */
    --cc-primary: #3b82f6;
    --cc-primary-light: #eff6ff;
    --cc-success: #10b981;
    --cc-text-main: #111827;
    --cc-text-sub: #4b5563;
    --cc-text-muted: #9ca3af;

    --cc-bg-container: #ffffff;
    --cc-border-container: #e5e7eb;

    --cc-bubble-bg: #f9fafb;
    --cc-bubble-border: #f3f4f6;
    --cc-bubble-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);

    --cc-bubble-hover-bg: #ffffff;
    --cc-bubble-hover-border: #e5e7eb;
    --cc-bubble-hover-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);

    /* Dark Mode Variables */
    --cc-bg-container-dark: #1f2937;
    --cc-border-container-dark: #374151;
    --cc-text-main-dark: #f3f4f6;
    --cc-text-sub-dark: #d1d5db;
    --cc-text-muted-dark: #9ca3af;
    --cc-bubble-bg-dark: #374151;
    --cc-bubble-hover-bg-dark: #4b5563;

    color: var(--cc-text-main);
  }

  :host(.dark) {
    --cc-bg-container: var(--cc-bg-container-dark);
    --cc-border-container: var(--cc-border-container-dark);
    --cc-text-main: var(--cc-text-main-dark);
    --cc-text-sub: var(--cc-text-sub-dark);
    --cc-text-muted: var(--cc-text-muted-dark);
    --cc-bubble-bg: var(--cc-bubble-bg-dark);
    --cc-bubble-hover-bg: var(--cc-bubble-hover-bg-dark);
  }

  /* Container */
  .conversation-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background: var(--cc-bg-container);
    border: 1px solid var(--cc-border-container);
    border-radius: 12px;
    max-width: 600px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }

  /* Date Divider */
  .date-divider {
    text-align: center;
    font-size: 0.7rem;
    color: var(--cc-text-muted);
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    font-weight: 500;
  }

  .date-divider::before,
  .date-divider::after {
    content: '';
    height: 1px;
    background: var(--cc-border-container);
    width: 20px;
    display: block;
  }

  :host(.dark) .date-divider::before,
  :host(.dark) .date-divider::after {
    background: var(--cc-border-container-dark);
  }

  /* Message Item */
  .message-item {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
    animation: slideIn 0.3s ease-out forwards;
    opacity: 0;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .message-item:nth-child(1) { animation-delay: 0.05s; }
  .message-item:nth-child(2) { animation-delay: 0.1s; }
  .message-item:nth-child(3) { animation-delay: 0.15s; }
  .message-item:nth-child(n+4) { animation-delay: 0.2s; }

  /* Avatar */
  .avatar {
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    border-radius: 8px;
    overflow: hidden;
    background: var(--cc-border-container);
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    transition: transform 0.2s ease;
    cursor: pointer;
  }

  .avatar:hover {
    transform: scale(1.05);
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--cc-text-muted);
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  /* Content Wrapper */
  .content-wrapper {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  /* Header */
  .header {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.75rem;
    line-height: 1;
    padding-left: 2px;
  }

  .author-name {
    color: var(--cc-text-sub);
    font-weight: 600;
  }

  .badge {
    font-size: 0.6rem;
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .badge-owner {
    background: rgba(16, 185, 129, 0.1);
    color: var(--cc-success);
    border: 1px solid rgba(16, 185, 129, 0.2);
  }

  /* Message Bubble */
  .message-bubble {
    position: relative;
    padding: 0.5rem 0.85rem;
    background: var(--cc-bubble-bg);
    border: 1px solid var(--cc-bubble-border);
    border-radius: 2px 12px 12px 12px;
    box-shadow: var(--cc-bubble-shadow);
    color: var(--cc-text-main);
    font-size: 0.875rem;
    line-height: 1.5;
    max-width: 100%;
    width: fit-content;
    transition: all 0.2s ease;
  }

  .message-bubble:hover {
    background: var(--cc-bubble-hover-bg);
    border-color: var(--cc-bubble-hover-border);
    box-shadow: var(--cc-bubble-hover-shadow);
    transform: translateY(-1px);
  }

  .message-content {
    margin: 0;
  }

  .message-content p {
    margin: 0.25em 0;
  }
  .message-content p:first-child { margin-top: 0; }
  .message-content p:last-child { margin-bottom: 0; }

  /* Links & Mentions */
  .message-content a,
  .message-content .mention {
    color: var(--cc-primary);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s;
  }

  .message-content .mention {
    background: var(--cc-primary-light);
    padding: 0 3px;
    border-radius: 3px;
    margin: 0 1px;
    font-size: 0.9em;
    display: inline-block;
  }

  :host(.dark) .message-content .mention {
    background: rgba(59, 130, 246, 0.15);
  }

  .message-content a:hover,
  .message-content .mention:hover {
    color: #2563eb;
    text-decoration: underline;
  }

  /* Time Display */
  .time-display {
    font-size: 0.7rem;
    color: var(--cc-text-muted);
    margin-left: 0.4rem;
    align-self: flex-end;
    margin-bottom: 3px;
    font-variant-numeric: tabular-nums;
    opacity: 0.8;
  }

  /* Mobile Responsive */
  @media (max-width: 640px) {
    .conversation-container {
      padding: 0.75rem;
      gap: 0.75rem;
    }
    .message-item {
      gap: 0.5rem;
    }
    .avatar {
      width: 1.75rem;
      height: 1.75rem;
      border-radius: 6px;
    }
    .message-bubble {
      padding: 0.4rem 0.75rem;
      font-size: 0.85rem;
    }
  }
`;var be=Object.defineProperty,ve=Object.getOwnPropertyDescriptor,P=(n,t,e,r)=>{for(var o=r>1?void 0:r?ve(t,e):t,a=n.length-1,s;a>=0;a--)(s=n[a])&&(o=(r?s(t,e,o):s(o))||o);return r&&o&&be(t,e,o),o};l.CommentConversation=class extends k{constructor(){super(...arguments),this.name="",this.userName="",this.userAvatar="",this._data=null,this._loading=!1,this._error=null}updated(t){t.has("name")&&this.name&&this.fetchData()}async fetchData(){if(this.name){this._loading=!0,this._error=null;try{const t=await me(this.name);if(t){t.comment.userAvatar=await it(t.comment)||void 0;for(const e of t.replies)e.userAvatar=await it(e)||void 0}this._data=t}catch(t){this._error=t.message}finally{this._loading=!1}}}render(){if(this._loading)return g`<div class="loading">加载对话中...</div>`;if(this._error)return g`<div class="error">加载失败: ${this._error}</div>`;if(!this._data)return f;const{comment:t,replies:e}=this._data,r=[t,...e].sort((c,i)=>{const m=new Date(c.creationTime||0).getTime(),u=new Date(i.creationTime||0).getTime();return m-u});let o="";const a=t.displayName,s=t.userAvatar;return g`
      <div class="conversation-container">
        ${r.map(c=>{const i=new Date(c.creationTime||Date.now()),m=this._formatDate(i),u=m!==o;o=m;const h=c.displayName===a&&c.userAvatar===s;return g`
            ${u?g`<div class="date-divider">${m}</div>`:f}
            ${this._renderMessage(c,h)}
          `})}
      </div>
    `}_renderMessage(t,e){const r=this._formatTime(new Date(t.creationTime||Date.now()));let o=t.userAvatar;return this.userName&&this.userAvatar&&t.displayName===this.userName&&(o=this.userAvatar),g`
      <div class="message-item">
        <div class="avatar">
          ${o?g`<img src="${o}" alt="${t.displayName}" loading="lazy" />`:g`<div class="avatar-placeholder">${t.displayName.charAt(0).toUpperCase()}</div>`}
        </div>
        <div class="content-wrapper">
          <div class="header">
            <span class="author-name">${t.displayName}</span>
            ${e?g`<span class="badge badge-owner">楼主</span>`:f}
          </div>

          <div style="display: flex; align-items: flex-end; gap: 0.5rem;">
            <div class="message-bubble">
              <div class="message-content">
                ${kt(t.content)}
              </div>
            </div>
            <span class="time-display">${r}</span>
          </div>
        </div>
      </div>
    `}_formatDate(t){const e=new Date,r=t.getFullYear(),o=(t.getMonth()+1).toString().padStart(2,"0"),a=t.getDate().toString().padStart(2,"0");return r===e.getFullYear()?`${o}月${a}日`:`${r}年${o}月${a}日`}_formatTime(t){const e=t.getHours().toString().padStart(2,"0"),r=t.getMinutes().toString().padStart(2,"0");return`${e}:${r}`}},l.CommentConversation.styles=ge,P([v({type:String})],l.CommentConversation.prototype,"name",2),P([v({type:String,attribute:"user-name"})],l.CommentConversation.prototype,"userName",2),P([v({type:String,attribute:"user-avatar"})],l.CommentConversation.prototype,"userAvatar",2),P([A()],l.CommentConversation.prototype,"_data",2),P([A()],l.CommentConversation.prototype,"_loading",2),P([A()],l.CommentConversation.prototype,"_error",2),l.CommentConversation=P([Q("comment-conversation")],l.CommentConversation);const St="important",Ae=" !"+St,$e=nt(class extends at{constructor(n){if(super(n),n.type!==ot.ATTRIBUTE||n.name!=="style"||n.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(n){return Object.keys(n).reduce(((t,e)=>{const r=n[e];return r==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`}),"")}update(n,[t]){const{style:e}=n.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const r of this.ft)t[r]==null&&(this.ft.delete(r),r.includes("-")?e.removeProperty(r):e[r]=null);for(const r in t){const o=t[r];if(o!=null){this.ft.add(r);const a=typeof o=="string"&&o.endsWith(Ae);r.includes("-")||a?e.setProperty(r,a?o.slice(0,-11):o,a?St:""):e[r]=o}}return $}});const{I:ye}=Zt,Et=()=>document.createComment(""),L=(n,t,e)=>{const r=n._$AA.parentNode,o=t===void 0?n._$AB:t._$AA;if(e===void 0){const a=r.insertBefore(Et(),o),s=r.insertBefore(Et(),o);e=new ye(a,s,n,n.options)}else{const a=e._$AB.nextSibling,s=e._$AM,c=s!==n;if(c){let i;e._$AQ?.(n),e._$AM=n,e._$AP!==void 0&&(i=n._$AU)!==s._$AU&&e._$AP(i)}if(a!==o||c){let i=e._$AA;for(;i!==a;){const m=i.nextSibling;r.insertBefore(i,o),i=m}}}return e},D=(n,t,e=n)=>(n._$AI(t,e),n),we={},_e=(n,t=we)=>n._$AH=t,xe=n=>n._$AH,ct=n=>{n._$AR(),n._$AA.remove()};const Bt=(n,t,e)=>{const r=new Map;for(let o=t;o<=e;o++)r.set(n[o],o);return r},ke=nt(class extends at{constructor(n){if(super(n),n.type!==ot.CHILD)throw Error("repeat() can only be used in text expressions")}dt(n,t,e){let r;e===void 0?e=t:t!==void 0&&(r=t);const o=[],a=[];let s=0;for(const c of n)o[s]=r?r(c,s):s,a[s]=e(c,s),s++;return{values:a,keys:o}}render(n,t,e){return this.dt(n,t,e).values}update(n,[t,e,r]){const o=xe(n),{values:a,keys:s}=this.dt(t,e,r);if(!Array.isArray(o))return this.ut=s,a;const c=this.ut??=[],i=[];let m,u,h=0,d=o.length-1,p=0,b=a.length-1;for(;h<=d&&p<=b;)if(o[h]===null)h++;else if(o[d]===null)d--;else if(c[h]===s[p])i[p]=D(o[h],a[p]),h++,p++;else if(c[d]===s[b])i[b]=D(o[d],a[b]),d--,b--;else if(c[h]===s[b])i[b]=D(o[h],a[b]),L(n,i[b+1],o[h]),h++,b--;else if(c[d]===s[p])i[p]=D(o[d],a[p]),L(n,o[h],o[d]),d--,p++;else if(m===void 0&&(m=Bt(s,p,b),u=Bt(c,h,d)),m.has(c[h]))if(m.has(c[d])){const w=u.get(s[p]),lt=w!==void 0?o[w]:null;if(lt===null){const Pt=L(n,o[h]);D(Pt,a[p]),i[p]=Pt}else i[p]=D(lt,a[p]),L(n,o[h],lt),o[w]=null;p++}else ct(o[d]),d--;else ct(o[h]),h++;for(;p<=b;){const w=L(n,i[b+1]);D(w,a[p]),i[p++]=w}for(;h<=d;){const w=o[h++];w!==null&&ct(w)}return this.ut=s,_e(n,i),$}}),Ce=F`
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
`;var Se=Object.defineProperty,Ee=Object.getOwnPropertyDescriptor,S=(n,t,e,r)=>{for(var o=r>1?void 0:r?Ee(t,e):t,a=n.length-1,s;a>=0;a--)(s=n[a])&&(o=(r?s(t,e,o):s(o))||o);return r&&o&&Se(t,e,o),o};function Tt(n){const t=document.createElement("div");return t.innerHTML=n,t.textContent||t.innerText||""}l.CommentBarrage=class extends k{constructor(){super(...arguments),this.comments=[],this.rows=8,this.baseTime=10,this.loop=!0,this.height=0,this.activeBarrages=[],this.isPlaying=!1,this.currentIndex=0,this.trackAvailability=[],this.spawnInterval=1e3,this.lastSpawnTime=0,this.loopLogic=()=>{if(!this.isPlaying)return;const t=performance.now();if(this.activeBarrages=this.activeBarrages.filter(e=>t<e.startTime+e.duration*1e3),t-this.lastSpawnTime>this.spawnInterval&&(this.comments.length>0&&this.trySpawnNext(),this.lastSpawnTime=t),!this.loop&&this.currentIndex>=this.comments.length&&this.activeBarrages.length===0){this.stop(),this.dispatchEvent(new CustomEvent("barrage-complete",{bubbles:!0,composed:!0}));return}this.animationFrameId=requestAnimationFrame(this.loopLogic)}}connectedCallback(){super.connectedCallback(),this.trackAvailability=new Array(this.rows).fill(0),this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}updated(t){t.has("rows")&&(this.trackAvailability=new Array(this.rows).fill(0))}start(){this.isPlaying||(this.isPlaying=!0,this.loopLogic())}pause(){this.isPlaying=!1,this.animationFrameId&&cancelAnimationFrame(this.animationFrameId)}stop(){this.pause(),this.activeBarrages=[],this.currentIndex=0,this.trackAvailability.fill(0)}addBarrage(t){this.spawnBarrage(t)}setComments(t){this.comments=t,this.currentIndex>=this.comments.length&&this.loop&&(this.currentIndex=0)}async trySpawnNext(){if(this.currentIndex>=this.comments.length)if(this.loop)this.currentIndex=0;else return;const t=this.comments[this.currentIndex];await this.spawnBarrage(t)?(this.currentIndex++,this.spawnInterval=500+Math.random()*1500):this.spawnInterval=200}async spawnBarrage(t){const e=Date.now();let r=-1;const o=[];for(let d=0;d<this.rows;d++)this.trackAvailability[d]<=e&&o.push(d);if(o.length===0)return!1;r=o[Math.floor(Math.random()*o.length)];const a=this.baseTime+(Math.random()*2-1),c=50+t.content.length*14,m=(this.container?.clientWidth||1e3)/a,u=(c+100)/m*1e3;this.trackAvailability[r]=e+u;const h={id:Math.random().toString(36).substr(2,9),data:t,top:r*(100/this.rows),duration:a,startTime:performance.now()};return this.activeBarrages=[...this.activeBarrages,h],!0}render(){return g`
      <div class="barrage-container">
        ${ke(this.activeBarrages,t=>t.id,t=>g`
            <div
              class="barrage-item"
              style=${$e({top:`${t.top}%`,animationDuration:`${t.duration}s`,animationName:"moveLeft"})}
              @animationend=${()=>this.removeBarrage(t.id)}
            >
              <span class="barrage-author">${t.data.displayName}:</span>
              <span class="barrage-content" title="${Tt(t.data.content)}">${Tt(t.data.content)}</span>
            </div>
          `)}
      </div>
    `}removeBarrage(t){this.activeBarrages=this.activeBarrages.filter(e=>e.id!==t)}},l.CommentBarrage.styles=Ce,S([v({type:Array})],l.CommentBarrage.prototype,"comments",2),S([v({type:Number})],l.CommentBarrage.prototype,"rows",2),S([v({type:Number})],l.CommentBarrage.prototype,"baseTime",2),S([v({type:Boolean})],l.CommentBarrage.prototype,"loop",2),S([v({type:Number})],l.CommentBarrage.prototype,"height",2),S([A()],l.CommentBarrage.prototype,"activeBarrages",2),S([ne(".barrage-container")],l.CommentBarrage.prototype,"container",2),l.CommentBarrage=S([Q("comment-barrage")],l.CommentBarrage);var Be=Object.defineProperty,Te=Object.getOwnPropertyDescriptor,y=(n,t,e,r)=>{for(var o=r>1?void 0:r?Te(t,e):t,a=n.length-1,s;a>=0;a--)(s=n[a])&&(o=(r?s(t,e,o):s(o))||o);return r&&o&&Be(t,e,o),o};l.XhhaoBarrage=class extends k{constructor(){super(...arguments),this.kind="",this.group="",this.name="",this.speed=20,this.rows=8,this.loop=!1,this.comments=[],this.isVisible=!0,this.hasFetched=!1}connectedCallback(){super.connectedCallback(),this.parentElement!==document.body&&setTimeout(()=>{document.body.appendChild(this)},0),this.kind&&this.group&&this.name&&!this.hasFetched&&this.fetchData()}async fetchData(){this.hasFetched=!0;try{const t=await he({kind:this.kind,group:this.group,name:this.name});this.comments=t}catch(t){console.error("Error fetching barrage comments:",t)}}handleClose(){this.isVisible=!1,setTimeout(()=>{this.remove()},300)}handleBarrageComplete(){this.handleClose()}render(){return!this.isVisible||this.comments.length===0?g``:g`
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
    `}},l.XhhaoBarrage.styles=F`
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
  `,y([v({type:String})],l.XhhaoBarrage.prototype,"kind",2),y([v({type:String})],l.XhhaoBarrage.prototype,"group",2),y([v({type:String})],l.XhhaoBarrage.prototype,"name",2),y([v({type:Number})],l.XhhaoBarrage.prototype,"speed",2),y([v({type:Number})],l.XhhaoBarrage.prototype,"rows",2),y([v({type:Boolean,converter:n=>n!==null&&n!=="false"})],l.XhhaoBarrage.prototype,"loop",2),y([A()],l.XhhaoBarrage.prototype,"comments",2),y([A()],l.XhhaoBarrage.prototype,"isVisible",2),l.XhhaoBarrage=y([Q("xhhao-barrage")],l.XhhaoBarrage),Object.defineProperty(l,Symbol.toStringTag,{value:"Module"})}));
