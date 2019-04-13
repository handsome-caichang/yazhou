<!-- 联系客服弹出框 -->

<style lang="scss" scoped>
	
	
		
	.online-service{
		@include position-absolute;
        z-index: 9999;
        overflow: hidden;
		.as-item {
			display: block;
			height: $h-1;
			line-height: $h-1;
			text-align: center;
			color: $color-3;
			font-size: $fs-normal-x;
			@include ellipsis-single;
			@include border-bottom($color-border-1);
	    }
		.void{
			height: $void;
			background-color: $color-assist-1;
		}
        .footer{
	    	height: $h-2;
	    	line-height: $h-2;
	    	text-align: center;
	    	font-size: $fs-big-s;
	    	background: $color-white;
	    	color: $color-primary;
	    }
	}	
</style>

<template>
	<action-sheet
		v-if="opened"
		@close="close"
		class="online-service"
	>
        <div class="as-item" v-for="item in agent" @click="chatQQ(item.QQ)">
        	<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-qq"></use>
			</svg>&nbsp;{{item.Name}}
        </div>

        <div slot="footer">
        	<div class="void"></div>
        	<div class="footer" @click="close">取消</div>
        </div>
	</action-sheet>
</template>

<script>
	import { mapState } from 'vuex';
	
	export default{
		name: 'online-service',
		mixins: [app.mixin.popupWindowRouteMixin],
		props:{
			opened: {}
		},
		computed:{
			...Vuex.mapState([
				'agent'
			])
		},
		methods:{
			close() {
				this.$emit('toggleService',false);
			},
			chatQQ(QQhref) {
				this.$router.back();
				setTimeout(() => {
					location.href = QQhref;
				}, 300)
			}
		},
		components:{
			
		}
	}
</script>