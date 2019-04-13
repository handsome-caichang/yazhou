<!-- 销售数据 -->
<style lang="scss" scoped>
    .sale-report {
        @include position-absolute;
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
            // .subject-box {
            //     min-width: 90px;
            // }
        }
        .split {
            height: 10px;
            background-color: #EEF1F6;
        }
        .loading{
            @include position-absolute(35px, 0, 0, 0);
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
    }
</style>
<style lang="scss">
    #saleReportTable {
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
    <div class="sale-report">
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
            <!--<div class="subject-box" @click.stop.prevent="triggerSubjectSearch">文化课项目
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                </svg>
            </div>-->
        </div>
        <div class="split"></div>
        <scroller-table 
            id= "saleReportTable"
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
        <time-filter :opened.sync="openTimeActionsheet"  @callback='afterTimerFilter'></time-filter>
        <!--<subject-filter :opened.sync="openSubjectActionsheet"></subject-filter>-->
    </div>
</template>

<script>
    import {QueryNetEarningArea} from 'teacher/api/feeReport.js';
    import TimeFilter from './child/time-filter.vue';
    // import SubjectFilter from './child/subject-filter.vue';
    import ScrollerTable from 'teacher/components/common/scroller-table/scroller-table.vue';
    import mixin from "./option/mixin.js";
    const Today = app.filters.formatDatetime(new Date(),'yyyy-MM-dd');

    export default {
        name: 'sale-report',
        mixins: [mixin], //时间选择器公用代码
        data(){
            return {
                wxTitle: '销售数据',
                cols: [{Name:'实收'},{Name:'预存'},{Name:'充值'},{Name:'新增'},{Name:'续费'},{Name:'扩科'},{Name:'其他'}],        //列名
                sum: [], //合计行
                tableData: [], //表格数据
                mainName: '校区',
                openTimeActionsheet: false, //选择时间间隔
                // openSubjectActionsheet: false, //选择科目
                isLoading: false,
                pagingOption: {
					api: QueryNetEarningArea,
					params: {
                        sdate: '2018-12-01',
                        edate: Today,
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
        methods:{
     
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
            // triggerSubjectSearch() {
            //     this.openSubjectActionsheet = true;
            // },
            refresh(){
                this.isLoading = true;
                this.$refs.table.pagingRefresh({
                    sdate: this.sdate,
                    edate: this.edate,
                });
            },
            loadData(promise){                
                promise.then(({Data})=>{
                    this.isLoading = false;
                    Data.dataList.forEach(item=>{
                        item.List = [{Value:item.PayFactMoney},{Value:item.FeeRufundMoney},{Value:item.NetEarningMoney},{Value:item.PayFactMoney},{Value:item.FeeRufundMoney},{Value:item.NetEarningMoney},{Value:item.NetEarningMoney}];
                    })
                    this.tableData.push(...Data.dataList);
                })
            },
            loadFirst(promise){
                promise.then(({Data})=>{
                    this.isLoading = false;
                    this.sum = [{Value:Data.SumPayFact},{Value:Data.SumFeeRufund},{Value:Data.SumNetEarning},{Value:Data.SumPayFact},{Value:Data.SumFeeRufund},{Value:Data.SumNetEarning},{Value:Data.SumNetEarning}];                    
                    this.tableData = [...Data.dataList];
                })
            }
        },
        components:{
            ScrollerTable,
            TimeFilter,
            // SubjectFilter
        }        
    }
</script>