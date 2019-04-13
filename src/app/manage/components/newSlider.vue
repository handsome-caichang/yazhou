<!-- 轮播图组件 -->
<style lang="scss" scoped>
    .slider {
        // line-height: 0;
        .slider-group {
            height: 100%;
            overflow: hidden;
            // white-space: nowrap;
            zoom: 1;
            &:after {
                visibility: hidden;
                display: block;
                font-size: 0;
                content: " ";
                clear: both;
                height: 0;
            }
            .slider-item {
                float: left;
                overflow: hidden;
            }
        }
        .dots {
            position: absolute;
            right: 0;
            left: 0;
            bottom: -19px;
            text-align: center;
            font-size: 0;
            .dot {
                display: inline-block;
                margin: 0 4px;
                width: 7px;
                height: 7px;
                border-radius: 50%;
                // background: rgba(255, 255, 255, 0.5);
            }
            &.dots0 {
                .dot {
                    background:rgba(230,230,230,1);
                    &.active {
                        background:rgba(254,92,0,1);
                    }
                }
            }
            &.dots1 {
                .dot {
                    background: rgba(180, 180, 180, 0.5);
                    &.active {
                        background: rgba(180, 180, 180, 1);
                    }
                }
            }
        }
    }
</style>

<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot v-bind:currentPageIndex="currentPageIndex">
            </slot>
        </div>
        <div class="dots" :class="`dots${dotType}`" v-if='showDots'>
            <span class="dot" v-for="(item, index) in dots" :key="index" :class="{active: currentPageIndex === index }"></span>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'newSlider',
        mixins: [app.mixin.winResizeMixin],
        props: {
            // 
            dotType: {
                type: Number,
                default: 0
            },
            // 是否开启自动轮播
            autoPlay: {
                type: Boolean,
                default: false
            },
            // 是否展示
            showDots: {
                type: Boolean,
                default: true
            },
            // 嵌套的层级深度
            level: {
                type: Number,
                default: 0
            },
            // 将根据此
            data: {
                default: null
            },           
            // 是否启用弹力动画效果，关掉可以加速
            bounce: {
                type: Boolean,
                default: false
            },
            // 开启自动轮播时的间隔时间
            interval: {
                type: Number,
                default: 3000
            },
            // 自动轮播时，切换一页的动画时长
            duration: {
                type: Number,
                default: 200
            },
            // 是否启用click事件。
            click: {
                type: Boolean,
                default: false
            },
            // 是否关闭鼠标事件探测。
            disableMouse: {
                type: Boolean,
                default: false
            },
            // 是否关闭指针事件探测。
            disablePointer: {
                type: Boolean,
                default: false
            },
            // 是否关闭触摸事件探测。
            disableTouch: {
                type: Boolean,
                default: false
            },
            // 是否开启动量动画。
            momentum: {
                type: Boolean,
                default: false
            },
            // 是否监听鼠标滚轮事件。
            mouseWheel: {
                type: Boolean,
                default: false
            },
            // 自动分割容器，用于制作走马灯效果等。
            // Options.snap:true//根据容器尺寸自动分割
            // Options.snap:el//根据元素分割
            snap: {
                default: true
            },
            // 此属性决定'scroll'事件的触发时机，可取范围为1,2,3;其它取值表示永不触发'scroll'事件
            // 值1：当整个touch事件周期大于300ms时，在touchmove过程中触发'scroll'事件
            // 值2：在touchmove过程中触发'scroll'事件
            // 值3：整个滚动过程都个触发'scroll'事件,而不管手势是否已经离开屏幕
            probeType: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                dots: [],
                // 当前轮播在第几项
                currentPageIndex: 0,
                // 是否可以自动轮播
                isCanAutoPlay: true,
            }
        },
        methods: {
            // 设置 UI 布局
            _setSliderUI() {
                this.children = this.$refs.sliderGroup.children;

                let width = 0;
                let sliderWidth = this.$refs.slider.clientWidth;

                for (let i = 0; i < this.children.length; i++) {
                    let child = this.children[i];
                    app.dom.addClass(child, 'slider-item');

                    child.style.width = sliderWidth + 'px';
                    width += sliderWidth;
                }

                this.$refs.sliderGroup.style.width = width + 'px';
            },
            _initDots() {
                this.dots = new Array(this.children.length)
            },
            // 实例化slider,监听并代理相应的事件
            _initSlider() {
                if (this.children.length > 1) {
                    this._initDots()

                    // 实例化滚动条时的选项参数
                    let options = {
                        bindToWrapper: true,
                        bounce: this.bounce,
                        scrollX: true,
                        snap: this.snap,
                        click: this.click,
                        momentum: this.momentum,
                        probeType: this.probeType
                    }

                    // 如果已经存在slider实例，则先销毁。
                    this._destroySlider();

                    this.slider = new IScroll(this.$refs.slider, options);

                    this.autoPlay && this._autoPlay();

                    this.$refs.slider.addEventListener('touchstart', () => {
                        this.isCanAutoPlay = false;
                    })
                    this.$refs.slider.addEventListener('touchend', () => {
                        this.isCanAutoPlay = true;
                    })
                    this.$refs.slider.addEventListener('mousedown', () => {
                        this.isCanAutoPlay = false;
                    })
                    this.$refs.slider.addEventListener('mouseup', () => {
                        this.isCanAutoPlay = true;
                    })

                    this.slider.on('beforeScrollStart', () => {
                        this._beforeScrollStartHandler();
                    });                    

                    this.slider.on('scroll', () => {
                        this._scrollHandler();
                    });

                    this.slider.on('scrollEnd', () => {
                        this._scrollEndHandler();
                    });
                }
            },
            _beforeScrollStartHandler() {
                // 派发事件
                this.$emit('beforeScrollStart', this.slider);
            },
            _scrollHandler() {
                // 派发事件
                this.$emit('scroll', this.slider);
            },
            _scrollEndHandler() {
                // console.log(this.slider.currentPage);
                this.currentPageIndex = this.slider.currentPage.pageX;

                // 派发事件
                this.slider.options.probeType === 3 && this.$emit('scroll', this.slider);
                this.$emit('scrollEnd', this.slider);
            },
            _autoPlay () {
                if (!this.autoPlay) return
                this.timer = setInterval(() => {
                    this.next();
                }, this.interval)
            },
            _destroySlider() {
                clearInterval(this.timer);
                this.slider && this.slider.destroy();
            },
            _winResizeHandler() {
                // 解决window的'resize'事件后，导致可能会出现自动轮播停止;
                // 原因是如果resize时正好在轮播，那么会马上完成当前轮播动画;
                // 但是并不会触发'scrollEnd'事件，导致'currentPageIndex'没有更新
                this.slider && (this.currentPageIndex = this.slider.currentPage.pageX);

                clearTimeout(this.wTimer);
                this.wTimer = setTimeout(() => {
                    this._setSliderUI();
                    this.refresh();
                }, 20*this.level);
            },
            next() {
                let pageIndex = (this.currentPageIndex + 1) % this.dots.length;
                this.goToPage(pageIndex);
            },
            prev() {
                let pageIndex = (this.currentPageIndex - 1);
                pageIndex = pageIndex < 0 ? this.dots.length - 1 : pageIndex;

                this.goToPage(pageIndex);
            },
            goToPage(x, y = 0, duration = this.duration) {
                console.log(x);
                this.slider.goToPage(x, y, duration);
            },
            refresh() {
                this.slider && this.slider.refresh()
            }
        },
        mounted() {
            // IScroll的轮播实例
            this.slider = null;
            // 自动轮播的定时器指针
            this.timer = null;
            // 参与轮播的dom元素,sliderGroup 的子节点
            this.children = null;

            this.$nextTick(() => {
                this._setSliderUI();
                this._initSlider();
            })
        },
        destroyed() {
            clearInterval(this.timer);
            this.slider && this.slider.destroy();
        },
        watch: {
            data: function (newVal, oldVal) {
                this.$nextTick(() => {
                    if (this.data.length !== 0) {
                        this._setSliderUI();
                        this._initSlider();
                    }
                })                
            },
            isCanAutoPlay: function (newVal, oldVal) {
                if (newVal === true) {
                    this._autoPlay();
                } else {
                    clearInterval(this.timer);
                }
            }
        }
    }
</script>

