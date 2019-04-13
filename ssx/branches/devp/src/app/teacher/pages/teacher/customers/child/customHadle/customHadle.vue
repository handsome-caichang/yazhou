<style scoped lang="scss">
    
    
    .container {
        // background-color: $color-assist-1;
        width: 100%;
        .heard {
            padding: 0 12px;
            height: 44px;
            line-height: 44px;
            font-size: 14px;
            color: $color-6;
            .spec {
                font-size: 16px;
            }
        }
        .void {
            height: 10px;
            background-color: $color-assist-1;
        }
        .check {
            font-size: 18px;
        }
        .list-body {
            @include position-absolute(54px, 0, 49px, 0);
            .scroller {
                overflow: hidden;
                background-color: $color-white;
                @include position-absolute;
                .card {
                    border-bottom: 10px solid $color-assist-1;
                    .card-heard {
                        padding: 0 12px;
                        height: 44px;
                        line-height: 44px;
                        font-size: 16px;
                        color: $color-3;
                        border-bottom: 1px solid $color-assist-1;
                        .check {
                            padding-right: 13px;
                        }
                    }
                    .card-body {
                        padding: 0 12px 12px 42px;
                        .item {
                            font-size: 12px;
                            margin-top: 12px;
                            color: $color-6;
                            .item-content {
                                color: $color-3;
                            }
                        }
                    }
                }
            }
        }
        .bottom {
            @include position-absolute(false, 0, 0, 0);
            height: 49px;
            @include flex-between;
            padding: 12px;
            border-top: 1px solid $color-assist-1;
            .bottom-item {
                height: 28px;
                // line-height: 28px;
                @include flex-between;
                color: $color-9;
                font-size: 13px;
                border-radius: 14px;
                border: 1px solid $color-9;
                padding: 10px;
            }
            .active {
                border: 1px solid $color-3;
                color: $color-3;
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
        <div class="heard" @click="allSelect">
            <span class="spec">
                <svg class="icon check" aria-hidden="true">
                    <use :xlink:href="isAllSelect?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
                </svg>
            </span>
            全选
        </div>
        <div class="void"></div>
        <div class="list-body">
            <scroller-super class="scroller"
                            :type="2"
                            :data="list"
                            ref="scroll"
                            :pagingOption="pagingOption"
                            @loadData="loadData">
                <div>
                    <div class="card" v-for="card in list">
                        <div class="card-heard" @click="selectCard(card)">
                            <svg class="icon check" aria-hidden="true">
                                <use :xlink:href="card.isSelect?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
                            </svg>{{card.Name}}
                            <svg class="icon" aria-hidden="true" v-if="card.Sex>0">
                                <use :xlink:href="card.Sex==1?'#icon-nan':'#icon-nv'"></use>
                            </svg>
                        </div>
                        <div class="card-body">
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
                    </div>
                </div>
            </scroller-super>
        </div>
        <div class="bottom">
            <div class="bottom-item" :class="{'active':isSelectCard}" @click="handleCustomer('del')">删除</div>
            <div class="bottom-item" :class="{'active':isSelectCard}" @click="changeCustomToFormal">转为正式学员</div>
            <div class="bottom-item" :class="{'active':isSelectCard}" @click="handleCustomer('cancle')">取消转化</div>
            <div class="bottom-item" :class="{'active':isSelectCard}" @click="revise">修改</div>
        </div>
        <select-campus
            :opened.sync="showSelectCampus"
            :campusObj="campusObj"
            @selectCampusOver="selectCampusOver"
            @selectCampus="selectCampus">
        </select-campus>
        <select-status-and-campus
            :opened.sync="showSelectStatusAndCampus"
            @selectObj="selectObj">
            
        </select-status-and-campus>
        <loading class="loading" v-show="isLoading" :bgType='bgType'></loading>
        <empty-page :type="5" :text="'没有可以操作的客户哦~'" class="empty-page" v-if="!list.length"></empty-page>
    </div>
</template>

<script>
    import SelectCampus from './selectCampus'
    import SelectStatusAndCampus from './selectStatusAndCampus'
    import EmptyPage from 'teacher/components/common/empty-page/empty-page'
    import {queryCustomer} from 'teacher/api/customers'
    import {mapState, mapMutations} from 'vuex'
    import {saveData} from 'teacher/api/customers'
    export default {
        data() {
            return {
                wxTitle: "意向客户管理",
                list: [],
                pagingOption: {
                    api: queryCustomer,
                    params: {
                        pname:"querycustomer",
                        CreateTime1: '',
                        CreateTime2: '',
                        Query: app.ls.get('params') ? app.ls.get('params').Query : ''
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
                isAllSelect: false,
                showSelectCampus: false,
                showSelectStatusAndCampus: false,
                campusObj: {},
                isLoading: true,
                bgType: 0
            }
        },
        computed: {
            ...mapState(['allParams','todayParams']),
            isSelectCard() {
                let arr = this.list.filter(obj => obj.isSelect)
                return arr.length > 0 ? true : false
            }
        },  
        methods: {
            ...Vuex.mapMutations(['set_cunstomInfo']),
            selectCampus(obj) {
                this.campusObj = obj
            },
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
            allSelect() {
                this.isAllSelect = !this.isAllSelect
                this.list.forEach(obj => {
                    obj.isSelect = this.isAllSelect ? true : false
                })
            },
            selectCard(obj) {
                obj.isSelect = !obj.isSelect
                if (this.isAllSelect) this.isAllSelect = obj.isSelect ? this.isAllSelect : false
                if (!this.isAllSelect) {
                    let flag = true
                    for (let i = 0; i < this.list.length; i++) {
                        if(!this.list[i].isSelect) {
                            flag = false
                            break
                        }
                    }
                    this.isAllSelect = flag
                }
            },
            checkCustomersIsVisit() {
                let arr = this.list.filter(obj => obj.isSelect).map(obj => obj.IsVisit)
                if (arr.length && arr.indexOf(0) > -1) {
                    return true
                } else {
                    return false
                }
            },
            getCustomId() {
                return this.list.filter(obj => obj.isSelect).map(obj => obj.ID).join()
            },
            handleCustomer(string) {
                if (!this.isSelectCard) return
                if (string == 'del' && !app.tool.op('CustomerDelete')) {
                    // app.toast('info','权限不足','未授权。此操作需要以下权限：招生管理－意向客户管理－删除客户')
                    app.dialog('alert', {
                        title: '权限不足',
                        text: '未授权。此操作需要以下权限：招生管理－意向客户管理－删除客户',
                        btn: {
                            text: '我知道了',
                            style: {
                                fontSize: '15px',
                                color: '#1E88F5',
                            }
                        },
                        clickMask2close: true
                    })
                    return
                }
                if (string == 'cancle' && !app.tool.op('CustomerCancelSuccess')) {
                    app.dialog('alert', {
                        title: '权限不足',
                        text: '未授权。此操作需要以下权限：招生管理－意向客户管理－取消转为正式学员',
                        btn: {
                            text: '我知道了',
                            style: {
                                fontSize: '15px',
                                color: '#1E88F5',
                            }
                        },
                        clickMask2close: true
                    })
                    return
                }
                
                let arr = [],
                    str = this.getCustomId(),
                    saveFlag = string === 'del' ? 'deletecustomer' : 'disrelationtrystudent',
                    obj = {
                        text: string === 'del' ? '是否删除意向客户' : '是否撤销转化选中学员',
                        textStyle: {
                            textAlign: 'center'
                        }
                    },
                    text = string === 'del' ? 'id' : 'customerids',
                    params = {
                        saveFlag: saveFlag,
                    }
                app.confirm(obj).then(res => {
                    if (res) {
                        params[text] = str
                        saveData(params).then(res => {
                            if (res.errcode === app.errok) {
                                app.toast('success', '提交成功。')
                                this.$refs.scroll.refresh()
                            } else {
                                app.toast('info', res.errmsg)
                            }
                        })
                    }
                })
            },
            changeCustomToFormal() {
                if (!this.isSelectCard) return
                if (!app.tool.op('CustomerSetSuccess')) {
                    app.dialog('alert', {
                        title: '权限不足',
                        text: '未授权。此操作需要以下权限：招生管理－意向客户管理－转为正式学员',
                        btn: {
                            text: '我知道了',
                            style: {
                                fontSize: '15px',
                                color: '#1E88F5',
                            }
                        },
                        clickMask2close: true
                    })
                    return
                }
                if (app.sysInfo.CustomerCheckVisit === '1' && this.checkCustomersIsVisit()) {
                    app.toast('info', '学员未到访，不允许转化')
                    return
                }
                this.showSelectCampus = true
            },
            revise() {
                if (!this.isSelectCard) return
                if (!app.tool.op('CustomerEdit')) {
                    app.dialog('alert', {
                        title: '权限不足',
                        text: '未授权。此操作需要以下权限：招生管理－意向客户管理－修改客户信息（不含电话、来源渠道和自定义字段）',
                        btn: {
                            text: '我知道了',
                            style: {
                                fontSize: '15px',
                                color: '#1E88F5',
                            }
                        },
                        clickMask2close: true
                    })
                    return
                }
                this.showSelectStatusAndCampus = true
            },
            selectCampusOver() {
                let str = this.getCustomId()
                saveData({
                    saveFlag: 'trynewstudent',
                    campusID: this.campusObj.Key,
                    customerids: str
                }).then(res => {
                    if (res.errcode === app.errok) {
                        app.toast('success', '转化成功。')
                        this.$refs.scroll.refresh()
                    } else {
                        app.toast('error', res.errmsg)
                    }
                })
            },
            selectObj(obj) {
                let str = this.getCustomId(),
                    saveFlag = obj.type === 'status' ? 'putcustomerstatus' : 'putcustomercampus',
                    params = {
                        saveFlag: saveFlag,
                        customers: str
                    }
                if (obj.type === 'status') {
                    params['status'] = obj.selectObj.ID
                } else {
                    params['campus'] = obj.selectObj.Key
                }
                saveData(params).then(res => {
                    if (res.errcode === app.errok) {
                        app.toast('success', '修改成功')
                        this.$refs.scroll.refresh()
                    } else {
                        app.toast('error', res.errmsg)
                    }
                    this.showSelectStatusAndCampus = false
                })
            }

        },
        created() {
            if (this.$route.params.type === 'today') {
                let date = new Date(), str = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                this.$set(this.pagingOption.params, 'CreateTime1', str)
                this.$set(this.pagingOption.params, 'CreateTime2', str)
                this.$set(this.pagingOption.params, 'Status', this.todayParams.ID)
            }
            if (this.$route.params.type === 'all') {
                this.$set(this.pagingOption, 'params', {
                    desc: 1,
                    pname:"querycustomer",
                    Query: this.allParams.inputText,
                    Status: this.allParams.Status,
                    CreateTime1: this.allParams.CreateTime1,
                    CreateTime2: this.allParams.CreateTime2,
                    LastDate1: this.allParams.LastDate1,
                    LastDate2: this.allParams.LastDate2,
                    NextDate1: this.allParams.NextDate1,
                    NextDate2: this.allParams.NextDate2,
                    employeeid: this.allParams.employeeid,
                    employeename: this.allParams.employeename
                })
            }
        },
        destroyed() {
            app.ls.clear('params')
        },
        components: {
            SelectCampus,
            SelectStatusAndCampus,
            EmptyPage
        }
    }
</script>