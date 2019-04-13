<style scoped lang="scss">
    
    
    .container {
        // background-color: $color-assist-1;
        width: 100%;
        background-color: $color-white;
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
            @include position-absolute(54px, 0, 0, 0);
            .scroller {
                overflow: hidden;
                background-color: $color-white;
                @include position-absolute;
                .card {
                    // border-bottom: 10px solid $color-assist-1;
                    .card-heard {
                        display: flex;
                        padding: 0 12px;
                        height: 44px;
                        line-height: 44px;
                        font-size: 16px;
                        color: $color-3;
                        border-bottom: 1px solid $color-assist-1;
                        .card-heard-left {
                            flex: 1;
                            font-size: 16px;
                            color: $color-3;
                            .icon {
                                margin-right: 5px;
                            }
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
                            height: 40px;
                            .icon {
                                font-size: 30px;
                            }
                        }
                    }
                }
            }
        }
        .handle-bottom {
            @include position-absolute(false, 0, 0, 0);
            height: 79px;
            background-color: #fff;
            // border-top: 1px solid $color-9;
            box-shadow: darkgrey 10px 10px 30px 5px;
            .handle {
                height: 37px;
                padding: 15px 12px 0 12px;
                display: flex;
                color: $color-white;
                .all-select {
                    width: 50px;
                    font-size: 15px;
                    color: $color-3;
                }

                .item-wrapper {
                    margin-left: 10px;
                    flex: 1;
                    display: flex;
                    justify-content: space-between;
                }
                .bottom-item {
                    width: 46px;
                    height: 22px;
                    // margin-left: 2px;
                    // flex: 1;
                    @include flex-between;
                    color: $color-6;
                    border-radius: 14px;
                    border: 1px solid $color-6;
                    padding: 10px;
                    .text {
                        font-size: 12px;
                        transform: scale(0.9);
                    }
                }
                .long {
                    width: 72px;
                }
            }
            .close {
                color: $color-white;
                height: 42px;
                line-height: 42px;
                .close-center {
                    width: 30px;
                    margin: 0 auto;
                }
            }
        }
        .empty-page {
            @include position-absolute(54px, 0, 0, 0);
            z-index: 20;
        }
    }
</style>

<template>
    <div class="container">
        <div class="heard">
            <div class="heard-left">今日新增客户<span class="num">{{list.length}}</span>人</div>
            <div class="heard-right" @click="showSelectStatus=true">筛选</div>
        </div>
        <div class="void"></div>
        <div class="list-body">
            <scroller-super class="scroller"
                            ref="scroll"
                            :type="2"
                            :data="list"
                            :pagingOption="pagingOption"
                            @loadData="loadData">
                <div class="card" v-for="card in list">
                    <!-- <comm-card v-for="(card, index) in list" :card="card" :key="index"></comm-card> -->
                    <div style="borderBottom: 10px solid #EEF1F6">
                        <div class="card-heard" >
                            <div class="card-heard-left" @click="selectCard(card)">
                                <svg class="icon check" aria-hidden="true">
                                    <use :xlink:href="card.isSelect?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
                                </svg>{{card.Name}}
                                <svg class="icon" aria-hidden="true" v-if="card.Sex>0">
                                    <use :xlink:href="card.Sex==1?'#icon-nan':'#icon-nv'"></use>
                                </svg>
                            </div>
                            <div class="card-heard-right" @click="addComm(card)">
                                沟通记录
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-youjiantou"></use>
                                </svg>
                            </div>
                        </div>
                        <div class="card-body">
                            <div @click="saveInfo(card)" class="card-body-left">
                                <div class="item">主责任人:&nbsp&nbsp<span class="item-content">{{card.SalePersonName}}</span></div>
                                <div class="item">手机号码:&nbsp&nbsp<span class="item-content">{{card.SMSTel}}</span></div>
                                <div class="item">客户状态:&nbsp&nbsp<span class="item-content">{{card.CustomerStatusName}}</span></div>
                                <div class="item">意向级别:&nbsp&nbsp
                                    <span class="item-content">
                                        <svg class="icon" aria-hidden="true" v-for="i in card.WillLevel">
                                            <use xlink:href="#icon-yixiangdengji"></use>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <a type="text" class="card-body-right" :href="'tel:'+card.SMSTel">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-bodadianhua1"></use>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </scroller-super>
        </div>
        <!-- <router-link tag="div" to="/customHadle/today" class="bottom">客户操作管理</router-link> -->
        <div class="handle-bottom" v-if="computedList.length>0">
            <div class="handle">
                <div class="all-select" @click="allSelect"> 
                    <svg class="icon check" aria-hidden="true">
                        <use :xlink:href="isAllSelect?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
                    </svg>
                    全选
                </div>
                <div class="item-wrapper">
                    <div class="bottom-item" @click="handleCustomer('del')">
                        <div class="text">
                            删除
                        </div>
                    </div>
                    <div class="bottom-item" @click="revise">
                        <div class="text">修改</div>
                    </div>
                    <div class="bottom-item long" @click="changeCustomToFormal">
                        <div class="text">转为正式</div>
                    </div>
                    <div class="bottom-item long" @click="handleCustomer('cancle')">
                        <div class="text">取消转化</div>
                    </div>
                </div>
            </div>
            <div class="close" >
                <div class="close-center" @click="closeHandleBottom">
                    <svg class="icon check" aria-hidden="true">
                        <use xlink:href="#icon-guanbi"></use>
                    </svg>
                </div>
            </div>
        </div>
        <select-custom-status 
            :opened.sync="showSelectStatus"
            :customState="customState"
            @selectCustomStatus="selectCustomStatus">
            
        </select-custom-status>

        <select-status-and-campus
            :opened.sync="showSelectStatusAndCampus"
            @selectObj="selectObj">
        </select-status-and-campus>

        <select-campus
            :opened.sync="showSelectCampus"
            :campusObj="campusObj"
            @selectCampusOver="selectCampusOver"
            @selectCampus="selectCampus">
        </select-campus>
        <loading class="loading" v-show="isLoading" :bgType='bgType'></loading>
        <empty-page :type="5" class="empty-page" :text="'今日没有新增意向客户'" v-if="!list.length"></empty-page>
    </div>
