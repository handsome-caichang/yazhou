<style scoped lang="scss">
	
    
    .heard{
    	padding: $fs-normal-x;
    	display: flex;
    	.heard-left {
    		width: 39%;
    		.avatar{
    			background-color: $color-assist-1;
    			width: 100%;
    			height: 0;
    			padding-top: 75%;
    			@include background-img(false, cover);
    		}
    	}
    	.heard-right{	
    		width: 61%;
    		position: relative;
    		.close{
    			position: absolute;
    			display: inline-block;
    			top: 3px;
    			right: 0;
    			font-size: 20px;
    			border: 1px solid $color-9;
    			border-radius: 100%;
    			text-align: center;
    			line-height: 20px;
    		}
    		.right-bottom{
    			padding-left: $fs-normal-x;
    			position: absolute;
    			left: 0;
    			bottom: 0;
    			.price{
    				height: 20px;
    				font-size: 20px;
    				color: $color-black;
    				margin-bottom: $fs-big-s;
    			}
    			.apply-num{
    				font-size: $fs-normal;
    				height: $fs-normal;
    				color: $color-black;
    			}
    		}
    	}    	
    }
    .course{
		
		.select-seat{
			padding: 20px 20px 10px 20px;
			@include flex-between;
			@include border-bottom;
			.select-seat-left{
				color: $color-6;
				font-size: $fs-small-x;
			}
			.select-seat-right{
				display: flex;
				color: $color-primary;
				font-size: $fs-normal-s;
				padding: 10px;
				.select {
					font-size: $fs-small-x;
					color: $color-primary;
				}
				.icon-wrapper {
					@include flex-center;
					.icon{
						color: $color-9;
					}
				}
			}
		}
		.select-goods{
			padding: 20px $fs-big 20px 20px;
			@include border-bottom;
			// .select-goods-heard{
			// 	font-size: $fs-small-x;
			// 	color: $color-9;
			// }
			// .select-goods-content{
			// 	// margin-top: $fs-normal-x;
			// 	height: 35px;
			// 	@include flex-between;
			// 	font-size: $fs-normal;
			// 	color: $color-3;
			// 	.icon {
			// 		font-size: 18px;
			// 	}
			// }
			.select-goods-heard{
				font-size: $fs-small-x;
				color: $color-9;
				margin-bottom: 5px;
			}
			.select-goods-content{
				font-size: $fs-normal;
				color: $color-3;
				display: flex;
				margin-bottom: 10px;
				.select-goods-content-left {
					flex: 1;
					word-break: break-word;
					display: flex;
					margin-right: 15px;
					line-height: 18px;
					.icon-wrapper {
						width: 18px;
						font-size: 18px;
						margin-right: 5px;
					}
				}
				.select-goods-content-right {
					text-align: right;
					width: 100px;
				}
			}
			.num-content {
				display: flex;
				flex-wrap: wrap;
				.item {
					margin-bottom: 10px;
					display: inline-block;
					height: 30px;
					line-height: 30px;
					border: 1px solid $color-assist-1;
					font-size: $fs-normal;
					text-align: center;
					margin-right: $fs-normal;
					color: $color-3;
					border-radius: 4px;
					padding-right: 12px;
					padding-left: 12px;
					background: $color-assist-1;
				}
				.activeNum {
					color: $color-white;
					background: $color-primary;
					border: 1px solid $color-primary;
				}
			}
			.active{
				color: $color-primary;
			}
		}
	
    }
    .bottom{
    	height: $h-1;
    	line-height: $h-1;
    	text-align: center;
    	font-size: $fs-big-s;
    	background: $color-primary;
    	color: $color-white;
    }
</style>

