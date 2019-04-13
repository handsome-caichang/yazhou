<style lang="scss" scoped>
	.router-bus {
		// position: absolute;
		// top: 0;
		// left: 0;
		// bottom: 0;
		// right: 0;
        width: 100%;
        height: 100%;
		background-color: #f00;
        z-index: 0;
        display: none;
	}
</style>

<template>
	<div class="router-bus">这里是路由总线</div>
</template>

<script>
	export default {
	  	name: 'router-bus',
        mixins: [],
        methods: {},
		beforeRouteEnter (to, from, next) {
            // console.log('... router-bus enter ....');
		 	next();
		},
		beforeRouteUpdate (to, from, next) {
			// console.log('... router-bus update ....');
			next();	
        	VueRouter.setRouteType('update');
        },
        beforeRouteLeave (to, from, next) {
            // console.log('... router-bus leave ....');
        	next();	
        	VueRouter.setRouteType('goto');
        }
	};
</script>