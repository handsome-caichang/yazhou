<!-- 我的课表->签到记录 -->
<style scoped lang="scss">
.course-details-container {
    .nav {
      
        .tab {
            display: flex;
            height: 40px;
            font-size: 15px;
            @include border-bottom;
            .tab-item {
                flex: 1;
                @include flex-center;
                &:first-child {
                    @include border-right;
                }
                .tab-item-text {
                    @include flex-center;
                    height: 100%;
                    padding: 0 5px;
                    border-bottom: 2px solid transparent;
                    &.active {
                        border-bottom: 2px solid #1e88f5;
                        color: #1e88f5;
                    }
                }
                .tab-item-amount {
                    @include flex-center;
                    background-color: #ff3c00;
                    color: $color-white;
                    font-size: 12px;
                    margin-top: -10px;
                    height: 16px;
                    line-height: 16px;
                    padding: 0 4px;
                    min-width: 16px;
                    border-radius: 8px;
                }
            }
        }
    }

    .header {
        position: absolute;
        top: 40px;
        width: 100%;
        height: 44px;
        line-height: 44px;
        display: flex;
        font-size: 15px;
        color: $color-9;
        padding: 0 12px;
        background-color: $color-white;
        .name {
            width: 40%;
        }
        .attendance,
        .charging {
            flex: 1;
            text-align: center;
        }
    }
    .void {
        width: 100%;
        height: 10px;
        background-color: $color-assist-1;
        position: absolute;
        top: 44px;
    }
    .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 49px;
        line-height: 49px;
        display: flex;
        font-size: 15px;
        color: $color-3;
        padding: 0 12px;
        background-color: $color-white;
        @include shadow-base;
        .ought {
            width: 40%;
        }
        .real,
        .charge {
            flex: 1;
            text-align: center;
        }
    }
    .as-details {
        @include position-absolute(94px, 0, 49px, 0);
        font-size: 15px;
        .item {
            @include border-bottom;
            .word-area {
                padding: 0 12px;
                display: flex;
                height: 44px;
                line-height: 44px;
                background-color: $color-white;
                .name-area {
                    width: 40%;
                    display: flex;
                    .name {
                        @include ellipsis-single;
                        &.narrow {
                            max-width: 56%;
                        }
                    }
                    .svg-area {
                        padding: 0 5px;
                        line-height: 38px;
                        .icon {
                            width: 9px;
                            height: 9px;
                        }
                    }
                    .leave {
                        padding: 14px 5px;
                        .jia {
                            height: 14px;
                            line-height: 14px;
                            font-size: 12px;
                            text-align: center;
                            padding: 1px 3px;
                            color: #ffffff;
                            border-radius: 2px;
                            background-color: #f5a623;
                        }
                    }
                }
                .hook {
                    flex: 1;
                    text-align: center;
                    @include ellipsis-single;
                    .absent {
                        @include ellipsis-single;
                        color: red;
                    }
                }
            }
            .tel-area {
                background-color: $color-assist-1;
                text-decoration: none;
                height: 40px;
                line-height: 40px;
                padding: 0 12px;
                font-size: 13px;
                color: $color-9;
                @include flex-between;
                .tel-logo {
                    font-size: 20px;
                }
            }
        }
    }
    .loading,
    .noData-temp {
        @include position-absolute;
    }
}
</style>

<template>
    <div class="course-details-container">
        <!-- 头部 -->
        <div class="nav">
            <!-- 去除日期筛选,默认所有 -->
            <!-- <div class="date">
                    <date-bar :sdate='pagingOption.params.sdate' :edate='pagingOption.params.edate' :index="quickDateIndex" @changeDate="changeDate"></date-bar>
                </div>
                <div class="void"></div> -->
            <div class="tab">
                <div class="tab-item" @click="changeTab(0)">
                    <div class="tab-item-text" :class="{active : activePage == 0}">老师通知</div>
                </div>
               
            </div>
        </div>

        <div class="header">
            <div class="name">姓名</div>
            <div class="attendance">是否出勤</div>
            <div class="charging">是否计费</div>
        </div>
        <!-- <div class="void"></div> -->
        <scroller-base class="as-details" :data="renderData">
            <div class="item" v-for="item in list" :key="item.id">
                <div class="word-area">
                    <div class="name-area" @click="seeTel(item)">
                        <div class="name" :class="{'narrow':item.showTel||item.IsAttendStauts==1}">{{item.name}}</div>
                        <div class="svg-area" v-if="item.showTel">
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="item.telSwitch==true?'#icon-sanjiaoxing2':'#icon-sanjiaoxing1'"></use>
                            </svg>
                        </div>
                        <div class="leave" v-if="item.IsAttendStauts==1">
                            <div class="jia">请假</div>
                        </div>
                    </div>
                    <div class="hook">
                        <div v-if="item.isAttend==1">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-gouxuan"></use>
                            </svg>
                        </div>
                        <div class="absent" v-else-if="item.isAttend==0">
                            {{item.absentCauseName}}
                        </div>
                    </div>
                    <div class="hook">
                        <div v-if="item.isCost>0">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-gouxuan"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <a :href="'tel:'+item.phone" class="tel-area" v-show="item.showTel&&item.telSwitch">
                    <div class="tel">电话：{{item.phone}}</div>
                    <div class="tel-logo">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-bodadianhua"></use>
                        </svg>
                    </div>
                </a>
            </div>
            <empty-page class="noData-temp" v-if="list.length == 0" :type="1001"></empty-page>
        </scroller-base>
        <div class="footer">
            <div class="ought">应到：{{list.length}}</div>
            <div class="real">实到：{{shidao}}</div>
            <div class="charge">计费：{{jifei}}</div>
        </div>
        <loading class="loading" v-show="isLoading"></loading>
    </div>
</template>

<script>
import { getcourseattendancemobile } from "teacher/api/course.js";
import EmptyPage from "teacher/components/common/empty-page/empty-page";
export default {
    name: "course-records",
    data() {
        return {
            wxTitle: "上课人数",
            list: [],
            isLoading: true,
            jifei: 0, //计费数量
            shidao: 0, //实到数量
            clickNum: 0
        };
    },
    computed: {
        renderData() {
            return {
                list: this.list,
                clickNum: this.clickNum
            };
        }
    },
    methods: {
        getData(id) {
            getcourseattendancemobile({
                courseid: id
            }).then(res => {
                this.isLoading = false;
                console.log(res);
                if (res.result.code == app.errok) {
                    res.data.studentList.length > 0 &&
                        res.data.studentList.forEach(item => {
                            // item.showTel = app.sysInfo.ShowTelWhenCourseConfirm==1; ////配置项
                            item.showTel =
                                app.sysInfo.ShowTelWhenCourseConfirm == 1; //有没有权限查看电话号码(配置项控制)
                            item.telSwitch = false; //展示电话的开关
                            item.isAttend == 1 && this.shidao++; //出勤数量统计
                            item.isCost > 0 && this.jifei++; //计费数量统计
                        });
                    this.list = res.data.studentList;
                } else {
                    app.toast("error", res.errmsg);
                }
            });
        },
        seeTel(item) {
            item.telSwitch = !item.telSwitch;
            this.clickNum++;
        }
    },
    created() {
        this.getData(this.$route.query.id);
    },
    components: {
        EmptyPage
    }
};
</script>

