<import src="@/utils/wxParse/wxParse.wxml" />
<template>
	<view>
		<!-- <view class="title">公司简介</view> -->
		<view class='container' :class="!loadingHidden ? 'hide':''">
			<scroll-view scroll-y="true" :scroll-into-view="toComment" enable-back-to-top="ture">
				<view class="content">
					<rich-text :nodes="info.data.content | formatRichText"></rich-text>
					<template is="wxParse" data="wxParseData:content.nodes" />
				</view>
				<!-- <view>
					<view class="comment" v-if="commentData.length>0" id="commentList11">
						<view class="com-title">热门评论({{info.commentCount}})</view>
						<block v-for="item in commentData">
							<view class="list-item">
								<view class="hd">
									<image :src='item.member.avatar'></image>
								</view>
								<view class="bd">
									<view class="name">{{item.member.username}}</view>
									<view class="des">{{item.content}}</view>
									<view class="time">{{item.created_at}}</view>
								</view>
							</view>
						</block>
					</view>
					<view v-else class="no-comment">暂无评论，快来抢沙发~</view>
				</view> -->
			</scroll-view>
		</view>

		<!-- <view>
			<view class="btm" v-if="data.category">
				<view class="shouye" @click='toHomeTab'>
					<view class="iconfont icon-shouye"></view>
					<view class="fs24">首页</view>
				</view>
				<view class="pinglun">
					<text class="iconfont icon-iconfontbianji"></text>
					<input type='text' placeholder='写点感言' @click='toInput' disabled></input>
				</view>
				<view class="cang" :class="info.isFavourite==1?'active':''" :data-id="info.id" @click='getFavourite'>
					<view class="iconfont icon-iconfontxingxing"></view>
					<view class="fs24">收藏</view>
				</view>
				<view class="zan" :class="info.isVote==1?'active':''" :data-id="info.id" @click='getVote'>
					<view class="iconfont icon-qinziAPPtubiao-" style='margin-bottom:1rpx'></view>
					<view class="fs24">{{info.voteCount}}+</view>
				</view>
			</view>
		</view>
		<view :class="isShow ? 'hide' : '' ">
			<view class="mask" @click='toClose'></view>
			<view class="comment-box">
				<input placeholder='说点什么吧…' :focus='inputFocus' @confirm="sendComment" @input='inputTyping' v-model='inputVal'
				 confirm-type="send"></input> </view>
		</view> -->
	</view>
</template>

