!function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(){var t=l.node().offsetWidth;p!==t&&(p=t,f.default.resize())}var i=n(1),s=o(i),c=n(3),u=o(c),a=n(4),f=o(a),l=d3.select("body"),p=0;!function(){l.classed("is-mobile",u.default.any()),window.addEventListener("resize",(0,s.default)(r,150)),f.default.init()}()},function(t,e,n){(function(e){function n(t,e,n){function r(e){var n=v,o=g;return v=g=void 0,I=e,b=t.apply(o,n)}function i(t){return I=t,y=setTimeout(f,e),T?r(t):b}function u(t){var n=t-w,o=t-I,r=e-n;return O?E(r,m-o):r}function a(t){var n=t-w,o=t-I;return void 0===w||n>=e||n<0||O&&o>=m}function f(){var t=x();if(a(t))return l(t);y=setTimeout(f,u(t))}function l(t){return y=void 0,R&&v?r(t):(v=g=void 0,b)}function p(){void 0!==y&&clearTimeout(y),I=0,v=w=g=y=void 0}function h(){return void 0===y?b:l(x())}function d(){var t=x(),n=a(t);if(v=arguments,g=this,w=t,n){if(void 0===y)return i(w);if(O)return y=setTimeout(f,e),r(w)}return void 0===y&&(y=setTimeout(f,e)),b}var v,g,m,b,y,w,I=0,T=!1,O=!1,R=!0;if("function"!=typeof t)throw new TypeError(c);return e=s(e)||0,o(n)&&(T=!!n.leading,O="maxWait"in n,m=O?_(s(n.maxWait)||0,e):m,R="trailing"in n?!!n.trailing:R),d.cancel=p,d.flush=h,d}function o(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function r(t){return!!t&&"object"==typeof t}function i(t){return"symbol"==typeof t||r(t)&&y.call(t)==a}function s(t){if("number"==typeof t)return t;if(i(t))return u;if(o(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=o(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(f,"");var n=p.test(t);return n||h.test(t)?d(t.slice(2),n?2:8):l.test(t)?u:+t}var c="Expected a function",u=NaN,a="[object Symbol]",f=/^\s+|\s+$/g,l=/^[-+]0x[0-9a-f]+$/i,p=/^0b[01]+$/i,h=/^0o[0-7]+$/i,d=parseInt,v="object"==typeof e&&e&&e.Object===Object&&e,g="object"==typeof self&&self&&self.Object===Object&&self,m=v||g||Function("return this")(),b=Object.prototype,y=b.toString,_=Math.max,E=Math.min,x=function(){return m.Date.now()};t.exports=n}).call(e,n(2))},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={android:function(){return navigator.userAgent.match(/Android/i)},blackberry:function(){return navigator.userAgent.match(/BlackBerry/i)},ios:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},opera:function(){return navigator.userAgent.match(/Opera Mini/i)},windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return o.android()||o.blackberry()||o.ios()||o.opera()||o.windows()}};e.default=o},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(t){return new Promise(function(e,n){var o=new XMLHttpRequest;o.open("GET",t,!0),o.responseType="blob",o.onload=function(){200===this.status&&e()},o.onerror=function(){n(this)},o.send()})}function i(){var t=b.map(function(t){return"assets/resize/"+t.media+".mp4"}),e=t.map(r);(0,g.default)(e).then(function(){return console.log("done loading videos")}).catch(console.error)}function s(){var t=window.innerHeight,e=d3.select("body").node().offsetWidth;if(!(T=e<w)){_.st({height:t});var n=Math.floor(.89*window.innerHeight);x.st({height:n})}m.resize()}function c(t){return p({},t,{score:+t.score,views:+t.views,week:+t.week,popularity:+t.popularity,num_comments:+t.num_comments,media:t.url.split("/").pop()})}function u(t){var e=(t.element,t.direction,t.index);E.selectAll(".play").classed("is-active",function(t,n){return n===e});var n=b[e],o="assets/resize/"+n.media+".mp4";_.select("video").at({src:o})}function a(){}function f(){E.selectAll(".play").data(b).enter().append("div.play").append("p").text(function(t){return t.title}).append("span").text(function(t){return d3.format(",")(t.views)+" views | "+d3.format(",")(t.score)+" votes | "+d3.format(",")(t.num_comments)+" comments"});var t=T?I/window.innerHeight:.9;m.setup({step:".play",offset:t,debug:!1}).onStepEnter(u).onStepExit(a)}function l(){s(),d3.csv("assets/data/popular.csv",c,function(t,e){b=e,console.log(b),i(),f(),s()})}Object.defineProperty(e,"__esModule",{value:!0});var p=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},h=n(5),d=o(h),v=n(6),g=o(v),m=(0,d.default)(),b=null,y=d3.select("#wall"),_=y.select(".wall__video"),E=y.select(".wall__plays"),x=d3.select(".intro"),w=800,I=200,T=!1;e.default={init:l,resize:s}},function(t,e,n){!function(e,n){t.exports=n()}(0,function(){"use strict";function t(t){for(var e=t.length,n=[],o=0;o<e;o+=1)n.push(t[o]);return n}function e(t){return document.querySelector(t)}function n(e,n){return void 0===n&&(n=document),t(n.querySelectorAll(e))}function o(){function t(t,e){var n=+t.getAttribute("data-scrollama-index"),o={element:t,index:n,direction:e};T.stepEnter&&"function"==typeof T.stepEnter&&T.stepEnter(o)}function o(t,e){var n=+t.getAttribute("data-scrollama-index"),o={element:t,index:n,direction:e};T.stepExit&&"function"==typeof T.stepExit&&T.stepExit(o)}function r(t,e){var n=+t.getAttribute("data-scrollama-index"),o={element:t,index:n,progress:e};T.stepProgress&&"function"==typeof T.stepProgress&&T.stepProgress(o)}function i(t){var e={direction:t};T.containerEnter&&"function"==typeof T.containerEnter&&T.containerEnter(e)}function s(t){var e={direction:t};T.containerExit&&"function"==typeof T.containerExit&&T.containerExit(e)}function c(e){e.forEach(function(e){var n=e.isIntersecting,r=e.boundingClientRect,i=e.target;if(r.bottom-C>=-I){var s=n?"down":"up";n?t(i,s):o(i,s)}})}function u(e){e.forEach(function(e){var n=e.isIntersecting,r=e.boundingClientRect,i=e.target,s=r.bottom,c=r.height,u=s-C;if(u>=-I&&u<c&&n){t(i,"up")}else if(u<=I&&!n){o(i,"down")}})}function a(t){t.forEach(function(t){var e=t.isIntersecting,n=t.intersectionRatio,o=t.boundingClientRect,i=t.target,s=o.bottom,c=s-C;e&&c>=-I&&r(i,+n.toFixed(3))})}function f(t){var e=t[0],n=e.isIntersecting;if(e.boundingClientRect.bottom>-I){var o=n?"down":"up";n?i(o):s(o)}}function l(t){var e=t[0],n=e.isIntersecting;if(e.boundingClientRect.top<I){var o=n?"up":"down";n?i(o):s(o)}}function p(){O.top&&O.top.unobserve(R);var t={root:null,rootMargin:k+"px 0px -"+k+"px 0px",threshold:0};O.top=new IntersectionObserver(f,t),O.top.observe(R)}function h(){O.bottom&&O.bottom.unobserve(R);var t={root:null,rootMargin:"-"+L.height+"px 0px "+L.height+"px 0px",threshold:0};O.bottom=new IntersectionObserver(l,t),O.bottom.observe(R)}function d(){O.stepTop&&O.stepTop.forEach(function(t){return t.disconnect()}),O.stepTop=P.map(function(t,e){var n=j[e]-C,o=-k+C,r=n+"px 0px "+o+"px 0px",i={root:null,rootMargin:r,threshold:0},s=new IntersectionObserver(c,i);return s.observe(t),s})}function v(){O.stepBottom&&O.stepBottom.forEach(function(t){return t.disconnect()}),O.stepBottom=P.map(function(t,e){var n=-C,o=-k+j[e]+C,r=n+"px 0px "+o+"px 0px",i={root:null,rootMargin:r,threshold:0},s=new IntersectionObserver(u,i);return s.observe(t),s})}function g(){O.stepProgress&&O.stepProgress.forEach(function(t){return t.disconnect()}),O.stepProgress=P.map(function(t,e){var n=j[e]-C,o=-k+C,r=n+"px 0px "+o+"px 0px",i={root:null,rootMargin:r,threshold:B},s=new IntersectionObserver(a,i);return s.observe(t),s})}function m(){d(),v(),H&&g(),R&&M&&(p(),h())}function b(){if(k=window.innerHeight,L=M?M.getBoundingClientRect():null,C=A*k,j=P?P.map(function(t){return t.getBoundingClientRect().height}):[],S&&F&&m(),q){document.querySelector("#scrollama__debug--offset-"+w).style.top=C+"px"}}function y(t){t&&!S?(F&&m(),S=!0):t||(O.top&&O.top.disconnect(),O.bottom&&O.bottom.disconnect(),O.stepTop&&O.stepTop.forEach(function(t){return t.disconnect()}),O.stepBottom&&O.stepBottom.forEach(function(t){return t.disconnect()}),O.stepProgress&&O.stepProgress.forEach(function(t){return t.disconnect()}),S=!1)}function _(){P.forEach(function(t,e){return t.setAttribute("data-scrollama-index",e)})}function E(){if(q){var t=document.createElement("div");t.setAttribute("id","scrollama__debug--offset-"+w),t.setAttribute("class","scrollama__debug--offset"),t.style.position="fixed",t.style.top="0",t.style.left="0",t.style.width="100%",t.style.height="1px",t.style.borderBottom="1px dashed red";var e=document.createElement("p"),n=P[0].getAttribute("class");e.innerText='".'+n+'" trigger: '+A,e.style.fontSize="12px",e.style.fontFamily="monospace",e.style.color="red",e.style.margin="0",e.style.padding="6px",t.appendChild(e),document.body.appendChild(t)}}function x(){if(H){B=[];for(var t=0;t<100;t++)B.push(.01*t)}}var w=Math.floor(1e5*Math.random()),I=1,T={},O={},R=null,M=null,P=null,A=0,C=0,k=0,j=null,L=null,B=0,F=!1,S=!1,q=!1,H=!1,z={};return z.setup=function(t){var o=t.container,r=t.graphic,i=t.step,s=t.offset;void 0===s&&(s=.5);var c=t.progress;void 0===c&&(c=!1);var u=t.debug;return void 0===u&&(u=!1),i?(P=n(i),R=o?e(o):null,M=r?e(r):null,A=s,q=u,H=c,F=!0,E(),_(),x(),b(),y(!0)):console.error("scrollama error: missing step element"),z},z.resize=function(){return b(),z},z.enable=function(){return y(!0),z},z.disable=function(){return y(!1),z},z.getOffset=function(){return A},z.onStepEnter=function(t){return T.stepEnter=t,z},z.onStepExit=function(t){return T.stepExit=t,z},z.onStepProgress=function(t){return T.stepProgress=t,z},z.onContainerEnter=function(t){return T.containerEnter=t,z},z.onContainerExit=function(t){return T.containerExit=t,z},z}return function(t,e){function n(t){this.time=t.time,this.target=t.target,this.rootBounds=t.rootBounds,this.boundingClientRect=t.boundingClientRect,this.intersectionRect=t.intersectionRect||f(),this.isIntersecting=!!t.intersectionRect;var e=this.boundingClientRect,n=e.width*e.height,o=this.intersectionRect,r=o.width*o.height;this.intersectionRatio=n?r/n:this.isIntersecting?1:0}function o(t,e){var n=e||{};if("function"!=typeof t)throw new Error("callback must be a function");if(n.root&&1!=n.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=i(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT),this._callback=t,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(n.rootMargin),this.thresholds=this._initThresholds(n.threshold),this.root=n.root||null,this.rootMargin=this._rootMarginValues.map(function(t){return t.value+t.unit}).join(" ")}function r(){return t.performance&&performance.now&&performance.now()}function i(t,e){var n=null;return function(){n||(n=setTimeout(function(){t(),n=null},e))}}function s(t,e,n,o){"function"==typeof t.addEventListener?t.addEventListener(e,n,o||!1):"function"==typeof t.attachEvent&&t.attachEvent("on"+e,n)}function c(t,e,n,o){"function"==typeof t.removeEventListener?t.removeEventListener(e,n,o||!1):"function"==typeof t.detatchEvent&&t.detatchEvent("on"+e,n)}function u(t,e){var n=Math.max(t.top,e.top),o=Math.min(t.bottom,e.bottom),r=Math.max(t.left,e.left),i=Math.min(t.right,e.right),s=i-r,c=o-n;return s>=0&&c>=0&&{top:n,bottom:o,left:r,right:i,width:s,height:c}}function a(t){var e;try{e=t.getBoundingClientRect()}catch(t){}return e?(e.width&&e.height||(e={top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.right-e.left,height:e.bottom-e.top}),e):f()}function f(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}function l(t,e){for(var n=e;n;){if(n==t)return!0;n=p(n)}return!1}function p(t){var e=t.parentNode;return e&&11==e.nodeType&&e.host?e.host:e}if("IntersectionObserver"in t&&"IntersectionObserverEntry"in t&&"intersectionRatio"in t.IntersectionObserverEntry.prototype)return void("isIntersecting"in t.IntersectionObserverEntry.prototype||Object.defineProperty(t.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}}));var h=[];o.prototype.THROTTLE_TIMEOUT=100,o.prototype.POLL_INTERVAL=null,o.prototype.observe=function(t){if(!this._observationTargets.some(function(e){return e.element==t})){if(!t||1!=t.nodeType)throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:t,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},o.prototype.unobserve=function(t){this._observationTargets=this._observationTargets.filter(function(e){return e.element!=t}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},o.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},o.prototype.takeRecords=function(){var t=this._queuedEntries.slice();return this._queuedEntries=[],t},o.prototype._initThresholds=function(t){var e=t||[0];return Array.isArray(e)||(e=[e]),e.sort().filter(function(t,e,n){if("number"!=typeof t||isNaN(t)||t<0||t>1)throw new Error("threshold must be a number between 0 and 1 inclusively");return t!==n[e-1]})},o.prototype._parseRootMargin=function(t){var e=t||"0px",n=e.split(/\s+/).map(function(t){var e=/^(-?\d*\.?\d+)(px|%)$/.exec(t);if(!e)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(e[1]),unit:e[2]}});return n[1]=n[1]||n[0],n[2]=n[2]||n[0],n[3]=n[3]||n[1],n},o.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(s(t,"resize",this._checkForIntersections,!0),s(e,"scroll",this._checkForIntersections,!0),"MutationObserver"in t&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(e,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},o.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,c(t,"resize",this._checkForIntersections,!0),c(e,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},o.prototype._checkForIntersections=function(){var t=this._rootIsInDom(),e=t?this._getRootRect():f();this._observationTargets.forEach(function(o){var i=o.element,s=a(i),c=this._rootContainsTarget(i),u=o.entry,f=t&&c&&this._computeTargetAndRootIntersection(i,e),l=o.entry=new n({time:r(),target:i,boundingClientRect:s,rootBounds:e,intersectionRect:f});u?t&&c?this._hasCrossedThreshold(u,l)&&this._queuedEntries.push(l):u&&u.isIntersecting&&this._queuedEntries.push(l):this._queuedEntries.push(l)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},o.prototype._computeTargetAndRootIntersection=function(n,o){var r=this;if("none"!=t.getComputedStyle(n).display){for(var i=a(n),s=i,c=p(n),f=!1;!f;){var l=null,h=1==c.nodeType?t.getComputedStyle(c):{};if("none"==h.display)return;if(c==r.root||c==e?(f=!0,l=o):c!=e.body&&c!=e.documentElement&&"visible"!=h.overflow&&(l=a(c)),l&&!(s=u(l,s)))break;c=p(c)}return s}},o.prototype._getRootRect=function(){var t;if(this.root)t=a(this.root);else{var n=e.documentElement,o=e.body;t={top:0,left:0,right:n.clientWidth||o.clientWidth,width:n.clientWidth||o.clientWidth,bottom:n.clientHeight||o.clientHeight,height:n.clientHeight||o.clientHeight}}return this._expandRectByRootMargin(t)},o.prototype._expandRectByRootMargin=function(t){var e=this._rootMarginValues.map(function(e,n){return"px"==e.unit?e.value:e.value*(n%2?t.width:t.height)/100}),n={top:t.top-e[0],right:t.right+e[1],bottom:t.bottom+e[2],left:t.left-e[3]};return n.width=n.right-n.left,n.height=n.bottom-n.top,n},o.prototype._hasCrossedThreshold=function(t,e){var n=this,o=t&&t.isIntersecting?t.intersectionRatio||0:-1,r=e.isIntersecting?e.intersectionRatio||0:-1;if(o!==r)for(var i=0;i<this.thresholds.length;i++){var s=n.thresholds[i];if(s==o||s==r||s<o!=s<r)return!0}},o.prototype._rootIsInDom=function(){return!this.root||l(e,this.root)},o.prototype._rootContainsTarget=function(t){return l(this.root||e,t)},o.prototype._registerInstance=function(){h.indexOf(this)<0&&h.push(this)},o.prototype._unregisterInstance=function(){var t=h.indexOf(this);-1!=t&&h.splice(t,1)},t.IntersectionObserver=o,t.IntersectionObserverEntry=n}(window,document),o})},function(t,e,n){"use strict";t.exports=function(t){return t.reduce(function(t,e){return t.then(e)},Promise.resolve())}}]);