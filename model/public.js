import {Base} from "@/utils/base.js"
class Public extends Base{
	constructor() {
		super();
	}
	//登录
	login(param,callback) {
		var params = {
		  url:param.url,
		  data:param,
		  method:'post',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
	//获取小程序用户信息
	xcxAuth(param,callback){
		var params = {
		  url:'third-party/wechat-mp',
		  data:param,
		  method:'post',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
	//注册
	register(param,callback) {
		var params = {
		  url:'site/register',
		  data:param,
		  method:'post',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
	//系统配置
	config(param,callback) {
		var params = {
		  url:'site/config',
		  data:param,
		  method:'post',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
	//发送短信
	smsSend(param,callback){
		var params = {
		  url:'site/sms-code',
		  data:param,
		  method:'post',
		  sCallback:function(data){
			callback && callback(data);
		  }
		}
		this.request(params);
	}
};

export { Public };