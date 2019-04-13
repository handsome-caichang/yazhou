<style scoped lang="scss">
	@import "../../../../assets/scss/variable.scss";
	@import "../../../../assets/scss/mixin.scss";
	.scroller {
		overflow: hidden;
		.row {
			width: 100%;
			@include border-bottom(#EDF1F7);
			.item {
				.item-content {
					position: relative;
					height: 50px;
					line-height: 50px;
					padding-left: 56px;
					font-size: 17px;
					color: #333;
					@include ellipsis-single;
					.avatar {
						position: absolute;
						left: 10px;
						top: 6px;
						width: 38px;
						height: 38px;
						border-radius: 50%;
						border: 1px solid #FFF;
						background-color: $color-assist-1;
						background-repeat: no-repeat;
						background-attachment: scroll;
						background-position: center;
						background-size: 100% 100%;
					}
				}
				.item-left {
					letter-spacing: 3px;
					position: absolute;
					right: -100px;
					top: 0;
					width: 100px;
					height: 100%;
					text-align: center;
					@include flex-center;
					color: #FFF;
					background: #1E88F5;
				}
			}
		}
		.empty-page {
			@include position-absolute;
		}
	}
</style>

<template>
	<scroller-base 
		class="scroller"
		ref="scrollBar"
		@touchstart.native="closeEditList($event)"
		@mousedown.native="closeEditList($event)"
		:data="teamList">
		<div>
			<div class="row" v-for="(team,index) in teamList">
				<slide-left class="item"
					@changeStatus="moveLeft" 
					>

					<router-link 
						class="item-content" 
						tag="div" 
						:to="`/chat/team/${team.teamId}/${encodeURIComponent(team.name)}`">
						<div class="avatar" :style="{backgroundImage: `url(${team.avatar})`}"></div>
						{{team.name}}
					</router-link>

					<router-link 
						class="item-left del" 
						tag="div" 
						:to="`/teamDetail/${team.teamId}/${encodeURIComponent(team.name)}`"
						data-enableClick="true">
						查看
					</router-link>
				</slide-left>
			</div>
		</div>
		
		<empty-page class="empty-page"
			:type="userWone.IsParent ? 'team-parent' : 'team-teacher'"
			v-if="imSync && teamList.length === 0">
		</empty-page>
	</scroller-base>
</template>

<script>
	import SlideLeft from 'src/components/common/slide-left/slide-left'
	import EmptyPage from 'src/components/common/empty-page/empty-page.vue'

	export default {
		data() {
			return {
				scroller: null,
				editList: [],
			}
		},
		computed: { 
			...Vuex.mapState({
				imSync: 'imSync',
				userWone: 'userWone'
			}),
			...Vuex.mapGetters({
				teamList: 'validTeamList'
			})
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
			moveLeft(params) {
				if (params.status) {
					this.editList.push(params.component)
				}
			},
		},
		mounted() {
			this.scroller = this.$refs.scrollBar.scroller
		},
		components: {
			SlideLeft,
			EmptyPage
		},
		watch: {
			$route() {
				this.hideEditList()
			},
			teamList() {
				// console.log("群列表发生变化..........");
			}
		}
	}
</script>