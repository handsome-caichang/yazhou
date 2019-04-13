<style lang="scss" scoped>
	@import 'src/plugin/scss/mixin.scss';

	.loading-mask {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		.loading {
			width: 40px;
			height: 40px;
			background-repeat: no-repeat;
			background-attachment: scroll;
			background-position: center center;
			background-size: cover;
		}
		&.default {
			@include position-absolute;
			z-index: 2;
		}
		&.bg0 {
			background-color: rgb(255, 255, 255);
		}
		&.bg1 {
			background-color: rgba(0, 0, 0, 0.5);
		}
        &.bg2 {
			background-color: rgba(255, 255, 255, 0);
		}
	}
</style>

<template>
	<!-- <div class="loading-mask" :class="`bg${type}`"> -->
	<div class="loading-mask" :class="[{default: isDefault},`bg${bgType}`]" >
		<div class="loading" :style="'backgroundImage:url('+loadingIcon+')'" v-show="showIcon"></div>
		<slot></slot>
	</div>
</template>

<script>
	import loadingIcon from './loading.gif';
	
	export default {
		name: 'loading',
		props: {
			isDefault: {
				Type: Boolean,
				default: true
			},
			bgType: {
				Type: Number,
				default: 0
			},
            showIcon: {
                Type: Boolean,
				default: true
            }
		},
		data () {
			return {
				loadingIcon
			}
		}
	};
</script>

