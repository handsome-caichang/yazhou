<style lang="scss" scoped>
	.router-bus {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: #f00;
	}
</style>

<template>
	<div class="router-bus">这里是路由总线</div>
</template>

<script>
	export default {
	  	name: 'router-bus',
        methods: {
        	...Vuex.mapMutations([
        		'set_popstateNum',
        		'set_routeType'
        	])
        },
		beforeRouteEnter (to, from, next) {
		 	next();
		},
		beforeRouteUpdate (to, from, next) {
			next();	
        	this.set_routeType('update');
        },
        beforeRouteLeave (to, from, next) {
        	next();	
        	this.set_routeType('goto');
        }
	};
</script>