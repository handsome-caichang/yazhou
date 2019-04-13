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
				top: 0;
			}
			.card {
			    padding: 13px 12px 14px 12px;
			    display: flex;
			    background-color: $color-white;
			    border-bottom: 1px solid $color-assist-1;
			    .card-left {
			        width: 104px;
			        .img {
			            // height: 78px;
			            position: relative;
			            border: 1px solid $color-white;
			            border-radius: 2px;
			            @include dynamic-wh(104px, 0.75);
			            @include background-img(false, cover);
			            .tags {
			                width: 64px;
			                height: 15px;
			                line-height: 15px;
			                text-align: center;
			                background-color: #E93A0F;
			                border-radius: 0px 8px 8px 0px;
			                font-size: 11px;
			                color: $color-white;
			                @include position-absolute(0, false, false, 0);
			            }
			            .sale-not {
			                .icon {
			                    font-size: 55px;
			                }
			                width: 100%;
			                height: 100%;
			                @include flex-between;
			                padding-left: 24px;
			            }
			        }
			    }
			    .card-right {
			        flex: 1;
			        margin-left: 12px;
			        .name {
			            font-size: 15px;
			            color: $color-3;
			            @include ellipsis-multi(2);
			        }
			        .info {
			            margin-top: 6px;
			            font-size: 12px;
			            color: $color-9;
			        }
			        .other {
			            margin-top: 16px;
			            display: flex;
			            .price {
			                font-size: 17px;
			                color: #E93A0F;
			                max-width: 75px;
			            }
			            .num {
			                flex: 1;
			                margin-left: 40px;
			                width: 0;
			                text-align: right;
			                @include ellipsis-single;
			                font-size: 12px;
			                color: $color-6;
			            }
			        }
			    }
			}
		}
	}

</style>

<template>
	<div class="app-search-list">
		<div class="select-camplus">
			<div class="item" @click="active = 'cur'">
				<div class="curCampus" :class="{active: active === 'cur'}">当前校区</div>
			</div>
			<div class="item" @click="active = 'all'">
				<div class="allCampus" :class="{active: active === 'all'}">全部校区</div>
			</div>
		</div>
		<scroller-super class="app-search-list-scroller"
		:type="2"
		:data="list"
		:pagingOption="pagingOption"
		@loadData="loadData">
			<div>
			    <router-link tag="div" 
			        :to="`/detail/${item.ID}/${item.Type}`" 
			        class="card" 
			        v-for="(item,index) in list"
			        :key="index">
			        <div class="card-left">
			            <div class="img" :style="'background-image:url('+item.Image+')'">
			                <div class="tags" v-if="Math.random()>0.5">
			                    <svg class="icon" aria-hidden="true">
			                        <use xlink:href="#icon-huo"></use>
			                    </svg>仅剩10名
			                </div>
			                <div class="sale-not" v-else>
			                    <svg class="icon" aria-hidden="true">
			                        <use xlink:href="#icon-yishouqing"></use>
			                    </svg>
			                </div>
			            </div>
			        </div>
			        <div class="card-right">
			            <div class="name">{{item.Name}}</div>
			            <div class="info">学校20周年庆/20年一遇大促销</div>
			            <div class="other">
			                <div class="price">&#165;{{item.Money|formatNumber}}</div>
			                <div class="num">
			                    10课时|20课时|30课时
			                </div>
			            </div>
			        </div>
			    </router-link>
			</div>
		</scroller-super>

		<!-- 加载中... -->
		<loading class="loading" v-show="loading" :bgType="1"></loading>
	</div>
	
</template>

<script>
	 
	import GoodsList from 'common/goods-list/goods-list.vue'
	import {getSearchList} from 'api/jie.js'

	export default {
	  	name: 'app-search-list',
	  	mixins: [app.mixin.shareMixin],
	  	data () {
		    return {
		    	wxTitle: '商品搜索列表',
		    	loading: true,
		    	list: [],
	    		pagingOption: {
	    		    api: getSearchList,
	    		    params: {
	    		        CampusID: '',
	    		    }
	    		},
	    		
	    		active: 'cur',
		    };
	  	},
	  	computed: {
	  	    
	  	},
	  	methods: {
	  		loadData(ajaxPromise) {
	  		    ajaxPromise.then(res => {
	  		        this.loading = false
	  		        if (res.ErrorCode === app.errok) {
	  		            if (res.PageIndex === 1) {
	  		                this.list = []
	  		            } 
	  		            this.list = this.list.concat(res.Data)
	  		            this.list = this.list.filter(obj => obj.Type !== 3)
	  		        }
	  		    })
	  		}
	  	},
	  	created() {

	  		
	  	},
	  	mounted() {
	  	},
	  	components: {
	  		GoodsList,
	  	},
	};
</script>

