<!-- 主屏-用户中心页面 -->
<style lang="scss" scoped>
    .app-user {
        line-height: 1;
        @include position-absolute;
        @include flex-center;
        font-size: $fs-big;
        overflow: hidden;
        .scroller {
            background-color: $color-white;

        }
        .info {
            text-align: center;
            height: 218px;
            @include background-img(false, cover);
            position: relative;
            .avatar {
                display: inline-block;
                margin-top: 20px;
                width: 63px;
                height: 63px;
                border-radius: 50%;
                @include background-img(false, cover);
            }
            .name {
                color: $color-white;
                font-size: 20px;
                margin: 7px 0 10px 0;
            }
            .serial {
                color: $color-white;
                font-size: $fs-small;
            }
        }
        .big-info {
            height: 90px;
            @include position-absolute(false, 9px, -20px, 9px);
            @include flex-between;
            background-color: $color-white;
            border-radius: 6px;
            box-shadow: 0 1px 5px rgba(0,0,0,.2);
            .big-l, .big-r {
                flex: 1;
                .top {
                    font-size: 24px;
                    text-align: center;
                    color: $color-3;
                }
                .bot {
                    font-size: 11px;
                    color: $color-9;
                    text-align: center;
                    margin-top: 10px;
                    display: flex;
                    .mid {
                        margin: 0 auto;
                        .img1 {
                            display: inline-block;
                            width: 11px;
                            height: 11px;
                            @include background-img('./img/9.png', cover);
                        }
                        .img2 {
                            display: inline-block;
                            width: 13px;
                            height: 11px;
                            @include background-img('./img/10.png', cover);
                        }
                        .text {
                            margin-left: 5px;
                        }
                    }
                }
            }
        }
        .nav-row {
            // margin-bottom: $void;
            @include flex-center;
            background-color: $color-white;
            height: 96px;
            .item {
                flex: 1;
                color: $color-3;
                text-align: center;
                font-size: $fs-normal-s;
                .link{
                    height: 90px;
                    @include flex-center(column);
                    .tips{
                        position: relative;
                        .img-wrapper {
                            display: inline-block;
                            width: 28px;
                            height: 26px;
                            margin-bottom: 8px;
                            @include background-img(false,cover);
                        }
                        .num{
                            position: absolute;
                            top: -9px;
                            right: -9px;
                            min-width: 16px;
                            height: 16px;
                            color: $color-white;
                            line-height: 16px;
                            padding: 0 4px;
                            font-size: $fs-small-s;
                            border-radius: 8px;
                            background-color: $color-assist;
                            text-align: center;
                        }
                    }
                }
            }
        }
        .nav {
            .nav-item {
                height: 55px;
                line-height: 55px;
                padding: 0 $edge-x;
                color: $color-3;
                font-size: $fs-big-s;
                background-color: $color-white;
                .link{
                    @include flex-between;
                    .nav-icon {
                        font-size: 20px;
                        margin-right: $edge-x;
                    }
                }
                .nav-next {
                    color: $color-9;
                }
                &.cate {
                    margin-bottom: $void;
                }
            }
        }
        .void {
            height: 20px;
            background-color: $color-white;
        }
        .log-out {
            height: 45px;
            line-height: 45px;
            font-size: 16px;
            color: #AAAAAA;
            text-align: center;
            background-color: #FFFFFF;
        }
        .scroller {
            @include position-absolute;
            overflow: hidden;
        }
    }
</style>

<template>
    <div class="app-user">
        <scroller-super class="scroller" :api="apiPromise" :data="renderData">
            <div>
                <div class="info" :style="'backgroundImage:url('+userBg+')'">
                    <router-link 
                        class="avatar"
                        tag="span"
                        to="/userSetting" 
                        :style="{'background-image':userInfo.Image?`url(${userInfo.Image})`:''}">
                        
                    </router-link>
                    <p class="name">{{userInfo.StudentName}}</p>
                    <p class="serial">学员学号：{{userInfo.Number}}</p>
                    <div class="big-info">
                        <div class="big-l">
                            <div class="top">655</div>
                            <div class="bot">
                                <div class="mid">
                                    <span class="img1"></span>
                                    <span class="text">积分</span>
                                </div>
                                
                            </div>
                        </div>
                        <div class="big-r">
                            <div class="top">188.22</div>
                            <div class="bot">
                                <div class="mid">
                                    <span class="img2"></span>
                                    <span class="text">电子钱包</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="void"></div>
                <div class="nav-row">
                    <div class="item" v-for="(item,index) in navRows">
                        <router-link :to="`/orderList/${index}`" class="link" >
                            <span class="tips">
                                <span class="img-wrapper" :style="{'backgroundImage':'url('+item.icon+')'}"></span>
                                <span class="num" v-if="item.count>0">{{item.count>99?'99+':item.count}}</span>
                            </span>
                            <p>{{item.text}}</p>
                        </router-link>
                    </div>
                </div>
                
                <div class="nav">
                    <div 
                        class="nav-item" 
                        v-for="(item, index) in navs">
                        <div @click="clickItem(item)" class="link" >
                            <label>
                                <svg class="icon nav-icon" aria-hidden="true">
                                    <use :xlink:href="item.icon"></use>
                                </svg>{{item.text}}
                            </label>
                            <svg class="icon nav-next" aria-hidden="true">
                                <use xlink:href="#icon-xiangxia"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="log-out" v-if="userInfo.IsEmployee" @click="userLogOut">
                    <svg class="icon nav-next" aria-hidden="true">
                        <use xlink:href="#icon-tuichudenglu1"></use>
                    </svg>&nbsp;退出当前账号
                </div>
            </div>
        </scroller-super>
    </div>
