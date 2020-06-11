<script>
import {Base} from '@/utils/base.js';
var base = new Base();
import {Common} from '@/utils/common.js';
var common = new Common();
export default {
	onLaunch: function() {
		console.log('App Launch');
		if(common.isWechat() && !uni.getStorageSync('accessToken')){
			base.auth();
		}
		
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
		
	}
};
</script>

<style lang='scss'>
	
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
@import './static/app.scss';
// 导入阿里巴巴矢量图标库
@import './static/iconfont/iconfont.css';
</style>
