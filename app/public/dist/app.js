// AHS502 : Application javascript file :

/*
	AHS502 : Start of 'd3-color.v1.min.js'
*/

// https://d3js.org/d3-color/ Version 1.0.3. Copyright 2017 Mike Bostock.
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.d3=t.d3||{})}(this,function(t){"use strict";function e(t,e){var n=Object.create(t.prototype);for(var i in e)n[i]=e[i];return n}function n(){}function i(t){var e;return t=(t+"").trim().toLowerCase(),(e=P.exec(t))?(e=parseInt(e[1],16),new h(e>>8&15|e>>4&240,e>>4&15|240&e,(15&e)<<4|15&e,1)):(e=O.exec(t))?r(parseInt(e[1],16)):(e=S.exec(t))?new h(e[1],e[2],e[3],1):(e=_.exec(t))?new h(255*e[1]/100,255*e[2]/100,255*e[3]/100,1):(e=z.exec(t))?a(e[1],e[2],e[3],e[4]):(e=C.exec(t))?a(255*e[1]/100,255*e[2]/100,255*e[3]/100,e[4]):(e=L.exec(t))?l(e[1],e[2]/100,e[3]/100,1):(e=A.exec(t))?l(e[1],e[2]/100,e[3]/100,e[4]):B.hasOwnProperty(t)?r(B[t]):"transparent"===t?new h(NaN,NaN,NaN,0):null}function r(t){return new h(t>>16&255,t>>8&255,255&t,1)}function a(t,e,n,i){return i<=0&&(t=e=n=NaN),new h(t,e,n,i)}function s(t){return t instanceof n||(t=i(t)),t?(t=t.rgb(),new h(t.r,t.g,t.b,t.opacity)):new h}function o(t,e,n,i){return 1===arguments.length?s(t):new h(t,e,n,null==i?1:i)}function h(t,e,n,i){this.r=+t,this.g=+e,this.b=+n,this.opacity=+i}function l(t,e,n,i){return i<=0?t=e=n=NaN:n<=0||n>=1?t=e=NaN:e<=0&&(t=NaN),new g(t,e,n,i)}function u(t){if(t instanceof g)return new g(t.h,t.s,t.l,t.opacity);if(t instanceof n||(t=i(t)),!t)return new g;if(t instanceof g)return t;t=t.rgb();var e=t.r/255,r=t.g/255,a=t.b/255,s=Math.min(e,r,a),o=Math.max(e,r,a),h=NaN,l=o-s,u=(o+s)/2;return l?(h=e===o?(r-a)/l+6*(r<a):r===o?(a-e)/l+2:(e-r)/l+4,l/=u<.5?o+s:2-o-s,h*=60):l=u>0&&u<1?0:h,new g(h,l,u,t.opacity)}function c(t,e,n,i){return 1===arguments.length?u(t):new g(t,e,n,null==i?1:i)}function g(t,e,n,i){this.h=+t,this.s=+e,this.l=+n,this.opacity=+i}function d(t,e,n){return 255*(t<60?e+(n-e)*t/60:t<180?n:t<240?e+(n-e)*(240-t)/60:e)}function p(t){if(t instanceof b)return new b(t.l,t.a,t.b,t.opacity);if(t instanceof v){var e=t.h*D;return new b(t.l,Math.cos(e)*t.c,Math.sin(e)*t.c,t.opacity)}t instanceof h||(t=s(t));var n=k(t.r),i=k(t.g),r=k(t.b),a=y((.4124564*n+.3575761*i+.1804375*r)/G),o=y((.2126729*n+.7151522*i+.072175*r)/H);return new b(116*o-16,500*(a-o),200*(o-y((.0193339*n+.119192*i+.9503041*r)/J)),t.opacity)}function f(t,e,n,i){return 1===arguments.length?p(t):new b(t,e,n,null==i?1:i)}function b(t,e,n,i){this.l=+t,this.a=+e,this.b=+n,this.opacity=+i}function y(t){return t>U?Math.pow(t,1/3):t/T+K}function w(t){return t>Q?t*t*t:T*(t-K)}function m(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function k(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function N(t){if(t instanceof v)return new v(t.h,t.c,t.l,t.opacity);t instanceof b||(t=p(t));var e=Math.atan2(t.b,t.a)*F;return new v(e<0?e+360:e,Math.sqrt(t.a*t.a+t.b*t.b),t.l,t.opacity)}function M(t,e,n,i){return 1===arguments.length?N(t):new v(t,e,n,null==i?1:i)}function v(t,e,n,i){this.h=+t,this.c=+e,this.l=+n,this.opacity=+i}function x(t){if(t instanceof E)return new E(t.h,t.s,t.l,t.opacity);t instanceof h||(t=s(t));var e=t.r/255,n=t.g/255,i=t.b/255,r=(nt*i+tt*e-et*n)/(nt+tt-et),a=i-r,o=(Z*(n-r)-X*a)/Y,l=Math.sqrt(o*o+a*a)/(Z*r*(1-r)),u=l?Math.atan2(o,a)*F-120:NaN;return new E(u<0?u+360:u,l,r,t.opacity)}function q(t,e,n,i){return 1===arguments.length?x(t):new E(t,e,n,null==i?1:i)}function E(t,e,n,i){this.h=+t,this.s=+e,this.l=+n,this.opacity=+i}var $=function(t,e,n){t.prototype=e.prototype=n,n.constructor=t},R="\\s*([+-]?\\d+)\\s*",j="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",I="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",P=/^#([0-9a-f]{3})$/,O=/^#([0-9a-f]{6})$/,S=new RegExp("^rgb\\("+[R,R,R]+"\\)$"),_=new RegExp("^rgb\\("+[I,I,I]+"\\)$"),z=new RegExp("^rgba\\("+[R,R,R,j]+"\\)$"),C=new RegExp("^rgba\\("+[I,I,I,j]+"\\)$"),L=new RegExp("^hsl\\("+[j,I,I]+"\\)$"),A=new RegExp("^hsla\\("+[j,I,I,j]+"\\)$"),B={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};$(n,i,{displayable:function(){return this.rgb().displayable()},toString:function(){return this.rgb()+""}}),$(h,o,e(n,{brighter:function(t){return t=null==t?1/.7:Math.pow(1/.7,t),new h(this.r*t,this.g*t,this.b*t,this.opacity)},darker:function(t){return t=null==t?.7:Math.pow(.7,t),new h(this.r*t,this.g*t,this.b*t,this.opacity)},rgb:function(){return this},displayable:function(){return 0<=this.r&&this.r<=255&&0<=this.g&&this.g<=255&&0<=this.b&&this.b<=255&&0<=this.opacity&&this.opacity<=1},toString:function(){var t=this.opacity;return t=isNaN(t)?1:Math.max(0,Math.min(1,t)),(1===t?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===t?")":", "+t+")")}})),$(g,c,e(n,{brighter:function(t){return t=null==t?1/.7:Math.pow(1/.7,t),new g(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?.7:Math.pow(.7,t),new g(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=this.h%360+360*(this.h<0),e=isNaN(t)||isNaN(this.s)?0:this.s,n=this.l,i=n+(n<.5?n:1-n)*e,r=2*n-i;return new h(d(t>=240?t-240:t+120,r,i),d(t,r,i),d(t<120?t+240:t-120,r,i),this.opacity)},displayable:function(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1}}));var D=Math.PI/180,F=180/Math.PI,G=.95047,H=1,J=1.08883,K=4/29,Q=6/29,T=3*Q*Q,U=Q*Q*Q;$(b,f,e(n,{brighter:function(t){return new b(this.l+18*(null==t?1:t),this.a,this.b,this.opacity)},darker:function(t){return new b(this.l-18*(null==t?1:t),this.a,this.b,this.opacity)},rgb:function(){var t=(this.l+16)/116,e=isNaN(this.a)?t:t+this.a/500,n=isNaN(this.b)?t:t-this.b/200;return t=H*w(t),e=G*w(e),n=J*w(n),new h(m(3.2404542*e-1.5371385*t-.4985314*n),m(-.969266*e+1.8760108*t+.041556*n),m(.0556434*e-.2040259*t+1.0572252*n),this.opacity)}})),$(v,M,e(n,{brighter:function(t){return new v(this.h,this.c,this.l+18*(null==t?1:t),this.opacity)},darker:function(t){return new v(this.h,this.c,this.l-18*(null==t?1:t),this.opacity)},rgb:function(){return p(this).rgb()}}));var V=-.14861,W=1.78277,X=-.29227,Y=-.90649,Z=1.97294,tt=Z*Y,et=Z*W,nt=W*X-Y*V;$(E,q,e(n,{brighter:function(t){return t=null==t?1/.7:Math.pow(1/.7,t),new E(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?.7:Math.pow(.7,t),new E(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=isNaN(this.h)?0:(this.h+120)*D,e=+this.l,n=isNaN(this.s)?0:this.s*e*(1-e),i=Math.cos(t),r=Math.sin(t);return new h(255*(e+n*(V*i+W*r)),255*(e+n*(X*i+Y*r)),255*(e+n*(Z*i)),this.opacity)}})),t.color=i,t.rgb=o,t.hsl=c,t.lab=f,t.hcl=M,t.cubehelix=q,Object.defineProperty(t,"__esModule",{value:!0})});

/*
	AHS502 : End of 'd3-color.v1.min.js'
*/


/*
	AHS502 : Start of 'd3-dispatch.v1.min.js'
*/

// https://d3js.org/d3-dispatch/ Version 1.0.3. Copyright 2017 Mike Bostock.
!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(n.d3=n.d3||{})}(this,function(n){"use strict";function e(){for(var n,e=0,r=arguments.length,o={};e<r;++e){if(!(n=arguments[e]+"")||n in o)throw new Error("illegal type: "+n);o[n]=[]}return new t(o)}function t(n){this._=n}function r(n,e){return n.trim().split(/^|\s+/).map(function(n){var t="",r=n.indexOf(".");if(r>=0&&(t=n.slice(r+1),n=n.slice(0,r)),n&&!e.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:t}})}function o(n,e){for(var t,r=0,o=n.length;r<o;++r)if((t=n[r]).name===e)return t.value}function i(n,e,t){for(var r=0,o=n.length;r<o;++r)if(n[r].name===e){n[r]=f,n=n.slice(0,r).concat(n.slice(r+1));break}return null!=t&&n.push({name:e,value:t}),n}var f={value:function(){}};t.prototype=e.prototype={constructor:t,on:function(n,e){var t,f=this._,l=r(n+"",f),u=-1,a=l.length;{if(!(arguments.length<2)){if(null!=e&&"function"!=typeof e)throw new Error("invalid callback: "+e);for(;++u<a;)if(t=(n=l[u]).type)f[t]=i(f[t],n.name,e);else if(null==e)for(t in f)f[t]=i(f[t],n.name,null);return this}for(;++u<a;)if((t=(n=l[u]).type)&&(t=o(f[t],n.name)))return t}},copy:function(){var n={},e=this._;for(var r in e)n[r]=e[r].slice();return new t(n)},call:function(n,e){if((t=arguments.length-2)>0)for(var t,r,o=new Array(t),i=0;i<t;++i)o[i]=arguments[i+2];if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(r=this._[n],i=0,t=r.length;i<t;++i)r[i].value.apply(e,o)},apply:function(n,e,t){if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(var r=this._[n],o=0,i=r.length;o<i;++o)r[o].value.apply(e,t)}},n.dispatch=e,Object.defineProperty(n,"__esModule",{value:!0})});

/*
	AHS502 : End of 'd3-dispatch.v1.min.js'
*/


/*
	AHS502 : Start of 'd3-drag.v1.min.js'
*/

// https://d3js.org/d3-drag/ Version 1.1.0. Copyright 2017 Mike Bostock.
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("d3-dispatch"),require("d3-selection")):"function"==typeof define&&define.amd?define(["exports","d3-dispatch","d3-selection"],t):t(e.d3=e.d3||{},e.d3,e.d3)}(this,function(e,t,n){"use strict";function o(){n.event.stopImmediatePropagation()}function i(e,t){var o=e.document.documentElement,i=n.select(e).on("dragstart.drag",null);t&&(i.on("click.drag",a,!0),setTimeout(function(){i.on("click.drag",null)},0)),"onselectstart"in o?i.on("selectstart.drag",null):(o.style.MozUserSelect=o.__noselect,delete o.__noselect)}function r(e,t,n,o,i,r,c,u,s,a){this.target=e,this.type=t,this.subject=n,this.identifier=o,this.active=i,this.x=r,this.y=c,this.dx=u,this.dy=s,this._=a}function c(){return!n.event.button}function u(){return this.parentNode}function s(e){return null==e?{x:n.event.x,y:n.event.y}:e}var a=function(){n.event.preventDefault(),n.event.stopImmediatePropagation()},l=function(e){var t=e.document.documentElement,o=n.select(e).on("dragstart.drag",a,!0);"onselectstart"in t?o.on("selectstart.drag",a,!0):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect="none")},d=function(e){return function(){return e}};r.prototype.on=function(){var e=this._.on.apply(this._,arguments);return e===this._?this:e};var f=function(){function e(e){e.on("mousedown.drag",f).on("touchstart.drag",p).on("touchmove.drag",g).on("touchend.drag touchcancel.drag",m).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function f(){if(!x&&T.apply(this,arguments)){var e=y("mouse",j.apply(this,arguments),n.mouse,this,arguments);e&&(n.select(n.event.view).on("mousemove.drag",h,!0).on("mouseup.drag",v,!0),l(n.event.view),o(),w=!1,b=n.event.clientX,_=n.event.clientY,e("start"))}}function h(){if(a(),!w){var e=n.event.clientX-b,t=n.event.clientY-_;w=e*e+t*t>z}E.mouse("drag")}function v(){n.select(n.event.view).on("mousemove.drag mouseup.drag",null),i(n.event.view,w),a(),E.mouse("end")}function p(){if(T.apply(this,arguments)){var e,t,i=n.event.changedTouches,r=j.apply(this,arguments),c=i.length;for(e=0;e<c;++e)(t=y(i[e].identifier,r,n.touch,this,arguments))&&(o(),t("start"))}}function g(){var e,t,o=n.event.changedTouches,i=o.length;for(e=0;e<i;++e)(t=E[o[e].identifier])&&(a(),t("drag"))}function m(){var e,t,i=n.event.changedTouches,r=i.length;for(x&&clearTimeout(x),x=setTimeout(function(){x=null},500),e=0;e<r;++e)(t=E[i[e].identifier])&&(o(),t("end"))}function y(t,o,i,c,u){var s,a,l,d=i(o,t),f=M.copy();if(n.customEvent(new r(e,"beforestart",s,t,q,d[0],d[1],0,0,f),function(){return null!=(n.event.subject=s=k.apply(c,u))&&(a=s.x-d[0]||0,l=s.y-d[1]||0,!0)}))return function h(v){var p,g=d;switch(v){case"start":E[t]=h,p=q++;break;case"end":delete E[t],--q;case"drag":d=i(o,t),p=q}n.customEvent(new r(e,v,s,t,p,d[0]+a,d[1]+l,d[0]-g[0],d[1]-g[1],f),f.apply,f,[v,c,u])}}var b,_,w,x,T=c,j=u,k=s,E={},M=t.dispatch("start","drag","end"),q=0,z=0;return e.filter=function(t){return arguments.length?(T="function"==typeof t?t:d(!!t),e):T},e.container=function(t){return arguments.length?(j="function"==typeof t?t:d(t),e):j},e.subject=function(t){return arguments.length?(k="function"==typeof t?t:d(t),e):k},e.on=function(){var t=M.on.apply(M,arguments);return t===M?e:t},e.clickDistance=function(t){return arguments.length?(z=(t=+t)*t,e):Math.sqrt(z)},e};e.drag=f,e.dragDisable=l,e.dragEnable=i,Object.defineProperty(e,"__esModule",{value:!0})});

/*
	AHS502 : End of 'd3-drag.v1.min.js'
*/


/*
	AHS502 : Start of 'd3-ease.v1.min.js'
*/

// https://d3js.org/d3-ease/ Version 1.0.3. Copyright 2017 Mike Bostock.
!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(n.d3=n.d3||{})}(this,function(n){"use strict";function t(n){return+n}function e(n){return n*n}function u(n){return n*(2-n)}function r(n){return((n*=2)<=1?n*n:--n*(2-n)+1)/2}function a(n){return n*n*n}function o(n){return--n*n*n+1}function i(n){return((n*=2)<=1?n*n*n:(n-=2)*n*n+2)/2}function c(n){return 1-Math.cos(n*C)}function s(n){return Math.sin(n*C)}function f(n){return(1-Math.cos(B*n))/2}function h(n){return Math.pow(2,10*n-10)}function p(n){return 1-Math.pow(2,-10*n)}function M(n){return((n*=2)<=1?Math.pow(2,10*n-10):2-Math.pow(2,10-10*n))/2}function d(n){return 1-Math.sqrt(1-n*n)}function I(n){return Math.sqrt(1- --n*n)}function O(n){return((n*=2)<=1?1-Math.sqrt(1-n*n):Math.sqrt(1-(n-=2)*n)+1)/2}function l(n){return 1-x(1-n)}function x(n){return(n=+n)<E?L*n*n:n<b?L*(n-=P)*n+k:n<Q?L*(n-=q)*n+S:L*(n-=j)*n+_}function w(n){return((n*=2)<=1?1-x(1-n):x(n-1)+1)/2}var m=function n(t){function e(n){return Math.pow(n,t)}return t=+t,e.exponent=n,e}(3),v=function n(t){function e(n){return 1-Math.pow(1-n,t)}return t=+t,e.exponent=n,e}(3),y=function n(t){function e(n){return((n*=2)<=1?Math.pow(n,t):2-Math.pow(2-n,t))/2}return t=+t,e.exponent=n,e}(3),B=Math.PI,C=B/2,E=4/11,P=6/11,b=8/11,k=.75,q=9/11,Q=10/11,S=.9375,j=21/22,_=63/64,L=1/E/E,g=function n(t){function e(n){return n*n*((t+1)*n-t)}return t=+t,e.overshoot=n,e}(1.70158),z=function n(t){function e(n){return--n*n*((t+1)*n+t)+1}return t=+t,e.overshoot=n,e}(1.70158),A=function n(t){function e(n){return((n*=2)<1?n*n*((t+1)*n-t):(n-=2)*n*((t+1)*n+t)+2)/2}return t=+t,e.overshoot=n,e}(1.70158),D=2*Math.PI,F=function n(t,e){function u(n){return t*Math.pow(2,10*--n)*Math.sin((r-n)/e)}var r=Math.asin(1/(t=Math.max(1,t)))*(e/=D);return u.amplitude=function(t){return n(t,e*D)},u.period=function(e){return n(t,e)},u}(1,.3),G=function n(t,e){function u(n){return 1-t*Math.pow(2,-10*(n=+n))*Math.sin((n+r)/e)}var r=Math.asin(1/(t=Math.max(1,t)))*(e/=D);return u.amplitude=function(t){return n(t,e*D)},u.period=function(e){return n(t,e)},u}(1,.3),H=function n(t,e){function u(n){return((n=2*n-1)<0?t*Math.pow(2,10*n)*Math.sin((r-n)/e):2-t*Math.pow(2,-10*n)*Math.sin((r+n)/e))/2}var r=Math.asin(1/(t=Math.max(1,t)))*(e/=D);return u.amplitude=function(t){return n(t,e*D)},u.period=function(e){return n(t,e)},u}(1,.3);n.easeLinear=t,n.easeQuad=r,n.easeQuadIn=e,n.easeQuadOut=u,n.easeQuadInOut=r,n.easeCubic=i,n.easeCubicIn=a,n.easeCubicOut=o,n.easeCubicInOut=i,n.easePoly=y,n.easePolyIn=m,n.easePolyOut=v,n.easePolyInOut=y,n.easeSin=f,n.easeSinIn=c,n.easeSinOut=s,n.easeSinInOut=f,n.easeExp=M,n.easeExpIn=h,n.easeExpOut=p,n.easeExpInOut=M,n.easeCircle=O,n.easeCircleIn=d,n.easeCircleOut=I,n.easeCircleInOut=O,n.easeBounce=x,n.easeBounceIn=l,n.easeBounceOut=x,n.easeBounceInOut=w,n.easeBack=A,n.easeBackIn=g,n.easeBackOut=z,n.easeBackInOut=A,n.easeElastic=G,n.easeElasticIn=F,n.easeElasticOut=G,n.easeElasticInOut=H,Object.defineProperty(n,"__esModule",{value:!0})});

/*
	AHS502 : End of 'd3-ease.v1.min.js'
*/


/*
	AHS502 : Start of 'd3-interpolate.v1.min.js'
*/

// https://d3js.org/d3-interpolate/ Version 1.1.5. Copyright 2017 Mike Bostock.
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("d3-color")):"function"==typeof define&&define.amd?define(["exports","d3-color"],n):n(t.d3=t.d3||{},t.d3)}(this,function(t,n){"use strict";function r(t,n,r,e,o){var u=t*t,a=u*t;return((1-3*t+3*u-a)*n+(4-6*u+3*a)*r+(1+3*t+3*u-3*a)*e+a*o)/6}function e(t,n){return function(r){return t+r*n}}function o(t,n,r){return t=Math.pow(t,r),n=Math.pow(n,r)-t,r=1/r,function(e){return Math.pow(t+e*n,r)}}function u(t,n){var r=n-t;return r?e(t,r>180||r<-180?r-360*Math.round(r/360):r):Y(isNaN(t)?n:t)}function a(t){return 1==(t=+t)?i:function(n,r){return r-n?o(n,r,t):Y(isNaN(n)?r:n)}}function i(t,n){var r=n-t;return r?e(t,r):Y(isNaN(t)?n:t)}function l(t){return function(r){var e,o,u=r.length,a=new Array(u),i=new Array(u),l=new Array(u);for(e=0;e<u;++e)o=n.rgb(r[e]),a[e]=o.r||0,i[e]=o.g||0,l[e]=o.b||0;return a=t(a),i=t(i),l=t(l),o.opacity=1,function(t){return o.r=a(t),o.g=i(t),o.b=l(t),o+""}}}function c(t){return function(){return t}}function f(t){return function(n){return t(n)+""}}function s(t){return"none"===t?O:(M||(M=document.createElement("DIV"),w=document.documentElement,X=document.defaultView),M.style.transform=t,t=X.getComputedStyle(w.appendChild(M),null).getPropertyValue("transform"),w.removeChild(M),t=t.slice(7,-1).split(","),P(+t[0],+t[1],+t[2],+t[3],+t[4],+t[5]))}function p(t){return null==t?O:(A||(A=document.createElementNS("http://www.w3.org/2000/svg","g")),A.setAttribute("transform",t),(t=A.transform.baseVal.consolidate())?(t=t.matrix,P(t.a,t.b,t.c,t.d,t.e,t.f)):O)}function h(t,n,r,e){function o(t){return t.length?t.pop()+" ":""}function u(t,e,o,u,a,i){if(t!==o||e!==u){var l=a.push("translate(",null,n,null,r);i.push({i:l-4,x:E(t,o)},{i:l-2,x:E(e,u)})}else(o||u)&&a.push("translate("+o+n+u+r)}function a(t,n,r,u){t!==n?(t-n>180?n+=360:n-t>180&&(t+=360),u.push({i:r.push(o(r)+"rotate(",null,e)-2,x:E(t,n)})):n&&r.push(o(r)+"rotate("+n+e)}function i(t,n,r,u){t!==n?u.push({i:r.push(o(r)+"skewX(",null,e)-2,x:E(t,n)}):n&&r.push(o(r)+"skewX("+n+e)}function l(t,n,r,e,u,a){if(t!==r||n!==e){var i=u.push(o(u)+"scale(",null,",",null,")");a.push({i:i-4,x:E(t,r)},{i:i-2,x:E(n,e)})}else 1===r&&1===e||u.push(o(u)+"scale("+r+","+e+")")}return function(n,r){var e=[],o=[];return n=t(n),r=t(r),u(n.translateX,n.translateY,r.translateX,r.translateY,e,o),a(n.rotate,r.rotate,e,o),i(n.skewX,r.skewX,e,o),l(n.scaleX,n.scaleY,r.scaleX,r.scaleY,e,o),n=r=null,function(t){for(var n,r=-1,u=o.length;++r<u;)e[(n=o[r]).i]=n.x(t);return e.join("")}}}function g(t){return((t=Math.exp(t))+1/t)/2}function d(t){return((t=Math.exp(t))-1/t)/2}function y(t){return((t=Math.exp(2*t))-1)/(t+1)}function v(t){return function(r,e){var o=t((r=n.hsl(r)).h,(e=n.hsl(e)).h),u=i(r.s,e.s),a=i(r.l,e.l),l=i(r.opacity,e.opacity);return function(t){return r.h=o(t),r.s=u(t),r.l=a(t),r.opacity=l(t),r+""}}}function b(t,r){var e=i((t=n.lab(t)).l,(r=n.lab(r)).l),o=i(t.a,r.a),u=i(t.b,r.b),a=i(t.opacity,r.opacity);return function(n){return t.l=e(n),t.a=o(n),t.b=u(n),t.opacity=a(n),t+""}}function x(t){return function(r,e){var o=t((r=n.hcl(r)).h,(e=n.hcl(e)).h),u=i(r.c,e.c),a=i(r.l,e.l),l=i(r.opacity,e.opacity);return function(t){return r.h=o(t),r.c=u(t),r.l=a(t),r.opacity=l(t),r+""}}}function m(t){return function r(e){function o(r,o){var u=t((r=n.cubehelix(r)).h,(o=n.cubehelix(o)).h),a=i(r.s,o.s),l=i(r.l,o.l),c=i(r.opacity,o.opacity);return function(t){return r.h=u(t),r.s=a(t),r.l=l(Math.pow(t,e)),r.opacity=c(t),r+""}}return e=+e,o.gamma=r,o}(1)}var M,w,X,A,N=function(t){var n=t.length-1;return function(e){var o=e<=0?e=0:e>=1?(e=1,n-1):Math.floor(e*n),u=t[o],a=t[o+1],i=o>0?t[o-1]:2*u-a,l=o<n-1?t[o+2]:2*a-u;return r((e-o/n)*n,i,u,a,l)}},C=function(t){var n=t.length;return function(e){var o=Math.floor(((e%=1)<0?++e:e)*n),u=t[(o+n-1)%n],a=t[o%n],i=t[(o+1)%n],l=t[(o+2)%n];return r((e-o/n)*n,u,a,i,l)}},Y=function(t){return function(){return t}},j=function t(r){function e(t,r){var e=o((t=n.rgb(t)).r,(r=n.rgb(r)).r),u=o(t.g,r.g),a=o(t.b,r.b),l=i(t.opacity,r.opacity);return function(n){return t.r=e(n),t.g=u(n),t.b=a(n),t.opacity=l(n),t+""}}var o=a(r);return e.gamma=t,e}(1),q=l(N),k=l(C),R=function(t,n){var r,e=n?n.length:0,o=t?Math.min(e,t.length):0,u=new Array(e),a=new Array(e);for(r=0;r<o;++r)u[r]=L(t[r],n[r]);for(;r<e;++r)a[r]=n[r];return function(t){for(r=0;r<o;++r)a[r]=u[r](t);return a}},S=function(t,n){var r=new Date;return t=+t,n-=t,function(e){return r.setTime(t+n*e),r}},E=function(t,n){return t=+t,n-=t,function(r){return t+n*r}},I=function(t,n){var r,e={},o={};null!==t&&"object"==typeof t||(t={}),null!==n&&"object"==typeof n||(n={});for(r in n)r in t?e[r]=L(t[r],n[r]):o[r]=n[r];return function(t){for(r in e)o[r]=e[r](t);return o}},B=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,D=new RegExp(B.source,"g"),H=function(t,n){var r,e,o,u=B.lastIndex=D.lastIndex=0,a=-1,i=[],l=[];for(t+="",n+="";(r=B.exec(t))&&(e=D.exec(n));)(o=e.index)>u&&(o=n.slice(u,o),i[a]?i[a]+=o:i[++a]=o),(r=r[0])===(e=e[0])?i[a]?i[a]+=e:i[++a]=e:(i[++a]=null,l.push({i:a,x:E(r,e)})),u=D.lastIndex;return u<n.length&&(o=n.slice(u),i[a]?i[a]+=o:i[++a]=o),i.length<2?l[0]?f(l[0].x):c(n):(n=l.length,function(t){for(var r,e=0;e<n;++e)i[(r=l[e]).i]=r.x(t);return i.join("")})},L=function(t,r){var e,o=typeof r;return null==r||"boolean"===o?Y(r):("number"===o?E:"string"===o?(e=n.color(r))?(r=e,j):H:r instanceof n.color?j:r instanceof Date?S:Array.isArray(r)?R:"function"!=typeof r.valueOf&&"function"!=typeof r.toString||isNaN(r)?I:E)(t,r)},T=function(t,n){return t=+t,n-=t,function(r){return Math.round(t+n*r)}},V=180/Math.PI,O={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1},P=function(t,n,r,e,o,u){var a,i,l;return(a=Math.sqrt(t*t+n*n))&&(t/=a,n/=a),(l=t*r+n*e)&&(r-=t*l,e-=n*l),(i=Math.sqrt(r*r+e*e))&&(r/=i,e/=i,l/=i),t*e<n*r&&(t=-t,n=-n,l=-l,a=-a),{translateX:o,translateY:u,rotate:Math.atan2(n,t)*V,skewX:Math.atan(l)*V,scaleX:a,scaleY:i}},_=h(s,"px, ","px)","deg)"),z=h(p,", ",")",")"),Q=Math.SQRT2,Z=function(t,n){var r,e,o=t[0],u=t[1],a=t[2],i=n[0],l=n[1],c=n[2],f=i-o,s=l-u,p=f*f+s*s;if(p<1e-12)e=Math.log(c/a)/Q,r=function(t){return[o+t*f,u+t*s,a*Math.exp(Q*t*e)]};else{var h=Math.sqrt(p),v=(c*c-a*a+4*p)/(2*a*2*h),b=(c*c-a*a-4*p)/(2*c*2*h),x=Math.log(Math.sqrt(v*v+1)-v),m=Math.log(Math.sqrt(b*b+1)-b);e=(m-x)/Q,r=function(t){var n=t*e,r=g(x),i=a/(2*h)*(r*y(Q*n+x)-d(x));return[o+i*f,u+i*s,a*r/g(Q*n+x)]}}return r.duration=1e3*e,r},F=v(u),G=v(i),J=x(u),K=x(i),U=m(u),W=m(i),$=function(t,n){for(var r=new Array(n),e=0;e<n;++e)r[e]=t(e/(n-1));return r};t.interpolate=L,t.interpolateArray=R,t.interpolateBasis=N,t.interpolateBasisClosed=C,t.interpolateDate=S,t.interpolateNumber=E,t.interpolateObject=I,t.interpolateRound=T,t.interpolateString=H,t.interpolateTransformCss=_,t.interpolateTransformSvg=z,t.interpolateZoom=Z,t.interpolateRgb=j,t.interpolateRgbBasis=q,t.interpolateRgbBasisClosed=k,t.interpolateHsl=F,t.interpolateHslLong=G,t.interpolateLab=b,t.interpolateHcl=J,t.interpolateHclLong=K,t.interpolateCubehelix=U,t.interpolateCubehelixLong=W,t.quantize=$,Object.defineProperty(t,"__esModule",{value:!0})});

/*
	AHS502 : End of 'd3-interpolate.v1.min.js'
*/


/*
	AHS502 : Start of 'd3-selection.v1.min.js'
*/

