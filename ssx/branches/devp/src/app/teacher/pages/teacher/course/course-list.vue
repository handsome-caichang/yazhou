<!--我的课表-->
<style scoped lang="scss">
    
    

    .course-list-container {
        background-color: $color-assist-1;
        .header {
            height: 44px;
            line-height: 44px;
            padding: 0 15px;
            background-color: $color-white;
            font-size: 12px;
            color: $color-6;
            @include border-bottom;
            @include flex-between;
            .select-box {
                display: flex;
                .this, .prev, .next {
                    width: 52px;
                    height: 28px;
                    line-height: 28px;
                    text-align: center;
                    border-radius: 28px;
                    margin: 8px 0;
                    border: 1px solid $color-assist-1;
                }
                .this {
                    width: 70px;
                    margin: 8px;
                }
            }
            .mode-btn {
                width: 52px;
                height: 28px;
                line-height: 28px;
                border-radius: 28px;
                text-align: center;
                background-color: $color-assist-1;
            }
        }
        .week-scroller {
            @include position-absolute(44px, 0, 0, 0);
            .title {
                height: 40px;
                line-height: 40px;
                font-size: 16px;
                color: $color-6;
                padding: 0 12px;
                @include flex-between;
                .today {
                    color: $color-primary;
                }
            }
            .card-box {
                min-height: 87px;
                .no-class {
                    line-height: 87px;
                    color: $color-9;
                    font-size: 16px;
                    background-color: $color-white;
                    text-align: center;
                }
                .card {
                    @include border-bottom;
                    background-color: $color-white;
                    padding: 12px;
                    padding-left: 17px;
                    @include flex-between;
                    position: relative;
                    .icon.yixing{
                        font-size: 43px;
                        position: absolute;
                        left: -19px;
                        top: 22px;
                    }
                    .card-lf {
                        flex: 1;
                        max-width: 72%;
                        .icon{
                            margin-right: 5px;
                        }
                        .class-name {
                            font-size: 16px;
                            color: $color-3;
                            margin-bottom: 3px;
                            @include ellipsis-single;
                        }
                        .msgs {
                            font-size: 12px;
                            color:$color-9;
                            display: flex;
                            flex-wrap: wrap;
                            .campu {
                                height: 24px;
                                line-height: 24px;
                                @include ellipsis-single;
                            }
                            .leave{
                                width: 40px;
                                height: 24px;
                                line-height: 24px;
                                margin-left: 8px;
                                padding: 3px 0;
                                .icon{
                                    width: 100%;
                                    height: 16px;
                                }
                            }

                            .teacher {
                                max-width: 100%;
                                @include ellipsis-single;
                                padding: 0 10px;
                                text-align: center;
                                height: 18px;
                                line-height: 16px;
                                color: #F5A623;
                                border: 1px solid #F5A623;
                                border-radius: 10px;
                                margin: 2px 0 2px 8px;
                            }

                        }
                        .room-time {
                            margin-top: 1px;
                            font-size: 13px;
                            color: $color-9;
                            @include flex-between;
                            align-items: baseline;
                            width: 100%;
                            .room {
                                margin-right: 10px;
                                max-width: calc(100% - 120px);
                                @include ellipsis-single;
                            }
                            .time {
                                min-width: 120px;
                            }
                        }
                    }
                    .card-rt {
                        text-align: center;
                        width: 75px;
                        .describe {
                            color: $color-9;
                            font-size: 12px;
                            &.notyet{
                                color: $color-primary;
                            }
                        }
                        .counts {
                            width: 70px;
                            height: 24px;
                            line-height: 24px;
                            font-size: 16px;
                            text-align: center;
                            color: $color-9;
                            border: 1px solid $color-9;
                            background-color: #F8F8F8;
                            border-radius: 24px;
                            margin: 0 auto;
                            margin-top: 10px;
                            &.notyet{
                                color: $color-primary;
                                background-color: #EBF5FF;
                                border: 1px solid $color-primary;
                            }
                        }
                    }

                }
            }

        }
        .month-scroller {
            @include position-absolute(44px, 0, 0, 0);
            .calender-container {
                height: 300px;
                width: calc(100% - 20px);
                margin: 0 auto;
                .day-item-box {
                    width: 100%;
                    height: 100%;
                    color: $color-3;
                    @include flex-center;
                    position: relative;
                    &.isToday {
                        color: $color-primary;
                        background-color: #E5F2FF;
                    }
                    &.gray {
                        color: #CCCCCC;
                    }
                    &.active {
                        background-color: $color-primary;
                        color: $color-white;
                    }
                    .course-amount-box {
                        position: absolute;
                        top: 3px;
                        left: 3px;
                        height: 6px;
                        @include flex-around;
                        .course-amount-dot {
                            width: 6px;
                            height: 6px;
                            border-radius: 50%;
                            background: transparent;
                            &.show {
                                background: #FFDF7F;
                                margin-right: 1px;
                            }
                        }
                        .mini3dot {
                            position: relative;
                            top: -4px;
                        }
                    }
                }
            }
            .course-content-container {
                position: relative;
                width: calc(100% - 20px);
                margin: 0 auto;
                margin-top: 10px;
                .course-card {
                    width: 100%;
                    margin-bottom: 10px;
                    background: $color-white;
                    color: $color-6;
                    @include fs-lh(12);
                    .month-card-box {
                        padding: 20px;
                        padding-top: 12px;
                        .describe {
                            font-size: 16px;
                            height: 40px;
                            line-height: 40px;
                        }
                        .month-card {
                            font-size: 14px;
                            padding: 5px 0;
                            display: flex;
                            .name{
                                width:44px;
                            }
                            .val{
                                flex: 1;
                                color: $color-3;
                                word-break: break-word;
                            }
                            span {
                                color: $color-3;
                            }
                            .icon {
                                margin-right: 5px;
                            }
                            .teacher {
                                color: #F5A623;
                            }
                            .statusCancel {
                                color: $color-9;
                            }
                            .statusNotyet {
                                color: $color-primary;
                            }
                        }
                    }
                    .month-records {
                        background-color: $color-white;
                        height: 44px;
                        line-height: 44px;
                        font-size: 15px;
                        color: $color-6;
                        padding: 0 12px;
                        @include border-top;
                        @include flex-between;
                        .link-flag {
                            font-size: 16px;
                            .blue{
                                color: $color-primary;
                            }
                        }
                    }
                }

            }
        }
        .void {
            width: 100%;
            height: 10px;
            background-color: $color-assist-1;
        }
        .noData-temp{
            margin: 50px 0;
        }
    }

