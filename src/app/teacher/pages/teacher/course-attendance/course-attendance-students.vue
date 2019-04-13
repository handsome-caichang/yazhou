<style scoped lang="scss">
	
	
	$bgcolor : #EEF1F6;
	$padding : 15px;
	.course-atds-main {
		%same {
			height: 44px;
			padding: 0 $padding;
			@include flex-between;
			background: $color-white;
			font-size: 14px;
			color: $color-6;
		}
		%btn-same {
			height: 28px;
			border-radius: 28px;
			background: #EEF1F6;
			@include flex-center;
		}
		.course-atds-students {
			@include position-absolute;
			bottom: 50px;
			background: $color-white;
			.course-time {
				@extend %same;
				border-bottom: 1px solid $bgcolor;
				margin-bottom: 1px;
				.course-time-detail {
					color: $color-3;
				}
			}
			.course-content {
				@extend %same;
				border-bottom: 1px solid $bgcolor;
				margin-bottom: 1px;
				.course-content-detail-container {
					width: calc(100% - 30px);
					@include ellipsis-single;
					.course-content-detail {
						color: $color-3;
					}
				}
			}
			.student-photo {
				@extend %same;
				border-bottom: 5px solid $bgcolor;
				.student-photo-detail {
					color: $color-3;
				}
			}
			.operation-container {
				height: 50px;
				background: $color-white;
				@include flex-between;
				padding: 0 $padding;
				font-size: 13px;
				color: $color-6;
				.search-container {
					height: 28px;
					position: relative;
					.search-box {
						border: 1px solid #EEF1F6;
						border-radius: 28px;
						height: 28px;
						width: 100%;
						outline: none;
						padding-left: 27px;
						padding-right: 52px;
					}
					.icon-search {
						position: absolute;
						top: 8px;
						left: 12px;
						font-size: 12px;
					}
					.search-btn {
						@extend %btn-same;
						width: 50px;
						position: absolute;
						right: 0;
						top: 0;
					}
				}
				.sort-btn {
					flex-shrink: 0;
					@extend %btn-same;
					width: 60px;
					margin-left: 10px;
					.icon {
						font-size: 12px;
					}
				}
				.operate-btn {
					flex-shrink: 0;
					@extend %btn-same;
					width: 70px;
					margin-left: 10px;
					.icon {
						font-size: 12px;
					}
				}
			}
		}
		.count-and-submit {
			height: 50px;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			background: $color-white;
			@include flex-between;
			@include shadow-base;
			padding: 0 $padding;
			color: #1E88F5;
			border-top: 1px solid $bgcolor;
			.count-desc {
				font-size: 12px;
				width: 124px;
				color: #666;
				@include flex-between;
				flex-flow: row wrap;
				div {
					width: 50%;
				}
				.high-light {
					color: #1E88F5;
				}
			}
			.btn {
				@extend %btn-same;
				width: 95px;
				background: #1E88F5;
				color: $color-white;
				margin-left: 10px;
				&.cancel {
					background: $color-white;
					border: 1px solid #1E88F5;
					color: #1E88F5;
				}
			}
		}
		.absent-action-sheet,
		.sort-action-sheet {
			@include position-absolute;
			.same-item-container {
				.same-item {
					@include flex-between;
					padding: 12px $padding;
					border-bottom: 1px solid $bgcolor;
					.icon {
						display: none;
					}
					&.same-item.active {
						color: #1E88F5;
						.icon {
							display: block;
						}
					}
					&.same-item.title {
						color: $color-9;
						font-size: 15px;
						justify-content: center;
						height: 50px;
					}
                    .item-name{
                        max-width: 90%;
                        word-break: break-all;
                    }
				}
			}
		}
		.dynamic-action-sheet {
			@include position-absolute;
			.dynamic-container {
				font-size: 16px;
				@include flex-between(column);
				.title {
					height: 44px;
					@include flex-center;
				}
				input {
					border: 1px solid #cecece;
					padding: 5px;
					margin: 0;
					height: 35px;
					width: 80px;
					border-radius: 3px;
					margin-bottom: 20px;
				}
				.btns {
					height: 50px;
					@include flex-between;
					width: 100%;
					background-color: #fff;
					border-top: 1px solid #ccc;
					>div {
						flex: 1;
						height: 100%;
						@include flex-center;
						&:last-child {
							border-left: 1px solid #ccc;
							color: #104392;
						}
					}
				}
			}
		}
        .count-of-absence{
            @include position-absolute;
        }
	}
