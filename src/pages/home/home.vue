<style scoped lang="scss">
    @import "../../assets/scss/variable.scss";
    @import "../../assets/scss/mixin.scss";
	.home {
		.home-group {
			@include position-absolute(0, 0, $h-1, 0);
			background-color: #EDF1F7;
			overflow: hidden;
		}
		.component {
			@include position-absolute(0, 0, 0, 0);
		    z-index: 1;
		    opacity: 0;
		    &.active {
		        z-index: 2;
		        opacity: 1;
		    }
		}
		.bottom {
			height: $h-1;
			width: 100%;
			@include position-absolute(false, 0, 0, 0);
			.nav {
				height: $h-1;
				width: 100%;
				@include border-top(rgba(215,215,215,1));
				background: $color-white;
				display: flex;
				.item {
					flex: 1;
					@include flex-center(column);
					position: relative;
					.icon {
					    font-size: 22px;
					}
					.text {
						display: block;
						font-size: 12px;
		                margin-top: 2px;
					}
					.unread {
						position: absolute;
					    top: 50%;
					    left: 50%;
					    transform: translate(-50%, -50%);
						margin-top: -15px;
						margin-left: 20px;
						padding: 0 4px;
						min-width: 14px;
						height: 14px;
						line-height: 15px;
						border-radius: 16px;
						text-align: center;
						font-size: 10px;
						background-color: #FF3433;
						color: #FFF;
					}
				}
				.active {
					color: $color-primary;
				}
			}
		}		
	}
</style>

<template>
	<div class="home">
		<div class="home-group" v-if="imSync">
		    <component
		        class="component"
		        v-for="(item, index) in home.list"
		        :key="index"
		        v-bind:is="item.component"
		        :class="{active: home.activeIndex === index}">
		    </component>
		</div>

		<scroller-base class="bottom">
			<div class="nav">
				<div v-for="(item, index) in home.list" 
					@touchend="changeContent(index)"
					@mousedown="changeContent(index)"
					:class="{active: index == home.activeIndex}" 
					class="item">
					<svg class="icon" aria-hidden="true">
					    <use :xlink:href="index === home.activeIndex ? item.iconAction : item.icon"></use>
					</svg>
					<span class="text">{{item.text}}</span>
					<div class="unread" v-if="item.unreadFlag && validUnreadSum">
						{{validUnreadSum}}
					</div>
				</div>
			</div>
		</scroller-base>
	</div>
</template>


<script>
    import Sessions from './child/sessions/session'
    import Contact from './child/contact/contact.vue'
    import Teams from './child/teams/team'

	export default {
		name: 'home',
		data() {
			return {
				wxTitle: "师生信",
				clickNum: 0,
				home: {
                   	activeIndex:  parseInt(this.$route.params.homeIndex) || 0,
                   	list: [
                       	{
                           	icon: '#icon-shishengxinweidianji',
                           	iconAction: '#icon-shishengxindianji',
                           	text: '消息',
                           	component: Sessions,
                           	unreadFlag: true
                       	},{
                           	icon: '#icon-tongxunluweidianji',
                           	iconAction: '#icon-tongxunludianji',
                           	text: '通讯录',
                           	component: Contact
                       	},{
                          	icon: '#icon-qunliaoweidianji',
                           	iconAction: '#icon-qunliaodianji',
                          	text: '群聊',
                          	component: Teams
                       	}
                   	]
               	},
			}
		},
		computed: {
			...Vuex.mapState(['imSync']),
			...Vuex.mapGetters(['validUnreadSum']),
		},
		methods: {
			changeContent(index) {
				if (index === 0 && index === this.home.activeIndex) {
					this.clickNum += 1
					if (!this.stimer) {
						this.stimer = setTimeout(() => {
							this.stimer = null
							app.event.emit(this.clickNum > 1 
								? 'sessionPageGotoUnready' 
								: 'sessionPageGotoTop')
							this.clickNum = 0
						}, 300)
					}					
				} else if (index !== this.home.activeIndex) {
					this.home.activeIndex = index;
					this.$router.replace(`/home/${index}`);
				}
			}
		}
	}
</script>