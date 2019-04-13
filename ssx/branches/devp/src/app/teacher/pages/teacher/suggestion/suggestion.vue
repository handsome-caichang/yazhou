<style scoped lang="scss">
	
    
	.scroll {
		@include position-absolute(0,0,0,0);
		background-color: $color-assist-1;
		.item {
			padding: 15px;
			background-color: $color-white;
			border-bottom: 1px solid $color-assist-1;
			.item-top {
				display: flex;
				.avatar {
					width: 40px;
					height: 40px;
					background-color: $color-assist-1;
					margin-right: 12px;
					border: 1px solid $color-white;
					border-radius: 50%;
					background-repeat: no-repeat;
					background-attachment: scroll;
					background-position: center;
					background-size: 100% 100%;
				}
				.text {
					flex: 1;
					.text-top {
						display: flex;
						.name {
							flex: 1;
							font-size: 16px;
							color: $color-3;
						}
						.num {
							width: 40px;
							font-size: 12px;
							text-align: right;
							color: #75859B;
							margin-right: 5px;
						}
						.icon-wrapper {
							width: 10px;
						}

					}
					.time {
						font-size: 12px;
						color: $color-9;
					}

				}

			}
			.content {
				margin-top: 10px;
				font-size: 15px;
				color: $color-3;
				line-height: 24px;
				overflow: hidden;
				word-break: break-word;
			}
			.slide-down {
				text-align: right;
				color: $color-primary;
			}
		}
	}
	.noData-temp {
		z-index: 100;
		@include position-absolute;
	}
</style>

<template>
	<div class="wrapper">
			<!-- v-if="list.length" -->
		<scroller-super
			class="scroll"
			ref="scroll"
			:type="2"
			:data="scrollData"
			@loadData="renderData"
			:pagingOption="pagingOption">
			<div class="item" v-for="(item, index) in list" :key="index">
				<router-link tag="div" :to="`/suggestionDetail/${item.id}`" >
					<div class="item-top" >
						<div class="avatar" :style="{backgroundImage: `url(${item.photo})`}"></div>
						<div class="text">
							<!-- <div class="name">{{item.Name}}</div> -->
							<div class="text-top">
								<div class="name">{{item.name}}</div>
								<div class="num" v-if="item.replayCount>0">
									{{item.replaycount}}
								</div>
								<div class="icon-wrapper">
									<svg class="icon" aria-hidden="true">
									    <use xlink:href="#icon-huifushuliang"></use>
									</svg>
								</div>
							</div>
							<div class="time">{{item.createtime}}</div>
						</div>
					</div>
					<div class="content">
						{{item.content.length>80?item.longContent:item.content}}
					</div>
				</router-link>
				<div class="slide-down" v-if="isShowAll(item.content)" @click="changeContent(item,index)">
					{{item.longContentFlag?'全文':'收起'}}
				</div>
			</div>
		</scroller-super>
		<empty-page class="noData-temp" :type="8" v-if="list.length == 0" :text="'没有投诉与建议哦'"></empty-page>
	</div>
</template>

<script>
	import {getSuggestionList} from 'teacher/api/suggestion'
	import EmptyPage from 'teacher/components/common/empty-page/empty-page';
	export default { 
		data() {
			return {
				wxTitle: "投诉与建议",
				showArr:[],
				list: [],
				num: 0,
				pagingOption: {
					api: getSuggestionList,
					params: {
						campusids:''//校区id
					},
					pageOpt: {
						sortfield:'',
						isdesc:false,
						// 分页初始页码的'key'、'value'
						indexKey: "pageindex",
						indexVal: 1,
						// 每页请求数据长度的'key'、'value'
						sizeKey: "pagesize",
						sizeVal: 20,
						// 后端返回的总页数'key'
						countKey: "totalpage"
					}
					
				}
			}
		},
		computed: {
			scrollData() {
				return {
					list: this.list,
					num: this.num
				}
			}
		},
		methods: {
			renderData(ajaxPromise) {
				ajaxPromise.then(res => {
					console.log(res)
					if (res.result.code === app.errok) {
						if (res.page.pageindex === 1) {
							this.list = []
						}
						res.data.forEach((obj, index) => {
						    if (obj.content.length > 80) {
						        this.$set(obj, 'longContentFlag', true)
						        obj['longContent'] = obj.content.substr(0, 80) + '...'
						    }
						})
						this.list = this.list.concat(res.data)
						// this.list = []
					}
				})
			},
			isShowAll(str) {
			    return str&&str.length > 80 ? true : false
			},
			changeContent(obj, index) {
			    this.num ++
			    obj.longContentFlag = !obj.longContentFlag
			    if (!obj.longContentFlag) {
			        obj.longContent = obj.Content
			    } else {
			        obj.longContent = obj.Content.substr(0, 80) + '...'
			    }
			},
		},
		created() {
			app.event.on('refresh', () => {
				this.$refs.scroll.refresh()
			})
		},
		destroyed() {
			app.event.off('refresh')
		},
		mounted() {
		},
		components: {
			EmptyPage
		}
	}
</script>