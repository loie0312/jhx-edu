
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
		<view class="title">推荐课程</view>
		<jhx-product-list  :productList="productList" :column="2"></jhx-product-list>
		<view class="cate-box" v-for="cate in productCate">
			<view class="title">{{cate[0] ? cate[0].cate.title : '' }}</view>
			<jhx-product-list  :productList="cate" :column="1"></jhx-product-list>
		</view>
    </view>
	
</template>

<script>
	import { Config } from '../../config.js';
	import {Adv} from '@/model/adv.js';
	import {System} from '@/model/system.js';
	import {Product} from '@/model/product.js';
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
				productCate:[]
            }
        },
        onLoad() {
			this.getNav();
            this.getBanner();
			this.getProduct(); 
			this.indexCate();
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
				product.lists(param,(data) => {
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
		}
    }
</script>
<style>
	.swiper{height: 375rpx;}
	.swiper-item{width: 100%;}
	.nav{width: 80rpx;height: 80rpx !important;margin: 0 auto;}
	.nav-box{padding: 0 0 40rpx 0;margin-bottom: 15rpx;}
	.uni-grid-item{text-align: center;margin-top: 40rpx;}
	.nav-box .text{font-size: 26rpx;margin-top: 8rpx;}
	.title{background-color: #fff;padding: 20rpx 0 0 4%;}
	.cate-box{margin-top: 15rpx;}
</style>