<!-- 班级详情页面 -->

<style lang="scss" scoped>



.goods-detail {
    @include position-absolute(0, 0, $h-1, 0);
    overflow: hidden;
    background-color: #eef1f6;

    .heard {
        height: 200px;

        .heard-banner {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 75%;
            background-color: $color-assist-1;
            @include background-img(false, cover);
            /* @at-root .banner {
                @include position-absolute;
            
                .banner-item {
                    display: block;
                    height: 100%;
                    @include background-img(false, cover);
                }
            } */
        }
    }

    .detail-container {
        position: relative;
        z-index: 1;
        // transform: translateY(-70px);
        // height: 115px;
        .header-container {
            background-color: #fff;
            margin: 0px 12px;
            border-radius: 10px;
            // opacity: 0.9;

            .title {
                padding: 15px 15px 15px 12px;
                @include border-bottom;

                .class-name {
                    // height: 30px;
                    // line-height: 30px;
                    @include ellipsis-multi(2);
                    line-height: 22px;
                    padding-top: 10px;
                    font-size: $fs-big-s;
                    color: $color-3;
                }

                .descrite {
                    @include ellipsis-multi(2);
                    padding-top: 10px;
                    line-height: 20px;
                    font-size: $fs-normal;
                    opacity: 0.66;
                    color: #6d6d6d;
                }

                .price-bar {
                    height: 42px;
                    line-height: 42px;
                    font-size: 26px;
                    color: $color-assist;

                    &.dingjin {
                        .dingjin-text {
                            font-size: $fs-normal-s;
                            color: $color-9;
                        }

                        .price-dingjin {
                            font-size: 26px;
                            color: $color-assist;
                            padding-right: $edge;
                        }

                        .price-all {
                            font-size: $fs-normal-x;
                            color: $color-3;
                        }
                    }

                    &.all {
                        .price-text {
                            font-size: $fs-normal-s;
                            color: $color-9;
                            padding-left: 2 * $edge;
                        }

                        .price-dingjin {
                            font-size: $fs-normal-s;
                        }
                    }
                }

                .old-price {
                    color: $color-9;

                    .priceold {
                        margin-left: $fs-small;
                        color: $color-9;
                        font-size: $fs-normal;
                        text-decoration: line-through;
                    }
                }
            }

            .coupon {
                margin-top: 10px;
                padding: 8px 12px 18px 12px;
                @include border-bottom;
                @include flex-between;

                .coupon-title {
                    display: inline-block;
                    width: 15%;
                    font-size: $fs-normal-x;
                    color: $color-9;
                    text-align: center;
                    padding-top: $edge;
                }

                .coupon-content {
                    width: 85%;
                    display: flex;
                    flex-wrap: wrap;

                    .coupon-intd {
                        margin-top: $edge;
                        font-size: $fs-normal;
                        color: $color-3;
                        font-size: $fs-small-x;
                        margin-left: $fs-small-x;
                        border: 1px solid $color-primary;
                        padding: 4px 7px 4px 7px;
                        border-radius: 4px;
                        color: $color-primary;
                    }
                }
            }

            .seat {
                // margin-top: 10px;
                @include flex-between;
                // @include border-top;
                // border-top: 1px solid $color-assist-1;
                padding: 16px 15px 16px 12px;

                .seat-title {
                    font-size: $fs-normal-x;
                    color: $color-9;
                }

                .seat-content {
                    font-size: $fs-normal-s;
                    color: $color-primary;

                    .icon-color {
                        color: $color-9;
                    }
                }
            }
        }

        .wrap {
            margin-top: 10px;
            background-color: #fff;

            .wrap-heard {
                height: $h-1;
                @include border-bottom;
                padding: $fs-normal $fs-small;

                .productName {
                    font-size: $fs-normal-s;
                    color: $color-primary;
                    margin-right: 5px;
                }

                .productLength {
                    color: $color-9;
                    font-size: $fs-small;
                }
            }

            .seat {
                @include flex-between;
                @include border-bottom;

                .title-wrap {
                    width: 55%;
                    padding: 16px 15px 16px 12px;

                    .seat-title {
                        // width: 53%;
                        font-size: $fs-normal-x;
                        color: $color-9;
                    }
                }

                .seat-box {
                    width: 45%;
                    height: 100%;
                    padding: 16px 15px 16px 12px;
                    text-align: right;
                    position: relative;

                    .seat-content {
                        position: absolute;
                        left: 0;
                        right: 20px;
                        @include ellipsis-single;
                        font-size: $fs-normal-s;
                        color: $color-primary;
                        margin-right: 14px;

                        .icon-color {
                            color: $color-9;
                        }
                    }

                    .select {
                        font-size: $fs-small-x;
                        color: $color-9;
                    }
                }

                .course-item {
                    width: 45%;
                    padding: 16px 15px 16px 12px;
                    text-align: right;
                    display: flex;

                    // margin-right: 4px;
                    .icon-wrapper {
                        margin-left: 4px;
                        @include flex-center;
                    }

                    .item-wrapper {
                        flex: 1;
                        display: flex;
                        flex-direction: column;

                        .class-name {
                            font-size: 12px;
                            color: #F5A623;
                        }

                        .seat-binds {
                            // margin-top: 3px;
                            font-size: 12px;
                            color: $color-primary;

                            .seat-name {
                                margin-right: 12px;
                            }
                        }

                        .seat-binds {
                            display: flex;
                            justify-content: flex-end;
                        }

                        .select-text {
                            font-size: $fs-small-x;
                            color: $color-9;
                        }
                    }
                }
            }
        }
    }

    .course {
        background-color: #fff;
        margin-top: 10px;

        .course-title {
            padding: 18px 0 0 18px;
            font-size: 16px;
            color: $color-3;
            position: relative;

            &:after {
                content: "";
                @include position-absolute(75%, false, false, 10px);
                transform: translate(0, -50%);
                height: 12px;
                width: 2px;
                background-color: $color-primary;
            }
        }

        .course-intrd {
            li {
                padding: 20px 17px 20px 18px;
                @include border-bottom;
                @include flex-between;

                .item-name {
                    font-size: $fs-normal;
                    color: $color-9;
                }

                .item-content {
                    text-align: right;
                    font-size: $fs-normal;
                    color: $color-3;
                    width: 63%;
                }
            }
        }

        .item {
            // @include border-bottom;
            border-bottom: 1px solid $color-assist-1;
            background-color: $color-white;
            padding: 20px 25px 11px 15px;
            display: flex;

            .item-left {
                width: 59px;
                height: 59px;

                .head-img {
                    @include background-img(false, cover);
                    height: 100%;
                    background-color: $color-assist-1;
                    border-radius: 100%;
                }
            }

            .item-right {
                flex: 1;
                margin-left: 12px;

                .name {
                    height: $fs-normal-x;
                    line-height: $fs-normal-x;
                    font-size: $fs-normal-x;
                    color: $color-3;
                }

                .introduce {
                    @include ellipsis-multi(3);
                    margin-top: 10px;
                    line-height: 19px;
                    font-size: $fs-normal;
                    color: $color-9;
                }
            }
        }

        .no-evaluate {
            margin-top: 20px;
            padding: 0px 16px;
            height: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            border-top: 1px solid #eef1f6;
            background: rgba(255, 255, 255, 1);

            .goIssue {
                float: right;
                width: 88px;
                height: 31px;
                background: rgba(232, 243, 254, 1);
                border-radius: 21px;
                border: 1px solid rgba(30, 136, 245, 1);
                font-size: 14px;
                color: rgba(30, 136, 245, 1);
                line-height: 31px;
                text-align: center;
            }
        }
    }
}

