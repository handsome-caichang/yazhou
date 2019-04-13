<style scoped lang="scss">
	
    
    .scroll-box {
    	background-color: $color-assist-1;
    	overflow: hidden;
		.wrapper {
			width: 100%;
            height: 100%;
            position: relative;
			.top {
				position: absolute;
				top: 0;
				width: 100%;
				text-align: center;
				.top-content {
					height: 44px;
					line-height: 44px;
					color: $color-3;
					background-color: $color-assist-1;
				}
			}
			.bottom {
				position: absolute;
				bottom: 0;
				width: 100%;
				height: $h-2;
	            line-height: $h-2;
	            text-align: center;
	            font-size: 14px;
	            color: #333;
	            background-color: $color-assist-1;
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
    }
	
</style>

<template>
	<div class="scroll-box">
		<div ref="wrapper" class="wrapper">
			<slot></slot>
			<div class="top" v-if="true" ref="top">
				<div class="top-content" v-if="showPullDown">下拉刷新</div>
				<div class="top-content" v-if="showRefresh">刷新中....</div>
			</div>
			<div class="bottom" v-show="pullup&&isLoading">
				<img class="load-icon" src="../../../plugin/components/scroller/img/loading-small.gif">
				<span class="load-text">加载中...</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			pageOption: {
				type: Object,
				default: {}
			},
			scrollX: {
				type: Boolean,
				default: false
			},
			listenScroll: {
				type: Boolean,
				default: false
			},
			data: {
				Type: Array,
				default: []
			},
			pullup: {
				type: Boolean,
				default: false
			},
			pulldown: {
				type: Boolean,
				default: false
			},
			beforeScroll: {
				type: Boolean,
				default: false
			},
			refreshDelay: {
				type: Number,
				default: 20
			}
		},
		data() {
			return {
				scroll: null,
				isLoading: false,
				direction: null,
				outPageOption: {
					PageIndex: 1,
					PageSize: 10,
					PageCount: 0,
					TotalCount: 0
				},//传给外部组件的分页信息对象
				defaultCfg: {
                    mouseWheel: true, // 是否监听鼠标滚轮事件
                    momentum: true,
                    bindToWrapper: true,
                    bounce: false,
                    preventDefault: true, // 是否屏蔽默认事件
                    click: true,  // 是否启用click事件
                    scrollbars: true, // 是否显示滚动条
                    fadeScrollbars: true, // 是否渐隐滚动条,关掉可以加速
                    scrollY: true, // 是否开启纵向滚动条
                    // probeType属性决定'scroll'事件的触发时机,可取范围为1,2,3;其它取值表示永不触发'scroll'事件
                    // 值1：当整个touch事件周期大于300ms时,在touchmove过程中触发'scroll'事件
                    // 值2：在touchmove过程中触发'scroll'事件; (当手离开屏幕而页面还在滚动时是不会触发的)
                    // 值3：整个滚动过程都个触发'scroll'事件,而不管手势是否已经离开屏幕
                    probeType: 1,
                    // 自动分割容器,用于制作走马灯效果等。
                    // 值true:根据容器尺寸自动分割
                    // 值"el":根据元素分割
                    snap: false,
                },

                //下拉刷新
                startY: null,
                diffY: null,
                showPullDown: false,
                showRefresh: false,

                distY: 0,
               	start: false,
               	pointY: 0,
               	switch: false,
               	moveNum: 0,
			}
		},
		methods: {
			_initScroll() {
				if (!this.$refs.wrapper) return
				let obj = Object.assign(this.defaultCfg, {
					click: this.click,
					scrollX: this.scrollX
				}) 
				this.scroll = new IScroll(this.$refs.wrapper, obj)
				if (this.listenScroll) {
					this.scroll.on('scroll', pos => {
						this.$emit('scroll', pos)
					})
				}
				if (this.pullup) {
					this.scroll.on('scrollEnd', () => {
						if (this.isLoading) return
						if (this.scroll.y <= (this.scroll.maxScrollY + 50) && this.outPageOption.PageIndex < this.outPageOption.PageCount) {
							let obj = {
								PageSize: this.outPageOption.PageSize,
								PageIndex: this.outPageOption.PageIndex += 1
							}
							this.isLoading = true
							this.$emit('scrollEnd', obj)
						}
					})
				}
				if (this.pulldown) {
					this.$refs.wrapper.addEventListener('touchstart', this.eventStartHandle, false)
					this.$refs.wrapper.addEventListener('touchmove', this.eventMoveHandle, false)
					this.$refs.wrapper.addEventListener('touchend', this.eventEndhandle, false)
				}
			},
			eventStartHandle(e) {
				this.startY = parseInt(e.targetTouches[0].pageY)
			},
			eventMoveHandle(e) {
				if (this.scroll.y === 0) {
					let moveY = parseInt(e.targetTouches[0].pageY)
					this.diffY = parseInt((moveY - this.startY) / 3)
					if (this.diffY > 0) this.scroll.enabled = false
					this.showPullDown = this.diffY > 0 ? true : false
					this.$refs.wrapper.style.transform = `translate(0, ${this.diffY}px)`
				}
			},
			eventEndhandle(e) {
				this.scroll.enabled = true
				if (this.diffY) {
					this.showPullDown = false
					this.showRefresh = true
					if (this.diffY > 30) {
						this.$emit('pullDownOk')	
					} else {
						this.showRefresh = false	
					}
					this.diffY = 0
					this.$refs.wrapper.style.transform = 'translate(0, 0)'
				}
				// this.scroll.enabled = true
			},
			refresh() {
				this.scroll && this.scroll.refresh()
			}
		},
		watch: {
			data(val) {
				setTimeout(() => {
					this.refresh()
					this.isLoading = false
				}, this.refreshDelay)
			},
			pageOption(val) {
				if (this.pulldown) this.showRefresh = false
				for (let key in val) {
					if (key !== 'Data' && key !== 'ErrorCode' && key !== 'ErrorMsg' && key !== 'errorCode') {
						this.outPageOption[key] = val[key]
					} 
				}
			},
			diffY(oldVal, newVal) {
				// console.log(newVal);
			}
		},
		mounted() {
			this._initScroll()
		},

	}
</script>