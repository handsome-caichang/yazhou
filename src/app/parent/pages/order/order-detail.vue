<!-- 预制订单-订单列表界面 -->
<style lang="scss" scoped>
    
    

    .order-detail {
        @include position-absolute;
        background-color: $color-white;
        .header1 {
            height: 50px;
            padding-left: 25px;
            font-size: 16px;
            color: #ffffff;
            display: flex;
            align-items: center;
            &.status1 {
                background-color: #c8c6c3;
            }
            &.status2 {
                background-color: #FA9430;
            }
            &.status3 {
                background-color: #f4ffee;
                color: #666666;
                @include border-bottom(#2a9a03);
                svg {
                    color: #2a9a03;
                    font-size: 20px;
                    padding-right: 5px;
                }
            }
        }
        .header2 {
            min-height: 50px;
            padding-left: 25px;
            font-size: 16px;
            padding: 12px 10px 10px 25px;
            &.status1 {
                background-color: #c8c6c3;
            }
            &.status2 {
                background-color: #FA9430;
            }
            &.status3,
            &.status1,
            &.status2{
                color: #ffffff;
                .describe {
                    font-size: 12px;
                }
            }
            &.status4 {
                background-color: #fcefe9;
                @include border-bottom(#feb4b4);
                .describe {
                    color: #f92806; 
                }
                .describe1 {
                    color:#999;
                    font-size: 14px;
                }
                svg {
                    color: #f92806;
                    font-size: 20px;
                    padding-right: 5px;
                }
            }
        }
		.void {
			height: $void;
			background-color: $color-assist-1;
        }
        .fr {
            float: right;
        }
        .money {
            color: #ff3c00;
        }
        .form-group {
            display: flex;
            height: 40px;
            align-items: center;
            padding: 0 10px;
            @include border-bottom;
            &.border-top{
                @include border-top;
            }
            label {
                width: 50px;
            }
            .input-group {
                flex: 1;
                position: relative;
                input {
                    padding: 0;
                }
            }
            svg {
                position: absolute;
                right: 10px;
                top: 50%;
                margin-top: -5px;
            }
            &.seatout {
                color: #ff7f00;
                background: #fdf8e2;
            }
        }
        .card {
            line-height: 1;
            .card-bd {
                display: flex;
                padding: 12px;
                .picture {
                    width: 70px;
                    height: 70px;
                    @include background-img(false,cover);
                }
                .info {
                    flex: 1;
                    font-size: 14px;
                    color: #666666;
                    margin-left: 10px;
                    >div {
                        color: #999999;
                        padding-bottom: 5px;
                    }
                    .title {
                        color: #666666;
                        display: table;
                        width: 100%;
                        .name {
                            display: table-cell;
                            padding-right: 10px;
                            word-break: break-all;
                        }
                        .price {
                            display: table-cell;
                            vertical-align: top;
                            text-align: right;
                            position: relative;
                            min-width: 60px;
                            color: #333;
                            .pre {
                                color: #999;
                                position: absolute;
                                right: 0;
                                top: 20px;
                                text-decoration: line-through;
                            }
                        }
                    }
                    .money {
                        color: #ff3c00;
                    }
                    .outDate {
                        color: #f5a400;
                    }
                }
            }
        }
        .pay-money {
            padding: 12px;
            @include border-bottom;
            &:last-child:after {
                border-top: none;
            }
            .discount {
                text-align: right;
                color: #F48D07;
            }
            .emphasis {
                color: #333;
                font-size: 16px;
            }
        }
        .pay-fact {
            svg {
                font-size: 15px;
                margin-right: 5px;
                &.checked {
                    color: #18c461;
                }
            }
        }
        .pay-fact:before {
            content: '';
            position: absolute;
            width: 10px;
            height: 10px;
            top: -6px;
            right: 30px;
            background-color: #ffffff;
            transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
            border-left: 1px solid #E0E5EE;
            border-top: 1px solid #E0E5EE;
        }
        .pay-info {
            padding: 12px;
            line-height: 1.42857143;
        }
        .footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 50px;
            padding: 0 12px;
            border-top: 1px solid #E0E5EE;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            background-color: #ffffff;
            .btn {
                display: inline-block;
                min-width: 75px;
                height: 32px;
                line-height: 32px;
                text-align: center;
                font-size: 14px;
                border-radius: 2px;
                margin-left: 10px;
                border: 1px solid #e6e4e4;
            }
            .btn-confirm {
                border: 1px solid #ff3c00;
                background-color: #ff3c00;
                color: #fff;
            }
            .btn-forbid {
                border: 1px solid #ddd;
                background-color: #ddd;
                color: #fff;
            }
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
	        	color: #fbb12f;
	        }
		}
        .consult-dialog{
			position: absolute;
		    right: 5px;
		    bottom: 90px;
		    z-index: 100;
		    opacity: 0.5;
		    border-radius: 4px;
		    background-color: #000000;
		    svg{
		    	font-size: 45px;
		    }
		}
    }
    .scroller {
        @include position-absolute;
        overflow: hidden;
        &.pd-bottom {
            bottom: 50px;
        }
    }
