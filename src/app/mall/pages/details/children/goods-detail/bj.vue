<!-- 班级详情页面 -->

<style lang="scss" scoped>



.goods-detail {
    @include position-absolute(0, 0, $h-1, 0);
    overflow: hidden;
    background-color: #eef1f6;
    z-index: 10;

    .heard {
        height: 200px;

        .heard-banner {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 75%;
            background-color: $color-assist-1;

            @at-root .banner {
                @include position-absolute;

                .banner-item {
                    display: block;
                    height: 100%;
                    @include background-img(false, cover);
                }
            }
        }
    }

    .detail-container {

        // transform: translateY(-70px);
        // height: 115px;
        .header-container {
            background-color: #fff;
            margin: 0px 12px;
            border-radius: 10px;
            opacity: 0.9;

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

        .productInfo {
            margin-top: 10px;
            background-color: #fff;
            padding: 16px 15px 16px 12px;

            .productName {
                font-size: $fs-normal-x;
                color: $color-9;
            }

            .swiper-container {
                margin-top: 10px;
                // display: flex;
                text-align: center;

                .item-container {
                    // flex: 1 0 auto;
                    height: 75px;

                    // position: relative;
                    .productImage {
                        display: inline-block;
                        // position: absolute;
                        left: 0;
                        width: 100px;
                        height: 0;
                        padding-top: 75px;
                        background-color: $color-assist-1;
                        @include background-img(false, cover);
                    }
                }
            }
        }

        .outline {
            margin-top: 10px;
            background-color: #fff;
            @include border-bottom;

            .outline-title {
                padding: 18px 0 0 18px;
                font-size: 14px;
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

            .outline-content {
                margin-top: 22px;

                li {
                    // padding-left: 24px;
                    // height: 54px;
                    display: flex;
                    // padding-top: 10px;
                    padding-bottom: 13px;

                    .item-name {
                        padding-left: 24px;
                        padding-right: 7px;
                        width: 28%;
                        // height: 100%;
                        font-size: $fs-normal-x;
                        color: $color-9;
                        position: relative;

                        &:after {
                            content: "";
                            @include position-absolute(0, 0, false, false);
                            width: 10px;
                            height: 10px;
                            border: 3px solid $color-primary;
                            border-radius: 100%;
                            // transform: translate(-50%,0)
                        }

                        &:before {
                            content: "";
                            @include position-absolute(15px, 7px, false, false);
                            width: 1px;
                            height: 100%;
                            background-color: #ebebeb;
                            transform: translate(-50%, 0);
                        }
                    }

                    .item-content {
                        padding-left: 8px;
                        width: 70%;
                        word-break: break-word;
                        color: $color-3;

                        .content {
                            font-size: $fs-normal-x;
                            color: $color-9;
                            padding-top: 8px;

                            .time {
                                margin-left: 18px;
                            }

                            .time1 {
                                margin-left: 5px;
                            }
                        }
                    }
                }

                li:last-of-type {
                    .item-name {
                        &:before {
                            display: none;
                        }
                    }
                }
            }
        }

        .void {
            margin-top: 10px;
            height: 12px;
            background-color: $color-assist-1;
        }
    }

    .course {
        background-color: #fff;
        margin-top: 10px;

        .course-title {
            padding: 18px 15px 0 18px;
            font-size: 16px;
            color: $color-3;
            position: relative;
            @include flex-between;

            &:after {
                content: "";
                @include position-absolute(75%, false, false, 10px);
                transform: translate(0, -50%);
                height: 12px;
                width: 2px;
                background-color: $color-primary;
            }

            .seat-box {
                .seat-content {
                    font-size: $fs-normal-s;
                    color: $color-primary;
                }

                .icon-color {
                    color: $color-9;
                    font-size: 12px;
                }
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

        .question-container {
            .question-item {
                @include border-bottom;
                background-color: $color-white;
                padding: 21px 17px 20px 12px;

                .question {
                    display: flex;

                    .question-icon {
                        .icon {
                            font-size: 25px;
                        }
                    }

                    .question-content {
                        font-size: $fs-normal-x;
                        color: $color-3;
                        margin-left: $fs-small-x;
                        line-height: 20px;
                    }
                }

                .answer {
                    margin: 12px 0 0 37px;
                    padding: 9px 11px 12px 12px;
                    display: flex;
                    background-color: $color-assist-1;
                    border-radius: 6px;

                    .answer-icon {
                        .icon {
                            font-size: 25px;
                        }
                    }

                    .answer-content {
                        font-size: $fs-normal;
                        color: $color-6;
                        line-height: 21px;
                        margin-left: 7px;
                    }
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
</style>

<template>
<div>
    <scroller-base ref="scrollerBase" :data="scrollerData" class="goods-detail" :options="scrollOptions" @scroll="scrollHandler">
        <div>
            <!-- <p v-for='index in 100'>商品详情页 - {{$route.params.ID}}</p> -->
            <div class="heard" ref="heard">
                <!-- banner图  -->
                <div class="heard-banner" v-if="info.Images&&info.Images.length !=0">
                    <slider class='banner' :dotsStyle="dotsStyle">
                        <a class="banner-item" 
                            @click="previewImage(info.Images, index)"		
                            v-for="(img,index) in info.Images"		
                            :key="img"		
                            :style="'background-image:url('+ img + ')'">
                        </a>
                    </slider>
                </div>
            </div>
            <div class="detail-container" ref="detailContainer">
                <div class="header-container">
                    <div class="title">
                        <div class="class-name">{{info.Name}}</div>
                        <div class="descrite">{{info.Descrite}}</div>

                        <div class="price-bar" v-if="info.PayType==1">
                            <span>&#165;{{info.Money|formatNumber}}</span>
                        </div>
                        <div class="price-bar dingjin" v-if="info.PayType==2">
                            <span class="dingjin-text">定金</span>
                            <span class="price-dingjin">&#165;{{info.PreMoney|formatNumber}}</span>
                            <span class="price-all">总价:&nbsp;&#165;{{info.Money|formatNumber}}</span>
                        </div>
                        <div class="price-bar all" v-if="info.PayType==3">
                            <span>&#165;{{info.Money|formatNumber}}</span>
                            <span class="price-text">定金:</span>
                            <span class="price-dingjin">&#165;{{info.PreMoney|formatNumber}}</span>
                        </div>
                        <div class="old-price" v-if="info.OriginalMoney && info.OriginalMoney > info.Money">
                            价格<span class="priceold">&#165;{{info.OriginalMoney|formatNumber}}</span>
                        </div>
                    </div>
                    <div class="coupon" v-if="info.Coupons&&info.Coupons.length">
                        <span class="coupon-title">优惠券</span>
                        <div class="coupon-content">
                            <span class="coupon-intd" v-for="item in info.Coupons">{{item}}</span>
                        </div>
                    </div>
                    <!-- @click="emitShowSeat" -->
                    <div @click="emitShowSeat" class="seat" v-if="false">
                        <span class="seat-title">选择座位</span>
                        <div class="seat-content">
                            <!-- {{seatObj.coloum ? seatObj.row+"排"+seatObj.coloum+"座" : ""}} -->
                            {{seatObj.SeatName}}
                            <svg class="icon icon-color" aria-hidden="true">		
                                <use xlink:href="#icon-next"></use>		
                            </svg>
                        </div>
                    </div>
                    <!-- 购买方式 -->
                    <div class="seat" v-if="(info.Bindings&&info.Bindings.length>0||info.PayType==3||info.ShiftSpecList&&info.ShiftSpecList.length>0)&&!userInfo.IsEmployee" @click="emitEvevt()">

                        <span class="seat-title">		
                            <svg class="icon icon-color" aria-hidden="true">		
                                <use xlink:href="#icon-goumaifangshi"></use>		
                            </svg>
                            购买方式		
                        </span>
                        <span class="seat-content" v-html="comText">		
                            <!-- {{detailChoicePayType==1?'全额支付 ':detailChoicePayType==2?'定金支付 ':''}}		{{selectBindsNum.length==0?'':selectBindsNum.length+'件物品'}} -->		
                            <svg class="icon icon-color" aria-hidden="true">		
                                <use xlink:href="#icon-next"></use>		
                            </svg>		
                        </span>
                    </div>
                </div>
                <!-- 套餐咨询 -->
                <div class="productInfo" v-if="info.Packages&&info.Packages.length">
                    <div class="productName">关联套餐</div>
                    <swiper :itemMinWidth="110" type="left">
                        <div class="swiper-container">
                            <div class="item-container" v-for="item in info.Packages">
                                <router-link tag="div" :to="`/details/100/${item.ID}`" :style="'background-image:url('+ item.Image + ')'" class="productImage">
                                </router-link>
                            </div>
                        </div>
                    </swiper>
                </div>

                <!-- <div class="void"></div> -->

                <div class="course" v-if="info.Details&&info.Details.length">
                    <div class="course-title">班级信息</div>
                    <ul class="course-intrd">
                        <li v-for="item in info.Details" v-if="!(item.Name=='名师团队'&&config.EnableDisplayTeacher==0)">
                            <span class="item-name">{{item.Name}}</span>
                            <span class="item-content">{{item.Value}}</span>
                        </li>
                    </ul>
                </div>

                <div class="outline" v-if="outLine && outLine.length>0">
                    <div class="outline-title">课程大纲</div>
                    <ul class="outline-content">
                        <li v-for="item in outLine">
                            <div class="item-name">{{item.Section}}</div>
                            <div class="item-content">
                                {{item.Content}}
                                <div class="content">
                                    <span class="teacher" v-if="item.Teacher&&config.EnableDisplayTeacher!==0">讲师:{{item.Teacher}}</span>
                                    <span class="teacher" v-if="!item.Teacher||config.EnableDisplayTeacher===0">章节:{{item.Section}}</span>
                                    <span class="time" :class="{'time1': !item.Teacher}">{{item.Period}}课时</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- 课程介绍的富文本 -->
                <div class="course" v-if="info.DetailText">
                    <div class="course-title">班级介绍</div>
                    <rich-text-area :richText="info.DetailText" @imgLoaded="imgsNum += 1"></rich-text-area>
                </div>
            </div>
            <div class="teacher-container" ref="teacherContainer">
                <div class="course" v-if="teacherList.length > 0">
                    <div class="course-title">老师</div>
                    <div>
                        <router-link class="item" tag="div" v-for="item in teacherList" :key="item.ID" :to="`/teacher-detail/${item.ID}`">
                            <div class="item-left">
                                <div class="head-img" :style="'background-image: url(' + item.Image + ')'"></div>
                            </div>
                            <div class="item-right">
                                <div class="name">{{item.Name}}</div>
                                <span class="introduce">{{item.Descrite | htmlToText}}</span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="evaluate-container" ref="evaluateContainer">
                <div class="course">
                    <div class="course-title">评价 ({{evaluateObj.TotalCount}})
                        <div class="seat-box" @click="goEvaluate" v-if="evaluateObj.Data.length > 0">
                            <!-- //  v-if="evaluateObj.Data.length > 0"-->
                            <span class="seat-content">		查看全部		</span>
                            <svg class="icon icon-color" aria-hidden="true">		
                                <use xlink:href="#icon-next"></use>		
                            </svg>
                        </div>
                    </div>
                    <div>
                        <div class="item" v-for="(item, index) in evaluateObj.Data.filter((item, index) => index < 3)" :key="index">
                            <div class="item-left">
                                <div class="head-img" :style="'background-image: url(' + item.UserImage + ')'"></div>
                            </div>
                            <div class="item-right">
                                <div class="name">{{item.UserName}}</div>
                                <span class="introduce">{{item.Comment | htmlToText}}</span>
                            </div>
                        </div>
                        <div class="no-evaluate" v-if="!evaluateObj.Data.length > 0">
                            暂无评价～～
                        </div>
                    </div>
                </div>
            </div>
            <div class="issue-container" ref="issueContainer">
                <div class="course">
                    <div class="course-title">提问 ({{issueObj.TotalCount}})
                        <div class="seat-box" v-if="issueObj.Data.length > 0" @click="clickIssue">
                            <span class="seat-content">		查看全部		</span>
                            <svg class="icon icon-color" aria-hidden="true">		
                                <use xlink:href="#icon-next"></use>		
                            </svg>
                        </div>
                    </div>
                    <div class="question-container">
                        <div class="question-item" v-for="(item, index) in issueObj.Data.filter((item, index) => index < 3)" :key="index">
                            <div class="question" v-if="item.Question">
                                <span class="question-icon">		
                                    <svg class="icon" aria-hidden="true">		
                                        <use xlink:href="#icon-wen"></use>		
                                    </svg>		
                                </span>
                                <div class="question-content">{{item.Question}}</div>
                            </div>
                            <div class="answer" v-if="item.Answer">
                                <span class="answer-icon">		
                                    <svg class="icon" aria-hidden="true">		
                                        <use xlink:href="#icon-da"></use>		
                                    </svg>		
                                </span>
                                <div class="answer-content">{{item.Answer}}</div>
                            </div>
                        </div>
                        <div class="no-evaluate" v-if="!issueObj.Data.length > 0">去问问已买过的人<span class="goIssue" @click="goIssue">去提问</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </scroller-base>
</div>
</template>

<script>
import RichTextArea from "common/rich-text-area/rich-text-area.vue";
import {
    mapState,
    mapMutations
} from "vuex";
let setTimeIndex = 0;
export default {
    name: "goods-detail-bj",
    props: {
        details: {
            type: Object
        },
        evaluateObj: {
            type: Object,
            defulte: {}
        },
        issueObj: {
            type: Object,
            defulte: {}
        },
        teacherList: {
            type: Array
        },
        info: {
            type: Object
        },
        outLine: {
            type: Array
        },
        classSelectObj: {
            //课程选择的绑定物品和购买方式
            type: Object
        },
        seatObj: {
            //作为信息
            type: Object
        },
        seatInfo: {
            type: String
        }
    },
    data() {
        return {
            imgsNum: 0,
            detailChoicePayType: null,
            scrollOptions: {
                probeType: 3
            },
            scroller: {},
            detailHeight: 0,
            teacherHeight: 0,
            evaluateHeight: 0,
            initFlag: true,
            dotsStyle: {
                bottom: "84px"
            },
            heardHeight: 200
        };
    },
    computed: {
        ...Vuex.mapState(["seatPosition", "classBingds", "userInfo", "config"]),
        comText() {
            let text = "";
            if (this.classSelectObj.selectPayType) {
                if (this.classSelectObj.selectPayType == 1) {
                    text = "全额支付";
                } else if (this.classSelectObj.selectPayType === 2) {
                    text = "定金支付";
                }
            }
            if (this.classSelectObj.selectBings && this.info.Bindings.length) {
                let num = this.classSelectObj.selectBings.filter(obj => {
                    return obj != "";
                }).length;
                text = text + " " + num + "件物品";
            }
            if (this.classSelectObj.selectSpecs) {
                let arr = this.classSelectObj.selectSpecs.filter(obj => obj.isSelect),
                    str = ''
                if (arr.length) {
                    str = arr[0].Amount + `${this.info.Unit}课程`
                } 
                text = text + "&nbsp&nbsp&nbsp" + str
            }
            return text;
        },
        selectBindsNum() {
            if (this.classSelectObj.selectBings) {
                return this.classSelectObj.selectBings.filter(obj => {
                    return obj != "";
                });
            } else {
                return [];
            }
        },
        scrollerData() {
            return {
                info: this.info,
                num: this.imgsNum
            };
        }
    },
    methods: {
        ...Vuex.mapMutations(["set_goodsPesc"]),
        scrollHandler(s) {
            let opacity = Math.min(Math.abs(s.y) / 200, 1);
            this.$emit("changeOpacity", opacity);
        },
        emitEvevt(tag, comeFrom) {
            this.$emit("changeBings", true);
        },
        emitShowSeat() {
            if (this.info.CurrentSeat) {
                app.toast("info", "您在这门课程已经选取座位，请勿重复选取");
                return;
            }
            this.$emit("changeSeat", true);
        },
        //  初始化位置、对象；
        initHeight() {
            this.scroller = this.$refs.scrollerBase.scroller;
            //   自身位置 + 图片高度
            this.detailHeight = this.$refs.detailContainer.clientHeight + this.heardHeight; // 详情高度
            // 详情位置 + 自身高度 + 10 的margin值 如果有teacher
            if (this.$refs.teacherContainer.clientHeight > 0) {
                this.teacherHeight =
                    this.detailHeight + 10 + this.$refs.teacherContainer.clientHeight;
            } else {
                //   这个是因为可能没有老师，那么就不需要老师的高度以及10的margin
                this.teacherHeight = this.detailHeight;
            }
            // teacher位置 + 自身高度 + 10 的margin值
            this.evaluateHeight =
                this.teacherHeight + 10 + this.$refs.evaluateContainer.clientHeight;
            this.initFlag = false;
        },
        //  监听滚动
        scroll() {
            if (this.initFlag) this.initHeight();
            let scroller = this.scroller;
            clearTimeout(setTimeIndex);
            setTimeIndex = setTimeout(() => {
                let index = 0;
                if (this.details.list.length <= 3) index = 1; // 是否有老师
                // 之所以48 是因为scroll调用的频率，加入从43-44,这个函数并没有调用，所以判断的时候就会产生一些误差
                if (-scroller.y >= this.evaluateHeight - 48) {
                    this.details.activeIndex = 3 - index;
                } else if (-scroller.y >= this.teacherHeight - 48) {
                    this.details.activeIndex = 2 - index;
                } else if (-scroller.y >= this.detailHeight - 48) {
                    this.details.activeIndex = 1 - index;
                } else {
                    this.details.activeIndex = 0;
                }
            }, 50);
            let opacity = -scroller.y / (200 / 2);
            if (opacity > 1) opacity = 1;
            this.$emit("scrollOpacity", opacity);
        },
        //  滚动到某个位置
        scrollTo(index) {
            if (this.initFlag) this.initHeight();
            let maxY = this.$refs.scrollerBase.scroller.maxScrollY; // 最多滚动距离
            switch (this.details.list[index].text) {
                case "老师":
                    if (this.detailHeight < -maxY) {
                        this.$refs.scrollerBase.scroller.scrollTo(
                            0,
                            -this.detailHeight + 44,
                            300
                        );
                    } else {
                        this.$refs.scrollerBase.scroller.scrollTo(0, maxY, 300);
                    }
                    break;
                case "详情":
                    this.$refs.scrollerBase.scroller.scrollTo(0, 0, 300);
                    break;
                case "评价":
                    if (this.teacherHeight < -maxY) {
                        this.$refs.scrollerBase.scroller.scrollTo(
                            0,
                            -this.teacherHeight + 44,
                            300
                        );
                    } else {
                        this.$refs.scrollerBase.scroller.scrollTo(0, maxY, 300);
                    }
                    break;
                case "提问":
                    if (this.evaluateHeight < -maxY) {
                        this.$refs.scrollerBase.scroller.scrollTo(
                            0,
                            -this.evaluateHeight + 44,
                            300
                        );
                    } else {
                        this.$refs.scrollerBase.scroller.scrollTo(0, maxY, 300);
                    }
                    break;
                default:
                    break;
            }
        },
        //  去提问
        goIssue() {
            this.$emit("sendQuestion");
        },
        //  查看全部問題
        clickIssue() {
            this.$emit("openIssue");
        },
        goEvaluate() {
            this.$emit("goEvaluate");
        },
        setImgHttpHeader(src) {
            return src.indexOf("http") < 0 ? `https:${src}` : src;
        },
        // 微信预览
        previewImage(banneres, key) {
            let _arr = [];
            banneres.forEach(item => {
                _arr.push(this.setImgHttpHeader(item));
            });
            if (wx) {
                wx.previewImage({
                    current: _arr[key],
                    urls: _arr
                });
            }
        }
    },
    mounted() {
        this.set_goodsPesc({});
        this.$nextTick(function () {
            this.$refs.scrollerBase && this.$refs.scrollerBase.scroller.on("scroll", this.scroll);
            let bili = 320 / 200
            this.heardHeight = document.body.clientWidth / bili
            if (this.$refs.heard) this.$refs.heard.style.height = this.heardHeight + 'px'
        })
    },
    watch: {
        classSelectObj(val) {
            this.detailChoicePayType = val.selectPayType;
        },
    },
    components: {
        RichTextArea
    }
};
</script>
