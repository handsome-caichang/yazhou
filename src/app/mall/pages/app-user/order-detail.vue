<!-- 订单详情界面 -->
<style lang="scss" scoped>
    .order-detail {
        @include position-absolute;
		background-color: $color-white;
		.order-err {
			padding: 15px;
			background-color: #F8800A;
			color: $color-white;
			background-image: url(./img/order-error-bg.png);
			background-attachment: scroll;
			background-repeat: no-repeat;
			background-position: right 15px bottom 0px;
			background-size: 45% auto;
			.title {
				font-size: $fs-normal-x;
				line-height: 26px;
			}
			.desc {
				font-size: $fs-small-x;
			}
		}
		.status{
			@include background-img(false, cover);
			height: 70px;
			padding: 15px;
	    	font-size: $fs-normal-x;
	    	color: $color-white;
	    	.desc{
	    		height: $h-3;
	    		line-height: $h-3;
	    	}
	    	.title{
	    		padding-bottom: $edge;
	    	}
	    	.time{
	    		font-size: $fs-small-x;
	    		line-height: 1;
	    	}
	    }
		.card{
    		background-color: $color-white;
    		.card-title{
    			height: $h-3;
    			line-height: $h-3;
    			padding: 0 $edge;
    			font-size: $fs-normal;
    			@include border-bottom;
    			.tag{
    				padding: 1px 5px;
    				margin-right: 5px;
    				color: $color-assist;
    				font-size: $fs-small-x;
    				border: 1px solid $color-assist;
    			}
    		}
    		.card-bd{
    			position: relative;
    			padding: 8px $edge 0 $edge;
    			color: $color-3;
    			@include border-bottom;
    			.card-bd-item,
    			.card-bd-item1{
    				padding-bottom: 6px;
    				@include flex-between;
    			}
    			.card-bd-item{
    				@include fs-lh(12);
    			}
    			.card-bd-item1{
    				@include fs-lh(14);
    				.total{
			    		font-size: $fs-big-s;
			    		color: $color-assist;
			    	}
    			}
    		}
    	}
    	.info{
    		background-color: $color-white;
    		.info-hd{
    			padding: 0 $edge;
    			font-size: $fs-normal-x;
    			color: $color-3;
    			height: $h-3;
    			line-height: $h-3;
    			@include border-bottom;
    		}
    		.info-bd{
    			padding: 14px 10px 13px 10px;
    			.info-bd-item{
    				@include flex-between;
    				@include fs-lh(12);
    				padding-bottom: 6px;
    				label{
					    width: 80px;
    				}
    				&:last-child{
    					padding-bottom: 0;
    				}
    			}
    			&.memo{
    				@include border-top;
    				font-size: $fs-small;
    				line-height: 1;
    				.memo-body{
						padding-top: 10px;    					
    					color: $color-3;
    				}
    			}
    		}
    	}
		.operate{
		    height: $h-3;
		    line-height: $h-3;
		    padding: 0 $edge;
		    @include border-top;
		    .btn,.btn1{
		    	margin: 8px 0 0 $edge;
		    	float: right;
		    	min-width: 73px;
		    	height: 25px;
		    	line-height: 25px;
		    	text-align: center;
		    	font-size: $fs-small-x;
		    	border-radius: 50px;
		    }
		    .btn{
		    	color: $color-primary;
		    	border: 1px solid $color-primary;
		    }
		    .btn1{
		    	color: $color-6;
		    	border: 1px solid $color-6;
		    }
            .btn2 {
                width: 100px;
            }
		}
		.void{
			height: $void;
			background-color: $color-assist-1;
		}
		.pay-loading{
			@include position-absolute;
			@include flex-center(column);
	        background: $color-white;
	        z-index: 2;
	        .loading-img{
	        	display: inline-block;
        	    width: 75px;
        	    height: 75px;
        	    @include background-img(false, cover);
	        }
	        .loading-tips{
	        	margin-top: 30px;
	        	font-size: 25px;
	        	color: $color-primary;
	        }
		}
        .qr-code {
            @include position-absolute;
            z-index: 20;
        }
    }
    .scroller {
        @include position-absolute;
        overflow: hidden;
    }
