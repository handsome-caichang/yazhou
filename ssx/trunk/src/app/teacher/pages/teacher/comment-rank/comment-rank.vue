<!-- 评价排名 -->
<style scoped lang="scss">
	
	
	.commentRank-container {
		.body {
			position: absolute;
			top: 0px;
			bottom: 0;
			left: 0;
			right: 0;
			.scroller {
				@include position-absolute;
				overflow: hidden;
				// 搜索条件
				.condition {
					height: 88px;
					color: #333333;
					font-size: 15px;
					background-color: $color-white;
					.campus {
						height: 44px;
						line-height: 44px;
						padding: 0 12px;
						@include border-bottom;
						display: flex;
						justify-content: space-between;
						.choosed {
							color: #333333;
							width: 75%;
							text-align: right;
							display: flex;
							justify-content: flex-end;
							.names {
								max-width: 53%;
								@include ellipsis-single;
							}
						}
					}
					.date-sousuo {
						padding: 0 12px;
						height: 44px;
						line-height: 44px;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.sousuo {
							font-size: 13px;
							text-align: center;
							width: 48px;
							height: 28px;
							line-height: 28px;
							background-color: #eef1f6;
							color: #1e88f5;
							border-radius: 50px;
						}
					}
				}
				// 统计结果
				.rank-result {
					background-color: $color-white;
					margin-top: 10px;
					height: 210px;
					padding: 12px 12px;
					text-align: center;
					.my-avg {
						top: 10px;
						left: 12px;
						color: #666666;
						font-size: 15px;
						text-align: left;
					}
					.avg-value {
						color: #1e88f5;
						font-size: 50px;
						text-align: center;
                        font-family: sans-serif;
                        margin-top: -10px;
					}
					.my-rank {
						height: 20;
						line-height: 20px;
						.span {
							color: #1e88f5;
						}
						font-size: 13px;
					}
					.beyond {
						font-size: 12px;
						color: #999999;
                        border: 1px solid #EEF1F6;
                        border-radius: 200px;
                        margin: 5px auto;
                        display: inline-block;
                        padding: 2px 15px;
					}
					.no-myavg {
						margin: 40px auto;
					}
					.no-avg {
						margin: 65px auto;
					}
					.school-rank {
						display: flex;
						text-align: center;
						width: 100%;
						height: 60px;
						font-size: 13px;
						margin-top: 10px;
						.div {
							width: 50%;
							line-height: 25px;
							.span {
								display: block;
								width: 100%;
								text-align: center;
								color: #666;
							}
							.strong {
								color: #333333;
							}
						}
					}
				}
				//被统计的课程列表
				.class-table {
					.header {
						display: flex;
						justify-content: space-between;
						align-items: center;
						color: #666666;
						background-color: #ffffff;
						height: 40px;
						margin-top: 10px;
						padding: 0 12px;
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
					.to-detail {
						padding: 10px 12px;
						display: flex;
						justify-content: space-between;
						align-items: center;
						min-height: 44px;
						color: #666;
						@include border-bottom;
						background-color: #ffffff;
                        &:first-child {
                            @include border-top;
                        }
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
								color: #1E88F5;
							}
							.juse {
								color: #F87F0A;
							}
							.zise {
								color: #9013FE;
							}
						}
					}
				}
			}
			.noData-temp {
				height: 240px;
			}
			.as-state {
				@include position-absolute(0, 0, 0, 0);
				z-index: 2;
			}
			.comment-list {
				position: relative;
			}
		}
	}
</style>

