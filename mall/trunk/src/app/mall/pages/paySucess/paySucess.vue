<style scoped lang="scss">
    .scroll {
        @include position-absolute;
        .img {
            margin-top: 46px;
            text-align: center;
            color: #52C41A;
            font-size: 54px;
        }
        .text {
            margin-top: 14px;
            font-size: 16px;
            color: $color-3;
            text-align: center;
        }
        .info {
            margin-top: 38px;
            padding: 0 15px;
            .info-content {
                border-top: 1px solid #EBEBEB;
                border-bottom: 1px solid #EBEBEB;
                padding: 10px 12px;
                .top {
                    @include flex-between;
                    &:not(:first-child) {
                        margin-top: 12px;
                    }
                    font-size: 14px;
                    color: $color-9;
                }
            }
        }
        .gobuy {
            @include position-absolute(false, 25px, 154px, 25px);
            height: 49px;
            line-height: 49px;
            border-radius: 6px;
            background: linear-gradient(to right, #F23030, #FE7544);
            color: $color-white;
            text-align: center;
            font-size: 16px;
        }
        .goorder {
            @include position-absolute(false, 25px, 90px, 25px);
            height: 49px;
            line-height: 49px;
            border: 1px solid #979797;
            border-radius: 6px;
            background-color: $color-white;
            color: $color-3;
            text-align: center;
            font-size: 16px;
        }
    }
</style>

<template>
    <scroller-base class="scroll">
        <div class="img">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gou"></use>
            </svg>
        </div>
        <div class="text">订单支付成功</div>
        <div class="info">
            <div class="info-content">
                <div class="top">
                    <div>支付方式</div>
                    <div>在线支付</div>
                </div>
                <div class="top">
                    <div>支付金额</div>
                    <div>&#165;1885.00</div>
                </div>
            </div>
        </div>
        <router-link tag="div" to="/home/0" class="gobuy">继续购买</router-link>
        <router-link class="goorder" tag="div" to="/orderDetail/bca99c08-e5ba-4c46-be9a-9dcc12b3a77a">查看订单</router-link>
    </scroller-base>
</template>

<script>
    export default {
        data() {
            return {
                wxTitle: '支付成功'
            }
        }
    }
</script>