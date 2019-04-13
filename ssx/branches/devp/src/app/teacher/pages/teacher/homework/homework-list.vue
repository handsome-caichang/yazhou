<!--作业列表页-->
<style scoped lang="scss">
	.homework-container {
		.top-serach {
			width: 100%;
			padding-left: 12px;
			padding-right: 12px;
			background: #fff;
			height: 44px;
			display: inline-flex;
			justify-content: space-between;
			align-items: center;
			.date {
				height: 28px;
			}
			.top-serach-button {
				width: 48px;
				height: 28px;
				text-align: center;
				line-height: 28px;
				font-size: 12px;
				color: rgba(102, 102, 102, 1);
				border: none;
				border-radius: 100px;
				background: rgba(238, 241, 246, 1);
			}
		}
		.body {
			position: absolute;
			top: 44px;
			bottom: 49px;
			left: 0;
			right: 0;
			background-color: $color-white;
			.noData-temp {
				@include position-absolute;
			}
			.scroller {
				@include position-absolute;
				overflow: hidden;
			}
			.to-detail {
				background-color: #fff;
				height: 44px;
				line-height: 44px;
				color: rgba(51, 51, 51, 1);
				padding-left: 12px;
				padding-right: 12px;
				margin-top: 4px;
				>div:first-child {
					float: left;
					width: 70%;
					height: 100%;
                    font-size: 16px;
					>span {
						display: inline-block;
						max-width: 90%;
						@include ellipsis-single;
					}
				}
				>div:last-child {
					float: right;
					width: 18%;
					text-align: right;
					>span:first-child {
						font-size: 12px;
						color: rgba(187, 187, 187, 1);
					}
					>span:last-child {
						float: right;
					}
				}
				.card-next {
					float: right;
					margin-right: 0;
					margin-top: 15.5px;
				}
				.icon-youjiantou {
					width: 13px;
					height: 13px;
				}
			}
			.to-students {
				height: 69px;
				background-color: #fff;
				@include border-top;
				padding: 12px;
				em {
					font-style: normal;
					&.strong {
						color: rgba(30, 136, 245, 1);
					}
				}
				div:first-child {
                    @include flex-between;
					>span:first-child {
                        font-size: 15px;
						color: rgba(153, 153, 153, 1);
						max-width: 65%;
						@include ellipsis-single;
					}
					>span:last-child {
                        font-size: 12px;
						color: rgba(153, 153, 153, 1);
						em {
							font-size: 12px;
						}
					}
				}
				div:last-child {
					margin-top: 10px;
					display: flex;
					justify-content: space-between;
                    font-size: 12px;
					span {
						&:nth-child(2) {
							text-align: center;
						}
						&:last-child {
							text-align: right;
						}
					}
				}
			}
		}
		.bottom-fixed-button {
			position: absolute;
			height: 48px;
			background: #fff;
			width: 100%;
			bottom: 0;
			font-size: 12px;
			line-height: 48px;
			.button {
				border: none;
				outline: none;
				width: 100%;
				height: 100%;
				font-size: 16px;
				color: #fff;
				background: rgba(30, 136, 245, 1);
			}
		}
	}
</style>

