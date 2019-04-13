<style lang="scss" scoped>
	
	
	.depart-tree-common {
		@include position-absolute;
		z-index: 9999991;
		background: $color-white;
		.search-bar {
			padding: 0 15px;
			height: 44px;
			background: $color-white;
			@include flex-between;
			.search-box {
				width: calc(100% - 60px);
				height: 100%;
				position: relative;
				@include flex-center;
				input.search-input {
					width: 100%;
					height: 28px;
					border-radius: 28px;
					background: #EEF1F6;
					padding-left: 15px;
					padding-right: 30px;
					outline: none;
					color: $color-6;
				}
				.icon {
					position: absolute;
					right: 10px;
					width: 15px;
					height: 20px;
					bottom: 12px;
				}
			}
			.search-btn {
				margin-left: 10px;
				width: 50px;
				height: 30px;
				border-radius: 30px;
				background: #EEF1F6;
				color: #1E88F5;
				font-size: 13px;
				@include flex-center;
			}
		}
		.depart-container {
			@include position-absolute(44px);
			bottom: 50px;
		}
		.control-bar {
			@include shadow-base;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 50px;
			background: $color-white;
			z-index: 9999992;
			@include flex-between;
			padding: 0 15px;
			@include fs-lh(15);
			color: #1E88F5;
			%btn {
				width: 85px;
				height: 30px;
				border-radius: 30px;
				border: 1px solid #1E88F5;
				@include flex-center;
			}
			.btns-right {
				@include flex-between;
				.pre-page {
					@extend %btn;
					margin-right: 10px;
				}
				.enter-btn {
					@extend %btn;
					background: #1E88F5;
					color: $color-white;
				}
			}
		}
		.edit-emp-sheet {
			@include position-absolute;
			font-size: $fs-normal-x;
			z-index: 9999993;
			.chosen-emp-box {
				padding: 20px;
				min-height: 400px;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				flex-wrap: wrap;
				align-content: flex-start;
				align-items: flex-start;
				.chosen-item {
					width: 25%;
					height: 30px;
					background: #EEF1F6;
					@include fs-lh(12);
					color: $color-3;
					margin-left: 4%;
					margin-right: 4%;
					margin-bottom: 15px;
					@include flex-between;
					padding: 0 5px;
					.chosen-item-name {
						@include ellipsis-single;
						width: calc(100% - 15px);
						text-align: right;
						margin-right: 5px;
					}
					.icon {
						@include fs-lh(14);
					}
				}
			}
		}
	}
</style>

<!--储存选择的员工,控制层级跳转.面包屑导航,搜索-->
<template>
	<div class="depart-tree-common" v-show="opened">
		<!--搜索-->
		<div class="search-bar">
			<div class="search-box">
				<input class="search-input" placeholder="输入姓名搜索" v-model="keyword" />
				<svg class="icon" aria-hidden="true" @click="clearKeyWord" v-show="keyword!=''">
					<use xlink:href="#icon-sousuowenzishanchu"></use>
				</svg>
			</div>
			<div class="search-btn" @click="searchEmp">搜索</div>
		</div>

		<!--部门树和员工-->
		<div class="depart-container">
			<department-tree-base 
				:departmentAll="data" 
				:type="type" 
				ref="treeBase" 
				@selectEmp="selectEmp" 
				:chosenEmpList="chosenEmpList">
			</department-tree-base>
		</div>

		<!--显示已选,上一页,和确定按钮.-->
		<div class="control-bar">
			<!--已选-->
			<div v-if="type == 0"></div>
			<div class="chosen-info" @click="showEdit" v-if="type == 1">
				<span>已选：</span>
				<span v-if="chosenEmpList.length>1">{{chosenEmpList.length}}人</span>
				<span v-else>{{chosenEmpList[0] && chosenEmpList[0].name}}</span>
				<svg class="icon" aria-hidden="true" v-show="chosenEmpList.length>1">
					<use xlink:href="#icon-bianji"></use>
				</svg>
			</div>

			<div class="btns-right">
				<div class="pre-page" @click="prePage" v-show="$refs.treeBase&&$refs.treeBase.recordRouter.length>1">上一页</div>
				<div class="enter-btn" @click="returnData">确定</div>
			</div>
		</div>

		<action-sheet 
			@close="closeEdit" 
			v-show="openedEdit" 
			:data="chosenEmpList" 
			class="edit-emp-sheet" 
			ref="editSheet">
			<div class="chosen-emp-box">
				<div class="chosen-item" @click="deleteEmp" v-for="(item,index) in chosenEmpList" :data-rindex="index" :key="item.id">
					<div class="chosen-item-name">{{item.name}}</div>
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-sousuowenzishanchu"></use>
					</svg>
				</div>
			</div>
		</action-sheet>

		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
	import DepartmentTreeBase from './department-tree-base';
	import Minxin from './children/common-mixin.js';
	import { transformEmpTree, createEmpNode } from './children/tree.js';

	let _tempData = null;
	export default {
		name: "department-tree-common",
		mixins: [Minxin, app.mixin.popupWindowRouteMixin],
		data() {
			return {
				data: {
					departList: [],
					emps: []
				},
				keyword: '',
				chosenEmpList: [],
				_tempEmpList: [],
				type: 0,
				isSearch: false, //是否正在搜索.,
				isLoading: true, //控制加载图标,并且标示是否已从后台加载数据
			}
		},
		methods: {
			initData(data) {
				this.data = (_tempData = transformEmpTree(data.DepartList, data.EmployeeList));
				this._tempEmpList = data.EmployeeList;
			},
			initData2(data,_tempEmpList) {
				
				this.data = (_tempData = data);
				this._tempEmpList = _tempEmpList;
			},
			prePage() {
				this.$refs.treeBase.backReturn();
			},
			selectEmp(item) {
				//单选直接返回.
				if(this.type == 0) {
					this.chosenEmpList.push(item);
					this.returnData();
				} else {
					for(let i = 0; i < this.chosenEmpList.length; i++) {
						if(this.chosenEmpList[i].id === item.id) {
							this.chosenEmpList.splice(i, 1);
							return;
						}
					}
					this.chosenEmpList.push(item);
				}
			},
			searchEmp() {
				if(this.keyword == '') {
					this.data = _tempData;
					return;
				}

				let arr = searchEmpName(this.keyword, this._tempEmpList);
				this.data = {
					departList: [],
					emps: arr
				}
			},
			clearKeyWord() {
				this.keyword = '';
				this.data = _tempData;
			},
			deleteEmp(event) {
				let el = event.target,
					index;
				while(!app.dom.hasClass(el, 'chosen-item') && (el != event.currentTarget) && el) {
					el = el.parentElement;
				}
				if( (index = app.dom.getData(el,'rindex')) !== undefined) {
					this.chosenEmpList.splice(+index, 1);
				}
				if (this.chosenEmpList.length == 0){
					this.closeEdit();
				}
			},
		},
		components: {
			DepartmentTreeBase
		}
	}

	//从list里筛选出所有名字包含name的
	function searchEmpName(name, list) {
		let arr = list.filter((item) => {
			let myname = item.Name ? item.Name : '';
			return myname.indexOf(name) > -1;
		})
		//去除重复的人,判断ID是不是相同
		arr.sort((a,b)=>a.ID > b.ID ? 1 : a.ID === b.ID ? 0 : -1);
		arr = arr.filter((item,index)=>index == 0 || item.ID !== arr[index - 1].ID);

		return arr.map((item) => createEmpNode(item));
	}
</script>