.rich-text-box {
    padding-top: 1em;
    padding-bottom: 1em;
    margin-left: 1em;
    margin-right: 1em;
    overflow: hidden;

    img {
        max-width: 100%;
    }

    /* * {		max-width: 100%;		} */
}
</style>

<template>
<!-- :data="scrollerData" -->
<!-- @scroll="scrollHandler"> -->
<scroller-base :data="scrollerData" v-if="info.Name" ref="scroller" class="goods-detail">
    <div class="heard" ref="heard">
        <!-- banner图  -->
        <div class="heard-banner" 
             v-if="info.Image" 
             :style="'background-image:url('+ info.Image + ')'" 
             @click="previewImage(info.Image)">
            <!-- <slider class='banner'>
                <a class="banner-item" v-for="img in info.Images" :style="'background-image:url('+ img + ')'"></a>
            </slider> -->
        </div>
    </div>
    <div class="detail-container">
        <div class="header-container">
            <div class="title">
                <!-- <span class="taocan">套餐</span> -->
                <span class="class-name">{{info.Name}}</span>
                <div class="descrite">{{info.Summary}}</div>

                <div class="price-bar">
                    <span>&#165;{{tcMoney==null?info.Money:tcMoney|formatNumber}}</span>
                </div>
                <div class="old-price" v-if="info.OriginalMoney&& info.OriginalMoney > info.Money">
                    价格<span class="priceold">&#165;{{info.OriginalMoney|formatNumber}}</span>
                </div>
            </div>
        </div>
        <!-- 套餐项目 -->
        <div class="wrap">
            <div class="wrap-heard">
                <span class="productName">套餐项目</span>
                <span class="productLength">共{{info.Products.length}}个项目</span>
            </div>
            <div class="seat" v-for="(item,index) in info.Products" :key="index">
                <div class="title-wrap" @click="jumpSelf(item)">
                    <span class="seat-title">{{item.Name}}</span>
                </div>
                <div class="seat-box" @click="select(item,index)" v-if="item.Type===1 || item.Type ===2">
                    <span class="seat-content" v-html="item.selectText"></span>
                    <span class="select" v-if="!userInfo.IsEmployee&&!item.selectText&&info.AllowType!==1&&info.AllowType!==2">	
                    	{{item.text}}		
                    </span>
                    <svg class="icon icon-color" aria-hidden="true"	v-if="!userInfo.IsEmployee&&item.text&&info.AllowType!==1&&info.AllowType!==2">		
                        <use xlink:href="#icon-next"></use>		
                    </svg>
                </div>
                <div class="course-item" @click="select(item,index)" v-if="item.Type===3">
                    <div class="item-wrapper">
                        <div class="class-name" v-if="item.selectText&&item.selectText.name">
                            {{item.selectText.name}}
                        </div>
                        <div class="seat-binds" v-if="item.selectText&&(item.selectText.currentSeat||item.selectText.bindingsText)">
                            <div class="bingdings-num" v-html="choiceText(item)">
                                <!-- {{choiceText(item)}} -->
                            </div>
                        </div>
                        <div class="select-text" v-if="!userInfo.IsEmployee&&!item.selectText&&info.AllowType!==1&&info.AllowType!==2">
                            {{item.text}}
                        </div>
                    </div>
                    <div class="icon-wrapper">
                        <svg class="icon icon-color" aria-hidden="true"	v-if="!userInfo.IsEmployee&&item.text&&info.AllowType!==1&&info.AllowType!==2">		
                            <use xlink:href="#icon-next"></use>		
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <!-- 物品介绍的富文本 -->
        <div class="course" v-if="info.DetailText">
            <div class="course-title">商品介绍</div>
            <rich-text-area :richText="info.DetailText" @imgLoaded="imgsNum += 1"></rich-text-area>
        </div>
    </div>

