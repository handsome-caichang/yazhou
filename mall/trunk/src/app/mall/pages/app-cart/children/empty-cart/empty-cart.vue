<!-- 空购物车界面 -->

<style lang="scss" scoped>
    
	
	
	.empty-cart{
		height: 350px;
    	line-height: 1;
    	margin-bottom: 12px;
    	@include flex-center(column);
    	.empty-cart-icon{
    		font-size: 80px;
    	}
    	.empty-cart-tips{
    		margin-top: 32px;
    		font-size: $fs-normal;
			color: $color-3;
    	}
    }
</style>

<template>
	<div class="empty-cart">
		<svg class="icon empty-cart-icon" aria-hidden="true">
    		<use xlink:href="#icon-gouwuche2"></use>
    	</svg>
    	<div class="empty-cart-tips">购物车还是空空哒～</div>
	</div>
</template>

<script>	
	export default{
		name: 'empty-cart'
	}
</script>