</style>

<template>
    <div class="order-detail">
        <scroller-base class="scroller" v-if="order" :data="order" :class="(order.Status==1)?'pd-bottom':''">
            <div class="header1 status1" v-if="order.Status==-2||order.Status==0||order.Status==4||order.Status==5">{{order.OrderStatusName}}</div>
            <div class="header2 status1" v-if="order.OrderStatus==1&&order.Status==1&&order.OutDate<=0">已过期<div class="describe">{{order.IsStudent?'请前往学校付款':'请重新下单'}}</div></div>
            <div class="header2 status2" v-if="order.OrderStatus==1&&order.Status==1&&order.OutDate>0">等待付款<div class="describe">剩{{order.OutDate|formatSeconds}}订单过期</div></div>
            <div class="header1 status2" v-if="order.OrderStatus==2&&!queryPara.isPay">{{order.NewPayType==2?'已付定金':'已付款'}}，报名成功</div>
            <div class="header1 status2" v-if="order.OrderStatus==3&&order.Status>0">已预约</div>
            <div class="header1 status3" v-if="order.OrderStatus==2&&queryPara.isPay&&queryPara.isPay==1"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-yifukuan"></use></svg>报名成功</div>
            <div class="header2 status4" v-if="order.OrderStatus!=2&&order.ErrorMsg=='座位被占用'"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-tijiaoshibai"></use></svg>付款成功<span class="describe">但座位已被占用</span></div>
            <div class="header2 status3" v-if="order.OrderStatus!=2&&order.ErrorMsg&&order.ErrorMsg!='座位被占用'"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-tijiaoshibai"></use></svg>付款成功<span class="describe">但报名失败</span>
                <div class="describe1" v-if="order.ErrorMsg">{{order.ErrorMsg}}</div>
            </div>
            <div class="body">
                <div class="form-group">
                    <label>学员：</label><div class="input-group">{{order.StudentName}}（{{order.SexName}}）{{order.StudentPhoneNum}}</div>
                </div>
                <!--配置开启&&有教室&&非推送订单&&OrderStatus=1，3，5支持选座&&（待付款/已预约）&&座位未过期-->
                <div class="form-group" v-if="EnableSeat&&order.OrderType!=2&&onlineClass.ClassID!='00000000-0000-0000-0000-000000000000'&&onlineClass.MustSelectSeat==1&&order.Status==1&&!onlineClass.IsSeatOut"
                    @click="openSelectSeat({
                        'order': order,
                        'classId': onlineClass.ClassID,
                        'Name': onlineClass.Row<=0?'':onlineClass.SeatName,
                        'orderType': order.OrderType,
                        'student': order.StudentUserID,
                        'selectedSeatName': onlineClass.SelectedSeatName,
                        'seatObj': {
                            'row': onlineClass.Row,
                            'col': onlineClass.Col,
                            'seatName': onlineClass.SeatName
                        }})">
                    <label>选座：</label>
                    <div class="input-group">
                        <span class="seatName">{{onlineClass.Row<=0?"":formatSeatName(onlineClass.SeatName)}}</span>
                        <svg class="icon" aria-hidden="true"><use xlink:href="#icon-youjiantou"></use></svg>
                    </div>
                </div>
                <!--配置开启&&有教室&&非推送订单&&OrderStatus=1，3，5支持选座&&（待付款/已预约）&&座位过期-->
                <div class="form-group seatout" v-if="EnableSeat&&order.OrderType!=2&&onlineClass.ClassID!='00000000-0000-0000-0000-000000000000'&&onlineClass.MustSelectSeat==1&&order.Status==1&&onlineClass.IsSeatOut"
                    @click="openSelectSeat({
                        'order': order,
                        'classId': onlineClass.ClassID,
                        'Name': onlineClass.Row<=0?'':onlineClass.SeatName,
                        'orderType': order.OrderType,
                        'student': order.StudentUserID,
                        'selectedSeatName': onlineClass.SelectedSeatName,
                        'seatObj': {
                            'row': 0,
                            'col': 0,
                            'seatName': ''
                        }})">{{onlineClass.Row<=0?"":formatSeatName(onlineClass.SeatName)}}已失效，请重新选座<svg class="icon" aria-hidden="true"><use xlink:href="#icon-youjiantou"></use></svg>
                </div>
                <div class="form-group" v-if="order.OrderStatus==1||order.OrderStatus==3">
                    <label>留言：</label><div class="input-group"><input type="text" placeholder="（选填）" v-model="order.Memo"/></div>
                </div>
                <div class="form-group" v-if="order.OrderStatus!=1&&order.OrderStatus!=3&&order.Memo">
                    <label>留言：</label><div class="input-group">{{order.Memo}}</div>
                </div>
                <div class="form-group" v-if="order.OrderStatus==2&&order.OrderType==1&&onlineClass.ClassroomName!=''">
                    <label>教室：</label><div class="input-group">{{onlineClass.ClassroomName}}<span v-if="onlineClass.Row>0">/{{formatSeatName(onlineClass.SeatName)}}</span></div>
                </div>
                <div class="void"></div>
                <div v-for="Course in order.ItemList">
                    <div class="card">
                        <div class="card-bd">
                            <div class="picture" :style="'background-image: url('+Course.ImgSrc+')'"></div>
                            <div class="info">
                                <div class="title">
                                    <div class="name">{{Course.Name}}</div>
                                    <div class="price">&yen;&nbsp;{{Course.TotalMoney|formatNumber}}
                                        <span class="pre textline" v-if="Course.OriginalTotalPrice>Course.TotalMoney">&yen;&nbsp;{{Course.OriginalTotalPrice|formatNumber}}</span>
                                    </div>
                                </div>
                                <div v-if="Course.Type==0&&Course.TeacherName">{{Course.TeacherName}}</div>
                                <div v-if="Course.Type==0&&Course.OpenDate">{{Course.OpenDate}}开班</div>
                                <div v-if="Course.Type==0&&Course.ClassroomName">{{Course.ClassroomName}}<span v-if="Course.Row>0">/{{formatSeatName(Course.SeatName)}}</span></div>
                                <div v-if="Course.Type==0&&Course.CourseTime">{{Course.CourseTime}}上课</div>
                                <div v-if="Course.Type==0&&Course.CampusName">{{Course.CampusName}}</div>
                                <div v-if="Course.CampusName&&Course.OutDate" class="outDate">费用有效期至{{Course.OutDate}}</div>
                                <div v-if="Course.Type==1">{{Course.CourseAmount}}{{Course.UnitName}}</div>
                            </div>
                        </div>
                        <div class="form-group border-top" 
                            v-if="Course.ClassID!='00000000-0000-0000-0000-000000000000'&&Course.ClassRoomID!=='00000000-0000-0000-0000-000000000000'&&order.OrderType==2&&order.Status>0&&(order.OrderStatus==1||order.OrderStatus==3||(order.OrderStatus!=2&&order.ErrorMsg=='座位被占用'))&&!Course.IsSeatOut"
                             @click="openSelectSeat({
                                'order': order,
                                'classId': Course.ClassID,
                                'Name': Course.Row<=0?'':Course.SeatName,
                                'orderType': order.OrderType,
                                'student': order.StudentUserID,
                                'selectedSeatName': Course.SelectedSeatName,
                                'seatObj': {
                                    'row': Course.Row,
                                    'col': Course.Col,
                                    'seatName': Course.SeatName
                                }})">
                            <label>选座：</label><div class="input-group"><span class="seatName">{{Course.Row<=0?"":formatSeatName(Course.SeatName)}}</span><svg class="icon" aria-hidden="true"><use xlink:href="#icon-youjiantou"></use></svg></div>
                        </div>
                        <div class="form-group seatout border-top" 
                            v-if="Course.ClassID!='00000000-0000-0000-0000-000000000000'&&Course.ClassRoomID!=='00000000-0000-0000-0000-000000000000'&&order.OrderType==2&&order.Status>0&&(order.OrderStatus==1||order.OrderStatus==3||(order.OrderStatus!=2&&order.ErrorMsg=='座位被占用'))&&Course.IsSeatOut"
                            @click="openSelectSeat({
                                'order': order,
                                'classId': Course.ClassID,
                                'Name': Course.Row<=0?'':Course.SeatName,
                                'orderType': order.OrderType,
                                'student': order.StudentUserID,
                                'selectedSeatName': Course.SelectedSeatName,
                                'seatObj': {
                                    'row': 0,
                                    'col': 0,
                                    'seatName': ''
                            }})">
                            {{Course.Row<=0?"":formatSeatName(Course.SeatName)}}已失效，请重新选座<svg class="icon" aria-hidden="true"><use xlink:href="#icon-youjiantou"></use></svg>
                        </div>
                    </div>
                    <div class="void"></div>
                </div>
                <div v-if="order.Status>0">
                    <div class="pay-money">
                        <div>订单总价<span class="fr">&yen;&nbsp;{{order.OrderMoney|formatNumber}}</span></div>
                        <div v-if="order.DirectReduce>0||order.PointReduce>0" class="discount">
                                                        (<span v-if="order.DirectReduce>0">已优惠&yen;{{order.DirectReduce|formatNumber}}</span><span v-if="order.DirectReduce>0&&order.PointReduce>0">,</span><span v-if="order.PointReduce>0">积分兑换&yen;{{order.PointReduce|formatNumber}}</span>)
                        </div>
                    </div>
                    <div class="pay-money" v-if="order.CouponReduce>0">优惠券<span class="fr">-&nbsp;&yen;&nbsp;{{order.CouponReduce|formatNumber}}</span></div>
                    <div class="pay-money" v-if="order.ReserveMoneyReduce>0">冲减电子钱包<span class="fr">-&nbsp;&yen;&nbsp;{{order.ReserveMoneyReduce|formatNumber}}</span></div>
                    <div class="pay-money pay-fact">
                        <div class="emphasis" v-if="order.NewPayType==1">实付款<span class="fr money">&yen;&nbsp;{{order.PayFact|formatNumber}}</span></div>
                        <div class="emphasis" v-if="order.NewPayType==2">{{order.OrderStatus==2?'已付定金':'定金'}}<span class="fr money">&yen;&nbsp;{{order.PrePrice|formatNumber}}</span></div>
                        <div class="emphasis" v-if="order.NewPayType==2&&order.OrderStatus==2">欠交金额<span class="fr money">&yen;&nbsp;{{(order.OughtPay-order.PayFact-order.ReserveMoneyReduce)|formatNumber}}</span></div>
                        <div v-if="order.NewPayType==3" @click="()=>{orderPayType=1}">
                            <label><svg class="icon" aria-hidden="true" v-if="orderPayType!==1"><use xlink:href="#icon-danxuanweixuanzhong"></use></svg><svg class="icon checked" aria-hidden="true" v-if="orderPayType==1"><use xlink:href="#icon-danxuanxuanzhong"></use></svg>全款</label>
                            <span class="fr money">&yen;&nbsp;{{order.PayFact|formatNumber}}</span>
                        </div>
                        <div v-if="order.NewPayType==3" @click="()=>{orderPayType=2}">
                            <label><svg class="icon" aria-hidden="true" v-if="orderPayType!==2"><use xlink:href="#icon-danxuanweixuanzhong"></use></svg><svg class="icon checked" aria-hidden="true" v-if="orderPayType==2"><use xlink:href="#icon-danxuanxuanzhong"></use></svg>定金</label>
                            <span class="fr money">&yen;&nbsp;{{order.PrePrice|floatNumber}}</span>
                        </div>
                    </div>
                </div>
                <div class="void" v-if="order.Status>0"></div>
                <div class="pay-info">
                    <div>订单编号：{{order.OrderCode}}</div>
                    <div>下单时间：{{order.OrderDate.replace(/T/,' ')}}</div>
                    <div v-if="order.OrderStatus==2||(queryPara.isPay&&queryPara.isPay==1)">支付时间：{{order.PaymentDate}}</div>
                    <div v-if="order.Describe">备注：{{order.Describe}}</div>
                </div>
            </div>
        </scroller-base>
        <div class='footer' v-if="order&&order.Status==1">
            <span v-if="order.Status==2&&order.PayFact>0&&EnableElectronicInvoice" class="btn" @click="clickInvoice()">开具发票</span>
            <!-- 待付款订单&&状态正常 -->
            <span v-if="order.OrderStatus==1" class="btn" @click="opOrder(0,order.ID)">关闭订单</span>
            <span v-if="order.OrderStatus==1&&EnableClassOnlinePay&&order.OutDate>0" class="btn btn-confirm" @click="payOrder(1)">付款</span>
            <!-- 已预约&&状态正常 -->
            <span v-if="order.OrderStatus==3" class="btn" @click="opOrder(1,order.ID)">取消预约</span>
            <span v-if="order.OrderStatus==3&&EnableClassOnlinePay" class="btn" :class="order.IsAllowAppointment==1?'btn-confirm':'btn-forbid'" @click="payOrder(order.IsAllowAppointment==1?1:0)">报名</span>
        </div>
        <div class="footer" v-else-if="order&&order.Status==2&&order.PayFact>0&&EnableElectronicInvoice">
            <!-- 只要配置项开启且实际付款金额>0就能开发票 -->
            <span class="btn" @click="clickInvoice()">开具发票</span>
        </div>

        <!-- 选座界面 -->
        <select-seat
            :seatPara="slelctSeatPara"
            :opened.sync="openSeat"
            @hasSelectSeat="hasSelectSeat"
            @setSeat="setSeat">
        </select-seat>

        <!-- 等待订单详情的界面 -->
        <loading v-if="isLoadingDetail"></loading>
        <loading v-if="submitLoading" :bgType="1" class="loading"></loading>

        <!-- 等待订单支付结果的界面 -->
        <div class="pay-loading" v-if="isLoadingPay">
            <span class="loading-img" :style="'backgroundImage:url('+payWaitingGif+')'"></span>
            <p class="loading-tips">正在处理，请稍后...</p>
        </div>

        <!-- 在线咨询 -->
        <a class="consult-dialog" v-if="app.sysInfo.ConsultURL" @click="gotoConsult()">
            <svg aria-hidden="true" class="icon">
                <use xlink:href="#icon-zaixianzixun"></use>
            </svg>
        </a>

        <!-- 发票二维码 -->
        <invoice-qrcode 
            :opened.sync="isShowInvoiceAS"
            :paraData = "invoiceData">
        </invoice-qrcode>  
    </div>
