<style lang="scss" scoped>
    .order-wrapper {
        @include position-absolute;
        background-color: $color-assist-4;
        .scroll-wrapper {
            @include position-absolute(0, 0, 49px 0);
            .top {
                height: 49px;
                @include flex-between;
                padding: 0 12px;
                color: $color-3;
                font-size: 14px;
            }
            .address-ft{
                height: 6px;
                @include background-img(false, cover);
            }
            .void {
                height: 10px;
                background-color: $color-white;
            }
            .campus-name {
                height: 40px;
                line-height: 40px;
                padding: 0 12px;
                color: $color-6;
                font-size: 13px;
            }
            .order-shopping {
                background-color: $color-assist-4;
                padding: 15px 12px 20px 12px;
                display: flex;
                .row-hd-l {
                    height: 83px;
                    width: 110px;
                    @include background-img;
                }
                .row-hd-r {
                    flex: 1;
                    margin-left: 10px;
                    .name {
                        color: $color-3;
                        font-size: 15px;
                        line-height: 21px;
                        @include ellipsis-multi(2);
                    }
                    .spec {
                        height: 18px;
                        line-height: 18px;
                        margin-top: 3px;
                        font-size: 12px;
                        color: $color-9;
                    }
                    .price {
                        margin-top: 12px;
                        font-size: 12px;
                        color: #F03232;
                        .big {
                            font-size: 15px;
                        }
                    }
                }
            }
            .package {
                padding: 0 12px;
                .package-info {
                    padding: 13px 10px;
                    font-size: 12px;
                    .heard {
                        color: $color-3;
                    }
                    .item {
                        display: flex;
                        margin-top: 13px;
                        color: $color-6;
                        .item-left {
                            flex: 1;
                        }
                        .item-right {
                            flex: 1;
                            text-align: right;
                        }
                    }
                }
            }
            .info-1 {
                background-color: $color-white;
                padding: 15px 12px;
                color: $color-3;
                .item {
                    @include flex-between;
                    &:not(:first-child) {
                        margin-top: 9px;
                    }
                    .item-l {
                        font-size: 13px;
                        .gray {
                            color: $color-9;
                            font-size: 11px;
                        }
                    }
                    .item-r {
                        font-size: 10px;
                    }
                }
            }
            .words {
                height: 49px;
                padding: 0 12px;
                @include flex-between;
                background-color: $color-white;
                justify-content: flex-start;
                .text {
                    color: $color-3;
                }
                .input {
                    margin-left: 10px;
                    border: none;
                    outline: none;
                }
            }
        }
        .bottom {
            @include position-absolute(false, 0, 0, 0);
            height: 49px;
            display: flex;
            background-color: $color-white;
            .bottom-l {
                flex: 1;
                padding: 0 12px;
                line-height: 49px;
                font-size: 16px;
                color: #F03232;
            }
            .bottom-r {
                width: 130px;
                line-height: 49px;
                background: linear-gradient(to right, #F23030, #FE7544);
                font-size: 18px;
                color: $color-white;
                text-align: center;
            }
        }
    }
</style>

<template>
    <div class="order-wrapper">
        <scroller-base class="scroll-wrapper">
            <div class="top">
                <div class="name">使用学员：&nbsp&nbsp彭千万（男）</div>
                <div class="phone">13596523562</div>
            </div>
            <div class="address-ft" :style="'backgroundImage:url('+addressBg+')'"></div>
            <div class="void"></div>
            <div class="campus-name">
                长沙市岳麓区望月湖中心校区
            </div>
            <div class="order-shopping">
                <div class="row-hd-l" :style="'background-image:url('+bgImg+')'"></div>
                <!-- 班级详情 -->
                <div class="row-hd-r">
                    <div class="name">
                        2019春季英语培优班
                    </div>
                    <div class="spec" v-if="type==1">
                        <label>规格：</label>
                        20课时
                    </div>
                    <div class="price">
                        <span>&#165;</span><span class="big">1885</span><span>.00</span>
                    </div>
                </div>
            </div>
            <div class="void"></div>
            <div class="package">
                <div class="package-info">
                    <div class="heard">套餐项目</div>
                    <div class="item" v-for="item in packageArr">
                        <div class="item-left">{{item.name}}</div>
                        <div class="item-right">{{item.spec}}</div>
                    </div>
                </div>
            </div>
            <div class="info-1">
                <div class="item">
                    <div class="item-l">商品总额（共一件商品）</div>
                    <div class="item-r">&#165;80.33</div>
                </div>
                <div class="item">
                    <div class="item-l">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-danxuanweizhong"></use>
                        </svg>
                        积分抵扣
                        <span class="gray">共2000积分，可用2000积分</span>
                    </div>
                    <div class="item-r">-&#165;20.33</div>
                </div>
                <div class="item">
                    <div class="item-l">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-danxuanweizhong"></use>
                        </svg>
                        电子钱包抵扣
                        <span class="gray">余额：&#165;123.00</span>
                    </div>
                    <div class="item-r">&#165;123.00</div>
                </div>
            </div>
            
            <div class="void"></div>
            <div class="words">
                <div class="text">买家留言：</div>
                <input class="input" placeholder="选填，对本次交易的说明">
            </div>
        </scroller-base>
        <div class="bottom">
            <div class="bottom-l">&#165;855.00</div>
            <router-link to="/confirmOrder" class="bottom-r">提交订单</router-link>
        </div>
    </div>
</template>

<script>
    import addressBg from './address-bg.png';
    export default {
        data() {
            return {
                wxTitle: '确认订单',
                addressBg,
                bgImg: '//cdn01.xiaogj.com/file/mall/default/shift.png',
                type: 1,
                packageArr: [{
                    name: '19春吉他初级班',
                    spec: '20课时'
                }, {
                    name: '19春架子鼓初级班',
                    spec: '30课时'
                }, {
                    name: '王牌木吉他',
                    spec: '1把'
                }]
            }
        },
        created() {
            this.type = parseInt(this.$route.params.type)
        }
    }
</script>