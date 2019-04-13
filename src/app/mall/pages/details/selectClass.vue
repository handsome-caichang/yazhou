<style lang="scss" scoped>
    
    
    .select-class-wrapper {
    	@include position-absolute(0, 0, 0, 0);
    	z-index: 8888;
    	background-color: $color-assist-1;
    	.top {
    		@include position-absolute(0, 0, false, 0);
    		height: $h-3;
    		line-height: $h-3;
    		background-color: $color-white;
    		text-align: center;
    		color: $color-3;
    		font-size: $fs-normal-x;
    	}
    	.scroller-wrapper {
    		@include position-absolute($h-3, 0, 50px, 0);
    		.scroll {
    			width: 100%;
    			height: 100%;
    		}
	    	.class-info {
	    		padding: $edge $edge 0 $edge;
	    		.inner {
	    			background-color: $color-white;
	    			border-radius: 6px;
	    			border: 2px solid $color-white;
	    			padding: 15px 30px 15px 15px;
	    			position: relative;
	    			.name-wrapper {
	    				display: flex;
	    				.is-in, .is-out {
	    					text-align: center;
	    					width: 30px;
	    					height: $fs-normal-x;
	    					line-height: $fs-normal-x;
	    					font-size: $fs-small;
	    					color: $color-white;
	    					border-radius: 3px;
	    					margin-right: 5px;
	    				}
	    				.is-in {
	    					background-color: $color-primary;
	    				}
	    				.is-out {
	    					background-color: #EB441B;
	    				}
	    				.name {
	    					flex: 1;
	    					line-height: 18px;
	    					font-size: $fs-normal-x;
	    					color: $color-3;
	    				}
	    			}
	    			.num, .teacher, .date, .time {
	    				margin-top: $edge;
	    				display: flex;
	    				font-size: $fs-small-x;
	    				// height: 12px;
	    				line-height: 16px;
	    				color: $color-6;
	    				.icon {
	    					margin-right: 5px;
	    				}
	    				.has-sign-num {
	    					color: #E1230F;
	    					margin-right: 5px;
	    				}
	    				.seatInfo {
	    					color: $color-primary;
	    					.icon {
	    						margin-right: 0;
	    						margin-left: 20px;
	    					}
	    				}
	    			}
	    			.select-buttom {
	    				font-size: 20px;
	    				width: 20px;
	    				height: 20px;
	    				text-align: center;
	    				position: absolute;
	    				bottom: 15px;
	    				right: 15px;
	    				color: #CCCCCC;
	    			}
	    			.active {
	    				color: $color-primary;
	    			}
	    		}
	    		.border-px {
	    			border: 2px solid $color-primary;
	    		}
	    	}
	    	.void {
	    		height: $edge;
	    		background-color: $color-assist-1;
	    	}
    	}
    	.no-class {
    		@include position-absolute($h-3, 0, 50px, 0);
    		background-color: $color-assist-1;
    		text-align: center;
    		@include flex-center;
    	}
    	.bottom {
    		@include position-absolute(false, 0, 0, 0);
    		height: 50px;
    		line-height: 50px;
    		text-align: center;
    		background-color: $color-primary;
    		color: $color-white;
    		font-size: $fs-big-s;
    	}
    }

    .as-slide-enter-active, .as-slide-leave-active {
    	transition: all $duration $timing;
    }
    .as-slide-enter, .as-slide-leave-active {
    	transform: translate3d(100%, 0, 0);
    }
</style>

