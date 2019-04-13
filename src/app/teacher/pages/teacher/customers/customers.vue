<style scoped lang="scss">
	.wrapper {
		background-color: $color-white;
		.scroll {
			@include position-absolute(0, 0, 49px, 0);
		}
		.heard {
			height: 140px;
			width: 100%;
			.title {
				padding-top: 15px;
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
			@include position-absolute(false, 0, 0, 0);
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
		<scroller-base class="scroll">
			<div>
				<div class="heard">
					<div class="title">我的客户(人)</div>
					<div class="num">{{customerDetail.customer}}</div>
				</div>
				<div class="void"></div>
			</div>
			<div  class="item" @click="jumpRouter('/addedToday')">
				<div class="item-title">今日新增客户</div>
				<div class="item-right">
					{{customerDetail.newcustomer}}
					<svg class="icon" aria-hidden="true" v-if="app.tool.op('CustomerFilter')">
						<use xlink:href="#icon-youjiantou"></use>
					</svg>
				</div>
			</div>
			<div class="item" @click="jumpRouter('/commCustomer/1')">
				<div class="item-title">今日待沟通客户</div>
				<div class="item-right">
					{{customerDetail.quasiCommunication}}
					<svg class="icon" aria-hidden="true" v-if="app.tool.op('CustomerFilter')">
						<use xlink:href="#icon-youjiantou"></use>
					</svg>
				</div>
			</div>
			<div  class="item" @click="jumpRouter('/commCustomer/2')">
				<div class="item-title">今日已沟通客户</div>
				<div class="item-right">
					{{customerDetail.hasCommunication}}
					<svg class="icon" aria-hidden="true" v-if="app.tool.op('CustomerFilter')">
						<use xlink:href="#icon-youjiantou"></use>
					</svg>
				</div>
			</div>
			<div class="void"></div>
			<!-- v-if="app.tool.op('CustomerFilter')" 客户查询的权限控制--> 
			<router-link tag="div" to="/customerManger" class="item" v-if="computedRights">
				<div class="item-title">查找客户</div>
				<div>
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-youjiantou"></use>
					</svg>
				</div>
			</router-link>
			<router-link class="item" tag="div" to="/customerManger" v-if="app.tool.op('CustomerFilter')">
				<div class="item-title">客户管理</div>
				<div>
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-youjiantou"></use>
					</svg>
				</div>
			</router-link>

			<router-link class="item" tag="div" to="/inviteSearch" v-if="app.sysInfo.EnableQueryInvite_SSX=='1'">
				<div class="item-title">邀约查询</div>
				<div>
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-youjiantou"></use>
					</svg>
				</div>
			</router-link>
			
			<router-link tag="div" to="/customerFollowUp" class="item" v-if="app.tool.op('CustomerCommCount')">
				<div class="item-title">跟进统计</div>
				<div>
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-youjiantou"></use>
					</svg>
				</div>
			</router-link>
			<router-link tag="div" to="/customerAnalyse" class="item" v-if="app.tool.op('CustomerStatistic')">
				<div class="item-title">客户分析</div>
				<div>
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-youjiantou"></use>
					</svg>
				</div>
			</router-link>

		</scroller-base>
		<router-link tag="div" v-if="app.tool.op('CustomerAdd')" :to="{path:'/addCustomer/add'}" class="bottom">添加客户</router-link>
	</div>
</template>

<script>
	import {getCustomers} from 'teacher/api/customers'
	
	export default { 
		data() {
			return {
				wxTitle: "意向客户",
				customerDetail: {}
			}
		},
		computed: {
			computedRights() {
				return  app.tool.op('CustomerQuery') && !app.tool.op('CustomerFilter')
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
			},
			jumpRouter(path) {
				if (!app.tool.op('CustomerFilter')) return
				this.$router.push(path)
			}
		},
		created() {
			this.renderPage()
			app.event.on('addCustomer', () => {
				this.renderPage()
			})
		},
		destroyed() {
            app.event.off('addCustomer')
        }
	}
</script>