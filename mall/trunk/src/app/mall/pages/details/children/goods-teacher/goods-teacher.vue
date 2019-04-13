<!-- 商品详情-老师选项卡 -->

<style lang="scss" scoped>
	
	
	
	.wrapper {
		@include position-absolute($h-2, 0, $h-1, 0);
		.goods-teacher {
			@include position-absolute;
			overflow: hidden;
			background-color: $color-assist-1;
			.item{
				// @include border-bottom;
				border-bottom: 1px solid $color-assist-1;
				background-color: $color-white;
				padding: 20px 25px 11px 15px;
				display: flex;
				.item-left{
					width: 59px;
					height: 59px;
					.head-img{
						@include background-img(false, cover);
						height: 100%;
						background-color: $color-assist-1;
						border-radius: 100%;
					}
				}
				.item-right{
					flex: 1;
					margin-left: 12px;
					.name{
						height: $fs-normal-x;
						line-height: $fs-normal-x;
						font-size: $fs-normal-x;
						color: $color-3;
					}
					.introduce{
						@include ellipsis-multi(3);
						margin-top: 10px;
						line-height: 19px;
						font-size: $fs-normal;
						color: $color-9;
					}
				}
			}
		}
	}
	
</style>

<template>
	<div class="wrapper">
		<scroller-base
			class="goods-teacher"
			:data="teacherList">
			<router-link 
				class="item"
				tag="div"
				v-for="item in teacherList"
				:key="item.ID"
				:to="`/teacher-detail/${item.ID}`">
				<div class="item-left">
					<div class="head-img" :style="'background-image: url(' + item.Image + ')'"></div>
				</div>
				<div class="item-right">
					<div class="name">{{item.Name}}</div>
					<span class="introduce">{{item.Descrite | htmlToText}}</span>
				</div>
			</router-link>
		</scroller-base>
	</div>
</template>

<script>
	export default {
	    name: 'goods-teacher',
	    props: {
	    	teacherList: {
	    		type: Array
	    	}
	    }
	};
</script>