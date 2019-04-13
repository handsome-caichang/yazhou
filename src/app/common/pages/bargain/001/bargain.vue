<style lang="scss" scoped>
.bargain-container {
    .bargain {
        @include position-absolute(0, 0, 49px, 0);
        background-color: #ffb15e;
        .hotinfo {
            height: 32px;
            line-height: 32px;
            padding-left: 10px;
            font-size: 13px;
            display: flex;
            align-items: center;
            background-color: #fde9e3;
            .image {
                display: inline-block;
                margin-right: 4px;
                width: 28px;
            }
        }
        .body {
            padding-bottom: 20px;
            .group-bargain-box {
                @include background-img(false, cover);
                width: 100%;
                height: 0;
                padding-top: 188.8%;
                position: relative;
                .group-bargain {
                    position: absolute;
                    top: 55.5%;
                    left: 8%;
                    right: 8%;
                }
                .intro-box {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 7%;
                    .left {
                        width: 74px;
                        height: 24px;
                        line-height: 24px;
                        border-radius: 14px;
                        color: #fc7815;
                        font-size: 13px;
                        text-align: center;
                        border: 1px solid #fc7815;
                    }
                    .right {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .text {
                            .time {
                                margin-top: 4px;
                                font-size: 15px;
                                span {
                                    background-color: #fe5d38;
                                    color: #fff;
                                    padding: 2px 2px;
                                    border-radius: 4px;
                                }
                            }
                            .point {
                                font-size: 14px;
                                color: $color-3;
                                &.pleft {
                                    margin-right: 5px;
                                }
                                &.pright {
                                    margin-left: 5px;
                                }
                            }
                        }
                    }
                }
                .banner-wrap {
                    position: relative;
                    width: 100%;
                    height: 0;
                    padding-top: 46.7%;
                    @at-root .banner {
                        @include position-absolute;
                        .banner-item {
                            display: block;
                            height: 100%;
                            @include background-img(false, cover);
                            background-color: $color-assist-1;
                        }
                    }
                }
                .intro-name {
                    font-size: 16px;
                    color: $color-3;
                    // margin: 20px 0 12px 0;
                    margin: 4% 0 3% 0;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    padding-right: 30px;
                    .share {
                        position: absolute;
                        right: 0;
                        width: 23px;
                        height: 23px;
                        color: #fe5c00;
                    }
                }
                .intro-price {
                    color: $color-3;
                    .intro-price-symbol {
                        margin: 0 4px;
                        color: #f03232;
                    }
                    .intro-price-num {
                        color: #f03232;
                        font-weight: bold;
                        font-size: 17px;
                    }
                    .xiahua {
                        margin-left: 10px;
                        font-size: 10px;
                        color: $color-9;
                        font-weight: normal;
                        text-decoration: line-through;
                    }
                }
                .intro-info {
                    display: flex;
                    justify-content: space-between;
                    color: #999;
                    // margin-top: 12px;
                    margin-top: 3%;
                    margin-right: 23%;
                }
            }
            .group-item {
                margin: 0 15px;
                background: $color-white;
                box-shadow: 0px 1px 6px 0px rgba(204, 121, 25, 0.5);
                border-radius: 10px;
                border: 1px solid $color-white;
                position: relative;
                min-height: 124px;
                margin-top: 47px;
                .title {
                    @include background-img(false, cover);
                    height: 59px;
                    text-align: center;
                    width: 206px;
                    font-weight: bold;
                    font-size: 19px;
                    color: #fff;
                    position: absolute;
                    left: 50%;
                    top: 0;
                    transform: translate(-50%, -50%);
                }
                .content {
                    .bargain-start {
                        margin-top: 34px;
                        padding: 0 22px;
                        .bargain-start-top {
                            @include flex-between;
                            color: $color-3;
                            font-size: 13px;
                            .price-on {
                                color: #ffb15e;
                                padding: 0 2px;
                            }
                        }
                        .bargain-start-center {
                            position: relative;
                            margin: 8px 0;
                            height: 12px;
                            background: #e4e4e4;
                            border-radius: 12px;
                            box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.22);
                            .progress {
                                position: absolute;
                                left: 0;
                                height: 12px;
                                border-radius: 12px;
                                transition: all 300ms;
                                background: linear-gradient(
                                    306deg,
                                    rgba(254, 85, 0, 1) 0%,
                                    rgba(255, 162, 2, 1) 100%
                                );
                            }
                            .progress-tips {
                                position: absolute;
                                right: 0;
                                height: 22px;
                                line-height: 22px;
                                top: -5px;
                                transform: translate(100%, 0);
                                white-space: nowrap;
                                transition: all 300ms;
                                padding: 0 8px;
                                border-radius: 12px;
                                font-size: 12px;
                                color: $color-white;
                                background: linear-gradient(
                                    306deg,
                                    rgba(254, 85, 0, 1) 0%,
                                    rgba(255, 162, 2, 1) 100%
                                );
                            }
                        }
                        .bargain-start-bottom {
                            @include flex-between;
                            font-size: 10px;
                            color: $color-9;
                            .xiahua {
                                text-decoration: line-through;
                            }
                            .price-now {
                                color: $color-3;
                            }
                        }
                    }
                    .bargain-process-top {
                        //砍价流程
                        margin-top: 52px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 33px;
                        svg {
                            width: 25px;
                            height: 25px;
                            margin: 0 9px;
                            &:first-child {
                                margin-left: 0;
                            }
                            &:last-child {
                                margin-right: 0;
                            }
                        }
                        .line {
                            width: 42px;
                            height: 1px;
                            background-color: #888888;
                        }
                    }
                    .bargain-process-bottom {
                        //砍价流程
                        margin: 12px 0 20px 0;
                        padding: 0 4%;
                        display: flex;
                        color: #666;
                        text-align: center;
                        justify-content: space-between;
                    }
                    .bargain-success {
                        //砍价成功
                        margin-top: 36px;
                        padding: 0 22px;
                        text-align: center;
                        color: $color-3;
                        .top {
                            font-size: 16px;
                            .price-on {
                                color: #ffb15e;
                                margin: 0 4px;
                            }
                        }
                        .bottom {
                            //砍价成功
                            margin-top: 22px;
                            color: #f03232;
                            font-size: 20px;
                            .price-now {
                                font-size: 12px;
                                margin-right: 4px;
                            }
                        }
                    }
                    .userbox {
                        //好友砍价
                        margin-top: 44px;
                        padding-left: 16px;
                        padding-right: 16px;
                        .useritem {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            margin-bottom: 20px;
                            &:last-child {
                                margin-bottom: 24px;
                            }
                            .left {
                                display: flex;
                                align-items: center;
                                img {
                                    display: inline-block;
                                    width: 40px;
                                    height: 40px;
                                    border-radius: 40px;
                                }
                                .userinfo {
                                    margin-left: 11px;
                                    .username {
                                        color: #333;
                                        font-size: 13px;
                                        margin-bottom: 7px;
                                        span {
                                            color: #e73114;
                                        }
                                    }
                                    .time {
                                        font-size: 12px;
                                        color: #999;
                                    }
                                }
                            }
                            .right {
                                min-width: 50px;
                                .price {
                                    color: #f03232;
                                    font-weight: bold;
                                }
                            }
                        }
                    }

                    .course {
                        //课程介绍
                        padding: 24px 16px;
                        .coursetitle {
                            color: #bc7e43;
                            font-size: 15px;
                            margin-top: 20px;
                            margin-bottom: 6px;
                            font-weight: bold;
                        }
                        .point {
                            line-height: 21px;
                            font-size: 14px;
                            color: #777777;
                            white-space: pre-wrap;
                            .point-address,
                            .point-phone {
                                color: #666666;
                                margin-right: 12px;
                            }
                        }
                        .courseimg {
                            margin-top: 16px;
                            width: 100%;
                            display: block;
                            border-radius: 2px;
                        }
                    }
                }
                .watch-more {
                    text-align: center;
                    color: #999;
                    padding-bottom: 12px;
                }
            }
            .footer-point {
                color: #c17625;
                text-align: center;
                margin-top: 20px;
            }
        }
    }
    .footer-btn {
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 49px;
        line-height: 49px;
        background: #ff8b02;
        color: #fff;
        text-align: center;
        font-size: 17px;
    }
    .footer-tow-btn {
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 49px;
        line-height: 49px;
        font-size: 17px;
        color: #333;
        background-color: #fff;
        text-align: center;
        display: flex;
        .preview {
            width: 112px;
            border-top: 1px solid #dddddd;
        }
        .save {
            flex: 1;
            background: rgba(255, 139, 2, 1);
            color: #fff;
        }
        .jieshu {
            background-color: #d7d7d7;
            color: #666666;
        }
        .shoukong {
            background-color: #ffd29c;
            color: #fff;
        }
        .canyu {
            color: #fff;
            background: rgba(255, 139, 2, 1);
        }
    }
}
</style>

