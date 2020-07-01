import { Config } from '../config.js';
import {Common} from '@/utils/common.js';
var common = new Common();
class Base {
	constructor() {
		"use strict";
		this.baseRestUrl = Config.restUrl;
		this.tokenUrl = this.baseRestUrl + 'xcx-member/xcx-login';
	}
	request(params) {
		var that = this;
		uni.request({
			url: this.baseRestUrl+params.url, //仅为示例，并非真实接口地址。
			data: params.data,
			method:params.method ? params.method : 'get',
			header:{
				'x-api-key':uni.getStorageSync('accessToken'),
				'content-type': 'application/json'
			},
			success: (res) => {
				switch (res.data.code){
					case 200:
						params.sCallback && params.sCallback(res.data);
						break;
					case 401:
						if(!uni.getStorageSync('onLogin')){
							uni.setStorageSync('userInfo', {});
							that.reLogin();
						}
						break;
					case 500:
						uni.showToast({
							icon:'none',
							title: '服务器异常，请稍后重试',
							duration: 2000
						});
						params.sCallback && params.sCallback(res.data);
						break;
					case 400:
						uni.showToast({
							icon:'none',
							title: '没有权限',
							duration: 2000
						});
						params.sCallback && params.sCallback(res.data);
						break;
					default:
						uni.showToast({
							icon:'none',
							title: res.data.message ? res.data.message : '操作失败',
							duration: 2000
						});
						params.sCallback && params.sCallback(res.data);
						break;
				}
			}
		});
	}
	auth() {
	    let link = window.location.href;
	    let params = this.getUrlParam(link);  // 地址解析
	    // 如果拿到code，调用授权接口，没有拿到就跳转微信授权链接获取
	    if (params.code) {
			uni.setStorageSync('onLogin',true)
			//获取微信用户信息
	        this.wxAuth(params.code,(res)=>{
				uni.setStorageSync('onLogin',false);
				if (res.data.wx_register == 1) {
					const userInfo = res.data.user.original;
					//保存token信息
					uni.setStorageSync('accessToken', res.data.user_info.access_token);
					uni.setStorageSync('refreshToken', res.data.user_info.refresh_token);
					uni.setStorageSync('userInfo', userInfo);
					//参数
					var param = {}
					param.user_info = userInfo;
					param.oauth_client = 'wechat';
					param.gender = userInfo.sex || userInfo.gender;
					param.oauth_client_user_id = userInfo.openid || userInfo.openId;
					param.head_portrait = userInfo.headimgurl || userInfo.avatarUrl;
					//使用微信信息注册后，再走一次授权登录流程（也就是绑定操作）
					this.bind(param,(r)=>{
						if(r.data)
						uni.setStorageSync('userInfo', r.data);
					})
				}else{
					if(res.data.login){
						const userInfo = res.data.user_info;
						uni.setStorageSync('accessToken', userInfo.access_token);
						uni.setStorageSync('refreshToken', userInfo.refresh_token);
						uni.setStorageSync('userInfo', userInfo.member);
					}else{
						const userInfo = res.data.user_info;
						uni.setStorageSync('userInfo', userInfo.original);
						uni.showModal({
						    title: '提示',
						    content: '当前微信尚未绑定手机号，请先绑定',
						    success: function (res) {
						        if (res.confirm) {
						            uni.redirectTo({
						            	url:'/pages/public/register'
						            })
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
						
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
	//使用code去获取用户信息，服务端获取
	wxAuth(code,callback) {
		var params = {
		  url:'third-party/wechat',
		  data:{code:code},
		  method:'get',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
	//将微信授权绑定到账号
	bind(param,callback) {
		var params = {
		  url:'member/auth/create',
		  data:param,
		  method:'post',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
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
	//重新登录
	async reLogin(){
		// 存当前页面的地址
		const currentPage = getCurrentPages()[getCurrentPages().length - 1];
		const params = {};
		// #ifdef H5
		params.route = `/${currentPage.$vm.route}`;
		params.query = currentPage.$vm.$mp && currentPage.$vm.$mp.query;
		// #endif
		// #ifdef MP
		params.route = `/${currentPage.$vm.__route__}`;
		params.query = currentPage.$vm.$mp && currentPage.$vm.$mp.query;
		// #endif
		// #ifdef APP-PLUS
		params.route = `/${currentPage.route}`;
		params.query = currentPage.options;
		// #endif
		await uni.setStorageSync('backToPage', JSON.stringify(params));
		if(common.isWechat()){
			this.auth();
		}else{
			uni.navigateTo({
				url:'/pages/public/logintype'
			})
		}
	}
}
export { Base };