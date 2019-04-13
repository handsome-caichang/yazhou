<!-- 最近会话列表 -->
<style scoped lang="scss">
    @import "../../../../assets/scss/variable.scss";
    @import "../../../../assets/scss/mixin.scss";
	.session {
		.history-unread-tip {
		    height: 40px;
		}
	}
	.scroller {
		@include position-absolute;
		overflow: hidden;
		&.hasH {
			top: 40px;
		}
		.session {
			width: 100%;
			@include border-bottom(#EDF1F7);
			.item {
				.item-body {
					position: relative;
					width: 100%;
					height: 68px;
					.icon {
						position: absolute;
						left: 0;
						top: 0;
						width: 70px;
						height: 100%;
						@include flex-center;
						.avatar {
							position: relative;
							width: 50px;
							height: 50px;
							border: 1px solid #FFF;
							border-radius: 50px;
							background-color: $color-assist-1;
							background-repeat: no-repeat;
							background-attachment: scroll;
							background-position: center;
							background-size: 100% 100%;
							.cicle {
				                @include position-absolute(0, 0, false, false);
								min-width: 14px;
								height: 14px;
							    line-height: 15px;
							    padding: 0 4px;
				                margin-right: -6px;
							    color: #FFF;
							    font-size: 10px;
							    border-radius: 16px;
							    background-color: #FF3433;
							    text-align: center;
							}
						}
					}
					.item-content {
						height: 100%;
						padding: 10px 10px 10px 70px;
						.top {
							position: relative;
							line-height: 22px;
							.name {
								padding-right: 80px;
								height: 22px;
								font-size: $fs-big-s;
								color: $color-3;
								@include ellipsis-single;
							}
							.time {
								position: absolute;
								right: 0;
								top: 0;
								font-size: $fs-small-x;
								color: $color-6;
							}
						}
						.des {
							margin-top: 6px;
							@include ellipsis-single;
							font-size: $fs-small-x;
							color: $color-6;
						}
					}
				}
				.item-left {
					background: #F00;
					color: $color-white;
					letter-spacing: 3px;
					position: absolute;
					right: -100px;
					top: 0;
					width: 100px;
					height: 100%;
					text-align: center;
					@include flex-center;
				}
			}
		}
		.empty-page {
			@include position-absolute;
		}
	}
</style>

<template>
	<div class="session">
		<history-unread v-show="hasHistory" class="history-unread-tip"></history-unread>

		<scroller-base 
			class="scroller" 
			:class="{hasH: hasHistory}"
			ref="scrollBar"
			@touchstart.native="closeEditList($event)"
			@mousedown.native="closeEditList($event)"
			:data="scrollData">
			<div class="session-list">
				<div class="session"
					v-for="(ses, index) in ssList" 
					:key="ses.id"
					:ref="ses.unread > 0 ? 'unread' : ''"
					>
					<slide-left class="item"
						@changeStatus="moveLeft" 
						>
						<router-link class="item-body" tag="div" :to="`/chat/${ses.scene}/${ses.to}/${encodeURIComponent(ses.name)}`">
							<div class="icon">
								<div class="avatar" :style="{backgroundImage: `url(${ses.avatar})`}">
									<div class="cicle" v-if="ses.unread > 0">
										{{ses.unread > 99 ? '99+' : ses.unread}}
									</div>
								</div>
							</div>
							<div class="item-content">
								<div class="top">
									<div class="name">{{ses.name}}</div>
									<div class="time">{{ses.updateTimeShow}}</div>
								</div>
								<div class="des">{{getMsgFrom(ses)}} {{ses.lastMsgShow}}</div>
							</div>
						</router-link>
						<div class="item-left" @click="deleteSession(ses.id)" data-enableClick="true">
							删除
						</div>
					</slide-left>
				</div>
			</div>

			<empty-page class="empty-page" type="session" 
				v-if="imSync && ssList.length === 0">
			</empty-page>
		</scroller-base>
	</div>
</template>

<script>
	import SlideLeft from 'src/components/common/slide-left/slide-left'
    import EmptyPage from 'src/components/common/empty-page/empty-page.vue'
    import HistoryUnread from './history-unread/history-unread.vue'

	export default {
		data() {
			return {
				scroller: null,
				editList: [],
			}
		},
		computed: { 
			...Vuex.mapState(['hasHistory', 'imSync']),
			...Vuex.mapGetters({
				ssList: 'latelySessionList',				
			}),
			scrollData() {
				return {
					ssList: this.ssList,
					hasH: this.hasHistory
				}
			}
		},
		methods: {
			hideEditList() {
				this.editList.forEach(component => {
					component.moveBack();
				})
				this.editList = []
			},
			// 隐藏编辑状态
			closeEditList(e) {
				if (this.editList.length > 0) {
					if (app.dom.getData(e.target, 'enableClick') !== 'true') {
						this.hideEditList()
						e.preventDefault()
					}
				}				
			},
			getMsgFrom(s) {
				let bool = s.scene === 'team' && s.lastMsg.type !== 'tip' && s.lastMsg.fromNick
				return bool ? `${s.lastMsg.fromNick}: ` : ''
			},
			moveLeft(params) {
				if (params.status) {
					this.editList.push(params.component)
				}
			},
			deleteSession (sid) {
				console.log(sid);
		    	sid && this.$store.dispatch('deleteSession', sid)
			},
			listenGotoUnready() {
				let curUnreadDom = null,
					index = 0
				app.event.on('sessionPageGotoUnready', () => {
					let unreads = this.$refs.unread,
						len = unreads && unreads.length

					if (unreads) {
						if (index > len - 1) {
							index = 0
						}
						this.scroller.scrollToElement(unreads[index])
						index++
					}
				})

				app.event.on('sessionPageGotoTop', () => {
					this.scroller.scrollTo(0, 0, 300)
				})
			}
		},
		mounted() {
			this.scroller = this.$refs.scrollBar.scroller
			this.listenGotoUnready();
		},
		components: {
			SlideLeft,
			EmptyPage,
      		HistoryUnread
		},
		watch: {
			$route() {
				this.hideEditList()
			}
		}
	}
</script>