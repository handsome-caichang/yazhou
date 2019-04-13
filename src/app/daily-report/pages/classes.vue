<template>
<div>
    <!-- 标题 -->
    <scroller-base class="classes" :options="{scrollbars:false}" ref="scroll" style="height:100%">
	    <header-define :data="headerObj"></header-define>

        <div class="main-content">
            <tab-bar :type="reportType" @changeType="changeType"></tab-bar>

            <!-- 满班率 -->
            <div class="manbanlv-container">
                <div class="percent">
                    <card-percent :color="'#78AEF9'" :type="1" :data="manban" @clickHelp="showHelp(0,$event)"></card-percent>
                </div>   

                <!-- 趋势分析 -->
                <div class="line-chart">
                    <div class="line-chart-title" v-if="reportType != 'year'">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="icon-circle" >
                            <circle  cx="5" cy="5" r="4" stroke="#78AEF9" stroke-width="2" fill="transparent"></circle>
                        </svg>
                        <span v-if="reportType == 'day'" >近7天满班率趋势分析</span>
                        <span v-if="reportType == 'month'" >近两年满班率趋势分析</span>

                    </div>
                    <echarts v-if="reportType == 'day'" :key="1" :setOption="dayManbanChart" style="height:190px" :action="{type:'showTip',seriesIndex:0,dataIndex:5}"></echarts>
                    <echarts v-if="reportType == 'month'" :key="2" :setOption="monthManbanChart" style="height:190px" :action="monthAction"></echarts>
                    <div v-if="reportType == 'year'" class="yearForm"> 
                        <div>
                            <div>与去年同期相比，满班率</div>
                            <div>
                                <svg class="icon">
                                    <use :xlink:href="globalData.fullClassIncreaseRate >=0 ?'#icon-zengchang':'#icon-jiangdi'"></use>
                                </svg>
                                <span>{{globalData.fullClassIncreaseRate >=0 ? '+' : ''}}{{globalData.fullClassIncreaseRate}}%</span>
                            </div>
                        </div>
                        <svg class="icon">
                            <use xlink:href="#icon-tongqipeitu"></use>
                        </svg>
                    </div>
                </div>
                <div class="split"></div>
                <div class="rank-campus">
                    <rank-list :data="manbanRanksList" color="#78AEF9" 
                        v-bind:list.sync="manbanRanksList.list" type="sort5" 
                        @toggle="refreshScroll" :title="'满班率排行'" :expand="false">
                    </rank-list>
                </div>
            </div>
            <div class="split"></div>




            <!-- 出勤率 -->
            <div class="chuqinlv-container">
                <div class="percent">
                    <card-percent :color="'#F09134'" :type="1" :data="chuqin"  @clickHelp="showHelp(1,$event)"></card-percent>
                </div>   

                <!-- 趋势分析 -->
                <div class="line-chart" >
                    <div class="line-chart-title" v-if="reportType != 'year'">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="icon-circle" >
                            <circle  cx="5" cy="5" r="4" stroke="#F09134" stroke-width="2" fill="transparent"></circle>
                        </svg>
                        <span v-if="reportType == 'day'" >近7天出勤率趋势分析</span>
                        <span v-if="reportType == 'month'" >近两年出勤率趋势分析</span>

                    </div>
                    <echarts v-if="reportType == 'day'" :key="1" :setOption="dayChuqinChart" style="height:190px" :action="{type:'showTip',seriesIndex:0,dataIndex:7}"></echarts>
                    <echarts v-if="reportType == 'month'" :key="2" :setOption="monthChuqinChart" style="height:190px" :action="monthAction"></echarts>
                    <div v-if="reportType == 'year'" class="yearForm"> 
                        <div>
                            <div>与去年同期相比，出勤率</div>
                            <div>
                                <svg class="icon">
                                    <use :xlink:href="globalData.attendanceIncreaseRate >=0 ?'#icon-zengchang':'#icon-jiangdi'"></use>
                                </svg>
                                <span>{{globalData.attendanceIncreaseRate >=0 ? '+' : ''}}{{globalData.attendanceIncreaseRate}}%</span>
                            </div>
                        </div>
                        <svg class="icon">
                            <use xlink:href="#icon-tongqipeitu"></use>
                        </svg>
                    </div>
                </div>
                <div class="split" ></div>
                <div class="rank-campus">
                    <rank-list :data="chuqinRanksList" color="#F09134"
                        v-bind:list.sync="chuqinRanksList.list" type="sort5" 
                        @toggle="refreshScroll" :title="'出勤率排行'" :expand="false">
                    </rank-list>
                </div>
            </div>
            <div class="split"></div>


            <!-- 续费率 -->
            <div class="xufeilv-container">
                <div class="percent">
                    <card-percent :color="'#88C057'" :type="1" :data="xufei"  @clickHelp="showHelp(2,$event)" style="height:130px"></card-percent>
                </div>   

                <!-- 趋势分析 -->
                <div class="line-chart" >
                    <div class="line-chart-title" v-if="reportType != 'year'">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="icon-circle" >
                            <circle  cx="5" cy="5" r="4" stroke="#78AEF9" stroke-width="2" fill="transparent"></circle>
                        </svg>
                        <span v-if="reportType == 'day'" >近7天续费率趋势分析</span>
                        <span v-if="reportType == 'month'" >近两年续费率趋势分析</span>

                    </div>
                    <echarts v-if="reportType == 'day'" :key="1" :setOption="dayXufeiChart" style="height:190px" :action="{type:'showTip',seriesIndex:0,dataIndex:7}"></echarts>
                    <echarts v-if="reportType == 'month'" :key="2" :setOption="monthXufeiChart" style="height:190px" :action="monthAction"></echarts>
                    <div v-if="reportType == 'year'" class="yearForm"> 
                        <div>
                            <div>与去年同期相比，续费率</div>
                            <div>
                                <svg class="icon">
                                    <use :xlink:href="globalData.renewIncreateRate >=0 ?'#icon-zengchang':'#icon-jiangdi'"></use>
                                </svg>
                                <span>{{globalData.renewIncreateRate >=0 ? '+' : ''}}{{globalData.renewIncreateRate}}%</span>
                            </div>
                        </div>
                        <svg class="icon">
                            <use xlink:href="#icon-tongqipeitu"></use>
                        </svg>
                    </div>
                </div>
                <div class="split"></div>
                <div class="rank-campus">
                    <rank-list :data="xufeiRanksList" color="#88C057"
                        v-bind:list.sync="xufeiRanksList.list" type="sort5" 
                        @toggle="refreshScroll" :title="'续费率排行'" :expand="false">
                    </rank-list>
                </div>
            </div>
            <div class="split"></div>
            
        </div>

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
    import {_dayClassManban,_dayClassChuqin,_dayClassXufei,_monthClassManban,_monthClassChuqin,_monthClassXufei} from './option/line.js';
    import {classReport} from 'dailyReport/api/home.js';
    import {dateCreate,transTrend,offset} from './option/tool.js';
    import help from './child/help-popup.vue';

    export default {
        name: "classes",
        props: {

        },
        data() {
            return { 
                wxTitle:'班级分析',
                isLoading: false,  //加载动画 
                tempdate:'',
                monthAction:{type:'showTip',seriesIndex:0,dataIndex:0},
                headerObj:{
                    title:'班级分析',
                    content:[{name:'日期',value:''}]
                },
                manban:{
                    title:'满班率',
                    rate:0,
                    total:0,
                },
                chuqin:{
                    title:'出勤率',
                    rate:0,
                    total:0,
                },
                xufei:{
                    title:'续费率',
                    rate:0,
                    total:0,
                    countName:["应续费人数","已续费人数"],
                    count3:'-',
                    count4:'-'
                },
                globalData:{},
                manbanRanksList:{
                    total:0,
                    list:[],
                    listCountDown:[]
                },
                chuqinRanksList:{
                    total:0,
                    list:[],
                    listCountDown:[]
                },
                xufeiRanksList:{
                    total:0,
                    list:[],
                    listCountDown:[]
                },
                dayManbanChart:_dayClassManban,
                dayChuqinChart:_dayClassChuqin,
                dayXufeiChart:_dayClassXufei,
                monthManbanChart:_monthClassManban,
                monthChuqinChart:_monthClassChuqin,
                monthXufeiChart:_monthClassXufei,

                reportType:'day',
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
                    queryDate:this.tempdate
                }
                this.isLoading = true;
                classReport(params).then(res=>{
                    this.isLoading = false;
                    if (res.ErrorCode == 200){
                        this.globalData = res.Data;
                        this.transData(resolve(res.Data));
                    }
                });
            },

            transData(resolve){
                this.manban.rate = this.globalData.fullClassRate;
                this.manban.total = this.globalData.fullClassCount;
                
                this.chuqin.rate = this.globalData.attendanceRate;
                this.chuqin.total = this.globalData.AttendanceClassCount;

                this.xufei.rate = this.globalData.renewRate;
                this.xufei.total = this.globalData.RenewClassCount;
                this.xufei.count3 = this.globalData.ShouldRenewCount;
                this.xufei.count4 = this.globalData.AlreadyRenewCount;

                this.manbanRanksList = resolve.manbanRank;
                this.manbanRanksList.total = this.globalData.fullClassCount;
                this.chuqinRanksList = resolve.chuqinRank;
                this.chuqinRanksList.total = this.globalData.AttendanceClassCount;
                this.xufeiRanksList = resolve.xufeiRank;
                this.xufeiRanksList.total = this.globalData.RenewClassCount;


                if (this.globalData.dayTrendList ){       //日报
                    let manban = resolve.dayData.fullRate;
                    _dayClassManban.setxAsis(manban[0]).setData(manban[1]);
                    this.dayManbanChart = Object.assign({},_dayClassManban)

                    let chuqin = resolve.dayData.attendRate;
                    _dayClassChuqin.setxAsis(chuqin[0]).setData(chuqin[1]);
                    this.dayChuqinChart = Object.assign({},_dayClassChuqin);

                    let xufei = resolve.dayData.renewRate;
                    _dayClassXufei.setxAsis(xufei[0]).setData(xufei[1]);
                    this.dayXufeiChart = Object.assign({},_dayClassXufei);
                }else if (this.globalData.monthLastyearTrendList){       //月报
                    let month = resolve.monthData,
                        pre,cur;

                    pre = month.fullRate.pre, cur = month.fullRate.cur;
                    _monthClassManban.setxAsis(pre[0]).setData(cur[1],pre[1]).setLegend(cur[1][0].name,pre[1][0].name);
                    this.monthManbanChart = Object.assign({},_monthClassManban);
                    
                    
                    pre = month.attendRate.pre, cur = month.attendRate.cur;
                    _monthClassChuqin.setxAsis(pre[0]).setData(cur[1],pre[1]).setLegend(cur[1][0].name,pre[1][0].name);
                    this.monthChuqinChart = Object.assign({},_monthClassChuqin);


                    pre = month.renewRate.pre, cur = month.renewRate.cur;
                    _monthClassXufei.setxAsis(pre[0]).setData(cur[1],pre[1]).setLegend(cur[1][0].name,pre[1][0].name);
                    this.monthXufeiChart = Object.assign({},_monthClassXufei);
                }
                
                this.refreshScroll();
            },
                
        },
        created() { 
            
        },
        mounted() { 
            let param = app.tool.parseHash();
            this.headerObj.content[0].value = this.tempdate =  param.query.date;
            this.monthAction.dataIndex = +app.filters.formatDatetime(this.tempdate,'MM');
            this.QueryData();
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

        function getRankData(data,key){
            
            let top = data[key + 'TopRanks'],
                last = data[key + 'LastRanks'];
            top.forEach(item=>{
                item.name = item.className + '(' + item.campusName + ')';
                item.value = item.rate;
                item.unit = '%';
            })
            last.forEach(item=>{
                item.name = item.className + '(' + item.campusName + ')';
                item.value = item.rate;
                item.unit = '%';
            })
            return {
                total:0,
                list:top,
                listCountDown:last
            }
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
                manbanRank:getRankData(data,'fullClass'),
                chuqinRank:getRankData(data,'attendance'),
                xufeiRank:getRankData(data,'renew'),
                dayData:getDayData(data,['fullRate','attendRate','renewRate']),
                monthData:getMonthData(data,['fullRate','attendRate','renewRate'])
            }
        }
    })();
    
    

</script>

<style>
.classes canvas{
    z-index: -1;
}
</style>

<style scoped lang="scss">
	
	
    .classes{
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
            padding-bottom:0;
            border-top:1px solid #ddd;
            border-bottom:1px solid #ddd;
            .chuqinlv-container, .manbanlv-container, .xufeilv-container{
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
                        font-size: 12px;
                        color: #666;
                    }
                }
            }
        }

    }
</style>