</template>

<script>
    import {queryCustomer} from 'teacher/api/customers'
    import SelectCustomStatus from './selectCustomStatus.vue'
    import SelectStatusAndCampus from './customHadle/selectStatusAndCampus'
    import SelectCampus from './customHadle/selectCampus'
    import EmptyPage from 'teacher/components/common/empty-page/empty-page.vue'
    import {mapState, mapMutations} from 'vuex'
    import {commHandle} from './commHandle.js'
    export default {
        mixins: [commHandle],
        data() {
            return {
                wxTitle: "今日新增客户",
                list: [],
                pagingOption: {
                    api: queryCustomer,
                    params: {
                        pname:"querycustomer",
                        NextDate1: '',
                        NextDate2: '',
                        CreateTime1: '',
                        CreateTime2: '',
                        Query: '',
                        sort: 'CreateTime',
                        employeeid: '',
                        employeename: '',
                        desc: 1,
                        Status: ''
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
                showSelectStatus: false,
                customState: {},
                isLoading: true,
                bgType: 0,

                isAllSelect: false,
                showSelectStatusAndCampus: false,
                showSelectCampus: false,
                campusObj: {}

            }
        },
        computed: {
            computedList() {
                return this.list.filter(obj => obj.isSelect)
            }
        },
        methods: {
            ...mapMutations(['set_todayParams']),
            loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    this.isLoading = false
                    if (res.errcode == app.errok) {
                        if (res.pageIndex === 1) {
                            this.list = []
                        }
                        res.data.forEach(obj => {
                            this.$set(obj, 'isSelect', false)
                        })
                        this.isAllSelect = false
                        this.list = this.list.concat(res.data)
                    }
                })
            },
            selectCustomStatus(obj) {
                this.$refs.scroll.refresh({Status: obj.ID})
                this.customState = obj
                this.showSelectStatus = false
                this.set_todayParams(obj)
            }
        },
        created() {
            let date = new Date(), str = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            this.$set(this.pagingOption.params, 'CreateTime1', str)
            this.$set(this.pagingOption.params, 'CreateTime2', str)
        },
        components: {
            SelectCustomStatus,
            // CommCard,
            EmptyPage,
            SelectStatusAndCampus,
            SelectCampus
        }
    }
</script>