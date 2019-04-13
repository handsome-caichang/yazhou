<style scoped lang="scss">
    
    

    .bukeManage-newClass-container {
        background-color: $color-assist-1;
        .scroller {
            @include position-absolute(0, 0, 44px, 0);
            .class-name {
                background-color: $color-white;
                text-align: center;
                font-size: 13px;
                color: $color-9;
                padding: 20px;
                .name {
                    margin-top: 10px;
                    font-size: 16px;
                    color: $color-3;
                }
            }
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
            .students {
                padding: 15px;
                background-color: $color-white;
                .describe {
                    color: $color-9;
                }
                .name {
                    margin-top: 10px;
                    word-break: break-word;
                }
            }
        }
        .footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 44px;
            line-height: 44px;
            font-size: 16px;
            @include shadow-base;
            @include flex-center;
            text-align: center;
            .item-cancel {
                flex: 1;
                background-color: $color-white;
                color: $color-3;
            }
            .item-sure {
                flex: 1;
                color: $color-white;
                background-color: $color-primary;
            }
        }
    }

    .void {
        width: 100%;
        height: 10px;
        background-color: $color-assist-1;
    }

    .as-state {
        @include position-absolute;
    }
</style>

<template>
    <div class="bukeManage-newClass-container">
        <scroller-base
                class="scroller"
                :data="renderData">
            <div class="class-name">
                <div class="key">课程名称：</div>
                <div class="name">{{bukeManage.shiftName}}</div>
            </div>
            <div class="void"></div>

            <!--任课老师-->
            <div class="item" @click="selectTeacher">
                <div class="describe">
                    任课老师
                    <span class="star">*</span>
                </div>
                <div class="item-con">
                    <div class="content" :class="{blue:MissStudentCourseTeacher}">
                        {{dealTeacherResult}}
                    </div>
                    <div class="arrow" v-if="MissStudentCourseTeacher">
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
            <!--上课日期-->
            <div class="item" @click="selectCourseDate">
                <div class="describe">
                    上课日期
                    <span class="star">*</span>
                </div>
                <div class="item-con">
                    <div class="content blue">
                        {{courseDate.replace(/-/g,'.')}}
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
                        {{durTime}}
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
                        {{selectedClassroomMsg.Name}}
                    </div>
                    <div class="arrow">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <!--检查上课冲突-->
            <div class="conflict" @click="selectCheckConflict" v-show="app.tool.op('IngoreCourseConflict')">
                <div class="describe">
                    检查上课冲突
                </div>
                <div class="val">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="newClassBuke.data.CheckConflict==1?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
                    </svg>
                </div>
            </div>
            <div class="void"></div>

            <!--上课学员-->
            <div class="students">
                <div class="describe">上课学员</div>
                <div class="name">{{bukeManage.studentsNames}}</div>
            </div>
        </scroller-base>
        <div class="footer">
            <div class="item-sure" @click="submit">确认</div>
        </div>
        <!--开始时间 上课时长 弹框-->
        <datetime-pro class="as-state"
                      :opened.sync="openPicktime"
                      :timeObj="timeObj"
                      @datetimePro="acceptDatetimePro">
        </datetime-pro>
        <!--教室-->
        <buke-classroom
                @bukeClassroom="acceptClassroom"
                class="as-state"
                :classroomList="bukeManageClassroom"
                :classroomMsg="selectedClassroomMsg"
                :opened.sync="openClassroom">
        </buke-classroom>
        <!--冲突-->
        <conflict-filter
                class="as-state"
                :conflictObj="conflictObj"
                :opened.sync="openConflictFilter">
        </conflict-filter>
    </div>
</template>

