<style lang="scss" scoped>
    .scroller {
            background-color: rgb(255, 234, 184);
    }
    .hearder {
        width: 100%;
        // padding-top: 180%;
        // @include background-img('./img/hearder.png', cover);
        position: relative;
        img {
            width: 100%;
            height: 167%;
        }
        .text {
            @include position-absolute(false, 0, 8px, 0);
            font-size: 19px;
            color: $color-white;
            letter-spacing: 6px;
            text-align: center;
        }
    }
    .content {
        position: relative;
        // background-color: #FFEAB8FF;
        padding: 15% 13px;
        .active-tag {
            position: absolute;
            width: 83.6%;
            padding-top: 16.4%;
            left: 50%;
            transform: translate(-50%, -80%);
            @include background-img('./img/tag.png', contain);
            z-index: 2;
            .title {
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 72%;
                font-size: 19px;
                color: #FFF;
                @include flex-center();
            }
        }
        .examp-tag {
            transform: translate(-50%, -140%);
        }
        .active-scene {
            position: relative;
            background-color: $color-white;
            border-radius: 10px;
            box-shadow:0px 0px 18px 0px rgba(228,142,0,0.4);
            padding: 13px 27px 34px 30px;
            .item {
                margin-top: 35px;
                display: flex;
                .item-l {
                    margin-top: 3px;
                    margin-right: 19px;
                }
                .bg-1 {
                    @include dynamic-wh(30px, 1.33);
                    @include background-img('./img/1.png', cover);
                }
                .bg-2 {
                    @include dynamic-wh(40px, 1);
                    @include background-img('./img/2.png', cover);
                }
                .bg-3 {
                    @include dynamic-wh(40px, 1);
                    @include background-img('./img/3.png', cover);
                }
                .item-r {
                    flex: 1;
                    .item-title {
                        font-size: 15px;
                        color: $color-3;
                    }
                    .item-info {
                        margin-top: 10px;
                        font-size: 14px;
                        color: $color-6;
                    }
                }
            }
        }
        .examp {
            color: $color-white;
            box-shadow:0px 0px 18px 0px rgba(228,142,0,0.4);
            .examp-t {
                height: 120px;
                border-radius: 10px 10px 0px 0px;
                padding-top: 34.2%;
                position: relative;
                .examp-title {
                    position: absolute;
                    left: 50%;
                    top: 30%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    font-size: 28px;
                }
                .num {
                    position: absolute;
                    left: 50%;
                    top: 65%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    font-size: 16px;
                }
                .btn {
                    position: absolute;
                    width: 160px;
                    height: 32px;
                    left: 50%;
                    transform: translate(-50%, 0);
                    border-radius: 16px;
                    bottom: -16px;
                    line-height: 32px;
                    text-align: center;
                    font-size: 16px;
                }
                .ping-tuan-btn {
                    background:linear-gradient(227deg,rgba(255,118,175,1) 0%,rgba(255,167,110,1) 100%);
                    box-shadow:0px 2px 60px 0px rgba(229,62,107,1);
                }
                .kan-jia-btn {
                    background:linear-gradient(227deg,rgba(117,114,255,1) 0%,rgba(184,100,244,1) 100%);
                    box-shadow:0px 2px 60px 0px rgba(64,59,232,1);
                }
                .chuan-dan-btn {
                    background:linear-gradient(227deg,rgba(78,164,255,1) 0%,rgba(98,215,227,1) 100%);
                    box-shadow:0px 2px 60px 0px rgba(43,125,214,1);
                }
            }
            .ping-tuan-t {
                background:linear-gradient(47deg,rgba(255,130,182,1) 0%,rgba(250,156,125,1) 100%);
            }
            .kan-jia-t {
                margin-top: 20px;
               background:linear-gradient(47deg,rgba(117,113,255,1) 0%,rgba(186,100,244,1) 100%);
            }
            .chuan-dan-t {
                margin-top: 20px;
                background:linear-gradient(47deg,rgba(96,168,246,1) 0%,rgba(126,212,220,1) 100%);
            }
            .ex-box {
                background-color: #fff;
                padding: 10px;
                border-radius: 0px 0px 10px 10px; 
            }
            .examp-b {
                width: 100%;
                padding-top: 45.6%;
                background-repeat: no-repeat;
                background-attachment: scroll;
                background-position: center center;
                background-size: cover;
            }
            .ping-tuan-b {
                // @include background-img('./img/pingtuan.png', cover);
            }
            .kan-jia-b {
                // @include background-img('./img/kanjia.png', cover);
            }
            .chuan-dan-b {
                // @include background-img('./img/weichuandan.png', cover);
            }
        }
    }
    .padd-pecent {
        padding-top: 18%;
    }
    .examp-wrapper {
        margin-top: 100px;
    }
    .bottom {
        padding: 40px 33px 15px 33px;
        background-color: #FFEAB8;
        .text1 {
            font-size: 18px;
            color: rgba(169,117,253,1);
            text-align: center;
        }
        .text2 {
            margin-top: 16px;
            color:rgba(255,141,25,1);
            text-align: center;
        }
        .zhao-sheng {
            margin-top: 40px;
            height: 49px;
            line-height: 49px;
            text-align: center;
            border-radius: 20px;
            font-size: 18px;
            color: $color-white;
            background:linear-gradient(180deg,rgba(126,156,255,1) 0%,rgba(169,117,253,1) 100%);
            box-shadow:0px 10px 13px 0px rgba(255,160,0,0.5);
        }
    }
