<!-- 预制订单-选择座位界面 -->
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
			@include position-absolute(100px, false, 0, 0);
			overflow: hidden;
			z-index: 22;
			width: 45px;
			.left{
				width: 45px;
				padding-left: $fs-small-x;
				background-color: $color-assist-1;
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
			@include position-absolute(100px, 0, 100px, 0);
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
						.columns{
							height: 39px;
							.rows{
								display: inline-block;
								padding-right: 12px;
								position: relative;
								&:last-child {
									padding-right: 0;
								}
								.tips{
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
            left: 0;
            right: 0;
			height: 100px;
            font-size: 14px;
            @include flex-center(column);
            background-color: #ffffff;
			text-align: center;
            z-index: 999;
            .tips {
                width: 90%;
            }
            .confirm {
                width: 90%;
                height: 32px;
                line-height: 32px;
                margin-top: 10px;
			    background-color: $color-primary;
			    color: $color-white;
            }
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
		<div class="wrap" 
            v-show="opened">
			<div v-if="seatInfo">
				<div class="page-heard">
					<div class="classroom">教室:<span class="classroom-name">{{seatInfo.Name}}</span></div>
					<div class="example">
						<div class="seat-example"
							v-for="seat in seatTypes"
							v-if="seat.icon!==''">
							<svg class="icon icon-color" aria-hidden="true">
								<use :xlink:href="seat.icon"></use>
							</svg>
							{{seat.name}}
						</div>
					</div>
				</div>
				<div class="left-wrapper">
					<div class="left" ref="left">
						<div class="cicle-container" v-for="num in seatInfo.Rows">
							<span class="cicle">{{num}}</span>
						</div>
					</div>
				</div>
				<scroll-mini 
                    :list="renderData" 
                    :scrollY="true" 
                    :scrollX="true" 
                    @scroll="scroll" 
                    :listenScroll="true"
                    class="layout">
					<div class="scroll-wrapper" ref="wrapper">
						<div class="heard-wrap">
							<div class="heard">讲台</div>
						</div>
						<div class="seat-container" ref="seatContainer">
							<div class="right" ref="right">
								<div class="columns"  v-for="r in seatInfo.Rows">
									<div class="rows" v-for="c in seatInfo.Columns" @click="selectSeat(r, c)" ref="rows">
										<div class="tips" ref="tips" v-if="seatPositionTemp && r === seatPositionTemp.row && c === seatPositionTemp.col">
											{{seatInfo.Layout[(r-1)*seatInfo.Columns + c -1].Name}}
										</div>
										<div class="seat">
											<svg class="icon" aria-hidden="true" v-if="seatInfo.Layout[(r-1)*seatInfo.Columns + c -1].Status!==2">
												<use :xlink:href="renderSeatIcon(r, c)"></use>
											</svg>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</scroll-mini>
				<div class="bottom">
                    <div class="tips">亲，请在{{seatInfo.OutTime}}分钟之内付款哦，否则座位会被别人选走的哟！</div>
                    <div class="confirm" @click="confirm">确定</div>
                </div>
			</div>
			<div class="no-seat" v-if="showNoSeat">该教室暂无座位</div>
		</div>
	</transition>
</template>

<script>
	import {mapState, mapMutations} from 'vuex';
 	import {getSeatDetail,putSeat} from 'parent/api/order';
    import ScrollMini from 'parent/components/common/scroller-mini/scroller-mini';
     
	export default{
		mixins: [app.mixin.popupWindowRouteMixin],
		props: {
            opened: {
                type: Boolean
            },
            seatPara: {
                type: Object
            }
		},
		data() {
			return {
				seatInfo: {}, //教室座位信息
				seatPositionTemp: {}, //已选的座位信息
				wrapperWidth: 0,   
				showNoSeat: false, //展示空白提示
				seatTypes: [{ //座位类型
                    name: "不可用", //status0
                    icon: ""
                }, {
                    name: "空闲", //status1
                    icon: "#icon-kongde"
                }, {
                    name: "",
                    icon: ""
                },{
                    name: "有人", //status3
                    icon: "#icon-youren"
                }, {
                    name: "当前选中", //status4
                    icon: "#icon-zuowei"
                }]
			}
		},
		computed: {
            renderData() {
                return {
                    seatInfo: this.seatInfo,
                    opened: this.opened
                }
            }
		},
		methods: {
            ...mapMutations([
                'set_orderListRefreshFlag',
                'set_orderDetailRefreshFlag'
        	]),
			_getClassLayOut() {
				this.seatInfo = null;
				this.showNoSeat = false
				getSeatDetail({
                    classId: this.seatPara.classId,
                    orderType: this.seatPara.orderType,
                    companyID: app.sysInfo.companyID,
                    company: app.sysInfo.companyID
                }).then((res) =>{
					if (res.ErrorCode == app.errok) {
						this.seatInfo = res.Data;
						if (this.seatInfo === null || !this.seatInfo.Layout.length) {
							this.showNoSeat = true;
							return;
                        }
                        this.seatInfo.Layout.forEach(item => {
                            if (item.Name==this.seatPara.selectedSeatName && item.StudentID==app.sysInfo.userId) {
                                item.Status = 1;
                            }
                        });
						this.$nextTick(() =>{
                            this.wrapperWidth = this.$refs.rows[0].clientWidth*res.Data.Columns + 85;
							this.$refs.wrapper.style.width = this.wrapperWidth + 'px';
							this.$refs.right.style = '';
							this.$refs.seatContainer.style = '';
							if (this.wrapperWidth < document.body.clientWidth - 85) {
								this.wrapperWidth = document.body.clientWidth;
								this.$refs.right.style.width = this.$refs.rows[0].clientWidth*res.Data.Columns + 'px';
								this.$refs.right.style.paddingLeft = '0';
								this.$refs.right.style.paddingRight = '0';
								this.$refs.seatContainer.style.display = 'flex';
								this.$refs.seatContainer.style.justifyContent = 'center';
								this.$refs.seatContainer.style.alignItems = 'center';
							}
						})
					}
				})
			},
			// 渲染座位信息，并判断是否是已选的座位;
            renderSeatIcon(r, c) { // r 行号， c 列号
                let s = this.seatInfo.Layout[(r-1)*this.seatInfo.Columns + c -1];
				if (this.seatPositionTemp !== undefined) {
					if (s.Status === 1 && r === this.seatPositionTemp.row && c === this.seatPositionTemp.col) {
						return this.seatTypes[4].icon;
					} else {
						return this.seatTypes[s.Status].icon;
					}
				}
			},
			selectSeat(r, c) {
				let s = this.seatInfo.Layout[(r-1)*this.seatInfo.Columns + c -1];
				if (s.Status == 1) {
					this.seatPositionTemp = {
						row : r,
						col: c,
						seatName: this.seatInfo.Layout[(r-1)*this.seatInfo.Columns + c -1].Name
					}
				}
			},
			scroll(pos) {
				this.$refs.left.style.transform = `translate3d(0, ${pos.y}px, 0)`
			},
			confirm() {
                if (!this.seatPositionTemp.row) {
                    app.toast('info','请选择座位。');
                    return;
                }
                if(this.seatPara.order.ErrorMsg=="座位被占用"){
                    putSeat({
                        classId: this.seatPara.classId,
                        classroomId: this.seatInfo.ID,
                        column: this.seatPositionTemp.col,
                        row: this.seatPositionTemp.row,
                        mode: 1,
                        student: this.seatPara.student,
                        company: app.sysInfo.companyID
                    }).then(res => {
                        this.close();
                        this.set_orderListRefreshFlag();
                        this.set_orderDetailRefreshFlag();
                    })
                }else{
                    this.$emit('setSeat', {
                        'classId': this.seatPara.classId,
                        'seat': this.seatPositionTemp
                    });
                    this.close();
                }
			}
		},
		watch: {
			opened(val) {
				this.seatPositionTemp = {}
				if (val) {
                    this._getClassLayOut();
                    this.seatPositionTemp = app.tool.clone(this.seatPara.seatObj);
				}
			},
		},
		components: {
			ScrollMini
		}
	}
</script>