<!-- 微官网在商城首页的入口片段 -->
<style lang="scss" scoped>
	
	
	.home-chip {
		.website-menu {
		    background-color: $color-white;
		    .menu-item {
		        height: 110px;
		        @include flex-center(column);
		        .text {
		        	max-width: 100%;
		        	line-height: $fs-normal-s + 7;
		        	font-size: $fs-normal-s;
		        	color: $color-3;
		        	@include ellipsis-single;
		        }
		        .item-icon {
		        	width: 52px;
		        	height: 52px;
		        	margin-bottom: 8px;
		        	border-radius: 52px;
		        	@include flex-center(column);
		            font-size: 50px;
		        }
		    }
		}
		.news{
			overflow: hidden;
			height: 40px;
			line-height: 40px;
			display: flex;
			padding-left: $edge;
			padding-right: $edge;
			.news-tag {
				// font-weight: bold;
				font-size: $fs-normal-x;
				white-space: nowrap;
				margin-right: $edge;
				color: $color-primary;
			}
			.news-wrap {
				position: relative;
				flex: 1;
				.news-list {
					position: absolute;
					width: 100%;
					height: 100%;
					transition: all .3s ease-out;
					.new-title {
						flex: 1;
						display: block;
						font-size: $fs-normal-s;
						color: $color-3;
						@include ellipsis-single;
					}
				}
			}
		}
	}
	.void {
	    height: $void;
	    background-color: $color-assist-1;
	}
</style>

<template>
	<div class="home-chip">
	    <swiper class="menu-slider-box"
	    	:itemMinWidth="80"
	    	v-if = "menu.length > 0"
	    	>
	    	<ul class="website-menu" ref="sliderWrapper">
	    		<li class="menu-item" 
	    			v-for="(item, index) in menu" 
	    			:key="index"
	    			@click="gotoWebsite(item)"
	    			>
	    			<div class="item-icon">
	    				<svg class="icon" aria-hidden="true">
	    				    <use :xlink:href="item.IconClass"></use>
	    				</svg>
	    			</div>
	    			<span class="text">{{item.Name}}</span>
	    		</li>
	    	</ul>
	    </swiper>
		
	    <div class="void"></div>
        <!-- 资讯 -->
        <div class="news" v-if="news.length > 0">
			<div class="news-tag">最新资讯</div>
			<div class="news-wrap" ref="newWrap">
				<ul class="news-list" ref="newList">
                	<router-link tag="li"
                		class="new-title"
                		v-for="item in news"
                		:key="item.ID"
                		:to="`/website-custom-page/${encodeURIComponent('最新资讯')}/${item.ID}`">
                		{{item.Title}}
                	</router-link>
				</ul>
			</div>
		</div>
	    <div class="void" v-if="news.length > 0"></div>
	</div>
</template>

<script>
	export default {
		name: 'website-home-chip',
		props: {
			menu: {
				type: Array,
			},
			news: {
				type: Array,
			}
		},
		data () {
			return {
			};
		},
		methods: {
			// 使最新资讯可以跳动
			newsBounce() {
				let len = this.news.length;
				if( len > 1) {
					let i = 0,
						unitH = this.$refs.newWrap.offsetHeight,
						container = this.$refs.newList;
					setInterval(function () {
						i = (i + 1) % len;
						container.style[app.dom.prefixStyle('transform')] = `translateY(${ 0 - unitH * i}px)`;
					}, 3000);
				}
			},
			gotoWebsite(item) {
				if (item.ListType === 0) {
					this.$router.push(`/website-custom-page/${encodeURIComponent(item.Name)}/${item.ID}`);
				} else if (item.ListType === 1) {
					// 为2时说明是名师库
					if (item.Style === 2) {
						item.type = 0;
					} else {
						item.type = 1;
					}
					this.$router.push(`/website-list-page/${encodeURIComponent(item.Name)}/${item.type}/${item.ID}`);
				}
			}
		},
		created() {
		},
		mounted() {
			this.newsBounce();
		}
	};
</script>


