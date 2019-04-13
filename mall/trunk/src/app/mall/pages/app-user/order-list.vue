<!-- 订单列表界面 -->
<style lang="scss" scoped>   
    .order-list {
        @include position-absolute;
		background-color: $color-white;
        .header{
        	position: absolute !important;
        	display: flex;
        	top: 0;
			left: 0;
			width: 100%;
        	.header-item-wrap{
        		flex: 1;
        		@include flex-center;
        		@include border-right;
        		.header-item{
        			position: relative;
        			height: $h-3;
        			line-height: $h-3;
                    &.active {
                        color: #F03232;
                    }
        			&.active:after{
    				    content: '';
					    position: absolute;
					    bottom: 0px;
					    left: 0;
					    right: 0;
        				border-bottom: 2px solid #F03232;
        			}
        		}
        	}
        }
        .body{
        	position: absolute;
        	top: $h-3;
        	left: 0;
        	bottom: 0;
        	width: 100%;
        	background-color: $color-assist-1;
        	.void{
        		height: $void;
        		background-color: $color-assist-1;
        	}
        	.card{
        		.card-hd{
        			padding: 0 16px;
        			height: $h-3;
					line-height: $h-3;
					font-size: $fs-normal-x;
					@include flex-between;
					@include border-bottom;
					background-color: $color-white;
                    .campus{
                        max-width: 50%;
                        @include ellipsis-single;
                    }
					.card-hd-r{
						.time{
							vertical-align: top;
							font-size: $fs-small;
							margin-right: 7px;
							.icon{
								vertical-align: baseline;
								margin-right: 5px;
							}
						}
						.status{
							color: #F03232;
						}
					}
        		}
        		.card-ft{
        			padding: 7px 0px 7px 10px;
					@include flex-between;
					background-color: $color-white;
					.total{
						flex: 1;
						color: $color-3;
						font-size: $fs-small-x;
						.inline-block {
                            margin-left: 10px;
							display: inline-block;
						}
						.money{
							font-size: $fs-normal-x;
						}
					}
				   	.btn{
				    	float: right;
				    	min-width: 75px;
				    	height: 26px;
				    	line-height: 26px;
				    	text-align: center;
				    	font-size: $fs-small-x;
				    	border-radius: 4px;
				    	margin-right: 10px;
				    	&.default{
				    		color: #F03232;
				    		border: 1px solid #F03232;
				    	}
				    	&.default1{
				    		color: $color-6;
				    		border: 1px solid $color-6;
				    	}
				    }
        		}
        	}
        }
    }
    .scroller{
        @include position-absolute;
        overflow: hidden;
    }
    .loading{
    	top: 45px !important;
    }
    .noData_temp {
		@include position-absolute;
	}
</style>

