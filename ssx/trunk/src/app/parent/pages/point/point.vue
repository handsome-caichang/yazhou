<!--我的积分页面-->
<style lang="scss" scoped>
	
	
	.point-list{
		@include position-absolute;
		background-color: #EDF1F7;
		overflow: hidden;
		/*头部:有背景的积分展示*/
		.point-header{
			height:140px;
			/* @include background-img('../../assets/img/point/point-bg.jpg');*/
			@include flex-center;
			color:$color-white;
			.point-show-box{
				@include flex-center(column);
				font-size:36px;
				&>div:first-child{
					font-size:10px;
					opacity: 0.5;
				}
				&>div:last-child{
					font-size:12px;
					opacity:0.9;
					@include flex-center;
					svg.icon{
						font-size:14px;
						padding-right:2px;
					}
				}
			}
		}
		/*总价分,总减分*/
		.point-plus-reduce{
			background: rgba(80,174,247,1);
			height: 30px;
			@include flex-center;
			&>div{
				flex-grow:1;
				@include flex-center;
				font-size:12px;
				color:rgba(255,255,255,0.5);
				&>span.score{
					color:rgba(255,255,255,1);
					font-size:14px;
					margin-left:3px;
				}
			}
		}
		/*全部,加分,减分选项卡*/
		.point-tab{
			@include flex-center;
			height:40px;
			background:$color-white;
			align-items:stretch;
			>div{
				flex-grow:1;
				@include flex-center;
				align-items:stretch;
				>.tab-item-text{
					padding:0 7px;
					@include flex-center;
					border-bottom:2px solid transparent;
					&.active{
						color:#1E88F5;
						border-bottom:2px solid #1E88F5;
					}
				}
			}
			>div:nth-child(2){
				border-left:1px solid #EDF1F7;
				border-right:1px solid #EDF1F7;
			}
		}
		.point-list-scroller{
            @include position-absolute(180px);
            &.show-sum{
			    @include position-absolute(210px);
            }
			.point-month-header{
				padding:6px 0;
				@include flex-between;
				color:$color-6;
				background-color: #EDF1F7;
				@include fs-lh(12);
				.point-month-title{
					padding:0 15px;
				}
				.point-month-record{
					@include flex-between;
					justify-content:flex-end;
					>div{
						padding:0 10px;
						.plus{
							color:#A1C0DF;
						}
						.reduce{
							color:#F2B94E;
						}
					}
				}
			}
			.point-list-item{
				border-bottom: 1px solid #EDF1F7;
				@include flex-between;
				height:55px;
				background:$color-white;
				>div:first-child{
					padding-left:10px;
					>div:first-child{
						@include fs-lh(16);
						color:$color-3;
					}
					>div:last-child{
						@include fs-lh(12);
						color:$color-6;
					}
				}
				>div:last-child{
					padding-right:10px;
					&.reduce{
						color:#F2B94E;
					}
					&.plus{
						color:#A1C0DF;
					}
				}
			}
		}
		.bottom-line{
			height:10px;
			width:100%;
			background:#EDF1F7;
		}
		
		.noData-temp{
			margin-top: calc(50% - 80px);
		}
	}
</style>

