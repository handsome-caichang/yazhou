<!-- 全局的dom结构 -->
<template>
	<div class="global-dom-plugin">
		<!-- 修改密码弹窗 -->
		<actionsheet-password></actionsheet-password>
        <!-- 无分配角色 -->
        <no-role></no-role>
        <!-- 过期提醒 -->
        <system-overdue></system-overdue>        
	</div>
</template>

<script>
    import NoRole from './no-role';
    import SystemOverdue from './system-overdue';
    import ActionsheetPassword from './actionsheet-password';
    
    export default {
		name: 'global-dom-plugin',
		components: {
            NoRole,
            SystemOverdue,
			ActionsheetPassword
		}
	}
</script>