<template>
	<action-sheet
		v-show="opened"
		@close="close"
		:data="scrollerData"
		>
		<!-- 课程商品 -->
		<div class="heard" slot="header">
			<div class="heard-left">
				<div class="avatar" v-if="classInfo.Image" :style= '{"backgroundImage": `url(${classInfo.Image})` }'></div>
			</div>
			<div class="heard-right">
				<span class="close" @click="close">
					<svg class="icon" aria-hidden="true">
                		<use xlink:href="#icon-guanbi"></use>
            		</svg>
				</span>
				<div class="right-bottom">
					<div class="price">&#165;{{computedMoney?computedMoney:classInfo.Money|formatNumber}}</div>
					<div class="apply-num">可报名额{{classInfo.Stock<0?'不限':classInfo.Stock+'人'}}</div>
				</div>
			</div>
		</div>
		<div class="course">
			<div class="select-goods">
				<div class="select-goods-heard">
					数量
				</div>
				<div class="num-content">
					<div class="item" 
						v-for="item in selectSpecsTemp" 
						:class="{activeNum: item.isSelect}"
						@click="selectNum(item)">
						{{item.Amount}}{{unit}}
					</div>
				</div>
			</div>
			<div class="select-seat" v-if="classTemp&&classTemp.IsMustSelectSeat" @click="openSelectSeat">
				<div class="select-seat-left">选择座位</div>
				<div class="select-seat-right" >
					<span class="select" v-if="productsIsSelectArr[tcIndex]&&productsIsSelectArr[tcIndex].bindingsSeatObj&&productsIsSelectArr[tcIndex].bindingsSeatObj.row">
						<!-- {{productsIsSelectArr[tcIndex].bindingsSeatObj.row + '排' + productsIsSelectArr[tcIndex].bindingsSeatObj.coloum + '座'}} -->
						{{productsIsSelectArr[tcIndex].bindingsSeatObj.SeatName}}
					</span>
					<div class="icon-wrapper">
						<svg class="icon icon-color" aria-hidden="true">
							<use xlink:href="#icon-next"></use>
						</svg>
					</div>
				</div>
			</div>
			<!-- 套餐选择课程 -->
			<div class="select-seat" v-if="courseTemp&&courseTemp.IsMustSelectClass" @click="courseSelectClass(courseTemp)">
				<div class="select-seat-left">选择班级</div>
				<div class="select-seat-right">
					<span class="select" v-if="productsIsSelectArr[tcIndex]&&productsIsSelectArr[tcIndex].classObj">
						{{selectText}}
					</span>
					<!-- <svg class="icon icon-color" aria-hidden="true">
						<use xlink:href="#icon-next"></use>
					</svg> -->
					<div class="icon-wrapper">
						<svg class="icon icon-color" aria-hidden="true">
							<use xlink:href="#icon-next"></use>
						</svg>
					</div>
				</div>
			</div>
			<!-- 班级 -->
			<div class="select-goods" v-if="classTemp&&classTemp.Bindings&&classTemp.Bindings.length>0">
				<div class="select-goods-heard">
					物品
				</div>
				<div class="select-goods-content" 
						v-for="(item,index) in classTemp.Bindings" 
						@click="selectBangdings(item,index)"
						:class="{active:selectBingsTemp[index]}">	
					<div class="select-goods-content-left">
						<div class="icon-wrapper">
							<svg class="icon" aria-hidden="true" v-if="!selectBingsTemp[index]">
		                		<use xlink:href="#icon-duoxuanweixuanzhong"></use>
		            		</svg>
							<svg class="icon" aria-hidden="true" v-else>
		                		<use xlink:href="#icon-duoxuanxuanzhong"></use>
		            		</svg>
						</div>
	            		{{item.Name}}
					</div>
					<div class="select-goods-content-right">&#165;{{item.Money|formatNumber}}</div>
				</div>
			</div>
			<!-- 单选课程 -->
			<div class="select-goods" v-if="courseTemp&&courseTemp.Bindings&&courseTemp.Bindings.length>0">
				<div class="select-goods-heard">
					物品
				</div>
				<div class="select-goods-content" 
					 v-for="(item,index) in courseTemp.Bindings"
					 @click="selectBangdings(item,index)" 
					 :class="{active:selectBingsTemp[index]}">	
						<div class="select-goods-content-left">
							<div class="icon-wrapper">
								<svg class="icon" aria-hidden="true" v-if="!selectBingsTemp[index]">
			                		<use xlink:href="#icon-duoxuanweixuanzhong"></use>
			            		</svg>
								<svg class="icon" aria-hidden="true" v-else>
			                		<use xlink:href="#icon-duoxuanxuanzhong"></use>
			            		</svg>
							</div>
		            		{{item.Name}}
						</div>
						<div class="select-goods-content-right">&#165;{{item.Money|formatNumber}}</div>
				</div>
			</div>
		</div>
		<div class="bottom" @click="closeSelect" slot="footer">确定</div>
	</action-sheet>
</template>

