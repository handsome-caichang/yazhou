<!-- 商品一行单元 -->
<style lang="scss" scoped>
	
	

	.shop-row {
		width: 100%;
		background-color: $color-white;
		.camplus-name {
			height: 40px;
			line-height: 40px;
			padding-left: 10px;
			font-size: 15px;
			color: $color-6;
		}
		.top {
			@include border-top;
			padding: $edge;
			display: flex;
			justify-content: space-between;
			.shop-img {
				position: relative;
				@include dynamic-wh(113px, 0.75);
				@include background-img(false, cover);
				background-color: $color-assist-1;
				// .stock-alarm {
				// 	position: absolute;
				// 	top: 5px;
				// 	left: 0;
				// 	padding: 0 3px;
				// 	height: 16px;
				// 	@include flex-center;
				// 	font-size: $fs-small-s;
				// 	color: $color-white;
				// 	background-color: $color-primary;
				// }
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
			.shop-base-info-wrap {
				position: relative;
				flex: 1;				
				margin-left: $edge;
				min-width: 0;
				.shop-base-info {
					padding-top: 2px;
					// @include position-absolute;
					.name {
						// height: $fs-big-s + 7;
						// line-height: $fs-big-s;
						// font-size: $fs-big-s;
						font-size: $fs-normal-x;
						line-height: 20px;
						color: $color-3;
						// @include ellipsis-single;
						@include ellipsis-multi;
						.icon {
							width: 28px;
							height: 16px;
							vertical-align: top;
						}
					}					
					.teachers, .date, .time, .amount{
						height: $fs-small-x + 6px;
						line-height: $fs-small-x + 6px;
						font-size: $fs-small-x;
						color: $color-6;
						@include ellipsis-single;
						.icon {
							margin-right: 3px;
						}
						.spec {
							color: #E93A0E;
						}
					}
					.des {
						font-size: $fs-small-x;
						line-height: 17px;
						color: $color-6;
        				@include ellipsis-multi(2);
					}
					
				}
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
					.tag-item {
						margin-right: 5px;
					}
				}
			}
		}
	}
</style>

<template>
	<div class="shop-row">
		<div class="camplus-name" v-if="showCampusName==='all'">{{data.CampusName}}</div>
		<router-link  tag="div" :to="`/details/${data.Type}/${data.ID}`">
			<div class="top">
				<div class="shop-img" :style="'background-image:url(' + data.Image + ')'">
					<!-- <div class="stock-alarm" v-if="config.StockAlarmNum && data.Stock > 0 && data.Stock < config.StockAlarmNum">
						仅剩{{data.Stock}}{{data.Type==2?data.Unit:'个名额'}}
					</div> -->
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
				<div class="shop-base-info-wrap">
					<div class="shop-base-info">
						<!-- 商品名称 -->
						<div class="name">
	            			<svg class="icon" aria-hidden="true" v-if="showTitleTag && data.Type === 1">
	                            <use xlink:href="#icon-kechengbiaoqian"></use>
	                        </svg>
	                        <svg class="icon" aria-hidden="true" v-if="showTitleTag && (data.Type === 2 || data.Type === 4)">
	                            <use xlink:href="#icon-wupinbiaoqian"></use>
	                        </svg>
	                        <svg class="icon" aria-hidden="true" v-if="showTitleTag && data.Type === 3">
	                            <use xlink:href="#icon-kechengbiaoqian"></use>
	                        </svg>
	                        <svg class="icon" aria-hidden="true" v-if="showTitleTag && data.Type === 100">
				                <use xlink:href="#icon-taocanbiaoqian"></use>
				            </svg>
							{{data.Name}}
						</div>
						<!-- 商品描述信息 -->
						<div class="des" v-if="data.Type !== 1">{{data.Descrite}}</div>
						
						<!-- 老师 -->
						<!-- <div class="teachers" v-if="data.Type === 1 && data.Teachers.length > 0"> -->
						<div class="teachers" v-if="isShowTeacher">
							<svg class="icon" aria-hidden="true">
				                <use xlink:href="#icon-laoshiicon"></use>
				            </svg>
							{{data.Teachers.join(" ")}}
						</div>
						<!-- 招生人数 -->
						<div class="amount" v-if="data.MaxStudentCount&&config.HideClassAmount!==1">
							<svg class="icon" aria-hidden="true">
				                <use xlink:href="#icon-xueshengrenshu"></use>
				            </svg>
					 		<span class="spec">{{data.CurrentStudentCount}}</span> / {{data.MaxStudentCount}}
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
					<span class="amount" v-if="data.Type === 1 || data.Type === 3">{{data.Amount}}</span>
					<span class="unit" v-if="data.Type === 1 || data.Type === 3">{{data.Unit}}</span>
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
						<span class="stockout-text" v-if="data.Type === 1 || data.Type === 3">满员</span>
						<span class="stockout-text" v-if="data.Type === 2 || data.Type === 4">售完</span>
					</div>				
				</div>
			</div>
		</router-link>
	</div>
</template>

<script>
	 
	import ShopTag from 'common/shop-tag/shop-tag.vue'
	export default {
	  	name: 'shop-row-course',
	  	props: {
	  		// 接收单个商品信息
	  		data: {
	  			type: Object,
	  			default: null
	  		},
	  		showTitleTag: {
	  			type: Boolean,
	  			default: false
	  		},
	  		showCampusName: {
	  			type: String,
	  			default: 'cur'
	  		}
	  	},
		data () {
			return {
				timeTag: '',
				timeText: ''
			};
	  	},
	  	computed: {
	  		...Vuex.mapState(['config']),
	  		isShowTeacher() {
	  			return this.data.Type === 1 && this.data.Teachers.length > 0 && this.config.EnableDisplayTeacher
	  		}
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
	  	components: {
	  		ShopTag
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

