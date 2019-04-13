<style lang="scss" scoped>
	
	
	.depart-tree-template {
		$bgcolor: #EEF1F6;
		color: $color-6;
		%same {
			padding: 0 15px;
			@include flex-between;
		}
		.depart-item {
			@extend %same;
			@include fs-lh(15);
			height: 44px;
			background: $color-white;
            border-bottom: 1px solid $bgcolor;
            .depart-name{
                @include ellipsis-single;
                max-width:calc(100% - 50px);
            }
			.depart-count {
				color: $color-3;
			}
		}
		.empTitle {
			@extend %same;
			height: 30px;
			background: $bgcolor;
			@include fs-lh(14);
			color: $color-6;
			.check-all {
				padding: 5px 5px;
				color: #1E88F5;
			}
		}
		.emp-item {
			@extend %same;
			height: 60px;
			@include fs-lh(15);
			.emp-info {
				@include flex-between;
				.emp-photo {
					@include background-img;
					background-color: #EEF1F6;
					height: 40px;
					width: 40px;
					border-radius: 50%;
					margin-right: 15px;
					border:1px solid #fff;
				}
				.emp-name {
					width: 200px;
					@include ellipsis-single;
				}
			}
			.icon {
				width: 18px;
				height: 18px;
			}
		}
	}
</style>

<!--控制当前级层的部门和员工显示(选择,全选)-->
<template>
	<div class="depart-tree-template">
		<!--子部门-->
		<div @click="selectDepart">
			<!-- @click="selectDepart(item,index)  -->
			<div v-for="(item,index) in department.departList" :key="item.id" :data-rindex="index" class="depart-item">
				<div class="depart-name">{{item.name}}</div>
				<div class="depart-count">
					{{item.empsTotal}}
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-youjiantou"></use>
					</svg>
				</div>
			</div>
		</div>

		<div class="empTitle" v-show="department.emps && department.emps.length>0">
			<div>其他人员({{department.emps.length}}人)</div>
			<div v-if="type == 1" class="check-all" @click="chooseAll">
				全选
			</div>
		</div>

		<div @click="chooseEmp">
			<!--当前目录的员工-->
			<div v-for="(item,index) in department.emps" class="emp-item" :data-rindex="index" :key="item.id">
				<div class="emp-info">
					<div class="emp-photo" :style="'background-image:url('+item.photo+')'"> </div>
					<div class="emp-name">{{item.name}}</div>
				</div>
				<div v-if="type == 1">
					<svg aria-hidden="true" class="icon">
						<use :xlink:href="existEmp(item.id)? '#icon-duoxuan' : '#icon-duoxuan-weixuanze'"></use>
					</svg>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			department: {
				type: Object,
				default: function() {
					return {
						departList: [],
						emps: []
					};
				}
			},
			type: { //多选还是单选,默认单选(0),多选为1
				type: Number,
				default: 0,
			},
			chosenEmpList: {
				type: Array
			}
		},
		data() {
			return {
				chosenAll: false
			}
		},
		methods: {
			selectDepart(event) {
				let el = event.target;
				while(!app.dom.hasClass(el, 'depart-item') && (el!=event.currentTarget) && el) {
					el = el.parentElement;
				}

				let item,index;
				if( (index = app.dom.getData(el,'rindex')) !== undefined) {
					item = this.department.departList[+index];
                    this.$emit("selectDepart", item, index);
				}

			},
			chooseEmp(event) {
				let el = event.target;
				while(!app.dom.hasClass(el, 'emp-item') && (el!=event.currentTarget) && el) {
					el = el.parentElement;
				}

				let item,index;
				if( (index = app.dom.getData(el,'rindex')) !== undefined) {
					item = this.department.emps[+index];
					this.$emit("selectEmp", item);
				}
			},
			chooseAll() {
				this.chosenAll = this.department.emps.every(item => this.existEmp(item.id));

				if(!this.chosenAll) {
					//全选
					this.department.emps.forEach(item => {
						!this.existEmp(item.id) && 	this.$emit("selectEmp", item);
					});
				} else {
					//清空
					this.department.emps.forEach(item => {
						//if (this.existEmp(item.id)){
						this.$emit("selectEmp", item);
						//}
					});
				}
				this.chosenAll = !this.chosenAll;
			},
			existEmp(id) {
				return this.chosenEmpList.some(val => val.id === id);
			}
		}
	}
</script>