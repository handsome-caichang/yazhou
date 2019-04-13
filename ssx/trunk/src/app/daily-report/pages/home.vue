<!-- 老师端 -->
<template>
<div  class="home">
	<scroller-base :data="globalData" :options="{scrollbars:false}" style="height:100%">
		<!-- 标题 -->
		<header-define :data="header">
            <div class="title" @click.stop="showHelp(5,$event)" ref="titleHelp">
                运营总览
                <svg class="icon"><use xlink:href="#icon-bangzhu"></use></svg>
            </div>
        </header-define>
		<!-- 图表区 -->
		<div class="charts-container">
			<!-- 收费金额和课消金额 -->
			<div class="rectangle">
				<!-- <router-link class="charge" tag="div" :to="{name:'charge',query:{date:tempdate}}"> -->
				<div class="charge" @click="gotoUrl('charge')">
					<echarts :setOption="dayChargeChart" key="charge" style="height:210px;" :action="{type:'showTip',seriesIndex:0,dataIndex:6}"></echarts>
				</div>
				<!-- </router-link> -->

				<!-- <router-link class="courseConsume" tag="div" :to="{name:'consume',query:{date:tempdate}}"> -->
				<div class="courseConsume" @click="gotoUrl('consume')">
					<echarts :setOption="dayConsumeChart" key="consume" style="height:210px;" :action="{type:'showTip',seriesIndex:0,dataIndex:6}"></echarts>
				</div>
				<!-- </router-link> -->
			</div>

			<!-- 班级指标 -->
			<div class="classes">
				<div class="classes-title">
					<svg class="icon"><use xlink:href="#icon-banjizhibiao"></use></svg>
					<span>班级指标</span>
				</div>

				<!-- <router-link tag="div" :to="{name:'classes',query:{date:tempdate}}" class="classes-charts"> -->
				<div class="classes-charts" @click="gotoUrl('classes')">
					<!-- 满班率 -->
					<div>
						<echarts :setOption="pie1" style="height:140px;width:100%;" :key="1" :action="{type:'highlight',dataIndex:0}"></echarts>
						<div @click.stop="showHelp(0,$event)">满班率<svg class="icon"><use xlink:href="#icon-bangzhu"></use></svg></div>
					</div>
					<div>
						<echarts :setOption="pie2" style="height:140px;width:100%;" :key="2" :action="{type:'highlight',dataIndex:0}"></echarts>
						<div @click.stop="showHelp(1,$event)">出勤率<svg class="icon"><use xlink:href="#icon-bangzhu"></use></svg></div>
					</div>
					<div>
						<echarts :setOption="pie3" style="height:140px;width:100%;" :key="3" :action="{type:'highlight',dataIndex:0}"></echarts>
						<div @click.stop="showHelp(2,$event)">续费率<svg class="icon"><use xlink:href="#icon-bangzhu"></use></svg></div>
					</div>
				</div>
				<!-- </router-link> -->
			</div>

			<!-- 招生情况 -->
			<div class="customer">
				<div class="customer-title">
					<svg class="icon"><use xlink:href="#icon-zhaoshengqingkuang"></use></svg>
					<span>招生情况</span>
				</div>
				<!-- <router-link class="customer-charts" tag="div" :to="{name:'customer',query:{date:tempdate}}"> -->
				<div class="customer-charts" @click="gotoUrl('customer')">
					<div class="charge">
						<card :data="daofang" :color="'#78AEF9'" @clickHelp = "showHelp(3,$event,'down')"></card>
					</div>
					<div class="charge">
						<card :data="zhuanhua" :color="'#75859B'" @clickHelp = "showHelp(4,$event,'down')"></card>
					</div>
				</div>
				<!-- </router-link> -->
			</div>
		</div>
		

		<!-- 返回旧版 -->
		<div class="goto-old">
			<div @click="gotoOld">
				<svg class="icon">
					<use xlink:href="#icon-fanhuijiuban"></use>
				</svg>
				<span>返回旧版</span>
			</div>
		</div>
		<help ref="help"></help>
	</scroller-base>
	<loading v-show="isLoading" :bgType="1"></loading>

	<div class="no-campus" v-if="!anyCampus">
			<div class="title">
				<svg class="icon"><use xlink:href="#icon-jinggao1"></use></svg>
				您的用户还没有分配可操作校区<br/>
			</div>
			<div>
				只有分配了可操作校区才能看到此报表<br/>
				请联系管理员进行分配。<br/>
			</div>
	</div>	
</div>	
</template>

