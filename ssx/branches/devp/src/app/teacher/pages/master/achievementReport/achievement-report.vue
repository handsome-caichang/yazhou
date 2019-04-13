<!-- 业绩报表-第一层 -->
<style scoped lang="scss">
    .page {
        .header {
            .filter-bar {
				padding: 11px 15px;
                @include flex-between;
            }
            .search-bar {
                padding: 0px 12px;
                input {
                    height: 40px;
                    border-radius: 3px;
                    border: 1px solid rgba(0,0,0,.2);
                }
            }
        }
        .body {
			position: absolute;
			top: 100px;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: $color-white;
            .card {
                display: flex;
                padding: 0 12px;
                border-bottom: 1px solid #eaeaea;
                .card-left {
                    width: 48px;
                    height: 48px;
                    margin: auto 0;
                    @include background-img(false,cover);
                }
                .card-center {
                    flex: 1;
                    margin: 5px 12px;
                    .name {
                        font-size: 16px;
                        line-height: 30px;
                        @include ellipsis-single;
                    }
                    .info {
                        display: flex;
                        font-size: 14px;
                        line-height: 20px;
                        color: $color-9;
                        >div:last-child {
                            padding-left: 10px;
                        }
                    }
                }
                .card-right {
                    margin: auto 0;
                    font-size: 16px;
                    @include flex-center(column);
                    svg {
                        margin-right: 1px;
                    }
                    .score {
                        font-size: 14px;
                        color: $color-9;
                    }
                }
            }
        }
        .loading {
			top: 100px;
        }
        .noData-temp{
			@include position-absolute;
		}
    }
</style>

<template>
    <div class="page">
        <div class="header">
            <div class="filter-bar">
                <date-bar 
					:sdate="pagingOption.params.sdate" 
					:edate="pagingOption.params.edate" 
					:index="quickDateIndex" 
					@changeDate="changeDate">
				</date-bar>
                <div @click="sort">排序<svg class="icon" aria-hidden="true"><use :xlink:href="sortDesc?'#ixz-paixu1':'#ixz-paixu'"></use></svg></div>
            </div>
            <div class="search-bar">
                <input type="text" :placeholder="placeholderTxt" v-model="empName"/>
            </div>
        </div>
        <scroller-super 
			class="body"
			ref="myScroller"
			:type="2"
			:data="list"
			:pagingOption="pagingOption"
			@loadData="loadData">
			<div v-for="(item,index) in list" class="card" :key="index" @click="goTo(item)">
                <div class="card-left" :style="'background-image:url('+item.Photo+')'"></div>
                <div class="card-center">
                    <div class="name">{{item.TeacherName}}</div>
                    <div class="info">
                        <div>班级：{{item.ClassCount}}</div>
                        <div>人数：{{item.StudentCount}}</div>
                    </div>
                    <div class="info">课消：{{item.CourseMoney}}元 {{item.Consume}}</div>
                </div>
                <div class="card-right">
                    <div>
                        <svg class="icon" aria-hidden="true"><use xlink:href="#ixz-pingfen"></use></svg>
                        <span>{{item.Point}}</span>
                    </div>
                    <div class="score">评分</div>
                </div>
			</div>
			<empty-page class="noData-temp" :type="12" text="暂无数据" v-if="list.length == 0"></empty-page>
		</scroller-super>
        <loading class="loading" v-show="isLoading"></loading>
    </div>
</template>

<script>
	import EmptyPage from 'teacher/components/common/empty-page/empty-page';
	import {QueryTeacherPerformance} from 'teacher/api/achievementReport';

    const sortArr = ['ClassCount','CourseMoney','StudentCount','Point'];
    export default {
        name: "achievement-report",
        data() {
            return {
                wxTitle: "业绩报表",
				list: [],
                quickDateIndex: 3,
                sortType: 3,
                sortDesc: 1,
				isLoading: true,
                empName: '',
				pagingOption: {
					api: QueryTeacherPerformance,
					params: {
                        emplist: '',  //员工列表：不传代表所有，
                        sdate: app.tool.getDatesByIndex(3).sdate,  //开始时间 (可不传)
                        edate: app.tool.getDatesByIndex(3).edate,  //结束时间 (可不传)
                        empName: '',  //搜索字段
                        desc: 1,  //0:升序 1 降序
                        sort: 'Point',  //排序字段
                        isDetail: 0  //明细/汇总标识，1明细，0汇总（必传参数）
					}
				}
            }
        },
        computed: {
            placeholderTxt() {
                return `请输入${app.sysInfo.Title_Teacher}姓名`
            }
        },
        methods: {
            changeDate(obj){
				this.pagingOption.params.sdate = obj.sdate;
				this.pagingOption.params.edate = obj.edate;
				this.quickDateIndex = obj.index;
				this.reload();
			},
            sort() {
                app.sortSheet({
                    list: [{name: '班级个数'},{name: '课消金额'},{name: '人数'},{name: '好评率'}],
                    initType: this.sortType+'-'+this.sortDesc, //排序的下标及正序/倒序
                    title: '排序方式'
                }).then(res => {
                    this.sortType = res.sortType;
                    this.pagingOption.params.sort = sortArr[res.sortType];
                    this.pagingOption.params.desc = this.sortDesc = Number(res.desc);
    				this.reload();
                })
            },
            reload(){
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
						this.list = this.list.concat(res.Data);
					}
				})
			},
            goTo(item){
                var para = app.tool.jsonToQueryStr({
                    emplist: item.TeacherUserID,
                    empName: item.TeacherName,
                    sdate: this.pagingOption.params.sdate,
                    edate: this.pagingOption.params.edate
                });
                this.$router.push({path: `/achievementDetail/${para}`})
            }
        },
        watch: {
            empName(val) {
				this.pagingOption.params.empName = val;
                this.reload();
            }
        },
		components: {
			EmptyPage
		}
    }
</script>