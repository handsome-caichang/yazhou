<style scoped lang="scss">
	
    
	.wrap{
		@include position-absolute;
		z-index: 9999;
		background-color: $color-white;
		.no-seat {
			width: 100%;
			height: 100%;
			text-align: center;
			background-color: $color-assist-1;
			@include flex-center;
		}
		.page-heard {
			@include position-absolute(0, 0, false, 0);
			background-color: white;
			z-index: 33;
			height: 100px;
			.classroom{
				margin-top: 2*$fs-small-s;
				font-size: $fs-normal;
				line-height: $fs-normal;
				color: $color-3;
				margin-top: 2*$edge;
				text-align: center;
				margin-bottom: 2*$fs-normal;
				.classroom-name {
					color: $color-primary;
				}
			}
			.example{
				height: $fs-big;
				display: flex;
				margin-top: 5px;
				.seat-example {
					width: 33%;
					text-align: center;
					.icon-color{
						font-size:2*$fs-small-x;
					}
				}
			}
		}
		.left-wrapper {
			@include position-absolute(100px, false, 0, 0)
			overflow: hidden;
			z-index: 22;
			width: 45px;
			.left{
				// z-index: 22;
				width: 45px;
				padding-left: $fs-small-x;
				background-color: $color-assist-1;
				// margin-top: 70px;
				position: absolute;
				top: 50px;
				.cicle-container {
					height: 39px;
					.cicle{
						display: block;
						width:  $fs-big-s;
						height: $fs-big-s;
						background-color: $color-9;
						border-radius: 100%;
						text-align: center;
						line-height: $fs-big-s;
						margin-right: $fs-big-s;
						color: $color-white;
					}
				}
				
			}

		}
		
		.layout{
			@include position-absolute(100px, 0, 50px, 0);
			background-color: $color-assist-1;
			flex-wrap: wrap;
			.scroll-wrapper {
				min-width: 100%;
				.heard-wrap {
					width: 100%;
					height: 30px;
					.heard {
						width: 150px;
						height: 30px;
						line-height: 30px;
						text-align: center;
						border: 1px solid #E2E2E2;
						margin: 0 auto;
						border-top: none;
						border-radius: 0 0 6px 6px;
						background-color: #E2E2E2;
					}
				}
				.seat-container {
					.right{
						margin-top: 18px;
						text-align: center;
						padding-left: 33px;
						padding-right: 20px;
						.coloums{
							height: 39px;
							// display: flex;
							.rows{
								display: inline-block;
								padding-right: 12px;
								position: relative;
								&:last-child {
									padding-right: 0;
								}
								.tips{
									/*border: 1px solid $color-9;*/
									position: absolute;
									border-radius: 3px;
									width: 65px;
									height: 20px;
									text-align: center;
									line-height: 20px;
									top: -23px;
									left: -20px;
									color: $color-3;
									background-color: #fff;
	    							box-shadow: 0 1px 2px 0 rgba(0,0,0,0.21);
									&:after{
										content: "";
										position: absolute;
										width: 0;
		    							height: 0;
		    							top: 18px;
		    							left: 26px;
		    							border-top: 5px solid #fff;
		    							/*border-top: 5px solid $color-9;*/
									    border-right: 5px solid transparent;
									    border-left: 5px solid transparent;
									}
								}
								.seat {
									width: 24px;
									height: 24px;
									.icon{
										font-size: 2*$fs-small-x;
									}
								}
							}
						}
					}
				}
			}
			
		}
		.bottom{
			position: absolute;
			bottom: 0;
			height: 50px;
			line-height: 50px;
			color: $color-white;
			text-align: center;
			font-size: $fs-big-s;
			width: 100%;
			z-index: 999;
			background-color: $color-primary;
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
		<div  class="wrap" v-show="opened">
			<div v-if="seatInfo">
				<div class="page-heard">
					<div class="classroom">
						教室:<span class="classroom-name">
								{{seatInfo.Name}}
							</span>
					</div>
					<div class="example">
						<div class="seat-example"
							v-for="seat in seatTypes"
							v-if="seat.name!=='不可用'">
							<svg class="icon icon-color" aria-hidden="true">
								<use :xlink:href="seat.icon"></use>
							</svg>
							{{seat.name}}
						</div>
					</div>
				</div>
				<div class="left-wrapper">
					<div class="left" ref="left">
						<div class="cicle-container" v-for="num in seatInfo.Row">
							<span class="cicle">{{num}}</span>
						</div>
					</div>
				</div>
				<scroll-mini :list="seatInfo" 
							 :scrollY="true" 
							 :scrollX="true" 
							 @scroll="scroll" 
							 :listenScroll="true"
							 class="layout">
							 

					<div class="scroll-wrapper"  ref="wrapper">
						<div class="heard-wrap">
							<div class="heard">讲台</div>
						</div>
						<div class="seat-container" ref="seatContainer">
							<div class="right" ref="right">
								<div class="coloums"  v-for="r in seatInfo.Row">
									<div class="rows" v-for="c in seatInfo.Column" @click="selectSeat(r, c)" ref="rows">
										<div class="tips" ref="tips" v-if="seatPositionTemp && r === seatPositionTemp.row && c === seatPositionTemp.coloum">
											{{seatInfo.Layout[(r-1)*seatInfo.Column + c -1].Name}}
										</div>
										<div class="seat">
											<svg class="icon" aria-hidden="true" v-if="seatInfo.Layout[(r-1)*seatInfo.Column + c -1].Status!==2">
												<use :xlink:href="renderSeatIcon(r, c)"></use>
											</svg>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</scroll-mini>
				
				<div class="bottom" @click="close">
					确定
				</div>
			</div>
			<div class="no-seat" v-if="showNoSeat">该班级暂无座位，不能购买</div>
		</div>
	</transition>
</template>

<script>
	 
 	import {getClassLayOut} from 'api/yy'
 	import ScrollMini from 'common/scroller-mini/scroller-mini'
	export default{
		mixins: [app.mixin.popupWindowRouteMixin],
		props: {
			ClassID: {
				type: String
			},
			opened: {
				type: Boolean
			},
			seatObj: {
				type: Object
			},
			productsIsSelectArr: {
				type: Array,
			},
			tcIndex: {
				type: Number
			},
			openSelectSeatTag: {
				type: Number
			},
			isAddCar: {
				type: String
			},
			tcObj: {
				type: Object
			}
		},
		data() {
			return {
				// 教室座位信息
				seatInfo: {},
				mySeatInfo: null,//我的座位信息  字符串形式
				// 座位类型
				seatTypes: [
					{
						name: "空闲",
						icon: "#icon-kongde"
					}, {
						name: "不可用",
						icon: ""
					}, {
						name: "有人",
						icon: "#icon-youren"
					}, {
						name: "当前选中",
						icon: "#icon-zuowei"
					}
				],
				seatPositionTemp: {},
				wrapperWidth: 0,
				clickFlag: false,
				showNoSeat: false
			}
		},
		computed: {
			...Vuex.mapState(['seatPosition']),
		},
		methods: {
			_getClassLayOut() {
				this.seatInfo = null;
				this.showNoSeat = false
				getClassLayOut({ClassID: this.ClassID}).then((res) =>{
					if (res.ErrorCode == app.errok) {
						this.seatInfo = res.Data;
						if (this.seatInfo === null || !this.seatInfo.Layout.length) {
							this.showNoSeat = true
							return
						}
						this.$nextTick(() =>{
							this.wrapperWidth = this.$refs.rows[0].clientWidth*res.Data.Column + 85
							this.$refs.wrapper.style.width = this.wrapperWidth + 'px';
							this.$refs.right.style = ''
							this.$refs.seatContainer.style = ''
							if (this.wrapperWidth < document.body.clientWidth - 85) {
								this.wrapperWidth = document.body.clientWidth
								this.$refs.right.style.width = this.$refs.rows[0].clientWidth*res.Data.Column + 'px'
								this.$refs.right.style.paddingLeft = '0'
								this.$refs.right.style.paddingRight = '0'
								this.$refs.seatContainer.style.display = 'flex'
								this.$refs.seatContainer.style.justifyContent = 'center'
								this.$refs.seatContainer.style.alignItems = 'center'
							}
						})
					}
				})
			},
			getSeatPosition() {
					if (this.openSelectSeatTag == 1 && this.productsIsSelectArr[this.tcIndex]) {
						this.seatPositionTemp = this.productsIsSelectArr[this.tcIndex].bindingsSeatObj;
					}
					if (this.openSelectSeatTag == 2) {
						this.seatPositionTemp = this.productsIsSelectArr[this.tcIndex].bindingsSeatObj || {row: null,coloum: null};
					}
			},
			// 渲染座位信息，并判断是否是已选的座位;
			renderSeatIcon(r, c) {
				// r 行号， c 列号
				let s = this.seatInfo.Layout[(r-1)*this.seatInfo.Column + c -1];
				if (this.seatPositionTemp !== undefined) {
					if (s.Status === 1 && r === this.seatPositionTemp.row && c === this.seatPositionTemp.coloum) {
						return this.seatTypes[3].icon;
					} else {
						return this.seatTypes[s.Status - 1].icon;
					}
				}
			},
			selectSeat(r, c) {
				let s = this.seatInfo.Layout[(r-1)*this.seatInfo.Column + c -1];
				this.clickFlag = true;
				if (s.Status == 1) {
					this.seatPositionTemp = {
						row : r,
						coloum: c,
						SeatName: this.seatInfo.Layout[(r-1)*this.seatInfo.Column + c -1].Name
					}
					// this.mySeatInfo = this.seatInfo.Layout[(r-1)*this.seatInfo.Column + c -1].Name
				}
			},
			scroll(pos) {
				this.$refs.left.style.transform = `translate3d(0, ${pos.y}px, 0)`
			},
			close() {
				if (parseInt(this.$route.params.type) == 100) {
					if (this.tcObj.Type === 1) {
						if (this.clickFlag) {
							if (this.seatPositionTemp.row) {
								this.$emit('selectSeat', {//套餐
									row: this.seatPositionTemp.row,
									coloum: this.seatPositionTemp.coloum,
									SeatName: this.seatPositionTemp.SeatName
								})
							}
						}
						this.clickFlag = false;
					}
					if (this.tcObj.Type === 3 && this.seatPositionTemp.row) {
						/*console.log('================================')
						console.log(this.seatPositionTemp)*/
						this.$emit('selectSeat', {//套餐
							row: this.seatPositionTemp.row,
							coloum: this.seatPositionTemp.coloum,
							SeatName: this.seatPositionTemp.SeatName
						})
					}
					this.$emit('update:opened', false);
				} else {
					if (!this.seatPositionTemp.row) {
						app.toast('info','该班级必须选座，请选择座位');
						return
					}
					this.$emit('hasSelectSeat', {
						row: this.seatPositionTemp.row,
						coloum: this.seatPositionTemp.coloum,
						SeatName: this.seatPositionTemp.SeatName,
						isAddCar: this.isAddCar
					})
				}
			}
		},
		watch: {
			opened(val) {
				this.seatPositionTemp = {}
				if (val) {
					this._getClassLayOut();
					if (parseInt(this.$route.params.type) == 1) {
						this.seatPositionTemp = app.tool.clone(this.seatObj);
					} else if(parseInt(this.$route.params.type) == 100) {
						if (this.tcObj.Type === 1) {//班级
							this.getSeatPosition();
						}
						if (this.tcObj.Type === 3) {//课程
							let parr = this.productsIsSelectArr,
								index = this.tcIndex
							if (parr[index] && parr[index].classObj && parr[index].classObj.ID === this.ClassID ) {
								// this.seatPositionTemp = parr[index].bindingsSeatObj
								this.seatPositionTemp = parr[index].classObj.CurrentSeat
							}
						}
					}
				}
			},
		},
		components: {
			ScrollMini
		}
	}
</script>