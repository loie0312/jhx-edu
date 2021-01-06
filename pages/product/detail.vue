<template>
	<view class="uni-padding-wrap">
	    <view class="page-section swiper">
	        <view class="page-section-spacing">
	            <swiper class="swiper"  :autoplay="true">
	                <swiper-item v-for="item in product.cover">
	                    <image mode="widthFix" class="swiper-item uni-bg-red" :src="item"></image>
	                </swiper-item>
	            </swiper>
	        </view>
	    </view>
		<view class="row">
			<view class="product-name">{{product.name}}</view>
			<view class="attr-line">
				<span>共含{{product.content_count}}节课</span>
				<span>{{product.virtual_sale}}人购买</span>
			</view>
			<view class="price-line">
				<span v-if="(is_vip ? product.vip_price : product.real_price) > 0">￥</span>
				<span class="price-big">{{(is_vip ? product.vip_price : product.real_price) | money}}</span>
				<span class="market-price">原价{{product.market_price}}</span>
				<!--  分享 -->
				<view class="share-section" v-if="product.name">
					<view class="share-icon" @click="getSharePoster">
						海报
					</view>
					<!-- #ifdef MP-WEIXIN -->
					<button :disabled="!!product" class="share-btn" open-type="share">
						立即分享
						<i class="iconfont iconyou"></i>
					</button>
					<!-- #endif -->
				</view>
			</view>
			<view class="common-line border-top">
				<view class="label">优惠</view>
				<view v-if="product.vip_price > 0 ">vip价格￥{{product.vip_price}}</view>
				<view v-else>vip免费</view>
			</view>
		</view>
		<view v-if="!is_vip" class="open-vip" @click="openVip()">
			<view>{{vip_min_price | toInt}}元开通vip，享受优惠</view>
			<view>立即开通<uni-icons class="icon" type="forward"></uni-icons></view>
		</view>
		<view class="detail">
			<view class="detail-items">
				<view v-for="(item,index) in items" :class="index == current ? 'active' : ''" @click="onClickItem(index)" class="detail-item">
					<text class="text">{{item}}</text>
				</view>
			</view>
			<view class="detail-content" :class="current == 0 ? '' : 'hide'">
				<rich-text :nodes="product.data.content | formatRichText"></rich-text>
			</view>

			<view class="detail-content" :class="current == 1 ? '' : 'hide'">
				<jhx-product-content  :contents="content" :is_vip="is_vip" :status="contentStatus" :buyed="buyed" :column="1"></jhx-product-content>
			</view>
		</view>
		<view style="height: 50px;width: 100%;"></view>
		<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		<view class="show-box" :class="showPoster ? '' : 'hide'" id="post-box" data-loaded="0">
			<!-- canvas浏览，点击生成海报先绘画成canvas，然后canvas再储存为图片 -->
			<view :class="showSave ? 'hide' : ''">
				<canvas canvas-id="shareCanvas" id="shareCanvas" width="300" height="500" class="poster"></canvas>
				
				<view class="canvas-img"></view>
			</view>
			<view :class="showSave ? 'img' : 'hide'">
				<img style="width: 100%;" :src="posterImg" />
			</view>
			<view class="iconfont icon-cuowu close" :class="showPoster ? '' : 'hide'" @click='hiddenShare'>x</view>
			<view class="save">{{showSave ? '长按图片保存到相册' : '正在生成...'}}</view>
			
		</view>
		<view class='maskLayer' :class="showPoster ? '' : 'hide'" @click='hiddenShare'></view>
	</view>
</template>

