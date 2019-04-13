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
	import img005 from './imgs/005.png';
	import img006 from './imgs/006.png';
	import img007 from './imgs/007.png';
	import img008 from './imgs/008.png';
	import img009 from './imgs/009.png';
	import img010 from './imgs/010.png';
	import img011 from './imgs/011.png';
	import img012 from './imgs/012.png';	
	import course from './imgs/course.png';	
	import img014 from './imgs/014.png';
	import img015 from './imgs/015.png';

	export default {
		name: 'empty-page',
		props: {
			type: {
				// type: Number,
				default: 1
			},
			text: {
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
					no0: { //查看课表
						img: img000,
						width: 292,
						height: 144,
						text: "当天没有要上的课哦~"
					},
					no1: { //课堂评价
						img: img001,
						width: 200,
						height: 270,
						text: "还没有相关课堂评价~"
					},
					no2: { //作业
						img: img002,
						width: 291,
						height: 201,
						text: "还没有发现课堂作业~"
					},
					no3: { //通知
						img: img003,
						width: 224,
						height: 241,
						text: "一条通知也没有收到~"
					},
					no4: { //公告
						img: img003,
						width: 224,
						height: 241,
						text: "一条公告也没有收到~"
					},
					no5: { //到校离校
						img: img005,
						width: 290,
						height: 253,
						text: "一个到校签到也没有~"
					},
					no6: { //我的成长
						img: img006,
						width: 200,
						height: 270,
						text: "成长记录这么空，看不到你的学习状态哦~"
					},
					no7: { //考试成绩
						img: img007,
						width: 259,
						height: 264,
						text: "学的好不好，考考就知道~"
					},
					no8: { //上课统计
						img: img008,
						width: 211,
						height: 221,
						text: "你还没有上课统计信息~"
					},
					no9: { //交费记录
						img: img009,
						width: 291,
						height: 252,
						text: "还没有交费记录哦~"
					},
					no10: { //我的积分
						img: img010,
						width: 257,
						height: 232,
						text: "你太安静了，还没有产生积分~"
					},
					no11: { //投诉与建议
						img: img011,
						width: 200,
						height: 270,
						text: "你大胆的提问，我们大胆的改~"
					},
					no12: { //订单空
						img: img012,
						width: 412,
						height: 235,
						text: "您的订单记录空空如也~"
					},
					no13: { //没有班级
						img: course,
						width: 412,
						height: 235,
						text: "还没有报读班级哦~"
					},
                    no14: { //没有优惠券
                        img: img014,
                        width: 290,
                        height: 252,
                        text: "暂无优惠券噢~"
					},
                    no15: { //没有优惠券
                        img: img015,
                        width: 366,
                        height: 484,
                        text: "您还没有获得分享奖励噢~"
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
					text: this.text ? this.text : p.text
				}
			}
		}
	};
</script>