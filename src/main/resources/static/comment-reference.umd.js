(function(m,f){typeof exports=="object"&&typeof module<"u"?f(exports):typeof define=="function"&&define.amd?define(["exports"],f):(m=typeof globalThis<"u"?globalThis:m||self,f(m.CommentReference={}))})(this,(function(m){"use strict";const f=globalThis,j=f.ShadowRoot&&(f.ShadyCSS===void 0||f.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,z=Symbol(),J=new WeakMap;let K=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(j&&t===void 0){const o=e!==void 0&&e.length===1;o&&(t=J.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&J.set(e,t))}return t}toString(){return this.cssText}};const ht=n=>new K(typeof n=="string"?n:n+"",void 0,z),lt=(n,...t)=>{const e=n.length===1?n[0]:t.reduce(((o,r,s)=>o+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+n[s+1]),n[0]);return new K(e,n,z)},dt=(n,t)=>{if(j)n.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const e of t){const o=document.createElement("style"),r=f.litNonce;r!==void 0&&o.setAttribute("nonce",r),o.textContent=e.cssText,n.appendChild(o)}},Z=j?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return ht(e)})(n):n;const{is:mt,defineProperty:pt,getOwnPropertyDescriptor:ut,getOwnPropertyNames:ft,getOwnPropertySymbols:$t,getPrototypeOf:gt}=Object,M=globalThis,G=M.trustedTypes,vt=G?G.emptyScript:"",bt=M.reactiveElementPolyfillSupport,C=(n,t)=>n,D={toAttribute(n,t){switch(t){case Boolean:n=n?vt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},I=(n,t)=>!mt(n,t),Q={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:I};Symbol.metadata??=Symbol("metadata"),M.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Q){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),r=this.getPropertyDescriptor(t,o,e);r!==void 0&&pt(this.prototype,t,r)}}static getPropertyDescriptor(t,e,o){const{get:r,set:s}=ut(this.prototype,t)??{get(){return this[e]},set(i){this[e]=i}};return{get:r,set(i){const c=r?.call(this);s?.call(this,i),this.requestUpdate(t,c,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Q}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const t=gt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const e=this.properties,o=[...ft(e),...$t(e)];for(const r of o)this.createProperty(r,e[r])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[o,r]of e)this.elementProperties.set(o,r)}this._$Eh=new Map;for(const[e,o]of this.elementProperties){const r=this._$Eu(e,o);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const r of o)e.unshift(Z(r))}else t!==void 0&&e.push(Z(t));return e}static _$Eu(t,e){const o=e.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return dt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,o);if(r!==void 0&&o.reflect===!0){const s=(o.converter?.toAttribute!==void 0?o.converter:D).toAttribute(e,o.type);this._$Em=t,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,e){const o=this.constructor,r=o._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const s=o.getPropertyOptions(r),i=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:D;this._$Em=r;const c=i.fromAttribute(e,s.type);this[r]=c??this._$Ej?.get(r)??c,this._$Em=null}}requestUpdate(t,e,o){if(t!==void 0){const r=this.constructor,s=this[t];if(o??=r.getPropertyOptions(t),!((o.hasChanged??I)(s,e)||o.useDefault&&o.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,o))))return;this.C(t,e,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:r,wrapped:s},i){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,i??e??this[t]),s!==!0||i!==void 0)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[r,s]of o){const{wrapped:i}=s,c=this[r];i!==!0||this._$AL.has(r)||c===void 0||this.C(r,void 0,s,c)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((o=>o.hostUpdate?.())),this.update(e)):this._$EM()}catch(o){throw t=!1,this._$EM(),o}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[C("elementProperties")]=new Map,k[C("finalized")]=new Map,bt?.({ReactiveElement:k}),(M.reactiveElementVersions??=[]).push("2.1.1");const B=globalThis,H=B.trustedTypes,X=H?H.createPolicy("lit-html",{createHTML:n=>n}):void 0,Y="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,tt="?"+$,_t=`<${tt}>`,b=document,S=()=>b.createComment(""),P=n=>n===null||typeof n!="object"&&typeof n!="function",q=Array.isArray,yt=n=>q(n)||typeof n?.[Symbol.iterator]=="function",F=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,et=/-->/g,ot=/>/g,_=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),rt=/'/g,nt=/"/g,st=/^(?:script|style|textarea|title)$/i,At=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),y=At(1),A=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),it=new WeakMap,x=b.createTreeWalker(b,129);function at(n,t){if(!q(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return X!==void 0?X.createHTML(t):t}const xt=(n,t)=>{const e=n.length-1,o=[];let r,s=t===2?"<svg>":t===3?"<math>":"",i=U;for(let c=0;c<e;c++){const a=n[c];let d,p,h=-1,u=0;for(;u<a.length&&(i.lastIndex=u,p=i.exec(a),p!==null);)u=i.lastIndex,i===U?p[1]==="!--"?i=et:p[1]!==void 0?i=ot:p[2]!==void 0?(st.test(p[2])&&(r=RegExp("</"+p[2],"g")),i=_):p[3]!==void 0&&(i=_):i===_?p[0]===">"?(i=r??U,h=-1):p[1]===void 0?h=-2:(h=i.lastIndex-p[2].length,d=p[1],i=p[3]===void 0?_:p[3]==='"'?nt:rt):i===nt||i===rt?i=_:i===et||i===ot?i=U:(i=_,r=void 0);const v=i===_&&n[c+1].startsWith("/>")?" ":"";s+=i===U?a+_t:h>=0?(o.push(d),a.slice(0,h)+Y+a.slice(h)+$+v):a+$+(h===-2?c:v)}return[at(n,s+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),o]};class T{constructor({strings:t,_$litType$:e},o){let r;this.parts=[];let s=0,i=0;const c=t.length-1,a=this.parts,[d,p]=xt(t,e);if(this.el=T.createElement(d,o),x.currentNode=this.el.content,e===2||e===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=x.nextNode())!==null&&a.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(const h of r.getAttributeNames())if(h.endsWith(Y)){const u=p[i++],v=r.getAttribute(h).split($),L=/([.?@])?(.*)/.exec(u);a.push({type:1,index:s,name:L[2],strings:v,ctor:L[1]==="."?wt:L[1]==="?"?Et:L[1]==="@"?Ct:N}),r.removeAttribute(h)}else h.startsWith($)&&(a.push({type:6,index:s}),r.removeAttribute(h));if(st.test(r.tagName)){const h=r.textContent.split($),u=h.length-1;if(u>0){r.textContent=H?H.emptyScript:"";for(let v=0;v<u;v++)r.append(h[v],S()),x.nextNode(),a.push({type:2,index:++s});r.append(h[u],S())}}}else if(r.nodeType===8)if(r.data===tt)a.push({type:2,index:s});else{let h=-1;for(;(h=r.data.indexOf($,h+1))!==-1;)a.push({type:7,index:s}),h+=$.length-1}s++}}static createElement(t,e){const o=b.createElement("template");return o.innerHTML=t,o}}function w(n,t,e=n,o){if(t===A)return t;let r=o!==void 0?e._$Co?.[o]:e._$Cl;const s=P(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(n),r._$AT(n,e,o)),o!==void 0?(e._$Co??=[])[o]=r:e._$Cl=r),r!==void 0&&(t=w(n,r._$AS(n,t.values),r,o)),t}class kt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,r=(t?.creationScope??b).importNode(e,!0);x.currentNode=r;let s=x.nextNode(),i=0,c=0,a=o[0];for(;a!==void 0;){if(i===a.index){let d;a.type===2?d=new O(s,s.nextSibling,this,t):a.type===1?d=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(d=new St(s,this,t)),this._$AV.push(d),a=o[++c]}i!==a?.index&&(s=x.nextNode(),i++)}return x.currentNode=b,r}p(t){let e=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class O{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,r){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=w(this,t,e),P(t)?t===l||t==null||t===""?(this._$AH!==l&&this._$AR(),this._$AH=l):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):yt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==l&&P(this._$AH)?this._$AA.nextSibling.data=t:this.T(b.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,r=typeof o=="number"?this._$AC(t):(o.el===void 0&&(o.el=T.createElement(at(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===r)this._$AH.p(e);else{const s=new kt(r,this),i=s.u(this.options);s.p(e),this.T(i),this._$AH=s}}_$AC(t){let e=it.get(t.strings);return e===void 0&&it.set(t.strings,e=new T(t)),e}k(t){q(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,r=0;for(const s of t)r===e.length?e.push(o=new O(this.O(S()),this.O(S()),this,this.options)):o=e[r],o._$AI(s),r++;r<e.length&&(this._$AR(o&&o._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const o=t.nextSibling;t.remove(),t=o}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class N{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,r,s){this.type=1,this._$AH=l,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=l}_$AI(t,e=this,o,r){const s=this.strings;let i=!1;if(s===void 0)t=w(this,t,e,0),i=!P(t)||t!==this._$AH&&t!==A,i&&(this._$AH=t);else{const c=t;let a,d;for(t=s[0],a=0;a<s.length-1;a++)d=w(this,c[o+a],e,a),d===A&&(d=this._$AH[a]),i||=!P(d)||d!==this._$AH[a],d===l?t=l:t!==l&&(t+=(d??"")+s[a+1]),this._$AH[a]=d}i&&!r&&this.j(t)}j(t){t===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class wt extends N{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===l?void 0:t}}class Et extends N{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==l)}}class Ct extends N{constructor(t,e,o,r,s){super(t,e,o,r,s),this.type=5}_$AI(t,e=this){if((t=w(this,t,e,0)??l)===A)return;const o=this._$AH,r=t===l&&o!==l||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==l&&(o===l||r);r&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class St{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}}const Pt=B.litHtmlPolyfillSupport;Pt?.(T,O),(B.litHtmlVersions??=[]).push("3.3.1");const Ut=(n,t,e)=>{const o=e?.renderBefore??t;let r=o._$litPart$;if(r===void 0){const s=e?.renderBefore??null;o._$litPart$=r=new O(t.insertBefore(S(),s),s,void 0,e??{})}return r._$AI(n),r};const V=globalThis;let R=class extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ut(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};R._$litElement$=!0,R.finalized=!0,V.litElementHydrateSupport?.({LitElement:R});const Tt=V.litElementPolyfillSupport;Tt?.({LitElement:R}),(V.litElementVersions??=[]).push("4.2.1");const Ot=n=>(t,e)=>{e!==void 0?e.addInitializer((()=>{customElements.define(n,t)})):customElements.define(n,t)};const Rt={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:I},Mt=(n=Rt,t,e)=>{const{kind:o,metadata:r}=e;let s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),o==="setter"&&((n=Object.create(n)).wrapped=!0),s.set(e.name,n),o==="accessor"){const{name:i}=e;return{set(c){const a=t.get.call(this);t.set.call(this,c),this.requestUpdate(i,a,n)},init(c){return c!==void 0&&this.C(i,void 0,n,c),c}}}if(o==="setter"){const{name:i}=e;return function(c){const a=this[i];t.call(this,c),this.requestUpdate(i,a,n)}}throw Error("Unsupported decorator location: "+o)};function ct(n){return(t,e)=>typeof e=="object"?Mt(n,t,e):((o,r,s)=>{const i=r.hasOwnProperty(s);return r.constructor.createProperty(s,o),i?Object.getOwnPropertyDescriptor(r,s):void 0})(n,t,e)}function E(n){return ct({...n,state:!0,attribute:!1})}const Dt={CHILD:2},Ht=n=>(...t)=>({_$litDirective$:n,values:t});class Nt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}class W extends Nt{constructor(t){if(super(t),this.it=l,t.type!==Dt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===l||t==null)return this._t=void 0,this.it=t;if(t===A)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}W.directiveName="unsafeHTML",W.resultType=1;const Lt=Ht(W),jt=lt`
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
`;function zt(n){return n?.charAt(0).toUpperCase()??""}async function It(n){const e=new TextEncoder().encode(n),o=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(o)).map(s=>s.toString(16).padStart(2,"0")).join("")}async function Bt(n){if(!n)return null;if(n.userAvatar)return n.userAvatar;if(n.email){const t=n.email.trim().toLowerCase();if(t)try{return`https://weavatar.com/avatar/${await It(t)}`}catch(e){return console.error("Failed to generate avatar URL:",e),null}}return null}async function qt(n){const t=`/apis/api.comment.interact.xhhao.com/v1alpha1/comments/${encodeURIComponent(n)}`,e=await fetch(t);if(!e.ok)throw new Error(`获取评论失败: ${e.status} ${e.statusText}`);const o=await e.json();return o.kind==="Comment"?o:o.data?o.data:null}function Ft(){const n=["html.dark:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[class~='dark']:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[class*='dark']:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[data-color-scheme='dark']:not([data-color-scheme='light'])","html[data-theme='dark']:not([data-theme='light'])","html[theme='dark']:not([theme='light'])","[data-color-scheme='dark']:not([data-color-scheme='light'])","[data-theme='dark']:not([data-theme='light'])","[theme='dark']:not([theme='light'])"],t=document.documentElement,e=document.body;return n.some(r=>{try{return t.matches(r)||e.matches(r)}catch{return!1}})||t.classList.contains("dark")||t.getAttribute("data-theme")==="dark"||t.getAttribute("data-color-scheme")==="dark"||t.getAttribute("theme")==="dark"}function Vt(n){const t=new MutationObserver(n);return t.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","theme"]}),t.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","theme"]}),t}var Wt=Object.defineProperty,Jt=Object.getOwnPropertyDescriptor,g=(n,t,e,o)=>{for(var r=o>1?void 0:o?Jt(t,e):t,s=n.length-1,i;s>=0;s--)(i=n[s])&&(r=(o?i(t,e,r):i(r))||r);return o&&r&&Wt(t,e,r),r};m.CommentReference=class extends R{constructor(){super(...arguments),this.name="",this.commentData=null,this.isLoading=!1,this.error="",this.isDark=!1,this.hasFetched=!1,this.avatarUrl=null}connectedCallback(){super.connectedCallback(),console.log("Component connected, name:",this.name),this.detectTheme(),this.observeTheme(),this.name&&!this.hasFetched&&(console.log("Fetching comment in connectedCallback"),this.fetchComment())}disconnectedCallback(){super.disconnectedCallback(),console.log("Component disconnected"),this.themeObserver&&this.themeObserver.disconnect()}detectTheme(){this.isDark=Ft()}observeTheme(){this.themeObserver=Vt(()=>{this.detectTheme()})}async fetchComment(){if(!this.name){this.error="缺少评论名称";return}if(!this.hasFetched){this.hasFetched=!0,this.isLoading=!0,this.error="";try{const t=await qt(this.name);t?(this.commentData=t,this.avatarUrl=await Bt(t)):(this.error="未找到评论数据",this.commentData=null,this.avatarUrl=null)}catch(t){this.error=t instanceof Error?t.message:"获取评论失败",this.commentData=null,this.avatarUrl=null,console.error("Error fetching comment:",t)}finally{this.isLoading=!1}}}renderCommentContent(){return this.commentData?y`
      <div class="comment-header">
        <div class="comment-avatar">
          ${this.avatarUrl?y`<img src="${this.avatarUrl}" alt="${this.commentData.displayName}">`:y`<span class="comment-avatar-placeholder">${zt(this.commentData.displayName)}</span>`}
        </div>
        <div class="comment-info">
          <div class="comment-author">${this.commentData.displayName}</div>
        </div>
      </div>
      <div class="comment-content">${Lt(this.commentData.raw)}</div>
    `:""}render(){return this.isLoading?y`
        <div class="comment-container ${this.isDark?"dark":""}">
          <div class="comment-loading">加载中...</div>
        </div>
      `:this.error?y`
        <div class="comment-container ${this.isDark?"dark":""}">
          <div class="comment-error">${this.error}</div>
        </div>
      `:this.commentData?y`
      <div class="comment-container ${this.isDark?"dark":""}">
        ${this.renderCommentContent()}
      </div>
    `:y`
        <div class="comment-container ${this.isDark?"dark":""}">
          <div class="comment-empty">暂无评论数据</div>
        </div>
      `}},m.CommentReference.styles=jt,g([ct({type:String})],m.CommentReference.prototype,"name",2),g([E()],m.CommentReference.prototype,"commentData",2),g([E()],m.CommentReference.prototype,"isLoading",2),g([E()],m.CommentReference.prototype,"error",2),g([E()],m.CommentReference.prototype,"isDark",2),g([E()],m.CommentReference.prototype,"hasFetched",2),g([E()],m.CommentReference.prototype,"avatarUrl",2),m.CommentReference=g([Ot("comment-reference")],m.CommentReference),Object.defineProperty(m,Symbol.toStringTag,{value:"Module"})}));
