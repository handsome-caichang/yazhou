<!-- 业绩报表-第二层 -->
<style scoped lang="scss">
    .page {
        .header {
			background-color: $color-white;
            .filter-bar {
				padding: 11px 15px;
                @include flex-between;
            }
            .count-bar {
                display: flex;
                padding: 20px 0;
                color: #333;
                .num {
                    font-size: 24px;
                }
                >div {
                    flex: 1;
                    @include flex-center(column);
                    &:last-child {
                        border-left: 1px solid rgba(204,204,204,.5);
                    }
                }
            }
        }
        .void {
            height: 8px;
        }
        .color1 {
            color: #2197f3;
        }
        .color2 {
            color: #fcac00;
        }
        .card {
            padding: 12px;
            line-height: 24px;
			background-color: $color-white;
            border-bottom: 1px solid #eaeaea;
            .name {
                color: #333;
                font-size: 14px;
                @include ellipsis-single;
            }
            .info {
                color: #999;
                font-size: 14px;
                @include flex-between();
            }
        }
        .loading {
            top: 50px;
        }
        .noData-temp{
			@include position-absolute(137px,0,0,0);
		}
    }
</style>

<template>
    <scroller-super 
        class="page"
        ref="myScroller"
        :type="2"
        :data="list"
        :pagingOption="pagingOption"
        @loadData="loadData">
        <div class="header">
            <div class="filter-bar">
                <date-bar 
					:sdate="pagingOption.params.sdate" 
					:edate="pagingOption.params.edate" 
					:index="quickDateIndex" 
					@changeDate="changeDate">
				</date-bar>
            </div>
            <div class="count-bar">
                <div>
                    <p class="num color1">{{classCount}}</p>
                    <p><svg class="icon" aria-hidden="true"><use xlink:href="#ixz-banji"></use></svg>&nbsp;班级数</p>
                </div>
                <div>
                    <p class="num color2">{{avgPoint}}</p>
                    <p><svg class="icon" aria-hidden="true"><use xlink:href="#ixz-pingfen"></use></svg>&nbsp;总评分</p>
                </div>
            </div>
        </div>
        <div class="void"></div>
        <div class="card" v-for="(item,index) in list" :key="index">
            <div class="name">{{item.ClassName}} {{item.StudentCount}}人</div>
            <div  class="info">
                <div class="">已上课次：<span class="color1">{{item.FinishedCount}}次</span>&nbsp;&nbsp;(共{{item.CourseCount}}次)</div>
                <div class="">评分：<span class="color2">{{item.Point}}</span></div>
            </div>
            <div class="info">已上课消：{{item.CourseMoney}}元&nbsp;&nbsp;{{item.Consume}}</div>
        </div>
        <empty-page class="noData-temp" :type="12" text="暂无数据" v-if="list.length == 0"></empty-page>
		<loading class="loading" v-show="isLoading"></loading>
    </scroller-super>
</template>

<script>
	import EmptyPage from 'teacher/components/common/empty-page/empty-page';
	import {QueryTeacherPerformance} from 'teacher/api/achievementReport';

    export default {
        name: "achievement-detail",
        data() {
            return {
                wxTitle: "业绩报表",
				list: [],
                avgPoint: 0.00,
                classCount: 0,
                quickDateIndex: -1,
				isLoading: true,
                query: null,
				pagingOption: {
					api: QueryTeacherPerformance,
					params: {
                        emplist: '',  //员工列表：不传代表所有，
                        sdate: app.tool.getDatesByIndex(3).sdate,  //开始时间 (可不传)
                        edate: app.tool.getDatesByIndex(3).edate,  //结束时间 (可不传)
                        empName: '',  //搜索字段
                        desc: 1,  //0:升序 1 降序
                        sort: 'Point',  //排序字段
                        isDetail: 1  //明细/汇总标识，1明细，0汇总（必传参数）
					}
				}
            }
        },
        methods: {
            changeDate(obj){
				this.pagingOption.params.sdate = obj.sdate;
				this.pagingOption.params.edate = obj.edate;
				this.quickDateIndex = obj.index;
                this.isLoading = true;
				this.$refs.myScroller.refresh(this.pagingOption.params);
			},
            loadData(ajaxPromise){
				ajaxPromise.then(res => {
					this.isLoading = false;
					if (res.ErrorCode == app.errok) {
						if (res.PageIndex === 1) {
							this.list = [];
						}
						this.list = this.list.concat(res.Data.Data);
                        this.avgPoint = res.Data.TotalData.AvgPoint || '0.00';
                        this.classCount = res.Data.TotalData.ClassCount || 0;
					}
				})
			}
        },
        created() {
            this.query = this.$route.query;
            this.pagingOption.params.emplist = this.query.emplist;
            this.pagingOption.params.sdate = this.query.sdate;
            this.pagingOption.params.edate = this.query.edate;
            this.wxTitle = this.query.empName + ' - 业绩报表';
        },
		components: {
			EmptyPage
		}
    }
</script>