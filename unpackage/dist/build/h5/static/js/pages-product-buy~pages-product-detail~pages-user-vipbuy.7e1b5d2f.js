(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-product-buy~pages-product-detail~pages-user-vipbuy"],{"23e9":function(e,n,t){"use strict";var i=t("ee27");Object.defineProperty(n,"__esModule",{value:!0}),n.Wx=void 0;var r=i(t("276c")),a=i(t("e954")),o=i(t("92a6")),c=i(t("920b")),s=t("9373"),u=function(e){(0,c.default)(t,e);var n=(0,o.default)(t);function t(){return(0,r.default)(this,t),n.call(this)}return(0,a.default)(t,[{key:"sdkConfig",value:function(e,n){var t={url:"third-party/wechat-js-sdk",data:e,method:"post",sCallback:function(e){n&&n(e)}};this.request(t)}},{key:"payCreate",value:function(e,n){var t={url:"common/pay/create",data:e,method:"post",sCallback:function(e){n&&n(e)}};this.request(t)}}]),t}(s.Base);n.Wx=u},5757:function(e,n){function t(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}e.exports=t},ab74:function(e,n,t){"use strict";var i=t("ee27");t("ac1f"),t("466d"),t("1276"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=i(t("f3f3"));t("96cf");var a=i(t("c964")),o=t("23e9"),c=(t("b65f"),new o.Wx),s=t("fe10"),u={isWechat:function(){var e=window.navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/micromessenger/i)},wxConfigH5:function(){var e=this;return(0,a.default)(regeneratorRuntime.mark((function n(){var t,i,r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:e.isWechat()&&(t=["chooseWXPay","updateAppMessageShareData","updateTimelineShareData"],i=JSON.stringify(t),r={url:location.href.split("#")[0],jsApiList:i,debug:!1},c.sdkConfig(r,(function(e){var n={debug:!1,appId:e.data.appId,timestamp:e.data.timestamp,nonceStr:e.data.nonceStr,signature:e.data.signature,jsApiList:e.data.jsApiList};s.config(n)})));case 1:case"end":return n.stop()}}),n)})))()},weixinPay:function(){var e=arguments,n=this;return(0,a.default)(regeneratorRuntime.mark((function t(){var i,a,o,u;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(i=e.length>0&&void 0!==e[0]?e[0]:"",a=e.length>1&&void 0!==e[1]?e[1]:"",o=e.length>2&&void 0!==e[2]?e[2]:{},n.isWechat()){t.next=6;break}return uni.showToast({icon:"none",title:"仅支持微信和微信小程序支付"}),t.abrupt("return");case 6:i?s.ready((function(){s.chooseWXPay((0,r.default)({},i,{success:function(){mHelper.toast("支付成功"),mRouter.push({route:"/pages/user/money/success"})},fail:function(e){uni.showToast({icon:"none",title:"支付失败："+e.errMsg})}}))})):(u={order_group:a,pay_type:1,trade_type:"js",data:o,openid:res.data.openid},c.payCreate(u,(function(e){s.ready((function(){s.chooseWXPay((0,r.default)({},e.data.config,{success:function(){mHelper.toast("支付成功"),mRouter.push({route:"/pages/user/money/success"})},fail:function(e){mHelper.toast("支付失败："+e.errMsg)}}))}))})));case 7:case"end":return t.stop()}}),t)})))()},aliPay:function(e,n){return(0,a.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,http.post("".concat(payCreate),{order_group:e,pay_type:2,trade_type:"wap",data:n}).then((function(e){window.location.href=e.data.config.config}));case 2:case"end":return t.stop()}}),t)})))()},balancePay:function(e){return(0,a.default)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,http.post("".concat(orderPay),{order_group:"order",trade_type:"js",pay_type:5,data:e}).then((function(){mHelper.toast("支付成功~"),mRouter.push({route:"/pages/user/money/success"})}));case 2:case"end":return n.stop()}}),n)})))()}};n.default=u},e2a7:function(e,n,t){"use strict";var i=t("ee27");Object.defineProperty(n,"__esModule",{value:!0}),n.User=void 0;var r=i(t("276c")),a=i(t("e954")),o=i(t("92a6")),c=i(t("920b")),s=t("9373"),u=function(e){(0,c.default)(t,e);var n=(0,o.default)(t);function t(){return(0,r.default)(this,t),n.call(this)}return(0,a.default)(t,[{key:"isBind",value:function(e,n){var t={url:"member/auth/is-binding",data:e,method:"post",sCallback:function(e){n&&n(e)}};this.request(t)}},{key:"index",value:function(e,n){var t={url:"member/member/index",data:e,method:"get",sCallback:function(e){n&&n(e)}};this.request(t)}},{key:"vipList",value:function(e,n){var t={url:"member/member/vip-list",data:e,method:"get",sCallback:function(e){n&&n(e)}};this.request(t)}},{key:"vipMin",value:function(e,n){var t={url:"member/member/vip-min",data:e,method:"get",sCallback:function(e){n&&n(e)}};this.request(t)}},{key:"footPrint",value:function(e,n){var t={url:"member/footprint/index",data:e,method:"get",sCallback:function(e){n&&n(e)}};this.request(t)}}]),t}(s.Base);n.User=u},fe10:function(e,n,t){var i;t("c975"),t("ac1f"),t("466d"),t("5319"),t("1276");var r=t("5757");!function(r,a){i=function(){return a(r)}.call(n,t,n,e),void 0===i||(e.exports=i)}(window,(function(e,n){if(!e.jWeixin){var t,i,a={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},o=function(){var e={};for(var n in a)e[a[n]]=n;return e}(),c=e.document,s=c.title,u=navigator.userAgent.toLowerCase(),d=navigator.platform.toLowerCase(),l=!(!d.match("mac")&&!d.match("win")),p=-1!=u.indexOf("wxdebugger"),f=-1!=u.indexOf("micromessenger"),m=-1!=u.indexOf("android"),g=-1!=u.indexOf("iphone")||-1!=u.indexOf("ipad"),h=(i=u.match(/micromessenger\/(\d+\.\d+\.\d+)/)||u.match(/micromessenger\/(\d+\.\d+)/))?i[1]:"",v={initStartTime:O(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},y={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:g?1:m?2:-1,clientVersion:h,url:encodeURIComponent(location.href)},w={},S={_completes:[]},k={state:0,data:{}};R((function(){v.initEndTime=O()}));var _=!1,I=[],T=(t={config:function(n){B("config",w=n);var t=!1!==w.check;R((function(){if(t)M(a.config,{verifyJsApiList:L(w.jsApiList),verifyOpenTagList:L(w.openTagList)},function(){S._complete=function(e){v.preVerifyEndTime=O(),k.state=1,k.data=e},S.success=function(e){y.isPreVerifyOk=0},S.fail=function(e){S._fail?S._fail(e):k.state=-1};var e=S._completes;return e.push((function(){!function(){if(!(l||p||w.debug||h<"6.0.2"||y.systemType<0)){var e=new Image;y.appId=w.appId,y.initTime=v.initEndTime-v.initStartTime,y.preVerifyTime=v.preVerifyEndTime-v.preVerifyStartTime,T.getNetworkType({isInnerInvoke:!0,success:function(n){y.networkType=n.networkType;var t="https://open.weixin.qq.com/sdk/report?v="+y.version+"&o="+y.isPreVerifyOk+"&s="+y.systemType+"&c="+y.clientVersion+"&a="+y.appId+"&n="+y.networkType+"&i="+y.initTime+"&p="+y.preVerifyTime+"&u="+y.url;e.src=t}})}}()})),S.complete=function(n){for(var t=0,i=e.length;t<i;++t)e[t]();S._completes=[]},S}()),v.preVerifyStartTime=O();else{k.state=1;for(var e=S._completes,n=0,i=e.length;n<i;++n)e[n]();S._completes=[]}})),T.invoke||(T.invoke=function(n,t,i){e.WeixinJSBridge&&WeixinJSBridge.invoke(n,C(t),i)},T.on=function(n,t){e.WeixinJSBridge&&WeixinJSBridge.on(n,t)})},ready:function(e){0!=k.state?e():(S._completes.push(e),!f&&w.debug&&e())},error:function(e){h<"6.0.2"||(-1==k.state?e(k.data):S._fail=e)},checkJsApi:function(e){M("checkJsApi",{jsApiList:L(e.jsApiList)},(e._complete=function(e){if(m){var n=e.checkResult;n&&(e.checkResult=JSON.parse(n))}e=function(e){var n=e.checkResult;for(var t in n){var i=o[t];i&&(n[i]=n[t],delete n[t])}return e}(e)},e))},onMenuShareTimeline:function(e){P(a.onMenuShareTimeline,{complete:function(){M("shareTimeline",{title:e.title||s,desc:e.title||s,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){P(a.onMenuShareAppMessage,{complete:function(n){"favorite"===n.scene?M("sendAppMessage",{title:e.title||s,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""}):M("sendAppMessage",{title:e.title||s,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){P(a.onMenuShareQQ,{complete:function(){M("shareQQ",{title:e.title||s,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){P(a.onMenuShareWeibo,{complete:function(){M("shareWeiboApp",{title:e.title||s,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){P(a.onMenuShareQZone,{complete:function(){M("shareQZone",{title:e.title||s,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},updateTimelineShareData:function(e){M("updateTimelineShareData",{title:e.title,link:e.link,imgUrl:e.imgUrl},e)},updateAppMessageShareData:function(e){M("updateAppMessageShareData",{title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl},e)},startRecord:function(e){M("startRecord",{},e)},stopRecord:function(e){M("stopRecord",{},e)},onVoiceRecordEnd:function(e){P("onVoiceRecordEnd",e)},playVoice:function(e){M("playVoice",{localId:e.localId},e)},pauseVoice:function(e){M("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){M("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){P("onVoicePlayEnd",e)},uploadVoice:function(e){M("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){M("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){M("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){M("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},(e._complete=function(e){if(m){var n=e.localIds;try{n&&(e.localIds=JSON.parse(n))}catch(e){}}},e))},getLocation:function(e){},previewImage:function(e){M(a.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){M("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){M("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===_?(_=!0,M("getLocalImgData",{localId:e.localId},(e._complete=function(e){if(_=!1,0<I.length){var n=I.shift();wx.getLocalImgData(n)}},e))):I.push(e)},getNetworkType:function(e){M("getNetworkType",{},(e._complete=function(e){e=function(e){var n=e.errMsg;e.errMsg="getNetworkType:ok";var t=e.subtype;if(delete e.subtype,t)e.networkType=t;else{var i=n.indexOf(":"),r=n.substring(i+1);switch(r){case"wifi":case"edge":case"wwan":e.networkType=r;break;default:e.errMsg="getNetworkType:fail"}}return e}(e)},e))},openLocation:function(e){M("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)}},r(t,"getLocation",(function(e){M(a.getLocation,{type:(e=e||{}).type||"wgs84"},(e._complete=function(e){delete e.type},e))})),r(t,"hideOptionMenu",(function(e){M("hideOptionMenu",{},e)})),r(t,"showOptionMenu",(function(e){M("showOptionMenu",{},e)})),r(t,"closeWindow",(function(e){M("closeWindow",{},e=e||{})})),r(t,"hideMenuItems",(function(e){M("hideMenuItems",{menuList:e.menuList},e)})),r(t,"showMenuItems",(function(e){M("showMenuItems",{menuList:e.menuList},e)})),r(t,"hideAllNonBaseMenuItem",(function(e){M("hideAllNonBaseMenuItem",{},e)})),r(t,"showAllNonBaseMenuItem",(function(e){M("showAllNonBaseMenuItem",{},e)})),r(t,"scanQRCode",(function(e){M("scanQRCode",{needResult:(e=e||{}).needResult||0,scanType:e.scanType||["qrCode","barCode"]},(e._complete=function(e){if(g){var n=e.resultStr;if(n){var t=JSON.parse(n);e.resultStr=t&&t.scan_code&&t.scan_code.scan_result}}},e))})),r(t,"openAddress",(function(e){M(a.openAddress,{},(e._complete=function(e){e=function(e){return e.postalCode=e.addressPostalCode,delete e.addressPostalCode,e.provinceName=e.proviceFirstStageName,delete e.proviceFirstStageName,e.cityName=e.addressCitySecondStageName,delete e.addressCitySecondStageName,e.countryName=e.addressCountiesThirdStageName,delete e.addressCountiesThirdStageName,e.detailInfo=e.addressDetailInfo,delete e.addressDetailInfo,e}(e)},e))})),r(t,"openProductSpecificView",(function(e){M(a.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)})),r(t,"addCard",(function(e){for(var n=e.cardList,t=[],i=0,r=n.length;i<r;++i){var o=n[i],c={card_id:o.cardId,card_ext:o.cardExt};t.push(c)}M(a.addCard,{card_list:t},(e._complete=function(e){var n=e.card_list;if(n){for(var t=0,i=(n=JSON.parse(n)).length;t<i;++t){var r=n[t];r.cardId=r.card_id,r.cardExt=r.card_ext,r.isSuccess=!!r.is_succ,delete r.card_id,delete r.card_ext,delete r.is_succ}e.cardList=n,delete e.card_list}},e))})),r(t,"chooseCard",(function(e){M("chooseCard",{app_id:w.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},(e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e))})),r(t,"openCard",(function(e){for(var n=e.cardList,t=[],i=0,r=n.length;i<r;++i){var o=n[i],c={card_id:o.cardId,code:o.code};t.push(c)}M(a.openCard,{card_list:t},e)})),r(t,"consumeAndShareCard",(function(e){M(a.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)})),r(t,"chooseWXPay",(function(e){M(a.chooseWXPay,A(e),e)})),r(t,"openEnterpriseRedPacket",(function(e){M(a.openEnterpriseRedPacket,A(e),e)})),r(t,"startSearchBeacons",(function(e){M(a.startSearchBeacons,{ticket:e.ticket},e)})),r(t,"stopSearchBeacons",(function(e){M(a.stopSearchBeacons,{},e)})),r(t,"onSearchBeacons",(function(e){P(a.onSearchBeacons,e)})),r(t,"openEnterpriseChat",(function(e){M("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)})),r(t,"launchMiniProgram",(function(e){M("launchMiniProgram",{targetAppId:e.targetAppId,path:function(e){if("string"==typeof e&&0<e.length){var n=e.split("?")[0],t=e.split("?")[1];return n+=".html",void 0!==t?n+"?"+t:n}}(e.path),envVersion:e.envVersion},e)})),r(t,"openBusinessView",(function(e){M("openBusinessView",{businessType:e.businessType,queryString:e.queryString||"",envVersion:e.envVersion},(e._complete=function(e){if(m){var n=e.extraData;if(n)try{e.extraData=JSON.parse(n)}catch(n){e.extraData={}}}},e))})),r(t,"miniProgram",{navigateBack:function(e){e=e||{},R((function(){M("invokeMiniProgramAPI",{name:"navigateBack",arg:{delta:e.delta||1}},e)}))},navigateTo:function(e){R((function(){M("invokeMiniProgramAPI",{name:"navigateTo",arg:{url:e.url}},e)}))},redirectTo:function(e){R((function(){M("invokeMiniProgramAPI",{name:"redirectTo",arg:{url:e.url}},e)}))},switchTab:function(e){R((function(){M("invokeMiniProgramAPI",{name:"switchTab",arg:{url:e.url}},e)}))},reLaunch:function(e){R((function(){M("invokeMiniProgramAPI",{name:"reLaunch",arg:{url:e.url}},e)}))},postMessage:function(e){R((function(){M("invokeMiniProgramAPI",{name:"postMessage",arg:e.data||{}},e)}))},getEnv:function(n){R((function(){n({miniprogram:"miniprogram"===e.__wxjs_environment})}))}}),t),b=1,x={};return c.addEventListener("error",(function(e){if(!m){var n=e.target,t=n.tagName,i=n.src;if(("IMG"==t||"VIDEO"==t||"AUDIO"==t||"SOURCE"==t)&&-1!=i.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var r=n["wx-id"];if(r||(r=b++,n["wx-id"]=r),x[r])return;x[r]=!0,wx.ready((function(){wx.getLocalImgData({localId:i,success:function(e){n.src=e.localData}})}))}}}),!0),c.addEventListener("load",(function(e){if(!m){var n=e.target,t=n.tagName;if(n.src,"IMG"==t||"VIDEO"==t||"AUDIO"==t||"SOURCE"==t){var i=n["wx-id"];i&&(x[i]=!1)}}}),!0),n&&(e.wx=e.jWeixin=T),T}function M(n,t,i){e.WeixinJSBridge?WeixinJSBridge.invoke(n,C(t),(function(e){V(n,e,i)})):B(n,i)}function P(n,t,i){e.WeixinJSBridge?WeixinJSBridge.on(n,(function(e){i&&i.trigger&&i.trigger(e),V(n,e,t)})):B(n,i||t)}function C(e){return(e=e||{}).appId=w.appId,e.verifyAppId=w.appId,e.verifySignType="sha1",e.verifyTimestamp=w.timestamp+"",e.verifyNonceStr=w.nonceStr,e.verifySignature=w.signature,e}function A(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function V(e,n,t){"openEnterpriseChat"!=e&&"openBusinessView"!==e||(n.errCode=n.err_code),delete n.err_code,delete n.err_desc,delete n.err_detail;var i=n.errMsg;i||(i=n.err_msg,delete n.err_msg,i=function(e,n){var t=e,i=o[t];i&&(t=i);var r="ok";if(n){var a=n.indexOf(":");"confirm"==(r=n.substring(a+1))&&(r="ok"),"failed"==r&&(r="fail"),-1!=r.indexOf("failed_")&&(r=r.substring(7)),-1!=r.indexOf("fail_")&&(r=r.substring(5)),"access denied"!=(r=(r=r.replace(/_/g," ")).toLowerCase())&&"no permission to execute"!=r||(r="permission denied"),"config"==t&&"function not exist"==r&&(r="ok"),""==r&&(r="fail")}return t+":"+r}(e,i),n.errMsg=i),(t=t||{})._complete&&(t._complete(n),delete t._complete),i=n.errMsg||"",w.debug&&!t.isInnerInvoke&&alert(JSON.stringify(n));var r=i.indexOf(":");switch(i.substring(r+1)){case"ok":t.success&&t.success(n);break;case"cancel":t.cancel&&t.cancel(n);break;default:t.fail&&t.fail(n)}t.complete&&t.complete(n)}function L(e){if(e){for(var n=0,t=e.length;n<t;++n){var i=e[n],r=a[i];r&&(e[n]=r)}return e}}function B(e,n){if(!(!w.debug||n&&n.isInnerInvoke)){var t=o[e];t&&(e=t),n&&n._complete&&delete n._complete,console.log('"'+e+'",',n||"")}}function O(){return(new Date).getTime()}function R(n){f&&(e.WeixinJSBridge?n():c.addEventListener&&c.addEventListener("WeixinJSBridgeReady",n,!1))}}))}}]);