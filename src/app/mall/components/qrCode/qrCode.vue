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
            @include position-absolute(false, 42px, false, 42px);
            height: 355px;
            top: 50%;
            margin-top: -150px;
            background-color: $color-white;
            border-radius: 10px;
            .qrcode {
                position: relative;
                .icon-wrapper {
                    position: absolute;
                    width: 100px;
                    height: 100px;
                    line-height: 100px;
                    text-align: center;
                    font-size: 100px;
                    border-radius: 50%;
                    background-color: #69E49B;
                    top: -50px;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .void {
                    height: 50px;
                }
                .header {
                    text-align: center;
                    margin-top: 12px;
                    font-size: 16px;
                    color: #69E49B;
                }
                .code-wrapper {
                    margin-top: 20px;
                    height: 170px;
                    position: relative;
                    .code {
                        position: absolute;
                        width: 170px;
                        height: 170px;
                        left: 50%;
                        transform: translateX(-50%);
                        @include background-img(false, cover);
                    }
                }
                .text {
                    padding: 0 33px;
                    margin-top: 17px;
                    text-align: center;
                    font-size: 12px;
                    color: $color-6;
                }
            }
        }
        .close {
            width: 17px;
            height: 17px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 50px;
            .icon {
                color: $color-white;
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
                <div class="as-mask"></div>
                <div class="as-box center middle">
                    <div class="qrcode">
                        <div class="icon-wrapper">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-gou"></use>
                            </svg>
                        </div>
                        <div class="void"></div>
                        <div class="header">交易成功</div>
                        <!-- <div class="code" ref="qrcode"></div> -->
                        <div class="code-wrapper">
                            <!-- <div class="code" ref="qrcode"></div> -->
                            <img class="code" :src="qrUrl"/>
                        </div>
                        <div class="text">长按识别图中二维码,关注学校公众号可随时查看订单</div>
                    </div>
                </div>
                <div class="close" @click="$emit('close')">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-guanbi2"></use>
                    </svg>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    // import QRCode from 'assets/js/vendor/qrcode.min.js'
     
    // import {app.mixin.popupWindowRouteMixin} from 'assets/js/app/mixin'
    export default {
        // mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean
            },
            qrUrl: { //二维码地址
                type: String
            }
        },
        computed: {

        },
        data() {
            return {
                maskClicked: false,
               
            }
        },
        methods: {
          
        },
        watch: {
            
        },
        mounted() {
            
        }
    }
</script>