<script>
	 
	export default{
		mixins: [app.mixin.popupWindowRouteMixin],
		components: {
		},
		props:{
			opened: {
				type: Boolean
			},
			productsIsSelectArr: {
				type: Array
			},
			tcIndex: {
				type: Number
			},
			classInfo: {
				type: Object,
				default: {}
			},
			courseInfo: {
				type: Object,
				default: {}
			},
			openSelectSeatTag: {
				type: Number
			}
	
		},
		data() {
			return {
				showSelect: false,
				scrollerStyle: {
					"max-height": "80vh"
				},
				selectBingsTemp: [],
				classTemp: {},
				courseTemp: {},
				selectSpecsTemp: []
			}
		},
		computed: {
			scrollerData() {
				return {
					poened: this.opened,
					classInfo: this.classInfo,
					courseInfo: this.courseInfo
				}
			},
			selectText() {
				let str = '',
					parr = this.productsIsSelectArr,
					index = this.tcIndex,
					seatName = ''
				if (parr[index].classObj.CurrentSeat) {
					seatName = parr[index].classObj.CurrentSeat.Name || parr[index].classObj.CurrentSeat.SeatName 
				}
				if (parr[index].classObj.Name && parr[index].classObj.CurrentSeat) {
					str = parr[index].classObj.Name +';' +' ' + seatName
				}
				if (parr[index].classObj.Name && !parr[index].classObj.CurrentSeat) {
					str = parr[index].classObj.Name
				}
				if (!parr[index].classObj.Name && parr[index].classObj.CurrentSeat) {
					str = seatName
				}
				return str
			},
			computedMoney() {
				let arr = this.selectSpecsTemp.filter(obj => obj.isSelect)
				if (arr.length) return arr[0].Price
			},
			unit() {
				if (this.classInfo.Type == 1) return this.classInfo.ClassInfo.Unit
				if (this.classInfo.Type == 3) return this.classInfo.ShiftInfo.Unit
			}
		},
		methods: {
			getSelectBindings() {
				let index = this.tcIndex,
					parr = this.productsIsSelectArr;
				if (parr[index] && parr[index].selectBingsTemp) {
					this.selectBingsTemp = app.tool.clone(parr[index].selectBingsTemp) || []
				} else {
					this.selectBingsTemp = [];
					//班级
					if (this.classInfo && this.classInfo.ClassInfo && this.classInfo.ClassInfo.Bindings.length) {
						this.classInfo.ClassInfo.Bindings.forEach( item => {
							this.selectBingsTemp.push('');
						})
					}
					//课程
					if (this.courseInfo && this.courseInfo.ShiftInfo && this.courseInfo.ShiftInfo.Bindings.length) {
						this.courseInfo.ShiftInfo.Bindings.forEach( item => {
							this.selectBingsTemp.push('');
						})
					}
				}
				if (parr[index].shiftSpecList) {
					this.selectSpecsTemp = app.tool.clone(parr[index].shiftSpecList)
				} else {
					if (this.classInfo && this.classInfo.ClassInfo && this.classInfo.ClassInfo.ShiftSpecsList) this.selectSpecsTemp = app.tool.clone(this.classInfo.ClassInfo.ShiftSpecsList)
					if (this.courseInfo && this.courseInfo.ShiftInfo && this.courseInfo.ShiftInfo.Specs) this.selectSpecsTemp = app.tool.clone(this.courseInfo.ShiftInfo.Specs)
				}

			},
			openSelectSeat() {
				if (this.classTemp && this.classTemp.CurrentSeat) {
	    			app.toast('info','您在这门课程已经选取座位，请勿重复选取');
            	    return
				}
				this.$emit('openSelectSeat', 2)
			},
	    	selectBangdings(item, index) {
	    		// let flag = JSON.stringify(this.selectBingsTemp[index]) == JSON.stringify(item) ? true : false
	    		let flag = app.tool.isObjectEqual(this.selectBingsTemp[index], item)
	    		if (!flag) {
	    			this.selectBingsTemp.splice(index, 1, item);
	    		} else {
	    			this.selectBingsTemp.splice(index, 1, '');
	    		}
	    	},
	    	selectNum(obj) {
	    		this.selectSpecsTemp.forEach(item => {
	    			if (item.ID == obj.ID) {
	    				item.isSelect = true
	    			} else {
	    				item.isSelect = false
	    			}
	    		})
	    	},
	    	//点击确定按钮
	    	closeSelect() {
	    		if (this.courseInfo.ClassInfo) { //班级
	    			this.$emit('tcSelectBingingsOK', {
	    				selectBingsTemp: this.selectBingsTemp,
	    				bindingsSeatObj: this.productsIsSelectArr[this.tcIndex].bindingsSeatObj || {},
	    				shiftSpecList: this.selectSpecsTemp
	    			})
	    		} else if(this.courseInfo.ShiftInfo) { //课程
	    			this.$emit('tcSelectBingingsOK', {
	    				selectBingsTemp: this.selectBingsTemp,
	    				bindingsSeatObj: this.productsIsSelectArr[this.tcIndex].bindingsSeatObj || {},
	    				classObj: this.productsIsSelectArr[this.tcIndex].classObj || {},
	    				shiftSpecList: this.selectSpecsTemp
	    			})
	    		}

	    		this.close();
	    	},
	    	cancel() {
	    		this._cancel();
	    	},

	    	courseSelectClass(courseInfo) {
	    		this.$emit('getCourseInfo', courseInfo)
	    	}
		},
		created() {
			window.b = this
		},
		watch: {
			opened(val, oldVal) {
				if (val) {
					this.getSelectBindings();
				}
			},
			classInfo(val, oldVal) {
				this.classTemp = this.classInfo.ClassInfo
				this.getSelectBindings();
			},
			courseInfo(val) {
				this.courseTemp = this.courseInfo.ShiftInfo
				this.getSelectBindings();
			}
		}


	}
</script>