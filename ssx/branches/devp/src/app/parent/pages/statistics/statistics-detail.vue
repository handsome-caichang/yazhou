<!-- 课消详情 -->
<style lang="scss" scoped>
	
	
	.statistics-detail {
		.body {
			@include position-absolute;
			background-color: #eef1f6;
			.noData-temp {
				@include position-absolute;
			}
			.statistics-detail-item {
				padding: 0 12px;
				.red {
					color: rgba(233, 58, 15, 1);
				}
				.orange {
					color: rgba(255, 170, 32, 1);
				}
				.date {
					height: 42px;
					line-height: 45px;
					font-size: 17px;
					color: rgba(51, 51, 51, 1);
					padding: 0 12px;
				}
				.date-item {
					background-color: #fff;
					width: 100%;
					min-height: 70px;
					margin: 0 0 10px 0;
					display: flex;
					flex-direction: column;
					justify-content: center;
					color: rgba(102, 102, 102, 1);
					.d-item-title {
						margin: 10px 12px 5px 12px;
						font-size: 16px;
						color: rgba(51, 51, 51, 1);
						@include ellipsis-single;
					}
					.time-slot {
						margin: 5px 12px 4px 12px;
						display: flex;
						justify-content: space-between;
					}
					.item-teacher {
						margin: 0 12px 7px 12px;
						display: flex;
						justify-content: space-between;
					}
					.arrers {
						@include border-top;
						height: 34px;
						line-height: 34px;
						color: rgba(233, 58, 15, 1);
						text-align: right;
						padding: 0 12px;
					}
				}
			}
		}
	}
</style>

<template>
	<div class="statistics-detail">
		<scroller-base class="body" :data="list">
			<!-- 统计列表 -->
			<div class="statistics-detail-item" v-for="(item, key) in list" :key="key">
				<div class="date">{{ key }}</div>
				<div>
					<div class="date-item" v-for="(details, key1) in item" :key="key1">
						<!-- 班级名称 -->
						<span class="d-item-title">{{ details.classname }}</span>
						<!-- 时间段 -->
						<span class="time-slot" v-if="details.unit != 3">
							<span>
								<svg class="icon" aria-hidden="true">
									<use xlink:href="#icon-shangkeshijianicon"></use>
								</svg>
								{{ details.starttime.split(' ')[0].substr(5)}}
								{{ details.starttime.split(' ')[1].substr(0,5) + '-' +  details. endtime.split(' ')[1].substr(0,5)}} 
								{{ WEEK[new Date(details.starttime.split(' ')[0]).getDay()] }}
							</span>
						<span>时长：{{ details.coursetime.toFixed(0) }}分钟</span>
						</span>
						<!-- teacher name -->
						<span class="item-teacher">
                    <span>
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-laoshiicon1"></use>
                      </svg>
                      {{ details.teachername}}
                    </span>
						<span v-if="details.showconsumemoney > 0">课消金额：<span class="orange">￥{{ details.consumemoney }}</span></span>
						</span>
						<!-- 欠费金额 -->
						<span class="arrers" v-if="parseInt(details.lessmoney) != 0">欠费金额：￥{{ details.lessmoney.replace('-', '') }}</span>
					</div>
				</div>
			</div>
			<div style="height:10px;"></div>
			<empty-page class="noData-temp" :type="8" v-if="JSON.stringify(list) === '{}'"></empty-page>
		</scroller-base>
		<loading v-show="isLoading"></loading>
	</div>
</template>

<script>
	import {getcourseconsume} from "parent/api/statistics";
	import EmptyPage from "parent/components/common/empty-page/empty-page";

    /**@description
     *  上课时间、上课时长：按月计费不显示
     *  课消金额：配置项App_ShowConsumeMoney（师生信上如何显示课消详情列表的课消金额）:0不显示1标准价2折后价
     */
	export default {
		name: "statistics-detail",
		data() {
			return {
				wxTitle: "课消详情",
				list: [],
				isLoading: true,
				WEEK: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
			};
		},
		methods: {
			fomateData(data) {
				let _list = {};
				data.forEach((item, key) => {
					let _starttime = item.starttime.split(" ")[0];
					// 只将年月作为key
					_starttime = _starttime.split('-')[0] + "年" + _starttime.split("-")[1] + "月";

					let _some = Object.keys(_list).some(_key => {
						return _key === _starttime;
					});
					if(!_some) {
						_list[_starttime] = [];
					}
					_list[_starttime].push(data[key]);
				});
				return _list;
			}
		},
		created() {
			getcourseconsume({
				shiftid: this.$router.currentRoute.params.shiftid
			}).then(res => {
				this.isLoading = false;
				if(res.result.code == 200) {
					this.list = this.fomateData(res.data);
				}
			});
		},
		components: {
			EmptyPage
		}
	}
</script>