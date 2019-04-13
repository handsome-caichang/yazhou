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
		<div class="empty-img" :class="page.class" :style="page.style"></div>
		<div class="empty-tips">{{page.text}}</div>
	</div>
</template>

<script>
	import img1000 from './imgs/1000.png';
	import img404 from './imgs/404.png';
	import img000 from './imgs/000.png';
	import img001 from './imgs/001.png';
	import img002 from './imgs/002.png';
	import img003 from './imgs/003.png';
	import img004 from './imgs/004.png';
	import img005 from './imgs/005.png';
	import img006 from './imgs/006.png';
	import img007 from './imgs/007.png';
	import img008 from './imgs/008.png';
	import img009 from './imgs/009.png';
	import img010 from './imgs/010.png';
	import img011 from './imgs/011.png';

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
					no404: {
						img: img404,
						width: 294,
						height: 204,
						text: "抱歉，您找的页面可能去睡觉了"
					},
					no1000: {
						img: img1000,
						width: 294,
						height: 254,
						text: ""
					},
					no0: {
						img: img000,
						width: 291,
						height: 253,
						text: "商城已经打烊了"
					},
					no1: {
						img: img001,
						width: 200,
						height: 270,
						text: "暂无结果，试试别的关键词吧"
					},
					no2: {
						img: img002,
						width: 200,
						height: 270,
						text: "快来做第一个评论的人吧～"
					},
					no3: {
						img: img003,
						width: 200,
						height: 270,
						text: "快来做第一个提问的人吧～"
					},
					no4: {
						img: img004,
						width: 292,
						height: 253,
						text: "没有找到您心仪的商品，更换个条件试试吧"
					},
					no5: {
						img: img005,
						width: 412,
						height: 253,
						text: "您的订单记录空空如也～"
					},
					no6: {
						img: img006,
						width: 290,
						height: 252,
						text: "暂无优惠券哦～"
					},
					no7: {
						img: img007,
						width: 291,
						height: 254,
						text: "除了我以外就没有别的喜欢的吗～"
					},
					no8: {
						img: img008,
						width: 290,
						height: 252,
						text: "这里一个地址也没有～"
					},
					no9: {
						img: img009,
						width: 292,
						height: 145,
						text: "没有找到您心仪的班级，更换个条件试试吧"
					},
					no10: {
						img: img010,
						width: 292,
						height: 253,
						text: "商品卖完了，想买要趁早哦！"
					},
					no11: {
						img: img011,
						width: 290,
						height: 253,
						text: "暂无商品，请到别的地方看看吧！"
					},
					no12: {
						img: img011,
						width: 290,
						height: 253,
						text: "暂无结果，请到别的地方看看吧！"
					}
				}
			}
		},
		computed: {
			page() {
				let p = this.pages[`no${this.type}`];
				return {
					class: `img${this.type}`,
					style: {
						width: `${p.width/2}px`,
						height: `${p.height/2}px`,
						backgroundImage: `url(${p.img})`
					},
					text: p.text,
				}
			}
		}
	};
</script>

