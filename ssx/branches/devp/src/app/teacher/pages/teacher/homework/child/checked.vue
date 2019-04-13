/*
 * @Author: Sa 
 * @Date: 2017-12-20 11:03:51 
 * @Last Modified by: Sa
 * @Last Modified time: 2018-02-24 16:15:49
 * @Descript: 选择组件（单选，复选）
 */
<style lang="scss" scoped>
	
	
	.hasHead {
		top: 60px;
	}
	.noData-temp {
		@include position-absolute;
	}
	.student-item {
		height: 60px;
		@include border-top;
		background: #ffffff;
		padding-left: 12px;
		padding-right: 12px;
		display: flex;
		align-items: center;
		.photo {
			width: 40px;
			height: 40px;
            display: inline-block;
			border-radius: 100px;
			border: 1px solid #ffffff;
			margin-left: 16px;
			margin-right: 12px;
            background-color: #eef1f6;
            @include background-img;
		}
		.student-name {
			font-size: 15px;
			color: #333333 100%;
		}
	}
	
	.class-name {
		height: 60px;
		line-height: 60px;
		text-align: center;
		font-size: 16px;
		background: #eef1f6;
		@include ellipsis-single;
		padding-left: 12px;
		padding-right: 12px;
	}
	
	.icon-duoxuan,
	.icon-duoxuan-weixuanze {
		width: 18px;
		height: 18px;
	}
	
	.bottom-fixed-button {
		height: 48px;
		background: #fff;
		width: 100%;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 12px;
		padding: 12px;
		@include border-top;
		.flex-item-span {
			font-size: 15px;
			&:last-child {
				width: 24.533333%;
				min-width: 70px;
				height: 28px;
				line-height: 28px;
				color: #fff;
				background: rgba(30, 136, 245, 1);
				text-align: center;
				border-radius: 100px;
			}
		}
	}
</style>

<template>
	<action-sheet 
		class="action-sheet" 
		v-show="opened" 
		:data="checkList" 
		:position="position" 
		:fullParent="true"
		@close="close" 
		>
		<div v-if="checkList.length!=0" slot="header" class="class-name">{{header}}</div>
		
		<div v-if="checkList.length!=0"
			v-for="(item, key) in checkList" 
			class="student-item" 
            :key="item.StudentID"
			@click.stop.prevent="itemChecked(item, key, $event)">
			<svg class="icon icon-duoxuan-weixuanze" aria-hidden="true">
				<use :xlink:href="item.checked==false?'#icon-duoxuan-weixuanze':'#icon-duoxuan'"></use>
			</svg>
            <span class="photo" :style="'background-image:url('+ item.photo +')'"></span>
			<span class="student-name">{{ item.studentname }}</span>
		</div>

		<div v-if="checkList.length!=0" slot="footer" class="bottom-fixed-button">
			<span class="flex-item-span" @click="chooseAll">
                <svg class="icon icon-duoxuan-weixuanze" aria-hidden="true">
                	<use :xlink:href="isAll==false?'#icon-duoxuan-weixuanze':'#icon-duoxuan'"></use>
                </svg>全选
            </span>
			<span class="flex-item-span" @click="ok">确定({{chooseNum}})</span>
		</div>

		<!-- 空白页 -->
		<empty-page class="noData-temp" v-if="checkList.length == 0" :type="1001" text="该班级没有学员哦"></empty-page>

	</action-sheet>
</template>

<script>
	import EmptyPage from "teacher/components/common/empty-page/empty-page";
	export default {
		name: "Checked",
		mixins: [app.mixin.popupWindowRouteMixin],
		props: {
			opened: {},
			position: {
				type: String,
				default: "sideRight"
			},
			header: {},
			checkList: {
				type: Array
			}
		},
		data() {
			return {
				checked: false,
				isAll: false,
				chooseNum: 0, // 已选择的数量
				total: 0 // 总数
			};
		},
		methods: {
			ok() {
				// 关闭接收人面板
				this.close();
				let _emitData = app.tool.clone(this.checkList)
				// 返回选择的学生
				this.$emit('getStudentList', {
					chooseNum: _emitData.filter(item => item.checked).length,
					list: _emitData
				});
			},
			chooseAll() {
				// 切换全选状态
				this.isAll = !this.isAll;
				// 全选的数量
				this.isAll ? (this.chooseNum = this.total) : (this.chooseNum = 0);
				// item全选或全不选
				this.checkList.forEach(item => 	this.isAll ? item.checked = true : item.checked = false);
			},
			itemChecked(item, key, event) {
				// 选中或取消选中
				this.checkList[key].checked = !this.checkList[key].checked;
				// 修改选中数量
				this.checkList[key].checked ? ++this.chooseNum :
					(this.chooseNum === 0 ? this.chooseNum = this.chooseNum : --this.chooseNum);
				this.num = this.chooseNum;
				// 是否全选
				this.chooseNum != 0 && this.chooseNum === this.total ? (this.isAll = true) : (this.isAll = false);
			}
		},
		watch: {
			opened() {
				if(this.opened) {
                    // 打开学生列表，充值选择数量和，全选状态
					this.checkList.forEach(item => {
						if(item.checked == true) {
							this.chooseNum++;
						}
					});
					this.total = this.checkList.length;
					this.chooseNum === this.total ? this.isAll = true : this.isAll = false;
				} else {
					this.isAll = false;
					this.chooseNum = 0;
				}
			}
		},
		components: {
			EmptyPage
		}
	};
</script>