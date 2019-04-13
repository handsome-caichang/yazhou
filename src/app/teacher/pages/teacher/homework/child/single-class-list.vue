<style lang="scss" scoped>
	
	
	.action-sheet {
		@include position-absolute(0, 0, 0, 0);
		z-index: 2;
		.header{
			width: 100%;
			padding-left: 12px;
			padding-right: 12px;
			background: #fff;
			height: 44px;
			display: flex;
			align-items: center;
			border-bottom:1px solid #E0E5EE;
        }
		.item-box{
			.date{
				height: 28px;
				line-height: 28px;
				padding:0 12px;
				text-align: left;
			}
			.item{
				height: 44px;
				line-height: 44px;
				background: #ffffff;
				padding-left: 12px;
				padding-right: 12px;
				border-top:1px solid #E0E5EE;
				display: flex;
				&:after{
					display:block;
					clear:both;
					content:"";
					visibility:hidden;
					height:0
				}
				.item-lf{
					float: left;
					width: 80%;
					.class-name{
						display: inline-block;
						color: $color-3;
						max-width: 70%;
						@include ellipsis-single();
					}
					.class-status{
						display: inline-block;
						color: $color-9;
						padding-left:5px; 
						overflow: hidden;
					}
				}
				.item-rt{
					float: right;
    				width: 20%;
					text-align: right;
					display: flex;
					justify-content:flex-end;
					.icon{
						font-size: 13px;
					}
				}
			}
		}
	}
	.noData-temp,.loading {
		@include position-absolute;
	}
	
</style>

<template>
	<div>
		<action-sheet 
			class="action-sheet" 
			v-show="opened" 
			:data="renderData" 
			ref="singleClassList"
			:scrollerStyle="scrollerStyle"
			:scrollerConfig="scrollerConfig"
			:fullParent="true"
			:position="position" 
			 @loadData="loadData"
			 @loadFirst="loadFirst"
			@close="close">
			<div class="header" slot="header" >
                <div class="date-filter">
                    <date-bar
                            :sdate='scrollerConfig.pagingOption.params.sdate'
                            :edate='scrollerConfig.pagingOption.params.edate'
                            :index="quickDateIndex"
                            @changeDate="changeDate">
                    </date-bar>
                </div>
            </div>
			<div class="item-box" v-for="(item,index) in list" :key="item.CourseID">
				<!-- 日期 使用处理后的日期-->
                <div class="date" v-if='index==0||item.date!==list[index-1].date'>
                    {{item.isToday?'今天':item.date}}
                </div>

				<div class="item" @click="chooseStudent(item)">
					<div class="item-lf">
						<span class="class-name">{{item.ClassName}}</span>
						<span class="class-status" v-if="item.IsSend == 1">已发送</span>						
					</div>
					<div class="item-rt">
						<span>{{item.time}}</span>
						<span>
							<svg class="icon card-next" aria-hidden="true">
								<use xlink:href="#icon-youjiantou"></use>
							</svg>
						</span>
					</div>
					
				</div>

			</div>
			<!-- 空白页 -->
			<empty-page class="noData-temp" v-if="this.list.length==0" :type="1001" text="没有找到班级哦"></empty-page>
		    <loading class="loading" v-show="isLoading"></loading>
		</action-sheet>

		<multi-student-list :opened.sync="isOpenHomeworkStudentList"
		:paraData = "currentItem"
		:echoData = "echoData"
		@acceptStudentData="getStudent">
        </multi-student-list>  
	</div>
</template>

