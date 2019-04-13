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
                    &:before{

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
        <scroller-base class="scroller" :data="renderData">
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
                        <div>已上：{{dataObj.cct1}}节</div>
                    </div>
                    <div class="count-rt">共计：{{dataObj.cct0}}节</div>
                </div>
                <!--1小时，2次，3按月-->
                <div class="detail" v-if="dataObj.data && dataObj.data.courseDetail && dataObj.data.courseDetail.length">
                    <div class="triangle"></div>
                    <div class="item"
                         v-for="(item,index) in dataObj.data.courseDetail"
                         :key="index"
                         :class="{'hours':item.unit==1,'time':item.unit==2,'day':item.unit == 3}"
                    >
                        <span v-show="item.unit==2">按{{app.sysInfo.Title_CourseUnit_2}}计费</span>
                        <span v-show="item.unit==3">按天计费</span>
                        <span v-show="item.unit==1">按小时计费</span>
                        ：{{item.amount}}
                        <span v-show="item.unit==2">{{app.sysInfo.Title_CourseUnit_2}}</span>
                        <span v-show="item.unit==3">天</span>
                        <span v-show="item.unit==1">小时</span>
                    </div>

                </div>
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
                <div class="progress">
                    <div class="process-child wibB" :style="{width:dataObj.adtRate}"></div>
                </div>
                <div class="count">
                    <div class="count-lf">
                        <div class="circle-box">
                            <div class="circle wibB"></div>
                        </div>
                        <div>实到：{{dataObj.adt1}}人</div>
                    </div>
                    <div class="count-rt">应到：{{dataObj.adt0}}人</div>
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
                        <div>已评价：{{dataObj.cmt1}}人</div>
                    </div>
                    <div class="count-rt">应评价：{{dataObj.cmt0}}人</div>
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
    import {processGet} from 'teacher/api/common';

    export default {
        name: "workinfo",
        data() {
            return {
                wxTitle: '工作统计',
                work_sdate: '',//开始日期
                work_edate: '',//结束日期
                dateForShow: '',//底部用来展示的日期
                dataObj: {},
                isLoading: true
            }
        },
        computed: {
            renderData() {
                return {
                    dataObj: this.dataObj
                }
            }
        },
        created() {
            processGet({
                pname: 'workinfo',
                month: 'this'
            }).then(res => {
                if (res.errcode == app.errok) {
                    this.isLoading = false;
                    this.handleData(res)
                } else {
                    this.isLoading = true;
                    app.toast('error', res.errmsg);
                }
            })
        },
        methods: {
            // 页面跳转
            goToCourseDetails() {
                this.$router.push({path: `/workInfoCourseDetails/${this.work_sdate}/${this.work_edate}`})
            },
            goToAttendanceDetails() {
                this.$router.push({path: `/workInfoAttendanceDetails/${this.work_sdate}/${this.work_edate}`})
            },
            // 处理数据
            handleData(data) {
                this.work_sdate = data.startDate;//赋值
                this.work_edate = data.endDate;//赋值
                this.dateForShow = data.startDate.substr(0, 4) + "年" + data.endDate.substr(5, 2) + "月"

                let info = data.data,
                    cct = info.courseCount,//课时
                    cmt = info.commentCount,//评价
                    adt = info.attendanceCount;//出勤

                let rate;
                rate = data.cctRate = cct[0] == 0 ? "0" : parseInt(cct[1] / cct[0] * 100) + '%';
                data.cct1 = cct[1]; //已上课时
                data.cct0 = cct[0]; //应上课时

                rate = data.cmtRate = cmt[0] == 0 ? "0" : parseInt(cmt[1] / cmt[0] * 100) + '%';
                data.cmt1 = cmt[1]; //已评价
                data.cmt0 = cmt[0]; //应评价

                rate = data.adtRate = adt[0] == 0 ? "0" : parseInt(adt[1] / adt[0] * 100) + '%';
                data.adt1 = adt[1]; //已出勤
                data.adt0 = adt[0]; //应出勤

                this.dataObj = data;

            },
            // 上||下一个月
            selectMonth(flag) {
                this.isLoading = true;
                if (!this.isLoading) {//说明正在请求
                    return
                }

                // 判断上个月还是下个月
                if (flag == 0) {
                    processGet({
                        pname: "workinfo",
                        month: "PREV",
                        sdate: this.work_sdate,
                        edate: this.work_edate
                    }).then(res => {
                        this.isLoading = false;
                        if (res.errcode == app.errok) {
                            this.handleData(res)
                        } else {
                            app.toast("error", "统计信息获取失败。");
                        }
                    })
                } else {
                    // 判断是否为当月
                    let curYear = new Date().getFullYear(),
                        curMonth = new Date().getMonth() + 1;
                    if ((this.work_sdate.substr(0, 4) == curYear) && (this.work_edate.substr(5, 2) == curMonth)) {
                        app.toast("info", "已是当前月。");
                        this.isLoading = false;
                        return
                    }
                    processGet({
                        pname: "workinfo",
                        month: "NEXT",
                        sdate: this.work_sdate,
                        edate: this.work_edate
                    }).then(res => {
                        this.isLoading = false;
                        if (res.errcode == app.errok) {
                            this.handleData(res)
                        } else {
                            app.toast("error", "统计信息获取失败。");
                        }
                    })
                }
            }
        }
    }
</script>