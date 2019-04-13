
<style lang="scss" scoped>
.actionsheet-password {
    z-index: 10;
    line-height: 1;
    @include position-absolute;

    .coupon-boxs {
        display: flex;
        justify-content: center;
        align-items: center;

        .coupon {
            width: 280px;
            height: 340px;
            @include background-img(false, cover);
            background-size: 280px 330px;
            position: relative;

            .vido {
                position: absolute;
                bottom: 17px;
                width: 100%;
                height: 32px;
                background: rgba(224, 39, 51, 1);
                box-shadow: 0px -8px 6px 0px rgba(166, 46, 36, 0.3);
                border-radius: 0px 0px 16px 16px;
            }

            .close-btn {
                position: absolute;
                z-index: 1;
                top: 0;
                right: 0;
                color: #fff;
                font-size: 16px;
            }

            .bgcImg {
                height: 350px;
                position: absolute;
                z-index: -1;
            }

            .btn {
                position: absolute;
                top: 305px;
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

            .big {
                position: absolute;
                top: 95px;
                right: 0px;
                z-index: 1;
                width: 60px;
            }

            .scroll {
                @include position-absolute(135px, 0px, 32px, 0px);
                padding: 0 35px;
                height: 160px;

                .card {
                    height: 68px;
                    position: relative;
                    margin-bottom: 10px;
                    display: flex;
                    border-radius: 5px;
                    overflow: hidden;
                    background-size: 250px 68px;

                    .card-left {
                        width: 80px;
                        color: #ff5f53;
                        @include flex-center(column);

                        .price {
                            font-size: 24px;
                            position: relative;
                            font-weight: 600;

                            .yuan {
                                font-size: 15px;
                            }
                        }

                        .tag {
                            margin-top: 5px;
                            font-size: 13px;
                            @include ellipsis-multi(2);
                        }
                    }

                    .card-right {
                        width: 130px;
                        padding-top: 12px;
                        padding-bottom: 12px;
                        padding-left: 20px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        .icon {
                            margin-top: 3px;
                            margin-bottom: 7px;
                            width: 44px;
                            height: 13px;
                        }

                        .time {
                            width: 100%;
                            font-size: 11px;
                            font-family: PingFangSC-Regular;
                            font-weight: 200;
                            color: rgba(153, 153, 153, 1);
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }

                        .title {
                            font-size: 13px;
                            font-weight: 600;
                            color: rgba(102, 102, 102, 1);
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }
                }
            }
        }
    }

    .coupon-box {
        display: flex;
        justify-content: center;
        align-items: center;

        .coupon {
            width: 280px;
            height: 340px;
            @include background-img(false, cover);
            // background-size: contain;
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
                height: 350px;
                position: absolute;
                z-index: -1;
            }

            .content {
                height: 350px;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;

                .text {
                    width: 100%;
                    text-align: center;

                    .name {
                        margin-top: 30px;
                        font-size: 14px;
                        padding: 0 50px;
                        line-height: 17px;
                        color: #fea690;
                        overflow : hidden;
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
                top: 305px;
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
<action-sheet ref="actionsheet"  v-show="opened" position="center" class="actionsheet-password">
    <div >
        <div class="coupon-box" v-if="list.length <= 1">
            <div class="coupon" :style="{backgroundImage: `url(${one})`}">
                <svg @click="close" class="icon close-btn" aria-hidden="true" >
                <use xlink:href="#icon-guanbi"></use>
            </svg>
                <div class="content">
                    <div class="text">
                        <!-- <p class="name">{{coupon.Name}}</p> -->
                        <p class="moeny">&yen;{{coupon.Money}}</p>
                        <p class="icon-box" v-if="coupon.ComeType == 4">
                            <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-dianziqiaquanbiaoqian"></use>
                        </svg>
                        </p>
                    </div>
                </div>
                <div class="footer">
                    <p class="condotion">使用条件: <span>{{coupon.Condition?coupon.Condition:'无门槛' }}</span></p>
                    <p v-if="!coupon.Unlimited">使用期限: <span >{{coupon.StartDateTime|formatDatetime('yyyy.MM.dd')}} - {{coupon.EndDateTime|formatDatetime('yyyy.MM.dd')}}</span></p>
                    <p v-if="coupon.Unlimited">使用期限: <span >永久有效</span></p>
                </div>
                <p class="btn" @click="toMall">去查看</p>
            </div>
        </div>
        <div class="coupon-boxs" v-if="list.length > 1">
            <div class="coupon" :style="{backgroundImage: `url(${multiple})`}">
                <svg @click="close" class="icon close-btn" aria-hidden="true" >
                    <use xlink:href="#icon-guanbi"></use>
                </svg>
                <img class="big" :src="big">
                <div class="content">
                    <scroller-base class="scroll" :data="renderData" ref="ShareFrame">
                        <div>
                            <ul>
                                <li class="card" v-for="(card, index) in list" :key="index" :style="{backgroundImage: `url(${couponBgc})`}">
                                    <div class="card-left">
                                        <div class="price" ref="cardLeft"><span class="yuan">&yen;</span>{{card.Money}}</div>
                                    </div>
                                    <div class="card-right">
                                        <p class="title">{{card.Name}}</p>
                                        <svg class="icon" aria-hidden="true" v-if="card.ComeType == 4">
                                            <use xlink:href="#icon-dianziqiaquanbiaoqian"></use>
                                        </svg>
                                        <p class="time">{{card.StartDateTime|formatDatetime('yyyy.MM.dd')}}-{{card.EndDateTime|formatDatetime('yyyy.MM.dd')}}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </scroller-base>
                </div>
                <div class="vido"></div>
                <p class="btn" @click="toMall">去查看</p>
            </div>
        </div>
    </div>
</action-sheet>
</template>

<script>
import {
    processPost,
    processGet
} from "parent/api/common";
import one from "./img/one.png";
import multiple from "./img/multiple.png";
import big from "./img/big.png";
import couponBgc from "./img/coupon.png";
export default {
    name: "actionsheet-password",
    data() {
        return {
            one,
            multiple,
            big,
            couponBgc,
            opened: false,
            coupon: {
                // Name: "（820活动优惠券）",
                // Money: "300",
                // StartDateTime: "2018-09-08T23:59:59",
                // EndDateTime: "2018-08-20T00:00:00",
                // Condition: ""
                // ComeType: 4 
            },
            list: [{
                // ID: "43775d7d-5b76-4e44-868e-9a48360a6a31",
                // Money: 100,
                // Condition: 0,
                // Name: "在线报名优惠券1",
                // IsAllCampus: 0,
                // IsAllGoods: 1,
                // IsAllShift: 1,
                // IsAllSubject: 0,
                // StartDateTime: "2018-08-27T00:00:00",
                // EndDateTime: "2018-08-31T23:59:59",
                // EnableMultiple: 0,
                // SaleMode: 2,
                // Number: "2018082701"
                // ComeType: 4 // 1前台报名，2网上报名，3自动发券，4电子推荐卡
            }]
        };
    },
    computed: {
        ...Vuex.mapState([
            'userConfig',
            'couponFlag'
        ]),

    },
    methods: {
        toMall() {
            this.$router.push("/coupon");
            setTimeout(() => {
                this.opened = false;
            }, 301);
        },
        close() {
            this.opened = false;
        },
        openFlag() {
            console.log(1);
            // 配置项开启且未完善个人必填信息
            if (this.userConfig && this.userConfig.EnableSSXStudentInfo == 1 && this.userConfig.perfectUserInfo == 1 && this.userConfig.isStudent == 1) {
            }else {
                processGet({
                    pname: "coupon",
                    action: 'noRead'
                }).then(res => {
                    if (res.errcode == app.errok) {
                        this.list = res.data;
                        if (this.list.length == 1) {
                            this.coupon = this.list[0];
                            if (app.filters.formatDatetime(this.coupon.EndDateTime, 'yyyy-MM-dd') == '2099-01-01') {
                                this.coupon.Unlimited = true;
                            }else {
                                this.coupon.Unlimited = false;
                            }
                            this.opened = true;
                        } else if (this.list.length > 1) {
                            this.opened = true;
                            this.setTime(this.list);
                        } else {
                            this.opened = false;
                            store.commit('set_couponFlag', false);
                        }
                        this.$nextTick(() => {
                            setTimeout(() => {
                                this.$refs.actionsheet.refresh();
                            }, 50);
                        });
                    }
                })
            }
        },
        setTime(list) {
            if (list instanceof Array) {
                list.forEach(item => {
                    if (app.filters.formatDatetime(item.EndDateTime, 'yyyy-MM-dd') == '2099-01-01') {
                        item.Unlimited = true;
                    }else {
                        item.Unlimited = false;
                    }
                })
            }
        }
    },
    created() {

    },
    mounted() {
        this.$nextTick(() => {
            this.openFlag();
            setTimeout(() => {
                this.$refs.actionsheet.$el.childNodes[0].childNodes[2].style.background = "none";
                this.$refs.actionsheet.$el.childNodes[0].childNodes[2].childNodes[2].childNodes[0].style.maxHeight = 'none';
            }, 300);
        });
    }
};
</script>
