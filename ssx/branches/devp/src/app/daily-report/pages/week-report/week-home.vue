<template>
<div  class="week-home">
	<scroller-base :data="useStatus" :options="{scrollbars:false}" style="height:100%">
		<div class="header" :style="{backgroundImage:'url('+bgObj.bg+')'}">
            <div class="title">上周得分</div>
            <div class="msg">统计日期：{{dateShow}}</div>

            <div class="score-show" v-if="score!==null">
                <echarts :setOption="option" style="height:140px;width:140px;"></echarts>
            </div>

            <div class="description" v-if="score >= 0.01 && !(useStatus.luru.rate && useStatus.luru.rate < 50)">
                <span v-if="leadRate<99">领先于{{leadRate.toFixed(2)}}%的用户</span>
                <span v-else>您领先所有的学校</span>
            </div>
        </div>


		


        <div class="rank-show">
            <router-link tag="div" :to="`/week-detail?type=${item.href}&date=${tempdate}&showSuggest=${item.rate<80}`" 
                class="show-item" v-for="(item,index) in list" :key="index"
                v-if="!(item.key ==='luru' && item.rate === null)">
                <div class="item-title">
                    <span>{{item.name}}：</span>
                    <span class="score">{{item.rate}}%，</span>
                    <span>使用情况</span>
                    <span :class="{good:item.rate>=80,bad:item.rate<80}">{{item.rate>= 80 ? '良好':'较差'}}</span>
                </div>
                <div class="rank-bar-container">
                    <div class="rank-bar" v-bind:style="{width:item.rate + '%'}">
                        <span v-if="item.rate>40">{{item.rate}}%</span>
                    </div>
                    <span v-if="item.rate<=40">{{item.rate}}%</span>
                </div>

                <div class="item-suggest">
                    <svg class="icon">
                        <use xlink:href="#icon-xinxi"></use>
                    </svg>
                    <span v-if="item.rate>=80">保持不错，再接再厉哦</span>
                    <span v-else>查看如何提高{{item.name}}</span>

                    <svg class="icon goto" v-if="item.rate<80">
                        <use xlink:href="#icon-qianwang"></use>
                    </svg>
                </div>
            </router-link>
        </div>


	</scroller-base>
	<loading v-show="isLoading" :bgType="1"></loading>

</div>	
</template>

<script>
	import {dateCreate} from '../option/tool.js';
	import echarts from 'dailyReport/components/common/echarts/echarts.vue';
    import {getWeeklyOverview} from 'dailyReport/api/week-home.js';
    import {} from 'dailyReport/assets/js/echarts-liquidfill.min.js';


    const blueBg = require('../../assets/img/blue.jpg'),
          greenBg = require('../../assets/img/green.jpg'),
          redBg = require('../../assets/img/red.jpg');

    const optionColor = [{
            color:'#7ED321',
            bg:greenBg,
            pos:['50%','50%']
        },{
            color:'#78AEF9',
            bg:blueBg,
            pos:['50%','20%']
        },{
            color:'#FF788D',
            bg:redBg,
            pos:['50%','30%']
        }];
    function cData(name,key,showIndex,href){
        return {
            name,
            key,
            showIndex,            
            href,
            rate:100,
        }
    }
    

	export default {
		data() {
			return {
				wxTitle:'系统使用情况',
				isLoading: false,  //加载动画             
				
                tempdate:'',
                dateShow:'',
                score:null,
                leadRate:0,
                option:{
                    color:['#78AEF9'],
                     series: [{
                        type: 'liquidFill',
                        center: ['50%', '50%'],
                        radius: '80%',
                        backgroundStyle: {
                            color:'#fff',
                            borderColor: '#78AEF9',
                            borderWidth: 1,
                        },
                        itemStyle:{
                            shadowBlur:0,
                        },
                        outline: {
                            show: false
                        },
                        label: {
                            normal: {
                                color: "#78AEF9", 
                                fontSize: 16,
                                formatter: item=>{
                                    return this.useStatus.luru.rate !== null && this.useStatus.luru.rate < 50 ? '录入率过低'
                                                                                  : (item.data*100).toFixed(2)+'分'
                                },
                                position:['50%','50%'],
                            }
                        },
                        data: [0.80],
                        amplitude:7,
                    }]
                },
				useStatus:{
                    luru:cData('学员录入率','luru',0,4),
                    ruban:cData('学员入班率','ruban',1,5),
                    paike:cData('本周排课率','paike',2,1),
                    dianming:cData('本周点名率','dianming',3,2),
                    ssx:cData('师生信绑定率','ssx',4,3)
                },
                
			}
        },
        computed: {
            list(){
                let arr = Object.values(this.useStatus);
                arr.sort((a,b)=>a.showIndex - b.showIndex);
                return arr;
            },
            bgObj(){
                return this.useStatus.luru.rate !== null && this.useStatus.luru.rate < 50 ? optionColor[2] :        //录入率过低直接红色
                                this.score >=80 ? optionColor[0] : this.score >= 60 ? optionColor[1] : optionColor[2];
            }
		},
		methods: {
			transData(data){
                let useStatus = this.useStatus;
                //录入率
                useStatus.luru.rate = data.TotalStudentCount == -1 ? null: data.EnterRate;
                //入班率
                useStatus.ruban.rate = data.InClassRate;
                //师生信绑定率
                useStatus.ssx.rate = data.BindingRate;
                //排课率
                useStatus.paike.rate = data.CourseRate
                //点名率
                useStatus.dianming.rate = data.AttendanceRate;

			},

			QueryData(){
                this.isLoading = true;
                getWeeklyOverview({
                    queryDate:this.tempdate
                }).then(res=>{
                    this.isLoading = false;
                    if (res.ErrorCode == 200){
                        let data =  res.Data;

                        this.transData(data);  
                        this.score =  data.Score;
                        this.leadRate = data.LeadRate;

                        let option = this.option;
                        option.series[0].data[0] = this.score / 100;
                        option.series[0].color = [this.bgObj.color];
                        option.series[0].backgroundStyle.borderColor = this.bgObj.color;
                        option.series[0].label.normal.color = this.bgObj.color;
                        option.series[0].label.normal.position = this.bgObj.pos;
                        this.option = Object.assign({},option);
                    }
                })                    
            },
		},
		created(){
            let param = app.tool.parseHash();

            let date = dateCreate(param.query.date);
            this.tempdate =  app.filters.formatDatetime(date,'yyyy-MM-dd');

            date.setDate(date.getDate()-1);
            let edate = app.filters.formatDatetime(date,'yyyy-MM-dd');
           
            date.setDate(date.getDate()-6);
            let sdate = app.filters.formatDatetime(date,'yyyy-MM-dd');
            this.dateShow = sdate + '至' + edate;
            
            this.QueryData();
		},
		mounted(){

            
		},
        components: {
			echarts,
        }
	}


	
	
