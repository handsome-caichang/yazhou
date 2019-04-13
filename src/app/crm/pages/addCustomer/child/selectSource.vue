<style scoped lang="scss">
    
    
    .actionsheet {
        @include position-absolute;
        .actionsheet-wrap {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 9999;
            .as-mask {
                width: 100%;
                height: 100%;
                background-color: $color-mask;
            }
            .as-box {
                @include position-absolute(0, 0, 0, 20%);
                background-color: $color-white;
                .top {
                    height: 64px;
                    line-height: 64px;
                    text-align: center;
                    font-size: 16px;
                    border-bottom: 1px solid $color-assist-1;
                }
                .scroll-body {
                    @include position-absolute(64px, 0, 0, 0);
                    display: flex;
                    color: $color-6;
                    font-size: 13px;
                    .left {
                        width: 120px;
                        background-color: $color-assist-1;
                        .item-left {
                            height: 49px;
                            line-height: 49px;
                            padding: 0 12px;
                            @include ellipsis-single;
                            &.active {
                                background-color: $color-white;
                                color: $color-primary;
                            }
                        }
                    }
                    .right {
                        flex: 1;
                        .item-right {
                            height: 49px;
                            line-height: 49px;
                            padding: 0 12px;
                            @include ellipsis-single;
                            &.active {
                                color: $color-primary;
                            }
                        }
                    }
                }
            }
        }
    }
    .as-anim-enter-active, .as-anim-leave-active {
        transition: all $duration $timing;
        .as-mask {
            opacity: 1;
            transition: all $duration $timing;
        }
        .as-box {
            transition: all $duration $timing;
            transform: translate3d(0, 0, 0);
        } 
    }
    .as-anim-enter, .as-anim-leave-active {
        .as-mask{
            opacity: 0;
        }
        .as-box {
            transform: translate3d(100%, 0, 0);
        }
    }

</style>

<template>
    <transition name="as-anim">
        <div class="actionsheet" v-if="opened">
            <div class="actionsheet-wrap">
                <div class="as-mask" @click="opened=false"></div>
                <div class="as-box">
                    <div class="top">
                        招生来源
                    </div>
                    <div class="scroll-body">
                        <scroller-base class="left" :data="list">
                            <div class="item-left" 
                                 v-for="item in list" 
                                 @click="bigEmit(item.id)"
                                 :class="{active:item.isSelect}">
                                {{item.value}}
                            </div>
                            <div class="right"></div>
                        </scroller-base>
                        <scroller-base class="right" :data="smallList">
                            <div class="item-right"
                                 v-for="item in smallList"
                                 @click="smallEmit(item.id)"
                                 :class="{active:item.isSelect}">
                                     {{item.value}}
                                 </div>
                        </scroller-base>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean
            },
            list: {
                type: Array
            }
        },
        computed: {
            smallList() {
                return this.list.filter(obj => obj.isSelect)[0] && this.list.filter(obj => obj.isSelect)[0].list || []
            }
        },
        data() {
            return {
                // smallList: []
            }
        },
        methods: {
            bigEmit(id) {
                this.$emit('selectBigItem', id)
            },
            smallEmit(id) {
                this.$emit('selectSmallItem', id)
                this.opened = false
            }
        },
        created() {
            window.a = this
        }
    }
</script>