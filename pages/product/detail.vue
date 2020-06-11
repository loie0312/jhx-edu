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
				<span>共含1节课</span>
				<span>{{product.virtual_sale}}人购买</span>
			</view>
			<view class="price-line">
				<span v-if="(is_vip ? product.vip_price : product.real_price) > 0">￥</span>
				<span class="price-big">{{(is_vip ? product.vip_price : product.real_price) | money}}</span>
				<span class="market-price">原价{{product.market_price}}</span>
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
			<tabControl class="detail-tab" :current="current" :values="items" bgc="#fff" :fixed="false" :scrollFlag='true' :isEqually='true' @clickItem="onClickItem" ></tabControl>
			<swiper class="swiper detail-swiper" style="height: 500rpx;" @change='scollSwiper' :current='current'>
				<swiper-item class="detail-box swiper-item" >
					<scroll-view scroll-y="true" style="height:auto;">
						<rich-text :nodes="product.data.content | formatRichText"></rich-text>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y="true" style="height: auto;">
						<jhx-product-content  :contents="content" :is_vip="is_vip" :column="1"></jhx-product-content>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<view style="height: 50px;width: 100%;"></view>
		<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
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
	import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
	import moment from '@/utils/moment';
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue';
	export default {
		components: {uniIcons,tabControl,uniGoodsNav},
	    data() {
	        return {
				id:'',
				product:{
					data:{content:''}
				},
				is_vip : false,
				vip_min_price:0,
				content:[], //目录
				items: ['详情', '目录'],
				current: 0,
				//底部
				options: [{
					icon: 'shop',
					text: '首页',
				}],
				buttonGroup: [
					{
						text: '购买专栏',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]     
	        }
	    },
	    onLoad(option) {
			this.$data.is_vip = this.isVip();
			//获取开通vip的最低价格
			if(!this.$data.is_vip){
				this.getVipMin();
			}
			this.id = option.id;
			this.getDetail();
			this.getContent();
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
				});
			},
			//目录
			getContent:function(){
				var that = this;
				var param = {'product_id':this.id,'page_size':10};
				productModel.content(param,(data) => {
					that.$data.content=data.data;
				});
			},
			//详情
			getVipMin:function(){
				var that = this;
				var param = {'id':this.id};
				user.vipMin(param,(data) => {
					if(data.data){
						that.$data.vip_min_price = data.data.price
					}
				});
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
				this.current = val.currentIndex
			},
			scollSwiper(e){
				this.current = e.target.current
			},
			//跳转到开通会员
			openVip(){
				uni.navigateTo({
					url:'/pages/user/vipbuy'
				})
			},
			
		}
	}
</script>

<style lang="scss">
	.detail-tab{border-bottom:1px solid $uni-border-color;}
	.detail{background-color: #fff;padding: 0rpx 0;margin-top: 15rpx;}
	.swiper{height: 500rpx;}
	.detail-swiper{padding: 20rpx 0 0 0 ;}
	.swiper-item{width: 100%;}
	.row{background-color: #fff;padding: 0 3%;}
	.product-name{padding: 20rpx 0 0 0;font-size: $uni-font-size-lg;font-weight: bold;}
	.price-line{color: $uni-color-base;padding: 20rpx 0 0 0;}
	.market-price{color: #999;font-size: $uni-font-size-sm;text-decoration: line-through;margin-left: 40rpx;}
	.attr-line{font-size: $uni-font-size-sm;color: $uni-text-color-grey;padding: 20rpx 0 0 0;}
	.attr-line span{margin-right: 40rpx;}
	.open-vip{background-color: #f9e5bf;padding: 20rpx 3%;display: flex;justify-content: space-between;}
	.border-top{border-top:1px solid $uni-border-color;margin-top: 20rpx;}
</style>
