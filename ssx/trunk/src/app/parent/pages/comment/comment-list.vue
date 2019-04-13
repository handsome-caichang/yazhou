<!-- 课堂评价列表 -->
<style scoped lang="scss">
	
	
	.comment-list{
		.header{
			padding: 8px 12px;
		}
		.void{
			height: 10px;
			background-color: $color-assist-1;
		}
		.body {
			@include position-absolute(53px);
			.card{
                height: 100px;
				padding: 20px 30px 15px 20px;
				line-height: 1;
				font-size: 12px;
				background-color: $color-white;
				border-bottom: 1px solid $color-assist-1;
				position: relative;
				.card-hd{
					font-size: 16px;
					color: $color-3;
					line-height: 20px;
                    @include ellipsis-single;
				}
				.card-bd{
					padding-top: 12px;
					.time{
						flex: 1;
					}
				}
				.card-ft{
					padding-top: 7px;
					.teacher{
						flex: 1;
						@include ellipsis-single;
					}
				}
				.card-bd,
				.card-ft{
					display: flex;

					.comment{
						width: 100px;
                        margin-left: 10px;
						.no-tea-comment{
							color: #CCCCCC;
						}
						.no-stu-comment{
							color: #FF4A22;
						}
						.student-scope {
							color: #46BEEE;
						}
						.teacher-scope {
							color: #F5A206;
						}
						.has-tea-comment{
							color: #F5A206;
						}
						.has-stu-comment{
							color: #46BEEE;
						}
					}
                    .icon{
                        margin-right: 3px;
                    }
				}
				.card-next{
					position: absolute;
					right: 13px;
					top: 0;
					bottom: 0;
					margin: auto 0;
				}
			}
            .noData-temp{
                @include position-absolute;
            }
		}
	}
</style>

<template>
	<div class="comment-list">
		<!-- 头部日期筛选 -->
		<div class="header">
			<date-bar 
				:sdate='pagingOption.params.startdate' 
				:edate='pagingOption.params.enddate'
				:index="quickDateIndex" 
				@changeDate="changeDate">
			</date-bar>
		</div>
		<div class="void"></div>
		<!-- 内容部分 -->
		<scroller-super
			ref="scroll"
			class="body"
			:type="2"
			:data="list"
			:pagingOption="pagingOption" 
			@loadData="loadData">
			<router-link tag="div" class="card" v-for="(item, index) in list" :to="`/commentDetail/${item.courseid}`" :key="index">
				<div class="card-hd">{{item.classname}}<span v-if="item.subjectName">-{{item.subjectName}}</span></div>
				<div class="card-bd">
                    <div class="time">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-riqiicon"></use>
                        </svg>
						{{computedTime(item)}}
                    </div>
                    <div class="comment">老师点评：
                    	<span class="no-tea-comment" v-if="item.isteachercomment==0">未点评</span>
                    	<span class="teacher-scope" v-if="item.isteachercomment==1">{{item.teacheravgscope}}</span>
                    </div>
				</div>
				<div class="card-ft">
					<div class="teacher">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-laoshiicon1"></use>
                        </svg>
                        {{item.teachername}}
                    </div>
                    <div class="comment">评价老师：
                    	<span class="no-stu-comment" v-if="item.isparentcomment==0">未点评</span>
                    	<span class="student-scope" v-if="item.isparentcomment==1">{{item.parentavgscope}}</span>
                    </div>
				</div>
				<svg class="icon card-next" aria-hidden="true">
					<use xlink:href="#icon-youjiantou"></use>
				</svg>
			</router-link>
			<empty-page class="noData-temp" :type="1" v-if="list.length == 0"></empty-page>
		</scroller-super>
		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
	import EmptyPage from 'parent/components/common/empty-page/empty-page';
	import {getcourseevaluate} from 'parent/api/common';
	
	export default {
		name: 'comment-list',
		data () {
			return {
				wxTitle: '课堂评价',
				list: [],
				pagingOption: {
					api: getcourseevaluate,
					params: {
						studentid: '',
						companyid: '',
						startdate: app.tool.getDatesByIndex(3,app.localTimeToServer).sdate,
						enddate: app.tool.getDatesByIndex(3,app.localTimeToServer).edate,
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
				},
				isLoading: true,
				quickDateIndex: -1,
				studentid: null,
				companyid: null
			}
		},
		computed: {
			...Vuex.mapState(['userConfig']),
		},
		methods: {
			loadData(ajaxPromise){
				ajaxPromise.then(res => {
					this.isLoading = false;
					if (res.result.code == app.errok) {
						if (res.page.pageindex === 1) {
							this.list = [];
						}
                        this.list = this.list.concat(res.data);
					}
				})
			},
			changeDate(params){
				this.quickDateIndex = params.index
				this.pagingOption.params.startdate = params.sdate
				this.pagingOption.params.enddate = params.edate
				this.$refs.scroll.refresh(this.pagingOption.params)
			},
			computedTime(obj) {
				let str = '',
					n = obj.startdate.indexOf(' ')
				str = obj.startdate.slice(0, n)
				if (obj.unit == 3) {
					return str
				} else {
					str = str + ' ' + obj.starttime + '~' + obj.endtime
				}
				return str
			}
		},
		components: {
			EmptyPage
		},
		created() {
			window.a= this
            this.pagingOption.params.studentid = this.userConfig.userId
            this.pagingOption.params.companyid = this.userConfig.companyID
			app.event.on('selectStar', () => {
				this.$refs.scroll.refresh()
			})
		},
		destroyed() {
			app.event.off('selectStar')
		},
		watch: {
			
		}
	}
</script>