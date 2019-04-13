<template>
<div>
    <!-- 标题 -->
    <scroller-base class="classes" :options="{scrollbars:false}" ref="scroll" style="height:100%">
	    <header-define :data="headerObj"></header-define>

        <div class="main-content">
            <div class="line-chart">
                <div class="line-chart-title">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="icon-circle" >
                        <circle  cx="5" cy="5" r="4" stroke="#78AEF9" stroke-width="2" fill="transparent"></circle>
                    </svg>
                    <span>{{trendTitle}}</span>

                </div>
                <echarts :setOption="dayManbanChart" style="height:210px; padding-bottom:20px" :action="{type:'showTip',seriesIndex:0,dataIndex:3}"></echarts>
                <div class="explain" v-html="showText.explain"></div>                        
            </div>
            <div class="split"></div>

            <div class="annotation">
                <div class="calc">
                    <div class="calc-title">公式：</div>
                    <div class="calc-content" v-html="showText.calc"></div>
                </div>                    
                <div class="suggest" v-if="showSuggest">
                    <div class="suggest-title">改善建议：</div>
                    <div class="suggest-content" v-html="showText.suggest"></div>
                </div>
            </div>


            
            <div class="split" v-if="reportType == 2|| reportType ==1"></div>
            <div class="rank-campus" v-if="reportType == 2|| reportType ==1">
                <rank-list :data="manbanRanksList" color="#78AEF9" 
                    v-bind:list.sync="manbanRanksList.list" type="sort5" 
                    @toggle="refreshScroll" :title="rankTitle" :expand="false">
                </rank-list>
            </div>
        </div>

    </scroller-base>
    <loading v-show="isLoading" :bgType="1"></loading>
</div>
</template>

