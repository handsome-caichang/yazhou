<!-- 基于vux封装的日历插件 -->
<style lang="scss">
    .workwx-share {
        @include position-absolute;
        z-index: 9999990;
        .list {
            display: flex;
            width: 100%;
            height: 139px;
            background-color: #F2F2F2;
            align-items: center;
            padding: 0 10px;
            .btn-box {
                text-align: center;
                padding: 0 12px;
                .block {
                    width: 54px;
                    height: 54px;
                    position: relative;
                    border: 1px solid #E7E7E7;
                    border-radius: 8px;
                    background-color: #FFF;
                    .icon {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 30px;
                        height: 30px;
                        margin-top: -15px;
                        margin-left: -15px;
                    }
                }
                .text {
                    line-height: 28px;
                    font-size: 12px;
                    color: #999;
                }
            }
        }
        .footer{
            height: 49px;
            line-height: 49px;
            text-align: center;
            font-size: 16px;
            color: #333;
            background-color: #FFF;
        }
    }

</style>

<template>
    <action-sheet class="workwx-share" v-show="opened" @close="close">
        <div class="list">
            <!-- 选择并发送图片按钮 -->
            <div class="btn-box" @click="shareToWechat">
                <div class="block">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-weixin"></use>
                    </svg>
                </div>
                <span class="text">微信</span>
            </div>

            <div class="btn-box" @click="shareToAppMessage">
                <div class="block">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zhuanfa"></use>
                    </svg>
                </div>
                <span class="text">转发</span>
            </div>
        </div>

        <div class="footer" slot="footer" @click="close">取消</div>
    </action-sheet>
</template>

<script>
    export default {
        name: 'workwx-share',
        mixins: [app.mixin.popupWindowRouteMixin],
        data() {
            return {
                // opened: false,//页面开关
                opened: false,//页面开关
                shareOptions: {
                    title: '', // 分享标题
                    desc: '', // 分享描述
                    link: '', // 分享链接
                    imgUrl: '' // 分享封面
                }
            }
        },
        methods: {
            show(options) {
                this.opened = true
                this.shareOptions = options

                console.log(options);
            },
            shareToWechat() {
                /*wx.invoke("onMenuShareTimeline", 
                    this.shareOptions, 
                    function(res) {
                        if (res.err_msg == "shareWechatMessage:ok") {
                    }
                });*/
                wx.onMenuShareTimeline({
                    title: '111', // 分享标题
                    link: '222', // 分享链接，该链接域名必须与当前企业的可信域名一致
                    imgUrl: '333', // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                this.close()
            },
            shareToAppMessage() {
                wx.invoke("shareAppMessage",
                    this.shareOptions, 
                    function(res) {
                        if (res.err_msg == "shareWechatMessage:ok") {
                    }
                });
                this.close()
            }
        },
        components: {
        }
    }
</script>