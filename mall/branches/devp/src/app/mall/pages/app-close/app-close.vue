<style lang="scss" scoped>
	.app-close {
		width: 100%;
		height: 100%;
	}
</style>

<template>
	<empty-page class="app-close" :type="0"></empty-page>
</template>

<script>
	import EmptyPage from 'common/empty-page/empty-page.vue'
	export default {
		name: 'app-close',
		mixins: [app.mixin.shareMixin],
		data () {
			return {
				wxTitle: '手机商城'
			};
		},
	  	components: {
	  		EmptyPage
	  	}
	};
</script>

