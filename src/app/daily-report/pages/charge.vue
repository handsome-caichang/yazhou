<template>
<div>
    <!-- 标题 -->
    <scroller-base  class="charge" :data="globalData" :options="{scrollbars:false}" ref="scroll" style="height:100%">
	    <header-define :data="headerObj"></header-define>

        <div class="main-content">
            <tab-bar :type="reportType" @changeType="changeType"></tab-bar>

            <!-- 总览 -->
            <div class="info-form">
                <div class="info-form-total">
                    <div>收费金额</div>
                    <div class="infor-form-total-num" v-bind:style="{fontSize:numSize}" ref="numSize">{{globalData.totalCharge | formatNumberUnit(2)}}</div>
                    <div>{{globalData.chargeStudentCount}}人次</div>
                </div>
                <div class="info-form-items">
                    <div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="icon-circle" >
                                <circle  cx="5" cy="5" r="3" stroke="#FF788D" stroke-width="2" fill="transparent"></circle>
                            </svg>
                            <span>退费</span>
                        </div>
                        <div>
                            <span class="info-form-items-num red">{{globalData.totalRefund | formatNumberUnit(2)}}</span>
                            <span class="info-form-items-descript">{{globalData.refundStudentCount}}人次</span>
                        </div>
                    </div>
                    <div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="icon-circle" >
                                <circle  cx="5" cy="5" r="3" stroke="#97C66B" stroke-width="2" fill="transparent"></circle>
                            </svg>
                            <span>净额</span>
                        </div>
                        <span class="info-form-items-num green">{{globalData.netIncome | formatNumberUnit(2)}}</span>
                    </div>
                </div>
            </div>

            
            <div class="pie-chart">
                <echarts :setOption="chargeTypesChart" style="height:240px"></echarts>
            </div>

            <!-- 趋势分析 -->
            <div class="line-chart" >
                <div class="line-chart-title" v-if="reportType != 'year'">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="icon-circle" >
                        <circle  cx="5" cy="5" r="4" stroke="#78AEF9" stroke-width="2" fill="transparent"></circle>
                    </svg>
                    <span v-if="reportType == 'day'" >近7天收费金额趋势分析</span>
                    <span v-if="reportType == 'month'" >近两年收费金额趋势分析</span>

                </div>
                <echarts v-if="reportType == 'day'" :key="1" :setOption="dayChargeTrendChart" style="height:250px" :action="{type:'showTip',seriesIndex:0,dataIndex:7}"></echarts>
                <echarts v-if="reportType == 'month'" :key="2" :setOption="monthChargeTrendChart" style="height:250px" :action="monthAction"></echarts>
                <div v-if="reportType == 'year'" class="yearForm"> 
                    <div>
                        <div>与去年同期相比，收费金额</div>
                        <div>
                            <svg class="icon">
                                <use :xlink:href="globalData.chargeIncreaseRate >=0 ?'#icon-zengchang':'#icon-jiangdi'"></use>
                            </svg>
                            <span>{{globalData.chargeIncreaseRate >=0 ? '+' : ''}}{{globalData.chargeIncreaseRate}}%</span>
                        </div>
                    </div>
                    <svg class="icon">
                        <use xlink:href="#icon-tongqipeitu"></use>
                    </svg>
                </div>
            </div>
            
        </div>


        <div class="split"></div>
        <div class="rank-campus">
            <rank-list :data="chargeRanksChart" @toggle="refreshScroll" title="校区收费排行榜-TOP10" ></rank-list>
        </div>

        <div class="split"></div>
        <div class="rank-emps">
            <rank-emp :list="performanceRanks" title="招生排行榜-TOP10" keyName="money"></rank-emp>
        </div>
        <div class="split"></div>
    </scroller-base>
    <loading v-show="isLoading" :bgType="1"></loading>
</div>
</template>