<template>
	<div class="homework-container">
		<div class="top-serach">
			<date-bar 
				class="date" 
				:sdate='pagingOption.params.sdate' 
				:edate='pagingOption.params.edate' 
				:index="quickDateIndex" 
				@changeDate="changeDate">
			</date-bar>
		</div>
		<div class="body">
			<scroller-super 
				class="scroller" 
				:type="2" 
				:data="list" 
				:pagingOption="pagingOption" 
				@loadData="loadData" 
				ref="homeworkListIScroller">
				<div v-for="(item, key) in list" :key="item.id">
					<div class="to-detail" @click.stop.prevent="toDetail(item.jobid)">
						<div>
							<span>{{item.title}}</span>
							<span>
								<svg class="icon icon-youjiantou" aria-hidden="true" v-if="item.isfile == 1">
									<use xlink:href="#icon-guanlian"></use>
								</svg>
							</span>
						</div>
						<div>
							<span>
								<svg class="icon card-next" aria-hidden="true">
									<use xlink:href="#icon-youjiantou"></use>
								</svg>
							</span>
						</div>
					</div>
					<div @click.stop.prevent="toStudentList(item.jobid)" class="to-students">
						<div>
							<span>{{item.classname}}</span>
							<span>
								<em class="strong" v-if="item.formatDate.ymd==='今天'">{{item.formatDate.ymd}}</em>
								<span v-else>{{ item.formatDate.ymd }}</span>&nbsp;
							<span>{{item.formatDate.time}}</span>
							</span>
						</div>
						<div>
							<span>已读 <em :class="{strong: item.isreadcount != item.studentcount}">{{item.isreadcount}}</em>/{{item.studentcount}} 人</span>
							<span>已交 <em :class="{strong: item.issubmitcount != item.studentcount}">{{item.issubmitcount}}</em> 人</span>
							<span>已评 <em :class="{strong: item.iscommentcount != item.studentcount}">{{item.iscommentcount}}</em> 人</span>
						</div>
					</div>
				</div>
				<div slot="loadBar"></div>
			</scroller-super>
			<empty-page class="noData-temp" v-if="list.length==0" :type="0" text="还没有发布作业，需要发布吗？"></empty-page>
		</div>
		<div class="bottom-fixed-button"><button class="button" @click="pubHomework">发布作业</button></div>
		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
	import {getjoblistforteacher} from "teacher/api/homework.js";
	import EmptyPage from "teacher/components/common/empty-page/empty-page.vue";

	export default {
		name: "homework-list",
		components: {
			EmptyPage
		},
		data() {
			return {
				wxTitle: "作业",
				list: [],
				quickDateIndex: -1,
				pagingOption: {
					api: getjoblistforteacher,
					params: {
                        sortfield: '', //TODO:改！排序字段&&正序倒序
                        isdesc: '',
						sdate: app.tool.getDatesByIndex(3, app.localTimeToServer).sdate,
						edate: app.tool.getDatesByIndex(3, app.localTimeToServer).edate
					},
					pageOpt: {
                        // 分页初始页码的'key'、'value'
                        indexKey: 'pageindex',
                        indexVal: 1,
                        // 每页请求数据长度的'key'、'value'
                        sizeKey: 'pagesize',
                        sizeVal: 20,
                        // 后端返回的总页数'key'
                        countKey: 'totalpage'
                    }
				},
				isLoading: true
			};
		},
		methods: {
			changeDate(date) {
				this.pagingOption.params.sdate = date.sdate;
				this.pagingOption.params.edate = date.edate;
				this.quickDateIndex = date.index;
				this.isLoading = true;
				this.$refs.homeworkListIScroller.refresh(this.pagingOption.params);
			},
			// 下拉刷新
			loadData(ajaxPromise) {
				ajaxPromise.then(res => {
					this.isLoading = false;
					if(res.result.code === app.errok) {
						res.data.forEach(item => {
							let _date = item.createtime;
							// 扩展被格式化的时间对象
							// item.formatDate = this.formatDate(_date);
                            //TODO:改！时间
							item.formatDate = this.formatDate('2018-11-20 17:52');
						});
						this.list = res.pageindex == 1 ? [].concat(res.data) : [].concat(this.list, res.data)
					}
				});
			},
			// 去详情
			toDetail(id) {
				// this.$router.push({path: `/homeworkDetail/${id}/0`, component: 'homeworkDetail'})
                this.$router.push({path: `/homeworkDetail/${id}`, query: {from: 0}})
			},
			toStudentList(id) {
				this.$router.push({path: `/homeworkStudentsList/${id}`});
			},
			// 发布作业
			pubHomework() {
                this.$router.push("/homeworkAdd");
			},
			formatDate(data) {
				// 格式：2017-12-6 17:37:17
				// 截取时间(hh:hmm)
				var _time = data.split(" ")[1];
				// 去掉秒
				_time = _time
					.split(":")
					.splice(0, 2)
					.join(":");
				// 截取年月日(yy-mm-dd)
				var _ymd = data.split(" ")[0];
				var _y = _ymd.split("-")[0];
				var _m = _ymd.split("-")[1];
				var _d = _ymd.split("-")[2];
				// 是否为今天
				var _date = new Date();
				return {
					ymd: _date.getFullYear() + "" === _y &&
						(_date.getMonth() + 1 < 10 ?
							"0" + _date.getMonth() + 1 :
							_date.getMonth() + 1 + "") === _m &&
						(_date.getDate() < 10 ?
							"0" + _date.getDate() :
							_date.getDate() + "") === _d ?
						"今天" :
						_ymd,
					time: _time
				};
            }
        },
        created(){
            app.eventDefine.on('refresh-homework-list', () => {
                this.$refs.homeworkListIScroller.refresh(this.pagingOption.params);
            });
            // 监听移除事件，如果删除成功就移除数据
            app.eventDefine.on('removeItem-homework-list', () => {
				this.$refs.homeworkListIScroller.refresh(this.pagingOption.params);
            })
        },
        beforeDestroy() {
            app.eventDefine.off('refresh-homework-list');
            app.eventDefine.off('removeItem-homework-list');
        },
	};
</script>