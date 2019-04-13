<!-- 优惠券列表界面 -->
<style lang="scss" scoped>
    
    

    .coupon-list-container {
        @include position-absolute;
        background-color: $color-assist-1;
        .header {
            position: absolute !important;
            top: 0;
            left: 0;
            width: 100%;
            text-align: center;
            background-color: $color-white;
            display: flex;
            .header-item-wrap {
                flex: 1;
                .header-item {
                    display: inline-block;
                    height: 40px;
                    line-height: 40px;
                    &.active {
                        color: $color-primary;
                        border-bottom: 2px solid $color-primary;
                    }
                }
            }
        }
        .scroll {
            @include position-absolute(40px, 0, 0, 0);
            padding: 0 15px;
            .void1 {
                height: 15px;
                line-height: 35px;
            }
            .card {
                height: 120px;
                background-color: $color-white;
                position: relative;
                margin-bottom: 16px;
                display: flex;
                border-radius: 5px;
                overflow: hidden;
                .card-left {
                    width: 37%;
                    color: $color-white;
                    background-color: $color-primary;
                    padding: 0 8px;
                    @include flex-center(column);
                    &.active1 {
                        background-color: #C8E1AE;
                    }
                    &.active2 {
                        background-color: #C2CCDC;
                    }
                    .price {
                        font-size: 34px;
                        position: relative;
                        .yuan {
                            font-size: 22px;
                        }
                    }
                    .tag {
                        margin-top: 5px;
                        font-size: 13px;
                        @include ellipsis-multi(2);
                    }
                }
                .card-right {
                    flex: 1;
                    border-left: 1px dashed $color-primary;
                    &.active4 {
                        border-left: 1px dashed #C8E1AE;
                    }
                    &.active5 {
                        border-left: 1px dashed #C2CCDC;
                    }
                    padding: 20px 10px 15px 16px;
                    display: flex;
                    .left {
                        flex: 1;
                        width: 0;
                        position: relative;
                        z-index: 2;
                        @include flex-between;
                        flex-direction: column;
                        text-align: left;
                        .electronic{
                            width: 100%;
                            .icon {
                                width: 40px;
                            }
                        }
                        .title {
                            width: 100%;
                            font-size: 18px;
                            color: $color-3;
                            font-weight: bold;
                            @include ellipsis-multi;
                            &.active3 {
                                color: $color-6;
                            }
                        }
                        .describe{
                            width: 100%;
                            .text1, .time {
                                width: 100%;
                                line-height: 13px;
                                margin-top: 5px;
                                font-size: 11px;
                                color: $color-9;
                            }
                        }
                    }
                    .right {
                        width: 20px;
                        position: relative;
                        z-index: 1;
                        .icon-wrapper {
                            @include position-absolute(false, -15px, -30px, false);
                            font-size: 100px;
                        }
                        .belt-wrapper{
                            position: absolute;
                            transform: rotate(45deg);
                            right: -34px;
                            top: -12px;
                            .belt{
                                width: 80px;
                                font-size: 12px;
                                transform: scale(0.9);
                                height: 16px;
                                line-height: 16px;
                                text-align: center;
                                color: $color-white;
                                &.online{
                                    background-color: #78B8F9;
                                }
                                &.offline{
                                    background-color: #F9C76A;
                                }
                                &.overdue.online{
                                    background-color: #C7E0FB;
                                }
                                &.overdue.offline{
                                    background-color: #FFE6B7;
                                }
                            }
                        }
                    }
                }
                &:before {
                    content: "";
                    position: absolute;
                    top: -10px;
                    left: 37%;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    transform: translatex(-10px);
                    background-color: $color-assist-1;
                }
                &:after {
                    content: "";
                    position: absolute;
                    bottom: -10px;
                    left: 37%;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    transform: translatex(-10px);
                    background-color: $color-assist-1;
                }
            }
            .void {
                height: 1px;
            }
        }
        .noData_temp {
            @include position-absolute(40px, 0, 0, 0);
            background-color: $color-assist-1;
        }
    }
</style>