<script>
    import echarts from 'dailyReport/components/common/echarts/echarts.vue';
    import headerDefine from './child/header-define.vue';
    import tabBar from './child/tab-bar.vue';
    import rankList from './child/rank-list.vue';
    import rankEmp from './child/rank-emp.vue';
    import {_chargePie} from './option/pie.js';
    import {_dayCharge,_monthCharge} from './option/line.js';
    import {chargeReport} from 'dailyReport/api/home.js';
    import {dateCreate,transTrend,adaptFont} from './option/tool.js';


    export default {
        name: "charge",
        data() {
            return { 
                wxTitle:'收费分析',
                isLoading: false,  //加载动画 
                headerObj:{
                    title:'收费分析',
                    content:[{name:'日期',value:''},{name:'单位',value:'元'}]
                },
                tempdate:'',
                monthAction:{type:'showTip',seriesIndex:0,dataIndex:0},
                globalData:{
                    totalCharge:0,  //收费金额
                    chargeStudentCount:0,   //收费人次
                    totalRefund:0,      //退费金额
                    refundStudentCount:0,   //退费人次
                    netIncome:0,        //净额
                    campusCount:0,      //校区总数
                    chargeTypes:[],     //收费类型统计
                    chargeRanks:[],     //校区排名
                    dayChargeTrend:[],      //天的趋势
                    monthChargeTrend:{},    //月的趋势
                    chargeIncreaseRate:0,   //年的增长。
                    performanceRanks:[],    //老师排行
                },
                performanceRanks:[],        //老师排行.

                chargeTypesChart:_chargePie,      //收费类型统计的echarts的option
                chargeRanksChart:{      //校区排名的echarts的option
                    totol:0,
                    list:[],
                    chargeTypes:[]//收费类型
                },
                dayChargeTrendChart:_dayCharge,
                monthChargeTrendChart:_monthCharge,
                reportType:'day',
            }
        },
        computed: { 
            numSize(){
                let num = app.filters.formatNumberUnit(this.globalData.totalCharge,2);      
                return adaptFont(this.$refs.numSize,num);           
            },
        },
        methods: { 
            refreshScroll(){
                this.$nextTick(()=> this.$refs.scroll.refresh());
            },
            changeType(type){
                this.reportType = type;
                this.QueryData();
            },

            QueryData(){
                // TODO:  推送时间
                let params = {
                    reportType: this.reportType,
                    queryDate: this.tempdate
                }
                this.isLoading = true;
                chargeReport(params).then(res=>{
                    this.isLoading = false;
                    if (res.ErrorCode == 200){
                        this.globalData = res.Data;
                        this.transData(resolve(res.Data));
                    } else {
                        app.toast('error',res.ErrorMsg);
                    }
                });
            },

            transData(resolve){

                //处理环形图
                _chargePie.setData(resolve.chargePie);
                _chargePie.color = resolve.getColor;//饼图颜色自适应

                this.chargeTypesChart = Object.assign({},_chargePie);
                // 处理趋势分析图
                if (resolve.dayCharge){       //日报
                    _dayCharge.setxAsis(resolve.dayCharge[0]).setData(resolve.dayCharge[1]);
                    this.dayChargeTrendChart = Object.assign({},_dayCharge);

                } else if (resolve.monthCharge){       //月报
                    let {cur,pre} = resolve.monthCharge;
                    _monthCharge.setxAsis(cur[0]).setData(cur[1],pre[1])
                                .setLegend(cur[1][0].name,pre[1][0].name);
                    this.monthChargeTrendChart = Object.assign({},_monthCharge);
                }

                //校区排行榜             
                this.chargeRanksChart.total = this.globalData.campusCount;
                this.chargeRanksChart.list = resolve.rankList;
                this.chargeRanksChart.chargePie = resolve.chargePie;


                //员工排行榜
                this.performanceRanks = this.globalData.performanceRanks;   
                this.refreshScroll(); 
            },


        },
        created() { 
            let param = app.tool.parseHash();
            this.tempdate = param.query.date;
            this.monthAction.dataIndex = +app.filters.formatDatetime(this.tempdate,'MM');
            this.headerObj.content[0].value = this.tempdate =  param.query.date;
            this.QueryData();
        },
        mounted() { 
        },
        components: { 
            headerDefine,
            tabBar,
            echarts,
            rankList,
            rankEmp
        },
        watch: { 

        }
    }


    /*--------------------------------------------------数据转换--------------------------------------------------*/
    const resolve = (function(){
        const feeTypeMap = {
            FeeType_Expand:'扩科',
            FeeType_New:'新增',
            FeeType_Continue:'续费',
            FeeType_Account:'预存',
            FeeType_Account_New:'预存-新增',
            FeeType_Account_Continue:'预存-续费',
            FeeType_Account_Introduce:'预存-转介绍',
            FeeType_Other:'其他'
        }

        //@TODO 简单的在前后增加相同数据.
        function fillArray(arr){
            return [arr[0],...arr,arr[arr.length - 1]];
        }

        function getChargePie(data){
            return data.chargeTypes.map(item=>{
                item.name = feeTypeMap[item.chargeType];
                item.value = item.totalCharge;
                return item;
            })
        }

        function getDayCharge(data){
            if (data.dayChargeTrend){   
                const list = [...data.dayChargeTrend];
                list.sort((a,b)=>{
                    return dateCreate(a.Date || a.date).getTime() - dateCreate(b.Date || b.date).getTime()
                })
                
                return transTrend(fillArray(list),'dd','totalCharge');
            } else {
                return null;
            }
        }

        function getMonthCharge(data){
            let trend;
            if (trend = data.monthChargeTrend){
                let [pre , cur]= [fillArray(trend.preYearData[0]),fillArray(trend.currentYearData[0])];
                return {
                    pre:transTrend(pre,'MM','totalCharge'),
                    cur:transTrend(cur,'MM','totalCharge')
                }
            } else {
                return null;
            }
        }

        function getRanks(data){
            return data.chargeRanks.map(item=>{
                const _item = {};
                _item.name = item.campusName;
                _item.value = item.totalCharge;
                _item.rank = item.rank;
                _item.totalRank = item.totalRank;
                _item.typesMap = {};
                item.chargeTypes.forEach(val=>{
                    _item.typesMap[val.chargeType] = val.totalCharge
                })
                return _item;
            });
        }

        function getColor(data) {
            const feeTypeColor = {
                FeeType_Expand:'#7ACE4C',
                FeeType_New:'#5DADE2',
                FeeType_Continue:'#FFB508',
                FeeType_Account:'#7460EE',
                FeeType_Account_New:'#15D0BD',
                FeeType_Account_Continue:'#15AC9D',
                FeeType_Account_Introduce:'#00CE7D',
                FeeType_Other:'#75859B'
            };
            let color = [];
            data.chargeTypes&&data.chargeTypes.forEach((item)=>{
                color.push(feeTypeColor[item.chargeType])
            })
            return color
        }
        return function resolve(data){
            return {
                chargePie:getChargePie(data),
                dayCharge:getDayCharge(data),
                monthCharge:getMonthCharge(data),
                rankList:getRanks(data),
                getColor:getColor(data)
            }
        }
    })();
    /*--------------------------------------------------数据转换--------------------------------------------------*/

