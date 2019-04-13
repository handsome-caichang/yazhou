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
            @include position-absolute(54px, 0, 49px, 0);
            .scroller {
                overflow: hidden;
                background-color: $color-white;
                @include position-absolute;
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
        .empty-page {
            @include position-absolute(54px, 0, 49px, 0);
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
                <div>
                    <comm-card v-for="(card, index) in list" :card="card" :key="index"></comm-card>
                </div>
            </scroller-super>
        </div>
        <router-link tag="div" to="/customHadle/today" class="bottom">客户操作管理</router-link>
        <select-custom-status 
            :opened.sync="showSelectStatus"
            :customState="customState"
            @selectCustomStatus="selectCustomStatus">
            
        </select-custom-status>
        <loading class="loading" v-show="isLoading" :bgType='bgType'></loading>
        <empty-page :type="5" class="empty-page" :text="'今日没有新增意向客户'" v-if="!list.length"></empty-page>
    </div>
</template>

<script>
    import {queryCustomer} from 'teacher/api/customers'
    import SelectCustomStatus from './selectCustomStatus'
    import CommCard from './commCard'
    import EmptyPage from 'teacher/components/common/empty-page/empty-page'
    import {mapState, mapMutations} from 'vuex'
    export default {
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
                bgType: 0
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
            CommCard,
            EmptyPage
        }
    }
</script>