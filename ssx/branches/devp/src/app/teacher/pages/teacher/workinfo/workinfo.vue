<!--工作统计-->
<style scoped lang="scss">
    .workinfo-container {
        background-color: $color-assist-1;
        .footer {
            @include shadow-base;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 49px;
            line-height: 49px;
            background-color: $color-white;
            color: $color-3;
            font-size: 15px;
            display: flex;
            padding: 0 15px;
            .prev-month {
                width: 50px;
            }
            .month {
                flex: 1;
                text-align: center;
            }
            .next-month {
                width: 50px;
            }
        }
        .scroller {
            background-color: $color-assist-1;
            @include position-absolute(0, 0, 49px, 0);
            .title {
                padding: 0 15px;
                @include flex-between;
                height: 45px;
                line-height: 45px;
                .title-lf {
                    color: $color-6;
                }
            }
            .card {
                background-color: $color-white;
                padding: 21px 32px 24px;
                margin: 0 15px;
                .describe {
                    font-size: 15px;
                    color: $color-9;
                    width: 100%;
                    text-align: center;
                }
                .percentage {
                    font-size: 24px;
                    text-align: center;
                }
                .progress {
                    width: 100%;
                    height: 9px;
                    background-color: #ebebeb;
                    border-radius: 9px;
                    position: relative;
                    margin: 15px auto;
                    .process-child {
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 9px;
                        border-radius: 9px;
                        width: 100px;
                    }
                }
                .count {
                    @include flex-between;
                    color: $color-6;
                    font-size: 12px;
                    .count-lf {
                        display: flex;
                        height: 19px;
                        line-height: 19px;
                        .circle-box {
                            padding: 4px 10px 4px 0;
                            .circle {
                                width: 10px;
                                height: 10px;
                                border-radius: 100%;
                            }
                        }
                    }
                }
                .detail{
                    font-size: 12px;
                    color: $color-9;
                    padding: 12px 20px;
                    margin-top: 10px;
                    background-color: #F4F6F8;
                    position: relative;
                    .triangle{
                        position: absolute;
                        top: -9px;
                        left: 23px;
                        @include triangle($color:#F4F6F8);
                    }
                    .item{
                        margin-bottom: 8px;
                        &:last-child{
                            margin: 0;
                        }
                    }
                }
            }
        }
        .void {
            width: 100%;
            height: 9px;
            background-color: $color-assist-1;
        }
        .wigC {
            color: #83c44e;
        }
        .wigB {
            background-color: #83c44e;
        }
        .wibC {
            color: #1F9DF8;
        }
        .wibB {
            background-color: #1F9DF8;
        }
        .wiyC {
            color: #F5A623;
        }
        .wiyB {
            background-color: #F5A623;
        }
    }
</style>

<template>
    <div class="workinfo-container">
        <scroller-base class="scroller" :data="dataObj">
            <!--已上课时-->
            <div @click=goToCourseDetails()>
                <div class="title">
                    <div class="title-lf">已上课时</div>
                    <div class="title-rt">详情
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
                <div class="card">
                    <div class="describe">上课率</div>
                    <div class="percentage wigC">{{dataObj.cctRate}}</div>
                    <div class="progress">
                        <div class="process-child wigB" :style="{width:dataObj.cctRate}"></div>
                    </div>
                    <div class="count">
                        <div class="count-lf">
                            <div class="circle-box">
                                <div class="circle wigB"></div>
                            </div>
                            <div>已上：{{dataObj.coursefinishedcount}}节</div>
                        </div>
                        <div class="count-rt">共计：{{dataObj.coursetotalcount}}节</div>
                    </div>
                    <!--1小时，2次，3按月  TODO: 上课率这里的展示要确认下
                    <div class="detail" v-if="dataObj.data && dataObj.data.courseDetail && dataObj.data.courseDetail.length">
                        <div class="triangle"></div>
                        <div class="item"
                            :key="index"
                            v-for="(item,index) in dataObj.data.courseDetail"
                            :class="{'hours':item.unit==1,'time':item.unit==2,'day':item.unit == 3}">
                            <span v-show="item.unit==2">按{{app.sysInfo.Title_CourseUnit_2}}计费</span>
                            <span v-show="item.unit==3">按天计费</span>
                            <span v-show="item.unit==1">按小时计费</span>：{{item.amount}}
                            <span v-show="item.unit==2">{{app.sysInfo.Title_CourseUnit_2}}</span>
                            <span v-show="item.unit==3">天</span>
                            <span v-show="item.unit==1">小时</span>
                        </div>
                    </div>
                    -->
                </div>
            </div>
            <!--学生出勤-->
            <div @click=goToAttendanceDetails()>
                <div class="title">
                    <div class="title-lf">学生出勤</div>
                    <div class="title-rt">详情
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
                <div class="card">
                    <div class="describe">出勤率</div>
                    <div class="percentage wibC">{{dataObj.adtRate}}</div>
                    <div class="progress"><div class="process-child wibB" :style="{width:dataObj.adtRate}"></div></div>
                    <div class="count">
                        <div class="count-lf">
                            <div class="circle-box">
                                <div class="circle wibB"></div>
                            </div>
                            <div>实到：{{dataObj.coursestudentisattendcount}}人</div>
                        </div>
                        <div class="count-rt">应到：{{dataObj.coursestudentcount}}人</div>
                    </div>
                </div>
                </div>
                <!--课程评价-->
                <div class="title">
                    <div class="title-lf">课程评价</div>
                </div>
                <div class="card">
                    <div class="describe">评价率</div>
                    <div class="percentage wiyC">{{dataObj.cmtRate}}</div>
                    <div class="progress">
                        <div class="process-child wiyB" :style="{width:dataObj.cmtRate}"></div>
                    </div>
                    <div class="count">
                        <div class="count-lf">
                            <div class="circle-box">
                                <div class="circle wiyB"></div>
                            </div>
                            <div>已评价：{{dataObj.coursestudentcommentcount}}人</div>
                        </div>
                        <div class="count-rt">应评价：{{dataObj.coursecommentcount}}人</div>
                    </div>
                </div>
            <div class="void"></div>
        </scroller-base>
        <div class="footer">
            <div class="prev-month" @click="selectMonth(0)">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zuobianjiantou"></use>
                </svg>
            </div>
            <div class="month">{{dateForShow}}</div>
            <div class="next-month" @click="selectMonth(1)">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </div>
        </div>
        <loading class="loading" v-show="isLoading"></loading>
    </div>
</template>

<script>
    import {getworkinfo} from 'teacher/api/personal-center.js';

     function getNextMonth(date,fmt='yyyy-MM-dd'){            
            let today = date ? new Date(date) : new Date(),
                start,end;
                today.setMonth(today.getMonth()+1);
                today.setDate(1);
                start = app.filters.formatDatetime(today,fmt);
                // today.setMonth(today.getMonth()+1);
                today.setDate(0);
                end =  app.filters.formatDatetime(today,fmt);
            return {start,end};      
        }

    export default {
        name: "workinfo",
        data() {
            return {
                wxTitle: '工作统计',
                work_sdate: '',//开始日期
                work_edate: '',//结束日期
                dateForShow: '',//底部用来展示的日期
                current_sdate: app.tool.getDatesByIndex(5, app.localTimeToServer).sdate, //当前（底部）月份
                current_edate:app.tool.getDatesByIndex(5, app.localTimeToServer).edate,
                dataObj: {},
                isLoading: true
                
            }
        },
        created() {
           this.getData(
               this.current_sdate
               ,
               this.current_edate
               );
        },
        methods: {
            goToCourseDetails() {  // 页面跳转
                this.$router.push({path: `/workInfoCourseDetails/${this.work_sdate}/${this.work_edate}`})
            },
            goToAttendanceDetails() {  // 页面跳转
                this.$router.push({path: `/workInfoAttendanceDetails/${this.work_sdate}/${this.work_edate}`})
            },
            getData(starttime,endtime){
                //补充格式
                getworkinfo({
                    starttime:starttime+' 00:00:00',
                    endtime:endtime+' 23:59:59'
                }).then(res => {
                    this.isLoading = false;
                    console.log(res)
                    if (res.result.code == app.errok) {
                        this.handleData(res.data);
                    } else {
                        app.toast('error', res.result.msg);
                    }
                })
            },
            handleData(data) {
                this.work_sdate = data.starttime;
                this.work_edate = data.endtime;
                this.dateForShow =this.current_sdate.substr(0, 4) + '年' + this.current_sdate.substr(5, 2) + '月';
                this.dataObj = data;
                this.dataObj.cctRate = data.coursetotalcount == 0 ? '0' : parseInt(data.coursefinishedcount/data.coursetotalcount*100)+'%';
                this.dataObj.adtRate = data.coursestudentcount == 0 ? '0' : parseInt(data.coursestudentisattendcount/data.coursestudentcount*100)+'%';
                this.dataObj.cmtRate = data.coursecommentcount == 0 ? '0' : parseInt(data.coursestudentcommentcount/data.coursecommentcount*100)+'%';
            },
            selectMonth(flag) { // 上||下一个月
                this.isLoading = true;
                if (!this.isLoading) {//说明正在请求
                    return;
                }

                // 判断上个月还是下个月
                if (flag == 1) {
                    // 判断是否为当月
                    let curYear = new Date().getFullYear(),
                        curMonth = new Date().getMonth() + 1;                    
                    if ((this.current_sdate.substr(0, 4) == curYear) && (this.current_sdate.substr(5, 2) == curMonth)) {
                        app.toast("info", "已是当前月。");
                        this.isLoading = false;
                        return;
                    }
                }
                //更新当前月份
                if(flag == 0){
                    this.current_sdate = app.tool.getDatesByIndex(6, this.current_sdate).sdate
                    this.current_edate = app.tool.getDatesByIndex(6, this.current_edate).edate
                }else{
                    this.current_sdate = getNextMonth(this.current_sdate).start;
                    this.current_edate = getNextMonth(this.current_sdate).end;
                }

                this.getData(this.current_sdate,this.current_edate)

                /* getworkinfo({
                    // querymonth: flag==0?'PREV':'NEXT',
                    starttime: this.work_sdate,
                    endtime: this.work_edate
                }).then(res => {
                    this.isLoading = false;
                    console.log(res)
                    if (res.result.code == app.errok) {
                        this.handleData(res.data);
                    } else {
                        app.toast("error", res.result.msg);
                    }
                }) */
            }
        }
    }
</script>