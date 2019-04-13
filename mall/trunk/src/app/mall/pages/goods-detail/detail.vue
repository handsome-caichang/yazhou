<style lang="scss" scoped>
    .detail {
        .goods-detail {
             @include position-absolute(0, 0, 50px, 0);
            .heard {
                .heard-banner {
                    position: relative;
                    width: 100%;
                    height: 0;
                    padding-top: 56.3%;
                    background-color: $color-assist-1;
                    @at-root .banner {
                        @include position-absolute;
                        .banner-item {
                            display: block;
                            height: 100%;
                            @include background-img(false, cover);
                        }
                    }
                }
            }
            .info {
                height: 44px;
                display: flex;
                .info-left {
                    background: linear-gradient(to right, #FD4C01, #FC6F11);
                    flex: 1;
                    // line-height: 44px;
                    color: $color-white;
                    font-size: 14px;
                    padding: 5px 13px;
                    @include flex-between;
                    .content {
                        height: 28px;
                        border-right: 1px solid $color-white;
                        padding-right: 12px;
                        .spec {
                            font-size: 18px;
                        }
                    }
                }
                .info-right {
                    flex: 1;
                    background: linear-gradient(to right, #FC6F11,#FBC330);
                    padding-right: 12px;
                    color: $color-white;
                    text-align: right;
                    .text {
                        font-size: 11px;
                        height: 22px;
                        line-height: 22px;
                    }
                    span {
                        display: inline-block;
                        color: #F03232;
                        padding: 0 3px;
                        height: 18px;
                        border: 1px solid $color-white;
                        background-color: $color-white;
                        font-size: 14px;
                        text-align: center;
                        border-radius: 4px;
                    }
                }
            }
            .primary-info {
                padding: 16px 12px;
                .name {
                    color: $color-3;
                    font-size: 16px;
                }
                .mini-info {
                    margin-top: 6px;
                    line-height: 18px;
                    font-size: 12px;
                    color: $color-9;
                }
                .price-info {
                    margin-top: 12px;
                    .price {
                        font-size: 20px;
                        color: #E93A0E;
                    }
                    .old-price-wrapper {
                        font-size: 12px;
                        color: $color-9;
                        .old-price {
                            text-decoration: line-through;
                        }
                    }
                }
            }
            .propetry {
                padding: 0 12px 12px 12px;
                .propetry-heard {
                    height: 55px;
                    @include flex-between;
                    .litter {
                        width: 2px;
                        height: 12px;
                        background-color: $color-primary;
                    }
                    .text {
                        flex: 1;
                        font-size: 15px;
                        color: #333;
                        padding-left: 4px;
                    }
                }
                .propetry-body {
                    .body-item {
                        margin-top: 20px;
                        display: flex;
                        font-size: 14px;
                        .body-item-left {
                            color: $color-9;
                            width: 100px;
                        }
                        .body-item-right {
                            flex: 1;
                            color: #333;
                            padding-right: 12px;
                        }
                    }
                }
            }
            .void {
                height: 10px;
                background-color: $color-assist-1;
            }
        }
        .bottom {
            @include position-absolute(false, false, 0, false);
            // border-top: 1px solid $color-border;
            display: flex;
            width: 100%;
            height: $h-1;
            background-color: $color-white;
            .shop-car, .collect{
                width: 19%;
                line-height: 49px;
                text-align: center;
                font-size: 20px;
                // @include border-right;
                color: #8E8E8E;
                position: relative;
                .text {
                    font-size: 10px;
                    height: 10px;
                    line-height: 10px;
                    @include position-absolute(false, 0, 3px, 0);
                }
                .circle{
                    min-width: 16px;
                    height: 16px;
                    color: $color-white;
                    line-height: 16px;
                    padding: 0 4px;
                    font-size: $fs-small-s;
                    border-radius: 8px;
                    background-color: $color-assist;
                    text-align: center;
                    @include position-absolute(6px,12px,false,false);
                }
            }
            .click-wrapper {
                flex: 1;
                display: flex;
            }
            .sign-up, .join-car{
                flex: 1;
                line-height: 49px;
                text-align: center;
                font-size: 16px;
                color: #F03232;
            }
            .join-car{
                background: linear-gradient(to right, #F23030, #FE7544);
                color: $color-white;
            }
            .not-sale {
                background-color: $color-9;
                color: $color-white;
            }
        }

    }
</style>

<template>
    <div class="detail">
        <scroller-base :data="scrollerData" class="goods-detail">
            <div class="heard" ref="heard">
                <!-- banner图  -->
                <div class="heard-banner" v-if="detail.Images&&detail.Images.length !=0">
                    <slider class='banner'>
                        <a 
                            class="banner-item"     
                            v-for="(img,index) in detail.Images"      
                            :key="index"        
                            :style="'background-image:url('+ img + ')'">
                        </a>
                    </slider>
                </div>
            </div>
            <div class="info">
                <div class="info-left">
                    <div class="content">
                        <span class="spec">限量秒杀</span>
                        仅剩50名
                    </div>
                </div>
                <div class="info-right">
                    <div class="text">距结束</div>
                    <div>
                        <span>{{computedH}}</span>
                        &nbsp:&nbsp<span>{{computedM}}</span>&nbsp:&nbsp<span>{{computedS}}</span>
                    </div>
                </div>
            </div>
            <div class="primary-info">
                <div class="name">{{detail.Name}}</div>
                <div class="mini-info">
                    开课时间：2019.03.12
                </div>
                <div class="mini-info">
                    上课时间：周一至周三10：30，周二至周五17：50
                </div>
                <div class="price-info">
                    <div class="price">&#165;1885-6020</div>
                    <div class="old-price-wrapper">
                        价格：
                        <span class="old-price">&#165;2000-3000</span>
                    </div>
                </div>
            </div>
            <div class="void"></div>
            <div class="propetry">
                <div class="propetry-heard">
                    <div class="litter"></div>
                    <div class="text">属性</div>
                </div>
                <div class="propetry-body">
                    <div class="body-item">
                        <div class="body-item-left">科目</div>
                        <div class="body-item-right">一年级</div>
                    </div>
                    <div class="body-item">
                        <div class="body-item-left">年级</div>
                        <div class="body-item-right">一年级</div>
                    </div>
                    <div class="body-item">
                        <div class="body-item-left">班型</div>
                        <div class="body-item-right">集体班</div>
                    </div>
                    <div class="body-item">
                        <div class="body-item-left">计费方式</div>
                        <div class="body-item-right">按课时计费</div>
                    </div>
                    <div class="body-item">
                        <div class="body-item-left">属性</div>
                        <div class="body-item-right">自定义属性自定义属性自定义属性自定义属性自定义属性自定义属性自定义属性自定义属性自定义属性</div>
                    </div>
                </div>
            </div>
            <div class="void"></div>
            <!-- 课程介绍的富文本 -->
            <div class="propetry">
                <div class="propetry-heard">
                    <div class="litter"></div>
                    <div class="text">详情</div>
                </div>
                <rich-text-area :richText="detail.DetailText" @imgLoaded="imgLoaded"></rich-text-area>
            </div>
        </scroller-base>
        <div class="bottom">
            <router-link tag="div" to="/cart" class="shop-car">
                <div class="circle">16</div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gouwuche1"></use>
                </svg>
                <div class="text">
                    购物车
                </div>
            </router-link>
            <div class="collect">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="isFavorite.value ? isFavorite.iconAction : isFavorite.icon"></use>
                </svg>
                <div class="text">
                    收藏
                </div>
            </div>
            <div class="click-wrapper">
                <div class="sign-up" 
                    @click="addCart"
                    :class="{'not-sale':remainingTime>0}">
                    加入购物车
                </div>
                <div class="join-car"
                     @click="shopGoods"
                     :class="{'not-sales':remainingTime>0}">
                 立即报名</div>
            </div>
        </div>

        <!-- 选择规格组件 -->
        <select-specs ref="selectSpecs" :type="type"></select-specs>
    </div>
</template>

<script>
    import {getClassInfo, getGoodsDetail} from 'api/yy.js'
    import SelectSpecs from './child/selectSpecs.vue'
    export default {
        data() {
            return {
                wxTitle: '商品详情',
                imgsNum: 0, //富文本图片数量
                detail: {},
                num: 0,
                isFavorite: {
                    value: false,
                    icon: '#icon-xihuan',
                    iconAction: '#icon-xihuan1'
                },
                type: 1,
                remainingTime: 20,
            }
        },
        computed: {
            scrollerData() {
                return {
                    info: this.detail,
                    num: this.imgsNum
                }
            },
            computedH() {
                let h = 0
                if (this.remainingTime > 3600) h = parseInt(this.remainingTime / 3600)
                if (h < 10) h = '0' + h
                return h
            },
            computedM() {
                let m = 0
                if (this.remainingTime > 60) m = parseInt(this.remainingTime / 60)
                if (m > 60) m = m % 60
                if (m < 10) m = '0' + m
                return m
            },
            computedS() {
                let s = 0
                s = this.remainingTime % 60
                if (s < 10) s = '0' + s
                return s
            }
        },
        methods: {
            getData() {
                let ajaxPromise = this.type == 1 ? getClassInfo : getGoodsDetail
                ajaxPromise({ProductID: this.$route.params.id}).then(res => {
                    if (res.ErrorCode == app.errok) this.detail = res.Data
                    
                    if (this.type == 1) {
                        for(let i = 0; i< 3; i ++) {
                            this.detail.ShiftSpecList.push({
                                Amount: 20 + i * 10,
                                ID: String(i)
                            })
                        }
                        this.detail.ShiftSpecList.forEach((obj, index) => {
                            if (index == 0) {
                                this.$set(obj, 'isSelect', true)
                            } else {
                                this.$set(obj, 'isSelect', false)
                            }
                        })
                    }
                    if (this.remainingTime > 0) {
                        this.setInt = setInterval(() =>{
                            this.remainingTime --
                            if (this.remainingTime == 0) {
                                clearInterval(this.setInt)
                                // this.renderPage()
                            }
                        }, 1000)
                    }
                })
            },
            addCart() {

            },
            shopGoods() {
                if (this.remainingTime > 0) return
                this.$refs.selectSpecs.open(this.detail).then(res => {
                    if (this.type == 1) {
                        this.detail.ShiftSpecList.forEach(obj => {
                            if (obj.ID == res.ID) {
                                obj.isSelect = true
                            } else {
                                obj.isSelect = false
                            }
                        })
                    } else {
                        console.log(res);
                    }
                    setTimeout(() =>{
                        this.$router.push({path: `/order/${this.type}`})
                    })
                })
            },
            imgLoaded() {
                console.log('11111111111');
            }

        },
        created() {
            this.type = parseInt(this.$route.params.type)
            this.getData()
            window.a = this
        },
        components: {
            SelectSpecs
        }
    }
</script>