<style lang="scss" scoped>
    .charge-report {
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
    <div class="charge-report">
        <div class="search-bar">
            <date-bar class="date-bar"
                :sdate='sdate'
                :edate='edate'
                :index="quickDateIndex"
                @changeDate="changeDate">
            </date-bar>

            <div class="filter-bar" @click="colSelect">
                <span>选择列</span>
                <svg class="icon">
                    <use xlink:href="#ixz-shaixuan"></use>
                </svg>
            </div>


        </div>

        <scroller-table 
            v-if="loaded"
            ref= "table"
            class="scroller-table"
            :cols="cols" :sum="sum" :data="tableData"   
            :mainName="mainName" :pagingOption="pagingOption"    
            @choose="choose" @loadFirst="loadFirst" @loadData="loadData">
            <template slot="col0" slot-scope="{item}">
                <div class="ellipsis-multi">{{item.Name}}</div>
                <svg class="icon" style="flex-shrink: 0;" v-show="level < 2">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </template>
        </scroller-table>

        <loading class="loading" v-show="isLoading" ></loading>
    </div>

</template>


<script>
    import {getDictionary,queryPayFactOnFee,QueryPayFactOnFeeOfArea} from 'teacher/api/feeReport.js';
    import ScrollerTable from 'teacher/components/common/scroller-table/scroller-table.vue';


    let today = app.filters.formatDatetime(new Date(),'yyyy-MM-dd');

    const typeMap = {
        'shoufei':{
            queryFlag:1,
            wxTitle:'收费汇总表',
            sumName:'实收金额'
        },
        'tuifei':{
            queryFlag:2,
            wxTitle:'退费汇总表',
            sumName:'退费金额'
        }
    }

    export default {
        name:'feeReport-charge',
        data(){
            return {
                wxTitle:'收费汇总表',
                allCols:[],     //所有选择列
                chosenCols:[],      //已选择的列

                cols:[],        //列名,ID,Value
                sum:[],         //合计行
                tableData:[],       //表格数据
                mainName:app.sysInfo.Title_Campus, 
                loaded:false,       

                sdate:today,
                edate:today,
                quickDateIndex:0,
                isLoading:false,

                level: 0,
                reportType: 'shoufei',        //'shoufei','tuifei'

                pagingOption: {
					api: null,
					params: {
                        sdate: today,
                        edate: today,
                        feeTypes:'',
                        queryFlag:1,
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
            refresh(params={}){
                this.isLoading = true;
                this.$refs.table.pagingRefresh(Object.assign(params,{
                    sdate: this.sdate,
                    edate: this.edate,
                    level:this.level,
                }));
            },

            changeDate(dateObj){                
                this.sdate = dateObj.sdate;
                this.edate = dateObj.edate;
                this.quickDateIndex = dateObj.index;               
                this.refresh();
            },
            colSelect(){
                app.colSelect({
                    list: this.allCols,
                    activeIndex:this.chosenCols,
                    title:'选择要展示的列',
                }).then(res=>{
                    this.chosenCols = [...res];
                    let list = [];
                    res.forEach(item=>{
                        list.push(this.allCols[item]);
                    })
                    let feeTypes = list.map(item=>item.id).join(',');
                    this.refresh({feeTypes});
                });                
            },

            choose(pos){
                let [a,b] = pos.split('-');
                if (a === 'row' && this.level < 2){
                    let id = this.tableData[+b].ID,
                        name = this.level == 1 ? this.tableData[+b].Name : '';
                    setTimeout(()=>{
                            this.$router.push({
                                path: `/feeReportCharge/${this.reportType}/${+this.level + 1}`,
                                query:{
                                    id:id,
                                    chosenCols:this.chosenCols.join(','),
                                    sdate:this.sdate,
                                    edate:this.edate,
                                    quickDateIndex:this.quickDateIndex,
                                    campusName:name
                                },
                            });
                    },50);
                }
            },
            loadData(promise){                
                promise.then(({Data})=>{
                    this.isLoading = false;
                    Data.Values.forEach(item=>{
                        item.List.unshift({Value:item.Sum});
                    });
                    this.tableData.push(...Data.Values);
                })
            },
            loadFirst(promise){
                promise.then(({Data})=>{
                    Data.Names.unshift({ID:'',Name:typeMap[this.reportType].sumName});
                    Data.Count.unshift({Value:Data.Sum});
                    this.isLoading = false;
                    this.cols = Data.Names;
                    this.sum = Data.Count;
                    
                    this.tableData = [...Data.Values];
                })
            }

        },
        mounted(){

        },
        created(){
            let query = app.tool.parseHash().query;

            getDictionary().then(res=>{
                this.allCols = res.Data.map(item=>({
                    id: item.ID,
                    name: item.Value
                }));                
                this.chosenCols = query.chosenCols ? query.chosenCols.split(',') : [];
                let list = [];
                this.chosenCols.forEach(item=>{
                    list.push(this.allCols[+item]);
                })
                this.pagingOption.params.feeTypes = list.map(item=>item.id).join(',');
                this.loaded = true;
            });
            this.level = this.$route.params.level;
            this.reportType = this.$route.params.reportType == 'shoufei' ? 'shoufei' : 'tuifei';

            this.wxTitle = this.level == 0 ? '区域' + typeMap[this.reportType].wxTitle : typeMap[this.reportType].wxTitle;

            this.pagingOption.api = this.level == 0 ? QueryPayFactOnFeeOfArea : queryPayFactOnFee;
            if (this.level == 0){
                this.mainName = '区域';
            } else if (this.level == 1){
                this.mainName = app.sysInfo.Title_Campus;
            } else {
                this.mainName = '责任人';
            }
            this.pagingOption.params.queryFlag = typeMap[this.reportType].queryFlag;


            

            if (query.sdate){
                this.pagingOption.params.sdate = this.sdate = query.sdate;    
            }
            if (query.edate){
                this.pagingOption.params.edate = this.edate = query.edate;    
            }
            if (query.quickDateIndex){
                this.quickDateIndex = +query.quickDateIndex;    
            }
            if (query.campusName){
                this.wxTitle = decodeURIComponent(query.campusName) + this.wxTitle;
            }

            if (this.level == 1){
                this.pagingOption.params.areaId = query.id;
                this.pagingOption.params.level = this.level;
            } else if (this.level == 2){
                this.pagingOption.params.campusids = query.id;
                this.pagingOption.params.level = this.level;
            }            
        },
        components:{
            ScrollerTable
        }        
    }


</script>