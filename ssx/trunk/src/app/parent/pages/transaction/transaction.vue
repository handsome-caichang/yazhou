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
					&::after {
						transform: scale(1, 0.5);
					}
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
							display: flex;
							justify-content: space-between;
							color:#333333;
							.course-name {
								@include ellipsis-single;
								max-width: 80%;
							}
						}
						.t-d-unit {
							color: rgba(153, 153, 153, 1);
							>span {
								color: rgba(244, 156, 135, 1);
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
		<scroller-base class="body" :data="list">
			<!-- 消费明细 -->
			<div class="transaction-itme" v-for="(item,key) in list" :key="item.receiptno">
				<!-- 交易日期和金额 -->
				<div class="t-type">
					<span class="t-date">
						<svg class="icon" aria-hidden="true">
							<use :xlink:href="(item[0].flag === -1 || item[0].flag === 4) ? '#icon-tuifei' : '#icon-jiaoyi'"></use>
						</svg> {{item[0].date}}
					</span>
					<span class="amount">￥{{item[0].payfact|formatNumber}}</span>
				</div>

				<!-- 交易明细列表 -->
				<div class="t-details" v-for="(details, key1) in item" :key="key1" v-if="details.flag != 2 && details.flag != 4 && details.itemname">
					<div class="t-d-item">
						<span class="t-d-title">
							<span class="course-name">
								{{details.itemname}}
								<svg class="icon" aria-hidden="true" v-if="details.isfreerecord == 1">
									<use xlink:href="#icon-zengsong"></use>
								</svg>
							</span>
						<span>{{details.amount + details.unit}}</span>
						</span>
						<span class="t-d-unit" v-if="details.outdate">有效期至{{ details.outdate}}<span v-if="details.isout===1">(已过期)</span></span>
					</div>
				</div>

			</div>
			<div style="height: 10px"></div>
		</scroller-base>

		<!-- 底部汇总信息 -->
		<div class="transaction-summary">
			<span class="e-wallet">
	            <span>我的电子钱包</span><span class="wallet">￥{{this.reservemoney|formatNumber}}</span>
			</span>
			<span class="total-expenses">
            	<span>总支出</span><span class="amount">￥{{this.totalmoney|formatNumber}}</span>
			</span>
		</div>

		<empty-page class="noData-temp" :type="9" v-if="Object.keys(list).length == 0"></empty-page>
		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
	import { getstudentfeeinfos } from "parent/api/transaction.js";
	import EmptyPage from "parent/components/common/empty-page/empty-page";

	export default {
		name: "transaction",
		data() {
			return {
				wxTitle: "交费记录",
				chooseDate: "2018年01月",
				list: [],
				reservemoney: null,
				totalmoney: null,
				params: {
					pname: "feeRecord"
				},
				isLoading: true
			};
		},
		methods: {
			loadData() {
				getstudentfeeinfos(this.params).then(res => {
					this.isLoading = false;
					if(res.result.code === 200) {
						this.list = this.fomateData(res.data.studentfeeinfo);
						this.reservemoney = res.data.reservemoney;
						this.totalmoney = res.data.totalmoney;
					}
				});
			},
			fomateData(data) {
				let _list = {};
				data.forEach((item,key) => {
					let _receiptNo = item.receiptno;
					let _some = Object.keys(_list).some((_key) => {
						return _key === _receiptNo;
					});
					// 截取年月日
					item.date = item.date.split(' ')[0].replace(/-/g, '.');
					if(!_some) {
						_list[_receiptNo] = [];
					}
					_list[_receiptNo].push(item);
				});
				// console.log('format data---->', _list);
				return _list;
			}
		},
		created() {
			this.loadData();
		},
		components: {
			EmptyPage
		}
	}
</script>