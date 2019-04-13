<!-- 全局的dom结构 -->
<template>
	<div class="global-dom-plugin">
		<!-- 修改密码弹窗 -->
		<actionsheet-password></actionsheet-password>
        <!-- 过期提醒 -->
        <system-overdue></system-overdue>
	</div>
</template>

<script>
    import ActionsheetPassword from './actionsheet-password';
    import SystemOverdue from './system-overdue';

	export default {
		name: 'global-dom-plugin',
		components: {
            SystemOverdue,
			ActionsheetPassword
		}
	}
</script>