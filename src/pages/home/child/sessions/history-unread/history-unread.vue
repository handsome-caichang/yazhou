<!-- 老版本历史消息未读提醒； 将来要撤掉的 -->

<style lang="scss" scoped>
	@import '../../../../../assets/scss/variable.scss';
	@import '../../../../../assets/scss/mixin.scss';

	.history-unread {
		position: relative;
		padding: 0 15px;
		@include flex-between;
		font-size: 13px;
		background-color: #D2E7FD;
		.tip-text {
			color: #1E88F5;
			text-align: left;
		}
		.icon-close {
			position: absolute;
			right: 0;
			top: 0;
			height: 40px;
			width: 40px;
			font-size: 12px;
			@include flex-center;
		}
	}
</style>

<template>
	<div class="history-unread" v-show="$store.state.hasHistory" @click="gotoHistory">
		<div class="icon-close"  @click.stop="close">
			<svg class="icon" aria-hidden="true">
			    <use xlink:href="#icon-fenzu"></use>
			</svg>
		</div>
		
		<div class="tip-text">
			<svg class="icon" aria-hidden="true">
			    <use xlink:href="#icon-xiaoxi1"></use>
			</svg>
			你有未读的历史消息，点此查看。	
		</div>
	</div>
</template>

<script>
import {getHasUnReadHistoryMsg} from 'src/api/jie.js'

export default {
  	name: 'history-unread',
  	data () {
    	return {
    	}
  	},
  	computed: {
  		...Vuex.mapState(['hasHistory', 'teamlist', 'imSync']),
  		// 拼装去老版消息界面的url
  		oldHistoryUrl() {
  			let state = this.$store.state,
  				isTeacher = state.userWone.TeacherRole,
  				teacherRole = state.userWone.TeacherRole,
  				teacherUrl = state.teacherUrl,
  				parentUrl = state.parentUrl,
  				paramArr = ['pname=toTeacher'],
  				paramStr = '';

  			paramStr = encodeURIComponent(paramArr.join('&'))

  			return`${isTeacher ? teacherUrl : parentUrl}${paramStr}`
  		},
  		close() {
  			this.set_hasHistory(0)
  		}
  	},
  	methods: {
  		...Vuex.mapMutations(['set_hasHistory']),
  		gotoHistory() {
  			location.href = this.oldHistoryUrl
  		}
  	},
  	created() {
  		getHasUnReadHistoryMsg().then(res => {
  			if (res.ErrorCode === app.errok) {
  				this.set_hasHistory(res.Data.HasUnReadMsg)
  			}
  		})
  	}
}
</script>

