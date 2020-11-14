<template>
	<view>
		<view class="container" :class="!loadingHidden ? 'hide' : ''">
			<!--banner  -->
			<swiper indicator-dots="ture" autoplay="true" indicator-active-color="#ff6600" indicator-color="#fff">
				<block v-for="item in guangaoArr" v-key="item.id">
					<swiper-item :data-id='item.id' class="banner-item">
						<image :src="item.image" class="slide-image news-img" mode="widthFix" lazy-load="true" @click='toDetail'
						 :data-url="item.url"></image>
					</swiper-item>
				</block>
			</swiper>

			<scroll-view scroll-x="true" class="news-tab">
				<block v-for="(item,index) in newsCategoryData" v-key="item.id">
					<text :class="currentMenuIndex==index?'tab-active':''" :data-index="index" :data-id='item.id' @click='changeNewsCategory'>{{item.title}}</text>
				</block>
			</scroll-view>
			<article-list is="articleList" :list="articleListData" :status="loadStatus" :col="1" :border="false" :small="true"></article-list>
			<view class="loading" :class="!searchLoading ? 'hide' : ''">
				<text class="iconfont icon-tupianzhengzaijiazai"></text>正在加载更多...
			</view>
		</view>
	</view>
</template>

<script>
	import {
		Article
	} from '@/model/article.js';
	var article = new Article();
	import articleList from "@/components/article-list/article-list.vue"
	export default {
		components: {
			articleList
		},
		data() {
			return {
				page: 1,
				loadingHidden: false,
				searchLoading: false,
				searchLoadingComplete: false,
				currentMenuIndex: 0,
				finish: false,
				loadStatus: 'more',
				articleListData:'',
				guangaoArr:''
			}
		},
		onLoad() {
			this._loadData();
		},
		methods: {
			_loadData: function() {
				var that = this;
				//获得广告区信息
				var param = {};
				article.getGuanggaoData(param, (data) => {
					that.$data.guangaoArr = data.items;
				});

				//获取新闻分类
				var param = {};
				that.$data.loadStatus = 'loading';
				article.getCategoryData(param, (res) => {
					that.$data.newsCategoryData = res.items;
					//that.$data.articleListData = res.items[0].data;
					that.$data.loadingHidden = true;
					if (res._meta.pageCount <= that.$data.page) {
						that.$data.loadStatus = 'noMore';
					} else {
						that.$data.loadStatus = 'more';
					}
				});
				var list_param={
					page:that.$data.page, 
					title:'', 
					isTop:0
				}
				article.getArticleData(list_param,(res) => {
					that.$data.articleListData = res.items;
					if (res._meta.pageCount <= that.$data.page) {
						that.$data.loadStatus = 'noMore';
					} else {
						that.$data.loadStatus = 'more';
					}
				})

			},


			/*切换新闻分类*/
			changeNewsCategory: function(event) {
				var that = this,
					index = this.getDataSet(event, 'index'),
					id = this.getDataSet(event, 'id');
				var listData = new Array();
				var listDatas = "";
				that.$data.currentMenuIndex = index;
				var newsCategoryData = this.$data.newsCategoryData
				for (var i = 0; i < newsCategoryData.length; i++) {
					if (index == i) {
						listData[i + 1] = newsCategoryData[index].data;
						listDatas = listData[i + 1]
					}
					that.$data.articleListData = listDatas;
					that.$data.searchLoading = false;
					that.$data.searchLoadingComplete = false;
				}
				if (listDatas && listDatas.length < 10) {
					that.$data.searchLoading = false;
					that.$data.searchLoadingComplete = true;
				}
			},

			//触底滚动加载
			onReachBottom: function() {
				if (this.$data.loadStatus == 'noMore') {
					return false;
				}
				this.$data.page++;
				this._loadData();

			},
			//拼接数据
			scrollLoadData: function(res, page) {
				var data = res[0].data;
				var articleListData = this.$data.articleListData;
				articleListData = articleListData.concat(data)
				this.$data.articleListData = articleListData;
				this.$data.page = page;

			},

			//跳转到新闻详情
			toArticleDetail: function(event) {
				var id = this.getDataSet(event, 'id')
				uni.navigateTo({
					url: '../article/detail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.news-img {
		width: 100%;
	}

	swiper {
		height: 234rpx;
	}

	.news-tab {
		background-color: $uni-bg-color;
		margin: 20rpx 0;
		width: 100%;
		white-space: nowrap;
	}

	.news-tab text {
		display: inline-block;
		font-size: $uni-font-size-base;
		padding: 24rpx 0;
		width: 150rpx;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		word-spacing: normal;
	}

	.tab-active {
		color: #f60;
		border-bottom: 4rpx solid #f60;
	}
</style>
