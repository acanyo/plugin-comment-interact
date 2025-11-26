(function(h,_){typeof exports=="object"&&typeof module<"u"?_(exports):typeof define=="function"&&define.amd?define(["exports"],_):(h=typeof globalThis<"u"?globalThis:h||self,_(h.CommentReference={}))})(this,(function(h){"use strict";const _=globalThis,K=_.ShadowRoot&&(_.ShadyCSS===void 0||_.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol(),de=new WeakMap;let pe=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==J)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(K&&e===void 0){const r=t!==void 0&&t.length===1;r&&(e=de.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&de.set(t,e))}return e}toString(){return this.cssText}};const Ne=n=>new pe(typeof n=="string"?n:n+"",void 0,J),W=(n,...e)=>{const t=n.length===1?n[0]:e.reduce(((r,o,a)=>r+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+n[a+1]),n[0]);return new pe(t,n,J)},Re=(n,e)=>{if(K)n.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const t of e){const r=document.createElement("style"),o=_.litNonce;o!==void 0&&r.setAttribute("nonce",o),r.textContent=t.cssText,n.appendChild(r)}},ue=K?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return Ne(t)})(n):n;const{is:Oe,defineProperty:Ie,getOwnPropertyDescriptor:He,getOwnPropertyNames:je,getOwnPropertySymbols:ze,getPrototypeOf:Le}=Object,X=globalThis,fe=X.trustedTypes,Fe=fe?fe.emptyScript:"",We=X.reactiveElementPolyfillSupport,O=(n,e)=>n,q={toAttribute(n,e){switch(e){case Boolean:n=n?Fe:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},ee=(n,e)=>!Oe(n,e),ge={attribute:!0,type:String,converter:q,reflect:!1,useDefault:!1,hasChanged:ee};Symbol.metadata??=Symbol("metadata"),X.litPropertyMetadata??=new WeakMap;let M=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ge){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const r=Symbol(),o=this.getPropertyDescriptor(e,r,t);o!==void 0&&Ie(this.prototype,e,o)}}static getPropertyDescriptor(e,t,r){const{get:o,set:a}=He(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:o,set(s){const c=o?.call(this);a?.call(this,s),this.requestUpdate(e,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ge}static _$Ei(){if(this.hasOwnProperty(O("elementProperties")))return;const e=Le(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(O("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(O("properties"))){const t=this.properties,r=[...je(t),...ze(t)];for(const o of r)this.createProperty(o,t[o])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[r,o]of t)this.elementProperties.set(r,o)}this._$Eh=new Map;for(const[t,r]of this.elementProperties){const o=this._$Eu(t,r);o!==void 0&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const o of r)t.unshift(ue(o))}else e!==void 0&&t.push(ue(e));return t}static _$Eu(e,t){const r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Re(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){const r=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,r);if(o!==void 0&&r.reflect===!0){const a=(r.converter?.toAttribute!==void 0?r.converter:q).toAttribute(t,r.type);this._$Em=e,a==null?this.removeAttribute(o):this.setAttribute(o,a),this._$Em=null}}_$AK(e,t){const r=this.constructor,o=r._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const a=r.getPropertyOptions(o),s=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:q;this._$Em=o;const c=s.fromAttribute(t,a.type);this[o]=c??this._$Ej?.get(o)??c,this._$Em=null}}requestUpdate(e,t,r){if(e!==void 0){const o=this.constructor,a=this[e];if(r??=o.getPropertyOptions(e),!((r.hasChanged??ee)(a,t)||r.useDefault&&r.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:o,wrapped:a},s){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),a!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),o===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[o,a]of this._$Ep)this[o]=a;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[o,a]of r){const{wrapped:s}=a,c=this[o];s!==!0||this._$AL.has(o)||c===void 0||this.C(o,void 0,a,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((r=>r.hostUpdate?.())),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};M.elementStyles=[],M.shadowRootOptions={mode:"open"},M[O("elementProperties")]=new Map,M[O("finalized")]=new Map,We?.({ReactiveElement:M}),(X.reactiveElementVersions??=[]).push("2.1.1");const te=globalThis,V=te.trustedTypes,be=V?V.createPolicy("lit-html",{createHTML:n=>n}):void 0,ve="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,Ae="?"+x,Xe=`<${Ae}>`,E=document,I=()=>E.createComment(""),H=n=>n===null||typeof n!="object"&&typeof n!="function",re=Array.isArray,qe=n=>re(n)||typeof n?.[Symbol.iterator]=="function",oe=`[ 	
\f\r]`,j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ye=/-->/g,$e=/>/g,B=RegExp(`>|${oe}(?:([^\\s"'>=/]+)(${oe}*=${oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),we=/'/g,_e=/"/g,xe=/^(?:script|style|textarea|title)$/i,Ve=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),g=Ve(1),y=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),ke=new WeakMap,P=E.createTreeWalker(E,129);function Ce(n,e){if(!re(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return be!==void 0?be.createHTML(e):e}const Qe=(n,e)=>{const t=n.length-1,r=[];let o,a=e===2?"<svg>":e===3?"<math>":"",s=j;for(let c=0;c<t;c++){const i=n[c];let m,u,l=-1,d=0;for(;d<i.length&&(s.lastIndex=d,u=s.exec(i),u!==null);)d=s.lastIndex,s===j?u[1]==="!--"?s=ye:u[1]!==void 0?s=$e:u[2]!==void 0?(xe.test(u[2])&&(o=RegExp("</"+u[2],"g")),s=B):u[3]!==void 0&&(s=B):s===B?u[0]===">"?(s=o??j,l=-1):u[1]===void 0?l=-2:(l=s.lastIndex-u[2].length,m=u[1],s=u[3]===void 0?B:u[3]==='"'?_e:we):s===_e||s===we?s=B:s===ye||s===$e?s=j:(s=B,o=void 0);const p=s===B&&n[c+1].startsWith("/>")?" ":"";a+=s===j?i+Xe:l>=0?(r.push(m),i.slice(0,l)+ve+i.slice(l)+x+p):i+x+(l===-2?c:p)}return[Ce(n,a+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]};class z{constructor({strings:e,_$litType$:t},r){let o;this.parts=[];let a=0,s=0;const c=e.length-1,i=this.parts,[m,u]=Qe(e,t);if(this.el=z.createElement(m,r),P.currentNode=this.el.content,t===2||t===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(o=P.nextNode())!==null&&i.length<c;){if(o.nodeType===1){if(o.hasAttributes())for(const l of o.getAttributeNames())if(l.endsWith(ve)){const d=u[s++],p=o.getAttribute(l).split(x),b=/([.?@])?(.*)/.exec(d);i.push({type:1,index:a,name:b[2],strings:p,ctor:b[1]==="."?Ge:b[1]==="?"?Ze:b[1]==="@"?Ke:Q}),o.removeAttribute(l)}else l.startsWith(x)&&(i.push({type:6,index:a}),o.removeAttribute(l));if(xe.test(o.tagName)){const l=o.textContent.split(x),d=l.length-1;if(d>0){o.textContent=V?V.emptyScript:"";for(let p=0;p<d;p++)o.append(l[p],I()),P.nextNode(),i.push({type:2,index:++a});o.append(l[d],I())}}}else if(o.nodeType===8)if(o.data===Ae)i.push({type:2,index:a});else{let l=-1;for(;(l=o.data.indexOf(x,l+1))!==-1;)i.push({type:7,index:a}),l+=x.length-1}a++}}static createElement(e,t){const r=E.createElement("template");return r.innerHTML=e,r}}function U(n,e,t=n,r){if(e===y)return e;let o=r!==void 0?t._$Co?.[r]:t._$Cl;const a=H(e)?void 0:e._$litDirective$;return o?.constructor!==a&&(o?._$AO?.(!1),a===void 0?o=void 0:(o=new a(n),o._$AT(n,t,r)),r!==void 0?(t._$Co??=[])[r]=o:t._$Cl=o),o!==void 0&&(e=U(n,o._$AS(n,e.values),o,r)),e}let Ye=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:r}=this._$AD,o=(e?.creationScope??E).importNode(t,!0);P.currentNode=o;let a=P.nextNode(),s=0,c=0,i=r[0];for(;i!==void 0;){if(s===i.index){let m;i.type===2?m=new N(a,a.nextSibling,this,e):i.type===1?m=new i.ctor(a,i.name,i.strings,this,e):i.type===6&&(m=new Je(a,this,e)),this._$AV.push(m),i=r[++c]}s!==i?.index&&(a=P.nextNode(),s++)}return P.currentNode=E,o}p(e){let t=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}};class N{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,o){this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=U(this,e,t),H(e)?e===f||e==null||e===""?(this._$AH!==f&&this._$AR(),this._$AH=f):e!==this._$AH&&e!==y&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):qe(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==f&&H(this._$AH)?this._$AA.nextSibling.data=e:this.T(E.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:r}=e,o=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=z.createElement(Ce(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(t);else{const a=new Ye(o,this),s=a.u(this.options);a.p(t),this.T(s),this._$AH=a}}_$AC(e){let t=ke.get(e.strings);return t===void 0&&ke.set(e.strings,t=new z(e)),t}k(e){re(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,o=0;for(const a of e)o===t.length?t.push(r=new N(this.O(I()),this.O(I()),this,this.options)):r=t[o],r._$AI(a),o++;o<t.length&&(this._$AR(r&&r._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,o,a){this.type=1,this._$AH=f,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=a,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=f}_$AI(e,t=this,r,o){const a=this.strings;let s=!1;if(a===void 0)e=U(this,e,t,0),s=!H(e)||e!==this._$AH&&e!==y,s&&(this._$AH=e);else{const c=e;let i,m;for(e=a[0],i=0;i<a.length-1;i++)m=U(this,c[r+i],t,i),m===y&&(m=this._$AH[i]),s||=!H(m)||m!==this._$AH[i],m===f?e=f:e!==f&&(e+=(m??"")+a[i+1]),this._$AH[i]=m}s&&!o&&this.j(e)}j(e){e===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ge extends Q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===f?void 0:e}}class Ze extends Q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==f)}}class Ke extends Q{constructor(e,t,r,o,a){super(e,t,r,o,a),this.type=5}_$AI(e,t=this){if((e=U(this,e,t,0)??f)===y)return;const r=this._$AH,o=e===f&&r!==f||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,a=e!==f&&(r===f||o);o&&this.element.removeEventListener(this.name,this,r),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Je{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){U(this,e)}}const et={I:N},tt=te.litHtmlPolyfillSupport;tt?.(z,N),(te.litHtmlVersions??=[]).push("3.3.1");const rt=(n,e,t)=>{const r=t?.renderBefore??e;let o=r._$litPart$;if(o===void 0){const a=t?.renderBefore??null;r._$litPart$=o=new N(e.insertBefore(I(),a),a,void 0,t??{})}return o._$AI(n),o};const ne=globalThis;let k=class extends M{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=rt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return y}};k._$litElement$=!0,k.finalized=!0,ne.litElementHydrateSupport?.({LitElement:k});const ot=ne.litElementPolyfillSupport;ot?.({LitElement:k}),(ne.litElementVersions??=[]).push("4.2.1");const Y=n=>(e,t)=>{t!==void 0?t.addInitializer((()=>{customElements.define(n,e)})):customElements.define(n,e)};const nt={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:ee},at=(n=nt,e,t)=>{const{kind:r,metadata:o}=t;let a=globalThis.litPropertyMetadata.get(o);if(a===void 0&&globalThis.litPropertyMetadata.set(o,a=new Map),r==="setter"&&((n=Object.create(n)).wrapped=!0),a.set(t.name,n),r==="accessor"){const{name:s}=t;return{set(c){const i=e.get.call(this);e.set.call(this,c),this.requestUpdate(s,i,n)},init(c){return c!==void 0&&this.C(s,void 0,n,c),c}}}if(r==="setter"){const{name:s}=t;return function(c){const i=this[s];e.call(this,c),this.requestUpdate(s,i,n)}}throw Error("Unsupported decorator location: "+r)};function v(n){return(e,t)=>typeof t=="object"?at(n,e,t):((r,o,a)=>{const s=o.hasOwnProperty(a);return o.constructor.createProperty(a,r),s?Object.getOwnPropertyDescriptor(o,a):void 0})(n,e,t)}function A(n){return v({...n,state:!0,attribute:!1})}const st=(n,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(n,e,t),t);function it(n,e){return(t,r,o)=>{const a=s=>s.renderRoot?.querySelector(n)??null;return st(t,r,{get(){return a(this)}})}}const ae={ATTRIBUTE:1,CHILD:2},se=n=>(...e)=>({_$litDirective$:n,values:e});let ie=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,r){this._$Ct=e,this._$AM=t,this._$Ci=r}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};class ce extends ie{constructor(e){if(super(e),this.it=f,e.type!==ae.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===f||e==null)return this._t=void 0,this.it=e;if(e===y)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}ce.directiveName="unsafeHTML",ce.resultType=1;const Se=se(ce),ct=W`
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
`;function lt(n){return n?.charAt(0).toUpperCase()??""}let L=null;async function ht(){return L||(await Ee("data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=")?(L="avif",console.log("Browser supports AVIF format"),"avif"):await Ee("data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=")?(L="webp",console.log("Browser supports WebP format"),"webp"):(L="jpg",console.log("Browser fallback to JPG format"),"jpg"))}function Ee(n){return new Promise(e=>{const t=new Image;t.onload=()=>e(!0),t.onerror=()=>e(!1),t.src=n})}const mt=10080*60*1e3,dt=1e3,R=new Map;function pt(n){const e=R.get(n);return e?Date.now()-e.timestamp>mt?(R.delete(n),null):e.url:null}function Be(n,e){if(R.size>=dt){const t=R.keys().next().value;t&&R.delete(t)}R.set(n,{url:e,timestamp:Date.now()})}async function ut(n){const t=new TextEncoder().encode(n),r=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(r)).map(a=>a.toString(16).padStart(2,"0")).join("")}const G=new Map;async function le(n){if(!n)return null;const e=n.email?.trim().toLowerCase()||n.name;if(!e)return n.userAvatar||null;const t=pt(e);if(t)return t;if(G.has(e))return G.get(e);const r=(async()=>{if(n.userAvatar)return Be(e,n.userAvatar),n.userAvatar;if(n.email){const o=n.email.trim().toLowerCase();if(o)try{const a=await ut(o),s=await ht(),c=`https://weavatar.com/avatar/${a}.${s}`;return Be(e,c),c}catch(a){return console.error("Failed to generate avatar URL:",a),null}}return null})();return G.set(e,r),r.finally(()=>{G.delete(e)}),r}async function ft(n){const e=`/apis/api.comment.interact.xhhao.com/v1alpha1/comments/${encodeURIComponent(n)}`,t=await fetch(e);if(!t.ok)throw new Error(`获取评论失败: ${t.status} ${t.statusText}`);const r=await t.json();if(r.kind==="Comment"||r.kind==="Reply")return r;if(r&&typeof r=="object"&&(r.content||r.raw)){const o=r;return o.name||(o.name=o.metadataName||"unknown"),o.displayName||(o.displayName="匿名用户"),o}return r.data?r.data:null}async function gt(n){const t=`/apis/api.comment.interact.xhhao.com/v1alpha1/commentList?${new URLSearchParams({group:n.group,kind:n.kind,name:n.name,size:"100",replySize:"100"}).toString()}`,r=await fetch(t);if(!r.ok)throw new Error(`获取评论列表失败: ${r.status} ${r.statusText}`);const o=await r.json(),a=[];if(Array.isArray(o.items)){const s=o.items;for(const c of s)if(a.push(Z(c)),c.replies?.items)for(const i of c.replies.items)a.push(Z(i))}return a}async function bt(n){const e=`/apis/api.comment.interact.xhhao.com/v1alpha1/comments/${encodeURIComponent(n)}/replies?replySize=100`,t=await fetch(e);if(!t.ok)throw new Error(`获取评论回复失败: ${t.status} ${t.statusText}`);const r=await t.json(),o=Z(r),a=[],s=new Map;if(s.set(o.name,o),r.replies?.items)for(const c of r.replies.items){const i=Z(c);a.push(i),s.set(i.name,i)}return a.forEach(c=>{let i="";if(c.quoteReply){const m=s.get(c.quoteReply);m&&(i=m.displayName)}else if(c.commentName){const m=s.get(c.commentName);m&&(i=m.displayName)}if(i){const m=`<span class="mention">@${i}</span> `;c.content.trim().startsWith("<p>")?c.content=c.content.replace("<p>",`<p>${m}`):c.content=m+c.content}}),{comment:o,replies:a}}function Z(n){const e=n.spec.owner.annotations?.["email-hash"],t=n;return{kind:"Comment",name:n.metadata.name,displayName:n.owner?.displayName||n.spec.owner.displayName,content:n.spec.content,raw:n.spec.raw,metadataName:n.metadata.name,approved:n.spec.approved,userAvatar:n.owner?.avatar||void 0,email:n.owner?.email||n.spec.owner.email,emailHash:e,quoteReply:n.spec.quoteReply,commentName:n.spec.commentName,creationTime:n.spec.creationTime||n.metadata.creationTimestamp,refPost:t.refPost,refUrl:t.refUrl}}function vt(){const n=["html.dark:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[class~='dark']:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[class*='dark']:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[data-color-scheme='dark']:not([data-color-scheme='light'])","html[data-theme='dark']:not([data-theme='light'])","html[theme='dark']:not([theme='light'])","[data-color-scheme='dark']:not([data-color-scheme='light'])","[data-theme='dark']:not([data-theme='light'])","[theme='dark']:not([theme='light'])"],e=document.documentElement,t=document.body;return n.some(o=>{try{return e.matches(o)||t.matches(o)}catch{return!1}})||e.classList.contains("dark")||e.getAttribute("data-theme")==="dark"||e.getAttribute("data-color-scheme")==="dark"||e.getAttribute("theme")==="dark"}function At(n){const e=new MutationObserver(n);return e.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","theme"]}),e.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","theme"]}),e}var yt=Object.defineProperty,$t=Object.getOwnPropertyDescriptor,C=(n,e,t,r)=>{for(var o=r>1?void 0:r?$t(e,t):e,a=n.length-1,s;a>=0;a--)(s=n[a])&&(o=(r?s(e,t,o):s(o))||o);return r&&o&&yt(e,t,o),o};h.CommentReference=class extends k{constructor(){super(...arguments),this.name="",this.commentData=null,this.isLoading=!1,this.error="",this.isDark=!1,this.hasFetched=!1,this.avatarUrl=null}connectedCallback(){super.connectedCallback(),this.detectTheme(),this.observeTheme(),this.name&&!this.commentData&&!this.isLoading&&this.fetchComment()}disconnectedCallback(){super.disconnectedCallback(),this.themeObserver&&this.themeObserver.disconnect()}detectTheme(){this.isDark=vt()}observeTheme(){this.themeObserver=At(()=>{this.detectTheme()})}async fetchComment(){if(!this.name){this.error="缺少评论名称";return}if(!this.hasFetched){this.hasFetched=!0,this.isLoading=!0,this.error="";try{const e=await ft(this.name);e?(this.commentData=e,this.avatarUrl=await le(e)):(this.error="未找到评论数据",this.commentData=null,this.avatarUrl=null)}catch(e){this.error=e instanceof Error?e.message:"获取评论失败",this.commentData=null,this.avatarUrl=null,console.error("Error fetching comment:",e)}finally{this.isLoading=!1}}}renderCommentContent(){if(!this.commentData)return"";const e=this.commentData.refPost&&this.commentData.refUrl?g`
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
          ${this.avatarUrl?g`<img src="${this.avatarUrl}" alt="${this.commentData.displayName}">`:g`<span class="comment-avatar-placeholder">${lt(this.commentData.displayName)}</span>`}
        </div>
        <div class="comment-info">
          <div class="comment-author">${this.commentData.displayName}</div>
          ${e}
        </div>
      </div>
      <div class="comment-content">${Se(this.commentData.raw)}</div>
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
      `}},h.CommentReference.styles=ct,C([v({type:String})],h.CommentReference.prototype,"name",2),C([A()],h.CommentReference.prototype,"commentData",2),C([A()],h.CommentReference.prototype,"isLoading",2),C([A()],h.CommentReference.prototype,"error",2),C([A()],h.CommentReference.prototype,"isDark",2),C([A()],h.CommentReference.prototype,"hasFetched",2),C([A()],h.CommentReference.prototype,"avatarUrl",2),h.CommentReference=C([Y("comment-reference")],h.CommentReference);const wt=W`
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

  /* Source Info */
  .conversation-source {
    font-size: 0.75rem;
    color: var(--cc-text-muted);
    padding: 0.5rem 0.75rem;
    background: var(--cc-bubble-bg);
    border-radius: 8px;
    border: 1px solid var(--cc-bubble-border);
    margin-bottom: 0.25rem;
  }

  .conversation-source a {
    color: var(--cc-primary);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
  }

  .conversation-source a:hover {
    color: #2563eb;
    text-decoration: underline;
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
`;var _t=Object.defineProperty,xt=Object.getOwnPropertyDescriptor,T=(n,e,t,r)=>{for(var o=r>1?void 0:r?xt(e,t):e,a=n.length-1,s;a>=0;a--)(s=n[a])&&(o=(r?s(e,t,o):s(o))||o);return r&&o&&_t(e,t,o),o};h.CommentConversation=class extends k{constructor(){super(...arguments),this.name="",this.userName="",this.userAvatar="",this._data=null,this._loading=!1,this._error=null}updated(e){e.has("name")&&this.name&&this.fetchData()}async fetchData(){if(this.name){this._loading=!0,this._error=null;try{const e=await bt(this.name);if(e){e.comment.userAvatar=await le(e.comment)||void 0;for(const t of e.replies)t.userAvatar=await le(t)||void 0}this._data=e}catch(e){this._error=e.message}finally{this._loading=!1}}}render(){if(this._loading)return g`<div class="loading">加载对话中...</div>`;if(this._error)return g`<div class="error">加载失败: ${this._error}</div>`;if(!this._data)return f;const{comment:e,replies:t}=this._data,r=[e,...t].sort((i,m)=>{const u=new Date(i.creationTime||0).getTime(),l=new Date(m.creationTime||0).getTime();return u-l});let o="";const a=e.displayName,s=e.userAvatar,c=e.refPost&&e.refUrl?g`
          <div class="conversation-source">
            来源于: <a href="${e.refUrl}" target="_blank">
              ${e.refPost}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 2px; vertical-align: middle;">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        `:f;return g`
      <div class="conversation-container">
        ${c}
        ${r.map(i=>{const m=new Date(i.creationTime||Date.now()),u=this._formatDate(m),l=u!==o;o=u;const d=i.displayName===a&&i.userAvatar===s;return g`
            ${l?g`<div class="date-divider">${u}</div>`:f}
            ${this._renderMessage(i,d)}
          `})}
      </div>
    `}_renderMessage(e,t){const r=this._formatTime(new Date(e.creationTime||Date.now()));let o=e.userAvatar;return this.userName&&this.userAvatar&&e.displayName===this.userName&&(o=this.userAvatar),g`
      <div class="message-item">
        <div class="avatar">
          ${o?g`<img src="${o}" alt="${e.displayName}" loading="lazy" />`:g`<div class="avatar-placeholder">${e.displayName.charAt(0).toUpperCase()}</div>`}
        </div>
        <div class="content-wrapper">
          <div class="header">
            <span class="author-name">${e.displayName}</span>
            ${t?g`<span class="badge badge-owner">楼主</span>`:f}
          </div>

          <div style="display: flex; align-items: flex-end; gap: 0.5rem;">
            <div class="message-bubble">
              <div class="message-content">
                ${Se(e.content)}
              </div>
            </div>
            <span class="time-display">${r}</span>
          </div>
        </div>
      </div>
    `}_formatDate(e){const t=new Date,r=e.getFullYear(),o=(e.getMonth()+1).toString().padStart(2,"0"),a=e.getDate().toString().padStart(2,"0");return r===t.getFullYear()?`${o}月${a}日`:`${r}年${o}月${a}日`}_formatTime(e){const t=e.getHours().toString().padStart(2,"0"),r=e.getMinutes().toString().padStart(2,"0");return`${t}:${r}`}},h.CommentConversation.styles=wt,T([v({type:String})],h.CommentConversation.prototype,"name",2),T([v({type:String,attribute:"user-name"})],h.CommentConversation.prototype,"userName",2),T([v({type:String,attribute:"user-avatar"})],h.CommentConversation.prototype,"userAvatar",2),T([A()],h.CommentConversation.prototype,"_data",2),T([A()],h.CommentConversation.prototype,"_loading",2),T([A()],h.CommentConversation.prototype,"_error",2),h.CommentConversation=T([Y("comment-conversation")],h.CommentConversation);const Pe="important",kt=" !"+Pe,Ct=se(class extends ie{constructor(n){if(super(n),n.type!==ae.ATTRIBUTE||n.name!=="style"||n.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(n){return Object.keys(n).reduce(((e,t)=>{const r=n[t];return r==null?e:e+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`}),"")}update(n,[e]){const{style:t}=n.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const r of this.ft)e[r]==null&&(this.ft.delete(r),r.includes("-")?t.removeProperty(r):t[r]=null);for(const r in e){const o=e[r];if(o!=null){this.ft.add(r);const a=typeof o=="string"&&o.endsWith(kt);r.includes("-")||a?t.setProperty(r,a?o.slice(0,-11):o,a?Pe:""):t[r]=o}}return y}});const{I:St}=et,Te=()=>document.createComment(""),F=(n,e,t)=>{const r=n._$AA.parentNode,o=e===void 0?n._$AB:e._$AA;if(t===void 0){const a=r.insertBefore(Te(),o),s=r.insertBefore(Te(),o);t=new St(a,s,n,n.options)}else{const a=t._$AB.nextSibling,s=t._$AM,c=s!==n;if(c){let i;t._$AQ?.(n),t._$AM=n,t._$AP!==void 0&&(i=n._$AU)!==s._$AU&&t._$AP(i)}if(a!==o||c){let i=t._$AA;for(;i!==a;){const m=i.nextSibling;r.insertBefore(i,o),i=m}}}return t},D=(n,e,t=n)=>(n._$AI(e,t),n),Et={},Bt=(n,e=Et)=>n._$AH=e,Pt=n=>n._$AH,he=n=>{n._$AR(),n._$AA.remove()};const De=(n,e,t)=>{const r=new Map;for(let o=e;o<=t;o++)r.set(n[o],o);return r},Tt=se(class extends ie{constructor(n){if(super(n),n.type!==ae.CHILD)throw Error("repeat() can only be used in text expressions")}dt(n,e,t){let r;t===void 0?t=e:e!==void 0&&(r=e);const o=[],a=[];let s=0;for(const c of n)o[s]=r?r(c,s):s,a[s]=t(c,s),s++;return{values:a,keys:o}}render(n,e,t){return this.dt(n,e,t).values}update(n,[e,t,r]){const o=Pt(n),{values:a,keys:s}=this.dt(e,t,r);if(!Array.isArray(o))return this.ut=s,a;const c=this.ut??=[],i=[];let m,u,l=0,d=o.length-1,p=0,b=a.length-1;for(;l<=d&&p<=b;)if(o[l]===null)l++;else if(o[d]===null)d--;else if(c[l]===s[p])i[p]=D(o[l],a[p]),l++,p++;else if(c[d]===s[b])i[b]=D(o[d],a[b]),d--,b--;else if(c[l]===s[b])i[b]=D(o[l],a[b]),F(n,i[b+1],o[l]),l++,b--;else if(c[d]===s[p])i[p]=D(o[d],a[p]),F(n,o[l],o[d]),d--,p++;else if(m===void 0&&(m=De(s,p,b),u=De(c,l,d)),m.has(c[l]))if(m.has(c[d])){const w=u.get(s[p]),me=w!==void 0?o[w]:null;if(me===null){const Ue=F(n,o[l]);D(Ue,a[p]),i[p]=Ue}else i[p]=D(me,a[p]),F(n,o[l],me),o[w]=null;p++}else he(o[d]),d--;else he(o[l]),l++;for(;p<=b;){const w=F(n,i[b+1]);D(w,a[p]),i[p++]=w}for(;l<=d;){const w=o[l++];w!==null&&he(w)}return this.ut=s,Bt(n,i),y}}),Dt=W`
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
`;var Mt=Object.defineProperty,Ut=Object.getOwnPropertyDescriptor,S=(n,e,t,r)=>{for(var o=r>1?void 0:r?Ut(e,t):e,a=n.length-1,s;a>=0;a--)(s=n[a])&&(o=(r?s(e,t,o):s(o))||o);return r&&o&&Mt(e,t,o),o};function Me(n){const e=document.createElement("div");return e.innerHTML=n,e.textContent||e.innerText||""}h.CommentBarrage=class extends k{constructor(){super(...arguments),this.comments=[],this.rows=8,this.baseTime=10,this.loop=!0,this.height=0,this.activeBarrages=[],this.isPlaying=!1,this.currentIndex=0,this.trackAvailability=[],this.spawnInterval=1e3,this.lastSpawnTime=0,this.loopLogic=()=>{if(!this.isPlaying)return;const e=performance.now();if(this.activeBarrages=this.activeBarrages.filter(t=>e<t.startTime+t.duration*1e3),e-this.lastSpawnTime>this.spawnInterval&&(this.comments.length>0&&this.trySpawnNext(),this.lastSpawnTime=e),!this.loop&&this.currentIndex>=this.comments.length&&this.activeBarrages.length===0){this.stop(),this.dispatchEvent(new CustomEvent("barrage-complete",{bubbles:!0,composed:!0}));return}this.animationFrameId=requestAnimationFrame(this.loopLogic)}}connectedCallback(){super.connectedCallback(),this.trackAvailability=new Array(this.rows).fill(0),this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}updated(e){e.has("rows")&&(this.trackAvailability=new Array(this.rows).fill(0))}start(){this.isPlaying||(this.isPlaying=!0,this.loopLogic())}pause(){this.isPlaying=!1,this.animationFrameId&&cancelAnimationFrame(this.animationFrameId)}stop(){this.pause(),this.activeBarrages=[],this.currentIndex=0,this.trackAvailability.fill(0)}addBarrage(e){this.spawnBarrage(e)}setComments(e){this.comments=e,this.currentIndex>=this.comments.length&&this.loop&&(this.currentIndex=0)}async trySpawnNext(){if(this.currentIndex>=this.comments.length)if(this.loop)this.currentIndex=0;else return;const e=this.comments[this.currentIndex];await this.spawnBarrage(e)?(this.currentIndex++,this.spawnInterval=500+Math.random()*1500):this.spawnInterval=200}async spawnBarrage(e){const t=Date.now();let r=-1;const o=[];for(let d=0;d<this.rows;d++)this.trackAvailability[d]<=t&&o.push(d);if(o.length===0)return!1;r=o[Math.floor(Math.random()*o.length)];const a=this.baseTime+(Math.random()*2-1),c=50+e.content.length*14,m=(this.container?.clientWidth||1e3)/a,u=(c+100)/m*1e3;this.trackAvailability[r]=t+u;const l={id:Math.random().toString(36).substr(2,9),data:e,top:r*(100/this.rows),duration:a,startTime:performance.now()};return this.activeBarrages=[...this.activeBarrages,l],!0}render(){return g`
      <div class="barrage-container">
        ${Tt(this.activeBarrages,e=>e.id,e=>g`
            <div
              class="barrage-item"
              style=${Ct({top:`${e.top}%`,animationDuration:`${e.duration}s`,animationName:"moveLeft"})}
              @animationend=${()=>this.removeBarrage(e.id)}
            >
              <span class="barrage-author">${e.data.displayName}:</span>
              <span class="barrage-content" title="${Me(e.data.content)}">${Me(e.data.content)}</span>
            </div>
          `)}
      </div>
    `}removeBarrage(e){this.activeBarrages=this.activeBarrages.filter(t=>t.id!==e)}},h.CommentBarrage.styles=Dt,S([v({type:Array})],h.CommentBarrage.prototype,"comments",2),S([v({type:Number})],h.CommentBarrage.prototype,"rows",2),S([v({type:Number})],h.CommentBarrage.prototype,"baseTime",2),S([v({type:Boolean})],h.CommentBarrage.prototype,"loop",2),S([v({type:Number})],h.CommentBarrage.prototype,"height",2),S([A()],h.CommentBarrage.prototype,"activeBarrages",2),S([it(".barrage-container")],h.CommentBarrage.prototype,"container",2),h.CommentBarrage=S([Y("comment-barrage")],h.CommentBarrage);var Nt=Object.defineProperty,Rt=Object.getOwnPropertyDescriptor,$=(n,e,t,r)=>{for(var o=r>1?void 0:r?Rt(e,t):e,a=n.length-1,s;a>=0;a--)(s=n[a])&&(o=(r?s(e,t,o):s(o))||o);return r&&o&&Nt(e,t,o),o};h.XhhaoBarrage=class extends k{constructor(){super(...arguments),this.kind="",this.group="",this.name="",this.speed=20,this.rows=8,this.loop=!1,this.comments=[],this.isVisible=!0,this.hasFetched=!1}connectedCallback(){super.connectedCallback(),this.parentElement!==document.body&&setTimeout(()=>{document.body.appendChild(this)},0),this.kind&&this.group&&this.name&&!this.hasFetched&&this.fetchData()}async fetchData(){this.hasFetched=!0;try{const e=await gt({kind:this.kind,group:this.group,name:this.name});this.comments=e}catch(e){console.error("Error fetching barrage comments:",e)}}handleClose(){this.isVisible=!1,setTimeout(()=>{this.remove()},300)}handleBarrageComplete(){this.handleClose()}render(){return!this.isVisible||this.comments.length===0?g``:g`
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
    `}},h.XhhaoBarrage.styles=W`
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
  `,$([v({type:String})],h.XhhaoBarrage.prototype,"kind",2),$([v({type:String})],h.XhhaoBarrage.prototype,"group",2),$([v({type:String})],h.XhhaoBarrage.prototype,"name",2),$([v({type:Number})],h.XhhaoBarrage.prototype,"speed",2),$([v({type:Number})],h.XhhaoBarrage.prototype,"rows",2),$([v({type:Boolean,converter:n=>n!==null&&n!=="false"})],h.XhhaoBarrage.prototype,"loop",2),$([A()],h.XhhaoBarrage.prototype,"comments",2),$([A()],h.XhhaoBarrage.prototype,"isVisible",2),h.XhhaoBarrage=$([Y("xhhao-barrage")],h.XhhaoBarrage),Object.defineProperty(h,Symbol.toStringTag,{value:"Module"})}));
