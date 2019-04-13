<!-- 全局的dom结构 -->
<template>
	<div class="global-dom-plugin">
		<!-- 修改密码弹窗 -->
		<actionsheet-password></actionsheet-password>
	</div>
</template>

<script>
    import ActionsheetPassword from './actionsheet-password';

	export default {
		name: 'global-dom-plugin',
		components: {
			ActionsheetPassword
		}
	}
</script>