// https://d3js.org/d3-selection/ Version 1.1.0. Copyright 2017 Mike Bostock.
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(t.d3=t.d3||{})}(this,function(t){"use strict";function n(t){return function(){var n=this.ownerDocument,e=this.namespaceURI;return e===Z&&n.documentElement.namespaceURI===Z?n.createElement(t):n.createElementNS(e,t)}}function e(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function r(){return new i}function i(){this._="@"+(++rt).toString(36)}function o(t,n,e){return t=u(t,n,e),function(n){var e=n.relatedTarget;e&&(e===this||8&e.compareDocumentPosition(this))||t.call(this,n)}}function u(n,e,r){return function(i){var o=t.event;t.event=i;try{n.call(this,this.__data__,e,r)}finally{t.event=o}}}function c(t){return t.trim().split(/^|\s+/).map(function(t){var n="",e=t.indexOf(".");return e>=0&&(n=t.slice(e+1),t=t.slice(0,e)),{type:t,name:n}})}function s(t){return function(){var n=this.__on;if(n){for(var e,r=0,i=-1,o=n.length;r<o;++r)e=n[r],t.type&&e.type!==t.type||e.name!==t.name?n[++i]=e:this.removeEventListener(e.type,e.listener,e.capture);++i?n.length=i:delete this.__on}}}function a(t,n,e){var r=st.hasOwnProperty(t.type)?o:u;return function(i,o,u){var c,s=this.__on,a=r(n,o,u);if(s)for(var l=0,f=s.length;l<f;++l)if((c=s[l]).type===t.type&&c.name===t.name)return this.removeEventListener(c.type,c.listener,c.capture),this.addEventListener(c.type,c.listener=a,c.capture=e),void(c.value=n);this.addEventListener(t.type,a,e),c={type:t.type,name:t.name,value:n,listener:a,capture:e},s?s.push(c):this.__on=[c]}}function l(n,e,r,i){var o=t.event;n.sourceEvent=t.event,t.event=n;try{return e.apply(r,i)}finally{t.event=o}}function f(){}function h(){return[]}function p(t,n){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=n}function _(t,n,e,r,i,o){for(var u,c=0,s=n.length,a=o.length;c<a;++c)(u=n[c])?(u.__data__=o[c],r[c]=u):e[c]=new p(t,o[c]);for(;c<s;++c)(u=n[c])&&(i[c]=u)}function v(t,n,e,r,i,o,u){var c,s,a,l={},f=n.length,h=o.length,_=new Array(f);for(c=0;c<f;++c)(s=n[c])&&(_[c]=a=At+u.call(s,s.__data__,c,n),a in l?i[c]=s:l[a]=s);for(c=0;c<h;++c)a=At+u.call(t,o[c],c,o),(s=l[a])?(r[c]=s,s.__data__=o[c],l[a]=null):e[c]=new p(t,o[c]);for(c=0;c<f;++c)(s=n[c])&&l[_[c]]===s&&(i[c]=s)}function d(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}function y(t){return function(){this.removeAttribute(t)}}function m(t){return function(){this.removeAttributeNS(t.space,t.local)}}function g(t,n){return function(){this.setAttribute(t,n)}}function w(t,n){return function(){this.setAttributeNS(t.space,t.local,n)}}function A(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttribute(t):this.setAttribute(t,e)}}function x(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,e)}}function S(t){return function(){this.style.removeProperty(t)}}function b(t,n,e){return function(){this.style.setProperty(t,n,e)}}function E(t,n,e){return function(){var r=n.apply(this,arguments);null==r?this.style.removeProperty(t):this.style.setProperty(t,r,e)}}function N(t,n){return t.style.getPropertyValue(n)||Bt(t).getComputedStyle(t,null).getPropertyValue(n)}function C(t){return function(){delete this[t]}}function M(t,n){return function(){this[t]=n}}function P(t,n){return function(){var e=n.apply(this,arguments);null==e?delete this[t]:this[t]=e}}function L(t){return t.trim().split(/^|\s+/)}function T(t){return t.classList||new q(t)}function q(t){this._node=t,this._names=L(t.getAttribute("class")||"")}function O(t,n){for(var e=T(t),r=-1,i=n.length;++r<i;)e.add(n[r])}function B(t,n){for(var e=T(t),r=-1,i=n.length;++r<i;)e.remove(n[r])}function D(t){return function(){O(this,t)}}function V(t){return function(){B(this,t)}}function R(t,n){return function(){(n.apply(this,arguments)?O:B)(this,t)}}function j(){this.textContent=""}function z(t){return function(){this.textContent=t}}function H(t){return function(){var n=t.apply(this,arguments);this.textContent=null==n?"":n}}function I(){this.innerHTML=""}function U(t){return function(){this.innerHTML=t}}function k(t){return function(){var n=t.apply(this,arguments);this.innerHTML=null==n?"":n}}function G(){this.nextSibling&&this.parentNode.appendChild(this)}function X(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Y(){return null}function $(){var t=this.parentNode;t&&t.removeChild(this)}function F(t,n,e){var r=Bt(t),i=r.CustomEvent;"function"==typeof i?i=new i(n,e):(i=r.document.createEvent("Event"),e?(i.initEvent(n,e.bubbles,e.cancelable),i.detail=e.detail):i.initEvent(n,!1,!1)),t.dispatchEvent(i)}function J(t,n){return function(){return F(this,t,n)}}function K(t,n){return function(){return F(this,t,n.apply(this,arguments))}}function Q(t,n){this._groups=t,this._parents=n}function W(){return new Q([[document.documentElement]],$t)}var Z="http://www.w3.org/1999/xhtml",tt={svg:"http://www.w3.org/2000/svg",xhtml:Z,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"},nt=function(t){var n=t+="",e=n.indexOf(":");return e>=0&&"xmlns"!==(n=t.slice(0,e))&&(t=t.slice(e+1)),tt.hasOwnProperty(n)?{space:tt[n],local:t}:t},et=function(t){var r=nt(t);return(r.local?e:n)(r)},rt=0;i.prototype=r.prototype={constructor:i,get:function(t){for(var n=this._;!(n in t);)if(!(t=t.parentNode))return;return t[n]},set:function(t,n){return t[this._]=n},remove:function(t){return this._ in t&&delete t[this._]},toString:function(){return this._}};var it=function(t){return function(){return this.matches(t)}};if("undefined"!=typeof document){var ot=document.documentElement;if(!ot.matches){var ut=ot.webkitMatchesSelector||ot.msMatchesSelector||ot.mozMatchesSelector||ot.oMatchesSelector;it=function(t){return function(){return ut.call(this,t)}}}}var ct=it,st={};if(t.event=null,"undefined"!=typeof document){"onmouseenter"in document.documentElement||(st={mouseenter:"mouseover",mouseleave:"mouseout"})}var at=function(t,n,e){var r,i,o=c(t+""),u=o.length;{if(!(arguments.length<2)){for(l=n?a:s,null==e&&(e=!1),r=0;r<u;++r)this.each(l(o[r],n,e));return this}var l=this.node().__on;if(l)for(var f,h=0,p=l.length;h<p;++h)for(r=0,f=l[h];r<u;++r)if((i=o[r]).type===f.type&&i.name===f.name)return f.value}},lt=function(){for(var n,e=t.event;n=e.sourceEvent;)e=n;return e},ft=function(t,n){var e=t.ownerSVGElement||t;if(e.createSVGPoint){var r=e.createSVGPoint();return r.x=n.clientX,r.y=n.clientY,r=r.matrixTransform(t.getScreenCTM().inverse()),[r.x,r.y]}var i=t.getBoundingClientRect();return[n.clientX-i.left-t.clientLeft,n.clientY-i.top-t.clientTop]},ht=function(t){var n=lt();return n.changedTouches&&(n=n.changedTouches[0]),ft(t,n)},pt=function(t){return null==t?f:function(){return this.querySelector(t)}},_t=function(t){"function"!=typeof t&&(t=pt(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,u,c=n[i],s=c.length,a=r[i]=new Array(s),l=0;l<s;++l)(o=c[l])&&(u=t.call(o,o.__data__,l,c))&&("__data__"in o&&(u.__data__=o.__data__),a[l]=u);return new Q(r,this._parents)},vt=function(t){return null==t?h:function(){return this.querySelectorAll(t)}},dt=function(t){"function"!=typeof t&&(t=vt(t));for(var n=this._groups,e=n.length,r=[],i=[],o=0;o<e;++o)for(var u,c=n[o],s=c.length,a=0;a<s;++a)(u=c[a])&&(r.push(t.call(u,u.__data__,a,c)),i.push(u));return new Q(r,i)},yt=function(t){"function"!=typeof t&&(t=ct(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,u=n[i],c=u.length,s=r[i]=[],a=0;a<c;++a)(o=u[a])&&t.call(o,o.__data__,a,u)&&s.push(o);return new Q(r,this._parents)},mt=function(t){return new Array(t.length)},gt=function(){return new Q(this._enter||this._groups.map(mt),this._parents)};p.prototype={constructor:p,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,n){return this._parent.insertBefore(t,n)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};var wt=function(t){return function(){return t}},At="$",xt=function(t,n){if(!t)return p=new Array(this.size()),a=-1,this.each(function(t){p[++a]=t}),p;var e=n?v:_,r=this._parents,i=this._groups;"function"!=typeof t&&(t=wt(t));for(var o=i.length,u=new Array(o),c=new Array(o),s=new Array(o),a=0;a<o;++a){var l=r[a],f=i[a],h=f.length,p=t.call(l,l&&l.__data__,a,r),d=p.length,y=c[a]=new Array(d),m=u[a]=new Array(d);e(l,f,y,m,s[a]=new Array(h),p,n);for(var g,w,A=0,x=0;A<d;++A)if(g=y[A]){for(A>=x&&(x=A+1);!(w=m[x])&&++x<d;);g._next=w||null}}return u=new Q(u,r),u._enter=c,u._exit=s,u},St=function(){return new Q(this._exit||this._groups.map(mt),this._parents)},bt=function(t){for(var n=this._groups,e=t._groups,r=n.length,i=e.length,o=Math.min(r,i),u=new Array(r),c=0;c<o;++c)for(var s,a=n[c],l=e[c],f=a.length,h=u[c]=new Array(f),p=0;p<f;++p)(s=a[p]||l[p])&&(h[p]=s);for(;c<r;++c)u[c]=n[c];return new Q(u,this._parents)},Et=function(){for(var t=this._groups,n=-1,e=t.length;++n<e;)for(var r,i=t[n],o=i.length-1,u=i[o];--o>=0;)(r=i[o])&&(u&&u!==r.nextSibling&&u.parentNode.insertBefore(r,u),u=r);return this},Nt=function(t){function n(n,e){return n&&e?t(n.__data__,e.__data__):!n-!e}t||(t=d);for(var e=this._groups,r=e.length,i=new Array(r),o=0;o<r;++o){for(var u,c=e[o],s=c.length,a=i[o]=new Array(s),l=0;l<s;++l)(u=c[l])&&(a[l]=u);a.sort(n)}return new Q(i,this._parents).order()},Ct=function(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this},Mt=function(){var t=new Array(this.size()),n=-1;return this.each(function(){t[++n]=this}),t},Pt=function(){for(var t=this._groups,n=0,e=t.length;n<e;++n)for(var r=t[n],i=0,o=r.length;i<o;++i){var u=r[i];if(u)return u}return null},Lt=function(){var t=0;return this.each(function(){++t}),t},Tt=function(){return!this.node()},qt=function(t){for(var n=this._groups,e=0,r=n.length;e<r;++e)for(var i,o=n[e],u=0,c=o.length;u<c;++u)(i=o[u])&&t.call(i,i.__data__,u,o);return this},Ot=function(t,n){var e=nt(t);if(arguments.length<2){var r=this.node();return e.local?r.getAttributeNS(e.space,e.local):r.getAttribute(e)}return this.each((null==n?e.local?m:y:"function"==typeof n?e.local?x:A:e.local?w:g)(e,n))},Bt=function(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView},Dt=function(t,n,e){return arguments.length>1?this.each((null==n?S:"function"==typeof n?E:b)(t,n,null==e?"":e)):N(this.node(),t)},Vt=function(t,n){return arguments.length>1?this.each((null==n?C:"function"==typeof n?P:M)(t,n)):this.node()[t]};q.prototype={add:function(t){this._names.indexOf(t)<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var n=this._names.indexOf(t);n>=0&&(this._names.splice(n,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};var Rt=function(t,n){var e=L(t+"");if(arguments.length<2){for(var r=T(this.node()),i=-1,o=e.length;++i<o;)if(!r.contains(e[i]))return!1;return!0}return this.each(("function"==typeof n?R:n?D:V)(e,n))},jt=function(t){return arguments.length?this.each(null==t?j:("function"==typeof t?H:z)(t)):this.node().textContent},zt=function(t){return arguments.length?this.each(null==t?I:("function"==typeof t?k:U)(t)):this.node().innerHTML},Ht=function(){return this.each(G)},It=function(){return this.each(X)},Ut=function(t){var n="function"==typeof t?t:et(t);return this.select(function(){return this.appendChild(n.apply(this,arguments))})},kt=function(t,n){var e="function"==typeof t?t:et(t),r=null==n?Y:"function"==typeof n?n:pt(n);return this.select(function(){return this.insertBefore(e.apply(this,arguments),r.apply(this,arguments)||null)})},Gt=function(){return this.each($)},Xt=function(t){return arguments.length?this.property("__data__",t):this.node().__data__},Yt=function(t,n){return this.each(("function"==typeof n?K:J)(t,n))},$t=[null];Q.prototype=W.prototype={constructor:Q,select:_t,selectAll:dt,filter:yt,data:xt,enter:gt,exit:St,merge:bt,order:Et,sort:Nt,call:Ct,nodes:Mt,node:Pt,size:Lt,empty:Tt,each:qt,attr:Ot,style:Dt,property:Vt,classed:Rt,text:jt,html:zt,raise:Ht,lower:It,append:Ut,insert:kt,remove:Gt,datum:Xt,on:at,dispatch:Yt};var Ft=function(t){return"string"==typeof t?new Q([[document.querySelector(t)]],[document.documentElement]):new Q([[t]],$t)},Jt=function(t){return"string"==typeof t?new Q([document.querySelectorAll(t)],[document.documentElement]):new Q([null==t?[]:t],$t)},Kt=function(t,n,e){arguments.length<3&&(e=n,n=lt().changedTouches);for(var r,i=0,o=n?n.length:0;i<o;++i)if((r=n[i]).identifier===e)return ft(t,r);return null},Qt=function(t,n){null==n&&(n=lt().touches);for(var e=0,r=n?n.length:0,i=new Array(r);e<r;++e)i[e]=ft(t,n[e]);return i};t.creator=et,t.local=r,t.matcher=ct,t.mouse=ht,t.namespace=nt,t.namespaces=tt,t.select=Ft,t.selectAll=Jt,t.selection=W,t.selector=pt,t.selectorAll=vt,t.style=N,t.touch=Kt,t.touches=Qt,t.window=Bt,t.customEvent=l,Object.defineProperty(t,"__esModule",{value:!0})});

/*
	AHS502 : End of 'd3-selection.v1.min.js'
*/


/*
	AHS502 : Start of 'd3-timer.v1.min.js'
*/

// https://d3js.org/d3-timer/ Version 1.0.5. Copyright 2017 Mike Bostock.
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(t.d3=t.d3||{})}(this,function(t){"use strict";function n(){return y||(w(e),y=x.now()+d)}function e(){y=0}function i(){this._call=this._time=this._next=null}function o(t,n,e){var o=new i;return o.restart(t,n,e),o}function r(){n(),++_;for(var t,e=f;e;)(t=y-e._time)>=0&&e._call.call(null,t),e=e._next;--_}function u(){y=(v=x.now())+d,_=m=0;try{r()}finally{_=0,c(),y=0}}function l(){var t=x.now(),n=t-v;n>h&&(d-=n,v=t)}function c(){for(var t,n,e=f,i=1/0;e;)e._call?(i>e._time&&(i=e._time),t=e,e=e._next):(n=e._next,e._next=null,e=t?t._next=n:f=n);s=t,a(i)}function a(t){if(!_){m&&(m=clearTimeout(m));var n=t-y;n>24?(t<1/0&&(m=setTimeout(u,n)),p&&(p=clearInterval(p))):(p||(v=y,p=setInterval(l,h)),_=1,w(u))}}var f,s,_=0,m=0,p=0,h=1e3,v=0,y=0,d=0,x="object"==typeof performance&&performance.now?performance:Date,w="function"==typeof requestAnimationFrame?requestAnimationFrame:function(t){setTimeout(t,17)};i.prototype=o.prototype={constructor:i,restart:function(t,e,i){if("function"!=typeof t)throw new TypeError("callback is not a function");i=(null==i?n():+i)+(null==e?0:+e),this._next||s===this||(s?s._next=this:f=this,s=this),this._call=t,this._time=i,a()},stop:function(){this._call&&(this._call=null,this._time=1/0,a())}};var b=function(t,n,e){var o=new i;return n=null==n?0:+n,o.restart(function(e){o.stop(),t(e+n)},n,e),o},T=function(t,e,o){var r=new i,u=e;return null==e?(r.restart(t,e,o),r):(e=+e,o=null==o?n():+o,r.restart(function n(i){i+=u,r.restart(n,u+=e,o),t(i)},e,o),r)};t.now=n,t.timer=o,t.timerFlush=r,t.timeout=b,t.interval=T,Object.defineProperty(t,"__esModule",{value:!0})});

/*
	AHS502 : End of 'd3-timer.v1.min.js'
*/


/*
	AHS502 : Start of 'd3-transition.v1.min.js'
*/

// https://d3js.org/d3-transition/ Version 1.1.0. Copyright 2017 Mike Bostock.
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("d3-selection"),require("d3-dispatch"),require("d3-timer"),require("d3-interpolate"),require("d3-color"),require("d3-ease")):"function"==typeof define&&define.amd?define(["exports","d3-selection","d3-dispatch","d3-timer","d3-interpolate","d3-color","d3-ease"],n):n(t.d3=t.d3||{},t.d3,t.d3,t.d3,t.d3,t.d3,t.d3)}(this,function(t,n,e,r,i,o,a){"use strict";function u(t,n){var e=t.__transition;if(!e||!(e=e[n])||e.state>J)throw new Error("too late");return e}function s(t,n){var e=t.__transition;if(!e||!(e=e[n])||e.state>L)throw new Error("too late");return e}function l(t,n){var e=t.__transition;if(!e||!(e=e[n]))throw new Error("too late");return e}function f(t,n,e){function i(t){e.state=K,e.timer.restart(o,e.delay,e.time),e.delay<=t&&o(t-e.delay)}function o(i){var f,c,h,d;if(e.state!==K)return u();for(f in l)if(d=l[f],d.name===e.name){if(d.state===Q)return r.timeout(o);d.state===U?(d.state=W,d.timer.stop(),d.on.call("interrupt",t,t.__data__,d.index,d.group),delete l[f]):+f<n&&(d.state=W,d.timer.stop(),delete l[f])}if(r.timeout(function(){e.state===Q&&(e.state=U,e.timer.restart(a,e.delay,e.time),a(i))}),e.state=L,e.on.call("start",t,t.__data__,e.index,e.group),e.state===L){for(e.state=Q,s=new Array(h=e.tween.length),f=0,c=-1;f<h;++f)(d=e.tween[f].value.call(t,t.__data__,e.index,e.group))&&(s[++c]=d);s.length=c+1}}function a(n){for(var r=n<e.duration?e.ease.call(null,n/e.duration):(e.timer.restart(u),e.state=V,1),i=-1,o=s.length;++i<o;)s[i].call(null,r);e.state===V&&(e.on.call("end",t,t.__data__,e.index,e.group),u())}function u(){e.state=W,e.timer.stop(),delete l[n];for(var r in l)return;delete t.__transition}var s,l=t.__transition;l[n]=e,e.timer=r.timer(i,0,e.time)}function c(t,n){var e,r;return function(){var i=s(this,t),o=i.tween;if(o!==e){r=e=o;for(var a=0,u=r.length;a<u;++a)if(r[a].name===n){r=r.slice(),r.splice(a,1);break}}i.tween=r}}function h(t,n,e){var r,i;if("function"!=typeof e)throw new Error;return function(){var o=s(this,t),a=o.tween;if(a!==r){i=(r=a).slice();for(var u={name:n,value:e},l=0,f=i.length;l<f;++l)if(i[l].name===n){i[l]=u;break}l===f&&i.push(u)}o.tween=i}}function d(t,n,e){var r=t._id;return t.each(function(){var t=s(this,r);(t.value||(t.value={}))[n]=e.apply(this,arguments)}),function(t){return l(t,r).value[n]}}function _(t){return function(){this.removeAttribute(t)}}function p(t){return function(){this.removeAttributeNS(t.space,t.local)}}function v(t,n,e){var r,i;return function(){var o=this.getAttribute(t);return o===e?null:o===r?i:i=n(r=o,e)}}function y(t,n,e){var r,i;return function(){var o=this.getAttributeNS(t.space,t.local);return o===e?null:o===r?i:i=n(r=o,e)}}function m(t,n,e){var r,i,o;return function(){var a,u=e(this);return null==u?void this.removeAttribute(t):(a=this.getAttribute(t),a===u?null:a===r&&u===i?o:o=n(r=a,i=u))}}function w(t,n,e){var r,i,o;return function(){var a,u=e(this);return null==u?void this.removeAttributeNS(t.space,t.local):(a=this.getAttributeNS(t.space,t.local),a===u?null:a===r&&u===i?o:o=n(r=a,i=u))}}function g(t,n){function e(){var e=this,r=n.apply(e,arguments);return r&&function(n){e.setAttributeNS(t.space,t.local,r(n))}}return e._value=n,e}function b(t,n){function e(){var e=this,r=n.apply(e,arguments);return r&&function(n){e.setAttribute(t,r(n))}}return e._value=n,e}function A(t,n){return function(){u(this,t).delay=+n.apply(this,arguments)}}function x(t,n){return n=+n,function(){u(this,t).delay=n}}function E(t,n){return function(){s(this,t).duration=+n.apply(this,arguments)}}function N(t,n){return n=+n,function(){s(this,t).duration=n}}function S(t,n){if("function"!=typeof n)throw new Error;return function(){s(this,t).ease=n}}function T(t){return(t+"").trim().split(/^|\s+/).every(function(t){var n=t.indexOf(".");return n>=0&&(t=t.slice(0,n)),!t||"start"===t})}function q(t,n,e){var r,i,o=T(n)?u:s;return function(){var a=o(this,t),u=a.on;u!==r&&(i=(r=u).copy()).on(n,e),a.on=i}}function C(t){return function(){var n=this.parentNode;for(var e in this.__transition)if(+e!==t)return;n&&n.removeChild(this)}}function P(t,e){var r,i,o;return function(){var a=n.style(this,t),u=(this.style.removeProperty(t),n.style(this,t));return a===u?null:a===r&&u===i?o:o=e(r=a,i=u)}}function O(t){return function(){this.style.removeProperty(t)}}function j(t,e,r){var i,o;return function(){var a=n.style(this,t);return a===r?null:a===i?o:o=e(i=a,r)}}function k(t,e,r){var i,o,a;return function(){var u=n.style(this,t),s=r(this);return null==s&&(this.style.removeProperty(t),s=n.style(this,t)),u===s?null:u===i&&s===o?a:a=e(i=u,o=s)}}function z(t,n,e){function r(){var r=this,i=n.apply(r,arguments);return i&&function(n){r.style.setProperty(t,i(n),e)}}return r._value=n,r}function M(t){return function(){this.textContent=t}}function R(t){return function(){var n=t(this);this.textContent=null==n?"":n}}function I(t,n,e,r){this._groups=t,this._parents=n,this._name=e,this._id=r}function B(t){return n.selection().transition(t)}function D(){return++mt}function F(t,n){for(var e;!(e=t.__transition)||!(e=e[n]);)if(!(t=t.parentNode))return gt.time=r.now(),gt;return e}var G=e.dispatch("start","end","interrupt"),H=[],J=0,K=1,L=2,Q=3,U=4,V=5,W=6,X=function(t,n,e,r,i,o){var a=t.__transition;if(a){if(e in a)return}else t.__transition={};f(t,e,{name:n,index:r,group:i,on:G,tween:H,time:o.time,delay:o.delay,duration:o.duration,ease:o.ease,timer:null,state:J})},Y=function(t,n){var e,r,i,o=t.__transition,a=!0;if(o){n=null==n?null:n+"";for(i in o)(e=o[i]).name===n?(r=e.state>L&&e.state<V,e.state=W,e.timer.stop(),r&&e.on.call("interrupt",t,t.__data__,e.index,e.group),delete o[i]):a=!1;a&&delete t.__transition}},Z=function(t){return this.each(function(){Y(this,t)})},$=function(t,n){var e=this._id;if(t+="",arguments.length<2){for(var r,i=l(this.node(),e).tween,o=0,a=i.length;o<a;++o)if((r=i[o]).name===t)return r.value;return null}return this.each((null==n?c:h)(e,t,n))},tt=function(t,n){var e;return("number"==typeof n?i.interpolateNumber:n instanceof o.color?i.interpolateRgb:(e=o.color(n))?(n=e,i.interpolateRgb):i.interpolateString)(t,n)},nt=function(t,e){var r=n.namespace(t),o="transform"===r?i.interpolateTransformSvg:tt;return this.attrTween(t,"function"==typeof e?(r.local?w:m)(r,o,d(this,"attr."+t,e)):null==e?(r.local?p:_)(r):(r.local?y:v)(r,o,e+""))},et=function(t,e){var r="attr."+t;if(arguments.length<2)return(r=this.tween(r))&&r._value;if(null==e)return this.tween(r,null);if("function"!=typeof e)throw new Error;var i=n.namespace(t);return this.tween(r,(i.local?g:b)(i,e))},rt=function(t){var n=this._id;return arguments.length?this.each(("function"==typeof t?A:x)(n,t)):l(this.node(),n).delay},it=function(t){var n=this._id;return arguments.length?this.each(("function"==typeof t?E:N)(n,t)):l(this.node(),n).duration},ot=function(t){var n=this._id;return arguments.length?this.each(S(n,t)):l(this.node(),n).ease},at=function(t){"function"!=typeof t&&(t=n.matcher(t));for(var e=this._groups,r=e.length,i=new Array(r),o=0;o<r;++o)for(var a,u=e[o],s=u.length,l=i[o]=[],f=0;f<s;++f)(a=u[f])&&t.call(a,a.__data__,f,u)&&l.push(a);return new I(i,this._parents,this._name,this._id)},ut=function(t){if(t._id!==this._id)throw new Error;for(var n=this._groups,e=t._groups,r=n.length,i=e.length,o=Math.min(r,i),a=new Array(r),u=0;u<o;++u)for(var s,l=n[u],f=e[u],c=l.length,h=a[u]=new Array(c),d=0;d<c;++d)(s=l[d]||f[d])&&(h[d]=s);for(;u<r;++u)a[u]=n[u];return new I(a,this._parents,this._name,this._id)},st=function(t,n){var e=this._id;return arguments.length<2?l(this.node(),e).on.on(t):this.each(q(e,t,n))},lt=function(){return this.on("end.remove",C(this._id))},ft=function(t){var e=this._name,r=this._id;"function"!=typeof t&&(t=n.selector(t));for(var i=this._groups,o=i.length,a=new Array(o),u=0;u<o;++u)for(var s,f,c=i[u],h=c.length,d=a[u]=new Array(h),_=0;_<h;++_)(s=c[_])&&(f=t.call(s,s.__data__,_,c))&&("__data__"in s&&(f.__data__=s.__data__),d[_]=f,X(d[_],e,r,_,d,l(s,r)));return new I(a,this._parents,e,r)},ct=function(t){var e=this._name,r=this._id;"function"!=typeof t&&(t=n.selectorAll(t));for(var i=this._groups,o=i.length,a=[],u=[],s=0;s<o;++s)for(var f,c=i[s],h=c.length,d=0;d<h;++d)if(f=c[d]){for(var _,p=t.call(f,f.__data__,d,c),v=l(f,r),y=0,m=p.length;y<m;++y)(_=p[y])&&X(_,e,r,y,p,v);a.push(p),u.push(f)}return new I(a,u,e,r)},ht=n.selection.prototype.constructor,dt=function(){return new ht(this._groups,this._parents)},_t=function(t,n,e){var r="transform"==(t+="")?i.interpolateTransformCss:tt;return null==n?this.styleTween(t,P(t,r)).on("end.style."+t,O(t)):this.styleTween(t,"function"==typeof n?k(t,r,d(this,"style."+t,n)):j(t,r,n+""),e)},pt=function(t,n,e){var r="style."+(t+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(null==n)return this.tween(r,null);if("function"!=typeof n)throw new Error;return this.tween(r,z(t,n,null==e?"":e))},vt=function(t){return this.tween("text","function"==typeof t?R(d(this,"text",t)):M(null==t?"":t+""))},yt=function(){for(var t=this._name,n=this._id,e=D(),r=this._groups,i=r.length,o=0;o<i;++o)for(var a,u=r[o],s=u.length,f=0;f<s;++f)if(a=u[f]){var c=l(a,n);X(a,t,e,f,u,{time:c.time+c.delay+c.duration,delay:0,duration:c.duration,ease:c.ease})}return new I(r,this._parents,t,e)},mt=0,wt=n.selection.prototype;I.prototype=B.prototype={constructor:I,select:ft,selectAll:ct,filter:at,merge:ut,selection:dt,transition:yt,call:wt.call,nodes:wt.nodes,node:wt.node,size:wt.size,empty:wt.empty,each:wt.each,on:st,attr:nt,attrTween:et,style:_t,styleTween:pt,text:vt,remove:lt,tween:$,delay:rt,duration:it,ease:ot};var gt={time:null,delay:0,duration:250,ease:a.easeCubicInOut},bt=function(t){var n,e;t instanceof I?(n=t._id,t=t._name):(n=D(),(e=gt).time=r.now(),t=null==t?null:t+"");for(var i=this._groups,o=i.length,a=0;a<o;++a)for(var u,s=i[a],l=s.length,f=0;f<l;++f)(u=s[f])&&X(u,t,n,f,s,e||F(u,n));return new I(i,this._parents,t,n)};n.selection.prototype.interrupt=Z,n.selection.prototype.transition=bt;var At=[null],xt=function(t,n){var e,r,i=t.__transition;if(i){n=null==n?null:n+"";for(r in i)if((e=i[r]).state>K&&e.name===n)return new I([[t]],At,n,+r)}return null};t.transition=B,t.active=xt,t.interrupt=Y,Object.defineProperty(t,"__esModule",{value:!0})});

/*
	AHS502 : End of 'd3-transition.v1.min.js'
*/


/*
	AHS502 : Start of 'd3-zoom.v1.min.js'
*/

// https://d3js.org/d3-zoom/ Version 1.2.0. Copyright 2017 Mike Bostock.
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("d3-dispatch"),require("d3-drag"),require("d3-interpolate"),require("d3-selection"),require("d3-transition")):"function"==typeof define&&define.amd?define(["exports","d3-dispatch","d3-drag","d3-interpolate","d3-selection","d3-transition"],e):e(t.d3=t.d3||{},t.d3,t.d3,t.d3,t.d3,t.d3)}(this,function(t,e,n,o,i,r){"use strict";function u(t,e,n){this.target=t,this.type=e,this.transform=n}function h(t,e,n){this.k=t,this.x=e,this.y=n}function s(t){return t.__zoom||p}function c(){i.event.stopImmediatePropagation()}function a(){return!i.event.button}function f(){var t,e,n=this;return n instanceof SVGElement?(n=n.ownerSVGElement||n,t=n.width.baseVal.value,e=n.height.baseVal.value):(t=n.clientWidth,e=n.clientHeight),[[0,0],[t,e]]}function l(){return this.__zoom||p}var m=function(t){return function(){return t}};h.prototype={constructor:h,scale:function(t){return 1===t?this:new h(this.k*t,this.x,this.y)},translate:function(t,e){return 0===t&0===e?this:new h(this.k,this.x+this.k*t,this.y+this.k*e)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var p=new h(1,0,0);s.prototype=h.prototype;var d=function(){i.event.preventDefault(),i.event.stopImmediatePropagation()},v=function(){function t(t){t.on("wheel.zoom",x).on("mousedown.zoom",k).on("dblclick.zoom",w).on("touchstart.zoom",M).on("touchmove.zoom",T).on("touchend.zoom touchcancel.zoom",b).style("-webkit-tap-highlight-color","rgba(0,0,0,0)").property("__zoom",l)}function s(t,e){return e=Math.max(V,Math.min(D,e)),e===t.k?t:new h(e,t.x,t.y)}function p(t,e,n){var o=e[0]-n[0]*t.k,i=e[1]-n[1]*t.k;return o===t.x&&i===t.y?t:new h(t.k,o,i)}function v(t,e){var n=t.invertX(e[0][0])-I,o=t.invertX(e[1][0])-P,i=t.invertY(e[0][1])-S,r=t.invertY(e[1][1])-j;return t.translate(o>n?(n+o)/2:Math.min(0,n)||Math.max(0,o),r>i?(i+r)/2:Math.min(0,i)||Math.max(0,r))}function y(t){return[(+t[0][0]+ +t[1][0])/2,(+t[0][1]+ +t[1][1])/2]}function z(t,e,n){t.on("start.zoom",function(){_(this,arguments).start()}).on("interrupt.zoom end.zoom",function(){_(this,arguments).end()}).tween("zoom",function(){var t=this,o=arguments,i=_(t,o),r=E.apply(t,o),u=n||y(r),s=Math.max(r[1][0]-r[0][0],r[1][1]-r[0][1]),c=t.__zoom,a="function"==typeof e?e.apply(t,o):e,f=G(c.invert(u).concat(s/c.k),a.invert(u).concat(s/a.k));return function(t){if(1===t)t=a;else{var e=f(t),n=s/e[2];t=new h(n,u[0]-e[0]*n,u[1]-e[1]*n)}i.zoom(null,t)}})}function _(t,e){for(var n,o=0,i=H.length;o<i;++o)if((n=H[o]).that===t)return n;return new g(t,e)}function g(t,e){this.that=t,this.args=e,this.index=-1,this.active=0,this.extent=E.apply(t,e)}function x(){function t(){e.wheel=null,e.end()}if(q.apply(this,arguments)){var e=_(this,arguments),n=this.__zoom,o=Math.max(V,Math.min(D,n.k*Math.pow(2,-i.event.deltaY*(i.event.deltaMode?120:1)/500))),u=i.mouse(this);if(e.wheel)e.mouse[0][0]===u[0]&&e.mouse[0][1]===u[1]||(e.mouse[1]=n.invert(e.mouse[0]=u)),clearTimeout(e.wheel);else{if(n.k===o)return;e.mouse=[u,n.invert(u)],r.interrupt(this),e.start()}d(),e.wheel=setTimeout(t,W),e.zoom("mouse",v(p(s(n,o),e.mouse[0],e.mouse[1]),e.extent))}}function k(){function t(){if(d(),!o.moved){var t=i.event.clientX-s,e=i.event.clientY-a;o.moved=t*t+e*e>Z}o.zoom("mouse",v(p(o.that.__zoom,o.mouse[0]=i.mouse(o.that),o.mouse[1]),o.extent))}function e(){u.on("mousemove.zoom mouseup.zoom",null),n.dragEnable(i.event.view,o.moved),d(),o.end()}if(!X&&q.apply(this,arguments)){var o=_(this,arguments),u=i.select(i.event.view).on("mousemove.zoom",t,!0).on("mouseup.zoom",e,!0),h=i.mouse(this),s=i.event.clientX,a=i.event.clientY;n.dragDisable(i.event.view),c(),o.mouse=[h,this.__zoom.invert(h)],r.interrupt(this),o.start()}}function w(){if(q.apply(this,arguments)){var e=this.__zoom,n=i.mouse(this),o=e.invert(n),r=e.k*(i.event.shiftKey?.5:2),u=v(p(s(e,r),n,o),E.apply(this,arguments));d(),B>0?i.select(this).transition().duration(B).call(z,u,n):i.select(this).call(t.transform,u)}}function M(){if(q.apply(this,arguments)){var t,e,n,o,u=_(this,arguments),h=i.event.changedTouches,s=h.length;for(c(),e=0;e<s;++e)n=h[e],o=i.touch(this,h,n.identifier),o=[o,this.__zoom.invert(o),n.identifier],u.touch0?u.touch1||(u.touch1=o):(u.touch0=o,t=!0);if(Y&&(Y=clearTimeout(Y),!u.touch1))return u.end(),void((o=i.select(this).on("dblclick.zoom"))&&o.apply(this,arguments));t&&(Y=setTimeout(function(){Y=null},O),r.interrupt(this),u.start())}}function T(){var t,e,n,o,r=_(this,arguments),u=i.event.changedTouches,h=u.length;for(d(),Y&&(Y=clearTimeout(Y)),t=0;t<h;++t)e=u[t],n=i.touch(this,u,e.identifier),r.touch0&&r.touch0[2]===e.identifier?r.touch0[0]=n:r.touch1&&r.touch1[2]===e.identifier&&(r.touch1[0]=n);if(e=r.that.__zoom,r.touch1){var c=r.touch0[0],a=r.touch0[1],f=r.touch1[0],l=r.touch1[1],m=(m=f[0]-c[0])*m+(m=f[1]-c[1])*m,y=(y=l[0]-a[0])*y+(y=l[1]-a[1])*y;e=s(e,Math.sqrt(m/y)),n=[(c[0]+f[0])/2,(c[1]+f[1])/2],o=[(a[0]+l[0])/2,(a[1]+l[1])/2]}else{if(!r.touch0)return;n=r.touch0[0],o=r.touch0[1]}r.zoom("touch",v(p(e,n,o),r.extent))}function b(){var t,e,n=_(this,arguments),o=i.event.changedTouches,r=o.length;for(c(),X&&clearTimeout(X),X=setTimeout(function(){X=null},O),t=0;t<r;++t)e=o[t],n.touch0&&n.touch0[2]===e.identifier?delete n.touch0:n.touch1&&n.touch1[2]===e.identifier&&delete n.touch1;n.touch1&&!n.touch0&&(n.touch0=n.touch1,delete n.touch1),n.touch0?n.touch0[1]=this.__zoom.invert(n.touch0[0]):n.end()}var Y,X,q=a,E=f,V=0,D=1/0,I=-D,P=D,S=I,j=P,B=250,G=o.interpolateZoom,H=[],K=e.dispatch("start","zoom","end"),O=500,W=150,Z=0;return t.transform=function(t,e){var n=t.selection?t.selection():t;n.property("__zoom",l),t!==n?z(t,e):n.interrupt().each(function(){_(this,arguments).start().zoom(null,"function"==typeof e?e.apply(this,arguments):e).end()})},t.scaleBy=function(e,n){t.scaleTo(e,function(){return this.__zoom.k*("function"==typeof n?n.apply(this,arguments):n)})},t.scaleTo=function(e,n){t.transform(e,function(){var t=E.apply(this,arguments),e=this.__zoom,o=y(t),i=e.invert(o);return v(p(s(e,"function"==typeof n?n.apply(this,arguments):n),o,i),t)})},t.translateBy=function(e,n,o){t.transform(e,function(){return v(this.__zoom.translate("function"==typeof n?n.apply(this,arguments):n,"function"==typeof o?o.apply(this,arguments):o),E.apply(this,arguments))})},g.prototype={start:function(){return 1==++this.active&&(this.index=H.push(this)-1,this.emit("start")),this},zoom:function(t,e){return this.mouse&&"mouse"!==t&&(this.mouse[1]=e.invert(this.mouse[0])),this.touch0&&"touch"!==t&&(this.touch0[1]=e.invert(this.touch0[0])),this.touch1&&"touch"!==t&&(this.touch1[1]=e.invert(this.touch1[0])),this.that.__zoom=e,this.emit("zoom"),this},end:function(){return 0==--this.active&&(H.splice(this.index,1),this.index=-1,this.emit("end")),this},emit:function(e){i.customEvent(new u(t,e,this.that.__zoom),K.apply,K,[e,this.that,this.args])}},t.filter=function(e){return arguments.length?(q="function"==typeof e?e:m(!!e),t):q},t.extent=function(e){return arguments.length?(E="function"==typeof e?e:m([[+e[0][0],+e[0][1]],[+e[1][0],+e[1][1]]]),t):E},t.scaleExtent=function(e){return arguments.length?(V=+e[0],D=+e[1],t):[V,D]},t.translateExtent=function(e){return arguments.length?(I=+e[0][0],P=+e[1][0],S=+e[0][1],j=+e[1][1],t):[[I,S],[P,j]]},t.duration=function(e){return arguments.length?(B=+e,t):B},t.interpolate=function(e){return arguments.length?(G=e,t):G},t.on=function(){var e=K.on.apply(K,arguments);return e===K?t:e},t.clickDistance=function(e){return arguments.length?(Z=(e=+e)*e,t):Math.sqrt(Z)},t};t.zoom=v,t.zoomTransform=s,t.zoomIdentity=p,Object.defineProperty(t,"__esModule",{value:!0})});

/*
	AHS502 : End of 'd3-zoom.v1.min.js'
*/


/*
	AHS502 : Start of 'global.js'
*/

var global;

try {
    global = Function('return this')() || (502, eval)('this');
}
catch (e) {
    global = window;
}

global.global = global;


/*
	AHS502 : End of 'global.js'
*/


/*
	AHS502 : Start of 'ValidationSystem.js'
*/

/*global toPersianNumber*/

(function(global) {

    global.ValidationSystem = ValidationSystem;

    ////////////////////////////////////////////////////////////////////////////

    function ValidationSystem(scope) {

        var fields = {};

        this.field = field; // Define a new field => this (so you could chain them)
        this.error = error; // Get/Set error message for a field => field's error message
        this.clear = clear; // Clear some or all error messages => nothing!
        this.see = see; // Checks some or all fields validity status without updating (setting/removing) any error messages => summary of those fields validity
        this.check = check; // Checks some or all fields validity status and tries to remove their error messages if possible => summary of those fields validity
        this.validate = validate; // Checks some or all fields validity status and updates their error messages => summary of those fields validity
        this.status = status; // Summarize some of all fields validity status without checking or updating their error messages => summary of those fields validity
        this.dictate = dictate; // Forces all fields error messages according to the errors object provided => nothing!

        function field(fieldName, validators) {
            fields[fieldName] = {
                validators: [].concat(validators),
                error: null
            };
            return this;
        }

        function error(fieldName, errorMessage) {
            if (arguments.length === 1)
                return (fields[fieldName] || {}).error || null;
            else if (arguments.length === 2)
                return (fields[fieldName] || {}).error = errorMessage || null;
        }

        function clear() {
            fieldNames(arguments).forEach(function(fieldName) {
                fields[fieldName].error = null;
            });
        }

        function see() {
            var valid = true;
            fieldNames(arguments).forEach(function(fieldName) {
                var fieldData = fields[fieldName];
                if (run(fieldName, fieldData.validators)) valid = false;
            });
            return valid;
        }

        function check() {
            var valid = true;
            fieldNames(arguments).forEach(function(fieldName) {
                var fieldData = fields[fieldName];
                fieldData.error = fieldData.error && run(fieldName, fieldData.validators);
                if (fieldData.error) valid = false;
            });
            return valid;
        }

        function validate() {
            var valid = true;
            fieldNames(arguments).forEach(function(fieldName) {
                var fieldData = fields[fieldName];
                fieldData.error = run(fieldName, fieldData.validators);
                if (fieldData.error) valid = false;
            });
            return valid;
        }

        function status() {
            var valid = true;
            fieldNames(arguments).forEach(function(fieldName) {
                var fieldData = fields[fieldName];
                if (fieldData.error) valid = false;
            });
            return valid;
        }

        function dictate(errors) {
            Object.keys(fields).forEach(function(fieldName) {
                fields[fieldName].error = errors[fieldName] || null;
            });
        }

        function fieldNames(fieldNamesArguments) {
            var allFieldNames = Object.keys(fields);
            if (fieldNamesArguments.length) {
                return Array.from(fieldNamesArguments)
                    .filter(function(fieldName) {
                        return allFieldNames.indexOf(fieldName) >= 0;
                    });
            }
            return allFieldNames;
        }

        function run(fieldName, validators) {
            if (!validators) return null;
            var value = scope[fieldName];
            for (var i = 0; i < validators.length; i++) {
                var res = validators[i](value);
                if (res === true) break;
                if (res) return res;
            }
            return null;
        }

    }

    ////////////////////////////////////////////////////////////////////////////

    ValidationSystem.validators = {
        notEmpty: notEmptyValidator,
        notRequired: notRequiredValidator,
        nationalCode: nationalCodeValidator,
        numberCode: numberCodeValidator,
        phoneNumber: phoneNumberValidator,
        mobilePhoneNumber: mobilePhoneNumberValidator,
        minLength: minLengthValidator,
        length: lengthValidator,
        username: usernameValidator,
        integer: integerValidator,
        url: urlValidator,
        email: emailValidator,
    };

    ////////////////////////////////////////////////////////////////////////////

    function notEmptyValidator(message) {
        message = message || 'پُر کردن این فیلد الزامی است';
        return function(value) {
            return value ? null : message;
        };
    }

    function notRequiredValidator() {
        return function(value) {
            return !value;
        };
    }

    function nationalCodeValidator(message) {
        message = message || 'کد ملی صحیح نمی باشد';
        return function(value) {
            return /^[0-9]{10}$/.test(value) ? null : message;
        };
    }

    function numberCodeValidator(length, message) {
        message = message || 'کد وارد شده صحیح نمی باشد';
        return function(value) {
            return String(value).length === length && /^[0-9]+$/.test(value) ? null : message;
        };
    }

    function phoneNumberValidator(message) {
        message = message || 'شماره تلفن وارد شده صحیح نمی باشد';
        return function(value) {
            return /^(\+98)?[0-9]{5,15}$/.test(value) ? null : message;
        };
    }

    function mobilePhoneNumberValidator(message) {
        message = message || 'شماره موبایل وارد شده صحیح نمی باشد';
        return function(value) {
            return /^(\+989|09)[0-9]{9}$/.test(value) ? null : message;
        };
    }

    function minLengthValidator(length, message) {
        message = message || 'این فیلد باید حداقل ' + toPersianNumber(length) + ' حرف داشته باشد';
        return function(value) {
            return String(value).length >= length ? null : message;
        };
    }

    function lengthValidator(length, message) {
        message = message || 'این فیلد باید دقیقاً ' + toPersianNumber(length) + ' حرف داشته باشد';
        return function(value) {
            return String(value).length === length ? null : message;
        };
    }

    function usernameValidator(message) {
        message = message || 'نام کاربری فقط باید شامل حروف لاتین، ارقام، نقطه و خط زیر _ باشد';
        return function(value) {
            return /^[a-zA-Z_][a-zA-Z_0-9]+$/.test(value) ? null : message;
        };
    }

    function integerValidator(message) {
        message = message || 'در این فیلد فقط استفاده از ارقام مجاز است';
        return function(value) {
            return /^[0-9]*$/.test(value) ? null : message;
        };
    }

    function urlValidator(message) {
        message = message || 'آدرس وب سایت صحیح نمی باشد';
        return function(value) {
            return /^((http|https):\/\/)?[a-zA-Z0-9-_\.]+\.[a-zA-Z0-9]+$/.test(value) ? null : message;
        };
    }

    function emailValidator(message) {
        message = message || 'پست الکترونیکی صحیح نمی باشد';
        return function(value) {
            return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value) ? null : message;
        };
    }

})(global);

/*
	AHS502 : End of 'ValidationSystem.js'
*/


/*
	AHS502 : Start of 'calendar-converter.js'
*/

(function() {
    ////////////////////////////////////////////////////////////////////////////

    global.gregorianToJalali = gregorianToJalali; // ([2017, 3, 27]) => [1396, 1, 7]
    global.jalaliToGregorian = jalaliToGregorian; // ([1396, 1, 7]) => [2017, 3, 27]
    
    //// Not needed yet:
    // global.gregorianToIslamic = gregorianToIslamic; // ([2017, 3, 27]) => [1438, 6, 28]
    // global.islamicToGregorian = islamicToGregorian; // ([1438, 6, 28]) => [2017, 3, 27]
    
    //// Not needed yet:
    // global.jalaliToIslamic = jalaliToIslamic; // ([1396, 1, 7]) => [1438, 6, 28]
    // global.islamicToJalali = islamicToJalali; // ([1438, 6, 28]) => [1396, 1, 7]

    ////////////////////////////////////////////////////////////////////////////

    // Source: http://jdf.scr.ir/jdf
    function gregorianToJalali(gYMD) {
        var gy = gYMD[0],
            gm = gYMD[1],
            gd = gYMD[2];
        var g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        var jy = (gy <= 1600) ? 0 : 979;
        gy -= (gy <= 1600) ? 621 : 1600;
        var gy2 = (gm > 2) ? (gy + 1) : gy;
        var days = (365 * gy) + parseInt((gy2 + 3) / 4, 10) - parseInt((gy2 + 99) / 100, 10) + parseInt((gy2 + 399) / 400, 10) - 80 + gd + g_d_m[gm - 1];
        jy += 33 * parseInt(days / 12053, 10);
        days %= 12053;
        jy += 4 * parseInt(days / 1461, 10);
        days %= 1461;
        jy += parseInt((days - 1) / 365, 10);
        if (days > 365) days = (days - 1) % 365;
        var jm = (days < 186) ? 1 + parseInt(days / 31, 10) : 7 + parseInt((days - 186) / 30, 10);
        var jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
        return [jy, jm, jd];
    }

    // Source: http://jdf.scr.ir/jdf
    function jalaliToGregorian(jYMD) {
        var jy = jYMD[0],
            jm = jYMD[1],
            jd = jYMD[2];
        var gy = (jy <= 979) ? 621 : 1600;
        jy -= (jy <= 979) ? 0 : 979;
        var days = (365 * jy) + (parseInt(jy / 33, 10) * 8) + parseInt(((jy % 33) + 3) / 4, 10) + 78 + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
        gy += 400 * parseInt(days / 146097, 10);
        days %= 146097;
        if (days > 36524) {
            gy += 100 * parseInt(--days / 36524, 10);
            days %= 36524;
            if (days >= 365) days++;
        }
        gy += 4 * parseInt((days) / 1461, 10);
        days %= 1461;
        gy += parseInt((days - 1) / 365, 10);
        if (days > 365) days = (days - 1) % 365;
        var gd = days + 1;
        var sal_a = [0, 31, ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        for (var gm = 0; gm < 13; gm++) {
            var v = sal_a[gm];
            if (gd <= v) break;
            gd -= v;
        }
        return [gy, gm, gd];
    }

    // // Source: http://123.scr.ir
    // function gregorianToIslamic(gYMD) {
    //     var gy = gYMD[0],
    //         gm = gYMD[1],
    //         gd = gYMD[2];
    //     if (gy > 1582 || (gy == 1581 && gm > 9 && gd > 14)) {
    //         var a = parseInt((gm - 14) / 12, 10);
    //         var jd = parseInt((1461 * (gy + 4800 + a)) / 4, 10) + parseInt((367 * (gm - 2 - (12 * a))) / 12, 10) - parseInt((3 * (parseInt((gy + 4900 + a) / 100, 10))) / 4, 10) + gd - 32075;
    //     }
    //     else {
    //         jd = (367 * gy) - parseInt((7 * (gy + 5001 + parseInt((gm - 9) / 7, 10))) / 4, 10) + parseInt((275 * gm) / 9, 10) + gd + 1729777;
    //     }
    //     var l = jd - 1948440 + 10632;
    //     var n = parseInt((l - 1) / 10631, 10);
    //     l = l - 10631 * n + 354;
    //     var j = ((parseInt((10985 - l) / 5316, 10)) * (parseInt((50 * l) / 17719, 10))) + ((parseInt(l / 5670, 10)) * (parseInt((43 * l) / 15238, 10)));
    //     l = l - (parseInt((30 - j) / 15, 10)) * (parseInt((17719 * j) / 50, 10)) - (parseInt(j / 16, 10)) * (parseInt((15238 * j) / 43, 10)) + 29;
    //     gm = parseInt((24 * l) / 709, 10);
    //     gd = l - parseInt((709 * gm) / 24, 10);
    //     gy = (30 * n) + j - 30;
    //     return [gy, gm, gd];
    // }

    // // Source: http://123.scr.ir
    // function islamicToGregorian(iYMD) {
    //     var iy = iYMD[0],
    //         im = iYMD[1],
    //         id = iYMD[2];
    //     var jd = parseInt(((11 * iy) + 3) / 30, 10) + (354 * iy) + (30 * im) - parseInt((im - 1) / 2, 10) + id + 1948440 - 385;
    //     if (jd > 2299160) {
    //         var l = jd + 68569;
    //         var n = parseInt((4 * l) / 146097, 10);
    //         l = l - parseInt((146097 * n + 3) / 4, 10);
    //         var i = parseInt((4000 * (l + 1)) / 1461001, 10);
    //         l = l - parseInt((1461 * i) / 4, 10) + 31;
    //         var j = parseInt((80 * l) / 2447, 10);
    //         id = l - parseInt((2447 * j) / 80, 10);
    //         l = parseInt(j / 11, 10);
    //         im = j + 2 - (12 * l);
    //         iy = (100 * (n - 49)) + i + l;
    //     }
    //     else {
    //         j = jd + 1402;
    //         var k = parseInt((j - 1) / 1461, 10);
    //         l = j - (1461 * k);
    //         n = parseInt((l - 1) / 365, 10) - parseInt(l / 1461, 10);
    //         i = l - (365 * n, 10) + 30;
    //         j = parseInt((80 * i) / 2447, 10);
    //         id = i - parseInt((2447 * j) / 80, 10);
    //         i = parseInt(j / 11, 10);
    //         im = j + 2 - (12 * i);
    //         iy = (4 * k) + n + i - 4716;
    //     }
    //     return [iy, im, id];
    // }

    // function jalaliToIslamic(jYMD) {
    //     return gregorianToIslamic(jalaliToGregorian(jYMD));
    // }

    // function islamicToJalali(iYMD) {
    //     return gregorianToJalali(islamicToGregorian(iYMD));
    // }

    ////////////////////////////////////////////////////////////////////////////
})();

/*
	AHS502 : End of 'calendar-converter.js'
*/


/*
	AHS502 : Start of 'extensions.js'
*/

/*global gregorianToJalali*/

(function() {
    ////////////////////////////////////////////////////////////////////////////

    Date.prototype.gYMD = gYMD; // () => [2017, 3, 27]
    Date.prototype.jYMD = jYMD; // () => [1396, 1, 7]
    // Date.prototype.iYMD = iYMD; // () => [1438, 6, 28]
    Date.prototype.isValid = isValid; // (new Date()).isValid() === true
    Date.prototype.toLocalString = toLocalString; // () => "2017-03-27T18:02:34.591O+0330"    // (true) => "2017-03-27T18:02:34.591" (non-convertible to Date again)

    Date.parse = parseMaker(); // (All dates even LocalStringified) => 1490540446225

    String.prototype.toDate = toDate; // (All stringified dates even LocalStringified) => Date
    String.prototype.toPhoneNumber = toPhoneNumber; // ('  +981x23g 45 pp # ') => 012345
    String.prototype.isMobileNumber = isMobileNumber; // ('+989125557685') => true

    Array.range = range; // (2, 11, 3) => [2, 5, 8, 11]    // (7, 4) => [7, 6, 5, 4]
    Array.from = from; // ({0: true, 1: 12345, length: 2}) => [true, 12345]

    ////////////////////////////////////////////////////////////////////////////

    function gYMD() {
        var y = this.getFullYear(),
            m = this.getMonth() + 1,
            d = this.getDate();
        return [y, m, d];
    }

    function jYMD() {
        return gregorianToJalali(this.gYMD());
    }

    // function iYMD() {
    //     return gregorianToIslamic(this.gYMD());
    // }

    function isValid() {
        // NaN !== NaN, so:
        return this.getTime() === this.getTime();
    }

    function toLocalString(noGMT) {
        var d = new Date(this);
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        var s = d.toISOString().slice(0, -1);
        if (!noGMT) {
            var ds = this.toString();
            var gmt = ds.indexOf('GMT') + 3;
            s += 'O' + ds.slice(gmt, gmt + 5);
        }
        return s;
    }

    function parseMaker() {
        var Date_parse = Date.parse;
        return function(str) {
            str = (str || '').toString();
            if (typeof str === 'string' && str.slice(-6, -5) === 'O') {
                var gmt = str.slice(-5);
                var offset = Number(gmt.slice(1, 3)) * 60 + Number(gmt.slice(3, 5));
                if (gmt.slice(0, 1) === '-') offset = -offset;
                return Date_parse(str.slice(0, -6) + 'Z') - offset * 60 * 1000;
            }
            return Date_parse(str);
        };
    }

    function toDate() {
        return new Date(Date.parse(this));
    }

    function toPhoneNumber() {
        var s = this.replace(/\s/g, "");
        if (s.slice(0, 3) === '+98') s = '0' + s.slice(3);
        return s.split('').filter(function(char) {
            return '0123456789'.indexOf(char) >= 0;
        }).join('');
    }

    function isMobileNumber() {
        var n = this.toPhoneNumber();
        return n.length === 11 && n.slice(0, 2) === '09';
    }

    function range(from, to, step) {
        step = step || 1;
        if (typeof from !== 'number' || typeof to !== 'number' || typeof step !== 'number') {
            throw new Error('Provided from & to & step are not all numbers.');
        }
        if (step < 0) step = -step;
        var array = [];
        if (from <= to)
            while (from <= to) array.push(from++);
        else
            while (from >= to) array.push(from--);
        return array;
    }

    function from(arrayLike) {
        if (!arrayLike) return [];
        return Array.prototype.slice.call(arrayLike);
    }

    ////////////////////////////////////////////////////////////////////////////
})();

/*
	AHS502 : End of 'extensions.js'
*/


/*
	AHS502 : Start of 'icon-js.js'
*/

(function(global) {

    iconJs.file = file;
    global.iconJs = iconJs;

    //See this link for more SVG icons: http://www.flaticon.com/
    var dataUrls = {

        'left arrow': "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMzEuNDk0IDMxLjQ5NCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzEuNDk0IDMxLjQ5NDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6IzFFMjAxRDsiIGQ9Ik0xMC4yNzMsNS4wMDljMC40NDQtMC40NDQsMS4xNDMtMC40NDQsMS41ODcsMGMwLjQyOSwwLjQyOSwwLjQyOSwxLjE0MywwLDEuNTcxbC04LjA0Nyw4LjA0N2gyNi41NTQNCgljMC42MTksMCwxLjEyNywwLjQ5MiwxLjEyNywxLjExMWMwLDAuNjE5LTAuNTA4LDEuMTI3LTEuMTI3LDEuMTI3SDMuODEzbDguMDQ3LDguMDMyYzAuNDI5LDAuNDQ0LDAuNDI5LDEuMTU5LDAsMS41ODcNCgljLTAuNDQ0LDAuNDQ0LTEuMTQzLDAuNDQ0LTEuNTg3LDBsLTkuOTUyLTkuOTUyYy0wLjQyOS0wLjQyOS0wLjQyOS0xLjE0MywwLTEuNTcxTDEwLjI3Myw1LjAwOXoiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K",
        'menu bars': "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPHN2ZyB3aWR0aD0iNjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjY0IiB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA2NCA2NCI+CiAgPGc+CiAgICA8ZyBmaWxsPSIjMUQxRDFCIj4KICAgICAgPHBhdGggZD0iTTIuMjUyLDEwLjI3MWg1OC44NzFjMS4xMjQsMCwyLjAzNC0wLjkxLDIuMDM0LTIuMDM0YzAtMS4xMjMtMC45MS0yLjAzNC0yLjAzNC0yLjAzNEgyLjI1MiAgICBjLTEuMTI0LDAtMi4wMzQsMC45MTEtMi4wMzQsMi4wMzRDMC4yMTgsOS4zNiwxLjEyOCwxMC4yNzEsMi4yNTIsMTAuMjcxeiIvPgogICAgICA8cGF0aCBkPSJtNjEuMTIzLDMwLjAxNWgtNTguODcxYy0xLjEyNCwwLTIuMDM0LDAuOTEyLTIuMDM0LDIuMDM1IDAsMS4xMjIgMC45MSwyLjAzNCAyLjAzNCwyLjAzNGg1OC44NzFjMS4xMjQsMCAyLjAzNC0wLjkxMiAyLjAzNC0yLjAzNC03LjEwNTQzZS0xNS0xLjEyMy0wLjkxLTIuMDM1LTIuMDM0LTIuMDM1eiIvPgogICAgICA8cGF0aCBkPSJtNjEuMTIzLDUzLjg3NmgtNTguODcxYy0xLjEyNCwwLTIuMDM0LDAuOTEtMi4wMzQsMi4wMzQgMCwxLjEyMyAwLjkxLDIuMDM0IDIuMDM0LDIuMDM0aDU4Ljg3MWMxLjEyNCwwIDIuMDM0LTAuOTExIDIuMDM0LTIuMDM0LTcuMTA1NDNlLTE1LTEuMTI0LTAuOTEtMi4wMzQtMi4wMzQtMi4wMzR6Ii8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K",

        'delete': "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgMzQ4LjMzMyAzNDguMzM0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzNDguMzMzIDM0OC4zMzQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMzM2LjU1OSw2OC42MTFMMjMxLjAxNiwxNzQuMTY1bDEwNS41NDMsMTA1LjU0OWMxNS42OTksMTUuNzA1LDE1LjY5OSw0MS4xNDUsMCw1Ni44NSAgIGMtNy44NDQsNy44NDQtMTguMTI4LDExLjc2OS0yOC40MDcsMTEuNzY5Yy0xMC4yOTYsMC0yMC41ODEtMy45MTktMjguNDE5LTExLjc2OUwxNzQuMTY3LDIzMS4wMDNMNjguNjA5LDMzNi41NjMgICBjLTcuODQzLDcuODQ0LTE4LjEyOCwxMS43NjktMjguNDE2LDExLjc2OWMtMTAuMjg1LDAtMjAuNTYzLTMuOTE5LTI4LjQxMy0xMS43NjljLTE1LjY5OS0xNS42OTgtMTUuNjk5LTQxLjEzOSwwLTU2Ljg1ICAgbDEwNS41NC0xMDUuNTQ5TDExLjc3NCw2OC42MTFjLTE1LjY5OS0xNS42OTktMTUuNjk5LTQxLjE0NSwwLTU2Ljg0NGMxNS42OTYtMTUuNjg3LDQxLjEyNy0xNS42ODcsNTYuODI5LDBsMTA1LjU2MywxMDUuNTU0ICAgTDI3OS43MjEsMTEuNzY3YzE1LjcwNS0xNS42ODcsNDEuMTM5LTE1LjY4Nyw1Ni44MzIsMEMzNTIuMjU4LDI3LjQ2NiwzNTIuMjU4LDUyLjkxMiwzMzYuNTU5LDY4LjYxMXoiIGZpbGw9IiNEODAwMjciLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",
        'down triangle': 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAzODYuMjU3IDM4Ni4yNTciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM4Ni4yNTcgMzg2LjI1NzsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8cG9seWdvbiBwb2ludHM9IjAsOTYuODc5IDE5My4xMjksMjg5LjM3OSAzODYuMjU3LDk2Ljg3OSAiIGZpbGw9IiMwMDAwMDAiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==',

        'free file': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2IDU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NiA1NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6I0U5RTlFMDsiIGQ9Ik0zNi45ODUsMEg3Ljk2M0M3LjE1NSwwLDYuNSwwLjY1NSw2LjUsMS45MjZWNTVjMCwwLjM0NSwwLjY1NSwxLDEuNDYzLDFoNDAuMDc0ICAgYzAuODA4LDAsMS40NjMtMC42NTUsMS40NjMtMVYxMi45NzhjMC0wLjY5Ni0wLjA5My0wLjkyLTAuMjU3LTEuMDg1TDM3LjYwNywwLjI1N0MzNy40NDIsMC4wOTMsMzcuMjE4LDAsMzYuOTg1LDB6Ii8+Cgk8cG9seWdvbiBzdHlsZT0iZmlsbDojRDlEN0NBOyIgcG9pbnRzPSIzNy41LDAuMTUxIDM3LjUsMTIgNDkuMzQ5LDEyICAiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNDOEJEQjg7IiBkPSJNNDguMDM3LDU2SDcuOTYzQzcuMTU1LDU2LDYuNSw1NS4zNDUsNi41LDU0LjUzN1YzOWg0M3YxNS41MzdDNDkuNSw1NS4zNDUsNDguODQ1LDU2LDQ4LjAzNyw1NnoiLz4KCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGN4PSIxOC41IiBjeT0iNDciIHI9IjMiLz4KCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGN4PSIyOC41IiBjeT0iNDciIHI9IjMiLz4KCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGN4PSIzOC41IiBjeT0iNDciIHI9IjMiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",
        'doc file': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2IDU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NiA1NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6I0U5RTlFMDsiIGQ9Ik0zNi45ODUsMEg3Ljk2M0M3LjE1NSwwLDYuNSwwLjY1NSw2LjUsMS45MjZWNTVjMCwwLjM0NSwwLjY1NSwxLDEuNDYzLDFoNDAuMDc0ICAgYzAuODA4LDAsMS40NjMtMC42NTUsMS40NjMtMVYxMi45NzhjMC0wLjY5Ni0wLjA5My0wLjkyLTAuMjU3LTEuMDg1TDM3LjYwNywwLjI1N0MzNy40NDIsMC4wOTMsMzcuMjE4LDAsMzYuOTg1LDB6Ii8+Cgk8cG9seWdvbiBzdHlsZT0iZmlsbDojRDlEN0NBOyIgcG9pbnRzPSIzNy41LDAuMTUxIDM3LjUsMTIgNDkuMzQ5LDEyICAiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM4Njk3Q0I7IiBkPSJNMTguNSwxM2gtNmMtMC41NTIsMC0xLTAuNDQ4LTEtMXMwLjQ0OC0xLDEtMWg2YzAuNTUyLDAsMSwwLjQ0OCwxLDFTMTkuMDUyLDEzLDE4LjUsMTN6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojODY5N0NCOyIgZD0iTTIxLjUsMThoLTljLTAuNTUyLDAtMS0wLjQ0OC0xLTFzMC40NDgtMSwxLTFoOWMwLjU1MiwwLDEsMC40NDgsMSwxUzIyLjA1MiwxOCwyMS41LDE4eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6Izg2OTdDQjsiIGQ9Ik0yNS41LDE4Yy0wLjI2LDAtMC41Mi0wLjExLTAuNzEtMC4yOWMtMC4xOC0wLjE5LTAuMjktMC40NS0wLjI5LTAuNzFjMC0wLjI2LDAuMTEtMC41MiwwLjI5LTAuNzEgICBjMC4zNy0wLjM3LDEuMDUtMC4zNywxLjQyLDBjMC4xOCwwLjE5LDAuMjksMC40NSwwLjI5LDAuNzFjMCwwLjI2LTAuMTEsMC41Mi0wLjI5LDAuNzFDMjYuMDIsMTcuODksMjUuNzYsMTgsMjUuNSwxOHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM4Njk3Q0I7IiBkPSJNMzcuNSwxOGgtOGMtMC41NTIsMC0xLTAuNDQ4LTEtMXMwLjQ0OC0xLDEtMWg4YzAuNTUyLDAsMSwwLjQ0OCwxLDFTMzguMDUyLDE4LDM3LjUsMTh6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojODY5N0NCOyIgZD0iTTEyLjUsMzNjLTAuMjYsMC0wLjUyLTAuMTEtMC43MS0wLjI5Yy0wLjE4LTAuMTktMC4yOS0wLjQ1LTAuMjktMC43MWMwLTAuMjYsMC4xMS0wLjUyLDAuMjktMC43MSAgIGMwLjM3LTAuMzcsMS4wNS0wLjM3LDEuNDIsMGMwLjE4LDAuMTksMC4yOSwwLjQ0LDAuMjksMC43MWMwLDAuMjYtMC4xMSwwLjUyLTAuMjksMC43MUMxMy4wMiwzMi44OSwxMi43NiwzMywxMi41LDMzeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6Izg2OTdDQjsiIGQ9Ik0yNC41LDMzaC04Yy0wLjU1MiwwLTEtMC40NDgtMS0xczAuNDQ4LTEsMS0xaDhjMC41NTIsMCwxLDAuNDQ4LDEsMVMyNS4wNTIsMzMsMjQuNSwzM3oiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM4Njk3Q0I7IiBkPSJNNDMuNSwxOGgtMmMtMC41NTIsMC0xLTAuNDQ4LTEtMXMwLjQ0OC0xLDEtMWgyYzAuNTUyLDAsMSwwLjQ0OCwxLDFTNDQuMDUyLDE4LDQzLjUsMTh6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojODY5N0NCOyIgZD0iTTM0LjUsMjNoLTIyYy0wLjU1MiwwLTEtMC40NDgtMS0xczAuNDQ4LTEsMS0xaDIyYzAuNTUyLDAsMSwwLjQ0OCwxLDFTMzUuMDUyLDIzLDM0LjUsMjN6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojODY5N0NCOyIgZD0iTTQzLjUsMjNoLTZjLTAuNTUyLDAtMS0wLjQ0OC0xLTFzMC40NDgtMSwxLTFoNmMwLjU1MiwwLDEsMC40NDgsMSwxUzQ0LjA1MiwyMyw0My41LDIzeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6Izg2OTdDQjsiIGQ9Ik0xNi41LDI4aC00Yy0wLjU1MiwwLTEtMC40NDgtMS0xczAuNDQ4LTEsMS0xaDRjMC41NTIsMCwxLDAuNDQ4LDEsMVMxNy4wNTIsMjgsMTYuNSwyOHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM4Njk3Q0I7IiBkPSJNMzAuNSwyOGgtMTBjLTAuNTUyLDAtMS0wLjQ0OC0xLTFzMC40NDgtMSwxLTFoMTBjMC41NTIsMCwxLDAuNDQ4LDEsMVMzMS4wNTIsMjgsMzAuNSwyOHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM4Njk3Q0I7IiBkPSJNNDMuNSwyOGgtOWMtMC41NTIsMC0xLTAuNDQ4LTEtMXMwLjQ0OC0xLDEtMWg5YzAuNTUyLDAsMSwwLjQ0OCwxLDFTNDQuMDUyLDI4LDQzLjUsMjh6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojMDA5NkU2OyIgZD0iTTQ4LjAzNyw1Nkg3Ljk2M0M3LjE1NSw1Niw2LjUsNTUuMzQ1LDYuNSw1NC41MzdWMzloNDN2MTUuNTM3QzQ5LjUsNTUuMzQ1LDQ4Ljg0NSw1Niw0OC4wMzcsNTZ6Ii8+Cgk8Zz4KCQk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTIzLjUsNDcuNjgyYzAsMC44MjktMC4wODksMS41MzgtMC4yNjcsMi4xMjZzLTAuNDAzLDEuMDgtMC42NzcsMS40NzdzLTAuNTgxLDAuNzA5LTAuOTIzLDAuOTM3ICAgIHMtMC42NzIsMC4zOTgtMC45OTEsMC41MTNjLTAuMzE5LDAuMTE0LTAuNjExLDAuMTg3LTAuODc1LDAuMjE5QzE5LjUwMyw1Mi45ODQsMTkuMzA3LDUzLDE5LjE4LDUzaC0zLjgxNFY0Mi45MjRIMTguNCAgICBjMC44NDgsMCwxLjU5MywwLjEzNSwyLjIzNSwwLjQwM3MxLjE3NiwwLjYyNywxLjYsMS4wNzNzMC43NCwwLjk1NSwwLjk1LDEuNTI0QzIzLjM5NSw0Ni40OTQsMjMuNSw0Ny4wOCwyMy41LDQ3LjY4MnogICAgIE0xOC42MzMsNTEuNzk3YzEuMTEyLDAsMS45MTQtMC4zNTUsMi40MDYtMS4wNjZzMC43MzgtMS43NDEsMC43MzgtMy4wOWMwLTAuNDE5LTAuMDUtMC44MzQtMC4xNS0xLjI0NCAgICBjLTAuMTAxLTAuNDEtMC4yOTQtMC43ODEtMC41ODEtMS4xMTRzLTAuNjc3LTAuNjAyLTEuMTY5LTAuODA3cy0xLjEzLTAuMzA4LTEuOTE0LTAuMzA4aC0wLjk1N3Y3LjYyOUgxOC42MzN6Ii8+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zMy40NzUsNDcuOTE0YzAsMC44NDgtMC4xMDcsMS41OTUtMC4zMjEsMi4yNDJjLTAuMjE0LDAuNjQ3LTAuNTExLDEuMTg1LTAuODg5LDEuNjEzICAgIGMtMC4zNzgsMC40MjktMC44MiwwLjc1Mi0xLjMyNiwwLjk3MXMtMS4wNiwwLjMyOC0xLjY2MSwwLjMyOHMtMS4xNTUtMC4xMDktMS42NjEtMC4zMjhzLTAuOTQ4LTAuNTQyLTEuMzI2LTAuOTcxICAgIGMtMC4zNzgtMC40MjktMC42NzUtMC45NjYtMC44ODktMS42MTNjLTAuMjE0LTAuNjQ3LTAuMzIxLTEuMzk1LTAuMzIxLTIuMjQyczAuMTA3LTEuNTkzLDAuMzIxLTIuMjM1ICAgIGMwLjIxNC0wLjY0MywwLjUxLTEuMTc4LDAuODg5LTEuNjA2YzAuMzc4LTAuNDI5LDAuODItMC43NTQsMS4zMjYtMC45NzhzMS4wNi0wLjMzNSwxLjY2MS0wLjMzNXMxLjE1NSwwLjExMSwxLjY2MSwwLjMzNSAgICBzMC45NDgsMC41NDksMS4zMjYsMC45NzhjMC4zNzgsMC40MjksMC42NzQsMC45NjQsMC44ODksMS42MDZDMzMuMzY3LDQ2LjMyMSwzMy40NzUsNDcuMDY2LDMzLjQ3NSw0Ny45MTR6IE0yOS4yMzYsNTEuNzI5ICAgIGMwLjMzNywwLDAuNjU4LTAuMDY2LDAuOTY0LTAuMTk4YzAuMzA1LTAuMTMyLDAuNTc5LTAuMzQ5LDAuODItMC42NDljMC4yNDEtMC4zMDEsMC40MzEtMC42OTUsMC41NjctMS4xODMgICAgczAuMjA5LTEuMDgyLDAuMjE5LTEuNzg0Yy0wLjAwOS0wLjY4NC0wLjA4LTEuMjY1LTAuMjEyLTEuNzQzYy0wLjEzMi0wLjQ3OS0wLjMxNC0wLjg3My0wLjU0Ny0xLjE4M3MtMC40OTctMC41MzMtMC43OTMtMC42NyAgICBjLTAuMjk2LTAuMTM3LTAuNjA4LTAuMjA1LTAuOTM3LTAuMjA1Yy0wLjMzNywwLTAuNjU5LDAuMDYzLTAuOTY0LDAuMTkxYy0wLjMwNiwwLjEyOC0wLjU3OSwwLjM0NC0wLjgyLDAuNjQ5ICAgIGMtMC4yNDIsMC4zMDYtMC40MzEsMC42OTktMC41NjcsMS4xODNzLTAuMjEsMS4wNzUtMC4yMTksMS43NzdjMC4wMDksMC42ODQsMC4wOCwxLjI2NywwLjIxMiwxLjc1ICAgIGMwLjEzMiwwLjQ4MywwLjMxNCwwLjg3NywwLjU0NywxLjE4M3MwLjQ5NywwLjUyOCwwLjc5MywwLjY3QzI4LjU5Niw1MS42NTgsMjguOTA4LDUxLjcyOSwyOS4yMzYsNTEuNzI5eiIvPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNNDIuNjA3LDUxLjk3NWMtMC4zNzQsMC4zNjQtMC43OTgsMC42MzgtMS4yNzEsMC44MmMtMC40NzQsMC4xODMtMC45ODQsMC4yNzMtMS41MzEsMC4yNzMgICAgYy0wLjYwMiwwLTEuMTU1LTAuMTA5LTEuNjYxLTAuMzI4cy0wLjk0OC0wLjU0Mi0xLjMyNi0wLjk3MWMtMC4zNzgtMC40MjktMC42NzUtMC45NjYtMC44ODktMS42MTMgICAgYy0wLjIxNC0wLjY0Ny0wLjMyMS0xLjM5NS0wLjMyMS0yLjI0MnMwLjEwNy0xLjU5MywwLjMyMS0yLjIzNWMwLjIxNC0wLjY0MywwLjUxLTEuMTc4LDAuODg5LTEuNjA2ICAgIGMwLjM3OC0wLjQyOSwwLjgyMi0wLjc1NCwxLjMzMy0wLjk3OGMwLjUxLTAuMjI0LDEuMDYyLTAuMzM1LDEuNjU0LTAuMzM1YzAuNTQ3LDAsMS4wNTcsMC4wOTEsMS41MzEsMC4yNzMgICAgYzAuNDc0LDAuMTgzLDAuODk3LDAuNDU2LDEuMjcxLDAuODJsLTEuMTM1LDEuMDEyYy0wLjIyOC0wLjI2NS0wLjQ4MS0wLjQ1Ni0wLjc1OS0wLjU3NGMtMC4yNzgtMC4xMTgtMC41NjctMC4xNzgtMC44NjgtMC4xNzggICAgYy0wLjMzNywwLTAuNjU5LDAuMDYzLTAuOTY0LDAuMTkxYy0wLjMwNiwwLjEyOC0wLjU3OSwwLjM0NC0wLjgyLDAuNjQ5Yy0wLjI0MiwwLjMwNi0wLjQzMSwwLjY5OS0wLjU2NywxLjE4MyAgICBzLTAuMjEsMS4wNzUtMC4yMTksMS43NzdjMC4wMDksMC42ODQsMC4wOCwxLjI2NywwLjIxMiwxLjc1YzAuMTMyLDAuNDgzLDAuMzE0LDAuODc3LDAuNTQ3LDEuMTgzczAuNDk3LDAuNTI4LDAuNzkzLDAuNjcgICAgYzAuMjk2LDAuMTQyLDAuNjA4LDAuMjEyLDAuOTM3LDAuMjEyczAuNjM2LTAuMDYsMC45MjMtMC4xNzhzMC41NDktMC4zMSwwLjc4Ni0wLjU3NEw0Mi42MDcsNTEuOTc1eiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=",
        'xls file': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2IDU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NiA1NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6I0U5RTlFMDsiIGQ9Ik0zNi45ODUsMEg3Ljk2M0M3LjE1NSwwLDYuNSwwLjY1NSw2LjUsMS45MjZWNTVjMCwwLjM0NSwwLjY1NSwxLDEuNDYzLDFoNDAuMDc0ICAgYzAuODA4LDAsMS40NjMtMC42NTUsMS40NjMtMVYxMi45NzhjMC0wLjY5Ni0wLjA5My0wLjkyLTAuMjU3LTEuMDg1TDM3LjYwNywwLjI1N0MzNy40NDIsMC4wOTMsMzcuMjE4LDAsMzYuOTg1LDB6Ii8+Cgk8cG9seWdvbiBzdHlsZT0iZmlsbDojRDlEN0NBOyIgcG9pbnRzPSIzNy41LDAuMTUxIDM3LjUsMTIgNDkuMzQ5LDEyICAiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM5MUNEQTA7IiBkPSJNNDguMDM3LDU2SDcuOTYzQzcuMTU1LDU2LDYuNSw1NS4zNDUsNi41LDU0LjUzN1YzOWg0M3YxNS41MzdDNDkuNSw1NS4zNDUsNDguODQ1LDU2LDQ4LjAzNyw1NnoiLz4KCTxnPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMjAuMzc5LDQ4LjEwNUwyMi45MzYsNTNoLTEuOWwtMS42LTMuODAxaC0wLjEzN0wxNy41NzYsNTNoLTEuOWwyLjU1Ny00Ljg5NWwtMi43MjEtNS4xODJoMS44NzMgICAgbDEuNzc3LDQuMTAyaDAuMTM3bDEuOTI4LTQuMTAySDIzLjFMMjAuMzc5LDQ4LjEwNXoiLz4KCQk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTI3LjAzNyw0Mi45MjR2OC44MzJoNC42MzVWNTNoLTYuMzAzVjQyLjkyNEgyNy4wMzd6Ii8+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zOS4wNDEsNTAuMjM4YzAsMC4zNjQtMC4wNzUsMC43MTgtMC4yMjYsMS4wNlMzOC40NTMsNTEuOTQsMzguMTgsNTIuMnMtMC42MTEsMC40NjctMS4wMTIsMC42MjIgICAgYy0wLjQwMSwwLjE1NS0wLjg1NywwLjIzMi0xLjM2NywwLjIzMmMtMC4yMTksMC0wLjQ0NC0wLjAxMi0wLjY3Ny0wLjAzNHMtMC40NjctMC4wNjItMC43MDQtMC4xMTYgICAgYy0wLjIzNy0wLjA1NS0wLjQ2My0wLjEzLTAuNjc3LTAuMjI2Yy0wLjIxNC0wLjA5Ni0wLjM5OS0wLjIxMi0wLjU1NC0wLjM0OWwwLjI4Ny0xLjE3NmMwLjEyNywwLjA3MywwLjI4OSwwLjE0NCwwLjQ4NSwwLjIxMiAgICBjMC4xOTYsMC4wNjgsMC4zOTgsMC4xMzIsMC42MDgsMC4xOTFjMC4yMDksMC4wNiwwLjQxOSwwLjEwNywwLjYyOSwwLjE0NGMwLjIwOSwwLjAzNiwwLjQwNSwwLjA1NSwwLjU4OCwwLjA1NSAgICBjMC41NTYsMCwwLjk4Mi0wLjEzLDEuMjc4LTAuMzljMC4yOTYtMC4yNiwwLjQ0NC0wLjY0NSwwLjQ0NC0xLjE1NWMwLTAuMzEtMC4xMDUtMC41NzQtMC4zMTQtMC43OTMgICAgYy0wLjIxLTAuMjE5LTAuNDcyLTAuNDE3LTAuNzg2LTAuNTk1cy0wLjY1NC0wLjM1NS0xLjAxOS0wLjUzM2MtMC4zNjUtMC4xNzgtMC43MDctMC4zODgtMS4wMjUtMC42MjkgICAgYy0wLjMxOS0wLjI0MS0wLjU4My0wLjUyNi0wLjc5My0wLjg1NGMtMC4yMS0wLjMyOC0wLjMxNC0wLjczOC0wLjMxNC0xLjIzYzAtMC40NDYsMC4wODItMC44NDMsMC4yNDYtMS4xODkgICAgczAuMzg1LTAuNjQxLDAuNjYzLTAuODgyYzAuMjc4LTAuMjQxLDAuNjAyLTAuNDI2LDAuOTcxLTAuNTU0czAuNzU5LTAuMTkxLDEuMTY5LTAuMTkxYzAuNDE5LDAsMC44NDMsMC4wMzksMS4yNzEsMC4xMTYgICAgYzAuNDI4LDAuMDc3LDAuNzc0LDAuMjAzLDEuMDM5LDAuMzc2Yy0wLjA1NSwwLjExOC0wLjExOSwwLjI0OC0wLjE5MSwwLjM5Yy0wLjA3MywwLjE0Mi0wLjE0MiwwLjI3My0wLjIwNSwwLjM5NiAgICBjLTAuMDY0LDAuMTIzLTAuMTE5LDAuMjI2LTAuMTY0LDAuMzA4Yy0wLjA0NiwwLjA4Mi0wLjA3MywwLjEyOC0wLjA4MiwwLjEzN2MtMC4wNTUtMC4wMjctMC4xMTYtMC4wNjMtMC4xODUtMC4xMDkgICAgcy0wLjE2Ny0wLjA5MS0wLjI5NC0wLjEzN2MtMC4xMjgtMC4wNDYtMC4yOTYtMC4wNzctMC41MDYtMC4wOTZjLTAuMjEtMC4wMTktMC40NzktMC4wMTQtMC44MDcsMC4wMTQgICAgYy0wLjE4MywwLjAxOS0wLjM1NSwwLjA3LTAuNTIsMC4xNTdzLTAuMzEsMC4xOTMtMC40MzgsMC4zMjFjLTAuMTI4LDAuMTI4LTAuMjI4LDAuMjcxLTAuMzAxLDAuNDMxICAgIGMtMC4wNzMsMC4xNTktMC4xMDksMC4zMTMtMC4xMDksMC40NThjMCwwLjM2NCwwLjEwNCwwLjY1OCwwLjMxNCwwLjg4MmMwLjIwOSwwLjIyNCwwLjQ2OSwwLjQxOSwwLjc3OSwwLjU4OCAgICBjMC4zMSwwLjE2OSwwLjY0NywwLjMzMywxLjAxMiwwLjQ5MmMwLjM2NCwwLjE1OSwwLjcwNCwwLjM1NCwxLjAxOSwwLjU4MXMwLjU3NiwwLjUxMywwLjc4NiwwLjg1NCAgICBDMzguOTM2LDQ5LjI2MSwzOS4wNDEsNDkuNywzOS4wNDEsNTAuMjM4eiIvPgoJPC9nPgoJPHBhdGggc3R5bGU9ImZpbGw6I0M4QkRCODsiIGQ9Ik0yMy41LDE2di00aC0xMnY0djJ2MnYydjJ2MnYydjJ2NGgxMGgyaDIxdi00di0ydi0ydi0ydi0ydi0ydi00SDIzLjV6IE0xMy41LDE0aDh2MmgtOFYxNHogICAgTTEzLjUsMThoOHYyaC04VjE4eiBNMTMuNSwyMmg4djJoLThWMjJ6IE0xMy41LDI2aDh2MmgtOFYyNnogTTIxLjUsMzJoLTh2LTJoOFYzMnogTTQyLjUsMzJoLTE5di0yaDE5VjMyeiBNNDIuNSwyOGgtMTl2LTJoMTlWMjggICB6IE00Mi41LDI0aC0xOXYtMmgxOVYyNHogTTIzLjUsMjB2LTJoMTl2MkgyMy41eiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=",
        'pdf file': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2IDU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NiA1NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6I0U5RTlFMDsiIGQ9Ik0zNi45ODUsMEg3Ljk2M0M3LjE1NSwwLDYuNSwwLjY1NSw2LjUsMS45MjZWNTVjMCwwLjM0NSwwLjY1NSwxLDEuNDYzLDFoNDAuMDc0ICAgYzAuODA4LDAsMS40NjMtMC42NTUsMS40NjMtMVYxMi45NzhjMC0wLjY5Ni0wLjA5My0wLjkyLTAuMjU3LTEuMDg1TDM3LjYwNywwLjI1N0MzNy40NDIsMC4wOTMsMzcuMjE4LDAsMzYuOTg1LDB6Ii8+Cgk8cG9seWdvbiBzdHlsZT0iZmlsbDojRDlEN0NBOyIgcG9pbnRzPSIzNy41LDAuMTUxIDM3LjUsMTIgNDkuMzQ5LDEyICAiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNDQzRCNEM7IiBkPSJNMTkuNTE0LDMzLjMyNEwxOS41MTQsMzMuMzI0Yy0wLjM0OCwwLTAuNjgyLTAuMTEzLTAuOTY3LTAuMzI2ICAgYy0xLjA0MS0wLjc4MS0xLjE4MS0xLjY1LTEuMTE1LTIuMjQyYzAuMTgyLTEuNjI4LDIuMTk1LTMuMzMyLDUuOTg1LTUuMDY4YzEuNTA0LTMuMjk2LDIuOTM1LTcuMzU3LDMuNzg4LTEwLjc1ICAgYy0wLjk5OC0yLjE3Mi0xLjk2OC00Ljk5LTEuMjYxLTYuNjQzYzAuMjQ4LTAuNTc5LDAuNTU3LTEuMDIzLDEuMTM0LTEuMjE1YzAuMjI4LTAuMDc2LDAuODA0LTAuMTcyLDEuMDE2LTAuMTcyICAgYzAuNTA0LDAsMC45NDcsMC42NDksMS4yNjEsMS4wNDljMC4yOTUsMC4zNzYsMC45NjQsMS4xNzMtMC4zNzMsNi44MDJjMS4zNDgsMi43ODQsMy4yNTgsNS42Miw1LjA4OCw3LjU2MiAgIGMxLjMxMS0wLjIzNywyLjQzOS0wLjM1OCwzLjM1OC0wLjM1OGMxLjU2NiwwLDIuNTE1LDAuMzY1LDIuOTAyLDEuMTE3YzAuMzIsMC42MjIsMC4xODksMS4zNDktMC4zOSwyLjE2ICAgYy0wLjU1NywwLjc3OS0xLjMyNSwxLjE5MS0yLjIyLDEuMTkxYy0xLjIxNiwwLTIuNjMyLTAuNzY4LTQuMjExLTIuMjg1Yy0yLjgzNywwLjU5My02LjE1LDEuNjUxLTguODI4LDIuODIyICAgYy0wLjgzNiwxLjc3NC0xLjYzNywzLjIwMy0yLjM4Myw0LjI1MUMyMS4yNzMsMzIuNjU0LDIwLjM4OSwzMy4zMjQsMTkuNTE0LDMzLjMyNHogTTIyLjE3NiwyOC4xOTggICBjLTIuMTM3LDEuMjAxLTMuMDA4LDIuMTg4LTMuMDcxLDIuNzQ0Yy0wLjAxLDAuMDkyLTAuMDM3LDAuMzM0LDAuNDMxLDAuNjkyQzE5LjY4NSwzMS41ODcsMjAuNTU1LDMxLjE5LDIyLjE3NiwyOC4xOTh6ICAgIE0zNS44MTMsMjMuNzU2YzAuODE1LDAuNjI3LDEuMDE0LDAuOTQ0LDEuNTQ3LDAuOTQ0YzAuMjM0LDAsMC45MDEtMC4wMSwxLjIxLTAuNDQxYzAuMTQ5LTAuMjA5LDAuMjA3LTAuMzQzLDAuMjMtMC40MTUgICBjLTAuMTIzLTAuMDY1LTAuMjg2LTAuMTk3LTEuMTc1LTAuMTk3QzM3LjEyLDIzLjY0OCwzNi40ODUsMjMuNjcsMzUuODEzLDIzLjc1NnogTTI4LjM0MywxNy4xNzQgICBjLTAuNzE1LDIuNDc0LTEuNjU5LDUuMTQ1LTIuNjc0LDcuNTY0YzIuMDktMC44MTEsNC4zNjItMS41MTksNi40OTYtMi4wMkMzMC44MTUsMjEuMTUsMjkuNDY2LDE5LjE5MiwyOC4zNDMsMTcuMTc0eiAgICBNMjcuNzM2LDguNzEyYy0wLjA5OCwwLjAzMy0xLjMzLDEuNzU3LDAuMDk2LDMuMjE2QzI4Ljc4MSw5LjgxMywyNy43NzksOC42OTgsMjcuNzM2LDguNzEyeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0NDNEI0QzsiIGQ9Ik00OC4wMzcsNTZINy45NjNDNy4xNTUsNTYsNi41LDU1LjM0NSw2LjUsNTQuNTM3VjM5aDQzdjE1LjUzN0M0OS41LDU1LjM0NSw0OC44NDUsNTYsNDguMDM3LDU2eiIvPgoJPGc+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0xNy4zODUsNTNoLTEuNjQxVjQyLjkyNGgyLjg5OGMwLjQyOCwwLDAuODUyLDAuMDY4LDEuMjcxLDAuMjA1ICAgIGMwLjQxOSwwLjEzNywwLjc5NSwwLjM0MiwxLjEyOCwwLjYxNWMwLjMzMywwLjI3MywwLjYwMiwwLjYwNCwwLjgwNywwLjk5MXMwLjMwOCwwLjgyMiwwLjMwOCwxLjMwNiAgICBjMCwwLjUxMS0wLjA4NywwLjk3My0wLjI2LDEuMzg4Yy0wLjE3MywwLjQxNS0wLjQxNSwwLjc2NC0wLjcyNSwxLjA0NmMtMC4zMSwwLjI4Mi0wLjY4NCwwLjUwMS0xLjEyMSwwLjY1NiAgICBzLTAuOTIxLDAuMjMyLTEuNDQ5LDAuMjMyaC0xLjIxN1Y1M3ogTTE3LjM4NSw0NC4xNjh2My45OTJoMS41MDRjMC4yLDAsMC4zOTgtMC4wMzQsMC41OTUtMC4xMDMgICAgYzAuMTk2LTAuMDY4LDAuMzc2LTAuMTgsMC41NC0wLjMzNWMwLjE2NC0wLjE1NSwwLjI5Ni0wLjM3MSwwLjM5Ni0wLjY0OWMwLjEtMC4yNzgsMC4xNS0wLjYyMiwwLjE1LTEuMDMyICAgIGMwLTAuMTY0LTAuMDIzLTAuMzU0LTAuMDY4LTAuNTY3Yy0wLjA0Ni0wLjIxNC0wLjEzOS0wLjQxOS0wLjI4LTAuNjE1Yy0wLjE0Mi0wLjE5Ni0wLjM0LTAuMzYtMC41OTUtMC40OTIgICAgYy0wLjI1NS0wLjEzMi0wLjU5My0wLjE5OC0xLjAxMi0wLjE5OEgxNy4zODV6Ii8+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zMi4yMTksNDcuNjgyYzAsMC44MjktMC4wODksMS41MzgtMC4yNjcsMi4xMjZzLTAuNDAzLDEuMDgtMC42NzcsMS40NzdzLTAuNTgxLDAuNzA5LTAuOTIzLDAuOTM3ICAgIHMtMC42NzIsMC4zOTgtMC45OTEsMC41MTNjLTAuMzE5LDAuMTE0LTAuNjExLDAuMTg3LTAuODc1LDAuMjE5QzI4LjIyMiw1Mi45ODQsMjguMDI2LDUzLDI3Ljg5OCw1M2gtMy44MTRWNDIuOTI0aDMuMDM1ICAgIGMwLjg0OCwwLDEuNTkzLDAuMTM1LDIuMjM1LDAuNDAzczEuMTc2LDAuNjI3LDEuNiwxLjA3M3MwLjc0LDAuOTU1LDAuOTUsMS41MjRDMzIuMTE0LDQ2LjQ5NCwzMi4yMTksNDcuMDgsMzIuMjE5LDQ3LjY4MnogICAgIE0yNy4zNTIsNTEuNzk3YzEuMTEyLDAsMS45MTQtMC4zNTUsMi40MDYtMS4wNjZzMC43MzgtMS43NDEsMC43MzgtMy4wOWMwLTAuNDE5LTAuMDUtMC44MzQtMC4xNS0xLjI0NCAgICBjLTAuMTAxLTAuNDEtMC4yOTQtMC43ODEtMC41ODEtMS4xMTRzLTAuNjc3LTAuNjAyLTEuMTY5LTAuODA3cy0xLjEzLTAuMzA4LTEuOTE0LTAuMzA4aC0wLjk1N3Y3LjYyOUgyNy4zNTJ6Ii8+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zNi4yNjYsNDQuMTY4djMuMTcyaDQuMjExdjEuMTIxaC00LjIxMVY1M2gtMS42NjhWNDIuOTI0SDQwLjl2MS4yNDRIMzYuMjY2eiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=",

        //See: http://www.flaticon.com/packs/interface-icon-collection
        'reader': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ5MCA0OTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ5MCA0OTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiPgo8Zz4KCTxwYXRoIGQ9Ik0yNDUsNDQ0LjA2M2M0MS4zMDktMjEuODU2LDgyLjMwNy0yOS4xNDMsMTE4LjYwMS0yOS4xNDNjNzIuNTk2LDAsMTI2LjM5OSwyOS4xNDMsMTI2LjM5OSwyOS4xNDNWNzUuMzY5ICAgYy00MC45NTEtMjIuMDgxLTgxLjkwNi0yOS40MzItMTE4LjI4LTI5LjQzMkMyOTkuMjg0LDQ1LjkzOCwyNDUsNzUuMDgxLDI0NSw3NS4wODFzLTU0LjI5My0yOS4xNC0xMjYuNzItMjkuMTQ0ICAgQzgxLjkwMSw0NS45MzYsNDAuOTU4LDUzLjI4NCwwLDc1LjM2OXYzNjguNjkzYzAsMCw1My44MTMtMjkuMTQzLDEyNi4zOTktMjkuMTQzQzE2Mi42OTksNDE0LjkyLDIwMy42ODMsNDIyLjIwMiwyNDUsNDQ0LjA2M3ogICAgTTQ1OS4zNzUsOTQuNDkxdjMwNC41OWMtMjQuNjg1LTcuNjM0LTU3LjkxNC0xNC43ODYtOTUuNzc0LTE0Ljc4NmMtMzYuMTAyLDAtNzAuNjMzLDYuODMxLTEwMy4yODgsMTkuNTdWMTAxLjY1MSAgIGM2LjczNi0zLjM0OCw1Mi43NDUtMjUuMDg4LDExMS40MDctMjUuMDg4QzQwMi42NzYsNzYuNTYzLDQzMi4wODMsODIuNTg2LDQ1OS4zNzUsOTQuNDkxeiBNMzAuNjI1LDk0LjQ5MSAgIGMyNy4yOTctMTEuOTA4LDU2LjctMTcuOTMsODcuNjUzLTE3LjkyOGM1OC44MTIsMC4wMDQsMTA0LjkzNCwyMS44NjMsMTExLjQwOSwyNS4wODV2MzAyLjIxOCAgIGMtMzIuNjU1LTEyLjc0LTY3LjE4Ny0xOS41Ny0xMDMuMjg4LTE5LjU3Yy0zNy44NTUsMC03MS4wODksNy4xNTQtOTUuNzc0LDE0Ljc4OFY5NC40OTF6IiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==",
        'download': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiPgogIDxnPgogICAgPGc+CiAgICAgIDxwYXRoIGQ9Ik00ODAuNiwzNDEuNGMtMTEuMywwLTIwLjQsOS4xLTIwLjQsMjAuNHY5OC40SDUxLjh2LTk4LjRjMC0xMS4zLTkuMS0yMC40LTIwLjQtMjAuNGMtMTEuMywwLTIwLjQsOS4xLTIwLjQsMjAuNHYxMTguOCAgICBjMCwxMS4zLDkuMSwyMC40LDIwLjQsMjAuNGg0NDkuMmMxMS4zLDAsMjAuNC05LjEsMjAuNC0yMC40VjM2MS44QzUwMSwzNTAuNSw0OTEuOSwzNDEuNCw0ODAuNiwzNDEuNHoiIGZpbGw9IiMwMDAwMDAiLz4KICAgICAgPHBhdGggZD0ibTI0MSwzNjUuNmMxMS41LDExLjYgMjUuNiw1LjIgMjkuOSwwbDExNy4zLTEyNi4yYzcuNy04LjMgNy4yLTIxLjItMS4xLTI4LjktOC4zLTcuNy0yMS4yLTcuMi0yOC44LDEuMWwtODEuOSw4OC4xdi0yNjUuMmMwLTExLjMtOS4xLTIwLjQtMjAuNC0yMC40LTExLjMsMC0yMC40LDkuMS0yMC40LDIwLjR2MjY1LjNsLTgxLjktODguMWMtNy43LTguMy0yMC42LTguNy0yOC45LTEuMS04LjMsNy43LTguNywyMC42LTEuMSwyOC45bDExNy4zLDEyNi4xeiIgZmlsbD0iIzAwMDAwMCIvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==",
        'share': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUwMi43NDkgNTAyLjc0OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTAyLjc0OSA1MDIuNzQ5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzk0LjQsMTQ4LjI5OWMxLjQxNywwLDIuODMzLDAuMjgzLDQuMjUsMC4yODNsMCwwYzM5LjEsMCw3MS42ODMtMzAuODgzLDczLjk1LTY5Ljk4MyAgICBjMi4yNjctNDAuOC0yOC45LTc1LjkzMy02OS43LTc4LjQ4M2MtNDEuMDgzLTIuMjY3LTc1LjkzMywyOS4xODMtNzguMiw2OS43Yy0wLjU2Nyw5LjkxNywwLjg1LDE5LjI2NywzLjY4MywyOC4wNUwxNTIuMTUsMjAyLjk4MiAgICBjLTEzLjAzMy0xMS4wNS0yOS43NS0xNy44NS00OC4xNjctMTcuODVjLTQwLjgsMC03My45NSwzMy4xNS03My45NSw3My45NXMzMy4xNSw3My45NSw3My45NSw3My45NSAgICBjMTcuMjgzLDAsMzMuNDMzLTUuOTUsNDUuOS0xNi4xNWwxNzEuOTgzLDkzLjVjLTQuNTMzLDE3LjU2Ny0yLjI2NywzNS45ODMsNi4yMzMsNTIuMTMzYzEyLjc1LDI0LjY1LDM3Ljk2Nyw0MC4yMzMsNjUuNzMzLDQwLjIzMyAgICBsMCwwYzExLjksMCwyMy41MTctMy4xMTcsMzQtOC43ODNjMzYuMjY3LTE4LjcsNTAuNDMzLTY0LjAzMywzMS43MzMtMTAwLjAxN2MtMTIuNzUtMjQuNjUtMzcuOTY3LTM5Ljk1LTY1LjczMy0zOS45NSAgICBjLTExLjksMC0yMy41MTcsMi44MzMtMzQsOC41Yy04LjUsNC41MzMtMTYuMTUsMTAuNDgzLTIyLjEsMTcuNTY3bC0xNjYuMzE3LTkwLjM4M2M0LjI1LTkuMzUsNi44LTE5LjgzMyw2LjgtMzAuODgzICAgIGMwLTEwLjItMS45ODMtMTkuODMzLTUuNjY3LTI4LjYxN2wxNzQuMjUtMTAzLjQxN0MzNTguOTgzLDEzOS4yMzIsMzc1LjY5OSwxNDcuNDQ5LDM5NC40LDE0OC4yOTl6IE0zNTguNjk5LDcyLjA4MiAgICBjMS4xMzMtMjEuMjUsMTguNy0zNy42ODMsMzkuOTUtMzcuNjgzYzAuODUsMCwxLjcsMCwyLjI2NywwYzIyLjEsMS40MTcsMzguODE3LDIwLjExNywzNy42ODMsNDIuMjE3ICAgIGMtMS4xMzMsMjEuODE3LTIwLjExNywzOC44MTctNDIuMjE3LDM3LjY4M0MzNzQuMjgzLDExMi44ODIsMzU3LjI4Myw5My44OTksMzU4LjY5OSw3Mi4wODJ6IE02NC4wMzMsMjU5LjA4MiAgICBjMC0yMi4xLDE3Ljg1LTM5Ljk1LDM5Ljk1LTM5Ljk1czM5Ljk1LDE3Ljg1LDM5Ljk1LDM5Ljk1cy0xNy44NSwzOS45NS0zOS45NSwzOS45NVM2NC4wMzMsMjgxLjE4Miw2NC4wMzMsMjU5LjA4MnogICAgIE0zNzUuNDE2LDM5Mi44MTVjNS42NjctMy4xMTcsMTEuOS00LjUzMywxOC40MTctNC41MzNjMTUuMDE3LDAsMjguNjE3LDguMjE3LDM1LjcsMjEuNTMzYzEwLjIsMTkuNTUsMi41NSw0My45MTctMTcsNTMuODMzICAgIGMtNS42NjcsMy4xMTctMTEuOSw0LjUzMy0xOC40MTcsNC41MzNsMCwwYy0xNS4wMTcsMC0yOC42MTctOC4yMTctMzUuNy0yMS41MzNjLTQuODE3LTkuMzUtNS45NS0yMC40LTIuNTUtMzAuNiAgICBDMzU4LjY5OSw0MDYuMTMyLDM2NS43ODMsMzk3LjYzMiwzNzUuNDE2LDM5Mi44MTV6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==",
        'print': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjkgMTI5IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMjkgMTI5IiB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiPgogIDxnPgogICAgPGc+CiAgICAgIDxwYXRoIGQ9Im0xMC41LDEwNWgyMi45djEzLjVjMCwyLjMgMS44LDQuMSA0LjEsNC4xaDU0YzIuMywwIDQuMS0xLjggNC4xLTQuMXYtMTMuNWgyMi45YzIuMywwIDQuMS0xLjggNC4xLTQuMXYtNzIuOGMwLTIuMy0xLjgtNC4xLTQuMS00LjFoLTIyLjl2LTEzLjVjMC0yLjMtMS44LTQuMS00LjEtNC4xaC01NGMtMi4zLDAtNC4xLDEuOC00LjEsNC4xdjEzLjVoLTIyLjljLTIuMywwLTQuMSwxLjgtNC4xLDQuMXY3Mi44YzAsMi4yIDEuOSw0LjEgNC4xLDQuMXptNzYuOSw5LjRoLTQ1Ljh2LTMzLjhoNDUuOHYzMy44em0tNDUuOC05OS44aDQ1Ljh2OS40aC00NS44di05LjR6bS0yNywxNy42aDIyLjkgNTQgMjIuOXY2NC42aC0xOC44di0xNi4yaDcuM2MyLjMsMCA0LjEtMS44IDQuMS00LjFzLTEuOC00LjEtNC4xLTQuMWgtMTEuNC01NC0xMS4zYy0yLjMsMC00LjEsMS44LTQuMSw0LjFzMS44LDQuMSA0LjEsNC4xaDcuM3YxNi4yaC0xOC45di02NC42eiIgZmlsbD0iIzAwMDAwMCIvPgogICAgICA8cGF0aCBkPSJtODYuMiw1My4zaDEwLjZjMi4zLDAgNC4xLTEuOCA0LjEtNC4xcy0xLjgtNC4xLTQuMS00LjFoLTEwLjZjLTIuMywwLTQuMSwxLjgtNC4xLDQuMXMxLjgsNC4xIDQuMSw0LjF6IiBmaWxsPSIjMDAwMDAwIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K",
        'laboratory': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiPgogIDxnPgogICAgPGc+CiAgICAgIDxnPgogICAgICAgIDxwYXRoIGQ9Im00MTAuMyw0NjAuMmgtMzA4LjZjLTAuNSwwLTAuOSwwLTEuMywwbDExMy43LTE4NC41YzItMy4yIDMtNi45IDMtMTAuN3YtMjEzLjJoNzcuNnYyMTMuMmMwLDMuOCAxLDcuNSAzLDEwLjdsMTEzLjcsMTg0LjVjLTAuMywwLTAuNywwLTEuMSwwem00MC43LTE0LjJsLTExNS4yLTE4Ni44di0xODYuNmMxMC4zLTYuMSAxNi45LTE2LjIgMTYuOS0yNy43IDAtMTktMTcuNy0zMy45LTQwLjItMzMuOWgtMTEzYy0yMi41LDAtNDAuMiwxNC45LTQwLjIsMzMuOSAwLDExLjUgNi41LDIxLjYgMTYuOSwyNy43djE4Ni43bC0xMTUuMiwxODYuN2MtNi40LDEwLjQtNi43LDIyLjktMC44LDMzLjUgNy41LDEzLjMgMjMuNCwyMS41IDQxLjUsMjEuNWgzMDguNWMxOC4xLDAgMzQtOC4yIDQxLjUtMjEuNSA2LTEwLjYgNS43LTIzLjEtMC43LTMzLjV6IiBmaWxsPSIjMDAwMDAwIi8+CiAgICAgIDwvZz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPgo=",
        'folder': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4IiB2aWV3Qm94PSIwIDAgNTQ1LjAyNyA1NDUuMDI3IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NDUuMDI3IDU0NS4wMjc7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNTQwLjc0MywyODEuMzU2Yy00LjE3OS04Ljc1NC0xMC41NjgtMTUuNDY0LTE5LjEyMy0yMC4xMmMtOC41NjYtNC42NjUtMTcuOTg3LTYuOTk1LTI4LjI2NC02Ljk5NWgtNTQuODE5di00NS42ODMgICBjMC0xNy41MTEtNi4yODMtMzIuNTQ4LTE4Ljg0My00NS4xMTFjLTEyLjU2Ni0xMi41NjItMjcuNjA0LTE4Ljg0Mi00NS4xMTEtMTguODQySDIxOS4yNjh2LTkuMTM2ICAgYzAtMTcuNTExLTYuMjgzLTMyLjU0OC0xOC44NDItNDUuMTA3Yy0xMi41NjQtMTIuNTYyLTI3LjYtMTguODQ2LTQ1LjExMS0xOC44NDZINjMuOTUzYy0xNy41MTEsMC0zMi41NDgsNi4yODMtNDUuMTExLDE4Ljg0NiAgIEM2LjI4LDEwMi45MjIsMCwxMTcuOTU5LDAsMTM1LjQ3djI3NC4wODhjMCwxNy41MDgsNi4yOCwzMi41NDUsMTguODQyLDQ1LjEwNGMxMi41NjMsMTIuNTY1LDI3LjYsMTguODQ5LDQ1LjExMSwxOC44NDloMzEwLjYzNiAgIGMxMi43NDgsMCwyNi4wNy0zLjI4NSwzOS45NzEtOS44NTVjMTMuODk1LTYuNTYzLDI0LjkyOC0xNC44OTQsMzMuMTEzLTI0Ljk4MUw1MzEuOSwzMzUuMDM3ICAgYzguNzU0LTExLjAzNywxMy4xMjctMjIuNDUzLDEzLjEyNy0zNC4yNkM1NDUuMDMxLDI5My45MjMsNTQzLjYwMywyODcuNDU4LDU0MC43NDMsMjgxLjM1NnogTTM2LjU0NywxMzUuNDc0ICAgYzAtNy42MTEsMi42NjMtMTQuMDg0LDcuOTkzLTE5LjQxNGM1LjMyNi01LjMyNywxMS43OTktNy45OTMsMTkuNDE0LTcuOTkzaDkxLjM2NWM3LjYxNSwwLDE0LjA4NCwyLjY2MywxOS40MTQsNy45OTMgICBjNS4zMjcsNS4zMyw3Ljk5MywxMS44MDMsNy45OTMsMTkuNDE0djE4LjI3NGMwLDcuNjE2LDIuNjY3LDE0LjA4Nyw3Ljk5NCwxOS40MTRzMTEuNzk4LDcuOTk0LDE5LjQxMiw3Ljk5NGgxNjQuNDUyICAgYzcuNjExLDAsMTQuMDg5LDIuNjY2LDE5LjQxOCw3Ljk5M2M1LjMyNCw1LjMyNiw3Ljk5LDExLjc5OSw3Ljk5LDE5LjQxNHY0NS42ODJIMTgyLjcyNWMtMTIuOTQxLDAtMjYuMjY5LDMuMjg0LTM5Ljk3Myw5Ljg1MSAgIGMtMTMuNzA2LDYuNTY3LTI0Ljc0NCwxNC44OTMtMzMuMTIsMjQuOTg2bC03My4wODUsODkuOTMxVjEzNS40NzR6IE01MDMuMzQ1LDMxMS45MTdsLTgzLjkzOSwxMDMuNjM3ICAgYy00Ljc1Myw1Ljg5OS0xMS41MTIsMTAuOTQzLTIwLjI3MiwxNS4xMjVjLTguNzU0LDQuMTg5LTE2LjkzOSw2LjI4My0yNC41NTEsNi4yODNINjMuOTUzYy0xMC4wODgsMC0xNS4xMzEtMy4zMzMtMTUuMTMxLTkuOTkyICAgYzAtMy4wNDYsMS43MTMtNi44NTIsNS4xNC0xMS40MjdsODMuOTM4LTEwMy42MzNjNC45NDktNS45MDMsMTEuNzUtMTAuODk2LDIwLjQxMy0xNC45ODljOC42NTgtNC4wOTMsMTYuNzk2LTYuMTQsMjQuNDExLTYuMTQgICBoMzEwLjYzMWMxMC4wODgsMCwxNS4xMjksMy4zMzMsMTUuMTI5LDkuOTkzQzUwOC40ODUsMzA0LjAxOSw1MDYuNzc4LDMwNy43MjgsNTAzLjM0NSwzMTEuOTE3eiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=",
        'home': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4Ni45ODggNDg2Ljk4OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDg2Ljk4OCA0ODYuOTg4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTYuODIyLDI4NC45NjhoMzkuNjY3djE1OC42NjdjMCw5LjM1LDcuNjUsMTcsMTcsMTdoMTE2LjE2N2M5LjM1LDAsMTctNy42NSwxNy0xN1YzMjcuNDY4aDcwLjgzM3YxMTYuMTY3ICAgIGMwLDkuMzUsNy42NSwxNywxNywxN2gxMTAuNWM5LjM1LDAsMTctNy42NSwxNy0xN1YyODQuOTY4aDQ4LjE2N2M2LjgsMCwxMy4wMzMtNC4yNSwxNS41ODMtMTAuNDgzICAgIGMyLjU1LTYuMjMzLDEuMTMzLTEzLjYtMy42ODMtMTguNDE3TDI2MC40ODksMzEuMzg1Yy02LjUxNy02LjUxNy0xNy4yODMtNi44LTIzLjgtMC4yODNMNS4yMDYsMjU1Ljc4NSAgICBjLTUuMSw0LjgxNy02LjUxNywxMi4xODMtMy45NjcsMTguN0MzLjc4OSwyODEuMDAxLDEwLjAyMiwyODQuOTY4LDE2LjgyMiwyODQuOTY4eiBNMjQ4LjAyMiw2Ny4zNjhsMTgxLjMzMywxODMuNmgtMjQuMzY3ICAgIGMtOS4zNSwwLTE3LDcuNjUtMTcsMTd2MTU4LjY2N2gtNzYuNVYzMTAuNDY4YzAtOS4zNS03LjY1LTE3LTE3LTE3SDE4OS42NTZjLTkuMzUsMC0xNyw3LjY1LTE3LDE3djExNi4xNjdIOTAuNDg5VjI2Ny45NjggICAgYzAtOS4zNS03LjY1LTE3LTE3LTE3SDU4Ljc1NkwyNDguMDIyLDY3LjM2OHoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",
        'post': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNTA5LjMwMiwxMDYuNjEzYy0wLjA4Mi0wLjI1LTAuMTc1LTAuNDk2LTAuMjU5LTAuNzQ2Yy0wLjExLTAuMzE5LTAuMjE3LTAuNjQtMC4zMzMtMC45NTYgICAgYy0wLjExNS0wLjMxNC0wLjIzOC0wLjYyMy0wLjM2LTAuOTM0Yy0wLjEyMi0wLjMxNS0wLjI0My0wLjYzMS0wLjM3MS0wLjk0MmMtMC4xMjYtMC4zMDQtMC4yNTktMC42MDMtMC4zOS0wLjkwNSAgICBjLTAuMTM1LTAuMzA5LTAuMjY3LTAuNjIxLTAuNDA5LTAuOTI2Yy0wLjEzNi0wLjI5Ni0wLjI3OS0wLjU4Ny0wLjQyMS0wLjg3OGMtMC4xNDctMC4zMDQtMC4yOTItMC42MDktMC40NDUtMC45MDkgICAgYy0wLjE0Ni0wLjI4Ny0wLjI5OS0wLjU2OC0wLjQ1MS0wLjg1MmMtMC4xNTktMC4yOTgtMC4zMTYtMC41OTctMC40ODEtMC44OWMtMC4xNTctMC4yOC0wLjMyMi0wLjU1NS0wLjQ4NC0wLjgzMSAgICBjLTAuMTY5LTAuMjg4LTAuMzM2LTAuNTc5LTAuNTExLTAuODY0Yy0wLjE2Ny0wLjI3Mi0wLjM0MS0wLjUzOC0wLjUxMy0wLjgwNmMtMC4xOC0wLjI4Mi0wLjM1OS0wLjU2NS0wLjU0NS0wLjg0NCAgICBjLTAuMTc2LTAuMjYzLTAuMzU5LTAuNTItMC41NC0wLjc3OGMtMC4xOTEtMC4yNzUtMC4zODEtMC41NTEtMC41NzgtMC44MmMtMC4xODUtMC4yNTQtMC4zNzYtMC41MDEtMC41NjUtMC43NSAgICBjLTAuMjA0LTAuMjY4LTAuNDA0LTAuNTM4LTAuNjEyLTAuODAxYy0wLjE5MS0wLjI0My0wLjM5MS0wLjQ3OS0wLjU4Ny0wLjcxOGMtMC4yMTQtMC4yNi0wLjQyNi0wLjUyMy0wLjY0Ni0wLjc3OSAgICBjLTAuMjAxLTAuMjM1LTAuNDEtMC40NjMtMC42MTQtMC42OTNjLTAuMjI0LTAuMjUyLTAuNDQ1LTAuNTA1LTAuNjczLTAuNzUyYy0wLjIwOC0wLjIyNC0wLjQyMy0wLjQ0Mi0wLjYzNC0wLjY2MiAgICBjLTAuMjM1LTAuMjQ0LTAuNDY3LTAuNDkxLTAuNzA4LTAuNzNjLTAuMjE1LTAuMjE1LTAuNDM2LTAuNDIyLTAuNjU2LTAuNjMyYy0wLjI0NS0wLjIzNS0wLjQ4Ni0wLjQ3My0wLjczNi0wLjcwMiAgICBjLTAuMjI0LTAuMjA3LTAuNDU0LTAuNDA2LTAuNjgyLTAuNjA5Yy0wLjI1My0wLjIyNC0wLjUwMy0wLjQ1Mi0wLjc1OS0wLjY3Yy0wLjIzMi0wLjE5OC0wLjQ3LTAuMzg4LTAuNzA2LTAuNTgxICAgIGMtMC4yNi0wLjIxNC0wLjUyLTAuNDMxLTAuNzg1LTAuNjRjLTAuMjM4LTAuMTg4LTAuNDgzLTAuMzY4LTAuNzI2LTAuNTUyYy0wLjI2OS0wLjIwNS0wLjUzNi0wLjQxMi0wLjgxLTAuNjEgICAgYy0wLjI0Ni0wLjE3OS0wLjQ5OS0wLjM0OS0wLjc0OC0wLjUyM2MtMC4yNzctMC4xOTQtMC41NTEtMC4zOTEtMC44MzMtMC41NzljLTAuMjU1LTAuMTctMC41MTUtMC4zMzItMC43NzQtMC40OTggICAgYy0wLjI4My0wLjE4MS0wLjU2Mi0wLjM2Ni0wLjg0OC0wLjU0MmMtMC4yNjItMC4xNjEtMC41My0wLjMxMy0wLjc5NS0wLjQ2OWMtMC4yODktMC4xNy0wLjU3Ny0wLjM0NC0wLjg3LTAuNTA5ICAgIGMtMC4yNjgtMC4xNS0wLjU0Mi0wLjI5Mi0wLjgxMy0wLjQzN2MtMC4yOTYtMC4xNTktMC41OS0wLjMyMi0wLjg4OS0wLjQ3NWMtMC4yNzYtMC4xNDEtMC41NTgtMC4yNzQtMC44MzgtMC40MSAgICBjLTAuMy0wLjE0Ny0wLjU5OS0wLjI5Ny0wLjkwMy0wLjQzOWMtMC4yODQtMC4xMzEtMC41NzItMC4yNTMtMC44NTgtMC4zNzhjLTAuMzA1LTAuMTM1LTAuNjA4LTAuMjczLTAuOTE2LTAuNDAxICAgIGMtMC4yOTQtMC4xMjItMC41OTMtMC4yMzUtMC44OS0wLjM1MmMtMC4zMDYtMC4xMi0wLjYxLTAuMjQ2LTAuOTE4LTAuMzYxYy0wLjMwMi0wLjExMi0wLjYwOC0wLjIxNC0wLjkxMy0wLjMxOSAgICBjLTAuMzA5LTAuMTA4LTAuNjE3LTAuMjItMC45MjgtMC4zMjNjLTAuMzExLTAuMTAxLTAuNjI2LTAuMTkzLTAuOTM4LTAuMjg4Yy0wLjMxMS0wLjA5NS0wLjYxOS0wLjE5NS0wLjkzMy0wLjI4NCAgICBjLTAuMzE3LTAuMDktMC42NC0wLjE2OS0wLjk1OS0wLjI1NGMtMC4zMTQtMC4wODItMC42MjUtMC4xNy0wLjk0LTAuMjQ2Yy0wLjMyNi0wLjA3OS0wLjY1Ny0wLjE0Ny0wLjk4NS0wLjIxOSAgICBjLTAuMzEzLTAuMDY5LTAuNjI0LTAuMTQ1LTAuOTM5LTAuMjA4Yy0wLjM0OC0wLjA3LTAuNzAxLTAuMTI4LTEuMDUyLTAuMTljLTAuMjk5LTAuMDUzLTAuNTk4LTAuMTE0LTAuODk4LTAuMTYxICAgIGMtMC4zNjctMC4wNTktMC43MzgtMC4xMDUtMS4xMDctMC4xNTZjLTAuMjg5LTAuMDQtMC41NzctMC4wODYtMC44NjctMC4xMmMtMC4zOTQtMC4wNDctMC43OTItMC4wODEtMS4xOS0wLjExOSAgICBjLTAuMjY4LTAuMDI2LTAuNTM1LTAuMDU4LTAuODA2LTAuMDhjLTAuNDM5LTAuMDM1LTAuODgtMC4wNTYtMS4zMjEtMC4wNzljLTAuMjMzLTAuMDEyLTAuNDYzLTAuMDMyLTAuNjk2LTAuMDQxICAgIGMtMC42NzctMC4wMjgtMS4zNTUtMC4wNDEtMi4wMzUtMC4wNDFINTAuMDg3Yy0wLjY4LDAtMS4zNTgsMC4wMTMtMi4wMzQsMC4wNGMtMC4yMzMsMC4wMDktMC40NjMsMC4wMjktMC42OTYsMC4wNDEgICAgYy0wLjQ0MSwwLjAyMy0wLjg4MywwLjA0NS0xLjMyMSwwLjA3OWMtMC4yNjksMC4wMjEtMC41MzYsMC4wNTUtMC44MDYsMC4wOGMtMC4zOTcsMC4wMzgtMC43OTUsMC4wNzEtMS4xOSwwLjExOSAgICBjLTAuMjksMC4wMzUtMC41NzgsMC4wODEtMC44NjcsMC4xMmMtMC4zNywwLjA1MS0wLjc0LDAuMDk3LTEuMTA3LDAuMTU2Yy0wLjMwMiwwLjA0OC0wLjU5OSwwLjEwOC0wLjg5OCwwLjE2MSAgICBjLTAuMzUxLDAuMDYyLTAuNzAzLDAuMTItMS4wNTIsMC4xOWMtMC4zMTUsMC4wNjMtMC42MjcsMC4xMzgtMC45MzksMC4yMDhjLTAuMzI4LDAuMDcyLTAuNjU5LDAuMTQtMC45ODUsMC4yMTkgICAgYy0wLjMxNiwwLjA3Ny0wLjYyNywwLjE2NC0wLjk0MSwwLjI0NmMtMC4zMjEsMC4wODUtMC42NDIsMC4xNjQtMC45NTksMC4yNTRjLTAuMzE1LDAuMDg5LTAuNjI2LDAuMTktMC45MzcsMC4yODUgICAgcy0wLjYyNCwwLjE4Ni0wLjkzMywwLjI4NmMtMC4zMTQsMC4xMDItMC42MjIsMC4yMTYtMC45MzQsMC4zMjVjLTAuMzAzLDAuMTA2LTAuNjA4LDAuMjA3LTAuOTA4LDAuMzE4ICAgIGMtMC4zMDgsMC4xMTUtMC42MTIsMC4yMzktMC45MTgsMC4zNjFjLTAuMjk3LDAuMTE3LTAuNTk3LDAuMjI5LTAuODksMC4zNTJjLTAuMzA4LDAuMTI4LTAuNjExLDAuMjY3LTAuOTE2LDAuNDAxICAgIGMtMC4yODYsMC4xMjYtMC41NzQsMC4yNDctMC44NTgsMC4zNzhjLTAuMzA0LDAuMTQtMC42MDIsMC4yOTItMC45MDMsMC40MzljLTAuMjc5LDAuMTM2LTAuNTYxLDAuMjY4LTAuODM4LDAuNDEgICAgYy0wLjI5OSwwLjE1Mi0wLjU5MywwLjMxNS0wLjg4OSwwLjQ3NWMtMC4yNywwLjE0Ni0wLjU0NCwwLjI4Ny0wLjgxMywwLjQzN2MtMC4yOTMsMC4xNjUtMC41OCwwLjMzOC0wLjg3LDAuNTA5ICAgIGMtMC4yNjUsMC4xNTYtMC41MzMsMC4zMDgtMC43OTUsMC40NjljLTAuMjg2LDAuMTc2LTAuNTY3LDAuMzYxLTAuODQ4LDAuNTQyYy0wLjI1OCwwLjE2Ni0wLjUxOSwwLjMyNy0wLjc3NCwwLjQ5NyAgICBjLTAuMjgxLDAuMTg4LTAuNTU1LDAuMzg1LTAuODMzLDAuNTc5Yy0wLjI0OSwwLjE3NC0wLjUwMiwwLjM0NS0wLjc0OCwwLjUyM2MtMC4yNzQsMC4xOTgtMC41NDEsMC40MDYtMC44MSwwLjYxICAgIGMtMC4yNDMsMC4xODQtMC40ODgsMC4zNjQtMC43MjYsMC41NTJjLTAuMjY1LDAuMjA5LTAuNTI0LDAuNDI2LTAuNzg1LDAuNjRjLTAuMjM1LDAuMTk0LTAuNDczLDAuMzg0LTAuNzA2LDAuNTgxICAgIGMtMC4yNTcsMC4yMTktMC41MDgsMC40NDYtMC43NTksMC42N2MtMC4yMjgsMC4yMDMtMC40NTksMC40MDItMC42ODIsMC42MDljLTAuMjQ5LDAuMjMtMC40OTEsMC40NjgtMC43MzYsMC43MDIgICAgYy0wLjIxOSwwLjIxLTAuNDQxLDAuNDE3LTAuNjU2LDAuNjMyYy0wLjI0LDAuMjM5LTAuNDczLDAuNDg2LTAuNzA4LDAuNzNjLTAuMjExLDAuMjItMC40MjYsMC40MzctMC42MzQsMC42NjIgICAgYy0wLjIyOCwwLjI0Ni0wLjQ1LDAuNS0wLjY3MywwLjc1MmMtMC4yMDYsMC4yMy0wLjQxMywwLjQ1OS0wLjYxNCwwLjY5M2MtMC4yMTksMC4yNTYtMC40MzEsMC41MTktMC42NDYsMC43NzkgICAgYy0wLjE5NiwwLjIzOS0wLjM5NSwwLjQ3NS0wLjU4NywwLjcxOGMtMC4yMDksMC4yNjUtMC40MTIsMC41MzYtMC42MTUsMC44MDZjLTAuMTg4LDAuMjQ3LTAuMzc4LDAuNDkzLTAuNTYxLDAuNzQ1ICAgIGMtMC4xOTcsMC4yNzItMC4zODcsMC41NDktMC41OCwwLjgyNWMtMC4xOCwwLjI1OC0wLjM2MywwLjUxMy0wLjUzOCwwLjc3NmMtMC4xODgsMC4yNzgtMC4zNjYsMC41NjEtMC41NDcsMC44NDQgICAgYy0wLjE3MywwLjI2OC0wLjM0NiwwLjUzNC0wLjUxMywwLjgwNmMtMC4xNzUsMC4yODUtMC4zNDIsMC41NzQtMC41MTEsMC44NjRjLTAuMTYzLDAuMjc3LTAuMzI2LDAuNTUxLTAuNDg0LDAuODMxICAgIGMtMC4xNjUsMC4yOTQtMC4zMjIsMC41OTItMC40ODEsMC44OWMtMC4xNSwwLjI4NC0wLjMwNCwwLjU2NS0wLjQ1MSwwLjg1MWMtMC4xNTIsMC4zMDEtMC4yOTgsMC42MDUtMC40NDUsMC45MDkgICAgYy0wLjE0LDAuMjkzLTAuMjg1LDAuNTgzLTAuNDIxLDAuODc5Yy0wLjE0LDAuMzA2LTAuMjc0LDAuNjE3LTAuNDA5LDAuOTI2Yy0wLjEzMSwwLjMwMi0wLjI2NSwwLjYwMS0wLjM5LDAuOTA1ICAgIGMtMC4xMjgsMC4zMTItMC4yNDksMC42MjctMC4zNzEsMC45NDJjLTAuMTIxLDAuMzExLTAuMjQ0LDAuNjItMC4zNiwwLjkzNGMtMC4xMTYsMC4zMTYtMC4yMjQsMC42MzctMC4zMzMsMC45NTYgICAgYy0wLjA4NiwwLjI0OS0wLjE3OCwwLjQ5NC0wLjI2LDAuNzQ2QzAuOTA3LDExMS41MDQsMCwxMTYuODI0LDAsMTIyLjQzNXYyNjcuMTNjMCwyNi45ODgsMjEuNDU3LDQ5LjA0NSw0OC4yMDYsNTAuMDM5ICAgIGMwLjI4OCwwLjAxMiwwLjU3OCwwLjAxNCwwLjg2NiwwLjAyMmMwLjMzOSwwLjAwNywwLjY3NCwwLjAyNiwxLjAxNSwwLjAyNmgwLjI3OGg0MTEuNTQ4aDAuMjc4ICAgIGMyMS44NTYsMCw0MC45NTYtMTMuOTQzLDQ3LjUyNy0zNC42OTZjMC4yNTItMC43OTYsMC40MzctMS42MDIsMC41NjctMi40MTJjMS4xMTMtNC4xNDIsMS43MTUtOC40OTEsMS43MTUtMTIuOThWMTIyLjQzNSAgICBDNTEyLDExNi44MjQsNTExLjA5MywxMTEuNTA0LDUwOS4zMDIsMTA2LjYxM3ogTTM5Ljg5NCwxMDkuMjljMC4yMS0wLjE2NCwwLjQyMS0wLjMyOCwwLjYzOS0wLjQ4MiAgICBjMC4xNTctMC4xMSwwLjMxOC0wLjIxNSwwLjQ3OS0wLjMxOWMwLjIxNy0wLjE0MiwwLjQzNS0wLjI4NCwwLjY1OS0wLjQxNmMwLjE2OC0wLjEsMC4zNC0wLjE5NSwwLjUxMS0wLjI4OCAgICBjMC4yMjYtMC4xMjQsMC40NTQtMC4yNDMsMC42ODYtMC4zNTZjMC4xNzYtMC4wODcsMC4zNTUtMC4xNjksMC41MzQtMC4yNDljMC4yMzctMC4xMDYsMC40NzctMC4yMDUsMC43MTktMC4yOTkgICAgYzAuMTgxLTAuMDcxLDAuMzYzLTAuMTQxLDAuNTQ4LTAuMjA2YzAuMjUtMC4wODgsMC41MDQtMC4xNjYsMC43NTktMC4yNDJjMC4xODMtMC4wNTUsMC4zNjQtMC4xMSwwLjU0OS0wLjE1OCAgICBjMC4yNjgtMC4wNywwLjU0LTAuMTI3LDAuODExLTAuMTg0YzAuMTc3LTAuMDM3LDAuMzUzLTAuMDc4LDAuNTMyLTAuMTA5YzAuMzAyLTAuMDUyLDAuNjA4LTAuMDg4LDAuOTE1LTAuMTI0ICAgIGMwLjE1Mi0wLjAxOCwwLjMwNC0wLjA0MywwLjQ1Ny0wLjA1N2MwLjQ2Mi0wLjAzOCwwLjkyNy0wLjA2MSwxLjM5Ni0wLjA2MWg0MTEuODI2YzAuNDY5LDAsMC45MzQsMC4wMjMsMS4zOTYsMC4wNjIgICAgYzAuMTU0LDAuMDEzLDAuMzA1LDAuMDM5LDAuNDU3LDAuMDU3YzAuMzA2LDAuMDM1LDAuNjEyLDAuMDcxLDAuOTE1LDAuMTI0YzAuMTc5LDAuMDMxLDAuMzU1LDAuMDcyLDAuNTMyLDAuMTA5ICAgIGMwLjI3MiwwLjA1NywwLjU0NCwwLjExNCwwLjgxMSwwLjE4NGMwLjE4NSwwLjA0OCwwLjM2NiwwLjEwNSwwLjU0OSwwLjE1OGMwLjI1NSwwLjA3NiwwLjUwOSwwLjE1NSwwLjc1OSwwLjI0MiAgICBjMC4xODUsMC4wNjUsMC4zNjYsMC4xMzUsMC41NDgsMC4yMDZjMC4yNDIsMC4wOTUsMC40ODIsMC4xOTQsMC43MTksMC4yOTljMC4xNzksMC4wOCwwLjM1OCwwLjE2MiwwLjUzNCwwLjI0OSAgICBjMC4yMzIsMC4xMTQsMC40NiwwLjIzMywwLjY4NiwwLjM1NmMwLjE3MSwwLjA5NCwwLjM0MywwLjE4OCwwLjUxMSwwLjI4OGMwLjIyNCwwLjEzMiwwLjQ0MiwwLjI3MywwLjY1OSwwLjQxNiAgICBjMC4xNiwwLjEwNiwwLjMyMiwwLjIwOSwwLjQ3OSwwLjMxOWMwLjIxOCwwLjE1NSwwLjQyOSwwLjMxOCwwLjYzOSwwLjQ4MmMwLjExMiwwLjA4OCwwLjIyNiwwLjE3NCwwLjMzNiwwLjI2NEwyNjcuNzksMzE0LjIwNCAgICBjLTMuMTQ0LDMuMTQ0LTcuMzMyLDQuODc3LTExLjc5LDQuODc3Yy00LjQ1OSwwLTguNjQ2LTEuNzMzLTExLjc5Mi00Ljg3N0wzOS41NTgsMTA5LjU1NCAgICBDMzkuNjY4LDEwOS40NjMsMzkuNzgxLDEwOS4zNzgsMzkuODk0LDEwOS4yOXogTTMzLjM5MSwxNTAuNjA5bDEwNS41MywxMDUuNTNsLTEwNS41MywxMDUuNTNWMTUwLjYwOXogTTQ2MS45MTMsNDA2LjI2MUg1MC4zNjUgICAgYy0zLjkxNywwLTcuNjMyLTEuNDE3LTEwLjUzNS0zLjgwOUwxNjIuNTMyLDI3OS43NWw1OC4wNjUsNTguMDY1YzkuNDUyLDkuNDUyLDIyLjAyNSwxNC42NTgsMzUuNDAzLDE0LjY1OCAgICBjMTMuMzc4LDAsMjUuOTUxLTUuMjA2LDM1LjQwMi0xNC42NThsNTguMzQ0LTU4LjM0NGwxMjIuODgxLDEyMi44ODFDNDY5LjcyNCw0MDQuNzg4LDQ2NS45ODksNDA2LjI2MSw0NjEuOTEzLDQwNi4yNjF6ICAgICBNNDc4LjYwOSwzNjEuMTEyTDM3My4zNTYsMjU1Ljg2MWwxMDUuMjUzLTEwNS4yNTJWMzYxLjExMnoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",
        'money': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ny44NTkgNDc3Ljg1OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc3Ljg1OSA0NzcuODU5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDMwLjc4Nyw0MDkuOTYxSDQ4LjEwM0MyMS4zNzksNDA5Ljk2MSwwLDM4OC41ODIsMCwzNjEuODU5VjExNiAgICBjMC0yNi43MjQsMjEuMzc5LTQ4LjEwMyw0OC4xMDMtNDguMTAzaDM4MS42MTVjMjYuNzI0LDAsNDguMTAzLDIxLjM3OSw0OC4xMDMsNDguMTAzdjI0Ni45MjcgICAgQzQ3OC44ODksMzg4LjU4Miw0NTcuNTEsNDA5Ljk2MSw0MzAuNzg3LDQwOS45NjF6IE00OC4xMDMsOTkuOTY2Yy04LjU1MiwwLTE2LjAzNCw3LjQ4My0xNi4wMzQsMTYuMDM0djI0Ni45MjcgICAgYzAsOC41NTIsNy40ODMsMTYuMDM0LDE2LjAzNCwxNi4wMzRoMzgxLjYxNWM4LjU1MiwwLDE2LjAzNC03LjQ4MywxNi4wMzQtMTYuMDM0VjExNmMwLTguNTUyLTcuNDgzLTE2LjAzNC0xNi4wMzQtMTYuMDM0SDQ4LjEwM3ogICAgIiBmaWxsPSIjMDAwMDAwIi8+CgkJPHJlY3QgeD0iMTYuMDM0IiB5PSIxNDIuNzI0IiB3aWR0aD0iNDQ1Ljc1MiIgaGVpZ2h0PSI1OS44NjEiIGZpbGw9IiMwMDAwMDAiLz4KCQk8Y2lyY2xlIGN4PSIzNjkuODU3IiBjeT0iMzEwLjU0OSIgcj0iMzUuMjc1IiBmaWxsPSIjMDAwMDAwIi8+CgkJPGNpcmNsZSBjeD0iMzIyLjgyMyIgY3k9IjMxMC41NDkiIHI9IjM1LjI3NSIgZmlsbD0iIzAwMDAwMCIvPgoJCTxwYXRoIGQ9Ik0xODAuNjUzLDI1My44OTVINzYuOTY0Yy0zLjIwNywwLTUuMzQ1LTIuMTM4LTUuMzQ1LTUuMzQ1YzAtMy4yMDcsMi4xMzgtNS4zNDUsNS4zNDUtNS4zNDUgICAgaDEwMy42ODhjMy4yMDcsMCw1LjM0NSwyLjEzOCw1LjM0NSw1LjM0NUMxODUuOTk3LDI1MC42ODgsMTgzLjg1OSwyNTMuODk1LDE4MC42NTMsMjUzLjg5NXoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",
        'user': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2My40MyA1NjMuNDMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2My40MyA1NjMuNDM7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiPgo8cGF0aCBkPSJNMjgwLjc5LDMxNC41NTljODMuMjY2LDAsMTUwLjgwMy02Ny41MzgsMTUwLjgwMy0xNTAuODAzUzM2NC4wNTUsMTMuNDE1LDI4MC43OSwxMy40MTVTMTI5Ljk4Nyw4MC45NTMsMTI5Ljk4NywxNjMuNzU2ICBTMTk3LjUyNCwzMTQuNTU5LDI4MC43OSwzMTQuNTU5eiBNMjgwLjc5LDUyLjczNWM2MS4wNjEsMCwxMTEuMDIxLDQ5Ljk1OSwxMTEuMDIxLDExMS4wMjFTMzQxLjg1MSwyNzQuNzc2LDI4MC43OSwyNzQuNzc2ICBzLTExMS4wMjEtNDkuOTU5LTExMS4wMjEtMTExLjAyMVMyMTkuNzI4LDUyLjczNSwyODAuNzksNTIuNzM1eiIgZmlsbD0iIzAwMDAwMCIvPgo8cGF0aCBkPSJNMTkuODkxLDU1MC4wMTVoNTIzLjY0OGMxMS4xMDIsMCwxOS44OTEtOC43ODksMTkuODkxLTE5Ljg5MWMwLTEwNC4wODItODQuNjUzLTE4OS4xOTgtMTg5LjE5OC0xODkuMTk4SDE4OS4xOTggIEM4NS4xMTYsMzQwLjkyNiwwLDQyNS41NzksMCw1MzAuMTI0QzAsNTQxLjIyNiw4Ljc4OSw1NTAuMDE1LDE5Ljg5MSw1NTAuMDE1eiBNMTg5LjE5OCwzODAuNzA4aDE4NS4wMzQgIGM3NS44NjQsMCwxMzguMzEzLDU2LjQzNiwxNDguMDI4LDEyOS41MjRINDEuMTdDNTAuODg0LDQzNy42MDcsMTEzLjMzNCwzODAuNzA4LDE4OS4xOTgsMzgwLjcwOHoiIGZpbGw9IiMwMDAwMDAiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==",
        'logout': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4OS45IDQ4OS45IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0ODkuOSA0ODkuOTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNTZweCIgaGVpZ2h0PSIyNTZweCI+CjxnPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGQ9Ik00NjguMywyNTUuOGMwLjEtMC4xLDAuMS0wLjEsMC4yLTAuMmMwLjMtMC40LDAuNi0wLjcsMC44LTEuMWMwLjEtMC4xLDAuMS0wLjIsMC4yLTAuM2MwLjItMC40LDAuNS0wLjgsMC43LTEuMiAgICAgYzAtMC4xLDAuMS0wLjIsMC4xLTAuMmMwLjItMC40LDAuNC0wLjgsMC42LTEuM2MwLTAuMSwwLTAuMSwwLjEtMC4yYzAuMi0wLjQsMC4zLTAuOSwwLjUtMS40YzAtMC4xLDAtMC4yLDAuMS0wLjIgICAgIGMwLjEtMC41LDAuMy0wLjksMC4zLTEuNGMwLTAuMiwwLTAuMywwLjEtMC41YzAuMS0wLjQsMC4xLTAuOCwwLjItMS4yYzAuMS0wLjYsMC4xLTEuMSwwLjEtMS43YzAtMC42LDAtMS4xLTAuMS0xLjcgICAgIGMwLTAuNC0wLjEtMC44LTAuMi0xLjJjMC0wLjIsMC0wLjMtMC4xLTAuNWMtMC4xLTAuNS0wLjItMC45LTAuMy0xLjRjMC0wLjEsMC0wLjItMC4xLTAuMmMtMC4xLTAuNS0wLjMtMC45LTAuNS0xLjQgICAgIGMwLTAuMSwwLTAuMS0wLjEtMC4yYy0wLjItMC40LTAuNC0wLjktMC42LTEuM2MwLTAuMS0wLjEtMC4yLTAuMS0wLjJjLTAuMi0wLjQtMC40LTAuOC0wLjctMS4yYy0wLjEtMC4xLTAuMS0wLjItMC4yLTAuMyAgICAgYy0wLjMtMC40LTAuNS0wLjgtMC44LTEuMWMtMC4xLTAuMS0wLjEtMC4xLTAuMi0wLjJjLTAuNC0wLjQtMC43LTAuOS0xLjItMS4zbC05OC45LTk4LjhjLTYuNy02LjctMTcuNi02LjctMjQuMywwICAgICBjLTYuNyw2LjctNi43LDE3LjYsMCwyNC4zbDY5LjYsNjkuNkgxMzYuOGMtOS41LDAtMTcuMiw3LjctMTcuMiwxNy4xYzAsOS41LDcuNywxNy4yLDE3LjIsMTcuMmgyNzYuOGwtNjkuMSw2OS4xICAgICBjLTYuNyw2LjctNi43LDE3LjYsMCwyNC4zYzMuMywzLjMsNy43LDUsMTIuMSw1czguOC0xLjcsMTIuMS01bDk4LjMtOTguM0M0NjcuNSwyNTYuNiw0NjcuOSwyNTYuMiw0NjguMywyNTUuOHoiIGZpbGw9IiMwMDAwMDAiLz4KCQkJPHBhdGggZD0iTTExMC43LDM0LjNoMTI4YzkuNSwwLDE3LjItNy43LDE3LjItMTcuMWMwLTkuNS03LjctMTcuMi0xNy4yLTE3LjJoLTEyOEM1OS40LDAsMTcuNiw0MS44LDE3LjYsOTMuMXYzMDMuNyAgICAgYzAsNTEuMyw0MS44LDkzLjEsOTMuMSw5My4xaDEyNS45YzkuNSwwLDE3LjItNy43LDE3LjItMTcuMWMwLTkuNS03LjctMTcuMi0xNy4yLTE3LjJIMTEwLjdjLTMyLjQsMC01OC44LTI2LjQtNTguOC01OC44VjkzLjEgICAgIEM1Miw2MC42LDc4LjMsMzQuMywxMTAuNywzNC4zeiIgZmlsbD0iIzAwMDAwMCIvPgoJCTwvZz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",
        'login': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ5OS4xIDQ5OS4xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0OTkuMSA0OTkuMTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNTZweCIgaGVpZ2h0PSIyNTZweCI+CjxnPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGQ9Ik0wLDI0OS42YzAsOS41LDcuNywxNy4yLDE3LjIsMTcuMmgzMjcuNmwtNjMuOSw2My44Yy02LjcsNi43LTYuNywxNy42LDAsMjQuM2MzLjMsMy4zLDcuNyw1LDEyLjEsNXM4LjgtMS43LDEyLjEtNSAgICAgbDkzLjEtOTMuMWM2LjctNi43LDYuNy0xNy42LDAtMjQuM2wtOTMuMS05My4xYy02LjctNi43LTE3LjYtNi43LTI0LjMsMGMtNi43LDYuNy02LjcsMTcuNiwwLDI0LjNsNjMuOCw2My44SDE3LjIgICAgIEM3LjcsMjMyLjUsMCwyNDAuMSwwLDI0OS42eiIgZmlsbD0iIzAwMDAwMCIvPgoJCQk8cGF0aCBkPSJNMzk2LjQsNDk0LjJjNTYuNywwLDEwMi43LTQ2LjEsMTAyLjctMTAyLjhWMTA3LjdDNDk5LjEsNTEsNDUzLDQuOSwzOTYuNCw0LjlIMTEyLjdDNTYsNC45LDEwLDUxLDEwLDEwNy43VjE2NiAgICAgYzAsOS41LDcuNywxNy4xLDE3LjEsMTcuMWM5LjUsMCwxNy4yLTcuNywxNy4yLTE3LjF2LTU4LjNjMC0zNy43LDMwLjctNjguNSw2OC40LTY4LjVoMjgzLjdjMzcuNywwLDY4LjQsMzAuNyw2OC40LDY4LjV2MjgzLjcgICAgIGMwLDM3LjctMzAuNyw2OC41LTY4LjQsNjguNUgxMTIuN2MtMzcuNywwLTY4LjQtMzAuNy02OC40LTY4LjV2LTU3LjZjMC05LjUtNy43LTE3LjItMTcuMi0xNy4yUzEwLDMyNC4zLDEwLDMzMy44djU3LjYgICAgIGMwLDU2LjcsNDYuMSwxMDIuOCwxMDIuNywxMDIuOEgzOTYuNEwzOTYuNCw0OTQuMnoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8L2c+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==",
        'register': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyOC41IDMyOC41IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMjguNSAzMjguNTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNTZweCIgaGVpZ2h0PSIyNTZweCI+CjxnPgoJPGc+CgkJPHBvbHlnb24gcG9pbnRzPSI5Ni4zMzMsMTUwLjkxOCA5Ni4zMzMsMTM1LjkxOCA1NS42NjcsMTM1LjkxOCA1NS42NjcsOTUuMjUxIDQwLjY2Nyw5NS4yNTEgNDAuNjY3LDEzNS45MTggMCwxMzUuOTE4IDAsMTUwLjkxOCAgICAgNDAuNjY3LDE1MC45MTggNDAuNjY3LDE5MS41ODMgNTUuNjY3LDE5MS41ODMgNTUuNjY3LDE1MC45MTggICAiIGZpbGw9IiMwMDAwMDAiLz4KCQk8cGF0aCBkPSJNMjU5LjM4MywxODUuOTQxSDE0NS44NThjLTM4LjExMSwwLTY5LjExNywzMS4wMDYtNjkuMTE3LDY5LjExN3YzOS45MjhIMzI4LjV2LTM5LjkyOCAgICBDMzI4LjUsMjE2Ljk0OCwyOTcuNDk0LDE4NS45NDEsMjU5LjM4MywxODUuOTQxeiBNMzEzLjUsMjc5Ljk4N0g5MS43NDF2LTI0LjkyOGMwLTI5Ljg0LDI0LjI3Ni01NC4xMTcsNTQuMTE3LTU0LjExN2gxMTMuNTI0ICAgIGMyOS44NCwwLDU0LjExNywyNC4yNzcsNTQuMTE3LDU0LjExN0wzMTMuNSwyNzkuOTg3TDMxMy41LDI3OS45ODd6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTIwMi42MjEsMTc4Ljg0YzQwLjA2NiwwLDcyLjY2Mi0zMi41OTcsNzIuNjYyLTcyLjY2M3MtMzIuNTk2LTcyLjY2My03Mi42NjItNzIuNjYzcy03Mi42NjMsMzIuNTk2LTcyLjY2Myw3Mi42NjMgICAgUzE2Mi41NTUsMTc4Ljg0LDIwMi42MjEsMTc4Ljg0eiBNMjAyLjYyMSw0OC41MTVjMzEuNzk1LDAsNTcuNjYyLDI1Ljg2Nyw1Ny42NjIsNTcuNjYzcy0yNS44NjcsNTcuNjYzLTU3LjY2Miw1Ny42NjMgICAgYy0zMS43OTYsMC01Ny42NjMtMjUuODY4LTU3LjY2My01Ny42NjNTMTcwLjgyNSw0OC41MTUsMjAyLjYyMSw0OC41MTV6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==",
        'about us': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDYyLjU4MyA2Mi41ODMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDYyLjU4MyA2Mi41ODM7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiPgo8Zz4KCTxnIGlkPSJncm91cC03MHN2ZyI+CgkJPHBhdGggaWQ9InBhdGgtMV82Nl8iIGQ9Ik01Mi42OSw1Mi44MjRjLTAuODI5LDAtMS41MDEtMC42NzEtMS41MDEtMS41YzAtOS41NzgtNy43OTItMTcuMzcxLTE3LjM3MS0xNy4zNzEgICAgcy0xNy4zNzIsNy43OTMtMTcuMzcyLDE3LjM3MWMwLDAuODI5LTAuNjcyLDEuNS0xLjUsMS41cy0xLjUtMC42NzEtMS41LTEuNWMwLTExLjIzMiw5LjEzOS0yMC4zNzEsMjAuMzcyLTIwLjM3MSAgICBzMjAuMzcxLDkuMTM5LDIwLjM3MSwyMC4zNzFDNTQuMTg5LDUyLjE1Myw1My41MTgsNTIuODI0LDUyLjY5LDUyLjgyNHoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8cGF0aCBpZD0icGF0aC0yXzY2XyIgZD0iTTMzLjgxOCwzMy4zOTNjLTYuNTE2LDAtMTEuODE3LTUuMzAxLTExLjgxNy0xMS44MTdjMC02LjUxNSw1LjMwMS0xMS44MTYsMTEuODE3LTExLjgxNiAgICBzMTEuODE3LDUuMzAxLDExLjgxNywxMS44MTZDNDUuNjM1LDI4LjA5Miw0MC4zMzQsMzMuMzkzLDMzLjgxOCwzMy4zOTN6IE0zMy44MTgsMTIuNzZjLTQuODYyLDAtOC44MTcsMy45NTUtOC44MTcsOC44MTYgICAgYzAsNC44NjIsMy45NTUsOC44MTcsOC44MTcsOC44MTdzOC44MTctMy45NTUsOC44MTctOC44MTdDNDIuNjM1LDE2LjcxNSwzOC42OCwxMi43NiwzMy44MTgsMTIuNzZ6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggaWQ9InBhdGgtM181NF8iIGQ9Ik0xMy4wNDUsNDguNTFIMS41Yy0wLjgyOCwwLTEuNS0wLjY3Mi0xLjUtMS41YzAtOS42NjUsNy4zMTktMTYuOTUzLDE3LjAyNS0xNi45NTMgICAgYzIuOTYzLDAsNS44OTMsMC44MjUsOC43MDgsMi40NTNjMC43MTcsMC40MTUsMC45NjIsMS4zMzIsMC41NDgsMi4wNWMtMC40MTUsMC43MTctMS4zMzMsMC45NjItMi4wNSwwLjU0OCAgICBjLTIuMzUzLTEuMzYyLTQuNzc3LTIuMDUxLTcuMjA2LTIuMDUxYy03LjQ4NCwwLTEzLjI0Nyw1LjI1Ni0xMy45NTIsMTIuNDUzaDkuOTcyYzAuODI4LDAsMS41LDAuNjcyLDEuNSwxLjUgICAgUzEzLjg3Myw0OC41MSwxMy4wNDUsNDguNTF6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggaWQ9InBhdGgtNF8zM18iIGQ9Ik0xNy4wOTUsMzIuODExYy01LjUyOSwwLTEwLjAyNi00LjQ5OC0xMC4wMjYtMTAuMDI2UzExLjU2NiwxMi43NiwxNy4wOTUsMTIuNzYgICAgYzIuNjc4LDAsNS4xOTUsMS4wNDMsNy4wODksMi45MzZjMC41ODYsMC41ODYsMC41ODYsMS41MzcsMCwyLjEyMmMtMC41ODYsMC41ODYtMS41MzYsMC41ODYtMi4xMjEsMCAgICBjLTEuMzI4LTEuMzI3LTMuMDkxLTIuMDU4LTQuOTY4LTIuMDU4Yy0zLjg3NCwwLTcuMDI2LDMuMTUxLTcuMDI2LDcuMDI1YzAsMy44NzMsMy4xNTIsNy4wMjYsNy4wMjYsNy4wMjYgICAgYzIuMzAzLDAsNC40NjQtMS4xMzMsNS43NzgtMy4wMjljMC40NzItMC42ODEsMS40MDYtMC44NSwyLjA4Ny0wLjM3OGMwLjY4MSwwLjQ3MiwwLjg1MSwxLjQwNywwLjM3OCwyLjA4NyAgICBDMjMuNDYzLDMxLjE5NCwyMC4zODIsMzIuODExLDE3LjA5NSwzMi44MTF6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggaWQ9InBhdGgtNV8xNl8iIGQ9Ik02MS4wODMsNDguNTFoLTguMDM4Yy0wLjgyOCwwLTEuNS0wLjY3Mi0xLjUtMS41czAuNjcyLTEuNSwxLjUtMS41aDYuNDU2ICAgIGMtMC43MDUtNi40MTEtNS44ODEtMTEuNTgxLTEyLjU4OC0xMi4zMDdjLTAuNzM1LTAuMDc5LTEuMzA0LTAuNjgzLTEuMzM3LTEuNDIyYy0wLjAzNC0wLjczOSwwLjQ3Ni0xLjM5MywxLjIwMS0xLjUzOSAgICBjMy4zNDUtMC42NzUsNS42ODEtMy40NjYsNS42ODEtNi43ODljMC0zLjgxOS0zLjYwMy03LjI5Ny03LjU2LTcuMjk3Yy0wLjgyOCwwLTEuNS0wLjY3MS0xLjUtMS41YzAtMC44MjksMC42NzItMS41LDEuNS0xLjUgICAgYzUuNjI1LDAsMTAuNTYsNC44MTIsMTAuNTYsMTAuMjk3YzAsMy4xNjYtMS40NjYsNS45OTMtMy44NDUsNy44MThjNi40ODIsMi40NjksMTAuOTcsOC42MjYsMTAuOTcsMTUuNzM5ICAgIEM2Mi41ODMsNDcuODM4LDYxLjkxMSw0OC41MSw2MS4wODMsNDguNTF6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==",
        'contact us': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3My44MDYgNDczLjgwNiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDczLjgwNiA0NzMuODA2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzc0LjQ1NiwyOTMuNTA2Yy05LjctMTAuMS0yMS40LTE1LjUtMzMuOC0xNS41Yy0xMi4zLDAtMjQuMSw1LjMtMzQuMiwxNS40bC0zMS42LDMxLjVjLTIuNi0xLjQtNS4yLTIuNy03LjctNCAgICBjLTMuNi0xLjgtNy0zLjUtOS45LTUuM2MtMjkuNi0xOC44LTU2LjUtNDMuMy04Mi4zLTc1Yy0xMi41LTE1LjgtMjAuOS0yOS4xLTI3LTQyLjZjOC4yLTcuNSwxNS44LTE1LjMsMjMuMi0yMi44ICAgIGMyLjgtMi44LDUuNi01LjcsOC40LTguNWMyMS0yMSwyMS00OC4yLDAtNjkuMmwtMjcuMy0yNy4zYy0zLjEtMy4xLTYuMy02LjMtOS4zLTkuNWMtNi02LjItMTIuMy0xMi42LTE4LjgtMTguNiAgICBjLTkuNy05LjYtMjEuMy0xNC43LTMzLjUtMTQuN3MtMjQsNS4xLTM0LDE0LjdjLTAuMSwwLjEtMC4xLDAuMS0wLjIsMC4ybC0zNCwzNC4zYy0xMi44LDEyLjgtMjAuMSwyOC40LTIxLjcsNDYuNSAgICBjLTIuNCwyOS4yLDYuMiw1Ni40LDEyLjgsNzQuMmMxNi4yLDQzLjcsNDAuNCw4NC4yLDc2LjUsMTI3LjZjNDMuOCw1Mi4zLDk2LjUsOTMuNiwxNTYuNywxMjIuN2MyMywxMC45LDUzLjcsMjMuOCw4OCwyNiAgICBjMi4xLDAuMSw0LjMsMC4yLDYuMywwLjJjMjMuMSwwLDQyLjUtOC4zLDU3LjctMjQuOGMwLjEtMC4yLDAuMy0wLjMsMC40LTAuNWM1LjItNi4zLDExLjItMTIsMTcuNS0xOC4xYzQuMy00LjEsOC43LTguNCwxMy0xMi45ICAgIGM5LjktMTAuMywxNS4xLTIyLjMsMTUuMS0zNC42YzAtMTIuNC01LjMtMjQuMy0xNS40LTM0LjNMMzc0LjQ1NiwyOTMuNTA2eiBNNDEwLjI1NiwzOTguODA2ICAgIEM0MTAuMTU2LDM5OC44MDYsNDEwLjE1NiwzOTguOTA2LDQxMC4yNTYsMzk4LjgwNmMtMy45LDQuMi03LjksOC0xMi4yLDEyLjJjLTYuNSw2LjItMTMuMSwxMi43LTE5LjMsMjAgICAgYy0xMC4xLDEwLjgtMjIsMTUuOS0zNy42LDE1LjljLTEuNSwwLTMuMSwwLTQuNi0wLjFjLTI5LjctMS45LTU3LjMtMTMuNS03OC0yMy40Yy01Ni42LTI3LjQtMTA2LjMtNjYuMy0xNDcuNi0xMTUuNiAgICBjLTM0LjEtNDEuMS01Ni45LTc5LjEtNzItMTE5LjljLTkuMy0yNC45LTEyLjctNDQuMy0xMS4yLTYyLjZjMS0xMS43LDUuNS0yMS40LDEzLjgtMjkuN2wzNC4xLTM0LjFjNC45LTQuNiwxMC4xLTcuMSwxNS4yLTcuMSAgICBjNi4zLDAsMTEuNCwzLjgsMTQuNiw3YzAuMSwwLjEsMC4yLDAuMiwwLjMsMC4zYzYuMSw1LjcsMTEuOSwxMS42LDE4LDE3LjljMy4xLDMuMiw2LjMsNi40LDkuNSw5LjdsMjcuMywyNy4zICAgIGMxMC42LDEwLjYsMTAuNiwyMC40LDAsMzFjLTIuOSwyLjktNS43LDUuOC04LjYsOC42Yy04LjQsOC42LTE2LjQsMTYuNi0yNS4xLDI0LjRjLTAuMiwwLjItMC40LDAuMy0wLjUsMC41ICAgIGMtOC42LDguNi03LDE3LTUuMiwyMi43YzAuMSwwLjMsMC4yLDAuNiwwLjMsMC45YzcuMSwxNy4yLDE3LjEsMzMuNCwzMi4zLDUyLjdsMC4xLDAuMWMyNy42LDM0LDU2LjcsNjAuNSw4OC44LDgwLjggICAgYzQuMSwyLjYsOC4zLDQuNywxMi4zLDYuN2MzLjYsMS44LDcsMy41LDkuOSw1LjNjMC40LDAuMiwwLjgsMC41LDEuMiwwLjdjMy40LDEuNyw2LjYsMi41LDkuOSwyLjVjOC4zLDAsMTMuNS01LjIsMTUuMi02LjkgICAgbDM0LjItMzQuMmMzLjQtMy40LDguOC03LjUsMTUuMS03LjVjNi4yLDAsMTEuMywzLjksMTQuNCw3LjNjMC4xLDAuMSwwLjEsMC4xLDAuMiwwLjJsNTUuMSw1NS4xICAgIEM0MjAuNDU2LDM3Ny43MDYsNDIwLjQ1NiwzODguMjA2LDQxMC4yNTYsMzk4LjgwNnoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8cGF0aCBkPSJNMjU2LjA1NiwxMTIuNzA2YzI2LjIsNC40LDUwLDE2LjgsNjksMzUuOHMzMS4zLDQyLjgsMzUuOCw2OWMxLjEsNi42LDYuOCwxMS4yLDEzLjMsMTEuMmMwLjgsMCwxLjUtMC4xLDIuMy0wLjIgICAgYzcuNC0xLjIsMTIuMy04LjIsMTEuMS0xNS42Yy01LjQtMzEuNy0yMC40LTYwLjYtNDMuMy04My41cy01MS44LTM3LjktODMuNS00My4zYy03LjQtMS4yLTE0LjMsMy43LTE1LjYsMTEgICAgUzI0OC42NTYsMTExLjUwNiwyNTYuMDU2LDExMi43MDZ6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTQ3My4yNTYsMjA5LjAwNmMtOC45LTUyLjItMzMuNS05OS43LTcxLjMtMTM3LjVzLTg1LjMtNjIuNC0xMzcuNS03MS4zYy03LjMtMS4zLTE0LjIsMy43LTE1LjUsMTEgICAgYy0xLjIsNy40LDMuNywxNC4zLDExLjEsMTUuNmM0Ni42LDcuOSw4OS4xLDMwLDEyMi45LDYzLjdjMzMuOCwzMy44LDU1LjgsNzYuMyw2My43LDEyMi45YzEuMSw2LjYsNi44LDExLjIsMTMuMywxMS4yICAgIGMwLjgsMCwxLjUtMC4xLDIuMy0wLjJDNDY5LjU1NiwyMjMuMzA2LDQ3NC41NTYsMjE2LjMwNiw0NzMuMjU2LDIwOS4wMDZ6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==",

        'sms white': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDc4LjY2NiA3OC42NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDc4LjY2NiA3OC42NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiPgo8Zz4KCTxwYXRoIGQ9Ik05LjQ5LDczLjgzM2MtMS40OTQsMC0yLjk0My0wLjI0LTQuMzEtMC43MTNsLTMuMTEzLTEuMDc3bDIuMzkyLTIuMjY1YzMuMTY2LTIuOTk4LDMuOTY1LTYuNDU2LDQuMDE3LTkuMDQ2ICAgQzMuMDA0LDU0LjY2NSwwLDQ3LjA5NiwwLDM5LjMzM2MtMC4wMDEtMTkuMDIzLDE3LjY0NC0zNC41LDM5LjMzMi0zNC41czM5LjMzNCwxNS40NzcsMzkuMzM0LDM0LjUgICBjMCwxOS4wMjItMTcuNjQ2LDM0LjQ5OC0zOS4zMzQsMzQuNDk4Yy02LjQ1NywwLTEyLjgyNy0xLjM5OS0xOC41MDQtNC4wNTdDMTguNjg5LDcxLjI4OSwxNC4zNjgsNzMuODMzLDkuNDksNzMuODMzeiAgICBNMjAuMzU5LDY1LjA3OGwxLjE0OCwwLjU4MWM1LjM5NywyLjcyOSwxMS41NjEsNC4xNzMsMTcuODI0LDQuMTczYzE5LjQ4MywwLDM1LjMzNC0xMy42ODIsMzUuMzM0LTMwLjQ5OCAgIGMwLTE2LjgxOC0xNS44NTEtMzAuNS0zNS4zMzQtMzAuNVMzLjk5OCwyMi41MTYsMy45OTgsMzkuMzMzYzAsNi45ODksMi44MTQsMTMuODIyLDcuOTI1LDE5LjIzOWwwLjUyLDAuNTUxbDAuMDI0LDAuNzU3ICAgYzAuMDg4LDIuNzE5LTAuNCw2LjQwNi0yLjgxNyw5Ljk1MWM0LjYzMi0wLjA3NCw4Ljg5LTMuMjk4LDkuNzA0LTMuOTQ5TDIwLjM1OSw2NS4wNzh6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8cGF0aCBkPSJNMjAuMjU0LDQ4Ljc2OWMtMS40NjcsMC0yLjY1OC0wLjExNS0zLjU3OC0wLjM0NmMtMC45MTgtMC4yMjktMS41NTMtMC40NjUtMS45MDItMC43MDUgICBjLTAuMDg4LTAuMDg4LTAuMTIxLTAuMjg5LTAuMS0wLjYwN2MwLjAyMS0wLjMxNSwwLjA3MS0wLjY0NSwwLjE0OC0wLjk4M2MwLjA3Ni0wLjMzOCwwLjE3NS0wLjY0MiwwLjI5NS0wLjkwMSAgIGMwLjEyLTAuMjYyLDAuMjM0LTAuMzg0LDAuMzQ1LTAuMzYxYzAuNTY5LDAuMTk3LDEuMTg3LDAuMzg5LDEuODU0LDAuNTc0czEuNTE1LDAuMjc4LDIuNTQzLDAuMjc4ICAgYzEuMDUxLDAsMS45NDEtMC4xNTEsMi42NzYtMC40NTljMC43MzItMC4zMDcsMS4xLTAuODU0LDEuMS0xLjY0MWMwLTAuNjgxLTAuMjQyLTEuMjMyLTAuNzIzLTEuNjU4cy0xLjM0Ni0wLjg4MS0yLjU5My0xLjM2ICAgYy0wLjY3OS0wLjI2NS0xLjMxOC0wLjU1NC0xLjkyLTAuODcyYy0wLjYwMy0wLjMxNi0xLjEzMi0wLjY4OS0xLjU5Mi0xLjExNmMtMC40Ni0wLjQyNi0wLjgyLTAuOTM1LTEuMDgzLTEuNTI1ICAgYy0wLjI2My0wLjU5LTAuMzk1LTEuMjkxLTAuMzk1LTIuMTAxYzAtMC42NTYsMC4xMjctMS4yOCwwLjM3OC0xLjg3MXMwLjY0LTEuMSwxLjE2NS0xLjUyNmMwLjUyNS0wLjQyNiwxLjE5OC0wLjc2NiwyLjAxOS0xLjAxNyAgIGMwLjgyMS0wLjI1MiwxLjgtMC4zNzgsMi45MzgtMC4zNzhjMC43NDMsMCwxLjM2MiwwLjAxNywxLjg1NCwwLjA0OWMwLjQ5MiwwLjAzMywwLjg5NiwwLjA3NywxLjIxNSwwLjEzMiAgIGMwLjMxNiwwLjA1NSwwLjU3NCwwLjExNSwwLjc3MSwwLjE4MWMwLjE5NywwLjA2NiwwLjM4MywwLjEyLDAuNTU4LDAuMTY0YzAuMTUzLDAuMDY1LDAuMjMsMC4yNTcsMC4yMywwLjU3NCAgIHMtMC4wNDUsMC42NTYtMC4xMzIsMS4wMThjLTAuMDg3LDAuMzYtMC4yMDgsMC42NzgtMC4zNiwwLjk1MWMtMC4xNTQsMC4yNzQtMC4zMDcsMC4zODktMC40NiwwLjM0NSAgIGMtMC4zNzItMC4xMDktMC44ODEtMC4yMjktMS41MjYtMC4zNmMtMC42NDYtMC4xMzItMS4yNzQtMC4xOTctMS44ODctMC4xOTdjLTEuMjQ4LDAtMi4xMDYsMC4xNzYtMi41NzYsMC41MjUgICBjLTAuNDcxLDAuMzUtMC43MDYsMC44Mi0wLjcwNiwxLjQxMWMwLDAuNjM1LDAuMjYzLDEuMTQ0LDAuNzg4LDEuNTI2YzAuNTI1LDAuMzgyLDEuMzQ2LDAuNzcxLDIuNDYxLDEuMTY1ICAgYzEuNzcyLDAuNywzLjA4LDEuNTA0LDMuOTIyLDIuNDEyYzAuODQyLDAuOTA4LDEuMjY0LDIuMDUxLDEuMjY0LDMuNDNjMCwxLjAyOS0wLjE5NywxLjg4My0wLjU5LDIuNTYyICAgYy0wLjM5NSwwLjY3OC0wLjkyLDEuMjE1LTEuNTc2LDEuNjA2Yy0wLjY1NiwwLjM5Ni0xLjQwNiwwLjY3NC0yLjI0OCwwLjgzOEMyMS45ODgsNDguNjg3LDIxLjEyOSw0OC43NjksMjAuMjU0LDQ4Ljc2OXoiIGZpbGw9IiNGRkZGRkYiLz4KCTxwYXRoIGQ9Ik00My45MTcsNDguNjA1Yy0wLjQ1OSwwLTAuNzYtMC4wNzYtMC45MDEtMC4yM2MtMC4xNDQtMC4xNTItMC4yMTMtMC40NDctMC4yMTMtMC44ODdWMzYuMDAxICAgYy0wLjg3NSwxLjQyMi0xLjU1LDIuNTIxLTIuMDIxLDMuMjk4Yy0wLjQ3MiwwLjc3OC0wLjgxMywxLjM0Ny0xLjAzMywxLjcwOGMtMC4yMTksMC4zNTktMC4zNTEsMC41NzQtMC4zOTYsMC42MzkgICBjLTAuMDQzLDAuMDY2LTAuMDYzLDAuMTExLTAuMDYzLDAuMTMzYy0wLjE5NiwwLjMyOC0wLjMzNCwwLjU0MS0wLjQxLDAuNjRjLTAuMDc4LDAuMTAxLTAuMjM3LDAuMTQ3LTAuNDc3LDAuMTQ3aC0wLjUyNSAgIGMtMC4yODQsMC0wLjQ3MS0wLjA0OS0wLjU1OC0wLjE0N2MtMC4wODctMC4wOTktMC4yMTktMC4zMTItMC4zOTQtMC42NGwtMy4zNDgtNS43MXYxMS42MTljMCwwLjI4NS0wLjA0OSwwLjUxLTAuMTQ4LDAuNjc0ICAgYy0wLjA5OCwwLjE2NC0wLjM1NSwwLjI0Ni0wLjc3MSwwLjI0NmgtMS4zNzdjLTAuMzA3LDAtMC41NzQtMC4wNDktMC44MDUtMC4xNDhjLTAuMjI5LTAuMDk4LTAuMzQ1LTAuNDItMC4zNDUtMC45NjlWMzEuNzM2ICAgYzAtMC40MzgsMC4wODItMC43MjgsMC4yNDYtMC44N2MwLjE2NC0wLjE0MiwwLjM5OS0wLjIxMywwLjcwNi0wLjIxM2gxLjY0MWMwLjI0LDAsMC40NDMsMC4wMzIsMC42MDcsMC4wOTggICBzMC4zMzMsMC4yMywwLjUwOSwwLjQ5Mmw0LjM2NCw2Ljk1OGw0LjM2NS02Ljg5MmMwLjEzMi0wLjI0MSwwLjI4OS0wLjQxLDAuNDc4LTAuNTA5YzAuMTg3LTAuMDk5LDAuMzY1LTAuMTQ3LDAuNTQxLTAuMTQ3aDEuODA2ICAgYzAuNDE2LDAsMC42NTUsMC4wODcsMC43MjMsMC4yNjJjMC4wNjYsMC4xNzYsMC4wOTgsMC40NiwwLjA5OCwwLjg1NHYxNS44ODNjMCwwLjMyOC0wLjA0MywwLjU3LTAuMTMxLDAuNzI0ICAgcy0wLjM0LDAuMjI5LTAuNzU0LDAuMjI5SDQzLjkxN0w0My45MTcsNDguNjA1eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPHBhdGggZD0iTTU0Ljg0OCw0OC43NjljLTEuNDY4LDAtMi42NTgtMC4xMTUtMy41NzgtMC4zNDZjLTAuOTE4LTAuMjI5LTEuNTU0LTAuNDY1LTEuOTAyLTAuNzA1ICAgYy0wLjA4OC0wLjA4OC0wLjEyMS0wLjI4OS0wLjEtMC42MDdjMC4wMjEtMC4zMTUsMC4wNjktMC42NDUsMC4xNDctMC45ODNjMC4wNzYtMC4zMzgsMC4xNzQtMC42NDIsMC4yOTUtMC45MDEgICBjMC4xMTktMC4yNjMsMC4yMzMtMC4zODQsMC4zNDUtMC4zNjFjMC41NjksMC4xOTcsMS4xODgsMC4zODksMS44NTQsMC41NzRjMC42NjYsMC4xODYsMS41MTQsMC4yNzgsMi41NDMsMC4yNzggICBjMS4wNTEsMCwxLjk0LTAuMTUxLDIuNjc2LTAuNDU5YzAuNzMxLTAuMzA3LDEuMTAxLTAuODU0LDEuMTAxLTEuNjQxYzAtMC42ODEtMC4yNDItMS4yMzItMC43MjQtMS42NThzLTEuMzQ2LTAuODgxLTIuNTk0LTEuMzYgICBjLTAuNjc5LTAuMjY1LTEuMzE3LTAuNTU0LTEuOTItMC44NzJjLTAuNjAzLTAuMzE2LTEuMTMyLTAuNjg5LTEuNTkzLTEuMTE2Yy0wLjQ1OS0wLjQyNi0wLjgxOS0wLjkzNS0xLjA4Mi0xLjUyNSAgIGMtMC4yNjQtMC41OTEtMC4zOTUtMS4yOTEtMC4zOTUtMi4xMDFjMC0wLjY1NiwwLjEyNy0xLjI4LDAuMzc3LTEuODcxYzAuMjUyLTAuNTkxLDAuNjQxLTEuMSwxLjE2Ni0xLjUyNiAgIGMwLjUyNS0wLjQyNiwxLjE5Ny0wLjc2NiwyLjAxOC0xLjAxN2MwLjgyMi0wLjI1MiwxLjgwMi0wLjM3OCwyLjkzOC0wLjM3OGMwLjc0NCwwLDEuMzYzLDAuMDE3LDEuODU0LDAuMDQ5ICAgYzAuNDkyLDAuMDMzLDAuODk2LDAuMDc3LDEuMjE2LDAuMTMyYzAuMzE1LDAuMDU1LDAuNTczLDAuMTE1LDAuNzcxLDAuMTgxYzAuMTk2LDAuMDY1LDAuMzgzLDAuMTIsMC41NTksMC4xNjQgICBjMC4xNTIsMC4wNjUsMC4yMjksMC4yNTcsMC4yMjksMC41NzRzLTAuMDQ1LDAuNjU2LTAuMTMzLDEuMDE4Yy0wLjA4NiwwLjM2LTAuMjA3LDAuNjc4LTAuMzU4LDAuOTUxICAgYy0wLjE1NCwwLjI3NC0wLjMwOCwwLjM4OS0wLjQ2MSwwLjM0NWMtMC4zNzEtMC4xMDktMC44ODItMC4yMjktMS41MjUtMC4zNmMtMC42NDYtMC4xMzItMS4yNzUtMC4xOTctMS44ODctMC4xOTcgICBjLTEuMjQ4LDAtMi4xMDcsMC4xNzYtMi41NzYsMC41MjVjLTAuNDcxLDAuMzUtMC43MDcsMC44Mi0wLjcwNywxLjQxMWMwLDAuNjM1LDAuMjY0LDEuMTQ0LDAuNzg5LDEuNTI2ICAgYzAuNTI0LDAuMzgyLDEuMzQ2LDAuNzcxLDIuNDYxLDEuMTY1YzEuNzcxLDAuNywzLjA4LDEuNTA0LDMuOTIyLDIuNDEyYzAuODQyLDAuOTA4LDEuMjY0LDIuMDUxLDEuMjY0LDMuNDMgICBjMCwxLjAyOS0wLjE5NywxLjg4My0wLjU5LDIuNTYyYy0wLjM5NSwwLjY3OC0wLjkyLDEuMjE1LTEuNTc2LDEuNjA2Yy0wLjY1NiwwLjM5Ni0xLjQwNiwwLjY3NC0yLjI0OCwwLjgzOCAgIEM1Ni41NzksNDguNjg3LDU1LjcyMyw0OC43NjksNTQuODQ4LDQ4Ljc2OXoiIGZpbGw9IiNGRkZGRkYiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",
        'email white': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDQ0IDQ0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA0NCA0NCIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4Ij4KICA8Zz4KICAgIDxnPgogICAgICA8Zz4KICAgICAgICA8cGF0aCBkPSJNNDMsNkgxQzAuNDQ3LDYsMCw2LjQ0NywwLDd2MzBjMCwwLjU1MywwLjQ0NywxLDEsMWg0MmMwLjU1MiwwLDEtMC40NDcsMS0xVjdDNDQsNi40NDcsNDMuNTUyLDYsNDMsNnogTTQyLDMzLjU4MSAgICAgTDI5LjYxMiwyMS4xOTRsLTEuNDE0LDEuNDE0TDQxLjU5LDM2SDIuNDFsMTMuMzkyLTEzLjM5MmwtMS40MTQtMS40MTRMMiwzMy41ODFWOGg0MFYzMy41ODF6IiBmaWxsPSIjRkZGRkZGIi8+CiAgICAgIDwvZz4KICAgIDwvZz4KICAgIDxnPgogICAgICA8Zz4KICAgICAgICA8cGF0aCBkPSJNMzkuOTc5LDhMMjIsMjUuOTc5TDQuMDIxLDhIMnYwLjgwN0wyMS4yOTMsMjguMWMwLjM5MSwwLjM5MSwxLjAyMywwLjM5MSwxLjQxNCwwTDQyLDguODA3VjhIMzkuOTc5eiIgZmlsbD0iI0ZGRkZGRiIvPgogICAgICA8L2c+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K",
        'telegram white': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAzMDAgMzAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMDAgMzAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4Ij4KPGcgaWQ9IlhNTElEXzQ5Nl8iPgoJPHBhdGggaWQ9IlhNTElEXzQ5N18iIGQ9Ik01LjI5OSwxNDQuNjQ1bDY5LjEyNiwyNS44bDI2Ljc1Niw4Ni4wNDdjMS43MTIsNS41MTEsOC40NTEsNy41NDgsMTIuOTI0LDMuODkxbDM4LjUzMi0zMS40MTIgICBjNC4wMzktMy4yOTEsOS43OTItMy40NTUsMTQuMDEzLTAuMzkxbDY5LjQ5OCw1MC40NTdjNC43ODUsMy40NzgsMTEuNTY0LDAuODU2LDEyLjc2NC00LjkyNkwyOTkuODIzLDI5LjIyICAgYzEuMzEtNi4zMTYtNC44OTYtMTEuNTg1LTEwLjkxLTkuMjU5TDUuMjE4LDEyOS40MDJDLTEuNzgzLDEzMi4xMDItMS43MjIsMTQyLjAxNCw1LjI5OSwxNDQuNjQ1eiBNOTYuODY5LDE1Ni43MTFsMTM1LjA5OC04My4yMDcgICBjMi40MjgtMS40OTEsNC45MjYsMS43OTIsMi44NDEsMy43MjZMMTIzLjMxMywxODAuODdjLTMuOTE5LDMuNjQ4LTYuNDQ3LDguNTMtNy4xNjMsMTMuODI5bC0zLjc5OCwyOC4xNDYgICBjLTAuNTAzLDMuNzU4LTUuNzgyLDQuMTMxLTYuODE5LDAuNDk0bC0xNC42MDctNTEuMzI1Qzg5LjI1MywxNjYuMTYsOTEuNjkxLDE1OS45MDcsOTYuODY5LDE1Ni43MTF6IiBmaWxsPSIjRkZGRkZGIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==",

        //Format:    'key': "data_url",
    };

    function iconJs(dataUrlTitle) {
        return dataUrls[dataUrlTitle] || dataUrlTitle || '';
    }

    function file(filename) {
        var previewIcon = 'free file';
        if (isOneOfThese(['doc', 'docx']))
            previewIcon = 'doc file';
        if (isOneOfThese(['xls', 'xlsx']))
            previewIcon = 'xls file';
        if (isOneOfThese(['pdf']))
            previewIcon = 'pdf file';

        return iconJs(previewIcon);

        function isOneOfThese(arrayOfTypes) {
            for (var i = 0; i < arrayOfTypes.length; i++)
                if (filename.slice(-1 - arrayOfTypes[i].length) === '.' + arrayOfTypes[i])
                    return true;
            return false;
        }
    }

})(global);


/*
	AHS502 : End of 'icon-js.js'
*/


/*
	AHS502 : Start of 'persian-number.js'
*/

(function(global) {

    global.toPersianNumber = toPersianNumber;

    var persianDigitConvertions = {
        0: '۰',
        1: '۱',
        2: '۲',
        3: '۳',
        4: '۴',
        5: '۵',
        6: '۶',
        7: '۷',
        8: '۸',
        9: '۹'
    };

    function toPersianNumber(text) {
        text = String(text || '');
        var chars = text.split('');
        return chars.map(function(char) {
            if (persianDigitConvertions[char] != undefined)
                return persianDigitConvertions[char];
            else
                return char;
        }).join('');
    }

})(global);

/*
	AHS502 : End of 'persian-number.js'
*/


/*
	AHS502 : Start of 'app.js'
*/

/*global angular*/

var app = angular.module('JavabAzmayesh', [
    'ui.router',
    'vcRecaptcha', 
    // 'virtualRepeat',
]);


/*
	AHS502 : End of 'app.js'
*/


/*
	AHS502 : Start of 'app-config.js'
*/

/*global app*/

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider','$compileProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider,$compileProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                views: {
                    '': {
                        templateUrl: 'home.html',
                        controller: 'HomeController',
                    },
                    menu: {
                        templateUrl: 'home/menu.html'
                    },
                    footer: {
                        templateUrl: 'home/footer.html'
                    },
                },
                abstract: true
            })
            .state('home.find', {
                url: '/find',
                templateUrl: 'home/find.html',
                controller: 'HomeFindController'
            })
            .state('home.otp', {
                url: '/otp',
                templateUrl: 'home/otp.html',
                controller: 'HomeOtpController'
            })
            .state('home.history', {
                url: '/history',
                params: {
                    nationalCode: null,
                    otpId: null,
                    requestCode: null
                },
                templateUrl: 'home/history.html',
                controller: 'HomeHistoryController'
            })
            .state('home.about', {
                url: '/about',
                params: {
                    previousState: null
                },
                templateUrl: 'common/about.html',
                controller: 'CommonAboutController'
            })
            .state('home.contact', {
                url: '/contact',
                params: {
                    previousState: null
                },
                templateUrl: 'common/contact.html',
                controller: 'CommonContactController'
            });

        $stateProvider
            .state('history', {
                url: '/history',
                params: {
                    nationalCode: null
                },
                views: {
                    '': {
                        templateUrl: 'history.html',
                        controller: 'HistoryController'
                    },
                    header: {
                        templateUrl: 'history/header.html'
                    }
                }
            });

        $stateProvider
            .state('answer', {
                url: '/answer?p&n', // p := nationalCode, n := postCode
                params: {
                    previousState: null,
                    previousStateData: null
                },
                views: {
                    '': {
                        templateUrl: 'answer.html',
                        controller: 'AnswerController'
                    },
                    menu: {
                        templateUrl: 'answer/menu.html',
                    },
                    header: {
                        templateUrl: 'answer/header.html',
                    },
                    footer: {
                        templateUrl: 'answer/footer.html',
                    },
                }
            })
            .state('answer.post', {
                url: '/post',
                templateUrl: 'answer/post.html'
            })
            .state('answer.download', {
                url: '/download',
                templateUrl: 'answer/download.html'
            })
            .state('answer.share', {
                url: '/share',
                templateUrl: 'answer/share.html'
            })
            .state('answer.laboratory', {
                url: '/laboratory',
                templateUrl: 'answer/laboratory.html'
            });

        $stateProvider
            .state('lab', {
                url: '/lab',
                views: {
                    '': {
                        templateUrl: 'lab.html',
                        controller: 'LabController',
                    },
                    menu: {
                        templateUrl: 'lab/menu.html'
                    },
                    footer: {
                        templateUrl: 'lab/footer.html'
                    },
                },
                abstract: true
            })
            .state('lab.login', {
                url: '/login',
                templateUrl: 'lab/login.html',
                controller: 'LabLoginController'
            })
            .state('lab.register', {
                url: '/register',
                params: {
                    username: null
                },
                templateUrl: 'lab/register.html',
                controller: 'LabRegisterController'
            })
            .state('lab.validate', {
                url: '/validate',
                params: {
                    username: null
                },
                templateUrl: 'lab/validate.html',
                controller: 'LabValidateController'
            })
            .state('lab.signedup', {
                url: '/signedup',
                templateUrl: 'lab/signedup.html'
            })
            .state('lab.forget', {
                url: '/forget',
                templateUrl: 'lab/forget.html',
                controller: 'LabForgetController'
            })
            .state('lab.password', {
                url: '/password',
                templateUrl: 'lab/password.html'
            })
            .state('lab.about', {
                url: '/about',
                params: {
                    previousState: null
                },
                templateUrl: 'common/about.html',
                controller: 'CommonAboutController'
            })
            .state('lab.contact', {
                url: '/contact',
                params: {
                    previousState: null
                },
                templateUrl: 'common/contact.html',
                controller: 'CommonContactController'
            });

        $stateProvider
            .state('panel', {
                url: '/panel',
                views: {
                    '': {
                        templateUrl: 'panel.html',
                        controller: 'PanelController',
                    },
                    menu: {
                        templateUrl: 'panel/menu.html'
                    },
                    header: {
                        templateUrl: 'panel/header.html'
                    },
                },
                abstract: true
            })
            .state('panel.home', {
                url: '/home',
                templateUrl: 'panel/home.html',
                controller: 'PanelHomeController'
            })
            .state('panel.history', {
                url: '/history',
                templateUrl: 'panel/history.html',
                controller: 'PanelHistoryController'
            })
            .state('panel.post', {
                url: '/post',
                templateUrl: 'panel/post.html',
                controller: 'PanelPostController'
            })
            .state('panel.send', {
                url: '/send',
                templateUrl: 'panel/send.html',
                controller: 'PanelSendController'
            })
            .state('panel.balance', {
                url: '/balance',
                templateUrl: 'panel/balance.html',
                controller: 'PanelBalanceController'
            })
            .state('panel.account', {
                url: '/account',
                templateUrl: 'panel/account.html',
                controller: 'PanelAccountController',
                abstract: true
            })
            .state('panel.account.summary', {
                url: '/summary',
                templateUrl: 'panel/account/summary.html',
                controller: 'PanelAccountSummaryController'
            })
            .state('panel.account.edit', {
                url: '/edit',
                templateUrl: 'panel/account/edit.html',
                controller: 'PanelAccountEditController'
            })
            .state('panel.account.password', {
                url: '/password',
                templateUrl: 'panel/account/password.html',
                controller: 'PanelAccountPasswordController'
            })
            .state('panel.account.confirm', {
                url: '/confirm',
                params: {
                    action: null
                },
                templateUrl: 'panel/account/confirm.html',
                controller: 'PanelAccountConfirmController'
            });

        $urlRouterProvider.otherwise('/home/find');

        // $locationProvider.html5Mode(true);
        
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|sms|tg):/);

    }
]);


