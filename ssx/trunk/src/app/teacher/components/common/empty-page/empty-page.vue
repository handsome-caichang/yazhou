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
	import img1001 from './imgs/1001.png';    
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
	import img012 from './imgs/012.png';
	export default {
		name: 'empty-page',
		props: {
			type: {
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
					},
                    no1001: { //搜索结果空白页
						img: img1001,
						width: 200,
						height: 271,
						text: "没有找到你指定的搜索结果~"
					},
					no0: { //查看课表、作业
						img: img000,
						width: 292,
						height: 144
                    },
                    no1: { //上课点名、课堂评价、补课管理
						img: img001,
						width: 259,
						height: 264
					},
					no2: { //学员沟通管理
						img: img001,
						width: 259,
						height: 264
					},
					no3: { //通知
						img: img003,
						width: 271,
						height: 225
                    },
                    no4: { //公告
						img: img004,
						width: 200,
						height: 270
					},
					no5: { //意向客户
						img: img005,
						width: 200,
						height: 270
					},
					no6: { //成绩查询
						img: img006,
						width: 291,
						height: 201
                    },
                    no7: { //工作统计、家长评价排名
						img: img007,
						width: 211,
						height: 221
                    },
                    no8: { //投诉和建议
						img: img008,
						width: 200,
						height: 270
					},
					no9: { //投诉与建议被删除
						img: img009,
						width: 350,
						height: 320,
						text: '建议已经被删除'
					},
					no10: {
						img: img009,
						width: 350,
						height: 320,
						text: '没有找到对应学员'
					},
					no11: { 
						img: img002,
						width: 259,
						height: 264
					},
					no12: { //订单空
						img: img012,
						width: 412,
						height: 235,
						text: "您的订单记录空空如也~"
					},
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
					text: this.text || p.text
				}
			}
		}
	};
</script>