</style>

<template>
	<div class="order-detail">
		<scroller-base class="scroller" :data="Order">
			<div v-if="Order">
				<!-- 订单状态 -->
				<div class="order-err" v-if="Order.ErrorMessage">
					<div class="title">支付成功(有异常)</div>
					<div class="desc">{{Order.ErrorMessage}} 请联系校方处理。</div>
				</div>
				<div class="status" :style="'backgroundImage:url('+orderDetailBg+')'" v-else-if="(Order.Status==0)||(Order.Status==1&&Order.IsExpired)||(Order.Status==2)||(Order.Status==3)">
					<div class="desc">{{getStatusStr(Order)}}</div>
				</div>
				<div class="status" :style="'backgroundImage:url('+orderDetailBg+')'" v-else-if="(Order.Status==1)&&(!Order.IsExpired)">
					<div class="title">等待付款</div>
					<div class="time">{{Order.ExpiredSeconds|formatSeconds}}后订单关闭</div>
				</div>				
				<div class="void"></div>
				
				<!-- 订单商品 -->
				<div class="card">
					<div class="card-title">{{Order.CampusName}}</div>
					<div class="card-hd">
						<div v-for="pro in Order.Items" v-if="Order.Type==1">
							<order-card :product="pro" :type="2" :campus="Order"></order-card>
						</div>
						<div v-if="Order.Type==10">
							<order-detail-package :product="Order"></order-detail-package>
						</div>
					</div>
					<div class="card-bd">
                        <div class="card-bd-item">
                            <label>合计金额</label>&#165;{{Order.TotalMoney|formatNumber}}
                        </div>
                        <div class="card-bd-item" v-if="Order.IsPreMoney">
                            <label>应付定金</label>&#165;{{Order.PreMoney|formatNumber}}
                        </div>
						<div class="card-bd-item" v-if="Order.SingelSchemeMoney">
                            <label>单科优惠汇总</label>-&nbsp;&#165;{{Order.SingelSchemeMoney|formatNumber}}
                        </div>
						<div class="card-bd-item" v-if="Order.WholeSchemeMoney && Order.DiscountSchemeOrder == 0">
                            <label>优惠活动</label>-&nbsp;&#165;{{Order.WholeSchemeMoney|formatNumber}}
                        </div>
						<div class="card-bd-item" v-if="Order.WholeSchemeMoney && Order.DiscountSchemeOrder == 0">
                            <label></label>{{Order.WholeSchemeName}}
                        </div>
						<div class="card-bd-item" v-if="Order.CouponMoney">
                            <label>优惠券</label>-&nbsp;&#165;{{Order.CouponMoney|formatNumber}}
                        </div>
						<div class="card-bd-item" v-if="Order.CouponMoney">
                            <label></label>{{Order.CouponName}}</div>
						<div class="card-bd-item" v-if="Order.WholeSchemeMoney && Order.DiscountSchemeOrder == 1">
                            <label>优惠活动
                            </label>-&nbsp;&#165;{{Order.WholeSchemeMoney|formatNumber}}
                        </div>
						<div class="card-bd-item" v-if="Order.WholeSchemeMoney && Order.DiscountSchemeOrder == 1">
                            <label></label>{{Order.WholeSchemeName}}
                        </div>
						<div class="card-bd-item" v-if="Order.PointMoney">
                            <label>积分</label>-&nbsp;&#165;{{Order.PointMoney|formatNumber}}
                        </div>
						<div class="card-bd-item" v-if="Order.ReserveMoney">
                            <label>电子钱包</label>-&nbsp;&#165;{{Order.ReserveMoney|formatNumber}}
                        </div>
						<div class="card-bd-item1">
                            <label>实际支付</label><span class="total">&#165;{{Order.PayMoney|formatNumber}}</span>
                        </div>
					</div>
				</div>
				
				<!-- 收货信息 -->
				<div class="void"></div>
				<div class="info">
					<div class="info-hd">收货信息</div>
					<div class="info-bd">
						<div class="info-bd-item" v-if="Order.ReceiveContact"><label>收货人：</label>{{Order.ReceiveContact}}&emsp;{{Order.ReceiveMobile}}</div>
						<div class="info-bd-item" v-if="Order.ReceiveAddress"><label>收货地址：</label><div>{{Order.ReceiveAddress}}</div></div>
						<div class="info-bd-item"><label>使用学员：</label>{{Order.StudentName}}</div>
					</div>
					<div class="info-bd memo" v-if="Order.UserRemark">
						<div>买家留言：</div>
						<div class="memo-body">{{Order.UserRemark}}</div>
					</div>
				</div>
				
				<!-- 订单信息 -->
				<div class="void"></div>
				<div class="info">
					<div class="info-hd">订单信息</div>
					<div class="info-bd">
						<div class="info-bd-item"><label>订单编号：</label>{{Order.OrderNumber}}</div>
						<div class="info-bd-item"><label>下单时间：</label>{{Order.Date | formatDatetime('yyyy-MM-dd hh:mm:ss')}}</div>
						<div class="info-bd-item" v-if="Order.PayDateTime"><label>支付时间：</label>{{Order.PayDateTime | formatDatetime('yyyy-MM-dd hh:mm:ss')}}</div>
					</div>
				</div>
				<div class="operate" v-if="Order.Status==1">
                    <span class="btn1 btn2" @click="showQrCode=true" v-if="showQrCodeBtn">关注学校公众号</span>
					<span class="btn" @click="payOrder(Order.ID)" v-if="!Order.IsExpired">立即支付</span>
					<span class="btn1" @click="closeOrder(Order.ID)">关闭订单</span>
				</div>
				<div class="operate" v-if="(Order.Status==2||Order.Status==3)&&(!Order.IsComment)">
                    <span class="btn1 btn2" @click="showQrCode=true" v-if="showQrCodeBtn">关注学校公众号</span>
					<span class="btn" @click="gotoComment(Order.ID)">等待评价</span>
					<span class="btn" v-if="config.EnableElectronicInvoice == 1 && Order.PayMoney != 0" @click="clickInvoice">开具发票</span>
				</div>
				<div class="operate" v-if="(Order.Status==2||Order.Status==3)&&Order.IsComment">
                    <span class="btn1 btn2" @click="showQrCode=true" v-if="showQrCodeBtn">关注学校公众号</span>
					<span class="btn1">评价成功</span>
					<span class="btn" v-if="config.EnableElectronicInvoice == 1 && Order.PayMoney != 0" @click="clickInvoice">开具发票</span>
				</div>
			</div>
		</scroller-base>
		<!-- 等待订单详情的界面 -->
		<loading v-if="isLoadingDetail"></loading>
		<!-- 等待订单支付结果的界面 -->
		<div class="pay-loading" v-if="isLoadingPay">
			<span class="loading-img" :style="'backgroundImage:url('+loadingSvg+')'"></span>
			<p class="loading-tips">正在处理，请稍后...</p>
		</div>

        <!-- 没关注公众号的弹出二维码 -->
        <qr-code class="qr-code" :opened.sync="showQrCode" @close="showQrCode=false" :qrUrl="qrUrl"></qr-code>

 		<!-- 没关注公众号的弹出二维码 -->
        <action-sheets class="qr-code" :opened.sync="showInvoice" @close="showInvoice=false" :code="InvoiceCode" :typeCode="'2'" :contentText="InvoiceEndTime"></action-sheets>

	</div>
