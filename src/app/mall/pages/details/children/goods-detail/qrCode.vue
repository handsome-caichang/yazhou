<style scoped lang="scss">
    
    
    .actionsheet-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .as-mask {
            width: 100%;
            height: 100%;
            background-color: $color-mask;
        }
        .as-box {
            @include position-absolute(false, 20px, false, 20px);
            height: 300px;
            top: 50%;
            margin-top: -150px;
            background-color: $color-white;
            .qrcode {
                .header {
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    font-size: 16px;
                    border-bottom: 1px solid $color-assist-1;
                }
                .code-wrapper {
                    padding: 10px 10px;
                    .code {
                        position: absolute;
                        left: 50%;
                        width: 220px;
                        margin-left: -110px;
                    }
                }
            }
        }
    }
    // 动画
    .as-anim-enter-active, .as-anim-leave-active {
        transition: all $duration $timing;
        .as-mask {
            opacity: 1;  
            transition: all $duration $timing;
        }
        .as-box {
            transition: all $duration $timing;            
        }
        .as-box.middle.center {
            // transform: translate(0, -50%) scale(1);
            transform-origin: center bottom;
        }
    }

    .as-anim-enter, .as-anim-leave-active {
        .as-mask{
            opacity: 0;
        }
        .as-box.middle.center {
            transform: translate(0, -50%) scale(0.1);
        }
    }
</style>

<template>
    <transition name="as-anim">
        <div class="actionsheet" v-show="opened">
            <div class="actionsheet-wrap">
                <div class="as-mask" @click='close'></div>
                <div class="as-box center middle">
                    <div class="qrcode">
                        <div class="header">商品二维码</div>
                        <div class="code-wrapper">
                            <div class="code" ref="qrcode"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import QRCode from 'assets/js/vendor/qrcode.min.js'
     
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean
            }
        },
        computed: {
            ...Vuex.mapState(['companySuffix', 'companyId', 'userInfo']),
        },
        data() {
            return {
                maskClicked: false
            }
        },
        methods: {
          
        },
        mounted() {
            this.$nextTick(() => {
                let text = `https://open.xgjssx.com/Jump/Page?name=MallSaleQrCode&terminal=1&companyid=${this.companyId}&redirect=${
                    encodeURIComponent(window.location.href+'&saleuid='+this.userInfo.ID)}`
                this.qrcode = new QRCode(this.$refs.qrcode, {
                    text: window.location.href,
                    text: text,
                    width: 220,
                    height: 220,
                    colorDark : '#000000',
                    colorLight : '#ffffff',
                })
            })
        }
    }
</script>