<script>
	import {
		Base
	} from "@/utils/base.js";
	import {
		Article
	} from "@/model/article.js";
	var WxParse = require('@/utils/wxParse/wxParse.js');
	var base = new Base();
	var article = new Article();
	export default {
		data() {
			return {
				isShow: true,
				inputVal: "",
				page: 1,
				loadingHidden: false,
				searchLoading: true,
				searchLoadingComplete: false,
				inputFocus: false,
				toComment: '',
				info:{
					data:{
						content:''
					}
				}
			}
		},
		filters: {
			/**
			 * 处理富文本里的图片宽度自适应
			 * 1.去掉img标签里的style、width、height属性
			 * 2.img标签添加style属性：max-width:100%;height:auto
			 * 3.修改所有style里的width属性为max-width:100%
			 * 4.去掉<br/>标签
			 * @param html
			 * @returns {void|string|*}
			 */
			formatRichText(html) { //控制小程序中图片大小
				if (html) {
					let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
						if (match.search(/style=/gi) == -1) {
							match = match.replace(/\<img/gi, '<img style=""');
						}
						return match;
					});
					newContent = newContent.replace(/style="/gi, '$& max-width:100% !important; ');
					newContent = newContent.replace(/<br[^>]*\/>/gi, '');
					return newContent;
				} else {
					return '暂无详情'
				}
			},
			// 时间格式化
			time(val) {
				return moment(val * 1000).format('YYYY-MM-DD')
			}
		},
		onLoad(options) {
			var that = this;
			var param = {
				id : options.id
			}
			article.view(param, (data) => {
				uni.setNavigationBarTitle({
					title: data.title
				})
				that.$data.info = data;
				that.$data.loadingHidden = true;
			})
		},
		methods: {
			/**
			 * 点赞
			 */
			getVote: function() {
				var param={id:this.$data.info.id}
				var isVote = this.$data.info.isVote;
				if (isVote == 0) {
					article.toVoteAdd(param, (res) => {
						var status = res.status;
						if (status == 1) {
							var voteCount = this.$data.info.voteCount + 1
							this.$data.info.isVote = 1;
							this.$data.info.voteCount = voteCount;
							uni.showToast({
								title: '点赞成功~',
								icon: 'none',
								duration: 2000
							})
						}

					})
				} else if (isVote == 1) {
					article.toVoteAdd(this.$data.info.id, (res) => {
						var status = res.status;
						if (status == 2) {
							var voteCount = this.$data.info.voteCount - 1
							this.$data.info.isVote = 0;
							this.$data.info.voteCount = voteCount;
							uni.showToast({
								title: '点赞取消~',
								icon: 'none',
								duration: 2000
							})
						}
					})
				}

			},

			/**
			 * 收藏
			 */
			getFavourite: function() {
				var isFavourite = this.$data.info.isFavourite;
				if (isFavourite == 0) {
					article.toFavouriteAdd(this.$data.info.id, (res) => {
						var status = res.status;
						this.$data.info.isFavourite = 1;
						uni.showToast({
							title: '收藏成功~',
							icon: 'none',
							duration: 2000
						})
					})
				} else if (isFavourite == 1) {
					article.toVoteAdd(this.$data.info.id, (res) => {
						var status = res.status;
						this.$data.info.isFavourite = 0;
						uni.showToast({
							title: '收藏取消~',
							icon: 'none',
							duration: 2000
						})
					})
				}

			},

			//发表评论
			inputTyping: function(e) {
				this.$data.inputVal = e.detail.value;
			},
			toInput: function() {
				this.$data.isShow = false;
				this.$data.inputVal = "";
				this.$data.inputFocus = true;
			},
			sendComment: function() {
				var that = this;
				if (this.$data.inputVal == '') {
					uni.showToast({
						title: '请填写评论内容~',
						icon: 'none',
						duration: 2000
					})
				}
				var params={
					id:this.$data.info.id,
					content:this.$data.inputVal
				}
				article.tosendComment(params, (data) => {
					if (data.status == 1) {
						uni.showToast({
							title: '评论成功~',
							icon: 'none',
							duration: 2000
						})
						that.$data.isShow = true;
						that.$data.info.commentCount = that.$data.info.commentCount + 1;
						that.$data.searchLoadingComplete = false;
						that.$data.page = 1;
						that.$data.toComment = 'commentList11';
						article.commentList(that.$data.info.id, 1, (res) => {
							if (res._meta.pageCount == 1) {
								that.$data.searchLoading = false;
								that.$data.searchLoadingComplete = true;
							}
							that.$data.commentData = res.items;
							for (var i = 0; i < res.items.length; i++) {
								// var date = evaluate.toDate(res.items[i].created_at);
								// var time = 'commentData[' + i + '].created_at';
								// that.setData({
								// 	[time]: date
								// })
								that.$data.time = res.data[i].create_time;
							}

						})
					}

				})
			},
			toClose: function() {
				this.$data.isShow = true;
			},

			//加载更多评论
			getMore: function() {
				var page = parseInt(this.$data.page) + 1;
				if (page <= this.$data.pageCount) {
					this.$data.searchLoading = true;
					article.commentList(this.$data.info.id, page, (res) => {
						this.scrollLoadData(res, page)
					})
				}
			},
			//拼接数据
			scrollLoadData: function(res, page) {
				var data = res.items;
				var commentData = this.$data.commentData;
				for (var i = 0; i < data.length; i++) {
					data[i].created_at = evaluate.toDate(data[i].created_at);
				}
				commentData = commentData.concat(data)
				this.$data.commentData = commentData;
				this.$data.page = page;

				if (page == this.$data.pageCount) {
					this.$data.searchLoading = false;
					this.$data.searchLoadingComplete = true;
				}
			},

			/**
			 * 跳转到首页
			 */
			toHomeTab: function() {
				uni.switchTab({
					url: '../index/index',
				})
			},

			/**
			 * 用户点击右上角分享
			 */
			onShareAppMessage: function() {
				console.log(this.$data.info.title)
				return {
					title: this.$data.info.title
				}
			}
		}
	}
</script>

