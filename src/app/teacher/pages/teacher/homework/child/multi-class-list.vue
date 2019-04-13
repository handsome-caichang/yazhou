<style lang="scss" scoped>
	
	
	.multi-class-list-container {
        .header{
                width: 100%;
                padding-left: 12px;
                padding-right: 12px;
                background: #fff;
                height: 44px;
                display: flex;
                align-items: center;
        }
        .as-body{
		    @include position-absolute(0, 0, 0, 0);
		    z-index: 99999;
            .item-box{
                .date{
                    height: 28px;
                    line-height: 28px;
                    padding:0 12px;
                }
                .item{
                    height: 44px;
                    line-height: 44px;
                    background-color: $color-white;
                    margin-bottom: 1px;
                    position:relative;
                    padding-left: 38px;
                    .item-lf{
                        position:absolute;
                        top: 0;
                        left: 0;
                        width: 38px;
                        height: 44px;
                        padding-left:10px;
                        font-size: 18px;
                        
                    }
                    .item-rt{
                        position:relative;
                        padding-right:70px;
                        .time{
                            position:absolute;
                            right: 10px;
                            top: 0;
                            text-align: right;
                            width: 70px;
                            color: #8b572a;
                        }
                        .msg{
                            @include flex-between;
                            .name{
                                flex: 1;
                                @include ellipsis-single;
                            }
                            .count{
                                width: 70px;
                                text-align: right;
                                padding:0 5px;
                            }
                        }                        
                    }
                }
            }
            
        }
        
		.footer {
            height: 48px;
            background: $color-white;
            @include flex-between;
            @include border-top;
            padding: 0 12px;
            .select{
                line-height: 1;
                .icon{
                    font-size: 18px;
                }
            }
            .btn{
                min-width: 70px;
                height: 28px;
                line-height: 28px;
                color: $color-white;
                background: $color-primary;
                text-align: center;
                border-radius: 28px;
            }
        }
	}
	.noData-temp,.loading  {
		@include position-absolute;
	}
   	
</style>

<template>
	<div class="multi-class-list-container" >
		<action-sheet 
            v-show="opened" 
            ref = "multiClassList"
            class="as-body"
			:data="renderData"
			:scrollerStyle="scrollerStyle"
            :scrollerConfig="scrollerConfig"
			:fullParent="true"
			:position="position" 
            @loadData="loadData"
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
                <div  class="item">
                    <div class="item-lf">
                        <svg class="icon" aria-hidden="true" @click="chooseItem(item)">
                            <use :xlink:href="item.checked?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
                        </svg>
                    </div>

                    <div class="item-rt" @click="chooseStudent(item)">
                        <div class="msg">
                            <div class="name">{{item.ClassName}}</div>
                            <div class="count">
                                (<span>{{item.checkedNum}}</span>/{{item.Students.length}})
                            </div>
                        </div>

                        <div class="time">
                            {{item.time}}
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                    </div>
                    
                </div>
                
            </div>

			<!-- 全选，确定 -->
			<div class="footer" slot="footer" v-if="list.length>0">
                <div class="select" @click="chooseAll" >
                    <svg class="icon icon-duoxuan" aria-hidden="true">
                        <use :xlink:href="isCheckedAll?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
                    </svg>
                    全选
                </div>
                <div class="btn" @click="submit">
                    确定({{checkedTotal}})
                </div>
			</div>
            <!-- 空白页 -->
            <empty-page class="noData-temp" v-if="list.length==0" :type="1001" text="没有找到班级哦"></empty-page>
            <loading class="loading" v-show="isLoading"></loading>    
		</action-sheet>
	    
    	<multi-student-list :opened.sync="isOpenHomeworkStudentList"
            :paraData = "currentItem"
            @acceptStudentData="acceptStudentData">
        </multi-student-list>    
	</div>
</template>

