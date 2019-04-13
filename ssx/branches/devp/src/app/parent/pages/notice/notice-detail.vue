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
                -webkit-user-select: text;
                -moz-user-select: text;
                -ms-user-select: text;
                user-select: text;
                .video{
                    padding: 0 10px;
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
				<div class="title">{{page == 0 ? detail.title :detail.title}}</div>
				<div class="info">
					<span>{{ page == 0 ? detail.createtime :detail.date}}</span>
					<span class="info-user" v-if="page==0" @click="()=>{app.gotoIM({toUserID: detail.teacherUserID})}">
						{{detail.nickname}}
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-lianxilaoshi"></use>
						</svg>
					</span>
				</div>
			</div>
			<scroller-base  ref="scroller"
				class="scroller" 
				:data="detail.content">
				<rich-text-area 
					v-if="detail.content" 
					:richText="detail.content"
					:enableImgLoadEvent="true"
					:enableImagePreview="true"
					@imgLoaded="imgLoaded">
				</rich-text-area>
                <!-- 视频 -->
                <div class="video" v-if="detail.ListVideo&&detail.ListVideo.length>0">
                    <video-area 
                        :edit="false"
                        :videoFileList="detail.ListVideo"
                    ></video-area>
                </div>
			</scroller-base>
		</div>
        <error-page class="error-temp" v-if="errorFlag" :type="600" :text="errorTips"></error-page>
		<loading class="loading" v-show="isLoading" :bgType="2"></loading>
	</div>
</template>
<script>
	import {getnotice,getmessageinfo} from "parent/api/common";
    import ErrorPage from 'parent/components/common/error-page/error-page';
	import RichTextArea from 'parent/components/common/rich-text-area/rich-text-area';

	const TAB_PAGE = ['message_detail','publicInfo_detail'];
	export default {
		name: "notice-detail",
		data() {
			return {
				wxTitle: app.tool.parseHash().query.type == 1 ? "公告详情" : "通知详情",
				isLoading: true,
				page:0,
                detail: null,
                errorFlag: false, //被删除
                errorTips: '',  //删除提示语
			}
		},
		methods:{
			imgLoaded(){
				this.$refs.scroller.refresh();
			}
		},
		created() {
			let param = app.tool.parseHash();
			this.page = param.query.type;
			
			console.log(param)
			if(this.page == 0){
				//通知详情
				getmessageinfo({
					messageid:param.query.id,
					usertype:1,
					studentid:param.hashArr[1]
				}).then(res => {
					console.log(res)
					this.isLoading = false;
					if (res.result.code  == app.errok) {
					app.eventDefine.emit("notice_list_read_event",param.hashArr[1]);
                    res.data.content = 	app.tool.richTextToHtml(this.page==1?app.dom.parseDom(res.data.content):res.data.content);
					this.detail = res.data;
					}else if (res.result.code  == 600) { //通知被删除
						this.errorFlag = true;
						this.errorTips = res.errmsg;
					}
				})
			}else{
				//公告详情
				getnotice({
					id:param.hashArr[1]
				}).then(res => {
					console.log(res)
					this.isLoading = false;
					if (res.result.code == app.errok) {
					app.eventDefine.emit("notice_list_read_event",param.hashArr[1]);
                    res.data.content = 	app.tool.richTextToHtml(this.page==1?app.dom.parseDom(res.data.content):res.data.content);
					this.detail = res.data;
                }else if (res.result.code  == 600) { //通知被删除
                    this.errorFlag = true;
                    this.errorTips = res.errmsg;
                }
				})
			}

		/* 	processGet({
				pname:TAB_PAGE[this.page],
				id:param.hashArr[1]
			}).then(res=>{
                this.isLoading = false;
                if (res.errcode == app.errok) {
					app.eventDefine.emit("notice_list_read_event",param.hashArr[1]);
                    res.data.content = 	app.tool.richTextToHtml(this.page==1?app.dom.parseDom(res.data.content):res.data.content);
					this.detail = res.data;
                }else if (res.errcode == 600) { //通知被删除
                    this.errorFlag = true;
                    this.errorTips = res.errmsg;
                }
	   		}) */
		},

		components: {
            ErrorPage,
			RichTextArea
		}
	}
</script>