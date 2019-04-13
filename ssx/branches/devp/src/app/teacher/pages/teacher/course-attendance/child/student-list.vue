<!--学生列表组件-->
<style scoped lang="scss">
	$bgcolor : #EEF1F6;
	$padding : 15px;
	.students-list {
		%same {
			padding: 0 $padding;
			min-height: 45px;
			@include flex-between;
			align-items: stretch;
			width: 100%;
			>div {
				display: flex;
				align-items: center;
			}
			>div:last-child {
				justify-content: flex-end;
			}
			>div:first-child {
				padding-right: 5px;
			}
		}
		.icon {
			font-size: 18px;
			vertical-align: bottom;
		}
		.column-1 {
			flex: 1 1 calc(100% - 200px);
			max-width: 100px;
		}
		.column-2 {
			flex: 1 0 60px;
		}
		.column-3 {
			flex: 1 0 50px;
		}
		.column-4 {
			flex: 1 0 90px;
			word-break: break-all;
		}
        .column-1,
        .column-4 {
            svg {
                margin-left: 3px;
            }
        }
        .column-2,
        .column-3 {
            span {
                svg {
                    &:last-child {
                        margin-left: 3px;
                    }
                }
            }
        }
		.dynamic {
			.input-like {
				width: 45px;
				height: 24px;
				border: 1px solid #ccc;
				padding: 0 2px;
				line-height: 24px;
				color: $color-9;
				border-radius: 2px;
				font-size: 13px;
				&.cost {
					color: $color-3;
				}
			}
		}
		.students-header {
			@extend %same;
            padding: 0 25px;
			font-size: 13px;
			color: $color-6;
			background: $color-white;
            border-bottom: 1px solid #EEF1F6;
            box-shadow:0px 2px 10px 0px rgba(0,0,0,0.08);
		}
        .item {
            margin: 0 10px;
            padding-top: 10px;
            &:last-child {
                padding-bottom: 10px;
            }
            .item-content {
                border: 1px solid #EEF1F6;
                box-shadow:0px 0px 6px 0px rgba(0,0,0,0.08);
            }
            .item-left {
                @include flex-center;
                position: absolute;
                right: -49px;
                top: 0;
                width: 49px;
                height: 100%;
                .delete {
                    text-align: center;
                    width: 39px;
                    height: 39px;
                    background: #FF3433;
                    // opacity: 0.6;
                    border-radius: 50%;
                    color: $color-white;
                    line-height: 39px;
                    box-shadow: 0px 2px 2px 0px rgba(255, 52, 51, 0.4);
                }
            }
        }
		.student-item {
			@extend %same;
			font-size: 15px;
			color: $color-3;
			background: $color-white;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
			.inline-icon {
				display: inline;
				width: 9px;
				height: 15px;
			}
			.icon.disable {
				color: rgb(245, 146, 0);
			}
			>div:first-child {
				padding: 10px 5px 10px 0;
			}
			.cost-info {
				font-size: 13px;
				margin-left: 1px;
				&.not-enough {
					color: #ff735c;
				}
			}
            .icon-down {
                font-size: 12px;
            }
		}
		.student-info {
			padding: 10px $padding;
			font-size: 13px;
            display: flex;
            align-items: center;
			background-color: #F1F8FF;
            .flex-item{
                flex: 1;
            }
            .tel{
                padding-left: 5px;
                text-align: right;
    			color: #999;
            }
            .fc-blue {
                color: #1E88F5;
            }
            .fc-warn {
                color: #FF8369;
            }
            .fc-warn-bd {
                text-decoration: underline;
            }
            .next {
                font-size: 11px;
                color: #FF8369;
                vertical-align: middle;
                margin-left: 3px;
            }
			a{
				text-decoration: none;
    			color: inherit;
			}
		}
        .bt-radius {
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
        }
		/*过期费用*/
		.outAmount-tip{
			position:absolute;
			.content{
				background:$color-white;
				position:relative;
				top:0;
				left:0;
				border:1px solid #ddd;
				@include fs-lh(13);
				padding:0 3px;
				border-radius:3px;
			}
			.content:after{
				content:'';
				background:$color-white;
				box-sizing:border-box;
				position:absolute;
				width:8px;
				height:8px;
				left:calc(50% - 4px);
				bottom:-4px;
				border-bottom:1px solid #ddd;
				border-right:1px solid #ddd;
				transform:rotate(45deg);
			}
		}
	}
