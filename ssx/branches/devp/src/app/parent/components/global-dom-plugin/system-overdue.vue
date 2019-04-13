<!-- 师生信功能是否将要到期或已到期，并进行相应提示 -->
<style lang="scss" scoped>
	
	
	.system-overdue {
		.due-dialog {
			@include position-absolute(5px, 6px, 5px, 6px);
			height: 30px;
			z-index: 999;
			line-height: 30px;
			padding-left: 10px;
			border-radius: 4px;
			background-color: rgba($color: #000000, $alpha: 0.3);
			marquee {
				margin-right: 30px;
				white-space: nowrap;
				color: rgba($color: #ffffff, $alpha: 0.8);
			}
			.due-close {
				position: absolute;
				width: 30px;
				top: 0;
				right: 0;
				text-align: center;
			}
		}
		.due-page {
			@include position-absolute;
			@include flex-center(column);
			background-color: $color-white;
			z-index: 999;
			.due-img {
				width: 200px;
				height: 200px;
				margin-bottom: 30px;
				@include background-img;
			}
			.due-content {
				padding: 10px 20px;
				font-size: 16px;
			}
		}
	}
</style>
<style>
	.system-overdue .due-dialog i {
		color: #FF3433;
		font-style: normal;
	}
	.system-overdue .due-page i {
		color: #104392;
		font-style: 20px;
		font-style: normal;
	}
</style>

<template>
	<div class="system-overdue">
		<!-- 产品功能即将到期 -->
		<!-- <div class="due-dialog" v-if="app.sysInfo.expireinfo.status==1&&opened">
			<marquee direction="left" v-html="app.sysInfo.expireinfo.msg"></marquee>
			<div class="due-close" @click="()=>{opened=false;}">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-sousuowenzishanchu"></use>
				</svg>
			</div>
		</div> -->

		<!-- 产品功能已到期 -->
		<div class="due-page" v-if="systemOverdue">
			<div class="due-img" :style="'background-image:url('+duepng+')'"></div>
			<div class="due-content" v-html="systemOverdueMsg"></div>
		</div>
	</div>
</template>

<script>
    /**@augments
     * status:0未过期，1将要过期，2已经过期
     */
	// let str1 = '<span>温馨提示：您的师生信系统将于</span><i>2017</i>年<i>3</i>月<i>19</i><span>日到期(还剩5天），逾期后将无法登录，请及时续费。</span>',
    //     str2 = "您的师生信系统已于<i>2017</i>年<i>3</i>月<i>17</i>日到期，请续费。";
    
	export default {
		name: 'system-overdue',
		data() {
			return {
                wxTitle: '系统提醒',
				duepng: require('./img/due.png'),
				opened: true,
			}
        },
        computed: {
             ...Vuex.mapState(['systemOverdue',
                'systemOverdueMsg'])
        }
	}
</script>