<template>
	<div class="order-list">
		<!-- 头部选项卡 -->
		<div class="header">
			<router-link class="header-item-wrap" 
				tag="div" 
				v-for="(item, index) in headerList"
				:to="`/orderList/${index}`" 
				:key="index"
				@click.native="changeStatus(index)"
				replace>
				<div class="header-item" :class="{active:index===stype}">{{item}}</div>
			</router-link>
		</div>
		<!-- 订单列表 -->
		<div class="body">
			<scroller-super :type="2" class="scroller" @loadData="renderData" :data="list" :pagingOption="pagingOption" ref="pagingScroller">
				<div class="void"></div>
				<div class="card" v-for="item in list">
					<div class="card-hd">
						<span class="campus">{{item.CampusName}}</span>
						<span class="card-hd-r">
							<span class="time" v-if="(item.Status==1)&&(!item.IsExpired)">
								<svg class="icon" aria-hidden="true">
				        			<use xlink:href="#icon-riqiicon"></use>
				        		</svg>剩{{item.ExpiredSeconds|formatSeconds}}
							</span>
							
							<!-- 如果存在ErrorMessage, 说明是付款成功，但是可能没有抢座、入班成功等的情况 -->
							<svg class="icon" aria-hidden="true" v-if="item.ErrorMessage">
			        			<use xlink:href="#icon-quanjutishijinggao"></use>
			        		</svg>
							<span class="status">{{getStatusStr(item)}}</span>
						</span>
					</div>
					<div class="card-bd" @click="gotoDetail(item.ID)">
						<div v-for="pro in item.Items" v-if="item.Type==1">
							<order-card :product="pro" :type="1" :campus="item"></order-card>
						</div>
					</div>
					<div class="card-ft">
						<div class="total">
							<span class="inline-block">共{{getAmount(item)}}件商品&emsp;</span>
                            <span class="inline-block" v-if="item.IsPreMoney">定金：
                                <span class="money">&#165;{{item.PreMoney|formatNumber}}</span>
                            </span>
							<span class="inline-block">
                                实付款：<span class="money">&#165;{{item.PayMoney|formatNumber}}</span>
                            </span>
						</div>
						<div>
							<span class="btn default" v-if="(Math.random()>0.3)" @click="payOrder(item.ID)">立即支付</span>
							<span class="btn default1" v-if="Math.random()>0.6" @click="deleteOrder(0,item.ID)">关闭订单</span>
						</div>
					</div>
					<div class="void"></div>
				</div>
				<empty-page class="noData_temp" :type="5" v-if="list.length === 0"></empty-page>
			</scroller-super>			
		</div>
		<!-- 加载中... -->
        <loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
    import OrderCard from './children/order-card/order-card.vue';
    import EmptyPage from 'common/empty-page/empty-page.vue'
     
    import { getOrderList,orderDelete,orderClose,getWXPayData } from 'api/lc';

	export default{
		name:'order-list',
        data() {
            return {
            	headerList:['全部','待付款','已付款','已关闭'], //选项卡： 0-全部，1-待付款，2-已付款，3-待评价
            	stype: -1,
        		list: [], //iscroll监听refresh的数组
        		isLoading: true,
        		isPaySkip: false,
        		wxTitle:"我的订单",
        		pagingOption: { //列表页请求地址
                    api: getOrderList,
                    params: {},
                    autoLoadFirst: false,
               	},
               	queryPara:[{ //全部
               		Status: null,
               		IsExpired: null,
               		IsComment: null
               	},{ //待付款= 待付款 AND 未过期
               		Status: 1,
               		IsExpired: false,
               		IsComment: null
               	},{ //已支付=（已完成 OR 已付款）
               		Status: [2,3],
               		IsExpired: null,
               		IsComment: null
               	},{ //待评价= （已完成 OR 已付款） AND 未评价
               		Status: [2,3],
               		IsExpired: null,
               		IsComment: false
               	}],
               	timeout: null //倒计时：用来做订单列表的倒计时
            }
        },
        computed: {
        	...Vuex.mapState([
        		'config',
        		'orderListRefreshFlag',
        	])
        },
        methods: {
        	...Vuex.mapMutations([
				'set_userPageRefreshFlag'
			]),
        	getAmount(item){//获取总数
        		let amount = 0;
				item.Items.forEach((p)=>{
					if (p.Type == 1 || p.Type == 3) {
						amount = amount+1;	
					}else if (p.Type == 2) {
						amount = amount+parseInt(p.Amount);	
					}
        		});
				return amount;
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
        	changeStatus(index){// 切换订单类型
        		this.stype = index;
        	},
        	renderData(ajaxPromise) {
                ajaxPromise.then(res => {
                	this.isLoading = false;
                    if (res.ErrorCode == app.errok) {
                    	if (res.PageIndex === 1) {
							this.list = [];
						}
                        this.list = this.list.concat(res.Data);
                
                		//每次拉取数据的时候，订单/待付款的列表执行倒计时
                        clearTimeout(this.timeout);
                        if (this.stype==0 || this.stype==1) {
                        	this._diffOrderTime();
                        }
                    }
                })
        	},
        	gotoDetail(id){ //查看订单详情
				this.$router.push({path:`/orderDetail/${id}`});
        	},
        	deleteOrder(type,id){ //关闭、删除订单
        		let typeName = ['关闭','删除'],
        			ajaxPromise = type == 0 ? orderClose : orderDelete;
				
        		app.confirm('确定'+typeName[type]+'该订单吗？').then(res => {
	  				if (res === true) {
		        		ajaxPromise({
		        			ID: id
		        		}).then(res => {
							if (res.ErrorCode == app.errok) {
								app.toast('success', typeName[type]+'订单成功。');
								this.renderPage();
		                    }else{
		                    	app.toast('error', res.ErrorMsg);
		                    }
		        		});
	  				}
	  			});
        	},
        	payOrder(id){ //立即支付
        		if (this.isPaySkip) {
    				return;
        		}
        		this.isPaySkip = true;
                // document.getElementById('wxPayForm').action = this.config.WXPayURL;
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
						res.ErrorMsg && app.toast('error', res.ErrorMsg);
					}
					this.isPaySkip = false;
				})
        	},
        	renderPage(){
        		this.isLoading = true;
	    		this.list=[];
				this.$refs.pagingScroller.refresh(this.queryPara[this.stype])
	    		this.set_userPageRefreshFlag();
        	},
        	_diffOrderTime(){
				this.timeout = setTimeout(()=>{
					let count = 0; //订单列表中待付款&&未过期的订单数量
					this.list.forEach((orders,index)=>{
                		if (orders.Status==1&&!orders.IsExpired) {
                			count++;
                			orders.ExpiredSeconds--;
                			if (orders.ExpiredSeconds<=0) {
								orders.IsExpired=true;
								if (this.stype==1) {
									this.list.splice(index,1);
								}
                			}
                		}
					});
					if (count>0) {
						this._diffOrderTime();
					}else{
						clearTimeout(this.timeout);
					}
				},1000);
			},
        },
        created(){
        	this.stype = parseInt(this.$route.params.status) + 1 > 3 ? 0 : parseInt(this.$route.params.status) + 1;
        	app.event.on('appActive', (e, args) => {
        		let diff = args.diffTime;
        		this.list.forEach((orders,index)=>{
	                if (orders.Status == 1 && !orders.IsExpired) {
	                    orders.ExpiredSeconds -= diff;
	                    if (orders.ExpiredSeconds<=0) {
	                        orders.IsExpired=true;
	                        if (this.stype==1) {
	                            this.list.splice(index,1);
	                        }
	                    }
	                }
	            });
        	})
		},
		beforeDestroy() {
			app.event.off('appActive');
		},
        watch: {
		    stype: function (val, oldVal) {// 切换订单类型，重新拉取数据
                this.renderPage();
		    },
		    orderListRefreshFlag: function (val, oldVal) {// 切换订单类型，重新拉取数据
            	this.renderPage();
		    }
		},
		components: {
			OrderCard,
			EmptyPage,
		}
	}
</script>