<style lang="scss" scoped>

	.error-box {
		@include flex-center(column);
		background-color: $color-assist-1;
		.error-img {
			@include background-img(false, cover);
		}
		.error-tips {
			margin-top: 28px;
			font-size: $fs-normal-s;
			color: $color-6;
		}
	}
</style>

<template>
	<div class="error-box">
		<div class="error-img" :style="page.style"></div>
		<div class="error-tips">{{text}}</div>
	</div>
</template>

<script>
	import img600 from './imgs/600.png';
	
	export default {
		name: 'error-page',
		props: {
			type: {
				type: Number,
				default: 1
            },
            text: {
				type: String,
				default: ''
			}
		},
		data () {
			return {
				pages: {
					no600: { //600
						img: img600,
						width: 150,
						height: 150
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
					}
				}
			}
		}
	};
</script>