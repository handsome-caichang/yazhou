<style scoped lang="scss">
    
    
    .scroller {
        @include position-absolute(59px, 0, 0, 0);
        .item-wrapper {
            .item {
                background-color: $color-white;
                .item-top {
                    height: 44px;
                    padding: 0 12px;
                    @include flex-between;
                    border-bottom: 1px solid $color-assist-1;
                    .avatar {
                        height: 30px;
                        width: 30px;
                        border-radius: 50%;
                        background-color: $color-assist-1;
                    }
                    .name {
                        margin-left: 8px;
                        // width: 70px;
                        font-size: 16px;
                        color: $color-3;
                    }
                    .num {
                        margin-left: 10px;
                        flex: 1;
                        font-size: 12px;
                        color: $color-9;
                    }
                    .top-right {
                        text-align: right;
                        width: 70px;
                        font-size: 12px;
                        color: #8B572A;
                    }
                }
                .item-body {
                    border-bottom: 1px solid $color-assist-1;
                    padding: 0 15px 15px 15px;
                    .body-li {
                        display: flex;
                        .left, .right {
                            flex: 1;
                            font-size: 12px;
                            margin-top: 12px;
                        }
                        .left {
                            color: $color-6;
                        }
                        .right {
                            color: $color-3;
                            text-align: right;
                        }
                    }
                }
                .void {
                    height: 10px;
                    background-color: $color-assist-1;
                }
            }
        }
    }

</style>

<template>
    <scroller-super 
        class="scroller"
        ref="scroll"
        :type="2"
        :data="list"
        :pagingOption="pagingOption"
        @loadData="loadData">
            <div class="item-wrapper">
                <div class="item"  v-for="item in list">
                    <div class="item-top">
                        <div class="avatar"></div>
                        <div class="name">{{item.Name}}</div>
                        <div class="num">沟通次数:{{item.CommunicationCount}}</div>
                        <div class="top-right">
                            
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="item-body">
                        <div class="body-li">
                            <div class="left">上次沟通</div>
                            <div class="right"></div>
                        </div>
                        <div class="body-li">
                            <div class="left">下次沟通</div>
                            <div class="right"></div>
                        </div>
                        <div class="body-li">
                            <div class="left">手机号码</div>
                            <div class="right">{{item.SMSTel}}</div>
                        </div>
                        <div class="body-li">
                            <div class="left">剩余学费</div>
                            <div class="right"></div>
                        </div>
                        <div class="body-li">
                            <div class="left">学管师</div>
                            <div class="right">{{item.CreateUserName}}</div>
                        </div>
                    </div>
                    <div class="item-bottom"></div>
                    <div class="void"></div>
                </div>
            </div>
    </scroller-super>
</template>

<script>
    import {getCustomers} from 'teacher/api/customers'
    export default {
        data() {
            return {
                list: [],
                pagingOption: {
                    api: getCustomers,
                    params: {
                        pname: 'querycustomer',
                        isWaitComm: 1
                    },
                    pageOpt: {
                        // 分页初始页码的'key'、'value'
                        indexKey: 'page',
                        indexVal: 1,
                        // 每页请求数据长度的'key'、'value'
                        sizeKey: 'pageSize',
                        sizeVal: 20,
                        // 后端返回的总页数'key'
                        countKey: 'pageCount'
                    }
                },
            }
        },
        methods: {
            loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    // this.isLoading = false
                    if (res.errcode == app.errok) {
                        if (res.pageIndex === 1) {
                            this.list = []
                        }
                        this.list = this.list.concat(res.data)
                    }
                })
            },
        }
    }
</script>