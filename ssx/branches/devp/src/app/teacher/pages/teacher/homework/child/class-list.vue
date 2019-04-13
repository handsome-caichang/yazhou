<style lang="scss" scoped>
	
	
	.action-sheet {
		@include position-absolute(0, 0, 0, 0);
		z-index: 2;
	}
	.noData-temp {
		@include position-absolute;
	}
	.date-node {
		height: 44px;
		line-height: 44px;
		padding-left: 12px;
		padding-right: 12px;
	}
	.class-item {
		height: 44px;
		line-height: 44px;
		background: #ffffff;
		padding-left: 12px;
		padding-right: 12px;
		@include border-top;
		&-first-child {
			float: left;
			width: 80%;
			height: 100%;
			>span {
				display: inline-block;
				&.class-name{
					color: #333333 100%;
					max-width: 70%;
				}
				@include ellipsis-single;
				&.class-status {
					color: rgba(153, 153, 153, 1);
					text-indent: 5px;
				}
			}
		}
		>div:last-child {
			float: right;
			width: 20%;
			text-align: right;
			>span:first-child {
				font-size: 0.75rem;
				color: rgba(187, 187, 187, 1);
			}
			>span:last-child {
				float: right;
			}
		}
		.card-next {
			float: right;
			margin-right: 0;
			margin-top: 15.5px;
		}
		.icon-youjiantou {
			width: 13px;
			height: 13px;
		}
	}
</style>

<template>
	<div>
		<action-sheet 
			class="action-sheet" 
			v-show="opened" 
			:data="list" 
			:fullParent="true"
			:position="position" 
			:scrollerStyle="scrollerStyle"
			@close="close" 
			>
			<div class="item-box">
				<div v-for="(item, key) in list" :key="key">
					<div class="date-node">{{key}}</div>
					<div v-for="(node, index) in item" :key="index">
						<div class="class-item" @click="chooseStudent(node)">
							<div class="class-item-first-child">
								<span class="class-name">{{node.classname}}</span>
								<span class="class-status" v-if="node.issend == 1">已发送</span>
							</div>
							<div>
								<span>{{node.time}}</span>
								<span>
									<svg class="icon card-next" aria-hidden="true">
										<use xlink:href="#icon-youjiantou"></use>
									</svg>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 空白页 -->
			<empty-page class="noData-temp" v-if="Object.keys(this.list).length==0" :type="1001" text="没有找到班级哦"></empty-page>
                
		    <loading class="loading" v-show="isLoading"></loading>
		</action-sheet>
		<Checked 
			:opened.sync="checked" 
			:checkList="temp.list" 
			:header="temp.classname" 
			@getStudentList="getStudentList" 
			ref="checked"></Checked>
	</div>
</template>

<script>
	import Checked from "./checked";
	import {getcoursestudentforhomework} from "teacher/api/homework";
	import EmptyPage from "teacher/components/common/empty-page/empty-page";	
	
	export default {
		name: "accpet-class",
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
		computed: {
			_list() {
				return this.list;
			}
		},
		data() {
			return {
				list: {},
				accpets: {
					courseid: null,
					classid: null,
					chooseNum: 0,
				},
				temp: {
					courseid: null,
					classid: null,
					classname: "",
					chooseNum: 0,
					list: []
				},
				scrollerStyle: {
					"background": "#eef1f6"
				},
				isOk: false,
				checked: false,
                isLoading: false
			};
		},
		methods: {
			// 选择班级里的学生:maskToClose="false"
			chooseStudent(item) {
				// 打开接收人选择面板
				this.checked = true;
                this.isOk = true;
                this.temp. classid = item. classid;
				this.temp.courseid = item.courseid;
				this.temp.classname = item.classname;
				var _students = item.homeworkstudentinfos;
				// 为了测试方便，为0时赋了初始值。实际场景中不需要处理这个条件
				if(this.temp.list.length == 0) {
					this.temp.list = this.initStudents(_students);
                    // console.log('first------------->', this.temp.list);
				} else {
					// // 与之前的选择做比较，如果不是同一个班级就重置temp.list
					if(this.temp.courseid != this.accpets.courseid) {
						this.temp.list = this.initStudents(_students);
					} else {
                        this.temp.courseid = this.accpets.courseid;
                        this.temp. classid = this.accpets. classid;
                        this.temp.classname = this.accpets.classname;
                        this.temp.list = this.accpets.studentids;
					}
				}
			},
			// 返回选择的学生
			getStudentList(data) {
				// 返回了选择的数量和学生列表
				// {
				//   chooseNum: "",
				//   list: list
				// }
				this.isOk = false;
				this.accpets.courseid = this.temp.courseid;
				this.accpets. classid = this.temp. classid;
				this.accpets.classname = this.temp.classname;
				this.accpets.chooseNum = data.chooseNum;
				this.accpets.studentids = data.list;

				// 选择了接收人就回到发布页面
				let _hasStudents = this.accpets.studentids.some(item => item.checked);
				if (_hasStudents) {
					this.close();
					// 解决苹果设备下不能连续多次改变路由的问题
					setTimeout(() => {
						if (location.hash === '#/homeworkAdd?pwIndex=1') {
						    this.$router.back()
						}
					}, 10)
				}

				let _accpets = Object.assign({}, this.accpets);
				_accpets.studentids = [].concat(_accpets.studentids.filter(item => {return item.checked}))
				this.$emit("getAccpets", _accpets);
			},
			// 格式化时间
			formatDate(data) {
				// 格式：2017-12-6 17:37:17
				// 截取时间(hh:hmm)
				var _time = data.split(" ")[1];
				// 去掉秒,转为hh:mm
				_time = _time.split(":").splice(0, 2).join(":");
				// 截取年月日(yy-mm-dd)
				var _ymd = data.split(" ")[0],
					_y = parseInt(_ymd.split("-")[0]),
					_m = parseInt(_ymd.split("-")[1]),
					_d = parseInt(_ymd.split("-")[2]);
				// 是否为今天
				var _date = new Date();
				return {
					ymd: _date.getFullYear() == _y && _date.getMonth() + 1 == _m && _date.getDate() == _d ?
						"今天" : _ymd,
					time: _time
				};
            },
            initStudents(item) {
                return item.map(item => {
					item.checked = false;
					return item;
				});
            }
		},
		watch: {
			opened() {
				// 接收班级面板关闭时关闭选择接收人的面板
				if(this.opened) {
					this.isLoading = true;
					if(Object.keys(this.list).length == 0 || Object.keys(this.list).length == 0) {
						// 如果list为空，就请求数据
						getcoursestudentforhomework().then(res => {
							this.isLoading = false;
							if(res.result.code == 200) {
								let _data = [].concat(res.data)
								// 遍历数据原始数据，然后重组到this.list
								_data.forEach((item, key) => {
									
									var _formatDate = this.formatDate(item.sdate),
										_dateNode = _formatDate.ymd,
										_time = _formatDate.time;
									// 查找self.list中的与_dateNode匹配的key
									var _some = Object.keys(this.list).some((value) => _dateNode == value);
									// 不存在时新增以_dateNode为key的对象
									if(!_some) {
										// 声明响应式属性，否则vue无法监听到{}的变化
                                        this.$set(this.list, _dateNode, [])
									}
									item.time = _time;
									this.list[_dateNode].push(item);
								});
							}
						})
					} else {
						this.isLoading = false;
					}
				}
            }
        },
		components: {
    		EmptyPage,
			Checked
		}
	};
</script>