<!-- 我的成长-列表 -->
<style lang="scss" scoped>
	
	
	.growth-list {
		.filter-growth {
			width: 100%;
			height: 40px;
			padding: 0 15px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #ffffff;
			.btn-filter {
				height: 40px;
				line-height: 40px;
			}
		}
		.body {
			@include position-absolute(40px, 0, 0, 0);
			padding-top: 4px;
			.growth-item {
				.icon {
					width: 15px;
					height: 15px;
				}
				width: 100%;
				padding: 10px 15px;
				margin-bottom: 10px;
				background-color: #ffffff;
				.common {
					width: 100%;
					display: flex;
					flex-direction: column;
					.base-info {
						width: 100%;
						height: 80px;
						display: flex;
						justify-content: space-between;
						font-size: 12px;
						color: rgba(102, 102, 102, 1);
						.flex-left {/* 左右弹性盒子 */
							width: 85%;
							display: flex;
							flex-direction: column;
							justify-content: center;
							.title {
								@include ellipsis-single;
								font-size: 16px;
								color: rgba(51, 51, 51, 1);
								.icon-pingjia,
								.icon-zuoye {
									width: 25px;
									height: 16px;
								}
								&+span {
									margin-top: 10px;
									margin-bottom: 5px;
								}
							}
						}
						.flex-rigth {/* 评分 */
							min-width: 57px;
							height: 75%;
							display: flex;
							flex-direction: column;
							justify-content: center;
							text-align: center;
							>span:first-child {
								font-size: 22px;
								color: rgba(245, 162, 6, 1);
							}
							>span:last-child {
								font-size: 10px;
								color: rgba(102, 102, 102, 1);
							}
						}
					}
					.only-text {
						border: none;
						border-bottom: 1px solid #E2E2E2;
						width: 100%;
						margin-top: 2px;
					}
					.img-box {
						width: 100%;
						display: flex;
						margin-top: 10px;
						margin-bottom: 5px;
						.img-item {
							min-width: 25%;
							height: 25vw;
							max-height: 190px;
							padding-right: 5px;
							&:last-child {
								padding-right: 0;
							}
							>div {
								width: 100%;
								height: 100%;
								background-color: #eef1f6;
								background-size: 100% 100%;
							}
						}
					}
					.text-box {
						margin-bottom: 5px;
						@include ellipsis-single;
					}
				}
			}
			.noData-temp {
				@include position-absolute;
			}
			.album {
				font-size: 0;
				-webkit-text-size-adjust: none;
				.album-item {
					display: inline-block;
					width: 33.33333%;
					height: 33.3333vw;
					max-height: 246px;
					padding: 2.5px;
					.bg-div {
						width: 100%;
						height: 100%;
						background-size: 100% 100%;
						background-color: #eef1f6;
					}
				}
			}
		}
	}
</style>

