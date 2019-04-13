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
				word-break: break-word;
				overflow: hidden;
			}
			.slide-down {
				text-align: right;
				color: $color-primary;
			}
		}
		.noData-temp{
		    @include position-absolute;
		}
	}
</style>

<template>
	<scroller-super 
		class="scroll"
		ref="scroll"
		:type="2"
		:data="scrollData"
		@loadData="renderData"
		:pagingOption="pagingOption">
		<div 
			class="item" 
			v-for="(item, index) in list" 
			:key="index">
			<router-link tag="div" :to="`/suggestionDetail/${item.id}`">
				<div class="item-top">
					<div class="avatar" :style="{backgroundImage: `url(${item.photo})`}"></div>
					<div class="text">
						<div class="name">{{item.Name}}</div>
						<div class="text-top">
							<div class="name">{{item.name}}</div>
							<div class="num" v-if="item.replaycount>0">
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
		<empty-page class="noData-temp" :type="8" v-if="list.length == 0"></empty-page>
	</scroller-super>
</template>

<script>
	import {getsuggestionforteacherlist} from 'teacher/api/suggestion'
	import EmptyPage from 'teacher/components/common/empty-page/empty-page';
	export default { 
		data() {
			return {
				wxTitle: "投诉与建议",
				showArr:[],
				list: [],
				num: 0,
				pagingOption: {
					api: getsuggestionforteacherlist,
					params: {
						"isdesc": false,
					},
					pageOpt: {
						isdesc: false,
                        sortfield: '',
                        indexKey: 'pageindex', // 分页初始页码的'key'、'value'
                        indexVal: 1,
                        sizeKey: 'pagesize', // 每页请求数据长度的'key'、'value'
                        sizeVal: 8,
                        countKey: 'totalpage', // 后端返回的总页数'key'
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
					}
				})
			},
			isShowAll(str) {
			    return str.length > 80 ? true : false
			},
			changeContent(obj, index) {
			    this.num ++
			    obj.longContentFlag = !obj.longContentFlag
			    if (!obj.longContentFlag) {
			        obj.longContent = obj.content
			    } else {
			        obj.longContent = obj.content.substr(0, 80) + '...'
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