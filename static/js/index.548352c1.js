(function(e){function n(n){for(var t,i,u=n[0],s=n[1],c=n[2],l=0,g=[];l<u.length;l++)i=u[l],a[i]&&g.push(a[i][0]),a[i]=0;for(t in s)Object.prototype.hasOwnProperty.call(s,t)&&(e[t]=s[t]);p&&p(n);while(g.length)g.shift()();return o.push.apply(o,c||[]),r()}function r(){for(var e,n=0;n<o.length;n++){for(var r=o[n],t=!0,i=1;i<r.length;i++){var s=r[i];0!==a[s]&&(t=!1)}t&&(o.splice(n--,1),e=u(u.s=r[0]))}return e}var t={},a={index:0},o=[];function i(e){return u.p+"static/js/"+({"pages-index-index":"pages-index-index","pages-product-buy":"pages-product-buy","pages-product-detail~pages-public-login~pages-public-register":"pages-product-detail~pages-public-login~pages-public-register","pages-product-detail~pages-user-vipbuy":"pages-product-detail~pages-user-vipbuy","pages-product-detail":"pages-product-detail","pages-public-login":"pages-public-login","pages-public-register":"pages-public-register","pages-user-vipbuy":"pages-user-vipbuy","pages-user-user":"pages-user-user"}[e]||e)+"."+{"pages-index-index":"50994121","pages-product-buy":"f0bf0d06","pages-product-detail~pages-public-login~pages-public-register":"625118b7","pages-product-detail~pages-user-vipbuy":"2719ef5a","pages-product-detail":"3d501c66","pages-public-login":"1d99eff2","pages-public-register":"cd077f01","pages-user-vipbuy":"e45d48d8","pages-user-user":"9c3e850e"}[e]+".js"}function u(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,u),r.l=!0,r.exports}u.e=function(e){var n=[],r=a[e];if(0!==r)if(r)n.push(r[2]);else{var t=new Promise((function(n,t){r=a[e]=[n,t]}));n.push(r[2]=t);var o,s=document.createElement("script");s.charset="utf-8",s.timeout=120,u.nc&&s.setAttribute("nonce",u.nc),s.src=i(e),o=function(n){s.onerror=s.onload=null,clearTimeout(c);var r=a[e];if(0!==r){if(r){var t=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src,i=new Error("Loading chunk "+e+" failed.\n("+t+": "+o+")");i.type=t,i.request=o,r[1](i)}a[e]=void 0}};var c=setTimeout((function(){o({type:"timeout",target:s})}),12e4);s.onerror=s.onload=o,document.head.appendChild(s)}return Promise.all(n)},u.m=e,u.c=t,u.d=function(e,n,r){u.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,n){if(1&n&&(e=u(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(u.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var t in e)u.d(r,t,function(n){return e[n]}.bind(null,t));return r},u.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(n,"a",n),n},u.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},u.p="/",u.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=n,s=s.slice();for(var l=0;l<s.length;l++)n(s[l]);var p=c;o.push([0,"chunk-vendors"]),r()})({0:function(e,n,r){e.exports=r("ebe6")},"072d":function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.Config=void 0;var t={appid:"wx1caf6a340248d440",restUrl:"http://www.fufei.com/api/jhx-edu/v1/",qqmapkey:"IC2BZ-4NWK6-CXYSM-M2K7Z-PKUIS-PDBGZ",domain:"https://xcx.jihexian.com/",payList:["wxpay"]};n.Config=t},"0af9":function(e,n,r){r("c975"),r("a9e3"),r("4d63"),r("ac1f"),r("25f0"),r("1276"),e.exports={error:"",check:function(e,n){for(var r=0;r<n.length;r++){if(!n[r].checkType)return!0;if(!n[r].name)return!0;if(!n[r].errorMsg)return!0;if(!e[n[r].name])return this.error=n[r].errorMsg,!1;switch(n[r].checkType){case"string":var t=new RegExp("^.{"+n[r].checkRule+"}$");if(!t.test(e[n[r].name]))return this.error=n[r].errorMsg,!1;break;case"int":t=new RegExp("^(-[1-9]|[1-9])[0-9]{"+n[r].checkRule+"}$");if(!t.test(e[n[r].name]))return this.error=n[r].errorMsg,!1;break;case"between":if(!this.isNumber(e[n[r].name]))return this.error=n[r].errorMsg,!1;var a=n[r].checkRule.split(",");if(a[0]=Number(a[0]),a[1]=Number(a[1]),e[n[r].name]>a[1]||e[n[r].name]<a[0])return this.error=n[r].errorMsg,!1;break;case"betweenD":t=/^-?[1-9][0-9]?$/;if(!t.test(e[n[r].name]))return this.error=n[r].errorMsg,!1;a=n[r].checkRule.split(",");if(a[0]=Number(a[0]),a[1]=Number(a[1]),e[n[r].name]>a[1]||e[n[r].name]<a[0])return this.error=n[r].errorMsg,!1;break;case"betweenF":t=/^-?[0-9][0-9]?.+[0-9]+$/;if(!t.test(e[n[r].name]))return this.error=n[r].errorMsg,!1;a=n[r].checkRule.split(",");if(a[0]=Number(a[0]),a[1]=Number(a[1]),e[n[r].name]>a[1]||e[n[r].name]<a[0])return this.error=n[r].errorMsg,!1;break;case"same":if(e[n[r].name]!=n[r].checkRule)return this.error=n[r].errorMsg,!1;break;case"notsame":if(e[n[r].name]==n[r].checkRule)return this.error=n[r].errorMsg,!1;break;case"email":t=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;if(!t.test(e[n[r].name]))return this.error=n[r].errorMsg,!1;break;case"phoneno":t=/^1[0-9]{10,10}$/;if(!t.test(e[n[r].name]))return this.error=n[r].errorMsg,!1;break;case"zipcode":t=/^[0-9]{6}$/;if(!t.test(e[n[r].name]))return this.error=n[r].errorMsg,!1;break;case"reg":t=new RegExp(n[r].checkRule);if(!t.test(e[n[r].name]))return this.error=n[r].errorMsg,!1;break;case"in":if(-1==n[r].checkRule.indexOf(e[n[r].name]))return this.error=n[r].errorMsg,!1;break;case"notnull":if(null==e[n[r].name]||e[n[r].name].length<1)return this.error=n[r].errorMsg,!1;break}}return!0},isNumber:function(e){var n=/^-?[1-9][0-9]?.?[0-9]*$/;return n.test(e)}}},"358f":function(e,n,r){"use strict";var t,a=function(){var e=this,n=e.$createElement,r=e._self._c||n;return r("App",{attrs:{keepAliveInclude:e.keepAliveInclude}})},o=[];r.d(n,"b",(function(){return a})),r.d(n,"c",(function(){return o})),r.d(n,"a",(function(){return t}))},"45d9":function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={loginByPassRule:[{name:"mobile",checkType:"notnull",checkRule:"",errorMsg:"手机号不能为空"},{name:"mobile",checkType:"phoneno",checkRule:"",errorMsg:"手机号格式不正确"},{name:"password",checkType:"string",checkRule:"6,18",errorMsg:"请输入6-18位密码"}],loginByCodeRule:[{name:"mobile",checkType:"notnull",checkRule:"",errorMsg:"手机号不能为空"},{name:"mobile",checkType:"phoneno",checkRule:"",errorMsg:"手机号格式不正确"},{name:"code",checkType:"string",checkRule:"4",errorMsg:"请输入4位验证码"}],sendCodeRule:[{name:"mobile",checkType:"notnull",checkRule:"",errorMsg:"手机号不能为空"},{name:"mobile",checkType:"phoneno",checkRule:"",errorMsg:"手机号格式不正确"}],pInvoiceRule:[{name:"title",checkType:"notnull",checkRule:"",errorMsg:"发票抬头不能为空"}],cInvoiceRule:[{name:"title",checkType:"notnull",checkRule:"",errorMsg:"发票抬头不能为空"},{name:"duty_paragraph",checkType:"notnull",checkRule:"",errorMsg:"发票税号不能为空"}],registerRule:[{name:"mobile",checkType:"notnull",checkRule:"",errorMsg:"手机号不能为空"},{name:"mobile",checkType:"phoneno",checkRule:"",errorMsg:"手机号格式不正确"},{name:"code",checkType:"string",checkRule:"4",errorMsg:"请输入4位验证码"},{name:"password",checkType:"string",checkRule:"6,18",errorMsg:"请输入6-18位密码"}],resetPasswordRule:[{name:"mobile",checkType:"notnull",checkRule:"",errorMsg:"手机号不能为空"},{name:"mobile",checkType:"phoneno",checkRule:"",errorMsg:"手机号格式不正确"},{name:"code",checkType:"string",checkRule:"4",errorMsg:"请输入4位验证码"},{name:"password",checkType:"string",checkRule:"6,18",errorMsg:"请输入6-18位密码"}]};n.default=t},5373:function(e,n,r){"use strict";r.r(n);var t=r("358f"),a=r("f167");for(var o in a)"default"!==o&&function(e){r.d(n,e,(function(){return a[e]}))}(o);r("c183");var i,u=r("f0c5"),s=Object(u["a"])(a["default"],t["b"],t["c"],!1,null,null,null,!1,t["a"],i);n["default"]=s.exports},"54fc":function(e,n,r){var t=r("24fb");n=t(!1),n.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/* 解决头条小程序组件内引入字体不生效的问题 */body{background-color:#f5f7fa;font-size:%?28?%}.bgfff{background-color:#fff}.title{padding:%?20?% 0 %?20?% 4%;font-weight:700;font-size:%?30?%}.price-normal{font-size:%?28?%;font-weight:700}.price-big{font-size:%?40?%;font-weight:700}.common-line{display:-webkit-box;display:-webkit-flex;display:flex;padding:%?25?% 0}.common-line .label{color:#999;width:%?150?%}.hide{display:none}',""]),e.exports=n},"6f48":function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t=r("f1a4"),a=r("be0a"),o=new t.Base,i=new a.Common,u={onLaunch:function(){console.log("App Launch"),i.isWechat()&&!uni.getStorageSync("accessToken")&&o.auth()},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")},methods:{}};n.default=u},"74fe":function(e,n,r){var t=r("54fc");"string"===typeof t&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals);var a=r("4f06").default;a("137b9ae6",t,!0,{sourceMap:!1,shadowMode:!1})},7813:function(e,n,r){"use strict";(function(e){var n=r("ee27"),t=n(r("e143"));e["________"]=!0,delete e["________"],e.__uniConfig={globalStyle:{navigationBarTextStyle:"white",navigationBarTitleText:"知识付费",navigationBarBackgroundColor:"#ef7c38",backgroundColor:"#FFFFFF"},tabBar:{color:"#C0C4CC",selectedColor:"#ef7c38",borderStyle:"black",backgroundColor:"#ffffff",list:[{pagePath:"pages/index/index",iconPath:"static/tab-home.png",selectedIconPath:"static/tab-home-on.png",text:"首页",redDot:!1,badge:""},{pagePath:"pages/category/category",iconPath:"static/tab-product.png",selectedIconPath:"static/tab-product-on.png",text:"课程",redDot:!1,badge:""},{pagePath:"pages/user/user",iconPath:"static/tab-my.png",selectedIconPath:"static/tab-my-on.png",text:"我的",redDot:!1,badge:""}]}},e.__uniConfig.router={mode:"hash",base:"/"},e.__uniConfig.publicPath="/",e.__uniConfig["async"]={loading:"AsyncLoading",error:"AsyncError",delay:200,timeout:6e4},e.__uniConfig.debug=!1,e.__uniConfig.networkTimeout={request:6e4,connectSocket:6e4,uploadFile:6e4,downloadFile:6e4},e.__uniConfig.sdkConfigs={},e.__uniConfig.qqMapKey="XVXBZ-NDMC4-JOGUS-XGIEE-QVHDZ-AMFV2",e.__uniConfig.nvue={"flex-direction":"column"},t.default.component("pages-index-index",(function(e){var n={component:r.e("pages-index-index").then(function(){return e(r("b862"))}.bind(null,r)).catch(r.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(n.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(n.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),n})),t.default.component("pages-product-detail",(function(e){var n={component:Promise.all([r.e("pages-product-detail~pages-public-login~pages-public-register"),r.e("pages-product-detail~pages-user-vipbuy"),r.e("pages-product-detail")]).then(function(){return e(r("5b5a"))}.bind(null,r)).catch(r.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(n.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(n.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),n})),t.default.component("pages-product-buy",(function(e){var n={component:r.e("pages-product-buy").then(function(){return e(r("4699"))}.bind(null,r)).catch(r.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(n.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(n.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),n})),t.default.component("pages-public-login",(function(e){var n={component:Promise.all([r.e("pages-product-detail~pages-public-login~pages-public-register"),r.e("pages-public-login")]).then(function(){return e(r("694e"))}.bind(null,r)).catch(r.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(n.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(n.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),n})),t.default.component("pages-public-register",(function(e){var n={component:Promise.all([r.e("pages-product-detail~pages-public-login~pages-public-register"),r.e("pages-public-register")]).then(function(){return e(r("95d5"))}.bind(null,r)).catch(r.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(n.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(n.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),n})),t.default.component("pages-user-user",(function(e){var n={component:r.e("pages-user-user").then(function(){return e(r("4486"))}.bind(null,r)).catch(r.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(n.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(n.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),n})),t.default.component("pages-user-vipbuy",(function(e){var n={component:Promise.all([r.e("pages-product-detail~pages-user-vipbuy"),r.e("pages-user-vipbuy")]).then(function(){return e(r("0176"))}.bind(null,r)).catch(r.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(n.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(n.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),n})),e.__uniRoutes=[{path:"/",alias:"/pages/index/index",component:{render:function(e){return e("Page",{props:Object.assign({isQuit:!0,isEntry:!0,isTabBar:!0,tabBarIndex:0},__uniConfig.globalStyle,{enablePullDownRefresh:!0,navigationBarTitleText:"知识付费",titleNView:!1,pullToRefresh:{support:!0,color:"#fa436a",style:"default"}})},[e("pages-index-index",{slot:"page"})])}},meta:{id:1,name:"pages-index-index",isNVue:!1,pagePath:"pages/index/index",isQuit:!0,isEntry:!0,isTabBar:!0,tabBarIndex:0,windowTop:0}},{path:"/pages/product/detail",component:{render:function(e){return e("Page",{props:Object.assign({},__uniConfig.globalStyle,{navigationBarTitleText:"课程详情"})},[e("pages-product-detail",{slot:"page"})])}},meta:{name:"pages-product-detail",isNVue:!1,pagePath:"pages/product/detail",windowTop:44}},{path:"/pages/product/buy",component:{render:function(e){return e("Page",{props:Object.assign({},__uniConfig.globalStyle,{navigationBarTitleText:"课程购买"})},[e("pages-product-buy",{slot:"page"})])}},meta:{name:"pages-product-buy",isNVue:!1,pagePath:"pages/product/buy",windowTop:44}},{path:"/pages/public/login",component:{render:function(e){return e("Page",{props:Object.assign({},__uniConfig.globalStyle,{navigationBarTitleText:"账号登录"})},[e("pages-public-login",{slot:"page"})])}},meta:{name:"pages-public-login",isNVue:!1,pagePath:"pages/public/login",windowTop:44}},{path:"/pages/public/register",component:{render:function(e){return e("Page",{props:Object.assign({},__uniConfig.globalStyle,{navigationBarTitleText:"账号注册"})},[e("pages-public-register",{slot:"page"})])}},meta:{name:"pages-public-register",isNVue:!1,pagePath:"pages/public/register",windowTop:44}},{path:"/pages/user/user",component:{render:function(e){return e("Page",{props:Object.assign({isQuit:!0,isTabBar:!0,tabBarIndex:2},__uniConfig.globalStyle,{navigationBarTitleText:"个人中心"})},[e("pages-user-user",{slot:"page"})])}},meta:{id:2,name:"pages-user-user",isNVue:!1,pagePath:"pages/user/user",isQuit:!0,isTabBar:!0,tabBarIndex:2,windowTop:44}},{path:"/pages/user/vipbuy",component:{render:function(e){return e("Page",{props:Object.assign({},__uniConfig.globalStyle,{navigationBarTitleText:"购买会员"})},[e("pages-user-vipbuy",{slot:"page"})])}},meta:{name:"pages-user-vipbuy",isNVue:!1,pagePath:"pages/user/vipbuy",windowTop:44}},{path:"/preview-image",component:{render:function(e){return e("Page",{props:{navigationStyle:"custom"}},[e("system-preview-image",{slot:"page"})])}},meta:{name:"preview-image",pagePath:"/preview-image"}},{path:"/choose-location",component:{render:function(e){return e("Page",{props:{navigationStyle:"custom"}},[e("system-choose-location",{slot:"page"})])}},meta:{name:"choose-location",pagePath:"/choose-location"}},{path:"/open-location",component:{render:function(e){return e("Page",{props:{navigationStyle:"custom"}},[e("system-open-location",{slot:"page"})])}},meta:{name:"open-location",pagePath:"/open-location"}}]}).call(this,r("c8ba"))},be0a:function(e,n,r){"use strict";var t=r("ee27");r("ac1f"),r("466d"),Object.defineProperty(n,"__esModule",{value:!0}),n.Common=void 0;var a=t(r("276c")),o=t(r("e954")),i=function(){function e(){(0,a.default)(this,e)}return(0,o.default)(e,[{key:"isWechat",value:function(){var e=window.navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/micromessenger/i)}},{key:"contentType",value:function(e){var n="";switch(e){case"1":n="图文";break;case"2":console.log(11111),n="音频";break;case"3":n="视频";break;default:break}return{text:n}}}]),e}();n.Common=i},c183:function(e,n,r){"use strict";var t=r("74fe"),a=r.n(t);a.a},ebe6:function(e,n,r){"use strict";var t=r("ee27");r("99af"),r("4d63"),r("ac1f"),r("25f0"),r("466d"),r("841c");var a=t(r("f3f3"));r("e260"),r("e6cf"),r("cca6"),r("a79d"),r("7813"),r("1c31");var o=t(r("e143")),i=t(r("5373")),u=t(r("0af9")),s=t(r("45d9"));o.default.prototype.$mGraceChecker=u.default,o.default.prototype.$mFormRule=s.default,o.default.config.productionTip=!1,o.default.prototype.getUrlParam=function(e){var n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),r=window.location.search.substr(1).match(n);return null!=r?unescape(r[2]):null},o.default.prototype.createUrl=function(e,n){var r=e||"/",t="";return n instanceof Array?r:n instanceof Object?(t=this.objParseParam(n),t&&(r+="?"),r+=t,r):r},o.default.prototype.objParseParam=function(e){var n="";if(e instanceof Array)return n;if(!(e instanceof Object))return n;for(var r in e)n+="".concat(r,"=").concat(e[r],"&");return n.substring(0,n.length-1)},o.default.prototype.isVip=function(){var e=uni.getStorageSync("userInfo");if(e){var n=(new Date).getTime()/1e3;if(1===e.is_vip&&n<e.vip_expire)return!0}return!1},i.default.mpType="app";var c=new o.default((0,a.default)({},i.default));c.$mount()},f167:function(e,n,r){"use strict";r.r(n);var t=r("6f48"),a=r.n(t);for(var o in t)"default"!==o&&function(e){r.d(n,e,(function(){return t[e]}))}(o);n["default"]=a.a},f1a4:function(e,n,r){"use strict";var t=r("ee27");r("99af"),r("4160"),r("ac1f"),r("5319"),r("841c"),r("1276"),r("159b"),Object.defineProperty(n,"__esModule",{value:!0}),n.Base=void 0,r("96cf");var a=t(r("c964")),o=t(r("276c")),i=t(r("e954")),u=r("072d"),s=r("be0a"),c=new s.Common,l=function(){function e(){(0,o.default)(this,e),this.baseRestUrl=u.Config.restUrl,this.tokenUrl=this.baseRestUrl+"xcx-member/xcx-login"}return(0,i.default)(e,[{key:"request",value:function(e){var n=this;uni.request({url:this.baseRestUrl+e.url,data:e.data,method:e.method?e.method:"POST",header:{"x-api-key":uni.getStorageSync("accessToken")},success:function(r){switch(r.data.code){case 200:e.sCallback&&e.sCallback(r.data);break;case 401:n.reLogin();break;case 500:uni.showToast({icon:"none",title:"服务器异常，请稍后重试",duration:2e3}),e.sCallback&&e.sCallback(r.data);break;case 400:uni.showToast({icon:"none",title:"没有权限",duration:2e3}),e.sCallback&&e.sCallback(r.data);break;default:uni.showToast({icon:"none",title:r.data.message?r.data.message:"操作失败",duration:2e3}),e.sCallback&&e.sCallback(r.data);break}}})}},{key:"auth",value:function(){var e=this,n=window.location.href,r=this.getUrlParam(n);if(r.code)this.wxAuth(r.code,(function(n){if(1==n.data.wx_register){var r=n.data.user.original;uni.setStorageSync("accessToken",n.data.user_info.access_token),uni.setStorageSync("refreshToken",n.data.user_info.refresh_token),uni.setStorageSync("userInfo",r),console.log(r);var t={};t.user_info=r,t.oauth_client="wechat",t.gender=r.sex||r.gender,t.oauth_client_user_id=r.openid||r.openId,t.head_portrait=r.headimgurl||r.avatarUrl,e.bind(t,(function(e){e.data&&uni.setStorageSync("userInfo",e.data)}))}else if(n.data.login){var a=n.data.user_info;uni.setStorageSync("accessToken",a.access_token),uni.setStorageSync("refreshToken",a.refresh_token),uni.setStorageSync("userInfo",a.member)}}));else{var t=u.Config.appid,a=encodeURIComponent(n),o="https://open.weixin.qq.com/connect/oauth2/authorize?appid=".concat(t,"&redirect_uri=").concat(a,"&response_type=code&scope=snsapi_userinfo&state=123");window.location.href=o}}},{key:"wxAuth",value:function(e,n){var r={url:"third-party/wechat",data:{code:e},method:"get",sCallback:function(e){n&&n(e)}};this.request(r)}},{key:"bind",value:function(e,n){var r={url:"member/auth/create",data:e,method:"post",sCallback:function(e){n&&n(e)}};this.request(r)}},{key:"getUrlParam",value:function(e){e=e||location.search;var n=e.replace(/^[^\?]*\?/i,"").split("&"),r={};return Array.isArray(n)&&n.forEach((function(e){var n=e.split("=");r[n[0]]=n[1]})),r}},{key:"reLogin",value:function(){var e=(0,a.default)(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=getCurrentPages()[getCurrentPages().length-1],r={},r.route="/".concat(n.$vm.route),r.query=n.$vm.$mp&&n.$vm.$mp.query,e.next=6,uni.setStorageSync("backToPage",JSON.stringify(r));case 6:c.isWechat()?this.auth():uni.navigateTo({url:"/pages/public/login"});case 7:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}()}]),e}();n.Base=l}});