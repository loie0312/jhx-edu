<template>
	<view class="order-product-box">
		<view class="order-product-item col-1"   @tap="toDetail" :data-id="order.id" v-for="order in orderList">
				<view>
					<image mode="widthFix" class="product-img" :src="order['product'].picture"></image>
				</view>
				<view class="product-left">
					<view class="product-name">{{order['product'].name}}</view>
					<view class="product-desc" v-if="column == 1"></view>
					<view class="product-sale">
						<view class="product-sale">
							<span class="price"> {{order.pay_time | time}} </span>
							<span class="real_price">￥{{order.pay_money}} </span>
						</view>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	import moment from '@/utils/moment';
	/**
	 * JhxOrderList 订单列表
	 * @description 订单列表组件
	 */
	export default {
		name: 'JhxOrderList',
		props: {
			orderList:Array,
			column:Number
		},
		data() {
			return {
				
			}
		},
		created() {
			
		},
		beforeDestroy() {
			
		},
		filters: {
			time(val) {
				return moment(val * 1000).format('YYYY-MM-DD')
			},
			// 章节类型
			contentType(type) {
				var obj = common.contentType(type);
				return obj.text;
			},
		},
		methods: {
			_onClick() {
				this.grid.change({
					detail: {
						index: this.index
					}
				})
			},
			toDetail(e) {
				var id = e.currentTarget.dataset.id ;    
				uni.navigateTo({
					url: '/pages/product/detail?id='+id,
				});
			},
			
		}
	}
</script>

<style lang="scss">
	.bg-gray{background-color: #f2f2f2;}
	.padding{padding: 0 4%;}
	.product-box{display: flex;box-sizing: border-box;flex-wrap: wrap;}
	.product-item{box-sizing: border-box;}
	.product-sale{display: flex;justify-content: space-between;color: #999;font-size: 24rpx;margin-top: 30rpx;width: 100%;}
	.product-left{width: 100%;box-sizing: border-box;}
	.product-name{color: #333;font-size: $uni-font-size-base;overflow: hidden;}
	.product-desc{color: #999;font-size: 26rpx;margin-top: 10rpx;}
	.col-1 {width: 100%;background-color: #fff;display: flex;padding: 10rpx 4%;box-sizing: border-box;align-items:flex-start;}
	.col-1 .product-item{display: flex;}
	.col-1 .product-img{width: 200rpx;height: 133rpx;margin-right: 20rpx;}
	.col-2 {width: 48%;margin: 30rpx 0 0 0;background-color: #fff;border-radius: 5px;}
	.col-2:nth-child(odd){margin-right: 4%;}
	.col-2 .product-img{width: 100%;border-radius: 3px;}
	.col-2 .product-name{line-height: $uni-font-size-base + 10;height:($uni-font-size-base+10) * 2;}
	.col-2 .product-left{padding: 8rpx 8rpx;}
	.del-price{font-size: 20rpx;text-decoration:line-through;margin-right: 30rpx;}
	.real_price{color: $uni-color-price;}
</style>