
<template>
    <view>
        <view class="uni-padding-wrap">
            <view class="page-section swiper">
                <view class="page-section-spacing">
                    <swiper class="swiper"  :autoplay="true">
                        <swiper-item v-for="item in banner">
                            <image mode="widthFix" class="swiper-item uni-bg-red" :src="item.cover"></image>
                        </swiper-item>
                    </swiper>
                </view>
            </view>
        </view>
		<view class="shop-box">
			<view class="shop_info">
				<view><image class="shop_logo" :src="configData.shop_image"></image></view>
				<view>
					<view class="shop_name">{{configData.shop_name}}</view>
					<view class="line">
						<view class="tel">{{configData.shop_tel}}</view>
						<view class="call" @click="h5Copy(configData.shop_tel)">复制</view>
						<view class="call" @click="call(configData.shop_tel)">拨打</view>
					</view>
					<view class="shop_address">{{configData.shop_address}}</view>
				</view>
				<view class="share" @click="getSharePoster">
					<view><text class="iconfont icon icon-fenxiang"></text></view>
				</view>
			</view>
			
		</view>
		<view class="nav-box bgfff">
			<uni-grid :column="4" :show-border="false"  :square="false">
				<view class="" v-for="item in nav" @click="goto(item.url)" :data-url="item.url">
					<uni-grid-item>
						<image  mode="widthFix" class="nav" :src="item.icon"></image>
						<text class="text">{{item.label}}</text>
					</uni-grid-item>
				</view>
			</uni-grid>
		</view>
		
		<view class="title-line">
			<view class="title">推荐课程</view>
			<view @click="goto('/pages/product/search?is_top=1')" class="more">更多></view>
		</view>
		<jhx-product-list :status="recomandStatus" :thumb="false" :productList="productList" :column="2"></jhx-product-list>
		<view class="cate-box" v-for="cate in productCate">
			<view class="title-line">
				<view class="title">{{cate[0] ? cate[0].cate.title : '' }}</view>
				<view @click="toCate" :data-cate_id="cate[0] ? cate[0].cate.id : '' " class="more">更多></view>
			</view>
			<jhx-product-list :status='nostatus' :productList="cate" :column="2"></jhx-product-list>
		</view>
		
		<view class="copyright">几何线系统提供技术支持</view>
		<!-- #ifdef H5 -->
		<view style="width: 100%;height: 80rpx;"></view>
		<!-- #endif -->
		<view class="show-box" :class="showPoster ? '' : 'hide'" id="post-box" data-loaded="0">
			<!-- canvas浏览，点击生成海报先绘画成canvas，然后canvas再储存为图片 -->
			<view :class="showSave ? 'hide' : ''">
				<canvas canvas-id="shareCanvas" id="shareCanvas" width="300" height="400" class="poster"></canvas>
				<view class="iconfont icon-cuowu close" :class="showPoster ? '' : 'hide'" @click='hiddenShare'>x</view>
				<view class="canvas-img"></view>
			</view>
			<view :class="showSave ? '' : 'hide'">
				<img style="width: 100%;" :src="posterImg" />
			</view>
			<view class="save">{{showSave ? '长按图片保存到相册' : '正在生成...'}}</view>
			
		</view>
		<view class='maskLayer' :class="showPoster ? '' : 'hide'" @click='hiddenShare'></view>
    </view>
	
</template>

