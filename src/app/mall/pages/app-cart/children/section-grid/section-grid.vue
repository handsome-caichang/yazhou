<!-- 购物车(为您推荐/我喜欢的商品)模块 -->

<style lang="scss" scoped>
	
	
	.section-grid{
		background-color: $color-white;
		.title{
			height: 52px;
			line-height: 52px;
			text-align: center;
			color: $color-3-s;
			font-size: $fs-normal;
		}
		.section-list{
			display: flex;
			flex-wrap: wrap;
			padding: 0 $edge/2;
			.section-item {
				width: 50%;
				padding: 0 $edge/2 15px;
			}
		}
		.void{
			height: 9px;
			background-color: $color-assist-1;
		}
	}
</style>

<template>
	<div class="section-grid">
		<div class="void"></div>
		<div class="title">{{title}}</div>
		<div class="section-list">
			<div class="section-item" v-for="item in data">
				<shop-grid :data="item"></shop-grid>
			</div>
		</div>
		<div class="void"></div>
	</div>
</template>
    
<script>
	import ShopGrid from '../shop-grid/shop-grid.vue';
	
	export default {
		props: {
			data: {
				type: Array,
				default: []
			},
			title: {
				type: String,
				default: ''
			}
		},
		components: {
			ShopGrid
		}
	}
</script>

