<!-- 评价维度 -->
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
					height: 230px;
					padding: 15px;
					background-color: #ffffff;
					margin-bottom: 10px;
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
						padding: 0 12px;
						@include border-bottom;
						.span {
							.icon {
								margin-left: -5px;
							}
							&:last-child {
								width: 130px;
								display: flex;
								justify-content: space-between;
							}
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
                            span:first-child {
                                max-width: 52%;;
                            }
							.span {
								text-align: center;
								color: #333333;
								&:last-child {
									width: 130px;
									display: flex;
									justify-content: space-between;
								}
								.lanse {
									color: #1e88f5;
								}
								.juse {
									color: #f87f0a;
								}
								.zise {
									color: #9013fe;
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
				<!-- 统计维度 -->
				<div class="dimension-result" v-if="setOption.radar.indicator.length > 2">
					<Echarts :setOption="setOption"></Echarts>
				</div>
				
				<!-- 维度列表 -->
				<div class="class-table">
					<!-- 表头 -->
					<div class="header">
						<span>维度</span>
						<span class="span">
			            	<span @click="filterScopeAndDimension('Scope')">平均分</span>
							<span @click="filterScopeAndDimension('MyDimension')">排名</span>
						</span>
					</div>
					<!-- item -->
					<div class="comment-list">
						<div 
							class="to-detail"
							@click="toDimensionAvg(item.CourseCommentScopeSettingID,item.Scope,item.ItemName)" 
							v-for="item in list" 
							:key="item.ItemValue">
							<span>{{ item.ItemName }}</span>
							<span class="span">
								<span>{{ item.Scope }}</span>
								<!-- 给1,2,3名设置不同的颜色样式 -->
								<span :class="{'lanse':item.MyDimension==1,'juse':item.MyDimension==2,'zise':item.MyDimension == 3}">
                          			{{ item.MyRank }}
			                        <svg class="icon card-next" aria-hidden="true">
			                    		<use xlink:href="#icon-youjiantou"></use>
			                        </svg>
                      			</span>
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
	import { getCommentDimension } from "teacher/api/comment-rank";
	import EmptyPage from "teacher/components/common/empty-page/empty-page";
	import Echarts from "./radar/Echarts";

	export default {
		name: "commentDimension",
		data() {
			return {
				wxTitle: "评价维度",
				list: [],
				setOption: {
					events: ["mouseup"],
					backgroundColor: "#FFF",
					toolbox: {
						feature: {
							dataView: {},
							saveAsImage: {
								pixelRatio: 2
							},
							restore: {}
						}
					},
					radar: {
						// 维度
						indicator: [
							// { name: "默认维度（忽略）", max: 3.5000 },
						],
						shape: "circle",
						splitNumber: 5,
						// (每个维度)指示器的颜色
						name: {
							color: "rgb(51, 51, 51)"
						},
						nameGap: 10,
						splitLine: {
							lineStyle: {
								color: [
									"rgba(204, 204, 204, 1)"
								].reverse()
							}
						},
						splitArea: {
							show: false
						},
						axisLine: {
							lineStyle: {
								color: "rgba(204, 204, 204, 1)"
							}
						}
					},
					series: [{
						name: "评价维度详情",
						type: "radar",
						lineStyle: {
							normal: {
								width: 1,
								opacity: 0.5
							}
						},
						data: [
							// [3.5000, 2.3333, 2.0000, 2.0000]
						],
						symbol: "none",
						itemStyle: {
							normal: {
								color: "#1E88F5"
							}
						},
						areaStyle: {
							normal: {
								// opacity: 1
							}
						}
					}]
				},
				isLoading: true
			};
		},
		computed: {
			getparams() {
				return this.$router.currentRoute.query;
			}
		},
		methods: {
			_getCommentDimension() {
				getCommentDimension(this.getparams).then(res => {
					this.isLoading = false;
					if(res.ErrorCode == 200) {
						this.list = [].concat(res.Data);

						let _dimension = [],
							_data = [];
						this.list.forEach(item => {
							_dimension.push({
								name: item.ItemName,
								max: 5
							});
							_data.push(item.Scope);
						})
						// 维度
						this.setOption.radar.indicator = [].concat(_dimension);
						// 值
						this.setOption.series[0].data.push(_data);
					}
				});
			},
			toDimensionAvg(CourseCommentScopeSettingID, passScope, itemName) {
				let _params = { ...this.getparams
				};
				_params.typeValue = this.getparams.itemValue;
				_params.CourseCommentScopeSettingID = CourseCommentScopeSettingID;
				_params.passScope = passScope;
				_params.itemName = itemName;

				// 移除不需要的参数
				delete _params.itemValue;
				delete _params.desc;
				delete _params.sort;

				this.$router.push({
					path: "/dimensionAVG",
					query: { ..._params
					}
				});
			}
		},
		created() {
			this._getCommentDimension();
		},
		components: {
			EmptyPage,
			Echarts
		}
	};
</script>