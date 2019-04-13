<!-- 首页网格商品展示版块 -->
<style lang="scss" scoped>
	
	
	
	.section-gird {		
		.title {
			height: $h-1;
			margin-bottom: $edge;
			font-size: $fs-normal-x;
			color: $color-3;
			@include flex-center;
			@include border-bottom;
			.icon {
				margin-left: 4px;
				color: $color-6;
			}
		}
		.section-list {
			display: flex;
			flex-wrap: wrap;
			padding: $edge/2;
			.section-item {
				width: 50%;
				padding: 0 $edge/2 18px;
			}
		}
	}
</style>

<template>
	<div class="section-gird" v-if="data">
		<!-- 楼层标题 -->
		<div class="title" @click="gotoSearchList()" append>
			<span>{{data.Name}}</span>
			<svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gengduoicon"></use>
            </svg>
		</div>
		<!-- 楼层广告 -->
		<floor-ad :ads="data.Ads" v-if="data.Ads.length > 0"></floor-ad>
		<!-- 楼层商品列表 -->
		<div class="section-list">
			<div class="section-item"
				v-for="item in data.Products">
				<shop-gird :data="item"></shop-gird>
			</div>
		</div>
	</div>
</template>

<script>
	 
	import ShopGird from '../shop-gird/shop-gird.vue'
	import FloorAd from '../floor-ad/floor-ad.vue'
	export default {
	  	name: 'section-gird',
	  	props: {
	  		// 传入商品版块信息
	  		data: {
	  			type: Object,
	  			default: null
	  		}
	  	},
	  	data () {
	    	return {

	    	};
	  	},
	  	methods: {
	  		gotoSearchList() {
	  			let type; //100表示套餐,1表示普通商品
	  			if (this.data.Code === 'PACKAGE') {
	  				type = 100;
	  			} else {
	  				type = 1;
	  			}
	  			this.$router.push({path: `/searchList/${type}/${this.data.ID}/${encodeURIComponent(this.data.Name)}`});
	  		}
	  	},
	  	components: {
	  		ShopGird,
	  		FloorAd
	  	}
	};
</script>

