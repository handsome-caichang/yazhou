<!-- 聊天内容编辑区域 -->
<style type="text/css">
	/* textarea::-webkit-input-placeholder {
	  color: #f00;
	}
	::-webkit-input-placeholder {
	  color: #f00;
	}
	::-webkit-placeholder {
	  color: #f00;
	} */
</style>

<style lang="scss" scoped>
	@import "../../../../assets/scss/variable.scss";
	@import "../../../../assets/scss/mixin.scss";

	.chat-editor {
		width: 100%;
		background: rgba(255,255,255,.5);
		min-height: 49px;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding: 4px 2px 8px;
		.left, .right {
			margin-left: 8px;
			margin-right: 8px;
			.icon {
				width: 30px;
				height: 30px;
				vertical-align: middle;
			}
			.send-btn {
				display: inline-block;
				width: 45px;
				height: 30px; 
				margin-bottom: 1px;
				line-height: 30px;
				font-size: 15px;
				color: #FFF;
				text-align: center;
				background: rgba(30,136,245,1);
				border-radius: 4px;
			}
		}
		.middle-text {
			flex: 1;
			overflow: hidden;
			background-color: #FFF;
			border: 1px solid #e2e2e2;
			border-radius: 4px;
			.input-box {
				padding: 5px;
				.textarea {
					ime-mode: disabled;
					-webkit-ime-mode: disabled;
					padding: 0;
					margin: 0;
					min-height: 20px;
					max-height: 80px;
					font-size: 14px;
					height: 20px;
					line-height: 20px;
					color: #1E88F5;
					vertical-align: top;
					resize: none;
					background-color: transparent;
					text-shadow: 0px 0px 0px #333;
					-webkit-text-fill-color: transparent;
				}
				.input-div {
					min-height: 20px;
					max-height: 80px;
					font-size: 14px;
					line-height: 20px;
					border: none;
					overflow: auto;
				    word-wrap: break-word;
				    overflow-x: hidden;
				    overflow-y: auto;
					outline:0;
					// -webkit-user-modify: read-write-plaintext-only;
				}
			}
		}
		.middle-audio {
			flex: 1;
			position: relative;
			.audio-btn {
				height: 32px;
				line-height: 32px;
				text-align: center;
				user-select: none;

				border: 1px solid #e2e2e2;
				border-radius: 4px;
			}
			.audio-btn-btn {
				position: absolute;
				top: -9px;
				bottom: -8px;
				left: 0;
				right: 0;
				// background-color: rgba(255,0,0,.3)
			}
		}
	}

	.chat-assist {
		background-color: #FFF;
		border-top: 1px solid rgba(215, 215, 215, 1);
	}
</style>

<template>
	<div>
		<div class="chat-editor">
			<!-- 切换文本输入或语音 -->
			<div class="left" @click="changeEdit">
				<svg class="audio icon" aria-hidden="true" v-if="editStatusIsText">
				    <use xlink:href="#icon-yuyin"></use>
				</svg>
				<svg class="icon" aria-hidden="true" v-else>
				    <use xlink:href="#icon-shuru"></use>
				</svg>
			</div>
		
			<div class="middle-text" v-show="editStatusIsText">
				<div class="input-box" v-show="editStatusIsText" >
					<!-- 文本输入框 -->
					<textarea 
						class="textarea" 
						ref="textarea"
						style="ime-mode: disabled"	
						:placeholder="placeholder"
						v-model="msgToSent">
					</textarea>
					<!-- readonly -->
				</div>
			</div>

			<div class="middle-audio" v-show="!editStatusIsText">
				<!-- 录音状态展示按钮 -->
				<div class="audio-btn">{{audioBtnText}}</div>

				<!-- 真正的 录音按钮 -->
				<div class="audio-btn-btn"
					@touchstart="ontouchstart"
					@touchmove="ontouchmove"
					@touchend="ontouchend"
					@touchcancel="ontouchend">
				</div>
			</div>

			<div class="right">
				<!-- 选择表情按钮 -->
				<svg class="icon" aria-hidden="true" @click="openFaceArea">
				    <use :xlink:href="faceShow ? '#icon-shuru' : '#icon-biaoqing'"></use>
				</svg>

				<!-- 文本消息发送按钮 -->
				<div v-if="showSendBtn" class="send-btn" @click="sendTextMsg">
					发送
				</div>

				<!-- 打开功能区域按钮 -->
				<svg v-else class="icon" aria-hidden="true" @click="openOtherArea">
				    <use xlink:href="#icon-tianjia"></use>
				</svg>
			</div>
		</div>

		<div class="chat-assist" >
			<face-area class="face-area" :opened="faceShow"></face-area>
			<other-area 
				class="other-area" 
				:opened.sync="otherShow"
				@selectAndSendImgEvent="sendImgMsg"
				@selectAndSendVideoEvent="sendVideoMsg"
				@selectAndSendFileEvent="sendFileMsg"
				>
			</other-area>
		</div>
	</div>
	
</template>

<script>	
	import {text} from './mixin-text.js'
	import {image} from './mixin-image.js'
	import {audio} from './mixin-audio.js'
	import {video} from './mixin-video.js'
	import {file} from './mixin-file.js'

	import FaceArea from './child/face-area/face-area.vue'
	import OtherArea from './child/other-area/other-area.vue'

	export default {
		name: 'chat-editor',
		mixins: [text, image, audio, video, file],
		props: {
			scene: String,
			to: String,
		},
		data() {
			return {
				editStatusIsText: true,
				faceShow: false,
				otherShow: false
			}
		},
		methods: {
			changeEdit() {
				this.editStatusIsText = !this.editStatusIsText;
				if (!this.editStatusIsText) {
					this.faceShow = false
					this.otherShow = false
				}
				this.$emit('chatEditorChangeHeight')
			},
			openFaceArea() {
				this.otherShow = false
				this.faceShow = !this.faceShow
				if (!this.editStatusIsText) {
					this.editStatusIsText = true
				}

				!this.faceShow && this.$refs.textarea.focus()
			},
			openOtherArea() {
				this.faceShow = false
				this.otherShow = !this.otherShow
				if (!this.editStatusIsText) {
					this.editStatusIsText = true
				}
			}
		},
		created() {
			app.event.on("chatEditorTextareaFocus", () => {
				this.faceShow = false
				this.otherShow = false
			})

			app.event.on("chatClick", () => {
				this.faceShow = false
				this.otherShow = false
			})
		},
		components: {
			FaceArea,
			OtherArea
		},
		watch: {
			faceShow() {
				this.$emit('chatEditorChangeHeight')
			},
			otherShow() {
				this.$emit('chatEditorChangeHeight')
			}
		}
	}
</script>

