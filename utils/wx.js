import { Config } from '../config.js';
class WxTool{
	auth() {
	    let link = window.location.href;
	    let params = this.getUrlParam(link);  // 地址解析
	    // 如果拿到code，调用授权接口，没有拿到就跳转微信授权链接获取
	    if (params.code) {
			//获取微信用户信息
	        wxapi.wxAuth(params.code,(res)=>{
				if (res.data.wx_register == 1) {
					const userInfo = res.data.user.original;
					
					//保存token信息
					uni.setStorageSync('accessToken', res.data.user_info.access_token);
					uni.setStorageSync('refreshToken', res.data.user_info.refresh_token);
					uni.setStorageSync('userInfo', userInfo);
					console.log(userInfo);
					//参数
					var param = {}
					param.user_info = userInfo;
					param.oauth_client = 'wechat';
					param.gender = userInfo.sex || userInfo.gender;
					param.oauth_client_user_id = userInfo.openid || userInfo.openId;
					param.head_portrait = userInfo.headimgurl || userInfo.avatarUrl;
					//使用微信信息注册后，再走一次授权登录流程（此时微信注册等同于账号注册作用）
					wxapi.wxRegister(param,(r)=>{
						console.log(r);
					})
				}else{
					if(res.data.login){
						const userInfo = res.data.user_info;
						uni.setStorageSync('accessToken', userInfo.access_token);
						uni.setStorageSync('refreshToken', userInfo.refresh_token);
						uni.setStorageSync('userInfo', userInfo.member);
					}
				}
				
			}); // 调用后台接口，授权
	    } else {
	        let appid = Config.appid;
	        let uri = encodeURIComponent(link);
	        let authURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${uri}&response_type=code&scope=snsapi_userinfo&state=123`;
	        window.location.href = authURL;
	    }
	}
	getUrlParam(search) {
	  search = search || location.search;
	  var paramsSplit = search.replace(/^[^\?]*\?/i, '').split('&');
	  var params = {};
	  if (Array.isArray(paramsSplit)) {
	    paramsSplit.forEach(function (item) {
	      const itemSplit = item.split('=');
	      params[itemSplit[0]] = itemSplit[1];
	    });
	  }
	  return params
	}
}
export { WxTool };