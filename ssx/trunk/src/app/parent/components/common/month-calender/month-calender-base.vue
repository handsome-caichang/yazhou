<style lang="scss">
	
	
	
	.calender-box{
		/*利用flex的样式,把42个格子自动排列成7*7*/
		.calender-body{
			display: flex;
			flex-flow:row wrap;
			justify-content:around;
			align-items:center;
			min-width:100px;
			min-height:100px;
			>div{
				width:14.2%;
				height:16.6%;
				flex-grow:1;
				@include flex-center(row);
			}
		}
	}
</style>

<template>
	<div class="calender-box">
		<!--放置头部的星期几和其他-->
		<slot name="calender-header" :weekNames="weekNames"></slot>
		<!--放置一个月的数据-->
		<div class="calender-body">
			<slot v-for="(item,index) in monthData" name="days42" :data="item" :index="index"></slot>
		</div>
	</div>
</template>

<script>
	const DAYS = 42,
		  WEEK0 = ['周一','周二','周三','周四','周五','周六','周日'],
		  WEEK1 = ['周日','周一','周二','周三','周四','周五','周六'], 
		  WEEK00 = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
		  WEEK11 = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
	
	export default {
		name:'month-calender-base',
		props:{
			//0:周一到周日,1:周日,周一到周六
			type: {
				type: Number,	
				default:0
			},
			//标准的日期格式或日期对象
			month:{
				type:String
			},
		},
		methods:{
			changeMonth(monthNew){
				let arr = app.tool.getMonthDays(monthNew,this.type);
				this.monthData = arr;
				this.$emit("monthChanged",arr);
			},
		},
		data(){
			return {
				daysCount: DAYS,
				monthData:[],
			};
		},
		computed:{
			weekNames(){
				return this.type == 0 ? WEEK0: WEEK1;
			},
		},
		watch:{
			//更改月份,改变日历
			month(newVal,oldVal){
				this.changeMonth(newVal);
			}
		},
		created(){
			if (this.month){
				this.changeMonth(this.month);
			}
		}
	}
</script>
