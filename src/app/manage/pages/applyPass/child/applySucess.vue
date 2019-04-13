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
                position: absolute;
                width: 200px;
                height: 185px;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                background-color: $color-white;
                padding: 32px 23px 22px 23px;
                border-radius: 7px;
                .img-wrapper {
                    // width: 200px;
                    .img {
                        margin: 0 auto;
                        width: 62px;
                        height: 71px;
                        @include background-img('../img/succse.png', cover);
                    }
                }
                .text {
                    margin-top: 10px;
                    text-align: center;
                    font-size: 17px;
                    color: $color-3;
                }
                .info {
                    margin-top: 10px;
                    text-align: center;
                    font-style: 14px;
                    color: $color-9;
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
                    <div class="img-wrapper">
                        <div class="img"></div>
                    </div>
                    <div class="text">申请成功</div>
                    <div class="info">请等待客服人员联系您～</div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {

            }
        }
    }
</script>