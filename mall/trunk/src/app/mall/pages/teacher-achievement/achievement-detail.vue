<style lang="scss" scoped>
    .scroll {
        background-color: $color-assist-1;
        .top {
            position: relative;
            height: 150px;
            padding: 0 10px;
            // background-color: $color-primary;
            color: $color-white;
            // background: url('./img/1.png')no-repeat;
            .title {
                padding-top: 30px;
                text-align: center;
                font-size: 13px;
            }
            .money {
                margin-top: 10px;
                font-size: 27px;
                text-align: center;
            }
            .order-wrapper {
                height: 60px;
                @include position-absolute(false, 10px, -20px, 10px);
                background-color: $color-white;
                border-radius: 10px;
                font-size: 13px;
                @include flex-between;
                color: $color-6;
                font-size: 13px;
                padding: 0 15px;
                .spec1 {
                    color: $color-3;
                }
                .spec2 {
                    color: #FF4241;
                }
            }
        }
        .mid {
            background-color: $color-assist-1;
            padding: (30px 10px 10px 10px);
            .mid-content {
                background-color: $color-white;
                border-radius: 10px;
                padding: 20px 15px;
                font-size: 14px;
                color: $color-9;
                .item-wrapper {
                    @include flex-between;
                }
                .spec1 {
                    color: #10AEFF;
                }
                .spec2 {
                    color: #3DBD7D;
                }
                .item-content {
                    color: $color-3;
                }
                .margin-top {
                    margin-top: 15px;
                }
            }
        }
        .bottom {
            background-color: $color-assist-1;
            padding: 0 10px 24px 10px;
            .bottom-contnet {
                padding: 20px 10px;
                background-color: $color-white;
                font-size: 14px;
                color: $color-3;
                border-radius: 10px;
                .title {
                    font-size: 15px;
                    margin-bottom: 5px;
                }
                .item-wrapper {
                    @include flex-between;
                    .item-title {
                        flex: 1;
                        display: flex;
                        max-width: 65%;
                        .icon-wrapper {
                            font-size: 18px;
                        }
                        .text {
                           @include ellipsis-single;
                            margin-left: 5px;
                            font-size: 14px;
                        }
                    }
                    .item-content {
                        width: 30px;
                        color: $color-9;
                        .icon {
                            font-size: 12px;
                        }
                    }
                    .price {
                        text-align: right;
                        width: 50px;
                        color: #F5A623;
                    }
                }
                .margin-top {
                    margin-top: 15px;
                }
            }
        }
    }
</style>

<template>
    <scroller-base class="scroll" :data="detail">
        <div class="top" :style="{background: `url(${bgImg})no-repeat`}">
            <div class="title">合计消费</div>
            <div class="money" v-if="detail.PayFact!==undefined">￥{{detail.PayFact.toFixed(2)}}</div>
            <div class="order-wrapper">
                <div class="order-name">订单金额<span class="spec1">&nbsp&nbsp&nbsp&nbsp&nbsp￥{{detail.OrderMoney}}</span></div>
                <div class="order-name">合计优惠<span class="spec2">&nbsp&nbsp&nbsp&nbsp&nbsp-￥{{detail.ReduceMoney}}</span></div>
            </div>
        </div>
        <div class="mid">
            <div class="mid-content" v-if="detail.PaymentName">
                <div class="item-wrapper">
                    <div class="item-title">付款方式：</div>
                    <div class="spec2" v-if="detail.PaymentName.indexOf('支')>0">{{detail.PaymentName}}</div>
                    <div class="spec1" v-if="detail.PaymentName.indexOf('微')>0">{{detail.PaymentName}}</div>
                </div>
                <div class="item-wrapper margin-top">
                    <div class="item-title">下单时间：</div>
                    <div class="item-content">{{detail.CreateTime | formatDatetime("yyyy.MM.dd hh:mm:ss")}}</div>
                </div>
                <div class="item-wrapper margin-top">
                    <div class="item-title">订&nbsp&nbsp单&nbsp&nbsp号：</div>
                    <div class="item-content">{{detail.OrderCode}}</div>
                </div>
                <div class="item-wrapper margin-top">
                    <div class="item-title">买家姓名：</div>
                    <div class="item-content">{{detail.StudentName}}</div>
                </div>
                <!--  -->
                <div class="item-wrapper margin-top" v-if="detail.StudentGrade">
                    <div class="item-title">年&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp级：</div>
                    <div class="item-content">{{detail.StudentGrade}}</div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="bottom-contnet" v-if="detail.OrderItemList">
                <div class="title">商品名称</div>
                <div class="item-wrapper margin-top" v-for="item in detail.OrderItemList">
                    <div class="item-title">
                        <div class="icon-wrapper">
                            <svg class="icon" aria-hidden="true" v-if="item.Type==1||item.Type==3">
                                <use xlink:href="#icon-ke"></use>
                            </svg>
                            <svg class="icon" aria-hidden="true" v-if="item.Type==2">
                                <use xlink:href="#icon-wu"></use>
                            </svg>
                            <svg class="icon" aria-hidden="true" v-if="item.Type==100">
                                <use xlink:href="#icon-taocan"></use>
                            </svg>
                        </div>
                        <div class="text">
                            {{item.Name}}
                        </div>
                    </div>
                    <div class="item-content">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-guanbi"></use>
                            </svg>
                        {{item.Amount}}
                    </div>
                    <div class="price">￥{{item.Money}}</div>
                </div>
            </div>
        </div>
    </scroller-base>
</template>

<script>
    import {getSaleReportDetail} from 'api/yy'
    let img = require('./img/1.png')
    export default {
        mixins: [app.mixin.shareMixin],
        data(){
            return {
                wxTitle: "我的业绩",
                detail: {},
                bgImg: img
            }
        },
        methods: {
            getData() {
                getSaleReportDetail({orderId: this.$route.params.id}).then(res => {
                    if (res.ErrorCode == app.errok) {
                        this.detail = res.Data
                    }
                })
            }
        },
        created() {
            this.getData()
        }
    }
</script>