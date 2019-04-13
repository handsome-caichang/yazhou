<!-- 无分配角色 -->
<style lang="scss" scoped>
	
	
	.no-role {
		z-index: 10;
		@include position-absolute;
		@include flex-center(column);
		background-color: $color-white;
		.empty-img {
			font-size: 150px;
		}
		.empty-tips {
			margin: 20px;
			color: $color-9;
			text-align: center;
			.title {
				font-size: 16px;
				line-height: 40px;
			}
		}
	}
</style>

<template>
	<div class="no-role" v-if="app.sysInfo.RoleList&&app.sysInfo.RoleList.length===0">
		<svg class="icon empty-img" aria-hidden="true">
			<use xlink:href="#icon-juese"></use>
		</svg>
		<div class="empty-tips">
			<div class="title">您的用户没有任何角色，叫我如何是好？</div>请联系管理员进行设置。
		</div>
	</div>
</template>

<script>
	export default {
		name: "no-role"
	}
</script>