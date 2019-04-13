<style lang="scss" scoped>
	
	
	.no-find {
		@include position-absolute;
		background-color: $color-assist-1;
	}
</style>

<template>
	<empty-page class="no-find" type="404"></empty-page>
</template>

<script>
    import EmptyPage from 'parent/components/common/empty-page/empty-page.vue'
    
	export default {
		name: 'no-find',
		components: {
	  		EmptyPage
	  	}
	};
</script>

