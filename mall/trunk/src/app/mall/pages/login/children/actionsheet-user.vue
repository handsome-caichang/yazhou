<!-- 注册页面选择用户 -->
<style lang="scss" scoped>
    
    
    
    .cs-header {
        padding-top: 25px;
        line-height: 1;
        text-align: center;
        color: $color-3;
        font-size: $fs-normal-x;
        .desc{
        	margin: 16px 0 30px 0;
        	color: $color-9;
        	font-size: $fs-normal;
        }
    }
    .cs-body {
    	text-align: center;
    	.cs-item{
    		display: inline-block;
    		width: 33.33%;
	    	.item {
	    		@include flex-center(column);
			    .item-avatar{
		        	display: inline-block;
					width: 49px;
					height: 49px;
					border-radius: 50%;
		        	@include background-img(false,cover);
			    }
			    .item-desc{
			    	margin: 10px 0 15px 0;
			    	color: $color-6;
			    	line-height: 1;
					font-size: $fs-small-x;
			    }
	    	}
    	}
    	.cs-tips{
    		color: $color-9;
    		margin-top: 15px;
    		.important{
    			color: $color-primary;
    		}
    	}
    }
    .cs-footer {
        padding-bottom: 25px;
    }
</style>

<template>
	<action-sheet position="center" :data="data" v-show="opened" @close="close" :scrollerClick="true">
        <!-- <div class="cs-header" slot="header">您的手机已注册，请直接登录<p class="desc">请选择下面一个用户登录</p></div> -->
        <div class="cs-header" slot="header">您的手机已关联以下用户<p class="desc">请选择一个进行下一步操作</p></div>
        <div class="cs-body">
        	<!-- <div class="cs-item" v-for="item in data" @click="emitEvent(item.FullName)"> -->
        	<div class="cs-item" v-for="item in data" @click="emitEvent(item)">
	        	<div class="item">
	        		 <span class="item-avatar" :style="'background-image:url('+item.Image+')'"></span>
	        		 <p class="item-desc">{{item.FullName}}</p>
	        	</div>
        	</div>
        	<div class="cs-tips">我选择<span class="important" @click="emitStepEvent()">重新注册</span></div>
        </div>
        <div class="cs-footer" slot="footer"></div>
	</action-sheet>
</template>

<script>
	
	export default {
		name: 'actionsheet-user',
		props: {
			opened: {
				type: Boolean,
				default: false
			},
			data: {
				type: Array,
				default: null
			}
		},
		methods: {
			emitEvent(user){ //选择一个用户登录
				this.$emit('selected', user);
				this.close();
			},
			emitStepEvent(){ //选择继续注册
				this.close();
				this.$emit('goStep');
			},
			close(){
				this.$emit('update:opened', false);
			}
		},
		components: {
		}
	}
</script>