</style>

<template>
    <scroller-base class="scroller" :data="computedData">
        <div class="hearder">
            <img src="./img/hearder.png" @load="imgLoad">
        </div>
        <div class="content">
            <div class="active-tag">
                <div class="title">适合多种营销活动场景</div>
            </div>
            <div class="active-scene">
                
                <div class="item">
                    <div class="item-l bg-1"></div>
                    <div class="item-r">
                        <div class="item-title">线下营销</div>
                        <div class="item-info">分享海报线下兑奖，吸引用户活跃参与</div>
                    </div>
                </div>
                <div class="item">
                    <div class="item-l bg-2"></div>
                    <div class="item-r">
                        <div class="item-title">节日营销</div>
                        <div class="item-info">紧随节日热点，持续更新主题模板活动</div>
                    </div>
                </div>
                <div class="item">
                    <div class="item-l bg-3"></div>
                    <div class="item-r">
                        <div class="item-title">品牌传播</div>
                        <div class="item-info">个性化的品牌露出，社交平台广泛传播</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content padd-pecent">
            <div class="active-tag examp-tag">
                <div class="title" ref="exampTitle">多种玩法全方位提升营销效果</div>
            </div>
            <div class="examp" v-for="card in list" :key="card.styleid">
                <div class="examp-t"  :class="card.titleClass">
                    <div class="examp-title">{{card.activeName}}</div>
                    <div class="num">已领{{card.taskcount}}次</div>
                    <div class="btn" :class="card.btnClass" @click="goDeatil(card.styleid, card.templateid)">领取</div>
                </div>
                <div class="ex-box">
                    <div class="examp-b" :class="card.bgcClass" :style="{'background-image':`url(${card.imageurl})`}"></div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="text1">玩转妙招生，从此刻开始</div>
            <div class="text2">每一个老师都是营销高手</div>
            <div class="zhao-sheng" @click="$router.go(-1)">我也要招生</div>
        </div>
    </scroller-base>
</template>

<script>
    import {gettmplistbymaxtake} from 'manage/api/index.js'
    export default {
        data() {
            return {
                wxTitle: '招生妙招',
                scrollData: 0,
                list: []
            }
        },
        computed: {
            computedData() {
                return {
                    scrollData: this.scrollData,
                    list: this.list
                }
            }
        },
        methods: {
            goDeatil(styleid, templateid) {
                this.$router.push({
                    path: `/templateDetail/${styleid}`,
                    query: { type: "add", templateid: templateid }
                })
            },
            imgLoad() {
                this.scrollData++
            }
        },
        created() {
            gettmplistbymaxtake().then(res => {
                if (res.result.code == app.errok) {
                    this.list = [];
                    res.data.forEach(item => {
                        if (item.activitytype == 1) {
                            item.taskcount += 2212;
                            item.maxUser = 1137;
                            item.titleClass = "ping-tuan-t";
                            item.bgcClass = "ping-tuan-b";
                            item.btnClass = "ping-tuan-btn";
                            item.activeName = '拼团案列';
                            this.list.unshift(item)
                        } else if (item.activitytype == 2) {
                            item.taskcount += 1231;
                            item.maxUser = 876;
                            item.titleClass = "kan-jia-t";
                            item.bgcClass = "kan-jia-b";
                            item.btnClass = "kan-jia-btn";
                            item.activeName = '砍价案列';
                            this.list.push(item)
                        } else if (item.activitytype == 3) {
                            item.taskcount += 897;
                            item.maxUser = 543;
                            item.titleClass = "chuan-dan-t";
                            item.bgcClass = "chuan-dan-b";
                            item.btnClass = "chuan-dan-btn";
                            item.activeName = '微传单';
                            this.list.push(item)
                          }
                    });
                }
            })
        },
        mounted() {
            this.$nextTick(() => {
                if (document.body.clientWidth < 400) this.$refs.exampTitle.style.fontSize = '15px'
            })
        },
        destroyed() {
        }
    }
</script>