/*
	AHS502 : End of 'app-config.js'
*/


/*
	AHS502 : Start of 'app-run.js'
*/

/*global app*/
/*global $*/
/*global localStorage*/

app.run(['$rootScope', '$state', '$stateParams', '$window', 'UserService',
    function($rootScope, $state, $stateParams, $window, userService) {

        // No need to initial loader anymore
        $('#ja-initial-loader').hide();
        $('#ja-main-site-content').show();
        $('#ja-sidebar-menu').show();

        if ($window.location.hash.indexOf('#/answer') !== 0) {
            $state.go(localStorage.startState || 'home.find');
        }

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.data = {};

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options) {
                //NOTE: Use  event.preventDefault()  if it's needed.

                if (toState.name.indexOf('panel.') === 0) {
                    if (!userService.current()) {
                        event.preventDefault();
                        $state.go('lab.login');
                    }
                }
                else {
                    delete $rootScope.data.postCache;
                    delete $rootScope.data.historyState;
                    if (userService.current()) {
                        userService.logout();
                    }
                }

            });

        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {

                $window.scrollTo(0, 0);

            });

        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error) {

                //...

            });

    }
]);


/*
	AHS502 : End of 'app-run.js'
*/


/*
	AHS502 : Start of 'answer-service.js'
*/

