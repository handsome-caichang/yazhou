/*
 * @Author: Sa 
 * @Date: 2017-12-20 11:03:51 
 * @Last Modified by: Customer
 * @Last Modified time: 2018-01-17 10:44:30
 * @Descript: 选择组件（单选，复选）
 */
<style lang="scss" scoped>
	
	
	.hasHead {
		top: 60px;
	}
	.student-item {
		height: 60px;
		@include border-top;
		background: #ffffff;
		padding-left: 12px;
		padding-right: 12px;
		display: flex;
		align-items: center;
		.student-name {
			font-size: 15px;
			color: #333333 100%;
			@include ellipsis-single;
		}
	}
	.class-name {
		height: 60px;
		line-height: 60px;
		text-align: center;
		font-size: 16px;
		padding-left: 12px;
		padding-right: 12px;
		.ipt-class-name {
			border: 1px solid rgba(0, 0, 0, 0.2);
			height: 40px;
			border-radius: 3px;
		}
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
		@include border-top;
		font-size: 15px;
		.flex-item-span {
			display: inline-block;
			width: 49%;
			height: 100%;
			line-height: 48px;
			text-align: center;
			&:last-child {
				min-width: 70px;
				color: #fff;
				background: rgba(30, 136, 245, 1);
			}
		}
	}
	.class-list,
	.action-sheet {
		@include position-absolute;
		z-index: 2;
	}
	.noData-temp {
		@include position-absolute;
	}
</style>

<template>
	<action-sheet
		v-if="opened"
		ref="classList"
		class="action-sheet"
		:data="list"
		:position="position"
		:scrollerConfig="scrollerConfig"
		@loadData="loadData"
		@close="closeCheckedAction">
		<div slot="header" class="class-name">
			<input class="ipt-class-name" type="text" placeholder="请输入名称" v-model="iptClassName">
		</div>
		<div v-for="(item, key) in list" :key="item.ID" class="student-item" @click="itemChecked(item, key, $event)">
			<span>
				<svg class="icon icon-duoxuan-weixuanze" aria-hidden="true">
					<use :xlink:href="!item.checked === true ? '#icon-duoxuan-weixuanze':'#icon-duoxuan'"></use>
				</svg>
			</span>
			<span class="student-name">{{item.ClassName}}</span>
		</div>
		<empty-page class="noData-temp" :type="1001" v-if="list.length == 0"></empty-page>
		<div slot="footer" class="bottom-fixed-button">
			<span class="flex-item-span" @click="reset">重置</span>
			<span class="flex-item-span" @click="ok">确定<!-- ({{chooseNum}}) --></span>
		</div>
		<div class="loading" v-show="isLoading"></div>
	</action-sheet>
</template>

<script>
	import {getStudentClass} from "parent/api/growth";
	import EmptyPage from 'parent/components/common/empty-page/empty-page';
	// import ActionSheetSuper from "./actionsheet-super";
	
	export default {
		name: "StudentClass",
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
				total: 0, // 总数
				scrollerConfig: {
					tag: 'super',
					type: 2,
					pagingOption: {
						api: getStudentClass,
						params: {
							className: "",
							queryType: 0,
							PageIndex: 1,
							PageSize: 40
						}
					}
				},
				iptClassName: "",
				params: {
					className: "",
					PageIndex: 1
				},
				list: [],
				isLoading: true
			};
		},
		methods: {
			loadData(promise) {
				let _list = []
				promise.then(res => {
					this.isLoading = false;
					if(res.ErrorCode === 200) {
						_list = [].concat(res.Data);
						_list.forEach(item => {
							item.checked = false;
						});
						this.list = res.PageIndex === 1 ? [].concat(_list) : [].concat(this.list, _list);
					}
				});
			},
			// 关闭接收人面板
			closeCheckedAction() {
				this.$emit("update:opened", false);
			},
			ok() {
				this.closeCheckedAction();
				this.$emit("getStudentList", {
					chooseNum: this.chooseNum,
					list: app.tool.clone(this.list)
				});
			},
			reset() {
				this.initClass();
			},
			initClass() {
				// this.chooseNum = 0;
				let _list = [];
				getStudentClass({
					className: "",
					PageIndex: 1,
					PageSize: 20
				}).then(res => {
					if(res.ErrorCode === 200) {
						_list = [].concat(res.Data);
						_list.forEach(item => {
							item.checked = false;
						});
						this.list = [].concat(_list);
					}
				});
			},
			itemChecked(item, key, event) {
				// 选中或取消选中
				this.list[key].checked = !this.list[key].checked;
				// 修改选中数量
				// this.getChooseNum();
			},
			getChooseNum() {
				var _chooseNum = 0;
				this.list.forEach(item => {
					if(item.checked) {
						_chooseNum = _chooseNum + 1;
					}
				});
				this.chooseNum = _chooseNum;
			}
		},
		watch: {
			checkList(newVal) {
				this.list = app.tool.clone(this.checkList);
				this.getChooseNum();
			},
			iptClassName(newVal, oldVal) {
				// 设置参数
				this.params.className = newVal;
				this.params.PageIndex = 1;

				this.$refs.classList.$refs.scroller.refresh(this.params);
			}
		},
		components: {
			// ActionSheetSuper,
			EmptyPage
		}
	}
</script>