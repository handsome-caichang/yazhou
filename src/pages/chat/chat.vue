<!-- 聊天页面 -->
<style lang="scss" scoped>
	@import "../../assets/scss/variable.scss";
	@import "../../assets/scss/mixin.scss";
	.chat-wrapper {
		.chat-box {
			flex-direction: column;
			position: relative;
			height: 100%;
			width: 100%;
			.chat-scroll-container {
				@include position-absolute(0, 0, 49px, 0);
				background-color: #EDF1F7;
				.chat-scroll-area {
					width: 100%;
					height: 100%;
				}
			}
			.chat-editor-area {
				border-top: 1px solid rgba(215, 215, 215, 1);
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
			}
			.top-nav {
				position: absolute;
				top: 0;
				right: 0;
				z-index: 2;
			}
			.text-copy-area {
				@include position-absolute;
				z-index: 5;
			}
		}		
	}
</style>

<template>
	<div class="chat-wrapper">
		
		<div class="chat-box">
			<move-left 
				class="top-nav"
				v-if="scene === 'p2p'" 
				:from="userUID"
				:to="this.$route.params.to"
				>
			</move-left>

			<div class="chat-scroll-container" ref="chatScroller" @click="emitChatCkick">
				<scroller-load-up 
					ref="scrollBar"
					class="chat-scroll-area"
					loadBarPosition="top"
					v-if="msglist.length > 0"
					:options="{'customLongPress': true}"
					:data="scrollData"
					:hasData="hasMoreHistory"
					@load-paging="loadMoreHistoryMsgs"
					>
					<!-- 我是聊天区域 -->
					<chat-list 
						:msglist="msglist"
						@msgChangeHeight="msgChangeHeight"
						>
					</chat-list>
				</scroller-load-up>
			</div>

			<chat-editor class="chat-editor-area"
				ref="editor"
				:to="to"
				:scene="scene"
				@textarea-focus="inputBoxFocusHandle"
				@chatEditorChangeHeight="adjustScroller">
			</chat-editor>

			<chat-copy-page class="text-copy-area"></chat-copy-page>
		</div>		
	</div>
</template>

