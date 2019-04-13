<!--修改上课内容和进度弹窗组件-->
<style scoped lang="scss">
	
	
	$padding:15px;
	.content-container {
		@include position-absolute;
		z-index: 9999990;
		color: #333;
		.title-bar {
			height: 40px;
			padding: 0 $padding;
			@include flex-between;
			&.title-schedule {
				border-bottom: 1px solid #e6e4e4;
				>.schedule-content {
					flex: 1;
					margin-left: 20px;
				}
			}
		}
		.content-box {
			padding: 0 $padding;
			.text-area {
				font-size: 15px;
				color: $color-6;
				width: 100%;
				padding: 0;
				height: 300px;
				resize:none;
				overflow-y:auto;
			}
		}
		.enter-btn {
			width: 100%;
			height: 50px;
			color: $color-white;
			background: #1E88F5;
			@include flex-center;
			font-size: 16px;
			&.half {
				width: 50%;
			}
		}
		.footer {
			@include flex-between;
			>div:first-child {
				background: $color-white;
				color: $color-3;
				border: 1px solid #EEF1F6;
			}
		}
	}
	.schedule-container {
		@include position-absolute;
		z-index: 9999991;
		color: #333;
	}
</style>

<template>
	<div>
		<action-sheet 
			class="content-container" 
			v-show="opened" 
			:position="'sideRight'" 
			:fullParent="true" 
			ref="actionsheet" 
			@close="close" 
			:data="content">
			<div class="title-bar title-schedule" v-show="schedule.length>0" @click="showSchedule(true)">
				<div>上课进度</div>
				<div class="schedule-content" v-if="schedule.length > 0">{{schedule[selectIndex].Title}}</div>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-youjiantou"></use>
				</svg>
			</div>
			<div class="title-bar">上课内容</div>

			<div class="content-box">
				<textarea class="text-area" placeholder="500字符以内" v-model="content" maxlength="500"
				@touchstart = "app.area.start($event)"
				@touchmove = "app.area.move($event)"
				@touchend = "app.area.end($event)">
				</textarea>
			</div>
			<div slot="header" class="enter-btn">上课内容</div>
			<div slot="footer" class="footer">
				<div class="enter-btn half" @click="close">取消</div>
				<div class="enter-btn half" @click="submit">确定</div>
			</div>
		</action-sheet>
		<schedule 
			:schedule="schedule" 
			:opened="opendSchedule" 
			@update:opened="showSchedule" 
			:selectIndex="selectIndex" 
			@selectChapter="selectChapter" 
			ref="schedule">
		</schedule>
	</div>
</template>

<script>
	
	
	import Schedule from './course-schedule.vue';

	export default {
		name: "course-content",
		mixins: [app.mixin.popupWindowRouteMixin],
		data() {
			return {
				opened: false,
				opendSchedule: false,
				content: '',
				schedule: [],
				_resolve: null,
				selectIndex: 0
			}
		},
		methods: {
			submit() {
				let schedule = this.schedule[this.selectIndex] || {
					ID: "00000000-0000-0000-0000-000000000000",
					ShiftAmount: "00000000-0000-0000-0000-000000000000"
				}
				this._resolve({
					content: this.content,
					schedule,
					index: this.selectIndex - 1
				});
				this.close();
			},
			show(obj) { //obj.content(内容),	obj.schedule(数组),	obj.shiftAmount(原先的进度)
				this.opened = true;
				this.opendSchedule = false;
				this.content = obj.content || '';
				this.schedule = obj.schedule || [];
				let shiftAmount = obj.shiftAmount === undefined ? '00000000-0000-0000-0000-000000000000' : obj.shiftAmount; //本节课的课程进度
				this.selectIndex = 0;

				//给进度增加一个"空"的元素
				if(obj.schedule && obj.schedule.length > 0) {
					let empty = {
						Title: '<空>',
						Content: '',
						ID: "00000000-0000-0000-0000-000000000000",
						ShiftAmount: "00000000-0000-0000-0000-000000000000"
					}
					this.schedule = [empty, ...obj.schedule];
					this.schedule.forEach((item, index) => {
						if(item.ShiftAmount == shiftAmount) {
							this.selectIndex = index;
						}
					});
				} else {
					this.schedule = [];
				}

				this.$nextTick(() => {
					this.$refs.actionsheet.refresh();
				})
				return new Promise((resolve) => {
					this._resolve = resolve
				});
			},
			showSchedule(bool) {
				this.opendSchedule = bool;
				this.$nextTick(() => {
					this.$refs.schedule.refresh();
				})
			},
			selectChapter(index) {
				this.selectIndex = index;
				this.content = this.schedule[index].Content;
			}
		},
		components: {
			
			Schedule
		}
	}
</script>