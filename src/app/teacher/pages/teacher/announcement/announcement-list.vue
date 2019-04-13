<!--公告列表页-->
<style scoped lang="scss">
	
	
	.announcement-container {
		.body {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: $color-white;
			.scroller {
				@include position-absolute;
				overflow: hidden;
				padding-top: 4px;
			}
			.to-detail {
				height: 75px;
				margin: 12px;
				padding: 0 15px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: $color-white;
				border-radius: 2px;
				.flex-left {
					max-width: 85.5072%;
					display: flex;
					flex-direction: column;
					.title {
						font-size: 16px;
						color: rgba(51, 51, 51, 1);
						margin-bottom: 10px;
						@include ellipsis-single;
					}
					.date {
						font-size: 12px;
						color: rgba(153, 153, 153, 1);
					}
				}
				.flex-right {
					position: relative;
					height: 100%;
					line-height: 75px;
					.readed {
						position: absolute;
						top: 10px;
						right: -5px;
						width: 9px;
						height: 9px;
						background-color: rgba(233, 58, 14, 1);
						border-radius: 9px;
					}
				}
			}
			.noData-temp {
				@include position-absolute;
			}
		}
	}
</style>

<template>
	<div class="announcement-container">

		<div class="body">
			<scroller-super 
				class="scroller" 
				:type="2" 
				:data="list" 
				:pagingOption="pagingOption" 
				@loadData="loadData" 
				ref="announcementListIScroller">
				<div v-for="item in list" :key="item.id" @click="toDetail(item)" class="to-detail">
					<div class="flex-left">
						<span class="title">{{ item.title }}</span>
						<span class="date">{{ item.date }}</span>
					</div>
					<div class="flex-right">
						<span :class="{'readed': item.isRead == 0}"></span>
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-youjiantou"></use>
						</svg>
					</div>
				</div>
				
				<empty-page class="noData-temp" v-if="list.length==0" :type="4" text="还没公告消息"></empty-page>
				<div style="height:12px;"></div>
			</scroller-super>
		</div>

		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
	import { processPost } from "teacher/api/common";
	import EmptyPage from "teacher/components/common/empty-page/empty-page";

	export default {
		name: "announcement-list",
		data() {
			return {
				wxTitle: "学校公告",
				list: [],
				// quickDateIndex: -1,
				pagingOption: {
					api: processPost,
					params: {
						pname: "publicInfo",
						flag: "",
						type: "",
					},
					pageOpt: {
						// 分页初始页码的'key'、'value'
						indexKey: "page",
						indexVal: 1,
						// 每页请求数据长度的'key'、'value'
						sizeKey: "pageSize",
						sizeVal: 20,
						// 后端返回的总页数'key'
						countKey: "pageCount"
					}
				},
				isLoading: true
			};
		},
		methods: {
			// 加载更多
			loadData(ajaxPromise) {
				ajaxPromise.then(res => {
					this.isLoading = false;
					if(res.errcode == 200) {
						res.data.forEach(item => {
							this.$set(item, 'isRead', item.isRead);
						});
						this.list =
							res.pageIndex == 1 ? res.data : [].concat(this.list, res.data);
					}
				});
			},
			toDetail(item) {
			   
				this.$router.push({
					path: `/announcementDetail/${item.id}`,
					component: "announcementDetail"
				});
				
			}
        },
        created(){
            // 派发事件，移除未读样式
			app.eventDefine.on('refresh-announcement-list', (type,id)=> {
                this.list.some(item=>{
                    item.id == id && (item.isRead = 1);
                })
            });
        },
        beforeDestroy(){
            app.eventDefine.off('refresh-announcement-list');
        },
		components: {
			EmptyPage
		}
	};
</script>