<script>

    import BukeClassroom from './child/buke-classroom';
    import ConflictFilter from './child/conflict-filter';
    import DatetimePro from 'teacher/components/common/datetime-pro/datetime-pro.vue';
    import {savePost} from "teacher/api/common";

    export default {
        name: "bukeManage-newClass",
        data() {
            return {
                wxTitle: '新开班补课',
                bukeManage: {//所需要的上一个步骤的参数
                },
                bukeManageClassroom: [],//所需要的上一个步骤的参数 教室
                teacherResult: [],//field--老师
                teacherAssResult: [],//field--助教
                selectedClassroomMsg: {//选择的教室 确定的时候再赋值给参数
                },
                courseDate:'',//上课日期
                today: '',
                nowTime: '',//开始时间 展示
                durTime: '',//上课时长 默认2小时  展示
                endTime: '',//结束时间
                timeObj: {//开始时间 上课时长组件props
                    stimepro: '',
                    dtimepro: ''
                },
                MissStudentCourseTeacher: app.tool.op('MissStudentCourseTeacher'),
                openClassroom: false,//打开教室
                openPicktime: false,//打开上课时长 开始时间
                newClassBuke: {//保存接口所需参数
                    saveFlag: 'putmend',
                    data: {
                        type: 0,//0:新开班补课 1跟班补课
                        CourseID: '00000000-0000-0000-0000-000000000000',//新开班：空  跟班：跟班课程的cid
                        ClassID: '00000000-0000-0000-0000-000000000000',
                        ShiftID: '',//课程ID
                        CampusID: '',//补课的校区ID
                        StartTime: '',//新开班：开始时间
                        EndTime: '',//新开班：结束时间
                        ClassroomID: '',//教室Id
                        CheckConflict: 1,
                        Teachers: [],
                        CstList: []
                    }
                },
                openConflictFilter:false,
                conflictObj:''
            }
        },
        computed: {
            renderData() {
                return {
                    bukeManage: this.bukeManage
                }
            },
            //从 teacherAssResult||teacherResult 取得数据展示
            dealTeacherAssResult: function () {
                return this.getTeacherInfo(this.teacherAssResult).names
            },
            dealTeacherResult: function () {
                return this.getTeacherInfo(this.teacherResult).names
            }
        },
        methods: {
            //处理上课时长
            getCourseTime(type, day, start, dura, end) {
                var dayArr = day.split('-'),
                    startArr = start.split(':'),
                    duraArr = dura.split(':'),
                    endArr = end && end.split(':'),
                    date = new Date();

                if (type == 0) { //0：修改开始时间/修改上课时长
                    let sTime = new Date(dayArr[0], parseInt(dayArr[1]) - 1, dayArr[2], startArr[0], startArr[1]),
                        dTime = duraArr[0] * 3600 * 1000 + duraArr[1] * 60 * 1000;

                    date.setTime(sTime.getTime() + dTime);
                    return this.formatDate(date, 'hh:mm');
                } else if (type == 1) { //：1计算上课时长
                    let sTime = new Date(dayArr[0], parseInt(dayArr[1]) - 1, dayArr[2], startArr[0], startArr[1]),
                        eTime = new Date(dayArr[0], parseInt(dayArr[1]) - 1, dayArr[2], endArr[0], endArr[1]);

                    return eTime.getTime() - sTime.getTime();
                }
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
            getToday() {
                this.today = this.formatDate(new Date(), 'yyyy-MM-dd');
                // this.nowTime = this.formatDate(new Date(), 'hh:mm');
                this.timeObj.stimepro = this.formatDate(new Date(), 'hh:mm');
                this.timeObj.dtimepro = '02:00';
            },
            //初始化
            initBuke() {
                //没有权限时，无法选择任课老师，默认为当前用户
                if (!this.MissStudentCourseTeacher) {
                    this.teacherResult = [{
                        id:this.bukeManage.userId,
                        name: this.bukeManage.userName
                    }]
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
            //选择老师
            selectTeacher() {
                //没有权限时，无法选择任课老师
                if (!this.MissStudentCourseTeacher) {
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
                                app.toast('info', ass.name + '已被设置为助教。');
                                conflictFlag = true;
                                return
                            }
                        });
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
                this.teacherAssResult.length && this.teacherAssResult.forEach(item => {
                    arr.push(item.id);
                });
                app.empSelect(1, arr, function (data) {
                    let conflictFlag = false;
                    //判断冲突
                    if (conflictId != '') {
                        data.forEach(tea => {
                            if (conflictId == tea.id) {
                                app.toast('info', tea.name + '已被设置为任课老师。');
                                conflictFlag = true;
                                return
                            }
                        });
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
            //上课日期
            selectCourseDate(){
                app.calendar().then(date=>{
                    this.courseDate = date;
                    //date为选择的日期
                });
            },
            //选择上课时间||上课时长
            openPicktimeAS() {
                this.openPicktime = !this.openPicktime;
                if (this.openPicktime) {
                    this.timeObj.stimepro = this.nowTime == '' ? this.timeObj.stimepro : this.nowTime;
                    this.timeObj.dtimepro = this.durTime == '' ? this.timeObj.dtimepro : this.durTime;
                }
            },
            acceptDatetimePro(obj) {
                this.nowTime = obj.stimepro;
                this.durTime = obj.dtimepro;
                this.endTime = obj.etimepro;
            },
            //选择教室
            openClassroomAS() {
                this.openClassroom = !this.openClassroom;
            },
            //接收选择教室信息
            acceptClassroom(obj) {
                this.selectedClassroomMsg = obj;
            },
            //上课冲突
            selectCheckConflict() {
                this.newClassBuke.data.CheckConflict = this.newClassBuke.data.CheckConflict == 1 ? 0 : 1;
            },
            submit() {
                //courseDate
                if(this.teacherResult.length<1){
                    app.toast('info','任课老师不能为空。');
                    return
                }
                if(this.courseDate==''){
                    app.toast('info','上课日期不能为空。');
                    return
                }
                if(this.nowTime==''){
                    app.toast('info','开始时间不能为空。');
                    return
                }
                if(this.durTime==''){
                    app.toast('info','上课时长不能为空。');
                    return
                }
                if(app.tool.isEmptyObject(this.selectedClassroomMsg)){
                    //要么选要么没选
                    app.toast('info','上课教室不能为空。');
                    return
                }

                // 课程id
                this.newClassBuke.data.ShiftID = this.bukeManage.shift;
                // 校区id
                this.newClassBuke.data.CampusID = this.bukeManage.campusId;
                // 开始时间 结束时间
                this.newClassBuke.data.StartTime = this.courseDate+' '+this.nowTime;
                this.newClassBuke.data.EndTime = this.courseDate+' '+this.endTime;
                //老师 助教
                let teacher = [{
                    ID:this.teacherResult[0].id,
                    Name:this.teacherResult[0].name,
                    Role:1
                }];
                let assTeacher = [];
                if(this.teacherAssResult.length>0){
                    this.teacherAssResult.forEach(item=>{
                        assTeacher.push({
                            ID:item.id,
                            Name:item.name,
                            Role:2
                        })
                    })
                }
                this.newClassBuke.data.Teachers = teacher.concat(assTeacher);
                //教室
                this.newClassBuke.data.ClassroomID = this.selectedClassroomMsg.ID;
                //冲突  点击时已赋值
                //学生
                this.newClassBuke.data.CstList = this.bukeManage.students;

                this.send();
            },
            send(){
                let params = {
                    data:JSON.stringify(this.newClassBuke.data)
                }
                savePost({
                    saveFlag:"putmend",
                    data:params.data
                }).then(res=>{
                    if(res.errcode==app.errok){
                        app.toast('success', '安排补课成功。');
                        this.$router.back();
                        app.eventDefine.emit('BukeNewClass');
                    }else if(res.errcode==421){
                        this.conflictObj = res.data;
                        this.openConflictFilter = !this.openConflictFilter;
                    }else{
                        app.toast('error',res.errmsg)
                    }
                })
            }
        },
        created() {
            //处理学员名字用于显示
            let ls_bukeManage = app.tool.clone(app.ls.getStorage('bukeManage')),
                studentsNames = '';

            ls_bukeManage.students.forEach(stu => {
                studentsNames += stu.Name + ' '
            });
            ls_bukeManage.studentsNames = studentsNames;
            this.bukeManage = ls_bukeManage;//补课参数
            this.bukeManageClassroom = app.ls.getStorage('bukeManageClassroom').filterClassRoom;
            this.initBuke();
            this.getToday();
        },
        components: {
            BukeClassroom,
            DatetimePro,
            ConflictFilter
        }
    }
</script>

