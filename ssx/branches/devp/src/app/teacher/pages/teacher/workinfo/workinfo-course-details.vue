<!--工作统计=>上课率-->
<style scoped lang="scss">
	.workinfo-details-container {
		background-color: $color-assist-1;
		.scroller {
			@include position-absolute(0, 0, 49px, 0);
			.card {
				background-color: $color-white;
				height: 86px;
				padding: 15px;
				padding-bottom: 12px;
				font-size: 12px;
				color: $color-6;
				@include border-bottom;
				.class-name {
					font-size: 15px;
					color: $color-3;
					@include ellipsis-single;
				}
				.time {
					margin: 3px 0 5px;
				}
				.count-box {
                    color: $color-9;
					@include flex-center;
					.unit {
						width: 66px;
						margin-right: 2px;
					}
					.amount,
					.cost,
					.less {
						flex: 1;
					}
                    .unit-s,.amount-s{
                        color: $color-3;
                    }
                    .cost-s{
                        color: #83C44E;
                    }
                    .less-s{
                        color: #E74C3C;
                    }
				}
			}
		}
		.footer {
			@include shadow-base;
			position: absolute;
			width: 100%;
			bottom: 0;
			padding: 0 15px;
			background-color: $color-white;
			color: $color-3;
			display: flex;
			.text {
				width: 66px;
				margin-right: 2px;
				height: 49px;
				line-height: 49px;
			}
			.counts {
				height: 49px;
				line-height: 49px;
				font-size: 12px;
				flex: 1;
				color: $color-primary;
			}
			.details {
				height: 49px;
				line-height: 49px;
				font-size: 12px;
				color: $color-9;
				text-align: right;
				flex: 1;
			}
		}
		.noData-temp {
			@include position-absolute;
		}
		.as-total {
			@include position-absolute(0, 0, 49px, 0);
		}
	}
</style>

<template>
	<div class="workinfo-details-container">
		<scroller-super 
			class="scroller" 
			:type="2" 
			:data="list" 
			:pagingOption="pagingOption" 
			@loadData="loadData">
			<div class="card" v-for="(item,index) in list" :key="index">
				<div class="class-name">{{item.classname}}</div>
				<div class="time" v-if="item.unit=='天'">{{item.starttime.substring(5,10).replace(/-/g,'.')}}</div>
				<div class="time" v-else>{{item.starttime.substring(0,16).replace(/-/g,'.')}}</div>
				<div class="count-box">
					<div class="unit">单位：<span class="unit-s">{{item.unit}}</span></div>
					<div class="amount">数量：<span class="amount-s">{{item.amount}}</span></div>
					<div class="cost">计费：<span class="cost-s">{{item.studentcountcost}}</span></div>
					<div class="less">欠费：<span class="less-s">{{item.studentcountless}}</span></div>
				</div>
			</div>
			<empty-page class="noData-temp" v-if="list.length == 0" text="还没有课时统计记录~" :type="7"></empty-page>
		</scroller-super>
		<workinfoTotal 
			class="as-total" 
			:opened.sync="openAsTotal" 
			:footerData="footerData">
		</workinfoTotal>
		<div class="footer" v-if="list.length !== 0" @click="totalDetails">
			<div class="text">合计</div>
			<div class="counts">{{footerData.totalamount}}</div>
			<div class="details">
				更多详情
				<svg class="icon card-next" aria-hidden="true">
					<use :xlink:href="openAsTotal==true?'#icon-xiala':'#icon-shangla'"></use>
				</svg>
			</div>
		</div>
		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
	import {getworkdetailinfo} from 'teacher/api/personal-center.js';
	import workinfoTotal from './child/workinfo-total-details.vue';
	import EmptyPage from 'teacher/components/common/empty-page/empty-page.vue';

	export default {
		name: "workinfo-course-details",
		data() {
			return {
				wxTitle: '课时统计',
				isLoading: true,
				openAsTotal: false,
				list: [],
				footerData: '',
				pagingOption: {
					api: getworkdetailinfo,
					params: {
						starttime: '',
						endtime: '',
						type:1,
						// page:{
						// 	sortfield:'',
						// 	isdesc:'',
						// 	pageindex:1,
						// 	pagesize:20,
						// },
					},

					pageOpt:{
						isdesc:false,
						// 分页初始页码的'key'、'value'
						indexKey: 'pageindex',
						sortfield:'',
                        indexVal: 1,
                        // 每页请求数据长度的'key'、'value'
                        sizeKey: 'pagesize',
                        sizeVal: 20,
                        // 后端返回的总页数'key'
                        countKey: 'totalpage'
					}
				}
			}
		},
		methods: {
			loadData(ajaxPromise) {
				ajaxPromise.then(res => {
					this.isLoading = false;
					console.log(res)
					if(res.result.code == app.errok) {
                        if (res.page.pageindex === 1) {
							this.list = [];
						}
						this.list = this.list.concat(res.data.classstudentinfos);
						this.footerData = res.data.totalcountinfo;
					} else {
						app.toast('error', res.result.msg);
					}
				})
			},
			totalDetails() {
				this.openAsTotal = !this.openAsTotal;
			}
		},
        created(){
            this.pagingOption.params.starttime = this.$route.params.sdate;
            this.pagingOption.params.endtime = this.$route.params.edate;
        },
		components: {
			EmptyPage,
			workinfoTotal
		}
	}
</script>