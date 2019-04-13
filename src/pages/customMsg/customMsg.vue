<!-- 作业、通知、评价列表页 -->
<style scoped lang="scss">
	@import "../../assets/scss/variable.scss";
	@import "../../assets/scss/mixin.scss";
	.custommsg-page {
		display: flex;
		flex-direction: column; 
		.nav {
			height: 40px;
			background-color: #FFF;
			display: flex;
			margin-bottom: 10px;
			.nav-item {
				flex: 1;
				border-right: 1px solid #EDF1F7;			
				@include flex-center;
				.title {
					@include flex-center;
					height: 100%;
					text-align: center;
					font-size: 15px;
					color: $color-6;
					&.active {
						border-bottom: 2px solid $color-primary;
						color: $color-primary;
					}
				}				
			}
		}
		.body {
			flex: 1;
			position: relative;
			.msg-scroller {
				@include position-absolute;
				.msg-item {
					position: relative;
					display: block;
					background-color: #FFF;
					border-bottom: 1px solid #EDF1F7;
					padding: 0 15px;
					.content {
						padding-right: 32px;
						height: 64px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						.title {
							font-size: 16px;
							color: #333;
							@include ellipsis-single;
						}
						.other {
							margin-top: 6px;
							font-size: 12px;
							color: #999;
							@include ellipsis-single;
							.time {
								display: inline-block;
								// width: 70px;
								margin-right: 10px;
								&.time-highlight {
									color: #1E88F5;
								}
							}
						}
					}
					.icon {
						position: absolute;
						top: 50%;
						right: 15px;
						transform: translate(0, -50%);
						z-index: 9;
					}
				}
				.empty-page {
					@include position-absolute;
					z-index: 10;
				}
			}
			.loading {
				@include position-absolute;
				z-index: 2;
			}
		}
	}
</style>

<template>
	<div class="custommsg-page">
		<div class="nav">
			<div class="nav-item" 
				v-for="item in navList"
				@click="selectCustom(item)">
				<div class="title" :class="{active:curType == item.type}">{{item.text}}</div>
			</div>
		</div>

		<div class="body">
			<scroller-load
				class="msg-scroller"
				ref="scroller"
				:data="customMsgs"
				@loadData="renderData"
				@loadFirst="customMsgs = []"
				:pagingOption="pagingOption">
				<div class="msg-list">
					<a class="msg-item" 
						v-for="item in customMsgs"
						:href="getMsgUrl(item)">
						<div class="content">
							<div v-if="item.Attach" class="title">{{item.Attach.Title}}</div>
							<div class="other">
								<span class="time time-highlight">{{getMsgTime(item.Attach.CreateTime)}}</span>
								<span class="class-name">{{item.Attach.ClassName}}</span>
							</div>
						</div>
						<svg class="icon" aria-hidden="true">
						    <use xlink:href="#icon-xiayibu"></use>
						</svg>
					</a>
				</div>
				<empty-page class="empty-page" 
					v-if="!isLoading && customMsgs.length === 0"
					:type="`cmsg0${curType}`">
				</empty-page>
			</scroller-load>
			
			<loading class="loading" v-show="isLoading"></loading>
		</div>
	</div>

</template>

<script>
	import EmptyPage from 'src/components/common/empty-page/empty-page.vue'
	import util from '../../utils'

	import {queryCustomMsg} from 'src/api/jie.js'
	import {getCustomMsgUrl} from 'src/assets/js/common/custom-msg.js'
	export default {
		data() {
			return {
				isLoading: true,
				curType: parseInt(this.$route.params.CustomType),
				FromAccID: this.$route.params.FromAccID,
				ToAccID: this.$route.params.ToAccID,
				navList: [
					{
						text: '作业',
						type: 3,
					},{
						text: '通知',
						type: 4,
					},{
						text: '评价',
						type: 2,
					}
				],
				customMsgs: [],
				pagingOption: {
					api: queryCustomMsg,
					params: {
						FromAccID: this.$route.params.FromAccID,
						ToAccID: this.$route.params.ToAccID,
						CustomType: parseInt(this.$route.params.CustomType),
					},
					pageOpt: {
                        // 分页初始页码的'key'、'value'
                        indexKey: 'PageIndex',
                        indexVal: 1,
                        // 每页请求数据长度的'key'、'value'
                        sizeKey: 'PageSize',
                        sizeVal: 10,
                        // 后端返回的总页数'key'
                        countKey: 'PageCount'
                    },
				}
			}
		},
		computed: {
		},
		methods: {
			getMsgUrl(msg) {
				return getCustomMsgUrl(msg.Attach)
			},
			getMsgTime(date) {
				if (!date) return ""

				let time = new Date(date).getTime()
				let msgtime = util.customMsg_formatDate(time, true)
				return msgtime;
			},
			renderData(ajaxPromise) {
				this.isLoading = true;
				ajaxPromise.then(res => {
					this.isLoading = false
					if (res.PageIndex === 1) {
						this.customMsgs = []
					}
					this.customMsgs = this.customMsgs.concat(res.Data)
				})
			},
			selectCustom(item) {
				this.curType = item.type
				this.customMsgs = []
				this.$refs.scroller.pagingRefresh({CustomType: item.type})

				this.$router.replace(`/customMsg/${this.FromAccID}/${this.ToAccID}/${item.type}`)
			}
		},
		components: {
			EmptyPage
		}
	}
</script>