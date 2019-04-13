<style lang="scss" scoped>
	@import "../../../../assets/scss/variable.scss";
	@import "../../../../assets/scss/mixin.scss";
	@import "./mixin.scss";

	.box {
		display: flex;
		.content {
			min-width: 40px;
			padding: 0 8px;
			position: relative;
			height: 40px;
			display: flex;
			align-items: center;
			border-radius: 4px;
			// box-shadow: 0 1px 2px 0 rgba(203,203,203,.3);
			.audio-icon {
				width: 14px;
				height: 14px;
			}
		}
		.duration {
			padding: 22px 5px 0;
			color: #999;
			font-size: 12px;
		}
		&.in {
			.content {
				color: #333;
				background-color: #FFF;
				@include triangle-left;
			}
		}
		&.out {
			flex-direction: row-reverse;
			.content {
				display: flex;
				flex-direction: row-reverse;
				color: #FFF;
				background-color: #1E88F5;
				@include triangle-right;
			}
		}
		.send-status {
			@include flex-center;
			width: 30px;
			flex: 0 0 auto;
			font-size: 18px;
			.loading {
				width: 14px;
				height: 14px;
			}
		}
	}
</style>

<template>
	<div class="box" :class="{'in': msg.flow === 'in', 'out': msg.flow === 'out'}">
		<div class="content" 
			:audio-url="audioSrc"
			:style="{width: `${audioWidth}px`}"
			@click="playAudio">

			<!-- 撤消消息按钮 -->
			<delete-msg-btn :msg="msg" ></delete-msg-btn>
	
			<!-- 语音当前状态，是否在播放、加载等 -->
			<svg class="icon audio-icon" aria-hidden="true" v-if="!msg.isLocal && status === 0">
			    <use :xlink:href="staticIcon"></use>
			</svg>
			<img v-if="status > 0" class="icon" :src="dynamicIcon">
		</div>
		
		<div class="duration" v-if="second > 0">{{second}}"</div>

		<!-- 发送状态指示 -->
		<div class="send-status" v-if="msg.isLocal" @click="resendAudioMsg()">

			<!-- 发送中... -->
			<img class="loading" v-if="msg.status === 'success'" :src="sendingIcon">

			<!-- 发送失败，提供重发按钮 -->
			<svg class="icon" aria-hidden="true" v-if="msg.status === 'fail'">
			    <use xlink:href="#icon-fasongshibai"></use>
			</svg>
		</div>
	</div>
</template>

<script>
import iconPlayIn from './icon/audio-white.gif'
import iconPlayOut from './icon/audio-blue.gif'

import iconLoadingIn  from './icon/loading-spokes-1.svg'
import iconLoadingOut from './icon/loading-spokes-2.svg'

import DeleteMsgBtn from './delete-msg-btn.vue'

let dynamicIconIn = {
	in: [iconLoadingIn, iconPlayIn],
	out: [iconLoadingOut, iconPlayOut]
}

export default {
	name: 'chat-text',
	props: {
        msg: {
            type: Object
        }
    },
	data () {
		return {
			// 当前状态, 0默认, 1加载中, 2播放中;
			status: 0,
			sendingIcon: iconLoadingOut
		}
	},
	computed: {
		// 语音的时长,单位：秒
		second() {
			let file = this.msg.file
			if (file && file.dur) {
				return Math.ceil(file.dur/1000);
			} else {
				return 0
			}			
		},
		audioSrc() {
			if (!this.msg.isLocal) {
				return this.msg.file.mp3Url
			} else {
				return JSON.parse(this.msg.content).localId
			}
		},
		audioWidth() {
			if (!this.msg.isLocal) {
				return this.getAudioWidth()
			} else {
				return 80
			}
		},
		staticIcon() {
			return this.msg.flow === 'in' ? '#icon-shengyinbaidi' : '#icon-shengyinlandi';
		},
		dynamicIcon() {
			return dynamicIconIn[this.msg.flow][this.status - 1]
		}
	},
	methods: {
		// 语音加载中....
		_onloading() {
			this.status = 1
		},
		// 语音开始播放....
		_onplaying() {
			this.status = 2
			// 将当前播放的语音消息保存在状态机, 以便在自己撤回或对方撤回时，能够停止播放;
			this.$store.commit('set_palyAudioMsg', this.msg)
		},
		// 回到默认状态...
		_ondefault() {
			this.status = 0
		},
		resendAudioMsg() {
			if (this.msg.isLocal && this.msg.status === 'fail') {
				app.sdk.qim.consume(this.msg)
			}
		},
		// 播放当前语音
		playAudio() {
			// console.log({isLocal: this.msg.isLocal, status: this.status});
			
			if (this.msg.isLocal) return
			if (this.status === 0) {
				let opt = {
					loading: this._onloading,
					playing: this._onplaying,
					end: this._ondefault,
					endAuto: this._ondefault,
					error: this._ondefault
				}
				app.voice.play(this.audioSrc, opt)
			} else {
				app.voice.stop()
			}
		},
		getAudioWidth() {
			let minAudioWidth = 40,
				maxAudioWidth = 150,
				maxDiff = maxAudioWidth - minAudioWidth,
				steps = [3,3,2,1,1,1],
				tens = Math.floor(this.second/10),
				unit = this.second%10,
				i = 0,
				index = 0,
				dw = 0;

			for(i = 0; i < tens; i += 1) {
				dw += steps[i]*10;
				index = i;
			}
			dw += steps[index]*unit;

			dw = dw > maxDiff ? maxDiff : dw;

			return minAudioWidth + dw;
		},
	},
	created() {
	},
	components: {
		DeleteMsgBtn
	},
}
</script>

