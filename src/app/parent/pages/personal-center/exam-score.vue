<!-- 考试成绩界面 -->
<style lang="scss" scoped>
	
	
	.exam-score{
		.header{
			.filter-wrapper{
				@include flex-between;
				padding: 8px 15px;
				.search-btn,
				.search-cancel-btn{
					margin-left: 5px;
				    width: 50px;
				    height: 28px;
				    line-height: 28px;
				    text-align: center;
				    border-radius: 50px;
				}
				.search-btn{
					background-color: #EEF1F6;
				}
			}
			.search-wrapper{
				padding: 2px 15px 10px 15px;
				.search{
					display: flex;
					position: relative;
					border: 1px solid #EEF1F6;
					padding: 0 50px 0 10px;
				    border-radius: 50px;
					.input{
						height: 28px;
						font-size: 12px;
						border-radius: 4px;
					}
					.btn{
						position: absolute;
					    top: 0;
					    right: 0;
					    width: 50px;
					    height: 28px;
					    font-size: 13px;
					    line-height: 28px;
					    text-align: center;
					    border-radius: 50px;
					    background-color: #eef1f6;
					}
				}
			}
		}
		.body{
			@include position-absolute(54px);
			&.status1{
				@include position-absolute(96px);
			}
			.card{
				line-height: 1;
				background-color: $color-white;
				.card-hd{
					@include flex-between;
					font-size: 12px;
					.card-hd-l{
						flex: 1;
						padding: 15px 0 8px 15px;
						.name{
							display: inline-block;
							max-width: 60%;
							font-size: 16px;
							color: $color-3;
							vertical-align: middle;
							@include ellipsis-single;
						}
					}
					.card-hd-r{
						padding: 15px 15px 8px 15px;
					}
				}
				.card-bd{
					font-size: 12px;
					.subject{
						padding: 4px 15px;
						@include flex-between;
						.name{
							flex: 1;
						}
						.score{
							width: 40px;
							text-align: right;
							color: #27CCF5;
						}
					}
					.info{
						margin-top: 6px;
						padding: 6px 15px;
						@include border-top;
                        word-break: break-all;
						>*{
							padding: 4px 0;
						}
					}
					.recommend{
						padding: 5px 15px;
						text-align: right;
						@include border-top;
						.btn{
							display: inline-block;
							padding: 4px;
                            border-radius: 3px;
							color: #999999;
							margin-left: 10px;
							text-decoration: none;
							border: 1px solid #cccccc;
						}
					}
				}
			}
		}
		.void{
			height: 10px;
			background-color: #EEF1F6;
		}
		.noData-temp{
			@include position-absolute;
		}
	}
</style>

<template>
	<div class="exam-score">
		<div class="header">
			<div class="filter-wrapper">
				<!-- 日历 -->
				<date-bar 
					:sdate="pagingOption.params.sdate" 
					:edate="pagingOption.params.edate" 
					:index="quickDateIndex" 
					@changeDate="changeDate">
				</date-bar>
				<div class="search-btn" v-show="!searchFlag" @click="()=>{searchFlag=!searchFlag}">搜索</div>
				<div class="search-cancel-btn" v-show="searchFlag" @click="()=>{searchFlag=!searchFlag}">取消</div>
			</div>
			<!-- 搜索 -->
			<div class="search-wrapper" v-if="searchFlag">
				<div class="search">
					<input class="input" type="text" placeholder="输入名称" v-model="pagingOption.params.search">
					<span class="btn" @click="reload">搜索</span>
				</div>
			</div>
			<div class="void"></div>
		</div>
		
		<scroller-super 
			class="body"
			ref="myScroller"
			:type="2"
			:data="list"
			:pagingOption="pagingOption"
			:class="{'status1':searchFlag}"
			@loadData="loadData">
			<div v-for="item in list" class="card" :key="item.id">
				<!-- 考试名称 -->
				<div class="card-hd">
					<span class="card-hd-l">
						<span class="name">{{item.name}}&emsp;</span>{{item.date.replace(/-/g, '.')}}
					</span>
					<svg class="icon card-hd-r" aria-hidden="true" @click="()=>{item.isSpread=!item.isSpread}">
						<use :xlink:href="item.isSpread?'#icon-shouqi1':'#icon-shouqizhankai'"></use>
					</svg>
				</div>
				<div class="card-bd" v-show="item.isSpread">
					<!-- 考试项目 -->
					<div v-for="score in item.scoreList" class="subject">
						<div class="name">{{score.subject}}</div>
						<div class="score">{{score.score=='-999'?'/':score.score}}</div>
					</div>
					<!-- 备注、报名层次 -->
					<div class="info" v-if="item.memo||item.baomingLevel">
						<div v-if="item.memo">备注：{{item.memo}}</div>
						<div v-if="item.baomingLevel">报名班级：{{item.baomingLevel}}</div>
					</div>
					<!-- 查看详情、推荐班级 -->
					<div class="recommend" v-if="(app.sysInfo.EnableRecommend_Online==1&&item.EnableMall)||item.url">
						<a class="btn" :href="item.url" v-if="item.url">查看详情</a>
						<a class="btn" v-if="app.sysInfo.EnableRecommend_Online==1&&item.EnableMall" @click="goToMall(item)">查看推荐班级</a>
					</div>
				</div>
				<div class="void"></div>
			</div>
			<empty-page class="noData-temp" :type="7" v-if="list.length == 0"></empty-page>
		</scroller-super>
		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
	import EmptyPage from 'parent/components/common/empty-page/empty-page';
	import {processCPost} from 'parent/api/common';
		
	export default {
		name: 'exam-score',
		data () {
			return {
				wxTitle: '考试成绩',
				list: [],
				searchFlag: false,
				isLoading: true,
				quickDateIndex: -1,
				pagingOption: {
					api: processCPost,
					params: {
						pname: 'examscore',
						sdate: app.filters.formatDatetime(new Date(new Date().getFullYear()-2,0,1),'yyyy-MM-dd'),
						edate: app.tool.getDatesByIndex(3,app.localTimeToServer).edate,
						search: ''
					},
					pageOpt: {
                        indexKey: 'page', //分页初始页码的'key'、'value'
                        indexVal: 1,
                        sizeKey: 'pageSize', //每页请求数据长度的'key'、'value'
                        sizeVal: 40,
                        countKey: 'pageCount', //后端返回的总页数'key'
                    }
				}
			}
		},
		methods: {
			changeDate(obj){
				this.pagingOption.params.sdate = obj.sdate;
				this.pagingOption.params.edate = obj.edate;
				this.quickDateIndex = obj.index;
				this.reload();
			},
			reload(){
				this.$refs.myScroller.refresh(this.pagingOption.params);
			},
			loadData(ajaxPromise){
				ajaxPromise.then(res => {
					this.isLoading = false;
					if (res.errcode == app.errok) {
						if (res.pageIndex === 1) {
							this.list = [];
						}
						res.data.forEach(item => {
                            item.isSpread = true;
                        })
						this.list = this.list.concat(res.data);
					}
				})
			},
			goToMall(para){ //查看推荐班级
				if (para.EnableMall) {
					window.location.href = app.sysInfo.MallURL + encodeURIComponent('#/home/1?ExamId='+para.id+'&cid='+para.CampusID);
				}
			}
		},
		components: {
			EmptyPage
		}
	}
</script>