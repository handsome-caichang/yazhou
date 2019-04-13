<style lang="scss" scoped>
	
	

	.empty-box {
		@include flex-center(column);
		background-color: $color-white;
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

	import img001 from './imgs/c001.png';

	
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
					// no404: { //404
					// 	img: img404,
					// 	width: 294,
					// 	height: 204,
					// 	text: "抱歉，您找的页面可能去睡觉了"
					// },
					// no1000: { //网络错误
					// 	img: img1000,
					// 	width: 293,
					// 	height: 254,
					// 	text: "网络消化不良"
					// },
                    // no1001: { //搜索结果空白页
					// 	img: img1001,
					// 	width: 200,
					// 	height: 271,
					// 	text: "没有找到你指定的搜索结果~"
					// },

					no1: { //课堂评价
						img: img001,
						width: 206,
						height: 206,
						text: "很遗憾，未找到内容~"
					},

				}
			}
		},
		computed: {
			page() {
				let p = this.pages[`no${this.type}`];
				return {
					style: {
						width: `${p.width}px`,
						height: `${p.height}px`,
						backgroundImage: `url(${p.img})`
					},
					text: p.text
				}
			}
		}
	};
</script>