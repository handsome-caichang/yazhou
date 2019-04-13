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
                    }
                    .card-body {
                        padding: 0 12px 12px 32px;
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
    }
</style>

<template>
    <div class="container">
        <div class="heard" @click="allSelect">
            <span class="spec">
                <svg class="icon" aria-hidden="true">
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
                            :pagingOption="pagingOption"
                            @loadData="loadData">
                <div>
                    <div class="card" v-for="card in list">
                        <div class="card-heard" @click="selectCard(card)">
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="card.isSelect?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
                            </svg>
                            {{card.Name}}
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-laoshifabu"></use>
                            </svg>
                        </div>
                        <div class="card-body">
                            <div class="item">主责任人:&nbsp&nbsp<span class="item-content">{{card.SalePersonName}}</span></div>
                            <div class="item">手机号码:&nbsp&nbsp<span class="item-content">{{card.SMSTel}}</span></div>
                            <div class="item">客户状态:&nbsp&nbsp<span class="item-content">{{card.CustomerStatusName}}</span></div>
                            <div class="item">意向级别:&nbsp&nbsp
                                <span class="item-content">
                                    <svg class="icon" aria-hidden="true" v-for="i in card.WillLevel">
                                        <use xlink:href="#icon-xingxingxuanzhong"></use>
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
    </div>
</template>

<script>
    import SelectCampus from './selectCampus'
    import SelectStatusAndCampus from './selectStatusAndCampus'
    import {queryCustomer} from 'teacher/api/customers'
    import {saveData} from 'teacher/api/customers'
    export default {
        data() {
            return {
                list: [],
                pagingOption: {
                    api: queryCustomer,
                    params: {
                        pname:"querycustomer",
                        // CreateTime1: '2018-02-23'
                    }
                },
                isAllSelect: false,
                showSelectCampus: false,
                showSelectStatusAndCampus: false,
                campusObj: {},

            }
        },
        computed: {
            isSelectCard() {
                let arr = this.list.filter(obj => {
                    return obj.isSelect
                })
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
                    // this.isLoading = false
                    if (res.errcode == app.errok) {
                        if (res.pageIndex === 1) {
                            this.list = []
                        }
                        res.data.forEach(obj => {
                            this.$set(obj, 'isSelect', false)
                        })
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
            },
            getCustomId() {
                let arr = [], str = ''
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].isSelect) {
                        arr.push(this.list[i].ID)
                    }
                }
                str = arr.join(',')
                return str
            },
            handleCustomer(string) {
                if (!this.isSelectCard) return
                let arr = [],
                    str = this.getCustomId(),
                    saveFlag = string === 'del' ? 'deletecustomer' : 'disrelationtrystudent',
                    obj = {
                        text: string === 'del' ? '是否删除意向客户' : '是否撤销转化中学员',
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
                                alert('删除成功')
                            }
                        })
                    }
                })
            },
            changeCustomToFormal() {
                if (!this.isSelectCard) return
                this.showSelectCampus = true
            },
            revise() {
                if (!this.isSelectCard) return
                this.showSelectStatusAndCampus = true
            },
            selectCampusOver() {
                let str = this.getCustomId()
                saveData({
                    saveFlag: 'trynewstudent',
                    campusID: this.campusObj.Key,
                    customerids: str
                }).then(res => {
                    if (res.ErrorCode === app.errok) {
                        app.toast('info', '转化成功。')
                    } else {
                        app.toast('info', res.ErrorMsg)
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
                    if (res.ErrorCode === app.errok) {
                        app.toast('info', '转化成功。')
                    } else {
                        app.toast('info', res.ErrorMsg)
                    }
                    this.showSelectStatusAndCampus = false
                })
            }

         },
        components: {
            SelectCampus,
            SelectStatusAndCampus
        }
    }
</script>