<template>
	<view>
		<jhx-product-list  :productList="productList" :column="1"></jhx-product-list>
	</view>
</template>

<script>
	import jhxProductList from "@/components/jhx-product-list/jhx-product-list.vue";
	import {Product} from '@/model/product.js';
	var product = new Product();
	export default {
	    data() {
	        return {
				productList:[],
	        }
	    },
	    onLoad(option) {
			this.$data.real_price = option.real_price ? option.real_price : '';
			this.$data.cate_id = option.cate_id ? option.cate_id : '';
			this.getProduct(); 
	    },
		methods: {
			//产品
			getProduct:function(){
				var that = this;
				var param = {
					cate_id : that.$data.cate_id,
					real_price : this.$data.real_price
				};
				product.lists(param,(data) => {
					var  items = that.$data.productList.concat(data.data);
					that.$data.productList = items;
				});
			},
		},
	}
</script>

<style>
</style>
