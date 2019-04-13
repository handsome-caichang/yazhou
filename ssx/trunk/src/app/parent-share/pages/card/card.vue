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
    <div class="bottom" v-if="initData.buttonStyle && initData.buttonStyle.btnText" :style="{backgroundColor: initData.buttonStyle && initData.buttonStyle.btnBckColor}" @click="toRegister">{{initData.buttonStyle && initData.buttonStyle.btnText}}</div>
</div>
</template>

<script>
import {
    getCardDetail
} from "parentShare/api/share.js";
export default {
    name: "card",
    mixins: [app.mixin.shareMixin],
    data() {
        return {
            wxTitle: "电子推荐卡",
            initData: {
                imgData: {}
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
        toRegister() {
            if (this.cardId && this.recommendcardId && this.companyID) {
                this.$router.push({
                    path: "cardRegister",
                    query: {
                        cardId: this.cardId,
                        companyID: this.companyID,
                        wxTitle: this.wxTitle
                    }
                });
            }
        },
        clickItem(item) {
            if (item.LinkType == "1") {
                if (this.cardId && this.recommendcardId && this.companyID) {
                    this.$router.push({
                        path: "cardRegister",
                        query: {
                            cardId: this.cardId,
                            companyID: this.companyID,
                            wxTitle: this.wxTitle
                        }
                    });
                }
            } else if (item.LinkType == "2") {
                if (item.Link) {
                    location.href = `${item.Link.indexOf('http') < 0 ? 'https://' : ''}${item.Link}`;
                }
            } else {}
        },
        handlerDetail() {
            const self = this;
            this.v_shareResolve({
                title: this.detail.Name,
                desc: this.detail.Describe,
                link: `${location.href}`,
                imgUrl: `${this.detail.LogoPath.indexOf('http') < 0 ? 'https:' : ''}${this.detail.LogoPath}`,
            });
        },
        getDetail() {
            getCardDetail({
                pname: "getrecommendcard",
                id: this.recommendcardId
            }).then(res => {
                if (res.errcode == app.errok) {
                    this.detail = res.data.CardInfo;
                    let initData = JSON.parse(res.data.CardInfo.Template).initData;
                    this.initData = Object.assign(this.initData, initData);
                    this.imgList = this.initData.imgData.list;
                    this.wxTitle = this.detail.Title;
                    app.tool.setDocTitle(this.wxTitle);
                    if (res.data.EnableRecommendCard == '1') {
                        if (this.cardId && this.detail.StatusName != "使用中") {
                            if (this.detail.StatusName == "已到期") {
                                app.alert("活动已结束，谢谢您的关注！").then(res => {
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
                        if (this.recommendcardId) {
                            this.handlerDetail();
                        }
                    }else {
                        app.alert("活动已结束，谢谢您的关注！").then(res => {
                            WeixinJSBridge && WeixinJSBridge.call("closeWindow");
                        });
                    }
                }
            });
        }
    },
    components: {}
};
</script>