<script>
	import headerDefine from './child/header-define.vue';
	import card from './child/card-rate.vue';
	import echarts from 'dailyReport/components/common/echarts/echarts.vue';
	import {_indexCharge, _indexConsume} from './option/lineIndex.js';
	import {dateCreate,transTrend,offset} from './option/tool.js';
	import {_indexPie1,_indexPie2,_indexPie3} from './option/pieIndex.js';
	import {overview} from 'dailyReport/api/home.js';
	import help from './child/help-popup.vue';

	export default {
		data() {
			return {
				wxTitle:'运营总览',
				isLoading: false,  //加载动画             
				anyCampus:true,
				header:{
					title:'运营总览',
					content:[{name:'日期',value:''}]
				},
				tempdate:'',
				daofang:{
                    title:'到访率',
                    rate:0,
                    countName:['邀约人数','到访人数'],
                    count1:0,
                    count2:0,
				},
				pie1:_indexPie1,
				pie2:_indexPie2,
				pie3:_indexPie3,
                zhuanhua:{
                    title:'转化率',
                    rate:0,
                    countName:['已跟进','已转化'],
                    count1:0,
                    count2:0,
                },
				globalData:null,
				dayChargeChart:_indexCharge,
				dayConsumeChart:_indexConsume,
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
			gotoUrl(url){
				if (this.$refs.help.visible){
					this.$refs.help.visible = false;
				} else {
					this.$router.push(url + '?date=' + this.tempdate);
				}
			},
			gotoOld(){
				window.location.replace('dailyReport/reportIndex.html?time=' + this.tempdate + '&comeFrom=1');
			},
			transData(resolve){
				let data = this.globalData;
				this.daofang.rate = data.visitRate;
                this.daofang.count1 = data.inviteCount;
                this.daofang.count2 = data.visitCount;                
                this.zhuanhua.rate = data.translateRate;
                this.zhuanhua.count1 = data.validCount;
				this.zhuanhua.count2 = data.transferCount;
				

				this.globalData.totalCharge = app.filters.formatNumberUnit(this.globalData.totalCharge,2)
				this.globalData.totalConsume = app.filters.formatNumberUnit(this.globalData.totalConsume,2)

				_indexCharge.setxAsis(resolve.dayTrendCharge[0]).setData(resolve.dayTrendCharge[1])
						   .setSubText(this.globalData.totalCharge,this.globalData.chargeStudentCount)
				

				
				this.dayChargeChart = Object.assign({},_indexCharge);
				

				_indexConsume.setxAsis(resolve.dayTrendConsume[0]).setData(resolve.dayTrendConsume[1])
							.setSubText(this.globalData.totalConsume,this.globalData.courseStudentCount)
				this.dayConsumeChart = Object.assign({},_indexConsume);

				_indexPie1.setData(resolve.pie1);
				this.pie1 = Object.assign({},_indexPie1);

				_indexPie2.setData(resolve.pie2);
				this.pie2 = Object.assign({},_indexPie2);

				_indexPie3.setData(resolve.pie3);
				this.pie3 = Object.assign({},_indexPie3);
			},

			QueryData(){
                // TODO:  推送时间
                let params = {
                    reportType: this.reportType,
                    queryDate:this.tempdate
                }
                this.isLoading = true;
                overview(params).then(res=>{
                    this.isLoading = false;
                    if (res.ErrorCode == 200){
						this.anyCampus = res.Data.AnyCampus;
						if (this.anyCampus){
							this.globalData = res.Data;
                        	this.transData(resolve(res.Data));
						}
                    }
                });
            },
		},
		created(){
			// TODO:  推送时间
			let param = app.tool.parseHash();
			this.header.content[0].value = this.tempdate =  param.query.date;
			this.QueryData();
		},
		mounted(){
            //是否显示第一次帮助
            let firstHelp = localStorage.getItem('firstHelp'),
                titleDiv = this.$refs.titleHelp,
                pos = offset(titleDiv);
            if (!firstHelp){
                this.$refs.help.show(5,pos.left,pos.top,'up');
                localStorage.setItem('firstHelp','hasShown');
            }
		},
        components: {
			echarts,
			card,
			headerDefine,
			help
        }
	}

	/*--------------------------------------------------数据转换--------------------------------------------------*/
	const resolve = (function(){

		function getDayTrend(data,key,valKey){
            if (data[key]){   
                const list = [...data[key]];
                list.sort((a,b)=>{
                    return dateCreate(a.Date || a.date).getTime() - dateCreate(b.Date || b.date).getTime()
				})
				list.push(list[list.length-1]);
                return transTrend(list,'dd',valKey);
            } else {
                return null;
            }
		}

		function getPie(rate,name){
			return [{
				value:rate / 100,
				name
			},{
				value:1- rate / 100,
				name:''
			}]
		}

		return function(data){
			return {
				dayTrendCharge:getDayTrend(data,'dayChargeTrend','totalCharge'),
				dayTrendConsume:getDayTrend(data,'dayConsumeTrend','totalConsume'),
				pie1:getPie(data.fullClassRate,'满班率'),
				pie2:getPie(data.attendanceRate,'出勤率'),
				pie3:getPie(data.renewRate,'续费率'),
			}
		}
	})()
	
</script>

<style scoped lang="scss">
	.home {
		.icon{
			font-size: 18px;
        }
        
        .header{
            .icon{
                fill:#ccc;
                margin-left:3px;
                font-size:13px;
            }
        }

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
		.charts-container{
			.rectangle{
				padding:10px 10px 0 10px;
				border-top:1px solid #eee;
				border-bottom:1px solid #eee;
				>div{
					width:100%;
					height:210px;
					margin-bottom:10px;
				}
			}
			.classes{
				margin-top:20px;
				padding:20px 10px;
				.classes-title{
					span{
						font-size: 16px;
						color:$color-3;
					}
				}
				.classes-charts{
					@include flex-between;
					margin-top:40px;
					>div{
						width:33%;
						@include flex-center(column);
						div:last-child{
							@include fs-lh(13);
							color:$color-3;
							.icon{
								fill:#ccc;
								margin-left:3px;
								font-size:13px;
							}
						}
					}
				}
			}

			.customer{
				margin-top:20px;
				padding:20px 10px;
				.customer-title{
					span{
						font-size: 16px;
						color:$color-3;
					}
				}
				.customer-charts{
					@include flex-between;
					margin-top:30px;
					>div{
						width:calc(50% - 7px);
					}
				}
			}
		}

		.goto-old{
			height: 85px;
			background: #EEF1F6;
			@include flex-center(column);
			margin-top:-5px;
			>div{
				font-size:14px;
				color:#546979;
				border:1px solid #7B8B97;
				border-radius:4px;
				padding:8px 18px;

			}
		}
	}
</style>