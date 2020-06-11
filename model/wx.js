import {Base} from "@/utils/base.js"
class Wx extends Base{
	constructor() {
		super();
	}
	//支付配置
	sdkConfig(param,callback) {
		var params = {
		  url:'third-party/wechat-js-sdk',
		  data:param,
		  method:'post',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
	//通过订单信息获取支付信息
	payCreate(param,callback) {
		var params = {
		  url:'common/pay/create',
		  data:param,
		  method:'post',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
	
};

export { Wx };