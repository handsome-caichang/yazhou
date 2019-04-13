<!-- 班级、课程筛选组件 -->
<style lang="scss" scoped>
	
	.role-actionsheet {
		@include position-absolute;
	}

	.item {
		height: $h-2;
		@include flex-center;
		.text {
			height: $h-5;
			line-height: $h-5;
			padding: 0 25px;
			border-radius: $h-5;
			&.active {
				color: $color-white;
				background-color: $color-primary;
			}
		}
	}
	.select-campus {
		padding: 15px 43px 10px 42px;
		.campus-content {
			@include flex-between;
			height: 31px;
			border: 1px solid #C2CCDC;
			font-size: 13px;
			color: $color-3;
			border-radius: 50px;
			.content-wrapper {
				display: flex;
				margin: 0 auto;
				width: 100px;
				.name {
					text-align: center;
					padding: 0 10px;
					@include ellipsis-single;
				}
				.icon-wrapper {
					width: 15px;
				}
			}
		}
	}
	.o-block {
		.header {
			height: $h-2;
			line-height: $h-2;
			padding: 0 $edge;
			color: $color-3;
			font-size: $fs-normal-x;
			@include flex-between;
			.title {
				flex: 1;
			}
			.icon {
				color: $color-9;
				margin-left: 10px;
			}
		}
		.header-isShowAll {
			height: $h-2;
			line-height: $h-2;
			padding: 0 $edge;
			color: $color-3;
			font-size: $fs-normal-x;
			display: flex;
			align-items: center;
			font-size: $fs-normal;
			.icon {
				color: $color-primary;
				margin-right: 10px;
			}
		}
		.list-class-type {
			max-height: 120px;
			overflow: hidden;
		}
		.list {
			padding: 0 4px;
			display: flex;
			flex-wrap: wrap;
			.o-item {
				display: table;
				width: 33.33%;
				padding: 4px;
				.text-box {
					display: table-cell;
					vertical-align: middle;
					text-align: center;
					height:	32px;
					background-color: $color-assist-3;
					border-radius: 2px;
					padding: 0 3px;
					color: $color-3;
					&.active {
						background-color: $color-primary;
						color: $color-white;
					}
					.text {
						font-size: 12px;
						line-height: 14px;
						display: -webkit-box !important;
					    overflow: hidden;
					    text-overflow: ellipsis;
					    word-break: break-all;
					    -webkit-box-orient: vertical;
					    -webkit-line-clamp: 2;
					}
				}
			}
		}
	}

	.footer {
		/* position: absolute !important;
		bottom: 0;
		right: 0;
		width: 100%; */
		height: $h-3;
		display: flex;
		@include border-top;
		
		.btn {
			flex: 1;
			font-size: $fs-big-s;
			@include flex-center;
			transform: translate3d(0, 0.5px, 0);
			&.reset-btn {
				color: $color-9;
			}
			&.confirm-btn {
				color: $color-white;
				background-color: $color-primary;
			}
		}
	}
	
</style>

<template>
		<!-- :scrollerStyle="scrollerStyle" -->
	<action-sheet
		class="role-actionsheet"
		v-if="opened"
		@close="selfClose" 
		:position="position" 
		:data="scrollerData">

		<div v-if="filteres" class="actionWrapper">
			<!--  -->
			<ul v-show="type !== 'filtrate'">
				<li class="item" 
					@click="changeSelected1({ID:''})">
					<div class="text" :class="{active: judgeActive({ID:''})}">不限</div>
				</li>
				<li class="item" 
					v-for="item in filteres[type]"
					@click="changeSelected1(item)">
					<div class="text" :class="{active: judgeActive(item)}">{{item.Name}}</div>
				</li>
			</ul>
	
			<!-- 侧边筛选栏 -->
			<div class="other-body" v-show="type === 'filtrate'">
				<!-- 选择校区 -->
				<div class="select-campus" @click="openCampusActionsheet">
					<div class="campus-content">
						<div class="content-wrapper">
							<div class="name">
								{{curCampus.name}}
							</div>
							<div class="icon-wrapper">
								<svg class="icon" aria-hidden="true">
								    <use xlink:href="#icon-xiangshang-copy"></use>
								</svg>
							</div>
						</div>
					</div>
				</div>

				<div class="o-block" v-if="config.ShiftListType!==2&&config.EnableBirthdayCondition!==1">
					<div class="header-isShowAll" :class="{active: !otherSelected.IsShowAll}" @click="otherSelected.IsShowAll = !otherSelected.IsShowAll">
						<svg class="icon" aria-hidden="true">
						    <use :xlink:href="!otherSelected.IsShowAll? '#icon-danxuanxuanzhong1' : '#icon-danxuanweixuanzhong'"></use>
						</svg>
						<span>只显示可报班级</span>
					</div>
				</div>

				<div class="o-block" v-if="config.EnableBirthdayCondition===1">
					<div class="header-isShowAll" :class="{active: !otherSelected.IsAgeScreening}" @click="otherSelected.IsAgeScreening = !otherSelected.IsAgeScreening">
						<svg class="icon" aria-hidden="true">
						    <use :xlink:href="!otherSelected.IsAgeScreening?'#icon-danxuanweixuanzhong':'#icon-danxuanxuanzhong1'"></use>
						</svg>
						<span>按我的年龄筛选</span>
					</div>
				</div>	

				<div class="o-block" v-if="filteres.ClassTypes && filteres.ClassTypes.length > 0">
					<div class="header" @click="toggleClassTypes">
						<span class="title">类型</span>
						<svg class="icon" aria-hidden="true" v-if="filteres.ClassTypes.length > 6">
						    <use :xlink:href="classTypesFlag ? '#icon-xiangshang' : '#icon-xiangxia2'"></use>
						</svg>
					</div>
					<ul class="list" :class="{'list-class-type': classTypesFlag}">
						<li class="o-item" v-for="osub1 in filteres.ClassTypes">
							<div class="text-box"
								@click="changeSelected2(osub1, 'ShiftTypeIDs')"
								:class="{active: otherSelected['ShiftTypeIDs'].indexOf(osub1.ID) > -1 ? true : false}">
								<span class="text">{{osub1.Name}}</span>
							</div>
						</li>
					</ul>
				</div>

				<div class="o-block" v-for="otem2 in otherFilteres">
					<div class="header">{{otem2.name}}</div>
					<ul class="list">
						<li class="o-item" v-for="osub2 in otem2.list">
							<div class="text-box"
								@click="changeSelected2(osub2, otem2.type)"
								:class="{active: otherSelected[otem2.type].indexOf(osub2.ID) > -1 ? true : false }">
								<span class="text">{{osub2.Name}}</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div slot="footer" ref="footer" class="footer" v-show="type === 'filtrate'">
			<div class="btn reset-btn" @click="resetChange">重 置</div>
			<div class="btn confirm-btn" @click="confirmChange">确 定</div>
		</div>
	</action-sheet>
