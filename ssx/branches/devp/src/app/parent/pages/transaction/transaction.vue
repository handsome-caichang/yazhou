<!-- 交易记录 -->
<style lang="scss" scoped>
	.course-transaction {
		.body {
			@include position-absolute(0, 0, 50px, 0);
			background-color: #eef1f6;
			.transaction-itme {
				display: box;
				margin: 10px 12px;
				background-color: $color-white;
				&:last-child {
					margin-bottom: 10px;
				}
				.t-type {
					width: 100%;
					height: 34px;
					padding: 0 12px;
					@include border-bottom;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.t-date {
						color: rgba(102, 102, 102, 1);
					}
				}
				.t-details {
					padding: 0 12px;
					.t-d-item {
						@include border-top;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						padding: 10px 0;
						.t-d-title {
							width: 100%;
							color: #333333;
							display: flex;
    						justify-content: space-between;
							.t-d-container {
								display: flex;
								flex-direction: column;
								justify-content: center;
								width: 70%;
								@include ellipsis-single;
								.course-name {
									@include ellipsis-single;
									max-width: 80%;
								}
								.t-d-unit {
									margin-top: 8px;
									color: rgba(153, 153, 153, 1);
									font-size: 12px;
									>span {
										color: rgba(244, 156, 135, 1);
									}
								}
							}
							.t-d-moeny {
								display: flex;
								flex-direction: column;
    							justify-content: space-between;
								width: 30%;
								@include ellipsis-single;
								.payFactSub {
									margin-bottom: 8px;
								}
								>span {
									text-align: right;
									@include ellipsis-single;
								}
								.t-d-amount {
									color: #999;
									font-size: 12px;
								}
							}
						}
					}
					&:nth-child(2)>.t-d-item:before {
						border-top: none;
					}
				}
			}
		}
		.amount {
			color: rgba(233, 58, 15, 1);
		}
		.wallet {
			color: rgba(30, 136, 245, 1);
			font-size: 15px;
		}
		.total-expenses {
			span:last-child {
				font-size: 15px;
			}
		}
		.transaction-summary {
			background-color: #ffffff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 50px;
			@include border-top;
			position: absolute;
			bottom: 0;
			padding: 0 12px;
			box-shadow: inset 0px -1px 5px -3px rgba(30, 136, 245, .8);
		}
		.noData-temp {
			@include position-absolute;
		}
	}
</style>
<template>
	<div class="course-transaction">
		<!-- <scroller-base 
		class="body" 
		:data="list"
		> -->
		<scroller-base
			ref="scroll"
			class="body"
			:type="2"
			:data="list"
			>
			<!-- 消费明细 -->
			<div class="transaction-itme" v-for="(item,key) in list" :key="key">
				<!-- 交易日期和金额 -->
				<div class="t-type">
					<span class="t-date">
						<svg class="icon" aria-hidden="true">
							<use :xlink:href="useHref(item)"></use>
						</svg> {{item[0].date.replace(/-/g, '.')}}
					</span>
					<span class="amount">￥{{item[0].payfact}}</span>
				</div>

				<!-- 交易明细列表 -->
				<div class="t-details" v-for="(details, key1) in item" :key="key1" v-if="details.flag != 3 && details.flag != 4">
					<div class="t-d-item">
						<span class="t-d-title">
							<div class="t-d-container">
								<span class="course-name">{{details.flag == 5 ? "预存电子钱包" : details.itemname}}
									<svg class="icon" aria-hidden="true" v-if="details.isFreeRecord == 1">
										<use xlink:href="#icon-zengsong"></use>
									</svg>
								</span>
								<!-- <span class="t-d-unit" v-if="details.outDate">有效期至{{ details.outDate}}<span v-if="details.IsOut===1">(已过期)</span></span> -->
							</div>
							<div class="t-d-moeny">
								<!-- <span  v-if="details.flag != 5 && details.payFactSub" class="payFactSub">￥{{details.payFactSub}}</span> -->
								<span  v-if="details.flag != 5" class="t-d-amount">{{details.amount}}</span>
							</div>
						</span>
					</div>
				</div>
			</div>
			<div style="height: 10px"></div>
		</scroller-base>

		<!-- 底部汇总信息 -->
		<div class="transaction-summary">
			<span class="e-wallet">
	            <span>我的电子钱包</span><span class="wallet">￥{{this.ReserveMoney}}</span>
			</span>
			<span class="total-expenses">
            	<span>总支出</span><span class="amount">￥{{this.totalMoney}}</span>
			</span>
		</div>

		<empty-page class="noData-temp" :type="9" v-if="Object.keys(list).length == 0"></empty-page>
		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
	import { getstudentfeechargelist } from "parent/api/transaction.js";
	import EmptyPage from "parent/components/common/empty-page/empty-page.vue";

	/**@description
	 * flag==3:续费（列表不展示）
	 * flag==-1||flag==4退费（列表不展示）
	 */
	export default {
		name: "transaction",
		data() {
			return {
				wxTitle: "交费记录",
				chooseDate: "2018年01月",
				list: [],
				ReserveMoney: null,
				totalMoney: null,
				params: {
					pname: "feeRecord"
				},
				pagingOption:{
					api: getstudentfeechargelist,
					params: {
						campusid:'',
						startdate: app.tool.getDatesByIndex(3,app.localTimeToServer).sdate,
						enddate: app.tool.getDatesByIndex(3,app.localTimeToServer).edate,
					},
					pageOpt: {
						sortfield:'',
						isdesc:false,
                        indexKey: 'pageindex', // 分页初始页码的'key'、'value'
                        indexVal: 1,
                        sizeKey: 'pagesize', // 每页请求数据长度的'key'、'value'
                        sizeVal: 20,
                        countKey: 'totalpage', // 后端返回的总页数'key'
                    }
				},
				
				isLoading: true
			};
		},
		methods: {
			loadData(ajaxPromise) {
				getstudentfeechargelist().then(res => {
					this.isLoading = false;
					console.log(res)
					if(res.result.code === app.errok) {
						this.list = this.fomateData(res.data.feerecordinfos);
						this.ReserveMoney = res.data.reservemoney;
						this.totalMoney = res.data.totalmoney;
					}
				});
			},
			fomateData(data) {
				let _list = {};
				Object.keys(data).forEach(key => {
					let receiptno = data[key].receiptno;
					let _some = Object.keys(_list).some(_key => {
						return _key === receiptno;
					});
					if(!_some) {
						_list[receiptno] = [];
					}
					_list[receiptno].push(data[key]);
				});
				console.log(_list);
				return _list;
			},
			useHref(item) {
				if (item[0].flag === -1 || item[0].flag === 4) {
					return '#icon-tuifei'; 
				}else if (item[0].flag === 5){
					return '#icon-yuchongdianziqianbao';
				}else {
					return '#icon-jiaoyi';
				}  
			}
		},
		created() {
			this.loadData()
		},
		components: {
			EmptyPage
		}
	}
</script>