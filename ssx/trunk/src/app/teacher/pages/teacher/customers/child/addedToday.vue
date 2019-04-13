<style scoped lang="scss">
    
    
    .container {
        // background-color: $color-assist-1;
        width: 100%;
        .heard {
            @include flex-between;
            padding: 0 12px;
            height: 44px;
            line-height: 44px;
            .heard-left {
                flex: 1;
                font-size: 15px;
                .num {
                    color: $color-primary;
                }
            }
            .heard-right {
                width: 50px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                background-color: $color-assist-1;
                border-radius: 50px;
                font-size: 13px;
            }
        }
        .void {
            height: 10px;
            background-color: $color-assist-1;
        }
        .list-body {
            @include position-absolute(54px, 0, 49px, 0);
            .scroller {
                overflow: hidden;
                background-color: $color-white;
                @include position-absolute;
                .card {
                    background-color: $color-white;
                    border-bottom: 10px solid $color-assist-1;
                    .card-heard {
                        @include flex-center;
                        padding: 0 12px;
                        height: 44px;
                        border-bottom: 1px solid $color-assist-1;
                        .card-heard-left {
                            flex: 1;
                            font-size: 16px;
                            color: $color-3;
                        }
                        .card-heard-right {
                            width: 75px;
                            font-size: 12px;
                            color: $color-9;
                        }
                    }
                    .card-body {
                        padding: 12px 12px 0 12px;
                        @include flex-center;
                        .card-body-left {
                            flex: 1;
                            .item {
                                height: 12px;
                                line-height: 12px;
                                font-size: 12px;
                                margin-bottom: 12px;
                                color: $color-6;
                                .item-content {
                                    color: $color-3;
                                }
                            }
                        }
                        .card-body-right {
                            width: 50px;
                            .icon {
                                font-size: 28px;
                            }
                        }
                    }
                }
            }
        }
        .bottom {
            @include position-absolute(false, 0, 0, 0);
            height: 49px;
            line-height: 49px;
            background-color: $color-primary;
            font-size: 16px;
            text-align: center;
            color: $color-white;
        }
    }
</style>

<template>
    <div class="container">
        <div class="heard">
            <div class="heard-left">今日新增客户<span class="num">5</span>人</div>
            <div class="heard-right" @click="showSelectStatus=true">筛选</div>
        </div>
        <div class="void"></div>
        <div class="list-body">
            <scroller-super class="scroller"
                            :type="2"
                            :data="list"
                            :pagingOption="pagingOption"
                            @loadData="loadData">
                <div>
                    <div class="card" v-for="card in list">
                        <div class="card-heard">
                            <div class="card-heard-left">王文并
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-nan1"></use>
                                </svg>
                            </div>
                            <div class="card-heard-right">
                                沟通记录
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-youjiantou"></use>
                                </svg>
                            </div>
                        </div>
                        <div class="card-body">
                                <!-- tag="div"
                                :to="`/customDetail/${card.ID}/${card.Name}`"> -->
                            <div 
                                @click="saveInfo(card)"
                                class="card-body-left">
                                <div class="item">主责任人:<span class="item-content">{{card.SalePersonName}}</span></div>
                                <div class="item">手机号码:<span class="item-content">{{card.SMSTel}}</span></div>
                                <div class="item">客户状态:<span class="item-content">{{card.CustomerStatusName}}</span></div>
                                <div class="item">意向级别:
                                    <span class="item-content">
                                        <svg class="icon" aria-hidden="true" v-for="i in card.WillLevel">
                                            <use xlink:href="#icon-xingxingxuanzhong"></use>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div class="card-body-right">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-bodadianhua"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </scroller-super>
        </div>
        <router-link tag="div" :to="{path: '/customHadle'}" class="bottom">客户操作管理</router-link>
        <select-custom-status 
            :opened.sync="showSelectStatus"
            :customState="customState"
            @selectCustomStatus="selectCustomStatus">
            
        </select-custom-status>
    </div>
</template>

<script>
    import {queryCustomer} from 'teacher/api/customers'
    import SelectCustomStatus from './selectCustomStatus'
    export default {
        data() {
            return {
                list: [],
                pagingOption: {
                    api: queryCustomer,
                    params: {
                        pname:"querycustomer",
                        CreateTime1: '2018-02-23',
                        CreateTime2: '2018-02-23',
                        sort: 'CreateTime,',
                        desc: 1
                    }
                },
                showSelectStatus: false,
                customState: {}
            }
        },
        methods: {
            ...Vuex.mapMutations(['set_cunstomInfo']),
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
            selectCustomStatus(obj) {
                this.customState = obj
                this.showSelectStatus = false
            },
            saveInfo(obj) {
                this.set_cunstomInfo({
                    CustomerStatusName: obj.CustomerStatusName,
                    CustomerStatus: obj.CustomerStatus,
                    WillLevel: obj.WillLevel
                }) 
                this.$router.push({name: 'customDetail', params: {id: obj.ID, name: obj.Name}})
            }
         },
        components: {
            SelectCustomStatus
        }
    }
</script>