</template>

<script>
	 
	import { getOrderDetail,getWXPayData,getIsPaid,orderClose} from 'api/lc';
    import {getQrcode} from 'api/yy.js'
    import OrderCard from './children/order-card/order-card.vue';
    import OrderDetailPackage from './children/order-detail-package/order-detail-package.vue';
    import orderDetailBg from './orderDetailBg.png';
    import loadingSvg from 'mall/static/svg/loading-bars.svg';
    import QrCode from 'mall/components/qrCode/qrCode.vue'
    import ActionSheets from 'mall/components/actionsheets/actionsheets-ssh.vue'
	
	export default{
		name:'order-detail',
        mixins: [app.mixin.shareMixin],
        data() {
            return {
            	isPaySkip: false,
            	orderDetailBg,
            	loadingSvg,
            	isLoadingDetail: false, //加载订单详情的动画
            	isLoadingPay: false, //等待支付结果的动画
            	Order: null,
            	queryPara: null,
               	wxTitle:"订单详情",
               	timeout: null, //订单倒计时

                showQrCode: false,
                showQrCodeBtn: false,
				qrUrl: '',
				
				InvoiceCode: '',
				InvoiceEndTime: '',
				showInvoice: false,

            }
        },
        computed: {
        	...Vuex.mapState([
        		'config',
        		'orderDetailRefreshFlag'
        	])
        },
        methods: {
        	...Vuex.mapMutations([
        		'set_orderListRefreshFlag',
        		'set_orderDetailRefreshFlag'
			]),
			clickInvoice() {
				this.showQrCodeClick();
			},
			showQrCodeClick() {
				if (this.InvoiceCode) {
					this.showInvoice = true;
				}else {
					this._getOrderDetail(this.queryPara.orderId, true);
				}
			},
        	getStatusStr(item){
        		if (item.Status==0) {
        			return "交易关闭";
        		}else if (item.Status==1) {
        			return item.IsExpired?"交易过期":"等待付款";
        		}else if (item.Status==2||item.Status==3) {
        			return "交易成功";
        		}
        	},
        	gotoComment(id){
        		this.$router.push({path:'/orderComment',query:{orderId:id,type:2}});
        	},
        	payOrder(id){ //立即支付
	    		if (this.isPaySkip) {
					return;
	    		}
	    		this.isPaySkip = true;
      		    //document.getElementById('wxPayForm').action = this.config.WXPayURL;
				getWXPayData({
					ID: id	//订单ID
				}).then(res => {
					if (res.ErrorCode == app.errok) {
                        if (window.__wxjs_environment === 'miniprogram'){
                             let succUrl = 'succUrl='+ encodeURIComponent(window.location.href.match(/[^#]*#/)[0] + '/orderList/1'),
                                //succUrl = 'succUrl='+ encodeURIComponent(window.location.href.match(/[^#]*#/)[0] + '/orderDetail?isPay=1&orderId='+ res.Data.OrderId),
                                failUrl =  'failUrl=' + encodeURIComponent(window.location.href.match(/[^#]*#/)[0] + '/orderList/1'),                       
                                infoData = 'info=' + encodeURIComponent(JSON.stringify({
                                    OrderNumber:res.Data.OrderNumber,
                                    CompanyName:res.Data.CompanyName,
                                    StudentName:res.Data.StudentName,
                                    PayMoney:res.Data.PayMoney,
                                    Product:res.Data.ProductItem
                                })),
                                payData = 'data=' + encodeURIComponent(res.Data.PayInfo);
                            wx.miniProgram.navigateTo({
                                url:`/pages/payment/payment?${succUrl}&${failUrl}&${payData}&${infoData}`,
                                success: function(){
                                },
                                fail: function(){
                                    app.alert('跳转失败，请刷新页面重试。');            
                                },
                            });
                        } else {
                            try{
                                document.getElementById('wxData').value = res.Data.WXData;
                                document.getElementById('wxPayForm').action = res.Data.PayURL;
                                document.getElementById("wxPayForm").submit();
                            }catch(e){
                                app.toast('error', e.message);
                            }
                        }
					} else if (res.ErrorCode == 423) {
						app.alert('您有一笔未支付未过期的预制订单，可前往“师生信->个人中心->预制订单”进行支付。');
					} else {
						// app.toast('error', '获取微信支付数据出错。');
						res.ErrorMsg && app.toast('error',  res.ErrorMsg);
					}
					this.isPaySkip = false;
				})
        	},
        	closeOrder(id){ //关闭订单
        		app.confirm('确定关闭该订单吗？').then(res => {
	  				if (res === true) {
		        		orderClose({
		        			ID: id
		        		}).then(res => {
							if (res.ErrorCode == app.errok) {
								app.toast('success', '关闭订单成功。');
          						this.set_orderDetailRefreshFlag();
								this.set_orderListRefreshFlag();
		                    }else{
		                    	app.toast('error', res.ErrorMsg);
		                    }
		        		});
	  				}
	  			});
        	},
        	_getOrderDetail(id, flag){
        		this.isLoadingDetail = true;
        		getOrderDetail({
	    			ID: id
	    		}).then(res => {
	    			this.isLoadingDetail = false;
	    			if (res.ErrorCode == app.errok) {
	    				this.Order = res.Data;
						this.InvoiceCode = this.Order.InvoiceCode ? this.Order.InvoiceCode : '';
						this.InvoiceEndTime = this.Order.InvoiceEndTime ? this.Order.InvoiceEndTime : '';
						clearTimeout(this.timeout);
						if (this.Order.Status==1&&!this.Order.IsExpired) {
	    					this._diffOrderTime();
	    				}
						if (flag) {
							if (this.InvoiceCode) {
								this.showInvoice = true;
							}else {
								app.alert({
									title: '',
									text: '此收据需开具发票，发票获取失败，请稍后再试'
								})
							}
						}
	    			}
				})
        	},
        	_isFinish(id){ //轮询请求获取订单的执行情况
        		let $this = this;
        		
        		getIsPaid({
	    			ID: id
	    		}).then(res => {
	    			if (res.ErrorCode == app.errok) {
	    				if (res.Data) {
	    					this.isLoadingPay = false;
	    					$this._getOrderDetail(this.queryPara.orderId);
	    				}else{
	    					setTimeout(function(){
								$this._isFinish(id);
							},2000);
	    				}
	    			}else{
    					this.isLoadingPay = false;
	    				app.toast('error', res.ErrorMsg);
	    			}
				})
        	},
        	_diffOrderTime(){
        		this.timeout = setTimeout(()=>{
					this.Order.ExpiredSeconds--;
					if (this.Order.ExpiredSeconds<=0) {
						this.Order.IsExpired=true;
						clearTimeout(this.timeout);
	    			}else{
	    				this._diffOrderTime();
	    			}
        		},1000);
        	},
            checkQrCode() {
                getQrcode().then(res => {
                    if (res.ErrorCode === app.errok) {
                        if (res.Data.IsBindWx) {
                            this.showQrCode = false
                            this.showQrCodeBtn = false
                        } else {
                            this.showQrCode = true
                            this.showQrCodeBtn = true
                        }
                        this.qrUrl = res.Data.QrCode
                    }
                })
            }
        },
        created(){
        	this.queryPara = this.$route.query;
            this.checkQrCode()
            //如果正在执行订单
            if (this.queryPara.isPay && (this.queryPara.isPay==1)) {
                this.isLoadingPay = true;
                this._isFinish(this.queryPara.orderId);
                return;
            }
            
            this._getOrderDetail(this.queryPara.orderId);

            app.event.on('appActive', (e, args) => {
                let diff = args.diffTime;
                this.Order.ExpiredSeconds -= diff;
                if (this.Order.ExpiredSeconds <= 0) {
                    this.Order.IsExpired = true;
                }
			})
		},
		beforeDestroy() {
			app.event.off('appActive');
		},
        watch: {
		    orderDetailRefreshFlag: function (val, oldVal) {// 切换订单类型，重新拉取数据
            	this._getOrderDetail(this.queryPara.orderId);
		    },
		},
        components: {
			OrderCard,
			OrderDetailPackage,
			QrCode,
			ActionSheets
		}
	}
</script>