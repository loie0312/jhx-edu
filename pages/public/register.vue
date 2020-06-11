<template>
  <view class="container">
    <!--顶部返回按钮-->
    <text class="back-btn iconfont iconzuojiantou-up" @tap="navBack"></text>
    <view class="right-top-sign"></view>
    <!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
    <view class="wrapper">
      <view class="welcome">
        账号注册！
      </view>
      <view class="input-content">
          <view class="input-item">
            <text class="tit">手机号码</text>
            <input
                type="number"
                v-model="registerParams.mobile"
                placeholder="请输入手机号码"
                maxlength="11"
            />
          </view>
          <view class="input-item input-item-sms-code">
            <view class="input-wrapper">
              <view class="rf-input-wrapper">
                <view class="tit">验证码</view>
                <input
                    type="number"
                    v-model="registerParams.code"
                    placeholder="请输入验证码"
                    maxlength="4"
                    data-key="mobile"
                />
              </view>
              <button class="sms-code-btn" :disabled="smsCodeBtnDisabled" @tap.stop="getSmsCode">
                <text v-if="!smsCodeBtnDisabled">获取验证码</text>
                <text v-else class="sms-code-resend">{{ `重新发送 (${codeSeconds})` }}</text>
              </button>

            </view>
          </view>
          <view class="input-item">
            <text class="tit">密码</text>
            <input
                type="password"
                v-model="registerParams.password"
                placeholder="请输入密码"
                maxlength="18"
            />
          </view>
          <view class="input-item">
            <text class="tit">确认密码</text>
            <input
                type="password"
                v-model="registerParams.password_repetition"
                placeholder="请输入确认密码"
                maxlength="18"
            />
          </view>
      </view>
	    <button class="confirm-btn" :disabled="btnLoading" :loading="btnLoading" @tap="toRegister">注册</button>
    </view>
    <view class="register-section">
      已经注册过了?
      <text @tap="navTo('/pages/public/login')">马上登录</text>
    </view>
  </view>
</template>

<script>
	import {mapMutations} from 'vuex';
	import moment from '@/utils/moment';
	import {Public} from '@/model/public.js';
	var publicModel = new Public();
	export default {
		data() {
			return {
				registerParams: {
					mobile: '',
					password: '',
					password_repetition: '',
					code: '',
				},
				btnLoading: false,
				reqBody: {},
				codeSeconds: 0, // 验证码发送时间间隔
				smsCodeBtnDisabled: true,
				sendCodeTime:60
			}
			
		},
		onLoad(options) {
			const time = moment().valueOf() / 1000 - uni.getStorageSync('registerSmsCodeTime');
			if (time < 60) {
				this.codeSeconds = this.$data.sendCodeTime - parseInt(time, 10);
				this.handleSmsCodeTime(this.codeSeconds);
			} else {
				this.codeSeconds = this.$data.sendCodeTime;
				this.smsCodeBtnDisabled = false;
				uni.removeStorageSync('registerSmsCodeTime')
			}
			this.registerParams.promoCode = options.promo_code;
		},
		methods: {
			...mapMutations(['login']),
			navBack() {
				this.$mRouter.back();
			},
			navTo(url){
				uni.navigateTo({
					url:url
				})
			},
			// 获取手机验证码
			getSmsCode() {
				this.reqBody['mobile'] = this.registerParams['mobile'];
				let checkSendCode = this.$mGraceChecker.check(this.reqBody, this.$mFormRule.sendCodeRule);
				if (!checkSendCode) {
					this.$mHelper.toast(this.$mGraceChecker.error);
					return;
				}
				this.$http.post(smsCode, {
					mobile: this.registerParams.mobile,
					usage: 'register'
				}).then(r => {
					this.$mHelper.toast(`验证码发送成功, 验证码是${r.data}`);
					this.smsCodeBtnDisabled = true;
					uni.setStorageSync('registerSmsCodeTime', moment().valueOf() / 1000);
					this.handleSmsCodeTime(59);
				});
			},
			handleSmsCodeTime (time) {
					let timer = setInterval(() => {
						if (time === 0) {
							clearInterval(timer);
							this.smsCodeBtnDisabled = false;
						} else {
							this.codeSeconds = time;
							this.smsCodeBtnDisabled = true;
							time--
						}
					}, 1000);
			},
			// 注册账号
			async toRegister() {
				this.reqBody['mobile'] = this.registerParams['mobile'];
				this.reqBody['password'] = this.registerParams['password'];
				this.reqBody['code'] = this.registerParams['code'];
				this.reqBody['nickname'] = this.registerParams['nickname'];
				const cheRes = this.$mGraceChecker.check(this.reqBody, this.$mFormRule.registerRule);
				if (!cheRes) {
					uni.showToast({
						icon:'none',
						title:this.$mGraceChecker.error
					})
					return;
				}
				if (this.registerParams['password'] !== this.registerParams['password_repetition']) {
					uni.showToast({
						icon:'none',
						title:'两次输入的密码不一致'
					})
					return;
				}
				this.reqBody['password_repetition'] = this.registerParams['password_repetition'];
				this.reqBody['promoCode'] = this.registerParams['promoCode'];
				/*  #ifdef  APP-PLUS  */
				this.reqBody.group = 'jhxEduApp'
				/*  #endif  */
				/*  #ifdef H5  */
				this.reqBody.group = 'jhxEduH5'
				/*  #endif  */
				/*  #ifdef  MP-WEIXIN  */
				this.reqBody.group = 'jhxEduWechatMq'
				/*  #endif  */
				/*  #ifdef  MP-QQ  */
				this.reqBody.group = 'jhxEduQqMq'
				/*  #endif  */
				this.btnLoading = true;
				publicModel.register(this.reqBody,(res) => {
					this.btnLoading = false;
					const userInfo = res.data.member;
					//保存token信息
					uni.setStorageSync('accessToken', res.data.access_token);
					uni.setStorageSync('refreshToken', res.data.refresh_token);
					uni.setStorageSync('userInfo', userInfo);
					uni.navigateBack({
						
					})
				});
			}
		}

	}
