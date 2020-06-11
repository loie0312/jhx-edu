<template>
	<view class="wrap">
		<view class="card-name">以墨文化学习卡</view>
		<view class="main">
			<view class="sub-title">购买须知</view>
			<view>
				<view class="note">购买vip会员后购买课程将得到相应的优惠，部分课程对vip会员免费。</view>
			</view>
			<view class="sub-title">服务类型</view>
			<view class="vip-items">
				<view class="vip-item" v-for="(item,index) in vips" :class="index == currentIndex ? 'active' : ''">
					<view>{{item.name}}</view>
					<view><span class="money-label">￥</span><span class="money">{{item.price | money}}</span></view>
					<view class="market-price">￥{{item.market_price | money}}</view>
					<view>有效期{{item.day}}天</view>
					<uni-icons class="icon" :class="index == currentIndex ? '' : 'hide'" type="checkmarkempty"></uni-icons>
				</view>
			</view>
		</view>
		<view class="pay-foot">
			<view>金额：<span>￥{{price}}</span></view>
			<view class="pay-btn" @click="create()">立即购买</view>
		</view>
	</view>
</template>

<script>
	import {User} from '@/model/user.js';
	var user = new User();
	import { Config } from '@/config.js';
	import {Order} from '@/model/order.js';
	var order = new Order();
	import  payment  from '@/utils/payment.js';
	export default {
	    data() {
	        return {
	            vips:[],
				currentIndex:0,
				price:0
	        }
	    },
	    onLoad() {
			this.lists();
			this.config();
	    },
		filters: {
			// 去掉金额后面的0
			money(value) {
				if (value == parseInt(value)){
				     return parseInt(value)
				} else if (value == parseFloat(value)){
				  return parseFloat(value)
				}
				else{
				  return value
				}
			},
		},
		methods: {
			//会员卡类型
			lists:function(){
				var that = this;
				var param ={};
				user.vipList(param,(data) => {
					that.$data.vips = data.data;
					if(data.data.length > 0){
						that.$data.price = data.data[0].price
					}
				});
			},
			async config(){
				// #ifdef H5
					await payment.wxConfigH5();
				// #endif
			},
			//创建订单
			create:function(){
				var that = this;
				if(Config.payList.length == 1 && Config.payList[0] == 'wxpay'){
					//如果仅使用微信支付，需要先确定当前用户是否已经进行小程序或微信授权
					var bind_param = {
						// #ifdef H5
						oauth_client: 'wechat',
						// #endif
						// #ifdef MP-WEIXIN
						oauth_client: 'wechatMp'
						// #endif
					}
					//判断是否已使用小程序或公众号授权过
					user.isBind(bind_param,(data) => {
						if(data.code == 200){
							console.log(that.$data.currentIndex);
							var param = {
								// #ifdef H5
								trade_type: 'js',
								// #endif//
								// #ifdef MP-WEIXIN
								trade_type: 'mini_program',
								// #endif//
								openid : data.data.openid,
								products_id : that.$data.vips[that.$data.currentIndex].id,
								order_type : 2
							};
							order.vipCreate(param,(data) => {
								if(data.data){
									payment.weixinPay(data.data.config);
								}
							});
						}
					});
				}
			},
		}
	}
</script>

<style lang="scss">
	.wrap{background-image: linear-gradient(to bottom, #fee9a6 , #fffdf3);height: 100vh;}
	.card-name{text-align: center;font-weight: bold;font-size: $uni-font-size-lg;padding: 60rpx 0;color: #865400;}
	.main{background-color: #fff;width: 92%;margin: 0 auto;padding: 20rpx 25rpx 40rpx 25rpx;border-radius: 10rpx;box-sizing: border-box;}
	.vip-items{overflow: scroll;white-space: nowrap;}
	.vip-item{position: relative;width: 33%; display: inline-block; border: 1px solid $uni-border-color;margin-right: 20rpx;padding: 20rpx 20rpx;border-radius: 10rpx;}
	.vip-items .active{background-color: #fff9e0;border: 1px solid #ffbe3a;}
	.sub-title{font-weight: bold;padding: 20rpx 0;font-size: $uni-font-size-base+2rpx;}
	.money{font-weight: bold;font-size: 50rpx;}
	.market-price{font-size: $uni-font-size-sm;color: $uni-text-color-grey;text-decoration:line-through;}
	.icon{position: absolute;bottom: 0;right: 0;color: #ffbe3a !important;}
	.pay-foot{position: fixed;bottom: 0;background-color: #fff;display: flex;width: 100%;padding: 20rpx 3%;justify-content: space-between;box-sizing: border-box;align-items: center;}
	.pay-btn{background-image: linear-gradient(to right, #f4cc38 , #fae05f);color: #333;border-radius: 30px;padding: 15rpx 50rpx;}
	.note {line-height: $uni-font-size-base+15rpx;}
</style>
