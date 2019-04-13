<!-- home -->
<style lang="scss" scoped>
    .home {
        @include position-absolute;
        .home-group {
            @include position-absolute(0, 0, $h-1, 0);
            z-index: 0;
            &.home-group-actionsheet {
                @include position-absolute(0, 0, 0, 0);
                z-index: 2;
            }
            .home-group-item {
                z-index: 1;
                opacity: 0;
                &.active {
                    z-index: 2;
                    opacity: 1;
                }
            }
        }
        .home-nav {
            position: absolute !important;
            left: 0;
            bottom: 0;
            width: 100%;
            height: $h-1;
            display: flex;
            background-color: $color-white;
            @include border-top($color-border-1);
            .home-nav-item {
                flex: 1;
                @include flex-center(column);
                &.active {
                    color: $color-primary;
                    font-size: $fs-normal-x;
                }
                .icon {
                    font-size: 20px;
                }
                
                .text {
                    display: block;
                    font-size: $fs-small-s;
                    margin-top: 3px;
                }
            }
        }
    }

    .as-campus {
        @include position-absolute;
        z-index: 2;
    }
</style>

<template>
    <div class="home">
        <div class="home-group" :class="{'home-group-actionsheet': homeGroupSheet}">
            <component
                class="home-group-item"
                v-for="(item, index) in computList"                 
                :key="index"
                v-bind:is="item.component"
                @open-actionsheet="hideNav"
                :class="{active: home.activeIndex === index}">
            </component>
        </div>

        <div class="home-nav" ref="homeNav">
            <div class="home-nav-item"
                v-for="(item, index) in computList"
                :class="{active: index === home.activeIndex}"
                @click="changHome(index)">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="index === home.activeIndex ? item.iconAction : item.icon"></use>
                </svg>
                <span class="text">{{item.text}}</span>
            </div>
        </div>

        <actionsheet-campus class="as-campus" 
            ref="filter"
            position="center"
            v-if='curCampusIsNull'
            :opened.sync="openAsCampus"
        ></actionsheet-campus>

        <actionsheet-ssh class="as-campus" 
            :opened.sync="openSsh"
            :code="qrcode"
            @close="close"
            v-if='qrcodeIsNull'
        ></actionsheet-ssh>

    </div>
</template>

