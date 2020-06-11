import {Base} from "@/utils/base.js"
class Order extends Base{
	constructor() {
		super();
	}
	//课程价格计算
	productCalc(param,callback) {
		var params = {
		  url:'order/order/product-calc',
		  data:param,
		  method:'get',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
	//创建订单
	create(param,callback) {
		var params = {
		  url:'order/order/create',
		  data:param,
		  method:'post',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
	//创建vip订单
	vipCreate(param,callback) {
		var params = {
		  url:'order/order/vip-create',
		  data:param,
		  method:'post',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
	//订单列表
	list(param,callback) {
		var params = {
		  url:'member/order/index',
		  data:param,
		  method:'get',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
};

export { Order };