<template>
    <div class="coupon-list-container">
        <div class="header">
            <div class="header-item-wrap" v-for="(item, index) in headerList">
				<span class="header-item"
                      :class="{active:curIndex==index}"
                      @click="changeType(index)">
                      {{item.name}}{{"("+item.num+")"}}
                </span>
            </div>
        </div>

        <scroller-base :data="renderCoupons" class="scroll">
            <div class="void1">
            </div>
            <!--SaleMode仅区别小丝带  1线下 2线上-->
            <!--EnableMultiple  0不可叠加  1可叠加 （仅线下情况）-->
            <div class="card" v-for="card in renderCoupons">
                <div class="card-left" :class="{active1:curIndex==1,active2:curIndex==2}">
                    <div class="price" ref="cardLeft"><span class="yuan">&yen;</span>{{card.Money}}</div>
                    <div class="tag" v-if="card.Condition">{{`满${card.Condition}元可用`}}</div>
                </div>
                <div class="card-right" :class="{active4:curIndex==1,active5:curIndex==2}">
                    <div class="left">
                        <!--优惠券名称-->
                        <div class="title" :class="{active3:curIndex==1||curIndex==2}" ref="title">{{card.Name}}</div>
                        <div class="electronic" v-if="card.ComeType == 4">
                            <svg class="icon"  aria-hidden="true">
                                <use xlink:href="#icon-dianziqiaquanbiaoqian"></use>
                            </svg>
                        </div>
                        <!--使用范围 有效时间-->
                        <div class="describe">
                            <!--线下描述-->
                            <div class="text1" v-if="card.ComeType==1">
                                <!--不限和指定校区可用两种情况-->
                                {{card.IsAllCampus==1?'':'指定校区可用;'}}
                                {{card.EnableMultiple==1?'可叠加使用。':''}}
                            </div>
                            <!--线上描述-->
                            <div class="text1" v-if="card.ComeType==2">
                                {{card.IsAllCampus==1?'':'指定校区可用;'}}
                                {{card.IsAllGoods==1?'':'指定商品可用;'}}
                                 {{card.isAllSpecialGoods==1?'':'指定特殊课程可用。'}}
                                {{card.IsAllShift==1?'':'指定课程可用。'}}
                            </div>
                            <div class="text1" v-if="card.ComeType==3">
                                {{card.IsAllGoods==1?'':'指定商品可用。'}}
                            </div>
                            <!--有效时间-->
                            <div class="time" v-if='!card.Unlimited'>
                                {{card.StartDateTime|formatDatetime('yyyy.MM.dd')}} - {{card.EndDateTime|formatDatetime('yyyy.MM.dd')}}
                            </div>
                            <!--有效时间-->
                            <div class="time"  v-if='card.Unlimited'>
                                永久有效
                            </div>
                        </div>
                    </div>
                    <!--钢印 限制丝带-->
                    <div class="right">
                        <!--钢印-->
                        <div class="icon-wrapper">
                            <svg class="icon" aria-hidden="true" v-if="curIndex==1">
                                <use xlink:href="#icon-yishiyong"></use>
                            </svg>
                            <svg class="icon" aria-hidden="true" v-if="curIndex==2">
                                <use xlink:href="#icon-yiguoqi"></use>
                            </svg>
                        </div>
                        <!--可用限制 丝带-->
                        <div class="belt-wrapper">
                            <!--线下标签-->
                            <div v-if="card.SaleMode==1" class="belt offline" :class="{'overdue':curIndex!=0}">仅线下</div>
                            <!--线上标签-->
                            <div v-if="card.SaleMode==2" class="belt online" :class="{'overdue':curIndex!=0}">仅线上</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="void"></div>
        </scroller-base>
        <loading class="loading" v-show="isLoading"></loading>
        <empty-page class="noData_temp" :type="14" v-if="headerList[curIndex].num === 0"></empty-page>
    </div>
</template>

<script>
    import EmptyPage from 'parent/components/common/empty-page/empty-page'
    import {processGet} from "parent/api/common";

    export default {
        name: 'coupon-list',
        data() {
            return {
                isLoading: true,
                headerList: [{
                    name: '可使用',
                }, {
                    name: '已使用',
                }, {
                    name: '已过期',
                }],
                list: [], //所有的优惠券
                renderCoupons: [], //渲染的优惠券
                curIndex: 0,
                wxTitle: "优惠券"
            }
        },
        methods: {
            renderPage() {
                if (this.curIndex == 0) {
                    this.renderCoupons = this.list.CanUse;
                } else if (this.curIndex == 1) {
                    this.renderCoupons = this.list.Used;
                } else if (this.curIndex == 2) {
                    this.renderCoupons = this.list.Expired;
                }
                this.setFontSize()
            },
            changeType(index) {
                this.curIndex = index;
            },
            setFontSize() {
                this.$nextTick(() => {
                    this.renderCoupons.forEach((obj, index) => {
                        if (String(obj.Money).length > 5) {
                            this.$refs.cardLeft[index].style.fontSize = '24px'
                        } else {
                            this.$refs.cardLeft[index].style.fontSize = '34px'
                        }
                        if (obj.Name.length > 7) {
                            this.$refs.title[index].style.fontSize = '13px'
                        } else {
                            this.$refs.title[index].style.fontSize = '18px'
                        }
                    })
                })
            },
            setTime(list) {
                if (list instanceof Array) {
                    list.forEach(item => {
                        if (app.filters.formatDatetime(item.EndDateTime, 'yyyy-MM-dd') == '2099-01-01') {
                            item.Unlimited = true;
                        }else {
                            item.Unlimited = false;
                        }
                    })
                }
            }
        },
        created() {
            this.isLoading = true;
            processGet({pname: 'coupon', action: 'query'}).then(res => {
                this.isLoading = false;
                if (res.errcode == app.errok) {
                    this.list = res.data;
                    this.setTime(this.list.CanUse);
                    this.setTime(this.list.Used);
                    this.setTime(this.list.Expired);
                    this.headerList.forEach(obj => {
                        if (obj.name === '可使用') this.$set(obj, 'num', this.list.CanUse.length);
                        if (obj.name === '已使用') this.$set(obj, 'num', this.list.Used.length);
                        if (obj.name === '已过期') this.$set(obj, 'num', this.list.Expired.length);
                    });
                    this.renderPage();
                }
            });
        },
        watch: {
            curIndex(newVal, oldVal) {
                if (newVal === oldVal) {
                    return;
                }
                this.renderPage();
            }
        },
        components: {
            EmptyPage
        }
    }
</script>