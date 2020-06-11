<template>
	<view>
		<view v-for="c in contents" class="content-item" data-id="c.id" data-price_type="c.price_type" @click="toContent(c.id,c.price_type)">
			<view>
				<span class="tag">{{c.type | contentType}}</span>
			</view>
			<view>
				<view>{{c.name}}</view>
				<view class="content-date">
					<span>{{c.created_at | time}}</span>
					<span v-if="c.price_type == 1">免费</span>
					<span v-else-if="c.price_type == 2">vip免费</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import moment from '@/utils/moment';
	import {Common} from '@/utils/common.js';
	var common = new Common();
	/**
	 * JhxOrderList 订单列表
	 * @description 订单列表组件
	 */
	export default {
		name: 'JhxProductContent',
		props: {
			contents:Array,
			column:Number,
			is_vip:Boolean
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
			// 章节类型
			contentType(type) {
				var obj = common.contentType(type);
				return obj.text;
			},
			// 时间格式化
			time(val) {
				return moment(val * 1000).format('YYYY-MM-DD')
			},
		},
		methods: {
			//跳转到目录详情
			toContent(id,price_type){
				if(price_type == 2 && !this.$data.is_vip){
					uni.showToast({
						icon:'none',
						title:'该章节开通vip后可免费观看'
					})
					return ;
				}else if(price_type == 3 && !this.$data.buyed){
					uni.showToast({
						icon:'none',
						title:'该章节购买专栏后可免费观看'
					})
					return ;
				}
				uni.navigateTo({
					url:'/pages/product/content-detail?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
.content-item{display: flex;align-items: center;border-bottom:1px solid $uni-border-color;padding: 20rpx 3%;}
.content-item .tag{font-size: $uni-font-size-sm; border:1px solid $uni-border-color;margin-right: 40rpx;padding: 5rpx 10rpx;}
.content-date{color: $uni-text-color-grey;font-size: $uni-font-size-sm;margin-top: 10rpx;}
.content-date span{margin-right: 40rpx;}
</style>