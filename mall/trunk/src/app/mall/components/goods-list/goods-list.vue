<!-- 商品 搜索结果/分类结果 列表展示组件 -->
<style lang="scss" scoped>
	.goods-list-scroller {
		@include position-absolute;
		background-color: $color-assist-1;
		.goods-list {
			padding: $edge;
			.goods-item {
				margin-bottom: $void;
				box-shadow: 0 1px 3px 0 rgba(0,0,0,0.04);
			}
			.goods-item:last-child {
				margin-bottom: 0;
			}
		}		
	}
	.goods-none {
		@include position-absolute;
	}
</style>

<template>
	<div>
		<scroller-super class="goods-list-scroller" 
			:type="2"
			:data="scrollData"
			:pagingOption="pagingOption"
			@loadData="loadData"
			@loadFirst="emitLoadFirst"
			ref="goodsListScroller">
			
			<div class="goods-list">
				<div class="goods-item"
					v-for="(item, index) in goodsList">
					<!-- 传入版块类型及单个商品对象 -->
					<shop-row :showTitleTag="searchType === -1" :type="item.type" :data="item" :showCampusName="selectCamplusStr"></shop-row>
				</div>
			</div>
		</scroller-super>

		<empty-page class="goods-none" :type="emptyPageType" v-if="init && goodsList.length === 0"></empty-page>
	</div>
</template>

<script>
	 
	import ShopRow from 'common/shop-row/shop-row.vue'
	import EmptyPage from 'common/empty-page/empty-page.vue'

	export default {
	  	name: 'goods-list',
	  	props: {
	  		anim: {
	  			default: 0
	  		},
	  		api: {
	  			type: Function
	  		},
	  		params: {
	  			type: Object
	  		},
	  		emptyPageType: {
	  			type: Number,
	  			default: 1
	  		},
	  		searchType: {
	  			type: Number,
	  			default: 0
	  		},
	  		selectCamplusStr: {
	  			type: String,
	  			default: 'cur'
	  		}
	  	},
	  	data () {
		    return {
		    	init: false, // 是否拉取过数据
		    	goodsList: [],
		    };
	  	},
	  	computed: {
	  		...Vuex.mapState(['curCampus']),
	  		scrollData() {
	  			return {
	  				goodsList: this.goodsList,
	  				anim: this.anim
	  			}
	  		},
	  		pagingOption() {
	  			return {
	  				api: this.api,
	  				params: {
	  					CampusID: this.selectCamplusStr === 'all' ? '' : this.curCampus.id,
	  					...this.params
	  				},
	  			}
	  		},
	  	},
	  	methods: {
	  		loadData(ajaxPromise) {
	  			ajaxPromise.then(res => {
	  				if (res.ErrorCode === app.errok) {
	  					// 2017.10.27 目前的情况是：拉取套餐列表时，后台并没有做分页; 所以加上了对res.PageIndex为空的判断，
	  					if (res.PageIndex === 1 || !res.PageIndex) {
	  						this.goodsList = [];
	  					} 
  						this.init = true;
	  					this.goodsList = this.goodsList.concat(res.Data);
	  				}
	  			})
	  		},
	  		emitLoadFirst(ajaxPromise) {
	  			this.$emit('loadFirst', ajaxPromise)
	  		}
	  	},
	  	created() {
	  	},
	  	watch: {
	  		// 当查询参数发生变化时, 自动刷新分页 重新拉取列表
	  		pagingOption: {
		  		deep: true,
	  			handler: function (newParams, oldParams) {
		  			this.$refs.goodsListScroller.refresh(newParams.params);
		  		}
	  		},

	  	},
	  	components: {
	  		ShopRow,
	  		EmptyPage
	  	}
	};
</script>

