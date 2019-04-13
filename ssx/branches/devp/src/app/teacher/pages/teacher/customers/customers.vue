<style scoped lang="scss">
	
	

	.wrapper {
		.heard {
			height: 140px;
			width: 100%;
			.title {
				margin-top: 15px;
				text-align: center;
				font-size: 21px;
				line-height: 21px;
				color: $color-primary;
			}
			.num {
				margin-top: 20px;
				font-size: 50px;
				text-align: center;
				color: $color-primary;
			}
		}
		.void {
			height: 10px;
			background-color: $color-assist-1;
		}
		.item {
			height: 44px;
			line-height: 44px;
			padding: 0 12px;
			display: flex;
			font-size: 15px;
			border-bottom: 1px solid $color-assist-1;
			.item-title {
				flex: 1;
				color: $color-9;
			}
			.item-right {
				min-width: 26px;
				color: $color-primary;
			}
		}
		.bottom {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 49px;
			line-height: 49px;
			text-align: center;
			color: $color-white;
			background: $color-primary;
			font-size: 16px;
		}
	}

</style>

<template>
	<div class="wrapper">
		<div class="heard">
			<div class="title">我的客户(人)</div>
			<div class="num">{{customerDetail.customer}}</div>
		</div>
		<div class="void"></div>
		<router-link tag="div" to="/addedToday" class="item">
			<div class="item-title">今日新增客户</div>
			<div class="item-right">
				{{customerDetail.hasCommunication}}
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-youjiantou"></use>
				</svg>
			</div>
		</router-link>
		<router-link tag="div" to="/commCustomer/1" class="item">
			<div class="item-title">今日待沟通客户</div>
			<div class="item-right">
				{{customerDetail.newcustomer}}
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-youjiantou"></use>
				</svg>
			</div>
		</router-link>
		<router-link tag="div" to="/commCustomer/2" class="item">
			<div class="item-title">今日已沟通客户</div>
			<div class="item-right">
				{{customerDetail.quasiCommunication}}
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-youjiantou"></use>
				</svg>
			</div>
		</router-link>
		<div class="void"></div>
		<router-link class="item" tag="div" to="/customerManger">
			<div class="item-title">客户管理</div>
			<div>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-youjiantou"></use>
				</svg>
			</div>
		</router-link>
		<router-link tag="div" to="/customerFollowUp" class="item">
			<div class="item-title">跟进统计</div>
			<div>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-youjiantou"></use>
				</svg>
			</div>
		</router-link>
		<router-link tag="div" to="/customerAnalyse" class="item">
			<div class="item-title">客户分析</div>
			<div>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-youjiantou"></use>
				</svg>
			</div>
		</router-link>
		<router-link tag="div" :to="{path:'/addCustomer'}" class="bottom">添加客户</router-link>
	</div>
</template>

<script>
	import {getCustomers} from 'teacher/api/customers'
	export default { 
		data() {
			return {
				customerDetail: {}
			}
		},
		methods: {
			...Vuex.mapMutations(['set_customConfigInfo']),
			renderPage() {
				getCustomers({pname: 'mycustomer'}).then(res => {
					if (res.errorCode === app.errok || res.errcode === app.errok) {
						this.customerDetail = res.data
					}
				})
				getCustomers({pname: 'getcustomerdictionary'}).then(res => {
					if (res.errcode === app.errok) {
						// this.set_customConfigInfo(res.data)
						app.customConfigInfo = res.data
					}
				})
			}
		},
		created() {
			this.renderPage()
		}
	}
</script>