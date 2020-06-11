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
};

export { User };