/*global app*/

app.service('AnswerService', ['$q', '$http', '$window', 'Utils',
    function($q, $http, $window, utils) {

        this.patientInfo = patientInfo;
        this.send = send;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 50, 71, 100, 101
        // Resolves to patient personal information
        function patientInfo(nationalCode) {
            return utils.httpPromiseHandler($http.post('/answer/patient/info', {
                    nationalCode: nationalCode
                }))
                .then(function(body) {
                    return {
                        fullName: body.fullName,
                        numbers: body.numbers || [],
                        email: body.email
                    };
                });
        }

        // May reject by code : 1, 2, 5, 50, 80, 100, 101, 120
        function send(person, files, notes, invalidPersonHandler) {
            return utils.httpPromiseHandler($http.post('/answer/send', {
                timeStamp: Date.now(),
                person: {
                    nationalCode: person.nationalCode,
                    fullName: person.fullName,
                    mobilePhoneNumber: person.mobilePhoneNumber,
                    phoneNumber: person.phoneNumber,
                    extraPhoneNumber: person.extraPhoneNumber,
                    email: person.email
                },
                files: files.map(function(file) {
                    return {
                        serverName: file.serverName,
                        name: file.name,
                        size: file.size,
                        type: file.type
                    };
                }),
                notes: notes
            }), function(data) {
                if (invalidPersonHandler)
                    invalidPersonHandler(data.errors || {});
            });
        }

        /////////////////////////////////////////////////////

    }
]);

