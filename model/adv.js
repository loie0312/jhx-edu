import {Base} from "@/utils/base.js"
class Adv extends Base{
	constructor() {
		super();
	}
	//广告信息
	getAdv(param,callback) {
		var params = {
		  url:'common/adv/index',
		  data:param,
		  method:'get',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
};

export { Adv };