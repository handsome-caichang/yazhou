<!-- 领取优惠券页面 -->
<style lang="scss" scoped>
	.coupon-get-scroller {
		@include position-absolute;
		background-color: #4E90FF;
		.header-wrapper {
			background-repeat: no-repeat;
			background-attachment: scroll;
			background-size: 100% 100%;
			.header-box {
				width: 88%;
				max-width: 360px;
				margin: 0 auto;
				.header {
					width: 100%;
					height: 0;
					padding-top: 94.4%;
					background-repeat: no-repeat;
					background-attachment: scroll;
					background-size: 70% 77.8%;
					background-position: center;
				}
			}
		}
		.separation {
			width: 93%;
			max-width: 385px;
			height: 16px;
			margin: 0 auto;
			background: rgba(62,126,235,1);
			border-radius: 16px;
			.separation-interior {
				width: 96%;
				height: 8px;
				margin: auto; 
				transform: translateY(4px);
				background: rgba(41,105,223,1);
				border-radius: 8px; 
			}
		}
		.main {
			width: 88%;
			max-width: 360px;
			margin: 0 auto;
			transform: translateY(-9px);
			.coupon-warpper {
				position: relative;
				width: 100%;
				height: 0;
				padding-top: 50%;
				background-color: #FFF;
				border-radius: 5px;
				overflow: hidden;
				.coupon-box {
					@include position-absolute;
					display: flex;
					flex-direction: column;
					align-items: center;
					.coupon-hint {
						font-size: 16px;
						line-height: 36px;
						margin-bottom: 2%;
						color: #3E7EEB;
					}
					.coupon {
						position: relative;
						width: 86%;
						height: 0;
						padding-top: 32%;
						background-repeat: no-repeat;
						background-attachment: scroll;
						background-size: 100% 100%;
						background-position: center;
						.left {
							@include flex-center(column);
							position: absolute;
							left: 0;
							top: 0;
							width: 43%;
							height: 100%;
							color: #FFF;
							.money {
								position: relative;
								.sign {
									position: absolute; 
									font-size: 16px;
									left: -12px;
									top: -4px;
								}
								.num {
									font-size: 44px;
									line-height: 46px;
									text-align: center;
									&.mid {
										font-size: 32px;
									}
									&.min {
										font-size: 28px;
									}
								}
							}
							.conditionMoney {
								font-size: 14px;
							}
						}
						.right {
							position: absolute;
							right: 0;
							top: 0;
							width: 57%;
							height: 100%;
							font-size: 12px;
							color: #896B11;
							display: flex;
							flex-direction: column;
							align-items: left;
							justify-content: center;
							.item {
								padding-left: 12px;
								line-height: 1.8em;
							}
						}
					}
				}
			}
			.account-warper {
				position: relative;
				width: 100%;
				height: 310px;
				margin-top: 17px;
				background-color: #FFF;
				border-radius: 5px;
				overflow: hidden;
				.account-box {
					@include position-absolute;
					display: flex;
					flex-direction: column;
					align-items: center;
					.account-hint {
						font-size: 16px;
						line-height: 56px;
						margin-bottom: 4px;
						color: #3E7EEB;
					}
					.input-wrapper {
						width: 86%;
						height: 40px;
						line-height: 40px;
						margin-bottom: 20px;
						background: rgba(231,239,253,1);
						border-radius: 40px ; 
						display: flex;
						align-items: center;
						justify-content: center;
						&.btn {
							background-color: #889AFF;
							margin-top: 20px;
							color: #FFF;
							font-size: 12px;
						}
						.icon {
							margin-left: 15px;
						}
						.user-input {
							flex: 1;
							font-size: 12px;
						}
						.line {
							width: 2px;
							height: 26px; 
							background: rgba(199,211,233,1);
							border-radius: 0.5px ; 
						}
						.suffix {
							padding-left: 10px;
							padding-right: 15px;
							color: #0F3777;
							font-size: 12px;
						}
					}
				}
			}
			.support-info {
				@include flex-center;
				height: 70px;
				font-size: 12px;
				color: rgba(22,67,140,1);
			}
		}
	}
</style>

