<!--通知列表页-->
<style scoped lang="scss">
	
	
	.notice-container {
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
				padding-top: 4px;
			}
			.to-detail {
				height: 69px;
				background-color: #fff;
				@include border-top;
				padding: 12px;
				/* 弹性列布局 */
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				em {
					font-style: normal;
					&.strong {
						color: rgba(30, 136, 245, 1);
					}
				}
				>div:first-child {
					width: 100%;
					display: flex;
					justify-content: space-between;
					.top-left-div {
						max-width: 65%;
						display: flex;
						align-items: center;
						.notice-title {
							@include ellipsis-single;
							color: rgba(51, 51, 51, 1);
						}
						.icon-guanlian {
							margin-left: 5px;
						}
					}
					.top-right-div {
						width: 21%;
						max-width: 75px;
						display: flex;
						justify-content: space-between;
						.icon-liulan {
							margin-right: 5px;
						}
						.strong {
							color: rgba(27, 112, 242, 1);
						}
					}
				}
				>div:last-child {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: baseline;
					.bottom-left-div {
						width: 23%;
						color: rgba(102, 102, 102, 1);
						>span {
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;
						}
					}
					.bottom-right-div {
						@include ellipsis-single;
						color: rgba(153, 153, 153, 1);
						text-align: right;
						max-width: 75%;
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
	<div class="notice-container">
		<div class="top-serach">
			<date-bar 
				class="date" 
				:sdate='pagingOption.params.starttime' 
				:edate='pagingOption.params.endtime' 
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
				ref="noticeListIScroller">
				<div 
					v-for="item in list" 
					:key="item.messageid" 
					@click="toDetail(item.messageid)" 
					class="to-detail">
					<div>
						<div class="top-left-div">
							<span class="notice-title">{{item.title}}</span>
							<svg class="icon icon-guanlian" aria-hidden="true" v-if="item.isFile == 1">
								<use xlink:href="#icon-guanlian"></use>
							</svg>
						</div>
						<div class="top-right-div">
							<svg class="icon icon-liulan" aria-hidden="true">
								<use xlink:href="#icon-liulan"></use>
							</svg>
							<span>
								<span :class="{'strong' : item.isreadcount != item.studentcount}">{{item.isreadcount}}</span>/
								<span>{{item.studentcount}}</span>
							</span>
						</div>
					</div>

					<div>
						<div class="bottom-left-div">
							<span>
								<!-- <em class="strong" v-if="item.formatDate.ymd==='今天'">{{item.formatDate.ymd}}</em>
								<span v-else>{{item.formatDate.ymd}}</span> -->
								<span>{{item.createtime}}</span>
							</span>
						</div>
						<div class="bottom-right-div">
							<span>{{item.classname}}</span>
						</div>
					</div>
				</div>
				<div slot="loadBar"></div>
			</scroller-super>
			<empty-page class="noData-temp" v-if="list.length == 0" :type="3" text="还没有通知消息，需要发布一条吗？"></empty-page>
		</div>
		<div class="bottom-fixed-button"><button class="button" @click="pubNotice">发布通知</button></div>
		
		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
	import { getNoticeList } from "teacher/api/notice";
	import EmptyPage from "teacher/components/common/empty-page/empty-page";
console.log(9666666666666666655555555555555555)
	export default {
		name: "notice-list",
		data() {
			return {
				wxTitle: "通知",
				list: [],
				quickDateIndex: -1,
				pagingOption: {
					api: getNoticeList,
					params: {
						teacherid:app.sysInfo.ID,
						starttime: app.tool.getDatesByIndex(4, app.localTimeToServer).sdate,
						endtime: app.tool.getDatesByIndex(4, app.localTimeToServer).edate
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
			// 选择日期
			changeDate(date) {
				this.pagingOption.params.starttime = date.sdate;
				this.pagingOption.params.endtime = date.edate;
				this.quickDateIndex = date.index;
				this.isLoading = true;
				this.$refs.noticeListIScroller.refresh(this.pagingOption.params);
			},
			// 下拉刷新
			loadData(ajaxPromise) {
				ajaxPromise.then(res => {
					this.isLoading = false;
					// if(res.errcode === app.errok) {
					// 	res.data.forEach(item => {
					// 		let _date = item.createTime;
					// 		// 扩展被格式化的时间对象
					// 		item.formatDate = this.formatDate(_date);
					// 	});
						this.list =
						res.pageindex == 1 ? [].concat(res.data) :	this.list.concat(res.data);
					// }
				});
			},
			// 去详情
			toDetail(id) {
				
				this.$router.push({
					path: `/noticeDetail/${id}`,
					component: 'noticeDetail'
				})
			},
			// 发布通知
			pubNotice() {
                
				this.$router.push("/noticeAdd");
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
            app.eventDefine.on('refresh-notice-list', () => this.$refs.noticeListIScroller.refresh(this.pagingOption.params));
            // 监听移除事件，如果删除成功就移除dom
            app.eventDefine.on('removeItem-notice-list', (type,id)=> {
                let p = -1;
                this.list.some((item,index)=>{
                    item.id === id && (p = index);
                })
                if (p> -1){
                    this.list.splice(p,1);
                }
            })
        },
        beforeDestroy() {
            app.eventDefine.off("refresh-notice-list");
            app.eventDefine.off('removeItem-notice-list');
        },
		components: {
			EmptyPage
		}
	};
</script>