<!-- 上课点评（班级）列表 -->
<style scoped lang="scss">
    
    

    .comment-list-container {
        background-color: $color-assist-1;
        .header {
            background-color: $color-white;
            padding: 8px 12px;
            margin-bottom: 10px;
            height: 44px;
            line-height: 28px;
            @include flex-between;
            @include border-bottom;
            .date-filter {
                display: flex;
                .date-btn {
                    width: 112px;
                    font-size: 12px;
                    text-align: center;
                    border-radius: 50px;
                    border: 1px solid $color-assist-1;
                }
            }
            .date-search {
                width: 48px;
                text-align: center;
                border-radius: 50px;
                background-color: $color-assist-1;
            }
        }
        .list-body {
            @include position-absolute(52px, 0, 0, 0);
            .card {
                height: 79px;
                padding: 12px 75px 12px 12px;
                position: relative;
                background-color: $color-white;
                @include border-bottom;
                .card-fl {
                    height: 55px;
                    color: $color-6;
                    font-size: 12px;
                     .icon{
                        margin-right: 5px;
                    }
                    .name {
                        @include ellipsis-single;
                        color: $color-3;
                        font-size: 16px;
                        height: 17px;
                        line-height: 17px;
                        margin-bottom: 10px;
                    }
                    .room, .date {
                        height: 13px;
                        line-height: 13px;
                    }
                    .room{
                        @include ellipsis-single;
                    }
                    .date{
                        margin-top: 5px;
                        .date-time,.date-md{
                            margin-right: 15px;
                        }
                    }
                }
                .card-fr {
                    max-width: 75px;
                    height: 55px;
                    position: absolute;
                    right: 12px;
                    top: 12px;
                    color: $color-6;
                    text-align: center;
                    .text {
                        font-size: 12px;
                        height: 24px;
                        line-height: 24px;
                    }
                    .counts {
                        font-size: 16px;
                        height: 34px;
                        line-height: 34px;
                        .bright {
                            color: #1b70f2;
                        }
                    }
                }
            }
        }
        .scroller {
            overflow: hidden;
            background-color: #EEF1F6;
            @include position-absolute;
        }

    }
    .noData-temp,
    .as-state{
        @include position-absolute;
    }
    .as-state {
        z-index: 2;
    }
    .loading{
        @include position-absolute(54px, 0, 0, 0);
    }

</style>

<template>
    <div class="comment-list-container">
        <!-- 头部日期筛选 -->
        <div class="header">
            <div class="date-filter">
                <date-bar
                        :sdate='dateObj.startdate'
                        :edate='dateObj.enddate'
                        :index="quickDateIndex"
                        @changeDate="changeDate">
                </date-bar>
            </div>
            <!--<div @click="openStateActionsheet" class="date-search">-->
                <!--筛选-->
            <!--</div>-->

        </div>
        <!-- 内容部分 -->
        <div class="list-body">
            <scroller-super
                    class="scroller"
                    :type="2"
                    :data="list"
                    :pagingOption="pagingOption"
                    @loadData="loadData"
                    ref="commentListScroller">
                <router-link tag="div" class="card" v-for="item in list" :to="`/commentStudentsList/${item.courseid}/${item.startdate}/${item.time||'00:00~23:59'}`" :key="item.id">
                    <div class="card-fl">
                        <div class="name">{{item.classname}}</div>
                        <div class="room">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-jiaoshi1"></use>
                            </svg>{{item.classroom}}</div>
                        <div class="date">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-shijian1"></use>
                            </svg><span class="date-md">{{item.startdate.replace(/-/,'.')}}</span>
                            <!-- 注意：重构是用time字段表示，不需要用unit做判断，后台已经做了判断 -->
                            <span class="date-time" v-if="item.unit!==3">{{item.starttime}}~{{item.endtime}}</span>
                        </div>
                    </div>
                    <div class="card-fr">
                        <div class="text">点评</div>
                        <div class="counts">
                            <span :class="{bright:item.evaluatecount!=item.attendcount}">
                                {{item.evaluatecount}}</span>/<span>{{item.attendcount}}</span>
                        </div>
                    </div>
                </router-link>
            </scroller-super>
            <empty-page class="noData-temp" :type="1" text="还没有课可以点评" v-if="list.length == 0"></empty-page>
        </div>
        <loading class="loading" v-show="isLoading" :isDefault="false"></loading>
        <!--选择点评状态的筛选-->
        <state-actionsheet
                @stateType="acceptType"
                class="as-state"
                :stateTitle="state.stateTitle"
                :stateList="state.stateList"
                :curState="state.curState"
                :opened.sync="openState">
        </state-actionsheet>
    </div>

