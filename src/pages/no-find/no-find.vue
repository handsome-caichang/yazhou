<style lang="scss" scoped>
	@import '../../assets/scss/mixin.scss';
	@import '../../assets/scss/variable.scss';
	.no-find {
		@include position-absolute;
		background-color: $color-assist-1;
	}
</style>

<template>
	<empty-page class="no-find" type="404"></empty-page>
</template>

<script>
	import EmptyPage from 'src/components/common/empty-page/empty-page.vue'
	export default {
		name: 'no-find',
			data () {
			return {

			};
		},
		components: {
	  		EmptyPage
	  	}
	};
</script>