<script>
	import jhxProductContent from "@/components/jhx-product-content/jhx-product-content.vue";
	import {Product} from '@/model/product.js';
	var productModel = new Product();
	import {User} from '@/model/user.js';
	var user = new User();
	import {Common} from '@/utils/common.js';
	var common = new Common();
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import moment from '@/utils/moment';
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue';
	import  payment  from '@/utils/payment.js';
	import QRCode from "@/utils/wxqrcode.js" // 二维码生成器
	// #ifdef H5
	var jweixin = require('jweixin-module');
	// #endif
	import { Config } from '../../config.js';
	export default {
		components: {uniIcons,uniGoodsNav,jhxProductContent},
	    data() {
	        return {
				page : 1, // 目录页码
				contentStatus:'more', //目录加载状态,
				buyed : false, //是否已购买该课程
				id:'',
				product:{
					data:{content:''}
				},
				is_vip : false,
				vip_min_price:0,
				content:[], //目录
				items: ['详情', '目录'],
				current: 0,
				favorite:false,
				//底部
				options: [{
					icon: 'home',
					text: '首页',
					class:'normal'
				},{
					icon: 'heart-filled',
					text: '收藏',
					class:'normal'
				}],
				buttonGroup: [
					{
						text: '购买专栏',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				],
				showPoster:false,
				showSave:false,
				posterImg:'',
				qrcodeImg:'',
				productImage:''
	        }
	    },
	    onLoad(option) {
			this.user = uni.getStorageSync('userInfo');
			this.$data.is_vip = this.isVip();
			//保存分销者的id
			if(option.pid){
				uni.setStorageSync('pid',option.pid);
			}
			//获取开通vip的最低价格
			if(!this.$data.is_vip){
				this.getVipMin();
			}
			this.id = option.id;
			this.getDetail();
			this.getContent();
	    },
		//加载更多
		onReachBottom() {
			if(this.contentStatus == 'noMore'){
				return false;
			}
			if(this.current == 1){
				this.page++;
				this.getContent();
			}
		},
		//分享
		onShareAppMessage() {
			var uid = this.user && this.user.id ? this.user.id : '';
			return {
			  title: this.$data.product.name,
			  path: Config.domain+'/pages/product/detail?id=' + this.id + '&pid='+uid
			}
		},
		filters: {
		    /**
			 * 处理富文本里的图片宽度自适应
			 * 1.去掉img标签里的style、width、height属性
			 * 2.img标签添加style属性：max-width:100%;height:auto
			 * 3.修改所有style里的width属性为max-width:100%
			 * 4.去掉<br/>标签
			 * @param html
			 * @returns {void|string|*}
			 */
			formatRichText (html) { //控制小程序中图片大小
				if (html) {
					let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
								if(match.search(/style=/gi) == -1){
									match = match.replace(/\<img/gi,'<img style=""');
								}
								return match;
							});
							newContent = newContent.replace(/style="/gi, '$& max-width:100% !important; ');
							newContent = newContent.replace(/<br[^>]*\/>/gi, '');
							return newContent;
				} else {
					return '暂无详情'
				}
			},
			// 时间格式化
			time(val) {
				return moment(val * 1000).format('YYYY-MM-DD')
			},
			// 把0换成免费
			money(value) {
				if (value > 0){
					return value
				}else{
					return '免费'
				}
			},
			//去掉小数点的0
			toInt(value){
				if (value == parseInt(value)){
				    return parseInt(value)
				} else if (value == parseFloat(value)){
					return parseFloat(value)
				}
				else{
				  return value
				}
			}
		},
		methods: {
			//详情
			getDetail:function(){
				var that = this;
				var param = {'id':this.id};
				productModel.view(param,(data) => {
					that.$data.product=data.data;
					that.favorite = data.data.myCollect ? true : false;
					that.$data.options[1].class = that.favorite ? 'active' : 'normal';
					that.current = data.data.show_type == 2 ? 1 : 0;
					that.config();
				});
			},
			//目录
			getContent:function(){
				var that = this;
				var page_size = 10;
				var param = {'product_id':this.id,'page_size':page_size,'page':this.page};
				that.$data.contentStatus = 'loading';
				productModel.content(param,(data) => {
					this.$data.buyed = data.data.buyed;
					var items = that.content.concat(data.data.contents);
					that.$data.content = items;
					if(data.data.contents.length < page_size){
						that.$data.contentStatus = 'noMore';
					}else{
						that.$data.contentStatus = 'more';
					}
				});
			},
			//vip最低价
			getVipMin:function(){
				var that = this;
				var param = {'id':this.id};
				user.vipMin(param,(data) => {
					if(data.data){
						that.$data.vip_min_price = data.data.price
					}
				});
			},
			//分享配置
			config(){
				var that = this;
				// #ifdef H5
				payment.wxConfigH5();
				
				jweixin.ready(() => {
					var uid = this.user && this.user.id ? this.user.id : '';
					//自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
					jweixin.updateAppMessageShareData({ 
					    title: that.$data.product.name, // 分享标题
					    desc: '分享一个很好的课程给你', // 分享描述
					    link: Config.domain+'/pages/product/detail?id=' + that.$data.product.id + '&pid='+uid, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					    imgUrl: that.$data.product.picture, // 分享图标
					    success: function () {
					    }
					})
					//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
					jweixin.updateTimelineShareData({ 
						title: that.$data.product.name, // 分享标题
						link: Config.domain+'/pages/product/detail?id=' + that.$data.product.id + '&pid='+uid, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: that.$data.product.picture, // 分享图标
						success: function () {
						  // 设置成功
						}
					})
				})
				// #endif
			},
			// 收藏
			async toFavorite() {
				if (!this.product.id) return;
				this.favorite ? this.handleCollectDel() : this.handleCollectCreate();
			},
			// 收藏商品
			handleCollectCreate() {
				var param = {
					topic_id: this.product.id,
					topic_type: 'product'
				}
				productModel.collectCreate(param,(data) => {
					this.favorite = !this.favorite;
					this.$data.options[1].class = this.favorite ? 'active' : 'normal';
					uni.showToast({
						title:'收藏成功'
					})
				})
			},
			// 取消收藏商品
			async handleCollectDel() {
				var param = {
					id: this.product.myCollect.id,
				}
				productModel.collectDelete(param,(data) => {
					this.favorite = !this.favorite;
					this.$data.options[1].class = this.favorite ? 'active' : 'normal';
					uni.showToast({
						icon:'none',
						title:'取消收藏成功'
					})
				})
			},
			//首页
			onClick (e) {
				if(e.index == 0){
					uni.switchTab({
						url:'/pages/index/index'
					})
				}else if(e.index == 1){
					this.toFavorite();
				}
			},
			//去购买
			buttonClick (e) {
				if(e.index == 0){
					uni.navigateTo({
						url:'buy?product_id='+this.$data.id
					})
				}
			},
			//详情和目录切换
			onClickItem(val) {
				this.$data.current = val
			},
			//跳转到开通会员
			openVip(){
				uni.navigateTo({
					url:'/pages/user/vipbuy'
				})
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
				var goods_name = this.product ? this.product.name: '以墨文化';
				var productImage = this.product ? this.product.cover[0] : '';
				if (!goods_name || !productImage) {
					uni.showToast({
						title: "分享信息正在加载，请稍后重试",
						icon:'loading'
					})
					return false;
				}
				// uni.showLoading({
				// 	title: '生成图片中~',
				// 	mask: true
				// })
				_this.$data.showShare = false;
				_this.isShare = true
				const wxGetImageInfo = _this.promisify(uni.getImageInfo)
				Promise.all([
					wxGetImageInfo({
						src: productImage
					})
				]).then(res => {
					var sWidth = uni.getSystemInfoSync().windowWidth;
					var sHeight = uni.getSystemInfoSync().windowHeight;
					const ctx = uni.createCanvasContext('shareCanvas');
					var width = parseInt(sWidth*0.8);
					var height = 450;
					ctx.drawImage(this.qrcodeImg, 100, width*0.66 + 100, 100, 100);
					//画布白色背景
					ctx.setFillStyle('#FFFFFF')
					ctx.fillRect(0, 0, width, height);
					//网站标题
					ctx.setFontSize(14);
					ctx.setFillStyle('#ff6600');
					var num = parseInt((width - 110) / 14) * 2;
					var desc =  '以墨文化';
					var rs = _this.textByteLength(desc, num);
					rs[1].forEach((item, index) => {
						ctx.fillText(item, 20, 30 + 20 * index);
					})
					//商品图片
					ctx.drawImage(_this.productImage, 20, 50, width-40, (width-40)*0.66);
					//商品名称
					ctx.setFontSize(14);
					ctx.setFillStyle('#333');
					var num = parseInt((width - 40) / 14) * 2
					var rs = _this.textByteLength(goods_name, num);
					var baseHeight = width*0.66+40;
					rs[1].forEach((item, index) => {
						ctx.fillText(item, 20, baseHeight + 20 * index);
					})
					//价格
					ctx.setFontSize(12);
					ctx.setFillStyle('#ff6600');
					var num = parseInt((width - 40) / 14) * 2
					var rs = _this.textByteLength("￥", num);
					var baseHeight = width*0.66+80;
					rs[1].forEach((item, index) => {
						ctx.fillText(item, 20, baseHeight + 20 * index);
					})
					//价格
					ctx.setFontSize(16);
					ctx.setFillStyle('#ff6600');
					var num = parseInt((width - 40) / 14) * 2
					var rs = _this.textByteLength(this.product?this.product.real_price:'', num);
					var baseHeight = width*0.66+80;
					rs[1].forEach((item, index) => {
						ctx.fillText(item, 30, baseHeight + 20 * index);
					})
					//原价
					ctx.setFontSize(12);
					ctx.setFillStyle('#999');
					var num = parseInt((width - 40) / 14) * 2
					var market = this.product?this.product.market_price:'';
					market = '原价：'+ market;
					var rs = _this.textByteLength(market, num);
					var baseHeight = width*0.66+80;
					rs[1].forEach((item, index) => {
						ctx.fillText(item, 90, baseHeight + 20 * index);
					})
					//二维码 
					ctx.drawImage(this.qrcodeImg, 100, width*0.66 + 100, 100, 100);
					//描述
					// ctx.setFontSize(14);
					// ctx.setFillStyle('#ff6600');
					// var num = parseInt((width - 110) / 14) * 2;
					// var desc = _this.configData ? _this.configData.share_desc : '课程火热抢购中';
					// var rs = _this.textByteLength(desc, num);
					// var baseHeight = width+100;
					// rs[1].forEach((item, index) => {
					// 	ctx.fillText(item, 115, baseHeight + 20 * index);
					// })
					
					
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
									_this.posterImg = res.tempFilePath;
									
								},
								fail(res){
									console.log(res);
									uni.showToast({
										title:'海报生成失败'
									})
								},complete(res) {
									uni.hideLoading();
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
				this._makeCode("http://wx.qzlhslgy.com/pages/product/detail?id="+this.id);
			},
			/**
			 * 隐藏分享弹框
			 */
			hiddenShare: function() {
				this.$data.showShare = false;
				this.$data.showFriend = false;
				this.$data.showPoster = false;
				this.showSave = false;
				uni.hideLoading();
			},
			_makeCode(content) {
				var that = this;
				let img = QRCode.createQrCodeImg(content, {  
				     size: parseInt(110)//二维码大小  
				})
				this.qrcodeImg = img;
				let image = new Image();
				// 解决跨域 Canvas 污染问题
				image.setAttribute("crossOrigin", "anonymous");
				image.src =  this.product ? this.product.cover[0] : '';
				uni.showLoading({
					title:'正在加载图片...'
				})
				image.onload=function(){
					var base64=that.getBase64Image(image);
					that.productImage = base64;
					uni.hideLoading();
					that.paintPoster();
				}
				
			},
			getBase64Image:function(img){
				var canvas=document.createElement("canvas");
				canvas.width=img.width;
				canvas.height=img.height;
				var ctx=canvas.getContext("2d");
				ctx.drawImage(img,0,0,img.width,img.height);
				var ext=img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
				var dataUrl=canvas.toDataURL("images/"+ext);
				return dataUrl;
			}
		}
	}
</script>

<style lang="scss">
	.swiper{height: 500rpx;}
	.swiper-item{width: 100%;}
	.detail-items{border-bottom:1px solid $uni-border-color;display: flex;}
	.detail-item{flex:1;text-align: center;}
	.detail-item .text{line-height: 80rpx;padding: 20rpx 0; }
	.active .text{border-bottom: 4rpx solid $uni-color-base;}
	.detail{background-color: #fff;padding: 10rpx 0;margin-top: 15rpx;}
	.detail-content{padding: 20rpx 20rpx 0 20rpx ;}
	.row{background-color: #fff;padding: 0 3%;}
	.product-name{padding: 20rpx 0 0 0;font-size: $uni-font-size-lg;font-weight: bold;}
	.price-line{color: $uni-color-base;padding: 20rpx 0 0 0;}
	.market-price{color: #999;font-size: $uni-font-size-sm;text-decoration: line-through;margin-left: 40rpx;}
	.attr-line{font-size: $uni-font-size-sm;color: $uni-text-color-grey;padding: 20rpx 0 0 0;}
	.attr-line span{margin-right: 40rpx;}
	.open-vip{background-color: #f9e5bf;padding: 20rpx 3%;display: flex;justify-content: space-between;}
	.border-top{border-top:1px solid $uni-border-color;margin-top: 20rpx;}
	.share-icon{position: fixed;right: 0; top:650rpx;background-color: rgba(#ececec,0.6);padding: 10rpx 20rpx;border-top-left-radius: 30rpx;border-bottom-left-radius: 30rpx;}
	/*分享*/
	
	#post-box {
		width: 80%;
		left: 10%;
		top: 5%;
		background-color: #fff;
		position: fixed;
		z-index: 1001;
	}
	.poster {
		width: 300px;
		height: 500px;
		border: 1px solid none;
		margin: 0 auto;
		background-color: #fff;
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
