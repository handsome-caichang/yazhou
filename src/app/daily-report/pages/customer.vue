<template>
<div>
    <!-- 标题 -->
    <scroller-base class="customer" :options="{scrollbars:false}" ref="scroll" style="height:100%">
	    <header-define :data="headerObj"></header-define>

        <div class="main-content">
            <tab-bar :type="reportType" @changeType="changeType"></tab-bar>

            <!-- 到访率 -->
            <div class="daofanglv-container">
                <div class="percent">
                    <card-percent :color="'#78AEF9'" :type="2" :data="daofang"  @clickHelp="showHelp(3,$event)"></card-percent>
                </div>   

                <!-- 趋势分析 -->
                <div class="line-chart">
                    <div class="line-chart-title" v-if="reportType != 'year'">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="icon-circle" >
                            <circle  cx="5" cy="5" r="4" stroke="#78AEF9" stroke-width="2" fill="transparent"></circle>
                        </svg>
                        <span v-if="reportType == 'day'" >近7天到访率趋势分析</span>
                        <span v-if="reportType == 'month'" >近两年到访率趋势分析</span>

                    </div>
                    <echarts v-if="reportType == 'day'" :key="1" :setOption="dayVisitChart" style="height:190px" :action="{type:'showTip',seriesIndex:0,dataIndex:7}"></echarts>
                    <echarts v-if="reportType == 'month'" :key="2" :setOption="monthVisitChart" style="height:190px" :action="monthAction"></echarts>
                    <div v-if="reportType == 'year'" class="yearForm"> 
                        <div>
                            <div>与去年同期相比，到访率</div>
                            <div>
                                <svg class="icon">
                                    <use xlink:href="#icon-zengchang"></use>
                                </svg>
                                <span>{{globalData.visitIncreaseRate >=0 ? '+' : ''}}{{globalData.visitIncreaseRate}}%</span>
                            </div>
                        </div>
                        <svg class="icon">
                            <use xlink:href="#icon-tongqipeitu"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="split"></div>




            <!-- 转化率 -->
            <div class="zhuanhualv-container">
                <div class="percent">
                    <card-percent :color="'#75859B'" :type="2" :data="zhuanhua"  @clickHelp="showHelp(4,$event)"></card-percent>
                </div>   

                <!-- 趋势分析 -->
                <div class="line-chart" >
                    <div class="line-chart-title" v-if="reportType != 'year'">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="icon-circle" >
                            <circle  cx="5" cy="5" r="4" stroke="#78AEF9" stroke-width="2" fill="transparent"></circle>
                        </svg>
                        <span v-if="reportType == 'day'" >近7天转化率趋势分析</span>
                        <span v-if="reportType == 'month'" >近两年转化率趋势分析</span>

                    </div>
                    <echarts v-if="reportType == 'day'" :key="1" :setOption="dayTranslateChart" style="height:190px" :action="{type:'showTip',seriesIndex:0,dataIndex:7}"></echarts>
                    <echarts v-if="reportType == 'month'" :key="2" :setOption="monthTranslateChart" style="height:190px" :action="monthAction"></echarts>
                    <div v-if="reportType == 'year'" class="yearForm"> 
                        <div>
                            <div>与去年同期相比，转化率</div>
                            <div>
                                <svg class="icon">
                                    <use :xlink:href="globalData.translateIncreaseRate >=0 ?'#icon-zengchang':'#icon-jiangdi'"></use>
                                </svg>
                                <span>{{globalData.translateIncreaseRate >=0 ? '+' : ''}}{{globalData.translateIncreaseRate}}%</span>
                            </div>
                        </div>
                        <svg class="icon">
                            <use xlink:href="#icon-tongqipeitu"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="split"></div>

            <!--销售漏斗  -->
            <div class="funnel" v-if="showFunnel">
                <div class="title">
                    <div>销售漏斗</div>
                    <span>单位:人</span>
                </div>
                <echarts v-if="funnelHeight" :setOption="funnelOption" :style="{height:funnelHeight + 'px'}"></echarts>
            </div>
        </div>


        <div class="split" v-if="showFunnel"></div>
        <help ref="help"></help>
      
    </scroller-base>
    <loading v-show="isLoading" :bgType="1"></loading>
</div>
</template>

