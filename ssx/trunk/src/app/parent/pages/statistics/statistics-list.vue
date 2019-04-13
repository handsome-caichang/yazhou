<!-- 上课统计列表 -->
<style scoped lang="scss">
	
	.statistics-list {
		@include position-absolute;
		.statistics-item {
			width: 100%;
			height: 64px;
			padding: 0 12px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #ffffff;
			margin-bottom: 10px;
			.flex-left {
				display: flex;
				flex-direction: column;
				width: 96%;
				justify-content: center;
				.course-name {
					@include ellipsis-single;
					font-size: 16px;
					color: rgba(51, 51, 51, 1);
					margin-bottom: 5px;
				}
				.course-statistics {
					display: flex;
					justify-content: space-between;
					align-items: center;
					>span {
						min-width: 33.333%;
						font-size: 12px;
						color: rgba(102, 102, 102, 1);
						@include ellipsis-single;
					}
					.cyan {
						color: rgba(39, 204, 245, 1);
					}
					.orange {
						color: rgba(255, 170, 32, 1);
					}
				}
			}
		}
	}
	.scroller {
		@include position-absolute;
		background-color: #EEF1F6;
	}
	.noData-temp {
		@include position-absolute;
	}
</style>

<template>
	<div class="statistics-list">
		<scroller-base class="scroller" :data="list">
			<div v-for="item in list" :key="item.id" @click="toDetail(item)" class="statistics-item">
				<!-- <div> -->
					<span class="flex-left">
		                <!-- 课名 -->
		                <span class="course-name">{{item.name}}</span>
						<!-- 上课概览 -->
						<span class="course-statistics">
		                  	<span v-if="app.sysInfo.SSXCourseCountShowAll == 1">购买：{{item.totalAmount}}</span>
							<span v-if="app.sysInfo.SSXCourseCountShowAll == 1">已上课：<span class="cyan">{{item.used}}</span></span>
							<span>剩余：<span class="orange">{{item.remain}}</span></span>
						</span>
					</span>
					<!-- 右箭头 -->
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-youjiantou"></use>
					</svg>
				<!-- </div> -->
				<!-- <div class="void"></div> -->
			</div>
			<empty-page class="noData-temp" :type="8" v-if="list.length == 0"></empty-page>
		</scroller-base>
		<loading v-show="isLoading"></loading>
	</div>
</template>

<script>
	import {processGet} from "parent/api/common";
	import EmptyPage from 'parent/components/common/empty-page/empty-page';

    /**@description
     * 购买课次和已上课次：配置项SSXCourseCountShowAll（师生信家长端上课统计是否显示购买课次和已上课次）:0否1是
     */
	export default {
		name: "statistics",
		data() {
			return {
				wxTitle: '上课统计',
				list: [],
				isLoading: true
			}
		},
		created() {
			processGet({
				pname: 'courseCount'
			}).then(res => {
				this.isLoading = false;
				if(res.errcode === app.errok) {
					this.list = res.data;
				}
			})
		},
		methods: {
			toDetail(item) {
				// 截取单位中的数值,如果有上课记录才跳转页面
				if(item.used.replace(item.unit, '') > 0) {
					this.$router.push({path: `/StatisticsDetail/${item.shiftId}`, components: 'StatisticsDetail'});
				} else {
					app.toast('info','该课程暂无上课记录。');
					return;
				}
			}
		},
		components: {
			EmptyPage
		}
	}
</script>