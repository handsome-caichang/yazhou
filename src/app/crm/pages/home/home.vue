<style lang="scss" scoped>  
    .home {
        @include position-absolute;
        .home-group {
            @include position-absolute(0, 0, 50px, 0);
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
            height: 50px;
            display: flex;
            color: $color-9;
            background-color: #F7F8FA;
            @include border-top($color-border-1);
            .home-nav-item {
                flex: 1;
                @include flex-center(column);
                padding-top: 3px;
                &.active {
                    color: $color-primary;
                    font-size: $fs-normal-x;
                }
                .icon {
                    font-size: 20px;
                }
                
                .text {
                    display: block;
                    font-size: 10px;
                    margin-top: 3px;
                }
            }
        }
    }
</style>

<template>
   <div class="home">
       <div class="home-group">
            <component
               class="home-group-item"
               v-for="(item, index) in list" 
               v-if="index===activeIndex"                
               :key="index"
               :is="item.component"
               :class="{active: activeIndex === index}">
            </component>
       </div>

       <div class="home-nav" ref="homeNav">
           <div class="home-nav-item"
               v-for="(item, index) in list"
               :class="{active: index === activeIndex}"
               @click="changHome(index)">
               <svg class="icon" aria-hidden="true">
                   <use :xlink:href="index === activeIndex ? item.iconAction : item.icon"></use>
               </svg>
               <span class="text">{{item.text}}</span>
           </div>
       </div>
    </div>
</template>

<script>
    import Clue from './child/clue.vue'
    import Customer from './child/customer.vue'
    import Application from './child/application/application.vue'
    export default {
        computed: {
            wxTitle() {
                return parseInt(this.$route.params.homeIndex) == 2 ? '客户管理' : 'CRM意向客户管理'
            }
        },
        data() {
            return {
                activeIndex: parseInt(this.$route.params.homeIndex) || 0,
                list:  [
                        {
                            icon: '#icon-xiansuo',
                            iconAction: '#icon-shouyexuanzhong',
                            text: '线索',
                            component: Clue
                        },{
                            icon: '#icon-kehu',
                            iconAction: '#icon-kehuxuanzhong',
                            text: '客户',
                            component: Customer
                        },{
                            icon: '#icon-yingyong',
                            iconAction: '#icon-yingyongxuanzhong',
                            text: '应用',
                            component: Application
                        }
                    ]
            }
        },
        methods: {
            changHome(index) {
                this.activeIndex = index
                this.$router.replace(`/home/${index}`)
            },
        }
    }
</script>