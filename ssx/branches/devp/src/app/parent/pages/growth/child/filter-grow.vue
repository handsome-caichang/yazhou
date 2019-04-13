<!-- 我的成长-筛选 -->
<style lang="scss" scoped>
	
	
	.filter-grow-container {
		.action-sheet {
			@include position-absolute(0, 0, 0, 0);
			z-index: 2;
		}
		.by-type {
			.text {
				display: flex;
				justify-content: space-between;
				font-size: 15px;
				color: rgba(51, 51, 51, 1);
				height: 45px;
				align-items: center;
				padding: 0 15px;
				.icon-xiala {
					width: 9px;
					height: 5px;
				}
			}
			.type-box {
				padding: 0 15px;
				>span {
					display: inline-block;
					width: 48%;
					max-width: 130px;
					height: 31px;
					line-height: 31px;
					background-color: rgba(238, 241, 246, 1);
					border-radius: 100px;
					text-align: center;
					margin-bottom: 10px;
				}
				.active {
					background-color: rgba(26, 151, 242, 1);
					color: #ffffff;
				}
			}
		}
		.by-class {
			font-size: 15px;
			color: rgba(51, 51, 51, 1);
			display: flex;
			justify-content: space-between;
			width: 86%;
			height: 40px;
			line-height: 40px;
			padding: 0 5px 0 0;
			position: relative;
			// border-bottom: 1px solid #e0e5ee;
			margin: 0 auto;
			@include border-bottom;
			.class-name {
				@include ellipsis-single;
				color: rgba(26, 151, 242, 1);
				max-width: 70%;
			}
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
	}
</style>

<template>
	<div class="filter-grow-container">
		<action-sheet 
			class="action-sheet" 
			v-show="opened" 
			:position="position" 
			:scrollerStyle="scrollerStyle" 
			@close="closeClassAction" 
			ref="filterGrowAS">
			<!-- 通过类型筛选 -->
			<div class="by-type">
				<span class="text">类型
                <svg class="icon icon-xiala" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                </svg>
            </span>
				<div class="type-box">
					<span class="type-item" :class="{'active': itemFlag.flag1}" @click="chooseType(1)">只看图片</span>
					<span class="type-item" :class="{'active': itemFlag.flag2}" @click="chooseType(2)">只看课堂评价</span>
					<span class="type-item" :class="{'active': itemFlag.flag3}" @click="chooseType(3)">只看作业</span>
				</div>
			</div>

			<!-- 选择班级 -->
			<div class="by-class" @click="selectClass">
				<span>选择班级</span>
				<span class="class-name">
                <span>{{ className }}</span>
				<span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </span>
				</span>
			</div>

			<!-- 重置-确定 -->
			<div slot="footer" class="bottom-fixed-button">
				<span class="flex-item-span" @click="reset">重置</span>
				<span class="flex-item-span" @click="ok">确定</span>
			</div>
		</action-sheet>
		
		<!-- 选择学生列表 -->
		<StudentClass
			:opened.sync="open"
			:checkList="list"
			@getStudentList="getStudentList">
		</StudentClass>
	</div>
</template>

<script>
	import { getGrowthList } from "parent/api/growth";
	import StudentClass from "./class-list";
	
	export default {
		name: "filter-grow",
		mixins: [app.mixin.popupWindowRouteMixin],
		props: {
			opened: {
				type: Boolean,
				default: false
			},
			position: {
				type: String,
				default: "sideRight"
			}
		},
		data() {
			return {
				className: "",
				list: null,
				open: false,
				tempList: null,
				classids: [],
				querytype: 0,
				itemFlag: {
					flag1: false,
					flag2: false,
					flag3: false
				},
				scrollerStyle: {
					backgroundColor: "#fff"
				},
				isSelect: false
			};
		},
		methods: {
			closeClassAction() {
				this.$emit("update:opened", false);
			},
			chooseType(querytype) {
				// 1.图片， 2.只看课堂评价，3，只看作业
				if(querytype === 1) {
					this.itemFlag.flag2 = false;
					this.itemFlag.flag3 = false;
					this.itemFlag.flag1 = !this.itemFlag.flag1;
					querytype = !this.itemFlag.flag1 ? 0 : querytype;
				} else if(querytype === 2) {
					this.itemFlag.flag1 = false;
					this.itemFlag.flag3 = false;
					this.itemFlag.flag2 = !this.itemFlag.flag2;
					querytype = !this.itemFlag.flag2 ? 0 : querytype;
				} else if(querytype === 3) {
					this.itemFlag.flag1 = false;
					this.itemFlag.flag2 = false;
					this.itemFlag.flag3 = !this.itemFlag.flag3;
					querytype = !this.itemFlag.flag3 ? 0 : querytype;
				}
				this.querytype = querytype;
			},
			selectClass() {
				this.open = true;
			},
			reset() {
				this.itemFlag.flag1 = false;
				this.itemFlag.flag2 = false;
				this.itemFlag.flag3 = false;
				this.classids = [];
				this.className = "";

				this.querytype = 0;
				this.setParams();
			},
			ok() {
				this.isSelect = true;
				this.$emit("update:opened", false);
				this.setParams();
			},
			setParams() {
				this.$emit("ok", {
					querytype: this.querytype,
					classids: this.classids,
				});
			},
			getStudentList(item) {
				let _str = [],
					_idArr = [];
				item.list.forEach(item => {
					if(item.checked) {
						_str.push(item.name);
						_idArr.push(item.id);
					}
				});
				this.className = _str.join(",");
				// this.classid = _idArr.join(",");
				this.classids = [..._idArr];
			}
		},
		watch: {
			opened(newVal) {
				// 选择班级后如果没有点击确定，下次进入时清空选择
				!newVal && !this.isSelect ? this.className = '' : this.className = this.className;
				this.isSelect = false;
			}
		},
		components: {
			StudentClass
		}
	}
</script>