<!-- 帮别人砍价/发起砍价弹窗 -->
<style lang="scss" scoped>
.actionsheet-wrapper {
    z-index: 10;
    line-height: 1;
    @include position-absolute;
    .bargain-box {
        display: flex;
        justify-content: center;
        align-items: center;
        .bargain {
            width: 320px;
            height: 400px;
            @include background-img(false, cover);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            .close-btn {
                position: absolute;
                z-index: 1;
                top: 0;
                right: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid #b4b4b4;
                height: 27px;
                width: 27px;
                border-radius: 27px;
                .icon {
                    width: 10px;
                    height: 10px;
                    color: #d7d7d7;
                }
            }
            .content {
                width: 70%;
                height: 110px;
                margin-top: 110px;
                color: #fe5c00;
                font-size: 17px;
                text-align: center;
                background-color: #fff;
                border-radius: 10px;
                @include flex-center(column);
                .content-bottom {
                    margin-top: 5px;
                    .money {
                        margin-top: 6px;
                        font-size: 35px;
                        font-weight: bold;
                    }
                }
            }
            .btn {
                @include background-img(false, cover);
                width: 70%;
                height: 44px;
                line-height: 44px;
                margin-top: 22px;
                text-align: center;
                color: #b83f00;
                font-size: 17px;
                font-weight: bold;
            }
        }
    }
}
</style>

<template>
    <action-sheet ref="actionsheet" v-show="opened" position="center" class="actionsheet-wrapper" :data="opened">
        <div class="bargain-box">
            <div class="bargain" :style="{backgroundImage: `url(${backgroundimg})`}">
                <span class="close-btn">
                    <svg @click="close" class="icon " aria-hidden="true">
                        <use xlink:href="#iconguanbi"></use>
                    </svg>
                </span>
                <div class="content">
                    <div>{{bargain.isme?'您成功为自己砍了':'您成功为好友砍了'}}</div>
                    <div class="content-bottom">
                        <span class="money">{{bargain.bargainAmount}}</span>元</div>
                </div>
                <p class="btn" :style="{backgroundImage: `url(${buttonimg})`}" @click="toMall">{{bargain.isme?'邀请好友帮你砍价吧':'我也要发起砍价'}}</p>
            </div>
        </div>
    </action-sheet>
</template>

<script>
import backgroundimg from "./backgroundimg.png";
import buttonimg from "./buttonimg.png";

export default {
    name: "actionsheet-wrapper",
    props: {
        opened: {
            type: Boolean,
            default: true
        },
        bargain: {
            type: Object,
            default: {
                bargainAmount: "", //  金额
                isme: false // 是否本人
            }
        }
    },
    data() {
        return {
            backgroundimg,
            buttonimg
        };
    },
    methods: {
        toMall() {
            this.$emit("toLook");
            // location.replace(this.bargain.Url);
        },
        close() {
            this.$emit("close");
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.actionsheet.$el.childNodes[0].childNodes[2].style.background =
                "none";
            this.$refs.actionsheet.$el.childNodes[0].childNodes[2].childNodes[2].childNodes[0].style.maxHeight =
                "none";
            setTimeout(() => {
                this.$refs.actionsheet.refresh();
            }, 300);
        });
    }
};
</script>