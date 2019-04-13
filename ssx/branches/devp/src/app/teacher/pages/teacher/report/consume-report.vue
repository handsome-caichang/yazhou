<!-- 课消数据 -->
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
        .subject-box {
            min-width: 90px;
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
.split {
    height: 10px;
    background-color: #eef1f6;
}
.loading {
    @include position-absolute(35px, 0, 0, 0);
}
</style>
<style lang="scss">
#consumeReportTable {
    height: calc(100% - 45px);
    div.row-start {
        border-top: 1px solid #dedede;
    }
    div.row-end {
        border-top: none;
    }
    div.row-start .cell {
        height: 34px;
        font-size: 13px;
        font-weight: normal;
        background-color: #f2f2f2;
        border-bottom: 1px solid #dedede;
    }
    div.row-end .cell {
        height: 49px;
        border-top: 1px solid rgba(235, 235, 235, 1);
        border-bottom: none;
        background-color: #fff;
    }
    div.content {
        height: calc(100% - 78px);
        div.cell.col1 {
            &:first-child {
                border-top: none;
            }
        }
    }
    .orange {
        color: #f5a206;
    }
    .black {
        color: #333333;
    }
    .no-data {
        top: 35px;
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
        <div class="split"></div>
        <scroller-table id="consumeReportTable" ref="table" :cols="cols" :sum="sum" :data="tableData" :mainName="mainName" :pagingOption="pagingOption" @loadFirst="loadFirst" @loadData="loadData">
            <div slot="col0" slot-scope="{item}" class="ellipsis-multi">{{item.campusname}}</div>
            <div slot="cell" slot-scope="{item,index}">
                <span :class="getColumnClass(index)">{{item.value||item.Value}}</span>
            </div>
            <div slot="sum" slot-scope="{item,index}">
                <div :class="getColumnClass(index+'')">{{item.value||item.Value}}</div>
            </div>
        </scroller-table>
        <time-filter :opened.sync="openTimeActionsheet" @callback='afterTimerFilter'></time-filter>
        <subject-filter :opened.sync="openSubjectActionsheet"></subject-filter>
    </div>
</template>

<script>
import ScrollerTable from "teacher/components/common/scroller-table/scroller-table.vue";
import SubjectFilter from "./child/subject-filter.vue";

import TimeFilter from "./child/time-filter.vue";
import { getmfeeconsume } from "teacher/api/report.js";

import mixin from "./option/mixin.js";

export default {
    name: "consumeReport",
    mixins: [mixin],//时间选择器公用代码
    data() {
        return {
            wxTitle: "课消数据",
            cols: [
                { Name: "课消数(课时)" },
                { Name: "课消数(天)" },
                { Name: "课消金额" }
            ],
            sum: [], //合计行
            tableData: [], //表格数据
            mainName: "校区",
            openTimeActionsheet: false, //选择时间间隔
            openSubjectActionsheet: false, //选择科目

            isLoading: false,
            // rangestart: app.tool.getDatesByIndex(2, app.localTimeToServer).sdate,
            // rangeend: app.tool.getDatesByIndex(2, app.localTimeToServer).edate,
            pagingOption: {
                api: getmfeeconsume,
                params: {
                    rangestart: app.tool.getDatesByIndex(                        2,                        app.localTimeToServer                    ).sdate,
                    rangeend: app.tool.getDatesByIndex(2, app.localTimeToServer)                        .edate,
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
            }
        };
    },

    methods: {
        refreshTabel() {
            this.$refs.table.pagingRefresh();
        },

        getColumnClass(index) {
            let i = index.substring(0, 1);
            if (i == 2) {
                return "orange";
            } else {
                return "black";
            }
        },

        triggerTimeSearch() {
            this.openTimeActionsheet = true;
        },
        triggerSubjectSearch() {
            this.openSubjectActionsheet = true;
        },
        loadData(promise) {
            promise.then(res => {
                console.log("打印", res);

                if (res.result.code == app.errok) {
                    this.isLoading = false;
                    res.data.forEach(item => {
                        item.List = [
                            { Value: item.feehours },
                            { Value: item.feedays },
                            { Value: item.amount }
                        ];
                    });
                    if (res.page.pageindex == 1) {
                        this.tableData = res.data;
                    } else {
                        this.tableData = this.tableData.concat(res.data);
                    }
                } else {
                    app.toast(res.msg);
                }
            });
        },
        loadFirst(promise) {
            promise.then(res => {
                this.isLoading = false;
                if (res.result.code == app.errok) {
                    this.sum = [
                        { Value: res.datatotal.feehours },
                        { Value: res.datatotal.feedays },
                        { Value: res.datatotal.amount }
                    ];
                    // this.tableData = [...res.data];
                } else {
                    app.toast(res.result.msg);
                }
            });
        }
    },
    components: {
        TimeFilter,
        ScrollerTable,
        SubjectFilter
    }
};
</script>