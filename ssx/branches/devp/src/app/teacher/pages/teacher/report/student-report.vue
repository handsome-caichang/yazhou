<!-- 学员概况 -->
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
        background-color: #EEF1F6;
    }
    .loading{
        @include position-absolute(35px, 0, 0, 0);
    }
</style>
<style lang="scss">
    #studentReportTable {
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
            background-color: #F2F2F2;
            border-bottom: 1px solid #dedede;
        }
        div.row-end .cell {
            height: 49px;
            border-top: 1px solid rgba(235,235,235,1);
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
        .green {
            color: #7ED321;
        }
        .red {
            color: #FD6654;
        }
        .orange {
            color: #F5A206;
        }
        .black {
            color: #333333;
        }
        .disable {
            color: $color-9;
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
        </div>
        <div class="split"></div>
        <scroller-table 
            id= "studentReportTable"
            ref= "table"
            :cols="cols" 
            :sum="sum" 
            :data="tableData"   
            :mainName="mainName" 
            :pagingOption="pagingOption"    
            @loadFirst="loadFirst" 
            @loadData="loadData">
            <div slot="col0" slot-scope="{item}" class="ellipsis-multi">{{item.campusname}}</div>
            <div slot="cell" slot-scope="{item,index}">
                <span :class="getColumnClass(index,item.value||item.Value)">{{item.value||item.Value}}</span>
            </div>
            <div slot="sum" slot-scope="{item,index}">
                <div :class="getColumnClass(index+'',item.value||item.Value)">{{item.value||item.Value}}</div>
            </div>
        </scroller-table>
        <loading class="loading" v-show="isLoading"></loading>
        <time-filter :opened.sync="openTimeActionsheet" @callback='afterTimerFilter'></time-filter>
    </div>
</template>

<script>
    import ScrollerTable from 'teacher/components/common/scroller-table/scroller-table.vue';
    import TimeFilter from './child/time-filter.vue';
    import {getmstudentdetail} from 'teacher/api/report.js';
    import mixin from "./option/mixin.js";
    const Today = app.filters.formatDatetime(new Date(),'yyyy-MM-dd');

    export default {
        name: 'studentReport',
         mixins: [mixin], //时间选择器公用代码
        data() {
            return {
                wxTitle: '学员概况',
                cols: [{Name:'在读'},{Name:'新增'},{Name:'休学'},{Name:'退学'}],
                sum: [], //合计行
                tableData: [], //表格数据
                mainName: '校区',
                openTimeActionsheet: false, //选择时间间隔
                isLoading: false,
                pagingOption: {
					api: getmstudentdetail,
					params: {
                        rangestart: app.tool.getDatesByIndex(
                            2,
                            app.localTimeToServer
                        ).sdate,
                        rangeend: app.tool.getDatesByIndex(2, app.localTimeToServer)
                            .edate,
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
            }
        },
        methods: {
            
            getColumnClass(index,val) {
                let i = index.substring(0,1);
                if(val==0) {
                    return 'disable';
                }
                if(i==1||i==4) {
                    return 'green';
                }else if(i==2||i==5) {
                    return 'red';
                }else if(i==3||i==6) {
                    return 'orange';
                }else {
                    return 'black';
                }
            },
            triggerTimeSearch() {
                this.openTimeActionsheet = true;
            },
            loadData(promise) {
                promise.then(res=>{
                    // console.log('打印',res);
                    // this.isLoading = false;

                    // res.data.forEach(item=>{
                    //     item.List = [{Value:item.onread},{Value:item.newadd},{Value:item.stopped},{Value:item.outed}];
                    // })
                    // this.tableData.push(...res.data);
                    res.result.code = 200;
                if (res.result.code == app.errok) {
                    this.isLoading = false;
                    res.data.forEach(item => {
                        item.List = [
                            { Value: item.onread },
                            { Value: item.newadd },
                            { Value: item.stopped },
                            {Value:item.outed}
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
                })
            },
            loadFirst(promise){
                promise.then(res=>{
                    res.result.code = 200;
                    // console.log('first')
                    // this.isLoading = false;
                    // this.sum = [{Value:res.datatotal.onread},{Value:res.datatotal.newadd},{Value:res.datatotal.stopped},{Value:res.datatotal.outed}];                    
                    // this.tableData = [...res.data];
                     this.isLoading = false;
                    if (res.result.code == app.errok) {
                        this.sum = [
                            { Value: res.datatotal.onread },
                            { Value: res.datatotal.newadd },
                            { Value: res.datatotal.stopped },
                            {Value:res.datatotal.outed}
                        ];
                        // this.tableData = [...res.data];
                    } else {
                        app.toast(res.result.msg);
                    }
                })
            }
        },
        components:{
            TimeFilter,
            ScrollerTable
        }  
    }
</script>