</style>

<style>
	.course-atds-main .submitinfo-action-sheet .actionsheet-wrap .as-box.middle.center {
		border-radius: 4px;
	}
	.course-atds-main .course-atds-students .students-list .student-item .name-toggle-box .high-light0001 {
		color: #2196f3;
	}
</style>

<template>
	<div class="course-atds-main">
		<scroller-base :data="data" ref="scroller" class="course-atds-students" :options="{probeType:3}">
			<!--上课时间-->
			<div class="course-time" v-show="data.unitCode!=3" @click="showChangeTime">
				<div>
					上课时间：
					<span class="course-time-detail">
						{{data.startTime | formatDatetime('hh:mm')}}~{{data.endTime | formatDatetime('hh:mm')}},
						时长{{data.courseDetail.duration}}
					</span>
				</div>
				<svg class="icon" aria-hidden="true" v-show="courseInfo.finished === 0  && CFG.courseTimeEdit">
					<use xlink:href="#icon-youjiantou"></use>
				</svg>
			</div>

			<!--上课内容-->
			<div class="course-content" v-show="data.unitCode!=3" @click="showCourseContent">
				<div class="course-content-detail-container">
					上课内容：
					<span class="course-content-detail">
						{{jinduTitle + "   "}}{{data.content}}
					</span>
				</div>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-youjiantou"></use>
				</svg>
			</div>

			<!-- 上课照片 -->
			<div class="student-photo" @click="showStudentPhoto">
				<div>
					上课照片：
					<span class="student-photo-detail" v-show="studentPhotoRes.length>0">
						已上传{{studentPhotoRes.length}}张照片
					</span>
				</div>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-youjiantou"></use>
				</svg>
			</div>	

			<!--搜索和排序和操作-->
			<div class="operation-container">
				<div class="search-container">
					<input class="search-box" placeholder="输入学生姓名" v-model="keyWord" />
					<svg class="icon icon-search" aria-hidden="true">
						<use xlink:href="#icon-sousuo1"></use>
					</svg>
					<div class="search-btn" @click="searchList">搜索</div>
				</div>
				<div class="sort-btn" @click="openSort">
					<svg class="icon icon-search" aria-hidden="true">
						<use :xlink:href="descStatus?'#icon-hou':'#icon-qian'"></use>
					</svg>
					<span>排序</span>
				</div>
				<div class="operate-btn" @click="showAddStudents" v-if="CFG.courseStudentEdit && data.unitCode!=3">
					<span>添加学员</span>
				</div>
			</div>
			
			<!--点名界面-->
			<student-list 
				v-if="data.unit !== null" 
				:list="data.studentList" 
				:data="courseInfo" 
				:CFG="CFG" 
				class="student-list-container" 
				@openCountOfAbsence="openCountOfAbsence"
				@openAbsent="openAbsent"
				@openDynamic="openDynamic"
				@amountChange="amountChange" 
				@refreshScroller="refreshScroller" 
				ref="listComponent">
			</student-list>
		</scroller-base>
		
		<!--统计人数,点名上课-->
		<div class="count-and-submit">
			<div class="count-desc">
				<div>共
					<span class="high-light">{{amountCount.studentCount}}</span>人
				</div>
				<div>出勤:{{amountCount.attendCount}}</div>
				<div>计费:{{amountCount.costCount}}</div>
				<div v-if="data.unitCode !=3">试听:{{amountCount.tryCount}}</div>
			</div>
			<div class="btn cancel" @click="cancelCourse" v-if="CFG.courseCancel">取消上课</div>
			<div class="btn cancel" @click="revokeCourse" v-if="CFG.courseRevoke">撤销上课</div>
			<div class="btn" v-if="CFG.courseSubmit" @click="submitCourse">点名上课</div>
		</div>

		<!--缺勤原因 absent-mixin-->
		<action-sheet 
			:data="data.absentCauseList" 
			v-show="openedAbsent" 
			class="absent-action-sheet" 
			@close="closeAbsent" 
			ref="absentComponent">
			<div class="same-item-container">
				<div 
					class="same-item" 
					v-for="(item,index) in data.absentCauseList" 
					:key="index"
					:class="{active:item.id == absentStuSelect.absentCauseID}" 
					@click="selectAbsentCause(item)">
					<span class="item-name">{{item.name}}</span>
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-gouxuan"></use>
					</svg>
				</div>
			</div>
		</action-sheet>

		<!--排序方式 sort-mixin-->
		<sort-sheet 
			:list="sortConfig" 
			:opened.sync="openedSort"
			@clickSort="selectSortType" 
			:title="'学生列表排序选择'"
			:initType="'0-0'">
		</sort-sheet>


		<!-- <action-sheet 
			v-show="openedSort" 
			class="sort-action-sheet" 
			@close="closeSort" 
			ref="sortAction">
			<div class="same-item-container">
				<div class="same-item title">
					<span>学生列表排序选择</span>
				</div>
				<div 
					class="same-item" 
					v-for="(item,index) in sortConfig" 
					:class="{active:item.type == sortType}" 
					@click="selectSortType(item)">
					<div>
						<svg class="icon" aria-hidden="true" style="display:inline-block">
							<use :xlink:href="item.icon"></use>
						</svg>
						<span>{{item.name}}</span>
					</div>
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-gouxuan"></use>
					</svg>
				</div>
			</div>
		</action-sheet> -->

		<!--添加学员-->
		<add-students @addSucc="addSucc" ref="addstu">
		</add-students>

		<!--填写动态课消的数量(dynamic-dialog-mixin)-->
		<action-sheet 
			v-show="openedDynamic" 
			class="dynamic-action-sheet" 
			:position="'center'" 
			@close="closeDynamic">
			<div class="dynamic-container">
				<div class="title">
					修改计费次数({{dynamicCostUnitShow}})
				</div>
				<input type="text" v-bind:value="dynamicModel" @input="inputDaynamicUpdate" />
				<div class="btns">
					<div class="btn-cancel" @click="closeDynamic">取消</div>
					<div class="btn-confirm" @click="submitDynamic">确定</div>
				</div>
			</div>
		</action-sheet>
		
		<!--取消上课和入班的提交弹窗-->
		<submit-info ref="submitInfo"></submit-info>

		<!--修改上课时间-->
		<datetime-pro 
			class="as-state" 
			:opened.sync="openPicktime" 
			:timeObj="timeObj" 
			@datetimePro="changeDateTime">
		</datetime-pro>

        <!--缺勤次数统计 删除缺勤次数-->
        <count-of-absence
                class="count-of-absence"
                :opened.sync="openedCause"
                :causeParams="causeParams">

        </count-of-absence>

		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
    import {postCourse, postCheckConflict, updateCourseTime} from "teacher/api/course-attendance";
    import {processPost} from 'teacher/api/common';
	import studentList from './child/list.vue';
	import CountOfAbsence from './child/count-of-absence.vue';

	import emptyPage from 'teacher/components/common/empty-page/empty-page.vue';
	import DatetimePro from 'teacher/components/common/datetime-pro/datetime-pro.vue';
	import DynamicMixin from './child/dynamic-dialog-mixin.js';
	import AbsentMixin from './child/absent-mixin.js';
	import addStudents from './child/add-students.vue';
	import submitInfo from './child/submit-info.vue';
	import SortMixin from "./child/sort-mixin.js";
	import CountOfAbsenceMixin from "./child/count-of-absence-mixin.js";

	var Filters = Vue.options.filters

	const Pname = 'courseAttendance_detail';

	export default {
		name: "course-attendance-students",
		mixins: [AbsentMixin, SortMixin, DynamicMixin,CountOfAbsenceMixin],
		data() {
			return {
				wxTitle: "学生列表",
				isLoading: true,
				data: {
					unit: null,
					unitCode: 1,
					startTime: '',
					endTime: '',
					content: '',
					studentList: [],
					absentCauseList: [],
					courseDetail: {
						duration: '',
						finished: 0,
                    },
				},
				studentPhotoRes:[],//展示的所有照片
				studentPhotoDel:[],//删除的照片
				openPicktime: false, //修改上课时间
				jinduTitle: '', //进度,需要显示在上课内容前面,
				courseInfo: {}, //列表子组件需要的一些必要信息
				headerDOM: null, //滚动时表头需要固定在最上部,用来存储list组件的头部.
				CFG: {
					courseCancel: true,
					courseRevoke: false,
					courseStudentEdit: true,
					courseSubmit: true,
					courseTimeEdit:true
				}, //相关配置.
				scheduleSave: {},
				costConsumeAmount: '', //一次性课消计数
				dynamicCostUnitShow: '', //用于显示课消计数的 数量+单位
				amountCount: { //人数统计,出勤,计费,试听等.
					studentCount: 0,
					attendCount: 0,
					costCount: 0,
					tryCount: 0,
				},
			};
		},
		computed: {
			timeObj() {
				return {
					stimepro: Filters.formatDatetime(this.data.startTime, 'hh:mm'),
					dtimepro: this.data.courseDetail.duration,
				}
			}
		},
		methods: {
			//获取信息.
			getAjaxData(id) {
				this.isLoading = true;
				let param = {
					pname: Pname,
					id
				}
				processPost(param).then(res => {
					this.isLoading = false;
					res.data.absentCauseList.splice(0, 0, {
						id: "00000000-0000-0000-0000-000000000000",
						name: '无',
					})
					this.data = res.data;
					this.initData();
					this.refreshScroller();
					if(!this.headerDOM) {
						this.$nextTick(() => this.headerDOM = this.$refs.listComponent.$refs.header);
					}

					this.studentPhotoRes = res.data.courseDetail.ListImgFile;
				})
			},
			//getAjaxData后初始化一些数据
			initData() {
				//1.计算课消数量
				let detail = this.data.courseDetail,
					duraArr = detail.duration.split(":");
				this.costConsumeAmount = detail.consumeAmount * 1;
				this.dynamicCostUnitShow = '';
				if(this.data.unitCode == 2) { //按次计费
					if(detail.MinutesToTimes == 1) { //按次按时长扣费
						this.costConsumeAmount = ((duraArr[0] * 60 + duraArr[1] * 1) / (detail.StandardMinutes * 1)).toFixed(5) * 1;
						this.dynamicCostUnitShow = this.costConsumeAmount + this.data.unit;
					} else {
						this.dynamicCostUnitShow = detail.consumeAmount * 1 + this.data.unit;
					}
				} else if(this.data.unitCode == 1) { //按小时计费
					this.costConsumeAmount = duraArr[0] * 60 + duraArr[1] * 1;
					this.dynamicCostUnitShow = this.costConsumeAmount + '分钟';
				}

				//2.初始化上课进度,必须有设置上课进度
				if(this.data.shiftScheduleList.length > 0) {
					let scheduleList = this.data.shiftScheduleList,
						data = this.data;

					if(data.shiftAmount == '') { //未上课点名
						if(app.sysInfo.EnableAddCourse_ShiftSchedule == 0) { //没有自动设置课程进度,进行常规处理.否则由后台自动处理完成
							//常规处理流程:如果在此之前的排课有设置了上课进度(classShiftAmount),那么本次的上课进度自动设置为classShiftAmount+1的进度						
							if(data.classShiftAmount != '') {
								data.shiftAmount = data.classShiftAmount;
								let zIndex = 0;
								scheduleList.forEach((item, index) => {
									item.ShiftAmount == data.shiftAmount && (zIndex = index);
								})
								zIndex < scheduleList.length - 1 && zIndex++;
								data.shiftAmount = scheduleList[zIndex].ShiftAmount;
								data.content = scheduleList[zIndex].Content;
								this.jinduTitle = scheduleList[zIndex].Title;
							}
						}
					} else if(data.shiftAmount == '0') { //shiftAmount 为空是未上课点名,点名后未选进度是0
						this.jinduTitle = '';
					} else {
						scheduleList.forEach((item, index) => {
							item.ShiftAmount == data.shiftAmount && (this.jinduTitle = item.Title);
						})
					}
				}
				//3.初始化基本信息
				this.courseInfo = {
					unit: this.data.unit,
					unitCode: this.data.unitCode,
					isDynamicConsume: this.data.courseDetail.IsDynamicConsume,
					duration: this.data.courseDetail.duration,
					MinutesToTimes: this.data.courseDetail.MinutesToTimes,
					consumeAmount: this.data.courseDetail.consumeAmount,
					StandardMinutes: this.data.courseDetail.StandardMinutes,
					id: this.data.courseDetail.id,
					finished: this.data.courseDetail.finished,
					costConsumeAmount: this.costConsumeAmount,
					dynamicCostUnitShow: this.dynamicCostUnitShow
				};
				//4.初始化相关配置项和权限(整理组合)
				this.CFG = {
					lessEnableAttend: app.sysInfo.EnableCourseConfirmWhenLess != 2 || this.data.isRelation == 1, //欠费时能否点击出勤
					lessEnableCost: app.sysInfo.EnableCourseConfirmWhenLess == 1 || this.data.isRelation == 1, //欠费时能否点击计费
					enableMachineAttend: app.sysInfo.EnableMachineAttendance == 1, //是否开启考勤打卡(开启的话,要额外的从后台获取打卡信息,根据打卡信息来进行出勤处理),和自动出勤计费互斥
					enableShowTel: app.sysInfo.ShowTelWhenCourseConfirm == 1, //是否显示手机号
					enableFeeOut: app.sysInfo.EnableFeeOutDate == 1, //是否开启过期
					checkStuAttendConflict: app.sysInfo.CheckStudentAttendanceConflict == 1, //是否开启检查上课冲突,这个配置项在提交上课点名后,让用户做一次确认
                    enableAutoCharge: this.data.IsOneToOne == 0 && app.sysInfo.ClassAutoCharge != 0, //是否自动出勤计费
                    enableAutoCharge3: this.data.IsOneToOne == 0 && app.sysInfo.ClassAutoCharge == 3, //动态集体班不可以修改计费。
					courseStudentEdit: app.tool.op('CourseStudentEdit'), //是否有添加和移除学员的权限
					enableAddSchedule: app.sysInfo.EnableAddCourse_ShiftSchedule == 0, //在排课时,是否根据课程上设置的上课进度自动生成每一节课的上课进度
					//是否有取消上课的权限
					courseCancel: app.tool.op('CourseCancel') && (app.sysInfo.EnableTeacherCancelCourse == 1) && (this.data.courseDetail.finished == 0),
					//是否有撤销上课的权限.
					courseRevoke: app.tool.op('CourseBeginCancel') && this.data.courseDetail.finished == 1,
					courseSubmit: app.tool.op("CourseBegin") || app.tool.op("CourseBeginLimit"),
					courseTimeEdit: app.tool.op("CourseBeginTimeEdit"),
					enableAttendCostRelation: app.sysInfo.EnableAttendCostRelation == 1,
				}

				//5.是否显示试听(排序数组)
				this.data.unitCode == 3 && this.sortConfig.splice(5, 2);

				//6.进度
				this.scheduleSave = {
					ShiftAmount:this.data.shiftAmount,
					ID:this.data.shiftScheduleList[this.data.shiftAmount - 1] && this.data.shiftScheduleList[this.data.shiftAmount - 1].ID
				}
			},
			refreshScroller() {
				this.$nextTick(() => {
					this.$refs.scroller.refresh();
				})
			},
			//打开上课内容弹窗
			showCourseContent() {
				app.contentSchedule({
					content: this.data.content,
					schedule: this.data.shiftScheduleList,
					shiftAmount: this.data.shiftAmount, //本节课的上课进度
				}).then(res => {
					this.data.content = res.content;
					this.scheduleSave = res.schedule;
					this.data.shiftAmount = res.schedule.ShiftAmount;
					this.jinduTitle = res.schedule.ID =="00000000-0000-0000-0000-000000000000" ? '' : res.schedule.Title;
				});
			},
			//打开上课照片弹窗
			showStudentPhoto(){
				app.photoSelect(this.studentPhotoRes).then(res=>{
					this.studentPhotoRes = [].concat(res.imgs);
					this.studentPhotoDel = res.delimgs;
				})
			},
			//取消上课
			cancelCourse() {
				this.$refs.submitInfo.openSubmitInfo(1, {
					name: this.data.courseDetail.name
				}).then(result => {
					if(result.type == "confirm") {
						let params = {
							id: this.courseInfo.id,
							opt: 2,
							memo: result.text
						}
						postCourse(params).then(res => {
							if(res.errcode == 200) {
								app.toast("success", "取消上课成功。");
								this.$router.back();
								app.eventDefine.emit('refresh_course_attendance_list');
							} else {
								app.toast('error', res.errmsg || '撤销上课失败。');
							}
						})
					}
				});
			},
			//撤销上课
			revokeCourse() {
				let params = {
					id: this.courseInfo.id,
					opt: -1,
					memo: '',
					LastClasstime: getLastTime(this.data.startTime, this.data.endTime),
				}
				this.isLoading = true;
				postCourse(params).then(res => {
					this.isLoading = false;
					if(res.errcode == 200) {
						app.toast('success', '撤销上课成功。');
						this.$router.back();
						app.eventDefine.emit('refresh_course_attendance_list');
					} else {
						app.toast('error', res.errmsg || '撤销上课失败。');
					}
				})
			},
			//点名上课
			submitCourse() {
				//1.验证
				let result = this.$refs.listComponent.checkFlag(); //result.checkIDs(要检查冲突的id数组) result.data(要提交的数据) 
				if(!result) {
					return;
				}
				//2.如果需要检查冲突,先检查冲突再提交
				let pro = new Promise((resolve, reject) => {
					if(!this.CFG.enableMachineAttend) {
						resolve(); //直接进行下一步
					} else {
						let params = {
							CourseID: this.courseInfo.id,
							StudentIDs: result.checkIDs,
						}
						this.isLoading = true;
						//查询上课冲突
						postCheckConflict(params).then(res => {
							this.isLoading = false;
							if(res.ErrorCode == 200) {
								if(!res.Data.AnyConfict) {
									resolve();
								} else {
									let names = res.Data.ConflictResult.map(item => item.StudentName).join('<br/>');
									if(this.CFG.checkStuAttendConflict) {
										app.confirm({html:'检测到以下学员上课时间有冲突，是否继续点名？<br/>' + names}).then(flag => {	
											if(flag) resolve();
										});
									} else {
										app.alert({html:'检测到以下学员上课时间有冲突，不能点名。<br/>' + names});
									}
								}
							} else {
								app.toast('error', res.ErrorMsg);
							}
						})
					}
				});

				pro.then(res => {
					this.isLoading = true;

					let params = {
						id: this.courseInfo.id,
						students: result.data,
						opt: 1,
						memo: this.data.describe,
						shiftAmount: this.scheduleSave.ShiftAmount, //本次所选的上课进度
						ShiftScheduleID: this.scheduleSave.ID,
						Content: this.data.content,
						LastClasstime: getLastTime(this.data.startTime, this.data.endTime),
						UpdateTime: this.data.updateTime,
						media_ids:'',//新增照片服务id
						fileIdList:'',//删除的照片id
					}

					

					//上课照片参数(media_ids,fileIdList)赋值
					let deleteArr = [],
						addPro = [];
					// 删除的照片
					this.studentPhotoDel.length&&this.studentPhotoDel.forEach((id)=>{
						id && deleteArr.push(id);

					});
					// 新增的照片promise
					this.studentPhotoRes.length&&this.studentPhotoRes.forEach((item)=>{
						item.promise && addPro.push(item.promise);
					})
					params.fileIdList = deleteArr.join(',');//参数赋值

					if(addPro.length>0){
						// 有新增照片时，拿到id之后再与后台交互
						Promise.all(addPro).then(res=>{
					
							let ids = [];//保存传给后台的id数组
							if(app.envType==1){
								// 钉钉
								this.studentPhotoRes.forEach(item => {
									if (item.promise) {
										ids.push(item.serverId);
									}
								});
								params.mediaUrl = ids.join(",");
							}else{
								//其他
								res.forEach(item => {
									ids.push(item);
								});
								params.media_ids = ids.join(',');//参数赋值
							}
							
							this.send(params)
						})
					}else{
						this.send(params)
					}
					

				});
			},
			//提交上课点名.
			send(params){
				postCourse(params).then(res => {
					this.isLoading = false;
					if(res.errcode == 200) {
						let exceptionList = res.data.ExceptionList || [];
                        if (this.data.isRelation != 1 || exceptionList.length == 0){
						    app.toast('success', '点名成功。');
						    this.$router.back();
                            app.eventDefine.emit('refresh_course_attendance_list');
                        } else if (exceptionList.length > 0){    //需要弹窗显示跨课消不能点名的
                            let name = exceptionList.map(item=>item.Name).join('&emsp;'),
                                tips = !this.CFG.lessEnableAttend && !this.CFG.lessEnableCost ? '以下学员欠费，不允许出勤计费：':'以下学员欠费，不允许计费：',
                                html = `<div style="color: #333;margin-bottom: 10px;">${tips}</div>
                                        <div style="color:#666;">${name}</div>`;
                            app.alert({
                                title:'点名成功',
                                html
                            }).then(()=>{
                                setTimeout(() => {
                                    this.$router.back();
                                    app.eventDefine.emit('refresh_course_attendance_list');    
                                }, 305);
                                
                            });

                        }
					} else if(res.errcode == 0) {
						app.toast('info', '未修改任何数据。');
					} else {
						app.toast('error', res.errmsg);
					}
				});
			},
			//打开添加学员
			showAddStudents() {
				this.$refs.addstu.show({
					id: this.data.courseDetail.id,
					classId: this.data.courseDetail.classId
				});
			},
			//添加学员成功
			addSucc() {
				app.toast('success', '添加学员成功');
				this.getAjaxData(this.$route.query.id);
			},

			//打开修改时间弹窗
			showChangeTime() {
				if (this.courseInfo.finished === 0  && this.CFG.courseTimeEdit){
					this.openPicktime = true;
				}
			},
			//修改上课时间
			changeDateTime(res) {
				let startTime = this.data.startTime.split('T')[0] + "T" + res.stimepro,
					endTime = this.data.endTime.split('T')[0] + "T" + res.etimepro,
					duration = res.dtimepro,
					tid = this.data.teacherids.map(val=>val.ID).join(",");
				
				let params = {
					sdate:Filters.formatDatetime(startTime,'yyyy-MM-dd hh:mm:ss'),
					edate:Filters.formatDatetime(endTime,'yyyy-MM-dd hh:mm:ss'),
					courseID: this.courseInfo.id,
					teacherids:tid,
					classroomid:this.data.courseDetail.classRoomID
				}
				this.isLoading = true;
				updateCourseTime(params).then(res=>{
					this.isLoading = false;
					if (res.ErrorCode == 200){
						app.toast("success",'修改上课时间时长成功。');
						this.data.endTime = endTime;
						this.data.startTime = startTime;
						this.data.courseDetail.duration = duration;
						this.initData();

						let courseDetail = this.data.courseDetail;
						if (courseDetail.IsDynamicConsume == 0 && courseDetail.finished == 0 && this.data.unitCode == 1){
							//更新一下非动态课消,且是按小时(课时)的计费数据(根据修改后的上课时长来修改)
							this.$refs.listComponent.listClone.forEach(item=>{
								item.isCost != 0 && (item.isCost = this.courseInfo.costConsumeAmount);
							})
						}
					} else if (res.ErrorCode == 421){	//有冲突
						app.alert({
							html:res.ErrorMsg,
							btn:{
								text: '知道了',
								style: {
		                            color: '#1E88F5'
		                        },
		                        action: true
							}
						});
					} else {
						app.toast("error",res.ErrorMsg);
					}
				});
			},

			//即时计算人数统计(出勤,计费等)
			amountChange(listNew) {
				let amountCount = this.amountCount;
				amountCount.studentCount = listNew.length;
				amountCount.attendCount = 0;
				amountCount.costCount = 0;
				amountCount.tryCount = 0;
				listNew.forEach(item => {
					item.isAttend == 1 && amountCount.attendCount++;
					item.isCost > 0 && amountCount.costCount++;
					item.isTry == 1 && amountCount.tryCount++;
				});
			},
			
		},
		mounted() {
			let s = this.$refs.scroller,
				top = null,
				fixed = false;
			s.scroller.on("scroll", () => { //固定头部.
				let header = this.headerDOM;
				top === null && (top = header.offsetTop);
				if(-s.scroller.y >= top) {
					!fixed && (fixed = true);
					header.style.transform = `translate(0px,${(-s.scroller.y - top)}px`;
				} else if(fixed) {
					fixed = false;
					header.style.transform = '';
				}
			});
		},
		created() {
			this.getAjaxData(this.$route.query.id);
            app.ls.setStorage('courseAttendanceStudentsClassid', {
                classId: this.$route.query.classId
            });
		},
        beforeDestroy(){
            app.ls.remove('courseAttendanceStudentsClassid');
        },
		components: {
			emptyPage,
			studentList,
			CountOfAbsence,

			addStudents,
			submitInfo,
			DatetimePro
		},
	}

	function getLastTime(startTime, endTime) {
		let start = new Date(startTime.replace('T', ' ').replace(/-/g,'\/')),
			starttime = startTime.slice(0,10),
			end = new Date(endTime.replace('T', ' ').replace(/-/g,'\/')),
			week = ["[周日]", "[周一]", "[周二]", "[周三]", "[周四]", "[周五]", "[周六]"],
			day = new Date(startTime.replace('T', ' ').replace(/-/g,'\/')).getDay();
		return starttime + Filters.formatDatetime(start, 'hh:mm') + "-" + Filters.formatDatetime(end, 'hh:mm') + week[day];
	}
</script>