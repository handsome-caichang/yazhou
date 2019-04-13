<style lang="scss" scoped>
	
	
	.depart-tree-base {
		@include position-absolute;
		.nav-bar {
			height: 30px;
			
			@include flex-center;
			justify-content: flex-start;
			padding: 0 15px;
			.nav-item {
				@include flex-between;
				.split-line {
					height: 18px;
					width: 0;
					border-right: 1px solid #999;
					margin: 0 9px;
				}
				.active {
					color: #1E88F5;
				}
				.nav-item-name {
					/*max-width: 100px;*/
					@include ellipsis-single;
				}
			}
		}
		.router-scroller{
			height:30px;
			background: #EEF1F6;
		}
		
		.scroller {
			@include position-absolute(30px);
		}
	}
</style>

<style>
	.depart-tree-base .router-scroller .scroll-area{
		display:inline-block;
		/*position:absolute;*/
	}
</style>

<!--储存选择的员工,控制层级跳转.面包屑导航,搜索-->
<template>
	<div class="depart-tree-base">
		<!--面包屑导航-->
		<scroller-base :data="recordRouter" :options="{scrollX:true,scrollY:false,scrollbars:false}" class="router-scroller" ref="routerScroller">
			<div class="nav-bar" @click="changeToRouter" ref="navbar">
				<div v-for="(item,index) in recordRouter" class="nav-item" :data-rindex="index" :key="item.data.id">
					<div v-show="index>0" class="split-line"></div>
					<div class="nav-item-name" :class="{active:index == recordRouter.length-1}" :data-rindex="index">{{item.title}}</div>
				</div>
			</div>
		</scroller-base>
		<scroller-base :data="department" class="scroller" ref="scroller">
			<department-tree-template 
				:department="department" 
				:type="type" 
				:chosenEmpList="chosenEmpList" 
				@selectDepart="selectDepart" 
				@selectEmp="selectEmp">
			</department-tree-template>
		</scroller-base>
	</div>
</template>

<script>
	import DepartmentTreeTemplate from './children/department-tree-template';
	export default {
		name: "department-tree-base",
		data() {
			return {
				department: {
					departList: [],
					emps: []
				},
				recordRouter: [], //用于记录层级信息.
				opened: false,
			}
		},
		props: {
			departmentAll: {
				type: Object
			},
			type: {
				type: Number,
				default: 0,
			},
			chosenEmpList: {
				type: Array,
			}
		},
		methods: {
			selectDepart(item, index) {
				this.recordRouter.push({
					data: item,
					title: item.name
				});
				this.department = item;
				this.$nextTick(() => {
					//定位到最上面
					this.$refs.scroller.scroller.scrollTo(0, 0);
					
					//导航条定位到最后面
					this.$refs.routerScroller.scroller.refresh();
					this.$refs.routerScroller.scroller.scrollTo(this.$refs.routerScroller.scroller.maxScrollX,0,100);
				})

			},
			backReturn() {
				if(this.recordRouter.length > 1) {
					this.recordRouter.pop();
					let obj = this.recordRouter[this.recordRouter.length - 1];
					this.department = obj.data;
					
					//TODO 返回的时候定位到原先的滚动位置.
				}
			},
			//通过面包屑点击定位到某一层.
			changeToRouter(event) {
				let rindex = event.target.dataset.rindex;
				if(rindex !== undefined) {
					this.recordRouter = this.recordRouter.slice(0, +rindex + 1);
					let obj = this.recordRouter[this.recordRouter.length - 1];
					this.department = obj.data;
					this.$nextTick(() => {
						this.$refs.scroller.scroller.scrollTo(0, 0);;
					})
				}
			},
			selectEmp(emp) {
				this.$emit("selectEmp", emp);
			}
		},
		watch: {
			departmentAll(obj) {
				if(obj) {
					this.department = obj;
					this.recordRouter = [{
						data: obj,
						title: '当前系统'
					}];
				}
			}
		},
		components: {
			DepartmentTreeTemplate
		}
	}
</script>