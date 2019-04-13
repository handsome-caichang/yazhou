<style lang="scss" scoped>
	@import "../../../../assets/scss/variable.scss";
	@import "../../../../assets/scss/mixin.scss";

	.chat-copy-page {
		.chat-copy-page-wrapper {
			position: relative;
			width: 100%;
			height: 100%;
			.chat-copy-page-box {
				height: 100%;
				width: 100%;
				font-size: 20px;
				line-height: 30px;
				color: #333;
				background-color: #FFF;
				@include flex-center;
			
				word-break: break-word;
                -webkit-user-select: text;
                -moz-user-select: text;
                -ms-user-select: text;
                user-select: text;
				-webkit-touch-callout: default;
				.text-content {
					padding: 28px 15px 15px;
					max-height: 100%;
					overflow-y: auto;
				}
			}		
			.tip {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 28px;
				line-height: 28px;
				font-size: 12px;
				color: #BBBBBB;
				text-align: center;
				background-color: #FFF;
			}
		}
	}

	.fade-copy-page-enter-active, .fade-copy-page-leave-active {
		transition: all .2s ease;
		opacity: 1;
		transform: scale(1);
	}
	.fade-copy-page-enter, .fade-copy-page-leave-active {
		opacity: 0.5;
		transform: scale(0.9);
	}
</style>

<template>
	<transition name="fade-copy-page">
		<div class="chat-copy-page" v-show="opened">
			<div class="chat-copy-page-wrapper">
				<div class="tip">长按可复制消息</div>
				<div class="chat-copy-page-box" 
                    @touchstart="mouseDown($event)"
                    @touchend="mouseUp($event)"
                    @mousedown="mouseDown($event)" 
                    @mouseup="mouseUp($event)" 
                    >
                    <!-- @click="hide" -->
                    <div class="text-content" v-html="copyPageText">
                    </div>
                </div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
  	name: 'chat-copy-page',
  	mixins: [app.mixin.popupWindowRouteMixin],
  	data () {
    	return {
            opened: false,
            copyPageText: ''
    	}
  	},
  	methods: {
        mouseDown() {
            this.downTime = new Date().getTime()
        },
        mouseUp(e) {
            // 确定点的鼠标左键
            if (e.button === 0 && (new Date().getTime() - this.downTime < 200) && !this.touchFlag) {
                this.close()
            }
        },
        /*hide() {
            app.isMobile && this.close()
        }*/
  	},
    created() {
        Vue.event.$on('openChatCopyPage', text => {
            this.opened = true
            this.copyPageText = text

            // 是否刚刚显示此界面，定义touchFlag表示用来控制此弹窗的隐藏
            this.touchFlag = true
            setTimeout(() => {
                this.touchFlag = false
            }, 500)
        })
    },
  	watch: {
  		opened(val) {
  			if (!val) {
  				setTimeout(() => {
                    this.copyPageText = ""
  				}, 300)
  			}
  		}
  	}
}
</script>

