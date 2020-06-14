<template>
	<view class="footprint">
		<!--分销列表-->
		<view :options="options" :info="item" @action="bindClick" :key="index" class="rf-swipe-item" v-for="(item, index) in footPrintList">
			<view class="rf-list-item" >
				<view class="left">
					<image class="image" :src="item.member && item.member.head_portrait"></image>
				</view>
				<view class="mid">
					<view class="title in2line">贡献者：{{ item.member && item.member.nickname }}</view>
					<view class="bottom">
						<text class="price">贡献金额：￥{{ item.money }}</text>
						<text>{{ item.created_at | time }}</text>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	/**
	 * @des 我的足迹
	 */
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import {
		User
	} from '@/model/user.js';
	var user = new User();
	import moment from '@/utils/moment';

	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				footPrintList: [],
				page: 1,
				loadingType: 'more',
				token: null,
				loading: true,
				empty: ''
			};
		},
		filters: {
			// 时间格式化
			time(val) {
				return moment(val * 1000).format('MM-DD HH:mm:ss')
			}
		},
		//加载更多
		onReachBottom() {
			this.page++;
			this.getFootPrintList();
		},
		onLoad() {
			this.getData();
		},
		methods: {
			// 获取分销记录
			async getData() {
				this.$data.loadingType = 'loading';
				const params = {};
				params.page = this.page;
				user.distributeLog(params, (data) => {
					this.loading = false;
					this.loadingType = data.data.length === 10 ? 'more' : 'nomore';
					this.footPrintList = [...this.footPrintList, ...data.data];
				})
			},
		}
	}
</script>

<style lang='scss' scoped>
	page {
		background: $uni-bg-color;
	}
	.rf-list-item{display: flex;padding: 20rpx 4%;}
	.image{width:120rpx;height: 120rpx;border-radius: 50%;}
	.left{margin-right: 40rpx;}
	.mid{width: 100%;}
	.bottom{width: 100%; display: flex;justify-content: space-between;}
	.title{padding: 10px 0 10px 0;}
</style>
