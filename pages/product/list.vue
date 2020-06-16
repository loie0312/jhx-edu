<template>
	<view>
		<tabControl class="detail-tab" :current="current" :values="cates" bgc="#fff" :fixed="false" :scrollFlag='true' :isEqually='false' @clickItem="onClickItem" ></tabControl>
		<swiper class="swiper detail-swiper" style="height:100vh;" @change='scollSwiper' :current='current'>
			<swiper-item class="detail-box" v-for="(cate,index) in cates">
				<scroll-view scroll-y="true" style="height:auto;">
					<jhx-product-list :status="loadStatus" :productList="productList[index]" :column="2"></jhx-product-list>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import jhxProductList from "@/components/jhx-product-list/jhx-product-list.vue";
	import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
	import {Product} from '@/model/product.js';
	var product = new Product();
	import {Cate} from '@/model/cate.js';
	var cate = new Cate();
	export default {
		components: {tabControl},
	    data() {
	        return {
				current:0,  //当前分类
				category:[
					{id:''}
				], //完整的分类对象
				cates:['全部'], //分类名称数组
				productList:[],
				loadStatus:'more'
	        }
	    },
	    onLoad() {
			this.getCate();
			this.getProduct(); 
	    },
		methods: {
			//分类
			getCate:function(){
				var that = this;
				var param = {pid:0};
				cate.lists(param,(data) => {
					var len = data.data.length;
					that.$data.category = that.$data.category.concat(data.data);
					var cates = [];
					for(var i = 0; i < len ; i++){
						cates.push(data.data[i].title);
					}
					that.$data.cates = that.$data.cates.concat(cates);
				});
			},
			//产品
			getProduct:function(){
				var that = this;
				var page_size = 10;
				var param = {
					cate_id : that.$data.category[this.$data.current] ? that.$data.category[this.$data.current].id : '',
					'page_size':page_size
				};
				that.$data.loadStatus = 'loadding';
				
				product.lists(param,(data) => {
					if(that.$data.productList[that.$data.current]){
						var items = that.$data.productList[that.$data.current].concat(data.data);
					}else{
						var items = data.data;
					}
					
					this.$set(that.$data.productList,this.$data.current,items);
					
					if(data.data.length < page_size){
						that.$data.loadStatus = 'noMore';
					}else{
						that.$data.loadStatus = 'more';
					}
				});
			},
			//分类切换
			onClickItem(val) {
				var that = this;
				this.current = val.currentIndex;
				if(!that.$data.productList[this.current]){
					this.getProduct();
				}
				
			},
			scollSwiper(e){
				this.current = e.target.current
			},
			
		},
	}
</script>

<style>
</style>
