<!--查看通知的学生列表(已读未读)-->
<style scoped lang="scss">
	
	
	.notice-students-list {
		color: $color-3;
		background: $color-assist-1;
		.header {
			height: 40px;
			line-height: 40px;
			text-align: center;
			font-size: $fs-normal-x;
			color: $color-6;
			@include ellipsis-single;
			padding: 0 12px;
		}
		.scroller {
			@include position-absolute(40px);
			overflow: hidden;
		}
		.body {
			.student {
				position: relative;
				background-color: $color-white;
				height: 60px;
				width: 100%;
				padding: 0 20px;
				@include border-bottom;
				@include flex-between;
				.info {
					@include flex-center;
					.photo {
						width: 40px;
						height: 40px;
						border-radius: 100%;
						margin-right: 15px;
                        background-color: #eef1f6;
                        @include background-img;
                        border: 1px solid #ffffff;
					}
					.stu-name {
						display: inline-block;
						width: 120px;
						font-size: 15px;
						padding-right: 5px;
						@include ellipsis-single;
					}
				}
				.read {
					font-size: $fs-small-x;
					.hasRead {
						color: $color-9;
					}
					.notRead {
						color: $color-primary;
					}
				}
			}
		}
	}
</style>

<template>
	<div class="notice-students-list">
		<!--标题-->
		<div class="header">
			<span>{{ shiftName}}</span>
		</div>
		<!--学员情况列表-->
		<div class="body">
			<scroller-base class="scroller" :data="list">
				<div class="student" v-for="item in list">
					<!--头像和名字-->
					<div class="info">
                        <span class="photo" :style="'background-image:url('+ item.photo +')'"></span>
						<div class="stu-name">{{ item.name }}</div>
					</div>
					<!--已读未读-->
					<div class="read">
						<span v-if="item.isRead == 1" class="hasRead">已读</span>
						<span v-else class="notRead">未读</span>
					</div>
				</div>
			</scroller-base>
		</div>

		<!--加载中-->
		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
	export default {
		name: 'homework-students-list',
		data() {
			return {
				wxTitle: '通知查看情况',
				isLoading: false,
				shiftName: "",
				list: [],
			}
		},
		computed: {
			getList() {
				return app.ls.getStorage('studentlist');
			},
			getShiftName() {
				return this.getList.shiftName;
			},
			getStudentList() {
				return this.getList.studentList;
			}
		},
		mounted() {
			console.log(app.ls.getStorage('studentList'))
			this.shiftName = this.getShiftName;
			this.list.push(...this.getStudentList)
		},
	}
</script>