<template>
    <div class="bargain-container">
        <scroller-base class="bargain" ref="scrollBars" :data="renderData">
        <p class="hotinfo">
            <img class="image" :src="laba">已有{{detail.actinsrecruitcount.visitcount}}人查看，已有{{detail.actinsrecruitcount.enterusercount}}人报名
        </p>
        <div class="body">
            <div class="group-bargain-box" :style="'background-image:url('+ bagBig + ')'">
            <div class="group-bargain">
                <div class="intro-box">
                    <div class="left" @click="openActiveRuleOpened">活动说明</div>
                        <div class="right">
                            <div class="text">
                                <span class="point pleft"></span>
                                <span class="time">
                                    <span v-if="type != 'add' && getComputedD > 0" class="day">{{getComputedD}}</span>&nbsp;{{ (type != 'add' && getComputedD > 0) ? '天': ''}}&nbsp;
                                    <span>{{type == 'add' ? '99' : getComputedH}}</span>&nbsp;:
                                    <span>{{type == 'add' ? '99' : getComputedM}}</span>&nbsp;:
                                    <span>{{type == 'add' ? '99' : getComputedS}}</span>
                                </span>
                                <span class="point pright">活动结束</span>
                            </div>
                        </div>
                    </div>
                    <div class="banner-wrap">
                        <slider class='banner' :autoPlay="true" :data="activeSetingImgList">
                            <div class="banner-item" v-for="(item,index) in activeSetingImgList" :key="index" @click="previewImg(item,'activeSetingImgList')" :style="`background-image:url( ${item.filepath||item.localImgData||item.localId} )`"></div>
                        </slider>
                        </div>
                        <div class="intro-name">{{detail.title}}
                        <svg class="icon share" aria-hidden="true" @click="shardClick">
                            <use xlink:href="#iconfenxiang"></use>
                        </svg>
                    </div>
                    <div class="intro-price">
                        <span class="intro-price-symbol">&yen;</span>
                        <span class="intro-price-num">{{detail.actinsconfigbargain.floorprice}}</span>
                        <span class="xiahua">&yen; {{detail.actinsconfigbargain.originalprice}}</span>
                    </div>
                    <div class="intro-info">
                        <span>已抢{{detail.actinsrecruitcount.bargainedcount}}份</span>
                        <span>库存{{detail.actinsconfigbargain.enterusercountmax}}份</span>
                        <span>浏览量{{detail.actinsrecruitcount.visitcount}}</span>
                    </div>
                </div>
            </div>
            <!-- 用户端-砍价中  -->
            <div class="group-item" v-show="isUser && rightBtnText != '已完成' && rightBtnText != '发起砍价'">
                <div class="title" :style="'background-image:url('+ titlebag + ')'">砍价中</div>
                <div class="content">
                    <div class="bargain-start">
                        <div class="bargain-start-top">
                            <div>已砍掉
                            <span class="price-on">{{bargaincompleteinfo.bargainmoney}}</span>元</div>
                            <!-- <div v-show="detail.ismine == 1">还差{{bargaincompleteinfo.notbargaincount}}人达到</div> -->
                        </div>
                        <div class="bargain-start-center" ref="progressBox">
                            <div class="progress" :style="{width: progressWidth}">
                            </div>
                            <div class="progress-tips" :style="{right: progressTipsTight}" ref="progressTips">当前 &yen;{{bargaincompleteinfo.currentmoney}}</div>
                        </div>
                        <div class="bargain-start-bottom">
                            <div>原价：<span class="xiahua">&yen;{{detail.actinsconfigbargain.originalprice}}</span></div>
                            <div>活动价：<span class="price-now">&yen;{{detail.actinsconfigbargain.floorprice}}</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 用户端-砍价成功  -->
            <div class="group-item" v-if="isUser && rightBtnText == '已完成'">
                <div class="title" :style="'background-image:url('+ titlebag + ')'">砍价成功</div>
                <div class="content">
                    <div class="bargain-success">
                        <div class="top">您已成功砍掉<span class="price-on">{{bargaincompleteinfo.bargainmoney}}</span>元，可享受活动价</div>
                        <div class="bottom"><span class="price-now">&yen;</span>{{detail.actinsconfigbargain.floorprice}}</div>
                    </div>
                </div>
            </div>

            <!-- 砍价流程 -->
            <div class="group-item" v-if="rightBtnText != '已完成'">
                <div class="title" :style="'background-image:url('+ titlebag + ')'">砍价流程</div>
                <div class="content">
                    <div class="bargain-process-top">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#iconIcon-bianji"></use>
                        </svg>
                        <i class="line"></i>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#iconIcon-haoyou"></use>
                        </svg>
                        <i class="line"></i>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#iconIcon-jiagemanyi"></use>
                        </svg>
                        <i class="line"></i>
                        <svg class="icon shardicon" aria-hidden="true">
                            <use xlink:href="#iconIcon-lijitijiao"></use>
                        </svg>
                    </div>
                    <div class="bargain-process-bottom">
                        <span>报名参与</span>
                        <span>好友助力</span>
                        <span>价格满意</span>
                        <span>立即成交</span>
                    </div>
                </div>
            </div>

            <!-- 好友砍价 单独接口-->
            <div class="group-item" v-if="groupmember.length > 0">
                <div class="title" :style="'background-image:url('+ titlebag + ')'">好友砍价</div>
                <div class="content">
                    <div class="userbox">
                    <div class="useritem" v-for="(item,index) in groupmember.length > 2 ? 2 : groupmember.length" :key="index">
                        <div class="left">
                        <img :src="groupmember[index].wechatphoto" alt="">
                        <div class="userinfo">
                            <p class="username">{{groupmember[index].wechatname}}
                            <p class="time">{{groupmember[index].entermessage}}</p>
                        </div>
                        </div>
                        <div class="right">砍掉
                            <div class="price"><span style="font-size:12px;">&yen;&nbsp;</span>{{groupmember[index].money}}</div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="watch-more" v-if="groupmember.length > 2" @click="watchMore">点击查看全部
                    <span>
                        <svg class="icon" aria-hidden="true">
                        <use xlink:href="#iconxiala"></use>
                        </svg>
                    </span>
                </div>
            </div>

            <!-- 课程介绍 -->
            <div class="group-item">
                <div class="title" :style="'background-image:url('+ titlebag + ')'">课程介绍</div>
                <div class="content">
                    <div class="course">
                    <p class="coursetitle">{{detail.productname}}</p>
                    <p class="point">{{detail.productdescribe}}</p>
                        <img class="courseimg" @load="imgLoad" v-for="(item,index) in activeRuleImgList" @click="previewImg(item,'activeRuleImgList')" :key="index" :src="`${item.FilePath||item.filepath||item.localImgData||item.localId}`">
                    </div>
                </div>
            </div>

            <!-- 机构介绍 -->
            <div class="group-item">
                <div class="title" :style="'background-image:url('+ titlebag + ')'">机构介绍</div>
                <div class="content">
                    <div class="course">
                    <p class="coursetitle">机构简介</p>
                    <p class="point">{{detail.orgintroduce}}</p>
                    <img class="courseimg" @load="imgLoad" v-for="(item,index) in campanyInfoImgList" :key="index" @click="previewImg(item,'campanyInfoImgList')" :src="`${item.FilePath||item.filepath||item.localImgData||item.localId}`">
                    <p class="coursetitle">联系方式</p>
                    <p class="point">
                        <span>{{detail.contactinfo}}</span>
                    </p>
                    <!-- <span class="point-address">联系地址</span>{{groupBuyingData.campanyInfo.contactInformation}}</p> -->
                    <!-- <p class="point"> -->
                    <!-- <span class="point-phone">联系电话</span>{{groupBuyingData.campanyInfo.phone}}</p> -->
                    </div>
                </div>
            </div>
            <div class="footer-point">本活动方案由 妙招生 提供支持</div>
        </div>
        </scroller-base>
        <div class="footer-btn" @click="addMyActive" v-if="!isUser">{{ (type == 'preview' || type == 'managepreview') ? '返回' : '立即制作我的活动'}}</div>
        <div class="footer-tow-btn" v-if="isUser">
        <a class="preview" :href="`tel:${detail.orgphone}`" v-if="leftBtnText == '联系机构'">{{leftBtnText}}</a>
        <span class="preview" v-if="leftBtnText != '联系机构'" @click="leftClick">{{leftBtnText}}</span>
        <span class="save" @click="rightClick" :class="detail.isexpire == 1 ? 'jieshu' : ( ( (detail.isfull == 1 && rightBtnText == '已售罄') || (rightBtnText == '已砍价') )? 'shoukong' : '')">{{rightBtnText}}</span>
        </div>
        <loading class="loading" v-show="isLoading" :bgType='bgType'></loading>
        <active-rule :opened="activeRuleOpened" @close="activeRuleOpened = false" :text="detail.contentmain"></active-rule>
        <bargain-box :opened="bargainOpend" :bargain="bargainData" @close="closeBargainOpend" @toLook="toLook"></bargain-box>
        <enroll-sucess :opened="showSucess" class="enroll-sucess" @share="bargainClick" :type='"bargain"' @offClick="showSucess = false"></enroll-sucess>
    </div>
