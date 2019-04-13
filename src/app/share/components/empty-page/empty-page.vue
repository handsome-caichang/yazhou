<style lang="scss" scoped>
	.empty-box {
		@include flex-center(column);
		background-color: $color-assist-1;
		.empty-img {
			@include background-img(false, cover);
		}
		.empty-tips {
			margin-top: 28px;
			font-size: $fs-normal-s;
			color: $color-6;
		}
	}
</style>

<template>
	<div class="empty-box">
		<div class="empty-img" :style="page.style"></div>
		<div class="empty-tips">{{page.text}}</div>
	</div>
</template>

<script>
	import img1000 from './imgs/1000.png';
	import img404 from './imgs/404.png';
	
	export default {
		name: 'empty-page',
		props: {
			type: {
				// type: Number,
				default: 1
			}
		},
		data () {
			return {
				pages: {
					no404: { //404
						img: img404,
						width: 294,
						height: 204,
						text: "抱歉，您找的页面可能去睡觉了"
					},
					no1000: { //网络错误
						img: img1000,
						width: 293,
						height: 254,
						text: "网络消化不良"
					}
				}
			}
		},
		computed: {
			page() {
				let p = this.pages[`no${this.type}`];
				return {
					style: {
						width: `${p.width/2}px`,
						height: `${p.height/2}px`,
						backgroundImage: `url(${p.img})`
					},
					text: p.text
				}
			}
		}
	};
</script>