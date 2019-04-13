<!--快速排课-->
<style scoped lang="scss">
	
	
	.course-attendance-newcourse-container {
		background-color: $color-assist-1;
		.scroller {
			@include position-absolute(93px, 0, 50px, 0);
			.item {
				display: flex;
				width: 100%;
				background-color: $color-white;
				color: $color-6;
				height: 92px;
				padding: 15px 15px 15px 0;
				box-sizing: border-box;
				.icon-area {
					width: 48px;
					font-size: 18px;
					padding: 0 15px;
					line-height: 68px;
				}
				.con-area {
					flex: 1;
					max-width: calc(100% - 48px);
					.top {
						font-size: 16px;
						height: 16px;
						line-height: 16px;
                        position: relative;
						align-items: baseline;
                        margin-bottom: 13px;
						.class-name {
                            display: inline-block;
							max-width: 85%;
							color: $color-3;
							@include ellipsis-single;
						}
						.counts {
                            display: inline-block;
							color: $color-6;
                            position: absolute;
                            right: 0;
						}
					}
					.campus-name {
						@include ellipsis-single;
						font-size: 12px;
						line-height: 12px;
                        margin-bottom: 9px;
                        .icon{
                            margin-right: 5px;
                        }
					}
					.bottom {
						font-size: 12px;
						height: 12px;
						line-height: 14px;
						@include flex-between;
                        .icon{
                            margin-right: 5px;
                        }
						.class-teacher {
                            flex: 1;
                            padding-right: 5px;
							@include ellipsis-single;
						}
                        .course-name{
                            max-width: 122px;
                            @include ellipsis-single;
                        }
					}
				}
			}
            .card-void{
                background-color: $color-assist-1;
                height: 10px;
                width: 100%;
            }
		}
		.header {
			position: absolute;
			top: 0;
			width: 100%;
			height: 93px;
			background-color: $color-white;
            @include border-bottom;
			.search-area {
				padding: 7px 15px;
				font-size: 14px;
				height: 44px;
				line-height: 44px;
				color: $color-6;
				@include border-bottom;
				@include flex-between;
				.search {
					flex: 1;
					position: relative;
					border: 1px solid $color-assist-1;
					padding: 0 50px 0 6px;
					border-radius: 50px;
					height: 28px;
                    line-height: 28px;
					.search-in {
						width: 100%;
						padding: 0;
						margin: 0;
						border: none;
						box-sizing: border-box;
						outline: none;
						border-radius: 0;
						font-size: 14px;
						height: 28px;
						padding-left: 15px;
						border-top-left-radius: 10px;
						border-bottom-left-radius: 10px;
                        position: relative;
                        top: -1px;
					}
					.search-btn {
						position: absolute;
						top: -1px;
						right: -1px;
						width: 50px;
						height: 28px;
						line-height: 28px;
						text-align: center;
						background-color: $color-assist-1;
						border-radius: 50px;
					}
				}
				.filter {
					width: 50px;
					margin-left: 15px;
					border-radius: 50px;
					border: 1px solid $color-assist-1;
					background-color: $color-assist-1;
					text-align: center;
					height: 28px;
					line-height: 26px;
				}
			}
			.campu-area {
				height: 44px;
				line-height: 44px;
				padding: 0 15px;
				width: 100%;
				@include flex-between;
				.describe {
					width: 60px;
				}
				.campu-box {
					max-width: 75%;
					display: flex;
					justify-content: flex-end;
					.campu-name {
						max-width: 100%;
						@include ellipsis-single;
					}
				}
			}
            .void{
                height: 9px;
                background-color: $color-assist-1;
            }
		}
		.footer {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 50px;
			line-height: 51px;
			padding: 11px 15px;
			font-size: 12px;
			background-color: $color-white;
			color: $color-9;
			@include shadow-base;
			display: flex;
			justify-content: flex-end;
			.remark {
				height: 28px;
				line-height: 28px;
				margin-right: 10px;
			}
			.prev-step {
				width: 93px;
				text-align: center;
				height: 28px;
				line-height: 28px;
				background-color: $color-white;
				color: $color-primary;
				font-size: 15px;
				border: 1px solid $color-primary;
				border-radius: 28px;
				margin-right: 15px;
			}
			.next-step{
				width: 93px;
				text-align: center;
				height: 28px;
				line-height: 28px;
				background-color: $color-primary;
				border: 1px solid $color-primary;
				color: $color-white;
				font-size: 15px;
				border-radius: 28px;
			}
		}
		.noData-temp {
			@include position-absolute;
		}
		.as-state,
		.as-campus,
		.as-details {
			@include position-absolute;
		}
	}
