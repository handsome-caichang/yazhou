<!--公告列表页-->
<style scoped lang="scss">
	
	
	.announcement-container {
		// .top-serach {
		// 	width: 100%;
		// 	padding-left: 12px;
		// 	padding-right: 12px;
		// 	background: #fff;
		// 	height: 44px;
		// 	display: inline-flex;
		// 	justify-content: space-between;
		// 	align-items: center;
		// 	.date {
		// 		height: 28px;
		// 	}
		// 	.top-serach-button {
		// 		width: 48px;
		// 		height: 28px;
		// 		text-align: center;
		// 		line-height: 28px;
		// 		font-size: 12px;
		// 		color: rgba(102, 102, 102, 1);
		// 		border: none;
		// 		border-radius: 100px;
		// 		background: rgba(238, 241, 246, 1);
		// 	}
		// }
		.body {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: $color-white;
			.scroller {
				@include position-absolute;
				overflow: hidden;
				padding-top: 4px;
			}
			.to-detail {
				height: 75px;
				margin: 12px;
				padding: 0 15px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: $color-white;
				border-radius: 2px;
				.flex-left {
					max-width: 85.5072%;
					display: flex;
					flex-direction: column;
					.title {
						font-size: 16px;
						color: rgba(51, 51, 51, 1);
						margin-bottom: 10px;
						@include ellipsis-single;
					}
					.date {
						font-size: 12px;
						color: rgba(153, 153, 153, 1);
					}
				}
				.flex-right {
					position: relative;
					height: 100%;
					line-height: 75px;
					.readed {
						position: absolute;
						top: 10px;
						right: -5px;
						width: 9px;
						height: 9px;
						background-color: rgba(233, 58, 14, 1);
						border-radius: 9px;
					}
				}
			}
			.noData-temp {
				@include position-absolute;
			}
		}
	}
</style>

<template>
	<div class="announcement-container">
		<!-- <div class="top-serach">
			<date-bar 
				class="date" 
				:sdate='pagingOption.params.startdate' 
				:edate='pagingOption.params.enddate' 
				:index="quickDateIndex" 
				@changeDate="changeDate">
			</date-bar>
		</div> -->

		<div class="body">
			<scroller-super 
				class="scroller" 
				:type="2" 
				:data="list" 
				:pagingOption="pagingOption" 
				@loadData="loadData" 
				ref="announcementListIScroller">
				<div v-for="item in list" :key="item.id" @click.stop="toDetail(item)" class="to-detail">
					<div class="flex-left">
						<span class="title">{{ item.title }}</span>
						<span class="date">{{ item.date }}</span>
					</div>
					<div class="flex-right">
						<span :class="{'readed': item.isread == 0}"></span>
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-youjiantou"></use>
						</svg>
					</div>
				</div>
				
				<empty-page class="noData-temp" v-if="list.length==0" :type="4" text="还没公告消息"></empty-page>
				<div style="height:12px;"></div>
			</scroller-super>
		</div>

		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
	import { getnoticeinfosbyeid } from "teacher/api/announcement";
	import EmptyPage from "teacher/components/common/empty-page/empty-page";

	export default {
		name: "announcement-list",
		data() {
			return {
				wxTitle: "学校公告",
				list: [],
				// quickDateIndex: -1,
				pagingOption: {
					api: getnoticeinfosbyeid,
					params: {
						// startdate: app.tool.getDatesByIndex(4, app.localTimeToServer).sdate,
						// enddate: app.tool.getDatesByIndex(4, app.localTimeToServer).edate,
						startdate: '1990-01-01',
						enddate: app.tool.getDatesByIndex(4, app.localTimeToServer).edate,
					},
					pageOpt: {
						isdesc: true
					}
				},
				isLoading: true
			};
		},
		methods: {
			/* // 日期搜索
			changeDate(date) {
				this.pagingOption.params.startdate = date.sdate;
				this.pagingOption.params.enddate = date.edate;
				this.quickDateIndex = date.index;
				this.isLoading = true;
				this.$refs.announcementListIScroller.refresh(this.pagingOption.params);
			}, */
			// 加载更多
			loadData(ajaxPromise) {
				ajaxPromise.then(res => {
					this.isLoading = false;
					if(res.result.code == 200) {
						res.data.forEach(item => {
							this.$set(item, 'isread', item.isread);
						});
						this.list =
							res.page.pageindex == 1 ? res.data : [].concat(this.list, res.data);
					}
				});
			},
			toDetail(item) {
				this.$router.push({	path: `/announcementDetail/${item.id}`, component: "announcementDetail" });
				// 派发事件，移除未读样式
				app.eventDefine.on('refresh', ()=> {
					item.isread = 0 ? 1 : item.isread;
					app.eventDefine.off('refresh');
				});
			}
		},
		components: {
			EmptyPage
		}
	};
</script>