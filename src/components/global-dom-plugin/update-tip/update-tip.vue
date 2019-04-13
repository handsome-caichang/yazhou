<!-- 升级提醒展示 -->

<style lang="scss" scoped>
	// @import "../../../assets/scss/variable.scss";
	@import "../../../assets/scss/mixin.scss";

	.box-wrapper {
	    position: relative;
	    width: 100%;
	    height: 100%;
	    overflow: hidden;
	    background-color: rgba(0,0,0,.8);
	    .as-box {
	        position: absolute;
	        top: 50%;
	        left: 12%;
	        right: 12%;
	        background-color: #FFF;
	        transform: translate(0, -50%);
	        border-radius: 4px;
	        overflow: hidden;
	        .icon-close {
	        	position: absolute;
	        	right: 0;
	        	top: 0;
	        	height: 40px;
	        	width: 40px;
	        	font-size: 14px;
	        	@include flex-center;
	        }
	        .header {
	        	height: 40px;
	        	line-height: 40px;
	        	color: #FFF;
	        	font-size: 20px;
	        	text-align: center;
	        	background-color: #1E88F5;
	        }
            .body {
            	padding: 20px 0;
            	@include flex-center(column);
            	.icon-tip {
            		font-size: 50px;
            		padding-bottom: 10px;
            	}
            	.tip-list {
					line-height: 20px;
					font-size: 14px;
					color: #333;
            	}
            }
	        .footer {
	        	display: flex;
	        	padding: 10px;
				border-top: 1px solid #EEE;
				.tip {
					padding-right: 5px;
					color: #FF3433;
					text-align: center;
				}
				.text {
					color: #999;
					font-size: 10px;
					line-height: 14px;
				}
	        }
	    }
	}
</style>

<template>
	<div v-if="imSync && opened">
		<div class="box-wrapper">
		    <div class="as-box" >
		    	<div class="icon-close"  @click="close">
		    		<svg class="icon" aria-hidden="true">
		    		    <use xlink:href="#icon-fenzu"></use>
		    		</svg>
		    	</div>

		        <div class="header">消息功能已升级</div>

		        <div class="body">
		        	<div class="icon-tip">
		        		<svg class="icon" aria-hidden="true">
		        		    <use xlink:href="#icon-xiaoxishengji"></use>
		        		</svg>
		        	</div>

		        	<div class="tip-list">
		        		<div>• 消息实时送达</div>
		        		<div>• 新消息自动刷新</div>
		        		<div>• 智能通讯录</div>
		        		<div>• 新增群聊功能</div>
		        	</div>
		        </div>

		        <div class="footer">
		        	<div class="tip">*</div>
		        	<div class="text">历史消息已归档，点击联系人进入会话界面，可查看历史消息。</div>
		        </div>
		    </div>
		</div>
	</div>
</template>

<script>

	export default {
	  	name: 'update-tip',
	  	data () {
	    	return {
	    		opened: false
	    	}
	  	},
	  	computed: {
	  		...Vuex.mapState(['imSync', 'version']),
	  	},
	  	methods: {
	  		close() {
  				app.ls.set("version", this.version)
  				this.opened = this.getOpen();
	  		},
	  		getOpen() {
	  		    let localVersion = app.ls.get("version")
	  		    return !localVersion || this.version > localVersion
	  		}
	  	},
	  	created() {
	  		this.opened = this.getOpen();
	  	}
	}
</script>

