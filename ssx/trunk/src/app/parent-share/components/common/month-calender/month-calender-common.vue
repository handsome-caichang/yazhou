<style lang="scss">
	
	
	
	.calender-box{
		width:100%;
		height:100%;
		background:rgba(237,241,247,1);
		.calender-header{
			width:100%;
			@include flex-around();
			height:35px;
			.week-name-item {
				color:$color-3;
				@include fs-lh(13);
			}
		}
		.calender-body{
			display: flex;
			flex-flow:row wrap;
			justify-content:around;
			align-items:center;
			width:100%;
			height:calc(100% - 35px);
			>div{
				width:14.2%;
				height:16.6%;
				flex-grow:1;
				background: #FFF;
				border:1px solid rgba(237,241,247,1);
				@include flex-center(row);
			}
		}
	}
</style>


<template>
	<month-calender-base :type="type" :month="month" @monthChanged = "monthChanged">
		<!--星期的头部-->
		<div class="calender-header" slot="calender-header" slot-scope="{weekNames}">
			<div class="week-name-item" v-for="name in weekNames">
				{{name}}
			</div>
		</div>
		<!--继续往上传递作用域-->
		<div slot="days42" slot-scope="prop">
			<slot name="days42" :data="prop.data" :index="prop.index"></slot>
		</div>
	</month-calender-base>
</template>

<script>
	import MonthCalenderBase from './month-calender-base';
	export default {
		name:'month-calender-common',
		props:{
			//0:周一到周日,1:周日,周一到周六
			type: {
				type: Number,	
				default:0
			},
			//年份和月份.'2018-01'或'2018-01-02'都行
			month:{
				type:String
			},
		},
		methods:{
			monthChanged(data){
				this.$emit('monthChanged',data);
			}
		},
		components:{
			'month-calender-base':MonthCalenderBase
		}
	}
</script>
