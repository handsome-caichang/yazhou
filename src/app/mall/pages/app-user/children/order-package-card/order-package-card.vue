<!-- 订单套餐商品一行单元 -->

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
				padding-bottom: 15px;
				.name{
					padding-bottom: 10px;
					font-size: $fs-normal-x;
					word-break: break-all;
					color: $color-3;
					&:before {
						content: '套餐';
					    display: inline-block;
						width: 30px;
						height: $fs-normal-x;
						line-height: $fs-normal-x;
						color: $color-primary;
						border: 1px solid $color-primary; 
						border-radius: 4px;
						font-size: $fs-small;
						text-align: center;
						margin-right: 10px;
						vertical-align: middle;
					}
				}
				.detail{
					position: absolute;
				    left: 0px;
				    right: 0;
				    bottom: 0;
					height: 15px;
					line-height: 15px;
					@include flex-between;
					.price{
						font-size: $fs-big-s;
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
	<div class="order-card">
		<div class="row-hd">
			<span class="row-hd-l" :style="'background-image:url('+packageOrder.Image+')'"></span>
			<div class="row-hd-r">
				<div class="name">{{packageOrder.Name}}</div>
				<div class="detail">
					<span class="price">&#165;{{packageOrder.OrderMoney|formatNumber}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'order-package-card',
		props: {
			packageOrder: {
				type: Object,
				default: null
			}
		}
	}
</script>