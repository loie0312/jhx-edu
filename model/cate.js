import {Base} from "@/utils/base.js"
class Cate extends Base{
	constructor() {
		super();
	}
	//分类列表
	lists(param,callback) {
		var params = {
		  url:'product/cate/list',
		  data:param,
		  method:'get',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
};

export { Cate };