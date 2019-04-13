<template>
<div>
    <!-- 标题 -->
    <scroller-base class="consume" :options="{scrollbars:false}" ref="scroll" style="height:100%">
	    <header-define :data="headerObj"></header-define>

        <div class="main-content">
            <tab-bar :type="reportType" @changeType="changeType"></tab-bar>

            <!-- 总览 -->
            <div class="info-form">
                <div class="info-form-total">
                    <div>课消金额</div>
                    <div class="info-form-total-num" v-bind:style="{fontSize:numSize}" ref="numSize">{{globalData.totalConsume | formatNumberUnit(2)}}</div>
                </div>
                <div class="info-form-items">
                    <div>上课人次数</div>
                    <div><span class="big">{{globalData.courseStudentCount}} </span> 人次</div>
                </div>

            </div>


            
            <div class="pie-chart">
                <echarts :setOption="consumeTypesChart" style="height:180px"></echarts>
            </div>

            <!-- 趋势分析 -->
            <div class="line-chart" >
                <div class="line-chart-title" v-if="reportType != 'year'">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="icon-circle" >
                        <circle  cx="5" cy="5" r="4" stroke="#78AEF9" stroke-width="2" fill="transparent"></circle>
                    </svg>
                    <span v-if="reportType == 'day'" >近7天课消金额趋势分析</span>
                    <span v-if="reportType == 'month'" >近两年课消金额趋势分析</span>

                </div>
                <echarts v-if="reportType == 'day'" :key="1" :setOption="dayConsumeTrendChart" style="height:250px" :action="{type:'showTip',seriesIndex:0,dataIndex:7}"></echarts>
                <echarts v-if="reportType == 'month'" :key="2" :setOption="monthConsumeTrendChart" style="height:250px" :action="monthAction"></echarts>
                <div v-if="reportType == 'year'" class="yearForm"> 
                    <div>
                        <div>与去年同期相比，课消金额</div>
                        <div>
                            <svg class="icon">
                                <use :xlink:href="globalData.consumeIncreaseRate >=0 ?'#icon-zengchang':'#icon-jiangdi'"></use>
                            </svg>
                            <span>{{globalData.consumeIncreaseRate >=0 ? '+' : ''}}{{globalData.consumeIncreaseRate}}%</span>
                        </div>
                    </div>
                    <svg class="icon">
                        <use xlink:href="#icon-tongqipeitu"></use>
                    </svg>
                </div>
            </div>
            
        </div>

        <div class="split" ></div>
        <div class="rank-campus">
            <rank-list :data="consumeRanksChart" @toggle="refreshScroll" 
                :expand="false" :title="'校区课消排行榜-TOP10'" >
            </rank-list>
        </div>

        <div class="split"></div>
        <div class="rank-emps">
            <rank-emp :list="teacherConsumeRanks"  keyName="totalConsume"
                title="老师课消金额排行榜-TOP10" ></rank-emp>
        </div>

        <div class="split" ></div>
        <div class="rank-emps">
            <rank-emp :list="teacherCommentRanks"  keyName="score"
                title="老师评价得分排行榜-TOP10" ></rank-emp>
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
    import {_consumePie} from './option/pie.js'
    import {_dayConsume,_monthConsume} from './option/line.js';
    import {consumeReport} from 'dailyReport/api/home.js';
    import {dateCreate,transTrend,adaptFont} from './option/tool.js';

    export default {
        name: "consume",
        props: {

        },
        data() {
            return { 
                wxTitle:'课消分析',
                isLoading: false,  //加载动画 
                tempdate:'',
                monthAction:{type:'showTip',seriesIndex:0,dataIndex:0},
                headerObj:{
                    title:'课消分析',
                    content:[{name:'日期',value:''},{name:'单位',value:'元'}]
                },
                globalData:{
                    totalConsume:0,  //收费金额
                    consumeStudentCount:0,   //收费人次
                    totalRefund:0,      //退费金额
                    refundStudentCount:0,   //退费人次
                    netIncome:0,        //净额
                    campusCount:0,      //校区总数
                    consumeTypes:[],     //收费类型统计
                    consumeRanks:[],     //校区排名
                    dayConsumeTrend:[],      //天的趋势
                    monthConsumeTrend:{},    //月的趋势
                    consumeIncreaseRate:0,   //年的增长。
                    teacherConsumeRanks:[],    //老师排行
                    teacherCommentRanks:[],
                },
                teacherConsumeRanks:[],        //老师排行.
                teacherCommentRanks:[],

                consumeTypesChart:_consumePie,
                consumeRanksChart:{      //校区排名的echarts的option
                    totol:0,
                    list:[]
                },
                dayConsumeTrendChart:_dayConsume,
                monthConsumeTrendChart:_monthConsume,
                reportType:'day',
            }
        },
        computed: { 
            numSize(){
                let num = app.filters.formatNumberUnit(this.globalData.totalConsume,2);                 
                return adaptFont(this.$refs.numSize,num);
            }
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
                consumeReport(params).then(res=>{
                    this.isLoading = false;
                    if (res.ErrorCode == 200){
                        this.globalData = res.Data;
                        this.transData(resolve(res.Data));
                    }
                });
            },

            transData(resolve){
                //处理环形图
                _consumePie.setData(resolve.consumePie);
                this.consumeTypesChart = Object.assign({},_consumePie);

                // 处理趋势分析图
                if (this.globalData.dayConsumeTrend ){       //日报
                    _dayConsume.setxAsis(resolve.dayConsume[0]).setData(resolve.dayConsume[1]);
                    this.dayConsumeTrendChart = Object.assign({},_dayConsume);
                } else if (this.globalData.monthConsumeTrend){       //月报
                    let {cur,pre} = resolve.monthConsume;
                    _monthConsume.setxAsis(cur[0]).setData(cur[1],pre[1])
                                .setLegend(cur[1][0].name,pre[1][0].name);
                    this.monthConsumeTrendChart = Object.assign({},_monthConsume);
                }

                //校区排行榜
                this.globalData.consumeRanks.forEach(item=>{
                    item.name = item.campusName;
                    item.rank = item.rank;
                    item.value = item.totalConsume;
                });
                this.consumeRanksChart.total = this.globalData.campusCount;
                this.consumeRanksChart.list = this.globalData.consumeRanks;

                //员工排行榜
                this.teacherConsumeRanks = this.globalData.teacherConsumeRanks;              
                this.teacherCommentRanks = this.globalData.teacherCommentRanks;              
                this.refreshScroll(); 
            },
        },
        created() { 
            let param = app.tool.parseHash();
            this.headerObj.content[0].value = this.tempdate =  param.query.date;
            this.monthAction.dataIndex = +app.filters.formatDatetime(this.tempdate,'MM');
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

    const resolve = (function(){

        //@TODO 简单的在前后增加相同数据.
        function fillArray(arr){
            return [arr[0],...arr,arr[arr.length - 1]];
        }

        function getPieData(data) {
            return data.consumeTypes.map(item=>{
                item.name = item.subjectName;
                item.value = item.totalConsume;
                return item;
            })
        }

        function getDayData(data){
            if (data.dayConsumeTrend){
                const list = [...data.dayConsumeTrend];
                list.sort((a,b)=>{
                    return dateCreate(a.Date || a.date).getTime() - dateCreate(b.Date || b.date).getTime()
                })
                return transTrend(fillArray(list),'dd','totalConsume');
            } else {
                return null;
            }
        }

         function getMonthData(data){
            let trend;
            if (trend = data.monthConsumeTrend){
                let [pre , cur]= [fillArray(trend.preYearData[0]),fillArray(trend.currentYearData[0])];
                return {
                    pre:transTrend(pre,'MM','totalConsume'),
                    cur:transTrend(cur,'MM','totalConsume')
                }
            } else {
                return null;
            }
        }

        return function(data){
            return {
                consumePie:getPieData(data),
                dayConsume:getDayData(data),
                monthConsume:getMonthData(data),
            }
        }
    })();
    
</script>

<style scoped lang="scss">
	
	
    .consume{
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
                    width:55%;
                    padding:18px 0 18px 20px;
                    height:100%;
                    @include flex-between(column);
                    align-items:flex-start;
                    >div:first-child{
                        font-size:13px;
                        color:#666;
                    }
                    .info-form-total-num{
                        color:#78AEF9;
                        font-size:25px;
                        word-break:break-all;
                        width:100%;
                    }
                }
                .info-form-items{
                    width:45%;
                    @include flex-between(column);
                    padding: 18px 0 18px 0;
                    height:100%;
                    border-left:1px solid #E8E8E8;
                    >div{
                        width:100%;
                        @include flex-center;
                        align-items: baseline;
                        padding-left:15px;
                        padding-right:10px;
                        color:#666;
                        font-size:15px;
                        &:first-child{
                            font-size:13px;
                        }
                        .big{
                            color:#000;
                            margin-right:5px;
                            font-size:25px;
                        }
                        
                    }
                }
            }

            .pie-chart{
                margin:60px 15px 60px 15px;
                width:calc(100% - 30px);
                height:160px;
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
                    margin-top:30px;
                    width:calc(100% - 30px);
                    margin-left:15px;
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
                        // @include flex-between(column);
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