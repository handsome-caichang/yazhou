<style lang="scss" scoped>
.loading-mask {
    @include flex-center;
    .loading {
        width: 40px;
        height: 40px;
        @include background-img(false, cover);
    }
    &.default {
        @include position-absolute;
        z-index: 99999999;
    }
    &.bg0 {
        background-color: rgb(255, 255, 255);
    }
    &.bg1 {
        background-color: rgba(0, 0, 0, 0.2);
    }
}
</style>

<template>
	<div class="loading-mask" :class="[{default: isDefault},`bg${bgType}`]">
		<div class="loading" :style="'backgroundImage:url('+loadingIcon+')'"></div>
		<!-- <img class="loading" src="/static/svg/loading-spinning-bubbles.svg"> -->
		<!-- <img class="loading" src="/static/svg/loading-spokes.svg"> -->

		<!-- <img src="/static/svg/loading-spinning-bubbles.svg" alt="Loading icon" /> -->
		<!-- <svg class="icon-loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="blue"></svg> -->

	</div>
</template>

<script>
import loadingIcon from "./loading.gif";

export default {
    name: "loading",
    props: {
        isDefault: {
            Type: Boolean,
            default: true
        },
        bgType: {
            Type: Number,
            default: 0
        }
    },
    data() {
        return {
            loadingIcon
        };
    }
};
</script>

