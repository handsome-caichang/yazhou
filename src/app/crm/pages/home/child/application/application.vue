<style scoped lang="scss">
    .scroll {
        @include position-absolute;
        padding: 24px 16px;
        background-color: $color-white;
        .wrapper {
            padding-bottom: 40px;
            .heard {
                font-size: 12px;
                color: $color-9;
            }
            .bottom {
                display: flex;
                margin-top: 10px;
                .item {
                    // flex: 1;
                    width: 25%;
                    height: 98px;
                    border: 1px solid $color-assist-1;
                    border-radius: 13px;
                    padding: 15px 0;
                    @include flex-between(column);
                    &:nth-child(n+2) {
                        margin-left: 8px;
                    }
                    .icon-wrapper {
                        height: 44px;
                        width: 44px;
                        // @include background-img(false, cover);
                        background-image: url("./img/sprite.png");
                        background-size: cover;
                        background-repeat: no-repeat;
                        &.clear {
                            display: none;
                        }
                    }
                    .text {
                        font-size: 12px;
                        color: $color-6;
                    }
                    &.none {
                        border: none;
                    }
                }
            }
        }
    }
</style>

<template>
    <scroller-base class="scroll">
        <div class="wrapper">
            <div class="heard">日常应用</div>
            <div class="bottom">
                <router-link tag="div" 
                    class="item" 
                    :to="{path: `${item.router}`}" 
                    v-for="(item,index) in heardList"
                    :key="index">
                    <div class="icon-wrapper" :style="{backgroundPosition:item.style}"></div>
                    <div class="text">
                        {{item.text}}
                    </div>
                </router-link>
            </div>
        </div>
        <div class="wrapper">
            <div class="heard">数据统计</div>
            <div class="bottom">
                <router-link tag="div" 
                    class="item" 
                    :to="{path: `${item.router}`}" 
                    v-for="(item, index) in midList" :class="{none:!item.style}"
                    :key="index">
                    <div class="icon-wrapper" :class="{clear:!item.style}" :style="{backgroundPosition:item.style}"></div>
                    <div class="text">
                        {{item.text}}
                    </div>
                </router-link>
            </div>
        </div>
        <div class="wrapper">
            <div class="heard">销售支持</div>
            <div class="bottom">
                <router-link
                    tag="div"
                    :to="{path: `${item.router}`}" 
                    class="item" 
                    v-for="(item, index) in bottomList"
                    :key="index" 
                    :class="{none:!item.style}">
                    <div class="icon-wrapper" :class="{clear:!item.style}" :style="{backgroundPosition:item.style}"></div>
                    <div class="text">
                        {{item.text}}
                    </div>
                </router-link>
            </div>
        </div>
    </scroller-base>
</template>

<script>
    export default {
        data() {
            return {
                heardList: [
                    {
                        text: '添加线索',
                        router: '/addCustomer/1',
                        style: '0 0'
                    },
                    {
                        text: '客户公海',
                        router: '/customerSeas',
                        style: '0 -44px'
                    },
                    {
                        text: '邀约确认',
                        router: '/offer',
                        style: '0 -88px'
                    },
                    {
                        text: '今日计划',
                        router: '/todayPlan',
                        style: '0 -132px'
                    },
                ],
                midList: [
                    {
                        text: '我的业绩',
                        style: '0 -176px',
                        router:'/myWork'
                    }, {
                        text: '数据分析',
                        style: '0 -220px',
                        router:'/customerAnalyse'
                    }, {}, {}
                ],
                bottomList: [{
                    text: '二维码生成',
                    style: '0 -264px',
                    router: '/qrCode'
                }, {}, {}, {}]
            }
        },
        created() {
        }
    }
</script>