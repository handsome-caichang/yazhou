<style scoped lang="scss">
	
	
	.add-students {
		@include position-absolute;
		z-index: 9999990;
		.search-container {
			background: $color-white;
			height: 45px;
			padding: 7px 15px 9px;
			position: relative;
			margin-bottom: 5px;
			.search-box {
				height: 28px;
				position: relative;
				input {
					border: 1px solid #EEF1F6;
					border-radius: 28px;
					height: 28px;
					width: 100%;
					outline: none;
					padding-left: 27px;
					padding-right: 52px;
				}
				.icon-search {
					position: absolute;
					top: 8px;
					left: 12px;
					font-size: 12px;
				}
				.btn {
					height: 28px;
					border-radius: 28px;
					background: #EEF1F6;
					width: 50px;
					@include flex-center;
					position: absolute;
					right: 0;
					top: 0;
				}
				.clear-icon {
					position: absolute;
					top: 0px;
					right: 50px;
					width: 20px;
					height: 28px;
					@include flex-center;
					.icon {
						width: 13px;
						height: 13px;
					}
				}
			}
		}
		.students-list-container {
			background: $color-white;
			.student-item {
				height: 76px;
				@include flex-between;
				padding: 0 15px;
				.check-box {
					width: 18px;
					line-height: 76px;
					height: 100%;
					.icon {
						width: 18px;
						height: 18px;
					}
				}
				.info-desc {
					margin-left: 15px;
					flex: 1;
					.student-info1 {
						margin-bottom: 15px;
						>span:first-child {
							font-size: 16px;
							color: $color-3;
							margin-right: 5px
						}
						>span:nth-child(2) {
							font-size: 11px;
							color: $color-9;
							margin-right: 5px;
						}
						>span:last-child {
							font-size: 12px;
							color: #8B572A;
						}
					}
					.student-info2 {
						@include flex-between;
						>span {
							font-size: 12px;
							color: $color-6;
						}
					}
				}
			}
		}
		.operate-container {
			height: 50px;
			background: $color-white;
			border-top: 1px solid #EEF1F6;
			@include shadow-base;
			@include flex-between;
			justify-content: flex-end;
			>div.btn {
				height: 28px;
				border-radius: 28px;
				background: #1E88F5;
				margin-right: 15px;
				padding: 0 15px;
				color: $color-white;
				@include flex-center;
			}
		}
		.empty {
			@include position-absolute;
			background-color: $color-white;
		}
	}
</style>

<style>
	.add-students .actionsheet-wrap .as-box .header {
		background-color: #EEF1F6;
	}
</style>

<template>
	<div v-show="opened">
		<action-sheet class="add-students" :position="'sideRight'" :fullParent="true" ref="actionsheet" @close="close" :data="list" @loadData="loadData" @loadFirst="loadFirst" :scrollerConfig="scrollerConfig">
			<div slot="header" class="search-container">
				<div class="search-box">
					<input type="text" placeholder="输入学生姓名，学号，电话" v-model="keyword" />
					<svg class="icon icon-search" aria-hidden="true">
						<use xlink:href="#icon-sousuo1"></use>
					</svg>
					
					<div class="btn" @click="search">
						搜索
					</div>
					
					<div class="clear-icon" @click="clearKeyWord" v-show="keyword!=''">
						<svg class="icon">
							<use xlink:href="#icon-sousuowenzishanchu"></use>
						</svg>
					</div>
					
				</div>
			</div>
			<div class="students-list-container" @click="choose">
				<div class="student-item" v-for="(item,index) in list" :key="item.ID" :data-index="index">
					<div class="check-box">
						<svg class="icon" aria-hidden="true">
							<use :xlink:href="item.isCheck ? '#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
						</svg>
					</div>
					<div class="info-desc">
						<div class="student-info1">
							<span>{{item.name}}</span>
							<span>{{item.serial}}</span>
							<span>{{item.campusName}}</span>
						</div>
						<div class="student-info2">
							<span>年级：{{item.grade}}</span>
							<span>手机号码：{{item.smstel}}</span>
						</div>
					</div>
				</div>
				<empty-page class="empty" :type="1001" v-show="list.length == 0"></empty-page>
				<loading class="loading" v-show="isLoading"></loading>
			</div>
			<div slot="footer" class="operate-container">
				<div class="btn" @click="postOneCourse">仅上这节课</div>
				<div class="btn" @click="postAddToClass" v-if="CFG.cfgAddClass">加入此班</div>
			</div>
		</action-sheet>
		<submit-info ref="submitInfo"></submit-info>
	</div>
