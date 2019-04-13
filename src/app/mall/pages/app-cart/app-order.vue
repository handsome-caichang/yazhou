<!-- 订单结算界面 -->
<style lang="scss" scoped>
	.app-order{
		@include position-absolute;
		overflow: hidden;
		background-color: $color-white;
        .body{
        	position: absolute;
        	top: 0;
        	left: 0;
        	width: 100%;
        	bottom: 50px;
        	.scroller {
		        @include position-absolute;
		        overflow: hidden;
		    }
        	.order-address{
        		position: relative;
        		color: $color-3;
        		.address-empty{
        			@include flex-between;
        			height: $h-2;
        			line-height: $h-2;
        			padding: 0 15px;
        			font-size: $fs-normal-x;
        			.icon{
        				color: #CCCCCC;
        			}
        		}
        		.address-hd{
        			padding: 15px 31px 7px 47px;
        			font-size: $fs-normal-x;
        			.tel{
						float: right;
					}
        		}
        		.address-bd{
        			display: flex;
        			padding-bottom: 12px;
        			font-size: $fs-small-x;
        			.address-bd-l{
        				@include flex-center;
        				width: 47px;
        				color: #EAEAEA;
        				font-size: $fs-big-s;
        			}
        			.address-bd-c{
        				flex: 1;
        				display: flex;
        				align-items: center;
        			}
        			.address-bd-r{
        				@include flex-center;
        				width: 25px;
        				color: #CCCCCC;
        			}
        		}
        		.address-ft{
        			height: 6px;
        			@include background-img(false, cover);
        		}
        	}
        	.order-shopping{
        		background-color: $color-white;
        		.order-shopping-hd{
        			height: $h-3;
        			line-height: $h-3;
        			padding-left: 15px;
        			font-size: $fs-normal-x;
        			@include ellipsis-single;
        			@include border-bottom;
        		}
        		.order-shopping-bd{
        			margin-bottom: 3px;
        			&:last-child{
        				margin-bottom: 0;
        			}
        		}
        		.order-shopping-ft{
        			height: $h-2;
        			line-height: $h-2;
        			padding-right: 12px;
        			text-align: right;
        			color: $color-3;
        			font-size: $fs-small-x;
        			.amount{
        				padding-left: 15px;
        			}
        		}
        	}
        	.order-discount,
        	.order-memo{
        		.item{
        			padding: 14px 12px;
        			@include flex-between;
        			@include border-bottom;
        			.item-name{
        				color: $color-3;
        				font-size: $fs-normal-s;
        			}
        		}	
        	}
        	.order-discount{
        		.item{
        			.item-name{
        				padding-right: 5px;
        				.point-tips{
        					color: $color-6;
        					margin-left: 4px;
        					.point{
        						color: $color-6;
        						font-size: $fs-small-x;
        					}
        				}
        				.coupon-tips{
        					margin-left: 6px;
							padding: 0 3px;
							color: $color-primary;
							border-radius: 2px;
							font-size: $fs-small-s;
							vertical-align: baseline;
							border: 1px solid $color-primary;
        				}
        			}
        			.icon{
        				color: #CCCCCC;
        			}
        			.point-use{
        				font-size: $fs-big;
        				&.active{
        					color: $color-primary;
        				}
        			}
					.inext{
					    position: absolute;
					    top: 0;
					    bottom: 0;
					    right: 10px;
					    margin: auto;
					}
					&.pr{
						padding-right: 28px;
					}
        		}
        		.flex-1{
        			flex: 1;
        		}
        		.tr{
        			color: $color-3;
        			text-align: right;
        		}
        	}
        	.order-memo{
        		.memo-wrap{
    				flex: 1;
    				::-webkit-input-placeholder {
						color: $color-9;
					}
    			}
        	}
        	.order-student{
        		height: $h-3;
        		line-height: $h-3;
        		padding-left: 12px;
        		background-color: #E4F1FF;
				color: $color-primary;
        	}
        	.void{
        		height: 9px;
        		background-color: $color-assist-1;
        	}
        }
        .footer{
        	position: absolute !important;
        	bottom: 0;
        	left: 0;
        	width: 100%;
        	height: 50px;
        	line-height: 50px;
        	display: flex;
        	background-color: $color-white;
        	/* @include border-top(#EDEDED); */
        	border-top: 1px solid $color-border;
        	.footer-l{
        		flex: 1;
        		text-align: right;
        		padding-right: 16px;
        		.total-count{
        			color: $color-primary;
        		}
        	}
        	.footer-r{
        		width: 130px;
        		font-size: $fs-big;
        		@include flex-center;
        		color: $color-white;
        		background-color: $color-primary;
        	}
        }
        .price{
			color: $color-assist !important;
		}
		.reduce {
			margin-right: 7px;
		}
		.lfont{
			font-size: $fs-big-s;
		}
		.scroller{
	        @include position-absolute;
	        overflow: hidden;
	    }
	}
</style>

