<!-- 首页横向商品展示版块 -->
<style lang="scss" scoped>
	
	
	
	.section-row {		
		background-color: $color-assist-1;
		.title {
			height: $h-1;
			font-size: $fs-normal-x;
			color: $color-3;
			background-color: $color-assist-1;
			@include flex-center;
			.icon {
				margin-left: 4px;
				color: $color-6;
			}
		}
		.section-list {
			padding: 0 $edge;
			.void {
			    height: $void;
			    background-color: $color-assist-1;
			}
		}
	}
</style>

<template>
	<div class="section-row" v-if="data">
		<!-- 楼层标题 -->
		<div class="title" @click="gotoSearchList">
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
				v-for="(item, index) in data.Products">
				<!-- 传入版块类型及单个商品对象 -->
				<shop-row :data="item"></shop-row>
				<div class="void" v-if="index !== data.Products.length - 1"></div>
			</div>
		</div>
	</div>
</template>

<script>
	 
	import ShopRow from 'common/shop-row/shop-row.vue'
	import FloorAd from '../floor-ad/floor-ad.vue'

	export default {
	  	name: 'section-row',
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
	  		ShopRow,
	  		FloorAd
	  	}
	};
</script>

