<!-- 加入购物车-购物车页面 -->

<style lang="scss" scoped>
    .mall-cart {
        @include position-absolute;
        overflow: hidden;
        background-color: $color-white;
    }
</style>

<template>
    <div class="mall-cart">
    	<cart ref="cart"></cart>
    </div>
</template>

<script>
	import Cart from './children/cart/cart.vue';

	export default {
        name: 'mall-cart',
        mixins: [app.mixin.shareMixin],
        data() {
            return {
                wxTitle: "购物车",
            }
        },
        mounted() {
            this.$on('scrollToTop', () => {
                this.$refs.cart.$emit('scrollToTop')
            })
        },
        components: {
        	Cart
        }
    };
</script>