<template>
	<view class="uni-padding-wrap">
	    <view class="page-section swiper">
	        <view class="page-section-spacing">
			   <view v-if="must_vip">
					<view>该章节需要开通vip才能观看</view>
					<view>
						<span>去开通vip</span>
						<!-- <span>登录vip账号</span> -->
					</view>
			   </view>
			   <view v-else-if="info.type == 3">
			   		<view><video class="video" controls="controls"   poster=''   src=''   preload="auto"    x5-playsinline="" playsinline="true" webkit-playsinline="true" :src="info.video"></video></view>
			   </view>
	        </view>
	    </view>
		<view class="pre_time" v-if="info.price_type == 2  && !is_vip && info.pre_time > 0"  @click="openVip()">试看{{info.pre_time}}秒，开通会员观看完整版</view>
		<view class="pre_time" v-if="info.price_type == 3 && !buyed && info.pre_time > 0"  @click="buy()">
			<view>试看{{info.pre_time}}秒，购买专栏观看完整版</view>
			<view @click="buy()" class="buy-btn">立即购买</view>
		</view>
		<view class="row">
			<view class="product-name">{{info.name}}</view>
			<view class="attr-line">
				<span>{{info.created_at | time}}</span>
				<span>{{info.view}}次学习</span>
			</view>
		</view>
		<view v-if="must_vip" class="open-vip" @click="openVip()">
			<view>开通vip免费观看该章节</view>
			<view>立即开通<uni-icons class="icon" type="forward"></uni-icons></view>
		</view>
		<view class="detail">
			<tabControl class="detail-tab" :current="current" :values="items" bgc="#fff" :fixed="false" :scrollFlag='true' :isEqually='true' @clickItem="onClickItem" ></tabControl>
			<swiper class="swiper detail-swiper" style="height: 500rpx;" @change='scollSwiper' :current='current'>
				<swiper-item class="detail-box swiper-item detail-content">
					<scroll-view scroll-y="true" style="height:auto;">
						<rich-text :nodes="info.data.data | formatRichText"></rich-text>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<view style="height: 50px;width: 100%;"></view>
		<uni-popup ref="popup" type="bottom">
			<view class="content-list">
				<view class="content-head">
					<view @click="toProduct">返回专栏</view>
					<view class="content-title">课程目录</view>
					<view></view>
				</view>
				<scroll-view scroll-y="true" @scrolltolower="next" class="content-items">
					<jhx-product-content  :contents="content" :is_vip="is_vip" :buyed="buyed" :status="contentStatus" :column="1"></jhx-product-content>
				</scroll-view>
				<view style="height: 50px;width: 100%;"></view>
				<view class="close-content" @click="closeContent">关闭</view>
			</view>
		</uni-popup>
		<view class="foot" @click="showContent">课程目录</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import {Product} from '@/model/product.js';
	var productModel = new Product();
	import {Common} from '@/utils/common.js';
	var common = new Common();
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import moment from '@/utils/moment';
	import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
	import jhxProductContent from "@/components/jhx-product-content/jhx-product-content.vue";
	export default {
		components: {uniIcons,tabControl},
	    data() {
	        return {
				page : 1, //目录页码
				must_buy:false,
				buyed:false,
				contentStatus:'more',
				items: ['详情'],
				id:'',
				must_vip:false,
				is_vip:false,
				info:{
					data:{data:''}
				},
				current:0,
				content:[]
	        }
	    },
	    onLoad(option) {
			this.id = option.id;
			this.getDetail();
			this.$data.is_vip = this.isVip();
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
			formatRichText (html) { //控制小程序中图片大小
				if (html) {
					let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
						if(match.search(/style=/gi) == -1){
							match = match.replace(/\<img/gi,'<img style=""');
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
			},
			// 章节类型
			contentType(type) {
				var obj = common.contentType(type);
				return obj.text;
			},
			// 把0换成免费
			money(value) {
				if (value > 0){
					return value
				}else{
					return '免费'
				}
			},
			//去掉小数点的0
			toInt(value){
				if (value == parseInt(value)){
				     return parseInt(value)
				} else if (value == parseFloat(value)){
					return parseFloat(value)
				}
				else{
				  return value
				}
			}
		},
		methods: {
			//详情
			getDetail:function(){
				var that = this;
				var param = {'id':this.id};
				uni.showLoading({
					title:"加载中..."
				})
				productModel.contentView(param,(data) => {
					uni.hideLoading();
					if(data.code == 432){
						that.$data.must_vip = true;
					}
					if(data.code == 433){
						that.$data.must_buy = true;
					}
					that.$data.info = data.data;
					that.getContent(data.data.product_id);
				});
			},
			//目录
			getContent:function(id){
				var that = this;
				var page_size = 10;
				var param = {'product_id':id,'page_size':page_size,'page':this.page};
				that.$data.contentStatus = 'loading';
				productModel.content(param,(data) => {
					this.$data.buyed = data.data.buyed;
					var items = that.content.concat(data.data.contents);
					that.$data.content = items
					if(data.data.contents.length < page_size){
						that.$data.contentStatus = 'noMore';
					}else{
						that.$data.contentStatus = 'more';
					}
				});
			},
			//加载更多目录
			next() {
				if(this.contentStatus == 'noMore'){
					return false;
				}
				this.page++;
				this.getContent();
			},
			//去购买
			buy (e) {
				uni.navigateTo({
					url:'buy?product_id='+this.info.product_id
				})
			},
			//详情和目录切换
			onClickItem(val) {
				this.current = val.currentIndex
			},
			scollSwiper(e){
				this.current = e.target.current
			},
			//查看目录
			showContent(){
				this.$refs.popup.open();
			},
			//关闭目录
			closeContent(){
				this.$refs.popup.close();
			},
			//返回专栏
			toProduct(){
				uni.navigateTo({
					url:'detail?id='+this.info.product_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.video{width: 100%;}
	.row{background-color: #fff;padding: 0 3%;}
	.product-name{padding: 20rpx 0 0 0;font-size: $uni-font-size-lg;font-weight: bold;}
	.attr-line{font-size: $uni-font-size-sm;color: $uni-text-color-grey;padding: 20rpx 0 20rpx 0;}
	.attr-line span{margin-right: 40rpx;}
	.detail{margin-top: 20rpx;}
	.detail-tab{border-bottom:1px solid $uni-border-color;}
	.detail-content{padding: 20rpx 4%;background-color: #fff;box-sizing: border-box;}
	.foot{position: fixed;line-height: 50px;bottom: 0;background-color: #fff;text-align: center;z-index: 1;width: 100%;}
	.content-list{background-color: #fff;}
	.content-head{display: flex;justify-content: space-between;padding: 20rpx 4%;border-bottom: 1px solid $uni-border-color;}
	.content-head view{flex: 1;}
	.content-title{text-align: center;}
	.close-content{border-top: 1px solid #ececec;text-align: center; padding: 25rpx 0;position: fixed;bottom: 0;z-index: 9;width: 100%;background-color: #fff;color: #999;}
	.content-items{max-height: 50vh;}
	.pre_time{background-color: #fff;color: #ff6600;padding: 10rpx 3%;display: flex;justify-content: space-between;align-items: center;}
	.buy-btn{background-color: #ff6600;color: #fff;padding: 6rpx 15rpx;border-radius: 30rpx;}
</style>
