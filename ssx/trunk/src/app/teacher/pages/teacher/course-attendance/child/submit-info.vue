<style scoped lang="scss">
	
	
	.submitinfo-action-sheet{
		@include position-absolute;
		z-index:9999992;
		%btn-same{
			height:28px;
			border-radius:28px;
			background:#EEF1F6;
			@include flex-center;
		}
		.submit-info-container{
			@include flex-center(column);
			padding:15px;
			.title-small{
				@include fs-lh(15);
				color:$color-6;
			}
			.title-big{
				@include fs-lh(17);
				color: #1E88F5;
				margin-top:10px;
				max-height: 55px;
				@include ellipsis-multi(2)
			}
			.submit-info-text{
				width:95%;
				height:100px;
				border:1px solid  #CCCCCC;
				padding:10px;
				margin-top:10px;
				resize: none;
			}
			.submit-info-btns{
				margin-top:40px;
				width:95%;
				@include flex-center;
				justify-content: flex-end;
				.btn-cancel{
					@extend %btn-same;
					width:90px;
					background:$color-white;
					border:1px solid #DDDDDD; 
					color:$color-6;
					margin-right:15px;
				}
				.btn-confirm{
					@extend %btn-same;
					width:90px;
					background: #1E88F5;
					color:$color-white;
				}
			}
		}
	}
</style>

<template>
	<!--取消上课和入班日期-->
	<action-sheet v-show="openedSubmitInfo > 0" class="submitinfo-action-sheet"
		:position="'center'"
		@close="closeSubmitInfo">
		<div class="submit-info-container">
			<div class="title-small">{{openedSubmitInfo == 1 ? '即将取消上课':'提示'}}</div>
			<div class="title-big" v-show="openedSubmitInfo == 1">{{para.name}}</div>
			<div class="title-big" v-show="openedSubmitInfo == 2">
				入班日期 {{para.indate | formatDatetime('yyyy-MM-dd')}}
			</div>
			<textarea class="submit-info-text" v-model="submitText"
				:placeholder="openedSubmitInfo == 1 ? '请输入取消原因(必填)':'填写入班原因'" ></textarea>
			<div class="submit-info-btns">
				<div class="btn-cancel" @click="closeSubmitInfo">取消</div>
				<div class="btn-confirm" @click="confirmSubmitInfo">确定</div>
			</div>
		</div>
	</action-sheet>
	
</template>

<script>


//填写取消班级或入班日期
export default {
	data(){
		return {
			openedSubmitInfo:0,		//actionsheet显示,0不显示	1为取消上课   2为入班日期
			submitText:'',				//textarea的v-model
			para:{},
			_resolve:null,
		}
	},
	methods:{
		//打开取消班级或入班日期
		openSubmitInfo(type,params){
			this.openedSubmitInfo = type;
			this.para = params;
			return new Promise((resolve,reject)=>{
				this._resolve = resolve;
			})
		},
		//关闭或取消
		closeSubmitInfo(){
			this._resolve({
				type:'cancel',
				text:''
			});
			this.submitText = '';
			this.openedSubmitInfo = 0;	
		},
		//确认
		confirmSubmitInfo(){
			if (this.openedSubmitInfo == 1 && this.submitText.trim().length == 0){
				app.toast("info",'取消原因不能为空。');
				return;
			}
			this._resolve({
				type:'confirm',
				text:this.submitText
			});
			this.submitText = '';
			this.openedSubmitInfo = 0;
		},
	},
	components:{
		
	}
}
</script>

