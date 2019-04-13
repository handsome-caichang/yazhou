<!--快速排课->设置上课信息-->
<style scoped lang="scss">
    
    

    .newcourse-details-container {
        .details-body {
            @include position-absolute(0, 0, 50px, 0);
            background-color: $color-assist-1;
            .item {
                padding: 0 15px;
                background-color: $color-white;
                height: 44px;
                line-height: 44px;
                color: #666666;
                font-size: 15px;
                @include flex-between;
                @include border-bottom;
                .describe {
                    width: 80px;
                    .star {
                        color: red;
                    }
                }
                .val, .item-con {
                    max-width: calc(100% - 80px);
                    color: $color-3;
                    @include ellipsis-single;
                }
                .item-con {
                    display: flex;
                    justify-content: flex-end;
                    .content {
                        max-width: 100%;
                        @include ellipsis-single;
                        &.blue {
                            color: $color-primary;
                        }
                    }
                }
            }
            .conflict {
                padding: 0 15px;
                background-color: $color-white;
                height: 44px;
                line-height: 44px;
                color: #666666;
                font-size: 15px;
                margin-top: 9px;
                @include flex-between;
            }
            .class-name {
                margin-bottom: 8px;
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
            .submit {
                width: 119px;
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
    }

    .as-state {
        @include position-absolute(0, 0, 0, 0);
        z-index: 9999991;
    }

    .as-time {
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    // 动画
    .as-newcourse-details-enter-active, .as-newcourse-details-leave-active {
        transition: all $duration $timing;
        transform: translate3d(0, 0, 0);
    }

    .as-newcourse-details-enter, .as-newcourse-details-leave-active {
        transition: all $duration $timing;
        transform: translate3d(100%, 0, 0);
    }
</style>

<template>
    <transition name="as-newcourse-details">
        <div class="newcourse-details-container"
             v-show="opened">
            <div class="details-body">
                <div class="item">
                    <div class="describe">
                        上课日期 <span></span>
                    </div>
                    <div class="val">
                        {{today.replace(/-/g,'.')}}
                    </div>
                </div>
                <div class="item class-name">
                    <div class="describe">
                        上课班级
                    </div>
                    <div class="val">
                        {{detailsObj.name}}
                    </div>
                </div>

                <!--全科科目-->
                <!--<div class="item" v-if="detailsObj.enablesubject==1" @click="openSubjectAS">
                    <div class="describe">
                        科目<span class="star">*</span>
                    </div>
                    <div class="item-con">
                        <div class="content blue">
                            {{subjectMsg.name}}
                        </div>
                        <div class="arrow">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                    </div>
                </div>-->
                <!--任课老师-->
                <div class="item" @click="selectTeacher">
                    <div class="describe">
                        任课老师
                        <span class="star">*</span>
                    </div>
                    <div class="item-con">
                        <div class="content" :class="app.sysInfo.currole.id!=4?'blue':''">
                            {{dealTeacherResult}}
                        </div>
                        <div class="arrow" v-show="app.sysInfo.currole.id!=4">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <!--助教-->
                <div class="item" @click="selectAssTeacher">
                    <div class="describe">
                        助教
                    </div>
                    <div class="item-con">
                        <div class="content blue">
                            {{dealTeacherAssResult}}
                        </div>
                        <div class="arrow">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <!--开始时间-->
                <div class="item" @click="openPicktimeAS">
                    <div class="describe">
                        开始时间
                        <span class="star">*</span>
                    </div>
                    <div class="item-con">
                        <div class="content blue">
                            {{nowTime}}
                        </div>
                        <div class="arrow">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                    </div>
                </div>

                <!--上课时长-->
                <div class="item" @click="openPicktimeAS">
                    <div class="describe">
            上课时长
                        <span class="star">*</span>
                    </div>
                    <div class="item-con">
                        <div class="content blue">
                            {{timeLong}}
                        </div>
                        <div class="arrow">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <!--上课教室-->
                <div class="item" @click="openClassroomAS">
                    <div class="describe">
                        上课教室
                        <span class="star">*</span>
                    </div>
                    <div class="item-con">
                        <div class="content blue">
                            {{classroomMsg.name}}
                        </div>
                        <div class="arrow">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <!--检查上课冲突-->
                <!--<div class="conflict" @click="selectCheckConflict" v-show="app.tool.op('IngoreCourseConflict')">
                    <div class="describe">
                        检查上课冲突
                    </div>
                    <div class="val">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="checkConflict==1?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
                        </svg>
                    </div>
                </div>-->

            </div>
            <div class="footer">
                <div class="prev-step" @click="prevStep">上一步</div>
                <div class="submit" @click="submit">保存并点名</div>
            </div>

            <!--全科科目弹框-->
            <newcourse-details-subject
                    @newcourseDetailsSubjectItem="acceptSubject"
                    class="as-state"
                    :subjectList="subjectList"
                    :subjectMsg="subjectMsg"
                    :opened.sync="openSubject">
            </newcourse-details-subject>
            <!--上课教室弹框-->
            <newcourse-details-classrooms
                    @newcourseDetailsClassroomsItem="acceptClassrooms"
                    class="as-state"
                    :classroomList="classroomList"
                    :classroomMsg="classroomMsg"
                    :opened.sync="openClassroom">
            </newcourse-details-classrooms>
            <!--开始时间 上课时长 弹框-->
            <datetime-pro class="as-state"
                          :opened.sync="openPicktime"
                          :timeObj="timeObj"
                          @datetimePro="acceptDatetimePro">
            </datetime-pro>
            <!-- 路由跳转遮罩 -->
            <loading v-show="isLoading" :bgType="1"></loading>
        </div>
    </transition>
</template>

<script>
    
    import {getclassroomlist, addcoursebatchfromwx} from "teacher/api/course-attendance";
    import NewcourseDetailsClassrooms from './child/newcourse-details-classrooms.vue';
    import NewcourseDetailsSubject from './child/newcourse-details-subject.vue';
    import DatetimePro from 'teacher/components/common/datetime-pro/datetime-pro.vue';

    export default {
        name: "newcourse-details",
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
            detailsObj: {
                type: Object
            }
        },
        data() {
            return {
                isLoading: false,
                today: '',
                nowTime: '',//开始时间
                endTime: '',//结束时间
                timeLong:'',//时长
                timeObj: {
                    stimepro: '',
                    dtimepro: ''
                },
                openPicktime: false,//上课时间||时长 选择开关
                teacherResult: [],//field--老师
                teacherAssResult: [],//field--助教
                teacherShow: '',//用于界面展示的‘任课老师’名称
                teacherAssShow: '',//用于界面展示的‘助教’名称
                openSubject: false,//科目弹框开关
                subjectListSpare: [],//科目备选列表(teachers下没有科目时)
                subjectList: [],//科目列表
                subjectMsg: {//field--全科科目名称
                    name: '',
                    id: ''
                },
                openClassroom: false,//教室弹框开关
                classroomList: [],//教室列表
                classroomMsg: {//field--上课教室名称
                    name: '',
                    id: ''
                },
                checkConflict: 1
            }
        },
        computed: {
            //从 teacherAssResult||teacherResult 取得数据展示
            dealTeacherAssResult: function () {
                return this.getTeacherInfo(this.teacherAssResult).names
            },
            dealTeacherResult: function () {
                return this.getTeacherInfo(this.teacherResult).names
            }
        },
        methods: {
            //上一步
            prevStep() {
                this.$emit('backToNewcourse')
            },
            //格式化时间
            formatDate(date, format) {
                let o =
                    {
                        "M+": date.getMonth() + 1, //month
                        "d+": date.getDate(),    //day
                        "h+": date.getHours(),   //hour
                        "m+": date.getMinutes(), //minute
                        "s+": date.getSeconds(), //second
                        "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
                        "S": date.getMilliseconds() //millisecond
                    }
                if (/(y+)/.test(format))
                    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(format))
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                return format;
            },
            //获取默认的老师和助教：
            initTeachers(subjectID) {
                //1.全科科目：根据SubjectID获取
                //2.非全科科目，根据Role 1为老师 2为助教
                this.teacherResult = [];
                this.teacherAssResult = [];
                if (this.detailsObj.classteachers.length > 0) {
                    this.detailsObj.classteachers.forEach(item => {
                        let teaObj = {
                            id: item.id,
                            name: item.name
                        }
                        if (subjectID) {
                            if (item.SubjectID == subjectID) {
                                if (item.Role == 1) { //老师
                                    this.teacherResult.push(teaObj);
                                } else if (item.Role == 2) { //助教
                                    this.teacherAssResult.push(teaObj);
                                }
                            }
                        } else {
                            if (item.role == 1) { //老师
                                this.teacherResult.push(teaObj);
                            } else if (item.role == 2) { //助教
                                this.teacherAssResult.push(teaObj);
                            }
                        }
                    })
                }
            },
            getTeacherInfo(tArr) {
                let nameArr = [],
                    idArr = [];
                tArr.forEach(val => {
                    nameArr.push(val.name);
                    idArr.push(val.id)
                });
                return {
                    ids: idArr.join(),
                    names: nameArr.join()
                }
            },
            // 获取‘上课日期’
            getToday() {
                this.today = this.formatDate(new Date(), 'yyyy-MM-dd');
                this.nowTime = this.formatDate(new Date(), 'hh:mm');
            },

            //获取教室参数
            getClassroom() {
                this.classroomMsg.name = this.classroomMsg.id = '';
                getclassroomlist({
                    campusId: this.detailsObj.campusid
                }).then(res => {
                    this.classroomList = res.data;
                    //初始化教室信息
                    if (this.detailsObj.classroomid != '00000000-0000-0000-0000-000000000000') {
                        this.classroomList.some(item => {
                            if (item.id == this.detailsObj.classroomid) {
                                this.classroomMsg.id = item.id;//回显教室信息的参数
                                this.classroomMsg.name = item.name;//回显教室信息的参数
                            }
                        })
                    }
                })
            },
            //检查上课冲突
//          selectCheckConflict() {
//              if (this.checkConflict == 1) {
//                  this.checkConflict = 0;
//              } else {
//                  this.checkConflict = 1;
//              }
//          },
            //打开'全科科目'开关
//          openSubjectAS() {
//              if (!this.openSubject) {
//                  this.subjectList = this.detailsObj.ShiftSubject;
//                  if ((this.detailsObj.ShiftSubject.IsOneToOne == 1) && (this.detailsObj.ShiftSubject.length == 0)) {
//                      this.subjectList = this.subjectListSpare;
//                  }
//                  if (this.subjectList.length == 0) {
//                      app.toast('info', '请在班级设置中添加科目。');
//                      return
//                  }
//                  this.openSubject = !this.openSubject;
//              }
//          },
            //接收科目信息
//          acceptSubject(item) {
//              this.subjectMsg.id = item.SubjectID || item.ID;//界面显示
//              this.subjectMsg.name = item.SubjectName || item.Value;//界面显示
//              this.initTeachers(item.SubjectID);
//          },
            //打开'教室'开关
            openClassroomAS() {
                if (this.classroomList.length == 0) {
                    app.toast("info", "该校区暂未设置教室。");
                    return
                }
                this.openClassroom = !this.openClassroom;
            },
            //接收教室信息
            acceptClassrooms(item) {
                this.classroomMsg.name = item.name;//界面显示
                this.classroomMsg.id = item.id;//界面显示
            },
            //关于老师的初始化显示
            getTeacherMsg() {
//              if (this.detailsObj.EnableSubject == 1) {//全科科目条件
//                  if (this.detailsObj.ShiftSubject.length > 0) {
//                      this.subjectMsg.id = this.detailsObj.ShiftSubject[0].SubjectID;
//                      this.subjectMsg.name = this.detailsObj.ShiftSubject[0].SubjectName;
//                      this.initTeachers(this.detailsObj.ShiftSubject[0].SubjectID);
//                  }
//              }
//              else {
//                  this.initTeachers()
//              }
				this.initTeachers();
            },
            //选择老师 (1.只能单选；2.角色4不能修改)
            selectTeacher() {
                if (app.sysInfo.currole.id == 4) {
                    return
                }
                let arr = [];//arr传已选择的员工的id数组,用于初始化选择员工列表,如['id1','id2','id3'],也可不传.
                let teacherAss = this.teacherAssResult;
                this.teacherResult.forEach(item => {
                    arr.push(item.id);
                });
                app.empSelect(0, arr, function (data) {
                    let conflictFlag = false;
                    let conflictId = '';//判断冲突的老师id
                    //判断冲突
                    conflictId = data.id;

                    if (conflictId != '') {
                        teacherAss.forEach(ass => {
                            if (conflictId == ass.id) {
                                app.toast('info', ass.name + '已被设置为助教。')
                                conflictFlag = true;
                                return
                            }
                        })
                        if (conflictFlag) {
                            return false
                        } else {
                            return true
                        }
                    } else {
                        return true
                    }

                },true).then(result => {
                    this.teacherResult = [];
                    if (result != '') {
                        this.teacherResult.push({
                            id: result.id,
                            name: result.name
                        })
                    }
                });
            },
            //选择助教
            selectAssTeacher() {
                let arr = [];//arr传已选择的员工的id数组,用于初始化选择员工列表,如['id1','id2','id3'],也可不传.
                let conflictId = this.teacherResult.length > 0 ? this.teacherResult[0].id : '';//判断冲突的老师id
                //回显
                this.teacherAssResult.forEach(item => {
                    arr.push(item.id);
                });
                app.empSelect(1, arr, function (data) {
                    let conflictFlag = false;
                    //判断冲突
                    if (conflictId != '') {
                        data.forEach(tea => {
                            if (conflictId == tea.id) {
                                app.toast('info', tea.name + '已被设置为任课老师。')
                                conflictFlag = true;
                                return
                            }
                        })
                        if (conflictFlag) {
                            return false
                        } else {
                            return true
                        }
                    } else {
                        return true
                    }

                }).then(result => {//result为已选择的员工数组
                    if (result.length == 0) {
                        this.teacherAssResult = [];
                    } else {
                        this.teacherAssResult = [];
                        result.forEach(tea => {
                            this.teacherAssResult.push({
                                id: tea.id,
                                name: tea.name
                            })
                        })
                    }
                });
            },
            //初始化结束时间
            initEndTime() {
            	let plan = this.detailsObj.classplaninfos;
            	if (plan.length>0 && plan[0].starttime && plan[0].endtime){
            		//计算上课时长
            		let start = new Date('1990/01/01 '+plan[0].starttime),
            			end= new Date('1990/01/01 '+plan[0].endtime);
            		this.timeLong = new Date( new Date('1990/01/01 00:00:00').getTime() + end.getTime() - start.getTime());
            		this.timeLong = this.formatDate(this.timeLong ,'hh:mm');
            		this.endTime = new Date(new Date('1990/01/01 '+this.nowTime + ':00').getTime() + end.getTime() - start.getTime());
            		this.endTime = this.formatDate(this.endTime,'hh:mm');
            	} else {
            		this.timeLong = this.endTime = '';
            	}
            },
            //打开 开始时间 上课时长开关
            openPicktimeAS() {
                this.openPicktime = !this.openPicktime;
                if (this.openPicktime) {
                    this.timeObj.stimepro = this.nowTime;
                    this.timeObj.dtimepro = this.timeLong;
                }
            },
            // 监听 开始时间 上课时长 emit出来的参数
            acceptDatetimePro(obj) {
                this.nowTime = obj.stimepro;//开始时间  (展示&&接口参数)
                this.timeLong = obj.dtimepro;//时长  (展示)
                this.endTime = obj.etimepro;//结束时间  （接口参数）
            },
            render() {
                this.getClassroom();//初始化教室信息
                this.getTeacherMsg();//初始化老师信息
                this.initEndTime()//初始化结束时间
            },
            submit() {
                //老师 teacherResult teacherAssResult处理合并成一个 3269
                if (this.detailsObj.EnableSubject == 1) {
                    if (!this.subjectMsg || this.subjectMsg && this.subjectMsg.name == '') {
                        app.toast('info', '科目不能为空。')
                        return
                    }
                }
                if (this.teacherResult.length == 0) {
                    app.toast('info', '任课老师不能为空。');
                    return
                }
                if (this.nowTime == '') {
                    app.toast('info', '开始时间不能为空。');
                    return
                }
                if (this.endTime == '') {
                    app.toast('info', '上课时长不能为空。');
                    return
                }
                if (this.classroomMsg.name == '') {
                    app.toast('info', '上课教室不能为空。');
                    return
                }

                let selTeacher = [];
                    
                this.teacherResult.forEach(tea => {
                    selTeacher.push({
                        TeacherId: tea.id,
                        TeacherName: tea.name,
                        Role: 1
                    })
                });
                this.teacherAssResult.forEach(tea => {
                    selTeacher.push({
                        TeacherId: tea.id,
                        TeacherName: tea.name,
                        Role: 2
                    })
                });
                let dayIndex = [7, 1, 2, 3, 4, 5, 6],
                	weekname = ['','星期一','星期二','星期三','星期四','星期五','星期六','星期天'];
                let submitObj = {
                    StartDate: this.today,//开始时间
                    EndDate: this.today,//结束时间(这里和开始时间一样)
                    Times: 0,//是PC端最多排课次数
                    Plan: [{
                        StartTime: this.nowTime,//开始时间
                        EndTime: this.endTime,//结束时间
                        ClassroomID: this.classroomMsg.id,//教室id
                        ClassroomName: this.classroomMsg.name,//教室名称
                        Weekday: dayIndex[new Date().getDay()],//星期一就传1 ...星期天就传7
                        Weekname: weekname[dayIndex[new Date().getDay()]],
                    }],
                    SubjectID: this.subjectMsg.id != '' ? this.subjectMsg.id : '',//科目ID
                    StudentID: this.detailsObj.classstudentinfo && this.detailsObj.classstudentinfo.studenuserid,
                    PlanID:this.detailsObj.courseid,
                    Teachers: selTeacher,// 任课老师 助教
                    ShiftName: this.detailsObj.shiftname,//课程名称
                    ShiftID: this.detailsObj.shiftid,//课程ID
                    CheckConflict: this.checkConflict,//是否检查排课冲突（1是，0否） 没有权限时默认检查排课冲突(1)
                    IsOneToOne: this.detailsObj.isonetoone,//0集体班课程，1一对一课程，2一对多课程
                    ClassId: this.detailsObj.id,
                    CampusId:this.detailsObj.campusid
                };
                let _that = this;
                //打开遮罩
                _that.isLoading = true;


                function succ(data){
                    app.toast('success', '保存成功。');
                        let info = data.data.courseid && data.data.courseid[0];
                        if (!info){
                        	app.toast('error','未返回正确的排课记录');
                        	_that.isLoading = false;
                        } else{
                            _that.$router.push({
                                    path: 'courseAttendanceStudents',
                                    query: {id: info}
                            });
                            //关闭遮罩
                            setTimeout(() => {
                                _that.isLoading = false;
                            }, 301);
                        }
                        //触发点名页面刷新
                        app.eventDefine.emit('refresh_course_attendance_list');
                }

                addcoursebatchfromwx(submitObj).then(function (data) {
                    if (data.result.code == app.errok) {
                        succ(data);
                    } else if (data.result.code == 240) {
                        debugger;
                        let info = data.data,
                            html =   
                        `检测到冲突:<br>
                        时间：${getToastTime(info.starttime,info.endtime)}<br>
                        老师：${info.teachername}${info.type==3?'[冲突]':''}<br>
                        班级：${info.classname}${info.type==1?'[冲突]':''}<br>
                        教室：${info.classroomname}${info.type==2?'[冲突]':''}<br>`;
                        app.confirm({
                            html,
                            btns:[{
                                    text:'仍保存',
                                    action:true,
                                },{
                                    text:'取消',
                                    style:{color:'#1E88F5'},
                                    action:false,
                            }]
                        }).then(sel=>{
                            if (!sel){
                                 _that.isLoading = false;
                                return;
                            }
                            _that.isLoading = true;
                            submitObj.CheckConflict = 0;
                            addcoursebatchfromwx(submitObj).then(data=>{
                                if (data.result.code == app.errok) {
                                    succ(data);
                                }else {
                                    app.toast('error', data.result.msg);
                                    //关闭遮罩
                                    _that.isLoading = false;
                                    }
                            });
                        });
                    } else {
                        app.toast('error', data.result.msg);
                        //关闭遮罩
                        _that.isLoading = false;
                    }
                });
            }
        },
        created() {
            this.getToday();//获取今天的时间( 开始时间默认为用户点击“快速排课点名”的时间；)
        },
        components: {
            NewcourseDetailsClassrooms,
            NewcourseDetailsSubject,
            DatetimePro
        },
        watch: {
            opened: function (newVal, oldVal) {
                if (newVal) {
                    this.render();
                    app.tool.setDocTitle('请设置上课信息')
                } else {
                    app.tool.setDocTitle('选择点名的班级')
                }
            }
        }
    }

    function getToastTime(startTime, endTime) {
		let start = new Date(startTime.replace('T', ' ').replace(/-/g,'\/')),
			starttime = startTime.slice(0,10),
			end = new Date(endTime.replace('T', ' ').replace(/-/g,'\/')),
			week = ["(周日)", "(周一)","(周二)", "(周三)", "(周四)", "(周五)", "(周六)"],
			day = new Date(startTime.replace('T', ' ').replace(/-/g,'\/')).getDay();
		return starttime + week[day] + ' ' + app.filters.formatDatetime(start, 'hh:mm') + "~" + app.filters.formatDatetime(end, 'hh:mm') ;
	}
</script>

