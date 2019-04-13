<!-- 订单详情界面 -->
<style lang="scss" scoped>
    .order-detail {
        @include position-absolute;
		background-color: $color-white;
		.order-err {
			padding: 15px;
			background-color: #F8800A;
			color: $color-white;
			// background-image: url(./img/order-error-bg.png);
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
    			font-size: 14px;
                display: flex;
                color: $color-3;
    			span {
                    flex: 1;
                }
                .phone {
                    text-align: right;
                }
    		}
            .campus-info {
                height: $h-3;
                line-height: $h-3;
                padding: 0 $edge;
                font-size: 13px;
                color: $color-3;
            }
    		.card-bd{
    			padding: 20px 12px;
    			.card-bd-item {
                    display: flex;
                    font-size: 13px;
                    color: $color-3;
                    height: 28px;
                    line-height: 28px;
                    .card-bd-item-l {
                        flex: 1;
                        .spec {
                            font-size: 10px;
                            color: $color-9;
                        }
                    }
                    .card-bd-item-r {
                        flex: 1;
                        text-align: right
                    }
                    .red {
                        color: #F03232;
                    }
                }
    		}
        }
        .card-1 {
            background-color: #F5F8FC;
            padding: 15px 12px;
            .item {
                @include flex-between;
                &:not(:first-child) {
                    margin-top: 12px;
                    color: #E93A0E;
                }
                label {
                    color: $color-3;
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
    			padding: 20px 12px;
    			.info-bd-item{
    				@include flex-between;
                    font-size: 13px;
                    height: 28px;
                    color: $color-3;
    				label{
					    width: 100px;
                        color: $color-9;
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
			background-color: $color-white;
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
                <div class="status" 
                     :style="'backgroundImage:url('+orderDetailSucssBg+')'" 
                     v-else-if="getStatusStr(Order)=='交易成功'">
                    <div class="desc">{{getStatusStr(Order)}}</div>
                </div>
				<div class="status" 
                     :style="'backgroundImage:url('+orderDetailClose+')'" 
                     v-else-if="(Order.Status==0)||(Order.Status==1&&Order.IsExpired)||(Order.Status==2)||(Order.Status==3)">
					<div class="desc">{{getStatusStr(Order)}}</div>
				</div>
				<div class="status" 
                     :style="'backgroundImage:url('+orderDetailWait+')'" 
                     v-else-if="(Order.Status==1)&&(!Order.IsExpired)">
					<div class="title">等待付款</div>
					<div class="time">{{Order.ExpiredSeconds|formatSeconds}}后订单关闭</div>
				</div>				
				<div class="void"></div>
				
				<!-- 订单商品 -->
				<div class="card">
					<div class="card-title">
                            <span>使用学员：{{Order.StudentName}}</span>
                            <span class="phone">13585652585</span>
                    </div>
                    <div class="void"></div>
                    <div class="campus-info">
                        长沙市岳麓区望月湖中心校区
                    </div>
					<div class="card-hd">
						<div v-for="pro in Order.Items">
							<order-card :product="pro"  :campus="Order"></order-card>
						</div>
					</div>
					<div class="card-bd">
                        <div class="card-bd-item">
                            <div class="card-bd-item-l">商品总额 <span class="spec">（共1件商品）</span></div>
                            <div class="card-bd-item-r">&#165;35.00</div>
                        </div>
                        <div class="card-bd-item">
                            <div class="card-bd-item-l">积分抵扣 <span class="spec">(可用3000积分抵扣)</span></div>
                            <div class="card-bd-item-r">-&#165;30.00</div>
                        </div>
                        <div class="card-bd-item">
                            <div class="card-bd-item-l">订单金额</div>
                            <div class="card-bd-item-r">&#165;1855.00</div>
                        </div>
                        <div class="card-bd-item">
                            <div class="card-bd-item-l">微信支付</div>
                            <div class="card-bd-item-r red">&#165;855.00</div>
                        </div>  
					</div>
                </div>
                <div class="void"></div>
				
				<div class="info">
					<div class="info-bd">
						<div class="info-bd-item">
                            <label>订单编号：</label>{{Order.OrderNumber}}
                        </div>
						<div class="info-bd-item">
                            <label>下单时间：</label>{{Order.Date | formatDatetime('yyyy-MM-dd hh:mm:ss')}}
                        </div>
						<div class="info-bd-item">
                            <label>支付时间：</label>{{Order.PayDateTime | formatDatetime('yyyy-MM-dd hh:mm:ss')}}
                        </div>
                        <div class="info-bd-item">
                            <label>支付流水号：</label>12358524456644
                        </div>
                        <div class="info-bd-item">
                            <label>买家留言：</label>时间端氨基酸看了觉得拉丝机达拉斯的垃圾上单拉萨看得见快乐
                        </div>
					</div>
				</div>
				<div class="operate" v-if="Order.Status==1">
					<span class="btn" @click="payOrder(Order.ID)" v-if="!Order.IsExpired">立即支付</span>
					<span class="btn1" @click="closeOrder(Order.ID)">关闭订单</span>
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
	</div>
</template>

<script>
	 
	import { getOrderDetail,getWXPayData,getIsPaid,orderClose} from 'api/lc';
    import OrderCard from './children/order-card/order-card.vue';
    import loadingSvg from 'mall/static/svg/loading-bars.svg';
    import orderDetailSucssBg from './img/1.png';
    import orderDetailClose from './img/2.png';
    import orderDetailWait from './img/4.png';
	
	export default{
		name:'order-detail',
        data() {
            return {
            	isPaySkip: false,
            	orderDetailSucssBg,
                orderDetailClose,
                orderDetailWait,
            	loadingSvg,
            	isLoadingDetail: false, //加载订单详情的动画
            	isLoadingPay: false, //等待支付结果的动画
            	Order: null,
            	queryPara: null,
               	wxTitle:"订单详情",
               	timeout: null, //订单倒计时

          
         
				qrUrl: '',
				
				InvoiceCode: '',
				InvoiceEndTime: '',

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
				getWXPayData({
					ID: id	//订单ID
				}).then(res => {
					if (res.ErrorCode == app.errok) {
						try{
							document.getElementById('wxData').value = res.Data.WXData;
							document.getElementById('wxPayForm').action = res.Data.PayURL;
							document.getElementById("wxPayForm").submit();
						}catch(e){
							app.toast('error', e.message);
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
	    			ID: this.$route.params.id
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
            
        },
        created(){
        	this.queryPara = this.$route.query;
            
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
		    }
		},
        components: {
			OrderCard,
		}
	}
</script>