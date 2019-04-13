<style scoped lang="scss">
    
    
    .container {
        // background-color: $color-assist-1;
        width: 100%;
        .heard {
            @include flex-between;
            padding: 0 14px;
            height: 44px;
           .search-wrapper {
                flex: 1;
                height: 28px;
                border: 1px solid $color-assist-1;
                border-radius: 50px;
                position: relative;
                margin-right: 15px;
                .input {
                    font-size: 12px;
                    color: $color-9;
                    height: 100%;
                    width: 100%;
                }
                .search-button {
                    @include position-absolute(0, 0, 0, false);
                    height: 26px;
                    line-height: 26px;
                }
           }
           .sort, .select, .search-button {
                height: 28px;
                line-height: 28px;
                width: 49px;
                text-align: center;
                background-color: $color-assist-1;
                color: $color-6;
                font-size: 13px;
                border-radius: 50px;
           }
           .sort {
                margin-right: 10px;
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
            display: flex;
            @include position-absolute(false, 0, 0, 0);
            height: 49px;
            line-height: 49px;
            background-color: $color-primary;
            font-size: 16px;
            .bottom-left, .bottom-right {
                flex: 1;
                text-align: center;
                color: $color-white;
            }
            .bottom-left {
                border-right: 1px solid #1A7CE2;
            }
        }
        .loading {
            z-index: 200;
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
            <div class="search-wrapper">
                <input type="text" :placeholder="app.tool.op('CustomerFilter')?'姓名/电话/公立学校':'电话'" class="input" v-model="inputText">
                <div class="search-button" @click="searchCustomer">搜索</div>
            </div>
            <div class="sort" @click="showSelectSortType=true" v-if="app.tool.op('CustomerFilter')">排序</div>
            <div class="select" @click="showSelectMore=true" v-if="app.tool.op('CustomerFilter')">筛选</div>
        </div>
        <div class="void"></div>
        <div class="list-body" ref="listBody">
            <scroller-super class="scroller"
                            :type="2"
                            :data="list"
                            ref="scroll"
                            :pagingOption="pagingOption"
                            @loadData="loadData">
                <div>
                    <comm-card v-for="(card, index) in list" :card="card" :key="index"></comm-card>
                </div>
            </scroller-super>
        </div>
        <loading class="loading" v-show="isLoading" :bgType='bgType'></loading>
        <div class="bottom" v-if="computeRights">
            <router-link tag="div" to="/addCustomer/add" class="bottom-left" v-if="app.tool.op('CustomerAdd')">添加客户</router-link>
            <router-link tag="div" to="/customHadle/all" class="bottom-right" >客户管理操作</router-link>
        </div>
        <empty-page :type="5" :text="'没有可以操作的客户哦~'" class="empty-page" v-if="!list.length" ref="emptyPage"></empty-page>
        <select-more
            :opened.sync="showSelectMore"
            @selectMore="selectMore">
            
        </select-more>

        <sort-sheet 
            :list="sortArr" 
            :opened.sync="showSelectSortType"
            @clickSort="clickSort" 
            :title="'排序方式'"
            :initType="'1-0'">
        </sort-sheet>
    </div>
</template>

<script>
    import {queryCustomer} from 'teacher/api/customers'
    import SelectSortType from './selectSortType'
    import SelectMore from './selectMore'
    import CommCard from '../commCard'
    import EmptyPage from 'teacher/components/common/empty-page/empty-page'
    import {mapState, mapMutations} from 'vuex'
    export default {
        data() {
            return {
                wxTitle: "意向客户管理",
                isLoading: app.tool.op('CustomerFilter') ? true : false,
                bgType: 0,
                list: [],
                pagingOption: {
                    api: queryCustomer,
                    autoLoadFirst: app.tool.op('CustomerFilter'),
                    params: {
                        pname:"querycustomer",
                        sort: 'CreateTime'
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
                showSelectSortType: false,
                sortType: '',
                sortArr: [{name: '姓名',sort: 'Name'}, {name: '录入时间',sort: 'CreateTime'}, {name: '跟进时间',sort: 'NextDate'}, {name: '沟通时间',sort: 'LastDate'}],

                showSelectMore: false,
                inputText: '',
            }
        },
        computed: {
            ...mapState(['allParams']),
            computeRights() {
                return !(app.tool.op('CustomerQuery') && !app.tool.op('CustomerFilter') && !app.tool.op('CustomerViewTel') && !app.tool.op('CustomerQuerySub')  && !app.tool.op('CustomerAdd'))
            }
        },
        methods: {
            ...mapMutations(['set_allParams']),
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
            
            saveInfo(obj) {
                this.set_cunstomInfo({
                    CustomerStatusName: obj.CustomerStatusName,
                    CustomerStatus: obj.CustomerStatus,
                    WillLevel: obj.WillLevel
                }) 
                this.$router.push({name: 'customDetail', params: {id: obj.ID, name: obj.Name}})
            },
            clickSort(obj) {
                let params = {
                    sort: obj.item.sort,
                    desc: obj.desc ? 1 : 0
                }
                this.$refs.scroll.refresh(params)
            },
            selectMore(obj) {
                this.showSelectMore = false
                let params = {
                    desc: 1,
                    Query: this.inputText,
                    Status: obj.Status,
                    CreateTime1: obj.CreateTime1,
                    CreateTime2: obj.CreateTime2,
                    LastDate1: obj.LastDate1,
                    LastDate2: obj.LastDate2,
                    NextDate1: obj.NextDate1,
                    NextDate2: obj.NextDate2,
                    employeeid: obj.employeeid,
                    employeename: obj.employeename
                }
                this.$refs.scroll.refresh(params)
                this.isLoading = true
                this.set_allParams(obj)
            },
            searchCustomer() {
                this.$refs.scroll.refresh({Query: this.inputText})
                app.ls.set('params', {Query: this.inputText})
            }
        },
        created() {
            this.$nextTick(() => {
                if (!this.computeRights) {
                    this.$refs.listBody.style.bottom = 0
                    this.$refs.emptyPage.$el.style.bottom = 0
                }
            })
        },
        watch: {
            
        },
        components: {
            SelectSortType,
            SelectMore,
            CommCard,
            EmptyPage
        }
    }
</script>