<script>
    import echarts from 'dailyReport/components/common/echarts/echarts.vue';
    import headerDefine from '../child/header-define.vue';
    import rankList from '../child/rank-list.vue';
    import {dateCreate} from '../option/tool.js';
    import {_dayClassManban} from '../option/line.js';
    import {getWeeklyDetail} from 'dailyReport/api/week-home.js';

    _dayClassManban.grid.left =  _dayClassManban.grid.right = 20;


    //type=1 => 表示是typeMap[1]
    //1=>排课  2=》点名   3=》ssx  4=》录入  5=》入班
    const typeMap = [{},{
        title:'排课率分析',
        rank:'排课率排行',
        trend:'近4周排课率趋势分析',
        key:'paike',
    },{
        title:'点名率分析',
        rank:'点名率排行',
        trend:'近4周点名率趋势分析',
        key:'dianming'
    },{
        title:'师生信绑定率分析',
        rank:'',
        trend:'近4周师生信绑定率趋势分析',
        key:'ssx'
    },{
        title:'录入率分析',
        rank:'',
        trend:'近4周录入率趋势分析',
        key:'luru',
    },{
        title:'入班率分析',
        rank:'',
        trend:'近4周入班率趋势分析',
        key:'ruban',
    }];

    const annotation = {
        luru:{
            explain:'说明：本指标让您知晓，您的学校是否已经把所有的学员信息都录入到校管家系统了。',
            calc:'学员录入率=系统中的学员人数/购买的学员人数*100%',
            suggest:'请督促工作人员务必将学校所有的学员信息都录入到校管家系统，便于统一管理。'
        },
        ruban:{
            explain:'说明：只有让学员进入班级（分班操作）后，系统才能对学员进行后续的排课、上课及课消计算等工作。本指标让您知晓，您学校的学员是否都已经进行了分班操作（不统计一对一）。',
            calc:'学员入班率=已分班的学员人数/学员总人数*100%',
            suggest:'请督促工作人员务必对所有在读学员进行分班操作。'
        },
        paike:{
            explain:'说明：只有对班级进行了排课操作，系统才能对学员进行上课点名及课消计算等工作。本指标让您知晓，最近一周您的学校有多少比例的班级有排课记录。 ',
            calc:'排课率=最近一周已排课的班级数/班级总数*100%',
            suggest:'1）请督促工作人员，对于正在上课的班级，务必及时在系统中进行排课操作；<br/>2）请提醒工作人员，及时清理已结业了的班级，并在系统中进行结业操作。'
        },
        dianming:{
            explain:'说明：只有进行上课点名操作之后，系统才能统计出学员的实际课消和学校的确认收入。如果本指标过低，则表明最近一周有很多已经排了课的班级却没有进行上课点操作。',
            calc:'点名率=最近一周已点名的课次数/最近一周已排课的课次数*100%',
            suggest:'请督促任课老师在上课前务必在手机上进行点名操作，即使课前没来得及点名，课后也及时补点名。'
        },
        ssx:{
            explain:'说明：学生家长是否关注并绑定了师生信，是您的学校在线进行贴心家校服务、增强客户黏度的前提。本指标让您知晓，有多少比例的家长手机绑定了学校的师生信平台。',
            calc:'师生信绑定率=关注并绑定了师生信的学员人数/学员总人数*100%',
            suggest:'1）请督促工作人员，宣传推广师生信并引导家长绑定师生信；<br/>2）请提醒工作人员，对于已退学的学员，及时在系统中进行退学操作。'
        }
    }


    export default {
        name: "classes",
        props: {

        },
        data() {
            return { 
                wxTitle:typeMap[1].title,
                isLoading: false,  //加载动画 
                tempdate:'',
                headerObj:{
                    title:'',
                    content:[{name:'统计日期',value:''}]
                },
                showText:'',
                rankTitle:'',
                trendTitle:'',
               showSuggest:false,
                globalData:{},
                manbanRanksList:{
                    total:0,
                    list:[],
                    listCountDown:[]
                },
                
                dayManbanChart:_dayClassManban,
                reportType:1,
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

            QueryData(){
                let params = {
                    type: this.reportType,
                    queryDate:this.tempdate,
                    top:5,
                }
                this.isLoading = true;
                getWeeklyDetail(params).then(res=>{
                    this.isLoading = false;
                    if (res.ErrorCode == 200){
                        this.manbanRanksList = getRankData(res.Data);
                        let manban = trans(res.Data.TrendItems)
                        _dayClassManban.setxAsis(manban[0]).setData(manban[1]);
                        _dayClassManban.series[0].data[1].emphasis = {label:{align:'center'}};
                        _dayClassManban.series[0].data[2].emphasis = {label:{align:'center'}};
                        _dayClassManban.series[0].data[3].emphasis = {label:{align:'right'}};
                        this.dayManbanChart = Object.assign({},_dayClassManban)
                        this.refreshScroll();
                    }
                });
            },
                
        },
        created() { 
            
        },
        mounted() { 
            let param = app.tool.parseHash();

            //tempdate
            let date = dateCreate(param.query.date);
            this.tempdate =  app.filters.formatDatetime(date,'yyyy-MM-dd');

            //sdate-edate
            date.setDate(date.getDate()-1);
            let edate = app.filters.formatDatetime(date,'yyyy-MM-dd');          
            date.setDate(date.getDate()-6);
            let sdate = app.filters.formatDatetime(date,'yyyy-MM-dd');
            this.headerObj.content[0].value = sdate + '至' + edate;
            
            this.showSuggest = param.query.showSuggest === 'true';
            this.reportType = param.query.type;
            let typeObj = typeMap[+this.reportType];

            this.wxTitle = this.headerObj.title = typeObj.title;
            this.rankTitle = typeObj.rank;
            this.trendTitle = typeObj.trend;

            this.showText = annotation[typeObj.key];


            this.QueryData();
        },
        components: { 
            headerDefine,
            echarts,
            rankList,
        },
        watch: { 

        }
    }


    function getRankData(data){
        let top = data.TopCampusItems,
            last = data.BottomCampusItems;
        top.forEach(item=>{
            item.name = item.CampusName;
            item.value = item.Rate;
            item.unit = '%';
        })
        last.forEach(item=>{
            item.name = item.CampusName;
            item.value = item.Rate;
            item.unit = '%';
        })
        return {
            total:data.CampusCount,
            list:top,
            listCountDown:last
        }
    }

    function trans(list){
        list.reverse();
        let len = list.length,
            xAsis = [],
            trend = [],
            rateArr = calcTrendRate(list,'Rate');
        list.forEach((item,index)=>{
            let sdate = app.filters.formatDatetime(item.StartDateTime,'MM.dd'),
                edate = app.filters.formatDatetime(item.EndDateTime,'MM.dd'),
                name = sdate+'\n'+edate;
            xAsis.push(name);
            trend.push({
                name,
                rate:rateArr[index],
                value:item.Rate,
                valueShow:item.Rate + '%'
            });
        })
        return [xAsis,trend]
    }


    //生成百分比趋势.
function calcTrendRate(arr,key){
    return arr.map((item,index)=>{
        if (index === 0 || item[key] == arr[index-1][key]){
            return NaN;
        } else {
            return (item[key] - arr[index - 1][key]).toFixed(2);
        }
    });
}
    

</script>

<style>
.classes canvas{
    z-index: -1;
}

.classes .rank-list .rank-item .rank-bar-show .rank-bar-container{
    width:100% !important;
}
</style>

<style scoped lang="scss">
	
	
    .classes{

        >div{
            width:100%;
        }
        .split{
            width:100%;
            height:10px;
            background: #EEF1F6;
        }
        .main-content{
            padding:40px 0;
            padding-bottom:0;
            border-top:1px solid #EEF1F6;
            border-bottom:1px solid #EEF1F6;
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
                .explain{
                    border-top:1px solid #EEF1F6;
                    padding:20px 15px;
                    color:#999;
                    font-size:12px;
                }
            }

            .annotation{
                font-size: 14px;  
                .calc{
                    margin:15px;
                    .calc-title{
                        color:#333;
                        font-weight: bold;
                        margin-bottom:5px;
                    }
                    .calc-content{
                        background:#F0F0F0;
                        color:#333;
                        padding:10px;
                        border-radius: 4px;
                    }
                }

                .suggest{
                    border-top:1px solid #EEF1F6;
                    font-size:14px;
                    .suggest-title{
                        margin:15px;
                        color:#333;
                        font-weight: bold;
                        margin-bottom:5px;
                    }
                    .suggest-content{
                        margin:15px;
                        color:#666;

                    }
                }
            }
        }

    }
</style>