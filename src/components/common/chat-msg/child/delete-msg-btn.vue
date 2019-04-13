<style lang="scss" scoped>
	@import "../../../../assets/scss/variable.scss";
	@import "../../../../assets/scss/mixin.scss";
	@import "./mixin.scss";
	.delete-msg-btn {
		position: absolute;
		top: -13px;
		left: -13px;
		width: 26px;
		height: 26px;
		line-height: 26px;
		text-align: center;
		font-size: 18px;
		z-index: 100;
	}
</style>

<template>
	<!-- 撤消消息按钮 -->
	<div class="delete-msg-btn" 
		v-if="msg.enableDelete"
		@click.stop="deleteMsg()">
		<svg class="icon" aria-hidden="true">
		    <use xlink:href="#icon-chehuixiaoxi"></use>
		</svg>
	</div>
</template>

<script>

export default {
	name: 'delete-msg-btn',
	props: {
        msg: {
            type: Object
        }
    },
	data() {
		return {
		}
	},
	computed: {
		...Vuex.mapState(['deleteMsgTime', 'palyAudioMsg']),
		playingID() {
			return this.palyAudioMsg ? this.palyAudioMsg.idClient : ''
		}
	},
	methods: {
		// 撤回消息
		deleteMsg() {
			app.confirm("确定要撤回本条消息吗？")
				.then(boolean => {
					if (boolean) {
						this.$store.dispatch('revocateMsg', this.msg)

						// 如果撤回的是正在播放的消息，则停止播放；
						if (this.msg.idClient === this.playingID) {
							app.voice.stop()
						}
					}
				})
		},
		// 消息是否可撤消
		checkMsgEnableDelete() {
			let msg = this.msg
			if (msg.flow === 'out' && !msg.isLocal && !msg.enableDelete) {
				let curTime = new Date().getTime(),
					msgTime = msg.time,
					diffTime = curTime - msgTime
				if (diffTime < this.deleteMsgTime) {
					this.$set(msg, "enableDelete", true)
					window.disappearMsgs.push(msg)
				}
			}
		}
	},
	created() {
		this.checkMsgEnableDelete()
	},
	mounted() {
	},
	watch: {
		msg() {
			this.checkMsgEnableDelete()
		}
	}
}
</script>