<template>
	<div class="commentRank-container">
		<div class="body">
			<scroller-super 
				class="scroller" 
				:type="2" 
				:data="classList" 
				:pagingOption="pagingOption" 
				@loadData="loadData" 
				ref="commentRankListIScroller">
				<!-- 搜索条件 -->
				<div class="condition">
					<div class="campus" @click="chooseCampus">
						<span>选择校区</span>
						<span class="choosed">
	              			<span class="names">{{ campus.names }}</span>
							<span>{{ campus.length }}
			                	<svg class="icon card-next" aria-hidden="true">
			               			<use xlink:href="#icon-youjiantou"></use>
			                	</svg>
	              			</span>
						</span>
					</div>
					<div class="date-sousuo">
						<date-bar 
							class="date" 
							:sdate='pagingOption.params.sdate' 
							:edate='pagingOption.params.edate' 
							:index="quickDateIndex" 
							@changeDate="changeDate">
						</date-bar>
						<span class="sousuo" @click="kecheng">{{ type }}</span>
					</div>
				</div>

				<!-- 统计结果 -->
				<div class="rank-result">
					<div class="my-avg">我的平均分</div>
					<!-- 平均分大于0时展示 -->
					<div class="avg-value" v-if="MyAvg > 0">{{ MyAvg }}</div>
					<div class="my-rank" v-if="MyAvg > 0">在老师中排名第<span class="span">{{ MyRank }}</span>名</div>
					<div class="beyond" v-if="MyRank == 1">超越了所有人，位于榜首</div>
					<div class="beyond" v-if="MyAvg > 0 && MyRank != 1">你超越了<span>{{ Beyond }}</span>的小伙伴</div>
					<!-- 平均分为0时 -->
					<div :class="['beyond', {'no-avg': TopScore == 0 || TotalAvg == 0}, {'no-myavg': MyAvg == 0}]" v-if="MyAvg == 0 || TotalAvg == 0 || TopScore == 0 ">暂未收到评价</div>
					<!-- 学校老师平均分或老师最高分不为0时才展示 -->
					<div class="school-rank" v-if="TotalAvg > 0 || TopScore > 0">
						<div class="div">
							<span class="span">学校老师平均分</span>
							<span class="strong">{{ TotalAvg }}</span>
						</div>
						<div class="div">
							<span class="span">学校老师最高分</span>
							<span class="strong">{{ TopScore }}</span>
						</div>
					</div>
				</div>

				<!-- 课程列表 icon-paixumoren icon-paixudidaogao icon-paixugaodaodi-->
				<div class="class-table">
					<!-- 表头 -->
					<div class="header">
						<span>{{ type }}</span>
						<span class="span">
	              			<span @click="filterScopeAndRank('Scope')">平均分
	                			<svg class="icon" aria-hidden="true">
		                  			<use 
		                  				:xlink:href="pagingOption.params.sort === 'Scope' && pagingOption.params.desc === 1 ? '#icon-paixudidaogao' 
				                    	: pagingOption.params.sort === 'Scope' && pagingOption.params.desc === 0 ? '#icon-paixugaodaodi' 
				                    	: '#icon-paixumoren'">
		                  			</use>
	               				</svg>
	              			</span>
							<span @click="filterScopeAndRank('MyRank')">排名
			                	<svg class="icon" aria-hidden="true">
			                    	<use 
			                    		:xlink:href="pagingOption.params.sort === 'MyRank' && pagingOption.params.desc === 1 ? '#icon-paixudidaogao' 
			                          	: pagingOption.params.sort === 'MyRank' && pagingOption.params.desc === 0 ? '#icon-paixugaodaodi' 
			                          	: '#icon-paixumoren'">
			                      	</use>
			                  	</svg>
	              			</span>
						</span>
					</div>
					<!-- item -->
					<div class="comment-list">
						<div 
							@click="toDimension(item.ItemValue)" 
							v-for="item in list" 
							:key="item.ItemValue" 
							class="to-detail">
							<span>{{ item.ItemName }}</span>
							<span class="span">
                      			<span>{{ item.Scope }}</span>
								<!-- 给1,2,3名设置不同的颜色样式 -->
								<span :class="{'lanse' : item.MyRank == 1, 'juse' : item.MyRank == 2, 'zise' : item.MyRank == 3}">
                          			{{ item.MyRank }}
		                        	<svg class="icon card-next" aria-hidden="true">
		                            	<use xlink:href="#icon-youjiantou"></use>
		                        	</svg>
								</span>
							</span>
						</div>
						<empty-page class="noData-temp" text="该时段暂未收到评价" v-if="list.length == 0" :type="1"></empty-page>
					</div>
				</div>
			</scroller-super>
			
			<state-actionsheet
				@stateType="acceptType" 
				class="as-state" 
				:stateList="stateFilter.arr" 
				:curState="stateFilter.state" 
				:opened.sync="stateFilter.opened">
			</state-actionsheet>

			<!-- 选择校区 -->
			<CampusList :opened.sync="opened" @getCampus="getCampus"></CampusList>
		</div>
		
		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
	import { getCommentRankList, getCommentClassList } from "teacher/api/comment-rank";
	import EmptyPage from "teacher/components/common/empty-page/empty-page";
	import StateActionsheet from "teacher/components/common/actionsheets/state-actionsheet.vue";
	import CampusList from './child/campus';

	export default {
        name: "commentRank-list",
        computed: {
            classList() {
                return this.list;
            }
        },
		data() {
			return {
				opened: false,
				wxTitle: "家长评价排名",
				//已选校区
				campus: {
					names: null,
					length: null
				},
				quickDateIndex: -1,
				TotalAvg: null, // 老师平均分
				MyAvg: null, // 我的平均分
				Beyond: null, // 百分比
				TopScore: null, // 最高分
				MyRank: null, // 我的排名
				type: '课程', // 表头根据筛选条件变化
				list: [],
				status: {
					sort: 'Scope', // 默认平均分;MyRank,排名
					desc: "1" //默认1，从高到低；0，从低到高；‘’，无排序
				},
				pagingOption: {
					api: getCommentClassList,
					params: {
						sort: "Scope", // 默认平均分;MyRank,排名
						desc: 1,
						type: 5,
						campusid: "",
						// 默认显示7天
						sdate: app.tool.parseHash().query.sdate || app.tool.getDatesByIndex(3, app.localTimeToServer).sdate,
						edate: app.tool.parseHash().query.edate || app.tool.getDatesByIndex(3, app.localTimeToServer).edate
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
				stateFilter: {
					opened: false,
					arr: ["期段", "类型", "年级", "科目", "课程"],
					state: 5
				},
				isLoading: true
			};
		},
		methods: {
			// 搜索统计结果
			_getCommentRankList() {
				getCommentRankList(this.pagingOption.params).then(res => {
					if(res.ErrorCode == 200) {
						this.MyAvg = res.Data.MyAvg;
						this.TotalAvg = res.Data.TotalAvg;
						this.Beyond = res.Data.Beyond;
						this.TopScore = res.Data.TopScore;
						this.MyRank = res.Data.MyRank;
					}
				});
			},
			_refreshData() {
				this.$refs.commentRankListIScroller.refresh(this.pagingOption.params);
			},
			// 日期搜索
			changeDate(date) {
				this.pagingOption.params.sdate = date.sdate;
				this.pagingOption.params.edate = date.edate;
				this.quickDateIndex = date.index;
				this.isLoading = true;
				this._getCommentRankList();
				this._refreshData();
			},
			// 加载更多
			loadData(ajaxPromise) {
				ajaxPromise.then(res => {
					this.isLoading = false;
					if(res.ErrorCode == 200) {
						this.list =
							res.PageIndex == 1 ? res.Data : [].concat(this.list, res.Data);
					}
				});
			},
			kecheng(params) {
				this.stateFilter.opened = true;
			},
			// 按照类型筛选
			acceptType(type) {
				// 0,期段；1,类型；2,年级；3,科目；5,课程

				// 课程的查询类型为5
				this.type = this.stateFilter.arr[type];
                // 科目对应的查询字段值为4
				type = type == 4 ? 5 : type;
				this.pagingOption.params.type = type;
				this._refreshData();
			},
			// 按平均分，排名筛选
			filterScopeAndRank(sort) {
				// 筛选类型没有发生变化时，排名为升序(0)，降序(1)，默认排序('')
				if(this.pagingOption.params.sort === sort) {
					this.pagingOption.params.desc = this.pagingOption.params.desc === 1 ? 0 :
						this.pagingOption.params.desc === '' ? 1 :
						'';
				} else {
					// 筛选类型发生变化后，默认降序排列
					this.pagingOption.params.desc = 1;
					this.pagingOption.params.sort = sort;
				}
				console.log(typeof sort, this.pagingOption.params.desc);
				this._refreshData();
			},
			chooseCampus() {
				this.opened = true;
			},
			getCampus(data, _isAll) {
				let _names = [],
					_ids = [];

				data.forEach(item => {
					_names.push(item.Name);
					_ids.push(item.ID);
				});
                // _isAll = data.every(item => item.checked);
                if (_isAll) {
                    this.campus.names = '全部';
                    this.campus.length = '';
                } else {
                    this.campus.names = _names.join(',');
                    this.campus.length = data.length > 1 ? '等' + data.length + '个校区' : '';
                }
				// 刷新页面
				this.pagingOption.params.campusid = _ids.join(',');
				this._refreshData();
				this._getCommentRankList();
			},
			toDimension(itemValue) {
				this.$router.push({
					path: '/commentDimension',
					query: { ...this.pagingOption.params,
						itemValue: itemValue
					}
				});
			}
		},
		created() {
			this._getCommentRankList();

		},
		components: {
			EmptyPage,
            StateActionsheet,
			CampusList
		}
	};
</script>