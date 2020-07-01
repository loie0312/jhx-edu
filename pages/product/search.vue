<template>
	<view>
		<jhx-product-list :status="loadStatus" :productList="productList" :column="1"></jhx-product-list>
	</view>
</template>

<script>
	import jhxProductList from "@/components/jhx-product-list/jhx-product-list.vue";
	import {Product} from '@/model/product.js';
	var product = new Product();
	export default {
		components: {jhxProductList},
	    data() {
	        return {
				productList:[],
				loadStatus:'more',
				page : 1
	        }
	    },
	    onLoad(option) {
			this.$data.real_price = option.real_price ? option.real_price : '';
			this.$data.cate_id = option.cate_id ? option.cate_id : '';
			this.$data.is_top = option.is_top ? option.is_top : '';
			this.getProduct(); 
	    },
		//加载更多
		onReachBottom() {
			if(this.loadStatus == 'noMore'){
				return false;
			}
			this.page++;
			this.getProduct();
		},
		methods: {
			//产品
			getProduct:function(){
				var that = this;
				var page_size = 10;
				var param = {
					cate_id : that.$data.cate_id,
					real_price : this.$data.real_price,
					is_top : this.$data.is_top,
					'page_size':page_size,
					'page':this.page
				};
				this.$data.loadStatus = 'loading';
				product.lists(param,(data) => {
					var  items = that.$data.productList.concat(data.data);
					that.$data.productList = items;
					if(data.data.length < page_size){
						that.$data.loadStatus = 'noMore';
					}else{
						that.$data.loadStatus = 'more';
					}
				});
			},
		},
	}
</script>

<style>
</style>