</script>



<style scoped lang="scss">
	.week-home {

        background:rgba(238,241,246,1);
		.no-campus{
			@include position-absolute;
			z-index: 9999999;
			background: #fff;
			@include flex-center;
			flex-direction: column;
			.title{
				font-size:15px;
				color:#666;
				svg{
					font-size:15px;
				}
			}
			>div:last-child{
				margin-top:10px;
				text-align: center;
				color:#999;
			}
		}

        .header{
            height:240px;
            width:100%;
            margin-bottom:10px;
            background-size:100% 100%;
            @include flex-center(column);
            .title{
                font-size:16px;
                font-weight:bold;
                color:#000;
            }
            .msg{
                font-size:12px;
                color:#666;
            }
            .score-show{
                @include flex-center;
            }
            .description{
                font-size:12px;
                color:#666;
            }
        }

        .rank-show{
           
            .show-item{
                margin-bottom:10px;
                padding:15px;
                padding-top:10px;    
                background: #fff;        
                .item-title{
                    margin-bottom:5px;
                    span.good,span.bad{
                        font-size:18px;
                        vertical-align: baseline;
                        margin-left:5px;
                        color:#7ED321;
                        font-weight: bold;
                    }
                    span.bad{
                        color:#FF788D;
                    }
                }
                .rank-bar-container{
                    width:100%;
                    @include flex-center;
                    justify-content: flex-start;
                    >span{
                        margin-left:10px;
                        color:#78AEF9;
                    }
                    .rank-bar{
                        background:#78AEF9;
                        border-radius:5px;
                        height:30px;
                        padding-right:20px;
                        @include flex-center;
                        justify-content: flex-end;
                        color:#FFFFFF;
                        font-size:13px;
                        &.count-down{
                            background:#F8800A;
                        }
                    }
                }

                .item-suggest{
                    margin-top:10px;
                    color:rgb(0,128,0);
                    height:32px;
                    
                    padding-left:16px;
                    background:#F0F0F0;
                    position: relative;
                    .icon{
                        font-size:16px;
                        margin-right:6px;
                        vertical-align: -4px;
                    }
                    .icon.goto{
                        font-size:10px;
                        position: absolute;
                        right:5px;
                        top:12px;
                    }
                    span{
                        color:#666;
                        line-height: 32px;
                        font-size:12px;
                        
                    }
                }
            }
        }
     
	}
</style>