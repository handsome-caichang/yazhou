<!--上课点名班级列表-->
<style scoped lang="scss">
	
	
	$bgcolor : #EEF1F6;
	$padding : 15px;
	.course-atds-list {
		height: 100%;
		background: $bgcolor;
		.date-choose-header {
			height: 44px;
			background: $color-white;
			@include flex-between;
			padding: 0 $padding;
			.date-show-title {
				@include fs-lh(15);
				color: $color-3;
				.icon {
					font-size: 12px;
					transform: scale(0.8);
				}
			}
		}
		.class-list-container {
			@include position-absolute(50px);
			bottom: 50px;
			.class-item {
				@include flex-between;
				padding: 10px $padding;
				height: 90px;
				margin-bottom: 1px;
				background: $color-white;
				.item-left{
                    height: 70px;
                    @include ellipsis-single;
                    @include flex-between(column);
                    >div {
                        width: 100%;
                    }
                    .class-item-title {
                        @include fs-lh(16px);
                        color: $color-3;
                        @include ellipsis-single;
                    }
                    .class-item-teacher {
                        .icon{
                            margin-right: 5px;
                        }
                        @include fs-lh(12px);
                        color: $color-6;
                        @include ellipsis-single;
                    }
                    .class-item-room {
                        @include fs-lh(12px);
                        color: $color-6;
                        display: flex;
                        .class-room{
                            @include ellipsis-single;
                            max-width: 40%;
                            margin-right: 12px;
                        }
                        .class-date{
                            margin-right: 12px;
                        }
                        .icon.jiaoshi1{
                            margin-right: 5px;
                        }
                        .icon.flag{
                            width: 28px;
                            height: 17px;
                            vertical-align: bottom;
                        }
                    }
                }
				.item-right{
                    font-size: 16px;
                    width: 60px;
                    text-align: right;
                }

			}

            .noData-temp{
                @include position-absolute;
            }
		}
		.quick-sort-course {
			height: 50px;
			background: #1E88F5;
			color: $color-white;
			@include flex-center;
			font-size: 16px;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
		}
	}
</style>

<template>
	<div class="course-atds-list">
		<!--选择日期-->
		<div class="date-choose-header" v-if="CFG.dateChange">
			<svg class="icon" aria-hidden="true" @click="changeDate(-1)">
				<use xlink:href="#icon-zuobianjiantou"></use>
			</svg>
			<div class="date-show-title" @click="changeDatePop">
				<span>
				{{dateInfo.date | formatDatetime('M月d日')}}({{dateInfo.weekday}})
				</span>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-sanjiaoxing"></use>
				</svg>
			</div>
			<svg class="icon" aria-hidden="true" @click="changeDate(1)">
				<use xlink:href="#icon-youjiantou"></use>
			</svg>
		</div>
		<div class="date-choose-header" style="justify-content:center" v-else>
			<div class="date-show-title">
				<span>
					{{dateInfo.date | formatDatetime('M月d日')}}({{dateInfo.weekday}})
				</span>
			</div>
		</div>

		<!--班级列表-->
		<scroller-base class="class-list-container" :data="list">
			<router-link class="class-item" v-for="(item,index) in list" tag="div" :key="item.id" :to="{name:'courseAttendanceStudents', query:{id: item.id,classId:item.classId}}">
				<!--
				<div class="class-item-title">
					<span>{{item.name}} {{item.subjectName ? '(' + item.subjectName + ')': ''}}</span>
					<span>{{item.attendanceCount}}/{{item.studentCount}}</span>
				</div>
				<div class="class-item-teacher">
					<span>上课老师：{{item.teacherNames}}</span>
				</div>
				<div class="class-item-room">
					<div>
						<div>上课教室：{{item.classroom}}</div>
						<svg class="icon" aria-hidden="true">
							<use :xlink:href="item.finished == 0 ? '#icon-weishangke':'#icon-yishangke'"></use>
						</svg>
					</div>
					<div v-if="item.duration != '-'">上课时间： {{item.startTime | formatDatetime('hh:mm')}}~ {{item.endTime | formatDatetime('hh:mm')}}
					</div>
				</div>
				-->

                <div class="item-left">
                    <div class="class-item-title">
                        {{item.name}} {{item.subjectName ? '(' + item.subjectName + ')': ''}}
                    </div>
                    <div class="class-item-teacher">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-laoshi"></use>
                        </svg>{{item.teacherNames}}
                    </div>
                    <div class="class-item-room">
                        <!--上课教室图标-->
                        <div>
                            <svg class="icon jiaoshi1" aria-hidden="true">
                                <use xlink:href="#icon-jiaoshi1"></use>
                            </svg>
                        </div>
                        <!--上课教室-->
                        <div class="class-room">{{item.classroom}}</div>
                        <!--上课时间-->
                        <div class="class-date" v-if="item.duration != '-'">
                            {{item.startTime | formatDatetime('hh:mm')}}~ {{item.endTime | formatDatetime('hh:mm')}}
                        </div>
                        <!--已上课||未上课标识-->
                        <div>
                            <svg class="icon flag" aria-hidden="true">
                                <use :xlink:href="item.finished == 0 ? '#icon-weishangke':'#icon-yishangke'"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="item-right">
                    <span>{{item.attendanceCount}}/{{item.studentCount}}</span>
                </div>
			</router-link>
			<empty-page class="noData-temp" :type="1" text="还没有课可以点名" v-show="list.length==0"></empty-page>
		</scroller-base>

		 <router-link to="/courseAttendanceNewCourse" tag="div" class="quick-sort-course" v-if="showSortCourse">快速排课</router-link>
		<loading class="loading" v-show="isLoading" :bgType='bgType'></loading>
	</div>
