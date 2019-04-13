<!-- 水平滚动组件 -->
<style lang="scss" scoped>
	.swiper {
		position: relative;
		overflow: hidden;
		.swiper-group {
		    display: flex;
		    .swiper-item-0 {
		        flex: 1 0 auto;
		    }
		    .swiper-item-1 {
		    	flex: 1;
		    }
		}
	}
</style>

<template>
	<div class="swiper" ref="swiper">
        <slot>
        </slot>
	</div>
</template>

<script>
	export default {
	  	name: 'swiper',
	  	mixins: [app.mixin.winResizeMixin],
	  	props: {
	  		itemMinWidth: {
	  			type: Number,
	  		},
	  		// 可接收'center', 'left'
	  		type: {
	  			type: String,
	  			default: 'center'
	  		}
	  	},
	  	data () {
	    	return {

	    	};
		},
		methods: {
			// 设置 UI 布局
			_setSwiperUI() {
				let swiper = this.$refs.swiper,
					swiperW = swiper.clientWidth,
					swiperGroup = swiper.children[0],
			    	children = swiperGroup.children,
			    	len = children.length,
			    	itemSumWidth = this.itemMinWidth*len;

		    	app.dom.addClass(swiperGroup, 'swiper-group');

		    	if (swiperW > itemSumWidth) {
		    		let w = swiperW/len;
		    		for (let i = 0; i < children.length; i++) {
		    		    let child = children[i];
		    		    app.dom.removeClass(child, 'swiper-item-0');
		    		    if (this.type === 'center') {
		    		    	app.dom.addClass(child, 'swiper-item-1');
		    		    	child.style.width = w + 'px';
		    		    } else if (this.type === 'left') {
		    		    	child.style.width = this.itemMinWidth + 'px';
		    		    }
		    		}
		    		swiperGroup.style.width = swiperW + 'px';
		    	} else {
		    		for (let i = 0; i < children.length; i++) {
		    		    let child = children[i];
		    		    app.dom.removeClass(child, 'swiper-item-1');
		    		    app.dom.addClass(child, 'swiper-item-0');

		    		    child.style.width = this.itemMinWidth + 'px';
		    		}
		    		swiperGroup.style.width = itemSumWidth + 'px';
		    	}
			},
			// 实例化swiper,
			_initSwiper() {
				let options = {
				    bounce: true,
				    click: false,
				    momentum: true,
				    scrollY: false,
				    scrollX: true,
				    bindToWrapper: true,
				}

				this.swiper = new IScroll(this.$refs.swiper, options);
			},
			refresh() {
			    this.swiper && this.swiper.refresh()
			},
			_winResizeHandler() {
			    clearTimeout(this.wTimer);
			    this.wTimer = setTimeout(() => {
			        this._setSwiperUI();
			        this.refresh();
			    }, 20*this.level);
			},
		},
		mounted() {
		    // this.$nextTick(() => {
		        this._setSwiperUI();
		        this._initSwiper();
		    // })
		},
		destroyed() {
		    this.swiper && this.swiper.destroy();
		}
	};
</script>
