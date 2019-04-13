<style scoped lang="scss">
	@import "../../assets/scss/variable.scss";
    @import "../../assets/scss/mixin.scss";

	.demo {
		
		position: relative;
		width: 100%;
		height: 100%;
		background-color: $color-assist-1;
		z-index: 10;
		.search {
			height: $h-1;
			width: 100%;
			background-color: $color-white;
			line-height: $h-1;
			text-align: center;
		}
		.demo-iframe {
			width: 100%;
			height: 100%;
		}
		.list {
			@include position-absolute($h-1, 0, $h-1, 0);
			.content {
			    @include position-absolute(0, 0, 0, 0);
			    .content-item {
			        .title {
			        	height: 30px;
			        	line-height: 30px;
			        	padding-left: 20px;
			        }
					.li {
						height: 40px;
						line-height: 40px;
						background-color: $color-white;
						padding-left: 20px;
						border-bottom: 1px solid $color-assist-1;
					}
			    }
			}
		}
		.bottom {
			border-top: 1px solid $color-assist-1;
			height: $h-1;
			width: 100%;
			@include border-top;
			@include position-absolute(false, 0, 0, 0);
			z-index: 100;
			background: $color-white;
			@include flex-center;
			.text {
				background-color: $color-assist-1;
				height: 30px;
			}
			.send {
				background-color: #f00;
				width: 40px;
				height: 40px;
				border-radius: 100%;
				color: $color-white;
				line-height: 40px;
				text-align: center;
				margin-left: 30px;
			}
		}
	}
</style>

<template>
	<div class="demo">
		<!-- <iframe class="demo-iframe" src="https://open.xgjssx.com/Jump?terminal=1&app=wxac406b4d8fddec78&pname=message_detail&id=c137a458-c12e-4399-b0a7-13c6e58464f9&wxcid=02f7ff5c-926b-4a97-a903-f7026bbde3c6&wxuid=46bda877-65c8-4abe-bc09-6443f6ddfd9b">
			
		</iframe> -->
		<div class="search">搜索</div>
		<!-- <div class="char-area">
			<div class="chat-item"></div>
		</div> -->
		<chat-emoji v-if="showEmoji" @selectEmoji="selectEmoji"></chat-emoji>
		<div class="list">
			<link-age @curIndex="getCurIndex">
				<scroller-base class="content" ref="scroller"> 
		            <div >
		                <div v-for="item in list" class="content-item" ref="itemGroup">
		                	<div class="title">{{item.title}}</div>
	                		<div v-for="li in item.items" class="li">{{li}}</div>
		                </div>
		            </div>
		        </scroller-base>
			</link-age>
		</div>

		<div class="bottom" v-show="true">
			<input type="" name="" class="text" v-model="text">
			<div class="send">发送</div>
			<div class="send" @click="show">emoji</div>
		</div>
	</div>
</template>

<script>
	import ChatEmoji from './child/chatEmoji/ChatEmoji'
	import LinkAge from './child/linkage/linkage'
	export default {
		data() {
			return {
				showEmoji: false,
				text: '',
				list: [	{title: 'A',items: ['aaaa','abbb','accc']},
						{title: 'B',items: ['BBBB','BBbbb','BaBBBccc']},
						{title: 'C',items: ['cccaaaa','cccabbb','ccaccc','cchkdjskdj','cjjj']},
						{title: 'D',items: ['daaaa','ddabbb','ddaccc']},
						{title: 'E',items: ['eeaaaa','eabbb','eaccc']},
						{title: 'F',items: ['faaaa','fabbb','feaccc']},
						{title: 'G',items: ['gaaaa','ggabbb','gaccc']},
						{title: 'H',items: ['haaaa','habbb','haccc']},
						{title: 'I',items: ['iaaaa','iabbb','iaccc']},
						{title: 'J',items: ['jaaaa','jajbbb','jaccc','jkakakka','jsss']},
						{title: 'K',items: ['kaaaa','kabbb','kaccc']},
						{title: 'L',items: ['laaaa','labbb','laccc','lsss']},
						{title: 'M',items: ['maaaa','mabbb','maccc']},
						{title: 'N',items: ['naaaa','nabbb','naccc','nva','nba']},
						{title: 'O',items: ['oaaaa','oabbb','oaccc']},
						{title: 'P',items: ['paaaa','pabbb','paccc']},
						{title: 'Q',items: ['qqaaaa','qqabbb','qqaccc']},
						{title: 'R',items: ['raaaa','rabbb','raccc']},
						{title: 'S',items: ['saaaa','sabbb','saccc']},
						{title: 'T',items: ['taaaa','tabbb','taccc']},
						{title: 'U',items: ['uaaaa','uabbb','uaccc']},
						{title: 'V',items: ['vaaaa','vabbb','vbvaccc']},
						{title: 'W',items: ['waaaa','wabbb','waccc']},
						{title: 'X',items: ['xaaaa','xabbb','xaccc']},
						{title: 'Y',items: ['yaaaa','yabbb','yaccc']},
						{title: 'Z',items: ['zaaaa','zabbb','zaccc','zaaaa','zabbb','zaccc','zaaaa','zabbb','zaccc','zaaaa','zabbb','zaccc','zaaaa','zabbb','zaccc','zaaaa','zabbb','zaccc','zaaaa','zabbb','zaccc']}
					],
				listHeight: []
			}
		},
		methods: {
			show() {
				this.showEmoji = !this.showEmoji
			},
			selectEmoji(obj) {
				if (obj) {
					this.showEmoji = false
					this.text = this.text + obj.text
				}
			},
			getItemGroupHeights() {
				this.listHeight = [];
				const list = this.$refs.itemGroup;
				let height = 0
				this.listHeight.push(height)
				for (let i = 0; i < list.length; i++) {
				  let item = list[i]
				  height += item.clientHeight
				  this.listHeight.push(height)
				}
			},
			getCurIndex(index) {
				if (index < 0) {
					index = 0
				}
				if (index > this.listHeight.length) {
					index = this.listHeight.length
				}
				this.$refs.scroller.scroller.scrollToElement(this.$refs.itemGroup[index], 0);
			},

		},
		mounted() {
			this.getItemGroupHeights()
		},
		components: {
			ChatEmoji,
			LinkAge
		}
	}
</script>