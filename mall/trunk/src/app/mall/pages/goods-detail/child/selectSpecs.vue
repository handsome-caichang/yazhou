<style lang="scss" scoped>
    .action-sheet {
        @include position-absolute;
        .heard{
            padding: $fs-normal-x;
            display: flex;
            // justify-content: space-between;
            // @include border-bottom;
            .heard-left {
                width: 145px;
                .avatar{
                    width: 100%;
                    height: 0;
                    padding-top: 75%;
                    @include background-img(false, cover);
                    background-color: $color-assist-1;
                }
            }
            .heard-right{   
                width: 61%;
                position: relative;
                .close{
                    position: absolute;
                    display: inline-block;
                    top: 3px;
                    right: 0;
                    font-size: 20px;
                    border: 1px solid $color-9;
                    border-radius: 100%;
                    text-align: center;
                    line-height: 20px;
                }
                .right-bottom{
                    padding-left: $fs-normal-x;
                    @include position-absolute(false, 0, 0, 0);
                    .price-wrapper {
                        @include flex-between;
                        height: 20px;
                        margin-bottom: 10px;
                        justify-content: flex-start;
                        .price{
                            height: 20px;
                            font-size: 20px;
                            color: #E93A0E;
                            margin-right: 10px;
                        }
                        .text, .num {
                            display: inline-block;
                            height: 15px;
                            line-height: 15px;
                            text-align: center;
                            font-size: 10px;
                            border: 1px solid #F03232;
                        }
                        .text {
                            width: 27px;
                            background-color: #F03232;
                            color: $color-white;
                        }
                        .num {
                            color: #F03232;
                        }
                    }
                    .old-price {
                        font-size: 10px;
                        color: $color-9;
                        text-decoration: line-through;
                    }
                }
            }       
        }
        .course{
            .select-goods{
                padding: 20px $fs-big 20px 20px;
                @include border-bottom;
                .select-goods-heard{
                    font-size: $fs-small-x;
                    color: $color-9;
                    margin-bottom: 5px;
                }
                .num-content {
                    display: flex;
                    flex-wrap: wrap;
                    .item {
                        margin-bottom: 10px;
                        display: inline-block;
                        height: 30px;
                        line-height: 30px;
                        border: 1px solid $color-assist-1;
                        font-size: $fs-normal;
                        text-align: center;
                        margin-right: $fs-normal;
                        color: $color-3;
                        border-radius: 4px;
                        padding-right: 12px;
                        padding-left: 12px;
                        // background: $color-assist-1;
                    }
                    .activeNum {
                        color: #F03232;
                        // background: #E4F1FF;
                        border: 1px solid #F03232;
                    }
                }
                .active{
                    color: $color-primary;
                }
                .quantity{
                    display: flex;
                    padding-bottom: 10px;
                    margin-top: 10px;
                    color: $color-9;
                    .minus,
                    .add{
                        width: 38px;
                        height: 32px;
                        @include flex-center;
                    }
                    .num{
                        width: 47px;
                        height: 32px;
                        margin: 0 2px;
                        color: $color-3;
                        font-size: $fs-big-s;
                        @include flex-center;
                        background-color: $color-assist-3;
                    }
                }
                
            }
        }
        .bottom{
            height: $h-1;
            line-height: $h-1;
            text-align: center;
            font-size: $fs-big-s;
            background: linear-gradient(to right, #F23030, #FE7544);
            color: $color-white;
        }
    }
</style>

<template>
    <action-sheet
        class="action-sheet"
        :position="'bottom'"
        @close="opened = false"
        v-show="opened"
        :data="scrollerData">
            <div class="heard"  slot="header">
                <div class="heard-left">
                    <div class="avatar" v-if="detail.Images" :style= '{"backgroundImage": `url(${detail.Images[0]})` }'></div>
                </div>
                <div class="heard-right">
                    <span class="close" @click="close">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-guanbi"></use>
                        </svg>
                    </span>
                    <div class="right-bottom">
                        <div class="price-wrapper">
                            <div class="price">
                                &#165;{{computedMoney|formatNumber}}
                            </div>
                            <div>
                                <span class="text">限量</span>
                                <span class="num">仅剩10名</span>
                            </div>
                        </div>
                        <div class="old-price">&#165;2000.21</div>
                    </div>
                </div>
            </div>
            <div class="course">
                <div class="select-goods" v-if="type==1">
                    <div class="select-goods-heard">
                        规格
                    </div>
                    <div class="num-content">
                        <div class="item" 
                            v-for="item in detail.ShiftSpecList" 
                            :class="{activeNum: item.isSelect}"
                            @click="selectNum(item)">
                            {{item.Amount}}课时
                        </div>
                    </div>
                </div>
                <div class="select-goods" v-if="type!==1">
                    <div class="select-goods-heard">购买数量</div>
                    <div class="quantity">
                        <div class="minus" @click.stop="changeAmount(-1)">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-jianshaoicon"></use>
                            </svg>
                        </div>
                        <div class="num">{{amount}}</div>
                        <div class="add" @click.stop="changeAmount(1)">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-iconzengjia"></use>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom" @click="closeSelect" slot="footer">确定</div>
    </action-sheet>
    
</template>

<script>
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            type: {
                type: Number
            }
        },
        data() {
            return {
                opened: false,
                detail: {},
                rsv: null,
                amount: 1
            }
        },
        methods: {
            open(params) {
                this.detail = app.tool.clone(params)
                this.opened = true
                this.promise = new Promise(rsv => {
                    this._rsv = rsv
                })
                return this.promise
            },
            closeSelect() {
                if (this.type == 1) {
                    this.detail.ShiftSpecList.forEach(obj => {
                        if (obj.isSelect) this._rsv(obj)
                    })
                } else {
                    this._rsv({amount: this.amount})
                }
                this.close()
            },
            selectNum(obj) {
                obj.isSelect = true

                this.detail.ShiftSpecList.forEach(item => {
                    if (item.ID !== obj.ID) {
                        item.isSelect = false
                    }
                })
            },
            changeAmount(num) {
                this.amount = this.amount + num
            }
        }
    }
</script>