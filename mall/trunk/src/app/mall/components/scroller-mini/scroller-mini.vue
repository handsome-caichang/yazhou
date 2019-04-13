<!-- iscroll 滚动组件 -->
<style lang="scss" scoped>
    
    .scroller {
        overflow: hidden;
    }
    .load-bar {
        height: $h-3;
        line-height: $h-3;
        text-align: center;
        background-color: $color-assist-3;
        .load-icon {
            width: 22px;
            height: 22px;
            vertical-align: middle;
            margin-right: 6px;
        }
        .load-text {
            vertical-align: middle;
        }
    }
</style>
<template>
    <div ref='scroller' class="scroller">
            <!-- 基础滚动区域 -->
            <slot></slot>
    </div>
</template>
<script>
    // import JScroll from 'assets/js/vendor/jscroll.js'
    // import JScroll from 'assets/js/vendor/jscroll.js'
    export default {
                props:{
                    list: {
                        default: null
                    },
                    click: {
                        type: Boolean,
                        default: true
                    },
                    probeType: {
                        type: Number,
                        default: 1
                    },
                    listenScroll: {
                        type: Boolean,
                        default: false
                    },
                    bounce: {
                        type: Boolean,
                        default: false
                    },
                    momentum: {
                        type: Boolean,
                        default: false
                    },
                    scrollX: {
                        type: Boolean,
                        default: false
                    },
                    scrollY: {
                        type: Boolean,
                        default: true
                    },
                    probeType: {
                        type: Number,
                        default: 3
                    }
                },
                mounted() {
                    setTimeout(() =>{
                        this._initScroll();
                    },0)
                },
                methods: {
                    _initScroll() {
                        if (!this.$refs.scroller) {
                            return
                        }
                        this.scroll = new IScroll(this.$refs.scroller,{
                            click: this.click,
                            probeType: this.probeType,
                            listenScroll: this.listenScroll,
                            scrollX: this.scrollX,
                            bounce: this.bounce,
                            momentum: this.momentum,
                            probeType: this.probeType,
                            scrollY: this.scrollY,
                            bindToWrapper: true,
                        });
                        if (this.listenScroll) {
                            let that = this;
                            this.scroll.on('scroll', (pos) =>{
                                that.$emit('scroll', {
                                    x: this.scroll.x,
                                    y: this.scroll.y
                                });
                            })
                        }
                    },
                    disable() {
                      this.scroll && this.scroll.disable()
                    },
                    enable() {
                      this.scroll && this.scroll.enable()
                    },
                    refresh() {
                      this.scroll && this.scroll.refresh()
                    },
                    scrollTo() {
                        this.scroll && this.scrollTo.apply(this.scrollTo, arguments);
                    },
                    scrollToElement() {
                      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
                    }
                },
                watch:{
                    list(val,oldVal) {
                        this.$nextTick(() =>{
                            this.refresh();
                        })
                    }
                }
    }
</script>