<script>
	import  payment  from '@/utils/payment.js';
	import { Config } from '../../config.js';
	import {Adv} from '@/model/adv.js';
	import {System} from '@/model/system.js';
	import {Product} from '@/model/product.js';
	import {Public} from '@/model/public.js';
	var publicModel = new Public();
	// #ifdef H5
	var jweixin = require('jweixin-module');
	// #endif
	var adv = new Adv();
	var system = new System();
	var product = new Product();
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import jhxProductList from "@/components/jhx-product-list/jhx-product-list.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
    export default {
		components: {uniGrid,uniGridItem,jhxProductList},
        data() {
            return {
				configData:{},
                banner:[],
				nav:[],
				productList:[],
				productCate:[],
				recomandStatus:'more',
				nostatus:'nostatus',
				showPoster:false,
				showSave:false,
				posterImg:''
            }
        },
        onLoad() {
			this.init();
        },
		onPullDownRefresh() {
			this.init();
		},
		methods: {
			init:function(){
				this.getNav();
				this.getBanner();
				this.getProduct(); 
				this.indexCate();
				this.getConfig();
				this.config();
			},
			//幻灯片
			getBanner:function(){
				var that = this;
				var param = {'location':'index_top'};
				adv.getAdv(param,(data) => {
					that.$data.banner=data.data.index_top;
				});
			},
			//导航
			getNav:function(){
				var that = this;
				var param = {'key':'mobile_header'};
				system.getNav(param,(data) => {
					that.$data.nav=data.data.items;
				});
			},
			//产品
			getProduct:function(){
				var that = this;
				var param = {is_top:1};
				this.$data.recomandStatus = 'loading';
				product.lists(param,(data) => {
					that.$data.recomandStatus = 'nostatus';
					that.$data.productList=data.data;
					uni.stopPullDownRefresh();
				});
			},
			//分类产品
			indexCate:function(){
				var that = this;
				var param = {};
				product.indexCate(param,(data) => {
					that.$data.productCate=data.data;
				});
			},
			getConfig:function(){
				var that = this;
				var param = {};
				publicModel.config(param,(data) => {
					that.configData = data.data;
					wx.setStorageSync('config',this.configData);
				});
			},
			toCate(e) {
				var cate_id = e.currentTarget.dataset.cate_id ;    
				uni.navigateTo({
					url: '/pages/product/search?cate_id='+cate_id,
				});
			},
			//分享配置
			config:function(){
				var that = this;
				// #ifdef H5
				payment.wxConfigH5();
				jweixin.ready(() => {
					//自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
					jweixin.updateAppMessageShareData({
					    title: this.configData ? this.configData.share_title: '以墨文化',// 分享标题
					    desc: this.configData ? this.configData.share_desc: '以墨文化', // 分享描述
					    link: Config.domain+'/pages/index/index', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					    imgUrl: this.configData ? this.configData.share_cover : '', // 分享图标
					    success: function () {
					    }
					})
					//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
					jweixin.updateTimelineShareData({
						title: this.configData ? this.configData.share_title: '以墨文化',// 分享标题
						link: Config.domain+'/pages/index/index', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: this.configData ? this.configData.share_cover : '', // 分享图标
						success: function () {
						  // 设置成功
						}
					})
				})
				// #endif
			},
			//画海报
			paintPoster() {
				const _this = this
				_this.showPoster = true;
				if (this.isPosted) {
					_this.showShare = false;
					_this.showSave = true;
					return false;
				}
				var goods_name = this.configData ? this.configData.share_title: '以墨文化';
				var productImage = this.configData ? this.configData.share_cover : '';
				var qrcode = "http://ymwh.qzlhslgy.com/site_code.png";
				if (!goods_name || !productImage) {
					uni.showToast({
						title: "分享信息正在加载，请稍后重试"
					})
					return false;
				}
				uni.showLoading({
					title: '生成图片中~',
					mask: true
				})
				_this.$data.showShare = false;
				_this.isShare = true
				const wxGetImageInfo = _this.promisify(uni.getImageInfo)
				Promise.all([
					wxGetImageInfo({
						src: productImage
					}),
					wxGetImageInfo({
						src: qrcode
					})
			
				]).then(res => {
					var sWidth = uni.getSystemInfoSync().windowWidth;
					var sHeight = uni.getSystemInfoSync().windowHeight;
					const ctx = uni.createCanvasContext('shareCanvas');
					var width = parseInt(sWidth * 0.8);
					var height = parseInt(sHeight * 0.8);
					//二维码  必须先画一张图片然后才能填充背景，不知道为什么
					ctx.drawImage(res[1].path, 20, width + 40, 90, 90);
					//画布白色背景
					ctx.setFillStyle('white')
					ctx.fillRect(0, 0, width, height)
					//商品图片
					ctx.drawImage(res[0].path, 20, 60, width - 40, width - 40);
					//二维码 
					ctx.drawImage(res[1].path, 20, width + 40, 90, 90);
					//商品名称
					ctx.setFontSize(14);
					ctx.setFillStyle('#444444');
					var num = parseInt((width - 40) / 14) * 2
					var rs = _this.textByteLength(goods_name, num);
					rs[1].forEach((item, index) => {
						ctx.fillText(item, 20, 30 + 20 * index);
					})
					//描述
					ctx.setFontSize(14);
					ctx.setFillStyle('#444444');
					var num = parseInt((width - 110) / 14) * 2;
					var desc = _this.configData ? _this.configData.share_desc : '很好的一个网站，推荐给你！';
					var rs = _this.textByteLength(desc, num);
					var baseHeight = width+75;
					rs[1].forEach((item, index) => {
						ctx.fillText(item, 115, baseHeight + 20 * index);
					})
					ctx.draw(true, function() {

						// 不延迟图片可能会是半透明状态
						setTimeout(function() {
							//canvas转为图片
							uni.canvasToTempFilePath({
								x: 0,
								y: 0,
								// width: 375,
								// height: 600,
								// destWidth: 750 * 750 / uni.getSystemInfoSync().windowWidth, //防止图片模糊
								// destHeight: 1200 * 750 / uni.getSystemInfoSync().windowWidth,
								canvasId: 'shareCanvas',
								success(res) {
									_this.isShare = false
									_this.isPosted = true;
									_this.showSave = true;
									console.log(_this.showSave);
									_this.posterImg = res.tempFilePath;
									
								},
								fail(res){
									
									console.log(res);
									uni.showToast({
										title:'海报生成失败'
									})
								},complete(res) {
									uni.hideLoading();
									console.log(res);
								}
							})
						}, 1000)
					})
				})
			},
			promisify: api => {
			
				//return一个匿名函数 options对象中是src图片路径传入的路径
			
				return (options) => {
			
					return new Promise((resolve, reject) => {
			
						const extras = {
			
							success: resolve,
			
							fail: reject
			
						}
			
						//调用api api中options是传入的图片路径，extras是api执行的成功和失败的函数
			
						api({ ...options,
							...extras
						})
			
					})
			
				}
			
			},
			//保存图片
			saveImage() {
			
				const _this = this
			
				uni.showLoading({
			
					title: '保存中~'
			
				})
			
				uni.saveImageToPhotosAlbum({
			
					filePath: _this.posterImg,
			
					success() {
			
						uni.showToast({
			
							title: '保存成功！',
			
							icon: 'none'
			
						})
			
					},
			
					complete() {
			
						uni.hideLoading()
			
					}
			
				})
			},
			// text为传入的文本  num为单行显示的字节长度
			textByteLength: function(text, num) {
				let strLength = 0; // text byte length
				let rows = 1;
				let str = 0;
				let arr = [];
				for (let j = 0; j < text.length; j++) {
					if (text.charCodeAt(j) > 255) {
						strLength += 2;
						if (strLength > rows * num) {
							strLength++;
							arr.push(text.slice(str, j));
							str = j;
							rows++;
						}
					} else {
						strLength++;
						if (strLength > rows * num) {
							arr.push(text.slice(str, j));
							str = j;
							rows++;
						}
					}
				}
				arr.push(text.slice(str, text.length));
				return [strLength, arr, rows] //  [处理文字的总字节长度，每行显示内容的数组，行数]
			},
			//画海报
			getSharePoster: function() {
				this.paintPoster();
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
			/**
			 * 隐藏分享弹框
			 */
			hiddenShare: function() {
				this.$data.showShare = false;
				this.$data.showPoster = false;
				this.showSave = false;
				uni.hideLoading();
			},
		}
    }
</script>
<style lang="scss">
	.swiper{height: 375rpx;}
	.swiper-item{width: 100%;}
	.nav{width: 80rpx;height: 80rpx !important;margin: 0 auto;}
	.nav-box{padding: 0 0 40rpx 0;margin-bottom: 15rpx;}
	.uni-grid-item{text-align: center;margin-top: 20rpx;}
	.nav-box .text{margin-top: 8rpx;}
	.cate-box{margin-top: 15rpx;}
	.title-line{display: flex;width: 100%;justify-content: space-between;background-color: #fff;padding: 0rpx 4% 0 0%;box-sizing: border-box;align-items: center;}
	.more{color: #999;font-size: $uni-font-size-sm;}
	.bgfff{background-color: #fff;}
	.shop-box{padding: 20rpx 4%;background-color: #fff;margin-bottom: 15rpx;position: relative;}
	.shop_info{display: flex;}
	.shop_logo{width: 130rpx;height: 130rpx;margin-right: 30rpx;}
	.shop_name{margin: 5rpx 0;font-weight: bold;}
	.shop_address{color: #666;font-size: 26rpx;margin-top: 5rpx;}
	.line{display: flex;align-items: center; color: #666;}
	.tel{margin-right: 20rpx;}
	.call{color: #999;border: 1px solid #999;padding: 4rpx 10rpx;font-size: 24rpx;margin-left: 30rpx;border-radius: 10rpx;}
	.share{position: absolute;top: 20rpx;right: 4%;border: 1px solid #ececec;box-shadow: #ececec 0px 0px 2px 1px;height: 70rpx;width: 70rpx; line-height: 70rpx; border-radius: 50%;text-align: center;color: #4fd216;}
	/*分享*/

	#post-box {
		width: 80%;
		left: 10%;
		top: 10%;
		background-color: #fff;
		position: fixed;
		z-index: 1001;
	}
	.poster {
		width: 600rpx;
		height: 900rpx;
		border: 1px solid none;
		margin: 0 auto;
	}
	.maskLayer {
		left: 0;
		z-index: 1000;
	}
	.close {
		text-align: right;
		color: #999;
		font-size: 22px;
		background-color: #fff;
		border: 1px solid #ececec;
		position: absolute;
		top: -17px;
		right: -17px;
		width: 30px;
		height: 30px;
		line-height: 30px;
		border-radius: 50%;
		text-align: center;
	}
	
	.save {
		background-color: #f9f9f9;
		color: #333;
		text-align: center;
		border-radius: 30px;
		padding: 15px 0;
		margin-top: 10px;
		line-height: 1;
		font-size: 28rpx;
	}
</style>