</template>

<script>
	import { processPost } from "teacher/api/common";
	import emptyPage from "teacher/components/common/empty-page/empty-page.vue";

	const Pname = 'courseAttendance';

	export default {
		name: "course-attendance-list",
		components: {
			emptyPage
		},
		data() {
			return {
				wxTitle: "上课点名",
				isLoading: true,
				list: [],
				bgType: 0,
				dateInfo: null,
				showSortCourse: app.tool.op("CoursePlanForOne") || app.tool.op("CoursePlanForGroup"),
				CFG: {
					dateChange: app.sysInfo.CourseConfirmDateChange == "1" || app.sysInfo.CourseConfirmDateChange =='2' //是否可以更改日期
				}
			};
		},
		methods: {
			changeDate(num) {
				this.dateInfo = getDateByDay(this.dateInfo.date, num);
				this.getAjaxData();
			},
			changeDatePop() {
				app.calendar().then(res => {
					this.dateInfo = getDateByDay(res, 0);
					this.getAjaxData();
				})
			},
			getAjaxData() {
				this.isLoading = true;
				let param = {
					pname: Pname,
					date: this.dateInfo.date
				}
				return processPost(param).then(res => {
					this.isLoading = false;
					this.list = res.data;
				})
			},

		},
		mounted() {
			app.eventDefine.on('refresh_course_attendance_list', () => {
				this.bgType = 1;
				this.getAjaxData().then(() => {
					this.bgType = 0;
				});
			});
		},
		created() {
			let today = new Date();
			this.dateInfo = getDateByDay(today, 0);
			this.getAjaxData();
        },
        beforeDestroy() {
            app.eventDefine.off('refresh_course_attendance_list');
        },

	}

	const Week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

	function getDateByDay(date, num) {
		if(!(date instanceof Date)) {
			date = new Date(date);
		}
		date.setDate(date.getDate() + num);
		return {
			date: date.getFullYear() + '-' + fixed(date.getMonth() + 1) + '-' + fixed(date.getDate()),
			weekday: Week[date.getDay()]
		}
	}

	function fixed(s){
		s = '' + s;
		return  s.length == 1 ? '0' + s : s;
	}
</script>