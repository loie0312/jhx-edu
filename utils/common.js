class Common {
	//是否是微信浏览器 h5
	isWechat() {
		const ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/micromessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}
	//章节类型
	contentType(type){
		var text = '';
		switch (type){
			case '1':
				text='图文';
				break;
			case '2':
				console.log(11111);
				text='音频';
				break;
			case '3':
				text='视频';
				break;
			default:
				break;
		}
		return {text:text};
	}
}
export { Common };