<script>
    
	import {processGet} from "teacher/api/common.js";
	import EmptyPage from "teacher/components/common/empty-page/empty-page.vue";
	import MultiStudentList from './multi-student-list.vue';

	export default {
		name: "multi-class-list",
		mixins: [app.mixin.popupWindowRouteMixin],
		props: {
			opened: {
				type: Boolean,
				default: false
            },
            echoList:{
                type:Array
            },
			position: {
				type: String,
				default: "sideRight"
			}
		},
		data() {
			return {
                // 辅助参数
				isLoading: true,
				scrollerStyle: {
					background:'#eef1f6'
				},
                _today:'',

                // 子组件相关
                isOpenHomeworkStudentList:false,
                currentItem:{},//学员对象

				list: [],//用来操作的数组
                isCheckedAll:false,
                checkedTotal:0,

                quickDateIndex:-1,
                refreshNum:0,
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
                this.$refs.multiClassList.$refs.scroller.pagingRefresh(this.scrollerConfig.pagingOption.params);
            },
            //初始化参数
            initClassList(arr) {
                arr.forEach(item => {
                    item.checked = false;
                    item.checkedNum = 0;//班级下选中的人数
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
            opEcho(arr){
                let courseids = [];//上次已选中数据的courseid集合，根据courseid去回显
                this.echoList.forEach((item)=>{
                    courseids.push(item.CourseID)
                })
                //页面展示数据 处理之后回显
                arr.forEach((item,index)=>{
                    let i = courseids.indexOf(item.CourseID);
                    if(i!=-1){
                        let echoItem = this.echoList[i];
                        item.checked = echoItem.checked;
                        item.checkedNum = echoItem.checkedNum;
                        item.Students.length&&item.Students.forEach((s,index)=>{
                            s.checked = echoItem.Students[index].checked;
                        })
                    }
                })
                return arr
            },
            //进入学生列表界面
            chooseStudent(item){
                this.currentItem = item;
                this.isOpenHomeworkStudentList = !this.isOpenHomeworkStudentList;
            },
            //选择当前班级
            chooseItem(item){
                if(item.checked){
                    item.checkedNum = 0;
                    item.Students.length&&item.Students.forEach((s)=>{
                        if(s.checked){
                            s.checked = false;
                            this.checkedTotal--;
                        }
                    })
                }else{
                    item.checkedNum = item.Students.length;
                    item.Students.length&&item.Students.forEach((s)=>{                        
                        if(!s.checked){
                            s.checked = true;
                            this.checkedTotal++;
                        }
                    })
                    
                }
                item.checked = !item.checked;
                
            },
            // 全选
            chooseAll(){
                if(this.isCheckedAll){
                    this.list.forEach((item)=>{
                        item.checked = false;
                        item.checkedNum = 0;
                        item.Students.length&&item.Students.forEach((s)=>{                        
                            s.checked = false;                            
                        })
                    })
                    this.checkedTotal = 0;
                }else{
                    // 先归零再累加
                    this.checkedTotal = 0;
                    this.list.forEach((item)=>{
                        item.checked = true;
                        item.checkedNum = item.Students.length;
                        item.Students.length&&item.Students.forEach((s)=>{                        
                            s.checked = true;                            
                        })
                        this.checkedTotal+=item.Students.length;
                    })
                }

                this.isCheckedAll = !this.isCheckedAll;
            },
            // 确定
            submit(){
                let subArr=[];
                this.list.forEach((item)=>{
                    item.checkedNum>0 && subArr.push(item)
                })
                this.$emit('acceptClassData',subArr);
                this.close();

            },
            loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    this.isLoading = false;
                    if (res.errcode == app.errok) {
                        // 没有学员的时候CourseStudent是空数组
                        let _list = this.initClassList(res.data.CourseStudent);//初始化
                            // _list = this.opEcho(_list);//处理回显 //如果要实时回显，放开注释即可
                        if (res.pageIndex === 1) {
                            // 筛选||第一次
                            this.list = _list;//赋值 界面展示
                            this.calcTotal();//界面重载需要重新计算全选和选中数量
                        }else{
                            // 分页
                            this.list = this.list.concat(_list);
                        }
                        console.log(this.list)
                        this.refreshNum++;
                        
                    }
                });
            },
	            
            acceptStudentData(data){
                // 接受学员列表数组
                this.currentItem.checked = data.checked;
                this.currentItem.checkedNum = data.checkedNum;

                this.currentItem.Students.length&&this.currentItem.Students.forEach((item,index)=>{
                    item.checked = data.Students[index].checked;
                })
                // 合计值
                this.calcTotal();

            },
            calcTotal(){
                this.checkedTotal=0;
                this.list.forEach((item)=>{
                    if(item.checkedNum){
                        this.checkedTotal = this.checkedTotal+item.checkedNum;
                    }
                })
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
			opened(newVal,oldVal) {
                if(newVal){                    
                    
                    this.list = this.initClassList(this.list);//初始化

                    this.list = this.opEcho(this.list);//处理回显
                    this.calcTotal();//避免改变了footer的统计 没有点确定
                }             
            },
            checkedTotal(newVal,oldVal){
                this.isCheckedAll = this.list.every(item => item.checked); 
            }
        },
		components: {
    		EmptyPage,
            MultiStudentList

			
		}
	};
</script>