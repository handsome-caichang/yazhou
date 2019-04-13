<!-- 帮助中心页面  -->
<style lang="scss" scoped>
    .help-center{
    	@include position-absolute;
		background-color: $color-assist-1;
		.list{
			position: relative;
			height: $h-1;
			line-height: $h-1;
			font-size: $fs-normal-x;
			padding: 0 27px 0 15px;
			@include flex-center;
			@include border-bottom;
			background-color: $color-white;
			.list-hd{
				width: 90px;
				flex: 1 0 90px;
				color: $color-3;
			}
			.next{
				position: absolute;
				right: 13px;
			    top: 0;
			    bottom: 0;
			    margin: auto 0;
				color: $color-9;
			}
			&.cate{
				margin-bottom: $edge;
			}
			&:last-child{
				@include border-none;
			}
		}
    }
</style>

<template>
	<div class="help-center">
		<!--<div class="list">
			<div class="list-hd">欢迎加盟</div>
			<svg class="icon next" aria-hidden="true">
				<use xlink:href="#icon-xiangxia"></use>
			</svg>
		</div>
		<div class="list">
			<div class="list-hd">售后服务</div>
			<svg class="icon next" aria-hidden="true">
				<use xlink:href="#icon-xiangxia"></use>
			</svg>
		</div>
		<div class="list">
			<div class="list-hd">购物指南</div>
			<svg class="icon next" aria-hidden="true">
				<use xlink:href="#icon-xiangxia"></use>
			</svg>
		</div>
		<div class="list cate">
			<div class="list-hd">配送信息</div>
			<svg class="icon next" aria-hidden="true">
				<use xlink:href="#icon-xiangxia"></use>
			</svg>
		</div>-->
		<div class="list" @click="toggleService(true)">
			<div class="list-hd">联系客服</div>
			<svg class="icon next" aria-hidden="true">
				<use xlink:href="#icon-xiangxia"></use>
			</svg>
		</div>
		
		<online-service
			:opened.sync="isOpenService"
			@toggleService="toggleService"
		></online-service>
	</div>
</template>

<script>
	import OnlineService from './children/online-service/online-service.vue';
	
	export default{
		name:'help-center',
		mixins: [app.mixin.shareMixin],
        data() {
        	return {
        		isOpenService: false, //是否打开联系客服
		    	wxTitle: '帮助中心'
        	}
        },
        methods:{
        	toggleService(bool){
        		this.isOpenService = bool;
        	}
        },
        components:{
        	OnlineService
        }
   	}
</script>