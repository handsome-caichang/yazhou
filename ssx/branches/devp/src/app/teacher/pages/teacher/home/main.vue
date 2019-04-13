<!-- 老师端首屏 -->
<style scoped lang="scss">
    .main-teacher {
        background-color: $color-white;
        .banner-wrap {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 46.7%;
            .banner {
                @include position-absolute;
                .banner-item {
                    display: block;
                    height: 100%;
                    @include background-img(false, cover);
                    background-color: $color-assist-1;
                }
            }
        }
        // .role-wrap{
        //     height: 50px;
        //     line-height: 50px;
        //     background-color: $color-white;
        //     padding: 0 13px;
        //     color: $color-6;
        //     .role-name{
        //         color: #FF7700;
        //         .icon{
        //             width: 10px;
        //             height: 14px;
        //         }
        //     }
        // }
        // .void{
        //     height: 5px;
        //     width: 100%;
        //     background-color: #EEF1F6;
        // }
        .role{
            @include position-absolute;
        }
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
                            background-image: url("./img/labelsprite.png");
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
                            // &.communication {
                            //     background-position: 0 -220px;
                            // }
                            &.notice {
                                background-position: 0 -275px;
                            }
                            &.publicInfo {
                                background-position: 0 -330px;
                            }
                            // &.customer {
                            //     background-position: 0 -385px;
                            // }
                            &.buke {
                                background-position: 0 -440px;
                            }
                            // &.examScore {
                            //     background-position: 0 -495px;
                            // }
                            // &.renewal {
                            //     background-position: 0 -550px;
                            // }
                            &.dataScreen {
                                background-position: 0 -605px;
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
    }
</style>

<template>
    <scroller-base
            class="scroller main-teacher"
            ref="scrollBar"
            :data="currole">
        <!-- banner图  -->
        <div class="banner-wrap">
            <slider class='banner' :autoPlay="true">
                <a class="banner-item"
                   v-for="banner in banneres"
                   :style="'background-image:url('+ banner.Image + ')'"
                ></a>
            </slider>
        </div>
        <!--切换角色
        <div class="role-wrap" @click="changeRole" ref="userRole">当前身份：
            <span class="role-name">
                {{currole.Name}}
                <svg class="icon" aria-hidden="true" v-if="app.sysInfo.RoleList&&app.sysInfo.RoleList.length>1">
                    <use :xlink:href="roleFlag?'#icon-xuanzeshenfen-shang':'#icon-xuanzeshenfen-xia'"></use>
                </svg>
            </span>
        </div>
        <div class="void"></div>
        -->
        <!-- 老师端和校长端组件 
        <component :is="current"></component>
        -->
        <div class="section-wrap">
            <div class="section-item"
                    v-show="judgeShow(item)"
                    v-for="(item,index) in list"
                    :key="index"
                    @click="goTo(item)">
                <div class="square">
                    <div class="describe">
                        <div class="section-icon" :class="item.name">
                            <span class="num" v-if="item.name=='publicInfo'&&data.publicinfocount>0">{{data.publicinfocount>99?'99+':data.publicinfocount}}</span>
                        </div>
                        {{item.text}}
                    </div>
                </div>
            </div>
        </div>
    </scroller-base>
</template>

<script>
    import {gethomepageinfo} from 'teacher/api/personal-center.js';

    export default {
        name: 'main-page',
        data() {
            return {
                roleFlag: false, //身份切换
                data: {},
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
                }, /*{
                    text: '学员沟通管理',
                    name: 'communication',
                    href: 'communicationList'
                },*/ {
                    text: '通知',
                    name: 'notice',
                    href: 'noticeList'
                }, {
                    text: '学校公告',
                    name: 'publicInfo',
                    href: 'announcementList'
                }, /* {
                    text: '意向客户',
                    name: 'customer',
                    href: 'customers'
                }, */ {
                    text: '补课管理',
                    name: 'buke',
                    href: 'bukeManage'
                }, /* {
                    text: '成绩录入',
                    name: 'examScore',
                    href: 'score'
                }, {
                    text: '班级花名册',
                    name: 'renewal',
                    href: 'renewalClass'
                },*/{
                    text: '校长报表',
                    name: 'dataScreen',
                    href: 'dataScreen'
                }]
            }
        },
        computed:{
            ...Vuex.mapState([
				'currole'
            ]),
            // current(){
            //     return this.currole.Id == 1024 ? MainMaster : MainTeacher
            // },
            banneres() {
                return [{
                    "Image": require('./img/banner001.jpg')
                }]
            }
		},
        created(){
			if (this.$route.name==='home' && this.$route.params.homeIndex==='0') {
				this.loadData();
			}
		},
        methods: {
            ...Vuex.mapMutations([
                'set_currole'
            ]),
            changeRole() {
                if(app.sysInfo.RoleList&&app.sysInfo.RoleList.length<2){
                    return
                }
                this.roleFlag = true;
                app.eventDefine.emit('mainTeacherchangeRole');
            },
            closeDor(){
                this.roleFlag = false;
            },
            judgeShow(item) { //判断菜单显示隐藏
                if (app.sysInfo.parentMessageTo == 0) { //上课点评、作业、通知
                    if (item.name == 'comment' || item.name == 'homework' || item.name == 'notice') {
                        return false;
                    }
                }
                if (item.name == 'attendance' && !app.tool.op('CourseBegin') && !app.tool.op('CourseBeginLimit') && !app.tool.op('CourseBeginCancel') && !app.tool.op('CourseCancel') && !app.tool.op('CourseStudentEdit') && !app.tool.op('CourseBeginTimeEdit') && !app.tool.op('CoursePlanForOne') && !app.tool.op('CoursePlanForGroup')) { //上课点名
                    return false;
                }
                // if (item.name == 'customer' && app.sysInfo.EnableCustomerOnMobile != '1') { //意向客户管理菜单
                //     return false;
                // }
                if (item.name == 'communication' && app.sysInfo.EnableStudentCommunicationOnMobile != '1') { //学员沟通管理菜单
                    return false;
                }
                // if (item.name == 'buke' && !app.tool.op('MissStudentPlanCourse')) { //补课管理菜单
                //     return false;
                // }
                if (item.name == 'examScore' && !app.tool.op('ExamScoreQuery') && !app.tool.op('ExamQuery')) { //成绩录入菜单
                    return false;
                }
                // xyx定制 班级花名册
                // if(item.name == 'renewal'&& (app.sysInfo.ShowStudentClasses!=1||!app.tool.op('QueryClassStudents'))){
                //     return false
                // }
                return true;
            },
            goTo(item) {
                if (item.href) {
                    this.$router.push(`/${item.href}`);
                }
            },
            loadData() {
                gethomepageinfo().then(res => {
                    if(res.result.code == app.errok) {
                        this.data = res.data;
                    }
                })
            }
        },
        mounted() {
            window.teacherHome = this;
            app.eventDefine.on('roleActionSheetChangeArrow', this.closeDor);
        },
        beforeDestroy() {
            app.eventDefine.off('roleActionSheetChangeArrow');
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