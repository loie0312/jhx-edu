<template>
	<view class="footprint">
		<!--收藏列表-->
		<view :options="options" :info="item" @action="bindClick" :key="index" class="rf-swipe-item" v-for="(item, index) in footPrintList">
			<view class="rf-list-item" @tap="goto(`/pages/product/detail?id=${item.product.id}`)">
				<view class="left">
					<image class="image" :src="item.product && item.product.picture"></image>
				</view>
				<view class="mid">
					<view class="title in2line">{{ item.product && item.product.name }}</view>
					<view class="data">
						<view class="item"><text class="iconfont icontuandui"></text>已售 {{item.product && item.product.virtual_sale || 0 }}</view>
						<view class="item"><text class="iconfont iconkechakan"></text>浏览 {{item.product && item.product.view || 0 }}</view>
						<view class="item"><text class="state" v-if="parseInt(item.product && item.product.product_status) === 0">
								失效
							</text></view>
					</view>
					<view class="bottom">
						<text class="price">{{ item.product && item.product.real_price }}</text>
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
				startTime: moment().startOf('day').format('X'),
				endTime: moment().endOf('day').format('X'),
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#fa436a'
					}
				}],
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
			this.initData();
		},
		methods: {
			// 删除足迹
			async bindClick(e) {
				await this.$http.delete(`${footPrintDel}?id=${e.data.id}`, {
					page: this.page
				}).then(() => {
					this.$mHelper.toast('删除足迹成功');
					this.page = 1;
					this.footPrintList.length = 0;
					this.getFootPrintList();
				});
			},
			// 数据初始化
			initData() {
				this.getFootPrintList();
			},
			// 获取我的足迹列表
			async getFootPrintList() {
				this.$data.loadingType = 'loading';
				const params = {};
				params.page = this.page;
				user.collect(params, (data) => {
					this.loading = false;
					this.loadingType = data.data.length === 10 ? 'more' : 'noMore';
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

	.footprint {
		.rf-swipe-item {}

		.rf-list-item {
			padding: 10rpx 0;
			margin: 0;
			display: flex;
			align-items: center;
		}

		.left {
			padding: 20upx 20upx 10upx;

			.image {
				width: 200upx;
				height: 133upx;
			}
		}

		.mid {
			width: calc(100vw - 350upx);
			margin: 0 10upx;

			.title {
				height: 77rpx;
				font-size: $uni-font-size-base;
				color: #333;
				padding: 20rpx 0 0 0;
				font-weight: normal;
			}

			.data {
				display: flex;
				justify-content: space-between;
				margin: 0;
				font-size: $uni-font-size-sm;
				color: #999;

				.item {
					height: 50upx;
					line-height: 50upx;
				}

				.iconfont {
					margin-right: 10upx;
				}
			}

			.state-wrapper {
				height: 48upx;

				.state {
					margin: 5upx 0;
					opacity: 0.8;
					font-size: $uni-font-size-sm;
					padding: 4upx 10upx;
					border-radius: 6upx;
				}
			}

			.bottom {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: $uni-font-size-sm;

				.price {
					color: $uni-color-price;
					font-size: $uni-font-size-lg;

					&:before {
						content: '￥';
						font-size: $uni-font-size-sm;
					}
				}
			}
		}
	}
</style>
