<!-- 满班率/出勤率/续费率 -->
<style scoped lang="scss">
.page {
    background-color: #eef1f6;
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
}
.title-box,
.item-box {
    display: flex;
    padding: 0 14px 0 15px;
    .column1,
    .column2 {
        flex: 2;
    }
    .column3 {
        flex: 1;
    }
}
.title-box {
    margin-top: 10px;
    height: 34px;
    line-height: 34px;
    color: $color-3;
    font-size: 13px;
    background-color: #f2f2f2;
    @include border-top(#dedede);
    @include border-bottom(#dedede);
}
.body {
    background-color: $color-white;
    .item-box {
        height: 44px;
        line-height: 44px;
        @include border-bottom(#eef1f6);
        .column2 {
            color: #1e88f5;
        }
        .column3 {
            color: #f5a206;
        }
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
        </div>
        <div class="title-box">
            <div class="column1">校区</div>
            <div class="column2">班级数</div>
            <div class="column3">{{this.wxTitle}}</div>
        </div>
        <scroller-load class="body" :pagingOption='pagingOption' @loadData = 'loadData'>
            <div class="item-box" v-for="item in list" @click="gotoPage('fullClassRateDetail')"> 
                <div class="column1">{{item.campusname}}</div>
                <div class="column2">{{item.classtotal}}</div>
                <div class="column3">{{item.precent}}</div>
            </div>
           
        </scroller-load>

        <time-filter :opened.sync="openTimeActionsheet"  @callback='afterTimerFilter'></time-filter>
    </div>
</template>

<script>
import TimeFilter from "./child/time-filter.vue";
import {
    getmfullclassrate,
    getmattendrate,
    getmlossrate
} from "../../../api/report.js";
import mixin from "./option/mixin.js";

export default {
    name: "fullClassRateReport",
    mixins: [mixin], //时间选择器公用代码

    data() {
        return {
            wxTitle: "满班率",
            openTimeActionsheet: false, //选择时间间隔
            type: 1, //类型：满班率、出勤率、续费率,
            pagingOption: {
                api: null,
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
        };
    },
    methods: {
        triggerTimeSearch() {
            this.openTimeActionsheet = true;
        },
        gotoPage(path) {
            this.$router.push(`/${path}?type=${this.type}`);
        },
        refreshTabel() {
            
        },
        loadData(promise){
            promise.then(res =>{
                console.log(res)
                if(res.result.code == app.errok){
                    if(res.page.pageindex == 1){
                        this.list = res.data;
                    }else{
                        this.list = this.list.concat(res.data)
                    }
                }else{
                    app.toast(res.result.msg)
                }
            })
        }
    },
    created() {
        this.type = this.$route.query.type;
        this.wxTitle =
            this.type == 1 ? "满班率" : this.type == 2 ? "出勤率" : "续费率";
        this.pagingOption.api =
            this.type == 1
                ? getmfullclassrate
                : this.type == 2
                    ? getmattendrate
                    : getmlossrate;
    },
    components: {
        TimeFilter
    }
};
</script>