import {Base} from "@/utils/base.js"
class Product extends Base{
	constructor() {
		super();
	}
	//课程列表
	lists(param,callback) {
		var num = param.num ? param.num: 12;
		var params = {
		  url:'product/product/index?num='+num,
		  data:param,
		  method:'get',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
	//首页课程分类
	indexCate(param,callback) {
		var params = {
		  url:'product/product/index-cate',
		  data:param,
		  method:'get',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
	//详情
	view(param,callback) {
		var params = {
		  url:'product/product/view',
		  data:param,
		  method:'get',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
	//目录列表
	content(param,callback) {
		var params = {
		  url:'product/product-content/index',
		  data:param,
		  method:'get',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
	//目录详情
	contentView(param,callback) {
		var params = {
		  url:'product/product-content/view',
		  data:param,
		  method:'get',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
	//收藏
	collectCreate(param,callback) {
		var params = {
		  url:'common/collect/create',
		  data:param,
		  method:'post',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
	//删除收藏
	collectDelete(param,callback) {
		var params = {
		  url:'common/collect/delete?id='+param.id,
		  data:param,
		  method:'DELETE',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
};

export { Product };