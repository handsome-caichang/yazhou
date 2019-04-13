<!-- 购物车(为您推荐/我喜欢的商品)模块商品 -->

<style lang="scss" scoped>
	
	
	
	.shop-grid{
		display: inline-block;
	    width: 100%;
	    line-height: 1;
		.img{
			width: 100%;
			height: 0;
			padding-top: 75%;
			@include background-img(false, cover);
			background-color: $color-assist-1;
		}
		.name{
			font-size: $fs-normal-x;
			color: $color-3;
			padding-top: 20px;
			// @include ellipsis-single;
			@include ellipsis-multi;
		}
		.price{
			font-size: $fs-big-s;
			color: $color-assist;
			padding-top: 10px;
		}
	}
</style>

<template>
	<div class="shop-grid" @click="gotoDetail(data)">
		<div class="img" :style="'background-image:url('+data.Image+')'"></div>
		<div class="name">{{data.Name}}</div>
		<div class="price">&#165;{{data.Money|formatNumber}}</div>
	</div>
</template>

<script>
	export default {
		name: 'shop-grid',
		props: {
			data: {
				type: Object,
				default: null
			}
		},
		methods:{
			gotoDetail(pro){ //查看商品详情
				this.$router.push({path:`/details/${pro.Type}/${pro.ID}`});
			}
		}
	}
</script>