</style>

<template>
	<div class="course-attendance-newcourse-container">
		<div class="header">
			<div class="search-area">
				<div class="search">
					<input class="search-in" type="text" placeholder="输入班级名称" v-model="searchQuery">
					<span class="search-btn" @click="search">搜索</span>
				</div>
				<div @click="openStateActionsheet" class="filter">筛选</div>
			</div>
			<div class="campu-area" @click="openCampusActionsheet">
				<div class="describe">选择{{app.sysInfo.Title_Campus}}</div>
				<div class="campu-box">
					<div class="campu-name">{{currentCampu.name}}</div>
					<div class="icon-area">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-youjiantou"></use>
						</svg>
					</div>
				</div>
			</div>

		</div>

		<scroller-super 
			class="scroller" 
			:type="2" 
			:data="list" 
			:pagingOption="pagingOption" 
			@loadData="loadData" 
			ref="newcourseScroller">
            <div v-for="item in list" :key="item.ID">
                <div class="item" @click="selectClass(item)">
                    <div class="icon-area">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="currentClass.ID==item.ID?'#icon-danxuan':'#icon-danxuan-weixuanze'"></use>
                        </svg>
                    </div>
                    <div class="con-area">
                        <div class="top">
                            <div class="class-name">{{item.Name}}</div>
                            <div class="counts">{{item.StudentCount}}/{{item.MaxStudentsAmount}}</div>
                        </div>
                        <div class="campus-name">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-xiaoqu2"></use>
                            </svg>{{item.CampusName}}
                        </div>

                        <div class="bottom">
                            <div class="class-teacher">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-laoshi"></use>
                                </svg>{{item.TeacherName}}
                            </div>
                            <div class="course-name"><svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-kecheng1"></use>
                            </svg>{{item.ShiftName}}
                            </div>
                            <!--<div class="class-date">开班日期：{{item.OpenDate.replace(/-/g,'.')}}</div>-->
                        </div>
                    </div>
                </div>
                <div class="card-void"></div>
            </div>
			<empty-page class="noData-temp" v-if="list.length == 0" :type="1001"></empty-page>
		</scroller-super>

		<div class="footer">
			<div class="remark">点击下一步进行班级信息填写</div>
			<div class="next-step" @click="nextStep">下一步</div>
		</div>

		<!--筛选-->
		<state-actionsheet
			@stateType="acceptType" 
			class="as-state" 
			:stateList="state.stateList" 
			:curState="state.curState" 
			:opened.sync="openState">
		</state-actionsheet>

		<!--选择分校-->
		<course-attendance-campus 
			class="as-campus" 
			:opened.sync="openAsCampus" 
			:campusList="campusList" 
			@courseAttendanceCampus="campuAction">
		</course-attendance-campus>

		<!--详情页 以子组件的形式-->
		<newcourse-details 
			class="as-details" 
			:opened.sync="openDetails" 
			:detailsObj="detailsObj" 
			@courseAttendanceNewcourseReplace="courseAttendanceNewcourseReplace"
			@backToNewcourse="prevStep">
		</newcourse-details>
		
		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
	import EmptyPage from 'teacher/components/common/empty-page/empty-page';
	import StateActionsheet from 'teacher/components/common/actionsheets/state-actionsheet.vue';
	import courseAttendanceCampus from './child/course-attendance-campus';
	import NewcourseDetails from './child/newcourse-details';
	import { processPost } from "teacher/api/common";

	export default {
		name: "course-attendance-newcourse",
		data() {
			return {
				wxTitle: '选择点名的班级',
				list: [], //班级列表
				campusList: [], //校区列表
				currentCampu: {
					name: '',
					id: ''
				},
				openAsCampus: false, //是否展开‘校区选择’组件
				isLoading: true,
				searchQuery: '', //搜索输入框的双向绑定
				currentClass: '', //当前选择的班级信息
				state: {
					curState: 0,
					stateList: ['查看所有班级', '只看一对一', '只看一对多', '只看集体班'],
				},
				openState: false,
				campusPara: {
					pname: "queryClassCampus"
				},
				pagingOption: {
					api: processPost,
					params: {
						pname: "queryClass",
						countStudents: 1, //根据参数决定是否返回学员人数统计信息：预招人数，当前人数
						query: '', //班级名称
						campusId: '', //校区
						shiftType: 0 //课程类型：0不限，1一对一，2一对多，4集体班，其他组合关系相加即可（比如：3为一对一和一对多，5为一对一和集体班）
					},
					pageOpt: {
						indexKey: 'page', // 分页初始页码的'key'、'value'
						indexVal: 1,
						sizeKey: 'pageSize', // 每页请求数据长度的'key'、'value'
						sizeVal: 20,
						countKey: 'pageCount', // 后端返回的总页数'key'
					}
				},
				openDetails: false,
				detailsObj: {}
			}
		},
		methods: {
			loadData(ajaxPromise) {
				ajaxPromise.then(res => {
					this.isLoading = false;
					if(res.errcode == app.errok) {
						if(res.pageIndex === 1) {
							this.list = [];
						}
						this.list = this.list.concat(res.data);
					}
				})
			},
			getCampusData() {
				processPost({
					pname: "queryClassCampus"
				}).then(res => {
					this.campusList = res.data;
				})
			},
			//勾选班级
			selectClass(obj) {
				this.currentClass = obj;
			},
			//搜索
			search() {
				this.$refs.newcourseScroller.refresh({
					'query': this.searchQuery
				});
			},
			//筛选条件开关
			openStateActionsheet() {
				this.openState = !this.openState;
			},
			//筛选条件
			acceptType(type) {
				this.isLoading = true;
				this.list = [];
				this.$refs.newcourseScroller.refresh({
					'shiftType': type == 3 ? 4 : type
				});
			},
			//选择校区
			openCampusActionsheet() {
			    if(this.campusList.length<1){
                    app.toast('info','暂无可选校区。');
                    return
                }
				this.openAsCampus = !this.openAsCampus;
			},
			//接收分校信息
			campuAction(obj) {
				this.currentCampu.name = obj.CampusName;
				this.currentCampu.id = obj.CampusID;
				this.$refs.newcourseScroller.refresh({
					'campusId': obj.CampusID
				});
			},
			//下一步
			nextStep() {
				let obj = this.currentClass;
				if(this.currentClass == '') {
					app.toast('info', '请先选择班级。')
					return
				}
				if(!app.tool.op('CoursePlanForGroup') && (obj.IsOneToOne == 0 || obj.IsOneToOne == 2)) {
					app.alert({
						'title': '权限不足',
						'text': '未授权。此操作需要以下权限：教务管理 - 排课管理 - 集体班排课',
						btn: {
							'text': '知道了',
							'style': {},
							'action': true
						}
					});
					return
				}
				if(!app.tool.op('CoursePlanForOne') && obj.IsOneToOne == 1) {
					app.alert({
						'title': '权限不足',
						'text': '未授权。此操作需要以下权限：教务管理 - 排课管理 - 一对一排课',
						btn: {
							'text': '知道了',
							'style': {},
							'action': true
						}
					});
					return
				}
				this.detailsObj = app.tool.clone(obj); //进入页面每次都根据obj来渲染  不能直接改变此obj指针地址里的内容 所以克隆一份
				this.openDetails = true;
			},
			prevStep() {
				this.openDetails = false;
			},
			// 路由跳转
			courseAttendanceNewcourseReplace(id){
				setTimeout(()=>{
					this.$router.replace(
						{
							path: '/courseAttendanceStudents',
							query: {id: id}
						}
					);
				},50)
				
			}
		},
		created() {
			this.getCampusData();
		},
		components: {
			EmptyPage,
            StateActionsheet,
			courseAttendanceCampus,
			NewcourseDetails
		}
	}
</script>