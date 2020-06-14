<template>
	<view class="order-product-box">
		<view class="order-product-item col-1"   @tap="toDetail" :data-id="product.id" v-for="product in products">
				<view>
					<image mode="widthFix" class="product-img" :src="product.picture"></image>
				</view>
				<view class="product-left">
					<view class="product-name">{{product.name}}</view>
					<view class="product-desc" v-if="column == 1">课程描述</view>
					<view class="product-sale">
						<view>
							<span class="del-price">￥{{product.market_price}}</span>
							<span v-if="!is_vip" class='real_price'>￥{{product.real_price}}</span>
							<span v-if="is_vip">会员价 <span class='real_price'>￥{{product.vip_price}}</span></span>
						</view>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	/**
	 * GridItem 宫格
	 * @description 宫格组件
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=27
	 * @property {Number} index 子组件的唯一标识 ，点击gird会返回当前的标识
	 */
	export default {
		name: 'JhxOrderProduct',
		props: {
			products:Array,
			is_vip:Boolean,
			buyed:Boolean,
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
			}
		}
	}
</script>

<style lang="scss">
	.bg-gray{background-color: #f2f2f2;}
	.padding{padding: 0 4%;}
	.product-box{display: flex;box-sizing: border-box;flex-wrap: wrap;}
	.product-item{box-sizing: border-box;}
	.product-sale{display: flex;justify-content: flex-end;color: #999;margin-top: 30rpx;width: 100%;}
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