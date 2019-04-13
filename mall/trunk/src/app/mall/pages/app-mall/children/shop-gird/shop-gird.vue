<style lang="scss" scoped>
	
	

	.shop-gird {
		width: 100%;
		
		.shop-img {
			position: relative;
			width: 100%;
			height: 0;
			padding-top: 75%;
			@include background-img(false, cover);
			background-color: $color-assist-1;
			.tag-wrapper {
				position: absolute;
				top: 5px;
				left: 0;
				.stock-alarm {
					// position: absolute;
					// top: 5px;
					// left: 0;
					padding: 0 3px;
					height: 16px;
					@include flex-center;
					font-size: $fs-small-s;
					color: $color-white;
					background-color: $color-primary;
					border-radius: 0 50px 50px 0;
					padding-right: 5px;
				}
				.start-sell-time {
					background-color: #FFAC00;
					margin-top: 5px;
				}
				.under-tag {
					background-color: #B2B2B2;
					margin-top: 5px;
				}
			}
		}
		.shop-base-info {
			padding: 10px 5px 0;
			border: 1px solid $color-border;
			.name {
				// height: $fs-big-s + 7;
				line-height: $fs-big-s + 4;
				height: 2*($fs-big-s + 4);
				font-size: $fs-big-s;
				color: $color-3;
				// @include ellipsis-single;
				@include ellipsis-multi(2);
			}
			.des {
				height: 2*($fs-small-x + 6px);
				font-size: $fs-small-x;
				line-height: 17px;
				color: $color-6;
				@include ellipsis-multi(2);
			}
			.date, .time {
				height: $fs-small-x + 6px;
				line-height: $fs-small-x + 6px;
				font-size: $fs-small-x;
				color: $color-6;
				@include ellipsis-single;
				.icon {
					margin-right: 2px;
				}
			}
			.other {
				margin-top: 3px;
				height: 30px;
				@include flex-between();
				color: $color-assist;
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
				.stockout-price {
					font-size: $fs-small;
				}
				.stockout-text {
					margin-left: 4px;
					font-size: $fs-big-s;
				}
			}
		}
	}

</style>

<template>
	<router-link class="shop-gird" tag="div" :to="`/details/${data.Type}/${data.ID}`">
		<div class="shop-img" :style="'background-image:url(' + data.Image + ')'">
			<div class="tag-wrapper">
				<div class="stock-alarm" v-if="config.StockAlarmNum && data.Stock > 0 && data.Stock < config.StockAlarmNum">
					仅剩{{data.Stock}}{{data.Type==2?data.Unit:'个名额'}}
				</div>
				<div class="stock-alarm start-sell-time" v-if="timeTag==='notShell'">
					{{timeText}}
				</div>
				<div class="stock-alarm under-tag" v-if="timeTag==='underShell'">
					{{timeText}}
				</div>
			</div>
		</div>
		<div class="shop-base-info">
			<!-- 商品名称 -->
			<div class="name">{{data.Name}}</div>
			<!-- 商品描述信息 -->
			<div class="des" v-if="data.Type !== 1">{{data.Descrite}}</div>			
			<!-- 开班日期 -->
			<div class="date" v-if="data.Type === 1">
				<svg class="icon" aria-hidden="true">
	                <use xlink:href="#icon-youxiaoqiicon"></use>
	            </svg>
	            {{data.OpenDateTime | formatDatetime("MM月dd日")}}
			</div>
			<!-- 上课时间 -->
			<div class="time" v-if="data.Type === 1">
				<svg class="icon" aria-hidden="true" v-if="data.CourseTime">
	                <use xlink:href="#icon-riqiicon"></use>
	            </svg>
	            {{data.CourseTime}}
			</div>
			<!-- 数量、单位、价格 -->
			<div class="other">
				<div class="amount-unit">
					<span class="amount" v-if="data.Type === 1 || data.Type === 3">{{data.Amount}}</span>
					<span class="unit" v-if="data.Type === 1 || data.Type === 3">{{data.Unit}}</span>
				</div>
				<!-- 是否还有库存 -->
				<div class="price" v-if="!data.IsStockOut">&#165;{{data.Money|formatNumber}}</div>
				<div v-else>
					<!-- <span class="stockout-price" >&#165;{{data.Money}}</span> -->
					<span class="stockout-text" v-if="data.Type === 1 || data.Type === 3">满员</span>
					<span class="stockout-text" v-if="data.Type === 2 || data.Type === 100">售完</span>
				</div>
			</div>
		</div>
	</router-link>
</template>

<script>
	 

	export default {
	  	name: 'shop-gird',
	  	props: {
	  		// 传入单个商品信息
	  		data: {
	  			type: Object,
	  			default: null
	  		}
	  	},	  	
		data () {
			return {
				timeTag: '',
				timeText: ''
			};
	  	},
	  	computed: {
	  		...Vuex.mapState(['config'])
	  	},
	  	methods: {
	  		showTimeTag(startTime, endTime) {
	  			this.timeTag = ''
	  			this.Text = ''
	  			
	  			let time1 = Date.parse(new Date(startTime)),
	  			 	time2 = Date.parse(new Date(endTime)),
	  			 	nowTime = Date.parse(new Date())
	  			if ((time2 - time1) < 0) return 
  			 	if ((time2 - nowTime) < 0) { //已下架
  			 		this.timeTag = 'underShell'
  			 		this.timeText = '已下架'
  			 		return
  			 	}
  			 	if ((time1 - nowTime) > 0) { // 还未开售
  			 		let startYear = new Date(startTime).getFullYear(),
  			 			startMonth = new Date(startTime).getMonth(),
  			 			startDate = new Date(startTime).getDate(),//开售年月日

  			 			nowYear = new Date().getFullYear(),
  			 			nowMonth = new Date().getMonth(),
  			 			nowDate = new Date().getDate()//当前年月日
  			 			if ((startYear === nowYear) && (startMonth === nowMonth) && (startDate === nowDate)) {
  			 				this.timeText = new Date(startTime).getHours() + ':' + new Date(startTime).getMinutes() + '开售'
  			 			} else {
  			 				this.timeText = startMonth + 1 + '月' + startDate + '日开售'
  			 			}
  			 			this.timeTag = 'notShell'
  			 	}
  			 	if (((time1 - nowTime) < 0) && ((time2 - nowTime) > 0)) { //正在卖的商品

  			 	}

	  		}
	  	},
	  	mounted() {
	  		if (this.data.ApplyStartDate && this.data.ApplyEndDate) this.showTimeTag(this.data.ApplyStartDate, this.data.ApplyEndDate)
	  	},
	 	watch: {
	 		data: {
	 			handler(newVal, oldVal) {
	 				if (this.data.ApplyStartDate && this.data.ApplyEndDate) this.showTimeTag(this.data.ApplyStartDate, this.data.ApplyEndDate)
	 			},
	 			deep: true
	 		}
	 	}
  	}	
</script>

