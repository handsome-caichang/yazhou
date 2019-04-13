<!--积分规则-->
<style lang="scss" scoped>
	
	
	.point-rule{
		@include position-absolute;
		background-color: #EDF1F7;
		.title{
			height:45px;
			font-size:20px;
			color:$color-3;
			line-height:40px;
			text-align:center;
			border-bottom:1px solid #EDF1F7;
		}
		.point-rule-box{
			background:$color-white;
			margin-bottom:10px;
			
			.point-rule-container{
				padding:15px 0;
				color:$color-3;
				.point-rule-item{
					padding:3px 10px;
					@include fs-lh(14);
				}
			}
		}
		.bottom-line{
			width:100%;
			height:0.5px;
		}
	}
</style>

<template>
	<div>
		<scroller-base class="point-rule" :data="list">
			<div v-show="plusList.length>0" class="point-rule-box">
				<div class="title">加分项</div>
				<div class="point-rule-container">
					<div v-for="(item,index) in plusList" class="point-rule-item">
						{{index+1}}、{{item.name}}：{{item.rulemodel}}
					</div>
				</div>
			</div>
			
			<div v-show="reduceList.length>0" class="point-rule-box">
				<div class="title">减分项</div>
				<div class="point-rule-container">
					<div v-for="(item,index) in reduceList" class="point-rule-item">
						{{index+1}}、{{item.name}}：{{item.rulemodel}}
					</div>
				</div>
			</div>
			
			<div class="bottom-line"></div>
			<empty-page class="noData-temp" type="10" v-if="list.length == 0"></empty-page>
		</scroller-base>
		<loading class="loading" v-show="isLoading"></loading>
		
	</div>
</template>

<script>
	import {getpointlist} from 'parent/api/point';
	import EmptyPage from 'parent/components/common/empty-page/empty-page';
	
	export default {
		data(){
			return {
				wxTitle:'积分规则',
				list:[],
				plusList:[],		//积分规则
				reduceList:[],
				isLoading:true,
			}
		},
		methods:{
			classify(list){
				this.plusList = [];
				this.reduceList = [];
				list.forEach(val=>{
					if (val.type == 1){
						this.plusList.push(val);
					} else {
						this.reduceList.push(val);
					}
				})
			}
		},
		created(){
			getpointlist({
				type:0,
				flag:-1,
				status:1
			}).then(res=>{
				if (res.result.code == app.errok)
				this.list = res.pointinfos;
				this.isLoading = false;
				this.classify(res.pointinfos);
			});
		},
		components:{
			EmptyPage
		}
	}
</script>