<template>
	<div class="point-list">
		<!--头部,积分展示-->
		<div class="point-header" :style="'backgroundImage:url('+pointBg+')'">
			<div class="point-show-box">
				<div>当前积分</div>
				<div>{{pointInfo.point}}</div>
				<router-link tag="div" :to="'/pointRule'">
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-help"></use>
					</svg>
					<span>积分规则</span>
				</router-link>
			</div>
		</div>
			
		<!--总加分,总减分-->
		<!-- <div class="point-plus-reduce" >
			<div>
				<span>总加分</span>
				<span class="score">{{pointInfo.pointAdd}}</span>
			</div>
			<div>
				<span>总减分 </span>
				<span class="score">{{pointInfo.pointReduce}}</span>
			</div>
		</div> -->
		
		<!--选项卡-->
		<div class="point-tab" @click="changeTab">
			<div class="point-tab-item" data-type="0">
				<div class="tab-item-text" :class="{active : activeType == 0}">全部</div>
			</div>
			<div class="point-tab-item" data-type="1">
				<div class="tab-item-text" :class="{active : activeType == 1}">加分</div>
			</div>
			<div class="point-tab-item" data-type="-1">
				<div class="tab-item-text" :class="{active : activeType == -1}">减分</div>
			</div>
		</div>
		
		<!--积分列表-->
		<scroller-load class="point-list-scroller show-sum" 
			:type="1" 
			:data="list" 
			:pagingOption="pagingOption"
			ref="myScroller"
			@loadData="loadData">
				<div v-for="monthItem in listShow" v-if="monthItem.itemList.length>0" :key="monthItem.monthData.Date">
					<!--每月积分-->
					<div class="point-month-header">
						<div class="point-month-title">{{monthItem.monthData.DateName}}</div>
						<div class="point-month-record">
							<div v-if="pagingOption.params.type == 0 || pagingOption.params.type == 1">
								加分：<span class="plus">{{monthItem.monthData.addpoint || 0}}</span>
							</div>
							<div v-if="pagingOption.params.type == 0 || pagingOption.params.type == -1">
								减分：<span class="reduce">{{monthItem.monthData.deductionpoint || 0}}</span>
							</div>
						</div>
					</div>
					
					<div class="point-list-item" v-for="item in monthItem.itemList">
						<div>
							<div>{{item.settingname}}</div>
							<div>{{item.updatetime | formatDatetime('yyyy.MM.dd')}}</div>
						</div>
						<div :class="{'plus':item.type == 1,'reduce':item.type==-1}">
							{{item.type == 1 ? '+': ''}}{{item.point}}分
						</div>
					</div>
				</div>
				<div class="bottom-line"></div>
				<empty-page class="noData-temp" :type="10" v-if="list.length == 0"></empty-page>
		</scroller-load>
		
		
		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
	import {getstudentpointinfo,gettotalpointloginfos} from 'parent/api/point';
	import EmptyPage from 'parent/components/common/empty-page/empty-page';
    
    /**@description
     * App_ShowPointSum：师生信家长端，查看积分时是否显示加分和减分合计（1是0否）
     */
	//把积分项分类到每个月的数据里.
	function classify(list,tempItemList){
		let i;
		for (i = 0; i < list.length; i++){
			if (list[i].itemList.length == 0){
				break;
			}
		}
		i > 0 && i--;  
		tempItemList.forEach((item)=>{
			let itemDate = new Date(item.updatetime.split(' ')[0]),
				monthDate = new Date(list[i].monthData.time);
			if ( itemDate.getFullYear() == monthDate.getFullYear() && itemDate.getMonth() == monthDate.getMonth()){
				list[i].itemList.push(item);
			} else {
				i++;
				list[i].itemList.push(item);
			}
		})
	}
	
	function initList(monthList){
		let list = [];
		monthList.forEach(item=>{
			let month = new Date(item.time),
				today = app.localTimeToServer;
			if (month.getFullYear() == today.getFullYear() && month.getMonth() == today.getMonth()){
				item.DateName = '本月';				
			} else {
				item.DateName = month.getMonth()+1 + '月积分';
			}
			list.push({
				monthData:item,		//该月的数据汇总
				itemList:[]		//放置该月的所有积分项.	
			})
		});
		//TODO monthList还需排序(降序)
		
		return list;
	}
	
	export default {
		data(){
			return {
				wxTitle:'我的积分',
				activeType:0,
				list:[],		//积分列表
				listShow:[],	//每一项由一个月积分的积总和该月的所有积分项组成.
				isLoading:true,
				pointInfo:{
					point:0,
					pointAdd:0,
					pointReduce:0
				},
				pagingOption: {
					api: gettotalpointloginfos,
					params: {
						type:0
					}
				},
                pointBg: require('./img/point-bg.jpg'),    
			}
		},
		methods:{
			changeTab(event){
				let type,
					el = event.target,
					parentEl = el.parentElement;
				if ((type = el.dataset.type) !== undefined || (type = parentEl.dataset.type) !== undefined){
					this.activeType = type; 
					this.pagingOption.params.type = +type;
					this.$refs.myScroller.pagingRefresh(this.pagingOption.params);
				}
			},
			
			loadData(ajaxPromise){
				ajaxPromise.then(res => {
					this.isLoading = false;
					if (res.result.code == app.errok) {
						if (res.page.pageindex === 1) {
							this.list = [];
							this.listShow = [];
						}
						
						//从monthList里剔除在listShow里已经存在的月份
						let monthList = res.data.pointtotalinfo.filter(item=>this.listShow.every(val=>val.monthData.time != item.time));
						//listShow进行月分组,如果有新的月份统计,那么push到listShow里
						this.listShow.push(...initList(monthList));
						console.log(this.listShow);
						let data = res.data.pointloginfos;
						this.list = this.list.concat(data);
						classify(this.listShow,data);
					}
				})
			},
		},
		created(){
			let param = app.tool.parseHash();
            this.pointInfo = param.query;
            //解决积分入口进入无法获取总加分/总减分的问题
            //if (app.tool.isEmptyObject(this.pointInfo)) {
                getstudentpointinfo({}).then(res => {
					if (res.result.code === app.errok) {
						this.pointInfo = {
                            point: res.data.point,
                            pointAdd: res.data.point_add,
                            pointReduce: res.data.point_reduce
                        }
					}
				})
            //}
		},
		components:{
			EmptyPage
		}
	}
</script>