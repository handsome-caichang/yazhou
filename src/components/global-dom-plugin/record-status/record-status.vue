<style lang="scss" scoped>
	// @import "../../../assets/scss/variable.scss";
	@import "../../../assets/scss/mixin.scss";
	.record-status {
		position: relative;
		width: 166px;
		height: 166px;
		border-radius: 8px;
		background-color: rgba(0, 0, 0, .7);
		// background-image: url(./img/recording.gif);
		background-repeat: no-repeat;
		background-attachment: scroll;
		background-position: center center;
		background-size: 150px 150px;
		.tip-area {
			position: absolute;
			bottom: 10px;
			width: 100%;			
			padding: 0 8px;		
			color: #FFFFFF;
			.tip-text {
				padding: 0 8px;
				width: 100%;
				min-height: 28px;
				line-height: 20px;
				font-size: 14px;
				border-radius: 4px;
				@include flex-center;
			}
		}
		&.cancel {
			// background-image: url(./img/cancel.png);
			.tip-text {
				background-color: #b32626;				
			}
		}		
	}
</style>

<template>
	<div v-show="record.status">
		<div class="record-status" :class="{cancel: !record.valid}"  :style="bgimg">

			<div class="tip-area">
				<div class="tip-text">{{record.tipText}}</div>
			</div>
		</div>
	</div>
</template>

<script>

import rimg from './img/recording.gif'
import cimg from './img/cancel.png'

export default {
	name: 'record-status',
	
	data () {
		return {
		}
	},
	computed: {
		...Vuex.mapState(['record']),
		status() {
			return this.record.status
		},
		bgimg() {
			return {backgroundImage: `url(${this.record.valid ? rimg : cimg})`}
		}
	},
	methods: {
		...Vuex.mapMutations(['set_record']),
	},
	watch: {
		// 在关闭录音状态提示框时(本组件)，将有效性重置为true;
		status() {
			!this.status &&	this.set_record({valid: true})
		}
	}
}
</script>