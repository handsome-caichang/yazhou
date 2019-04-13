<!-- iscroll 滚动组件 -->
<style lang="scss" scoped>
    
    .scroller-window {
        overflow: hidden;
        .scroll-area {
            min-height: 100%;
        }
    }
</style>
<template>
    <div ref='scrollWindow' class="scroller-window">
        <div class="scroll-area"  ref='scrollerWrapper'>
            <slot name="top"></slot>

            <!-- 基础内容区域 -->
            <slot></slot>

            <slot name="bottom"></slot>
        </div>
    </div>
</template>
<script>
    import {KeyboardMixin} from './mixin/keyboard-mixin.js';

    export default {
        name: 'scroller-base',
        mixins: [app.mixin.winResizeMixin, KeyboardMixin],
        props: {
            // 会监控此数据的变化来动态刷新滚动条
            data: {
                default: null
            },
            // 实例化滚动条的选项, 同'iscroll5'的选项参数
            options: {
                type: Object
            },
        },
        data() {
            return {
                // 用于保存滚动条实例
                scroller: null,
                defaultCfg: {
                    mouseWheel: true, // 是否监听鼠标滚轮事件
                    momentum: true,
                    bindToWrapper: true,
                    bounce: false,
                    scrollbars: true, // 是否显示滚动条
                    fadeScrollbars: true, // 是否渐隐滚动条,关掉可以加速
                    scrollY: true, // 是否开启纵向滚动条
                    scrollX: false, // 是否开启横向滚动条
                    // probeType属性决定'scroll'事件的触发时机,可取范围为1,2,3;其它取值表示永不触发'scroll'事件
                    // 值1：当整个touch事件周期大于300ms时,在touchmove过程中触发'scroll'事件
                    // 值2：在touchmove过程中触发'scroll'事件; (当手离开屏幕而页面还在滚动时是不会触发的)
                    // 值3：整个滚动过程都个触发'scroll'事件,而不管手势是否已经离开屏幕
                    probeType: 0,
                    // 自动分割容器,用于制作走马灯效果等。
                    // 值true:根据容器尺寸自动分割
                    // 值"el":根据元素分割
                    snap: false,
                }
            }
        },
        methods: {
            // 实例化滚动条,并监听相应事件
            _initScroll() {
                let opts = Object.assign(this.defaultCfg, this.options)
                this.scroller = new IScroll(this.$refs.scrollWindow, opts);
            },
            _winResizeHandler() {
                this.refresh();
            },
            refresh() {
                this.scroller && this.scroller.refresh();
            },
        },
        mounted() {
            // 如果滚动条的窗口没有给绝对定位, 则默认给一个相对定位;
            let posStr = app.dom.getStyle(this.$refs.scrollWindow).position
            if (posStr !== 'absolute' && posStr !== 'relative') {
                this.$refs.scrollWindow.style.position = "relative"
            }

            this._initScroll();
        },
        beforeDestroy() {
            this.scroller && this.scroller.destroy();
        },
        watch: {
            data(newVal, oldval) {
                this.$nextTick(function() {
                    this.refresh();
                })
            }
        }
    };
</script>
