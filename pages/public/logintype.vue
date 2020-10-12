<template>
	<view class="login-type">
		<view class="welcome">
			<image class="logo" src="../../static/logo.png"></image>
			<view>以墨文化</view>
		</view>
		<view>
			<button class="confirm-btn" open-type="getUserInfo" v-if="isAuthLoginShow" formType="submit" @tap="toAuthLogin">
				授权登录
			</button>
			<button class="confirm-btn plain" plain @tap="goto('/pages/public/login')">已有账号登录</button>
			<button class="confirm-btn plain" plain @tap="goto(`/pages/public/register`)">立即注册</button>
		</view>
		<view class="footer">
			登录表示同意
			<text class="protocol" @tap="handleRfProtocolPopupShow">用户协议</text>
		</view>
	</view>
</template>

<script>
	import {
		Public
	} from '@/model/public.js';
	var publicModel = new Public();
	/**
	 * @des 登录类型
	 *
	 * @author stav stavyan@qq.com
	 * @date 2020-01-13 12:02
	 * @copyright 2019
	 */
	export default {
		components: {},
		data() {
			return {
				isRfProtocolPopupShow: false, // 控制协议popup显示
				isLoginDisabled: true, // 是否允许点击登录按钮
				isAuthLoginShow: false,
			}
		},
		onLoad(options) {
			/*  #ifdef H5  */
			if (this.$mPayment.isWechat()) {
				this.isAuthLoginShow = true;
			}
			/*  #endif  */
			/*  #ifdef MP-WEIXIN */
			this.isAuthLoginShow = true;
			/*  #endif  */
			this.code = options.code;
			// 如果不是第一次进来 就不需要强制阅读协议
			if (uni.getStorageSync('notFirstTimeLogin')) this.isLoginDisabled = false;
			const _this = this;
			if (this.code) {
				this.$http.get(wechatH5Login, {
					code: this.code
				}).then(async r => {
					if (!r.data.login) {
						this.user_info = r.data.user_info.original;
						uni.showModal({
							content: '你尚未绑定账号，是否跳转登录页面？',
							success: (confirmRes) => {
								if (confirmRes.confirm) {
									uni.setStorageSync('wechatUserInfo', JSON.stringify(_this.user_info));
									_this.$mRouter.push({
										route: '/pages/public/login'
									});
								}
							}
						});
					} else {
						await this.$mStore.commit('login', r.data.user_info);
						// #ifdef H5
						await this.$mPayment.wxConfigH5();
						// #endif
						const backToPage = uni.getStorageSync('backToPage');
						if (backToPage) {
							if (('/pages/index/index' || '/pages/index/index' || '/pages/index/index' || '/pages/user/user').indexOf(
									backToPage) === -1) {
								this.$mRouter.reLaunch(JSON.parse(backToPage));
							} else {
								this.$mRouter.redirectTo(JSON.parse(backToPage));
							}
							uni.removeStorageSync('backToPage');
							uni.removeStorageSync('wechatUserInfo');
							return;
						} else {
							this.$mRouter.reLaunch({
								route: '/pages/user/user'
							});
						}
					}
				})
			}
		},
		methods: {
			// 通用跳转
			navTo(route) {
				if (this.isLoginDisabled) {
					this.$mHelper.toast('请阅读并同意协议', 1.5 * 1000);
					return;
				}
				this.$mRouter.redirectTo({
					route
				});
			},
			// 显示协议popup
			handleRfProtocolPopupShow() {
				this.isRfProtocolPopupShow = true;
			},
			// 监听是否同意协议
			popupState(e) {
				if (e) {
					this.isLoginDisabled = false;
					uni.setStorageSync('notFirstTimeLogin', true);
					this.isRfProtocolPopupShow = false;
				} else {
					this.isLoginDisabled = true;
					this.isRfProtocolPopupShow = false;
				}
			},
			// 授权登录
			toAuthLogin() {
				//       	if (this.isLoginDisabled){
				//       		 uni.showToast({
				// icon:'none',
				//       		 	title:'请同意协议'
				//       		 })
				//       		 return;
				//        }
				const _this = this;
				/*  #ifdef H5  */
				if (this.$mPayment.isWechat()) {
					uni.showModal({
						content: '是否授权登录?',
						success: (confirmRes) => {
							if (confirmRes.confirm) {
								const href = window.location.href;
								window.location.href =
									`https://open.weixin.qq.com/connect/oauth2/authorize?
																	appid=${this.$mConfig.weixinAppId}&
																	redirect_uri=${href}&
																	response_type=code&
																	scope=snsapi_userinfo&
																	state=STATE#wechat_redirect`;
							}
						}
					});
				} else {
					this.$mHelper.toast('当前平台不支持授权登录')
				}
				/*  #endif  */
				/*  #ifdef MP-WEIXIN */
				uni.showModal({
					content: '是否授权登录?',
					success: (confirmRes) => {
						if (confirmRes.confirm) {
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									uni.getUserInfo({
										provider: 'weixin',
										success: function(infoRes) {
											var param = {
												signature: infoRes.signature,
												encryptedData: infoRes.encryptedData,
												rawData: infoRes.rawData,
												iv: infoRes.iv,
												code: loginRes.code
											}
											publicModel.xcxAuth(param, (r) => {
												if (!r.data.login) {
													_this.user_info = r.data.user_info;
													uni.showModal({
														content: '你尚未绑定账号，是否跳转登录页面？',
														success: (confirmRes) => {
															if (confirmRes.confirm) {
																uni.setStorageSync('userInfo', _this.user_info);
																//uni.setStorageSync('userInfo', r.data.rawData);
																uni.navigateTo({
																	url: './login'
																})
															}
														}
													});
												} else {
													//await _this.$mStore.commit('login', r.data.user_info);
													uni.showToast({
														title: '已为您授权登录'
													})
												}
											})
										},
										fail: function(err) {
											console.log(err);
										}
									});
								}
							});
						}
					}
				});
				/*  #endif  */
				/*  #ifdef MP-QQ */
				this.$mHelper.toast('当前平台不支持授权登录')
				/*  #endif  */
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background: #fff;
		height: calc(100% - 88upx);
	}

	.login-type {
		padding-top: 80upx;

		.confirm-btn {
			width: 84%;
			margin: 0 7% 50upx;
			height: 84upx;
			line-height: 84upx;
			border-radius: 12upx;
			background-color: $uni-color-base;
			color: #fff;
			font-size: $uni-font-size-lg;
		}

		.plain {
			background: none;
			color: $uni-color-base;
			border: 1upx solid $uni-color-base;
		}

		.footer {
			width: 100%;
			text-align: center;
			position: fixed;
			bottom: 40upx;
			font-size: $uni-font-size-sm;

			.protocol {
				color: $uni-color-base;
				margin: 0 10upx;
			}
		}
	}

	.logo {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin-bottom: 15rpx;
		margin-top: 80rpx;
	}

	.welcome {
		position: relative;
		top: -90upx;
		color: #555;
		text-align: center;
	}
</style>
