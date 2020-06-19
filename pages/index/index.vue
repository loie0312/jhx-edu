
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
		<uni-grid class="nav-box bgfff" :column="4" :show-border="false"  :square="false">
			<view v-for="item in nav" @click="goto(item.url)" :data-url="item.url">
				<uni-grid-item>
					<image  mode="widthFix" class="nav" :src="item.icon"></image>
					<text class="text">{{item.label}}</text>
				</uni-grid-item>
			</view>
		</uni-grid>
		<view class="title-line">
			<view class="title">推荐课程</view>
			<view @click="goto('/pages/product/search?is_top=1')" class="more">更多></view>
		</view>
		<jhx-product-list :status="recomandStatus" :productList="productList" :column="2"></jhx-product-list>
		<view class="cate-box" v-for="cate in productCate">
			<view class="title-line">
				<view class="title">{{cate[0] ? cate[0].cate.title : '' }}</view>
				<view @click="toCate" :data-cate_id="cate[0] ? cate[0].cate.id : '' " class="more">更多></view>
			</view>
			<jhx-product-list :status='nostatus' :productList="cate" :column="2"></jhx-product-list>
		</view>
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
	var jweixin = require('jweixin-module');
	var adv = new Adv();
	var system = new System();
	var product = new Product();
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import jhxProductList from "@/components/jhx-product-list/jhx-product-list.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
    export default {
		components: {uniGrid,uniGridItem},
        data() {
            return {
                banner:[],
				nav:[],
				productList:[],
				productCate:[],
				recomandStatus:'more',
				nostatus:'nostatus'
            }
        },
        onLoad() {
			this.getNav();
            this.getBanner();
			this.getProduct(); 
			this.indexCate();
			this.getConfig();
			this.config();
			var that = this;
        },
		methods: {
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
					this.config = data.data;
					wx.setStorageSync('config',this.config);
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
				// #endif
				jweixin.ready(() => {
					//自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
					jweixin.updateAppMessageShareData({
					    title: this.config ? this.config.share_title: '以墨文化',// 分享标题
					    desc: this.config ? this.config.share_desc: '以墨文化', // 分享描述
					    link: Config.domain+'/pages/index/index', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					    imgUrl: this.config ? this.config.share_cover : '', // 分享图标
					    success: function () {
					    }
					})
					//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
					jweixin.updateTimelineShareData({
						title: this.config ? this.config.share_title: '以墨文化',// 分享标题
						link: Config.domain+'/pages/index/index', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: this.config ? this.config.share_cover : '', // 分享图标
						success: function () {
						  // 设置成功
						}
					})
				})
			},
		}
    }
</script>
<style lang="scss">
	.swiper{height: 375rpx;}
	.swiper-item{width: 100%;}
	.nav{width: 80rpx;height: 80rpx !important;margin: 0 auto;}
	.nav-box{padding: 0 0 40rpx 0;margin-bottom: 15rpx;}
	.uni-grid-item{text-align: center;margin-top: 40rpx;}
	.nav-box .text{margin-top: 8rpx;}
	.cate-box{margin-top: 15rpx;}
	.title-line{display: flex;width: 100%;justify-content: space-between;background-color: #fff;padding: 0rpx 4% 0 0%;box-sizing: border-box;align-items: center;}
	.more{color: #999;font-size: $uni-font-size-sm;}
</style>