</template>

<script>
    import { isFinish,putOrderStatus,deleteOrder } from 'parent/api/order.js';
    import { processGet } from 'parent/api/common.js';
    import { mapState,mapMutations } from 'vuex';
    import axios from 'parent/api/axios-j';
    import SelectSeat from './child/SelectSeat';
    import payWaitingGif from './img/payWaiting.gif';
    import InvoiceQrcode from './child/invoice-qrcode';

    export default {
        name: 'order-detail',
        data() {
            return {
                payWaitingGif,
                wxTitle: '订单详情-'+app.sysInfo.username,
                isLoadingDetail: false, //加载订单详情的动画
                isLoadingPay: false, //等待支付结果的动画
                submitLoading: false,
                order: null,
                queryPara: null,
                timeout: null, //订单倒计时
                onlineClass: null,
                openSeat: false,
                slelctSeatPara: null,
                orderPayType: 1,
                EnableSeat: app.sysInfo.EnableSeat,
                EnableClassOnlinePay: app.sysInfo.EnableClassOnlinePay,
                EnableElectronicInvoice:app.sysInfo.EnableElectronicInvoice==1,//发票二维码配置项

                invoiceData:{},
                isShowInvoiceAS: false,
               
            }
        },
        computed: {
        	...mapState([
        		'orderDetailRefreshFlag'
        	])
        },
        created() {
            this.queryPara = this.$route.query;
        	
        	//如果正在执行订单
        	if (this.queryPara.isPay && (this.queryPara.isPay==1)) {
        		this.isLoadingPay = true;
        		this.isOrderFinish();
        		return;
        	}
            
        	this.getOrderDetail();
        },
        methods: {
            ...mapMutations([
        		'set_orderListRefreshFlag'
        	]),
            isOrderFinish() { //轮询请求获取订单的执行情况
        		let $this = this;
        		isFinish({
                    id: $this.queryPara.orderId
	    		}).then(res => {
	    			if (res.ErrorCode == app.errok) {
	    				if (res.Data == true) {
	    					$this.isLoadingPay = false;
	    					$this.getOrderDetail();
	    				}else{
	    					setTimeout(function(){
								$this.isOrderFinish(this.queryPara.orderId);
							},2000);
	    				}
	    			}else{
    					$this.isLoadingPay = false;
	    				app.toast('error', res.ErrorMsg);
	    			}
				})
        	},
            getOrderDetail(){
                this.isLoadingDetail = true;
                processGet({
                    pname: 'classOnline',
                    action: 'GetOrderDetail',
                    orderID: this.queryPara.orderId,
                    companyID: app.sysInfo.companyID,
                    company: app.sysInfo.companyID
                }).then(res => {
                    this.isLoadingDetail = false;
                    if (res.errcode == app.errok) {
                        this.order = res.data;
                        
                        //处理订单过期
                        clearTimeout(this.timeout);
                        let now = new Date(this.order.NowDate.replace(/\-/g,'/')).getTime(),
                            out = new Date(this.order.OutDate.replace(/\-/g,'/')).getTime();
                        this.order.OutDate = (out-now)/1000;
                        if (this.order.Status==1&&(this.order.OutDate>0)) {
                            this.diffOrderTime();
                        }
                        if (this.order.OrderType!=2) { //在线订单
                            this.onlineClass = this.order.ItemList[0];
                        }

                        //处理座位
                        this.order.ItemList.forEach(function(item){
                            if (item.Type == 0) {
                                Vue.set(item,"SelectedSeatName",item.SeatName);
                            }
                        })
                    }
                })
            },
            diffOrderTime(){ //订单过期倒计时
                this.timeout = setTimeout(()=>{
                    this.order.OutDate--;
                    if (this.order.OutDate<=0) {
                        clearTimeout(this.timeout);
                    }else{
                        this.diffOrderTime();
                    }
                },1000);
            },
            formatSeatName(name){
                return name?name.replace("-","排")+"座":"";
            },
            openSelectSeat(obj){
                this.slelctSeatPara = obj;
                this.openSeat = true;
            },
            setSeat(obj){
                this.order.ItemList.forEach(function(item){
                    if (item.ClassID == obj.classId) {
                        item.Row = obj.seat.row;
						item.Col = obj.seat.col;
                        item.SeatName = obj.seat.seatName;
                        item.IsSeatOut = false;
                    }
                })
            },
            opOrder(type,id) {
                let typeName = ['关闭','取消预约'],
                    ajaxPromise = type==0?putOrderStatus:deleteOrder;

                app.confirm('确定'+typeName[type]+'该订单吗？').then(res => {
	  				if (res === true) {
		        		ajaxPromise({
                            id: id,
                            status: type==0?0:''
		        		}).then(res => {
							if (res.ErrorCode == app.errok) {
								app.toast('success', typeName[type]+'订单成功。');
                                this.getOrderDetail();
                                this.set_orderListRefreshFlag();
		                    }else{
		                    	app.toast('error', res.ErrorMsg);
		                    }
		        		});
	  				}
	  			});
            },
            payOrder(type){
                if (type==0) {
                    return;
                }
                if(this.order.OrderType!=2&&this.order.ItemList[0].MustSelectSeat==1&&this.order.ItemList[0].Row==0){//TODO这个判断要改
					app.toast('error','请选择座位。');
					return;
                }
                
                let seatData = {
					clsID: [],
					clsRoomID: [],
					row: [],
					col: [],
					seatName: []
                },
                submitData = null;

                this.order.ItemList.forEach(function(item){
                    if (item.Type == 0) {
                        seatData.clsID.push(item.ClassID);
                        seatData.clsRoomID.push(item.ClassRoomID);
                        seatData.row.push(item.Row);
                        seatData.col.push(item.Col);
                        seatData.seatName.push(item.SeatName);
                    }
                })
                submitData = {
                    saveFlag: "CLASS_ONLINE_PAY_ORDER",
                    orderID: this.order.ID,
                    orderMoney: this.order.OughtPay,
                    payFact: this.order.PayFact,
                    memo: this.order.Memo,
                    PrePrice: this.order.PrePrice,
                    PayType: this.order.NewPayType==3?this.orderPayType:this.order.NewPayType,
                    row: seatData.row.join(','),
                    col: seatData.col.join(','),
                    seatName: seatData.seatName.join(','),
                    classRoomID: seatData.clsRoomID.join(','),
                    classID: seatData.clsID.join(',')
                }
                
                if(submitData.PayType>1){
                    app.confirm("您选择了定金支付"+this.order.PrePrice.toFixed(2)+"元，剩下的"+(this.order.OughtPay-this.order.PrePrice).toFixed(2)+"元需要到前台支付。").then(res => {
                        if (res === true) {
                            this.postSaveOrder(submitData);
                        }
                    });
                }else{
                    this.postSaveOrder(submitData);
                }
            },
            postSaveOrder(submitData){
                this.submitLoading = true;
                submitData.random = Math.random();
                axios.ajax('SaveClassOnline.ashx',submitData).then(res=> {
                    this.submitLoading = false;
                    if (res.errcode == app.errok) {
                        if(res.wxData=="报名成功"){
                            this.getOrderDetail();
                        }else{
                            if (res.wxData) {
                                try{
                                    document.getElementById('wxData').value = res.wxData;
                                    document.getElementById('wxPayForm').action = app.sysInfo.PayURL;
                                    document.getElementById("wxPayForm").submit();
                                }catch(e){
                                    app.toast('error', e.message);
                                }
                            }else if(res.orderID){
                                this.getOrderDetail();
                            }else {
                                app.toast('error', '获取微信支付数据出错。');
                            }
                        }
                    } else if (res.errcode == 407) {
                        window.location.href = app.sysInfo.WeixinParentServerURL;
                    } else {
                        if (res.errcode !== 500) { //422不允许重复报班，但允许报同一课程下的多个班
                            app.toast('error', res.errmsg);
                        }else {
                            app.toast('error', '订单支付失败。');
                        }
                    }
                });
            },
            gotoConsult(){
                location.href = app.sysInfo.ConsultURL;
            },
            invoiceToast(str='开具发票失败，请联系学校'){
                app.alert({
                    text: str
                })
            },
            //点击发票
            clickInvoice() {
				if (app.tool.isEmptyObject(this.invoiceData)) {
                    //获取发票二维码信息
                    processGet({
                        pname : 'GetInvoiceCode',
                        action : 'GetElectroicCode',
                        orderID: this.queryPara.orderId,
                        companyID: app.sysInfo.companyID,
                    }).then((res)=>{
                        if((res.errcode == app.errok) && res.data){

                            if(res.data.invoiceQRUrl==''||res.data.InvoiceStatus==-1){
                                this.invoiceToast()
                            }else if(res.data.InvoiceStatus==2){
                                this.invoiceToast('发票正在申请，请稍后再试')
                            }else{
                                this.invoiceData = res.data;
                                this.isShowInvoiceAS = !this.isShowInvoiceAS;
                            }
                            
                        }else{
                            this.invoiceToast()
                        }
                    })
					
				}else {
					this.isShowInvoiceAS = !this.isShowInvoiceAS;
				}
            },
                        
        },
        components: {
            SelectSeat,
            InvoiceQrcode
        },
        watch: {
		    orderDetailRefreshFlag: function (val, oldVal) { //重新拉取数据
            	this.getOrderDetail();
		    }
		}
    }
</script>