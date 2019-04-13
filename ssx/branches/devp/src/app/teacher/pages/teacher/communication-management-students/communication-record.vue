<!--沟通记录-->
<style scoped lang="scss">
	
	
	.communication-record-container {
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
				.item-box {
					margin-top: 5px;
					>div {
						display: flex;
						padding: 15px 12px 12px 12px;
						background-color: #fff;
						@include border-bottom;
						.photo {
                            min-width: 40px;
                            height: 40px;
                            border-radius: 100%;
                            background-size: contain;
                            background-color: #eef1f6;
						}
						.center {
							margin-left: 8px;
							margin-right: 8px;
							min-width: 85%;
							.name {
								font-size: 16px;
								color: #333333;
								display: flex;
								justify-content: space-between;
								align-items: center;
							}
							.date {
								margin-top: 5px;
								margin-bottom: 5px;
								color: #666;
								font-size: 12px;
								word-break: break-all;
							}
							.blue-light {
								color: #1B70F2;
							}
							.mar-l {
								margin-left: 8px;
							}
							.content {
								color: #333333;
								font-size: 15px;
								word-break: break-word;
							}
							.multi2 {
								@include ellipsis-multi(2);
								word-break: break-word;
							}
							.next-date {
								color: #666;
								font-size: 12px;
								display: flex;
								justify-content: space-between;
								align-items: flex-start;
								margin-top: 12px;
								word-break: break-all;
								&-left {
									max-width: 90%;
								}
								.marginL {
									margin-left: 10px;
								}
							}
							.no-common-mode {
								color: #8B572A;
								font-size: 12px;
							}
						}
						.edit {
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
	<div class="communication-record-container">
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
				:data="_list" 
				:pagingOption="pagingOption" 
				@loadFirst="loadData" 
				ref="communicationRecordIScroller">
				<div class="item-box">
					<div v-for="(item, key) in list" :key="item.id">
						<span class="photo" :style="'backgroundImage: url('+item.Photo+')'"></span>
						<div class="center">
							<div class="name">
								{{ item.UserName }}
								<span>
									<span class="no-common-mode" v-if="item.IsValid == 0">无效沟通</span>
									<svg @click="toEdit(item.ID)" class="icon card-next" aria-hidden="true" v-if="key == 0">
										<use xlink:href="#icon-xiugai"></use>
									</svg>
								</span>
							</div>
							<div class="date">
								<span :class="{'blue-light': item.formatDate.ymd == '今天'}">{{ item.formatDate.ymd }}</span>
								<span class="mar-l">{{ item.formatDate.time }}</span>
								<span class="mar-l">{{ item.Mode }}</span>
							</div>
							<span :class="['content', {'multi2': item.Content.length > 80 && !item.showAll}]">{{ item.Content }}</span>
							<div class="next-date">
								<div class="next-date-left">
									<span>下次跟进：</span>
									<span>{{ item.NextDate }}</span>
									<span class="marginL">{{ item.NextMode || '待定' }}</span>
								</div>
								<div v-if="item.Content.length > 80" class="blue-light" @click="showAll(item)">{{ item.showAll ? '收起' : '全文'}}</div>
							</div>
						</div>
					</div>
				</div>
				<div slot="loadBar"></div>
			</scroller-super>
			<empty-page class="noData-temp" v-if="list.length==0" :type="4" text="还没有沟通记录哦"></empty-page>
		</div>
		<div class="bottom-fixed-button"><button class="button" @click="addAommunication">添加沟通记录</button></div>
		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
	import {processGet} from "teacher/api/common";
	import EmptyPage from "teacher/components/common/empty-page/empty-page";

	export default {
		name: "communication-record-list",
		components: {
			EmptyPage
		},
		data() {
			return {
				wxTitle: "沟通记录",
				list: [],
				quickDateIndex: -1,
				pagingOption: {
					api: processGet,
					params: {
                        pname: 'queryCommunication',
                        studentID: this.$router.currentRoute.params.studentID,
						page: 1,
						sdate: app.tool.getDatesByIndex(5, app.localTimeToServer).sdate,
						edate: app.tool.getDatesByIndex(5, app.localTimeToServer).edate
					}
				},
				isAll: 0,
				isLoading: true
			};
		},
		computed: {
			_list() {
				return {
					list: this.list,
					isAll: this.isAll
				}
			}
		},
		methods: {
			changeDate(date) {
				// 开始日期不能大于结束日期
				if((new Date(date.sdate)).getTime() > (new Date(date.edate)).getTime()) {
					app.toast('info', '开始日期不能大于结束日期');
					return;
				}
				this.pagingOption.params.sdate = date.sdate;
				this.pagingOption.params.edate = date.edate;
				this.quickDateIndex = date.index;
				this.isLoading = true;
				this.$refs.communicationRecordIScroller.refresh(this.pagingOption.params);
			},
			// 下拉刷新
			loadData(ajaxPromise) {
				ajaxPromise.then(res => {
					this.isLoading = false;
					if(res.errcode == 200) {
						this.list = res.pageIndex == 1 ? [].concat(res.data) : [].concat(this.list, res.data)
						let self = this;
						self.list.forEach(item => {
							let _date = item.CreateTime;
							self.$set(item, 'showAll',false)
							// 扩展被格式化的时间对象
							item.formatDate = this.formatDate(_date);
						});
					}
				});
			},
			// 添加沟通详情
			addAommunication() {
				this.$router.push({path: `/addStudentCommunication/${this.$router.currentRoute.params.studentID}`, component: '/addStudentCommunication/'});
			},
			// 编辑
			toEdit(id) {
				
				this.$router.push({path: `/addStudentCommunication/${this.$router.currentRoute.params.studentID}`, query: {id: id, isEdit: true}})
			},
			showAll(item) {
				item.showAll = !item.showAll;
				this.isAll++;
				console.log(this)
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
				var _ymd = data.split(" ")[0].substr(5);
				// var _y = _ymd.split("-")[0];
				var _m = parseInt(_ymd.split("-")[0]).toString();
				var _d = parseInt(_ymd.split("-")[1]).toString();
				// 是否为今天
				var _date = new Date();
				// console.log(_date.getMonth()+1+'', '------->', _m, '  ', _date.getDate()+'', '----->', _d);
				return {
					ymd: _date.getMonth() + 1 + "" === _m && _date.getDate() + "" === _d ?
						"今天" :
						_m + "-" + _d,
					time: _time
				};
			}
        },
        created(){
            app.eventDefine.on('refresh-communication-record', () => {
                this.$refs.communicationRecordIScroller.refresh(this.pagingOption.params);
			})
        },
        beforeDestroy() {
            app.eventDefine.off('refresh-communication-record', this.handleEmit);
        },
	};
</script>