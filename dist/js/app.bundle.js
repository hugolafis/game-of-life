!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(2),o=document.getElementById("#canvas"),a=document.getElementById("#stats"),i=new r.LifeController(o,200,200);window.requestAnimationFrame((function e(){var t=performance.now();c+=t-u,u=t,c>50&&(i.update(c),c=0,f++,a.innerHTML="Generation: "+f);window.requestAnimationFrame(e)}));var u=performance.now(),c=0,f=0},function(e,t,n){"use strict";var r=this&&this.__spreadArrays||function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),o=0;for(t=0;t<n;t++)for(var a=arguments[t],i=0,u=a.length;i<u;i++,o++)r[o]=a[i];return r};Object.defineProperty(t,"__esModule",{value:!0}),t.LifeController=void 0,n(3);var o=function(e,t,n){var o=this;this.canvas=e,this.xSize=t,this.ySize=n,this.buffer=[],this.swapBuffer=[],this.update=function(e){console.log("\ntick");var t=performance.now();o.swapBuffer=o.deepCopyArray(o.buffer);for(var n=o.xSize-1,r=o.ySize-1,a=0;a<o.ySize;a++)for(var i=0;i<o.xSize;i++){var u=0,c=void 0,f=void 0,s=void 0,l=void 0;c=a-1<0?r:a-1,f=a+1>r?0:a+1,s=i-1<0?n:i-1,l=i+1>n?0:i+1;for(var d=[o.buffer[c][s],o.buffer[c][i],o.buffer[c][l],o.buffer[a][s],o.buffer[a][i],o.buffer[a][l],o.buffer[f][s],o.buffer[f][i],o.buffer[f][l]],p=0;p<d.length;p++)4!==p&&0===d[p]&&u++;var v=o.updatePixel(i,a,u);o.swapBuffer[a][i]=v;var h=4*(i+1+a*o.xSize);o.imageData.data[h]=v,o.imageData.data[h+1]=v,o.imageData.data[h+2]=v,o.imageData.data[h+3]=255}o.canvasContext.putImageData(o.imageData,0,0),o.buffer=o.deepCopyArray(o.swapBuffer);var m=performance.now();console.log(m-t)},this.updatePixel=function(e,t,n){return 0===o.buffer[t][e]?2===n||3===n?0:255:3===n?0:255},this.deepCopyArray=function(e){for(var t=[],n=0;n<e.length;n++){var o=r(e[n]);t.push(o)}return t},e.width=t,e.height=n,this.canvasContext=e.getContext("2d",{willReadFrequently:!0}),this.canvasContext.imageSmoothingEnabled=!1;for(var a=0;a<n;a++){for(var i=[],u=0;u<t;u++){var c=Math.random()<.1?0:255;i.push(c)}this.buffer.push(i)}this.imageData=this.canvasContext.createImageData(t,n)};t.LifeController=o},function(e,t,n){var r=n(4),o=n(5);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var a={insert:"head",singleton:!1};r(o,a);e.exports=o.locals||{}},function(e,t,n){"use strict";var r,o=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},a=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),i=[];function u(e){for(var t=-1,n=0;n<i.length;n++)if(i[n].identifier===e){t=n;break}return t}function c(e,t){for(var n={},r=[],o=0;o<e.length;o++){var a=e[o],c=t.base?a[0]+t.base:a[0],f=n[c]||0,s="".concat(c," ").concat(f);n[c]=f+1;var l=u(s),d={css:a[1],media:a[2],sourceMap:a[3]};-1!==l?(i[l].references++,i[l].updater(d)):i.push({identifier:s,updater:m(d,t),references:1}),r.push(s)}return r}function f(e){var t=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var o=n.nc;o&&(r.nonce=o)}if(Object.keys(r).forEach((function(e){t.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(t);else{var i=a(e.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(t)}return t}var s,l=(s=[],function(e,t){return s[e]=t,s.filter(Boolean).join("\n")});function d(e,t,n,r){var o=n?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=l(t,o);else{var a=document.createTextNode(o),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(a,i[t]):e.appendChild(a)}}function p(e,t,n){var r=n.css,o=n.media,a=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var v=null,h=0;function m(e,t){var n,r,o;if(t.singleton){var a=h++;n=v||(v=f(t)),r=d.bind(null,n,a,!1),o=d.bind(null,n,a,!0)}else n=f(t),r=p.bind(null,n,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=o());var n=c(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<n.length;r++){var o=u(n[r]);i[o].references--}for(var a=c(e,t),f=0;f<n.length;f++){var s=u(n[f]);0===i[s].references&&(i[s].updater(),i.splice(s,1))}n=a}}}},function(e,t,n){(t=n(6)(!1)).push([e.i,"body{margin:0;padding:0}html{box-sizing:border-box}*::before,*::after,*{box-sizing:inherit}#app-root{width:100vw;height:100vh}.canvas-container{width:500px}.canvas{image-rendering:pixelated;width:500px;height:500px;border:1px solid #000}.stats{background:rgba(0,0,0,.5);padding:1em;color:#fff}",""]),e.exports=t},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(i=r,u=btoa(unescape(encodeURIComponent(JSON.stringify(i)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(u),"/*# ".concat(c," */")),a=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")}));return[n].concat(a).concat([o]).join("\n")}var i,u,c;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,r){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(r)for(var a=0;a<this.length;a++){var i=this[a][0];null!=i&&(o[i]=!0)}for(var u=0;u<e.length;u++){var c=[].concat(e[u]);r&&o[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),t.push(c))}},t}}]);
//# sourceMappingURL=app.bundle.js.map