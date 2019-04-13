<!-- 购物车失效商品列表界面  -->

<style lang="scss" scoped>
	
	
	
	.invalidshop-list{
		.void{
			height: 9px;
			background-color: $color-assist-3;
		}
		.header{
			padding: 0 15px;
			height: $h-3;
			line-height: $h-3;
			@include flex-between;
			@include border-bottom;
			color: $color-3;
			background-color: $color-white;
			.btn{
				display: inline-block;
				width: 83px;
				height: 25px;
				line-height: 25px;
				text-align: center;
				color: $color-6;
				font-size: $fs-small;
				border: 1px solid #ccc;
			}
		}
		.body{
			.list-wrap{
				background-color: $color-white;
				.list-header{
					padding: 0 18px 0 15px;
					height: $h-3;
					line-height: $h-3;
					@include flex-between;
					@include border-bottom;
					.cname{
						font-size: $fs-normal-x;
						color: $color-6;
					}
				}
				.list-body{
					background-color: #F8F8F8;
					line-height: 1;
					.row{
						@include border-bottom;
						.row-body{
							display: flex;
							padding: 15px 0;
							.body-left{
								@include dynamic-wh(50px, 1.5,true);
								@include flex-center;
								width: 50px;
								height: 75px;
								.tag{
									font-size: $fs-small-x;
									color: $color-white;
									display: inline-block;
									padding: 2px 4px;
									background-color: $color-9;
								}
							}
							.body-right{
								flex: 1;
								display: flex;
								.goods-img{
									@include dynamic-wh(100px, 0.75,true);
									@include background-img(false,cover);
									background-color: $color-assist-1;
								}
								.goods-info{
									flex: 1;
    								position: relative;
									margin-left: 10px;
									padding-bottom: 15px;
									.name{
										color: $color-9;
										@include ellipsis-multi;
									}
									.reason{
										position: absolute;
									    left: 0px;
									    right: 0;
									    bottom: 0;
										height: 15px;
										line-height: 15px;
										color: $color-3;
										.icon{
											padding-right: 5px;
										}
									}
								}
							}
						}
					}
				}
				&:last-child{
					margin-bottom: 0;
				}
			}
		}
	}
</style>

<template>
	<div class="invalidshop-list">
		<div class="void"></div>
		<div class="header">失效商品<span class="btn" @click="empty">清空失效商品</span></div>
		<div class="body">
			<div v-for="item in campusList" class="list-wrap">
				<div class="list-header">
		        	<span class="cname">{{item.Name}}</span>
				</div>
				<div class="list-body">
					<div class="row" v-for="product in item.Products">
						<div class="row-body">
							<div class="body-left">
								<span class="tag">失效</span>
							</div>
							<div class="body-right">
								<span class="goods-img" :style="'background-image:url('+product.Image+')'"></span>
								<div class="goods-info">
									<div class="name">{{product.Name}}</div>
									<div class="reason" v-if="product.ExpiredReason">
										<svg class="icon" aria-hidden="true">
											<use xlink:href="#icon-tixing"></use>
										</svg>{{product.ExpiredReason}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'invalidshop-list',
		props: {
			campusList: {
				type: Array,
				default: []
			}
		},
		methods:{
			empty(){
				this.$emit('emptyInvalid');
			}
		}
	}
</script>

