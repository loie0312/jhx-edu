<template>
	<view>
		<view class="product-box" :class="column == 2 ? 'bgfff padding' : 'bg-gray'">
			<view class="product-item"  @tap="toDetail" :data-id="product.id" :class="col" v-for="product in productList">
					<view>
						<image mode="widthFix" class="product-img" :src="thumb && product.thumb ? product.thumb : product.picture"></image>
					</view>
					<view class="product-left">
						<view class="product-name">{{product.name}}</view>
						<!-- <view class="product-desc" v-if="column == 1">课程描述</view> -->
						<view class="product-sale">
							<view>{{product.virtual_sale}}人购买</view>
							<view>
								<span class="del-price" v-if="column == 1">￥{{product.market_price}}</span>
								<span class="price">￥<span>{{product.real_price}}</span></span>
							</view>
						</view>
					</view>
			</view>
		</view>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	/**
	 * GridItem 课程列表
	 * @description 课程列表组件
	 */
	export default {
		components: {uniLoadMore},
		name: 'JhxProductList',
		props: {
			productList:{
				type:Array,
				value:[]
			},
			column:{
				type:Number,
				value:1
			},
			status:{
				type:String,
				value:''
			},
			thumb:{
				type:Boolean,
				value:true
			}
		},
		data() {
			return {
				col : 'col-'+this.column
			}
		},
		created() {
			
		},
		beforeDestroy() {
			
		},
		methods: {
			toDetail(e) {
				console.log(e)
				var id = e.currentTarget.dataset.id ;    
				uni.navigateTo({
					url: '/pages/product/detail?id='+id,
				});
			}
		}
	}
</script>

<style lang="scss">
	.bg-gray{background-color: #f2f2f2;}
	.padding{padding: 0 4%;}
	.product-box{display: flex;box-sizing: border-box;flex-wrap: wrap;}
	.product-item{box-sizing: border-box;}
	.product-sale{display: flex;justify-content: space-between;color: #999;font-size: 24rpx;width: 100%;}
	.product-left{width: 100%;box-sizing: border-box;}
	.product-name{color: #333;font-size: $uni-font-size-base;overflow: hidden;}
	.product-desc{color: #999;font-size: 26rpx;margin-top: 10rpx;}
	.col-1 {width: 100%;background-color: #fff;display: flex;padding: 15rpx 4%;box-sizing: border-box;}
	.col-1 .product-item{display: flex;}
	.col-1 .product-img{width: 250rpx;height: 166rpx;margin-right: 20rpx;}
	.col-1 .product-name{line-height: $uni-font-size-base + 15;height:($uni-font-size-base+15) * 2;}
	.col-1 .product-sale{margin-top: 10rpx;}
	.col-2 {width: 48.5%;margin: 30rpx 0 0 0;background-color: #fff;border-radius: 5px;}
	.col-2:nth-child(odd){margin-right: 3%;}
	.col-2 .product-img{width: 100%; border-radius: 3px;}
	.col-2 .product-name{line-height: $uni-font-size-base + 15;height:($uni-font-size-base+15) * 2;}
	.col-2 .product-sale{margin-top: 10rpx;}
	.col-2 .product-left{padding: 8rpx 0rpx;}
	.price{color: $uni-color-price;}
	.price span{font-size: $uni-font-size-base+2rpx;}
	.del-price{font-size: 20rpx;text-decoration:line-through;margin-right: 20rpx;}
</style>