<script>
	import ChatCopyPage from './child/chat-copy-page/chat-copy-page.vue'
	import ChatList from 'src/components/common/chat-list/chat-list'
	import ChatEditor from './child/chat-editor/chat-editor.vue'

	import MoveLeft from './child/move-left.vue'

	export default {
		data() {
			return {
				scene: this.$route.params.scene,
				to: this.$route.params.to,
				wxTitle: this.$route.params.toName,
				hasMoreHistory: true,
				// 当前会话的最后一条消息, 用于区分是下拉加载数据，还是有接收或发送新的消息;
				lastMsg: null,
				loadingMore: false 
			}
		},
		computed: {
			...Vuex.mapState(['userUID', 'deleteMsgTime']),
			sessionId() {
			  	return this.scene + '-' + this.to;
			},
			msglist() {
		      	return this.$store.state.currSessionMsgs;
		    },
		    scrollData() {
		    	return {
		    		msglist: this.msglist,
		    		hasMoreHistory: this.hasMoreHistory
		    	}
		    }
		},
		methods: {
			emitChatCkick() {
				// 让表情区域能够隐藏
				app.event.emit("chatClick")
			},
			// 滚动到聊天底部
			scrollToBottom() {
				this.$nextTick(() => {

					let scroller = this.$refs.scrollBar.scroller
					scroller.refresh();
					scroller.scrollTo(0, scroller.maxScrollY)
				})
			},
			// 本地图片加载完成的回调
			msgChangeHeight() {
				this.scrollToBottom()
			},
			// 获取当前会话消息中的所有图片地址
			getImageArr() {
				let arr = [];
				this.msglist.forEach(item => {
					if (item.type === "image") {
						arr.push(item.file.url)
					}
				})
				this.$store.commit('updateCurrIamgeArr', arr);
			},
			// 加载历史消息
			loadMoreHistoryMsgs() {
	  	  		if (!this.loadingMore && this.hasMoreHistory) {
	  	  			this.loadingMore = true
	  	  			let scroller = this.$refs.scrollBar.scroller,
	  	  				// 可滚动区域底部距离滚动容器顶部的高度
	  	  				scrollerBottom = scroller.scrollerHeight + scroller.y

	  	    		this.$store.dispatch('getHistoryMsgs', {
	  	      			scene: this.scene,
	  	      			to: this.to
	  		    	}).then(res => {
	  		    		this.loadingMore = false
	  		    		// if (res.msgs.length === 0) this.hasMoreHistory = false;
	  		    		if (res.msgs.length < res.limit) this.hasMoreHistory = false;

	  		    		this.$nextTick(() => {
	  		    			// 此时'scroller'已经被刷新, 'scroller.scrollerHeight'会拿到新的高度;
	  		    			scroller.scrollTo(0, scrollerBottom - scroller.scrollerHeight)
	  		    		})
	  		    	})
	  	  		}
			},
			//文本域获取焦点的自定义事件，将滚动条滚动到底部;
			inputBoxFocusHandle(e) {
				setTimeout(() => {
					this.$refs.scrollBar && this.scrollToBottom();
				}, 500)
			},
			// 在文本域高度发生变化时，自动调整相关元素状态
			adjustScroller(e) {
				this.$nextTick(() => {
					
					this.setScrollerH()

					if (this.$refs.scrollBar) {
						// 刷新滚动条; 同时保证滚动条底部的位置不变;
						let s = this.$refs.scrollBar.scroller,
							sourceWH = s.wrapperHeight,
							sourceY = s.y,
							targetWh,
							targetY;

						s.refresh();
						targetWh = s.wrapperHeight
						targetY = sourceY + (targetWh - sourceWH)

						if (targetY > 0) targetY = 0

						if (s.scrollerHeight - targetWh + targetY >= 0) {
							s.scrollTo(0, targetY)
						}
					}					
				})				
			},
			// 调整聊天滚动区域商度
			setScrollerH() {
				let editorH = this.$refs.editor.$el.offsetHeight;
				this.$refs.chatScroller.style.bottom = `${editorH}px`
			},
			// 动态调整那些消息可以撤消
			setDisappearMsgs() {
				window.disappearMsgs = []
				window.disappearMsgsTimer = setInterval(() => {

					if (window.disappearMsgs.length === 0) return

					window.disappearMsgs = window.disappearMsgs.filter(msg => {
						let diffTime = new Date().getTime() - msg.time
						if (diffTime > this.deleteMsgTime) {
							this.$set(msg, "enableDelete", false)
							return false
						}
						return true
					})
					
				}, 2000)
			}
		},
		created() {
			// 此时设置当前会话
			this.$store.dispatch('setCurrSession', this.sessionId)

			this.setDisappearMsgs()
		},
		mounted() {
			// 如果没有最近消息记录, 则拉取一次云端记录;
			window.NIMPromise.then(() => {
				if (this.msglist.length === 0) {
					this.$store.dispatch('getHistoryMsgs', {
						scene: this.scene,
						to: this.to
					})
				}
			})
			
			this.setScrollerH()
		},
		beforeDestroy() {
			// console.log("chat 将要被销毁了..");
		  	this.$store.dispatch('resetCurrSession')
		  	this.$store.commit('updateCurrIamgeArr', [])

		  	// 销毁组件时清除计时器
		  	clearInterval(window.disappearMsgsTimer)

		  	// 销毁组件前，停止语音播放;
		  	if (app.voice.flag) {
		  	    app.voice.stop()
		  	}
		},
		components: {
			ChatCopyPage,
			ChatList,
			ChatEditor,
			MoveLeft
		},
		watch: {
			msglist(newMsgList, oldMsgList) {
				if (newMsgList.length === 0) return

				let newLastMsg = newMsgList[newMsgList.length - 1];
				// 第一次拉取到消息记录 || 接收到、发送新的消息
				if (this.lastMsg !== newLastMsg) {
					this.lastMsg = newLastMsg;
					// 第一次拉取到当前会话的消息记录时，让滚动条滚动到聊天底部;
					if (oldMsgList.length === 0) {
						this.scrollToBottom();
						this.getImageArr();
					} else { // 接收到、发送新的消息
						// 发送消息时，让滚动条滚动到聊天底部;
						if (newLastMsg.flow === 'out') {
							this.scrollToBottom();
						} else {
							// 接收消息时, 若内容部分底部距离滚动条窗口底部小于50px,则滚动到底部；
							this.$nextTick(() => {
								let s = this.$refs.scrollBar.scroller;
								if (s.scrollerHeight + s.y - s.wrapperHeight < 50) {
									this.scrollToBottom();
								}
							})
						}
						this.getImageArr();
					}
				} else { // 说明是下拉加载了历史消息
					this.getImageArr();
				}
			}
		}
	}
</script>