</style>

<template>
	<div class="students-list">
		<!--头部-->
		<div class="students-header" ref="header">
			<div class="column-1">姓名</div>
			<div class="column-2" @click="checkAllAttend">
				<svg class="icon" aria-hidden="true">
					<use :xlink:href="isCheckAllAttend ? yesCheck: noCheck"></use>
				</svg>
				<span>出勤</span>
			</div>
			<!--非动态课消
			<div class="column-4" @click="checkAllCost" v-if="data.isDynamicConsume == 0">
				<svg class="icon" aria-hidden="true">
					<use :xlink:href="isCheckAllCost ? yesCheck: noCheck"></use>
				</svg>
				<span>计费({{data.unitCode == 2 && data.MinutesToTimes == 1 ? data.dynamicCostUnitShow :  data.unit}})</span>
			</div>
            -->
			<div class="column-3">缺勤</div>
			<!--动态课消-->
			<div class="column-4" @click="checkAllCostDynamic">
				<span>计费({{data.dynamicCostUnitShow}})</span>
				<svg class="icon" aria-hidden="true" style="width:9px; height:9px;">
					<use xlink:href="#icon-sanjiaoxing1"></use>
				</svg>
			</div>
		</div>
		<!--学员列表-->
		<div @click="checkItem">
            <slide-left v-for="(item,index) in listClone" :key="item.id" class="item">
                <div class="item-content">
                    <!--每一条的信息-->
                    <div class="student-item" :class="item.isShowDelete?'':'bt-radius'">
                        <div class="column-1 name-toggle-box data" :data-deletetoggle="index" style="word-break: break-all;">
                            <div>
                                <div style="display: inline;" v-html="item.nameHighlight"></div>
                                <svg class="icon inline-icon" aria-hidden="true" v-if="CFG.courseStudentEdit || CFG.enableShowTel">
                                    <use :xlink:href="item.isShowDelete ? '#icon-sanjiaoxing2' :'#icon-sanjiaoxing1'"></use>
                                </svg>
                                <!--状态标签-->
                                <svg class="icon" v-show="item.IsMend==1">
                                    <use xlink:href="#icon-bukebiaoqian"></use>
                                </svg>
                                <svg class="icon" v-show="item.IsAttendStauts==1">
                                    <use xlink:href="#icon-qingjiabiaoqian"></use>
                                </svg>
                                <svg class="icon" v-show="item.AdjustFlag==2" style="width:32px">
                                    <use xlink:href="#icon-lintiaobiaoqian"></use>
                                </svg>
                                <svg class="icon" v-show="item.AdjustFlag==3" style="width:32px">
                                    <use xlink:href="#icon-linjiabiaoqian"></use>
                                </svg>
                                <svg class="icon" v-show="item.machineChecked">
                                    <use xlink:href="#icon-qiandaobiaoqian"></use>
                                </svg>
                            </div>
                        </div>
                        <div class="column-2 data" :data-identy="'Attend-' + index">
                            <svg class="icon" aria-hidden="true" v-if="isJinzhiAttend(item)">
                                <use xlink:href="#icon-jinzhi"></use>
                            </svg>
                            <span v-else>
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="item.isAttend == 1 ? yesCheck : noCheck"></use>
                                </svg>
                                <svg class="icon icon-down" aria-hidden="true">
                                    <use xlink:href="#icon-xiangxia1"></use>
                                </svg>
                            </span>
                        </div>
                        <div class="column-3" @click="emitOpenAbsent(index)">
                            <span v-show="!item.isAttend">
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="item.absentCauseName ? '#icon-xuanzhongqueqin' : '#icon-danxuanweixuanzhong1'"></use>
                                </svg>
                                <svg class="icon icon-down" aria-hidden="true">
                                    <use xlink:href="#icon-xiangxia1"></use>
                                </svg>
                            </span>
                        </div>
                        <!--非动态课消
                        <div class="column-4 data" :data-identy="'Cost-' + index" v-if="data.isDynamicConsume == 0">
                            <svg class="icon" aria-hidden="true" v-if="item.isCost == 0 && !CFG.lessEnableCost && item.remainAmountToUnit - data.costConsumeAmount < 0">
                                <use xlink:href="#icon-jinzhi"></use>
                            </svg>
                            <svg class="icon" aria-hidden="true" v-else>
                                <use :xlink:href="item.isCost > 0 ? yesCheck : noCheck"></use>
                            </svg>
                            <span :class="{'not-enough':item.remainAmount <=0}" class="cost-info">
                                {{item.remainAmount >= 0? '剩' + item.remainAmount : '欠' + (-item.remainAmount)}}
                                <div style="display:inline-block"  @click="warnOutAmount($event,item)">
                                    <svg class="icon disable" aria-hidden="true" v-if="CFG.enableFeeOut && item.OutAmount!=0">
                                        <use xlink:href="#icon-tijiaoshibai"></use>
                                    </svg>
                                </div>
                            </span>
                        </div>
                        -->
                        <!--动态课消-->
                        <div class="column-4 data dynamic" :data-identy="'CostDynamic-' + index">
                            <div class="input-like" :class="{cost:item.isCost>0}">{{item.isCost}}</div>
                            <span :class="{'not-enough':item.remainAmount <=0}" class="cost-info">
                                {{item.remainAmount >= 0? '剩' + item.remainAmount : '欠' + (-item.remainAmount)}}
                                <div style="display:inline-block" @click="warnOutAmount($event,item)">
                                    <svg class="icon disable" aria-hidden="true" v-if="CFG.enableFeeOut && item.OutAmount!=0"  >
                                        <use xlink:href="#icon-tijiaoshibai"></use>
                                    </svg>
                                </div>
                            </span>
                        </div>
                    </div>
                    <!--每一条的删除框-->
                    <div class="student-info" :class="item.isShowDelete?'bt-radius':''" v-show="item.isShowDelete">
                        <div class="flex-item">
                            <span>出勤(<span class="fc-blue">迟到</span>)，</span>
                            <span v-if="item.absentCauseName">缺勤(<span class="fc-warn">{{item.absentCauseName}}</span>)，</span>
                            <span @click="emitCountOfAbsence(item)">共
                                <span :class="item.AbsentCauseCount>0?'fc-warn fc-warn-bd':''">缺勤{{item.AbsentCauseCount}}次</span> 
                                <svg class="icon next" aria-hidden="true" v-if="item.AbsentCauseCount>0">
                                    <use xlink:href="#icon-shouqi"></use>
                                </svg>
                            </span>
                        </div>
                        <div class="flex-item tel" v-if="CFG.enableShowTel">
                            <a :href="'tel:'+item.phone">{{item.phone}}
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-bodadianhua"></use>
                                </svg>
                            </a>
                        </div>
                        <div class="flex-item" v-else></div>
                    </div>
                </div>
                <div class="item-left"><div class="delete data" :data-deletestu="index">删除</div></div>
            </slide-left>
		</div>
		<!--过期费用提示框-->
		<div class="outAmount-tip" v-show="outAmountTip!=''" ref="outAmountTip">
			<div class="content">已排除过期费用（{{outAmountTip}}）</div>
		</div>
	</div>
