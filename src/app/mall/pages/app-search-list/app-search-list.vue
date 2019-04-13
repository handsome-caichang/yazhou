<!-- 搜索结果/首页楼层标题点击分类结果 列表页 -->
<style lang="scss" scoped>
	.app-search-list {
		@include position-absolute;
		background-color: $color-assist-1;
		.package-filter {
			position: absolute;
			top: 0;
			right: 0;
			width: 40px;
			height: 40px;
			display: flex;
			background-color: red;
			background: rgba(255,255,255,1);
			opacity: 0.9; 
			border-radius: 40px 0px 0px 40px;
			transition: all $duration $timing; 
			z-index: 2; 
			&.unfold {
				width: 100%;
				padding-left: 40px;
			}
			.filter-list {
				flex: 1;
				@include flex-center;
				@include ellipsis-single;
				.icon {
					font-size: 18px;
					margin-right: 5px;
				}
			}
			.toggle-btn {
				width: 40px;
				height: 40px;
				@include flex-center;
			}
		}
		.select-camplus {
			height: 40px;
			width: 100%;
			background-color: $color-white;
			display: flex;
			.item {
				flex: 1;
				height: 100%;
				@include flex-between;
				.curCampus, .allCampus{
					margin: 0 auto;
					height: 100%;
					line-height: 40px;
					font-size: 15px;
				}
				.active {
					border-bottom: 2px solid #1E88F5;
					color: #1E88F5;
				}
			}
		}
		.app-search-list-scroller {
			@include position-absolute(40px, 0, 0, 0);
			&.top {
				// @include position-absolute(0, 0, 0, 0);
				top: 0;
			}
		}
	}

</style>

<template>
	<div class="app-search-list">
		<div class="package-filter" :class="{unfold: unfoldPackageFilter}" v-if="$route.params.searchType === '100'">
			<div class="filter-list" v-if="unfoldPackageFilter" @click="togglePackageParams">
				<svg class="icon" aria-hidden="true">
				    <use :xlink:href="!IsShowAll_PackageParams ? '#icon-danxuanxuanzhong1' : '#icon-danxuanweixuanzhong'"></use>
				</svg>
				<span>只显示可报套餐</span>
			</div>
			<div class="toggle-btn" @click="togglePackageFilter">
				<svg class="icon" aria-hidden="true">
				    <use :xlink:href="unfoldPackageFilter ? '#icon-youhua' :  '#icon-zuohua'"></use>
				</svg>
			</div>
		</div>

		<div class="select-camplus" v-if="$route.query.showHeard==='true'">
			<div class="item" @click="active = 'cur'">
				<div class="curCampus" :class="{active: active === 'cur'}">当前校区</div>
			</div>
			<div class="item" @click="active = 'all'">
				<div class="allCampus" :class="{active: active === 'all'}">全部校区</div>
			</div>
		</div>
		<goodsList class="app-search-list-scroller" 
			:class="{'top': $route.query.showHeard!=='true'}"
			:searchType="parseInt($route.params.searchType)"
			:api="api" 
			:params="params"
			:emptyPageType="emptyPageType"
			:selectCamplusStr="active"
			@loadFirst="changMask">
		</goodsList>

		<!-- 加载中... -->
		<loading class="loading" v-show="loading" :bgType="1"></loading>
	</div>
	
</template>

<script>
	 
	import GoodsList from 'common/goods-list/goods-list.vue'
	import {getSearchList, getPackageList} from 'api/jie.js'

	export default {
	  	name: 'app-search-list',
	  	mixins: [app.mixin.shareMixin],
	  	data () {
		    return {
		    	loading: true,
		    	unfoldPackageFilter: false,
		    	IsShowAll_PackageParams: true,
	    		api: (this.$route.params.searchType === '100' ? getPackageList : getSearchList),
	    		params: null,
	    		active: 'cur',
		    };
	  	},
	  	computed: {
	  	    wxTitle() {
	  	        let params = this.$route.params;
	  	        return `${params.searchType === "-1" ? "商品搜索列表 -" : ""}${params.title}`
	  	    },
	  	    emptyPageType() {
	  	    	return this.$route.params.searchType === "-1" ? 1 : 11;
	  	    }
	  	},
	  	methods: {
	  		init() {
	  			let q = this.$route.params;
		  		if (q.searchType === '-1') {
  					this.params = {
  						Keyword: q.searchVal,
  					}
		  		} else if (q.searchType == '100') {
		  			this.params = {
		  				FloorID: q.searchVal,
		  				IsShowAll: ""
		  			}
		  		} else {
		  			this.params = {FloorID: q.searchVal}
		  		}
  			},
  			togglePackageFilter() {
  				this.unfoldPackageFilter = !this.unfoldPackageFilter;
  			},
  			togglePackageParams() {
  				this.IsShowAll_PackageParams = !this.IsShowAll_PackageParams;
  				this.unfoldPackageFilter = false;
  				this.params.IsShowAll = this.IsShowAll_PackageParams;
  				this.loading = true;
  			},
  			changMask(firstAjaxPromise) {
  				// this.loading = true;
  				firstAjaxPromise.then(res => {
  					this.loading = false;
  				})
  			}
	  	},
	  	created() {
	  		this.init();

	  		this.v_shareResolve(function () {
	  			return app.tool.mallShare({
	  			    // title: `${this.$route.params.searchType === "-1" ? "商品搜索列表 -" : ""}${this.$route.params.title}`,
	  			    title: `${this.$route.params.title}`,
	  			    desc: this.$store.state.config.Summary,
	  			    link: app.tool.parseToWXshareUrl(this.$route.fullPath),
	  			    imgUrl: this.$store.state.config.Logo
	  			});
	  		})
	  	},
	  	mounted() {
	  	},
	  	components: {
	  		GoodsList,
	  	},
	};
</script>

