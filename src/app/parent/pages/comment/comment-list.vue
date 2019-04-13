<!-- 课堂评价列表 -->
<style scoped lang="scss">
	
	
	.comment-list{
		.header{
			padding: 8px 12px;
			background-color: $color-white;
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
				@include border-bottom;
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
                        .icon{
                            width: 13px;
                            height: 13px;
                        }
					}
				}
				.card-ft{
					padding-top: 7px;
					.teacher{
						flex: 1;
						@include ellipsis-single;
					}
                    .icon{
                        width: 13px;
                        height: 13px;
                    }
				}
				.card-bd,
				.card-ft{
					display: flex;
					.comment{
						width: 100px;
                        margin-left: 10px;
						text-align: right;
						.no-tea-comment{
							color: #CCCCCC;
						}
						.no-stu-comment{
							color: #BBBBBB;
							border:1px solid #BBBBBB;
							padding: 1px 6px;
							border-radius: 22px;
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
				:sdate='pagingOption.params.sdate' 
				:edate='pagingOption.params.edate' 
				:index="quickDateIndex" 
				:shortcuts="shortcuts"
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
			<router-link tag="div" class="card" v-for="item in list" :to="`/commentDetail/${item.id}/${item.studentId}`" :key="item.id">
				<div class="card-hd">{{item.name}}<span v-if="item.subjectName">-{{item.subjectName}}</span></div>
				<div class="card-bd">
					<div class="time" v-if="item.unit!==3">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-riqiicon"></use>
                        </svg>
                        {{item.date.replace(/-/g,'.')}}&nbsp;{{item.stime}}-{{item.etime}}
                    </div>
                    <div class="time" v-else>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-riqiicon"></use>
                        </svg>
                        {{item.date.replace(/-/g,'.')}}
                    </div>
                    <div class="comment" v-if="item.isTeacherComment==1">
						<span>老师点评：</span>	
                    	<!-- <span class="no-tea-comment" v-if="item.isTeacherComment==0">未点评</span> -->
                    	<span class="teacher-scope">{{item.teacherAvgScope}}</span>
                    </div>
				</div>
				<div class="card-ft">
					<div class="teacher">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-laoshiicon1"></use>
                        </svg>
                        {{item.teacher}}
                    </div>
                    <div class="comment">
						<span v-if="item.isParentComment==1">评价老师：</span>
                    	<span class="no-stu-comment" v-if="item.isParentComment==0">去点评</span>
                    	<span class="student-scope" v-if="item.isParentComment==1">{{item.parentAvgScope}}</span>
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
	import {processPost} from 'parent/api/common';
	
	export default {
		name: 'comment-list',
		data () {
			return {
				wxTitle: '课堂评价',
				list: [],
				pagingOption: {
					api: processPost,
					params: {
						pname: 'comment',
						sdate: "",
						edate: "",
					},
					pageOpt: {
                        indexKey: 'page', // 分页初始页码的'key'、'value'
                        indexVal: 1,
                        sizeKey: 'pageSize', // 每页请求数据长度的'key'、'value'
                        sizeVal: 20,
                        countKey: 'pageCount', // 后端返回的总页数'key'
                    }
				},
				shortcuts:['不限','今天','昨天','本周','最近7天','最近30天','本月','上月'],
				isLoading: true,
				quickDateIndex: -1
			}
		},
		methods: {
			loadData(ajaxPromise){
				ajaxPromise.then(res => {
					this.isLoading = false;
					if (res.ErrorCode == app.errok || res.errcode == app.errok) {
						if (res.pageIndex === 1) {
							this.list = [];
						}
						this.list = this.list.concat(res.data);
					}
				})
			},
			changeDate(obj){
                this.quickDateIndex = obj.index;//快速选日期高亮
				let params = {
					sdate: obj.sdate,
					edate: obj.edate
				};
				this.$refs.scroll.refresh(params)
			}
		},
		components: {
			EmptyPage
		},
		created() {
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