<!-- 订单商品一行单元 -->

<style lang="scss" scoped>
	
	
	
	.order-row{
		background-color: $color-assist-4;
		.row-hd{
			display: flex;
			padding: 15px;
			.row-hd-l{
				width: 100px;
				height: 75px;
				@include background-img(false,cover);
				background-color: $color-assist-1;
			}
			.row-hd-r{
				flex: 1;
				position: relative;
				min-height: 75px;
				margin-left: 10px;
				padding-bottom: 20px;
				line-height: 1;
				.name{
					padding-bottom: 10px;
					font-size: $fs-normal-x;
					color: $color-3;
					word-break: break-all;
				}
				.content{
					div{
						color: $color-6;
						padding-bottom: 5px;
						font-size: $fs-small-x;
						label{
							color: $color-9;
						}
					}
					margin-bottom: 8px;
				}
				.detail{
					position: absolute;
				    left: 0px;
				    right: 0;
				    bottom: 0;
					height: 20px;
					line-height: 20px;
					@include flex-between;
					.price{
						margin-right: 6px;
						vertical-align: middle;
						font-size: $fs-big-s;
					}
					.icon{
						font-size: 27px;
						vertical-align: middle;
					}
					.scheme-tag{
						display: inline-block;
						line-height: 15px;
						padding: 0 2px;
						color: #C89FFF;
						border-radius: 2px;
						font-size: $fs-small-s;
						vertical-align: middle;
						border: 1px solid #C89FFF;
					}
					.count{
						color: $color-9;
						font-size: $fs-small-x;										
					}
				}
			}
		}
		.row-bd{
			padding: 0 18px 0 50px;
			background-color: #FFFCEE;
			font-size: $fs-small;
			.row-bd-l{
				padding: 4px 0;
				position: absolute;
			}
			.row-bd-r{
				padding-left: 60px;
				.item{
					color: $color-9;
					padding: 4px 0;
					@include flex-between;
					.item-name{
						max-width: 70%;
						@include ellipsis-single;
					}
				}
			}
		}
	}
</style>

<template>
	<div class="order-row">
		<div class="row-hd">
			<span class="row-hd-l" :style="'background-image:url('+product.Image+')'"></span>
			<div class="row-hd-r">
				<div class="name">{{product.Name}}</div>
				<!-- 班级详情 -->
				<div v-if="product.Type==1" class="content">
					<div v-if="product.ClassInfo.Date"><label>开班日期：</label>{{product.ClassInfo.Date}}</div>
					<div v-if="product.ClassInfo.CourseTime"><label>上课时间：</label>{{product.ClassInfo.CourseTime}}</div>
					<div v-if="(product.ClassInfo.SeatRow>0)&&(product.ClassInfo.SeatColumn>0)"><label>已选座位：</label><!-- {{product.ClassInfo.SeatRow}}排{{product.ClassInfo.SeatColumn}}座 -->
						{{product.ClassInfo.SeatName}}
					</div>
					<div v-if="product.ClassInfo.ShiftSpecID"><label>课程数量：</label>
						{{computedShiftNum('ClassInfo')}}
					</div>
				</div>
				<!-- 课程详情 -->
				<div v-if="product.Type==3" class="content">
					<div v-if="product.ShiftInfo.ClassName"><label>所选班级：</label>{{product.ShiftInfo.ClassName}}</div>
					<div v-if="product.ShiftInfo.Date"><label>开班日期：</label>{{product.ShiftInfo.Date}}</div>
					<div v-if="product.ShiftInfo.CourseTime"><label>上课时间：</label>{{product.ShiftInfo.CourseTime}}</div>
					<div v-if="product.ShiftInfo.SeatName"><label>已选座位：</label>
						{{product.ShiftInfo.SeatName}}
					</div>
					<div v-if="product.ShiftInfo.ShiftSpecID"><label>课程数量：</label>
						{{computedShiftNum('ShiftInfo')}}
					</div>
				</div>
				<!-- 物品详情 -->
				<div v-if="(product.Type==2||product.Type==4)&&(product.GoodsInfo.Specs.length>0)" class="content">
					<div v-for="Spec in product.GoodsInfo.Specs"><label>{{Spec.Name}}：</label>{{Spec.Value}}</div>
				</div>
				<!-- 价格数量 -->
				<div class="detail">
					<span>
						<span class="price">&#165;{{product.Price|formatNumber}}</span>
						<!-- <svg class="icon" aria-hidden="true" v-if="product.IsPreMoney">
							<use xlink:href="#icon-dingjin"></use>
						</svg> -->
						<span class="scheme-tag" v-if="product.ChooseScheme">{{product.ChooseScheme.Name}}</span>
					</span>
					<span v-if="product.Type==2||product.Type==4" class="count">x{{product.GoodsInfo.Amount}}</span>
				</div>
			</div>
		</div>
		<!-- 课程和班级绑定物品区域 -->
		<div class="row-bd" v-if="(product.Type==1||product.Type==3)&&(product.Bindings.length>0)">
			<div class="row-bd-l" >已选物品：</div>
			<div class="row-bd-r">
				<div class="item" v-for="binding in product.Bindings">
					<div class="item-name">{{binding.Name}}</div>
					<div>&#165;{{binding.Price|formatNumber}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'order-row',
		props: {
			product: {
				type: Object,
				default: null
			}
		},
		methods: {
			computedShiftNum(key) {
				let type = this.$route.query.type
				if (type === 1) {
					return this.product[key].PackageAmount + this.product[key].Unit
				} else {
					if (this.product[key] && this.product[key].ShiftSpecList) {
						return this.product[key].ShiftSpecList.filter(obj =>obj.isSelect)[0].Amount + this.product.Unit
					}
				}
			}
		},
		mounted() {
			// console.log(this.product)
		}
	}
</script>