<script>
    import echarts from 'dailyReport/components/common/echarts/echarts.vue';
    import headerDefine from './child/header-define.vue';
    import tabBar from './child/tab-bar.vue';
    import cardPercent from './child/card-percent.vue';
    import rankList from './child/rank-list.vue';
    import {_dayCustomerVisit,_dayCustomerTranslate,_monthCustomerVisit,_monthCustomerTranslate} from './option/line.js';
    import {_customerFunnel} from './option/funnel.js';
    import {customerReport} from 'dailyReport/api/home.js';
    import {dateCreate,transTrend,offset} from './option/tool.js';
    import help from './child/help-popup.vue';

    export default {
        name: "customer",
        props: {

        },
        data() {
            return { 
                wxTitle:'招生分析',
                isLoading: false,  //加载动画 
                tempdate:'',
                monthAction:{type:'showTip',seriesIndex:0,dataIndex:0},
                headerObj:{
                    title:'招生分析',
                    content:[{name:'日期',value:''}]
                },
                funnelHeight:0,
                daofang:{
                    title:'到访率',
                    rate:0,
                    countName:['邀约人数','到访人数'],
                    count1:0,
                    count2:0,
                },

                zhuanhua:{
                    title:'转化率',
                    rate:0,
                    countName:['已跟进','已转化'],
                    count1:0,
                    count2:0,
                },
                globalData:{},
                funnelOption:_customerFunnel,
                dayVisitChart:_dayCustomerVisit,
                dayTranslateChart:_dayCustomerTranslate,
                monthVisitChart:_monthCustomerVisit,
                monthTranslateChart:_monthCustomerTranslate,
                reportType:'day',
                showFunnel:true,
            }
        },
        computed: { 

        },
        methods: { 
            showHelp(type,event,direction='up'){
				let helpComp = this.$refs.help,
					pos = offset(event.currentTarget);
				helpComp.show(type,pos.left,pos.top,direction);
			},
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
                customerReport(params).then(res=>{
                    this.isLoading = false;
                    if (res.ErrorCode == 200){
                        this.globalData = res.Data;
                        this.transData(resolve(res.Data));
                    }
                });
            },

            transData(resolve){
                this.daofang.rate = this.globalData.visitRate;
                this.daofang.count1 = this.globalData.inviteCount;
                this.daofang.count2 = this.globalData.visitCount;
                
                this.zhuanhua.rate = this.globalData.translateRate;
                this.zhuanhua.count1 = this.globalData.validCount;
                this.zhuanhua.count2 = this.globalData.transferCount;
                // 处理趋势分析图
                if (this.globalData.dayTrendList ){       //日报

                    let visit = resolve.dayData.visitRate;
                    _dayCustomerVisit.setxAsis(visit[0]).setData(visit[1]);
                    this.dayVisitChart = Object.assign({},_dayCustomerVisit)

                    let translate = resolve.dayData.translateRate;
                    _dayCustomerTranslate.setxAsis(translate[0]).setData(translate[1]);
                    this.dayTranslateChart = Object.assign({},_dayCustomerTranslate);

                } else if (this.globalData.monthLastyearTrendList){       //月报
                    let month = resolve.monthData,
                        pre,cur;
                    pre = month.visitRate.pre, cur = month.visitRate.cur;
                    _monthCustomerVisit.setxAsis(pre[0]).setData(cur[1],pre[1]).setLegend(cur[1][0].name,pre[1][0].name);
                    this.monthVisitChart = Object.assign({},_monthCustomerVisit);
                    
                    
                    pre = month.translateRate.pre, cur = month.translateRate.cur;
                    _monthCustomerTranslate.setxAsis(pre[0]).setData(cur[1],pre[1]).setLegend(cur[1][0].name,pre[1][0].name);
                    this.monthTranslateChart = Object.assign({},_monthCustomerTranslate);
                }
                
                //销售漏斗
                //this.globalData.CustomerStatusLis = this.globalData.CustomerStatusLis.filter(item=>item.value);
                let CustomerStatusLis = this.globalData.CustomerStatusLis;
                this.showFunnel = CustomerStatusLis.some(item=>item.value > 0);
                
                this.funnelHeight = CustomerStatusLis.length * 60;
                _customerFunnel.setData(CustomerStatusLis);
                this.funnelOption = Object.assign({},_customerFunnel);

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
            cardPercent,
            rankList,
            help,
        },
        watch: { 

        }
    }


    const resolve = (function(){

        //@TODO 简单的在前后增加相同数据.
        function fillArray(arr){
            return [arr[0],...arr,arr[arr.length - 1]];
        }


        function getDayData(data,keyArr){
            if (data.dayTrendList){
                const list = [...data.dayTrendList];
                list.sort((a,b)=>{
                    return dateCreate(a.Date || a.date).getTime() - dateCreate(b.Date || b.date).getTime()
                })
                let result = {};
                keyArr.forEach(item=>{
                    result[item] = transTrend(fillArray(list),'dd',item,'%');
                })
                return result;
            } else {
                return null;
            }
        }

        function getMonthData(data,keyArr){
            if (data.monthThisyearTrendList){
                let pre = fillArray(data.monthLastyearTrendList),
                    cur = fillArray(data.monthThisyearTrendList);
                    let result = {};
                    keyArr.forEach(val=>{
                        result[val] = {
                            pre:transTrend(pre,'MM',val,'%'),
                            cur:transTrend(cur,'MM',val,'%')
                        };
                    })
                    return result;
            } else {
                return null;
            }
        }

        return function(data){
            return {
                dayData:getDayData(data,['visitRate','translateRate']),
                monthData:getMonthData(data,['visitRate','translateRate'])
            }
        }
    })();
</script>

<style>
.customer canvas{
    z-index: -1;
}
</style>


<style scoped lang="scss">
	
	
    .customer{
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
            .zhuanhualv-container, .daofanglv-container{
                .percent{
                    padding:0 15px;
                    margin-top:30px;
                    margin-bottom:30px;
                    svg.icon{
                        width: 20px;
                    }
                }
            }
            .line-chart{
                .line-chart-title{
                    font-size:14px;
                    padding-left:15px;
                    color:#333;
                }
                width:100%;
                margin-bottom:20px;
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
            .funnel{
                position:relative;
                .title{
                    height:50px;
                    @include flex-center;
                    >div:first-child{
                       font-size:15px;
                       color:#333; 
                    }
                    >span{
                        right: 0;
                        position: absolute;
                        right: 15px; 
                        top:0;
                        line-height:50px;
                        font-size: 12px;
                        color: #666;
                    }
                }
            }
        }

    }
</style>