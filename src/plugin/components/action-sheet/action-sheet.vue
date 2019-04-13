<style lang="scss" scoped>
    @import 'src/plugin/scss/variable.scss';
    @import 'src/plugin/scss/mixin.scss';

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
            @include position-absolute(false, 0, false, 0);
            background-color: $color-white;
            &.side {
                top: 0;
                bottom: 0;
                display:flex;
                flex-direction: column;
                justify-content: space-between;
                .container{
                    flex:1;
                    position:relative;
                    .as-body {
                        @include position-absolute;
                    }
                }
                &.sideRight {
                    left: 20%;
                    right: 0;
                }
                &.sideLeft {
                    left: 0;
                    right: 20%;
                }
                /* 填充满父容器时的样式*/
                &.fullParent {
                    left: 0;
                    right: 0;
                }
            }
            &.middle {
                &.top {
                    top: 0;
                }
                &.bottom {
                    bottom: 0;
                }
                &.center {
                    left: $edge-popup*2;
                    right: $edge-popup*2;
                    top: 50%;
                    transform: translate(0, -50%);
                    border-radius: $border-radius-big;
                    overflow: hidden;
                }
                .container{
                    .as-body {
                        position: relative;
                        max-height: 240px;
                        max-height: 55vh;
                        overflow: hidden;
                        color: $color-3;
                        .scroll-wrapper{
                            @include position-absolute;
                        }
                    }
                }
                
                .as-header, .as-footer {
                    height: $h-1;
                    line-height: $h-1;
                    text-align: center;
                    color: $color-3;
                    font-size: $fs-normal-x;
                    @include border-bottom($color-border-1);
                }
            }
           
        }
    }

    // 动画
    .as-anim-enter-active, .as-anim-leave-active {
        transition: all $duration $timing;
        .as-mask {
            opacity: 1;
            transition: all $duration $timing;
        }
        .as-box {
            transition: all $duration $timing;
        }
        .as-box.bottom, .as-box.top,
        .as-box.sideRight, .as-box.sideLeft {
            transform: translate3d(0, 0, 0);
        }
        .as-box.middle.center {
            transform: translate(0, -50%) scale(1);
            transform-origin: center center;
        }
    }

    .as-anim-enter, .as-anim-leave-active {
        .as-mask{
            opacity: 0;
        }
        .as-box.bottom {
            transform: translate3d(0, 100%, 0);
        }
        .as-box.top {
            transform: translate3d(0, -100%, 0);
        }
        .as-box.middle.center {
            transform: translate(0, -50%) scale(0.1);
        }
        .as-box.sideRight {
            transform: translate3d(100%, 0, 0);
        }
        .as-box.sideLeft {
            transform: translate3d(-100%, 0, 0);
        }
    }
</style>

<template>
    <transition name="as-anim">

        <!-- actionsheet 的布局大小应该由外部调用组件指定 -->
        <div class="actionsheet">
            <div class="actionsheet-wrap">
                <div class="as-mask" @click='maskToCloseHandler'></div>
                <div class="as-box" :class="boxClass">
                    <div class="header">
                        <slot name="header">
                            <div class="as-header" v-if='header'>{{header}}</div>
                        </slot>
                    </div>
                    <div class="container" :style="scrollerStyle">
                        <scroller-base v-if="scrollerConfig.tag=='base'"
                            class="as-body"
                            ref="scroller"
                            :data="data">
                                <slot></slot>
                        </scroller-base>
                        
                        <scroller-super v-if="scrollerConfig.tag=='super'"
                            class="as-body"
                            ref="scroller"
                            :data="data"
                            :api="scrollerConfig.api"
                            
                            :type="scrollerConfig.type"
                            :pagingOption="scrollerConfig.pagingOption"
                            @loadData="emitLoadData"
                            @loadFirst="emitLoadFirst">
                                <slot></slot>
                                <slot name="loadBar"></slot>
                        </scroller-super>
                        
                        <scroller-load v-if="scrollerConfig.tag=='load'"
                            class="as-body"
                            ref="scroller"
                            :data="data"
                            :type="scrollerConfig.type"
                            :pagingOption="scrollerConfig.pagingOption"
                            @loadData="emitLoadData"
                            @loadFirst="emitLoadFirst">
                                <slot></slot>
                                <slot name="loadBar"></slot>
                        </scroller-load>
                        
                    </div>
                    <div class="footer">
                        <slot name="footer" ref="asFooter" class="footer">
                            <div class="as-footer" v-if='footer'>{{footer}}</div>
                        </slot>
                    </div>
                </div>
            </div>
        </div>

    </transition>
</template>

<script>
    export default {
        name: 'actionsheet',
        props: {
            data: {
                default: null
            },
            scrollerConfig:{
                type:Object,
                default:()=>{
                    return {
                        tag:'base',     //base或load或super
                        api:null,           //load和super的参数
                        type:2,             //load和super的prop参数,加载和刷新的方式.
                        pagingOption:{}     //load和super的prop参数
                    }
                }
            },
            maskToClose: {
                type: Boolean,
                default: true
            },
            // 取值范围'top','bottom','center', 'sideLift', 'sideRight'
            position: {
                type: String,
                default: 'bottom'
            },
            maxHeight: {
                type: Number,
                default: 0
            },
            header: {
                default: ''
            },
            footer: {
                default: ''
            },
            scrollerStyle: {
                type: Object
            },
            // 侧滑推出时是否填充满父容器
            fullParent: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
            };
        },
        computed: {
            boxClass() {
                // 扩展了填充满父容器的样式
                return this.position.indexOf('side') !== 0 
                    ? `middle ${this.position}`
                    : (this.fullParent ? `side ${this.position} fullParent` : `side ${this.position}`);
            }
        },
        methods: {
            emitLoadData(promise) {
              this.$emit("loadData", promise);
            },
            emitLoadFirst(promise) {
              this.$emit("loadFirst", promise);
            },
            close(type) {
                this.$emit('close', type);
            },
            maskToCloseHandler() {
                // 防止在关闭动画时多次点击,造成路由多次回退;
                if (this.maskClicked) {
                    return;
                } else {
                    this.maskClicked = true;
                    setTimeout(() => {
                        this.maskClicked = false;
                    }, app.config.duration + 100)
                }

                this.maskToClose && this.close('maskToClose');
            },
            // 代理滚动条刷新的方法
            refresh() {
                this.$refs.scroller.refresh();
            }
        },
        mounted() {
        }
    };
</script>
