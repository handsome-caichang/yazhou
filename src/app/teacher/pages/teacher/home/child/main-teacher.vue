<!-- 老师端首屏 -->
<style scoped lang="scss">
    .section-wrap {
        display: flex;
        flex-wrap: wrap;
        background-color: $color-white;
        position: relative;
        padding: 6.5px;
        .section-item {
            /*小屏*/
            @media (max-width: 540px) {
                .square {
                    height: 0;
                    width: 100%;
                    padding-top: 100%;
                    position: relative;
                    z-index: 2;
                    display: flex;
                    .describe {
                        @include position-absolute;
                    }
                }
            }
            /*大屏*/
            @media (min-width: 540px) {
                padding: 20px;
                .square {
                    .describe {
                        flex: 1;
                    }
                }
            }
            width: calc((100% - 21px) / 3);
            position: relative;
            @include flex-center(column);
            margin: 3.5px 3.5px 10px 3.5px;
            border: 1px solid #F5F5F5;
            border-radius: 4px;
            .square {
                flex: 1;
                .describe {
                    @include flex-center(column);
                    .section-icon {
                        width: 55px;
                        height: 55px;
                        position: relative;
                        background-image: url("../img/labelsprite.png");
                        background-size: cover;
                        background-repeat: no-repeat;
                        margin-bottom: 10px;
                        &.course{
                            background-position: 0 0;
                        }
                        &.attendance {
                            background-position: 0 -55px;
                        }
                        &.comment {
                            background-position: 0 -110px;
                        }
                        &.homework {
                            background-position: 0 -165px;
                        }
                        &.communication {
                            background-position: 0 -220px;
                        }
                        &.notice {
                            background-position: 0 -275px;
                        }
                        &.publicInfo {
                            background-position: 0 -330px;
                        }
                        &.customer {
                            background-position: 0 -385px;
                        }
                        &.buke {
                            background-position: 0 -440px;
                        }
                        &.examScore {
                            background-position: 0 -495px;
                        }
                        &.renewal {
                            background-position: 0 -550px;
                        }
                    }

                }
            }
            .num {
                position: absolute;
                top: -3px;
                right: -15px;
                min-width: 16px;
                height: 16px;
                line-height: 16px;
                padding: 0 4px;
                font-size: 12px;
                border-radius: 8px;
                text-align: center;
                color: $color-white;
                background-color: #E93A0F;
            }
        }
    }
</style>

<template>
    <div class="section-wrap">
        <div class="section-item"
                v-show="judgeShow(item)"
                v-for="(item,index) in list"
                :key="index"
                @click="goTo(item)">
            <div class="square">
                <div class="describe">
                    <div class="section-icon" :class="item.name">
                        <span class="num" v-if="item.name=='publicInfo'&&publicInfoNums>0">{{publicInfoNums>99?'99+':publicInfoNums}}</span>
                    </div>
                    {{item.text}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {processGet} from 'teacher/api/common';

    export default {
        name: 'main-teacher',
        data() {
            return {
                data: null,
                publicInfoNums: app.sysInfo.publicInfo,
                list: [{
                    icon: '#icon-wodekebiao',
                    text: '我的课表',
                    name: 'course',
                    href: 'courseList'
                }, {
                    text: '上课点名',
                    name: 'attendance',
                    href: 'courseAttendanceList'
                }, {
                    text: '上课点评',
                    name: 'comment',
                    href: 'commentList'
                }, {
                    text: '作业',
                    name: 'homework',
                    href: 'homeworkList'
                }, {
                    text: '学员沟通管理',
                    name: 'communication',
                    href: 'communicationList'
                }, {
                    text: '通知',
                    name: 'notice',
                    href: 'noticeList'
                }, {
                    text: '学校公告',
                    name: 'publicInfo',
                    href: 'announcementList'
                }, {
                    text: '意向客户',
                    name: 'customer',
                    href: 'customers'
                }, {
                    text: '补课管理',
                    name: 'buke',
                    href: 'bukeManage'
                }, {
                    text: '成绩录入',
                    name: 'examScore',
                    href: 'score'
                },{
                    text: '班级花名册',
                    name: 'renewal',
                    href: 'renewalClass'
                }]
            }
        },
        methods: {
            ...Vuex.mapMutations([
                'set_currole'
            ]),
            judgeShow(item) { //判断菜单显示隐藏
                if (app.sysInfo.parentMessageTo == 0) { //上课点评、作业、通知
                    if (item.name == 'comment' || item.name == 'homework' || item.name == 'notice') {
                        return false;
                    }
                }
                if (item.name == 'attendance' && !app.tool.op('CourseBegin') && !app.tool.op('CourseBeginLimit') && !app.tool.op('CourseBeginCancel') && !app.tool.op('CourseCancel') && !app.tool.op('CourseStudentEdit') && !app.tool.op('CourseBeginTimeEdit') && !app.tool.op('CoursePlanForOne') && !app.tool.op('CoursePlanForGroup')) { //上课点名
                    return false;
                }
                if (item.name == 'customer' && app.sysInfo.EnableCustomerOnMobile != '1') { //意向客户管理菜单
                    return false;
                }
                if (item.name == 'communication' && app.sysInfo.EnableStudentCommunicationOnMobile != '1') { //学员沟通管理菜单
                    return false;
                }
                if (item.name == 'buke' && !app.tool.op('MissStudentPlanCourse')) { //补课管理菜单
                    return false;
                }
                if (item.name == 'examScore' && !app.tool.op('ExamScoreQuery') && !app.tool.op('ExamQuery')) { //成绩录入菜单
                    return false;
                }
                // xyx定制 班级花名册
                if(item.name == 'renewal'&& (app.sysInfo.ShowStudentClasses!=1||!app.tool.op('QueryClassStudents'))){
                    return false
                }
                return true;
            },
            goTo(item) {
                if (item.href) {
                    this.$router.push(`/${item.href}`);
                }
            },
            loadData() {
                processGet({
                    pname: 'main',
                    currole: app.sysInfo.currole.Id
                }).then(res => {
                    if (res.errcode === app.errok) {
                        let currentRole;

                        app.sysInfo.RoleList.forEach(role => {
                            if (role.Id == res.currole) {
                                currentRole = role;
                            }
                        });

                        this.set_currole(currentRole);
                        app.sysInfo = Object.assign(app.sysInfo, res.data, {
                            currole: currentRole,
                            changePassword: res.changePassword,
                            parentMessageTo: res.parentMessageTo
                        });
                        this.publicInfoNums = res.data.publicInfo;
                    }
                });
            }
        },
        watch: {
            $route(to, from) {
                if (to.name === 'home' && to.params.homeIndex !== from.params.homeIndex && to.params.homeIndex === '0') {
                    this.loadData();
                }
            }
        }
    }
</script>