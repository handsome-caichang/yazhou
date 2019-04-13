<!-- 商品一行单元，用于收藏商品页面 -->
<style lang="scss" scoped>
	
	

	.shop-row {
		width: 100%;
		background-color: $color-white;
		.top{
			padding: $edge;
			display: flex;
			justify-content: space-between;
			.shop-select{
				width: 40px;
				height: 84.75px;
				line-height: 84.75px;
				text-align: center;
				font-size: $fs-big;
				color: #CCCCCC;
				.icon{
					&.active{
						color: $color-primary;
					}
				}
			}
			.shop-img {
				position: relative;
				@include dynamic-wh(113px, 0.75);
				@include background-img(false, cover);
				background-color: $color-assist-1;
				.stock-alarm {
					position: absolute;
					top: 5px;
					left: 0;
					padding: 0 3px;
					height: 16px;
					@include flex-center;
					font-size: $fs-small-s;
					color: $color-white;
					background-color: $color-primary;
				}
			}
			.shop-base-info-wrap {
				position: relative;
				flex: 1;				
				margin-left: $edge;
				.shop-base-info {
					padding-top: 2px;
					@include position-absolute;
					.name {
						height: $fs-normal-x + 7;
						line-height: $fs-normal-x;
						font-size: $fs-normal-x;
						color: $color-3;
						@include ellipsis-single;
					}					
					.teachers, .date, .time {
						height: $fs-small + 6px;
						line-height: $fs-small + 6px;
						font-size: $fs-small;
						color: $color-6;
						@include ellipsis-single;
						.icon {
							margin-right: 3px;
						}
					}
					.des {
						font-size: $fs-small-x;
						line-height: 18px;
						color: $color-6;
        				@include ellipsis-multi(2);
					}
					
				}
			}
			&.edit{
				padding-left: 0;
			}
		}
		.bottom {
			height: $h-4;
			padding: $edge;
			@include flex-between;
			@include border-top;
			.amount-unit {
				font-size: $fs-small-x;
				.amount {
					color: $color-3-s;
				}
				.unit {
					color: $color-9;
				}
			}
			.price {
				color: $color-assist;
				font-size: $fs-big-s;
			}
			.stockout {
				@include flex-between;
				color: $color-assist;
				.stockout-price {
					font-size: $fs-small;
				}
				.stockout-text {
					margin-left: 4px;
					font-size: $fs-big-s;
				}
				.tags {
					display: flex;
					vertical-align: middle;
					margin-right: 4px;
					.tag-wrap {
						padding-right: 5px;
					}
				}
			}

		}
	}

</style>

<template>
	<div class="shop-row" @click="goToDetail(data)">
		<div class="top" :class="{'edit':isEdit}" @click="emitEvent(data)">
			<div class="shop-select" v-show="isEdit">
				<svg class="icon" aria-hidden="true" :class="{active:judgeSelect(data.ProductID)}">
	    			<use :xlink:href="judgeSelect(data.ProductID)?'#icon-danxuanxuanzhong':'#icon-danxuanweixuanzhong'"></use>
	    		</svg>
			</div>
			<div class="shop-img" :style="'background-image:url(' + data.Image + ')'">
				<div class="stock-alarm" v-if="config.StockAlarmNum && data.Stock > 0 && data.Stock < config.StockAlarmNum">
					仅剩{{data.Stock}}{{data.Type==2?data.Unit:'个名额'}}
				</div>
			</div>
			<div class="shop-base-info-wrap">
				<div class="shop-base-info">
					<!-- 商品名称 -->
					<div class="name">{{data.Name}}</div>
					<!-- 商品描述信息 -->
					<div class="des" v-if="data.Type !== 1">{{data.Descrite}}</div>
					
					<!-- 老师 -->
					<div class="teachers" v-if="data.Type === 1 && data.Teachers.length > 0">
						<svg class="icon" aria-hidden="true">
			                <use xlink:href="#icon-laoshiicon"></use>
			            </svg>
						{{data.Teachers.join(" ")}}
					</div>
					<!-- 开班日期 -->
					<div class="date" v-if="data.Type === 1 && data.OpenDateTime">
						<svg class="icon" aria-hidden="true">
			                <use xlink:href="#icon-youxiaoqiicon"></use>
			            </svg>
			            {{data.OpenDateTime | formatDatetime("MM月dd日")}}
					</div>

					<!-- 上课时间 -->
					<div class="time" v-if="data.Type === 1 && data.CourseTime">
						<svg class="icon" aria-hidden="true" v-if="data.CourseTime">
			                <use xlink:href="#icon-riqiicon"></use>
			            </svg>
			            {{data.CourseTime}}
					</div>
				</div>
			</div>
		</div>
		<div class="bottom">
			<div class="amount-unit">
				<span class="amount" v-if="data.Type === 1">{{data.Amount}}</span>
				<span class="unit" v-if="data.Type === 1">{{data.Unit}}</span>
			</div>
			
			<div class="stockout">
				<!-- 标签 -->
				<div class="tags">
					<shop-tag class="tag-item" :type="0" v-if="data.IsPreMoney"></shop-tag>
					<shop-tag class="tag-item" :type="1" v-if="data.IsCoupon"></shop-tag>
				</div>
				<!-- 是否还有库存 -->
				<div class="price" v-if="!data.IsStockOut">&#165;{{data.Money|formatNumber}}</div>
				<div v-else>
					<span class="stockout-price" >&#165;{{data.Money|formatNumber}}</span>
					<span class="stockout-text" v-if="data.Type === 1">满员</span>
					<span class="stockout-text" v-if="data.Type === 2">售完</span>
				</div>				
			</div>
		</div>
	</div>
</template>

<script>
	 
	import ShopTag from 'common/shop-tag/shop-tag.vue';
	
	export default {
	  	name: 'shop-row-course',
	  	props: {
	  		// 接收单个商品信息
	  		data: {
	  			type: Object,
	  			default: null
	  		},
	  		isEdit: {
	  			type: Boolean,
	  			default: false
	  		},
	  		sList: {
	  			type: Array,
	  			default: []
	  		}
	  	},
	  	computed: {
	  		...Vuex.mapState(['config']),
			productIDs(){
				return this.sList.map(pro => {
					return pro.ProductID
				})
			}
		},
	  	methods: {
	  		goToDetail(data){
	  			if(this.isEdit){
	  				return;
	  			}
	  			this.$router.push(`/details/${data.Type}/${data.ID}`);
	  		},
	  		emitEvent(data){
	  			if(this.isEdit){
	  				this.$emit('select',data);
	  			}
	  		},
	  		judgeSelect(pid){ //判断选中
        		return this.productIDs.indexOf(pid) !== -1;
        	}
	  	},
	  	components: {
	  		ShopTag
	  	}
  	}	
</script>

