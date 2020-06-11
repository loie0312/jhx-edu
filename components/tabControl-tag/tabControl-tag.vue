<template name="tabControl">
		<scroll-view  scroll-x="true" :style="'background-color:'+bgc+';top:'+top+'px;'" :class="fixed?'fxied':''" :scroll-left='scrollLeft' scroll-with-animation id="tabcard">
			<view class="tabList" :style="isEqually?'display: flex;justify-content: space-between;padding-left:0;':''">
				<view
					:class="'tabItem'+(currentIndex==index?' thisOpenSelect':'')"
					:style="isEqually? 'width:'+windowWidth/values.length+'px;margin-right:0;':''"
					v-for="(item,index) in values" 
					:id="'item'+index"
					:key='index' 
					@click="_onClick(index)">
					<text :style="(currentIndex==index?'font-size:'+activeSize+'rpx;color:'+activeColor:'font-size:'+itemSize+'rpx')">{{item}}</text>
					<view class="activeLine" :style="{width: lineWidth+'rpx'}"></view>
				</view>
			</view>
		</scroll-view>
</template>

<script>
	export default {
		name:'tabControl',
		props:{
			current: {
				type: Number,
				default: 0
			},
			values: {
				type: Array,
				default () {
					return []
				}
			},
			bgc:{
				type:String,
				default:''
			},
			fixed:{
				type:Boolean,
				default:false
			},
			scrollFlag:{
				type:Boolean,
				default:false
			},
			lineWidth:{
				type:Number,
				default: 48
			},
			itemSize:{
				type:Number,
				default: 30
			},
			activeSize:{
				type:Number,
				default: 32
			},
			activeColor:{
				type:String,
				default:''
			},
			top:{
				type:Number,
				default: 0
			},
			isEqually:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				currentIndex: 0,
				windowWidth:0,	//设备宽度
				leftList:[],	//选项距离左边的距离
				widthList:[],	//选项宽度
				scrollLeft:0,   //移动距离
				newScroll:0,    //上一次移动距离(用来判断是左滑还是右滑)
				wornScroll:0,    //上一次移动距离(用来判断是左滑还是右滑)
			};
		},
		created(){
			
		},
		mounted(){
			setTimeout(()=>{
				uni.createSelectorQuery().in(this).select("#tabcard").boundingClientRect((res)=>{
					this.$emit('getTabCardHeight', {height:res.height})
				}).exec()
				uni.getSystemInfo({
				    success: (res)=> {
						this.windowWidth = res.windowWidth;
				        // console.log(this.windowWidth);
						this.values.forEach((i,v)=>{
							let info = uni.createSelectorQuery().in(this);
							info.select("#item"+v).boundingClientRect((res)=>{
								// 获取第一个元素到左边的距离
								// if(v==0){
								// 	this.startLenght = res.left
								// }
							    this.widthList.push(res.width)
								this.leftList.push(res.left)
								
							}).exec()
							
						})
						// console.log(this.leftList)
						// console.log(this.widthList)
				    }
				});
			})
		},
		created() {
			this.currentIndex = this.current
			if(this.scrollFlag){
				setTimeout(()=>{
					this.tabListScroll(this.current)
				},300)
			}
		},
		watch: {
			current(val) {
				if (val !== this.currentIndex) {
					this.currentIndex = val
					if(this.scrollFlag){
						this.tabListScroll(val)
					}
				}
			},
			
		},
		methods: {
			_onClick(index) {
				if (this.currentIndex !== index) {
					this.currentIndex = index
					this.$emit('clickItem', {currentIndex:index})
					// 开启滚动
					if(this.scrollFlag){
						this.tabListScroll(index)
					}
				}
			},
			// 选项移动
			tabListScroll(index){
				let scoll = 0;
				this.wornScroll = index;
				// this.wornScroll-this.newScroll>0 在向左滑  ←←←←←
				if(this.wornScroll-this.newScroll>0){
					for(let i = 0;i<this.leftList.length;i++){
						if(i>1&&i==this.currentIndex){
							scoll = this.leftList[i-1]
						}
					}
					// console.log('在向左滑',scoll)
				}else{
					if(index>1){
						for(let i = 0;i<this.leftList.length;i++){
							if(i<index-1){
								scoll = this.leftList[i]
							}
						}
					}else{
						scoll = 0
					}
					// console.log('在向右滑')
				}
				this.newScroll = this.wornScroll;
				this.scrollLeft = scoll;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fxied{
		position: fixed;
		z-index: 2;
	}
	.tabList{
		padding-top: 24rpx;
		padding-left: 24rpx;
		white-space: nowrap;
		text-align: center;
		
	}
	.tabList .tabItem{
		margin-right: 60rpx;
		display: inline-block;
		position: relative;
		text{
			// font-size: 30rpx;
			line-height: 44rpx;
			color: #666;
			transition: all 0.3s ease 0s;
		}
		.activeLine{
			// width: 48rpx;
			height: 8rpx;
			border-radius: 4rpx;
			background-color: #F57341;
			margin-top: 8rpx;
			margin-left: 50%;
			transform: translateX(-50%);
			opacity: 0;
			transition: all 0.3s ease 0s;
		}
	}
	.tabList .tabItem:first-child{
		// margin-left: 22rpx;
	}
	.tabList .tabItem:last-child{
		margin-right: 24rpx;
	}
	.tabList .thisOpenSelect text{
		color: #333;
		font-weight:600;
	}
	.tabList .thisOpenSelect .activeLine{
		opacity: 1;
	}
	
</style>