<template>
	<div class="growth-list">
		<!-- 筛选 -->
		<div class="filter-growth">
			<date-bar 
				class="date" 
				:sdate='pagingOption.params.sdate' 
				:edate='pagingOption.params.edate' 
				:index="quickDateIndex" 
				@changeDate="changeDate">
			</date-bar>
			<span class="btn-filter" @click="filterGrowth">
	        	<svg class="icon" aria-hidden="true">
	            	<use xlink:href="#icon-shaixuanicon"></use>
	        	</svg>筛选
	        </span>
		</div>

		<!-- 作业和评价 -->
		<scroller-super 
			
			ref="scrollerSuper" 
			class="body" 
			:type="2" 
			:data="list" 
			:pagingOption="pagingOption" 
			@loadData="loadData">
			<!-- 列表渲染 -->
			<div v-if="pagingOption.params.queryType != 1" class="growth-item" v-for="item in list" :key="item.MessageID" @click="toDetail(item)">
				<!-- 评价和作业 -->
				<div class="common" v-if="item.Type == 2 || item.Type == 3">
					<div class="base-info">
						<div class="flex-left">
							<span class="title">
		                		<svg :class="['icon', {'icon-pingjia': item.Type == 2}, {'icon-zuoye': item.Type == 3}]" aria-hidden="true">
		               				<use :xlink:href="item.Type == 2 ? '#icon-pingjia' : '#icon-zuoye'"></use>
		                		</svg>{{item.ClassName}}
                    		</span>
							<span>
		                   		<svg class="icon" aria-hidden="true">
		                    		<use xlink:href="#icon-laoshiicon1"></use>
	                    		</svg>&nbsp;&nbsp;{{item.TeacherName}}
                    		</span>
							<span>
		                    	<svg class="icon" aria-hidden="true">
		                    		<use xlink:href="#icon-shangkeshijianicon"></use>
	                    		</svg>&nbsp;&nbsp;{{item.Time}}
                    		</span>
						</div>
						<div class="flex-rigth" v-if="item.Type == 2">
							<span>{{item.AvgScope}}</span>
							<span>综合评分</span>
						</div>
					</div>

					<!-- 有文字描述的时候有一条分隔线 -->
					<hr class="only-text" v-if="item.Src.length == 0 && item.Text.length > 0"></hr>

					<!-- 图片 -->
					<div class="img-box" v-if="item.Src.length > 0">
						<div class="img-item" v-for="(item1, key) in item.Src" :key="key">
							<div :style="{'background-image':'url(' + item1 + ')'}"></div>
						</div>
					</div>

					<!-- 文字 -->
					<div class="text-box" v-if="item.Text.length > 0">{{item.Text | handleText}}</div>
				</div>
			</div>

			<!-- 只看图片 -->
			<div class="album" v-if="pagingOption.params.queryType == 1">
				<div class="album-item" v-for="(item1, key) in list" :key="key" @click="previewImage(item1)">
					<div class="bg-div" :style="{'background-image':'url(' + item1 + ')'}"></div>
				</div>
			</div>
			
			<empty-page class="noData-temp" :type="6" v-if="list.length == 0 && pagingOption.params.queryType != 1"></empty-page>
			<empty-page class="noData-temp" :type="1001" v-if="list.length == 0 && pagingOption.params.queryType == 1"></empty-page>
		</scroller-super>

		<!-- 筛选 -->
		<filter-grow 
			:opened.sync="opened" 
			:classList="classList" 
			:fullParent="true" 
			@ok="ok">
		</filter-grow>
		
		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
	import { getGrowthList, getDetailInfo } from "parent/api/growth";
	import FilterGrow from "./child/filter-grow";
	import EmptyPage from "parent/components/common/empty-page/empty-page";
	
	export default {
		name: "growth",
		data() {
			return {
				wxTitle: "我的成长",
				list: [],
				opened: false,
				classList: null,
                quickDateIndex:-1,
				pagingOption: {
					api: getGrowthList,
					params: {
						queryType: 0,
						sdate: app.tool.getDatesByIndex(3, app.localTimeToServer).sdate,
						edate: app.tool.getDatesByIndex(3, app.localTimeToServer).edate,
						classid: ""
					},
					pageOpt: {
						// 分页初始页码的'key'、'value'
						indexKey: "PageIndex",
						indexVal: 1,
						// 每页请求数据长度的'key'、'value'
						sizeKey: "PageSize",
						sizeVal: 20,
						// 后端返回的总页数'key'
						countKey: "PageCount"
					}
				},
				isLoading: true
			};
		},
		methods: {
			loadData(ajaxPromise) {
				ajaxPromise.then(res => {
					this.isLoading = false;
					if(res.ErrorCode === 200) {
						// 除图片外
						if(this.pagingOption.params.queryType != 1) {
							this.handleData(res);
						} else {
							// 只看图片
							let _album = res.Data.length > 0 ? res.Data : [],
								_arr = [];
							_album.forEach(item => {
								if(item.Src.length > 0) {
									item.Src.forEach(item1 => {
										_arr.push(item1);
									});
								}
							});
							this.list = app.tool.clone(_arr);
						}
					}
				});
			},
			// 日期筛选
			changeDate(item) {
				this.pagingOption.params.sdate = item.sdate;
				this.pagingOption.params.edate = item.edate;
				this.quickDateIndex = item.index;
				this.isLoading = true;
				this.$refs.scrollerSuper.refresh(this.pagingOption.params);
			},
			// 列表如果有图片最多只显示4张
			handleData(res) {
				let _data = Object.keys(res.Data).length > 0 ? res.Data : [];

				this.list =
					res.PageIndex === 1 ? [].concat(_data) : this.list.concat(_data);

				// 如果有图片最多显示6张
				if(Object.keys(this.list).length > 0) {
					this.list.forEach(item => {
						item.Src = item.Src.length > 4 ? item.Src.splice(0, 4) : item.Src;
					});
				}
			},
			toDetail(item) {
				let _name = item.Type == 3 ? 'homeworkDetail' : 'commentDetail'
					,_param = item.Type == 2 ? {id: item.CourseID, studentId: app.sysInfo.userId} : {id: item.MessageID};
				this.$router.push({name: _name, params: _param});
			},
			filterGrowth() {
				this.opened = true;
			},
			ok(data) {
				// queryType: 1,只看图片；2,课堂评价；3,只看作业
				this.pagingOption.params.queryType = data.queryType;
				this.pagingOption.params.classid = data.classid;

				this.$refs.scrollerSuper.refresh(this.pagingOption.params);
			},
			/* listPreViewImage(url) {
				this.list = [url];
				this.previewImage(url);
			}, */
			previewImage(url) {
				app.sdk.previewImage({
					current: url,
					urls: this.list
				});
			}
		},
        filters: {
		    // 处理值为html片段时，样式撑开的问题
            handleText: function (value) {
                if(!value){ return }
                let el_div = document.createElement('div');
                el_div.innerHTML = value;

                return el_div.innerText
            }
        },
		components: {
			FilterGrow,
			EmptyPage
		}
	};
</script>