/*
	AHS502 : End of 'answer-service.js'
*/


/*
	AHS502 : Start of 'history-serveice.js'
*/

/*global app*/

app.service('HistoryService', ['$http', 'Utils',
    function($http, utils) {

        this.generateOtp = generateOtp;
        this.findHistory = findHistory;
        this.loadAnswer = loadAnswer;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 51, 60, 120
        // Resolves to an object containing: otpId, requestCode
        function generateOtp(nationalCode, mobilePhoneNumber) {
            return utils.httpPromiseHandler($http.post('/history/generate/otp', {
                    nationalCode: nationalCode,
                    mobilePhoneNumber: mobilePhoneNumber
                }))
                .then(function(body) {
                    return {
                        otpId: body.otpId,
                        requestCode: body.requestCode
                    };
                });
        }

        // May reject by code : 1, 2, 5, 40, /*70*/, 71
        // Resolves to patient's information and history
        function findHistory(nationalCode, otpId, requestCode, otp) {
            return utils.httpPromiseHandler($http.post('/history/find/history', {
                    nationalCode: nationalCode,
                    otpId: otpId,
                    requestCode: requestCode,
                    otp: otp
                }))
                .then(function(body) {
                    return {
                        // accessKey = body.accessKey,
                        patientInfo: body.patientInfo,
                        history: body.history
                    };
                });
        }

        // May reject by code : 1, 2, 5, 71, 72, 73, 74
        // Resolves to patient's answer content
        function loadAnswer(nationalCode, postCode) {
            return utils.httpPromiseHandler($http.post('/history/load/answer', {
                    nationalCode: nationalCode,
                    postCode: postCode
                }))
                .then(function(body) {
                    return {
                        patientName: body.patientName,
                        postDate: new Date(body.timeStamp),
                        notes: body.notes,
                        files: body.files.map(function(file) {
                            return {
                                serverName: file.serverName,
                                name: file.name,
                                size: file.size,
                                type: file.type
                            };
                        }),
                        lab: {
                            name: body.lab.name,
                            mobilePhoneNumber: body.lab.mobilePhoneNumber,
                            phoneNumber: body.lab.phoneNumber,
                            address: body.lab.address,
                            postalCode: body.lab.postalCode,
                            websiteAddress: body.lab.websiteAddress
                        }
                    };
                });
        }

    }
]);

