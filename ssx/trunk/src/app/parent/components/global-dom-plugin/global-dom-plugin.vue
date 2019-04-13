<!-- 全局的dom结构 -->
<template>
	<div class="global-dom-plugin">
		<!-- 修改密码弹窗 -->
		<actionsheet-password></actionsheet-password>
        <!--小银星定制 完善个人信息-->
        <xyx-edit-information></xyx-edit-information>
		<!-- 优惠卷 -->
		<coupon-box></coupon-box>
	</div>
</template>

<script>
    import ActionsheetPassword from './actionsheet-password';
	import XyxEditInformation from './xyx-edit-information';
	import CouponBox from './coupon-box.vue';
	export default {
		name: 'global-dom-plugin',
		components: {
			ActionsheetPassword,
			XyxEditInformation,
			CouponBox
		}
	}
</script>