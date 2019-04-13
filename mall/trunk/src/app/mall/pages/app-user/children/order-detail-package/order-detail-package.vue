<!-- 订单详情套餐商品一行单元 -->

<style lang="scss" scoped>
	
	
	
	.order-detail-package{
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
			@include flex-between;
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
				display: flex;
        		justify-content: space-between;
				background-color: $color-assist-4;
				.item-name{
					width: 60%;
				}
				.item-content{
					flex: 1;
					text-align: right;
				}
			}
		}
	}
</style>

<template>
	<div class="order-detail-package">
		<div class="row-hd" @click="gotoDetail(product)">
			<span class="row-hd-l" :style="'background-image:url('+product.Image+')'"></span>
			<div class="row-hd-r">
				<div class="name">{{product.Name}}</div>
				<div class="price">&#165;{{product.TotalMoney|formatNumber}}</div>
			</div>
		</div>
		<div class="row-bd">套餐项目<span class="tag">共{{product.Items.length}}个项目</span></div>
		<div class="row-ft">
			<div class="item" v-for="item in product.Items" @click="gotoDetail(item)">
				<div class="item-name">{{item.Name}}</div>
				<div class="item-content">
					<div v-if="item.Type==1">
						<div v-if="item.SeatName">
							<!-- {{item.SeatRow}}排{{item.SeatColumn}}座({{item.ClassroomName}}) -->
							{{item.SeatName}}
						</div>
						<div v-if="item.Bindings.length>0" v-for="binding in item.Bindings">{{binding.Name}}</div>
						<div v-if="item.ProductAmount">课程数量:&nbsp&nbsp&nbsp{{item.ProductAmount}}{{item.Unit}}</div>
					</div>
					<div v-if="item.Type==3">
						<div v-if="item.ClassName">{{item.ClassName}}</div>
						<div v-if="item.SeatName">{{item.SeatName}}</div>
						<div v-if="item.Bindings.length>0" v-for="binding in item.Bindings">{{binding.Name}}</div>
						<div v-if="item.ProductAmount">课程数量:&nbsp&nbsp&nbsp{{item.ProductAmount}}{{item.Unit}}</div>
					</div>
					<div v-if="(item.Type==2||item.Type==4)&&item.SpecItems.length>0">
						<span v-for="spec in item.SpecItems">&nbsp;{{spec.Value}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'order-detail-package',
		props: {
			product: {
				type: Object,
				default: null
			}
		},
		methods:{
			gotoDetail(product){
				if(product.Type==10){ //点击套餐
					this.$router.push({path:`/details/100/${product.PackageID}`});
				}else{ //点击普通商品
					this.$router.push({path:`/details/${product.Type}/${product.ProductCampusID}`});
				}
			}
		}
	}
</script>