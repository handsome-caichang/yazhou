/*
 * @Author: Sa 
 * @Date: 2017-12-20 11:03:51 
 * @Last Modified by: Sa
 * @Last Modified time: 2018-02-14 16:34:07
 * @Descript: 选择组件（单选，复选）
 */
<style lang="scss" scoped>
	
	
	.hasHead {
		top: 60px;
	}
	.noData-temp {
		@include position-absolute;
	}
	.no-student {
        text-align: center;
        margin-top: 20px;
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
            display: inline-block;
            background-color: #eef1f6;
			width: 40px;
			height: 40px;
			border-radius: 100px;
			border: 1px solid #ffffff;
			margin-left: 16px;
			margin-right: 12px;
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
		:data="tempList" 
		:position="position" 
		:fullParent="true" 
		:maskToClose="false"
		@close="closeCheckedAction">
		<div slot="header" v-if="checkList.length>0" class="class-name">{{header}}</div>

		<div v-if="checkList.length>0"
			 v-for="(item, key) in tempList" 
			 class="student-item" :key="key" 
			 @click.stop="itemChecked(item, $event)">
			<svg class="icon icon-duoxuan-weixuanze" aria-hidden="true">
				<use :xlink:href="item.checked == false ? '#icon-duoxuan-weixuanze' : '#icon-duoxuan'"></use>
			</svg>
            <span class="photo" :style="'background-image:url('+ item.photo +')'"></span>
			<span class="student-name">{{item.StudentName}}</span>
		</div>

		<div slot="footer" class="bottom-fixed-button">
			<span v-if="checkList.length>0" class="flex-item-span" @click="chooseAll">
                <svg class="icon icon-duoxuan-weixuanze" aria-hidden="true">
                	<use :xlink:href="isAll==false?'#icon-duoxuan-weixuanze':'#icon-duoxuan'"></use>
                </svg>全选
            </span>
			<span v-else> </span>
			<span class="flex-item-span" @click="ok">
				<span v-if="checkList.length>0">确定({{chooseNum}})</span>
				<span v-else>取消</span>
			</span>
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
				type: Array,
				default: () => {
					return [];
				}
			}
		},
		data() {
			return {
				checked: false,
				isAll: false,
				chooseNum: 0, // 已选择的数量
				total: 0, // 总数
                tempList: [], // checkList
                acceptList: [],
			};
		},
		methods: {
			// 关闭接收人面板
			closeCheckedAction() {
				this.$emit("update:opened", false);
			},
			ok() {
				this.closeCheckedAction();
				let _list = app.tool.clone(this.tempList);
				this.$emit('getStudentList', {
					chooseNum: this.chooseNum,
					list: _list
				});
			},
			chooseAll() {
				// 切换全选状态
				this.isAll = !this.isAll;
				// 全选的数量
				this.isAll ? (this.chooseNum = this.total) : (this.chooseNum = 0);
				// item全选或全不选
				this.tempList.forEach(item => {
					this.isAll ? item.checked = true : item.checked = false;
				});
			},
			itemChecked(item, event) {
				// 选中或取消选中
				item.checked = !item.checked;
				// 修改选中数量
				item.checked ? ++this.chooseNum :
					(this.chooseNum > 0 ? --this.chooseNum : this.chooseNum = 0);
				// 是否全选
				(this.total != 0 && this.chooseNum == this.total) ? this.isAll = true: this.isAll = false;
			}
		},
		watch: {
            opened(newVal) {
                if(newVal) {
                    this.tempList = app.tool.clone(this.checkList);
                    let _num = 0;
                    this.tempList.forEach(item => {
                        if(item.checked == true) {
                            _num++;
                        }
                    });
                    this.chooseNum = _num;
                    this.total = this.tempList.length;
                    this.total != 0 && this.chooseNum == this.total ? this.isAll = true : this.isAll = false;
                }
            },
			checkList(newVal) {
                this.tempList = app.tool.clone(newVal);
                let _num = 0;
                this.tempList.forEach(item => {
                    if(item.checked == true) {
                        _num++;
                    }
                });
                this.chooseNum = _num;
                this.total = this.tempList.length;
                this.total != 0 && this.chooseNum == this.total ? this.isAll = true : this.isAll = false;
			}
		},
		components: {
			EmptyPage
		}
	};
</script>