</script>

<style scoped lang="scss">
	
	
    .charge{
        // padding-bottom:20px;
        >div{
            width:100%;
        }
        .split{
            width:100%;
            height:10px;
            background: #EEF1F6;
        }
        .main-content{
            padding:10px 0;
            border-top:1px solid #ddd;
            border-bottom:1px solid #ddd;
            .info-form{
                height:110px;
                margin:20px 15px 0 15px;
                border:1px solid #E8E8E8;
                @include flex-center;
                .info-form-total{
                    width:40%;
                    padding:10px 0 10px 20px;
                    height:100%;
                    @include flex-between(column);
                    align-items:flex-start;
                    >div:first-child{
                        font-size:13px;
                        color:#666;
                    }
                    .infor-form-total-num{
                        color:#78AEF9;
                        font-size:25px;
                        word-break:break-all;
                        width:100%;
                    }
                    >div:last-child{
                        font-size:12px;
                        color:#666;
                    }
                }
                .info-form-items{
                    width:60%;
                    @include flex-center(column);
                    >div{
                        width:100%;
                        @include flex-between;
                        padding-left:15px;
                        padding-right:10px;
                        height:55px;
                        border-left:1px solid #E8E8E8;
                        &:last-child{
                            border-top:1px solid #E8E8E8;
                        }

                        div:first-child{
                            white-space: nowrap;
                        }

                        div:last-child{
                            @include flex-center;
                            justify-content: flex-end;
                            flex-wrap:wrap;
                        }

                        .info-form-items-num{
                            font-size:16px;
                            margin-left:10px;
                            margin-right:5px;
                            white-space: nowrap;
                            &.red{
                                color:#FF788D;
                               
                            }
                            &.green{
                                color:#97C66B;
                            }
                        }
                        .info-form-items-descript{
                            font-size:11px;
                            color:#AFB8BB;
                            white-space: nowrap;
                            margin-right: 5px;
                        }
                    }
                }
            }

            .pie-chart{
                margin:20px 15px;
                width:calc(100% - 30px);
            }

            .line-chart{
                padding-top:20px;
                border-top: 1px solid #E8E8E8;
                width:100%;
                .line-chart-title{
                    font-size:14px;
                    padding-left:15px;
                    color:#333;
                }
                .yearForm{
                    margin:30px 15px 10px 15px;
                    width:calc(100% - 30px);
                    height:100px;
                    border:1px solid #e1e1e1;
                    @include flex-between;
                    padding:15px;
                    >div:first-child{
                        height:70px;
                        >div:first-child{
                            margin-bottom:15px;
                            color:#666666;
                            font-size:14px;
                        }
                        >div:last-child{
                            font-size:24px;
                            color:#7ED321;
                            >svg.icon{
                                transform: scale(0.85);
                            }
                        }
                    }
                    >svg.icon{
                        width:60px;
                        height:30px;
                    }
                }
            }
        }
        .rank-campus{
            width:100%;
        }
        .rank-emps{
            width:100%;
        }
    }
</style>