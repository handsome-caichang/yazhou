/* 上课点评分享 */

<style lang="scss" scoped>
.comment-share {
    @include position-absolute;
    overflow: hidden;
    bottom: 50px;

    .a-item {
        display: block;
    }

    .img-item {
        width: 100%;
    }
}

.bottom {
    @include position-absolute(false, 0, 0, 0);
    position: absolute !important;
    z-index: 11;
    width: 100%;
    bottom: 0;
    height: 50px;
    font-size: 18px;
    font-weight: 400;
    color: #fff;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
}
.share{
    @include position-absolute;
    z-index: 99999;
    .share-shadow{
        @include position-absolute;
        background-color: #000000;
        opacity: 0.7;
        z-index: 2;
    }
    .share-box{
        @include position-absolute;
        z-index: 3;
        .finger{
            text-align: right;
            font-size: 36px;
            padding-right: 15px;
            padding-top: 5px;
        }
        .content{
            display: flex;
            flex-direction:row-reverse;
            .describe{
                height: 44px;
                line-height: 44px;
                background-color: $color-primary;
                border-radius: 44px;
                font-size: 15px;
                color: $color-white;
                width: 150px;
                text-align: center;
                margin-right: 10px;
                margin-top: 5px;
            }

        }
    }
}
</style>
<template>
<div>
    <scroller-base class="comment-share" :data="renderData" ref="ShareFrame">
        <ul>
            <li class="li-item" v-for="(item, index) in imgList" :key="index" :style="{marginBottom: initData.imgData.margin + 'px'}">
                <img @click="clickItem(item)" class="a-item img-item" :src="item.Address" alt="" />
            </li>
        </ul>
    </scroller-base>
    <div class="bottom" v-if="initData.buttonStyle && initData.buttonStyle.btnText" :style="{backgroundColor: initData.buttonStyle && initData.buttonStyle.btnBckColor}" @click="toRegister">{{isoldstudent?'立即分享':initData.buttonStyle && initData.buttonStyle.btnText}}</div>
    <coupon-box :opened.sync="openCard" :coupon="coupon" @close="closeCard" @toLook="toLook">
    </coupon-box>
    <div class="share" v-show="showShare" @click="closeShareBox">
        <div class="share-shadow"></div>
        <div class="share-box">
            <div class="finger">
                <svg aria-hidden="true" class="icon">
                    <use xlink:href="#icon-zhixiang"></use>
                </svg>
            </div>
            <div class="content">
                <div class="describe">点击此处完成分享</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    getCardDetail
} from "parentShare/api/share.js";
import couponBox from "./child/coupon-box.vue";
export default {
    name: "card",
    mixins: [app.mixin.shareMixin],
    data() {
        return {
            wxTitle: "电子推荐卡",
            isoldstudent:false,//新老师判断
            openCard: false,
            showShare:false,//分享引导遮罩
            initData: {
                imgData: {}
            },
            coupon: {
                Name: "",
                CouponAmount: "",
                Lifecycle: "",
                Condition: "",
            },
            imgList: [],
            cardId: "", //  转发生成的id
            recommendcardId: "", // 电子推荐卡id
            companyID: "", //  公司id
            detail: {
                // Describe: "中秋佳节",
                // ID: "38f0abd3-d7f4-4a1f-8adc-3ad4b7199f2b",
                // LogoPath: "//cdn0l.Xiaogj.com/file/02f7ff5c926b4a97a903f7026bbde3c6/201809/8d79e905e6ad46cc8c5218e620fdl884.png",
                // Name: "中秋佳节大放送",
                // Title: "电子推荐卡阿什顿发",
                // Status: 2,
                // StatusName: "进行中", // 已到期 进行中
                // Template: ""
            }
        };
    },
    computed: {
        renderData() {
            return this.imgList;
        }
    },
    created() {
        this.userid = this.$route.query.UserId?this.$route.query.UserId:""
        this.recommendcardId = this.$route.query.recommendcardId ?
            this.$route.query.recommendcardId :
            "";
        this.cardId = this.$route.query.cardId ? this.$route.query.cardId : "";
        this.companyID = this.$route.query.companyID ?
            this.$route.query.companyID :
            "";
        if (this.cardId) {
            getCardDetail({ // 统计页面预览次数
                pname: "pageview",
                id: this.cardId
            }).then(res => {
                console.log(res);
            })
            this.getDetail();
        }else {
            this.getDetail();
        }
        
    },
    mounted() {},
    methods: {
        closeShareBox(){
            this.showShare = false;
        },
        closeCard() {
            this.openCard = false;
        },
        toLook() {
            this.openCard = false;
            this.$router.push({
                path: "cardRegister",
                query: {
                    cardId: this.cardId,
                    companyID: this.companyID,
                    wxTitle: this.wxTitle
                }
            });
        },
        toRegister() {
            //如果判断是老生，则不是显示“报名领取”按钮，而是“立即分享”按钮，点击之后是提示分享；
            if(this.isoldstudent){
                this.showShare = true;
                return
            }
            
            if (this.cardId && this.recommendcardId && this.companyID) {
                this.openCard = true;
                // this.$router.push({
                //     path: "cardRegister",
                //     query: {
                //         cardId: this.cardId,
                //         companyID: this.companyID,
                //         wxTitle: this.wxTitle
                //     }
                // });
            }
        },
        clickItem(item) {
            if (item.LinkType == "1") {
                if (this.cardId && this.recommendcardId && this.companyID) {
                    this.openCard = true;
                    // this.$router.push({
                    //     path: "cardRegister",
                    //     query: {
                    //         cardId: this.cardId,
                    //         companyID: this.companyID,
                    //         wxTitle: this.wxTitle
                    //     }
                    // });
                }
            } else if (item.LinkType == "2") {
                if (item.Link) {
                    location.href = `${item.Link.indexOf('http') < 0 ? 'https://' : ''}${item.Link}`;
                }
            } else {}
        },
        handlerDetail() {
            getCardDetail({ // 获取分享链接
                pname: "getrecommendcardshareurl",
                companyid: this.companyID,
                recommendcardid:this.recommendcardId,
                cardid:this.cardId
            }).then(res => {
                if(res.errcode == app.errok){
                    this.v_shareResolve({
                        title: this.detail.Title,
                        desc: this.detail.Describe,
                        link: res.data,//后台返回地址
                        imgUrl: `${this.detail.LogoPath.indexOf('http') < 0 ? 'https:' : ''}${this.detail.LogoPath}`,
                    });
                }else{
                    app.toast(res.errmsg)
                }
            })
            
        },
        getDetail() {
            getCardDetail({
                pname: "getrecommendcard",
                id: this.recommendcardId,
                userid:this.userid,
            }).then(res => {
                 console.log(res);
                if (res.errcode == app.errok) {
                    this.isoldstudent = res.data.IsOldStudent;
                    this.detail = res.data.CardInfo;
                    let initData = JSON.parse(res.data.CardInfo.Template).initData;
                    this.initData = Object.assign(this.initData, initData);
                    this.imgList = this.initData.imgData.list;
                    this.wxTitle = this.detail.Title;
                    app.tool.setDocTitle(this.wxTitle);

                    this.coupon.Name =  this.detail.Title;
                    this.coupon.CouponAmount = this.detail.UseReduceMoney;
                    this.coupon.Lifecycle = this.detail.UseEndDate.indexOf('2099') != -1 ? '永久有效' : app.filters.formatDatetime(this.detail.UseStartDate,'yyyy-MM-dd') + ' 至 ' + app.filters.formatDatetime(this.detail.UseEndDate,'yyyy-MM-dd');

                    if (this.cardId && this.detail.StatusName != "使用中") {
                        if (this.detail.StatusName == "已到期") {
                            app.alert("活动已结束，谢谢您的关注！").then(res => {
                                WeixinJSBridge && WeixinJSBridge.call("closeWindow");
                            });
                        } else if(this.detail.StatusName == "未开始"){
                            app.alert("活动还未开始，请在活动开始后再来领取！").then(res => {
                                WeixinJSBridge && WeixinJSBridge.call("closeWindow");
                            });
                        } else {
                            app.alert("您下手太慢了，电子卡券已被领取了！").then(res => {
                                WeixinJSBridge && WeixinJSBridge.call("closeWindow");
                            });
                        }
                    }else {
                        if(this.cardId) {
                            getCardDetail({ // 统计页面预览次数
                                pname: "checkcardusecount",
                                id: this.cardId
                            }).then(res => {
                                if (res.errcode == app.errok) {
                                    if (!res.data) {
                                        app.alert("您下手太慢了，电子卡券已被领取了！").then(res => {
                                            WeixinJSBridge && WeixinJSBridge.call("closeWindow");
                                        });
                                    }
                                }
                            })
                        }
                    }
                    this.$nextTick(() => {
                        let imgBox = this.$refs.ShareFrame.$el;
                        let imgs = imgBox.querySelectorAll("img");
                        Array.prototype.forEach.call(imgs, (img, index) => {
                            img.addEventListener("load", () => {
                                setTimeout(() => {
                                    this.$refs.ShareFrame.refresh();
                                }, 10);
                            });
                        });
                    });
                    // 新增companyid的判断。暂用是否有companid 判断是否是pc端预览。
                    if (this.recommendcardId && this.companyID) {
                        this.handlerDetail();
                    }

                }
            });
        }
    },
    components: {
        couponBox
    }
};
</script>
