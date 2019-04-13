<style scoped lang="scss">
    
    
    .scroll {
        @include position-absolute;
        background-color: $color-white;
        .item {
            .item-top {
                height: 44px;
                line-height: 44px;
                padding: 0 12px;
                font-size: 16px;
                color: $color-3;
                border-bottom: 1px solid $color-assist-1;

            }
            .item-bottom {
                height: 60px;
                padding: 12px;
                .item-bottom-content {
                    display: flex;
                    .left, .right {
                        flex: 1;
                        font-size: 12px;
                    }
                    .right {
                        text-align: right;
                    }
                    .spec {
                        margin-left: 10px;
                        color: $color-3;
                    }
                }
                .mar-top {
                    margin-top: 6px;
                }
            }
            .void {
                height: 10px;
                background-color: $color-assist-1;
            }
        }
    }
</style>

<template>
    <scroller-base class="scroll" :data="list">
        <div class="item" v-for="item in list">
            <div class="item-top">
                {{item.name}}
            </div>
            <div class="item-bottom">
                <div class="item-bottom-content">
                    <div class="left">
                        客户数量:<span class="spec">{{item.value}}</span>
                    </div>
                    <div class="right">
                        比例:<span class="spec">{{item.Rate+"%"}}</span>
                    </div>
                </div>
                <div class="item-bottom-content mar-top">
                    <div class="left">
                        转化成功:<span class="spec">{{item.transum}}</span>
                    </div>
                    <div class="right">
                        转化率:<span class="spec">{{item.tranRate+"%"}}</span>
                    </div>
                </div>
            </div>
            <div class="void"></div>
        </div>
    </scroller-base>
</template>

<script>
    import {getCustomers} from 'teacher/api/customers'
    export default {
        data() {
            return {
                list: []
            }
        },
        methods: {
            initPage() {
                let params = {
                    pname: 'countbysalemode',
                    campusids: '',
                    sdate: '',
                    edate: '',
                    parentid: '',
                    salemodes: '',
                    page: 1
                }
                getCustomers(params).then(res => {
                    console.log(res)
                    if (res.errcode == app.errok) {
                        this.list = res.data
                    }
                })
            }
        },
        created() {
            this.initPage()
        }
    }
</script>