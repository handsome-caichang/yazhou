<!-- 主屏-购物车页面 -->
<style lang="scss" scoped>
    
    

    .app-cart {
        @include position-absolute;
        overflow: hidden;
        background-color: $color-white;
    }
</style>

<template>
    <div class="app-cart">
    	<cart v-if="showCart" @openActionsheet="openActionsheet"></cart>
    </div>
</template>

<script>
	import Cart from './children/cart/cart.vue';
	
 	export default {
        name: 'app-cart',
        data() {
            return {
                showCart: false
            }
        },
        components: {
        	Cart
        },
        methods:{
        	openActionsheet(newVal){
        		this.$emit('open-actionsheet', newVal);
        	}
        },
        created() {
            if (this.$route.name === 'home' && this.$route.params.homeIndex === '3') {
                this.showCart = true;
            }
        },
        watch: {
            $route(to) {
                if (to.name === 'home' && to.params.homeIndex === '3') {
                    this.showCart = true;
                }
            }
        }
    };
</script>