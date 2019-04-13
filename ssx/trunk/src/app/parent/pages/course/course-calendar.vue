<!-- 课表 -->
<style lang="scss" scoped>
	
	
	$background-color: #EDF1F7;
	.red{
		color:#FF0000;
	}
	.gray{
		color:#C1C1C1;
	}
	.course-calendar{
		background:$background-color;
		@include position-absolute;	
		/*选择月份*/
		.month-choose-header{
			background:$color-white;
			height:44px;
			@include flex-center;
			>div{
				border: 1px solid #EEF1F6;
				padding:4px 14px;
				border-radius:30px;
				@include fs-lh(12);
				color:$color-6;
				&:nth-child(2){
					width:90px;
                    text-align: center;
					margin-left:15px;
					margin-right:15px;
				}
			}
		}
		
		/*月历*/
		.calender-container{
			width: calc(100% - 20px);
			margin:0 auto;
			/*日历单个格子*/
			.day-item-box{
				width:100%;
				height:100%;
				color:$color-3;
				@include flex-center;
				position:relative;
				/*今天的样式*/
				&.isToday { color:#1E88F5; }
				/*非本月的样式*/
				&.gray { color:#CCCCCC; }
				/*选择该天*/
				&.active{
					background: #1E88F5;
					color:$color-white;

					.day-item-number.hasCourse:after{
						background-color: #46BEEE;
					}

				}
				/*多少节课的显示*/
				/*.course-amount-box{
					position:absolute;
					top:3px;
					left:10%;
					width:80%;
					height:5px;
					@include flex-around;
					.course-amount-dot{
						width:5px;
						height:5px;
						border-radius: 50%;
						background:transparent;
						&.dot1.show{ background: #FFBF00; }
						&.dot2.show{ background: #FFBF00; }
						&.dot3.show{ background: #FFBF00; }
						&.dot4.show{ background: #FFBF00; }
					}
					.mini3dot{
						position:relative;
						top:-5px;
					}
				}*/
				.day-item-number{
					@include flex-center;
					position:relative;
					&.hasCourse:after{
						content:'';
						display:block;
						position:absolute;
						width:6px;
						height:6px;
						border-radius:50%;
						background-color:#ffdf7f;
						left: calc(50% - 3px);
                        top: 1.2em;
					}
				}
				/*请假图标*/
				.sign-qingjia{
					position:absolute;
					bottom:0;
					right:0;
    				font-size: 16px;
				}
			}
		}
		
		/*课程详情*/
		.course-content-container{
			position:relative;
			width: calc(100% - 20px);
			margin:0 auto;
			margin-top:10px;
			.course-card{
				padding: 15px 8px;
				width:100%;
				margin-bottom:5px;
				background:$color-white;
				color:$color-6;
				@include fs-lh(14);
				>div{
					padding:5px 0;
					display: flex;
					justify-content:flex-start;
					.icon{
						margin-right:5px;
					}
					>div{
						color:$color-3;
					}
					>div:first-child{
						color:$color-6;
						flex-shrink:0;
					}
				}
			}
		}
        .noData-temp{
            margin: 50px 0;
        }
	}
</style>

<template>
	<scroller-base class="course-calendar" :data="list">
		<!--选择月份-->
		<div class="month-choose-header">
			<div @click="changeMonth(-1)">上月</div>
			<div @click="openEditTime">{{month | formatDatetime('yyyy.MM')}}</div>
			<div @click="changeMonth(1)">下月</div>
		</div>
		
		<div class="calender-container" :style="{height:(calenderHeight + 35) + 'px'}" ref="calenderDIV">
			<!--课程日历-->
			<month-calender-common 
				:month="month" :type="0"  @monthChanged = "monthChanged">
				<div slot="days42" slot-scope="{data,index}" 
					class="day-item-box"
	                :key="index"
	                :class="{'gray' : !data.thisMonth,'isToday':data.isToday,'active':selected.index == index}"
					@click="selectDay(index,data)">
					<div class="day-item-number" :class="{'hasCourse': dayMap[data.datestr] &&  dayMap[data.datestr].length>0}">{{data.day}}</div>
					
					<!--有多少节课的圆圈-->
					<!--dayMap[data.datestr]可能为undefined-->
					<!-- <div class="course-amount-box" v-if="dayMap[data.datestr]">
						<div class="course-amount-dot dot1" :class="{'show': dayMap[data.datestr].length>0}"></div>
						<div class="course-amount-dot dot2" :class="{'show': dayMap[data.datestr].length>1}"></div>
						<div class="course-amount-dot dot3" :class="{'show': dayMap[data.datestr].length>2}"></div>
						<div class="course-amount-dot dot4" v-if="dayMap[data.datestr].length<=3" ></div>
						<div v-else class="mini3dot">
							...
						</div>
					</div> -->
					
					<!--请假图标-->
					<div class="sign-qingjia" v-if="dayMap[data.datestr] && dayMap[data.datestr].isNotAttend">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-qingjia1"></use>
						</svg>
					</div>
				</div>
			</month-calender-common>
			
		</div>
		<!--当天课程详情-->
		<!--每节课-->
		<div class="course-content-container">
			<div class="course-card" v-for="item in list">
				<div>
					<div>
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-banji"></use>
						</svg>
						<span>班级：</span>
					</div>
					<div>{{item.name}}<span v-if="item.subjectName">（{{item.subjectName}}）</span></div>
				</div>
				
				<div>
					<div>
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-xiaoqu"></use>
						</svg>
						<span>校区：</span>
					</div>
					<div>{{item.campusname}}</div>
				</div>
				
				<div>
					<div>
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-riqiicon"></use>
						</svg>
						<span>时间：</span>
					</div>
					<div v-show="item.unit!=3">{{item.stime}}~{{item.etime}}</div>
					<div v-show="item.unit==3">{{item.date}}</div>
				</div>
				
				<div v-show="item.classroomname">
					<div>
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-jiaoshi"></use>
						</svg>
						<span>教室：</span>
					</div>
					<div>{{item.classroomname}}</div>
				</div>
				
				<div v-show="item.ClassroomLayoutName">
					<div>
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-zuowei3"></use>
						</svg>
						<span>座位：</span>
					</div>
					<div>{{item.classlayoutname}}</div>
				</div>
				
				<div v-show="item.content">
					<div>
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-neirong"></use>
						</svg>
						<span>内容：</span>
					</div>
					<div>{{item.content}}</div>
				</div>
				
				<div>
					<div>
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-laoshiicon1"></use>
						</svg>
						<span>老师：</span>
					</div>
					<div>{{item.teachernames.join(',')}}</div>
				</div>
				
				<div>
					<div>
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-zhuangtai1"></use>
						</svg>
						<span>状态：</span>
					</div>
					<div>
						<span :class="computeStatus(item.status)">
							{{item.status || '未上课'}}
						</span>
						<span class="red" v-show="item.isnoteattend">(请假)</span>
					</div>
				</div>
				
				<div v-show="item.comment">
					<div>
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-dianping"></use>
						</svg>
						<span>点评：</span>
					</div>
					<div>{{item.comment}}</div>
				</div>
			</div>
            <empty-page class="noData-temp" :type="0" v-show="list.length===0"></empty-page>
		</div>
		<loading class="loading" v-show="isLoading"></loading>
	</scroller-base>
</template>

<script>
	import {getcourseinfosbytime} from 'parent/api/course';
	import MonthCalenderCommon from 'parent/components/common/month-calender/month-calender-common';
	import EmptyPage from "parent/components/common/empty-page/empty-page";

	let _dateMonth = new Date();
	let pname = "courseList";
	let _daysArr = [];		//缓存calender返回的42天数据.
	let _isFirst = true;		//第一次进入课表界面,直接定位到今天.
	
	export default {
		name: "course-calendar",
		data() {
			return {
				wxTitle:'查看课表',
				isLoading:true,
				list: [],		//放课程的.
				dayMap:{},		//42天的Map对象
				itemCourseMap:{},	//用id做key(每节课)的Map对象
				calenderHeight:335,	//课表的高度,mounted后更新高度,使得所有格子为正方形.
				month:_dateMonth.getFullYear() + '-' + fixZero(_dateMonth.getMonth()+1,2) + '-' + fixZero(_dateMonth.getDate(),2),
				selected:{
					index: 0
				}
			}
		},
		methods: {
			computeStatus(status){
				return {
					'gray':status == '已上课',
					'red' :status == '已取消'
				}
			},
			changeMonth(num){
				_dateMonth.setMonth(_dateMonth.getMonth()+num);
				this.month = _dateMonth.getFullYear() + '-' + fixZero(_dateMonth.getMonth()+1,2) + '-' + fixZero(_dateMonth.getDate(),2);
			},
			openEditTime(){
				app.datetimePicker({
					date:this.month,
					format:'YYYY-MM',
				}).then(data=>{
                    data = data + '-01';
                    _dateMonth = new Date(data);
					this.month = data;
				})
			},
			selectDay(index,data){
				this.selected.index = index;
				let ids = getDaysID(this.dayMap[data.datestr]);
				if (!ids){
					this.list = [];
				} else {
					this.getDayData(data.datestr);
				}
			},
			loadData(mstartdate,menddate) {
				this.isLoading = true;
				monthQueue(mstartdate,menddate).then(res=>{
					this.isLoading = false;
					this.itemCourseMap = {};
					res.forEach(item=>{
						this.itemCourseMap[item.id] = item;
					})
					this.dayMap = transformData(res,_daysArr);
					//直接定位到今天
					if (_isFirst){
						this.selected.index = getTodayIndex(_daysArr);						
						_isFirst = false;
					}
					this.selectDay(this.selected.index,_daysArr[this.selected.index]);
				});
			},
			getDayData(datestr){
				let params = {
					startdate:datestr,
					enddate:datestr,
					usertype:0,
					viewtype:0,
				}
				this.isLoading = true;
				getcourseinfosbytime(params).then(res=>{
					this.isLoading = false;
					res.data.forEach(item=>{
						item.isNotAttend = this.itemCourseMap[item.id] && this.itemCourseMap[item.id].isNotAttend == 1;
					})
					this.list = res.data;
				})
			},
			monthChanged(data){
				_daysArr = data;
				this.loadData(data[0].datestr,data[41].datestr);
			},
        },
        mounted() {
			//进入时直接定位到当月,并选择今天
			_isFirst = true;
			_dateMonth = new Date();
			this.month = _dateMonth.getFullYear() + '-' + fixZero(_dateMonth.getMonth()+1,2) + '-' +  fixZero(_dateMonth.getDate(),2);
			
			let w = parseFloat(getComputedStyle(this.$refs.calenderDIV).width);
			this.calenderHeight = Math.ceil(w / 7 * 6 + 2);	//w/7*6只是粗略处理的正方形
		},
		components:{
			MonthCalenderCommon,
            EmptyPage
		}
	}
	
	//把得到的一段时间内的数据处理,得到月历课表上的数据
	//1.字段date ,该数据排在哪一天
	//2(待定).字段stime,确定在该天的顺序,
	function transformData(res,daysArr){
		let dayMap = {};
		//初始化
		daysArr.forEach(item=>{
			!dayMap[item.datestr] && (dayMap[item.datestr] = []);
		});
		
		res.forEach(item=>{
			!dayMap[item.date] && (dayMap[item.date] = []);//以防万一
			dayMap[item.date].push(item);
			(item.isNotAttend == 1) && (dayMap[item.date].isNotAttend = true);
		});
		return dayMap;
	}
	
	function getDaysID(arr){
		return arr.map(item=>{
			return item.id
		}).join(',');
	}
	
	function getTodayIndex(daysArr){
		let today = 0;
		daysArr.forEach((val,index)=>{
			if (val.isToday){
				today = index
			}
		})
		return today;
	}
	
	
	//第一次请求iscount传1,表示后台要进行统计,依据统计结果一次性返回或分次返回.
	//接受第一次请求的返回后,依据返回的字段'hasnext'决定要不要进行下4次请求(分次返回)
	//后4次请求iscount传0,表示后台不再进行统计.
	//mstartdate:月历的开始时间,menddate:月历的结束时间
	function monthQueue(mstartdate,menddate){
		return new Promise((resolve,reject)=>{
			//请求1:
			let params = {
				mstartdate,
				menddate,
				startdate:mstartdate,
				enddate:dateStrChange(mstartdate,6),					
				iscount:1,
                viewtype:2,
				usertype:0
			};
            getcourseinfosbytime(params).then(res=>{
				if (res.result.code == app.errok){
					if (!res.hasnext){		//如果一次性给完数据,无须进行多余的请求
						resolve(res.data);	
					} else {	//进行多次请求
						let proArr = [];
						params.iscount = 0;		//剩下的不用统计
						for (let i = 0; i < 5; i++){	//下一个区间
							params.startdate = dateStrChange(params.enddate,1);
							params.enddate = dateStrChange(params.startdate,6);
							proArr.push(getcourseinfosbytime(Object.assign({},params)));
						}
						Promise.all(proArr).then(proArrRes=>{
							let returnArr = res.data;		//第一次请求返回的数组
							proArrRes.forEach(proRes=>{
								returnArr.push(...proRes.data);		//拼接上所有的的请求数组,作为一个完整的数组返回
							});
							resolve(returnArr);
						});
					}
				} 
			});
		});
	}
	
	
	//给定date的字符串,加减多少天后给出新date的字符串
	function dateStrChange(date,days){
		let dateObj = new Date(date);
		dateObj.setDate(dateObj.getDate()+days);
		return dateObj.getFullYear() + '-' + fixZero(dateObj.getMonth()+1,2) + '-' + fixZero(dateObj.getDate(),2);
	}
	
	
	function fixZero(m, n){
		m = m + '';
		return m.length >= n ? m : Array(n - m.length + 1).join('0') + m;  
	}
</script>