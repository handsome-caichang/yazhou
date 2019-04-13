<!--通知详情-->
<style lang="scss" scoped>
	
	
	.notice-detail {
		.section{
			@include position-absolute;
			background-color: $color-white;
			.header{
				padding: 9px 12px 13px 12px;
				text-align: center;
				@include border-bottom;
				.title{
					color: $color-3;
					@include fs-lh(20);
					@include ellipsis-single;
				}
				.info{
					color:$color-6;
					@include fs-lh(12);
					.info-user{
						color: #A1C0DF;
						margin-left: 10px;
    						svg{
							width:16px;
							height: 16px;
						}
					}
				}
			}
			.scroller{
				position: absolute;
				top: 73px;
				left: 0;
				right: 0;
				bottom: 0;
				overflow: hidden;
				.content{
					.void{
						height: 10px;
					}
					.content-box,.img-box,.voice-box{
						padding: 5px 15px;
					}
				}
				
			}
		}
        .error-temp{
			@include position-absolute;
            background-color: $color-white;
		}
	}
</style>

<template>
	<div class="notice-detail">
		<div class="section" v-if="detail">
			<!-- 标题部分 -->
			<div class="header">
				<div class="title">{{detail.title}}</div>
				<div class="info">
					<span>{{ page == 0 ? detail.createtime :detail.date}}</span>
					<span class="info-user" v-if="page == 0">{{detail.nickname}}
					</span>
				</div>
			</div>
			<scroller-base ref="scroller"
				class="scroller" 
				:data="renderData">
				<div class="content" v-if="page==0">
					<div class="content-box">
						<div class="content" v-html="detail.contentpreview || detail.content"></div>
					</div>
					<div class="voice-box" v-if="detail&&detail.mp3list&&detail.mp3list.length">
						<voice-recording
								:edit="false"
								:audioFileList="detail.mp3list"
								@voiceFinished="refreshNum++">
						</voice-recording>
					</div>
					<div class="img-box" v-if="detail&&detail.imglist&&detail.imglist.length">
						<img-area
							:edit="false"
							:imageType="1"
							:imageFileList="detail.imglist"
							@imageLoaded="refreshNum++">
						</img-area>
					</div>
					
					<div class="void"></div>
				</div>
				<rich-text-area 
					v-if="page==1&&(detail.contentpreview || detail.content)" 
					:richText="detail.contentpreview || detail.content"
					:enableImgLoadEvent="true"
					:enableImagePreview="true"
					@imgLoaded="refreshNum++">
				</rich-text-area>
				
			</scroller-base>
		</div>
        <error-page class="error-temp" v-if="errorFlag" :type="600" :text="errorTips"></error-page>
		<loading class="loading" v-show="isLoading" :bgType="2"></loading>
	</div>
</template>
<script>
	import {getnotice,getteachernoticeinfo} from "parent/api/notice";
	import ErrorPage from 'parent/components/common/error-page/error-page';
	import RichTextArea from 'parent/components/common/rich-text-area/rich-text-area';

//	const TAB_PAGE = ['message_detail','publicInfo_detail'];
	
	export default {
		name: "notice-detail",
		data() {
			return {
				wxTitle: app.tool.parseHash().query.type == 1 ? "公告详情" : "通知详情",
				isLoading: true,
				page:0,
				detail: null,
				refreshNum:0,
                errorFlag: false, //被删除
                errorTips: '',  //删除提示语
			}
		},
		methods:{
			
		},
		computed:{
			renderData() {
                return {
                    refreshNum: this.refreshNum,
                    detail: this.detail,
                }
            }
		},
		created() {
			let param = app.tool.parseHash();
			this.page = param.query.type;
			let request = this.page == 0 ? getteachernoticeinfo : getnotice;
			
			request({
				id:param.hashArr[1]
			}).then(res=>{
                this.isLoading = false;
                if (res.result.code == app.errok) {
                	app.eventDefine.emit("notice_list_read_event",param.hashArr[1]);
                    res.data.content = 	app.tool.richTextToHtml(res.data.content);
                    this.detail = res.data;
                }else if (res.result.code == 400) { //通知被删除
                    this.errorFlag = true;
                    this.errorTips = res.result.msg;
                }else {
                    app.toast('error', res.result.msg);
                }
	   		})
		},
		components: {
			ErrorPage,
			RichTextArea
		}
	}
</script>