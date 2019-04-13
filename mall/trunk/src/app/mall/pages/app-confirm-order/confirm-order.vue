<style lang="scss" scoped>
    .scroll-wrapper {
        @include position-absolute;
        .name {
            margin-top: 50px;
            font-size: 15px;
            color: $color-3;
            text-align: center;
        }
        .price {
            margin-top: 16px;
            color: #E93A0E;
            font-size: 26px;
            text-align: center;
        }
        .content {
            margin-top: 38px;
            border: 1px dotted #EBEBEB;
            padding: 15px 20px 5px 20px;
            .item {
                @include flex-between;
                &:not(:first-child) {
                    margin-top: 10px;
                }
                .item-l {
                    width: 60px;
                    color: $color-9;
                }
                .item-r {
                    flex: 1;
                    text-align: right;
                    @include ellipsis-single;
                    width: 0;
                }
            }
        }
        .bottom {
            @include position-absolute(false, 25px, 90px, 25px);
            height: 49px;
            line-height: 49px;
            text-align: center;
            border-radius: 6px;
            background: linear-gradient(to right, #F23030, #FE7544);
            color: $color-white;
        }
    }
</style>

<template>
    <scroller-base class="scroll-wrapper">
        <div class="name">彭千万</div>
        <div class="price">&#165;250</div>
        <div class="content">
            <div class="item">
                <div class="item-l">收款方</div>
                <div class="item-r">笑管家测试系统</div>
            </div>
            <div class="item">
                <div class="item-l">订单号</div>
                <div class="item-r">1258525255454566</div>
            </div>
            <div class="item">
                <div class="item-l">课程</div>
                <div class="item-r">2019笑管家测试系统2019笑管家测试系统2019笑管家测试系统2019笑管家测试系统</div>
            </div>
        </div>
        <div class="bottom" @click="pay">
            立即支付
        </div>
    </scroller-base>
</template>

<script>
    export default {
        data() {
            return {
                wxTitle: '确认订单',
            }
        },
        methods: {
            pay() {
                app.toast('info', '支付成功')
                setTimeout(() => {
                    this.$router.push({path: '/paySucess'})
                }, 1000)
            }
        }
    }
</script>