<template>
	<scroller-base class="coupon-get-scroller" :data="couponInfo">
		<div class="header-wrapper" :style="'backgroundImage:url('+cbg+')'">
			<div class="header-box">
				<div class="header" :style="'backgroundImage:url('+cimg+')'"></div>
			</div>
		</div>
		<div class="separation">
			<div class="separation-interior"></div>
		</div>
		<div class="main">
			<div class="coupon-warpper">
				<div class="coupon-box">
					<div class="coupon-hint">你有一张优惠券未领取</div>
					<div class="coupon" :style="'backgroundImage:url('+ccg+')'">
						<div class="left"  v-if="couponInfo">
							<div class="money">
								<div class="sign">&#165;</div>
								<div class="num" v-if="couponInfo.Money < 1000">{{couponInfo.Money}}</div>
								<div class="num mid" v-if="couponInfo.Money > 999 && couponInfo.Money < 10000">{{couponInfo.Money}}</div>
								<div class="num min" v-if="couponInfo.Money > 9999">{{couponInfo.Money}}</div>
							</div>
							<div class="conditionMoney"  v-if="couponInfo.ConditionMoney">满{{couponInfo.ConditionMoney}}可用</div>
						</div>
						<div class="right"  v-if="couponInfo">
							<div class="item">适用商品: {{applicable ? '不限' : '指定商品'}}</div>
							<div class="item">适用校区: {{couponInfo.IsAllCampus == 1 ? '不限' : '指定校区'}}</div>
							<div class="item">有效期至: {{couponInfo.EndDateTime | formatDatetime("yyyy-MM-dd")}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="account-warper">
				<div class="account-box">
					<div class="account-hint">登录账号领取</div>
					<div class="input-wrapper">
						<svg class="icon" aria-hidden="true">
						    <use xlink:href="#icon-zhanghao"></use>
						</svg>
						<input class="user-input" type="text" v-model="userName" placeholder="请输入账号" >
						<div class="line"></div>
						<div class="suffix">@{{companySuffix}}</div>
					</div>
					<div class="input-wrapper">
						<svg class="icon" aria-hidden="true">
						    <use xlink:href="#icon-mima2"></use>
						</svg>
						<input class="user-input" type="password" v-model="password" placeholder="请输入密码">
					</div>
					<div class="input-wrapper btn" @click="getCoupon">确认领取</div>
				</div>
			</div>
			<div class="support-info">
				由校管家教育科技有限公司提供技术支持 
			</div>
		</div>
	</scroller-base>
</template>

<script>
	import { getCouponInfo, receiveCoupon } from 'api/lc.js';
	import cbg from './img/coupon-get-header-bg.jpg';
	import cimg from './img/coupon-get-header-img.png';
	import ccg from './img/coupon-get-coupon.png';

	export default {
		name: 'coupon-get',
		mixins: [app.mixin.shareMixin],
		data () {
			return {
				cbg,
				cimg,
				ccg,
				userName: "",
				password: "",
				couponInfo: null,
				wxTitle: "网上商城",
			};
		},
		computed: {
			...Vuex.mapState([
				'userInfo',
				'companySuffix'
			]),
			// 优惠券适用范围
			applicable() {
				let ci = this.couponInfo;
				window.ci = ci;
				if (ci.IsAllGoods == 1 && ci.IsAllShift == 1) {
					return true;
				} else {
					return false;
				}
			},
			userLoginName() {
				if (this.userInfo && this.userInfo.Name) {
					let index = this.userInfo.Name.indexOf("@");
					return this.userInfo.Name.slice(0, index);
				} else {
					return ""
				}
			}
       	},
       	methods: {
       		getCoupon() {
       			if (!this.userName.length || !this.password.length) {
       				app.alert("账号或密码不能为空");
       			} else {
       				receiveCoupon({
       					UserName: this.userName,
       					Password: this.password,
       					CouponID: this.$route.params.couponID
       				}).then(res => {
       					if (res.ErrorCode === app.errok) {
       						app.toast("领取优惠券成功。");
       					} else {
       						app.alert(res.ErrorMsg);
       					}
       				})
       			}
       		}
       	},
       	created() {
       		this.userName = this.userLoginName;
       		getCouponInfo({
       			couponID: this.$route.params.couponID
       		}).then(res => {
       			if (res.ErrorCode === app.errok) {
       				this.couponInfo = res.Data;
       			} else {
       				app.alert(res.ErrorMsg);
       			}
       		})
       	}
	};
</script>