</template>

<script>
     
    import { getOrderCount,logout } from 'api/lc';
    import userBg from './img/3.png'
    import waitPay from './img/8.png'
    import hasPay from './img/5.png'
    import hasClose from './img/6.png'
    import allOrder from './img/7.png'
    export default {
        name: 'app-user',
        data() {
            return {
                userBg,
                navRows: [{
                    icon: waitPay,
                    text: '待付款',
                    count: 0
                }, {
                    icon: hasPay,
                    text: '已付款',
                    count: 0
                }, {
                    icon: hasClose,
                    text: '已关闭',
                    count: 0
                }, {
                    icon: allOrder,
                    text: '全部订单',
                    count: 0
                }],
                navs: [
                //二期修改（暂缓）
                {
                    icon: '#icon-xiugaimima',
                    text: '修改密码',
                    router: 'passwordSetting',
                }, {
                    icon: '#icon-tuichudenglu',
                    text: '退出登陆',
                    router: '',
                }]
            }
        },
        computed: {
            ...Vuex.mapState([
                'config',
                'agent',
                'userInfo',
                'userPageRefreshFlag'
            ]),
            renderData() {
                return {
                    agent: this.agent,
                    userInfo: this.userInfo,
                    userPageRefreshFlag: this.userPageRefreshFlag
                }
            },
        },
        methods: {
            ...Vuex.mapMutations([
                'set_userInfo',
                'set_addressList',
                'set_appCart',
                'set_appFavorite',
                'set_cartTotalMoney',
                'set_orderAddress',
                'set_appCartCampus',
                'set_goodsDetailCampus',
                'set_vaildCartList',
                'set_expiredCartList'
            ]),
            apiPromise() {
                let promise = getOrderCount();
                promise.then(res => {
                    if (res.ErrorCode==app.errok) {
                        let data = res.Data;
                        this.navRows[1].count = data.WaitForPayOrderCount;
                        this.navRows[3].count = data.WaitForCommentOrderCount;
                    }
                });
                return promise;
            },
            renderOrderCount() {
                this.apiPromise();
            },
            userLogOut() { //小程序退出登录
                app.confirm('确定要退出登录吗？').then(res => {
                    if (res === true) {
                        logout().then(res => {
                            if (res.ErrorCode == app.errok) {
                                

                                this.set_userInfo({});
                                this.set_addressList([]);
                                this.set_appCart(-1);
                                this.set_appFavorite([]);
                                this.set_cartTotalMoney(0);
                                this.set_orderAddress({});
                                this.set_vaildCartList([]); //购物车有效商品列表
                                this.set_expiredCartList([]);
                                this.set_appCartCampus({
                                    "ID": "",
                                    "Name": "",
                                    "Products": []
                                });
                                this.set_goodsDetailCampus({
                                    "ID": "",
                                    "Name": "",
                                    "Products": []
                                });
                                
                                setTimeout(() => {
                                    homeNav && homeNav.click(0); //让首页回到第一个导航'首页处'
                                }, (app.duration + 100))
                            }else{
                                app.toast('error', res.ErrorMsg);
                            }
                        });
                    }
                });
            },
            clickItem(obj) {
                console.log(obj);
                if (obj.router) {
                    this.$router.push(`/${obj.router}`)
                } else {
                    this.userLogOut()
                }
            }
        },
        created() {
            if (this.$route.name === 'home' && this.$route.params.homeIndex === '4') {
                this.renderOrderCount();
            }
        },
        watch:{
            userPageRefreshFlag(newVal,oldVal){ //是否刷新待支付订单数量
                this.renderOrderCount();
            }
        }
    }
</script>