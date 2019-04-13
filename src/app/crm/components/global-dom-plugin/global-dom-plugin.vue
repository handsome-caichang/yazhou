<!-- 全局的dom结构 -->
<template>
	<div class="global-dom-plugin">
		<!-- 没有开通crm -->
        <not-crm></not-crm>
	</div>
</template>

<script>
    import NotCrm from './child/notCrm.vue'
	export default {
		name: 'global-dom-plugin',
		components: {
            NotCrm
		}
	}
</script>