/*
	AHS502 : End of 'history-serveice.js'
*/


/*
	AHS502 : Start of 'post-serveice.js'
*/

/*global app*/

app.service('PostService', ['$q', '$http', 'Utils',
    function($q, $http, utils) {

        this.getPosts = getPosts;
        this.getOnePost = getOnePost;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 50, 100, 101
        // Resolves to user's posts: { '1396/1': [{...post-data...}, ...], ... }
        function getPosts(year, months) {
            return utils.httpPromiseHandler($http.post('/post/load/all', {
                    year: year,
                    months: months
                }))
                .then(function(body) {
                    var postPacks = body.postPacks || {};
                    for (var postPackKey in postPacks) {
                        var encodedPosts = postPacks[postPackKey] || '';
                        var posts = encodedPosts.split('|')
                            .filter(function(encodedPost) {
                                return !!encodedPost;
                            })
                            .map(function(encodedPost) {
                                return {
                                    nationalCode: encodedPost.slice(0, 10),
                                    filesCount: Number(encodedPost.slice(10, 12)),
                                    postCode: encodedPost.slice(12, 16),
                                    postDate: new Date(Number(encodedPost.slice(16, 29)))
                                };
                            });
                        postPacks[postPackKey] = posts;
                    }
                    return postPacks;
                });
        }

        // May reject by code : 1, 2, 5, 50, 71, 72, 73, 100, 101
        // Resolves to the answer data
        function getOnePost(nationalCode, postCode) {
            return utils.httpPromiseHandler($http.post('/post/load/one', {
                    nationalCode: nationalCode,
                    postCode: postCode
                }))
                .then(function(body) {
                    return {
                        fullName: body.fullName,
                        nationalCode: body.nationalCode,
                        numbers: body.numbers || [],
                        email: body.email,
                        postCode: body.postCode,
                        postDate: new Date(body.timeStamp),
                        notes: body.notes,
                        files: body.files || []
                    };
                });
        }

    }
]);

