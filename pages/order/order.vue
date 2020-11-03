<template>
	<jhx-order-list  :orderList="orderList" :column="1" :status="status"></jhx-order-list>
</template>

<script>
	import jhxOrderList from "@/components/jhx-order-list/jhx-order-list.vue";
	import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
	import {Order} from '@/model/order.js';
	var order = new Order();
	export default {
		components: {tabControl,jhxOrderList},
	    data() {
	        return {
				orderList:[], 
				status:"more"
	        }
	    },
	    onLoad() {
			this.getOrder(); 
	    },
		methods: {
			//订单
			getOrder:function(){
				var that = this;
				var param = {pay_status:1};
				this.status = 'loading';
				order.list(param,(data) => {
					that.$data.orderList = that.$data.orderList.concat(data.data);
					if(data.data.length < 10){
						that.status = 'noMore';
					}else{
						that.status = 'more';
					}
				});
			},			
		},
	}
</script>

<style>
</style>
