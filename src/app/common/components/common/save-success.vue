<style scoped lang="scss">
.actionsheet-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 100;
    .as-mask {
        width: 100%;
        height: 100%;
        background-color: $color-mask;
        min-height: 95vh;
    }
    .as-box {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 7px;
        .container {
            width: 200px;
            height: 185px;
            background: rgba(252, 252, 252, 1);
            border-radius: 7px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .img {
                width: 58px;
            }
            .title {
                margin-top: 15px;
                margin: 9px;
                font-size: 17px;
                font-weight: bold;
                color: rgba(0, 0, 0, 1);
            }
            .point {
                font-size: 14px;
                color: rgba(153, 153, 153, 1);
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
          <div class="container">
            <img :src="img" class="img">
            <p class="title">保存成功</p>
            <p class="point">赶快去分享您的活动吧～</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import img from "./img/success.png";
export default {
    props: {
        opened: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            img
        };
    },
    methods: {}
};
</script>