/*
	AHS502 : End of 'post-serveice.js'
*/


/*
	AHS502 : Start of 'user-service.js'
*/

/*global app*/

app.service('UserService', ['$q', '$http', '$window', 'Utils',
    function($q, $http, $window, utils) {

        this.register = register;
        this.registerConfirm = registerConfirm;

        this.editAccount = editAccount;
        this.editPassword = editPassword;
        this.editConfirm = editConfirm;

        this.login = login;
        this.refresh = refresh;
        this.logout = logout;
        this.current = current;
        this.restorePassword = restorePassword;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 10, 11, 80
        function register(model, invalidModelHandler) {
            return utils.httpPromiseHandler($http.post('/user/register', {
                userData: {
                    labName: model.labName,
                    mobilePhoneNumber: model.mobilePhoneNumber,
                    phoneNumber: model.phoneNumber,
                    address: model.address,
                    postalCode: model.postalCode,
                    websiteAddress: model.websiteAddress,
                    username: model.username,
                    password: model.password
                },
                recaptcha: model.response
            }), function(data) {
                if (invalidModelHandler)
                    invalidModelHandler(data.errors || {});
            });
        }

        // May reject by code : 1, 2, 5, 30, 31, 32
        function registerConfirm(username, validationCode) {
            return utils.httpPromiseHandler($http.post('/user/register/confirm', {
                username: username,
                validationCode: validationCode
            }));
        }

        // May reject by code : 1, 2, 3, 5, 50, 51, 80, 100, 101, 120
        function editAccount(newAccount, invalidNewAccountHandler) {
            return utils.httpPromiseHandler($http.post('/user/edit/account', {
                newAccount: {
                    labName: newAccount.labName,
                    mobilePhoneNumber: newAccount.mobilePhoneNumber,
                    phoneNumber: newAccount.phoneNumber,
                    address: newAccount.address,
                    postalCode: newAccount.postalCode,
                    websiteAddress: newAccount.websiteAddress,
                }
            }), function(data) {
                if (invalidNewAccountHandler)
                    invalidNewAccountHandler(data.errors || {});
            });
        }

        // May reject by code : 1, 2, 5, 50, 51, 80, 100, 101, 120
        function editPassword(oldPassword, newPassword, invalidNewPasswordHandler) {
            return utils.httpPromiseHandler($http.post('/user/edit/password', {
                oldPassword: oldPassword,
                newPassword: newPassword
            }), function(data) {
                if (invalidNewPasswordHandler)
                    invalidNewPasswordHandler(data.errors || {});
            });
        }

        // May reject by code : 1, 2, 5, 30, 31, 32, 50, 100, 101
        // Resolves to current user new info
        function editConfirm(username, validationCode) {
            return utils.httpPromiseHandler($http.post('/user/edit/confirm', {
                    username: username,
                    validationCode: validationCode
                }))
                .then(function(body) {
                    var userInfo = processUserInfo(body.userInfo);
                    setCurrent(undefined, userInfo);
                    return userInfo;
                });
        }

        // May reject by code : 1, 2, 5, 40
        // Resolves to current user info
        function login(username, password) {
            return utils.httpPromiseHandler($http.post('/user/login', {
                    username: username,
                    password: password
                }))
                .then(function(body) {
                    var accessKey = body.accessKey,
                        userInfo = processUserInfo(body.userInfo);
                    $http.defaults.headers.common['X-Access-Token'] = accessKey;
                    setCurrent(accessKey, userInfo);
                    return userInfo;
                });
        }

        // May reject by code : 1, 2, 5, 50, 51, 100, 101
        // Resolves to current user new info
        function refresh() {
            if (current() === null) {
                return $q.reject(50);
            }
            return utils.httpPromiseHandler($http.post('/user/refresh', {}))
                .then(function(body) {
                    var userInfo = processUserInfo(body.userInfo);
                    setCurrent(undefined, userInfo);
                    return userInfo;
                });
        }

        // No rejection
        function logout() {
            delete $http.defaults.headers.common['X-Access-Token'];
            delete $window.sessionStorage['CurrentUser'];
            return $q.when();
        }

        // Returns current user
        function current() {
            try {
                var currentUserEncoded = $window.sessionStorage['CurrentUser'];
                if (!currentUserEncoded) return null;
                var currentUser = JSON.parse(currentUserEncoded);
                if (!currentUser) return null;
                var userInfo = processUserInfo(currentUser.userInfo);
                if (!userInfo) return null;
                return userInfo;
            }
            catch (err) {
                return null;
            }
        }

        // May reject by code : 1, 2, 5, 51, 60, 120
        function restorePassword(username, mobilePhoneNumber) {
            return utils.httpPromiseHandler($http.post('/user/restorePassword', {
                username: username,
                mobilePhoneNumber: mobilePhoneNumber
            }));
        }

        /////////////////////////////////////////////////////

        function setCurrent(accessKey, userInfo) {
            var data;
            try {
                data = JSON.parse($window.sessionStorage['CurrentUser'] || '{}') || {};
            }
            catch (err) {
                data = {};
            }
            (accessKey !== undefined) && (data.accessKey = accessKey);
            (userInfo !== undefined) && (data.userInfo = userInfo);
            $window.sessionStorage['CurrentUser'] = JSON.stringify(data);
        }

        function processUserInfo(userInfo) {
            if (userInfo) {
                userInfo.subscriptionDate = new Date(userInfo.timeStamp);
                // delete userInfo.timeStamp; // DO NOT ACTIVATE THIS LINE EVER AGAIN!
            }
            return userInfo;
        }

    }
]);

/*
	AHS502 : End of 'user-service.js'
*/


/*
	AHS502 : Start of 'utils.js'
*/

/*global app*/

app.factory('Utils', ['$q', '$http', '$window',
    function($q, $http, $window) {

        return {
            httpPromiseHandler: httpPromiseHandler,
        };

        function httpPromiseHandler(promise, rejectionDataProcessor) {
            return promise.then(successHandlerMaker(rejectionDataProcessor), failureHandler);
        }

        function successHandlerMaker(rejectionDataProcessor) {
            return function successHandler(response) {
                if (response.status != 200) {
                    console.log(response.status, response.data);
                    return $q.reject(1);
                }
                if (response.data.code !== 0) {
                    if (typeof rejectionDataProcessor === 'function') {
                        rejectionDataProcessor(response.data);
                    }
                    return $q.reject(response.data.code || 1);
                }
                return response.data;
            };
        }

        function failureHandler(err) {
            console.error(err);
            return $q.reject(2);
        }

    }
]);


/*
	AHS502 : End of 'utils.js'
*/


/*
	AHS502 : Start of 'common/about-controller.js'
*/

/*global app*/

app.controller('CommonAboutController', ['$scope', '$state', '$stateParams',
    function($scope, $state, $stateParams) {

        $scope.previousState = $stateParams.previousState;

        $scope.setBackHandler(function() {
            $state.go($scope.previousState);
        });

    }
]);


/*
	AHS502 : End of 'common/about-controller.js'
*/


/*
	AHS502 : Start of 'common/contact-controller.js'
*/

/*global app*/

app.controller('CommonContactController', ['$scope', '$state', '$stateParams',
    function($scope, $state, $stateParams) {

        $scope.previousState = $stateParams.previousState;

        $scope.setBackHandler(function() {
            $state.go($scope.previousState);
        });

    }
]);


/*
	AHS502 : End of 'common/contact-controller.js'
*/


/*
	AHS502 : Start of 'home/find-controller.js'
*/

/*global app*/
/*global ValidationSystem*/
/*global localStorage*/

app.controller('HomeFindController', ['$rootScope', '$scope', '$state', '$timeout',
    function($rootScope, $scope, $state, $timeout) {

        $scope.seeAnswer = seeAnswer;

        $scope.findingAnswer = false; // No need to!

        localStorage.startState = "home.find";

        $scope.setBackHandler(false);

        //$scope.nationalCode
        //$scope.postCode

        $scope.vs = new ValidationSystem($scope)
            .field('nationalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.nationalCode()
            ])
            .field('postCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.numberCode(4)
            ]);

        function seeAnswer() {
            if (!$scope.vs.validate()) return;
            
            $state.go('answer', {
                p: $scope.nationalCode,
                n: $scope.postCode,
                previousState: 'home.find',
                previousStateData: null
            });
        }

    }
]);


/*
	AHS502 : End of 'home/find-controller.js'
*/


/*
	AHS502 : Start of 'home/history-controller.js'
*/

/*global app*/
/*global ValidationSystem*/

app.controller('HomeHistoryController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'HistoryService',
    function($rootScope, $scope, $state, $stateParams, $timeout, historyService) {

        $scope.findHistory = findHistory;

        $scope.nationalCode = $stateParams.nationalCode;
        var otpId = $stateParams.otpId;
        var requestCode = $stateParams.requestCode;

        $scope.findingHistory = false;

        $scope.setBackHandler(function() {
            $state.go('home.otp');
        });

        //$scope.otp

        $scope.vs = new ValidationSystem($scope)
            .field('otp', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.numberCode(6)
            ]);

        function findHistory() {
            if (!$scope.vs.validate()) return;

            $scope.findingHistory = true;
            historyService.findHistory($scope.nationalCode, otpId, requestCode, $scope.otp)
                .then(function(data) {
                    $rootScope.data.patientInfo = data.patientInfo;
                    $rootScope.data.history = data.history;
                    $state.go('history', {
                        nationalCode: $scope.nationalCode
                    });
                }, function(code) {
                    //TODO: Handle errors...
                    $scope.findingHistory = false;
                    alert(code);
                });
        }

    }
]);


/*
	AHS502 : End of 'home/history-controller.js'
*/


/*
	AHS502 : Start of 'home/otp-controller.js'
*/

/*global app*/
/*global ValidationSystem*/

app.controller('HomeOtpController', ['$rootScope', '$scope', '$state', '$timeout', 'HistoryService',
    function($rootScope, $scope, $state, $timeout, historyService) {

        $scope.sendOtp = sendOtp;

        $scope.sendingOtp = false;

        $scope.setBackHandler(function() {
            $state.go('home.find');
        });

        //$scope.nationalCode
        //$scope.mobilePhoneNumber

        $scope.vs = new ValidationSystem($scope)
            .field('nationalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.nationalCode()
            ])
            .field('mobilePhoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.mobilePhoneNumber()
            ]);

        function sendOtp() {
            if (!$scope.vs.validate()) return;

            $scope.sendingOtp = true;
            historyService.generateOtp($scope.nationalCode, $scope.mobilePhoneNumber)
                .then(function(data) {
                    $state.go('home.history', {
                        nationalCode: $scope.nationalCode,
                        otpId: data.otpId,
                        requestCode: data.requestCode
                    });
                }, function(code) {
                    //TODO: Handle errors...
                    $scope.sendingOtp = false;
                    alert(code);
                });
        }

    }
]);


/*
	AHS502 : End of 'home/otp-controller.js'
*/


/*
	AHS502 : Start of 'lab/forget-controller.js'
*/

/*global app*/
/*global ValidationSystem*/

app.controller('LabForgetController', ['$rootScope', '$scope', '$state', '$timeout', 'UserService',
    function($rootScope, $scope, $state, $timeout, userService) {

        $scope.restorePassword = restorePassword;

        $scope.restoringPassword = false;

        $scope.setBackHandler(function() {
            $state.go('lab.login');
        });

        //$scope.username
        //$scope.mobilePhoneNumber

        $scope.vs = new ValidationSystem($scope)
            .field('username', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.username(),
                ValidationSystem.validators.minLength(4)
            ])
            .field('mobilePhoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.mobilePhoneNumber()
            ]);

        function restorePassword() {
            if (!$scope.vs.validate()) return;

            $scope.restoringPassword = true;
            return userService.restorePassword($scope.username, $scope.mobilePhoneNumber)
                .then(function() {
                    $state.go('lab.password');
                }, function(code) {
                    //TODO: Handle errors...
                    $scope.restoringPassword = false;
                    alert(code);
                });
        }

    }
]);


/*
	AHS502 : End of 'lab/forget-controller.js'
*/


/*
	AHS502 : Start of 'lab/login-controller.js'
*/

/*global app*/
/*global ValidationSystem*/
/*global localStorage*/

app.controller('LabLoginController', ['$rootScope', '$scope', '$state', 'UserService',
    function($rootScope, $scope, $state, userService) {

        $scope.login = login;

        $scope.loggingIn = false;

        localStorage.startState = "lab.login";

        $scope.setBackHandler(false);

        //$scope.username
        //$scope.password

        $scope.vs = new ValidationSystem($scope)
            .field('username', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.username(),
                ValidationSystem.validators.minLength(4)
            ])
            .field('password', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(4)
            ]);

        function login() {
            if (!$scope.vs.validate()) return;

            $scope.loggingIn = true;
            return userService.login($scope.username, $scope.password)
                .then(function(userInfo) {
                    $rootScope.data.labData = userInfo;
                    $state.go('panel.home');
                }, function(code) {
                    //TODO: Handle errors...
                    $scope.loggingIn = false;
                    alert(code);
                });
        }

    }
]);


/*
	AHS502 : End of 'lab/login-controller.js'
*/


/*
	AHS502 : Start of 'lab/register-controller.js'
*/

/*global app*/
/*global ValidationSystem*/

app.controller('LabRegisterController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout',
    'vcRecaptchaService', 'UserService', 'Config',
    function($rootScope, $scope, $state, $stateParams, $timeout,
        vcRecaptchaService, userService, config) {

        $scope.setResponse = setResponse;
        $scope.setWidgetId = setWidgetId;
        $scope.cbExpiration = cbExpiration;
        $scope.sendRegisterationForm = sendRegisterationForm;

        $scope.showGoogleRecaptcha = config.google_recaptcha;
        $scope.key = config.google_recaptcha_public_key;
        $scope.sendingRegisterationForm = false;
        $scope.model = {};

        $scope.model.username = $stateParams.username;

        $scope.setBackHandler(function() {
            $state.go('lab.login');
        });

        //$scope.model.labName
        //$scope.model.mobilePhoneNumber
        //$scope.model.phoneNumber
        //$scope.model.address
        //$scope.model.postalCode
        //$scope.model.websiteAddress
        //$scope.model.username
        //$scope.model.password
        //$scope.model.passwordAgain
        //$scope.model.acceptRules

        $scope.vs = new ValidationSystem($scope.model)
            .field('labName', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(5)
            ])
            .field('mobilePhoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.mobilePhoneNumber()
            ])
            .field('phoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.phoneNumber()
            ])
            .field('address', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(10)
            ])
            .field('postalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.integer(),
                ValidationSystem.validators.length(10)
            ])
            .field('websiteAddress', [
                ValidationSystem.validators.notRequired(),
                ValidationSystem.validators.minLength(5),
                ValidationSystem.validators.url()
            ])
            .field('username', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.username(),
                ValidationSystem.validators.minLength(4)
            ])
            .field('password', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(4),
                function(value) {
                    if ($scope.model.passwordAgain && $scope.model.passwordAgain != value) {
                        return 'کلمه های عبور وارد شده یکسان نیستند';
                    }
                }
            ])
            .field('passwordAgain', [
                function(value) {
                    if (!$scope.model.password) return true;
                },
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(4),
                function(value) {
                    if ($scope.model.password != value) {
                        return 'کلمه های عبور وارد شده یکسان نیستند';
                    }
                }
            ])
            .field('acceptRules', [
                ValidationSystem.validators.notEmpty('پذیرفتن قوانین و مقررات الزامی است')
            ]);

        function setResponse(response) {
            $scope.response = response;
        }

        function setWidgetId(widgetId) {
            $scope.widgetId = widgetId;
        }

        function cbExpiration() {
            config.google_recaptcha && vcRecaptchaService.reload($scope.widgetId);
            $scope.response = null;
        }

        function sendRegisterationForm() {
            if (!$scope.vs.validate()) return;

            $scope.sendingRegisterationForm = true;
            config.google_recaptcha && ($scope.model.response = $scope.response);
            return userService.register($scope.model, $scope.vs.dictate)
                .then(function() {
                    $state.go('lab.validate', {
                        username: $scope.model.username
                    });
                }, function(code) {
                    //TODO: Handle errors...
                    $scope.sendingRegisterationForm = false;
                    alert(code);
                    config.google_recaptcha && vcRecaptchaService.reload($scope.widgetId);
                });
        }

    }
]);


/*
	AHS502 : End of 'lab/register-controller.js'
*/


/*
	AHS502 : Start of 'lab/validate-controller.js'
*/

/*global app*/
/*global ValidationSystem*/

app.controller('LabValidateController', ['$rootScope', '$scope', '$state', '$stateParams', 'UserService',
    function($rootScope, $scope, $state, $stateParams, userService) {

        $scope.confirmRegisteration = confirmRegisteration;

        $scope.username = $stateParams.username;

        $scope.confirmingRegisteration = false;

        $scope.setBackHandler(function() {
            $state.go('lab.register', {
                username: $scope.username
            });
        });

        //$scope.validationCode

        $scope.vs = new ValidationSystem($scope)
            .field('validationCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.numberCode(4)
            ]);

        function confirmRegisteration() {
            if (!$scope.vs.validate()) return;

            $scope.confirmingRegisteration = true;
            return userService.registerConfirm($scope.username, $scope.validationCode)
                .then(function() {
                    $scope.confirmingRegisteration = false;
                    $state.go('lab.signedup');
                }, function(code) {
                    //TODO: Handle errors...
                    $scope.confirmingRegisteration = false;
                    alert(code);
                });
        }

    }
]);


/*
	AHS502 : End of 'lab/validate-controller.js'
*/


/*
	AHS502 : Start of 'panel/account-controller..js'
*/

/*global app*/
/*global $*/

app.controller('PanelAccountController', ['$scope', '$rootScope', '$state', '$stateParams',
    function($scope, $rootScope, $state, $stateParams) {

        // User data has been loaded !

    }
]);


/*
	AHS502 : End of 'panel/account-controller..js'
*/


/*
	AHS502 : Start of 'panel/balance-controller..js'
*/

/*global app*/
/*global $*/
/*global toPersianNumber*/

app.controller('PanelBalanceController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout',
    function($scope, $rootScope, $state, $stateParams, $timeout) {

        $scope.c2cPayment = c2cPayment;
        $scope.zpPayment = zpPayment;

        $scope.balance = 125000;
        $scope.preparingPayment = false;

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('وضعیت حساب و تأمین اعتبار');

        //$scope.c2cReceiptCode
        //$scope.zpChargeAmount

        $scope.testCount = Math.floor($scope.balance / 1000);

        $scope.balanceForDisplay = toPersianNumber($scope.balance);
        $scope.testCountForDisplay = $scope.testCount >= 0 ?
            toPersianNumber($scope.testCount) : '–';

        if ($scope.testCount >= 200)
            $scope.balanceColor = 'green';
        else if ($scope.testCount >= 50)
            $scope.balanceColor = 'olive';
        else if ($scope.testCount >= 20)
            $scope.balanceColor = 'yellow';
        else if ($scope.testCount > 0)
            $scope.balanceColor = 'orange';
        else
            $scope.balanceColor = 'red';

        function c2cPayment() {
            //TODO: check for validity
            $scope.preparingPayment = true;
            $timeout(function() {
                $scope.preparingPayment = false;
                $scope.showMessage('درخواست شما ثبت شد',
                        'درخواست شما در اسرع وقت مورد بررسی قرار خواهد گرفت و حساب شما شارژ خواهد شد')
                    .then(function() {
                        $state.go('panel.home');
                    });
            }, 400);
        }

        function zpPayment() {
            // body...
        }

    }
]);


/*
	AHS502 : End of 'panel/balance-controller..js'
*/


/*
	AHS502 : Start of 'panel/history-controller.js'
*/

/*global app*/
/*global $*/

app.controller('PanelHistoryController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', '$window', 'UserService', 'PostService',
    function($scope, $rootScope, $state, $stateParams, $timeout, $window, userService, postService) {

        $scope.postClicked = postClicked;

        $scope.maxCount = 500;

        var userInfo = userService.current(),
            userYear = userInfo.subscriptionDate.jYMD()[0],
            jYMD = (new Date()).jYMD(),
            currentYear = jYMD[0],
            currentMonth = jYMD[1];

        $scope.allYears = Array.range(currentYear, userYear);
        $scope.persianMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

        var historyState = $rootScope.data.historyState = $rootScope.data.historyState || {};
        $scope.nationalCode = historyState.nationalCode;

        $scope.selectedYear = historyState.selectedYear || $scope.allYears[0];
        $scope.selectedMonthFrom = historyState.selectedMonthFrom || currentMonth;
        $scope.selectedMonthFromText = $scope.persianMonths[$scope.selectedMonthFrom - 1];
        $scope.selectedMonthTo = historyState.selectedMonthTo || currentMonth;
        $scope.selectedMonthToText = $scope.persianMonths[$scope.selectedMonthTo - 1];

        var postCache = $rootScope.data.postCache = $rootScope.data.postCache || [];
        $scope.posts = [];
        loadPosts(true).then(function() {
            $timeout(function() {
                $window.scrollTo($window.scrollX, historyState.scrollY);
            });
        });

        $scope.$watch('nationalCode', function() {
            historyState.nationalCode = $scope.nationalCode;
        });

        $window.addEventListener('scroll', windowScrollHandler);
        $scope.$on('$destroy', function() {
            $window.removeEventListener('scroll', windowScrollHandler);
        });

        function windowScrollHandler(event) {
            historyState.scrollY = $window.scrollY;
        }

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('سوابق نتایج ثبت شده');

        $('#select-year').dropdown({
            onChange: function(value, text) {
                // $timeout(function() {
                $scope.selectedYear = historyState.selectedYear = value;
                loadPosts();
                // });
            }
        });

        $('#select-month-from').dropdown({
            onChange: function(value, text) {
                // $timeout(function() {
                value = Number(value);
                $scope.selectedMonthFrom = historyState.selectedMonthFrom = value;
                $scope.selectedMonthFromText = $scope.persianMonths[value - 1];
                var selectedMonthTo = $scope.selectedMonthTo > $scope.selectedMonthFrom ? $scope.selectedMonthTo : $scope.selectedMonthFrom;
                if (selectedMonthTo != $scope.selectedMonthTo)
                    $('#select-month-to').dropdown('set selected', $scope.selectedMonthTo = historyState.selectedMonthTo = selectedMonthTo);
                loadPosts();
                // });
            }
        });

        $('#select-month-to').dropdown({
            onChange: function(value, text) {
                // $timeout(function() {
                value = Number(value);
                $scope.selectedMonthTo = historyState.selectedMonthTo = value;
                $scope.selectedMonthToText = $scope.persianMonths[value - 1];
                var selectedMonthFrom = $scope.selectedMonthFrom < $scope.selectedMonthTo ? $scope.selectedMonthFrom : $scope.selectedMonthTo;
                if (selectedMonthFrom != $scope.selectedMonthFrom)
                    $('#select-month-from').dropdown('set selected', $scope.selectedMonthFrom = historyState.selectedMonthFrom = selectedMonthFrom);
                loadPosts();
                // });
            }
        });

        function loadPosts(forceReload) {
            $scope.setLoading(true);

            var yearPostCache = postCache[$scope.selectedYear] = postCache[$scope.selectedYear] || [],
                months = Array.range($scope.selectedMonthFrom, $scope.selectedMonthTo),
                filteredMonths = months.filter(function(month) {
                    return !yearPostCache[month];
                });
            if (forceReload && $scope.selectedYear == currentYear &&
                months.indexOf(currentMonth) >= 0 && filteredMonths.indexOf(currentMonth) < 0) {
                filteredMonths.push(currentMonth);
            }

            var promise;
            if (Object.keys(filteredMonths).length) {
                promise = postService.getPosts($scope.selectedYear, filteredMonths)
                    .catch(function(code) {
                        //TODO: Handle errors...
                        alert(code);
                    });
            }
            else {
                promise = Promise.resolve({});
            }

            return promise
                .then(function(postPacks) {
                    $scope.posts = [];
                    for (var month = 12; month >= 1; month--)
                        if (months.indexOf(month) >= 0) {
                            yearPostCache[month] = postPacks[$scope.selectedYear + '/' + month] || yearPostCache[month] || [];
                            $scope.posts = $scope.posts.concat(yearPostCache[month]);
                        }
                        // $scope.topPostIndex = 0;
                })
                .then(function() {
                    $scope.setLoading(false);
                });
        }

        function postClicked(post) {
            $rootScope.data.post = post;
            $state.go('panel.post');
        }

    }
]);


/*
	AHS502 : End of 'panel/history-controller.js'
*/


/*
	AHS502 : Start of 'panel/home-controller.js'
*/

/*global app*/

app.controller('PanelHomeController', ['$scope', '$rootScope', '$state', '$stateParams', 'UserService',
    function($scope, $rootScope, $state, $stateParams, userService) {

        $scope.setBackHandler($scope.menuHandlers.logout);

        var userInfo = userService.current();

        $scope.setPageTitle((userInfo && userInfo.labName) || ' ');

    }
]);


/*
	AHS502 : End of 'panel/home-controller.js'
*/


/*
	AHS502 : Start of 'panel/post-controller.js'
*/

/*global app*/
/*global toPersianNumber*/
/*global persianDate*/

app.controller('PanelPostController', ['$scope', '$rootScope', '$state', '$stateParams', 'PostService',
    function($scope, $rootScope, $state, $stateParams, postService) {

        var postSummary = $rootScope.data.post;

        $scope.setBackHandler(function() {
            $state.go('panel.history');
        });

        $scope.setPageTitle('لطفاً کمی صبر کنید...');

        $scope.setLoading(true);
        postService.getOnePost(postSummary.nationalCode, postSummary.postCode)
            .then(function(post) {
                $scope.post = post;
                $scope.setPageTitle($scope.post.fullName);

                $scope.postDataForDisplay = [{
                    label: 'نام بیمار',
                    value: toPersianNumber(post.fullName)
                }, {
                    label: 'کد ملی بیمار',
                    value: toPersianNumber(post.nationalCode)
                }, {
                    label: 'تلفن های تماس بیمار',
                    value: toPersianNumber(post.numbers.join(' - '))
                }, {
                    label: 'آدرس پست الکترونیکی بیمار',
                    value: post.email
                }, {
                    label: 'شماره آزمایش',
                    value: toPersianNumber(post.postCode)
                }, {
                    label: 'تاریخ ارسال نتایج آزمایش',
                    value: persianDate(post.postDate).format('L')
                }, {
                    label: 'تعداد فایل های پیوست',
                    value: toPersianNumber(post.files.length)
                }];

            }, function(code) {
                //TODO: Handle errors...
                alert(code);
            })
            .then(function() {
                $scope.setLoading(false);
            });

    }
]);


/*
	AHS502 : End of 'panel/post-controller.js'
*/


/*
	AHS502 : Start of 'panel/send-controller.js'
*/

/*global app*/
/*global $*/
/*global ValidationSystem*/
/*global iconJs*/

