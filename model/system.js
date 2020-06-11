import {Base} from "@/utils/base.js"
class System extends Base{
	constructor() {
		super();
	}
	//首页导航
	getNav(param,callback) {
		var num = param.num ? param.num: 8;
		var params = {
		  url:'common/nav/item-list',
		  data:param,
		  method:'post',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
};

export { System };