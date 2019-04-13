<style lang="scss" scoped>
	.chat-list {
		padding-bottom: 10px;
	}
</style>

<template>
	<div class="chat-list">
		<component 
			v-for="(msg, index) in msglist" 
			:key="msg.idClient" 
			:is="map[msg.type]"
			:rawMsg="msg"
			@msgChangeHeight="$emit('msgChangeHeight')">
		</component>
	</div>
</template>

<script>
import ChatNotice from '../chat-notice/chat-notice.vue'
import ChatMsg from '../chat-msg/chat-msg.vue'

export default {
	name: 'chat-list',
	props: {
		msglist: Array
	},
	data () {
		return {
			map: {
				'text': ChatMsg,
				'image': ChatMsg,
				'audio': ChatMsg,
				'video': ChatMsg,
				'file': ChatMsg,
				'custom': ChatMsg,
				'timeTag': ChatNotice,
				'tip': ChatNotice,
				'notification': ChatNotice,
			}
		}
	},
	methods: {
	},
	created() {
	},
	mounted() {
	},
	components: {
	}
}
</script>

