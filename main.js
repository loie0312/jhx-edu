import Vue from 'vue'
import App from './App'
//表单验证
import $mGraceChecker from '@/utils/graceChecker';
import $mFormRule from '@/config/formRule.config.js';
Vue.prototype.$mGraceChecker = $mGraceChecker;
Vue.prototype.$mFormRule = $mFormRule;

Vue.config.productionTip = false
Vue.prototype.getUrlParam = function(name) {
	let reg = new RegExp('(^|&)'+ name + '=([^&]*)(&|$)')
	let r = window.location.search.substr(1).match(reg)
	if(r!=null){
		return unescape(r[2])
	} 
	return null
}
/*
 * obj 转 路由地址带参数
 * 例子：{a:1,b:2} => /pages/index/index?a=1&b=2
 */
Vue.prototype.createUrl = function(path, obj) {
	let url = path || '/';
	let paramsStr = '';
	if (obj instanceof Array) return url;
	if (!(obj instanceof Object)) return url;
	paramsStr = this.objParseParam(obj);
	paramsStr && (url += '?');
	url += paramsStr;
	return url;
}
/*
 * obj 转 params字符串参数
 * 例子：{a:1,b:2} => a=1&b=2
 */
Vue.prototype.objParseParam = function(obj) {
	let paramsStr = '';
	if (obj instanceof Array) return paramsStr;
	if (!(obj instanceof Object)) return paramsStr;
	for (let key in obj) {
		paramsStr += `${key}=${obj[key]}&`;
	}
	return paramsStr.substring(0, paramsStr.length - 1);
}
/*
 * 判断用户是否是vip
 */
Vue.prototype.isVip = function() {
	var user = uni.getStorageSync('userInfo');
	if(user){
		//在这里判断是否是vip，仅做价格显示，实际购买时还是在后台最终判断是否是vip
		var now = (new Date()).getTime()/1000;
		if(user.is_vip === 1 && now < user.vip_expire)
			return true;
	}
	return false;
}
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()

