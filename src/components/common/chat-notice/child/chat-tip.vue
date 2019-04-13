<style lang="scss" scoped>
</style>

<template>
	<!-- tip提醒消息 -->
    <div class="tip-msg">{{tipText}}</div>
</template>

<script>
export default {
  	name: 'chat-tip',
  	props: {
  		msg: Object
  	},
    computed: {
        tipText() {
            let msg = this.msg, nick;
            if (msg.tip === 'recall') {
                nick = msg.from === this.$store.state.userUID ? '你' : `"${msg.fromNick}" `
                return `${nick}撤回了一条消息`
            } else {
                return msg.tip
            }
        }
    }
}
</script>