app.controller('PanelSendController', ['$scope', '$rootScope', '$state', '$stateParams', '$window', '$timeout', '$http', 'AnswerService',
    function($scope, $rootScope, $state, $stateParams, $window, $timeout, $http, answerService) {

        $scope.loadPatientInfo = loadPatientInfo;
        $scope.sendAnswer = sendAnswer;
        $scope.selectFilesDialog = selectFilesDialog;
        $scope.abortUpload = abortUpload;
        $scope.removeFile = removeFile;

        $scope.sendingAnswer = false;
        $scope.files = [];
        /* Each file has :
            status:         Preparing, Uploading, Uploded, Error, Aborting, Aborted, Removing, Removed
            name:           alpha.beta
            size:           1024
            type:           application/beta
            lastModified:   
            id:             4
            srcPreview:     pdf file
            xhr:            Uploading XHR for this file
            progress:       73
            serverName:     1234567
        */

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('ارسال نتایج');

        var inputFile = $window.document.getElementById('input-file');
        var dropZone = $window.document.getElementById('drop-zone');

        inputFile.addEventListener('change', inputFile_OnChange, false);
        $window.document.addEventListener("dragover", document_OnDragOver, false);
        $window.document.addEventListener("dragleave", document_OnDragLeave, false);
        $window.document.addEventListener("drop", document_OnDrag, false);
        $scope.$on('$destroy', function() {
            inputFile.removeEventListener('change', inputFile_OnChange);
            $window.document.removeEventListener("dragover", document_OnDragOver);
            $window.document.removeEventListener("dragleave", document_OnDragLeave);
            $window.document.removeEventListener("drop", document_OnDrag);
        });

        $scope.person = {};
        //$scope.person.nationalCode
        //$scope.person.fullName
        //$scope.person.mobilePhoneNumber
        //$scope.person.phoneNumber
        //$scope.person.extraPhoneNumber
        //$scope.person.email
        //$scope.notes

        $scope.vs = new ValidationSystem($scope.person)
            .field('nationalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.nationalCode()
            ])
            .field('fullName', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(3)
            ])
            .field('mobilePhoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.mobilePhoneNumber()
            ])
            .field('phoneNumber', [
                ValidationSystem.validators.notRequired(),
                ValidationSystem.validators.phoneNumber()
            ])
            .field('extraPhoneNumber', [
                ValidationSystem.validators.notRequired(),
                ValidationSystem.validators.phoneNumber()
            ])
            .field('email', [
                ValidationSystem.validators.notRequired(),
                ValidationSystem.validators.email()
            ]);

        var fileId = 0;

        function loadPatientInfo() {
            if (!$scope.vs.see('nationalCode')) return;

            if ($scope.person.fullName && $scope.person.mobilePhoneNumber && $scope.person.phoneNumber &&
                $scope.person.extraPhoneNumber && $scope.person.email) return;

            $scope.sendingAnswer = true;
            return answerService.patientInfo($scope.person.nationalCode)
                .then(function(patient) {

                    $scope.person.fullName = $scope.person.fullName || patient.fullName;
                    $scope.person.mobilePhoneNumber = $scope.person.mobilePhoneNumber || patient.numbers[0];
                    $scope.person.phoneNumber = $scope.person.phoneNumber || patient.numbers[1];
                    $scope.person.extraPhoneNumber = $scope.person.extraPhoneNumber || patient.numbers[2];
                    $scope.person.email = $scope.person.email || patient.email;

                    $scope.vs.check('fullName', 'mobilePhoneNumber', 'phoneNumber', 'extraPhoneNumber', 'email');

                }, function(code) {
                    // No problem!
                })
                .then(function() {
                    $scope.sendingAnswer = false;
                });
        }

        function sendAnswer() {
            if (!$scope.vs.validate()) return;

            $scope.sendingAnswer = true;
            answerService.send($scope.person, $scope.files, $scope.notes, $scope.vs.dictate)
                .then(function() {
                    $scope.sendingAnswer = false;
                    $scope.showMessage('ازسال موفقیت آمیز نتایج آزمایش',
                            'نتایج آزمایش ثبت شده و اطلاع رسانی لازم به بیمار صورت خواهد گرفت.')
                        .then(function() {
                            $state.go('panel.home');
                        });
                }, function(code) {
                    $scope.sendingAnswer = false;
                    alert(code);
                });
        }

        function selectFilesDialog() {
            inputFile.click();
        }

        function inputFile_OnChange(e) {
            var files = toArray(inputFile.files);
            inputFile.value = '';
            addNewFiles(files);
        }

        function processDragEvent(e) {
            dropZone.className = (e.type === 'dragover' && e.path.indexOf(dropZone) >= 0) ? 'drag-on' : '';
            e.stopPropagation();
            e.preventDefault();
        }

        function document_OnDragOver(e) {
            processDragEvent(e);
        }

        function document_OnDragLeave(e) {
            processDragEvent(e);
        }

        function document_OnDrag(e) {
            processDragEvent(e);
            if (e.path.indexOf(dropZone) >= 0) {
                var files = toArray(e.target.files || e.dataTransfer.files);
                addNewFiles(files);
            }
        }

        function addNewFiles(files) {

            // filter bad / duplicated / veryLarge files
            files = files.filter(function(file) {
                return file.size > 0 && file.size <= 10 * 1024 * 1024 && file.type != '' &&
                    $scope.files.filter(function(existingFile) {
                        return existingFile.name === file.name &&
                            existingFile.size === file.size &&
                            existingFile.type === file.type &&
                            existingFile.lastModified === file.lastModified;
                    }).length === 0;
            });

            // assign id & try to make a preview image for the file
            files.forEach(function(file) {
                file.id = fileId++;

                file.srcPreview = iconJs.file(file.name);

                if (file.type.match('image.*')) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        $timeout(function() {
                            file.srcPreview = e.target.result;
                        });
                    };
                    reader.readAsDataURL(file);
                }
            });

            // start uploading the file
            files.forEach(uploadFile);

            // show all files
            $scope.files = $scope.files.concat(files);
            $scope.$$phase || $scope.$apply();
        }

        function uploadFile(file) {

            file.status = 'Preparing';

            var formData = new FormData();
            formData.append(file.name, file);

            var xhr = new XMLHttpRequest();
            file.xhr = xhr;
            xhr.open('post', '/answer/file/upload', true);
            xhr.setRequestHeader('X-Access-Token', $http.defaults.headers.common['X-Access-Token']);
            xhr.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                    file.progress = Math.floor((e.loaded / e.total) * 100);
                    $('#progress-' + file.id).progress({
                        percent: file.progress
                    });
                    $scope.$$phase || $scope.$apply();
                }
            };
            xhr.onerror = function(e) {
                file.status = 'Error';
                $scope.$$phase || $scope.$apply();
            };
            xhr.onabort = function(e) {
                (file.status === 'Aborting') && (file.status = 'Aborted');
                $scope.$$phase || $scope.$apply();
            };
            xhr.onload = function(e) {
                try {
                    if (e.currentTarget.status != 200)
                        throw e.currentTarget.response;
                    file.serverName = JSON.parse(e.currentTarget.response).filename;
                    file.status = 'Uploaded';
                }
                catch (err) {
                    file.status = 'Error';
                }
                $scope.$$phase || $scope.$apply();
            };

            file.status = 'Uploading';
            file.progress = 0;
            $('#progress-' + file.id).progress({
                percent: file.progress
            });
            $scope.$$phase || $scope.$apply();

            xhr.send(formData);
        }

        function abortUpload(file) {
            file.status = 'Aborting';
            file.xhr.abort();
        }

        function removeFile(file) {
            //TODO: lock this file interface
            abortUpload(file);
            file.status = 'Removing';
            $timeout(function() {
                file.status = 'Removed';
                $scope.files.splice($scope.files.indexOf(file), 1);
            } /*, 500*/ );
        }

        // convert object to array
        // e.g.: Convert FileList to Array of File
        function toArray(arrayLikeObject) {
            return Array.apply(null, {
                    length: arrayLikeObject.length
                }).map(Number.call, Number)
                .map(function(i) {
                    return arrayLikeObject[i];
                });
            /* or */
            // return Array.prototype.slice.call(arrayLikeObject);
        }

    }
]);


/*
	AHS502 : End of 'panel/send-controller.js'
*/


/*
	AHS502 : Start of 'panel/account/confirm-controller.js'
*/

/*global app*/
/*global $*/
/*global ValidationSystem*/

app.controller('PanelAccountConfirmController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', 'UserService',
    function($scope, $rootScope, $state, $stateParams, $timeout, userService) {

        $scope.confirm = confirm;

        $scope.confirming = false;

        $scope.action = $stateParams.action;

        $scope.setBackHandler(function() {
            if ($scope.action === 'change password')
                $state.go('panel.account.password');
            else if ($scope.action === 'edit account')
                $state.go('panel.account.edit');
            else
                $state.go('panel.account.summary');
        });

        $scope.setPageTitle('تأیید عملیات');

        // $scope.verificationCode

        $scope.vs = new ValidationSystem($scope)
            .field('verificationCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.numberCode(4)
            ]);

        function confirm() {
            if (!$scope.vs.validate()) return;

            $scope.confirming = true;
            userService.editConfirm($rootScope.data.labData.username, $scope.verificationCode)
                .then(function() {
                    $scope.confirming = false;
                    $scope.showMessage('عملیات با موفقیت انجام شد',
                            $scope.action === 'change password' ?
                            'رمز عبور شما با موفقیت تغییر کرد' :
                            $scope.action === 'edit account' ?
                            'اصلاحات مورد نظر با موفقیت در سامانه ثبت شدند' : '')
                        .then(function() {
                            return $scope.refreshUserData()
                        })
                        .then(function() {
                            $state.go('panel.account.summary');
                        });;
                }, function(code) {
                    $scope.confirming = false;
                    alert(code);
                });
        }

    }
]);


/*
	AHS502 : End of 'panel/account/confirm-controller.js'
*/


/*
	AHS502 : Start of 'panel/account/edit-controller.js'
*/

/*global app*/
/*global ValidationSystem*/

app.controller('PanelAccountEditController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', 'UserService',
    function($scope, $rootScope, $state, $stateParams, $timeout, userService) {

        $scope.editAccount = editAccount;

        $scope.editingAccount = false;

        $scope.user = {
            labName: $rootScope.data.labData.labName,
            mobilePhoneNumber: $rootScope.data.labData.mobilePhoneNumber,
            phoneNumber: $rootScope.data.labData.phoneNumber,
            address: $rootScope.data.labData.address,
            postalCode: $rootScope.data.labData.postalCode,
            websiteAddress: $rootScope.data.labData.websiteAddress,
        };

        $scope.setBackHandler(function() {
            $state.go('panel.account.summary');
        });

        $scope.setPageTitle('ویرایش اطلاعات کاربری آزمایشگاه');

        $scope.vs = new ValidationSystem($scope.user)
            .field('labName', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(5)
            ])
            .field('mobilePhoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.mobilePhoneNumber()
            ])
            .field('phoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.phoneNumber()
            ])
            .field('address', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(10)
            ])
            .field('postalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.integer(),
                ValidationSystem.validators.length(10)
            ])
            .field('websiteAddress', [
                ValidationSystem.validators.notRequired(),
                ValidationSystem.validators.minLength(5),
                ValidationSystem.validators.url()
            ]);

        function editAccount() {
            if (!$scope.vs.validate()) return;

            $scope.editingAccount = true;
            userService.editAccount($scope.user, $scope.vs.dictate)
                .then(function() {
                    $state.go('panel.account.confirm', {
                        action: 'edit account'
                    });
                    $scope.editingAccount = false;
                }, function(code) {
                    $scope.editingAccount = false;
                    alert(code);
                });
        }

    }
]);


/*
	AHS502 : End of 'panel/account/edit-controller.js'
*/


/*
	AHS502 : Start of 'panel/account/password-controller.js'
*/

/*global app*/
/*global ValidationSystem*/

app.controller('PanelAccountPasswordController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', 'UserService',
    function($scope, $rootScope, $state, $stateParams, $timeout, userService) {

        $scope.changePassword = changePassword;

        $scope.changingPassword = false;

        $scope.setBackHandler(function() {
            $state.go('panel.account.summary');
        });

        $scope.setPageTitle('تغییر کلمه عبور');

        // $scope.oldPassword
        // $scope.newPassword
        // $scope.newPasswordAgain

        $scope.vs = new ValidationSystem($scope)
            .field('oldPassword', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(4),
            ])
            .field('newPassword', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(4),
                function(value) {
                    if ($scope.newPasswordAgain && $scope.newPasswordAgain != value) {
                        return 'کلمه های عبور وارد شده یکسان نیستند';
                    }
                }
            ])
            .field('newPasswordAgain', [
                function(value) {
                    if (!$scope.newPassword) return true;
                },
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(4),
                function(value) {
                    if ($scope.newPassword != value) {
                        return 'کلمه های عبور وارد شده یکسان نیستند';
                    }
                }
            ]);

        function changePassword() {
            if (!$scope.vs.validate()) return;

            $scope.changingPassword = true;
            userService.editPassword($scope.oldPassword, $scope.newPassword, $scope.vs.dictate)
                .then(function() {
                    $state.go('panel.account.confirm', {
                        action: 'change password'
                    });
                    $scope.changingPassword = false;
                }, function(code) {
                    //TODO: handle error...
                    $scope.changingPassword = false;
                    alert(code);
                });
        }

    }
]);


/*
	AHS502 : End of 'panel/account/password-controller.js'
*/


/*
	AHS502 : Start of 'panel/account/summary-controller.js'
*/

/*global app*/
/*global toPersianNumber*/
/*global persianDate*/

app.controller('PanelAccountSummaryController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout',
    function($scope, $rootScope, $state, $stateParams, $timeout) {

        $scope.editAccountData = editAccountData;
        $scope.changePassword = changePassword;

        $scope.userDataForDisplay = [{
            label: 'نام آزمایشگاه',
            value: toPersianNumber($rootScope.data.labData.labName)
        }, {
            label: 'تلفن همراه ارتباطی اصلی',
            value: toPersianNumber($rootScope.data.labData.mobilePhoneNumber)
        }, {
            label: 'تلفن تماس دوم',
            value: toPersianNumber($rootScope.data.labData.phoneNumber)
        }, {
            label: 'آدرس',
            value: toPersianNumber($rootScope.data.labData.address)
        }, {
            label: 'کد پستی',
            value: toPersianNumber($rootScope.data.labData.postalCode)
        }, {
            label: 'آدرس درگاه اینترنتی',
            value: $rootScope.data.labData.websiteAddress
        }, {
            label: 'نام کاربری',
            value: $rootScope.data.labData.username
        }, {
            label: 'تاریخ عضویت',
            value: persianDate($rootScope.data.labData.subscriptionDate).format('L')
        }];

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('اطلاعات کاربری آزمایشگاه');

        function editAccountData() {
            $state.go('panel.account.edit');
        }

        function changePassword() {
            $state.go('panel.account.password');
        }

    }
]);


/*
	AHS502 : End of 'panel/account/summary-controller.js'
*/


/*
	AHS502 : Start of 'answer-controller.js'
*/

/*global app*/
/*global persianDate*/
/*global toPersianNumber*/
/*global Clipboard*/
/*global simpleQueryString*/
/*global d3*/

app.controller('AnswerController', ['$rootScope', '$scope', '$timeout', '$window', '$location', '$state', '$stateParams', 'HistoryService',
    function($rootScope, $scope, $timeout, $window, $location, $state, $stateParams, historyService) {

        var printLayoutWidth = 2400;

        $scope.nationalCode = $stateParams.p;
        $scope.postCode = $stateParams.n;

        $scope.pdfFileEventHandlerMaker = pdfFileEventHandlerMaker;
        $scope.copySharedUrl = copySharedUrl;

        var clipboard, url = $location.absUrl();
        url = url.slice(0, url.indexOf('#') + 2) + 'answer' + url.slice(url.indexOf('?'));

        var previousState = $stateParams.previousState,
            previousStateData = $stateParams.previousStateData;

        $scope.setBackHandler(function() {
            if (!$state.is('answer.post'))
                $state.go('answer.post');
            else {
                if (previousState === 'history') {
                    $rootScope.data.patientInfo = previousStateData.patientInfo;
                    $rootScope.data.history = previousStateData.history;
                    $state.go(previousState, {
                        nationalCode: $scope.nationalCode
                    });
                }
                else {
                    $state.go(previousState || 'home.find');
                }
            }
        });

        $scope.setMenuHandlers({
            viewFile: function() {
                $state.go('answer.post');
            },
            saveFile: function() {
                $state.go('answer.download');
            },
            shareFile: function() {
                clipboard = undefined;
                $scope.sharedUrl = url;
                $scope.sharingViaSms = 'sms:;?&' + simpleQueryString.stringify({
                    body: 'سلام!\n' + $scope.answer.patientName + ' می خواهد نتایج آزمایش خود را با شما به اشتراک بگذارد:\n\n' + url
                });
                $scope.sharingViaEmail = 'mailto:?&' + simpleQueryString.stringify({
                    body: 'سلام!\n' + $scope.answer.patientName + ' می خواهد نتایج آزمایش خود را با شما به اشتراک بگذارد:\n\n' + url,
                    subject: 'نتایج آزمایش ' + $scope.answer.patientName
                });
                $scope.sharingViaTelegram = 'https://telegram.me/share/url?' + simpleQueryString.stringify({
                    text: 'سلام!\n' + $scope.answer.patientName + ' می خواهد نتایج آزمایش خود را با شما به اشتراک بگذارد.',
                    url: url
                });
                $state.go('answer.share');
            },
            printFile: function() {
                $scope.printing = true;
                Promise.all([
                    new Promise(function(resolve, reject) {
                        $timeout(resolve, 1000);
                    }),
                    new Promise(function(resolve, reject) {
                        var pdfFiles = $scope.answer.files.filter(function(file) {
                            return file.material === 'pdf';
                        });
                        if (pdfFiles.length) {
                            checkIfAllPdfFilesLoaded(function() {
                                Promise.all(pdfFiles.map(function(pdfFile) {
                                    return Promise.all(pdfFile.model.pages.map(function(page) {
                                        return page.createDataURL(printLayoutWidth);
                                    })).then(function(dataUrls) {
                                        pdfFile.dataUrls = dataUrls;
                                    });
                                })).then(resolve, reject);
                            });
                        }
                        else {
                            resolve();
                        }
                    })
                ]).then(function() {
                    $window.print();
                }, function(reason) {
                    console.log("Coulldn't print:", reason);
                }).then(function() {
                    $timeout(function() {
                        $scope.printing = false;
                    });
                });
            },
            getPrintingStatus: function() {
                return $scope.printing;
            },
            goToLaboratory: function() {
                $state.go('answer.laboratory');
            },
            goToLaboratoryWebsite: function() {
                var url = $scope.answer && $scope.answer.lab && $scope.answer.lab.websiteAddress;
                if (url) {
                    if (url.indexOf('http://') !== 0 || url.indexOf('https://') !== 0)
                        url = 'http://' + url;
                    window.open(url, '_blank').focus();
                }
            },
            labGetter: function() {
                return ($scope.answer && $scope.answer.lab) || {};
            },
        });

        $scope.setHeaderHandlers({
            paitentNameGetter: function() {
                return $scope.answer ? $scope.answer.patientName : ' ';
            }
        });

        $scope.setFooterHandlers({
            postDateGetter: function() {
                return $scope.answer ? persianDate($scope.answer.postDate).format('L') : ' ';
            },
            postCodeGetter: function() {
                return toPersianNumber($scope.postCode);
            }
        });

        // $('#answer-test-number').popup({
        //     inline: true,
        //     transition: 'scale'
        // });

        // $('#answer-laboratory-name').popup({
        //     inline: true,
        //     transition: 'scale'
        // });

        $state.go('answer.post');

        $scope.loading = true;
        historyService.loadAnswer($scope.nationalCode, $scope.postCode)
            .then(function(answer) {
                answer.files.forEach(function(file) {
                    file.url = '/answer/file/download?p=' + $scope.nationalCode +
                        '&n=' + $scope.postCode + '&f=' + file.serverName;
                    file.urlWithoutContentType = file.url + '&t=false'; // To prevent default downloader applications to interfere.
                    if (file.type.indexOf('image') >= 0) file.material = 'image';
                    else if (file.type === 'application/pdf') file.material = 'pdf';
                });
                $scope.answer = answer;
                $scope.loading = false;
            }, function(code) {
                //TODO: Handle errors...
                $scope.loading = false;
                alert(code);
            })
            .then(function() {
                $scope.answer = $scope.answer || {};
                $scope.answer.lab = $scope.answer.lab || {};
                $scope.labDataForDisplay = [{
                    label: 'نام آزمایشگاه',
                    value: toPersianNumber($scope.answer.lab.name)
                }, {
                    label: 'تلفن تماس',
                    value: !$scope.answer.lab ? '' : toPersianNumber($scope.answer.lab.mobilePhoneNumber + ' - ' + $scope.answer.lab.phoneNumber)
                }, {
                    label: 'آدرس',
                    value: toPersianNumber($scope.answer.lab.address)
                }, {
                    label: 'کد پستی',
                    value: toPersianNumber($scope.answer.lab.postalCode)
                }, {
                    label: 'آدرس درگاه اینترنتی',
                    value: $scope.answer.lab.websiteAddress
                }];
            });

        function copySharedUrl() {
            if (!clipboard) {
                clipboard = new Clipboard('#ja-shared-url-copy');
                clipboard.on('success', function(e) {
                    console.info('Success', e.action, e.text);
                    e.clearSelection();
                });
                clipboard.on('error', function(e) {
                    console.info('Error', e.action, e.text);
                });
            }
        }

        function pdfFileEventHandlerMaker(file) {
            return function(event) {
                switch (event.event) {
                    case 'error':
                        file.error = event.error;
                        break;
                    case 'render start':
                        delete file.error;
                        break;
                }
                file.loaded = ['loaded pages', 'render start', 'render finish', 'error'].indexOf(file.model.state) >= 0;
                checkIfAllPdfFilesLoaded();
            };
        }

        var allPdfFilesLoadedEventHandlers = [],
            allPdfFilesLoaded = false;

        function checkIfAllPdfFilesLoaded(eventHandler) {
            if (typeof eventHandler === 'function' && allPdfFilesLoadedEventHandlers.indexOf(eventHandler) < 0) {
                allPdfFilesLoaded && eventHandler();
                allPdfFilesLoaded || allPdfFilesLoadedEventHandlers.push(eventHandler);
            }
            if (!allPdfFilesLoaded && $scope.answer) {
                allPdfFilesLoaded = $scope.answer.files.reduce(function(result, file, index) {
                    if (file.material !== 'pdf') return result;
                    return result && file.loaded;
                }, true);
                allPdfFilesLoaded && allPdfFilesLoadedEventHandlers.forEach(function(eventHandler) {
                    eventHandler();
                });
            }
        }

    }
]);


/*
	AHS502 : End of 'answer-controller.js'
*/


/*
	AHS502 : Start of 'history-controller.js'
*/

/*global app*/

app.controller('HistoryController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout',
    function($rootScope, $scope, $state, $stateParams, $timeout) {

        $scope.postClicked = postClicked;

        $scope.nationalCode = $stateParams.nationalCode;

        $scope.patientInfo = $rootScope.data.patientInfo;
        $scope.history = $rootScope.data.history;
        if (!$scope.patientInfo) {
            return $state.go('home.otp');
        }

        $scope.setBackHandler(function() {
            $state.go('home.otp');
        });

        $scope.setMenuHandlers(false);

        $scope.setHeaderHandlers({
            paitentName: $scope.patientInfo.fullName
        });

        $scope.setFooterHandlers(false);

        $scope.$on('$destroy', function() {
            delete $rootScope.data.patientInfo;
            delete $rootScope.data.history;
        });

        function postClicked(post) {
            $state.go('answer', {
                p: post.nationalCode,
                n: post.postCode,
                previousState: 'history',
                previousStateData: {
                    patientInfo: $scope.patientInfo,
                    history: $scope.history
                }
            });
        }

    }
]);


/*
	AHS502 : End of 'history-controller.js'
*/


/*
	AHS502 : Start of 'home-controller.js'
*/

/*global app*/
/*global $*/

app.controller('HomeController', ['$scope', '$state',
    function($scope, $state) {

        $scope.setMenuHandlers({
            goToHomeFind: function() {
                $state.go('home.find');
            },
            goToHomeOtp: function() {
                $state.go('home.otp');
            },
            goToLabLogin: function() {
                $state.go('lab.login');
            },
            goToHomeAbout: function() {
                $state.go('home.about', {
                    previousState: $state.current
                });
            },
            goToHomeContact: function() {
                $state.go('home.contact', {
                    previousState: $state.current
                });
            },
        });

        $scope.setHeaderHandlers(false);

        $scope.setFooterHandlers(true);

        $('#home-contact-us').popup({
            inline: true,
            transition: 'scale'
        });

    }
]);


/*
	AHS502 : End of 'home-controller.js'
*/


/*
	AHS502 : Start of 'lab-controller.js'
*/

/*global app*/
/*global $*/

app.controller('LabController', ['$scope', '$state',
    function($scope, $state) {

        $scope.setMenuHandlers({
            goToLabLogin: function() {
                $state.go('lab.login');
            },
            goToLabRegister: function() {
                $state.go('lab.register');
            },
            goToHomeFind: function() {
                $state.go('home.find');
            },
            goToLabAbout: function() {
                $state.go('lab.about', {
                    previousState: $state.current
                });
            },
            goToLabContact: function() {
                $state.go('lab.contact', {
                    previousState: $state.current
                });
            },
        });

        $scope.setHeaderHandlers(false);

        $scope.setFooterHandlers(true);

    }
]);


/*
	AHS502 : End of 'lab-controller.js'
*/


/*
	AHS502 : Start of 'master-controller.js'
*/

/*global app*/
/*global $*/

app.controller('MasterController', ['$scope', '$rootScope', '$q', '$window',
    function($scope, $rootScope, $q, $window) {

        // $scope.log = function() {
        //     console.log.apply(console, Array.prototype.slice.call(arguments));
        // };

        $scope.setBackHandler = setBackHandler;
        $scope.setMenuHandlers = setMenuHandlers;
        $scope.setHeaderHandlers = setHeaderHandlers;
        $scope.setFooterHandlers = setFooterHandlers;

        $scope.toggleMenu = toggleMenu;

        $scope.showMessage = showMessage;

        $scope.backHandler = undefined;
        $scope.menuHandlers = undefined;
        $scope.headerHandlers = undefined;
        $scope.footerHandlers = undefined;

        $scope.iconJs = $window.iconJs;

        function setBackHandler(handler) {
            $scope.backHandler = handler;
        }

        function setMenuHandlers(handlerObject) {
            $scope.menuHandlers = handlerObject;
        }

        function setHeaderHandlers(handlerObject) {
            $scope.headerHandlers = handlerObject;
        }

        function setFooterHandlers(handlerObject) {
            $scope.footerHandlers = handlerObject;
        }

        function toggleMenu() {
            $('#ja-sidebar-menu')
                .sidebar('setting', 'transition', 'overlay')
                .sidebar('setting', 'mobileTransition', 'overlay')
                .sidebar('toggle');
        }

        function showMessage(title, message, ok) {
            $scope.modal = {
                title: title,
                message: message,
                ok: ok || 'تأیید'
            };
            var defer = $q.defer();
            $('#ja-informer-modal')
                .modal({
                    onHide: function() {
                        defer.resolve();
                    }
                })
                .modal('show');
            return defer.promise;
        }

    }
]);


/*
	AHS502 : End of 'master-controller.js'
*/


/*
	AHS502 : Start of 'panel-controller.js'
*/

/*global app*/

app.controller('PanelController', ['$scope', '$rootScope', '$state', '$stateParams',
    '$timeout', '$interval', 'UserService',
    function($scope, $rootScope, $state, $stateParams,
        $timeout, $interval, userService) {

        $scope.setLoading = setLoading;
        $scope.setPageTitle = setPageTitle;
        $scope.refreshUserData = refreshUserDataProvider(false);

        $scope.loading = $scope.loadingMessage = false;

        // Refresh user info every 1 minute
        var refreshUserDataPromise = $interval(refreshUserDataProvider(true), 60000);
        $scope.$on('$distroy', function() {
            $interval.cancel(refreshUserDataPromise);
        });

        $scope.setMenuHandlers({
            goToMainPage: function() {
                $state.go('panel.home');
            },
            goToSendResults: function() {
                $state.go('panel.send');
            },
            goToResultsHistory: function() {
                $state.go('panel.history');
            },
            goToChargeAccount: function() {
                $state.go('panel.balance');
            },
            goToUserAccount: function() {
                $state.go('panel.account.summary');
            },
            logout: function() {
                setLoading(true);
                return userService.logout().then(function() {
                    setLoading(false);
                    $state.go('lab.login');
                });
            }
        });

        var headerHandlers = {
            pageTitle: ''
        };

        $scope.setHeaderHandlers(headerHandlers);

        $scope.setFooterHandlers(false);

        function setLoading(loading) {
            $timeout(function() {
                $scope.loading = loading;
                $scope.loadingMessage = false;
                loading && $timeout(function() {
                    $scope.loadingMessage = true;
                }, 1500);
            });
        }

        function setPageTitle(title) {
            headerHandlers.pageTitle = title;
        }

        function refreshUserDataProvider(silent) {
            return function() {
                silent || $scope.setLoading(true);
                return userService.refresh().then(function(userInfo) {
                    $rootScope.data.labData = userInfo;
                    silent || $scope.setLoading(false);
                });
            };
        }

    }
]);


/*
	AHS502 : End of 'panel-controller.js'
*/


/*
	AHS502 : Start of 'pdf.js'
*/

/*global angular*/
/*global app*/
/*global resourceLoader*/
/*global PDFJS*/

// States are: 'init', 'loading pdf', 'loaded pdf', 'loading pages',
//             'loaded pages', 'render start', 'render finish', 'error'
app.directive('pdf', ['$timeout', '$window', function($timeout, $window) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,

        scope: {
            src: '@ngSrc',
            model: '=?ngModel',
            width: '@',
            hideRendering: '@',
            eventHandler: '&'
        },

        template: [
            '<div>',
            '    <div ng-if="loading" ng-transclude></div>',
            '    <div ng-hide="loading" class="pdf-canvas-container"></div>',
            '</div>',
        ].join(''),

        link: function(scope, instanceElement, instanceAttributes) {

            scope.model = scope.model || {};
            var hasPdf = !!scope.model.pdf,
                hasPages = scope.model.pages && Array.isArray(scope.model.pages);

            if (!(hasPdf && hasPages) && !scope.src) {
                scope.eventHandler({
                    event: 'error',
                    error: 'No URL has been specified.'
                });
                return;
            }

            var desiredWidth,
                container = angular.element(instanceElement[0].querySelector('.pdf-canvas-container'));
            container.css('width', scope.width || '100%');

            var hideRendering = scope.hideRendering === 'true',
                state = 'init',
                eventHandler = function(event) {
                    event.state = state;
                    state = event.event;
                    scope.model && (scope.model.state = state);
                    var stateEventHandler = scope.eventHandler();
                    if (typeof stateEventHandler === 'function') {
                        stateEventHandler(event);
                    }
                };

            scope.loading = true;
            var promise;

            if (hasPdf) {
                promise = Promise.resolve(scope.model.pdf);
            }
            else {
                promise = new Promise(function(resolve, reject) {
                    resourceLoader.js('/dist/lib/pdf.min.js', function() {
                        if (PDFJS) {
                            eventHandler({
                                event: 'loading pdf'
                            });
                            PDFJS.getDocument(scope.src).then(function(pdf) {
                                scope.model && (scope.model.pdf = pdf);
                                eventHandler({
                                    event: 'loaded pdf',
                                    pdf: pdf
                                });
                                resolve(pdf);
                            }, function(reason) {
                                reject('Could not resolve pdf.');
                            });
                        }
                        else {
                            reject('Could not resolve PDFJS.');
                        }
                    });
                });
            }

            if (hasPages) {
                promise = promise.then(function(pdf) {
                    return scope.model.pages;
                });
            }
            else {
                promise = promise.then(function(pdf) {
                    eventHandler({
                        event: 'loading pages'
                    });
                    return Promise.all(Array.range(1, pdf.numPages).map(function(pageNumber) {
                        return pdf.getPage(pageNumber);
                    })).then(function(pages) {
                        pages.forEach(function(page) {
                            page.createCanvas = function(width, pointPerPixel) {
                                pointPerPixel = pointPerPixel || 1;
                                var viewport = page.getViewport(1);
                                viewport = page.getViewport(pointPerPixel * width / viewport.width);
                                var canvas = document.createElement('canvas');
                                var context = canvas.getContext('2d');
                                canvas.width = viewport.width;
                                canvas.height = viewport.height;
                                canvas.style.width = width + 'px';
                                canvas.style.height = (width * viewport.height / viewport.width) + 'px';
                                var renderContext = {
                                    canvasContext: context,
                                    viewport: viewport
                                };
                                return {
                                    canvas: canvas,
                                    promise: page.render(renderContext)
                                };
                            };
                            page.createDataURL = function(width, mimeType, quality) {
                                var result = page.createCanvas(width);
                                return new Promise(function(resolve, reject) {
                                    result.promise.then(function() {
                                        resolve(result.canvas.toDataURL(mimeType, quality));
                                    }, function(error) {
                                        reject(error);
                                    });
                                });
                            };
                        });
                        scope.model && (scope.model.pages = pages);
                        eventHandler({
                            event: 'loaded pages',
                            pages: pages
                        });
                        return pages;
                    }, function(reason) {
                        return Promise.reject('Could not resolve pages.');
                    });
                });
            }

            promise.then(function(pages) {
                renderPages();
                if (!hideRendering) {
                    $timeout(function() {
                        scope.loading = false;
                    });
                }
            }).catch(function(reason) {
                eventHandler({
                    event: 'error',
                    error: reason
                });
            });

            $window.addEventListener('resize', resizeEventHandler);
            scope.$on('$destroy', function() {
                $window.removeEventListener('resize', resizeEventHandler);
            });

            function resizeEventHandler(event) {
                if (desiredWidth != calculateDesiredWidth()) renderPages();
            }

            function renderPages() {
                if (!scope.model || !Array.isArray(scope.model.pages)) return;
                if (hideRendering) {
                    $timeout(function() {
                        scope.loading = true;
                    });
                }
                container.empty();
                desiredWidth = calculateDesiredWidth();
                eventHandler({
                    event: 'render start',
                    desiredWidth: desiredWidth
                });
                return Promise.all(scope.model.pages.map(function(page) {
                    var result = page.createCanvas(desiredWidth, 2);
                    page.canvas = result.canvas;
                    container.append(result.canvas);
                    return result.promise;
                })).then(function() {
                    if (hideRendering) {
                        $timeout(function() {
                            scope.loading = false;
                        }).then(renderFinishEventHandler);
                    }
                    else {
                        renderFinishEventHandler();
                    }

                    function renderFinishEventHandler() {
                        eventHandler({
                            event: 'render finish'
                        });
                    }
                });
            }

            function calculateDesiredWidth() {
                return instanceElement[0].offsetWidth || instanceElement[0].clientWidth;
            }

        },
    };
}]);


/*
	AHS502 : End of 'pdf.js'
*/


/*
	AHS502 : Start of 'zoomable.js'
*/

/*global angular*/
/*global app*/
/*global d3*/

app.directive('zoomable', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        replace: false,
        transclude: false,

        scope: {
            maxZoom: '&',

            top: '@',
            bottom: '@',
            right: '@',
            left: '@'
        },

        link: function(scope, instanceElement, instanceAttributes) {

            var root = instanceElement,
                content = angular.element(instanceElement[0].children[0]);

            var rootD3 = d3.select(root[0]),
                contentD3 = d3.select(content[0]);

            rootD3
                .style('position', 'fixed')
                .style('top', (scope.top || '0') + 'px')
                .style('bottom', (scope.bottom || '0') + 'px')
                .style('right', (scope.right || '0') + 'px')
                .style('left', (scope.left || '0') + 'px');

            contentD3
                .style('min-width', calculateWidth(root) + 'px')
                .style('min-height', calculateHeight(root) + 'px');

            var zoom = d3.zoom()
                .scaleExtent([1, maxZoom()])
                .duration(400)
                .on("zoom", zoomed);

            rootD3.call(zoom);

            function zoomed() {
                var e = d3.event,
                    rootWidth = calculateWidth(root),
                    rootHeight = calculateHeight(root),
                    contentWidth = calculateWidth(content),
                    contentHeight = calculateHeight(content),
                    s = e.transform.k,
                    x = e.transform.x,
                    y = e.transform.y;

                var a = (s - 1) / 2;
                x = Math.min(0, Math.max(x, rootWidth - contentWidth * s)) + a * contentWidth;
                y = Math.min(0, Math.max(y, rootHeight - contentHeight * s)) + a * contentHeight;

                e.transform.x = x - a * contentWidth;
                e.transform.y = y - a * contentHeight;

                var transformFunctions = "translate(" + x + "px," + y + "px) scale(" + s + ")";

                contentD3
                    .style('-webkit-transform', transformFunctions)
                    .style('-moz-transform', transformFunctions)
                    .style('-ms-transform', transformFunctions)
                    .style('-o-transform', transformFunctions)
                    .style('transform', transformFunctions);
            }

            function calculateWidth(element) {
                return element[0].offsetWidth || element[0].clientWidth;
            }

            function calculateHeight(element) {
                return element[0].offsetHeight || element[0].clientHeight;
            }

            function maxZoom() {
                try {
                    var attributeValue = scope.maxZoom();
                    if (!attributeValue) throw "No attribute max-zoom limit has been specified.";
                    if (typeof attributeValue !== 'number') throw "Attribute max-zoom limit is not a number.";
                    if (!(attributeValue > 0 && attributeValue < 100000)) throw "Attribute max-zoom limit is out of range.";
                    return attributeValue;
                }
                catch (error) {
                    console.error(error);
                    return 1.0;
                }
            }

        },
    };
}]);


/*
	AHS502 : End of 'zoomable.js'
*/


/*
	AHS502 : Start of 'empty-check.js'
*/

/*global app*/

app.filter('emptyCheck', function() {
    return function(input, defaultValue) {
        if (input === undefined || input === null || input === '')
            return defaultValue || '\u2013';
        else
            return String(input);
    }
});

/*
	AHS502 : End of 'empty-check.js'
*/


/*
	AHS502 : Start of 'to-persian-date.js'
*/

/*global app*/
/*global persianDate*/

app.filter('toPersianDate', function() {
    return function(input, format) {
        return persianDate(new Date(input)).format(format || 'L');
    }
});

/*
	AHS502 : End of 'to-persian-date.js'
*/


/*
	AHS502 : Start of 'to-persian-number.js'
*/

/*global app*/
/*global toPersianNumber*/

app.filter('toPersianNumber', function() {
    return function(input) {
        return toPersianNumber(String(input));
    }
});

/*
	AHS502 : End of 'to-persian-number.js'
*/
