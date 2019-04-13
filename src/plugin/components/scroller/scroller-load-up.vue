<!-- iscroll 滚动组件 下拉加载 -->
<style lang="scss" scoped>
    .scroller-load-bar-interface {
        width: 100%;
        background-color: #EEF1F6;
        .load-bar-default {
            height: 44px;
            line-height: 44px;
            text-align: center;
            font-size: 14px;
            color: #666;
            .load-icon {
                width: 22px;
                height: 22px;
                vertical-align: middle;
                margin-right: 6px;
            }
            .loading-text {
                vertical-align: middle;
            }
        }
    }
</style>
<template>
    <scroller-base ref="baseScrollerVue" :data="data" :options="options">
        
        <slot></slot>

        <!-- 加载展示栏 -->
        <div class="scroller-load-bar-interface" 
            :slot="loadBarSlotName"
            v-show="hasData"
            ref='loadBar'>
            <slot name="loadBar">
                <div class="load-bar-default">
                    <img class="load-icon" src="./img/loading-small.gif">
                    <span class="load-text">加载中...</span>
                </div>
            </slot>
        </div>
    </scroller-base>
</template>
<script>
    import scrollerBase from './scroller-base.vue'

    export default {
        name: 'scroller-load-up',
        props: {
            options: {
                type: Object,
                default: {}
            },
            data: {
                default: null
            },
            hasData: {
                type: Boolean
            },
            // 加载栏展示的位置, 'bottom':上拉加载, 'top': 下拉加载;
            loadBarPosition: {
                type: String,
                default: 'bottom'
            },
            threshold: {
                type: Number,
                default: 50
            },
        },
        data() {
            return {
                // 用于保存'baseScroller'滚动条实例
                scroller: null,
            }
        },
        computed: {
            loadBarSlotName() {
                if (this.loadBarPosition === 'bottom') {
                    return 'bottom'
                } else if (this.loadBarPosition === 'top') {
                    return 'top'
                }
            }
        },
        methods: {
            // 获取加载更多栏的高度
            _getLoadBarHeight(){
                // this.loadBarHeight = this.$refs.loadBar.offsetHeight;
                return this.$refs.loadBar.offsetHeight;
            },
            emitEvent(eventName) {
               this.$emit('load-paging');
            },
            addEvent() {
                let s = this.scroller = this.$refs.baseScrollerVue.scroller,
                    loadBarH = this._getLoadBarHeight();
                s.on('scrollEnd', () => {
                    if (this.loadBarPosition === 'bottom') {
                        // 可滚动的内容区域高度是否大于滚动容器高度
                        let boolean1 = s.scrollerHeight - s.wrapperHeight > loadBarH;

                        // 是否滚动到可以'加载新数据'的位置
                        let boolean2 = s.scrollerHeight - s.wrapperHeight + s.y < this.threshold + loadBarH;

                        // 滚动到合适的位置时'加载新数据' 
                        if (boolean1 && boolean2) {
                            this.emitEvent()
                        }
                    } else if (this.loadBarPosition === 'top') {                    
                        if (s.y > 0 - (this.threshold + loadBarH)) {
                            this.emitEvent()
                        }
                    }
                })
            },
            // 在初次挂载时, 判断内容区域是否高于滚动容器, 若否则派发一次事件;
            abc() {
                let s = this.scroller = this.$refs.baseScrollerVue.scroller,
                    loadBarH = this._getLoadBarHeight();
                if (s.wrapperHeight > s.scrollerHeight - loadBarH - 100) {
                    this.emitEvent()
                }
            }
        },
        components: {
            scrollerBase
        },
        mounted() {
            this.addEvent();
            this.abc();
        }
    };
</script>
