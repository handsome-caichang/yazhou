<!-- 微官网-师资力量列表页 -->
<style lang="scss" scoped>
	
	

	.teacher-list {
		padding: $edge/2 $edge;
		background-color: $color-assist-1;
		.item {
			padding: $edge/2 0;
			@at-root .teacher-box {
				position: relative;
				padding: 12px 12px 12px 94px;
				background-color: $color-white;
				border-radius: 2px;
				min-height: 70px;
				box-sizing: content-box;
				.teacher-img {
					@include position-absolute(12px, false, false, 12px);
					@include background-img;
					width: 70px;
					height: 70px;
					border-radius: 70px;
					border: 1px solid $color-border;
					background-color: $color-assist-1;
				}
				.top {
					display: flex;
					line-height: 26px;
					margin-bottom: 5px;
					.name {
						flex: 1;
						font-size: $fs-big-s;
						color: $color-black;
						@include ellipsis-single;
					}
					.date {
						width: 100px;
						font-size: $fs-small;
						color: $color-9;
						text-align: right;
					}
				}
				.desc {
					@include ellipsis-multi(2);
					line-height: $fs-big;
					font-size: $fs-normal-s;
					color: $color-9;
				}
			}
		}
	}
</style>

<template>
	<ul class="teacher-list">
		<router-link class="item"
			tag="li"
			v-for="item in list"
			:key="item.ID"
			:to="`/teacher-detail/${item.ID}`">
			<div class="teacher-box">
				<div class="teacher-img" :style="{'background-image': `url(${item.Image})`}"></div>
				<div class="top">
					<span class="name">{{item.Title}}</span>
					<!-- <span class="date">{{item.CreateTime | formatDatetime('yyyy-MM-dd hh:mm')}}</span> -->
				</div>
				<p class="desc">
					{{item.Content | htmlToText | sliceText}}
				</p>
			</div>
		</router-link>
	</ul>
</template>

<script>
	export default {
	  	name: 'website-teacher-list',
	  	props: {
	  		list: {
	  			type: Array
	  		}
	  	}
	};
</script>

