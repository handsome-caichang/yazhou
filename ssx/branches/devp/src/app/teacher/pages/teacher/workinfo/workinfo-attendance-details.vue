<!--工作统计=>出勤率-->
<style scoped lang="scss">
	.workinfo-details-container {
		background-color: $color-assist-1;
		.scroller {
			@include position-absolute(0, 0, 49px, 0);
			.card {
				background-color: $color-white;
				height: 67px;
				padding: 15px;
				font-size: 12px;
				color: $color-6;
				@include border-bottom;
				.class-name {
					font-size: 15px;
					line-height: 16px;
					color: $color-3;
					@include ellipsis-single;
					margin-bottom: 2px;
				}
				.count-box {
					@include flex-between;
					.time {
						flex: 2;
						position: relative;
						top: 2px;
					}
					.ought,
					.real {
						flex: 1;
					}
				}
			}
		}
		.footer {
			@include shadow-base;
			position: absolute;
			width: 100%;
			bottom: 0;
			height: 49px;
			line-height: 49px;
			padding: 0 15px;
			background-color: $color-white;
			color: $color-3;
			@include flex-between;
			.text {
				flex: 2;
			}
			.ought-all,
			.real-all {
				color: $color-primary;
				font-size: 12px;
				flex: 1;
				display: flex;
				flex-direction: column;
			}
		}
		.noData-temp {
			@include position-absolute;
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
				<div class="count-box">
                    <!--这里按天计费的时间后台做了处理-->
					<div class="time">{{item.starttime.replace(/-/g,'.')}}</div>
					<div class="ought">应到：{{item.studentcountought}}</div>
					<div class="real">实到：{{item.studentcountreal}}</div>
				</div>
			</div>
			<empty-page class="noData-temp" v-if="list.length == 0" text="还没有出勤统计记录~" :type="7"></empty-page>
		</scroller-super>
		<div class="footer" v-if="list.length !== 0">
			<div class="text">合计</div>
			<div class="ought-all">{{footerData.totalstudentcountought}}</div>
			<div class="real-all">{{footerData.totalstudentcountreal}}</div>
		</div>
		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
	import {getworkdetailinfo} from 'teacher/api/personal-center.js';
	import EmptyPage from 'teacher/components/common/empty-page/empty-page.vue';

	export default {
		name: "workinfo-attendance-details",
		data() {
			return {
				wxTitle: '出勤统计',
				isLoading: true,
				list: [],
				footerData: '',
				pagingOption: {
					api: getworkdetailinfo,
					params: {
						starttime: '',
						endtime: '',
                        type: 2
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
			}
		},
        created(){
            this.pagingOption.params.starttime = this.$route.params.sdate;
            this.pagingOption.params.endtime = this.$route.params.edate;
        },
		components: {
			EmptyPage
		}
	}
</script>