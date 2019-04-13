<!-- 订单套餐商品一行单元 -->
<style lang="scss" scoped>
	
	
	
	.order-package-row{
		background-color: $color-white;
		.row-hd{
			display: flex;
			padding: 15px;
			background-color: $color-assist-4;
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
				padding-bottom: 15px;
				line-height: 1;
				.name{
					font-size: $fs-normal-x;
					word-break: break-all;
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
				.price{
					position: absolute;
				    left: 0px;
				    right: 0;
				    bottom: 0;
					height: 15px;
					line-height: 15px;
					font-size: $fs-big-s;
				}
			}
		}
		.row-bd{
			height: $h-3;
			line-height: $h-3;
			margin-top: 1px;
			padding: 0 15px;
			color: $color-primary;
			font-size: $fs-normal-s;
			background-color: $color-assist-4;
			.tag{
				margin-left: 5px;
				color: $color-9;
				font-size: $fs-small;
			}
		}
		.row-ft{
			font-size: $fs-normal-s;
			.item{
				margin-top: 1px;
				padding: 16px 15px;
				@include flex-between;
				background-color: $color-assist-4;
				.item-name{
					width: 60%;
					word-break: break-all;
				}
				.item-content{
					flex: 1;
					text-align: right;
				}
				.item-content-course {

				}
			}
		}
	}
</style>

<template>
	<div class="order-package-row">
		<div class="row-hd">
			<span class="row-hd-l" :style="'background-image:url('+product.Image+')'"></span>
			<div class="row-hd-r">
				<div class="name">{{product.PackageName}}</div>
				<div class="price">&#165;{{product.Price|formatNumber}}</div>
			</div>
		</div>
		<div class="row-bd">套餐项目<span class="tag">共{{product.Products.length}}个项目</span></div>
		<div class="row-ft">
			<div class="item" v-for="item in product.Products">
				<div class="item-name">{{item.ProductName}}</div>
				<div class="item-content" v-if="item.Type==1">{{getContentStr(item.ClassInfo)}}</div>
				<div class="item-content" v-if="item.Type==2||item.Type==4">{{item.GoodsInfo.SpecName}}</div>
				<div class="item-content" v-if="item.Type==3">
					<div class="course-name">{{item.ShiftInfo.ClassName}}</div>
					<div class="course-info">{{getContentStr(item.ShiftInfo)}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'order-package-row',
		props: {
			product: {
				type: Object,
				default: null
			}
		},
		methods:{
			getContentStr(info){
				let str = '';
				/*if(info.SeatRow && info.SeatColumn){
					str += info.SeatRow+'排'+info.SeatColumn+'座';
				}*/
				if(info.SeatName){
					str = info.SeatName;
				}
				if(info.Bindings && info.Bindings.length>0){
					str += ' '+info.Bindings.length+'件物品';
				}
				if (info.Amount) str += ' '+ info.Amount + info.Unit + '课程'
				return str;
			},
			
		},
		mounted() {
			window.d = this
		}
	}
</script>