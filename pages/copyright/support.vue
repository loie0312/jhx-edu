<template>
	<view>
		<view class="main">
			<view class="qrcode-box">
				<image class="qrcode" :src="qrcode" mode="widthFix"></image>
				<view class="save" @click="saveEwm">长按二维码保存，添加微信好友</view>
			</view>
			<view class="main-info">
				<view>广西几何线科技有限公司</view>
				<view @click="copy('loie0312')">微信号：loie0312 <span class="op">复制</span></view>
				<view @click="call('18290192236')">联系电话：18290192236 <span class="op">拨打</span></view>
				<view>地址：广西钦州市永福西大街金湖国际大厦1601</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		Config
	} from '@/config.js';
	export default {
		omponents: {
		},
		data() {
			return {
				qrcode :"/static/loie0312.jpg"
			}
		},
		onLoad() {

		},
		methods: {
			//获取分销金额信息
			getData: function() {
				var that = this;
				var param={}
				distribut.money(param, (data) => {
					that.$data.user=data.item;
				});
			},
			/**
			 * H5复制
			 */
			h5Copy(content) {
				let textarea = document.createElement('textarea');
				textarea.value = content;
				textarea.readOnly = 'readOnly';
				document.body.appendChild(textarea);
				textarea.select(); // 选择对象
				textarea.setSelectionRange(0, content.length); //核心
				let result = document.execCommand('Copy'); // 执行浏览器复制命令
				textarea.remove();
				uni.showToast({
					icon:"none",
					title:"复制成功"
				})
				return result;
			},
			//小程序复制
			copy:function(content){
				uni.setClipboardData({
					data: content,
					success: function (res) {
						uni.getClipboardData({
							success: function (res) {
								uni.showToast({
									title: '复制成功'
								})
							}
						})
					}
				})
			},
			call:function(mobile){
				if(!mobile){
					uni.showToast({
						icon:"none",
						title:"尚未设置电话"
					})
					return ;
				}
			 	uni.makePhoneCall({
			 	
			 	// 手机号
			    phoneNumber: mobile, 
			
				// 成功回调
				success: (res) => {
					
				},
			
				// 失败回调
				fail: (res) => {
				
				}
				
			  });
			},
			saveEwm: function(e) {
				var _self = this;
				//获取相册授权
				uni.getSetting({
					success(res) {
						if (!res.authSetting['scope.writePhotosAlbum']) {
							uni.authorize({
								scope: 'scope.writePhotosAlbum',
								success() {
									//这里是用户同意授权后的回调
									_self.saveImgToLocal();
								},
								fail() { //这里是用户拒绝授权后的回调
									_self.openSettingBtnHidden = false
								}
							})
						} else { //用户已经授权过了
							_self.saveImgToLocal();
						}
					}
				})
			},
			saveImgToLocal: function(e) {
				var _self = this;
				uni.showModal({
					title: '提示',
					content: '确定保存到相册吗',
					success: function(res) {
						if (res.confirm) {
							uni.downloadFile({
								url: _self.qrcode, //图片地址
								success: (res) => {
									if (res.statusCode === 200) {
										uni.saveImageToPhotosAlbum({
											filePath: res.tempFilePath,
											success: function() {
												uni.showToast({
													title: "保存成功",
													icon: "none"
												});
											},
											fail: function() {
												uni.showToast({
													title: "保存失败",
													icon: "none"
												});
											}
										});
									}
								}
							})
			
			
						} else if (res.cancel) {
			
						}
					}
				});
			
			}
		},
	}
</script>

<style lang="scss">
body{background-color: #fff;}
.main{padding: 0 4%;}
.qrcode-box{text-align: center;margin: 60rpx 0;}
.qrcode{width: 300rpx;margin: 0 auto;}
.main-info view{margin: 30rpx 0;}
.op{border:1px solid #FF6600;color: #FF6600;font-size: 24rpx;padding: 6rpx 10rpx;margin-left: 30rpx;border-radius: 10rpx;}
.save{border:1px solid #FF6600;color: #FF6600;font-size: 24rpx;padding: 20rpx 0rpx;border-radius: 30px;width:400rpx;margin: 0 auto;}
</style>
