<!-- iscroll 滚动组件 -->
<style lang="scss" scoped>
    
    .scroll-box {
        background-color: $color-assist-1;
        overflow: hidden;
        .scroll-wrapper{
            width: 100%;
            height: 100%;
            position: relative;
            .s-window {
                width: 100%;
                height: 100%;
            }
            .scroller-refresh-bar-interface {
                position: absolute;
                left: 0;
                transform: translateY(-100%);
                width: 100%;
                .refresh-bar-default {
                    height: 44px;
                    line-height: 44px;
                    text-align: center;
                    font-size: 14px;
                    color: #666;
                    .refreshing-text {
                        display: none;
                    }
                    &.active {
                        .refresh-text {
                            display: none;
                        }
                        .refreshing-text {
                            display: inline-block;
                        }
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="scroll-box">
        <div class="scroll-wrapper" ref="scrollWrapper"
            @touchstart="boxtouchstart($event)"
            @touchmove="boxtouchmove($event)"
            @touchend="boxtouchend($event)"
            @mousedown="boxtouchstart($event)"
            @mousemove="boxtouchmove($event)"
            @mouseup="boxtouchend($event)">

            <div class="scroller-refresh-bar-interface"
                ref="refreshBar">
                <slot name="refreshBar">
                    <div class="refresh-bar-default">
                        <span class="refresh-text">下拉刷新</span>
                        <span class="refreshing-text">刷新中...</span>
                    </div>
                </slot>
            </div>

            <component :is="type === 1 ? scrollerBase : scrollerLoad"
                ref="scrollerVue"
                class="s-window"
                :data="data"
                :pagingOption="pagingOption"
                @loadData="emitLoadData"
                @loadFirst="emitLoadFirst">

                    <slot></slot>
                    <slot name="loadBar"></slot>
                    
            </component>
        </div>
    </div>
</template>
<script>
    import scrollerBase from './scroller-base.vue'
    import scrollerLoad from './scroller-load.vue'
    export default {
        name: 'scroller-super',
        props: {
            data: {
                default: null
            },
            // 开启何种刷新模式, 1:只有下拉刷新, 2: 还有上拉加载;
            type: {
                type: Number,
                default: 1
            },
            api: {
                type: Function,
            },
            // 参照'paging'传参
            pagingOption: {
                type: Object
            },
        },
        data() {
            return {
                scrollerBase,
                scrollerLoad,
                distY: 0,
                start: false,
                pointY: 0,
                switch: false,
                moveNum: 0,
                // 用于保存'baseScroller'滚动条实例
                scroller: null,
                paging: null,
            }
        },
        methods: {
            emitLoadData(promise) {
                this.$emit("loadData", promise)
            },
            emitLoadFirst(promise) {
                this.$emit("loadFirst", promise)
            },
            // 获取刷新栏的高度
            _getrefreshBarHeight(){
                this.refreshBarHeight = this.$refs.refreshBar.offsetHeight;
                this.refreshBar = this.$refs.refreshBar.children[0];
            },
            // 暴露给外部调用的刷新方法;
            refresh(params) {
                if (this.type === 1) {
                    return this.api(params);
                } else if (this.type === 2) {
                    return this.paging.pagingRefresh(params);
                }
            }, 
            // 由下拉导致的刷新, 该组件内部调用;
            _refresh() {
                app.dom.addClass(this.refreshBar, "active");
                this.refresh().then(res => {
                    this.distY = 0;
                    app.dom.removeClass(this.refreshBar, "active");
                    this.$refs.scrollWrapper.style.transform = `translate(0, ${this.distY}px)`
                })
            },
            boxtouchstart(e) {
                if (this.scroller.y === 0) {
                    let point = e.touches ? e.touches[0] : e;
                    this.start = true;
                    this.pointY = point.pageY;
                }
            },
            boxtouchmove(e) {
                let point = e.touches ? e.touches[0] : e, deltaY;
                deltaY = (point.pageY - this.pointY)/3;
                this.pointY = point.pageY;

                if (this.start && this.scroller.y === 0) {
                    if (this.moveNum === 0) {
                        this.moveNum += 1;
                        if (deltaY > 0) {
                            this.switch = true;
                            this.scroller.enabled = false;
                        } else {
                            this.switch = false;
                        }
                    }
                    if (this.start && this.switch) {
                        this.distY += deltaY;
                        this.distY = this.distY > 0 ? this.distY : 0;
                        this.$refs.scrollWrapper.style.transform = `translate(0, ${this.distY}px)`
                    }
                }
            },
            boxtouchend(e) {
            	this.refreshBarHeight = this.$refs.refreshBar.offsetHeight;
                this.start = false;
                this.moveNum = 0;
                setTimeout(() => {
                    this.scroller.enabled = true;
                }, 0)

                if (this.distY >= this.refreshBarHeight ) {
                    this.distY = this.refreshBarHeight;
                    this._refresh();
                } else {
                    this.distY = 0;
                }
                this.$refs.scrollWrapper.style.transform = `translate(0, ${this.distY}px)`
            },
        },
        mounted() {
            this._getrefreshBarHeight();
            this.scroller = this.$refs.scrollerVue.scroller;
            this.paging = this.$refs.scrollerVue;
        }
    };
</script>
