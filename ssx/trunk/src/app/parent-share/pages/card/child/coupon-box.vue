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

        .coupon {
            width: 280px;
            height: 340px;
            @include background-img(false, cover);
            background-size: 280px 340px;
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
                color: #fff;
                font-size: 16px;
                opacity: 0.5;
            }

            .bgcImg {
                height: 340px;
                position: absolute;
                z-index: -1;
            }

            .content {
                height: 340px;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;

                .text {
                    width: 100%;
                    text-align: center;

                    .name {
                        margin-top: 20px;
                        font-size: 14px;
                        padding: 0px 50px;
                        line-height: 17px;
                        color: #fea690;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }

                    .moeny {
                        margin-top: 5px;
                        color: #ff5f53;
                        font-size: 35px;
                        margin-bottom: 5px;
                    }

                    .icon-box .icon {
                        width: 50px;
                        font-size: 20px;
                    }
                }
            }

            .btn {
                position: absolute;
                top: 295px;
                left: 50%;
                transform: translateX(-50%);
                width: 160px;
                height: 35px;
                line-height: 35px;
                text-align: center;
                color: #fff;
                background: linear-gradient(180deg,
                    rgba(255, 203, 0, 1) 0%,
                    rgba(254, 154, 16, 1) 100%);
                border-radius: 100px;
                border: 2px solid rgba(255, 194, 0, 1);
            }

            .footer {
                position: absolute;
                bottom: 47px;
                left: 30px;
                font-size: 12px;
                color: #fff;
                font-weight: 100;
                text-shadow: 0px 2px 4px rgba(233, 0, 0, 1);
                opacity: 0.8;

                .condotion {
                    margin-bottom: 10px;
                }
            }
        }
    }
}
</style>

<template>
<action-sheet ref="actionsheet" v-show="opened" position="center" class="actionsheet-password" :data="opened">
    <div class="coupon-box">
        <div class="coupon" :style="{backgroundImage: `url(${one})`}">
            <!-- <img  class="bgcImg" :src="one" alt=""> -->
            <!-- <span class="close-btn">&Chi;</span> -->
            <svg @click="close" class="icon close-btn" aria-hidden="true" >
                    <use xlink:href="#icon-guanbi"></use>
                </svg>
            <div class="content">
                <div class="text">
                    <p class="name">{{coupon.Name}}</p>
                    <p class="moeny">&yen;{{coupon.CouponAmount}}</p>
                    <p class="icon-box">
                        <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-dianziqiaquanbiaoqian"></use>
                            </svg>
                    </p>
                </div>
            </div>
            <div class="footer">
                <p class="condotion">使用条件: <span>{{coupon.Condition ?coupon.Condition:'无门槛' }}</span></p>
                <p>使用期限: <span>{{coupon.Lifecycle}}</span></p>
            </div>
            <p class="btn" @click="toMall">去查看</p>
        </div>
    </div>
</action-sheet>
</template>

<script>
import {
    processPost
} from 'parent/api/common';
import one from './img/one.png';
import big from './img/big.png';
export default {
    name: 'actionsheet-password',
    props: {
        opened: {
            type: Boolean,
            default: false
        },
        coupon: {
            type: Object,
            default: {
                Name: '',
                CouponAmount: '',
                Lifecycle: "",
                Condition: '',
                Url: '',
            }
        }
    },
    data() {
        return {
            one,
            big,
        }
    },
    computed: {

    },
    methods: {
        toMall() {
            location.replace(this.coupon.Url);
        },
        close() {
            this.$emit("close");
        }
    },
    mounted() {
        this.$nextTick(() => {
            console.log( this.$refs.actionsheet.$el.childNodes[0].childNodes[2].childNodes[2].childNodes[0]);
            this.$refs.actionsheet.$el.childNodes[0].childNodes[2].style.background = "none";
            this.$refs.actionsheet.$el.childNodes[0].childNodes[2].childNodes[2].childNodes[0].style.maxHeight = 'none';
            setTimeout(() => {
                this.$refs.actionsheet.refresh();
            }, 300);
        })
    },
}
</script>
