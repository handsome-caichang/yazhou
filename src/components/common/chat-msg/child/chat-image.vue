<style lang="scss" scoped>
	@import "../../../../assets/scss/variable.scss";
	@import "../../../../assets/scss/mixin.scss";
	@import "./mixin.scss";

	.box {
		display: flex;		
		.content {
			position: relative;
			min-height: 40px;
			@include flex-center;
			border-radius: 4px;
			.img-box {
				position: relative;
				border: 1px solid #DDD;

				min-width: 40px;
				min-height: 40px;
				background-color: #CCC;

				.msg-image {
					vertical-align: top;
					max-width: 140px;
					max-height: 140px;					
					/* @media all and (max-width: 375px) {
						max-width: 140px;
						max-height: 140px;
					}
					@media all and (min-width: 375px) and (max-width: 450px) {
						max-width: 180px;
						max-height: 180px;
					}
					@media all and (min-width: 450px) {
						max-width: 220px;
						max-height: 220px;
					} */
				}
				.send-mask {
					@include position-absolute;
					@include flex-center(column);
					color: #FFF;
					background-color: rgba(0, 0, 0, .5);
					.loading {
						padding-bottom: 5px;
                        width: 24px;
                        height: 24px;
					}
				}
			}
		}
		&.in {
			/* .content {
				color: #333;
				background-color: #FFF;
				@include triangle-left;
			} */
		}
		&.out {
			flex-direction: row-reverse;
			/* .content {
				color: #FFF;
				background-color: #1E88F5;
				@include triangle-right;
			} */
		}
		.resend-btn {
			width: 30px;
			flex: 0 0 auto;
			font-size: 18px;
			@include flex-center;
		}
	}
</style>

<template>
	<div class="box" :class="{'in': msg.flow === 'in', 'out': msg.flow === 'out'}">
		<div class="content">
			<div class="img-box">
				<img class="msg-image" 
					:src="imgsrc"
					:style="imgsty"
					@click="previewImage(msg.file.url)"
				>

				<!-- 发送中... -->
				<div class="send-mask" v-if="msg.isLocal">
					<!-- <img class="loading" src="./icon/loading-spinning-bubbles.svg"> -->
					<img class="loading" :src="sendingIcon">

					<div class="progress">{{JSON.parse(msg.custom).progress}}</div>
				</div>
			</div>
			

			<!-- 撤消消息按钮 -->
			<delete-msg-btn :msg="msg"></delete-msg-btn>
		</div>
		<!-- 发送失败，提供重发按钮 -->
		<div class="resend-btn" v-if="msg.isLocal && msg.status === 'fail'"  @click="resendImgMsg()">
			<svg class="icon" aria-hidden="true">
			    <use xlink:href="#icon-fasongshibai"></use>
			</svg>
		</div>
	</div>
</template>

<script>

import DeleteMsgBtn from './delete-msg-btn.vue'

import sendingIcon from './icon/loading-spinning-bubbles.svg'

export default {
	name: 'chat-text',
	props: {
        msg: {
            type: Object
        }
    },
	data() {
		return {
			maxWH: 140,
			imgsrc: '',
			imgsty: '',
			sendingIcon: sendingIcon
		}
	},
	methods: {
		// 预览图片
		previewImage(url) {
			//  如果urls没有值，微信那边会报错，以防万一
			if (this.$store.state.currIamgeArr.length == 0) {
				app.sdk.previewImage({
					current: url,
					urls: [url]
				})
			}else {
				app.sdk.previewImage({
					current: url,
					urls: this.$store.state.currIamgeArr
				})
			}
		}, 
		// 图片发送失败后, 重新发送;
		resendImgMsg() {
			app.sdk.qim.consume(this.msg)
		},
		// 根据图片消息对象中的宽、高来计算img标签在dom中应该显示的宽高
		getImgStyle() {
			let w = this.msg.file.w,
				h = this.msg.file.h,
				max = this.maxWH,
				rate = Math.min(max/w, max/h, 1);

			return {width: `${rate*w}px`, height: `${rate*h}px`};
		},
		// 生成缩略图地址
		getImgThumb() {
			var file = this.msg.file				

			if (file.ext === '.gif') {
				return file.url
			} else {
				let max = this.maxWH,
					imgMaxSize = Math.max(file.w, file.h),
					thumb = {
						url: file.url, // 必填
						strip: true, // 去除图片元信息 true or false 可选填
						quality: 85, // 图片质量 0 - 100 可选填
						interlace: true, // 渐变清晰， 可选填
					}

				if (imgMaxSize > max) {
					thumb.thumbnail = {
						width: max,
						height: max,
						mode: "contain"
					}
				} 

				return window.nim.viewImageSync(thumb);
			}
		},
		// 本地图片加载完成后触发事件，以让chat组件接收并刷新滚动条;
		emitLocalImageLoad(imgsrc) {
			let img = new Image(),
				_this = this;
			img.src = imgsrc;
			img.onload = function (e) {
				_this.$emit('msgChangeHeight')
			}
		},
	},
	created() {
		if (!this.msg.isLocal) {
			this.imgsty = this.getImgStyle();
			this.imgsrc = this.getImgThumb();
		} else {
			let imgsrc = JSON.parse(this.msg.content).localId
			app.sdk.getLocalImgData(imgsrc)
				.then(imgsrc => {
					this.imgsrc = imgsrc;
					this.emitLocalImageLoad(imgsrc);
				})
		}
	},
	watch: {
		msg(nmsg, omsg) {
			// 当图片是gif图时, 在发送完成后，让img的src指向线上地址，这样在手机上才有动效; 默认的微信选择出来的localID加载出来后是没有动效的;
			if (this.msg.file.ext === '.gif') {
				this.imgsrc = this.getImgThumb();
			}
		}
	},
	components: {
		DeleteMsgBtn
	},
}
</script>