</style>

<template>
    <div class="course-list-container">
        <!--筛选头部-->
        <div class="header" v-show="weeklyDisplay">
            <div class="select-box">
                <div class="prev" @click="weekShow('PREV')">上周</div>
                <div class="this" @click="weekShow('THIS')">本周</div>
                <div class="next" @click="weekShow('NEXT')">下周</div>
            </div>
            <div class="mode-btn" @click="changeWeeklyDisplay">按月</div>
        </div>
        <div class="header" v-show="!weeklyDisplay">
            <div class="select-box">
                <div class="prev" @click="changeMonth(-1)">上月</div>
                <div class="this" @click="openEditTime">{{month | formatDatetime('yyyy.MM')}}</div>
                <div class="next" @click="changeMonth(1)">下月</div>
            </div>
            <div class="mode-btn" @click="changeWeeklyDisplay">按周</div>
        </div>
        <!-- 按周显示 -->
        <scroller-base class="week-scroller" v-show="weeklyDisplay" :data="renderWeekData" ref="weekDataScroller">

            <!--星期X-->
            <div v-for="(d,i) in week_list" :key="i">
                <div class="title">
                    <div>{{week_title[i]}}</div>
                    <div class="today" v-if="week_day[i]==today">今天</div>
                    <div class="day" v-else>{{week_day0[i]}}</div>
                </div>
                <div class="card-box">
                    <div class="card" v-for="item in d.val" :key="item.id">
                        <svg class="icon yixing" aria-hidden="true" v-if="item.status!=='已取消'">
                            <use :xlink:href="item.status=='已上课'?'#icon-yixingbiaoqian-hui':'#icon-yixingbiaoqian'"></use>
                        </svg>
                        <router-link tag="div"
                                     :to="{name:'courseDetails', 
                                     query:{
                                         id: item.id,
                                         classname:item.name,
                                         campus:item.campusname,
                                        
                                     }}"
                                     class="card-lf">
                            <div class="class-name">
                                {{item.name}}<span v-if="item.subjectname">（{{item.subjectname}}）</span>
                            </div>
                            <div class="msgs">
                                <div class="campu"><svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-xiaoqu2"></use>
                                </svg>{{item.campusname}}</div>
                                <div class="leave" v-if="item.issend==1">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-qingjiabiaoqian1"></use>
                                    </svg>
                                </div>
                                <div class="teacher" v-if="item.teacher">{{item.teacher}}</div>
                            </div>
                            <div class="room-time">
                                <div class="room"><svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-jiaoshi1"></use>
                                </svg>{{item.classroomname}}</div>
                                <div class="time" v-if="!(item.stime=='00:00'&&item.etime=='23:59')">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-shijian1"></use>
                                    </svg>{{item.stime}}~{{item.etime}}</div>
                            </div>
                        </router-link>
                        <!--已取消-->
                        <div class="card-rt" v-if="item.status=='已取消'">
                            <div class="describe">已取消</div>
                        </div>
                        <!--已上课-->
                        <div class="card-rt" v-if="item.status=='已上课'">
                            <div class="describe">已上课</div>
                            <router-link tag="div" :to="{name:'courseRecords', query:{id: item.id}}" class="counts">
                                {{item.attendancecount}}/{{item.studentcount}}
                            </router-link>
                        </div>
                        <!--未上课-->
                        <div class="card-rt" v-if="item.status==''">
                            <div class="describe notyet">未上课</div>
                            <router-link tag="div" :to="{name:'courseRecords', query:{id: item.id}}" class="counts notyet">
                                {{item.attendancecount}}/{{item.studentcount}}
                            </router-link>
                        </div>
                    </div>
                    <div class="no-class" v-if="d.val.length<1">
                        暂无上课班级
                    </div>
                </div>
            </div>

        </scroller-base>

        <!-- 按月显示 -->
        <scroller-base class="month-scroller" :data="renderMonthData" v-show="!weeklyDisplay" ref="monthDataScroller">
            <!--课程日历-->
            <month-calender-common :month="month" :type="0" class="calender-container" @monthChanged="monthChanged">
                <div slot="days42" slot-scope="{data,index}"
                     class="day-item-box"
                     :class="{'gray' : !data.thisMonth,'isToday':data.isToday,'active':selected.index == index}"
                     @click="selectDay(index,data)">
                    <span>{{data.day}}</span>
                    <!--有多少节课的圆圈-->
                    <!--dayMap[data.datestr]可能为undefined-->
                    <div class="course-amount-box" v-if="dayMap[data.datestr]">
                        <div class="course-amount-dot" :class="{'show': dayMap[data.datestr].length>0}"></div>
                    </div>

                </div>
            </month-calender-common>
            <!--当天课程详情-->
            <div class="course-content-container">
                <div class="course-card" v-for="item in list" :key="item.id">
                    <div class="month-card-box">
                        <!--时间-->
                        <div class="describe">
                            <span v-if="item.stime=='00:00'&&item.etime=='23:59'">{{item.date.replace(/-/g,'.').substring(5)}}</span>
                            <span v-else>{{item.stime}}~{{item.etime}}</span>
                        </div>
                        <!--班级-->
                        <div class="month-card">
                            <div class="name">班级：</div>
                            <div class="val">
                                <span>{{item.name}}<span v-show="item.subjectName">({{item.subjectName}})</span></span>
                            </div>
                        </div>
                        <!--校区-->
                        <div class="month-card">
                            <div class="name">校区：</div>
                            <div class="val">{{item.campusname}}</div>
                        </div>
                        <!--老师-->
                        <div class="month-card" v-if="item.teacher">
                            <div class="name">老师：</div>
                            <div class="val"><span class="teacher">{{item.teacher}}</span></div>
                        </div>
                        <!--教室-->
                        <div class="month-card">
                            <div class="name">教室：</div>
                            <div class="val">{{item.classroomname}}</div>
                        </div>
                        <!--状态-->
                        <div class="month-card">
                            <div class="name">状态：</div>
                            <div class="val">
                                  <span :class="{statusCancel: item.status=='已取消',statusNotyet: (item.status!=='已上课')&&(item.status!=='已取消')}">{{item.status || '未上课'}}</span>
                            </div>
                          </div>
                        <!--内容-->
                        <div class="month-card" v-if="item.content">
                            <div class="name">内容：</div>
                            <div class="val"><span>{{item.content}}</span></div>
                        </div>
                    </div>
                    <router-link tag="div" :to="{name:'courseRecords', query:{id: item.id}}">
                        <div class="month-records">
                            <div class="text-record">上课人数</div>
                            <div class="link-flag">
                                <span class="blue">{{item.attendancecount}}</span>/{{item.studentcount}}
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-youjiantou"></use>
                                </svg>
                            </div>
                        </div>
                    </router-link>
                </div>
                <empty-page class="noData-temp" v-show="!list.length" :type="0" text="还没有要上的课，你今天休息吗？"></empty-page>
                <div class="void"></div>
            </div>
        </scroller-base>

        <loading class="loading" v-show="isLoading"></loading>
    </div>
