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
                .img {
                    width: 23px;
                    height: 23px;
                    @include background-img(false,cover);
                }
                &.active {
                    color: #F75050;
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
                v-for="(item, index) in home.list"                 
                :key="index"
                v-bind:is="item.component"
                @open-actionsheet="hideNav"
                :class="{active: home.activeIndex === index}">
            </component>
        </div>

        <div class="home-nav" ref="homeNav">
            <div class="home-nav-item"
                v-for="(item, index) in home.list"
                :class="{active: index === home.activeIndex}"
                @click="changHome(index)">
                <!-- <svg class="icon" aria-hidden="true">
                    <use :xlink:href="index === home.activeIndex ? item.iconAction : item.icon"></use>
                </svg> -->
                <div class="img" 
                    :style="{'backgroundImage':'url('+computedImg(index)+')'}">
                        
                    </div>
                <span class="text">{{item.text}}</span>
            </div>
        </div>

    </div>
</template>

<script>
    import Goods from 'page/app-goods/goods.vue'
    import Cart from 'page/app-cart/cart.vue'
    import User from 'page/app-user/user.vue'
    import img1 from './img/4.png'
    import img2 from './img/10.png'
    import img3 from './img/6.png'
    import img4 from './img/2.png'
    import img5 from './img/8.png'
    import img6 from './img/7.png'
    export default {
        name: 'home',
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
                            icon: img1,
                            iconAction: img2,
                            text: '学堂',
                            title: "全部商品",
                            component: Goods
                        },{
                            icon: img3,
                            iconAction: img4,
                            text: '购物车',
                            title: '购物车',
                            component: Cart
                        },{
                            icon: img5,
                            iconAction: img6,
                            text: '我的',
                            title: '我的',
                            component: User
                        }
                    ]
                },
                // 通过改变这个值，使内部页面的窗口大小发生变化；在内部页面的有弹窗出来时可以全屏；
                homeGroupSheet: false,
            }
        },
        computed: {
            wxTitle() {
                return this.home.list[this.home.activeIndex].title
            }
        },
        methods: {
            computedImg(index) {
                if (this.home.activeIndex === index) {
                    return this.home.list[index].iconAction
                } else {
                    return this.home.list[index].icon
                }
            },
            hideNav(val) {
                this.homeGroupSheet = val
            },
            changHome(index) {
                this.home.activeIndex = index
                this.$router.replace(`/home/${index}`)
            },
            sharePage() {
                
                app.tool.mallShare({
                    title: this.$store.state.config.CompanyName,
                    desc: this.$store.state.config.Summary,
                    link: app.tool.parseToWXshareUrl(this.$route.fullPath),
                    imgUrl: this.$store.state.config.Logo
                });
            },
            close() {
                this.openSsh = false;
            }
        },
        created() {
            
        },
        mounted() {
           window.a = this
        },
        components: {
           
        },
        watch: {
            
        }
    };
</script>