</template>

<script>
    import bargainBox from "../bargain-box.vue";
    import activeRule from "common/components/common/activeRule.vue";
    import { getactinsdetail,gettemplateinfo,gettemplatehelpbargainshare } from "manage/api/common.js";
    import EnrollSucess from "common/components/common/enrollSucess.vue";
    import {
        getsharedetail,
        gethelpbargainactivityshare,
        helpvargainactivityshare,
        getbargaincompleteinfo,
        joinactivity
    } from "user/api/common.js";
    //用来处理机构信息相关的模板数据 

    export default {
        name: "bargain",
        mixins: [app.mixin.shareMixin],
        data() {
            return {
                wxTitle: "砍价",
                isUser: false,
                bgType: 2,
                bargainOpend: false,
                showSucess: false,
                bargainData: {
                    isme: true,
                    bargainAmount: ""
                },
                leftBtnText: "联系机构",
                rightBtnText: "",
                laba: require("common/img/laba.png"),
                bagBig: require("common/img/bargain-bg1.png"),
                titlebag: require("common/img/bargain-titlebg1.png"),
                bargaincompleteinfo: {
                    // 当前砍价的完成情况
                    notbargaincount: 3, // 还未砍价的人数
                    bargainmoney: 120, // 已经砍价的金额
                    currentmoney: 527 // 单前金额 单前金额
                },
                detail: {
                    actinsfilelist: [],
                    actinsrecruitcount: {},
                    actinsconfigbargain: {}
                }, // 活动数据
                groupmember: [], //当前砍价的数据
                activeSetingImgList: [], //主题图
                activeRuleImgList: [], //课程图
                campanyInfoImgList: [], //机构图
                activeRuleOpened: false,
                type: "",
                templateid: "",
                progressWidth: "0%",
                progressTipsTight: "-55px",
                ruleid: "",
                activityshareid: "",
                messages: [
                    "拔刀相助，在所不辞",
                    "不好意思，下次多用点力",
                    "砍价不留名，请叫我雷锋",
                    "这一刀，砍的漂亮",
                    "真兄弟，太给力了",
                    "如来一刀，砍砍砍"
                ],
                scrollData:0,
            };
        },
        computed: {
            ...Vuex.mapGetters([
                "getComputedH",
                "getComputedM",
                "getComputedD",
                "getComputedS"
            ]),
            ...Vuex.mapState(["userInfo"]),
            renderData() {
                return {
                    scrollData: this.scrollData,
                    detail: this.detail,
                    groupmember: this.groupmember,
                    activeSetingImgList: this.activeSetingImgList,
                    activeRuleImgList: this.activeRuleImgList,
                    campanyInfoImgList: this.campanyInfoImgList
                };
            }
        },
        methods: {
            ...Vuex.mapMutations(["setEndTime"]),
            imgLoad(){
                this.scrollData++;
            },
            previewImg(img, type) {
                let current =
                        img.localId ||
                        app.tool.getAbsUrl(img.FilePath || img.filepath),
                    urls = this[type].map(img => {
                        return (
                            img.localId ||
                            app.tool.getAbsUrl(img.FilePath || img.filepath)
                        );
                    });
                app.sdk.previewImage({
                    current: current,
                    urls: urls
                });
            },
            bargainClick() {
                this.showSucess = false;
                this.canyu();
            },
            openActiveRuleOpened() {
                this.activeRuleOpened = true;
            },
            closeBargainOpend() {
                this.bargainOpend = false;
                this.getUserDetail("resetData");
            },
            toLook() {
                if (this.bargainData.isme) {
                    this.shardClick();
                } else {
                    this.canyu();
                }
            },
            joinactivity() {
                app.baoMingAction().then(res => {
                    if (res.action) {
                        let tel = res.tel;
                        let name = res.name;
                        joinactivity({
                            activityshareid: this.$route.query.id,
                            name: name,
                            phone: tel
                        }).then(res => {
                            if (res.result.code == 200) {
                                this.ruleid = res.id;
                                this.helpvargainactivityshare();
                            } else {
                                app.toast("error", res.result.msg);
                            }
                        });
                    } else {
                    }
                });
            },
            canyu() {
                if (this.detail.isfull == 1) {
                    app.alert("此活动已售罄");
                    return;
                }
                this.joinactivity();
                if (!this.userInfo.smstel) {
                    //判断没有手机号码
                    wx.miniProgram.navigateTo({
                        url:
                            `/pages/authphone/authphone?url=` +
                            encodeURIComponent(location.href),
                        success: function() {},
                        fail: function() {
                            app.alert("跳转失败，请刷新页面重试。");
                        }
                    });
                }
            },
            shardClick() {
                //用户端才能点击去分享
                if (this.isUser) {
                    let styleStr =
                            "styleid=" + encodeURIComponent(this.$route.params.id),
                        shareidStr =
                            "shareid=" + encodeURIComponent(this.$route.query.id),
                        idStr = "id=" + encodeURIComponent(this.detail.id),
                        activitytypeStr =
                            "activitytype=" +
                            encodeURIComponent(this.detail.activitytype),
                        templateStr =
                            "templateid=" +
                            encodeURIComponent(this.detail.acttmpid);
                    let ruleid = "ruleid=" + encodeURIComponent(this.ruleid);
                    let url = `/pages/share/share?${styleStr}&${shareidStr}&${idStr}&${activitytypeStr}&${templateStr}`;
                    if (
                        this.ruleid != undefined &&
                        this.ruleid != "" &&
                        this.ruleid != "undefined"
                    ) {
                        url += `&${ruleid}`;
                    }
                    wx.miniProgram.navigateTo({
                        url: url,
                        success: function() {},
                        fail: function() {
                            app.alert("跳转失败，请刷新页面重试。");
                        }
                    });
                }
            },
            helpvargainactivityshare() {
                helpvargainactivityshare({
                    activityshareid: this.activityshareid,
                    ruleid: this.ruleid,
                    entermessage: this.messages[
                        parseInt(
                            Math.random() * (this.messages.length - 1 - 0 + 1) + 0,
                            10
                        )
                    ]
                }).then(res => {
                    if (res.result.code == 200) {
                        this.getUserDetail("resetData");
                        this.bargainOpend = true;
                        this.bargainData.isme = true;
                        this.bargainData.bargainAmount = res.money;
                    } else {
                        app.toast("error", res.result.msg);
                    }
                });
            },
            leftClick() {
                if (this.leftBtnText == "我要参与") {
                    this.canyu();
                }
            },
            rightClick() {
                if (this.rightBtnText == "发起砍价") {
                    this.canyu();
                } else if (this.rightBtnText == "帮TA砍一刀") {
                    helpvargainactivityshare({
                        activityshareid: this.activityshareid,
                        ruleid: this.ruleid,
                        entermessage: this.messages[
                            parseInt(
                                Math.random() * (this.messages.length - 1 - 0 + 1) +
                                    0,
                                10
                            )
                        ]
                    }).then(res => {
                        if (res.result.code == 200) {
                            this.getUserDetail();
                            this.bargainOpend = true;
                            this.bargainData.isme = false;
                            this.bargainData.bargainAmount = res.money;
                        } else {
                            app.toast("error", res.result.msg);
                        }
                    });
                } else if (this.rightBtnText == "邀请好友帮你砍价") {
                    this.shardClick();
                } else if (this.rightBtnText == "先砍一刀") {
                    this.helpvargainactivityshare();
                }
            },
            addMyActive() {
                if (this.type == "add") {
                    this.$router.push({
                        path: `/templateEdit/${this.$route.params.id}`,
                        query: { type: this.type, templateid: this.templateid }
                    });
                } else if (this.type == "preview" || this.type == "managepreview") {
                    this.$router.back();
                    app.event.emit("stopSetInterval");
                }
            },
            setTip() {
                this.$nextTick(() => {
                    let imgBox = this.$refs.scrollBars.$el;
                    let imgs = imgBox.querySelectorAll("img");
                    Array.prototype.forEach.call(imgs, (img, index) => {
                        img.addEventListener("load", () => {
                            setTimeout(() => {
                                this.$refs.scrollBars.refresh();
                            }, 100);
                        });
                    });
                    if (
                        this.ruleid != undefined &&
                        this.ruleid != "" &&
                        this.ruleid != "undefined"
                    ) {
                        let progressWidth = Math.floor(
                            this.bargaincompleteinfo.bargainmoney /
                                (this.detail.actinsconfigbargain.originalprice -
                                    this.detail.actinsconfigbargain.floorprice) *
                                100
                        );
                        // let curwid = Math.floor( (this.$refs.progressBox.clientWidth - this.$refs.progressTips.clientWidth) / this.$refs.progressBox.clientWidth * 100) - 1; // 可以移动百分比 -1 是因为空格的原因，实际宽度并没有算上空格
                        let proWidth = Math.ceil(
                            progressWidth / 100 * this.$refs.progressBox.clientWidth
                        ); // 计算进度条的实际宽度
                        let curwid = 100;
                        // console.log(this.$refs.progressBox.clientWidth - this.$refs.progressTips.clientWidth);
                        let yiban = Math.floor(
                            this.$refs.progressTips.clientWidth /
                                2 /
                                this.$refs.progressBox.clientWidth *
                                100
                        ); // 自身一半百分比
                        let quanbu = Math.floor(
                            this.$refs.progressTips.clientWidth /
                                this.$refs.progressBox.clientWidth *
                                100
                        ); // 自身百分比
                        let jindutiaoyiban = Math.floor(
                            proWidth / 2 / this.$refs.progressBox.clientWidth * 100
                        );
                        let topbaifenbi =
                            Math.floor(
                                proWidth / this.$refs.progressTips.clientWidth * 100
                            ) / 100;
                        //  如果进度条 所剩余宽度 小于 浮动条的 宽度，那么浮动条要永远在最后
                        if (
                            this.$refs.progressBox.clientWidth - proWidth <=
                            this.$refs.progressTips.clientWidth / 2
                        ) {
                            this.progressTipsTight = quanbu + "%"; // quanbu 是因为自身transfrom了自身100%，所以只能移动这么多的100%
                        } else {
                            // 如果进度条宽度和浮动条的比例大于了1，那么就浮动条就可以移动到他的上面一半，否则就占进度条一半
                            if (topbaifenbi > 1) {
                                this.progressTipsTight =
                                    curwid - progressWidth + yiban + "%";
                            } else {
                                this.progressTipsTight =
                                    curwid - progressWidth + jindutiaoyiban + "%";
                            }
                        }
                        this.progressWidth =
                            (progressWidth > 100 ? 100 : progressWidth) + "%";
                    }
                });
            },
            getUserDetail(resetType) { //详情
                let list = [];
                let getDetail = getsharedetail({
                    shareid: this.activityshareid,
                    ruleid:
                        this.ruleid != undefined &&
                        this.ruleid != "" &&
                        this.ruleid != "undefined"
                            ? this.ruleid
                            : ""
                });
                list.push(getDetail);
                let gethelpbargainactivity = {};
                let getbargaincomplete = {};
                if (
                    this.ruleid != undefined &&
                    this.ruleid != "" &&
                    this.ruleid != "undefined"
                ) {
                    gethelpbargainactivity = gethelpbargainactivityshare({
                        activityshareid: this.activityshareid,
                        ruleid: this.ruleid
                    });
                    list.push(gethelpbargainactivity);
                    getbargaincomplete = getbargaincompleteinfo({
                        activityshareid: this.activityshareid,
                        ruleid: this.ruleid
                    });
                    list.push(getbargaincomplete);
                }
                this.isLoading = true;
                Promise.all(list).then(res => {
                    this.isLoading = false;
                    if (res[1] && res[1].result.code == 200) {
                        this.groupmember = res[1].data;
                    }
                    if (res[2] && res[2].result.code == 200) {
                        this.bargaincompleteinfo = res[2].data;
                    }
                    if (res[0].result.code == 200) {
                        this.detail = res[0].data;
                        this.leftBtnText = "联系机构";
                        this.$emit("loadDataComplete", {
                            name: this.detail.title
                        });
                        if (this.detail.isbargained == 0) {
                            // 没有砍价
                            if (this.detail.isjoin == 0) {
                                // 没有参加
                                if (
                                    this.ruleid != undefined &&
                                    this.ruleid != "" &&
                                    this.ruleid != "undefined"
                                ) {
                                    // 是否帮别人砍
                                    this.rightBtnText = "帮TA砍一刀";

                                    this.leftBtnText = "我要参与";
                                } else {
                                    // 自己砍
                                    this.rightBtnText = "发起砍价";
                                    if (this.detail.isfull == 1) {
                                        this.rightBtnText = "已售罄";
                                    }
                                }
                            } else {
                                // 自己参与了，但是没有砍价
                                if (this.detail.ismine == 1) {
                                    this.rightBtnText = "先砍一刀";
                                } else {
                                    // 自己参与了，但是帮好友砍价
                                    this.rightBtnText = "帮TA砍一刀";
                                }
                            }
                        } else if (this.detail.isbargained == 1) {
                            // 已经砍价了 isbargained =1
                            if (this.detail.isjoin == 0) {
                                // 但是没有参与，说明帮别人砍价的
                                if (
                                    this.ruleid != undefined &&
                                    this.ruleid != "" &&
                                    this.ruleid != "undefined"
                                ) {
                                    this.rightBtnText = "已砍价";
                                    this.leftBtnText = "我要参与";
                                    if (resetType == "created") {
                                        this.showSucess = true;
                                    }
                                } else {
                                    // this.rightBtnText = "有问题";
                                }
                            } else if (this.detail.isjoin == 1) {
                                if (this.bargaincompleteinfo.notbargaincount == 0) {
                                    this.rightBtnText = "已完成";
                                } else {
                                    this.rightBtnText = "邀请好友帮你砍价";
                                }
                            } else {
                            }
                        }
                        if (this.detail.isexpire == 1) {
                            this.leftBtnText = "联系机构";
                            this.rightBtnText = "已结束";
                        }
                        // 主题图
                        this.activeSetingImgList = this.detail.actinsfilelist.filter(
                            item => item.type == 10
                        );
                        // 产品图
                        this.activeRuleImgList = this.detail.actinsfilelist.filter(
                            item => item.type == 20
                        );
                        // 机构图
                        this.campanyInfoImgList = this.detail.actinsfilelist.filter(
                            item => item.type == 30
                        );

                        this.setTip();
                        this.setEndTime(this.detail.expiretime);
                        app.event.emit("startSetInterval");
                    } else {
                        app.toast("error", res[0].result.msg);
                    }
                    if (res[2] && res[2].result.code == 200) {
                        if (this.bargaincompleteinfo.notbargaincount == 0) {
                            this.rightBtnText = "已完成";
                        }
                    }
                    if (
                        this.grant == "phone" &&
                        resetType != "resetData" &&
                        this.detail.isjoin == 0
                    ) {
                        this.canyu();
                    }
                    this.$nextTick(() => {
                        let imgBox = this.$refs.scrollBars.$el;
                        let imgs = imgBox.querySelectorAll("img");
                        Array.prototype.forEach.call(imgs, (img, index) => {
                            img.addEventListener("load", () => {
                                setTimeout(() => {
                                    this.$refs.scrollBars.refresh();
                                }, 100);
                            });
                        });
                    });
                });
            },
            watchMore() {
                if (this.isUser) {
                    app.watchMore({
                        type: 'bargain',
                        title: '好友砍价榜',
                        list: this.groupmember
                    })
                }
            }
        },
        created() {
            this.type = this.$route.query.type;
            this.templateid = this.$route.query.templateid;
            this.grant = this.$route.query.grant;

            if (this.type == "add") { //新增
                let gettemplateinfoPro = gettemplateinfo({
                        styleid: this.$route.params.id
                    }),
                    gettemplatehelpbargainsharePro = gettemplatehelpbargainshare({
                        styleid: this.$route.params.id
                    });

                this.isLoading = true;
                Promise.all([gettemplateinfoPro,gettemplatehelpbargainsharePro]).then(res => {
                    this.isLoading = false;
                    if (res[0].result.code == 200) { //模板数据
                        this.detail = res[0].data;
                        // 模板主题图
                        this.activeSetingImgList = this.detail.actinsfilelist.filter(
                            item => item.type == 10
                        );
                        // 模板产品图
                        this.activeRuleImgList = this.detail.actinsfilelist.filter(
                            item => item.type == 20
                        );
                        // 模板机构图
                        this.campanyInfoImgList = this.detail.actinsfilelist.filter(
                            item => item.type == 30
                        );
                        // 这个是机构信息
                    }else {
                        app.toast('error',res[0].result.msg)
                    }
                    if (res[1].result.code == 200) { //当前助力砍价用户列表
                        this.groupmember = res[1].data;
                    }else {
                        app.toast('error',res[1].result.msg)
                    }
                })
            } else if (this.type == "preview") { //管理端预览
                this.isLoading = true;
                gettemplatehelpbargainshare({
                    styleid: this.$route.params.id
                }).then(res=>{
                    this.isLoading = false;
                    if(res.result.code == 200){
                        //  当前助力砍价用户列表
                        this.groupmember = res.data;
                        // 预览
                        app.event.emit("startSetInterval");
                        this.detail = Window.previweData;
                        // 模板主题图
                        this.activeSetingImgList = this.detail.actinsfilelist.filter(
                            item => item.type == 10
                        );
                        // 模板产品图
                        this.activeRuleImgList = this.detail.actinsfilelist.filter(
                            item => item.type == 20
                        );
                        // 模板机构图
                        this.campanyInfoImgList = this.detail.actinsfilelist.filter(
                            item => item.type == 30
                        );
                    }else {
                        app.toast('error',res.result.msg)
                    }
                })
            } else if (this.type == "managepreview") { //管理端详情
                let getactinsdetailPro = getactinsdetail({
                        actinsid: this.$route.query.id
                    }),
                    gettemplatehelpbargainsharePro = gettemplatehelpbargainshare({
                        styleid: this.$route.params.id
                    });
                
                this.isLoading = true;
                Promise.all([getactinsdetailPro,gettemplatehelpbargainsharePro]).then(res => {
                    this.isLoading = false;
                    if (res[0].result.code == 200) {
                        this.detail = res[0].data;
                        // 主题图
                        this.activeSetingImgList = this.detail.actinsfilelist.filter(
                            item => item.type == 10
                        );
                        // 产品图
                        this.activeRuleImgList = this.detail.actinsfilelist.filter(
                            item => item.type == 20
                        );
                        // 机构图
                        this.campanyInfoImgList = this.detail.actinsfilelist.filter(
                            item => item.type == 30
                        );
                        this.setEndTime(this.detail.expiretime);
                        app.event.emit("startSetInterval");
                    } else {
                        app.toast("error", res[0].result.msg);
                    }
                    if(res[1].result.code == 200){//当前助力砍价用户列表
                        this.groupmember = res[1].data;
                    }else {
                        app.toast("error", res[1].result.msg);
                    }
                });
            } else {
                this.ruleid = this.$route.query.ruleid
                    ? this.$route.query.ruleid
                    : "";
                this.activityshareid = this.$route.query.id;
                this.isUser = true;
                if (
                    this.ruleid != undefined &&
                    this.ruleid != "" &&
                    this.ruleid != "undefined"
                ) {
                    this.getUserDetail("created");
                } else {
                    getsharedetail({
                        shareid: this.activityshareid
                    }).then(res => {
                        if (res.result.code == 200) {
                            if (res.data.ruleid) {
                                this.ruleid = res.data.ruleid;
                            }
                            this.getUserDetail("created");
                        } else {
                            app.toast("error", res.result.msg);
                        }
                    });
                }
            }
            this.$nextTick(() => {
                let imgBox = this.$refs.scrollBars.$el;
                let imgs = imgBox.querySelectorAll("img");
                Array.prototype.forEach.call(imgs, (img, index) => {
                    img.addEventListener("load", () => {
                        setTimeout(() => {
                            this.$refs.scrollBars.refresh();
                        }, 100);
                    });
                });
            });
        },
        components: {
            activeRule,
            bargainBox,
            EnrollSucess
        }
    };
</script>