</template>

<script>
    /**@description
     *  全科科目：显示科目名称
     *  按月计费班级 根据开始时间为00:00且结束时间为23:59判断，满足条件即显示几月几日，否则显示后台字段‘xx:xx’~'xx:xx'
     */
    import {getcourseinfoapplist} from 'teacher/api/course.js';
    
    import MonthCalenderCommon from 'teacher/components/common/month-calender/month-calender-common.vue';
    import EmptyPage from 'teacher/components/common/empty-page/empty-page'

    //按月展示 需要的辅助变量
    let _dateMonth = new Date();
    let _daysArr = [];		//缓存calender返回的42天数据.
    let _isFirst = true;		//第一次进入课表界面,直接定位到今天.


    export default {
        name: "course-list",
        data() {
            return {
                wxTitle: "我的课表",
                weeklyDisplay: true, //默认按周展示(切换状态的flag)
                today: '',//YYYY-MM-DD  星期标题 '今天' 字段展示的位置标识
                currentWeek: 0,
                w: '',
                now: '',
                week_day0: [],//一周七天的具体‘月日’
                week_day: [],//一周七天的具体‘年月日’
                week_list:[{val:[]},{val:[]},{val:[]},{val:[]},{val:[]},{val:[]},{val:[]}],//保存周数据
                week_title:['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
                isLoading: true,//loading加载中gif
                weekPara: {
                    usertype: 1,
                    startdate: null,
                    enddate: null,
                    viewtype:1
                },
                monthPara: {
                    usertype: 1,
                    startdate: null,
                    enddate: null,
                    viewtype:0
                },
                monthNum: 0,
                month: '',
                list: [],        //放课程
                dayMap: {},		//42天的Map对象
                selected: {
                    index: 0
                },
                loadNum:0
            }
        },
        created() {
            let cn = new Date();
            this.w = new Date().getDay();//变量赋值
            this.today = this.formatDate(cn, 'yyyy-MM-dd');//变量赋值
            this.now = this.w == 0 ? 7 : this.w;//变量赋值
            this.weekShow("THIS");
        },
        mounted() {
            _isFirst = true;
            _dateMonth = new Date();
            this.month = _dateMonth.getFullYear() + '-' + formartZero(_dateMonth.getMonth() + 1) + '-' + formartZero(_dateMonth.getDate());
        },
        computed: {
            renderWeekData() {
                return {
                    Mon_list: this.week_list[0].val,
                    Tue_list: this.week_list[1].val,
                    Wed_list: this.week_list[2].val,
                    Thur_list: this.week_list[3].val,
                    Fri_list: this.week_list[4].val,
                    Sat_list: this.week_list[5].val,
                    Sun_list: this.week_list[6].val
                }
            },
            renderMonthData() {
                return {
                    list: this.list
                }
            }
        },
        methods: {
            changeWeeklyDisplay() {
                this.weeklyDisplay = !this.weeklyDisplay;
                if (!this.weeklyDisplay) {
                    this.monthNum++;
                    this.loadNum++;
                    this.isLoading = true;
                }
            },
            weekShow(newweek) {
                this.isLoading = true;
                // this.weekPara.week = newweek;
                if (newweek == "THIS") {
                    this.currentWeek = 0;
                } else if (newweek == "NEXT") {
                    this.currentWeek += 1;
                } else {
                    this.currentWeek -= 1;
                }
                
                this.week_day0 = [];//清空一周的日期列表 MM-dd
                this.week_day = [];//清空一周的日期列表 yyyy-MM-dd
                this.clear();// 清空数据

                this.setCourseWeek();// this.week_day的赋值
                
                // 设置参数时间与上行顺序发生调换
                if (this.week_day.length > 0) {
                    this.weekPara.startdate = this.week_day[0];
                    this.weekPara.enddate = this.week_day[6];
                }

                this.getWeekData();//请求数据
                
                this.lightHeightToday(); //判断是否今天，显示‘今天’
            },
            lightHeightToday() {
                this.week_day.forEach((day, index) => {
                    if (day == this.week_day) {
                        this.today == index;
                        return
                    }
                })
            },
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
            setCourseWeek() {
                // this.week_day的赋值
                let arr = [1, 2, 3, 4, 5, 6, 7];
                do {
                    let a = arr.shift();
                    let val = a - this.now;
                    let day = new Date();
                    day.setDate(day.getDate() + val + this.currentWeek * 7);
                    this.week_day0.push(this.formatDate(day, 'MM-dd'))
                    this.week_day.push(this.formatDate(day, 'yyyy-MM-dd'));
                } while (arr.length > 0);

            },
            handleWeek(res) {
                //赋值每周的list
                res.data.forEach(item => {
                    let i = this.week_day.indexOf(item.date);
                    switch (i) {
                        case 0:
                            this.week_list[0].val.push(item);
                            break;
                        case 1:
                            this.week_list[1].val.push(item);
                            break;
                        case 2:
                            this.week_list[2].val.push(item);
                            break;
                        case 3:
                            this.week_list[3].val.push(item);
                            break;
                        case 4:
                            this.week_list[4].val.push(item);
                            break;
                        case 5:
                            this.week_list[5].val.push(item);
                            break;
                        case 6:
                            this.week_list[6].val.push(item);
                            break;
                        case -1:
                            break;
                    }
                });
            },
            clear() {
                this.week_list=[{val:[]},{val:[]},{val:[]},{val:[]},{val:[]},{val:[]},{val:[]}];
            },
            //获取周数据
            getWeekData() {
                getcourseinfoapplist(this.weekPara).then(res => {
                    this.isLoading = false;
                    if (res.result.code == app.errok) {
                        this.handleWeek(res)
                    } else {
                        app.toast('error', res.result.msg);
                    }
                })
            },
            ////按周↑↑↑↑↑
            ////按月↓↓↓↓↓
            changeMonth(num) {
                _dateMonth.setMonth(_dateMonth.getMonth() + num);
                this.month = _dateMonth.getFullYear() + '-' + formartZero(_dateMonth.getMonth() + 1) + '-' + formartZero(_dateMonth.getDate());
            },
            openEditTime() {
                app.datetimePicker({
                    date: this.month,
                    format: 'YYYY-MM',
                }).then(data => {
                    data = data + '-01';
                    _dateMonth = new Date(data);
                    this.month = data;
                })
            },
            selectDay(index, data) {
                this.selected.index = index;
                console.log(index,data)
                this.getDayData(this.dayMap[data.datestr],data.datestr);
            },
            // 获取月数据
            getMonthData() {
                if(this.loadNum<1){
                   return
                }
                this.isLoading = true;
                getcourseinfoapplist(this.monthPara).then(res => {
                    console.log(res)
                    this.isLoading = false;
                    this.dayMap = transformData(res.data, _daysArr);
                    //直接定位到今天
                    if (_isFirst) {
                        this.selected.index = getTodayIndex(_daysArr);
                        _isFirst = false;
                    }
                    this.selectDay(this.selected.index, _daysArr[this.selected.index]);
                })
            },
            //获取某一天的数据
            getMonthDayData(ids,date) {
                // 请求到数据，为list赋值 界面显示
                getcourseinfoapplist({
                    startdate:date,
                    enddate:date,
                    usertype:1,
                    usertype:3,
                    courseid: ids
                }).then(res => {
                    this.list = res.data ? res.data : '';
                })
            },
            getDayData(arr,date) {
                console.log(arr)
                //循环 courseIdList id列表 逗号隔开 请求数据
                let idList = '';
                if (arr.length > 0) {
                    arr.forEach((item, index) => {
                        index == arr.length - 1 ? (idList += item.id) : (idList += (item.id + ','));
                    })
                    this.getMonthDayData(idList,date)
                } else {
                    this.list = '';
                }

            },
            monthChanged(data) {
                _daysArr = data;
                this.monthPara.startdate = data[0].datestr;
                this.monthPara.enddate = data[41].datestr;
                this.getMonthData();
            }
        },

        components: {
            MonthCalenderCommon,
            EmptyPage
        },
        watch: {
            monthNum: function (newVal, oldVal) {
                this.$nextTick(() => {
                    this.$refs.monthDataScroller.refresh();
                })
            },
            loadNum:function (newval,oldval) {
                this.getMonthData();
            }
        }
    }
    //按月展示 需要的辅助方法
    //1.一些数据的处理参数的赋值
    //2.判断是否‘今天’
    //3.格式化日期xxxx-x-x 为 xxxx-xx-xx 是否需要加0的判断
    function transformData(res, daysArr) {
        let dayMap = {};
        //初始化 dayMap={xxxx-xx-xx:[],xxxx-xx-xx:[],xxxx-xx-xx:[],xxxx-xx-xx:[],xxxx-xx-xx:[],...}
        daysArr.forEach(item => {
            !dayMap[item.datestr] && (dayMap[item.datestr] = []);
        });
        //赋值 dayMap={xxxx-xx-xx:[],xxxx-xx-xx:[{xx:'xx',yy:'yy'...}],xxxx-xx-xx:[{xx:'xx',yy:'yy'...}],xxxx-xx-xx:[],xxxx-xx-xx:[],...}
        res.forEach(item => {
            !dayMap[item.date] && (dayMap[item.date] = []);//以防万一
            dayMap[item.date].push(item);
        });
        return dayMap;
    }

    function getTodayIndex(daysArr) {
        let today = 0;
        daysArr.forEach((val, index) => {
            if (val.isToday) {
                today = index
            }
        });
        return today;
    }

    function formartZero(s){
        s = '' + s;
        return  s.length == 1 ? '0' + s : s
    }
</script>

