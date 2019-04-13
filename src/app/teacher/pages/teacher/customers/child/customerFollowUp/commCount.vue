<style scoped lang="scss">
    
    
      .scroller {
        @include position-absolute(49px, 0, 0, 0);
        .heard-mid {
            background-color: $color-white;
            padding: 0 12px;
            height: 44px;
            border-bottom: 1px solid $color-assist-1;
            @include flex-between;
            .mid-left {
                flex: 1;
            }
            .mid-right {
                width: 80px;
                font-size: 12px;
                color: $color-6;
            }
            .icon {
                font-size: 14px;
            }
        }
        .heard-bottom {
            background-color: $color-white;
            padding: 0 12px;
            height: 44px;
            line-height: 44px;
            font-size: 15px;
            display: flex;
            border-bottom: 1px solid $color-assist-1;
            .heard-bottom-left {
                width: 90px;
                font-size: 15px;
                color: $color-6;
            }
            .heard-bottom-mid {
                padding-left: 10px;
                flex: 1;
                text-align: right;
                @include ellipsis-single;
                color: $color-3;
            }
            .heard-bottom-right {
                width: 20px;
                text-align: right;
            }
        }
        .item-wrapper {
            .item {
                background-color: $color-white;
                .item-top {
                    padding: 0 12px;
                    height: 44px;
                    @include flex-between;
                    border-bottom: 1px solid $color-assist-1;
                    .top-left {
                        flex: 1;
                        .name {
                            font-size: 16px;
                            color: $color-3;
                        }
                        .number {
                            font-size: 12px;
                            color: #8B572A;
                        }
                    }
                    .top-right {
                        flex: 1;
                        color: $color-primary;
                        text-align: right;
                    }
                }
                .item-body {
                    padding: 0 12px 12px 12px;
                    .body-li {
                        display: flex;
                        margin-top: 12px;
                        .body-li-left, .body-li-right {
                            flex: 1;
                            font-size: 12px;
                            color: $color-6;
                            .spec {
                                color: $color-3;
                            }
                        }
                        .body-li-right {
                            text-align: right;
                        }
                    }
                    .body-li1 {
                        margin-top: 12px;
                        font-size: 12px;
                        color: $color-6;
                        .spec {
                            color: $color-3;
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
             <div class="heard-mid">
                <div class="mid-left">
                    <date-bar
                            :sdate='dateObj.sdate'
                            :edate='dateObj.edate'
                            :index="quickDateIndex"
                            @changeDate="changeDate">
                    </date-bar>
                </div>
                <div class="mid-right" @click="changeOthers">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="othersNum==1?'#icon-duoxuan-weixuanze':'#icon-duoxuan'"></use>
                    </svg>
                    主负责人
                </div>
            </div>
            <div class="heard-bottom">
                <div class="heard-bottom-left">
                    选择{{app.sysInfo.Title_Campus}}
                </div>
                <div class="heard-bottom-mid" @click="emit">
                    {{campusObj.Value&&campusObj.Value.Name}}
                </div>
                <div class="heard-bottom-right" @click="emit">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item-wrapper">
                <div class="item"  v-for="item in list">
                    <div class="item-top">
                        <div class="top-left">
                            <span class="name">{{item.Name}}</span>
                            <span class="number">{{item.Serial}}</span>
                        </div>
                        <div class="top-right">
                            完成率:&nbsp&nbsp{{completionRate(item)}}
                        </div>
                    </div>
                    <div class="item-body">
                        <div class="body-li">
                            <div class="body-li-left">
                                意向客户：<span class="spec">{{item.IsFollowNum}}人</span>
                            </div>
                            <div class="body-li-right">
                                新增客户: <span class="spec">{{item.NewCustomerNum}}人</span>
                            </div>
                        </div>
                        <div class="body-li">
                            <div class="body-li-left">
                                拟沟通：<span class="spec">{{item.QuasiCommunication}}人</span>
                            </div>
                            <div class="body-li-right">
                                已经沟通: <span class="spec">{{item.HasCommunication}}人</span>
                            </div>
                        </div>
                        <div class="body-li">
                            <div class="body-li-left">
                                有效沟通：<span class="spec">{{item.IsValidCount}}次</span>
                            </div>
                            <div class="body-li-right">
                                无效沟通: <span class="spec">{{item.NoValidCount}}次</span>
                            </div>
                        </div>
                    </div>
                    <div class="void"></div>
                </div>
            </div>
            <loading class="loading" v-show="isLoading" :bgType='bgType'></loading>
    </scroller-super>
</template>

<script>
    import {getCustomers} from 'teacher/api/customers'
    export default {
        props: {
            campusObj: {
                type: Object
            }
        },

        data() {
            return {
                isLoading: true,
                bgType: 0,
                list: [],
                dateObj:{
                    sdate:app.tool.getDatesByIndex(3, app.localTimeToServer).sdate,
                    edate:app.tool.getDatesByIndex(0, app.localTimeToServer).sdate
                },
                quickDateIndex: 3,
                pagingOption: {
                    api: getCustomers,
                    params: {
                        pname: 'querycommunreport',
                        campusID: this.campusObj.Key,
                        sdate: app.tool.getDatesByIndex(3, app.localTimeToServer).sdate,
                        edate: app.tool.getDatesByIndex(0, app.localTimeToServer).sdate,
                        others: this.othersNum
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
                othersNum: 0
            }
        },
        methods: {
            changeDate(obj){
                this.dateObj.sdate = obj.sdate;
                this.dateObj.edate = obj.edate;
                this.quickDateIndex = obj.index;
                this.$refs.scroll.refresh({
                    sdate: obj.sdate,
                    edate: obj.edate
                })
            },
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
            changeOthers() {
                this.othersNum = this.othersNum == 1 ? 0 : 1
                this.$refs.scroll.refresh({others: this.othersNum})
            },
            emit() {
                this.$emit('openSelectCamp')
            },
            completionRate(obj) {
                return obj.QuasiCommunication == 0 ? '0.00%' : (obj.HasCommunication/obj.QuasiCommunication*100).toFixed(2) + '%'
            }
        
        },
        watch: {
            campusObj(val) {
                if (val) {
                    this.$refs.scroll.refresh({campusID: val.Key})
                }
            }
        }
    }
</script>