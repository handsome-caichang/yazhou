<style scoped lang="scss">
	@import "../../assets/scss/variable.scss";
	@import "../../assets/scss/mixin.scss";

	.void {
		height: $edge;
		background-color: #EDF1F7;
	}
	.team-detail {
		@include position-absolute(0, 0, 0, 0);
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
			.icon {
				opacity: 0.8;
				transform: scale(0.75 );
			}
		}

		.scroller {
			@include position-absolute(28px,0,0,0);
			.members-box {
				padding-bottom: 10px;
				background-color: #FFF;
				.members {
					display: flex;
					-webkit-flex-wrap: wrap;
					flex-wrap: wrap; 
					padding: 0 12px;
					overflow: hidden;
					&.min-h {
						max-height: 170px;
					}
					.member {
						width: 68px;
						padding: 8px 0;
						@include flex-center(column);
						.avatar {
							width: 50px;
							height: 50px;
							border-radius: 50px;
							border: 1px solid #FFF;
							background-color: $color-assist-1;
							background-repeat: no-repeat;
							background-attachment: scroll;
							background-position: center;
							background-size: 100% 100%;
						}
						.name {
							width: 50px;
							text-align: center;
							@include ellipsis-single;
						}
					}
				}
			}

			.team-name {
				padding: 0 12px;
				height: 44px;
				line-height: 44px;
				font-size: 15px;
				color: #333;
				display: flex;
				background-color: #FFF;
				.title {
					padding-right: 40px;
					color: #333;
					font-size: 15px;
				}
				.name {
					flex: 1;
					@include ellipsis-single;
					text-align: right;
					color: #666;
					font-size: 14px;
				}
			}

			.team-intro {
				padding: 10px 12px;
				background-color: #FFF;
				.title {
					font-size: 15px;
					line-height: 30px;
					color: #333;
				}
				.intro {
					padding: 3px 0;
					min-height: 60px;
					font-size: 14px;
					color: #666;
				}
			}
		}
	}
</style>

<template>
	<div class="team-detail">
		<div class="tip" @click="ismin = !ismin">
			{{ismin? '展开' : '收起'}}
			<svg class="icon" aria-hidden="true">
			    <use :xlink:href="`#${ismin? 'icon-shouqizhankai' : 'icon-shouqi1'}`"></use>
			</svg>
		</div>
		<scroller-base class="scroller" v-if='team' :data="scrollData">
			<div class="members-box">
				<div class="members" :class="{'min-h': ismin}">
					<div class="member"
						:style="{'margin-left': bw, 'margin-right': bw}"
						v-for="item in teamUsers"
						:key="item.account">
						<div class="avatar" :style="{backgroundImage: `url(${item.avatar})`}"></div>
						<div class="name">{{item.name}}</div>
					</div>
				</div>
			</div>
			
			<div class="void"></div>

			<div class="team-name">
				<div class="title">群名称</div>
				<div class="name">{{team.name}}</div>
			</div>
			
			<div class="void"></div>

			<div class="team-intro">
				<div class="title">群介绍</div>
				<div class="intro" v-html="app.tool.escape(team.intro)">
				</div>
			</div>

			<div class="void"></div>
		</scroller-base>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				wxTitle: this.$route.params.teamName,
				screenW: document.documentElement.clientWidth || screen.width,
				ismin: true
			}
		},
		computed: {
			...Vuex.mapState(['userUID', 'myInfo', 'teamMembers', 'userInfos']),
			...Vuex.mapGetters(['validTeamListMap']),
			team() {
				return this.validTeamListMap[this.$route.params.teamId]
			},
			teamUsers() {
				let tuser = [],
					myid = this.userUID, 
					myInfo = this.myInfo,
					teamMembers = this.teamMembers[this.$route.params.teamId] || [];

				teamMembers.forEach(item => {
					let user = this.userInfos[item.account]
					if (user) {
						tuser.push({
							name: item.nickInTeam || user.nick,
							avatar: user.avatarThumb || user.avatar
						})
					} else if (item.account === myid && myInfo) {
						tuser.push({
							name: item.nickInTeam || myInfo.nick,
							avatar: myInfo.avatarThumb || myInfo.avatar
						})
					}
				})

				return tuser
			},
			scrollData() {
				return {
					ismin: this.ismin,
					teamUsers: this.teamUsers
				}
			},
			bw() {
				let vw = this.screenW > 768 ? 768 : this.screenW,
					w = vw - 12*2,
					float = w/68,
					num = parseInt(w/68),
					point = float - num,
					yw = w*(point/float),
					margin = yw/(num*2)+ 'px'

				return margin;
			}
		},
		methods: {
			// 监听窗口大小改变，调整要展示的群成员数量;
			resize2changeNum() {
				window.addEventListener('resize', () => {
					this.screenW = document.documentElement.clientWidth || screen.width;
				})
			}
		},
		created() {
			window.NIMPromise.then(() => {
				this.$store.dispatch('getTeamMembersById', this.$route.params.teamId)
			})
		},
		mounted() {
			this.resize2changeNum();
		}
	}
</script>