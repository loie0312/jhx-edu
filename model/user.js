import {Base} from "@/utils/base.js"
class User extends Base{
	constructor() {
		super();
	}
	//是否已绑定公众号或小程序
	isBind(param,callback) {
		var params = {
		  url:'member/auth/is-binding',
		  data:param,
		  method:'post',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
	//用户信息
	index(param,callback) {
		var params = {
		  url:'member/member/index',
		  data:param,
		  method:'get',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
	//vip类型
	vipList(param,callback) {
		var params = {
		  url:'member/member/vip-list',
		  data:param,
		  method:'get',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
	//vip最低价格
	vipMin(param,callback) {
		var params = {
		  url:'member/member/vip-min',
		  data:param,
		  method:'get',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
	//足迹
	footPrint(param,callback) {
		var params = {
		  url:'member/footprint/index',
		  data:param,
		  method:'get',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
	//收藏
	collect(param,callback) {
		var params = {
		  url:'member/collect/index',
		  data:param,
		  method:'get',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
	//分销记录
	distributeLog(param,callback) {
		var params = {
		  url:'member/distribute/index',
		  data:param,
		  method:'get',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
};

export { User };