</template>

<script>
    import SlideLeft from 'teacher/components/common/slide-left/slide-left.vue';
	import ListMixin from './list-mixin.js';
	import { removeStudent, reduceStudent, removeTryStudent, getMachineAttend } from "teacher/api/course-attendance";

	export default {
		name: "course-attendance-list-part",
		mixins: [ListMixin],
		props: {
			list: {
				type: Array,
				required: true,
				default: [],
			},
			data: {
				type: Object,
				required: true,
				default: {},
			},
			dynamicCostUnitShow: '',
			CFG: {
				type: Object,
				required: true,
				default: {}
			}
		},
		data() {
			return {
				listClone: [], //实际渲染的数据模型,勾选更改各种状态也只会更改在listClone上.list不会更改.
				listDeleteToggle: [], //是否显示下拉删除学员
				showMsg: true, //是否弹窗提示
				yesCheck: '#icon-danxuanxuanzhong1',
				noCheck: '#icon-danxuanweixuanzhong1',
				outAmountTip:'',//过期费用
                currentItem:''//当前item （缺勤选中的学员对象）
			};
		},
		methods: {
			isJinzhiAttend(item){
				return item.isCost == 0 &&  !this.CFG.lessEnableAttend && 
                ((item.remainAmountToUnit - this.data.costConsumeAmount < 0 && this.data.isDynamicConsume == 0) || 
                 (item.remainAmountToUnit <= 0 && this.data.isDynamicConsume == 1))
			},
			emitOpenAbsent(index) {
				//如果未勾选出勤,才可选择缺勤方式.
				if(this.listClone[index].isAttend) {
					app.toast('info', '已标记出勤');
				} else {
					this.$emit("openAbsent", this.listClone[index]);
				}
			},
            emitCountOfAbsence(item){
			    if(item.AbsentCauseCount<1){
			        return
                }
                this.currentItem = item;
			    this.$emit('openCountOfAbsence',item)
            },
			//显示过期费用
			warnOutAmount(event, item){
				event.stopPropagation();
				if (this.outAmountTip != ''){
					return;
				}
				let el = event.currentTarget;
				this.outAmountTip = item.OutAmount + this.data.unit;
				setTimeout(()=>{
					this.outAmountTip = '';
				},2000);
				this.$nextTick(()=>{
					let top = el.offsetTop,
						left = el.offsetLeft,
						div = this.$refs.outAmountTip,
						width = div.offsetWidth,
						height = div.offsetHeight;
					div.style.top = (top - height - 4) + "px";
					div.style.left = (left - width/2 + 8) +  "px";
				});
			},
			checkItem(event) {
				let el = event.target,
					count = 0;
				while(count < 4 && !app.dom.hasClass(el, 'data')) {
					count++;
					el = el.parentElement;
				}
				//复选框
				if(el.dataset && el.dataset.identy) {
					let s = el.dataset.identy,
						[method, index] = s.split('-');
					//checkAttend checkCost checkTry  (checkCostDynamic:异步的)
					this['check' + method](this.listClone[+index]);
					method != 'CostDynamic' && this.$emit('amountChange', this.listClone);
				}
				//切换删除
				if(el.dataset && el.dataset.deletetoggle) {
					let index = +el.dataset.deletetoggle;
					this.listClone[index].isShowDelete = !this.listClone[index].isShowDelete;
					this.$emit("refreshScroller");
				}
				//删除学员
				if(el.dataset && el.dataset.deletestu) {
					let index = +el.dataset.deletestu;
					this.postDeleteStu(index);
				}
			},
			//自动处理:考勤打卡或自动出勤计费
			autoCharge() {
				//开启了自动勾选出勤计费
				if(this.CFG.enableAutoCharge && !this.isCheckAllAttend && this.data.finished == 0) {
					this.checkAllAttend('firstTime');
				} else if(this.CFG.enableMachineAttend && this.listClone.length > 0) {
					//开启了打卡签到
					let params = {
						CourseID: this.data.id,
						StudentIDs: this.listClone.map(item => item.id).join(',')
					}
					getMachineAttend(params).then(res => {
						if(res.ErrorCode == 200) {
							let result = res.Data;
							this.showMsg = false;
							this.listClone.forEach(item => {
								this.$set(item,'machineChecked',result.indexOf(item.id) > -1);
								//item.machineChecked = result.indexOf(item.id) > -1; //初始化machineChecked字段
								if(item.machineChecked && item.isAttend == 0 && this.data.finished == 0) { //如果打卡自动勾选出勤
									this.checkAttend(item);
								}
							});
							this.showMsg = true;
							this.$emit('amountChange', this.listClone);
						} else {
							app.toast('error', res.ErrorMsg);
						}
					})
				}
			},

			//删除学员
			postDeleteStu(index) {
				let deleteStu = this.listClone[index];
				let params,send,tip;
				if (deleteStu.AdjustFlag == 3){//临加
					tip = `确定从当前上课记录中移除${deleteStu.name}学员吗?`;
					params = {
						id: this.data.id,
						student: deleteStu.id
					};
					send = removeStudent;	//请求
				} else {	//一般学员,临调和试听.
					tip = `确定将学员“${deleteStu.name}”从该堂课中移除（可在临时调课功能中撤销）？`;
					params = {
						id: this.data.id,
						students: deleteStu.id
					};
					if (deleteStu.AdjustFlag == 2 || deleteStu.isTry == 1){
						send = removeTryStudent;
						params.type = deleteStu.AdjustFlag == 2 ? 0 : 1;
					} else {
						send = reduceStudent;
					}
				}
				app.confirm({
                    text: tip,
                    titleStyle: {
                        'fontSize': '16px',
                        'fontWeight': 'bold' 
                    }
                }).then(flag => {
					if(flag) {
						send(params).then(res => {
							if(res.ErrorCode == 200) {
								this.listClone.splice(index, 1);
								this.$emit('amountChange', this.listClone);
								this.$emit("refreshScroller");
								app.toast('success', '移除学员成功。');
							} else {
								app.toast('error', res.ErrorMsg);
							}
						});
					}
				});
			},
			transform(item, index) {
				let amount = this.data.unitCode == 1 ? (item.remainAmount * 60).toFixed(2) * 1 : item.remainAmount;
				this.data.finished == 1 && (amount += item.isCost); //如果已经是上过课的,且勾选了计费的,那么剩余的应该加上该次勾选计费.
				return Object.assign({
					isShowDelete: false,
					orderIdx: index, //记录默认排序
					nameHighlight: item.name, //搜索高亮显示
					//剩余数量标准化处理
					remainAmountToUnit: amount
				}, item);
			},
            //缺勤次数清除之后点名界面缺勤次数更新
            handleEmit(){
                this.currentItem.AbsentCauseCount = app.ls.getStorage('deleteCountOfAbsence').Count;
            }
		},
		created() {

		},
		mounted() {
			this.listClone = this.list.map((item, index) => {
				return this.transform(item, index);
			});
			this.autoCharge();
			this.$emit('amountChange', this.listClone);
            app.eventDefine.on('deleteCountOfAbsence', this.handleEmit);
		},
        beforeDestroy() {
            app.eventDefine.off('deleteCountOfAbsence', this.handleEmit);
        },
		components: {
			SlideLeft
        },
		watch: {
			list(newList) {
				//从newList,更新listClone(实际是添加元素触发)
				let map = {};
				this.listClone.forEach(item => {
					map[item.id] = true;
				});
				newList.forEach((item, index) => {
					if(!map[item.id]) {
						this.listClone.unshift(this.transform(item, index));
					}
				});
				this.autoCharge();
				this.$emit('amountChange', this.listClone);
			}
		}
	}
</script>