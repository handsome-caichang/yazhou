<!-- 预制订单-订单列表界面 -->
<style lang="scss" scoped>
    
    
    .order-list {
        .header {
            display: flex;
            padding: 0 5px;
            .header-item {
                flex: 1;
                @include flex-center;
                height: $h-3;
                line-height: $h-3;
                position: relative;
                &.active {
                    color: #ff3c00;
                    border-bottom: 1px solid #ff3c00;
                }
            }
        }
        .void{
            height: 10px;
            background-color: #EEF1F6;
        }
        .body {
            @include position-absolute(40px);
            overflow: hidden;
            .card {
                line-height: 1;
                background-color: $color-white;
                .card-hd {
                    font-size: 12px;
                    color: #999999;
                    padding: 10px 12px 0 12px;
                    .status{
                        float: right;
                        color: #ff3c00;
                        font-size: 14px;
                    }
                }
                .card-bd {
                    padding: 0 12px;
                    .card-bd-item {
                        width: 100%;
                        display: flex;
                        padding: 10px 0;
                        @include border-bottom;
                        &:last-child {
                            @include border-none;
                        }
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
                                padding-bottom: 5px;
                            }
                            .title {
                                font-size: 16px;
                                color: #333333;
                            }
                            .money {
                                color: #ff3c00;
                            }
                        }
                    }
                }
                .card-bd-total {
                    margin: 0 12px;
                    text-align: right;
                    @include border-top;
                    height: 30px;
                    line-height: 30px;
                }
                .card-ft {
                    padding: 5px 12px;
                    @include border-top;
                    display: flex;
                    justify-content: flex-end;
                    .btn-like {
                        position: absolute;
                        left: 12px;
                        display: flex;
                        align-items: center;
                        height: 32px;
                        font-size: 10px;
                        color: #fb9a40;
                        svg {
                            font-size: 15px;
                            margin-right: 3px;
                        }
                        &.remain-time {
                            color: #666666;
                        }
                    }
                    .btn {
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
            }
        }
        .loading {
            top: 45px !important;
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
        .noData-temp {
            @include position-absolute;
        }
    }
</style>

<template>
    <div class="order-list">
        <div class="header">
            <router-link class="header-item"
                :class="{active:index===stype}"
				:to="`/orderList/${index}`" 
				:key="index"
				tag="div" 
				v-for="(item, index) in headerList"
				@click.native="()=>{stype=index}"
				replace>{{item}}</router-link>
		</div>
        <!-- 订单列表 -->
        <scroller-super
            class="body"
            @loadData="renderData"
            :type="2"
            :data="list"
            :pagingOption="pagingOption"
            ref="pagingScroller">
                <div v-for="item in list" class="card" :key="item.ID" v-if="item.LstItem.length>0">
                    <div class="void"></div>
                    <div class="card-hd">
                        <span v-if="item.OrderType==2||item.OrderType==4">推送订单</span>
                        <span v-if="item.OrderStatus==2||item.Status!=1" class="status">{{handleOrderStatus(item)}}</span>
                    </div>
                    <div class="card-bd">
                        <router-link tag="div" class="card-bd-item" v-for="(lstItem,index) in item.LstItem" :to="`/orderDetail?orderId=${item.ID}`" :key="index" >
                            <div class="picture" :style="'background-image: url('+lstItem.ImgSrc+')'"></div>
                            <div class="info">
                                <div class="title">{{lstItem.Name}}</div>
                                <div v-if="item.OrderType!=2&&lstItem.TeacherName">{{lstItem.TeacherName}}</div>
                                <div v-if="item.OrderType!=2&&lstItem.OpenDate">{{lstItem.OpenDate}}开班</div>
                                <div v-if="item.OrderType!=2&&lstItem.CampusName">{{lstItem.CampusName}}</div>
                                <div v-if="lstItem.CourseTime">{{lstItem.CourseTime}}上课</div>
                                <div v-if="lstItem.Type==1">{{lstItem.Times}}{{lstItem.Unit}}</div>
                                <div v-if="lstItem.OutDate&&lstItem.Type==0" style="color: #f5a400;">费用有效期至{{lstItem.OutDate}}</div>
                                <div class="money">&yen;&nbsp;{{lstItem.TotalMoney|formatNumber}}</div>
                            </div>
                        </router-link>
                    </div>
                    <div v-if="item.LstItem.length>1" class="card-bd-total">共{{item.LstItem.length}}件&emsp;合计：&yen;&nbsp;{{item.OrderMoney|formatNumber}}</div>
                    <div class="card-ft" v-if="item.Status==1&&item.OrderStatus==1">
                        <span class="btn-like" v-if="item.expiredSeconds<=0">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-guoqitishi"></use>
                            </svg>订单已过期
                        </span>
                        <span class="btn-like remain-time" v-else>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-shijian"></use>
                            </svg>剩<span>{{item.expiredSeconds|formatSeconds}}</span>
                        </span>
                        <a class="btn" @click="opOrder(0,item.ID)">关闭订单</a>
                        <a class="btn btn-confirm" v-if="EnableClassOnlinePay&&item.expiredSeconds>0" @click="payOrder(1,item.ID)">付款</a>
                    </div>
                    <div class="card-ft" v-if="item.OrderStatus==3&&item.Status>0">
                        <span class="btn-like" v-if="item.IsAllowAppointment!=1">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-guoqitishi"></use>
                            </svg>未满足报名条件</span>
                        <a class="btn" @click="opOrder(1,item.ID)">取消预约</a>
                        <a v-if="EnableClassOnlinePay" class="btn" :class="item.IsAllowAppointment==1?'btn-confirm':'btn-forbid'" @click="payOrder(item.IsAllowAppointment==1?1:0,item.ID)">报名</a>
                    </div>
                    <div class="card-ft" v-if="item.Status==0||item.Status==-2">
                        <a class="btn" @click="opOrder(2,item.ID)">删除订单</a>
                    </div>
                </div>
                <empty-page class="noData-temp" :type="12" v-if="list.length == 0"></empty-page>
        </scroller-super>
        <!-- 加载中... -->
        <loading class="loading" v-show="isLoading"></loading>
        <!-- 在线咨询 -->
        <a class="consult-dialog" v-if="app.sysInfo.ConsultURL" @click="gotoConsult()">
            <svg aria-hidden="true" class="icon">
                <use xlink:href="#icon-zaixianzixun"></use>
            </svg>
        </a>
    </div>
</template>

<script>
	import EmptyPage from 'parent/components/common/empty-page/empty-page';
    import { mapState } from 'vuex';
    import { processGet } from 'parent/api/common.js';
    import { putOrderStatus,deleteOrder } from 'parent/api/order.js';

    /** 
     * OrderType: 订单类型：1在线订单，2||4推送订单，3预约订单
     * Status: 订单状态：0已关闭，1待付款（包括未付款/已过期），2已付款（NewPayType==2已付定金），4退费中，5已退费，-2’已失效‘
     * type: -1不限, 1待交费, 2已支付, 3已预约
     * OrderStatus:1待缴费，2已支付，3已预约
     * IsAllowAppointment：1达标
     * NewPayType: 2定金
    */
    export default {
        name: 'order-list',
        data() {
            return {
                wxTitle: '订单列表-'+app.sysInfo.username,
                headerList:['全部','待付款','已付款'], //选项卡： 0-全部，1-待付款，2-已付款
                pagingOption: { //列表页请求地址
                    api: processGet,
                    params: {
                        pname: 'classOnline',
                        action: 'GetOrderList',
                        type: -1,
                        companyID: app.sysInfo.companyID,
                        company: app.sysInfo.companyID
                    },
                    pageOpt: {
                        indexKey: 'page', //分页初始页码的'key'、'value'
                        indexVal: 1,
                        sizeKey: 'pageSize', //每页请求数据长度的'key'、'value'
                        sizeVal: 20,
                        countKey: 'pageCount', //后端返回的总页数'key'
                    }
                },
                list: [],
                stype: -1,
                EnableClassOnlinePay: app.sysInfo.EnableClassOnlinePay
            }
        },
        computed: {
        	...mapState([
        		'orderListRefreshFlag'
        	])
        },
        methods: {
            renderData(ajaxPromise) { //获取数据
                ajaxPromise.then(res => {
                	this.isLoading = false;
                    if (res.errcode == app.errok) {
                    	if (res.pageIndex == 1) {
							this.list = [];
                        }

                        //处理订单过期时间
                        res.data.forEach(item => {
                            let now = new Date(item.NowDate.replace(/\-/g,'/')).getTime(),
                                out = new Date(item.OutDate.replace(/\-/g,'/').replace(/\T/g,' ')).getTime();
                            item.expiredSeconds = (out-now)/1000;
                        });
                        this.list = this.list.concat(res.data);
                    }
                })
            },
            handleOrderStatus(order) {
                if (order.Status==2) {
                    return order.NewPayType==2?'已付定金':'已付款';
                }else if (order.Status==0) {
                    return '已关闭';
                }else if (order.Status==4) {
                    return '退费中';
                }else if (order.Status==5) {
                    return '已退费';
                }else {
                    return '已失效';
                }
            },
            renderPage() {
                let typeArr = [-1,1,2]; 
        		this.isLoading = true;
	    		this.list=[];
				this.$refs.pagingScroller.refresh({
                    type: typeArr[this.stype] //type: -1不限, 1待交费, 2已支付, 3已预约
                })
            },
            opOrder(type,id) {
                let typeName = ['关闭','取消预约','删除'],
                    ajaxPromise = type==0?putOrderStatus:deleteOrder;

                app.confirm('确定'+typeName[type]+'该订单吗？').then(res => {
	  				if (res === true) {
		        		ajaxPromise({
                            id: id,
                            status: type==0?0:''
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
            payOrder(type,id) {
                if (type==0) {
                    return;
                }
                this.$router.push(`/orderDetail?orderId=${id}`);
            },
            gotoConsult(){
                location.href = app.sysInfo.ConsultURL;
            }
        },
        created() {
            this.stype = Number.parseInt(this.$route.params.status);
        },
        components: {
            EmptyPage
        },
        watch: {
		    stype: function (val, oldVal) { //切换订单类型，重新拉取数据
            	this.renderPage();
		    },
		    orderListRefreshFlag: function (val, oldVal) { //重新拉取数据
            	this.renderPage();
		    }
		}
    }
</script>