<style scoped lang="scss">
    
    
    .container {
        width: 100%;
        .heard {
            background-color: $color-white;
            padding: 8px 12px;
            margin-bottom: 10px;
            height: 44px;
            line-height: 28px;
            @include flex-between;
            @include border-bottom;
            .date-filter {
                display: flex;
                .date-btn {
                    width: 112px;
                    font-size: 12px;
                    text-align: center;
                    border-radius: 50px;
                    border: 1px solid $color-assist-1;
                }
            }
            .date-search {
                width: 48px;
                text-align: center;
                border-radius: 50px;
                background-color: $color-assist-1;
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
                    padding: 15px 12px 0 12px;
                    background-color: $color-white;
                    border-bottom: 5px solid $color-assist-1;
                    .card-heard {
                        display: flex;
                        .heard-left {
                            flex: 1;
                            display: flex;
                            .icon {
                                height: 40px;
                                width: 40px;
                                background-color: $color-assist-1;
                                border-radius: 50%;
                                margin-right: 8px;
                                @include background-img(false, cover);
                            }
                            .name {
                                font-size: 16px;
                                color: $color-3;
                            }
                            .info {
                                font-size: 12px;
                                color: $color-6;
                                .today {
                                    color: $color-primary;
                                }
                            }
                        }
                        .heard-right {
                            width: 80px;
                            text-align: right;
                            font-size: 12px;
                            color: #8b572a;
                        }
                    }
                    .card-body {
                        padding-left: 50px;
                        margin-top: 8px;
                        .body-content {
                            word-break: break-word;
                            font-size: 15px;
                            color: $color-3;
                            margin-bottom: 12px;
                        }
                        .body-info {
                            font-size: 12px;
                            color: $color-6;
                            margin-bottom: 8px;
                            position: relative;
                            .spec {
                                position: absolute;
                                right: 0;
                                color: $color-primary;
                            }
                        }
                    }
                    .card-bottom {
                        border-top: 1px solid $color-assist-1;
                        padding-left: 50px;
                        height: 44px;
                        line-height: 44px;
                        display: flex;
                        font-size: 12px;
                        color: $color-6;
                        .bottom-left {
                            width: 60px;
                        }
                        .bottom-right {
                            flex: 1;
                            text-align: right;
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
            <div class="date-filter">
                <date-bar
                        :sdate='dateObj.sdate'
                        :edate='dateObj.edate'
                        :index="quickDateIndex"
                        @changeDate="changeDate">
                </date-bar>
            </div>
        </div>
        <div class="void"></div>
        <div class="list-body">
            <scroller-super class="scroller"
                            ref="communicationListScroll"
                            :type="2"
                            :data="scrollData"
                            :pagingOption="pagingOption"
                            @loadData="loadData">
                <div>
                    <div class="card" v-for="(card,index) in list">
                        <div class="card-heard">
                            <div class="heard-left">
                                <div class="icon" :style="'background-image:url('+card.Photo+')'"></div>
                                <div>
                                    <div class="name">{{card.UserName}}</div>
                                    <div class="info">
                                        <span class="today" v-if="isShowToday(card.CreateTime)">今天</span>
                                        <span class="day" v-if="!isShowToday(card.CreateTime)">{{card.CreateTime}}</span>
                                        <!-- <span class="time">13:38:29</span> -->
                                        <span class="some">{{card.Mode}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="heard-right">无效沟通
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-xingxingxuanzhong"></use>
                                </svg>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="body-content">{{card.Content.length>80?card.longContent:card.Content}}</div>
                            <div class="body-info">
                                下次跟进：{{card.NextDate}}&nbsp{{card.NextMode}}
                                <span class="spec" v-if="isShowAll(card.Content)" @click="changeContent(card,index)">{{card.longContentFlag?'全文':'收起'}}</span>
                            </div>
                            <div class="body-info">
                                到访日期：2091-2-2
                            </div>
                        </div>
                        <div class="card-bottom" v-if="false">
                            <div class="bottom-left">承若到访</div>
                            <div class="bottom-right">2017-01-02&nbsp10:39
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-youjiantou"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </scroller-super>
        </div>
        <router-link tag="div" :to="`/addCommunication/${$route.params.id}`" class="bottom">添加沟通记录</router-link>
    </div>
</template>

<script>
    import {queryCustomer} from 'teacher/api/customers'
    export default {
        data() {
            return {
                list: [],
                scrollNum: 0,
                longContentFlag: [],
                pagingOption: {
                    api: queryCustomer,
                    params: {
                        pname:"querycommunication",
                        // customerID: this.$route.params.id,
                        // sdate: '',
                        // edate: ''
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
                dateObj:{
                    sdate:'2017-12-26',
                    edate:'2017-12-26'
                },
                quickDateIndex:-1,
            }
        },
        methods: {
            isShowToday(time) {
                if (!time) {
                    return false
                } else {
                    let nowYear = new Date().getFullYear(),
                        nowMonth = new Date().getMonth(),
                        nowDay = new Date().getDay(),
                        giveYear = new Date(time).getFullYear(),
                        giveMonth = new Date(time).getFullYear(),
                        giveDate = new Date(time).getFullYear()
                    if (giveYear === nowYear && giveMonth === nowMonth && giveDate === nowDay) {
                        return true
                    } else {
                        return false
                    }
                }
            },
            isShowAll(str) {
                return str.length > 80 ? true : false
            },
            changeContent(obj, index) {
                this.scrollNum ++
                obj.longContentFlag = !obj.longContentFlag
                if (!obj.longContentFlag) {
                    obj.longContent = obj.Content
                } else {
                    obj.longContent = obj.Content.substr(0, 80) + '...'
                }
            },
            loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    // this.isLoading = false
                    if (res.errcode == app.errok) {
                        if (res.pageIndex === 1) {
                            this.list = []
                        }
                        res.data.forEach((obj, index) => {
                            if (obj.Content.length > 80) {
                                this.$set(obj, 'longContentFlag', true)
                                obj['longContent'] = obj.Content.substr(0, 80) + '...'
                            }
                        })
                        this.list = this.list.concat(res.data)
                    }
                })
            },
            changeDate(obj){
                this.dateObj.sdate = obj.sdate;
                this.dateObj.edate = obj.edate;
                this.quickDateIndex = obj.index;
                this.isLoading = true;
                this.$refs.communicationListScroll.refresh(this.dateObj);
            },
        },
        computed: {
            scrollData() {
                return {
                    list: this.list,
                    scrollNum: this.scrollNum
                }
            }
        }
    }
</script>