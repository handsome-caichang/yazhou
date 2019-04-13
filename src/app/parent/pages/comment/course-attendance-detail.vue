
<style scoped lang="scss">
	$pos-rt:0px;
	$pos-bt:3px;
	$pos-w:212px;
	$pos-h:50px;
	.course-attendance-detail-container{
		.scroll{
			@include position-absolute();
			padding-bottom:10px;
		}
		.header{
			text-align: center;
			color: $color-3;
			padding-bottom: 10px;
			@include border-bottom();
			.course-name{
				height: 44px;
				line-height: 44px;
				font-size: 18px;
			}
			.time-and-teacher{
				@include flex-center();
				.teacher{
					color:$color-primary;
					margin-left: 10px;
				}
			}
		}
		.course-content-title,.img-title{
			height: 40px;
			line-height: 40px;
			font-size: 16px;
			text-align: left;
			padding: 0 12px;
		}
		.course-content{
			color: $color-3;
			padding: 0 12px;
			padding-bottom:10px;
		}
		.img-area{
			padding: 0 12px;
			padding-bottom:10px;
			img{
				width: 100%;
				height: auto;
				vertical-align: bottom;
    			margin-bottom: 3px;
			}
			.item{
				position: relative;
				.mask{
					position: absolute;
					width: $pos-w;
					height: $pos-h;
					bottom:$pos-bt;
					right: $pos-rt;
					background: rgba(204,204,204,0.75);
					z-index: 2;
				}
				.watermark{
					position: absolute;
					width: $pos-w;
					height: $pos-h;
					bottom:$pos-bt;
					right: $pos-rt;
					padding: 5px;
					z-index: 3;
					.time,.room{
						color: $color-3;
						line-height: 20px;
					}
					.room{
						@include ellipsis-single();
					}
				}
			}
		}
	}

	.error-temp{
		@include position-absolute;
		z-index: 2;
	}
</style>


<template>
	<div class="course-attendance-detail-container">
		<scroller-base class="scroll" :data="renderData">
			<div class="header">
				<div class="course-name">{{Data.courseName}}</div>
				<div class="time-and-teacher">
					<div class="time">{{Data.SignInDate}}</div>
					<div class="teacher">{{Data.teacherName}}</div>
				</div>
			</div>

			<div class="course-content-title" v-if="Data.data&&Data.data.Content!=''">上课内容</div>
			<div class="course-content" v-if="Data.data&&Data.data.Content!=''" v-html="Data.data.Content"></div>

			<div class="img-title" v-if="Data.data&&Data.data.Files">课堂互动</div>
			<div ref="imgsBox">
				<div class="img-area" v-if="Data.data&&Data.data.Files">
					<div class="item" v-for="(item,index) in Data.data.Files" :key="index">
						<img :src="item.FilePath">
						<div class="mask"></div>
						<div class="watermark">
							<div class="time">上课时间：{{Data.SignInDate&&Data.SignInDate.substring(0,16)}}</div>
							<div class="room">上课教室：{{Data.classRoomName}}</div>
						</div>
					</div>
				</div>
			</div>
		</scroller-base>
		<loading class="loading" v-show="isLoading"></loading>
		<error-page class="error-temp" v-if="errorFlag" :type="600" :text="errorTips"></error-page>
	</div>
</template>

<script>
	// 上课点名之后，家长会收到推送，查看课堂内容或照片。
	// 家长端原本没有点名相关内容，因也是课堂情况，先放在comment模块，后续有更多的推送或有相关模块再调整结构。

	// 只能通过推送进入
	// 有上课内容||上课照片即可查看推送详情
	// 考虑到预览不能展示水印，目前不考虑图片预览
		 
	import { processGet } from "parent/api/common";
	import ErrorPage from 'parent/components/common/error-page/error-page';
	
	export default {
		name: "course-attendance-detail",
		mixins: [app.mixin.popupWindowRouteMixin],
		data() {
			return {
				wxTitle: "课堂详情",
				isLoading:true,
				Data:{},
				errorFlag: false, //取消上课
                errorTips: '',  //取消上课提示语
				refreshNum:0
			};
		},
		computed:{
			renderData(){
				return {
					Data:this.Data,
					refreshNum:this.refreshNum
				}
			}
		},
		methods: {
			getData(){
				processGet({
					pname:'courseAttendanceDetail',
					id:this.$route.params.id
				}).then((res)=>{
					this.isLoading = false;
					if(res.errcode==app.errok){
						this.Data = res;
						this.$nextTick(()=>{
							this.processor();
						})
						
					}else if(res.errcode==450){
						this.errorFlag = true;
						this.errorTips = res.errmsg;
					}else{
						app.toast('error',res.errmsg);
						setTimeout(()=>{	
							app.sdk.closeWindow();
						},2000)
					}
				})
				
			},
			//图片每次加载之后刷新滚动条即可
			imageLoadHandler(img) {
				return new Promise(resolve => {
					img.addEventListener('load', () => {
						resolve('onload');
					})
					img.addEventListener('error', () => {
						resolve('onerror');
					})
				}).then(res => {
					this.refreshScroll();
				})
			},
			// 获取所有图片
			processor() {
				let imgsBox = this.$refs.imgsBox,
					imgs = imgsBox.querySelectorAll("img"),
					// 是否是以'http://'、'https://'开头,或者是base64;
                    regHeader = new RegExp('^((http|https):\/\/|data:image)');
                    
				Array.prototype.forEach.call(imgs, (img, index) => {
					let src = img.src;
					if (src && regHeader.test(src)) {
						this.imageLoadHandler(img);
					}
				})
				
			},
			refreshScroll(){
				this.refreshNum ++
			}
		},
		created(){
			this.getData()
		},
		components: {
			ErrorPage
		}
	}

</script>