<template>
	<div class="app-order">
		<div class="body">
			<scroller-base class="scroller" :data="renderData">
				<div v-if="orderCampusObj">
					<!-- 订单地址区域：开启网上发货&&订单中有物品 -->
					<div class="order-address" v-if="(config.GetGoodsType==2)&&(goodsNum>0)" @click="gotoAddressPage">
						<!-- 从未设置收货地址 -->
						<div class="address-empty" v-if="!orderAddress.ID">
							<div>请设置收货地址</div>
							<svg class="icon" aria-hidden="true">
				        		<use xlink:href="#icon-next"></use>
				        	</svg>
						</div>
						<!-- 已选收货地址 -->
						<div class="address-hd" v-if="orderAddress.ID">
							收货人：{{orderAddress.Contact}}<span class="tel">{{orderAddress.Mobile}}</span>
						</div>
						<div class="address-bd" v-if="orderAddress.ID">
							<div class="address-bd-l">
								<svg class="icon" aria-hidden="true">
					        		<use xlink:href="#icon-didian"></use>
					        	</svg>
							</div>
							<div class="address-bd-c">收货地址：{{orderAddress.Address}}</div>
							<div class="address-bd-r">
								<svg class="icon" aria-hidden="true">
					        		<use xlink:href="#icon-next"></use>
					        	</svg>
							</div>
						</div>
						<div class="address-ft" :style="'backgroundImage:url('+addressBg+')'"></div>
					</div>
					<div class="void" v-if="(config.GetGoodsType==2)&&(goodsNum>0)"></div>
					
					<!-- 订单列表物品区域 -->
					<div class="order-shopping">
						<div class="order-shopping-hd">{{orderCampusObj.Name}}</div>
						<div class="order-shopping-bd" v-for="item in orderCampusObj.Products" v-if="!orderCampusObj.PackageID">
							<order-row :product="item"></order-row>
						</div>
						<div class="order-shopping-bd" v-if="orderCampusObj.PackageID">
							<order-package-row :product="orderCampusObj"></order-package-row>
						</div>
						<div class="order-shopping-ft">
                            共{{orderInfo.totalCount}}件商品
                            <span class="amount">小计：
                                <span class="price lfont">&#165;{{orderMoney?(totalMoney):0|formatNumber}}</span>
                            </span>
                        </div>
                        <div class="order-shopping-ft" v-if="orderCampusObj.Products[0].IsPreMoney">
                            <span class="amount">应付定金：
                                <span class="price lfont">&#165;{{orderCampusObj.Products[0].PreMoney}}</span>
                            </span>
                        </div>
						<div class="void"></div>
					</div>
					
					<!-- 订单金额计算区域 -->
					<div class="order-discount">
						<!-- 优惠活动 -->
						<div class="item pr" @click="openScheme" v-if="orderInfo.enableDiscountScheme && config.EnableDiscountSchemeOrder == 0">
							<label class="item-name">优惠活动</label>
							<span class="flex-1 tr" v-html="schemeStr"></span>
							<svg class="icon inext" aria-hidden="true">
				        		<use xlink:href="#icon-next"></use>
				        	</svg>
						</div>
						<!-- 优惠券 -->
						<div class="item pr" @click="openCoupon" v-if="orderInfo.enableCoupon">
							<label class="item-name">优惠券<span class="coupon-tips" v-if="chooseCoupon.length > 0">已选{{chooseCoupon.length}}张</span></label>
							<span class="flex-1 tr" :class="{price:chooseCoupon.length > 0}" v-html="couponStr"></span>
							<svg class="icon inext" aria-hidden="true">
				        		<use xlink:href="#icon-next"></use>
				        	</svg>
						</div>
						<!-- 优惠活动 -->
						<div class="item pr" @click="openScheme" v-if="orderInfo.enableDiscountScheme && config.EnableDiscountSchemeOrder == 1">
							<label class="item-name">优惠活动</label>
							<span class="flex-1 tr" v-html="schemeStr"></span>
							<svg class="icon inext" aria-hidden="true">
				        		<use xlink:href="#icon-next"></use>
				        	</svg>
						</div>
						<!-- 积分 -->
						<!-- <div class="item" v-if="config.PointReduce==1"> -->
                        <div class="item" v-if="config.PointReduce==1&&orderMoney&&orderMoney.PointCanUse>0">
							<label class="item-name flex-1">积分
								<span class="point-tips" v-if="reserveAccount&&(reserveAccount.Point>=config.PointBase)">
									共{{reserveAccount?reserveAccount.Point:0}}积分，可用{{orderMoney?(orderObj.UsePoint?orderMoney.PointToUse:orderMoney.PointCanUse):0}}积分，可抵减
									<span class="price">
										&#165;{{orderMoney?(orderObj.UsePoint?orderMoney.PointMoney:orderMoney.PointMoneyCanUse):0|formatNumber}}
									</span>
								</span>
								<span class="point-tips" v-if="reserveAccount&&(reserveAccount.Point<config.PointBase)">
									共{{reserveAccount.Point}}积分，满{{config.PointBase}}积分可用
								</span>
								<span @click.prevent="showPointRule">
									<svg class="icon" aria-hidden="true">
					        			<use xlink:href="#icon-tixing"></use>
									</svg>
								</span>
							</label>
							<span class="price reduce" v-if="reserveAccount&&(reserveAccount.Point>=config.PointBase)&&orderObj.UsePoint">
									(-&#165;{{orderMoney?(orderObj.UsePoint?orderMoney.PointMoney:orderMoney.PointMoneyCanUse):0|formatNumber}})
							</span>

							<svg class="icon point-use" aria-hidden="true" 
								@click="togglePointUse" 
								:class="{active:orderObj.UsePoint}" 
								v-if="reserveAccount&&(reserveAccount.Point>=config.PointBase)">
			        			<use :xlink:href="orderObj.UsePoint?'#icon-duoxuanxuanzhong':'#icon-duoxuanweixuanzhong'"></use>
							</svg>
						</div>
						<!-- 电子钱包 -->
						<div class="item" v-if="orderObj.IsUseReserveMoney">
							<label class="item-name">电子钱包<span class="point-tips">(账户当前余额:<span class="price">&#165;{{reserveAccount?reserveAccount.Money:0|formatNumber}}</span>元)</span></label>
							<span class="flex-1 tr" v-if="orderMoney&&orderMoney.ReserveMoney">(<span class="price">-&#165;{{orderMoney.ReserveMoney|formatNumber}}</span>)</span>
						</div>
					</div>
					<div class="void"></div>
					
					<!-- 订单备注区域 -->
					<div class="order-memo">
						<div class="item">
							<label class="item-name">备注：</label>
							<div class="memo-wrap">
								<input type="text" v-model="remark" placeholder="选填，对本次交易的说明"/>
							</div>
						</div>
					</div>
					
					<div class="order-student">使用学员：{{userInfo.StudentName}}<span v-if="customerSex">（{{customerSex}}）</span></div>
				</div>
			</scroller-base>
		</div>
		<div class="footer">
			<div class="footer-l">共<span class="total-count">{{orderInfo.totalCount}}</span>件，合计:&emsp;<span class="price lfont">&#165;{{orderMoney?orderMoney.PayMoney:0|formatNumber}}</span></div>
			<div class="footer-r" @click="submitOrder">提交订单</div>
		</div>
		
		<loading v-if="isLoading" class="loading"></loading>
		<loading v-if="submitLoading" :bgType="1" class="loading"></loading>
		
		<!-- 选择整单优惠 -->
		<order-scheme 
			ref='orderScheme'
			@closeScheme="closeScheme"
			:opened.sync="isOpenScheme"
			:schemes="orderSchemes">
		</order-scheme>
		
		<!-- 选择优惠券 -->
		<order-coupon
			ref='orderCoupon'
			:opened.sync="isOpenCoupon"
			@closeCoupon="closeCoupon">
		</order-coupon>

        <!-- 同意隐私 -->
        <agree-protocol
            :opened.sync="showAgreeProcotol" 
            ref="agreePro">
            
        </agree-protocol>
	</div>
</template>

<script>
	/*
		1.this.$route.query：为1从购物车跳转过来，为2从商品详情跳转过来
	 	2.普通商品：整单优惠、优惠券、积分、电子钱包
	 	     定金商品&&套餐(只能直接购买)：积分、电子钱包
	 	     购物车的商品：单科优惠
	 	3.收货地址：配置项开启&&订单中有物品
	 * */
	import OrderRow from './children/order-row/order-row.vue';
	import OrderPackageRow from './children/order-package-row/order-package-row.vue';
	import OrderCoupon from './children/order-coupon/order-coupon.vue';
	import OrderScheme from './children/order-scheme/order-scheme.vue';
    import AgreeProtocol from './children/agreeProtocol/agreeProtocol'
	 
    import { getCouponsByParamters,createOrder,getReserveAccount,getDiscountInfoByParameter,getMoneyInfoByParamters,getCurrentUserInfo,getAddressList,getmoneyInfo,createForPackage } from 'api/lc';
    import addressBg from './address-bg.png';
	
	export default{
		name: 'app-order',
        mixins: [app.mixin.shareMixin],
		data(){
			return{
				wxTitle: '填写订单',
				addressBg,
				isLoading: true,
				submitLoading: false,
				orderCampusObj: null, //订单校区对象
				queryPara: null, //查询参数：1从购物车跳转过来，2从商品详情跳转过来
				goodsNum: 0, //订单物品的数量（用来判断是否需要填写地址）
				isOpenScheme: false, //打开整单优惠
				isOpenCoupon: false, //打开优惠券
				orderSchemes: [], //整单优惠
				orderCoupons: [], //优惠券
				chooseOrderScheme: null, //选择的整单优惠
				chooseCoupon: [], //选择的优惠券列表
				orderMoney: null, //显示的金额
				reserveAccount: null, //用户账户信息
				clickNum: 0,
				remark: '' ,//订单备注
                showAgreeProcotol: false,
				isAgreeProcotol: false, //同意隐私
			}
		},
		computed: {
        	...Vuex.mapState([ //获取默认地址、用户信息、用户账户信息、订单校区
        		'config',
        		'userInfo',
        		'addressList',
        		'appCartCampus',
        		'orderAddress',
        		'goodsDetailCampus'
        	]),
        	orderObj(){ //构建提交订单的参数格式
        		let proArr = [];
        		
        		if (!this.orderCampusObj.PackageID) { //普通商品
					this.orderCampusObj.Products.forEach((p)=>{
						let classBindings = [],
						pro = {
							'Type': p.Type, //商品类型 1-班级 2-物品
							'SchemeID': '', //单科优惠ID
							'ClassInfo': null, //班级信息
							'GoodsInfo': null, //物品信息
							'ShiftInfo': null, //课程商品
							'ShoppingCartID': p.ID, //购物车商品ID
							'ProductID': p.ProductID, //商品ID
							'IsPreMoney': p.IsPreMoney //是否定金支付
						};
						
						if (p.ChooseScheme) { //单科优惠
							pro.SchemeID=p.ChooseScheme.ID;
						}
						
						if (p.Type==1) { //班级类型->获取绑定物品
							if (p.Bindings) {
								p.Bindings.forEach((binding)=>{
									classBindings.push({//绑定物品
										'ShoppingCartID': binding.ID, //购物车内ID
										'ProductID': binding.ProductID, //商品ID
                                        'EnablePointReduce': binding.EnablePointReduce //xyx加的
									})
								});
							}
							
							pro.ClassInfo = {
								'SeatRow': p.ClassInfo.SeatRow, //座位行
								'SeatColumn': p.ClassInfo.SeatColumn, //座位列
								'Bindings': classBindings, //绑定的物品
                                'ShiftSpecID': p.ClassInfo.ShiftSpecID,
                                'Unit': p.ClassInfo.Unit
							}
						}else if (p.Type==2 || p.Type == 4) { //物品类型
							this.goodsNum++;
							pro.GoodsInfo = {
								'Amount': p.GoodsInfo.Amount, //数量
								'SpecID': p.GoodsInfo.ProductSpecID //规格ID
							}
						}else if (p.Type == 3) { //课程类型
							if (p.Bindings) {
								p.Bindings.forEach((binding)=>{
									classBindings.push({//绑定物品
										'ShoppingCartID': binding.ID, //购物车内ID
										'ProductID': binding.ProductID, //商品ID
                                        'EnablePointReduce': binding.EnablePointReduce, //xyx加的
									})
								});
							}
							pro.ShiftInfo = {
								'SeatName': p.ShiftInfo.SeatName,
								'SeatRow': p.ShiftInfo.SeatRow, //座位行
								'SeatColumn': p.ShiftInfo.SeatColumn, //座位列
								'Bindings': classBindings, //绑定的物品
								'ClassID': p.ShiftInfo.ClassID,
                                'ShiftSpecID': p.ShiftInfo.ShiftSpecID,
                                'Unit': p.ShiftInfo.Unit
							}
						}
						
						proArr.push(pro);
					});
	        		
					return {
						'Products': proArr,
						// 'Remark': '', //订单备注
						'Remark': this.remark, 
						'SchemeID': '', //整单优惠ID
						'CouponID': '', //优惠券ID
						'RecommendCards': [],
						'UsePoint': false, //使用积分
						'ReceiveAddressID': '', //收货地址ID
						'IsUseReserveMoney': this.config.ReserveMoneyReduce==1, //是否自动扣减电子钱包ReserveMoneyReduce：1是（默认），0否
						'IntroducerFullName': '', //介绍人姓名
						'IntroducerMobile': '' //介绍人电话
					}
        		}else{
					this.orderCampusObj.Products.forEach((p)=>{
						let classBindings = [],
							pro = {
								'ProductID': p.ProductID, //商品ID
								'Type': p.Type, //商品类型 1-班级 2-物品
								'ClassInfo': null, //班级信息
								'GoodsInfo': null, //物品信息
								'ShiftInfo': null // 课程信息
							};
						
						if (p.Type==1) { //班级类型->获取绑定物品
							if (p.ClassInfo.Bindings) {
								p.ClassInfo.Bindings.forEach((binding)=>{
									classBindings.push({//绑定物品
										'ProductID': binding.ProductID, //商品ID
									})
								});
							}
							
							pro.ClassInfo = {
								'SeatRow': p.ClassInfo.SeatRow, //座位行
								'SeatColumn': p.ClassInfo.SeatColumn, //座位列
								'Bindings': classBindings, //绑定的物品
                                'ShiftSpecID': p.ClassInfo.ShiftSpecID,
                                'Unit': p.ClassInfo.Unit
							}
						}else if (p.Type == 2 || p.Type == 4) { //物品类型
							this.goodsNum++;
							pro.GoodsInfo = {
								'SpecID': p.GoodsInfo.SpecID //规格ID
							}
						}else if (p.Type === 3) { //课程类型
							if (p.ShiftInfo.Bindings) {
								p.ShiftInfo.Bindings.forEach((binding)=>{
									classBindings.push({//绑定物品
										'ProductID': binding.ProductID, //商品ID
									})
								});
							}

							pro.ShiftInfo = {
								'ClassID': p.ShiftInfo.ClassID,
								'SeatRow': p.ShiftInfo.Row,
								'SeatColumn': p.ShiftInfo.Column,
								'Bindings': classBindings,
                                'ShiftSpecID': p.ShiftInfo.ShiftSpecID,
                                'Unit': p.ShiftInfo.Unit
							}

						}
						
						proArr.push(pro);
						// console.log('=================================')
						// console.log(p)
						// console.log(pro)
						// console.log(proArr)
					});
					
					return{
						'PackageID': this.orderCampusObj.PackageID, //套餐ID
						'Products': proArr,
						'IsUseReserveMoney': this.config.ReserveMoneyReduce==1, //是否自动扣减电子钱包ReserveMoneyReduce：1是（默认），0否
						'UsePoint': false, //是否使用积分
						'Remark': '', //备注
						'ReceiveAddressID': '' //地址
					}
        		}
			},
			renderData() {
                return {
                	userInfo: this.userInfo,
                	orderCampusObj: this.orderCampusObj,
                	orderAddress: this.orderAddress,
                	reserveAccount: this.reserveAccount,
                	chooseCoupon: this.chooseCoupon,
                	chooseOrderScheme: this.chooseOrderScheme,
                	clickNum: this.clickNum,
                	config: this.config,
					goodsNum: this.goodsNum,
					orderInfo: this.orderInfo,
					orderMoney: this.orderMoney
                }
           	},
        	orderInfo(){ //统计订单合计数量，是否展示优惠券和优惠方案
				let	count = 0,
					enableCoupon = this.config.EnableCoupon==1,
					enableDiscountScheme = this.config.EnableDiscountScheme==1;
				
				if (!this.orderCampusObj.PackageID) {
					this.orderCampusObj.Products.forEach((p)=>{
						if (p.Type == 1 || p.Type == 3) { //班级
							count = count+1;
						}else if(p.Type == 2 || p.Type == 4){ //物品数量
							count = count + p.GoodsInfo.Amount;
						}
					
						if (p.IsPreMoney) {
							enableCoupon = false;
							enableDiscountScheme = false;
						}
					});
				}else{
					count = this.orderCampusObj.Products.length;
					enableCoupon = false;
					enableDiscountScheme = false;
				}
			
				return {
					totalCount: count,
					enableCoupon: enableCoupon,
					enableDiscountScheme: enableDiscountScheme
				}
			},
			totalMoney(){ //计算小计：总金额-单科优惠
				let money = 0;
				
				if (!this.orderCampusObj.PackageID) {
					if (this.orderMoney&&(this.orderMoney.TotalMoney-this.orderMoney.ItemSchemeMoney>0)) {
						money = (this.orderMoney.TotalMoney-this.orderMoney.ItemSchemeMoney).toFixed(2);
					}
				}else{
					money = this.orderMoney?this.orderMoney.TotalMoney:money;
				}
				
				return money;
			},
			schemeStr(){ //整单优惠的显示
				if (this.orderSchemes.length == 0) {
					return '无可用';
				}else{
					if (this.chooseOrderScheme) {
						return this.chooseOrderScheme.Name+"&nbsp;(<span style='color:#E93A0E'>-&#165;"+parseFloat(this.orderMoney?this.orderMoney.SchemeMoney:0).toFixed(2)+"</span>)";
					}else{
						return '不使用优惠';
					}
				}
			},
			couponStr(){ //优惠券的显示
				if (this.usableCoupons.length==0) {
					return '无可用';
				}else{
					if (this.chooseCoupon.length > 0) {
						return "<span style='color:#E93A0E'>-&#165;"+parseFloat(this.orderMoney?(this.orderMoney.CouponMoney+this.orderMoney.RecommendCardsMoeny):0).toFixed(2)+"</span>";
					}else{	
						return '不使用优惠券';
					}
				}
			},
			usableCoupons(){ //获取可用优惠券
				let cArr = [];
				
				this.orderCoupons.forEach((coupon)=>{
					if (coupon.IsCanUse) {
						cArr.push(coupon);
					}
				});
				
				return cArr;
			},
            customerSex() {
                let str = ''
                if (this.userInfo.Sex !== '男' && this.userInfo.Sex !== '女') {
                    return str
                } else {
                    return this.userInfo.Sex
                }
			}
    	},
		methods: {
			...Vuex.mapMutations([
				'set_userInfo',
				'set_addressList',
				'set_orderAddress',
				'set_appCartCampus',
				'set_goodsDetailCampus',
				'set_cartListRefreshFlag'
			]),
			gotoAddressPage(){ //无收货地址跳转新增地址页面，否则跳转选择地址界面
				if (this.orderAddress.ID) { 
					this.$router.push({path:'/addressSetting/1'})
				}else{
					this.$router.push({path:'/addressEdit/1'});
				}
			},
			openScheme(){ //跳转整单优惠页面
				if (this.orderSchemes.length == 0) {
					app.toast('info','暂无可用优惠。');
					return;
				}
				this.$refs.orderScheme.setDefaultScheme(
					this.chooseOrderScheme,
					this.orderObj.IntroducerFullName,
					this.orderObj.IntroducerMobile
				);
				this.isOpenScheme = true;
			},
			closeScheme(scheme,name,mobile){ //关闭整单优惠页面 scheme 选择的套餐对象， name 介绍人名字， mobile介绍人手机
				this.isOpenScheme = false;
				
				if (scheme&&scheme.HasIntroducerCondition) {//处理介绍人整单优惠券
					this.orderObj.IntroducerFullName = name;
					this.orderObj.IntroducerMobile = mobile;
				}
				// console.log("chooseOrderScheme");
				// console.log(this.chooseOrderScheme);
				if ( (!scheme&&!this.chooseOrderScheme)
				||(scheme&&this.chooseOrderScheme&&(scheme.ID==this.chooseOrderScheme.ID))) {//处理选择相同整单优惠的情况
					return;
				}
				this.chooseOrderScheme = scheme;
				this.getLastMoneyInfo(true);
			},
			openCoupon(){ //跳转优惠券页面
				this.$refs.orderCoupon.setCoupon(
					this.chooseCoupon,
					this.orderCoupons,
				);
				this.isOpenCoupon = true;
			},
			closeCoupon(cou){ //关闭优惠券页面
				this.chooseCoupon = cou;
				this.getLastMoneyInfo();
			},
			showPointRule(){ //显示积分规则
				app.dialog('alert',{
                    title: '积分规则',
                    text: this.config.PointWord,
                    btn:{
                    	text: '我知道了',
                    	style: {
                    		fontSize: '15px',
                    		color: '#1E88F5'
                    	}
                    },
                    clickMask2close: true
				})
			},
			togglePointUse(){ //使用/关闭积分扣减
				this.orderObj.UsePoint = !this.orderObj.UsePoint;
				this.getLastMoneyInfo();
			},
			getDefaultCoupon(coupons, flag){ //获取默认优惠券
				if (flag) {  // flag 在初始化的时候，根据isbeat来勾选，后面在更新计算的时候，后台会加上IsSelect 对应的值，所以不需要再勾选
					coupons.forEach(item => {
						if ( item.IsCanUse && item.IsBest) {
							item.IsSelected = true;
						}else {
							item.IsSelected = false;
						}
					})
				}
				this.orderCoupons = coupons;
				this.chooseCoupon = [];
				this.chooseCoupon = coupons.filter((coupon)=>{
					return coupon.IsCanUse && (coupon.IsBest || coupon.IsSelected);
				});
			},
			getDefaultScheme(schemes){ //获取默认整单优惠
				this.orderSchemes = schemes;
				
				schemes.forEach((scheme)=>{
					if (scheme.IsCanUse&&scheme.IsBest) {
						this.chooseOrderScheme = scheme;
					}
				});
			},
			getDefaultAddress(){ //获取默认收货地址
				if (this.addressList) {
					this.addressList.forEach((addr)=>{
						if (addr.IsDefault) {
							this.set_orderAddress(addr);
						}
					});
				}
			},
			getReserveAccount(){ //获取当前用户账户
				getReserveAccount().then(res => {
					if (res.ErrorCode == app.errok) {
						this.reserveAccount = res.Data;
					}else{
						app.toast('error', res.ErrorMsg);
					}
				})
			},
			getLastMoneyInfo(flag){ //修改整单优惠/优惠券/积分->获取最新的金额显示
				this.submitLoading = true;
				// console.log(flag);
				if (!this.orderCampusObj.PackageID) {
					this.orderObj.SchemeID = this.chooseOrderScheme?this.chooseOrderScheme.ID:''; //整单优惠
					let couponId = '';
					this.orderObj.RecommendCards = [];
					if (this.chooseCoupon.length > 0) {
						this.chooseCoupon.forEach(item => {
							 if(item.ComeType == '4') {
								this.orderObj.RecommendCards.push(item.ID);
							 }else {
								couponId = item.ID;
							 }
						})
					}
					this.orderObj.CouponID = couponId; //优惠券
					getMoneyInfoByParamters(this.orderObj).then(res => {
						this.submitLoading = false;
	        			if (res.ErrorCode == app.errok) {
	        				let data = res.Data;
	        				
	        				this.orderMoney = data.MoneyInfo;
	        				
	        				if (flag) {
								let index = 0;
								data.Coupons.forEach((item, i) =>{
									if (!item.IsCanUse) {
										index = i;
									}
								});
								if (index == 0) {
									data.Coupons.push(...data.RecommendCards);
								}else {
									data.Coupons.splice(index, 0 , ...data.RecommendCards);
								}
	        					this.getDefaultCoupon(data.Coupons);
	        				}
	        				this.$nextTick(()=>{
								this.clickNum++;
							});
	        			}
	        		});
				}else{
					getmoneyInfo(this.orderObj).then(res => {
						this.submitLoading = false;
	        			if (res.ErrorCode == app.errok) {
	        				this.orderMoney = res.Data;
		        			this.$nextTick(()=>{
								this.clickNum++;
							});
	        			}
	        		})
				}
			},
            juggAgreePro(ajaxPromise) {
                if (this.config.EnableMallProtocol && !this.isAgreeProcotol) {
                    this.$refs.agreePro.show().then(res => {
                        if (res) {
                            this.isAgreeProcotol = res
                            this.submitOrderTrue(ajaxPromise)
                        }
                    })  
                } else {
                    this.submitOrderTrue(ajaxPromise)
                }
            },
			submitOrder(){ //提交订单
				let ajaxPromise;
				//订单收货地址判空：(有物品&&开启了收货地址配置项)
				if (this.config.GetGoodsType==2&&(this.goodsNum>0)) {
					if (!this.orderAddress.ID) {
						app.toast('info', '请设置收货地址。');
						return;
					}
					this.orderObj.ReceiveAddressID = this.orderAddress.ID; 
				}
				
				if (!this.orderCampusObj.PackageID) {
					if (this.chooseOrderScheme) { //整单优惠判空
						if (this.chooseOrderScheme.HasIntroducerCondition) {
							if (!this.orderObj.IntroducerFullName) {
								app.toast('info', '请填写介绍人姓名。');
								this.openScheme();
								return;
							}
							if (!this.orderObj.IntroducerMobile) {
								app.toast('info', '请填写介绍人电话。');
								this.openScheme();
								return;
							}else if (!app.telReg.test(this.orderObj.IntroducerMobile)) {
								app.toast('info', '介绍人电话格式不正确，请重新输入。');
								this.openScheme();
								return;
							}
						}else{
							this.orderObj.IntroducerFullName='';
							this.orderObj.IntroducerMobile='';
						}
						this.orderObj.SchemeID = this.chooseOrderScheme.ID;
					}else{
						this.orderObj.SchemeID = '';
					}
					let couponId = '';
					this.orderObj.RecommendCards = [];
					if (this.chooseCoupon.length > 0) {
						this.chooseCoupon.forEach(item => {
							 if(item.ComeType == '4') {
								this.orderObj.RecommendCards.push(item.ID);
							 }else {
								couponId = item.ID;
							 }
						})
					}
					this.orderObj.CouponID = couponId; //优惠券
					ajaxPromise = createOrder;
				}else{
					ajaxPromise = createForPackage;
				}
                this.juggAgreePro(ajaxPromise)
			},
            submitOrderTrue(ajaxPromise) {

                this.submitLoading = true;
                let params = Object.assign({}, this.orderObj, {
                    IsAgreeProtocol: this.isAgreeProcotol
				}) 
               	ajaxPromise(params).then(res => {
                    setTimeout(()=>{
                        this.submitLoading = false;
                    },300);

                    if (res.ErrorCode == app.errok) {
                        let data = res.Data;
                        if (window.__wxjs_environment === 'miniprogram'){
                            if (data.Status && data.OrderID && !data.PayInfo) {  //如果金额为0,下单直接支付成功;
                                app.toast('success', '订单支付成功。');
                                this.set_appCartCampus({
                                    "ID": "",
                                    "Name": "",
                                    "Products": []
                                });
                                this.set_goodsDetailCampus({
                                    "ID": "",
                                    "Name": "",
                                    "Products": []
                                });
                                this.set_cartListRefreshFlag();
                                this.$router.replace({path:'/orderDetail',query:{orderId:data.OrderID, isPay: 1}});
                            } else{
                                let succUrl = 'succUrl='+ encodeURIComponent(window.location.href.match(/[^#]*#/)[0] + '/orderList/1'),
                                    failUrl =  'failUrl=' + encodeURIComponent(window.location.href.match(/[^#]*#/)[0] + '/orderList/1'),
                                    infoData = 'info=' + encodeURIComponent(JSON.stringify({
                                        OrderNumber:data.OrderNumber,
                                        CompanyName:data.CompanyName,
                                        StudentName:data.StudentName,
                                        PayMoney:data.PayMoney,
                                        Product:data.ProductItem
                                    })),
                                    payData = 'data=' + encodeURIComponent(data.PayInfo);
                                wx.miniProgram.navigateTo({
                                    url:`/pages/payment/payment?${succUrl}&${failUrl}&${payData}&${infoData}`,
                                    success: function(){
                                    },
                                    fail: function(){
                                        app.alert('跳转失败，请刷新页面重试。');            
                                    },
                                });
                            }
                        } else {
                            if (data.WXData) {
                                try{
                                    document.getElementById('wxData').value = data.WXData;
                                    document.getElementById('wxPayForm').action = data.PayURL;
                                    document.getElementById("wxPayForm").submit();
                                }catch(e){
                                    app.toast('error', e.message);
                                }
                            }else if(data.OrderID){
                                app.toast('success', '订单支付成功。');
                                this.set_appCartCampus({
                                    "ID": "",
                                    "Name": "",
                                    "Products": []
                                });
                                this.set_goodsDetailCampus({
                                    "ID": "",
                                    "Name": "",
                                    "Products": []
                                });
                                this.set_cartListRefreshFlag();
                                this.$router.replace({path:'/orderDetail',query:{orderId:data.OrderID, isPay: 1}});
                            }
                        }
                    }else if (res.ErrorCode == 421) {
                        app.alert('您有一笔待支付订单，前往支付。').then(res => {
                            setTimeout(()=>{
                                this.$router.replace({path:'/orderList/1'});
                            },50);
                        });
                    }else if (res.ErrorCode == 422 || res.ErrorCode == 400) {
                        app.alert(res.ErrorMsg);
                    }else if (res.ErrorCode == 423) {
                        app.alert('您有一笔未支付未过期的预制订单，可前往“师生信->个人中心->预制订单”进行支付。');
                    }else if (res.ErrorCode !== 1000) {
                        res.ErrorMsg && app.toast('error', res.ErrorMsg);
                    }
                })
            }
		},
		created(){
            window.a = this
			this.queryPara = this.$route.query;//type为1从购物车跳转过来，为2从商品详情跳转过来
			
			this.orderCampusObj = app.tool.clone(this.queryPara.type==1?this.appCartCampus:this.goodsDetailCampus);
			
			/* 为了解决跳转到微信支付界面，直接回退，获取不到vuex里面的订单信息 */
			if (this.orderCampusObj.Products.length==0) {
				this.orderCampusObj = JSON.parse(app.ls.getStorage('mallOrderPara'));
				Promise.all([
					getAddressList(),
					getCurrentUserInfo()
				]).then(res => {
					if ((res[0].ErrorCode==app.errok)&&(res[1].ErrorCode==app.errok)) {
						this.set_addressList(res[0].Data);
						this.set_userInfo(res[1].Data);
						this.getDefaultAddress();
					}
				});
			}
			
			//获取用户账户基本信息
			this.getReserveAccount();
			//获取默认收货地址
			this.getDefaultAddress();
			
			//根据创建订单参数获取优惠信息以及计算最优价格
			if (!this.orderCampusObj.PackageID) {
				getDiscountInfoByParameter(this.orderObj).then(res => {
					this.isLoading = false;
								
					if (res.ErrorCode == app.errok) {
						let data = res.Data;
						let index = 0;
						data.Coupons.forEach((item, i) =>{
							if (!item.IsCanUse) {
								index = i;
							}
						});
						if (index == 0 ) {
							if (data.RecommendCards) data.Coupons.push(...data.RecommendCards);
						}else {
							if (data.RecommendCards) data.Coupons.splice(index, 0 , ...data.RecommendCards);
						}
						this.getDefaultCoupon(data.Coupons, true);
						this.getDefaultScheme(data.Schemes);
						this.orderMoney = data.BestMoneyInfo;
                    } else { // 与后端约定为此接口返回"501"时，给出对应后台返回的错误提示,并后通一个页面;
                        // 当发生其它错误时，这里也应该要阻断用户，因为数据已经不对了；
                        app.alert(res.ErrorMsg || "当前抢购太火爆，请稍后再试。").then(res => {
                            setTimeout(() => {
                                this.$router.back();
                            }, 300)
                        })
                    }
				});
			}else{
				this.isLoading = false;
				getmoneyInfo(this.orderObj).then(res => {
					this.isLoading = false;
        			if (res.ErrorCode == app.errok) {
        				this.orderMoney = res.Data;
        			}
        		})
			}
			
			/* 本地存储提交的订单信息：为了解决跳到微信支付页面再返回/当前页面刷新：vuex里面存的订单数据为空*/
			app.ls.setStorage('mallOrderPara',JSON.stringify(this.orderCampusObj));
		},
		watch: {
			remark(val) {
				if (this.remark.length > 200) {
					app.toast('info','最多输入200个字哦。');
					this.remark = this.remark.substring(0, 200);
				}
			}
		},
		components: {
        	OrderRow,
        	OrderCoupon,
        	OrderScheme,
        	OrderPackageRow,
            AgreeProtocol
		}
	}
</script>