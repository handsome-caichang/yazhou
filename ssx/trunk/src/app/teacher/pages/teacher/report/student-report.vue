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
                <div class="left" @click="changeTime(-1)">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-sanjiaoxing-copy"></use>
                    </svg>
                </div>
                2018.12.01～2018.12.30
                <div class="center">
                    <svg class="icon" aria-hidden="true" @click.stop.prevent="triggerTimeSearch">
                        <use xlink:href="#icon-zhou"></use>
                    </svg>
                </div>
                <div class="left" @click="changeTime(1)">
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
            <div slot="col0" slot-scope="{item}" class="ellipsis-multi">{{item.Name}}</div>
            <div slot="cell" slot-scope="{item,index}">
                <span :class="getColumnClass(index,item.value||item.Value)">{{item.value||item.Value}}</span>
            </div>
            <div slot="sum" slot-scope="{item,index}">
                <div :class="getColumnClass(index+'',item.value||item.Value)">{{item.value||item.Value}}</div>
            </div>
        </scroller-table>
        <loading class="loading" v-show="isLoading"></loading>
        <time-filter :opened.sync="openTimeActionsheet"></time-filter>
    </div>
</template>

<script>
    import ScrollerTable from 'teacher/components/common/scroller-table/scroller-table.vue';
    import TimeFilter from './child/time-filter.vue';
    import {QueryNetEarningArea} from 'teacher/api/feeReport.js';
    const today = app.filters.formatDatetime(new Date(),'yyyy-MM-dd');

    export default {
        name: 'studentReport',
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
					api: QueryNetEarningArea,
					params: {
                        sdate: '2018-02-14',
                        edate: today,
					},
					pageOpt: {
						// 分页初始页码的'key'、'value'
						indexKey: "PageIndex",
						indexVal: 1,
						// 每页请求数据长度的'key'、'value'
						sizeKey: "PageSize",
						sizeVal: 20,
						// 后端返回的总页数'key'
						countKey: "PageCount"
					}
				}
            }
        },
        methods: {
            changeTime(type) {

            },
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
            loadData(promise){                
                promise.then(({Data})=>{
                    this.isLoading = false;
                    Data.dataList.forEach(item=>{
                        item.List = [{Value:item.PayFactMoney},{Value:item.FeeRufundMoney},{Value:item.NetEarningMoney},{Value:item.PayFactMoney}];
                    })
                    this.tableData.push(...Data.dataList);
                })
            },
            loadFirst(promise){
                promise.then(({Data})=>{
                    this.isLoading = false;
                    this.sum = [{Value:Data.SumPayFact},{Value:Data.SumFeeRufund},{Value:Data.SumNetEarning},{Value:Data.SumPayFact}];                    
                    this.tableData = [...Data.dataList];
                })
            }
        },
        components:{
            TimeFilter,
            ScrollerTable
        }  
    }
</script>