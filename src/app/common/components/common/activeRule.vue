<!-- 修改密码弹窗 -->

<style lang="scss" scoped>
.actionsheet-password {
    z-index: 10;
    line-height: 1;
    @include position-absolute;
    .coupon-box {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 48px;
        // .coupon {
        //   height: 334px;
        //   width: 264px;
        //   @include background-img(false, cover);
        //   position: relative;
        //   .close-btn {
        //     position: absolute;
        //     z-index: 1;
        //     top: -47px;
        //     right: 3px;
        //     display: flex;
        //     justify-content: center;
        //     align-items: center;
        //     border: 1px solid #b4b4b4;
        //     height: 27px;
        //     width: 27px;
        //     border-radius: 27px;
        //     .icon {
        //       width: 10px;
        //       height: 10px;
        //       color: #d7d7d7;
        //     }
        //   }
        //   .content {
        //     padding: 53px 30px 53px 30px;
        //     width: 100%;
        //     color: #bc7209;
        //     font-size: 14px;
        //     line-height: 20px;
        //     white-space: pre-wrap;
        //   }
        // }
        .coupon {
            position: relative;
            background: rgba(255, 255, 255, 1);
            border-radius: 17px;
            padding: 9px;
            .close-box {
                position: absolute;
                z-index: 1;
                top: 0%;
                right: 0%;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 19px;
                transform: translate(0%, -100%);
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
            .rule {
                width: 137px;
                position: absolute;
                top: 0;
                left: 50%;
                transform: translate(-50%, -18%);
            }
            .content {
                height: 400px;
                padding: 30px 30px 20px 30px;
                color: #bc7209;
                font-size: 14px;
                line-height: 20px;
                white-space: pre-wrap;
                border: 4px solid #f9ae1f;
                border-radius: 17px;
            }
        }
    }
}
</style>

<template>
  <action-sheet ref="actionsheets" v-show="opened" position="center" class="actionsheet-password" :data="opened">
    <div class="coupon-box">
      <!-- <div class="coupon" :style="{backgroundImage: `url(${activeRule})`}">
                <span class="close-btn">
                    <svg @click="close" class="icon " aria-hidden="true">
                        <use xlink:href="#iconguanbi"></use>
                    </svg>
                </span>
                <div class="content">{{text}}</div>
            </div> -->
      <div class="coupon">
        <img class="rule" :src="rule" alt="">
        <div class="close-box" @click="close">
          <span class="close-btn">
            <svg class="icon " aria-hidden="true">
              <use xlink:href="#iconguanbi"></use>
            </svg>
          </span>
        </div>
        <div class="content">{{text}}</div>
      </div>
    </div>
  </action-sheet>
</template>

<script>
import activeRule from "./img/activeRule.png";
import rule from "./img/rule.png";
export default {
    name: "activeRule",
    mixins: [app.mixin.popupWindowRouteMixin],
    props: {
        opened: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            activeRule: activeRule,
            rule: rule
        };
    },
    computed: {},
    methods: {
        close() {
            this.$emit("close");
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.actionsheets.$el.childNodes[0].childNodes[2].style.background =
                "none";
            this.$refs.actionsheets.$el.childNodes[0].childNodes[2].childNodes[2].childNodes[0].style.maxHeight =
                "none";
            setTimeout(() => {
                this.$refs.actionsheets.refresh();
            }, 300);
        });
    }
};
</script>
