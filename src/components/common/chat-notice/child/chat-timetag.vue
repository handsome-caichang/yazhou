<style lang="scss" scoped>
</style>

<template>
	<!-- 消息时间 -->
	<div class="timetag-msg">{{msg.text}}</div>
</template>

<script>
export default {
  	name: 'chat-timetag',
  	props: {
  		msg: Object
  	}
}
</script>

