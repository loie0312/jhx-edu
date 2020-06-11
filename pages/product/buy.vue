<template>
	<view>
	<jhx-order-product  :products="products" :is_vip="is_vip"></jhx-order-product>
	<view class="pay-foot">
		<view>合计金额：<span class="total-money">￥{{money}}</span></view>
		<view class="pay-btn" @click="create()">立即支付</view>
	</view>
	</view>
</template>

<script>
	import jhxOrderProductList from "@/components/jhx-order-product/jhx-order-product.vue";
	import {Order} from '@/model/order.js';
	var order = new Order();
	import {User} from '@/model/user.js';
	var user = new User();
	import  payment  from '@/utils/payment.js';
	import { Config } from '@/config.js';
	export default {
		components: {},
	    data() {
	        return {
				products:[],
				money:0,
				is_vip : false
	        }
	    },
	    onLoad(option) {
			this.$data.product_id = option.product_id;
			this.getData();
	    },
		methods: {
			//订单基础信息
			async getData(){
				// #ifdef H5
					await payment.wxConfigH5();
				// #endif
				var that = this;
				var param = {'product_id':this.$data.product_id};
				order.productCalc(param,(data) => {
					that.$data.products = data.data.product;
					that.$data.money = data.data.money;
					that.$data.is_vip = data.data.is_vip;
				});
			},
			//创建订单
			create(){
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
							var products_id = new Array();
							products_id.push(this.$data.product_id);
							products_id = JSON.stringify(products_id);
							var param = {
								// #ifdef H5
								trade_type: 'js',
								// #endif//
								// #ifdef MP-WEIXIN
								trade_type: 'mini_program',
								// #endif//
								openid : data.data.openid,
								products_id : products_id,
								order_type : 1
							};
							order.create(param,(data) => {
								if(data.data){
									data.data.config.timestamp = data.timestamp;
									payment.weixinPay(data.data.config);
								}
							});
						}
					});
				}
			},
		},
	}
</script>

<style lang="scss">
	.pay-foot{position: fixed;bottom: 0;background-color: #fff;display: flex;width: 100%;padding: 20rpx 3%;justify-content: space-between;box-sizing: border-box;align-items: center;}
	.pay-btn{background-color: #4CD964;color: #fff;border-radius: 30px;padding: 15rpx 50rpx;}
	.total-money{color: $uni-color-price;}
</style>
