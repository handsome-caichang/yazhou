<!-- 标签组件 -->
<style lang="scss" scoped>
	.tag {
		width: 27px;
		height: 14px;
	}
</style>

<template>
	<svg class="tag icon" aria-hidden="true">
	    <use :xlink:href="tags[type]"></use>
	</svg>
</template>

<script>
	export default {
	  	name: 'shop-tag',
	  	props: {
	  		type: {
	  			type: Number
	  		}
	  	},
	  	data() {
	    	return {
	    		tags: ["#icon-dingjin", "#icon-quan", "#icon-youhui"]
	    	}
  		}
	}
</script>

