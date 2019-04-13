<style scoped lang="scss">
.actionsheet-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .as-mask {
        width: 100%;
        height: 100%;
        background-color: $color-mask;
        min-height: 95vh;
    }
    .close-box {
        position: absolute;
        z-index: 1;
        top: -20%;
        right: 0%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 19px;
    }
    .close-btn {
        border: 1px solid #b4b4b4;
        height: 27px;
        width: 27px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 27px;
        .icon {
            width: 10px;
            height: 10px;
            color: #d7d7d7;
        }
    }
    .as-box {
        position: absolute;
        width: 280px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 7px;
        .img {
            width: 280px;
            height: 100%;
        }
        .btn-wrapper {
            position: absolute;
            height: 44px;
            width: 245px;
            // background-color: red;
            left: 50%;
            bottom: 8%;
            transform: translate(-50%, 0);
            display: flex;
            .btn-l,
            .btn-r {
                width: 110px;
                height: 44px;
                text-align: center;
                line-height: 44px;
                border-radius: 22px;
                font-size: 17px;
            }
            .btn-l {
                margin-right: 25px;
                border: 1px solid #fff;
                color: #fff;
            }
            .btn-r {
                color: #b83f00;
                background: linear-gradient(
                    180deg,
                    rgba(255, 232, 88, 1) 0%,
                    rgba(246, 210, 72, 1) 100%
                );
                box-shadow: 0px 1px 5px 0px rgba(174, 0, 0, 0.5);
                border: 1px solid rgba(255, 222, 204, 1);
            }
        }
    }
}
// 动画
.as-anim-enter-active,
.as-anim-leave-active {
    transition: all $duration $timing;
    .as-mask {
        opacity: 1;
        transition: all $duration $timing;
    }
    .as-box {
        transition: all $duration $timing;
    }
    .as-box.middle.center {
        transform: translate(-50%, -50%) scale(1);
        transform-origin: center bottom;
    }
}

.as-anim-enter,
.as-anim-leave-active {
    .as-mask {
        opacity: 0;
    }
    .as-box.middle.center {
        transform: translate(-50%, -50%) scale(0.1);
    }
}
</style>

<template>
    <transition name="as-anim">
        <div class="actionsheet" v-show="opened">
            <div class="actionsheet-wrap">
                <div class="as-mask"></div>
                <div class="as-box center middle">
                    <div class="close-box" @click="offClick">
                        <span class="close-btn" :style="{top: type == 'weichuandan' ? '-6%' : '-19%'}">
                            <svg @click="offClick" class="icon " aria-hidden="true">
                                <use xlink:href="#iconguanbi"></use>
                            </svg>
                        </span>
                    </div>
                    <img :src="img" class="img" @click="share" v-if="type == 'weichuandan'">
                    <img :src="type == 'group' ? groupImg : bargainImg" class="img" v-if="type != 'weichuandan'">
                    <div class="btn-wrapper" v-if="type != 'weichuandan'">
                        <div class="btn-l" @click="offClick">知道了</div>
                        <div class="btn-r" @click="share">{{type == 'group' ? '再开一团' : '发起砍价'}}</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import img from "./img/4.png";
import groupImg from "./img/5.png";
import bargainImg from "./img/6.png";
export default {
    props: {
        opened: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: "weichuandan"
        }
    },
    data() {
        return {
            img,
            groupImg,
            bargainImg
        };
    },
    methods: {
        share() {
            this.$emit("share");
        },
        offClick() {
            this.$emit("offClick");
        }
    }
};
</script>