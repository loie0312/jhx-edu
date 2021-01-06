<template>
	<view>
		<view class="center-head">
			<view>
				<image class="avatar" :src="userInfo.head_portrait ? userInfo.head_portrait : '/static/avatar.png'"></image>
				
				</view>
			<view class="name">
				<view>{{userInfo.nickname ? userInfo.nickname : userInfo.mobile}}</view>
				<view class="edit" @click="">编辑个人资料</view>
			</view>
		</view>
		<view class="account">
			<view @tap="goto('/pages/order/order')">
				<view class="num">{{userInfo.buyed_num}}</view>
				<view class="text">已购课程</view>
			</view>
			<view>
				<view class="num">0</view>
				<view class="text">优惠券</view>
			</view>
			<view @click="goto('/pages/user/distribute')">
				<view class="num">{{userInfo.account.fenxiao_money}}</view>
				<view class="text">我的佣金</view>
			</view>
		</view>
		<uni-grid :column="3" :show-border="false"  >
			<view @click="goto('/pages/user/vipbuy')">
				<uni-grid-item>
					<view class="iconfont icon icon-VIP"></view>
					<text class="text">vip权益</text>
				</uni-grid-item>
			</view>
			<view @click="goto('/pages/user/distribute')">
				<uni-grid-item>
					<view class="iconfont icon icon-fenxiaoshang"></view>
					<text class="text">分销记录</text>
				</uni-grid-item>
			</view>
			<view @click="goto('/pages/user/footprint')">
				<uni-grid-item>
					<view class="iconfont icon icon-kecheng"></view>
					<text class="text">学习记录</text>
				</uni-grid-item>
			</view>
			<view @click="goto('/pages/user/collect')">
				<uni-grid-item>
					<view class="iconfont icon icon-shoucang"></view>
					<text class="text">收藏记录</text>
				</uni-grid-item>
			</view>
			<uni-grid-item>
				<view class="iconfont icon icon-kefu"></view>
			    <text class="text">联系客服</text>
			</uni-grid-item>
		</uni-grid>
		<view class="copyright" @click="goto('/pages/copyright/support')">版权所有：广西几何线科技有限公司</view>
	</view>
</template>
<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue";
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue";
	import {User} from '@/model/user.js';
	var user = new User();
	export default {
		components: {uniGrid,uniGridItem},
		data() {
		   return {
				userInfo:{
					account:{
						fenxiao_money:0
					}
				},
				tools:[]
		   }
		},
		onLoad() {
			var cacheUser =  uni.getStorageSync('userInfo');
			if(cacheUser && cacheUser.id){
				this.$data.userInfo = cacheUser
			}
			this.index();
		},
		onPullDownRefresh() {
			var cacheUser =  uni.getStorageSync('userInfo');
			if(cacheUser && cacheUser.id){
				this.$data.userInfo = cacheUser
			}
			this.index();
		},
		onShow() {
			this.index();
		},
		methods: {
			//详情
			index:function(){
				var that = this;
				var param = {};
				user.index(param,(data) => {
					if(data){
						that.$data.userInfo = data.data;
					}
					
					uni.stopPullDownRefresh();
				});
			},
		},
	}
</script>
<style lang='scss' scoped>
	.center-head{background-color:#48434d ;display: flex;padding: 80rpx 4%;color: #fff;}
	.avatar{width: 90rpx;height: 90rpx;border-radius: 50%;}
	.name{margin-left: 30rpx;}
	.edit{font-size: $uni-font-size-sm - 4rpx;border:1px solid $uni-border-color;border-radius: 30px;padding: 4rpx 10rpx;margin-top: 15rpx;}
	.account{background-color: #fff;padding: 40rpx 4%;display: flex;justify-content: space-between;text-align: center;}
	.account .num{font-weight: bold;font-size: $uni-font-size-lg;}
	.account .text{color: #666;margin-top: 10rpx;}
	.uni-grid-wrap{background-color: #fff;margin-top: 20rpx;}
	.uni-grid-item{text-align: center;align-items: center;}
	.uni-grid-item .iconfont{font-size: 50rpx;margin-bottom: 20rpx;}
	.copyright{color: #999;text-align: center;margin-top: 40rpx;}
</style>