</template>

<script>
    import {gettechercourseevaluate} from "teacher/api/comment"; //获取课程评价
    import EmptyPage from 'teacher/components/common/empty-page/empty-page';
    import StateActionsheet from 'teacher/components/common/actionsheets/state-actionsheet.vue';

    export default {
        name: 'comment-list',
        data() {
            return {
                wxTitle: "上课点评",
                isLoading: true,
                openState: false,
                state:{
                    curState:2,
                    stateTitle:"学生点评情况筛选",
                    stateList:["全部", "未点评", "部分已评", "全已评"],
                },
                quickDateIndex:-1,
                dateObj:{
                    startdate:"",
                    enddate:""
                },
                list: [],
                pagingOption: {
                    api: gettechercourseevaluate,
                    params: {
                        startdate:'',
                        enddate:'',
                        page:{
                            pagesize:10
                        }
                    }
                },
                imgsNum: 0
            }
        },
        methods: {
            loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    this.isLoading = false;
                    if (res.result.code == app.errok) {
                        if (res.page.pageindex === 1) {
                            this.list = [];
                        }
                        res.data.forEach(item=>{
                            item.startdate = item.startdate.substring(5,10);//03-25
                            //拼接一下item.time
                            if(0){//是否按月
                                item.time = '00:00~23:59';
                            }else{
                                item.time = item.starttime+'~'+item.endtime;
                            }
                        })
                        this.list = this.list.concat(res.data);
                    }
                })
            },
            openStateActionsheet() {
                this.openState = !this.openState;
            },
            acceptType(type) {
                this.isLoading = true;
                this.list = [];
                this.$refs.commentListScroller.refresh({'type':type});
            },
            changeDate(obj){
                this.dateObj.startdate = obj.sdate;
                this.dateObj.enddate = obj.edate;
                this.quickDateIndex = obj.index;
                this.isLoading = true;
                this.$refs.commentListScroller.refresh(this.dateObj);
            },
            handleEmit(){
                this.$refs.commentListScroller.refresh();
            }
        },
        created() {
            //推送可以在此判断 只需要对日期做处理即可
            let pushObj = app.tool.parseHash().query;
            if(app.tool.isEmptyObject(pushObj)){
                //界面显示
                this.dateObj.startdate = app.tool.getDatesByIndex(3).sdate;
                this.dateObj.enddate = app.tool.getDatesByIndex(3).edate;
                //传参
                this.pagingOption.params.startdate = app.tool.getDatesByIndex(3).sdate;
                this.pagingOption.params.enddate = app.tool.getDatesByIndex(3).edate;
            }else{
                //界面显示
                this.dateObj.startdate = pushObj.sdate;
                this.dateObj.enddate = pushObj.edate;
                //传参
                this.pagingOption.params.startdate = pushObj.sdate;
                this.pagingOption.params.enddate = pushObj.edate;
            }

        },
        mounted() {
            app.eventDefine.on('commentSave',this.handleEmit);
            app.eventDefine.on('commentRevoke',this.handleEmit);
        },
        beforeDestroy() {
            app.eventDefine.off('commentSave',this.handleEmit);
            app.eventDefine.off('commentRevoke',this.handleEmit);
        },
        components: {
            EmptyPage,
            StateActionsheet
        }
    }
</script>