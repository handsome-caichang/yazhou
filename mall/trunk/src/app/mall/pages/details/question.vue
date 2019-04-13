<style scoped lang="scss">
	
    
	.question {
		@include position-absolute(0, 0, false, false);
		width: 100%;
		height: 100%;
		background-color: $color-white;
		z-index: 9999;
		.heard {
			padding: $fs-small-x;
			display: flex;
			.heard-left{
				width: 30%;
				.icon{
					width: 100%;
					height: 0;
					padding-top: 75%;
					background-color: $color-assist-1;
					@include background-img(false, cover);
				}
			}
			.heard-right {
			    flex: 1;
				margin-left: $fs-big-s;
				word-break: break-all;
				.title {
					font-size: $fs-normal-x;
					color: $color-3;
					line-height: $fs-big-s;
				}
			}
		}
		.text-wrap {
			position: relative;
			width: 100%;
			color: $color-9;
			.text {
				background-color: $color-assist-1;
				color: $color-9;
				font-size: $fs-normal-x;
				line-height: 21px;
				min-height: 200px;
				padding-top: $fs-normal;
				resize: none;
			}
			.text-num {
				@include position-absolute(false, 0.5*$fs-small-x, 0.5*$fs-normal-s, false);
			}
		}
		.send {
			margin-top: 30px;
			width: 100%;
			padding: 0 15px;
			font-size: $fs-normal-x;
			.send-btn {
				display: inline-block;
				text-align: center;
				line-height: $h-1;
				width: 100%;
				height: $h-1;
				color: $color-white;
				background-color: $color-primary;
				border-radius: 3px;
			}
		}
	}
	.as-slide-enter-active, .as-slide-leave-active {
		transition: all $duration $timing;
	}
	.as-slide-enter, .as-slide-leave-active {
		transform: translate3d(100%, 0, 0);
	}
</style>

<template>
	<transition name="as-slide">
		<div class="question">
			<div class="heard">
				<div class="heard-left" v-if="info.Images">
					<div class="icon" :style="'background-image:url('+ info.Images[0] + ')'"></div>
				</div>
				<div class="heard-right">
					<div class="title">
						{{info.Name}}
					</div>
				</div>
			</div>
			<div class="text-wrap">
				<textarea class="text" v-model="text" placeholder="说出您的问题,我们会为您解答~"></textarea>
				<span class="text-num">{{'('+text.length+'/100)'}}</span>
			</div>
			<div class="send">
				<span class="send-btn" @click="send">提交</span>
			</div>
		</div>
	</transition>
</template>

<script>
	import {submitQuestion} from 'api/yy'
	export default {
		mixins: [app.mixin.popupWindowRouteMixin],
		props: {
			goodsInfo: {
				type: Object
			},
			classInfo: {
				type: Object
			},
			opened: {
				type: Boolean
			}
		},
		data() {
			return {
				text: '',
				info: {}
			}
		},
		
		methods: {
			send() {
				if (this.text.length == 0) {
					return;
				}
				submitQuestion({
					ProductID: this.$route.params.ID,
					Question: this.text
				}).then((res) =>{
					if (res.ErrorCode == app.errok) {
						this.$emit('closeQuestion', {
							bool: false,
							text: this.text
						});
						this.text = '';
					} else {
						app.toast('error',res.ErrorMsg);
					}
				})
			}

		},
		watch: {
			text() {
				if (this.text.length > 100) {
					app.toast('info','最多输入100个字哦。');
					this.text = this.text.substring(0, 100);
				}
			},
			classInfo(val,oldVal) {
				if (val) {
					this.info = this.classInfo
				}
			},
			goodsInfo(val,oldVal) {
				if (val) {
					this.info = this.goodsInfo
				}
			},

		}
	}
</script>