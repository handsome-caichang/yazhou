<!-- 订单、订单详情普通商品一行单元 -->
<style lang="scss" scoped>
	
	
	
	.order-card{
		background-color: $color-white;
		@include border-bottom;
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
				line-height: 1;
				min-height: 75px;
				margin-left: 10px;
				padding-bottom: 20px;
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
						font-size: $fs-big-s;
						vertical-align: middle;
						&.small{
							font-size: $fs-normal-s;	
						}
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
			&.fade{
				background: $color-assist-4;
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
	<div class="order-card" @click="gotoDetail(product)">
		<div class="row-hd" :class="{fade:type==2}">
			<span class="row-hd-l" :style="'background-image:url('+product.Image+')'"></span>
			<div class="row-hd-r">
				<div class="name">{{product.Name}}</div>
				<!-- 班级详情 -->
				<div v-if="product.Type==1" class="content">
					<div v-if="product.OpenDate"><label>开班日期：</label>{{product.OpenDate|formatDatetime("yyyy-MM-dd")}}</div>
					<div v-if="product.CourseTime"><label>上课时间：</label>{{product.CourseTime}}</div>
					<div v-if="(product.SeatRow>0)&&(product.SeatColumn>0)"><label>已选座位：</label>
						<!-- {{product.SeatRow}}排{{product.SeatColumn}}座({{product.ClassroomName}}) -->
						{{product.SeatName}}
					</div>
					<div v-if="product.ProductAmount">
						<label>课程数量：</label>{{product.ProductAmount}}{{product.Unit}}
					</div>
				</div>
				<!-- 课程详情 -->
				<div v-if="product.Type==3" class="content">
					<div v-if="product.ClassName"><label>所选班级：</label>{{product.ClassName}}</div>
					<div v-if="product.OpenDate"><label>开班日期：</label>{{product.OpenDate|formatDatetime("yyyy-MM-dd")}}</div>
					<div v-if="product.CourseTime"><label>上课时间：</label>{{product.CourseTime}}</div>
					<div v-if="product.SeatName"><label>已选座位：</label>
						{{product.SeatName}}
					</div>
					<div v-if="product.ProductAmount">
						<label>课程数量：</label>{{product.ProductAmount}}{{product.Unit}}
					</div>
				</div>
				<!-- 物品详情 -->
				<div v-if="(product.Type==2||product.Type==4)&&(product.SpecItems.length>0)" class="content">
					<div v-for="Spec in product.SpecItems"><label>{{Spec.Name}}：</label>{{Spec.Value}}</div>
				</div>
				<!-- 价格数量 -->
				<div class="detail">
					<span>
						<span class="price" :class="{'small':(type==1)}" v-if="product.Price">
							<!-- &#165;{{campus.IsPreMoney?campus.PreMoney:product.Price|formatNumber}} -->
							&#165;{{product.Price}}
						</span>
						<!-- <svg class="icon" aria-hidden="true" v-if="campus.IsPreMoney">
							<use xlink:href="#icon-dingjin"></use>
						</svg> -->
						<span class="scheme-tag" v-if="product.SingleSchemeName">{{product.SingleSchemeName}}</span>
					</span>
					<span v-if="product.Type==2||product.Type==4" class="count">x{{product.Amount}}</span>
				</div>
			</div>
		</div>
		<!-- 班级绑定物品区域 -->
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
		name: 'order-card',
		props: {
			product: {
				type: Object,
				default: null
			},
			campus: {
				type: Object,
				default: null
			},
			type: {}
		},
		methods:{
			gotoDetail(product){
				if(this.type==2){ //订单详情
					this.$router.push({path:`/details/${product.Type}/${product.ProductCampusID}`});
				}
			}
		},
		mounted() {
			window.b = this
		}
	}
</script>