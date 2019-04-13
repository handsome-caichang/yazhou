<style scoped lang="scss">
	@import "src/plugin/scss/variable.scss";
	@import "src/plugin/scss/mixin.scss";
	.action-sheet {
		@include position-absolute(0, 0, 0, 0);
		z-index: 2;
	}
	
	.voice {
		text-align: center;
		.timer {
			color: rgba(30, 136, 245, 1);
			font: 1.25rem/1.25rem PingFangSC-Regular;
			margin-top: 30px;
		}
		.img {
			width: 35.33333%;
		}
		.tips {
			height: 24px;
			padding-top: 5px;
			color: #999999;
		}
		.btn-save {
			height: 67.5px;
			.span {
				display: inline-block;
				color: rgba(30, 136, 245, 1);
				border-radius: 100px;
                padding: 0 15px;
				height: 28px;
				line-height: 28px;
				border: 1px solid rgba(30, 136, 245, 1);
			}
		}
	}
</style>

<template>
	<action-sheet v-if="opened" @close="close" class="action-sheet" ref="noticeAddAS">
		<div class="voice">
			<div class="timer">{{timer.m + ":" + timer.s}}</div>
			<div class="tips"><span v-show="recordStatus">{{ tipsText }}</span></div>

			<div>
				<img class="img" v-if="!recordStatus" src="./img/recording.png" alt="" />
				<img class="img" v-else src="./img/recording.gif" alt="" />
			</div>
			<div class="btn-save">
				<span v-if="type == 'click'" class="span" @click="click"> {{ audioBtnText }} </span>
				<span v-else class="span" @touchstart="ontouchstart" @touchmove="ontouchmove" @touchend="ontouchend" @touchcancel="ontouchend"> {{ audioBtnText }} </span>
			</div>
		</div>
	</action-sheet>
</template>

<script>
	import {popupWindowRouteMixin} from 'src/plugin/app/mixin/mixin.js';
	import { audio } from "./mixin-audio";
	import ActionSheet from 'src/plugin/components/action-sheet/action-sheet.vue';

	export default {
		name: "voice-recording",
        mixins: [popupWindowRouteMixin, audio],
        props: ['type'],
		data() {
			return {
				opened: false,
				timer: {
					current: null, // 计时器对象
					duration: 1000, // 计数间隔时长,单位：mm
					limit: 60, // 计时器时间限制,单位：s
					m: 0,
					s: 60
				},
				voiceArr: [] // 待返回的录音数据
			};
        },
		methods: {
			// 关闭
			close() {
				this.opened = false;
			},
			// 返回录音id
			getVoiceId(voice) {
				this.$emit("emitVoices", voice);
			},
			clearInterval() {
				window.clearInterval(this.timer.current);
			}
		},
		mounted() {
            this.opened = true;
		},
		watch: {
			// 录音状态，显示倒计时
			recordStatus(newVal) {
				if(newVal) {
					let counter = this.timer.limit;
					this.timer.current = window.setInterval(() => {
						counter = --counter;
						this.timer.s = counter < 10 ? "0" + counter : counter;
						if(counter == 0) {
                            this.clearInterval();
						}
					}, this.timer.duration);
				} else {
					this.timer.m = 0;
					this.timer.s = this.timer.limit;
					this.clearInterval();
				}
			}
		},
		components: {
			ActionSheet
		}
	};
</script>