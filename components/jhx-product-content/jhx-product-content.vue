<template>
	<view>
		<view v-for="c in contents" class="content-item" data-id="c.id" data-price_type="c.price_type" @click="toContent(c.id,c.price_type,c.pre_time)">
			<view class="content-left">
				<span class="tag">{{c.type | contentType}}</span>
				<view>
					<view>{{c.name}}</view>
					<view class="content-date">
						<span>{{c.created_at | time}}</span>
						<span v-if="c.price_type == 1">免费</span>
						<span v-else-if="c.price_type == 2">vip免费</span>
						<span v-else-if="c.price_type == 3">购买专栏后学习</span>
					</view>
					<view class="pre_time" v-if="c.pre_time > 0">免费试看<text class="second">{{c.pre_time}}秒</text></view>
				</view>
			</view>
			<view>
				<view v-if="!buyed">
					<uni-icons type="locked" v-if="c.price_type == 2 && !is_vip && c.pre_time < 0"></uni-icons>
					<uni-icons type="locked" v-else-if="c.price_type == 3 && c.pre_time < 0"></uni-icons>
				</view>
				
			</view>
		</view>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import moment from '@/utils/moment';
	import {Common} from '@/utils/common.js';
	var common = new Common();
	/**
	 * JhxOrderList 订单列表
	 * @description 订单列表组件
	 */
	export default {
		components: {uniIcons,uniLoadMore},
		name: 'JhxProductContent',
		props: {
			contents:Array,
			column:Number,
			is_vip:Boolean,
			buyed:Boolean,
			status:String
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
			toContent(id,price_type,pre_time = 0){
				if(!this.buyed){
					if(price_type == 2 && (!this.$data.is_vip ) && pre_time <= 0){
						uni.showToast({
							icon:'none',
							title:'该章节开通vip后可免费观看'
						})
						return ;
					}else if(price_type == 3  && pre_time <= 0){
						uni.showToast({
							icon:'none',
							title:'该章节购买专栏后可免费观看'
						})
						return ;
					}
				}
				uni.navigateTo({
					url:'/pages/product/content-detail?id='+id
				})
				
			}
		}
	}
</script>

<style lang="scss">
.content-item{display: flex;align-items: center;justify-content: space-between; border-bottom:1px solid $uni-border-color;padding: 20rpx 3%;}
.content-item .tag{font-size: $uni-font-size-sm; border:1px solid $uni-border-color;margin-right: 40rpx;padding: 0rpx 10rpx;height: 38rpx;line-height: 38rpx;}
.content-date{color: $uni-text-color-grey;font-size: $uni-font-size-sm;margin-top: 10rpx;}
.content-date span{margin-right: 40rpx;}
.content-left{display: flex;align-items: center;}
.pre_time{font-size: 24rpx;color: #ff6600;margin-top: 10rpx;}
.second{color: #ff6600;}
</style>