<template>
	<transition name="as-slide">
		<div class="select-class-wrapper" v-if="opened">
			<div class="top">选择班级</div>
			<div class="scroller-wrapper">
				<scroller-load class="scroll"
					ref="scroller"
					:data="list"
					@loadData="renderData"
					:pagingOption="pagingOption"> 
					<div class="class-info" v-for="(item, index) in list">
						<div class="inner" :class="{'border-px':activeIndex===index}" @click="selectClass(item, index)">
							<div class="name-wrapper">
								<div class="is-in" v-if="item.IsIn">已报</div>
								<div class="is-out" v-if="!item.IsIn&&item.Amount==item.MaxAmount&&item.MaxAmount>0">满员</div>
								<div class="name">
									{{item.Name}}
								</div>
							</div>
							<div class="num">
								<div>
									<svg class="icon icon-color" aria-hidden="true">
										<use xlink:href="#icon-xueshengrenshu"></use>
									</svg>
								</div>
								<!-- <div class="has-sign-num">{{item.Amount}}</div>
								<div class="can-sign-num" v-if="item.MaxAmount>0">/&nbsp{{item.MaxAmount}}</div> -->
								<div class="can-sign-num">剩余人数:&nbsp{{getCanJoinNum(item)}}</div>
								<div class="seatInfo" v-if="item.CurrentSeat!=null">
									<svg class="icon icon-color" aria-hidden="true">
										<use xlink:href="#icon-zuowei"></use>
									</svg>
									{{item.CurrentSeat.Name || item.CurrentSeat.SeatName}}
								</div>
							</div>
							<div class="teacher" v-if="item.Teacher">
								<div>
									<svg class="icon icon-color" aria-hidden="true">
										<use xlink:href="#icon-laoshiicon"></use>
									</svg>
								</div>
								任课老师:&nbsp{{item.Teacher}}
							</div>
							<div class="date" v-if="item.StartDate">
								<div>
									<svg class="icon icon-color" aria-hidden="true">
										<use xlink:href="#icon-youxiaoqiicon"></use>
									</svg>
								</div>
								开班日期:&nbsp{{item.StartDate|formatDatetime("MM月dd日")}}
							</div>
							<div class="time" v-if="item.CourseTime">
								<div>
									<svg class="icon icon-color" aria-hidden="true">
										<use xlink:href="#icon-riqiicon"></use>
									</svg>
								</div>
								上课时间:&nbsp{{item.CourseTime}}
							</div>
							<div class="select-buttom" 
								v-if="!(!item.IsIn&&item.Amount==item.MaxAmount&&item.MaxAmount>0)"
								:class="{active:activeIndex===index}"
								>
								<svg class="icon icon-color" aria-hidden="true">
									<use :xlink:href="activeIndex===index?'#icon-xuanzhong':'#icon-danxuanweizhong'"></use>
								</svg>
							</div>
						</div>
					</div>
					<div class="void"></div>
				</scroller-load>
			</div>
			<div class="no-class" v-if="showNoClass">课程暂未设置班级，无法购买</div>
			<div v-if="parseInt($route.params.type)===3">
				<div class="bottom" v-if="courseInfo.IsMustSelectSeat&&!isAlreadySelect" @click="openSelectSeat">
					选择座位
				</div>
				<div class="bottom" v-if="(!courseInfo.IsMustSelectSeat&&isAddCar==='nowShop')||(courseInfo.IsMustSelectSeat&&isAddCar==='nowShop'&&isAlreadySelect)" @click="nowShop">
					选好了,去报名
				</div>
				<div class="bottom" v-if="(!courseInfo.IsMustSelectSeat&&isAddCar==='addCar')||(courseInfo.IsMustSelectSeat&&isAddCar==='addCar'&&isAlreadySelect)" @click="addShopCar">
					加入购物车
				</div>
			</div>
			<div v-if="parseInt($route.params.type)===100">
				<div class="bottom" v-if="courseInfo.ShiftInfo&&!courseInfo.ShiftInfo.IsMustSelectSeat||isAlreadySelect" @click="tcSelectClassDone">
					确定
				</div>
				<div class="bottom" v-if="courseInfo.ShiftInfo&&courseInfo.ShiftInfo.IsMustSelectSeat&&!isAlreadySelect" @click="openSelectSeat">
					选择座位
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import {getclassesByProductID} from 'api/yy'
	export default {
		mixins: [app.mixin.popupWindowRouteMixin],
		props: {
			opened: {
				type: Boolean,
			},
			isAddCar: {
				type: String,
				default: 'nowShop'
			},
			courseInfo: {
				type: Object
			},
			tcCourseInfo: {
				type: Object
			},
			courseSelectSeat: {
				type: Object
			},
			productsIsSelectArr: {
				type: Array,
			},
			tcIndex: {
				type: Number
			}
		},
		computed: {
			
		},
		data() {
			return {
				list: [],
				activeIndex: null,
				bottomText: '',
				alreadySelectSeatArr: [],
				isAlreadySelect: false,
				pagingOption: {
                    api: getclassesByProductID,
                    params: {
		    			ProductID: null
		    		}
				},
				showNoClass: false
			}
		},
		computed: {
		},
		methods: {
			renderData(ajaxPromise) {
				ajaxPromise.then(res => {
					this.isLoading = false;
					this.showNoClass = false
				    if (res.ErrorCode == app.errok) {
				    	if (res.PageIndex === 1) {
				    		this.list = []
				    	}
				        this.list = this.list.concat(res.Data);
			    		if (this.list.length === 0) {
			    			this.showNoClass = true
			    		}
		               	if (parseInt(this.$route.params.type) === 100 && this.list[this.activeIndex]) {
		               		if (this.list[this.activeIndex].ID && this.productsIsSelectArr[this.tcIndex].classObj) {
		        	       		if(this.list[this.activeIndex].ID === this.productsIsSelectArr[this.tcIndex].classObj.ID) {
		        	       			this.list[this.activeIndex].CurrentSeat = this.productsIsSelectArr[this.tcIndex].classObj.CurrentSeat
		        	       		} else {
		        	       			if(this.productsIsSelectArr[this.tcIndex].classObj) this.activeIndex = this.productsIsSelectArr[this.tcIndex].classObj.activeIndex
		        	       		}
		               		} else {
		               			this.activeIndex = null
		               		}
		               	}
		               	if (parseInt(this.$route.params.type) === 100) {
		               		// console.log('0101010101010101')
		               		// console.log(this.productsIsSelectArr[this.tcIndex])
		               		let parr = this.productsIsSelectArr,
		               			index = this.tcIndex
		               			if (parr[index].classObj && parr[index].classObj.activeIndex !== null) {
		               				if (this.list[parr[index].classObj.activeIndex] && this.list[parr[index].classObj.activeIndex].ID === parr[index].classObj.ID) {
		               					this.activeIndex = parr[index].classObj.activeIndex
		               					this.list[this.activeIndex].CurrentSeat = parr[index].classObj.CurrentSeat
		               				}
		               			}
		               	}
		               	this.list.forEach((obj, index) =>{
		               		if (obj.CurrentSeat && obj.CurrentSeat.Name && obj.CurrentSeat.Row && obj.CurrentSeat.Column) {
		               			this.alreadySelectSeatArr.push(index)
		               		}
		               	})
				    }
				})
			},
			selectClass(obj, index) {
				if (!obj.IsIn && obj.Amount == obj.MaxAmount && obj.MaxAmount > 0) return
				if (this.activeIndex == index) {
					this.activeIndex = null
				} else {
					this.activeIndex = index
				}
				if (parseInt(this.$route.params.type === 100)) {
					this.$emit('selectClassDone', {
						classObj: obj,
						listIndex: index
					})
				}
			},
			openSelectSeat() {
				if (this.activeIndex === null) {
					app.toast('info','您还没有选择班级。')
					return
				}
				this.$emit('openSelectSeat', this.list[this.activeIndex])
			},
			addShopCar() {
				if (this.activeIndex === null) {
					app.toast('info','您还没有选择班级。')
					return
				}
				// console.log(this.list[this.activeIndex])
				this.$emit('getClassIDtoAddShop', this.list[this.activeIndex])
			},
			nowShop() {
				if (this.activeIndex === null) {
					app.toast('info','您还没有选择班级。')
					return
				}
				this.$emit('getClassIDtoNowBuy', this.list[this.activeIndex])
			},
			tcSelectClassDone() {//套餐选择了班级  但是不需要选择座位
				if (this.activeIndex === null) {
					app.toast('info','您还没有选择班级。')
					return
				}
				let obj = this.list[this.activeIndex]
					obj.activeIndex = this.activeIndex
				// console.log(".........................")	
				// console.log(obj.CurrentSeat)
				this.$emit('tcSelectClassDone', obj)
			},
			getCanJoinNum(obj) {
				let str = ''
				str = obj.MaxAmount === 0 ? '不限' : obj.MaxAmount - obj.Amount >= 0 ? obj.MaxAmount - obj.Amount : 0
				return str
			}
		},
		mounted() {
			window.b = this
		},
		watch: {
			opened(val) {
				if (val) {
					if (parseInt(this.$route.params.type) === 3) this.activeIndex = null
					this.pagingOption.params.ProductID = this.courseInfo.ID
				} else {
					// console.log(this.$refs.scroller.scroller.y)
				}
			},
			courseSelectSeat(val) {
				if (val) {
					// if(this.list[this.activeIndex]) this.list[this.activeIndex].CurrentSeat = val.SeatName
					if(this.list[this.activeIndex]) this.list[this.activeIndex].CurrentSeat = val
				}
			},
			activeIndex(val) {
				if (val !== null) {
					this.isAlreadySelect = this.alreadySelectSeatArr.indexOf(this.activeIndex) >= 0 ? true : false
				}
			}
		}
	}
</script>