</template>

<script>
	
	 
	import {getqueryparamters} from 'api/jie.js'

	export default {
	  	name: 'course-filter',
	  	mixins: [app.mixin.popupWindowRouteMixin],
	  	props: {
	  		opened: {
	  			type: Boolean,
	  			default: true
	  		},
	  		// '年级'、'科目'、'期段'或'筛选'
	  		type: {
	  			type: String,
	  			default: "Grades"
	  		}
	  	},
	  	data () {
		    return {
		    	classTypesFlag: true,
		    	// 用于保存各种筛选项
		    	filteres: null,
		    	// 已选的筛选结果
		    	selected: {
		    	    Type: [1, 3],
		    	    GradeID: "",
		    	    SubjectID: "",
		    	    TermID: "",	
		    	    IsShowAll: true,
		    	    IsAgeScreening: false,
		    	    ShiftTypeIDs: [],
		    		CourseDay: [],
		    		CourseTime: []
		    	},
		    	otherSelected: {
		    		IsAgeScreening: false,
		    		IsShowAll: true,
		    		ShiftTypeIDs: [],
		    		CourseDay: [],
		    		CourseTime: []
		    	},
                otherFilteres: [
                    {
                    	type: 'CourseDay',
                        name: "上课时间",
                        list: [
                        	{
                        		ID: 1,
                        		Name: '星期一'
                        	}, {
                        		ID: 2,
                        		Name: '星期二'
                        	}, {
                        		ID: 3,
                        		Name: '星期三'
                        	}, {
                        		ID: 4,
                        		Name: '星期四'
                        	}, {
                        		ID: 5,
                        		Name: '星期五'
                        	}, {
                        		ID: 6,
                        		Name: '星期六'
                        	}, {
                        		ID: 7,
                        		Name: '星期日'
                        	}, 
                        ]
                    }, {
                    	type: 'CourseTime',
                        name: "上课时段",
                        list: [
                        	{
                        		ID: 1,
                        		Name: '上午'
                        	}, {
                        		ID: 2,
                        		Name: '下午'
                        	}, {
                        		ID: 3,
                        		Name: '晚上'
                        	}
                        ]
                    }
                ],
		    };
	  	},	  	
	  	computed: {
	  	    ...Vuex.mapState(['curCampus', 'config']),
	  	    position() {
	  	    	return this.type === 'filtrate' ? 'sideRight' : 'top';
	  	    },
	  	    scrollerStyle() {
	  	    	return this.type !== 'filtrate' ? null : {
	  	    		position: 'absolute',
	  	    		bottom: '40px',
	  	    	}
	  	    },
	  	    scrollerData() {
	  	    	return {
	  	    		opened: this.opened,
	  	    		type: this.type,
	  	    		filteres: this.filteres,
	  	    		classTypesFlag: this.classTypesFlag
	  	    	}
	  	    }
	  	},
	  	methods: {
	  		toggleClassTypes: function (event) {
	  			this.classTypesFlag = !this.classTypesFlag;
	  		},
	  		selfClose(type) {
	  			// 当点击模态框关闭时，在动画结束时,重置侧边栏样式;
	  			if (type === 'maskToClose') {
	  				setTimeout(() => {
	  				    for (let key in this.selected) {
		  					if (key === 'ShiftTypeIDs' || key === 'CourseDay' || key === 'CourseTime') {
		  						this.otherSelected[key] = [];
		  						this.selected[key].forEach((id, index) => {
		  							this.otherSelected[key].push(id);
		  						});
		  					}
		  					if (key === 'IsShowAll' || key === 'IsAgeScreening') {
		  						this.otherSelected[key] = this.selected[key];
		  					}
		  				}
	  				}, app.duration);	  				
	  			}
	  		    this.close();
	  		},
	  		// 更新可筛选数据,实现联动;
	  		updateFilteres() {
	  		    getqueryparamters(this.selected).then(res => {
	  		        if (res.ErrorCode === app.errok) {
	  		            this.filteres = res.Data;
	  		        }
	  		    })
	  		},
	  		// 改变筛选结果
	  		changeSelected1(filter) {
	  			if (this.type === 'Grades') {
	  				this.selected.GradeID = this.selected.GradeID === filter.ID ? "" : filter.ID;
	  			}
	  			if (this.type === 'Subjects') {
	  				this.selected.SubjectID = this.selected.SubjectID === filter.ID ? "" : filter.ID;
	  			}
	  			if (this.type === 'Terms') {
	  				this.selected.TermID = this.selected.TermID === filter.ID ? "" : filter.ID;
	  			}
	  			this.updateFilteres();
	  			this.emitEvent();
	  			this.selfClose();
	  		},
	  		// 临时改变侧边栏筛选结果
	  		changeSelected2(filter, type) {
  				let index = this.otherSelected[type].indexOf(filter.ID);
	  			if (index > -1) {
	  				this.otherSelected[type].splice(index, 1);
	  			} else {
	  				this.otherSelected[type].push(filter.ID);
	  			}
	  		},
	  		emitEvent(val) {
	  			// ShiftListType 为2时表示：只显示符合报名条件的和没有设置报名条件的班级
	  			if (this.config.ShiftListType === 2){
	  				this.selected.IsShowAll = false;
	  			}
	  			this.$emit('changeFilter', this.selected);
	  		},
	  		// 判断是否是选中项
	  		judgeActive(filter) {
	  			if (this.type !== 'filtrate') {
	  				if (this.type === 'Grades') {
	  					return this.selected.GradeID === filter.ID;
	  				}
	  				if (this.type === 'Subjects') {
	  					return this.selected.SubjectID === filter.ID;
	  				}
	  				if (this.type === 'Terms') {
	  					return this.selected.TermID === filter.ID;
	  				}
	  			}
	  			return false;
	  		},
	  		resetChange() {
	  			this.otherSelected = {
	  				IsShowAll: true,
	  				IsAgeScreening: false,
		    		ShiftTypeIDs: [],
		    		CourseDay: [],
		    		CourseTime: []
		    	}
	  		},
	  		confirmChange() {
	  			let change = false;
	  			for (let key in this.otherSelected) {
	  				if (key === "IsShowAll" || key === 'IsAgeScreening') {
	  					if (this.otherSelected[key] !== this.selected[key]) {
	  						change = true;
	  						this.selected[key] = this.otherSelected[key];
	  					}
	  				} else {
	  					let v1 = this.otherSelected[key].join(','),
	  						v2 = this.selected[key].join(',');
	  					if (v1 !== v2) {
	  						change = true;
	  						this.selected[key] = [];
	  						if (this.otherSelected.hasOwnProperty(key)) {
	  							this.otherSelected[key].forEach((id, index) => {
	  								this.selected[key].push(id);
	  							});
	  						}
	  					}
	  				}
	  			}
 	  			change && this.emitEvent();
	  			this.selfClose();
	  		},
	  		openCampusActionsheet() {
	  			this.$emit('openSelectCampus')
	  		}
	  	},
	  	created() {
	  		this.updateFilteres();
	  		window.aaa = this
	  	},	  	
	  	watch: {
	  	    // 观察当前选中校区的改变, 并重置筛选结果, 
	  	    // 同时触发筛选结果改变事件, 从而使父页面的列表页重渲;
	  	    curCampus(newCampus, oldCampus) {
	  	        // 重置筛选条件
	  	        this.selected = {
	  	            Type: [1, 3],
	  	            GradeID: "",
	  	            SubjectID: "",
	  	            TermID: "",
	  	            IsShowAll: true,
	  	            IsAgeScreening: false,
	  	            ShiftTypeIDs: [],
		    		CourseDay: [],
		    		CourseTime: []
	  	        }
	  	        this.otherSelected = {
	  	        	IsShowAll: true,
	  	        	IsAgeScreening: false,
	  	        	ShiftTypeIDs: [],
	  	        	CourseDay: [],
	  	        	CourseTime: []
	  	        }
	  	        this.emitEvent();
	  	        this.updateFilteres();
	  	    }
	  	},
	  	components: {
	  		
	  	},
	};
</script>

