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
            .campus-name {
                flex: 1;
                text-align: right;
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
        <div class="heard" v-if="app.sysInfo.SortIntentionLevel=='1'">
            <div class="text">选择校区</div>
            <div class="campus-name" @click="showMySelectCampus=true">
                {{mySelectObj.Value.Name}}
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </div>
        </div>
        <div class="heard" v-if="app.sysInfo.StartMoveSelectSubCostomer == '1' && (app.tool.op('CustomerQueryOthers') || app.tool.op('CustomerQuerySub'))">
            <div class="text">包含责任人下属的意向客户</div>
            <div class="campus-name" @click="changeSubItem">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="subItem?'#icon-danxuanxuanzhong1':'#icon-danxuanweixuanzhong1'"></use>
                </svg>
            </div>
        </div>
        <div class="void"></div>
        <div class="list-body" ref="listBody">
            <scroller-super class="scroller"
                            :type="2"
                            :data="list"
                            ref="scroll"
                            :pagingOption="pagingOption"
                            @loadData="loadData">
                <div class="card" v-for="card in list">
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
        <loading class="loading" v-show="isLoading" :bgType='bgType'></loading>
        <div class="bottom" v-if="app.tool.op('CustomerAdd')">
            <router-link tag="div" to="/addCustomer/add" class="bottom-left" >添加客户</router-link>
            <!-- <router-link tag="div" to="/customHadle/all" class="bottom-right" >客户管理操作</router-link> -->
        </div>
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
        <empty-page :type="5" :text="'没有可以操作的客户哦~'" class="empty-page" v-show="!list.length" ref="emptyPage"></empty-page>
        <select-more
            :opened.sync="showSelectMore"
            @selectMore="selectMore">
            
        </select-more>

        <sort-sheet 
            :list="sortArr" 
            :opened.sync="showSelectSortType"
            @clickSort="clickSort" 
            :title="'排序方式'"
            :initType="initType">
        </sort-sheet>

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
        <my-select-campus
            :opened.sync="showMySelectCampus"
            @selectCampusObj="selectCampusObj"
            :campusObj="mySelectObj">
        </my-select-campus>
    </div>
</template>

<script>
    import {queryCustomer, saveData} from 'teacher/api/customers'
    import SelectSortType from './selectSortType'
    import SelectMore from './selectMore'
    import SelectStatusAndCampus from '../customHadle/selectStatusAndCampus'
    import SelectCampus from '../customHadle/selectCampus'
    import {commHandle} from '../commHandle.js'
    import EmptyPage from 'teacher/components/common/empty-page/empty-page'
    import {mapState, mapMutations} from 'vuex'
    import MySelectCampus from '../selectCampus'
    export default {
        mixins: [commHandle],
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
                        sort: 'CreateTime',
                        CampusID: ''
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
                sortArr: [{name: '姓名',sort: 'Name'}, 
                          {name: '录入时间',sort: 'CreateTime'}, 
                          {name: '跟进时间',sort: 'NextDate'}, 
                          {name: '沟通时间',sort: 'LastDate'}
                         ],
                initType: '1-0',
                showSelectMore: false,
                inputText: '',
                
                // isSelectCard: false,
                isAllSelect: false,
                showSelectStatusAndCampus: false,
                showSelectCampus: false,
                campusObj: {},
                showMySelectCampus: false,
                mySelectObj: {},

                subItem: 1 // 香港现代教育添加
            }
        },
        computed: {
            ...mapState(['allParams']),
            /*computeRights() {
                return !(app.tool.op('CustomerQuery') && 
                       !app.tool.op('CustomerFilter') && 
                       !app.tool.op('CustomerViewTel') && 
                       !app.tool.op('CustomerQuerySub') && 
                       !app.tool.op('CustomerAdd'))
            },*/
            computedList() {
                return this.list.filter(obj => obj.isSelect)
            }
        },
        methods: {
            ...mapMutations(['set_allParams', 'set_cunstomInfo']),
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
            /*saveInfo(obj) {
                this.set_cunstomInfo({
                    CustomerStatusName: obj.CustomerStatusName,
                    CustomerStatus: obj.CustomerStatus,
                    WillLevel: obj.WillLevel
                }) 
                this.$router.push({name: 'customDetail', params: {id: obj.ID, name: obj.Name}})
            },*/
            clickSort(obj) {
                let params = {
                    sort: obj.item.sort,
                    desc: obj.desc ? 1 : 0
                }
                this.$refs.scroll.refresh(params)
            },
            changeSubItem() {
                this.isLoading = true
                this.subItem = this.subItem === 0 ? 1 : 0
                this.$refs.scroll.refresh({SubItem: this.subItem})
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
                // this.set_allParams(obj)
            },
            searchCustomer() {
                this.$refs.scroll.refresh({Query: this.inputText})
                // app.ls.set('params', {Query: this.inputText})
            },
            selectCampusObj(obj) {
                this.mySelectObj = obj
                this.showMySelectCampus = false
                this.$refs.scroll.refresh({CampusID: obj.Key})
            }
        },
        created() {
            let itemHeight = 44,
                a = app.sysInfo.SortIntentionLevel == '1',
                b = app.sysInfo.StartMoveSelectSubCostomer == '1' && 
                    (app.tool.op('CustomerQueryOthers') || app.tool.op('CustomerQuerySub'))
            if (a) {
                this.sortArr.push({name: '客户意向级别', sort: 'WillLevel'})
                this.initType = '4-1'
                this.mySelectObj = app.customConfigInfo.CampusList[0]
                this.pagingOption.params.CampusID = this.mySelectObj.Key
                this.pagingOption.params.sort = 'WillLevel'
                this.pagingOption.params.desc = 1
            }
            if (b) {
                this.pagingOption.params.SubItem = this.subItem
            }
            this.$nextTick(() => {
                if (!app.tool.op('CustomerAdd')) {
                    this.$refs.listBody.style.bottom = 0
                    this.$refs.emptyPage.$el.style.bottom = 0
                }
                if ((a && !b) || (!a && b)) {
                    this.$refs.listBody.style.top = `${54 + itemHeight}px`
                    this.$refs.emptyPage.$el.style.top = `${54 + itemHeight}px`
                }
                if (a && b) {
                    this.$refs.listBody.style.top = `${54 + itemHeight * 2}px`
                    this.$refs.emptyPage.$el.style.top = `${54 + itemHeight * 2}px`
                }
                if (!a && !b) {
                    this.$refs.listBody.style.top = `54px`
                    this.$refs.emptyPage.$el.style.top = `54px`
                }
            })
        },
        watch: {
            
        },
        components: {
            SelectSortType,
            SelectMore,
            // CommCard,
            EmptyPage,
            SelectStatusAndCampus,
            SelectCampus,
            MySelectCampus
        }
    }
</script>