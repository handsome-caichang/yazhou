<!-- 我的课表->签到记录 -->
<style scoped lang="scss">
    
    

    .course-details-container {
        .header{
            position: absolute;
            top: 0;
            width: 100%;
            height: 44px;
            line-height: 44px;
            display: flex;
            font-size: 15px;
            color: $color-9;
            padding: 0 12px;
            background-color: $color-white;
            .name{
                width: 40%;
            }
            .attendance,.charging{
                flex: 1;
                text-align: center;
            }
        }
        .void{
            width: 100%;
            height: 10px;
            background-color: $color-assist-1;
            position: absolute;
            top: 44px;
        }
        .footer{
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
            .ought{
                width: 40%;
            }
            .real,.charge{
                flex: 1;
                text-align: center;
            }
        }
        .as-details{
            @include position-absolute(54px,0,49px,0);
            font-size: 15px;
            .item{
                @include border-bottom;
                .word-area{
                    padding: 0 12px;
                    display: flex;
                    height: 44px;
                    line-height: 44px;
                    background-color: $color-white;
                    .name-area{
                        width: 40%;
                        display: flex;
                        .name{
                            @include ellipsis-single;
                            &.narrow{
                                max-width: 56%;
                            }
                        }
                        .svg-area{
                            padding: 0 5px;
                            line-height: 38px;
                            .icon{
                                width: 9px;
                                height: 9px;
                            }
                        }
                        .leave{
                            padding: 14px 5px;
                            .jia{
                                height: 14px;
                                line-height: 14px;
                                font-size: 12px;
                                text-align: center;
                                padding: 1px 3px;
                                color: #FFFFFF;
                                border-radius: 2px;
                                background-color: #F5A623;
                            }
                        }
                    }
                    .hook{
                        flex: 1;
                        text-align: center;
                        @include ellipsis-single;
                        .absent{
                            @include ellipsis-single;
                            color: red;
                        }
                    }
                }
                .tel-area{
                    background-color: $color-assist-1;
                    text-decoration:none;
                    height: 40px;
                    line-height: 40px;
                    padding: 0 12px;
                    font-size: 13px;
                    color: $color-9;
                    @include flex-between;
                    .tel-logo{
                        font-size: 20px;
                    }
                }
            }
        }
        .loading,.noData-temp{
            @include position-absolute;
        }
    }
</style>

<template>
    <div class="course-details-container">
        <div class="header">
            <div class="name">姓名</div>
            <div class="attendance">是否出勤</div>
            <div class="charging">是否计费</div>
        </div>
        <div class="void"></div>
        <scroller-base class="as-details" :data="renderData">
            <div class="item" v-for="item in list" :key="item.id">
                <div class="word-area">
                    <div class="name-area" @click="seeTel(item)">
                        <div class="name" :class="{'narrow':item.showTel||item.isattendstauts==1}">{{item.name}}</div>
                        <div class="svg-area" v-if="item.showTel">
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="item.telSwitch==true?'#icon-sanjiaoxing2':'#icon-sanjiaoxing1'"></use>
                            </svg>
                        </div>
                        <div class="leave" v-if="item.isattendstauts==1">
                            <div class="jia">请假</div>
                        </div>
                    </div>
                    <div class="hook">
                        <div v-if="item.isattend==1">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-gouxuan"></use>
                            </svg>
                        </div>
                        <div class="absent" v-else-if="item.isattend==0">
                            {{item.absentcausename}}
                        </div>
                    </div>
                    <div class="hook">
                        <div v-if="item.iscost>0">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-gouxuan"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <a :href="'tel:'+item.smstel" class="tel-area" v-show="item.showTel&&item.telSwitch">
                    <div class="tel">电话：{{item.smstel}}</div>
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
    import {getattendance} from "teacher/api/course";
    import EmptyPage from "teacher/components/common/empty-page/empty-page";
    export default {
        name: "course-records",
        data() {
            return {
                wxTitle: '上课人数',
                list:[],
                isLoading:true,
                jifei:0,//计费数量
                shidao:0,//实到数量
                clickNum:0
            }
        },
        computed: {
            renderData() {
                return {
                    list: this.list,
                    clickNum:this.clickNum
                }
            }
        },
        methods: {
            getData(id) {
                getattendance({
                    courseid: id
                }).then(res => {
                    this.isLoading = false;
                    if (res.result.code == app.errok) {
                        res.data.students.length>0&&res.data.students.forEach(item=>{
                            item.showTel = app.sysInfo.showtelwhencourseconfirm==1;//有没有权限查看电话号码(配置项控制)
                            item.telSwitch = false;//展示电话的开关
                            item.isattend==1&&this.shidao++;//出勤数量统计
                            item.iscost>0&&this.jifei++;//计费数量统计
                        });
                        this.list = res.data.students;
                    } else {
                        app.toast('error', res.result.msg)
                    }
                })
            },
            seeTel(item){
                item.telSwitch = !item.telSwitch;
                this.clickNum++;
            }
        },
        created() {
            this.getData(this.$route.query.id);
        },
        components:{
            EmptyPage
        }
    }
</script>

