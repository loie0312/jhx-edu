// #ifdef H5
import { Wx } from '@/model/wx';
var wx = new Wx();
var jweixin = require('jweixin-module');
import { Config } from '@/config.js';
// #endif

export default {
	// 判断是否公众号（微信H5）
	isWechat() {
		const ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/micromessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	},

	// wxjssdk
	async wxConfigH5() {
		if (this.isWechat()) {
			const jsApiList = JSON.stringify(['chooseWXPay']);
			var param = {
				url: location.href.split('#')[0],
				jsApiList,  // 需要调用微信的原生方法
				debug: true    // 是否打开调试
			};
			wx.sdkConfig(param,(data) => {
				var c = {
					debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: data.data.appId, // 必填，公众号的唯一标识
					timestamp: data.data.timestamp, // 必填，生成签名的时间戳
					nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
					signature: data.data.signature,// 必填，签名
					jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
				}
				jweixin.config(c);
			})
		}
	},

	/*
   *@des 微信支付
   *
   * order_info 微信订单数据，用于直接支付，不用再次通过接口获取
   *@param order_group 订单:order;充值:recharge;
   *@param data 订单 {“order_id”:199} 充值 {“money”:100};
   */
	async weixinPay(order_info='',order_group='', data={}) {
		// #ifdef H5
		if (!this.isWechat()) {
			uni.showToast({
				icon:'none',
				title:"仅支持微信和微信小程序支付"
			})
			return;
		}
		// #endif
		// #ifdef MP-QQ
		uni.showToast({
			icon:'none',
			title:"QQ小程序暂不支持充值"
		})
		return;
		// #endif
		// #ifdef APP-PLUS
		var param = {
			order_group,
			pay_type: 1,
			trade_type: 'app',
			data
		}
		wx.payCreate(param,(r) => {
			uni.requestPayment({
				provider: 'wxpay',	// 微信支付
				orderInfo: JSON.stringify(r.data.config), //微信订单数据
				success: function() {
					uni.showToast({
						title:"支付成功"
					})
					const backToPage = uni.getStorageSync('backToPage');
					if (backToPage) {
						if (backToPage.indexOf('/pages/user/user') !== -1
							|| backToPage.indexOf('/pages/cart/cart') !== -1
							|| backToPage.indexOf('/pages/index/index') !== -1
							|| backToPage.indexOf('/pages/category/category') !== -1) {
							uni.switchTab({
								url:JSON.parse(backToPage)
							})
						} else {
							uni.redirectTo({
								url:JSON.parse(backToPage)
							})
						}
						uni.removeStorageSync('backToPage');
						uni.removeStorageSync('wechatUserInfo');
						return;
					} else {
						uni.switchTab({
							url:'/pages/user/user'
						})
					}
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
				}
			});
		});
		// #endif
		// #ifndef APP-PLUS
		if(order_info){
			//order_info 支付的信息，如果已经传入就无需再次从微信支付获取
			// #ifdef H5
			jweixin.ready(() => {
				jweixin.chooseWXPay({
					...order_info,
					success() {
						mHelper.toast('支付成功');
						mRouter.push({ route: '/pages/user/money/success' });
					},
					fail(res) {
						uni.showToast({
							icon:'none',
							title:'支付失败：' + res.errMsg
						})
					}
				});
			});
			// #endif
		}else{
			var param = {
				order_group,
				pay_type: 1,
				// #ifdef H5
				trade_type: 'js',
				// #endif//
				// #ifdef MP-WEIXIN
				trade_type: 'mini_program',
				// #endif
				data,
				openid: res.data.openid
			}
			wx.payCreate(param,(r) => {
				// #ifdef H5
				jweixin.ready(() => {
					jweixin.chooseWXPay({
						...r.data.config,
						success() {
							mHelper.toast('支付成功');
							mRouter.push({ route: '/pages/user/money/success' });
						},
						fail(res) {
							// 支付成功后的回调函数
							mHelper.toast('支付失败：' + res.errMsg);
						}
					});
				});
				// #endif
				// #ifdef MP-WEIXIN
				uni.requestPayment({
					...r.data.config,
					timeStamp: r.data.config.timestamp,
					success: () => {
						mHelper.toast('支付成功');
						mRouter.push({ route: '/pages/user/money/success' });
					},
					fail: (res) => {
						mHelper.toast('支付失败：' + res.errMsg);
					},
					complete: () => {
					}
				});
				// #endif
			});
		}
		
		// #endif
	},

	/*
   *@des 支付宝支付
   *
   *@param order_group 订单:order;充值:recharge;
   *@param data 订单 {“order_id”:199} 充值 {“money”:100};
   */
	async aliPay(order_group, data) {
		// #ifdef MP-QQ
		mHelper.toast('QQ小程序不支持支付宝充值');
		return;
		// #endif
		// #ifdef MP-WEIXIN
		mHelper.toast('微信小程序不支持支付宝充值');
		return;
		// #endif
		await http.post(`${payCreate}`, {
			order_group,
			pay_type: 2,
			// #ifdef H5
			trade_type: 'wap',
			// #endif
			// #ifdef APP-PLUS
			trade_type: 'app',
			// #endif
			data
		}).then(r => {
			// #ifdef H5
			window.location.href = r.data.config.config;
			// #endif
			// #ifdef APP-PLUS
			uni.requestPayment({
				provider: 'alipay',
				orderInfo: r.data.config.config, //微信、支付宝订单数据
				success: function() {
					mHelper.toast('支付成功');
					mRouter.push({ route: '/pages/user/money/success' });
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
				}
			});
			// #endif
		});
	},

	/*
   *@des 余额支付
   *
   *@param data 支付参数
   */
	async balancePay(data) {
		await http.post(`${orderPay}`, {
			order_group: 'order',
			trade_type: 'js',
			pay_type: 5,
			data
		}).then(() => {
			mHelper.toast('支付成功~');
			mRouter.push({ route: '/pages/user/money/success' });
		});
	}
};
