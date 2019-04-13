<style lang="scss" scoped>
	@import '../../../assets/scss/mixin.scss';
	@import '../../../assets/scss/variable.scss';

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
	import img_session from './imgs/session.png';
	import img_contact from './imgs/contact.png';
	import img_team from './imgs/team.png';
	import img_cmsg02 from './imgs/cmsg02.png';
	import img_cmsg03 from './imgs/cmsg03.png';
	import img_cmsg04 from './imgs/cmsg04.png';

	export default {
		name: 'empty-page',
		props: {
			type: String
		},
		data () {
			return {
				pages: {
					'404': {
						img: img404,
						width: 294,
						height: 204,
						text: "抱歉，您找的页面可能去睡觉了"
					},
					'1000': {
						img: img1000,
						width: 294,
						height: 254,
						text: ""
					},
					session: {
						img: img_session,
						width: 224,
						height: 241,
						text: "一条消息也没有收到……"
					},
					contact: {
						img: img_contact,
						width: 412,
						height: 252,
						text: "你的通讯录空空的哦～"
					},
					'team-parent': {
						img: img_team,
						width: 276,
						height: 220,
						text: "学海无涯，还没有你的学习圈～"
					},
					'team-teacher': {
						img: img_team,
						width: 276,
						height: 220,
						text: "还没有你的群聊～"
					},
					cmsg02: {
						img: img_cmsg02,
						width: 200,
						height: 270,
						text: "还没有相关课堂评价～"
					},
					cmsg03: {
						img: img_cmsg03,
						width: 291,
						height: 201,
						text: "还没有发现你的课堂作业～"
					},
					cmsg04: {
						img: img_cmsg04,
						width: 271,
						height: 225,
						text: "一条通知也没有收到～"
					}
				}
			}
		},
		computed: {
			page() {
				let p = this.pages[this.type];
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

