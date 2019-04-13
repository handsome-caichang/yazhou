<!-- 维度总平均分 -->
<style scoped lang="scss">
	
	
	.commentDimension-container {
		.body {
			position: absolute;
			top: 0px;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #eef1f6;
			.scroller {
				@include position-absolute;
				overflow: hidden;
				// 统计结果
				.dimension-result {
					height: 140px;
					background-color: #ffffff;
					color: #1E88F5;
					padding-top: 15px;
					text-align: center;
					.txt {
						font-size: 15px;
					}
					.val {
						font-size: 50px;
						margin-top: 20px;
					}
				}
				//被统计的维度列表
				.class-table {
					.header {
						display: flex;
						justify-content: space-between;
						align-items: center;
						color: #666666;
						background-color: #ffffff;
						height: 40px;
						margin-top: 10px;
						padding: 0 27px 0 12px;
						@include border-bottom;
						.tip {
							color: #999999;
						}
					}
					.comment-list {
						height: calc(100vh - 380px);
						position: relative;
						.to-detail {
							padding: 10px 12px;
							display: flex;
							justify-content: space-between;
							align-items: center;
							min-height: 44px;
							color: #333;
							@include border-bottom;
							background-color: #ffffff;
                            >span:first-child {
                                max-width: 65%;
                            }
							.span {
								text-align: center;
								color: #333333;
                                display: flex;
								justify-content: flex-end;
								align-items: center;
								width: 20%;
								.lanse {
									color: #1E88F5;
									width: 65%;
								}
							}
						}
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
	<div class="commentDimension-container">
		<div class="body">
			<scroller-base 
				class="scroller" 
				:data="list" 
				ref="commentDimensionListIScroller">
				<!-- 统计维度总平均分 -->
				<div class="dimension-result">
					<div class="txt">{{itemName}}</div>
					<div class="val">{{ getparams.passScope }}</div>
				</div>

				<!-- 维度列表 -->
				<div class="class-table">
					<!-- 表头 -->
					<div class="header">
						<span class="span">班级
							<span class="tip">(一对一班级除外)</span>
						</span>
						<span>平均分</span>
					</div>
					<!-- item -->
					<div class="comment-list">
						<div 
							v-for="item in list" 
							:key="item.ClassID" 
							class="to-detail" 
							@click="toScoreDetail(item.ClassID)">
							<span>{{ item.ClassName }}</span>
							<span class="span">
                      			<span :class="{'lanse' : item.Scope === '5.0000'}">
                                    {{ item.Scope }}
                                </span>
                                <svg class="icon card-next" aria-hidden="true">
                                    <use xlink:href="#icon-youjiantou"></use>
                                </svg>
							</span>
						</div>
						<empty-page class="noData-temp" v-if="list.length == 0" :type="1"></empty-page>
					</div>
				</div>
				<div style="height:12px;"></div>
			</scroller-base>
		</div>

		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
	import { getTeacherScoreDetail } from "teacher/api/comment-rank";
	import EmptyPage from "teacher/components/common/empty-page/empty-page";

	export default {
		name: "commentDimension",
		data() {
			return {
				wxTitle: "评价维度",
				list: [],
				itemName: '',
				isLoading: true
			};
		},
		computed: {
			getparams() {
				return this.$router.currentRoute.query;
			}
		},
		methods: {
			_getTeacherScoreDetail() {
				getTeacherScoreDetail(this.getparams).then(res => {
					this.isLoading = false;
					if(res.ErrorCode == 200) {
						this.list = [].concat(res.Data);
						this.itemName = this.getparams.itemName;
					}
				});
			},
			toScoreDetail(classid) {
				this.$router.push({
					path: '/classScoreDetail',
					query: { ...this.getparams,
						classid: classid
					}
				})
			}
		},
		created() {
			this._getTeacherScoreDetail();
		},
		components: {
			EmptyPage
		}
	};
</script>