<script>
	import {processGet} from "teacher/api/common";
	import EmptyPage from "teacher/components/common/empty-page/empty-page";
	import MultiStudentList from './multi-student-list.vue';
	
	export default {
		name: "single-class-list",
		mixins: [app.mixin.popupWindowRouteMixin],
		props: {
			opened: {
				type: Boolean,
				default: false
			},
			position: {
				type: String,
				default: "sideRight"
			},
			echoData:{
				type:Object
			}
		},
		data() {
			return {
				// 辅助参数
				isLoading: false,
				isOpenHomeworkStudentList:false,
				scrollerStyle: {
					background:'#eef1f6'
				},
				_today:'',
				
				refreshNum:0,
				quickDateIndex:-1,

				scrollerConfig: {
                    tag: 'load',
                    type: 1,//上拉加载
                    pagingOption: {
                        api: processGet,
                        params: {
                            pname: 'api',
                            action: 'getCourseStudent',
                            sdate:app.tool.getDatesByIndex(3).sdate,
                            edate:app.tool.getDatesByIndex(3).edate
                        },
                        pageOpt: {
                            // 分页初始页码的'key'、'value'
                            indexKey: 'page',
                            indexVal: 1,
                            // 每页请求数据长度的'key'、'value'
                            sizeKey: 'pageSize',
                            sizeVal: 20,
                            // 后端返回的总页数'key'
                            countKey: 'pageCount'
                        },
                    }
                },
				list:[],

				currentItem:{},//传递给子组件的对象
			};
		},
		computed: {
            renderData() {
                return {
                    refreshNum: this.refreshNum,
					list:this.list,
					opened:this.opened
                }
            }
        },
		methods: {
			// 格式化时间
			formatDate(date) {
                return date.substring(0,10)
            },
            formatTime(date){
                return date.substring(11,16)
            },
            //是否今天
            judgeIsToday(date){
                return this._today==date
			},
			changeDate(obj){
                this.scrollerConfig.pagingOption.params.sdate = obj.sdate;
                this.scrollerConfig.pagingOption.params.edate = obj.edate;
                this.quickDateIndex = obj.index;
                this.isLoading = true;
                this.$refs.singleClassList.$refs.scroller.pagingRefresh(this.scrollerConfig.pagingOption.params);
			},
			//初始化参数
            initClassList(arr) {
                arr.forEach(item => {
                    item.date = this.formatDate(item.Sdate);//年月日
                    item.time = this.formatTime(item.Sdate);//时分
                    item.isToday = this.judgeIsToday(item.date);//是否为今天
                    if(item.Students.length>0){
                        item.Students.forEach((s)=>{
                            s.checked = false;
                        })
                    }
				});
				return arr
            },
			loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    this.isLoading = false;
                    if (res.errcode == app.errok) {
                        // 没有学员的时候CourseStudent是空数组
                        let _list = this.initClassList(res.data.CourseStudent);//初始化
                        if (res.pageIndex === 1) {
                            // 筛选||第一次
                            this.list = _list;//赋值 界面展示
                        }else{
                            // 分页
                            this.list = this.list.concat(_list);
                        }
                        this.refreshNum++;
                        
                    }
                });
			},
			//进入学生列表界面
            chooseStudent(item){
                this.currentItem = item;
                this.isOpenHomeworkStudentList = !this.isOpenHomeworkStudentList;
            },
			// 接收学员信息
			getStudent(data){
				// 如果选择了学员则返回到发布作业界面，反之在停留当前界面
				if(data.checkedNum>0){
					this.close();
					// 解决苹果设备下不能连续多次改变路由的问题
					setTimeout(() => {
						if (location.hash === '#/homeworkAdd?pwIndex=1') {
						    this.$router.back()
						}
					}, 10)
				}
				this.$emit("getAccpets", app.tool.clone(data));
			}
		
		},
		created(){
            let paraToday = new Date(); 
            let y = paraToday.getFullYear();//年
            let m = paraToday.getMonth()+1;//月
            if(m<10){
                m = '0'+ m;
            }
            let d = paraToday.getDate();//日
            if(d<10){
                d = '0' + d;
            }
            this._today = y + '-' + m + '-' + d;
        },
		watch: {
		
        },
		components: {
			EmptyPage,
			MultiStudentList
		}
	};
</script>