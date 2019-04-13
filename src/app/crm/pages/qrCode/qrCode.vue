<style scoped lang="scss">
    .wrapper {
        overflow-y: auto;
        @include position-absolute;
        background-color: #4B77AF;
        padding: 27px 20px 20px 20px;
        @include flex-center;
        .qrcode {
            width: 100%;
            background-color: $color-white;
            border-radius: 6px;
            padding: 30px 28px;
            .title {
                font-size: 15px;
                color: $color-9;
                text-align: center;
            }
            .code {
                width: 100%;
                height: 0;
                padding-top: 100%;
                margin: 24px auto;
                position: relative;
                .img {
                    @include position-absolute;
                    width: 100%;
                }
            }
            .share {
                height: 46px;
                line-height: 46px;
                text-align: center;
                font-size: 17px;
                color: #895B1F;
                border-radius: 4px;
                background: linear-gradient(bottom, #FEDC44, #FEDC43);
            }
            .rewrite {
                margin-top: 16px;
                font-size: 14px;
                color: $color-9;
                text-align: center;
            }
        }
        .no-qrCode {
            background-color: $color-white;
            @include position-absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .img {
                width: 206px;
                height: 206px;
                background-color: $color-assist-1;
                background: url('./img/c002.png') center center;
            }
            .text {
                margin-top: 17px;
                font-size: 15px;
                color: $color-9;
                text-align: center;
            }
            .btn-wrapper {
                margin-top: 38px;
                width: 100%;
                height: 42px;
                padding: 0 59px;
                .btn {
                    height: 42px;
                    line-height: 42px;
                    width: 100%;
                    border-radius: 21px;
                    background-color: $color-primary;
                    text-align: center;
                    font-size: 16px;
                    color: $color-white;
                }
            }
        }
    }
</style>

<template>
    <div class="wrapper">
        <div class="qrcode" v-if="hasQrcode">
            <div class="title">客户通过扫描二维码完成资料录入</div>
            <div class="code">
                <img class="img" 
                    :src="myInfo.qrcodeurl">
                    <!-- @click="previewQRcode('https://smarttest.xiaogj.com/wx.do?appid=2&action=getqrcode')"> -->
            </div>
            <div class="share" @click="share">分享</div>
            <router-link tag="div" to="/configQrCode/2" class="rewrite">重新填写配置信息
                <svg aria-hidden="true" class="icon">
                    <use xlink:href="#icon-jiantou"></use>
                </svg>
            </router-link>
        </div>
        <div class="no-qrCode" v-if="!hasQrcode">
            <div class="img">
                
            </div>
            <div class="text">你的二维码不见了</div>
            <router-link tag="div" to="/configQrCode/1" class="btn-wrapper">
                <div class="btn">创建招生二维码</div>
            </router-link>
        </div>
        <confirm :opened.sync="showConfirm" ></confirm>
    </div>
</template>

<script>
    import {getQrcode} from 'crm/api/yy.js'
    import logo from './img/share.png'
    import Confirm from './child/confirm.vue'

    export default {
        mixins: [app.mixin.shareMixin],
        data() {
            return {
                wxTitle: '二维码招生',
                showConfirm: false
            }
        },
        computed: {
            ...Vuex.mapState(['myInfo']),
            hasQrcode() {
                return this.myInfo.isconfigqrcode
            },
            qrcodeurl() {
                return this.myInfo.qrcodeurl
            }
        },
        methods: {
            getAbsoluteUrl(url) {
                var img = document.createElement("img")
                img.src = url
                return img.src;
            },
            previewQRcode(url) {
                app.sdk.previewImage({
                    current: url,
                    urls: [url]
                })
            },
            getShareOptions() {
                var link = `${location.protocol}//${location.host}/winxin/crm/share.html?companyid=${this.myInfo.companyid}#/studentsQrcode?companyid=${this.myInfo.companyid}&id=${this.myInfo.qrcodeid}`

                return {
                    title: '快速报名', // 分享标题
                    desc: link, // 分享描述
                    link: link, // 分享链接
                    imgUrl: this.getAbsoluteUrl(logo) // 分享封面
                }
            },
            // 点击分享按钮进行分享
            share() {
                // app.workwxShare(this.getShareOptions())
                // app.toast('info', '点击右上角分享按钮进行分享')
                this.showConfirm = true
            }
        },
        mounted() {
            if (this.hasQrcode === 1) {
                this.v_shareResolve(this.getShareOptions())
            }
        },
        components: {
            Confirm
        }
    }
</script>