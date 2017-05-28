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

    iconJs.feed = feed;
    iconJs.file = file;

    global.iconJs = iconJs;

    var dataUrls = {
        //IMPORTANT: This file will be feeded asynchronously at runtime.

        'left arrow': "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMzEuNDk0IDMxLjQ5NCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzEuNDk0IDMxLjQ5NDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6IzFFMjAxRDsiIGQ9Ik0xMC4yNzMsNS4wMDljMC40NDQtMC40NDQsMS4xNDMtMC40NDQsMS41ODcsMGMwLjQyOSwwLjQyOSwwLjQyOSwxLjE0MywwLDEuNTcxbC04LjA0Nyw4LjA0N2gyNi41NTQNCgljMC42MTksMCwxLjEyNywwLjQ5MiwxLjEyNywxLjExMWMwLDAuNjE5LTAuNTA4LDEuMTI3LTEuMTI3LDEuMTI3SDMuODEzbDguMDQ3LDguMDMyYzAuNDI5LDAuNDQ0LDAuNDI5LDEuMTU5LDAsMS41ODcNCgljLTAuNDQ0LDAuNDQ0LTEuMTQzLDAuNDQ0LTEuNTg3LDBsLTkuOTUyLTkuOTUyYy0wLjQyOS0wLjQyOS0wLjQyOS0xLjE0MywwLTEuNTcxTDEwLjI3Myw1LjAwOXoiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K",
        'menu bars': "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPHN2ZyB3aWR0aD0iNjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjY0IiB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA2NCA2NCI+CiAgPGc+CiAgICA8ZyBmaWxsPSIjMUQxRDFCIj4KICAgICAgPHBhdGggZD0iTTIuMjUyLDEwLjI3MWg1OC44NzFjMS4xMjQsMCwyLjAzNC0wLjkxLDIuMDM0LTIuMDM0YzAtMS4xMjMtMC45MS0yLjAzNC0yLjAzNC0yLjAzNEgyLjI1MiAgICBjLTEuMTI0LDAtMi4wMzQsMC45MTEtMi4wMzQsMi4wMzRDMC4yMTgsOS4zNiwxLjEyOCwxMC4yNzEsMi4yNTIsMTAuMjcxeiIvPgogICAgICA8cGF0aCBkPSJtNjEuMTIzLDMwLjAxNWgtNTguODcxYy0xLjEyNCwwLTIuMDM0LDAuOTEyLTIuMDM0LDIuMDM1IDAsMS4xMjIgMC45MSwyLjAzNCAyLjAzNCwyLjAzNGg1OC44NzFjMS4xMjQsMCAyLjAzNC0wLjkxMiAyLjAzNC0yLjAzNC03LjEwNTQzZS0xNS0xLjEyMy0wLjkxLTIuMDM1LTIuMDM0LTIuMDM1eiIvPgogICAgICA8cGF0aCBkPSJtNjEuMTIzLDUzLjg3NmgtNTguODcxYy0xLjEyNCwwLTIuMDM0LDAuOTEtMi4wMzQsMi4wMzQgMCwxLjEyMyAwLjkxLDIuMDM0IDIuMDM0LDIuMDM0aDU4Ljg3MWMxLjEyNCwwIDIuMDM0LTAuOTExIDIuMDM0LTIuMDM0LTcuMTA1NDNlLTE1LTEuMTI0LTAuOTEtMi4wMzQtMi4wMzQtMi4wMzR6Ii8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K",

        //Format:    'key': "data_url",
    };

    var emptySvg = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgICB2aWV3Qm94PSIwIDAgNTAwIDUwMCIgd2lkdGg9IjUwMCIgaGVpZ2h0PSI1MDAiIGlkPSJzdGFydGVyX3N2ZyI+ICAgPC9zdmc+";

    function iconJs(dataUrlTitle) {
        return dataUrls[dataUrlTitle] || emptySvg;
    }

    function feed(newDataUrls) {
        newDataUrls = newDataUrls || {};
        Object.keys(newDataUrls).forEach(function(key) {
            dataUrls[key] = newDataUrls[key];
        });
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

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$compileProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider) {

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
                controller: 'CommonAboutController',
                data: {
                    dependencies: [
                        'container.rtl.min.css',
                    ]
                }
            })
            .state('home.contact', {
                url: '/contact',
                params: {
                    previousState: null
                },
                templateUrl: 'common/contact.html',
                controller: 'CommonContactController',
                data: {
                    dependencies: [
                        'container.rtl.min.css',
                    ]
                }
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
                },
                data: {
                    dependencies: [
                        'card.rtl.min.css',
                    ]
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
                controller: 'LabRegisterController',
                data: {
                    dependencies: [
                        'checkbox.min.js',
                        'checkbox.rtl.min.css',
                    ]
                }
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
                controller: 'CommonAboutController',
                data: {
                    dependencies: [
                        'container.rtl.min.css',
                    ]
                }
            })
            .state('lab.contact', {
                url: '/contact',
                params: {
                    previousState: null
                },
                templateUrl: 'common/contact.html',
                controller: 'CommonContactController',
                data: {
                    dependencies: [
                        'container.rtl.min.css',
                    ]
                }
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
                abstract: true,
                data: {
                    dependencies: [
                        'loader.rtl.min.css',
                    ]
                }
            })
            .state('panel.home', {
                url: '/home',
                templateUrl: 'panel/home.html',
                controller: 'PanelHomeController',
                data: {
                    dependencies: [
                        'card.rtl.min.css',
                    ]
                }
            })
            .state('panel.history', {
                url: '/history',
                templateUrl: 'panel/history.html',
                controller: 'PanelHistoryController',
                data: {
                    dependencies: [
                        'dropdown.min.js',
                        'dropdown.rtl.min.css',
                    ]
                }
            })
            .state('panel.post', {
                url: '/post',
                templateUrl: 'panel/post.html',
                controller: 'PanelPostController'
            })
            .state('panel.send', {
                url: '/send',
                templateUrl: 'panel/send.html',
                controller: 'PanelSendController',
                data: {
                    dependencies: [
                        'progress.min.js',
                        'progress.rtl.min.css',
                    ]
                }
            })
            .state('panel.balance', {
                url: '/balance',
                templateUrl: 'panel/balance.html',
                controller: 'PanelBalanceController',
                data: {
                    dependencies: [
                        'statistic.min.css',
                    ]
                }
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
/*global angular*/
/*global localStorage*/

app.run(['$rootScope', '$state', '$stateParams', '$window', 'UserService', 'DynamicResourceLoader',
    function($rootScope, $state, $stateParams, $window, userService, dynamicResourceLoader) {

        // No need to initial loader anymore
        angular.element('#ja-initial-loader-background').hide();
        angular.element('#ja-initial-loader').hide();
        angular.element('#ja-main-site-content').show();
        angular.element('#ja-sidebar-menu').show();

        dynamicResourceLoader('icon-js-feeder.js');

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

                var numberOfToBeLoadedResources =
                    dynamicResourceLoader(toState.data && toState.data.dependencies, true, function() {
                        numberOfToBeLoadedResources && $state.reload();
                    });

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
	AHS502 : Start of 'dynamic-resource-loader.js'
*/

/*global app*/
/*global angular*/
/*global resourceLoader*/

app.factory('DynamicResourceLoader', ['$timeout',
    function($timeout) {

        return dynamicResourceLoader;

        function dynamicResourceLoader(dynamicResources, explicitly, callback) {
            var urls = [].concat(dynamicResources || []).map(function(url) {
                    return '/dist/' + url;
                }),
                hasUrls = urls.length !== 0;

            if (explicitly && hasUrls) {
                angular.element('#ja-initial-loader-background').show();
                angular.element('#ja-initial-loader').show();
                angular.element('#ja-main-site-content').hide();
                angular.element('#ja-sidebar-menu').hide();
            }

            function wrappedCallback() {
                if ((explicitly && hasUrls) || typeof callback === 'function') $timeout(function() {
                    if (explicitly && hasUrls) {
                        angular.element('#ja-initial-loader-background').hide();
                        angular.element('#ja-initial-loader').hide();
                        angular.element('#ja-main-site-content').show();
                        angular.element('#ja-sidebar-menu').show();
                    }
                    (typeof callback === 'function') && callback();
                });
            }

            if (!hasUrls) return (wrappedCallback(), 0);
            return resourceLoader(urls, wrappedCallback);
        }

    }
]);


/*
	AHS502 : End of 'dynamic-resource-loader.js'
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

        // May reject by code : 1, 2, 5, 50, 80, 100, 101, 120, 130
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
	AHS502 : Start of 'balance-service.js'
*/

/*global app*/

app.service('BalanceService', ['$q', '$http', '$window', 'Utils',
    function($q, $http, $window, utils) {

        this.submitC2cReceiptCode = submitC2cReceiptCode;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 80, 100, 101
        function submitC2cReceiptCode(c2cReceiptCode, invalidModelHandler) {
            return utils.httpPromiseHandler($http.post('/balance/submit/c2cReceiptCode', {
                c2cReceiptCode: c2cReceiptCode
            }), function(data) {
                if (invalidModelHandler)
                    invalidModelHandler(data.errors || {});
            });
        }

    }
]);


/*
	AHS502 : End of 'balance-service.js'
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
	AHS502 : Start of 'master-service.js'
*/

/*global app*/

app.service('MasterService', ['$q', '$http', '$window', 'Utils',
    function($q, $http, $window, utils) {

        this.sendFeedback = sendFeedback;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 80
        function sendFeedback(email, message, invalidModelHandler) {
            return utils.httpPromiseHandler($http.post('/master/send/feedback', {
                email:email,
                message:message
            }), function(data) {
                if (invalidModelHandler)
                    invalidModelHandler(data.errors || {});
            });
        }

    }
]);

/*
	AHS502 : End of 'master-service.js'
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
/*global ValidationSystem*/

app.controller('CommonContactController', ['$scope', '$state', '$stateParams', 'MasterService',
    function($scope, $state, $stateParams, masterService) {

        $scope.sendFeedback = sendFeedback;

        $scope.sendingFeedback = false;

        $scope.previousState = $stateParams.previousState;

        $scope.setBackHandler(function() {
            $state.go($scope.previousState);
        });

        //$scope.email
        //$scope.message

        $scope.vs = new ValidationSystem($scope)
            .field('email', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.email()
            ])
            .field('message', [
                ValidationSystem.validators.notEmpty()
            ]);

        function sendFeedback() {
            if (!$scope.vs.validate()) return;

            $scope.sendingFeedback = true;
            masterService.sendFeedback($scope.email, $scope.message, $scope.vs.dictate)
                .then(function() {
                    $scope.sendingFeedback = false;
                    $scope.showMessage('ارسال موفقیت آمیز پیام',
                            'از همکاری شما صمیمانه متشکریم.\nپیام شما با موفقیت در سامانه ثبت گردید.\nاین پیام در اسرع وقت مورد بررسی قرار خواهد گرفت.')
                        .then(function() {
                            delete $scope.message;
                        });
                }, function(code) {
                    $scope.sendingFeedback = false;
                    alert(code);
                });
        }

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
/*global toPersianNumber*/
/*global ValidationSystem*/

app.controller('PanelBalanceController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', 'Config', 'BalanceService',
    function($scope, $rootScope, $state, $stateParams, $timeout, config, balanceService) {

        $scope.c2cPayment = c2cPayment;
        $scope.zpPayment = zpPayment;

        $scope.balance = $rootScope.data.labData.balance || 0;
        $scope.preparingPayment = false;

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('وضعیت حساب و تأمین اعتبار');

        //$scope.c2cReceiptCode
        //$scope.zpChargeAmount

        $scope.vs = new ValidationSystem($scope)
            .field('c2cReceiptCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(4),
                ValidationSystem.validators.integer()
            ])
            .field('zpChargeAmount', [
                //ValidationSystem.validators.notEmpty(),
                //ValidationSystem.validators.minLength(3)
            ]);

        $scope.testCount = Math.floor($scope.balance / config.post_price);

        $scope.balanceForDisplay = toPersianNumber($scope.balance);
        $scope.testCountForDisplay = $scope.testCount > 0 ?
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
            if (!$scope.vs.validate('c2cReceiptCode')) return;

            $scope.preparingPayment = true;
            balanceService.submitC2cReceiptCode($scope.c2cReceiptCode, $scope.vs.dictate)
                .then(function() {
                    $scope.preparingPayment = false;
                    $scope.showMessage('درخواست شما ثبت شد',
                            'درخواست شما در اسرع وقت مورد بررسی قرار خواهد گرفت و حساب شما شارژ خواهد شد')
                        .then(function() {
                            $state.go('panel.home');
                        });
                }, function(code) {
                    $scope.preparingPayment = false;
                    alert(code);
                });
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
/*global angular*/

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

        angular.element('#select-year').dropdown({
            onChange: function(value, text) {
                // $timeout(function() {
                $scope.selectedYear = historyState.selectedYear = value;
                loadPosts();
                // });
            }
        });

        angular.element('#select-month-from').dropdown({
            onChange: function(value, text) {
                // $timeout(function() {
                value = Number(value);
                $scope.selectedMonthFrom = historyState.selectedMonthFrom = value;
                $scope.selectedMonthFromText = $scope.persianMonths[value - 1];
                var selectedMonthTo = $scope.selectedMonthTo > $scope.selectedMonthFrom ? $scope.selectedMonthTo : $scope.selectedMonthFrom;
                if (selectedMonthTo != $scope.selectedMonthTo)
                    angular.element('#select-month-to').dropdown('set selected', $scope.selectedMonthTo = historyState.selectedMonthTo = selectedMonthTo);
                loadPosts();
                // });
            }
        });

        angular.element('#select-month-to').dropdown({
            onChange: function(value, text) {
                // $timeout(function() {
                value = Number(value);
                $scope.selectedMonthTo = historyState.selectedMonthTo = value;
                $scope.selectedMonthToText = $scope.persianMonths[value - 1];
                var selectedMonthFrom = $scope.selectedMonthFrom < $scope.selectedMonthTo ? $scope.selectedMonthFrom : $scope.selectedMonthTo;
                if (selectedMonthFrom != $scope.selectedMonthFrom)
                    angular.element('#select-month-from').dropdown('set selected', $scope.selectedMonthFrom = historyState.selectedMonthFrom = selectedMonthFrom);
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
/*global angular*/
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
                    return $scope.refreshUserData();
                })
                .then(function() {
                    $scope.sendingAnswer = false;
                    $scope.showMessage('ارسال موفقیت آمیز نتایج آزمایش',
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
                    angular.element('#progress-' + file.id).progress({
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
            angular.element('#progress-' + file.id).progress({
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
                            return $scope.refreshUserData();
                        })
                        .then(function() {
                            $state.go('panel.account.summary');
                        });
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
                    body: 'سلام!\n' + 'نتایج آزمایش ' + $scope.answer.patientNam + 'در لینک زیر:\n\n' + url
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

    }
]);


/*
	AHS502 : End of 'home-controller.js'
*/


/*
	AHS502 : Start of 'lab-controller.js'
*/

/*global app*/

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
/*global angular*/

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
            angular.element('#ja-sidebar-menu')
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
            angular.element('#ja-informer-modal')
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
/*global PDFJS*/

// States are: 'init', 'loading pdf', 'loaded pdf', 'loading pages',
//             'loaded pages', 'render start', 'render finish', 'error'
app.directive('pdf', ['$timeout', '$window', 'DynamicResourceLoader',
    function($timeout, $window, dynamicResourceLoader) {
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
                        dynamicResourceLoader('pdf.min.js', false, function() {
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
    }
]);


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
