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
/*global $*/

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
        this.gotoFirstErroredField = gotoFirstErroredField; // Scrolls the view to the first errored field

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
            if (!arguments.length) {
                gotoFirstErroredField();
            }
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

        function gotoFirstErroredField() {
            var erroredFieldNames = Object.keys(fields).filter(function(fieldName) {
                return !!fields[fieldName].error;
            });
            if (!erroredFieldNames.length) return;
            var fieldElement = document.getElementById(erroredFieldNames[0]);
            fieldElement && typeof fieldElement.scrollIntoView === 'function' && fieldElement.scrollIntoView();
            window.scrollTo(window.scrollX, Math.max(0, window.scrollY - 65));
        }

    }

    ////////////////////////////////////////////////////////////////////////////

    ValidationSystem.validators = {
        notEmpty: notEmptyValidator,
        notEmptyIf: notEmptyIfValidator,
        notRequired: notRequiredValidator,
        nationalCode: nationalCodeValidator,
        postalCode: postalCodeValidator,
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
            return valueIsEmpty(value) ? message : null;
        };
    }

    function notEmptyIfValidator(condition, message) {
        message = message || 'پُر کردن این فیلد الزامی است';
        return function(value) {
            while (typeof condition === 'function') condition = condition();
            if (!condition && valueIsEmpty(value)) return true;
            return valueIsEmpty(value) ? message : null;
        };
    }

    function notRequiredValidator() {
        return function(value) {
            return valueIsEmpty(value);
        };
    }

    function nationalCodeValidator(message) {
        message = message || 'کد ملی صحیح نمی باشد';
        return function(value) {
            return /^[0-9]{10}$/.test(value) ? null : message;
        };
    }

    function postalCodeValidator(message) {
        message = message || 'کد پُستی صحیح نمی باشد';
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
        message = message || 'نام کاربری فقط باید شامل حروف و ارقام لاتین، نقطه و خط زیر _ باشد';
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

    ////////////////////////////////////////////////////////////////////////////

    function valueIsEmpty(value) {
        return value === undefined || value === null || value === '';
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
	AHS502 : Start of 'environment-properties.js'
*/

(function(global) {

    global.getEnvironmentProperties = getEnvironmentProperties;

    function getEnvironmentProperties() {
        var document = window && window.document;
        var navigator = window && window.navigator;
        var appVersion = (navigator && navigator.appVersion || '').toLowerCase();
        var userAgent = (navigator && navigator.userAgent || '').toLowerCase();
        var vendor = (navigator && navigator.vendor || '').toLowerCase();

        function getVersion(regx, defaultVersion) {
            var match = userAgent.match(regx);
            return match == null ? false : (match[1] || defaultVersion || '');
        }

        var eprop = {};

        eprop.touch = !!document && ('ontouchstart' in window || ('DocumentTouch' in window && document instanceof window.DocumentTouch));

        eprop.firefox = getVersion(/(?:firefox|fxios)\/(\d+)/);
        eprop.ie = getVersion(/(?:msie |trident.+?; rv:)(\d+)/);
        eprop.edge = getVersion(/edge\/(\d+)/);
        eprop.opera = getVersion(/(?:^opera.+?version|opr)\/(\d+)/);
        eprop.safari = getVersion(/version\/(\d+).+?safari/);
        eprop.plantom = getVersion(/phantomjs\/(\d+)/);
        eprop.chrome = !eprop.opera && /google inc/.test(vendor) && getVersion(/(?:chrome|crios)\/(\d+)/);

        eprop.iPad = getVersion(/ipad.+?os (\d+)/);
        eprop.iPhone = !eprop.iPad && getVersion(/iphone(?:.+?os (\d+))?/, 1);
        eprop.iPod = getVersion(/ipod.+?os (\d+)/);
        eprop.iOS = !!(eprop.iPad || eprop.iPhone || eprop.iPod);

        eprop.android = /android/.test(userAgent);
        eprop.androidPhone = eprop.android && /mobile/.test(userAgent);
        eprop.androidTablet = eprop.android && !/mobile/.test(userAgent);

        eprop.windows = /win/.test(appVersion);
        eprop.windowsPhone = eprop.windows && /phone/.test(userAgent);
        eprop.windowsTablet = eprop.windows && !eprop.windowsPhone && /touch/.test(userAgent);

        eprop.mac = /mac/.test(appVersion);
        eprop.linux = /linux/.test(appVersion);
        eprop.blackberry = /blackberry/.test(userAgent) || /bb10/.test(userAgent);

        eprop.mobile = !!(eprop.iPhone || eprop.iPod || eprop.androidPhone || eprop.windowsPhone || eprop.blackberry);
        eprop.tablet = !!(eprop.iPad || eprop.androidTablet || eprop.windowsTablet);
        eprop.desktop = !eprop.mobile && !eprop.tablet;

        eprop.standalone = "standalone" in window.navigator ? window.navigator.standalone : window.matchMedia('(display-mode)').matches ? window.matchMedia('(display-mode: standalone)').matches : false;

        return eprop;
    }

})(global);


/*
	AHS502 : End of 'environment-properties.js'
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
        else if (s.slice(0, 2) === '98') s = '0' + s.slice(2);
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
            while (from <= to) array.push((from += step) - step);
        else
            while (from >= to) array.push((from -= step) + step);
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
    global.toLatinNumber = toLatinNumber;

    var persianDigitConvertions = {
        0: '۰', // \u06F0 Farsi
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

    var latinDigitConvertions = {
        '۰': '0', // \u06F0 Farsi
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9',
        '٠': '0', // \u0660 Arabic (iPhone)
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9'
    };

    function toPersianNumber(text) {
        text = String(text || '');
        var chars = text.split('');
        return chars.map(function(char) {
            return persianDigitConvertions[char] || char;
        }).join('');
    }

    function toLatinNumber(text) {
        text = String(text || '');
        var chars = text.split('');
        return chars.map(function(char) {
            return latinDigitConvertions[char] || char;
        }).join('');
    }

})(global);


/*
	AHS502 : End of 'persian-number.js'
*/


/*
	AHS502 : Start of 'service-status-codes.js'
*/

/*global toastr*/

(function(global) {

    global.sscAlert = sscAlert;

    /*
        0   : Success
        1   : Unknown error in server
        2   : Unknown error in client
        
        5   : Internal server error
        
        10  : Already existing user
        11  : reCAPTCHA verification error

        30  : Action is not waiting for confirmation
        31  : Confirmation code has expired
        32  : Wrong validation code
        
        40  : Wrong username or password
        
        50  : User has not logged in correctly
        51  : User not found
        52  : Invalid user type
        
        60  : User data does not match
        
        70  : Patient has not accessed history correctly
        71  : Patient has no history post
        72  : Post does not belong to patient
        73  : Post not found
        74  : User (laboratory) not found
        75  : Patient has reached daily try count limit
        76  : Patient not found
        77  : Patient not accepted
        
        80  : Invalid form data
        
        100 : Invalid access key
        101 : Expired access key
        
        120 : Exceeded SMS count number
        
        130 : User out of charge
        131 : Zarrinpal is not active
        132 : Zarrinpal gate openning error
        
        140 : Patient has already been registered
    */

    var serviceStatusCodes = {

        0: 'عملیات موفقیت آمیز',
        1: 'خطای ناشناخته سمت سِروِر',
        2: 'خطای ناشناخته سمت کاربر',

        5: 'خطای داخلی سمت سِروِر',

        10: 'کاربر با این نام در حال حاضر موجود است',
        11: 'عدم تأیید ریکَپچا',

        30: 'عملیات منتظر تأیید شدن وجود ندارد',
        31: 'زمان انقضای درخواست به اتمام رسیده است',
        32: 'کُد اعتبار سنجی اشتباه است',

        40: 'نام کاربری یا کلمه عبور اشتباه است',

        50: 'کاربر به درستی وارد سامانه نشده است',
        51: 'کاربر یافت نشد',
        52: 'نوع کاربر نامتناسب است',

        60: 'اطلاعات حساب کاربری انطباق ندارد',

        70: 'بیمار به درستی به سوابق خود دسترسی پیدا نکرده است',
        71: 'سوابقی برای بیمار ثبت نشده است',
        72: 'این پُست مربوط به این بیمار نیست',
        73: 'پُست ارسال شده یافت نشد',
        74: 'کاربر آزمایشگاه یافت نشد',
        75: 'بیمار به حداکثر تعداد خطاهای روزانه رسیده است',
        76: 'اطلاعات بیمار در سامانه ثبت نشده است',
        77: 'بیمار در این آزمایشگاه پذیرش نشده است',

        80: 'اطلاعات فرم اشتباه است',

        100: 'کلید دسترسی کاربر نامعتبر است',
        101: 'کلید دسترسی کاربر منقضی شده است',

        120: 'از تعداد پیامک های مجاز رَد شده است، مدتی صبر کنید',

        130: 'شارژ حساب کاربر به اتمام رسیده است',
        131: 'درگاه پرداخت زرین پال فعال نیست',
        132: 'خطا در باز کردن درگاه پرداخت زرین پال',

        140: 'اطلاعات این بیمار قبلاً در سامانه ثبت شده است. اگر نیاز به اصلاح این اطلاعات در سامانه است، پذیرش آزمایشگاه می تواند به شما کمک کند',

    };

    var options = {
        rtl: true,
        closeButton: true,
        timeOut: 10000,
        extendedTimeOut: 3000,
    };

    function sscAlert(code) {
        var message = serviceStatusCodes[code] || 'خطای ناشناخته';
        toastr.error(message, 'خطا در عملیات', options);
    }

})(global);


/*
	AHS502 : End of 'service-status-codes.js'
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

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$compileProvider', 'Config',
    function($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider, config) {

        $stateProvider
            .state('start', {
                url: '/start?init',
                params: {
                    init: null,
                },
                template: '',
                controller: 'StartController'
            });

        if (config.developer_modal) {
            $stateProvider
                .state('developer', {
                    url: '/d',
                    templateUrl: 'developer.html',
                    controller: 'DeveloperController'
                });
        }

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
            .state('home.patient', {
                url: '/patient',
                templateUrl: 'home/patient.html',
                controller: 'HomePatientController',
                data: {
                    dependencies: [
                        'iriran-provinces-and-cities.js',
                        'dropdown.min.js',
                        'dropdown.rtl.min.css',
                    ]
                }
            })
            .state('home.hint', {
                url: '/hint',
                templateUrl: 'home/hint.html',
                controller: 'HomeHintController'
            })
            .state('home.about', {
                url: '/about',
                templateUrl: 'common/about.html',
                controller: 'CommonAboutController',
                data: {
                    dependencies: [
                        'container.rtl.min.css',
                        'card.rtl.min.css',
                        'image.rtl.min.css',
                    ]
                }
            })
            .state('home.contact', {
                url: '/contact',
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
                },
                data: {
                    dependencies: [
                        'fuse.min.js',
                    ]
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
            })
            .state('answer.about', {
                url: '/about',
                templateUrl: 'answer/about.html',
                controller: 'CommonAboutController',
                data: {
                    dependencies: [
                        'container.rtl.min.css',
                        'card.rtl.min.css',
                        'image.rtl.min.css',
                    ]
                }
            })
            .state('answer.contact', {
                url: '/contact',
                templateUrl: 'answer/contact.html',
                controller: 'CommonContactController',
                data: {
                    dependencies: [
                        'container.rtl.min.css',
                    ]
                }
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
                templateUrl: 'common/about.html',
                controller: 'CommonAboutController',
                data: {
                    dependencies: [
                        'container.rtl.min.css',
                        'card.rtl.min.css',
                        'image.rtl.min.css',
                    ]
                }
            })
            .state('lab.contact', {
                url: '/contact',
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
            .state('panel.acceptance', {
                url: '/acceptance',
                templateUrl: 'panel/acceptance.html',
                controller: 'PanelAcceptanceController',
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
            .state('panel.patient', {
                url: '/patient',
                templateUrl: 'panel/patient.html',
                controller: 'PanelPatientController',
                data: {
                    dependencies: [
                        'iriran-provinces-and-cities.js',
                        'dropdown.min.js',
                        'dropdown.rtl.min.css',
                        'statistic.min.css',
                    ]
                }
            })
            .state('panel.send', {
                url: '/send',
                params: {
                    nationalCode: null,
                    previousState: null
                },
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
            })
            .state('panel.about', {
                url: '/about',
                templateUrl: 'panel/about.html',
                controller: 'CommonAboutController',
                data: {
                    dependencies: [
                        'container.rtl.min.css',
                        'card.rtl.min.css',
                        'image.rtl.min.css',
                    ]
                }
            })
            .state('panel.contact', {
                url: '/contact',
                templateUrl: 'panel/contact.html',
                controller: 'CommonContactController',
                data: {
                    dependencies: [
                        'container.rtl.min.css',
                    ]
                }
            });

        $stateProvider
            .state('admin', {
                url: '/admin',
                views: {
                    '': {
                        templateUrl: 'admin.html',
                        controller: 'AdminController',
                    },
                    menu: {
                        templateUrl: 'admin/menu.html'
                    },
                    header: {
                        templateUrl: 'admin/header.html'
                    },
                },
                abstract: true,
                data: {
                    dependencies: [
                        'loader.rtl.min.css',
                        'dropdown.min.js',
                        'dropdown.rtl.min.css',
                    ]
                }
            })
            .state('admin.home', {
                url: '/home',
                templateUrl: 'admin/home.html',
                controller: 'AdminHomeController',
                data: {
                    dependencies: [
                        'dygraph.min.js',
                        'dygraph.min.css'
                    ]
                }
            })
            .state('admin.laboratory', {
                url: '/laboratory',
                templateUrl: 'admin/laboratory.html',
                controller: 'AdminLaboratoryController'
            })
            .state('admin.patient', {
                url: '/patient',
                templateUrl: 'admin/patient.html',
                controller: 'AdminPatientController'
            })
            .state('admin.sms', {
                url: '/sms',
                templateUrl: 'admin/sms.html',
                controller: 'AdminSmsController',
                data: {
                    dependencies: [
                        'statistic.min.css',
                    ]
                }
            });

        $urlRouterProvider.otherwise('/start');

        $locationProvider.hashPrefix('');
        // $locationProvider.html5Mode(true);

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|sms|tg|tel):/);

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

app.run(['$rootScope', '$state', '$stateParams', '$window', '$location', '$timeout', 'Config', 'UserService', 'DynamicResourceLoader',
    function($rootScope, $state, $stateParams, $window, $location, $timeout, config, userService, dynamicResourceLoader) {

        // No need to initial loader anymore
        angular.element('#ja-initial-loader-background').hide();
        angular.element('#ja-initial-loader').hide();
        angular.element('#ja-main-site-content').show();
        angular.element('#ja-sidebar-menu').show();

        dynamicResourceLoader('icon-js-feeder.js', function() {
            $timeout();
        });

        if ($window.location.hash.indexOf('#/answer') !== 0 &&
            $window.location.hash.indexOf('#/start') !== 0) {
            $state.go('start');
        }

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.data = {};

        var titleElement = angular.element("head title");
        titleElement.html((config.env === 'live' ? '' : config.env + ' - ') + titleElement.html());

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options) {
                //NOTE: Use  event.preventDefault()  if it's needed.

                var dependencies = toState.name.split('.').map(function(namePart, index, nameParts) {
                    var state = $state.get(nameParts.slice(0, index + 1).join('.'));
                    return state.data && state.data.dependencies;
                }).filter(function(dependencies) {
                    return !!dependencies;
                }).reduce(function(allDependencies, dependencies) {
                    return allDependencies.concat(dependencies);
                }, []);

                var numberOfToBeLoadedResources =
                    dynamicResourceLoader(dependencies, true, function() {
                        numberOfToBeLoadedResources && $state.go(toState, toParams);
                    });

                if (numberOfToBeLoadedResources) {
                    event.preventDefault();
                    return;
                }

                if (toState.name.indexOf('panel.') === 0) {
                    if (!userService.current()) {
                        event.preventDefault();
                        $state.go('lab.login');
                    }
                }
                else {
                    // delete $rootScope.data.postCache;
                    // delete $rootScope.data.historyState;

                    if (toState.name.indexOf('admin.') === 0) {
                        if (!userService.current()) {
                            event.preventDefault();
                            $state.go('lab.login');
                        }
                    }
                    else {
                        if (userService.current()) {
                            // userService.logout(true);
                        }
                    }
                }

            });

        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {

                $window.scrollTo(0, 0);

                if (typeof $rootScope.hideMenu === 'function') {
                    $rootScope.hideMenu();
                }

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
                        return rejectionDataProcessor(response.data);
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
	AHS502 : Start of 'admin-service.js'
*/

/*global app*/

app.service('AdminService', ['$q', '$http', '$window', 'Utils',
    function($q, $http, $window, utils) {

        // All services may reject by code : 1, 2, 5, 50, 52, 100, 101

        this.getNotSentSmses = getNotSentSmses;
        this.tryAgainNotSentSms = tryAgainNotSentSms;
        this.checkNotSentSms = checkNotSentSms;

        this.getNotActivatedLabs = getNotActivatedLabs;
        this.approveInactiveLab = approveInactiveLab;
        this.declineInactiveLab = declineInactiveLab;

        this.getAllNewC2cPaymentReceipts = getAllNewC2cPaymentReceipts;
        this.chargeLabFromC2c = chargeLabFromC2c;
        this.declineC2cReceipt = declineC2cReceipt;

        this.getNewFeedbacks = getNewFeedbacks;
        this.checkFeedback = checkFeedback;
        this.respondFeedback = respondFeedback;

        this.getStatistics = getStatistics;

        this.getAllLaboratories = getAllLaboratories;
        this.editLaboratory = editLaboratory;
        this.removeLaboratory = removeLaboratory;

        this.findPatientByNationalCode = findPatientByNationalCode;

        this.sendDummySms = sendDummySms;
        this.broadcastMessage = broadcastMessage;
        this.findAllPhoneNumbers = findAllPhoneNumbers;
        this.getNikSmsCredit = getNikSmsCredit;

        /////////////////////////////////////////////////////

        function getNotSentSmses() {
            return utils.httpPromiseHandler($http.post('/admin/getNotSentSmses', {}))
                .then(function(body) {
                    return (body.smsStateStatusList || []).map(function(smsStateStatus) {
                        smsStateStatus.data.timeStamp = new Date(smsStateStatus.data.timeStamp);
                        return smsStateStatus;
                    });
                });
        }

        function tryAgainNotSentSms(smsKey) {
            return utils.httpPromiseHandler($http.post('/admin/tryAgainNotSentSms', {
                smsKey: smsKey
            }));
        }

        function checkNotSentSms(smsKey) {
            return utils.httpPromiseHandler($http.post('/admin/checkNotSentSms', {
                smsKey: smsKey
            }));
        }

        function getNotActivatedLabs() {
            return utils.httpPromiseHandler($http.post('/admin/getNotActivatedLabs', {}))
                .then(function(body) {
                    return (body.inactiveLabs || []).map(function(inactiveLab) {
                        inactiveLab.timeStamp = new Date(inactiveLab.timeStamp);
                        return inactiveLab;
                    });
                });
        }

        function approveInactiveLab(labData) {
            labData.timeStamp = labData.timeStamp.getTime();
            return utils.httpPromiseHandler($http.post('/admin/approveInactiveLab', {
                labData: labData
            }));
        }

        function declineInactiveLab(labUsername) {
            return utils.httpPromiseHandler($http.post('/admin/declineInactiveLab', {
                labUsername: labUsername
            }));
        }

        function getAllNewC2cPaymentReceipts() {
            return utils.httpPromiseHandler($http.post('/admin/getAllNewC2cPaymentReceipts', {}))
                .then(function(body) {
                    return (body.c2cReceiptCodes || []).map(function(c2cReceiptCode) {
                        c2cReceiptCode.timeStamp = new Date(c2cReceiptCode.timeStamp);
                        return c2cReceiptCode;
                    });
                });
        }

        function chargeLabFromC2c(c2cReceiptId, labUsername, amount) {
            return utils.httpPromiseHandler($http.post('/admin/chargeLabFromC2c', {
                c2cReceiptId: c2cReceiptId,
                labUsername: labUsername,
                amount: amount
            }));
        }

        function declineC2cReceipt(c2cReceiptId) {
            return utils.httpPromiseHandler($http.post('/admin/declineC2cReceipt', {
                c2cReceiptId: c2cReceiptId
            }));
        }

        function getNewFeedbacks() {
            return utils.httpPromiseHandler($http.post('/admin/getNewFeedbacks', {}))
                .then(function(body) {
                    return (body.feedbacks || []).map(function(lab) {
                        lab.timeStamp = new Date(lab.timeStamp);
                        return lab;
                    });
                });
        }

        function checkFeedback(feedbackId) {
            return utils.httpPromiseHandler($http.post('/admin/checkFeedback', {
                feedbackId: feedbackId
            }));
        }

        function respondFeedback(feedbackId, message) {
            return utils.httpPromiseHandler($http.post('/admin/respondFeedback', {
                feedbackId: feedbackId,
                message: message
            }));
        }

        function getStatistics() {
            return utils.httpPromiseHandler($http.post('/admin/getStatistics', {}))
                .then(function(body) {
                    return body.stat || {};
                });
        }

        function getAllLaboratories() {
            return utils.httpPromiseHandler($http.post('/admin/getAllLaboratories', {}))
                .then(function(body) {
                    return (body.laboratories || []).map(function(lab) {
                        lab.timeStamp = new Date(lab.timeStamp);
                        return lab;
                    });
                });
        }

        function editLaboratory(labUsername, labData) {
            return utils.httpPromiseHandler($http.post('/admin/editLaboratory', {
                labUsername: labUsername,
                labData: labData
            }));
        }

        function removeLaboratory(labUsername) {
            return utils.httpPromiseHandler($http.post('/admin/removeLaboratory', {
                labUsername: labUsername
            }));
        }

        function findPatientByNationalCode(nationalCode) {
            return utils.httpPromiseHandler($http.post('/admin/findPatientByNationalCode', {
                    nationalCode: nationalCode
                }))
                .then(function(body) {
                    return body.patient;
                });
        }

        function sendDummySms(phoneNumber, message) {
            return utils.httpPromiseHandler($http.post('/admin/sendDummySms', {
                phoneNumber: String(phoneNumber),
                message: message
            }));
        }

        function broadcastMessage(message) {
            return utils.httpPromiseHandler($http.post('/admin/broadcastMessage', {
                message: message
            }));
        }

        function findAllPhoneNumbers() {
            return utils.httpPromiseHandler($http.post('/admin/findAllPhoneNumbers'));
        }

        function getNikSmsCredit() {
            return utils.httpPromiseHandler($http.post('/admin/getNikSmsCredit'))
                .then(function(body) {
                    return body.credit || 0;
                });
        }

    }
]);


/*
	AHS502 : End of 'admin-service.js'
*/


/*
	AHS502 : Start of 'answer-service.js'
*/

/*global app*/
/*global angular*/

app.service('AnswerService', ['$q', '$http', '$window', 'Utils',
    function($q, $http, $window, utils) {

        this.registerPatientDraft = registerPatientDraft;
        this.verifyPatientDraft = verifyPatientDraft;
        this.patientInfo = patientInfo;
        this.acceptPatient = acceptPatient;
        this.getAcceptances = getAcceptances;
        this.send = send;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 80, 120, 140
        function registerPatientDraft(person, invalidPersonHandler) {
            return utils.httpPromiseHandler($http.post('/answer/patient/draft/register', {
                person: {
                    nationalCode: person.nationalCode,
                    fullName: person.fullName,
                    gender: person.gender,
                    birthday: person.birthday,
                    mobilePhoneNumber: person.mobilePhoneNumber,
                    phoneNumber: person.phoneNumber,
                    extraPhoneNumber: person.extraPhoneNumber,
                    email: person.email,
                    province: person.province,
                    city: person.city,
                    address: person.address,
                    postalCode: person.postalCode
                }
            }), function(data) {
                if (angular.isFunction(invalidPersonHandler) && data.code === 80) {
                    invalidPersonHandler(data.errors || {});
                }
                else return $q.reject(data.code);
            });
        }

        // May reject by code : 1, 2, 5, 30, 31, 32
        function verifyPatientDraft(nationalCode, validationCode) {
            return utils.httpPromiseHandler($http.post('/answer/patient/draft/verify', {
                nationalCode: nationalCode,
                validationCode: validationCode
            }));
        }

        // May reject by code : 1, 2, 5, 50, 52, 71, 100, 101
        // Resolves to patient personal and acceptance (if exists) information
        function patientInfo(nationalCode) {
            return utils.httpPromiseHandler($http.post('/answer/patient/info', {
                    nationalCode: nationalCode
                }))
                .then(function(body) {
                    var data = {
                        patient: {
                            nationalCode: body.patient.nationalCode,
                            fullName: body.patient.fullName,
                            gender: body.patient.gender,
                            birthday: body.patient.birthday,
                            numbers: body.patient.numbers || [],
                            email: body.patient.email,
                            province: body.patient.province,
                            city: body.patient.city,
                            address: body.patient.address,
                            postalCode: body.patient.postalCode
                        }
                    };
                    data.acceptance = body.acceptance ? {
                        request: body.acceptance.request,
                        payment: body.acceptance.payment,
                        timeStamp: new Date(body.acceptance.timeStamp)
                    } : null;
                    return data;
                });
        }

        // May reject by code : 1, 2, 5, 50, 52, 80, 100, 101, 120
        function acceptPatient(person, request, payment, invalidPersonHandler) {
            return utils.httpPromiseHandler($http.post('/answer/patient/accept', {
                person: {
                    nationalCode: person.nationalCode,
                    fullName: person.fullName,
                    gender: person.gender,
                    birthday: person.birthday,
                    mobilePhoneNumber: person.mobilePhoneNumber,
                    phoneNumber: person.phoneNumber,
                    extraPhoneNumber: person.extraPhoneNumber,
                    email: person.email,
                    province: person.province,
                    city: person.city,
                    address: person.address,
                    postalCode: person.postalCode
                },
                request: {
                    electronicVersion: request.electronicVersion,
                    paperVersion: request.paperVersion
                },
                payment: payment
            }), function(data) {
                if (angular.isFunction(invalidPersonHandler) && data.code === 80) {
                    invalidPersonHandler(data.errors || {});
                }
                else return $q.reject(data.code);
            });
        }

        // May reject by code : 1, 2, 5, 50, 52, 100, 101
        // Resolves to all the user's current acceptances
        function getAcceptances() {
            return utils.httpPromiseHandler($http.post('/answer/get/acceptances', {}))
                .then(function(body) {
                    return (body.acceptances || []).map(function(acceptance) {
                        return {
                            username: acceptance.username,
                            nationalCode: acceptance.nationalCode,
                            request: acceptance.request,
                            payment: acceptance.payment,
                            timeStamp: new Date(acceptance.timeStamp)
                        };
                    });
                });
        }

        // May reject by code : 1, 2, 5, 50, 51, 52, 76, 77, 80, 100, 101, 120, 130
        function send(nationalCode, files, notes, invalidPersonHandler) {
            return utils.httpPromiseHandler($http.post('/answer/send', {
                nationalCode: nationalCode,
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
                if (angular.isFunction(invalidPersonHandler) && data.code === 80) {
                    invalidPersonHandler(data.errors || {});
                }
                else return $q.reject(data.code);
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
/*global angular*/

app.service('BalanceService', ['$q', '$http', '$window', 'Utils',
    function($q, $http, $window, utils) {

        this.submitC2cReceiptCode = submitC2cReceiptCode;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 50, 52, 80, 100, 101
        function submitC2cReceiptCode(c2cReceiptCode, invalidModelHandler) {
            return utils.httpPromiseHandler($http.post('/balance/submit/c2cReceiptCode', {
                c2cReceiptCode: c2cReceiptCode
            }), function(data) {
                if (angular.isFunction(invalidModelHandler) && data.code === 80) {
                    invalidModelHandler(data.errors || {});
                }
                else return $q.reject(data.code);
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

        // May reject by code : 1, 2, 5, 71, 72, 73, 74, 75
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
/*global angular*/

app.service('MasterService', ['$q', '$http', '$window', 'Utils',
    function($q, $http, $window, utils) {

        this.sendFeedback = sendFeedback;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 80
        function sendFeedback(mobilePhoneNumber, message, invalidModelHandler) {
            return utils.httpPromiseHandler($http.post('/master/send/feedback', {
                mobilePhoneNumber: mobilePhoneNumber,
                message: message
            }), function(data) {
                if (angular.isFunction(invalidModelHandler) && data.code === 80) {
                    invalidModelHandler(data.errors || {});
                }
                else return $q.reject(data.code);
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
        this.deleteOnePost = deleteOnePost;
        this.updateOnePost = updateOnePost;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 50, 52, 100, 101
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

        // May reject by code : 1, 2, 5, 50, 52, 71, 72, 73, 100, 101
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

        // May reject by code : 1, 2, 5, 50, 52, 71, 72, 100, 101
        function deleteOnePost(nationalCode, postCode) {
            return utils.httpPromiseHandler($http.post('/post/delete/one', {
                nationalCode: nationalCode,
                postCode: postCode
            }));
        }

        // May reject by code : 1, 2, 5, 50, 52, 71, 72, 73 100, 101, 120
        function updateOnePost(nationalCode, postCode, postData) {
            return utils.httpPromiseHandler($http.post('/post/update/one', {
                nationalCode: nationalCode,
                postCode: postCode,
                postData: postData
            }));
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
/*global angular*/

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

        this.getUserSession = getUserSession;
        this.setUserSession = setUserSession;
        this.getUserPersistent = getUserPersistent;

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
                if (angular.isFunction(invalidModelHandler) && data.code === 80) {
                    invalidModelHandler(data.errors || {});
                }
                else return $q.reject(data.code);
            });
        }

        // May reject by code : 1, 2, 5, 30, 31, 32
        function registerConfirm(username, validationCode) {
            return utils.httpPromiseHandler($http.post('/user/register/confirm', {
                username: username,
                validationCode: validationCode
            }));
        }

        // May reject by code : 1, 2, 3, 5, 50, 51, 52, 80, 100, 101, 120
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
                if (angular.isFunction(invalidNewAccountHandler) && data.code === 80) {
                    invalidNewAccountHandler(data.errors || {});
                }
                else return $q.reject(data.code);
            });
        }

        // May reject by code : 1, 2, 5, 50, 51, 52, 80, 100, 101, 120
        function editPassword(oldPassword, newPassword, invalidNewPasswordHandler) {
            return utils.httpPromiseHandler($http.post('/user/edit/password', {
                oldPassword: oldPassword,
                newPassword: newPassword
            }), function(data) {
                if (angular.isFunction(invalidNewPasswordHandler) && data.code === 80) {
                    invalidNewPasswordHandler(data.errors || {});
                }
                else return $q.reject(data.code);
            });
        }

        // May reject by code : 1, 2, 5, 30, 31, 32, 50, 52, 100, 101
        // Resolves to current user new info
        function editConfirm(username, validationCode) {
            return utils.httpPromiseHandler($http.post('/user/edit/confirm', {
                    username: username,
                    validationCode: validationCode
                }))
                .then(function(body) {
                    var userInfo = body.userInfo;
                    setCurrent(undefined, userInfo);
                    return processUserInfo(userInfo);
                });
        }

        // May reject by code : 1, 2, 5, 40
        // Resolves to current user info
        function login(username, password, rememberMe) {
            return utils.httpPromiseHandler($http.post('/user/login', {
                    username: username,
                    password: password,
                    rememberMe: rememberMe
                }))
                .then(function(body) {
                    var accessKey = body.accessKey,
                        userInfo = body.userInfo;
                    setCurrent(accessKey, userInfo);
                    if (rememberMe) {
                        $window.localStorage['CurrentUser'] = $window.sessionStorage['CurrentUser'];
                    }
                    else {
                        $window.localStorage.removeItem('CurrentUser');
                    }
                    return processUserInfo(userInfo);
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
                    var userInfo = body.userInfo;
                    setCurrent(undefined, userInfo);
                    return processUserInfo(userInfo);
                });
        }

        // Sync & Async; No rejection
        function logout(sessionStorageOnly) {
            delete $http.defaults.headers.common['X-Access-Token'];
            delete $window.sessionStorage['CurrentUser'];
            sessionStorageOnly || delete $window.localStorage['CurrentUser'];
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
                return userInfo || null;
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

        // Gets the current authorization status
        function getUserSession() {
            try {
                var currentUserEncoded = $window.sessionStorage['CurrentUser'];
                if (!currentUserEncoded) return null;
                var currentUser = JSON.parse(currentUserEncoded);
                return currentUser || null;
            }
            catch (err) {
                return null;
            }
        }

        // Sets the current authorization status
        function setUserSession(userSession) {
            userSession && setCurrent(userSession.accessKey, userSession.userInfo);
        }

        // Gets the persistent authorization status
        function getUserPersistent() {
            try {
                var currentUserEncoded = $window.localStorage['CurrentUser'];
                if (!currentUserEncoded) return null;
                var currentUser = JSON.parse(currentUserEncoded);
                return currentUser || null;
            }
            catch (err) {
                return null;
            }
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
            if (accessKey !== undefined) {
                data.accessKey = accessKey;
                $http.defaults.headers.common['X-Access-Token'] = accessKey;
            }
            if (userInfo !== undefined) {
                data.userInfo = userInfo;
            }
            $window.sessionStorage['CurrentUser'] = JSON.stringify(data);
        }

        function processUserInfo(userInfo) {
            if (userInfo) {
                userInfo.subscriptionDate = new Date(userInfo.timeStamp);
                // delete userInfo.timeStamp; // DO NOT ACTIVATE THIS LINE EVER AGAIN!

                if (userInfo.chargeDeadlineTimeStamp) {
                    userInfo.chargeDeadline = new Date(userInfo.chargeDeadlineTimeStamp);
                }
                if (userInfo.freeIntervalTimeStamp) {
                    userInfo.freeInterval = new Date(userInfo.freeIntervalTimeStamp);
                }
            }
            return userInfo;
        }

    }
]);


/*
	AHS502 : End of 'user-service.js'
*/


/*
	AHS502 : Start of 'admin/home-controller.js'
*/

/*global app*/
/*global $*/

app.controller('AdminHomeController', ['$scope', '$rootScope', '$state', '$stateParams',
    '$timeout', 'UserService', 'AdminService',
    function($scope, $rootScope, $state, $stateParams,
        $timeout, userService, adminService) {

        var userInfo = userService.current();

        $scope.setPageTitle((userInfo && userInfo.fullName) || ' ');

        $scope.setBackHandler($scope.menuHandlers.logout);

        $scope.submenus = [
            'صفحه اصلی',
            'پیامک های ارسال نشده',
            'درخواست های عضویت جدید',
            'رسیدهای ثبت شده پرداخت کارت به کارت',
            'بازخوردهای صفحه تماس با ما',
            'آمار و نمودارهای وبسایت',
        ];
        $scope.selectedSubmenu = 0;
        $scope.selectedSubmenuText = $scope.submenus[0];
        $('#ja-admin-home-submenu-selector')
            .dropdown({
                onChange: function(value, text) {
                    $timeout(function() {
                        $scope.selectedSubmenu = value;
                        $scope.selectedSubmenuText = text;
                    });
                }
            })
            .dropdown('set selected', 0);

    }
]);


/*
	AHS502 : End of 'admin/home-controller.js'
*/


/*
	AHS502 : Start of 'admin/laboratory-controller.js'
*/

/*global app*/
/*global angular*/
/*global $*/
/*global sscAlert*/

app.controller('AdminLaboratoryController', ['$scope', '$rootScope', '$state',
    '$stateParams', 'UserService', 'AdminService',
    function($scope, $rootScope, $state,
        $stateParams, userService, adminService) {

        $scope.setPageTitle('آزمایشگاه ها');

        $scope.setBackHandler($scope.menuHandlers.goToMainPage);

        $scope.selectLab = selectLab;
        $scope.chargeLab = chargeLab;
        $scope.freeIntervalLab = freeIntervalLab;
        $scope.removeLab = removeLab;

        $scope.laboratories = [];
        $scope.selectedLab = null;

        $scope.setLoading(true);
        adminService.getAllLaboratories().then(function(laboratories) {
            $scope.laboratories = laboratories;
            $scope.setLoading(false);
        }, function(code) {
            sscAlert(code);
            $scope.setLoading(false);
        });

        var modalElement;

        function selectLab(lab) {
            $scope.selectedLab = lab;
            $scope.selectedLabIndex = $scope.laboratories.indexOf(lab);
            $scope.editingLab = angular.copy(lab);
            $scope.updating = false;
            modalElement = $('#ja-admin-laboratory-edit-modal')
                .modal({
                    closable: false,
                    onApprove: function() {
                        $scope.updating = true;
                        adminService.editLaboratory(lab.username, $scope.editingLab).then(function() {
                            $scope.laboratories[$scope.selectedLabIndex] = $scope.editingLab;
                            $scope.selectedLab = $scope.editingLab;
                            modalElement.modal('hide');
                        }, function(code) {
                            $scope.updating = false;
                            sscAlert(code);
                        });
                        return false;
                    },
                    onDeny: function() {
                        // nothing to do !
                    }
                })
                .modal('show');
        }

        function chargeLab() {
            var amount = Number($scope.charge || '0');
            if (!amount) return;
            $scope.editingLab.balance = Number($scope.editingLab.balance) + amount;
            $scope.charge = '';
        }

        function freeIntervalLab() {
            var freeIntervalMonths = Number($scope.freeIntervalMonths || '0') || 0;
            if (freeIntervalMonths) {
                var freeInterval = new Date;
                freeInterval.setMonth(freeInterval.getMonth() + freeIntervalMonths);
                $scope.editingLab.freeIntervalTimeStamp = freeInterval.getTime();
            }
            else {
                delete $scope.editingLab.freeIntervalTimeStamp;
            }
            $scope.freeIntervalMonths = '';
        }

        function removeLab() {
            if ($scope.labNameAgain !== $scope.editingLab.labName) {
                alert('نام را اشتباه وارد کرده اید.\nلطفاً از این که می خواهید این آزمایشگاه را حذف کنید مطمئن شوید.');
                return;
            }
            $scope.updating = true;
            adminService.removeLaboratory($scope.editingLab.username).then(function() {
                $scope.laboratories.splice($scope.selectedLabIndex, 1);
                $scope.selectedLab = null;
                $scope.selectedLabIndex = -1;
                modalElement.modal('hide');
            }, function(code) {
                $scope.updating = false;
                sscAlert(code);
            });
        }

    }
]);


/*
	AHS502 : End of 'admin/laboratory-controller.js'
*/


/*
	AHS502 : Start of 'admin/patient-controller.js'
*/

/*global app*/
/*global sscAlert*/

app.controller('AdminPatientController', ['$scope', '$rootScope', '$state',
    '$stateParams', 'UserService', 'AdminService',
    function($scope, $rootScope, $state,
        $stateParams, userService, adminService) {

        $scope.setPageTitle('بیمارها');

        $scope.setBackHandler($scope.menuHandlers.goToMainPage);

        $scope.findPatientByNationalCode = findPatientByNationalCode;

        $scope.searching = false;
        $scope.showResult = false;

        function findPatientByNationalCode() {
            if (!$scope.nationalCode) return;
            $scope.searching = true;
            $scope.showResult == false;
            adminService.findPatientByNationalCode($scope.nationalCode)
                .then(function(patient) {
                    $scope.patients = [patient];
                    $scope.showResult = true;
                }, function(code) {
                    $scope.showResult = false;
                    sscAlert(code);
                }).then(function() {
                    $scope.searching = false;
                });
        }

    }
]);


/*
	AHS502 : End of 'admin/patient-controller.js'
*/


/*
	AHS502 : Start of 'admin/sms-controller.js'
*/

/*global app*/
/*global $*/
/*global sscAlert*/

app.controller('AdminSmsController', ['$scope', '$rootScope', '$state', '$timeout',
    '$stateParams', 'UserService', 'AdminService',
    function($scope, $rootScope, $state, $timeout,
        $stateParams, userService, adminService) {

        $scope.setPageTitle('پیامک ها');

        $scope.setBackHandler($scope.menuHandlers.goToMainPage);

        $scope.submenus = [
            'شارژ باقیمانده نیک اِس اِم اِس',
            'ارسال پیامک آزمایشی',
            'ارسال عمومی پیامک به تمامی کاربران',
            'فهرست تمام شماره تلفن های استفاده شده',
        ];
        $scope.selectedSubmenu = 0;
        $scope.selectedSubmenuText = $scope.submenus[0];
        $('#ja-admin-sms-submenu-selector')
            .dropdown({
                onChange: function(value, text) {
                    $timeout(function() {
                        $scope.selectedSubmenu = value;
                        $scope.selectedSubmenuText = text;

                        if ($scope.selectedSubmenu == 0) getNikSmsCredit();
                    });
                }
            })
            .dropdown('set selected', 0);

        $scope.waiting = false;

        $scope.sendDummySms = sendDummySms;
        $scope.broadcastMessage = broadcastMessage;
        $scope.findAllPhoneNumbers = findAllPhoneNumbers;

        $scope.message = 'سامانه اینترنتی جواب آزمایش\nJavabAzmayesh.ir';
        $scope.messageToBroadcast = 'کاربران عزیز سامانه جواب آزمایش، سلام!\nمتن اصلی...\nJavabAzmayesh.ir';
        $scope.areAllPhoneNumbersReady = false;
        
        getNikSmsCredit();

        function getNikSmsCredit() {
            $scope.waiting = true;
            adminService.getNikSmsCredit()
                .then(function(credit) {
                    $scope.credit = Math.floor(credit);
                }, function(code) {
                    sscAlert(code);
                }).then(function() {
                    $scope.waiting = false;
                });
        }

        function sendDummySms() {
            $scope.waiting = true;
            adminService.sendDummySms($scope.phoneNumber, $scope.message)
                .catch(function(code) {
                    sscAlert(code);
                }).then(function() {
                    $scope.waiting = false;
                });
        }

        function broadcastMessage() {
            if (!$scope.messageToBroadcast) return;
            $scope.showConfirmMessage('ارسال سراسری پیامک به تمامی کاربران',
                "با تأیید این پنجره، پیامک مورد نظر برای تمامی کاربران آزمایشگاه سامانه جواب آزمایش ارسال خواهد شد.\nآیا از این ارسال مطمئن هستید؟",
                'بله، ارسال شود', 'خیر، ارسال نشود',
                "red", "basic green").then(function() {
                $scope.showConfirmMessage('ارسال سراسری پیامک به تمامی کاربران',
                    "آیا مجدداً متن پیامک برای ارسال سراسری را بررسی کرده اید و از این ارسال مطمئن هستید؟",
                    'بله', 'خیر',
                    "red", "basic green").then(function() {
                    $scope.waiting = true;
                    adminService.broadcastMessage($scope.messageToBroadcast)
                        .catch(function(code) {
                            sscAlert(code);
                        }).then(function() {
                            $scope.waiting = false;
                        });
                });
            });
        }

        function findAllPhoneNumbers() {
            $scope.waiting = true;
            adminService.findAllPhoneNumbers()
                .then(function() {
                    $scope.areAllPhoneNumbersReady = true;
                }, function(code) {
                    sscAlert(code);
                }).then(function() {
                    $scope.waiting = false;
                });
        }

    }
]);


/*
	AHS502 : End of 'admin/sms-controller.js'
*/


/*
	AHS502 : Start of 'answer/guide-controller.js'
*/

/*global app*/
/*global angular*/
/*global Fuse*/

app.controller('AnswerGuideController', ['$rootScope', '$scope', '$state', '$timeout', '$http',
    function($rootScope, $scope, $state, $timeout, $http) {

        var me = this;

        me.hideGuidance = hideGuidance;
        me.selectCategory = selectCategory;
        me.search = search;
        me.selectArticle = selectArticle;

        me.data = null;
        me.filteredArticles = [];

        var fuseOptions = {
            shouldSort: true,
            includeScore: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: ["title"]
        };

        $http.get('/json/guidance-data.json').then(function(res) {
            me.data = res.data || [];
            me.selectedCategory = me.data[0];
            me.search();
        });

        function hideGuidance() {
            angular.element('#ja-answer-guide-modal').modal('hide');
        }

        function selectCategory(category) {
            me.selectedCategory = category;
            me.search();
        }

        function search() {
            me.filteredArticles = me.selectedCategory.articles;
            if (me.searchText) {
                // me.filteredArticles = me.filteredArticles.filter(function(article) {
                //     return article.title.toUpperCase().includes(me.searchText.toUpperCase());
                // });
                var fuse = new Fuse(me.filteredArticles, fuseOptions);
                me.filteredArticles = fuse.search(me.searchText).map(function(item) {
                    return item.item;
                });
            }
            me.selectedArticle = null;
            if (me.filteredArticles.length === 1) {
                me.selectedArticle = me.filteredArticles[0];
            }
        }

        function selectArticle(article) {
            me.selectedArticle = me.selectedArticle === article ? null : article;
        }

    }
]);


/*
	AHS502 : End of 'answer/guide-controller.js'
*/


/*
	AHS502 : Start of 'common/about-controller.js'
*/

/*global app*/

app.controller('CommonAboutController', ['$scope', '$rootScope', '$state', '$stateParams',
    function($scope, $rootScope, $state, $stateParams) {

        if ($rootScope.homeState !== 'answer.post') { // Because it is being handled within AnswerController.
            $scope.setBackHandler(function() {
                $state.go($rootScope.homeState || 'home.find');
            });
        }

        $scope.people = [{
            name: 'نگار امین شکروی',
            description: 'کارشناس ارشد کارآفرینی گرایش بین الملل از دانشگاه تهران',
            title: 'توسعه کسب و کار',
            img: '/img/about/negar.png',
            color: 'teal'
        }, {
            name: 'مهرنوش فتحی',
            description: 'کارشناس روان شناسی از دانشگاه پیام نور',
            title: 'پشتیبانی و مدیریت داخلی',
            img: '/img/about/mehrnoosh.png',
            color: 'green'
        }, {
            name: 'حسام الدین امین شکروی',
            description: 'کارشناس ارشد مهندسی نرم افزار از دانشگاه صنعتی شریف',
            title: 'طراح و برنامه نویس',
            img: '/img/about/hessam.png',
            color: 'blue'
        }];

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
/*global sscAlert*/

app.controller('CommonContactController', ['$scope', '$rootScope', '$state', '$stateParams', 'MasterService',
    function($scope, $rootScope, $state, $stateParams, masterService) {

        $scope.sendFeedback = sendFeedback;

        $scope.sendingFeedback = false;

        if ($rootScope.homeState !== 'answer.post') { // Because it is being handled within AnswerController.
            $scope.setBackHandler(function() {
                $state.go($rootScope.homeState || 'home.find');
            });
        }

        //$scope.mobilePhoneNumber
        //$scope.message

        $scope.vs = new ValidationSystem($scope)
            .field('mobilePhoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.mobilePhoneNumber()
            ])
            .field('message', [
                ValidationSystem.validators.notEmpty()
            ]);

        function sendFeedback() {
            if (!$scope.vs.validate()) return;

            $scope.sendingFeedback = true;
            masterService.sendFeedback($scope.mobilePhoneNumber, $scope.message, $scope.vs.dictate)
                .then(function() {
                    $scope.sendingFeedback = false;
                    $scope.showMessage('ارسال موفقیت آمیز پیام',
                            'از همکاری شما صمیمانه متشکریم.\nپیام شما با موفقیت در سامانه ثبت گردید.\nاین پیام در اسرع وقت مورد بررسی قرار خواهد گرفت.')
                        .then(function() {
                            delete $scope.message;
                        });
                }, function(code) {
                    $scope.sendingFeedback = false;
                    sscAlert(code);
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
        $scope.showLabGate = false;

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
            if (!$scope.vs.validate()) {
                $scope.showLabGate = true;
                return;
            }

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
	AHS502 : Start of 'home/hint-controller.js'
*/

/*global app*/

app.controller('HomeHintController', ['$scope', '$state',
    function($scope, $state) {

        $scope.setBackHandler(function() {
            $state.go('home.find');
        });

        $scope.showConfirmMessage("انتخاب نوع کاربری از سامانه",
            "آیا شما می خواهید به عنوان آزمایشگاه به سامانه وارد شوید یا به عنوان آزمایش دهنده؟",
            "آزمایش دهنده", "آزمایشگاه",
            'green', 'green').catch(function() {
            $state.go('lab.login');
        });

    }
]);


/*
	AHS502 : End of 'home/hint-controller.js'
*/


/*
	AHS502 : Start of 'home/history-controller.js'
*/

/*global app*/
/*global ValidationSystem*/
/*global sscAlert*/

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
                ValidationSystem.validators.numberCode(4)
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
                    $scope.findingHistory = false;
                    sscAlert(code);
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
/*global sscAlert*/

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
                    $scope.sendingOtp = false;
                    sscAlert(code);
                });
        }

    }
]);


/*
	AHS502 : End of 'home/otp-controller.js'
*/


/*
	AHS502 : Start of 'home/patient-controller.js'
*/

/*global app*/
/*global $*/
/*global ValidationSystem*/
/*global sscAlert*/
/*global irIran*/
/*global irIranProvinces*/

app.controller('HomePatientController', ['$scope', '$rootScope', '$state', '$stateParams',
    '$q', '$window', '$timeout', '$http', 'AnswerService', 'Config',
    function($scope, $rootScope, $state, $stateParams,
        $q, $window, $timeout, $http, answerService, config) {

        $scope.registerPatientDraft = registerPatientDraft;

        $scope.registeringPatientDraft = false;
        var jYMD = (new Date()).jYMD();
        $scope.years = Array.range(jYMD[0], 1300);
        $scope.months = Array.range(1, 12);
        $scope.days = Array.range(1, 31);
        $scope.irIran = irIran;
        $scope.provinces = irIranProvinces;
        $scope.cities = [];
        $scope.person = {};
        $scope.person.birthday = [];

        $scope.setBackHandler(function() {
            $state.go('home.find');
        });

        //$scope.person.nationalCode
        //$scope.person.fullName
        //$scope.person.gender
        //$scope.person.birthday
        //$scope.person.mobilePhoneNumber
        //$scope.person.phoneNumber
        //$scope.person.extraPhoneNumber
        //$scope.person.email
        //$scope.person.province
        //$scope.person.city
        //$scope.person.address
        //$scope.person.postalCode

        $scope.vs = new ValidationSystem($scope.person)
            .field('nationalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.nationalCode()
            ])
            .field('fullName', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(3)
            ])
            .field('gender', [
                ValidationSystem.validators.notEmpty()
            ])
            .field('birthday', [
                function(value) {
                    if (!value || !value[0]) return "وارد کردن سال تولد الزامی است";
                    if (!value || !value[1]) return "وارد کردن ماه تولد الزامی است";
                    if (!value || !value[2]) return "وارد کردن روز تولد الزامی است";
                    return null;
                }
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
            ])
            .field('province', [
                ValidationSystem.validators.notEmpty()
            ])
            .field('city', [
                ValidationSystem.validators.notEmpty(),
                function(value) {
                    if (($scope.irIran[$scope.person.province] || []).indexOf(value) < 0) {
                        return "این شهر متعلق به استان " + $scope.person.province + " نیست";
                    }
                    else return null;
                }
            ])
            .field('address', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(10)
            ])
            .field('postalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.postalCode()
            ]);

        $timeout(function() {

            $('#ja-gender-dropdown').dropdown({
                onChange: function(value, text, selectedItem) {
                    $timeout(function() {
                        $scope.person.gender = value;
                        $scope.vs.check('gender');
                    });
                }
            });

            $('#ja-years-dropdown').dropdown({
                onChange: function(value, text, selectedItem) {
                    $timeout(function() {
                        $scope.person.birthday[0] = Number(value);
                        $scope.vs.check('birthday');
                    });
                }
            });
            $('#ja-months-dropdown').dropdown({
                onChange: function(value, text, selectedItem) {
                    $timeout(function() {
                        $scope.person.birthday[1] = Number(value);
                        $scope.vs.check('birthday');
                    });
                }
            });
            $('#ja-days-dropdown').dropdown({
                onChange: function(value, text, selectedItem) {
                    $timeout(function() {
                        $scope.person.birthday[2] = Number(value);
                        $scope.vs.check('birthday');
                    });
                }
            });

            $('#ja-provinces-dropdown').dropdown({
                onChange: function(value, text, selectedItem) {
                    $timeout(function() {
                        $scope.person.province = value;
                        $scope.cities = irIran[$scope.person.province];
                        if ($scope.cities.indexOf($scope.person.city) < 0) {
                            setDropdown('cities');
                        }
                        $scope.vs.check('province');
                        $scope.vs.check('city');
                    });
                }
            });
            $('#ja-cities-dropdown').dropdown({
                onChange: function(value, text, selectedItem) {
                    $timeout(function() {
                        $scope.person.city = value;
                        $scope.vs.check('city');
                    });
                }
            });

        });

        //TODO: This method is not useful anymore:
        function setDropdown(name, value, text) {
            if (arguments.length < 3) text = value;
            $timeout(function() {
                var element = $('#ja-' + name + '-dropdown');
                if (value) element
                    .dropdown('set value', value)
                    .dropdown('set text', text);
                else
                    element.dropdown('clear');
            });
        }

        function registerPatientDraft() {
            if (!$scope.vs.validate()) return;

            $scope.registeringPatientDraft = true;
            answerService.registerPatientDraft($scope.person, $scope.vs.dictate)
                .then(function() {
                    return $scope.showValidationCodeModal()
                        .then(function(validationCode) {
                            answerService.verifyPatientDraft($scope.person.nationalCode, validationCode)
                                .then(function() {
                                    $scope.registeringPatientDraft = false;
                                    $scope.showMessage('ثبت اطلاعات شخصی',
                                            'اطلاعات تماس شما به صورت موفقیت آمیز در سامانه ثبت شدند.')
                                        .then(function() {
                                            $state.go('home.find');
                                        });
                                });
                        });
                }, function(code) {
                    $scope.registeringPatientDraft = false;
                    sscAlert(code);
                });
        }

    }
]);


/*
	AHS502 : End of 'home/patient-controller.js'
*/


/*
	AHS502 : Start of 'lab/forget-controller.js'
*/

/*global app*/
/*global ValidationSystem*/
/*global sscAlert*/

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
                    $scope.restoringPassword = false;
                    sscAlert(code);
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
/*global sscAlert*/

app.controller('LabLoginController', ['$rootScope', '$scope', '$state', 'UserService',
    function($rootScope, $scope, $state, userService) {

        $scope.login = login;

        $scope.loggingIn = false;

        localStorage.startState = "lab.login";

        var userSession = userService.getUserSession() || userService.getUserPersistent();
        if (userSession) {
            userService.setUserSession(userSession);
            goForUser(userSession.userInfo);
            return;
        }

        $scope.setBackHandler(false);

        //$scope.username
        //$scope.password
        //$scope.rememberMe

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
            return userService.login($scope.username, $scope.password, $scope.rememberMe)
                .then(goForUser, function(code) {
                    $scope.loggingIn = false;
                    sscAlert(code);
                });
        }

        function goForUser(userInfo) {
            if (userInfo.userType === 'laboratory') {
                $rootScope.data.labData = userInfo;
                $rootScope.data.forceRefresh = true;
                $state.go('panel.home');
            }
            else if (userInfo.userType === 'administrator') {
                $rootScope.data.adminData = userInfo;
                $rootScope.data.forceRefresh = true;
                $state.go('admin.home');
            }
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
/*global sscAlert*/

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
                    $scope.sendingRegisterationForm = false;
                    sscAlert(code);
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
/*global sscAlert*/

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
                    $scope.confirmingRegisteration = false;
                    sscAlert(code);
                });
        }

    }
]);


/*
	AHS502 : End of 'lab/validate-controller.js'
*/


/*
	AHS502 : Start of 'panel/acceptance-controller.js'
*/

/*global app*/
/*global sscAlert*/

app.controller('PanelAcceptanceController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', '$window', 'UserService', 'AnswerService',
    function($scope, $rootScope, $state, $stateParams, $timeout, $window, userService, answerService) {

        $scope.acceptanceClicked = acceptanceClicked;

        $scope.nationalCode = '';
        $scope.acceptances = [];

        $scope.setLoading(true);
        answerService.getAcceptances()
            .then(function(acceptances) {
                $scope.acceptances = acceptances;
            })
            .catch(function(code) {
                sscAlert(code);
                $scope.redirectToLoginPageIfRequired(code);
            })
            .then(function() {
                $scope.setLoading(false);
            });

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('پذیرش های جاری آزمایشگاه');

        function acceptanceClicked(acceptance) {
            $state.go('panel.send', {
                nationalCode: acceptance.nationalCode,
                previousState: 'panel.acceptance'
            });
        }

    }
]);


/*
	AHS502 : End of 'panel/acceptance-controller.js'
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
/*global sscAlert*/

app.controller('PanelBalanceController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', '$window', 'Config', 'BalanceService',
    function($scope, $rootScope, $state, $stateParams, $timeout, $window, config, balanceService) {

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
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(4),
                ValidationSystem.validators.integer()
            ]);

        $scope.testCount = Math.floor($scope.balance / 1000 /*TODO: Get cost from config*/ );

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
                            'درخواست شما در اسرع وقت مورد بررسی قرار خواهد گرفت و حساب شما شارژ خواهد شد.')
                        .then(function() {
                            $state.go('panel.home');
                        });
                }, function(code) {
                    $scope.preparingPayment = false;
                    sscAlert(code);
                    $scope.redirectToLoginPageIfRequired(code);
                });
        }

        function zpPayment() {
            if (!$scope.vs.validate('zpChargeAmount')) return;
            $window.location.href = '/balance/zarinpal/labCharge/' +
                $rootScope.data.labData.username + '/' + $scope.zpChargeAmount;
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
/*global sscAlert*/

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
                        sscAlert(code);
                        $scope.redirectToLoginPageIfRequired(code);
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
	AHS502 : Start of 'panel/patient-controller.js'
*/

/*global app*/
/*global $*/
/*global ValidationSystem*/
/*global sscAlert*/
/*global irIran*/
/*global irIranProvinces*/
/*global toPersianNumber*/

app.controller('PanelPatientController', ['$scope', '$rootScope', '$state', '$stateParams',
    '$q', '$window', '$timeout', '$http', 'AnswerService', 'Config',
    function($scope, $rootScope, $state, $stateParams,
        $q, $window, $timeout, $http, answerService, config) {

        $scope.loadPatientInfo = loadPatientInfo;
        $scope.acceptPatient = acceptPatient;
        $scope.requestChange = requestChange;

        $scope.updatingPatient = false;
        var jYMD = (new Date()).jYMD();
        $scope.years = Array.range(jYMD[0], 1300);
        $scope.months = Array.range(1, 12);
        $scope.days = Array.range(1, 31);
        $scope.irIran = irIran;
        $scope.provinces = irIranProvinces;
        $scope.cities = [];
        $scope.person = {};
        $scope.person.birthday = [];
        $scope.request = {
            electronicVersion: true,
            paperVersion: false
        };
        $scope.payment = 2000 /*TODO: Get cost from config*/ ;

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('پذیرش بیمار');

        //$scope.person.nationalCode
        //$scope.person.fullName
        //$scope.person.gender
        //$scope.person.birthday
        //$scope.person.mobilePhoneNumber
        //$scope.person.phoneNumber
        //$scope.person.extraPhoneNumber
        //$scope.person.email
        //$scope.person.province
        //$scope.person.city
        //$scope.person.address
        //$scope.person.postalCode

        //$scope.request.electronicVersion
        //$scope.request.paperVersion

        $scope.vs = new ValidationSystem($scope.person)
            .field('nationalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.nationalCode()
            ])
            .field('fullName', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(3)
            ])
            .field('gender', [
                ValidationSystem.validators.notRequired()
            ])
            .field('birthday', [
                function(value) {
                    // if (!value || !value[0]) return "وارد کردن سال تولد الزامی است";
                    // if (!value || !value[1]) return "وارد کردن ماه تولد الزامی است";
                    // if (!value || !value[2]) return "وارد کردن روز تولد الزامی است";
                    return null;
                }
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
            ])
            .field('province', [
                ValidationSystem.validators.notEmptyIf(function() {
                    return $scope.request.paperVersion;
                })
            ])
            .field('city', [
                ValidationSystem.validators.notEmptyIf(function() {
                    return $scope.request.paperVersion;
                }),
                function(value) {
                    if (!$scope.person.province) return true;
                    if (($scope.irIran[$scope.person.province] || []).indexOf(value) < 0) {
                        return "این شهر متعلق به استان " + $scope.person.province + " نیست";
                    }
                    else return null;
                }
            ])
            .field('address', [
                ValidationSystem.validators.notEmptyIf(function() {
                    return $scope.request.paperVersion;
                }),
                ValidationSystem.validators.minLength(10)
            ])
            .field('postalCode', [
                ValidationSystem.validators.notEmptyIf(function() {
                    return $scope.request.paperVersion;
                }),
                ValidationSystem.validators.postalCode()
            ]);

        $timeout(function() {

            $('#ja-gender-dropdown').dropdown({
                onChange: function(value, text, selectedItem) {
                    $timeout(function() {
                        $scope.person.gender = value;
                        $scope.vs.check('gender');
                    });
                }
            });

            $('#ja-years-dropdown').dropdown({
                onChange: function(value, text, selectedItem) {
                    $timeout(function() {
                        $scope.person.birthday[0] = Number(value);
                        $scope.vs.check('birthday');
                    });
                }
            });
            $('#ja-months-dropdown').dropdown({
                onChange: function(value, text, selectedItem) {
                    $timeout(function() {
                        $scope.person.birthday[1] = Number(value);
                        $scope.vs.check('birthday');
                    });
                }
            });
            $('#ja-days-dropdown').dropdown({
                onChange: function(value, text, selectedItem) {
                    $timeout(function() {
                        $scope.person.birthday[2] = Number(value);
                        $scope.vs.check('birthday');
                    });
                }
            });

            $('#ja-provinces-dropdown').dropdown({
                onChange: function(value, text, selectedItem) {
                    $timeout(function() {
                        $scope.person.province = value;
                        $scope.cities = irIran[$scope.person.province];
                        if ($scope.cities.indexOf($scope.person.city) < 0) {
                            setDropdown('cities');
                        }
                        $scope.vs.check('province');
                        $scope.vs.check('city');
                    });
                }
            });
            $('#ja-cities-dropdown').dropdown({
                onChange: function(value, text, selectedItem) {
                    $timeout(function() {
                        $scope.person.city = value;
                        $scope.vs.check('city');
                    });
                }
            });

        });

        function setDropdown(name, value, text) {
            if (arguments.length < 3) text = value;
            $timeout(function() {
                var element = $('#ja-' + name + '-dropdown');
                if (value) element
                    .dropdown('set value', value)
                    .dropdown('set text', text);
                else
                    element.dropdown('clear');
            });
        }

        function loadPatientInfo() {
            if (!$scope.vs.see('nationalCode')) return;

            if ($scope.person.fullName && $scope.person.mobilePhoneNumber && $scope.person.phoneNumber &&
                $scope.person.extraPhoneNumber && $scope.person.email) return;

            $scope.updatingPatient = true;
            return answerService.patientInfo($scope.person.nationalCode)
                .then(function(data) {
                    var patient = data.patient;
                    //TODO: Use data.acceptance here too.

                    $scope.person.fullName = $scope.person.fullName || patient.fullName;
                    $scope.person.gender = $scope.person.gender || patient.gender;
                    $scope.person.gender && setDropdown('gender', $scope.person.gender);
                    $scope.person.birthday = patient.birthday || [];
                    $scope.person.birthday[0] && setDropdown('years', $scope.person.birthday[0]);
                    $scope.person.birthday[1] && setDropdown('months', $scope.person.birthday[1]);
                    $scope.person.birthday[2] && setDropdown('days', $scope.person.birthday[2]);
                    $scope.person.mobilePhoneNumber = $scope.person.mobilePhoneNumber || patient.numbers[0];
                    $scope.person.phoneNumber = $scope.person.phoneNumber || patient.numbers[1];
                    $scope.person.extraPhoneNumber = $scope.person.extraPhoneNumber || patient.numbers[2];
                    $scope.person.email = $scope.person.email || patient.email;
                    $scope.person.province = $scope.person.province || patient.province;
                    $scope.person.province && setDropdown('provinces', $scope.person.province);
                    $scope.person.city = $scope.person.city || patient.city;
                    $scope.person.city && setDropdown('cities', $scope.person.city);
                    $scope.person.address = $scope.person.address || patient.address;
                    $scope.person.postalCode = $scope.person.postalCode || patient.postalCode;

                    $scope.vs.check('fullName', 'mobilePhoneNumber', 'phoneNumber', 'extraPhoneNumber', 'email');

                }, function(code) {
                    $scope.redirectToLoginPageIfRequired(code);
                })
                .then(function() {
                    $scope.updatingPatient = false;
                });
        }

        function acceptPatient() {
            if (!$scope.vs.validate()) return;

            var promise = $q.when();
            if ($scope.payment) {
                promise = $scope.showConfirmMessage('دریافت هزینه ثبت از بیمار',
                    'هزینه درخواست های بیمار برابر ' + toPersianNumber($scope.payment) + ' تومان است.\n' +
                    'لطفاً این مبلغ را از بیمار دریافت کنید.',
                    'مبلغ مورد نظر دریافت شد', 'لغو عملیات',
                    'green', 'basic red');
            }
            promise.then(function() {
                $scope.updatingPatient = true;
                answerService.acceptPatient($scope.person, $scope.request, $scope.payment, $scope.vs.dictate)
                    .then(function() {
                        $scope.updatingPatient = false;
                        $scope.showMessage('به روز رسانی اطلاعات بیمار',
                                'اطلاعات بیمار به صورت موفقیت آمیز در سامانه ثبت شدند.')
                            .then(function() {
                                $state.go('panel.home');
                            });
                    }, function(code) {
                        $scope.updatingPatient = false;
                        sscAlert(code);
                        $scope.redirectToLoginPageIfRequired(code);
                    });
            });
        }

        function requestChange(item) {
            if (item === 'electronicVersion') {
                $scope.request.paperVersion = $scope.request.paperVersion && $scope.request.electronicVersion;
            }
            if (item === 'paperVersion') {
                $scope.request.electronicVersion = $scope.request.paperVersion || $scope.request.electronicVersion;
            }

            // Force to select the electronic version for now:
            $scope.request.electronicVersion = true;

            //TODO: Remove these temporary lines later:
            $scope.request.paperVersion && $scope.showMessage('اطلاع رسانی',
                "متأسفانه این قابلیت در حال حاضر فعال نیست اما به زودی فعال خواهد شد.");
            $scope.request.paperVersion = false;

            $scope.payment = ($scope.request.electronicVersion ? 2000 /*TODO: Get cost from config*/ : 0) +
                ($scope.request.paperVersion ? 5000 /*TODO: Get cost from config*/ : 0);
        }

    }
]);


/*
	AHS502 : End of 'panel/patient-controller.js'
*/


/*
	AHS502 : Start of 'panel/post-controller.js'
*/

/*global app*/
/*global toPersianNumber*/
/*global persianDate*/
/*global sscAlert*/

app.controller('PanelPostController', ['$scope', '$rootScope', '$state', '$stateParams', '$q', 'PostService', 'UserService',
    function($scope, $rootScope, $state, $stateParams, $q, postService, userService) {

        $scope.seePostAsPatient = seePostAsPatient;
        $scope.updatePost = updatePost;
        $scope.deletePost = deletePost;

        var postSummary = $rootScope.data.post;

        $scope.setBackHandler(function() {
            $state.go('panel.history');
        });

        $scope.setPageTitle('لطفاً کمی صبر کنید...');

        $scope.$on('$destroy', function() {
            delete $rootScope.data.panelPostData;
        });

        $scope.setLoading(true);
        ($rootScope.data.panelPostData ? $q.when($rootScope.data.panelPostData) :
            postService.getOnePost(postSummary.nationalCode, postSummary.postCode))
        .then(function(post) {
                post.files = post.files || [];
                post.files.forEach(function(file) {
                    file.url = '/answer/file/download?p=' + post.nationalCode +
                        '&n=' + post.postCode + '&f=' + file.serverName;
                    if (file.type.indexOf('image') >= 0) file.material = 'image';
                    else if (file.type === 'application/pdf') file.material = 'pdf';
                });
                $scope.post = post;
                $rootScope.data.panelPostData = post;
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
                sscAlert(code);
                $scope.redirectToLoginPageIfRequired(code);
            })
            .then(function() {
                $scope.setLoading(false);
            });

        function seePostAsPatient() {
            $state.go('answer', {
                p: $scope.post.nationalCode,
                n: $scope.post.postCode,
                previousState: 'panel.post',
                previousStateData: {
                    postCache: $rootScope.data.postCache,
                    historyState: $rootScope.data.historyState,
                    panelPostData: $scope.post,
                    userSession: userService.getUserSession()
                }
            });
        }

        function updatePost() {
            // Use: postService.updateOnePost(nationalCode, postCode, postData)
        }

        function deletePost() {
            $scope.showConfirmMessage('حذف پُست از سامانه',
                'آیا مطمئن هستید که می خواهید این پُست را برای همیشه از سامانه پاک کنید؟',
                'بله، پاک شود', 'خیر، پاک نشود',
                'red', 'basic green').then(function() {
                $scope.setLoading(true);
                postService.deleteOnePost(postSummary.nationalCode, postSummary.postCode)
                    .then(function() {
                        $scope.showMessage('حذف موفقیت آمیز پُست از سامانه',
                            'پُست مورد نظر شما از سامانه پاک شد و اطلاع رسانی لازم به بیمار خواهد شد.').then(function() {
                            delete $rootScope.data.postCache;
                            $state.go('panel.history');
                        });
                    }, function(code) {
                        sscAlert(code);
                        $scope.redirectToLoginPageIfRequired(code);
                    })
                    .then(function() {
                        $scope.setLoading(false);
                    });
            });
        }

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
/*global sscAlert*/
/*global toastr*/

app.controller('PanelSendController', ['$scope', '$rootScope', '$state', '$stateParams', '$window', '$timeout', '$http', 'AnswerService',
    function($scope, $rootScope, $state, $stateParams, $window, $timeout, $http, answerService) {

        $scope.loadPatientInfo = loadPatientInfo;
        $scope.sendAnswer = sendAnswer;
        $scope.selectFilesDialog = selectFilesDialog;
        $scope.abortUpload = abortUpload;
        $scope.removeFile = removeFile;

        $scope.sendingAnswer = false;
        $scope.patient = null;
        $scope.acceptance = null;
        $scope.patientLoaded = false;
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
            $state.go($stateParams.previousState || 'panel.home');
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

        //$scope.nationalCode
        //$scope.files
        //$scope.notes

        $scope.vs = new ValidationSystem($scope)
            .field('nationalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.nationalCode()
            ]);

        var fileId = 0;

        if ($stateParams.nationalCode) {
            $scope.nationalCode = $stateParams.nationalCode;
            loadPatientInfo();
        }

        function loadPatientInfo() {
            if (!$scope.vs.see('nationalCode')) {
                $scope.patientLoaded = false;
                return;
            }

            $scope.sendingAnswer = true;
            return answerService.patientInfo($scope.nationalCode)
                .then(function(data) {
                    $scope.patient = data.patient;
                    $scope.acceptance = data.acceptance;
                }, function(code) {
                    $scope.redirectToLoginPageIfRequired(code);
                    $scope.patient = null;
                    $scope.acceptance = null;
                })
                .then(function() {
                    $scope.sendingAnswer = false;
                    $scope.patientLoaded = true;
                });
        }

        function sendAnswer() {
            if (!$scope.vs.validate()) return;

            if ($scope.files.find(function(file) {
                    return file.status !== 'Uploaded';
                })) {
                return toastr.warning("همه فایل های انتخاب شده هنوز به درستی ارسال نشده اند",
                    "خطا در ارسال فایل ها", {
                        rtl: true,
                        closeButton: true,
                        timeOut: 5000,
                        extendedTimeOut: 3000,
                    });
            }
            if (!$scope.patientLoaded || !$scope.patient || !$scope.acceptance) {
                return toastr.warning("بیمار با کد ملی وارد شده در این آزمایشگاه پذیرش نشده است",
                    "خطا در ثبت نتایج", {
                        rtl: true,
                        closeButton: true,
                        timeOut: 5000,
                        extendedTimeOut: 3000,
                    });
            }

            $scope.sendingAnswer = true;
            answerService.send($scope.nationalCode, $scope.files, $scope.notes, $scope.vs.dictate)
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
                    sscAlert(code);
                    $scope.redirectToLoginPageIfRequired(code);
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
                //alert('1:\n' + JSON.stringify(e, null, 4));
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
                    //alert('2:\n' + JSON.stringify(err, null, 4));
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
	AHS502 : Start of 'admin/home/new-c2c-payment-codes-controller.js'
*/

/*global app*/
/*global sscAlert*/

app.controller('AdminHomeNewC2cPaymentCodesController', ['$scope', '$rootScope', '$state', '$stateParams', 'AdminService',
    function($scope, $rootScope, $state, $stateParams, adminService) {

        $scope.getAllNewC2cPaymentReceipts = getAllNewC2cPaymentReceipts;
        $scope.openC2c = openC2c;
        $scope.closeSelectedC2c = closeSelectedC2c;
        $scope.chargeLab = chargeLab;
        $scope.declineC2c = declineC2c;

        getAllNewC2cPaymentReceipts();

        function getAllNewC2cPaymentReceipts() {
            $scope.setLoading(true);
            adminService.getAllNewC2cPaymentReceipts()
                .then(function(c2cPaymentCodes) {
                    $scope.c2cPaymentCodes = c2cPaymentCodes;
                }, function(code) {
                    sscAlert(code);
                }).then(function() {
                    $scope.setLoading(false);
                });
        }

        function openC2c(c2c, index) {
            if ($scope.selectedC2c === null) {
                delete $scope.selectedC2c;
                delete $scope.selectedC2cIndex;
            }
            else if ($scope.selectedC2cIndex !== index) {
                $scope.selectedC2c = c2c;
                $scope.selectedC2cIndex = index;
            }
        }

        function closeSelectedC2c() {
            $scope.selectedC2c = null;
            $scope.selectedC2cIndex = null;
        }

        function chargeLab(charge) {
            var amount = Number(charge || '');
            if (!amount) return;
            $scope.updating = true;
            adminService.chargeLabFromC2c($scope.selectedC2c.id, $scope.selectedC2c.username, amount)
                .then(function() {
                    $scope.c2cPaymentCodes.splice($scope.selectedC2cIndex, 1);
                    delete $scope.selectedC2c;
                    delete $scope.selectedC2cIndex;
                }, function(code) {
                    sscAlert(code);
                }).then(function() {
                    $scope.updating = false;
                });
        }

        function declineC2c() {
            $scope.showConfirmMessage('حذف کد رهگیری ثبت شده',
                    "شما در شُرُف حذف و نا دیده گرفتن شماره رهگیری پرداخت ثبت شده توسط کاربر هستید.\nآیا از این کار اطمینان دارید؟",
                    'بله، حذف شود', 'نه، حذف نشود',
                    'red', 'basic green')
                .then(function() {
                    $scope.updating = true;
                    adminService.declineC2cReceipt($scope.selectedC2c.id)
                        .then(function() {
                            $scope.c2cPaymentCodes.splice($scope.selectedC2cIndex, 1);
                            delete $scope.selectedC2c;
                            delete $scope.selectedC2cIndex;
                        }, function(code) {
                            sscAlert(code);
                        }).then(function() {
                            $scope.updating = false;
                        });
                });
        }

    }
]);


/*
	AHS502 : End of 'admin/home/new-c2c-payment-codes-controller.js'
*/


/*
	AHS502 : Start of 'admin/home/new-feedbacks-controller.js'
*/

/*global app*/
/*global sscAlert*/

app.controller('AdminHomeNewFeedbacksController', ['$scope', '$rootScope', '$state', '$stateParams', 'AdminService',
    function($scope, $rootScope, $state, $stateParams, adminService) {

        $scope.getNewFeedbacks = getNewFeedbacks;
        $scope.openFb = openFb;
        $scope.closeSelectedFb = closeSelectedFb;
        $scope.checkFb = checkFb;
        $scope.respondFb = respondFb;

        getNewFeedbacks();

        function getNewFeedbacks() {
            $scope.setLoading(true);
            adminService.getNewFeedbacks()
                .then(function(feedbacks) {
                    $scope.feedbacks = feedbacks;
                }, function(code) {
                    sscAlert(code);
                }).then(function() {
                    $scope.setLoading(false);
                });
        }

        function openFb(fb, index) {
            if ($scope.selectedFb === null) {
                delete $scope.selectedFb;
                delete $scope.selectedFbIndex;
            }
            else if ($scope.selectedFbIndex !== index) {
                $scope.selectedFb = fb;
                $scope.selectedFbIndex = index;
                $scope.respondMessage = "سلام!\nبازخورد شما بررسی شد.\nبا سپاس فراوان از این که ما را با بازخوردهای خود یاری می کنید.";
            }
        }

        function closeSelectedFb() {
            $scope.selectedFb = null;
            $scope.selectedFbIndex = null;
        }

        function checkFb() {
            $scope.showConfirmMessage('حذف بازخورد ثیت شده کاربر',
                    "پس از تأیید، بازخورد مورد نظر از سامانه حذف می شود.\nآیا این بازخورد را مطالعه و بررسی کرده و پاسخ مناسب را به کاربر داده اید؟",
                    'بله، حذف شود', 'نه، حذف نشود',
                    'orange', 'basic green')
                .then(function() {
                    $scope.updating = true;
                    adminService.checkFeedback($scope.selectedFb.id)
                        .then(function() {
                            $scope.feedbacks.splice($scope.selectedFbIndex, 1);
                            delete $scope.selectedFb;
                            delete $scope.selectedFbIndex;
                        }, function(code) {
                            sscAlert(code);
                        }).then(function() {
                            $scope.updating = false;
                        });
                });
        }

        function respondFb() {
            $scope.updating = true;
            adminService.respondFeedback($scope.selectedFb.id, $scope.respondMessage)
                .then(function() {
                    $scope.feedbacks.splice($scope.selectedFbIndex, 1);
                    delete $scope.selectedFb;
                    delete $scope.selectedFbIndex;
                }, function(code) {
                    sscAlert(code);
                }).then(function() {
                    $scope.updating = false;
                });
        }

    }
]);


/*
	AHS502 : End of 'admin/home/new-feedbacks-controller.js'
*/


/*
	AHS502 : Start of 'admin/home/not-activated-labs-controller.js'
*/

/*global app*/
/*global angular*/
/*global sscAlert*/

app.controller('AdminHomeNotActivatedLabsController', ['$scope', '$rootScope', '$state', '$stateParams', 'AdminService',
    function($scope, $rootScope, $state, $stateParams, adminService) {

        $scope.getNotActivatedLabs = getNotActivatedLabs;
        $scope.openLab = openLab;
        $scope.closeSelectedLab = closeSelectedLab;
        $scope.approveLab = approveLab;
        $scope.declineLab = declineLab;

        getNotActivatedLabs();

        function getNotActivatedLabs() {
            $scope.setLoading(true);
            adminService.getNotActivatedLabs()
                .then(function(inactiveLabs) {
                    $scope.inactiveLabs = inactiveLabs;
                }, function(code) {
                    sscAlert(code);
                }).then(function() {
                    $scope.setLoading(false);
                });
        }

        function openLab(lab, index) {
            if ($scope.selectedLab === null) {
                delete $scope.selectedLab;
                delete $scope.selectedLabIndex;
            }
            else if ($scope.selectedLabIndex !== index) {
                $scope.selectedLab = angular.copy(lab);
                $scope.selectedLabIndex = index;
            }
        }

        function closeSelectedLab() {
            $scope.selectedLab = null;
            $scope.selectedLabIndex = null;
        }

        function approveLab() {
            $scope.showConfirmMessage('تأیید کاربر جدید',
                    "آیا از تأیید کاربر جدید مطمئن هستید؟",
                    'بله، تأیید شود', 'خیر',
                    'green', 'basic gray')
                .then(function() {
                    $scope.updating = true;
                    if ($scope.selectedLab.freeIntervalMonths) {
                        var freeInterval = new Date;
                        freeInterval.setMonth(freeInterval.getMonth() + (Number($scope.selectedLab.freeIntervalMonths || '0') || 0));
                        $scope.selectedLab.freeIntervalTimeStamp = freeInterval.getTime();
                    }
                    delete $scope.selectedLab.freeIntervalMonths;
                    adminService.approveInactiveLab($scope.selectedLab)
                        .then(function() {
                            $scope.inactiveLabs.splice($scope.selectedLabIndex, 1);
                            delete $scope.selectedLab;
                            delete $scope.selectedLabIndex;
                        }, function(code) {
                            sscAlert(code);
                        }).then(function() {
                            $scope.updating = false;
                        });
                });
        }

        function declineLab() {
            $scope.showConfirmMessage('تأییدیه برای حذف کاربر جدید',
                    "آیا از تصمیم خود مبنی بر حذف کامل کاربر جدید مطمئن هستید؟\n در صورت حذف، امکان بازگشت وجود ندارد.",
                    'بله، حذف شود', 'نه، حذف نشود',
                    'red', 'basic green')
                .then(function() {
                    $scope.updating = true;
                    adminService.declineInactiveLab($scope.selectedLab.username)
                        .then(function() {
                            $scope.inactiveLabs.splice($scope.selectedLabIndex, 1);
                            delete $scope.selectedLab;
                            delete $scope.selectedLabIndex;
                        }, function(code) {
                            sscAlert(code);
                        }).then(function() {
                            $scope.updating = false;
                        });
                });
        }

    }
]);


/*
	AHS502 : End of 'admin/home/not-activated-labs-controller.js'
*/


/*
	AHS502 : Start of 'admin/home/not-delivered-smses-controller.js'
*/

/*global app*/
/*global simpleQueryString*/
/*global Clipboard*/
/*global sscAlert*/

app.controller('AdminHomeNotDeliveredSmsesController', ['$scope', '$rootScope', '$state', '$stateParams', 'AdminService',
    function($scope, $rootScope, $state, $stateParams, adminService) {

        $scope.getNotSentSmses = getNotSentSmses;
        $scope.openSms = openSms;
        $scope.closeSelectedSms = closeSelectedSms;
        $scope.sendSmsAgain = sendSmsAgain;
        $scope.checkSelectedSms = checkSelectedSms;
        $scope.makeSmsHref = makeSmsHref;
        $scope.copyMessage = copyMessage;
        $scope.copyNumber = copyNumber;

        var clipboards = {};
        
        getNotSentSmses();

        function getNotSentSmses() {
            $scope.setLoading(true);
            adminService.getNotSentSmses()
                .then(function(smsStateStatusList) {
                    $scope.notDeliveredSmses = smsStateStatusList;
                }, function(code) {
                    sscAlert(code);
                }).then(function() {
                    $scope.setLoading(false);
                });
        }

        function openSms(sms, index) {
            if ($scope.selectedSms === null) {
                delete $scope.selectedSms;
                delete $scope.selectedSmsIndex;
            }
            else {
                $scope.selectedSms = sms;
                $scope.selectedSmsIndex = index;
            }
        }

        function closeSelectedSms() {
            $scope.selectedSms = null;
            $scope.selectedSmsIndex = null;
        }

        function sendSmsAgain() {
            $scope.updating = true;
            adminService.tryAgainNotSentSms($scope.selectedSms.data.smsKey)
                .then(function() {
                    $scope.notDeliveredSmses.splice($scope.selectedSmsIndex, 1);
                    delete $scope.selectedSms;
                    delete $scope.selectedSmsIndex;
                }, function(code) {
                    sscAlert(code);
                }).then(function() {
                    $scope.updating = false;
                });
        }

        function checkSelectedSms() {
            $scope.updating = true;
            adminService.checkNotSentSms($scope.selectedSms.data.smsKey)
                .then(function() {
                    $scope.notDeliveredSmses.splice($scope.selectedSmsIndex, 1);
                    delete $scope.selectedSms;
                    delete $scope.selectedSmsIndex;
                }, function(code) {
                    sscAlert(code);
                }).then(function() {
                    $scope.updating = false;
                });
        }

        function makeSmsHref(number, message) {
            return 'sms:' + number + ';?&' + simpleQueryString.stringify({
                body: message
            });
        }

        function copyMessage() {
            if (!clipboards['message']) {
                clipboards['message'] = new Clipboard('#ja-copy-message');
                clipboards['message'].on('success', function(e) {
                    console.info('Success', e.action, e.text);
                    e.clearSelection();
                });
                clipboards['message'].on('error', function(e) {
                    console.info('Error', e.action, e.text);
                });
            }
        }

        function copyNumber(number) {
            number = String(number);
            if (!clipboards[number]) {
                clipboards[number] = new Clipboard('#ja-copy-number-' + number);
                clipboards[number].on('success', function(e) {
                    console.info('Success', e.action, e.text);
                    e.clearSelection();
                });
                clipboards[number].on('error', function(e) {
                    console.info('Error', e.action, e.text);
                });
            }
        }

    }
]);


/*
	AHS502 : End of 'admin/home/not-delivered-smses-controller.js'
*/


/*
	AHS502 : Start of 'admin/home/statistics-controller.js'
*/

/*global app*/
/*global sscAlert*/

app.controller('AdminHomeStatisticsController', ['$scope', '$rootScope', '$state', '$stateParams', 'AdminService',
    function($scope, $rootScope, $state, $stateParams, adminService) {

        $scope.getStatistics = getStatistics;

        getStatistics();

        function getStatistics() {
            $scope.setLoading(true);
            adminService.getStatistics()
                .then(function(stat) {
                    $scope.stat = stat;
                    $scope.statForDisplay = JSON.stringify(stat, null, 4);
                }, function(code) {
                    sscAlert(code);
                }).then(function() {
                    $scope.setLoading(false);
                });
        }

    }
]);


/*
	AHS502 : End of 'admin/home/statistics-controller.js'
*/


/*
	AHS502 : Start of 'panel/account/confirm-controller.js'
*/

/*global app*/
/*global ValidationSystem*/
/*global sscAlert*/

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
                    sscAlert(code);
                    $scope.redirectToLoginPageIfRequired(code);
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
/*global sscAlert*/

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
                    sscAlert(code);
                    $scope.redirectToLoginPageIfRequired(code);
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
/*global sscAlert*/

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
                    $scope.changingPassword = false;
                    sscAlert(code);
                    $scope.redirectToLoginPageIfRequired(code);
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
	AHS502 : Start of 'admin-controller.js'
*/

/*global app*/

app.controller('AdminController', ['$scope', '$rootScope', '$state', '$stateParams',
    '$timeout', '$interval', 'UserService',
    function($scope, $rootScope, $state, $stateParams,
        $timeout, $interval, userService) {

        $scope.setLoading = setLoading;
        $scope.setPageTitle = setPageTitle;
        $scope.refreshUserData = refreshUserDataProvider(false);

        $scope.loading = $scope.loadingMessage = false;

        // Refresh user info every 1 minute
        var refreshUserDataPromise = $interval(refreshUserDataProvider(true), 60000);
        $scope.$on('$destroy', function() {
            $interval.cancel(refreshUserDataPromise);
        });

        $scope.setMenuHandlers({
            goToMainPage: function() {
                $state.go('admin.home');
            },
            goToLaboratoryPage: function() {
                $state.go('admin.laboratory');
            },
            goToPatientPage: function() {
                $state.go('admin.patient');
            },
            goToSmsPage: function() {
                $state.go('admin.sms');
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
                    $rootScope.data.adminData = userInfo;
                    silent || $scope.setLoading(false);
                });
            };
        }

    }
]);


/*
	AHS502 : End of 'admin-controller.js'
*/


/*
	AHS502 : Start of 'answer-controller.js'
*/

/*global app*/
/*global persianDate*/
/*global toPersianNumber*/
/*global toLatinNumber*/
/*global Clipboard*/
/*global simpleQueryString*/
/*global sscAlert*/
/*global getEnvironmentProperties*/

app.controller('AnswerController', ['$rootScope', '$scope', '$timeout', '$window', '$location', '$state', '$stateParams', 'HistoryService', 'UserService',
    function($rootScope, $scope, $timeout, $window, $location, $state, $stateParams, historyService, userService) {

        var printLayoutWidth = 2400; // px

        $scope.nationalCode = extractCodeFromNumericParam($stateParams.p, 10);
        $scope.postCode = extractCodeFromNumericParam($stateParams.n, 4);

        function extractCodeFromNumericParam(param, length) {
            return toLatinNumber(String(param || '').trim()).split('').filter(function(char) {
                return char >= '0' && char <= '9';
            }).join('').slice(0, length || 100000);
        }

        $scope.pdfFileEventHandlerMaker = pdfFileEventHandlerMaker;
        $scope.copySharedUrl = copySharedUrl;

        $rootScope.homeState = 'answer.post';

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
                else if (previousState === 'panel.post') {
                    $rootScope.data.postCache = previousStateData.postCache;
                    $rootScope.data.historyState = previousStateData.historyState;
                    $rootScope.data.panelPostData = previousStateData.panelPostData;
                    userService.setUserSession(previousStateData.userSession);
                    $state.go(previousState);
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
            guide: function() {
                angular.element('#ja-answer-guide-modal').modal('show');
            },
            saveFile: function() {
                $state.go('answer.download');
            },
            shareFile: function() {
                clipboard = undefined;
                $scope.sharedUrl = url;
                var env = getEnvironmentProperties();
                $scope.showMobileShareOptions = !env.desktop;
                $scope.sharingViaSms = 'sms:' + (env.iOS ? '&' : '?') + simpleQueryString.stringify({
                    body: 'سلام!\n' + 'نتایج آزمایش ' + $scope.answer.patientName + ' در لینک زیر:\n\n' + url
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
                    $timeout(function() {
                        $timeout(function() {
                            $window.print();
                        });
                    });
                }, function(reason) {
                    console.error("Coulldn't print:", reason);
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
            goToAnswerAbout: function() {
                $state.go('answer.about');
            },
            goToAnswerContact: function() {
                $state.go('answer.contact');
            },
            getAsnwerLoadedStatus: function() {
                return !!$scope.answer;
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
                $scope.loading = false;
            }, function(code) {
                $scope.loading = false;
                $scope.setBackHandler();
                $scope.setMenuHandlers();
                $scope.setHeaderHandlers();
                $scope.setFooterHandlers();
                sscAlert(code);
                $scope.showMessage('خطا در بارگذاری نتیجه آزمایش',
                        "به دلیل بروز خطا، جواب آزمایش مورد نظر شما بارگذاری نشد.\nلطفاً مجدداً تلاش بفرمایید.")
                    .then(function() {
                        $state.go('home.find');
                    });
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
	AHS502 : Start of 'developer-controller.js'
*/

/*global app*/
/*global getEnvironmentProperties*/

app.controller('DeveloperController', ['$scope', '$rootScope', '$state', '$stateParams',
    '$timeout', '$interval', 'UserService',
    function($scope, $rootScope, $state, $stateParams,
        $timeout, $interval, userService) {

        $scope.showEnvironmnetProperties = showEnvironmnetProperties;

        function showEnvironmnetProperties() {
            var eprop = getEnvironmentProperties();
            var extracted = {};
            for (var key in eprop)
                if (eprop[key])
                    extracted[key] = eprop[key];
            alert(JSON.stringify(extracted, null, 4));
        }

    }
]);


/*
	AHS502 : End of 'developer-controller.js'
*/


/*
	AHS502 : Start of 'history-controller.js'
*/

/*global app*/

app.controller('HistoryController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout',
    function($rootScope, $scope, $state, $stateParams, $timeout) {

        $scope.postClicked = postClicked;

        $rootScope.homeState = 'home.find';

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

app.controller('HomeController', ['$scope', '$rootScope', '$state',
    function($scope, $rootScope, $state) {

        $rootScope.homeState = 'home.find';

        $scope.setMenuHandlers({
            goToHomeFind: function() {
                $state.go('home.find');
            },
            goToHomePatient: function() {
                $state.go('home.patient');
            },
            goToHomeOtp: function() {
                $state.go('home.otp');
            },
            goToHomeHint: function() {
                $state.go('home.hint');
            },
            goToLabLogin: function() {
                $state.go('lab.login');
            },
            goToHomeAbout: function() {
                $state.go('home.about');
            },
            goToHomeContact: function() {
                $state.go('home.contact');
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

app.controller('LabController', ['$scope', '$rootScope', '$state',
    function($scope, $rootScope, $state) {

        $rootScope.homeState = 'lab.login';

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
                $state.go('lab.about');
            },
            goToLabContact: function() {
                $state.go('lab.contact');
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
/*global getEnvironmentProperties*/

app.controller('MasterController', ['$scope', '$rootScope', '$q', '$window', '$timeout', 'Config',
    function($scope, $rootScope, $q, $window, $timeout, config) {

        // $scope.log = function() {
        //     console.log.apply(console, Array.prototype.slice.call(arguments));
        // };

        $scope.setBackHandler = setBackHandler;
        $scope.setMenuHandlers = setMenuHandlers;
        $scope.setHeaderHandlers = setHeaderHandlers;
        $scope.setFooterHandlers = setFooterHandlers;

        $scope.toggleMenu = toggleMenu;
        $rootScope.hideMenu = hideMenu;

        $scope.showMessage = showMessage;
        $scope.showConfirmMessage = showConfirmMessage;
        $scope.showDeveloperModal = showDeveloperModal;
        $scope.showRulesModal = showRulesModal;
        $scope.showValidationCodeModal = showValidationCodeModal;

        $scope.backHandler = undefined;
        $scope.menuHandlers = undefined;
        $scope.headerHandlers = undefined;
        $scope.footerHandlers = undefined;

        $scope.iconJs = $window.iconJs;

        $scope.showAfterFormSpace = getEnvironmentProperties().mobile;

        $window.addEventListener('scroll', function(event) {
            if (typeof $rootScope.hideMenu === 'function') {
                $rootScope.hideMenu();
            }
        });

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

        function hideMenu() {
            angular.element('#ja-sidebar-menu')
                .sidebar('setting', 'transition', 'overlay')
                .sidebar('setting', 'mobileTransition', 'overlay')
                .sidebar('hide');
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

        function showConfirmMessage(title, message, yes, no, yesColor, noColor) {
            $scope.modal = {
                title: title,
                message: message,
                yes: yes || 'بله',
                no: no || 'خیر',
                yesColor: yesColor || 'green',
                noColor: noColor || 'blue'
            };
            var defer = $q.defer();
            angular.element('#ja-confirm-modal')
                .modal({
                    onApprove: function() {
                        defer.resolve();
                    },
                    onDeny: function() {
                        defer.reject();
                    }
                })
                .modal('show');
            return defer.promise;
        }

        function showDeveloperModal() {
            if (!config.developer_modal) return;
            angular.element('#ja-developer-modal')
                .modal('show');
        }

        function showRulesModal() {
            angular.element('#ja-rules-modal')
                .modal('show');
        }

        function showValidationCodeModal() {
            $scope.modal = {
                validationCode: null
            };
            var defer = $q.defer();
            angular.element('#ja-validation-code-modal')
                .modal({
                    onApprove: function() {
                        defer.resolve($scope.modal.validationCode);
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
/*global sscAlert*/

app.controller('PanelController', ['$scope', '$rootScope', '$state', '$stateParams',
    '$timeout', '$interval', 'UserService',
    function($scope, $rootScope, $state, $stateParams,
        $timeout, $interval, userService) {

        $scope.setLoading = setLoading;
        $scope.setPageTitle = setPageTitle;
        $scope.refreshUserData = refreshUserDataProvider(false);
        $scope.redirectToLoginPageIfRequired = redirectToLoginPageIfRequired;

        $rootScope.homeState = 'panel.home';

        $scope.loading = $scope.loadingMessage = false;

        $rootScope.data.forceRefresh && $scope.refreshUserData();

        // Refresh user info every 1 minute
        var refreshUserDataPromise = $interval(refreshUserDataProvider(true), 60000);
        $scope.$on('$destroy', function() {
            $interval.cancel(refreshUserDataPromise);
        });

        $scope.setMenuHandlers({
            goToMainPage: function() {
                $state.go('panel.home');
            },
            goToAcceptPatient: function() {
                $state.go('panel.patient');
            },
            goToSendResults: function() {
                $state.go('panel.send', {
                    nationalCode: null,
                    previousState: null
                });
            },
            goToAcceptancesHistory: function() {
                $state.go('panel.acceptance');
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
            goToPanelAbout: function() {
                $state.go('panel.about');
            },
            goToPanelContact: function() {
                $state.go('panel.contact');
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

        if (!!userService.getUserPersistent()) {
            $scope.refreshUserData();
        }

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
                }, function(code) {
                    sscAlert(code);
                    $scope.redirectToLoginPageIfRequired(code);
                }).then(function() {
                    silent || $scope.setLoading(false);
                });
            };
        }

        function redirectToLoginPageIfRequired(code) {
            if (code === 100 || code === 101 || code === 50 || code === 52) {
                $scope.menuHandlers.logout();
            }
        }

    }
]);


/*
	AHS502 : End of 'panel-controller.js'
*/


/*
	AHS502 : Start of 'start-controller.js'
*/

/*global app*/
/*global localStorage*/

app.controller('StartController', ['$q', '$scope', '$state', '$stateParams', '$location', '$timeout',
    function($q, $scope, $state, $stateParams, $location, $timeout) {

        var init, initCoded = $stateParams.init;
        try {
            init = initCoded && JSON.parse(initCoded);
        }
        catch (err) {}
        init = init || {};

        var startupMessage = init.startupMessage;

        (!startupMessage ? $q.when() :
            initiateDelay().then(function() {
                return $scope.showMessage(startupMessage.title, startupMessage.message, startupMessage.ok);
            }))
        .then(function() {
            var startupState =
                init.patientIn ? 'home.patient' :
                init.seeHistory ? 'home.otp' :
                init.laboratoryLogin ? 'lab.login' :
                localStorage.startState;
            // return (startupState ? $q.when(startupState) :
            //     initiateDelay().then(function() {
            //         return $scope.showConfirmMessage("انتخاب نوع کاربری از سامانه",
            //             "آیا شما می خواهید به عنوان آزمایشگاه به سامانه وارد شوید یا به عنوان آزمایش دهنده؟",
            //             "آزمایش دهنده", "آزمایشگاه",
            //             'green', 'green');
            //     }).then(function() {
            //         return 'home.find';
            //     }).catch(function() {
            //         return 'lab.login';
            //     }));
            return startupState || 'home.find';
        }).then(function(state) {
            $state.go(state);
        });

        var delayIsInitiated = false;

        //TODO: Do something else instead:
        function initiateDelay() {
            if (delayIsInitiated) return $q.when();
            delayIsInitiated = true;
            return $timeout(function() {}, 500);
        }

    }
]);


/*
	AHS502 : End of 'start-controller.js'
*/


/*
	AHS502 : Start of 'accept-persian-numbers.js'
*/

/*global app*/
/*global toPersianNumber*/
/*global toLatinNumber*/

app.directive('acceptPersianNumbers', function() {
    return {
        restrict: 'A',
        require: 'ngModel',

        replace: false,
        transclude: false,
        scope: false,

        link: function(scope, instanceElement, instanceAttributes, ngModel) {

            ngModel.$formatters.push(function(value) {
                return toPersianNumber(value);
            });

            ngModel.$parsers.push(function(value) {
                var viewValue = toPersianNumber(value);
                if (viewValue !== ngModel.$viewValue) {
                    ngModel.$setViewValue(viewValue);
                    ngModel.$render();
                }
                return toLatinNumber(value);
            });

        }
    };
});


/*
	AHS502 : End of 'accept-persian-numbers.js'
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
	AHS502 : Start of 'table-list-container.js'
*/

/*global angular*/
/*global app*/

app.directive('tableListContainer', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        replace: false,
        transclude: false,
        scope: false,

        compile: function(templateElement, templateAttribute) {

            var table = templateElement.find('table');
            var thead = table.find('thead');
            var tbody = table.find('tbody');

            var tableMinWidth = templateAttribute['tableListContainer'];
            if (tableMinWidth) {
                table.css('min-width', tableMinWidth);
            }

            [{
                element: thead,
                selector: 'th'
            }, {
                element: tbody,
                selector: 'td'
            }]
            .forEach(function(item) {
                item.element.length && item.element.find(item.selector).each(function(index) {
                    var tx = angular.element(this);
                    if (tx.is('[fa]')) {
                        tx.addClass('nazanin');
                        tx.addClass('ja-rtl');
                        tx.removeAttr('fa');
                    }
                    else {
                        tx.addClass('ja-ltr');
                    }
                    if (tx.is('[r]')) {
                        tx.addClass('ja-align-right');
                        tx.removeAttr('r');
                    }
                    if (tx.is('[l]')) {
                        tx.addClass('ja-align-left');
                        tx.removeAttr('l');
                    }
                    if (tx.is('[c]')) {
                        tx.addClass('ja-align-center');
                        tx.removeAttr('c');
                    }
                    if (tx.is('[b]')) {
                        tx.addClass('ja-bold');
                        tx.removeAttr('b');
                    }
                    if (tx.is('[i]')) {
                        tx.addClass('ja-italic');
                        tx.removeAttr('i');
                    }
                });
            });

            return function link(scope, instanceElement, instanceAttributes) {

                if (instanceElement.is('[initialiy-right]')) {
                    scope.$watch(getToBeScrolled, scrollToRight);
                }

                function scrollToRight() {
                    var toBeScrolled = getToBeScrolled();
                    if (!toBeScrolled) return;
                    // instanceElement.scrollLeft(0);
                    instanceElement.animate({
                        scrollLeft: toBeScrolled
                    }, 1000);
                }

                function getToBeScrolled() {
                    return instanceElement[0].scrollWidth - instanceElement[0].clientWidth;
                }

            };

        },

    };
}]);


/*
	AHS502 : End of 'table-list-container.js'
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
	AHS502 : Start of 'currency-separator.js'
*/

/*global app*/

app.filter('currencySeparator', function() {
    return function(input, seperator) {
        input = String(input || '');
        seperator = seperator || ',';
        var output = '';
        while (input.length) {
            output = input.slice(-3) + output;
            input = input.slice(0, -3);
            if (input.length) output = seperator + output;
        }
        return output;
    };
});


/*
	AHS502 : End of 'currency-separator.js'
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
    };
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
