<style lang="scss" scoped>
    .net-earning {
        @include position-absolute;
        .search-bar{
            height:50px;
            @include flex-between;
            padding:0 10px;
        }

        .scroller-table{
            height:calc(100% - 50px);
        }


        .loading{
           @include position-absolute(50px, 0, 0, 0);
        }
    }

</style>

<template>
    <div class="net-earning">
        <div class="search-bar">
            <date-bar class="date-bar"
                :sdate='sdate'
                :edate='edate'
                :index="quickDateIndex"
                @changeDate="changeDate">
            </date-bar>
        </div>

        <scroller-table 
            ref= "table"
            class="scroller-table"
            :cols="cols" :sum="sum" :data="tableData"   
            :mainName="mainName" :pagingOption="pagingOption"    
            @loadFirst="loadFirst" @loadData="loadData">
            <div slot="col0" slot-scope="{item}" class="ellipsis-multi">{{item.Name}}</div>
        </scroller-table>

        <loading class="loading" v-show="isLoading" ></loading>
    </div>

</template>


<script>
    import {QueryNetEarningArea} from 'teacher/api/feeReport.js';
    import ScrollerTable from 'teacher/components/common/scroller-table/scroller-table.vue';


    let today = app.filters.formatDatetime(new Date(),'yyyy-MM-dd');

    export default {
        name:'net-earning',
        data(){
            return {
                wxTitle:'净收汇总表',
                cols:[{Name:'实收金额'},{Name:'退费金额'},{Name:'净收金额'}],        //列名
                sum:[],         //合计行
                tableData:[],       //表格数据
                mainName:app.sysInfo.EnableDeptAddArea== '1'? '区域':app.sysInfo.Title_Campus,
                sdate:today,
                edate:today,
                quickDateIndex:0,
                isLoading:false,

                pagingOption: {
					api: QueryNetEarningArea,
					params: {
                        sdate: today,
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
				},
            }
        },
        methods:{
            refresh(){
                this.isLoading = true;
                this.$refs.table.pagingRefresh({
                    sdate: this.sdate,
                    edate: this.edate,
                });
            },

            changeDate(dateObj){                
                this.sdate = dateObj.sdate;
                this.edate = dateObj.edate;
                this.quickDateIndex = dateObj.index;               
                this.refresh();
            },
            loadData(promise){                
                promise.then(({Data})=>{
                    this.isLoading = false;
                    Data.dataList.forEach(item=>{
                        item.List = [{Value:item.PayFactMoney},{Value:item.FeeRufundMoney},{Value:item.NetEarningMoney}];
                    })
                    this.tableData.push(...Data.dataList);
                })
            },
            loadFirst(promise){
                promise.then(({Data})=>{
                    this.isLoading = false;
                    this.sum = [{Value:Data.SumPayFact},{Value:Data.SumFeeRufund},{Value:Data.SumNetEarning}];                    
                    this.tableData = [...Data.dataList];
                })
            }

        },
        mounted(){
        },
        created(){
        },
        components:{
            ScrollerTable
        }        
    }


</script>