
import {Base} from "@/utils/base.js"
class Article extends Base{
	constructor() {
		super();
	}
	//文章详情
	view(param,callback) {
		var params = {
		  url:'article/view',
		  data:param,
		  method:'get',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
};

export { Article };

