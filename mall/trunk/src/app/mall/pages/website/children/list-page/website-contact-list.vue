<!-- 微官网-联系我们列表页 -->
<style lang="scss" scoped>
	
	

	.contact-list {
		padding: $edge/2 $edge;
		background-color: $color-assist-1;
		.item {
			padding: $edge/2 0;
			@at-root .box {
				position: relative;
				padding: 15px 10px 15px 110px;
				background-color: $color-white;
				border-radius: 2px;
				min-height: 68px;
				box-sizing: content-box;
				.img {
					@include position-absolute(15px, false, false, 10px);
					@include background-img;
					width: 90px;
					height: 68px;
					background-color: $color-assist-1;
					// border: 1px solid $color-border;
				}
				.title {
					line-height: 26px;
					margin-bottom: 5px;
					font-size: $fs-big-s;
					color: $color-black;
					@include ellipsis-single;
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
	<ul class="contact-list">
		<router-link class="item" 
			tag="li"
			v-for="item in list"
			:key="item.ID"
			:to="`/website-custom-page/${encodeURIComponent($route.params.title)}/${item.ID}`">
			<div class="box">
				<div class="img" :style="{'background-image': `url(${item.Image})`}"></div>
				<div class="title">
					{{item.Title}}
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
		name: 'website-contact-list',
		props: {
			list: {
				type: Array
			}
		}
	};
</script>