</scroller-base>
</template>

<script>
import RichTextArea from "common/rich-text-area/rich-text-area.vue";
import {
    mapState,
    mapMutations
} from "vuex";
export default {
    name: "goods-detail-tc",
    props: {
        info: {
            type: Object,
            default: () => {
                return {};
            }
        },
        tcMoney: {
            type: Number
        }
    },
    computed: {
        ...Vuex.mapState(["userInfo"]),
        scrollerData() {
            return {
                info: this.info,
                num: this.imgsNum
            };
        }
    },
    data() {
        return {
            imgsNum: 0,
            myInfo: this.info
        };
    },
    methods: {
        setImgHttpHeader(src) {
            return src.indexOf("http") < 0 ? `https:${src}` : src;
        },
        previewImage(url) {
            if (wx) {
                wx.previewImage({
                    current: this.setImgHttpHeader(url),
                    urls: [this.setImgHttpHeader(url)]
                })
            }
        },
        choiceText(item) {
            let str = "",
                seatName;
            if (item.selectText.currentSeat)
                seatName =
                item.selectText.currentSeat.SeatName ||
                item.selectText.currentSeat.Name;
            if (item.selectText.currentSeat && item.selectText.bindingsText) {
                str = seatName + "  " + item.selectText.bindingsText;
            } else if (!item.selectText.currentSeat && item.selectText.bindingsText) {
                str = item.selectText.bindingsText;
            } else if (item.selectText.currentSeat && !item.selectText.bindingsText) {
                str = seatName;
            }
            str = str + '&nbsp&nbsp' + item.selectText.shiftSpec
            // this.$refs.scroller && this.$refs.scroller.scroller.refresh();
            return str;
        },
        select(obj, index) {
            if (this.userInfo.IsEmployee) return;
            if (this.info.AllowType == 1 || this.info.AllowType == 2) return;
            if (obj.Type == 1) {
                if (!obj.ClassInfo.IsMustSelectSeat && !obj.ClassInfo.Bindings.length && obj.ClassInfo.ShiftSpecsList.length == 0) {
                    return;
                }
                /*if (!obj.ClassInfo.IsMustSelectSeat && obj.ClassInfo.Bindings.length) {
                    this.$emit("tcSelectBindings", obj, index);
                }*/
                if (obj.ClassInfo.IsMustSelectSeat && !obj.ClassInfo.Bindings.length) {
                    if (obj.ClassInfo.CurrentSeat) {
                        app.toast("info", "您在这门课程已经选取座位，请勿重复选取");
                        return;
                    }
                    // this.$emit("tcSelectSeat", obj, index);
                }
                /*if (obj.ClassInfo.IsMustSelectSeat && obj.ClassInfo.Bindings.length && obj.ClassInfo.ShiftSpecsList.length > 0) {
                }*/
                this.$emit("tcSelectSeatBindings", obj, index);
            }
            if (obj.Type == 2) {
                // if (!obj.GoodsInfo.Specs.length) {
                // 	obj.text = ''
                // } else {
                // 	this.$emit('tcSelectSpecs', obj, index)
                // }
                if (obj.GoodsInfo.Specs.length > 0) {
                    this.$emit("tcSelectSpecs", obj, index);
                }
            }
            if (obj.Type == 3) {
                if (!obj.ShiftInfo.IsMustSelectClass && !obj.ShiftInfo.Bindings.length && !obj.ShiftInfo.Specs)
                    return;
                this.$emit("tcSelectCourse", obj, index);
            }
        },
        jumpSelf(item) {
            // EnableBuyPackageSingle 配置项决定：是否可以单独购买套餐中的商品：1是（默认），0否
            if (this.$store.state.config.EnableBuyPackageSingle === 1) {
                this.$router.push(`/details/${item.Type}/${item.ID}`);
            }
        }
    },
    components: {
        RichTextArea
    },
    created() {
        window.c = this;
    },
    mounted() {
        setTimeout(() => {
            let bili = 320 / 200
            let heardHeight = document.body.clientWidth / bili
            if (this.$refs.heard) this.$refs.heard.style.height = heardHeight + 'px'

        })
    }
};
</script>
