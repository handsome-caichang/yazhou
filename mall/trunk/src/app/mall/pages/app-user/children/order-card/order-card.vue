<!-- 订单、订单详情普通商品一行单元 -->
<style lang="scss" scoped>
	.order-card{
		background-color: $color-white;
		.row-hd{
			display: flex;
			padding: 15px;
			.row-hd-l{
				width: 110px;
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
					font-size: $fs-normal-x;
					color: $color-3;
					@include ellipsis-multi(2);
				}
				.content{
					margin-top: 10px;
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
					color: #F03232;
					@include flex-between;
					.price{
						margin-right: 6px;
						font-size: $fs-big-s;
						vertical-align: middle;
						.small{
							font-size: $fs-normal-s;	
						}
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
	}
</style>

<template>
	<div class="order-card" @click="gotoDetail(product)">
		<div class="row-hd">
			<span class="row-hd-l" :style="'background-image:url('+product.Image+')'"></span>
			<div class="row-hd-r">
				<div class="name">2019春硬币书法初级班（周一到周刘10：30，周四到周五2：30，周三到周吧9：30）</div>
				<!-- 班级详情 -->
				<div  class="content">
					<div>
						<label>规格：</label>10课时
					</div>
				</div>
				<!-- 价格数量 -->
				<div class="detail">
					<span>
						<span class="price">
							&#165;25.<span class="small">00</span>
						</span>
					</span>
					<!-- <span v-if="product.Type==2||product.Type==4" class="count">x{{product.Amount}}</span> -->
				</div>
			</div>
		</div>
		<!-- 班级绑定物品区域 -->
		
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
			}
		},
		methods:{
			gotoDetail(product){

			}
		},
		mounted() {
			window.b = this
		}
	}
</script>