<style lang="scss">
	.article{
		font-size: $uni-font-size-base;
		color: #222222;
		padding: 30rpx 2% 0 2%;
	}
	scroll-view {
		height: 100vh;
	}

	image {
		max-width: 100%;
	}

	.title {
		text-align: center;
		font-size: $uni-font-size-lg;
		line-height: 48rpx;
		padding: 20rpx 30rpx;
		border-bottom: 1px solid $uni-border-color;
		background-color: $uni-bg-color;
	}

	.content {
		padding: 38rpx 30rpx 80rpx;
		// background-color: $uni-bg-color;
		font-size: $uni-font-size-lg;
		box-sizing: border-box;
		overflow: hidden
	}

	.wxParse-p {
		overflow: hidden
	}

	.box {
		padding: 20rpx 30rpx;
		background-color: $uni-bg-color;
	}

	.box text {
		font-size: $uni-font-size-sm;
		color: $uni-text-color-grey;
		margin-right: 30rpx;
	}

	.comment {
		background-color: $uni-bg-color;
		margin-top: 20rpx;
		padding-bottom: 50rpx;
		padding-top: 20rpx;
	}

	.comment .com-title {
		font-size: $uni-font-size-sm;
		font-weight: bold;
		border-left: 6rpx solid #ff4444;
		padding-left: 20rpx;
		margin-left: 30rpx;
		margin-bottom: 20rpx;
	}

	.list-item {
		display: flex;
		align-items: flex-start;
		padding: 20rpx 30rpx;
		border-bottom: 1px solid #f9f9f9;
	}

	.list-item .hd image {
		width: 60rpx;
		height: 60rpx;
		border-radius: $uni-border-radius-circle;
		margin-right: 20rpx;
	}

	.list-item .bd {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		min-height: 120rpx;
	}

	.list-item .bd .name {
		font-size: $uni-font-size-sm;
		color: #1a3bdf;
		overflow: hidden;
		text-overflow: hidden;
		line-height: 36rpx;
		margin-bottom: 10rpx;
	}

	.list-item .bd .des {
		font-size: $uni-font-size-sm;
		line-height: 36rpx;
	}

	.list-item .bd .time {
		font-size: 20rpx;
		color: $uni-text-color-grey;
		margin-top: 10rpx;
	}

	.btm {
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: $uni-bg-color;
		width: 100%;
		padding: 20rpx 0;
	}

	.btm .pinglun {
		border: 1px solid #efefef;
		border-radius: 20rpx;
		padding: 8rpx 20rpx;
		position: relative;
		background-color: #f9f9f9;
	}

	.icon-iconfontbianji {
		position: absolute;
		top: 12rpx;
	}

	.btm .pinglun input {
		font-size: $uni-font-size-sm;
		width: 420rpx !important;
		text-indent: 40rpx;
	}

	.btm .shouye,
	.btm .zan,
	.btm .cang {
		width: 100rpx;
		text-align: center
	}

	.btm .zan {
		margin-top: 10rpx;
		margin-bottom: 4rpx;

	}

	.icon-iconfontxingxing {
		font-size: 36rpx;
		margin-bottom: 2rpx;
	}

	.icon-shouye {
		font-size: 36rpx;
		margin-bottom: 2rpx;
	}

	.active {
		color: #ff4444
	}

	.mask {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
	}

	.comment-box {
		position: fixed;
		z-index: 5000;
		width: 750rpx;
		bottom: 0;
		left: 0;
		background-color: $uni-bg-color;
		padding: 0 30rpx;
	}

	.comment-box input {
		width: 100%;
		font-size: $uni-font-size-lg;
		margin: 30rpx 0;
	}

	.no-comment {
		padding: 100rpx 0;
		text-align: center;
		font-size: $uni-font-size-lg;
		color: $uni-text-color-grey;
	}

	.more {
		text-align: center;
		margin-top: 50rpx;
	}

	.more text {
		font-size: $uni-font-size-sm;
		border: 2rpx solid #e6e6e6;
		border-radius: 10rpx;
		padding: 10rpx 20rpx;

	}

	/*底部信息  */
	.foot-box {
		width: 100%;
		padding: 10rpx 0;
		background-color: #fff;
		color: #afadad;
		text-align: center;
		font-size: 24rpx;
		position: fixed;
		bottom: 0;
		border-top: 1xp solid #f9f9f9;
		display: flex;
		justify-content: center;
	}

	.foot-item {
		width: 25%;
	}

	.foot-box image {
		width: 70rpx;
		padding: 10rpx;
		height: 70rpx;
	}

	.f-full {
		width: 100%;
		height: 120rpx;
		line-height: 120rpx;
	}
</style>