</template>

<script>
	import submitInfo from "./submit-info.vue";
	import EmptyPage from 'teacher/components/common/empty-page/empty-page';
    import { getstudentinfosforwx, studentinfocourse, opclassstudent } from "teacher/api/course-attendance";
    
	export default {
		name: "add-students",
		mixins: [app.mixin.popupWindowRouteMixin],
		data() {
			return {
				opened: false,
				isLoading: false,
				list: [],
				keyword: '',
				para: {},
				CFG: {
					cfgAddClass: true,//app.sysInfo.hidemorestudentsonclass == '0', //是否显示加入此班.0隐藏,1不隐藏
					cfgQuery: '1',//app.sysInfo.enablestudentqueryempty, //是否可以用空字符串查询,0和2都不可以,1可以.
				},
				scrollerConfig: {
					tag: 'super',
					type: 2,
					pagingOption: {
						autoLoadFirst: false,
						params: {},
						api: getstudentinfosforwx,
					}
				},
				_resolve: null,
				chosenList: [],
			};
		},
		methods: {
			show(para) {
				this.para = para;
				this.opened = true;
			},
			clearKeyWord() {
				this.keyword = '';
			},
			search() {
				if (this.CFG.cfgQuery == '1' && this.keyword.length === 0){
					app.toast("info","请输入需要查询学员的姓名/学号/电话。");
					return;
				}
				
				if(this.CFG.cfgQuery != '1') {
					let result = app.tool.checkQueryLength(this.keyword.trim());
					if(result) {
						app.toast("info", result);
						return;
					}
				}
				let params = {
					query: this.keyword,
					/*campusFlag: 1,
					signStatus: -1,
					status: 1,
					sort: 'Name'*/
				};
				this.isLoading = true;
				this.list = [];
				this.$refs.actionsheet.$refs.scroller.refresh(params);
			},
			refresh() {
				this.$refs.actionsheet.refresh();
			},
			loadData(promise) {
				if (this.CFG.cfgQuery == '1' && this.keyword.length === 0){
					return;
				}
				promise.then(res => {
					res.data.forEach(item => {
						item.isCheck = false;
					});
					this.list.push(...res.data);
				})
			},
			loadFirst(promise) {
				if (this.CFG.cfgQuery == '1' && this.keyword.length === 0){
					return;
				}
				promise.then(res => {
					res.data.forEach(item => {
						item.isCheck = false;
					});
					this.list = res.data;
					this.isLoading = false;
				})
			},
			choose(event) {
				let target = event.target,
					i = 0;
				while(i < 5 && !(target.dataset && target.dataset.index)) {
					i++;
					target = target.parentElement;
				}
				if(target.dataset && target.dataset.index) {
					let index = target.dataset.index;
					this.list[index].isCheck = !this.list[index].isCheck;
				}
			},
			//仅上这节课
			postOneCourse() {
				let params = {
					courseid: this.para.id,
					studentids: this.list.filter(item => item.isCheck).map(item => item.id),
					updatetime:this.para.updatetime,
				}
				if(params.studentids.length == 0) {
					app.toast('info', '请选择学员。');
					return;
				}
				studentinfocourse(params).then(res => {
					if(res.result.code == 200) {
						this.opened = false;
						this.$emit("addSucc");
					} else {
						app.toast('error', res.result.msg);
					}
				})
			},
			//加入此班.
			postAddToClass() {
				let	params = {
						classid: this.para.classId,
						studentids: this.list.filter(item => item.isCheck).map(item => item.id),
						indate: app.filters.formatDatetime(new Date(),'yyyy-MM-dd'),
						optype:1,
					}
				if(params.studentids.length == 0) {
					app.toast('info', '请选择学员。');
					return;
				}
				this.$refs.submitInfo.openSubmitInfo(2, params).then(result => {
					if(result.type == 'confirm') {
						params.reason = result.text;
						params.date = params.indate;
						delete params.indate;
						opclassstudent(params).then(res => {
							if(res.result.code == 200) {
								this.opened = false;
								this.$emit("addSucc");
							} else {
								app.toast('error', res.result.msg);
							}
						});
					}
				});
			}
		},
		components: {
			EmptyPage,
			submitInfo
		}
	}
</script>