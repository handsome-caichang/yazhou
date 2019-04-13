<style lang="scss" scoped>    
    .scroll {
        .top {
            height: 49px;
            border-bottom: 1px solid $color-assist-1;
            padding: 15px;
            display: flex;
            .top-left, .top-right {
                width: 60px;
                height: 30px;
            }
            .top-mid {
                flex: 1;
                font-size: 15px;
                color: $color-3;
                text-align: center;
            }
            .top-right {
                text-align: right;
            }
            .active {
                color: #eee;
            }
        }
        .scend {
            padding: 15px 15px 0 15px;
            .date-wrapper {
                height: 42px;
                font-size: 12px;
                @include flex-between;
                .date {
                    color: $color-6;
                    .spec {
                        color: $color-3;
                    }
                }
            }
            .info {
                height: 90px;
                border: 1px solid $color-assist-1;
                border-radius: 3px;
                display: flex;
                .money-wrapper {
                    width: 55%;
                    border-right: 1px solid $color-assist-1;
                    padding: 20px;
                    .title {
                        font-size: 13px;
                        color: $color-6;
                    }
                    .spec {
                        margin-top: 5px;
                        font-size: 32px;
                        color: $color-primary;
                    }
                }
                .num-wrapper {
                    flex: 1;
                    padding: 20px;
                    .spec {
                        font-size: 32px;
                        color: $color-3;
                    }
                    .spec1 {
                        font-size: 15px;
                        color: $color-6;
                    }
                }
            }
        }
        .record {
            .record-top {
                padding: 0 15px;
                height: 49px;
                line-height: 49px;
                border-bottom: 1px solid $color-assist-1;
                font-size: 15px;
                color: $color-3;
            }
            .record-content {
                .content-wrapper {
                        padding: 0 15px 0 22px;
                    .content-item {
                        padding-left: 15px;
                        height: 55px;
                        position: relative;
                        @include flex-between;
                        border-left: 2px solid $color-assist-1;
                        .icon-wrapper {
                            width: 14px;
                            height: 14px;
                            @include position-absolute(20px, false, false, -8px);
                        }
                        .icon-wrapper2 {
                            width: 20px;
                            height: 55px;
                            line-height: 55px;
                            text-align: right;
                        }
                    }
                }
                .litter-item {
                    padding: 0 15px;
                    background-color: $color-assist-1;
                    padding-left: 15px;
                    height: 55px;
                    line-height: 55px;
                    border-left: 2px solid $color-assist-1;
                    @include flex-between;
                }
                .date {
                    width: 30px;
                    height: 15px;
                    font-size: 13px;
                    color: $color-3;
                }
                .spc-width {
                    width: 70px;
                }
                .time {
                    width: 35px;
                    font-size: 13px;
                    color: $color-9; 
                }
                .name {
                    margin-left: 20px;
                    flex: 1;
                    font-size: 14px;
                    color: $color-3;
                    // text-align: right;
                }
                .money {
                    color: #7ACE4C;
                }
                .icon {
                    color: $color-9;
                }
                .no-list {
                    @include position-absolute(203px, 0, 10px, 0);
                    // border-top: 1px solid $color-assist-1;
                    background-color: $color-white;
                    text-align: center;
                    padding-top: 20px;
                    color: $color-9;
                }
            }
        }
        .void {
            height: 10px;
            background-color: $color-assist-1;
            @include position-absolute(false, 0, 0, 0);
        }
    }
</style>

<template>
    <scroller-base class="scroll" :data="scrollData">
        <div class="top">
            <div class="top-left" @click="changeDate(-1)">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pre"></use>
                </svg>
            </div>
            <div class="top-mid">{{nowDateStr}}</div>
            <div class="top-right" @click="changeDate(1)" :class="{'active': active}">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-next"></use>
                </svg>
            </div>
        </div>
        <div class="scend">
            <div class="info">
                <div class="money-wrapper">
                    <div class="title">金额</div>
                    <div class="spec">{{totalMoney.toFixed(2)}}</div>
                </div>
                <div class="num-wrapper">
                    <div class="title">人次数</div>
                    <div class="spec">{{totalCount}}</div>
                </div>
            </div>
        </div>
        <div class="record">
            <div class="record-top">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yejijiluicon"></use>
                </svg>
                业绩记录
            </div>
            <div class="record-content">
                <div  v-for="(item, index) in list">
                    <div class="content-wrapper">
                        <div class="content-item">
                            <div class="icon-wrapper">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-dian"></use>
                                </svg>
                            </div>
                            <div class="date">{{item.Date | formatDatetime("MM.dd")}}</div>
                            <div class="name">
                                合计金额
                                <span class="money">￥{{item.TotalMoney.toFixed(2)}}</span>，
                                <span class="item-count">{{item.TotalCount}}人次</span>
                            </div>
                            <div class="icon-wrapper2" @click="pullDown(item)">
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="item.isPullDown?'#icon-xiangxia2':'#icon-xiangshang'"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div v-if="item.isPullDown">
                        <router-link    tag="div" 
                                        class="litter-item" 
                                        v-for="(i, num) in item.DaySaleDetailList" 
                                        @click="goDetail"
                                        :key="num"
                                        :to="{path:`/achievementDetail/${i.OrderId}`}">
                            <div class="date spc-width"></div>
                            <div class="time">{{i.Time | formatDatetime("hh:mm")}}</div>
                            <div class="name">{{i.Name}} 消费<span class="money">￥{{i.Money.toFixed(2)}}</span></div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-next"></use>
                            </svg>
                        </router-link>
                    </div>
                </div>
                <div class="no-list" v-if="!list.length">
                    暂无业绩记录~
                </div>
            </div>
        </div>
        <div class="void"></div>
    </scroller-base>

</template>

<script>
    import {getSaleReport} from 'api/yy'
    export default {
        mixins: [app.mixin.shareMixin],
        data() {
            return {
                wxTitle: "我的业绩",
                nowYear: new Date().getFullYear(),
                nowMonth: new Date().getMonth() + 1,
                totalCount: 0,
                totalMoney: 0,
                list: [],
                scrollData: 0
            }
        },
        computed: {
            nowDateStr() {
                return this.nowYear + '年' + this.nowMonth + '月'
            },
            active() {
                return this.nowYear === new Date().getFullYear() && this.nowMonth === (new Date().getMonth() + 1)
            }
        },
        methods: {
            goDetail() {
                this.$router.push({path: 'achievementDetail'})
            },
            changeDate(num) {
                if (this.nowYear === new Date().getFullYear() && this.nowMonth === (new Date().getMonth() + 1) && num > 0) return
                this.nowMonth = this.nowMonth + num
                if (this.nowMonth > 12) {
                    this.nowMonth = 1
                    this.nowYear ++
                }
                if (this.nowMonth < 1) {
                    this.nowMonth = 12
                    this.nowYear --
                }
                this.getData(this.nowYear, this.nowMonth)
            },
            getData(year = this.nowYear, month = this.nowMonth) {
                let params = {
                    year: year,
                    month: month
                }
                getSaleReport(params).then(res => {
                    if (res.ErrorCode === app.errok) {
                        this.list = res.Data.DaySaleList
                        this.totalCount = res.Data.TotalCount
                        this.totalMoney = res.Data.TotalMoney
                        this.scrollData ++ 
                        this.list.forEach(obj => {
                            this.$set(obj, 'isPullDown', false)
                        })
                    }
                })
            },
            pullDown(obj) {
                obj.isPullDown = !obj.isPullDown
                this.scrollData ++
            }
        },
        created() {
            this.getData()
        }
    }
</script>