</script>

<style lang='scss'>
  .container {
    padding-top: 60px;
    position: relative;
    width: 100vw;
    /*height: 100vh;*/
    overflow: hidden;
    background: #fff;

    .wrapper {
      position: relative;
      width: 100vw;
      z-index: 90;
      background: #fff;
      padding-bottom: 40upx;

      .welcome {
        position: relative;
        left: 50upx;
        top: -90upx;
        font-size: 46upx;
        color: #555;
        text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
      }

      .input-content {
        padding: 0 60upx;
      }

      .input-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding: 0 30upx;
        height: 120upx;
        border-radius: 4px;
        margin-bottom: 50upx;
		border-bottom: 1px solid $uni-border-color;
        &:last-child {
          margin-bottom: 0;
        }

        .tit {
          height: 50upx;
          line-height: 56upx;
        }

        input {
          height: 60upx;
          width: 100%;
        }
      }

		  .input-item-sms-code {
		    position: relative;
				width: 100%;
		    .sms-code-btn {
		      position: absolute;
		      color: #111;
		      right: 20upx;
		      bottom: 20upx;
		      font-size: 28upx;
		    }

		    .sms-code-resend {
		      color: #999;
		    }

		    .sms-code-btn:after {
		      border: none;
		      background-color: transparent;
		    }
		  }

      .forget-section {
        text-align: center;
        margin-top: 40upx;
      }
    }

    .back-btn {
      position: absolute;
      left: 40upx;
      z-index: 9999;
      padding-top: var(--status-bar-height);
      top: 40upx;
      font-size: 40upx;
    }

    .left-top-sign {
      font-size: 120upx;
      position: relative;
      left: -16upx;
    }

    .right-top-sign {
      position: absolute;
      top: 80upx;
      right: -30upx;
      z-index: 95;

      &:before, &:after {
        display: block;
        content: "";
        width: 400upx;
        height: 80upx;
        background: #b4f3e2;
      }

      &:before {
        transform: rotate(50deg);
        border-radius: 0 50px 0 0;
      }

      &:after {
        position: absolute;
        right: -198upx;
        top: 0;
        transform: rotate(-50deg);
        border-radius: 50px 0 0 0;
        /* background: pink; */
      }
    }

    .register-section {
      margin: 30upx 0 50upx;
      width: 100%;
      text-align: center;

      text {
        margin-left: 10upx;
      }
    }
  }

  .footer {
    width: 100%;
    text-align: center;
    margin: 20upx 0 20upx;

    .protocol {
      margin: 0 10upx;
    }
  }
</style>
