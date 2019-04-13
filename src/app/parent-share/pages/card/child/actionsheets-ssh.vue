<style lang="scss" scoped>
.actionsheet-password {
    z-index: 10;
    line-height: 1;
    @include position-absolute;
    .container-box {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 15px 0px rgba(143, 156, 180, 0.65);
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        color: #333;
        position: relative;

        .close {
            position: absolute;
            right: 5px;
            top: 5px;
            width: 30px;
            height: 30px;
            padding: 10px;
        }

        .title {
            text-align: center;
            font-size: 16px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            margin-top: 25px;
            margin-bottom: 20px;
            .icon {
                width: 16px;
                height: 16px;
                margin-left: 8px;
            }
        }

        .user-box {
            width: 90%;
            height: 64px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: rgba(238, 238, 238, 1);
            border-radius: 35px;

            .loginName {
                padding: 0px 4px;
                font-size: 14px;
                font-weight: 600;
                color: rgba(51, 51, 51, 1);
            }
        }

        .code-img {
            width: 200px;
            height: 200px;
            margin-bottom: 12px;
        }

        .point {
            font-size: 11px;
            margin-bottom: 5px;
        }
        .footer {
            font-size: 13px;
            margin-bottom: 30px;
        }
    }
}
</style>

<template>
<action-sheet ref="actionsheet" v-show="opened" position="center" class="actionsheet-password" :data="opened">
    <div class="container-box">
        <svg @click="close" class="icon close" aria-hidden="true"><use xlink:href="#icon-guanbi"></use></svg>
        <p class="title">恭喜您，领取成功！</p>
        <img class="code-img" :src="code">
        <p class="footer">长按识别关注公众号，查收您的电子推荐卡！</p>
    </div>
</action-sheet>
</template>

<script>
export default {
    name: "actionsheets-ssh",
    mixins: [app.mixin.popupWindowRouteMixin],
    props: {
        opened: {
            type: Boolean,
            default: false
        },
        code: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
        };
    },
    computed: {
    },
    methods: {
        close() {
            this.$emit('close');
            // this.opened = false;
        }
    },
    components: {
    },
    watch: {
    },
};
</script>
