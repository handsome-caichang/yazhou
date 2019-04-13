<!-- 退费结算数据 -->
<style scoped lang="scss">
    .page {
        background-color: #EEF1F6;
    }
    .search-box {
        height: 35px;
        padding-right: 12px;
        color: $color-3;
        font-size: 12px;
        @include flex-between;
        background-color: $color-white;
        .time-box {
            display: flex;
            align-items: center;
            .left {
                width: 35px;
                @include flex-center;
                @media (max-width: 320px) {
                    width: 28px;
                }
            }
            .center {
                width: 30px;
                font-size: 18px;
                text-align: right;
                @media (max-width: 320px) {
                    width: 28px;
                }
            }
        }
        .subject-box {
            min-width: 90px;
        }
    }
    .title-box {
        margin-top: 10px;
        height: 34px;
        line-height: 34px;
        color: $color-3;
        font-size: 13px;
        background-color: #F2F2F2;
        @include border-top(#DEDEDE);
        @include border-bottom(#DEDEDE);
    }
    .body {
        position: absolute;
        left: 0;
        right: 0;
        top: 79px;
        bottom: 50px;
        .item-box {
            height: 44px;
            line-height: 44px;
            @include border-bottom(#EEF1F6);
            background-color: $color-white;
        }
    }
    .footer {
        height: 49px;
        line-height: 49px;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        font-weight: 500;
        background-color: $color-white;
        border-top: 1px solid rgba(235,235,235,1);
    }
    .title-box,
    .item-box,
    .footer {
        display: flex;
        padding: 0 14px 0 15px;
        color: $color-3;
        .column1 {
            flex: 1;
            @include ellipsis-single;
        }
        .column2,
        .column3 {
            flex: 1;
            padding: 0 5px;
            text-align: right;
        }
        .disable {
            color: $color-9 !important;
        }
    }
    .item-box,
    .footer {
        .column3 {
            color: #F5A206;
        }
    }
    .as-actionsheet {
        @include position-absolute;
        .item {
            height: 44px;
            line-height: 44px;
            padding: 0 12px;
            color: $color-3-s;
            @include ellipsis-single;
            @include flex-between;
            &.lighHeight {
                color: $color-primary;
            }
        }
    }
</style>

<template>
    <div class="page">
        <div class="search-box">
            <div class="time-box">
                <div class="left" @click="changeTime(false)">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-sanjiaoxing-copy"></use>
                    </svg>
                </div>
                {{
                range
                }}
                <div class="center">
                    <svg class="icon" aria-hidden="true" @click.stop.prevent="triggerTimeSearch">
                        <use :xlink:href="dateIcon"></use>
                    </svg>
                </div>
                <div class="left" @click="changeTime(true)">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-sanjiaoxing-copy-copy"></use>
                    </svg>
                </div>
            </div>
            <div class="subject-box" @click.stop.prevent="triggerSubjectSearch">文化课项目
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                </svg>
            </div>
        </div>
        <div class="title-box">
            <div class="column1">校区</div>
            <div class="column2">结算人次</div>
            <div class="column3">结算金额</div>
        </div>
        <scroller-load ref='table' class="body" :pagingOption='pagingOption' @loadData='loadData' @loadFirst = 'loadFirst'>
            <div class="item-box" v-for="item in list">
                <div class="column1">{{item.campusname}}</div>
                <div class="column2">{{item.persontime}}</div>
                <div class="column3">{{item.amount}}</div>
            </div>
            <div class="item-box" style="display:none"></div>
            
        </scroller-load>
        <div class="footer">
            <div class="column1">合计</div>
            <div class="column2">{{persontime}}</div>
            <div class="column3">{{amount}}</div>
        </div>

        <time-filter :opened.sync="openTimeActionsheet" @callback='afterTimerFilter'></time-filter>
        <subject-filter :opened.sync="openSubjectActionsheet"></subject-filter>
    </div>
</template>

<script>
    import TimeFilter from './child/time-filter.vue';
    import SubjectFilter from './child/subject-filter.vue';
    import mixin from "./option/mixin.js";
    import {getmfeerefund} from '../../../api/report.js';

    export default {
        name: 'refundReport',
        mixins: [mixin], //时间选择器公用代码
        data() {
            return {
                wxTitle: '退费数据',
                openTimeActionsheet: false, //选择时间间隔
                openSubjectActionsheet: false, //选择科目,
                persontime:0,//总计人数
                amount:0,//总计金额
                pagingOption: {
                    api: getmfeerefund,
                    params: {
                        rangestart: app.tool.getDatesByIndex(
                            2,
                            app.localTimeToServer
                        ).sdate,
                        rangeend: app.tool.getDatesByIndex(2, app.localTimeToServer)
                            .edate,
                        projectids: []
                    },
                    pageOpt: {
                        sortfield: "",
                        isdesc: false,
                        // 分页初始页码的'key'、'value'
                        indexKey: "pageindex",
                        indexVal: 1,
                        // 每页请求数据长度的'key'、'value'
                        sizeKey: "pagesize",
                        sizeVal: 20,
                        // 后端返回的总页数'key'
                        countKey: "totalpage"
                    }
                },
                list:[]
            }
        },
        methods: {
            triggerTimeSearch() {
                this.openTimeActionsheet = true;
            },
            triggerSubjectSearch() {
                this.openSubjectActionsheet = true;
            },
            refreshTabel() {
                this.$refs.table.pagingRefresh({
                    rangestart:this.pagingOption.params.rangestart,
                    rangeend:this.pagingOption.params.rangeend,
                    projectids:this.pagingOption.params.projectids,
                    page:{
                        sortfield: "",
                        isdesc: false,
                        pageindex:1,
                        pagesize:20
                    }
                })
            },
            loadData(promise){
                promise.then(res => {
                    console.log(res)
                    if(res.result.code == 200){
                        if(res.page.pageindex == 1){
                            this.list = res.data;
                        }else{
                            this.list = this.list.concat(res.data)
                        }
                    }else{
                        app.toast(res.result.msg)
                    }
                })
            },
            loadFirst(promise){
                promise.then(res => {
                    if(res.result.code == app.errok){
                        this.persontime = res.datatotal.persontime;
                        this.amount = res.datatotal.amount;
                    }
                })
            }
            
        },
        components:{
            TimeFilter,
            SubjectFilter
        }  
    }
</script>