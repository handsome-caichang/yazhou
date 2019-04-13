<!-- 班级评分详情 -->
<style scoped lang="scss">
	
	
	.commentDimension-container.body {
		position: absolute;
		top: 0px;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #eef1f6;
		.scroller {
			@include position-absolute;
			overflow: hidden;
			.item {
				.year {
					color: #333333;
					font-size: 15px;
					padding: 0 15px;
					height: 40px;
					line-height: 40px;
				}
				.detail {
					height: 74px;
					padding: 0 15px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					color: #999999;
					background-color: #ffffff;
					@include border-bottom;
					.flex-top {
						margin-bottom: 10px;
						.time {
							color: #666666;
							margin-bottom: 15px;
							margin-left: 5px;
						}
					}
					.flex-bottom {
						display: flex;
						justify-content: space-between;
						.values {
							color: #333333;
							margin-left: 5px;
						}
					}
				}
			}
		}
		.noData-temp {
			@include position-absolute;
		}
	}
</style>

<template>
	<div class="commentDimension-container body">
		<scroller-super 
			class="scroller" 
			:type="2" 
			:data="list" 
			:pagingOption="pagingOption"
			@loadData="loadData" 
			ref="classScoreDetailIScroller">
			<div class="item" v-for="(item, key) in list" :key="key">
				<div class="year">{{ key }}</div>
				<div class="detail" v-for="item1 in item">
					<div class="flex-top">
						<span>上课时间</span>
						<!-- <span class="time">{{item1.Date.replace('.', '-')+' '+item1.Time}}</span> -->
						<span class="time">{{item1.Date.replace('.', '-')}}</span>
					</div>
					<div class="flex-bottom">
						<span>平均分:<span class="values">{{ item1.Scope }}</span></span>
						<span>出勤人数:<span class="values">{{ item1.AttendCount }}</span></span>
						<span>评价人数:<span class="values">{{ item1.WriteCount }}</span></span>
					</div>
				</div>
			</div>
			
			<div style="height:12px;"></div>
		</scroller-super>

		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
	import { getClassScopeDetail } from "teacher/api/comment-rank";
	import EmptyPage from "teacher/components/common/empty-page/empty-page";

	export default {
		name: "commentDimension",
		data() {
			return {
				wxTitle: "评价维度",
				list: [],
				pagingOption: {
					api: getClassScopeDetail,
					params: {
						type: this.$router.currentRoute.query.type,
						classid: this.$router.currentRoute.query.classid,
						campusid: this.$router.currentRoute.query.campusid,
						// 默认显示7天
						sdate: this.$router.currentRoute.query.sdate,
						edate: this.$router.currentRoute.query.edate,
						typeValue: this.$router.currentRoute.query.typeValue,
						CourseCommentScopeSettingID: this.$router.currentRoute.query
							.CourseCommentScopeSettingID
					},
					pageOpt: {
						// 分页初始页码的'key'、'value'
						indexKey: "PageIndex",
						indexVal: 1,
						// 每页请求数据长度的'key'、'value'
						sizeKey: "PageSize",
						sizeVal: 20,
						// 后端返回的总页数'key'
						countKey: "PageCount"
					}
				},
				isLoading: true
			};
		},
		methods: {
			loadData(promise) {
				promise.then(res => {
					this.isLoading = false;
					if(res.ErrorCode == 200) {
						this.list = res.PageIndex == 1 ? [].concat(res.Data) : [].concat(this.list, res.Data);
						this.fomatData(this.list);
					}
				});
			},
			fomatData(data) {
				let _obj = {};
				data.forEach(item => {
					let _has = Object.keys(_obj).some(itme1 => {
						return itme1 == item.Year;
					});
					if(!_has) {
						_obj[item.Year] = []
					}
					_obj[item.Year].push(item);
				});
				this.list = _obj;
			}
		},
		components: {
			EmptyPage
		}
	};
</script>