<style lang="scss" scoped>

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
        top: 50%;
        margin-top: -150px;
        background-color: $color-white;
        border-radius: 10px;
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
                color: rgba(245, 162, 6, 1);
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
                margin-top: 30px;
                margin-bottom: 12px;
            }

            .point {
                font-size: 11px;
                margin-bottom: 5px;
            }

            .footer {
                font-size: 13px;
                margin-bottom: 40px;
            }
            .footers {
                 font-size: 13px;
                margin-bottom: 20px;
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
        // transform: translate(0, -50%) scale(1);
        transform-origin: center bottom;
    }
}

.as-anim-enter,
.as-anim-leave-active {
    .as-mask {
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
                <div class="container-box">
                    <svg @click="close" class="icon close" aria-hidden="true" :style="{padding: typeCode == '2' ? '0px' : '10px'}">
                    <use xlink:href="#icon-guanbi"></use>
                </svg>
                    <img class="code-img"  v-if="typeCode == '1'" :src="code" />
                    <div class="code-img" v-if="typeCode == '2'" ref="qrcode"></div>
                    <p class="point">长按识别</p>
                    <p class="footer" v-if="typeCode == '1'">请关注公众号查看电子券和学校信息</p>
                    <p class="footers" v-if="typeCode == '2'">二维码有效期至： {{contentText}}</p>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
 import QRCode from 'assets/js/vendor/qrcode.min.js'

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
        typeCode: {
            type: String,
            default: '1'
        },
        contentText: {
            type: String,
            default: ''
        }
    },
    data() {
        return {};
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
        code(val){
            if (val) {
                this.$nextTick(() => {
                    let text = '';
                    if (this.typeCode == '2') {
                        text = decodeURIComponent(app.tool.parseQuery(this.code).url);
                        console.log(text);
                        this.qrcode = new QRCode(this.$refs.qrcode, {
                            text: text,
                            width: 200,
                            height: 200,
                            colorDark : '#000000',
                            colorLight : '#ffffff',
                        })
                    }
                })
            }
        }
    },
};
</script>