<script>
     
    import AppMall from 'page/app-mall/app-mall.vue'
    import AppCourse from 'page/app-course/app-course.vue'
    import AppGoods from 'page/app-goods/app-goods.vue'
    import AppCart from 'page/app-cart/app-cart.vue'
    import AppUser from 'page/app-user/app-user.vue'
    import ActionsheetCampus from 'common/actionsheets/actionsheets-campus.vue'
    import ActionsheetSsh from 'common/actionsheets/actionsheets-ssh.vue'
    import {getQrCode} from 'api/lc.js'
    export default {
        name: 'home',
        mixins: [app.mixin.shareMixin],
        data() {
            return {
                // 是否显示'校区选择'组件
                openAsCampus: true,
                openSsh: false,  // 是否显示code
                qrcode: '',
                home: {
                    activeIndex: parseInt(this.$route.params.homeIndex) || 0,
                    list: [
                        {
                            icon: '#icon-shouyeiconwuse1',
                            iconAction: '#icon-shouyeicontianse1',
                            text: '首页',
                            component: AppMall
                        },{
                            icon: '#icon-xuankeiconwuse',
                            iconAction: '#icon-xuankeicon',
                            text: '选课',
                            component: AppCourse
                        },{
                            icon: '#icon-shangchengiconwuse',
                            iconAction: '#icon-shangchengiconyouse',
                            text: '商城',
                            component: AppGoods
                        },{
                            icon: '#icon-gouwucheiconwuse1',
                            iconAction: '#icon-gouwucheicontianse',
                            text: '购物车',
                            component: AppCart
                        },{
                            icon: '#icon-wodeiconwuse1',
                            iconAction: '#icon-wodeicontianse1',
                            text: '我的',
                            component: AppUser
                        }
                    ]
                },
                // 通过改变这个值，使内部页面的窗口大小发生变化；在内部页面的有弹窗出来时可以全屏；
                homeGroupSheet: false,
            }
        },
        computed: {
            ...Vuex.mapState([
                'config',
            	'curCampus', 
            	'userInfo'
            ]),
            // 是否渲染或销毁'校区选择'组件
            curCampusIsNull() {
                return this.curCampus.id ? false : true;
            },
            qrcodeIsNull() {
                if (this.curCampus.id) {
                    return this.openSsh;
                }else {
                    return false;
                }
            },
            wxTitle() {
                return this.computList[this.home.activeIndex].title
            },
            computList() {
                var list = [
                            {
                                icon: '#icon-shouyeiconwuse1',
                                iconAction: '#icon-shouyeicontianse1',
                                text: '首页',
                                title: this.config.CompanyName || "首页",
                                component: AppMall
                            },{
                                icon: '#icon-xuankeiconwuse',
                                iconAction: '#icon-xuankeicon',
                                text: '选课',
                                title: '选课报名',
                                component: AppCourse
                            },{
                                icon: '#icon-shangchengiconwuse',
                                iconAction: '#icon-shangchengiconyouse',
                                text: '商城',
                                title: '商城',
                                component: AppGoods
                            },{
                                icon: '#icon-gouwucheiconwuse1',
                                iconAction: '#icon-gouwucheicontianse',
                                text: '购物车',
                                title: '购物车',
                                component: AppCart
                            },{
                                icon: '#icon-wodeiconwuse1',
                                iconAction: '#icon-wodeicontianse1',
                                text: '我的',
                                title: '我的',
                                component: AppUser
                            }
                        ]
                if (this.userInfo.IsEmployee) {
                    list.splice(3, 1)
                }
                return list
            }
        },
        methods: {
            changHome(index) {
            	if((index==3||index==4) && !this.userInfo.Name){
                	this.$router.push('/login');
            		return;
            	}
                this.home.activeIndex = index;
                this.$router.replace(`/home/${index}`);
            },
            hideNav(val) {
                // 如果不存在考试ID查询参数, 如果存在考试ID查询参数，需要一直隐藏底部导航栏；
                if (!this.$route.query.ExamId) {
                   if (!val) {
                       setTimeout(val => {
                           this.homeGroupSheet = val;
                       }, app.duration)
                   } else {
                       this.homeGroupSheet = val;
                   } 
                }
            },
            close() {
                this.openSsh = false;
            }
        },
        created() {
            // 新学员领取电子推荐卡的优惠卷之后，会进入到商城，通过弹窗二维码来关注公众号
            if ( this.$route.query.binding) {
                getQrCode({
                    binding: 1
                }).then(res => {
                    if (res.ErrorCode == app.errok) {
                        console.log(res);
                        if (res.Data && res.Data.QrCode) {
                            this.qrcode = res.Data.QrCode;
                            this.openSsh = true;
                            location.replace(location.hash.replace('binding=1', ''));
                        }
                    }
                })
            }
            // 如果存在考试ID查询参数，则一直隐藏底部导航栏；
            if (this.$route.query.ExamId) {
                this.homeGroupSheet = true;
            }


            // 目的是为了把校区id做为查询参数放到url的hash上
            if (!this.$route.query.cid) {
                this.$router.replace(this.$route.fullPath)
            }

            this.v_shareResolve(function () {
                if (this.$route.params.homeIndex < 3){
                    return  app.tool.mallShare({
                        title: this.$store.state.config.CompanyName,
                        desc: this.$store.state.config.Summary,
                        link: app.tool.parseToWXshareUrl(this.$route.fullPath),
                        imgUrl: this.$store.state.config.Logo
                    });
                }
            })
        },
        mounted() {
            window.homeNav = this.$refs.homeNav.children[0];
        },
        components: {
            AppMall,
            AppCourse,
            AppCart,
            AppUser,
            ActionsheetCampus,
            ActionsheetSsh
        },
        watch: {
            curCampus(val, oldval) {
                this.v_updateShareMessage()
            },
        }
    };
</script>
