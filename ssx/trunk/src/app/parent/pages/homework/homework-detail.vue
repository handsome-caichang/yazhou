<!--作业详情页-->
<style scoped lang="scss">
	
	
	.homework-detail{
        .scroller{
            @include position-absolute;
            overflow: hidden;
            background-color: #EDF1F7;
            &.no-submit{
                bottom: 49px;
            }
            .body{
                padding: 10px 15px;
            }
            .void{
                height: 10px;
            }
            .header{
                padding: 11px 15px 0 15px;
                background-color: #ffffff;
                border-top-left-radius: 2px;
                border-top-right-radius: 2px;
                .title{
                    color: $color-3;
                    @include fs-lh(16);
                }
                .info{
                    padding: 9px 0 3px 0;
                    @include fs-lh(12);
                    .time-icon{
                        margin-right: 5px;
                    }
                    .teacher-icon{
                        margin-left: 5px;
                    }
                    .info-user{
                        color: $color-primary;
                        float: right;
                    }
                }
            }
            .content{
                border-radius: 2px;
                background-color: $color-white;
                .rich-text{
                    padding: 10px 5px 5px 5px;
                    -webkit-user-select: text;
                    -moz-user-select: text;
                    -ms-user-select: text;
                    user-select: text;
                }
                .content-video{
                    padding: 5px 15px;
                }
                .content-hd{
                    position: relative;
                    color: #666666;
                    font-size: 15px;
                    padding: 0 15px;
                    &.task{
                        height: 40px;
                        line-height: 40px;
                        padding: 0 15px 0 41px;
                    }
                    .content-hd-icon{
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 15px;
                        margin: auto 0;
                        width: 16px;
                        height: 16px;
                        border-radius: 4px;
                        @include flex-center;
                        svg{
                            width: 9px;
                            height: 9px;
                            color: #ffffff;
                        }
                        &.bg2{
                            background: linear-gradient(#FFD300, #FFC700);
                        }
                    }
                    .content-hd-time{
                        float: right;
                        font-size: 12px;
                    }
                    .content-hd-teacher{
                        position: relative;
                        padding: 15px 0 15px 50px;
                        height: 70px;
                        line-height: 1;
                        color: #333333;
                        .content-hd-avatar{
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            margin: auto 0;
                            width: 40px;
                            height: 40px;
                            border-radius: 100%;
                            background-color: #EEF1F6;
                            background-repeat: no-repeat;
                            background-size: cover;
                            border: 1px solid #ffffff;
                        }
                        .content-hd-score{
                            color: #1E88F5;
                            font-size: 24px;
                            position: absolute;
                            top: 15px;
                            right: 40px;
                            line-height: 1;
                            .score{
                                font-size: 15px;
                                color: #333333;
                            }
                        }
                        .content-hd-time{
                            font-size: 12px;
                            padding-top: 10px;
                            color: #666666;
                            float: left;
                        }
                        .content-hd-comment{
                            position: absolute;
                            top: 0;
                            right: -10px;
                            font-size: 44px;
                        }
                    }
                }
                .content-bd{
                    padding: 0 5px;
                    &.pd{
                        padding: 0 15px;
                        overflow: hidden;
                    }
                    .content-box{
                        word-break: break-all;
                        border-radius: 2px;
                        padding: 5px 10px;
                        border: 1px solid #E0E5EE;
                        background-color: #FFFDF5;
                        -webkit-user-select: text;
                        -moz-user-select: text;
                        -ms-user-select: text;
                        user-select: text;
                        &.comment{
                            background-color: #F9FBFD;
                        }
                    }
                    .wrapper{
                        padding-top: 10px;
                    }
                }
                .content-feedback-more{
                    @include flex-center;
                    height: 52px;
                    color: #999999;
                    font-size: 12px;
                    .icon{
                        padding-right: 5px;
                        color: #cccccc;
                    }
                }
                .link-wrap{
                    padding: 5px 15px;
                    .link{
                        @include flex-between;
                        padding: 5px 0;
                        font-size: 14px;
                        .link-address{
                            text-decoration: underline;
                            color: $color-primary;
                            flex: 1;
                            @include ellipsis-single;
                        }
                    }
                }
            }
            textarea{
                height: 120px;
                padding: 12px;
                vertical-align: top;
                border-radius: 2px;
                border: 1px solid #E0E5EE;
                resize: none;
            }
        }
        .footer{
			position: absolute;
			height: 49px;
			bottom: 0;
			left: 0;
			right: 0;
			font-size: 16px;
			line-height: 49px;
			@include flex-center;
			*{
				flex: 1;
				@include flex-center;
			}
			.save-btn{
				@include border-top;
                background-color: #ffffff;
			}
			.submit-btn{
				color: $color-white;
				background-color: $color-primary;
			}
		}
        .error-temp{
			@include position-absolute;
            background-color: $color-white;
		}
	}
</style>

<template>
	<div class="homework-detail">
		<div v-if="detail&&replyDetail">
			<scroller-base 
                class="scroller" 
                :data="renderData"
                :class="{'no-submit':(!taskWork||(taskWork&&taskWork.isTemp==1))}">
                <div class="body">
				    <!-- 老师发布 -->
                    <div class="header">
                        <div class="title">{{detail.subject}}</div>
                        <div class="info">
                            <span>
                                <svg class="icon time-icon" aria-hidden="true">
                                    <use xlink:href="#icon-shangkeshijianicon"></use>
                                </svg>{{detail.createTime|formatDatetime('yyyy.MM.dd hh:mm')}}
                            </span>
                            <span class="info-user" @click="()=>{app.gotoIM({toUserID: detail.teacherUserID})}">{{detail.createUser}}
                                <svg class="icon teacher-icon" aria-hidden="true">
                                    <use xlink:href="#icon-lianxilaoshi"></use>
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="content">
                        <rich-text-area 
                            class="rich-text"
                            :richText="app.tool.richTextToHtml(detail.content)" 
                            @imgLoaded="imgNums+=1"
                            v-show="isShowMoreContent"></rich-text-area>
                        <video-area v-if="detail.ListVideo.length>0"
                            class="content-video"
                            :edit="false"
                            :videoFileList="detail.ListVideo"
                            v-show="isShowMoreContent"></video-area>
                        <file-area v-if="detail.attachments.length>0"
                            class="content-video"
                            :edit="false"
                            :fileList="detail.attachments"
                            v-show="isShowMoreContent"></file-area>
                        <div class="link-wrap" v-if="detail.linkList&&detail.linkList.length" v-show="isShowMoreContent">
                            <div class="link" v-for="(item,index) in detail.linkList" :key="index">
                                <a class="link-address" :href="item.FilePath">{{item.Name}}</a>
                            </div>
                        </div>
                        <div class="content-feedback-more" 
                            v-if="comment"
                            @click="()=>{showContent=!showContent}">
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="isShowMoreContent?'#icon-shangla':'#icon-xiala'"></use>
                            </svg>{{isShowMoreContent?'收起':'展开完整内容'}}
                        </div>
                        <div class="void" v-else></div>
                    </div>
                    <!-- 我的回答：isTemp：1草稿0正式 -->
                    <div class="void"></div>
                    <div class="content">
                        <div class="content-hd task">
                            <span class="content-hd-icon bg2">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-wodezuoye"></use>
                                </svg>
                            </span>我的回答
                            <span class="content-hd-time" v-if="taskWork">{{taskWork.createTime}}</span>
                        </div>
                        <!-- 我的回答：isTemp：1草稿 -->
                        <div class="content-bd pd" v-if="!taskWork||(taskWork&&taskWork.isTemp==1)">
                            <textarea 
                                v-model="content"
                                placeholder="请在此回答作业内容（限300字）"
                                @touchstart="app.area.start($event)"
                                @touchmove="app.area.move($event)"
                                @touchend="app.area.end($event)"
                                maxlength="300">
                            </textarea>
                            <voice-recording 
                                class="wrapper"
                                eventType="click"
                                :edit="true"
                                :audioFileList="voiceArrDefault"
                                @voiceFinished="voiceFinished">
                            </voice-recording>
                            <img-area
                                class="wrapper"
                                :imageMaxNum=9
                                :imageFileList="imageArrDefault"
                                @imageLoaded="()=>{this.imgNums++}"
                                @imageFinished="imageFinished">
                            </img-area>
                            <video-area
                                class="wrapper"
                                :edit="true"
                                :videoFileList="videoArrDefault"
                                :getAppToken="getAppToken"
                                @videoFinished="videoFinished">
                            </video-area>
                            <file-area 
                                class="wrapper"
                                :edit="true"
                                :fileList="attachmentsArrDefault"
                                :getAppToken="getAppToken"
                                @fileFinished="fileFinished"
                            ></file-area>
                            <div class="void"></div>
                        </div>
                        <!-- 我的回答：isTemp：0正式 -->
                        <div class="content-bd pd" v-if="taskWork&&taskWork.isTemp==0">
                            <div class="content-box" 
                                 v-if="content"
                                 v-show="showTaskWorkType==1"
                                 v-html="app.tool.textToHtml(content)">
                            </div>
                            <voice-recording
                                class="wrapper"
                                :edit="false"
                                :audioFileList="voiceArr"
                                v-if="voiceArr.length>0"
                                v-show="showTaskWorkType==2||isShowMoreTaskWork"></voice-recording>
                            <img-area
                                class="wrapper"
                                :edit="false"
                                :imageType="0"
                                :imageFileList="imageArr"
                                @imageLoaded="()=>{this.imgNums++}"
                                v-if="imageArr.length>0"
                                v-show="showTaskWorkType==3||isShowMoreTaskWork"></img-area>
                            <video-area 
                                class="wrapper"
                                :edit="false"
                                :videoFileList="videoArr"
                                v-if="videoArr.length>0"
                                v-show="showTaskWorkType==4||isShowMoreTaskWork"></video-area>
                            <file-area 
                                class="wrapper"
                                :edit="false"
                                :fileList="attachmentsArr"
                                v-if="attachmentsArr.length>0"
                                v-show="showTaskWorkType==5||isShowMoreTaskWork"></file-area>
                            <div class="content-feedback-more" 
                                @click="()=>{isShowMoreTaskWork=!isShowMoreTaskWork}"
                                v-if="taskWorkTypeNums>1">
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="isShowMoreTaskWork?'#icon-shangla':'#icon-xiala'"></use>
                                </svg>{{isShowMoreTaskWork?'收起':'展开完整内容'}}
                            </div>
                            <div v-else class="void"></div>
                        </div>
                    </div>
                    <!-- 老师点评 -->
                    <div class="void" v-if="comment"></div>
                    <div class="content" v-if="comment">
                        <div class="content-hd">
                            <div class="content-hd-teacher">
                                <div class="content-hd-avatar" :style="'background-image:url('+replyDetail.teacherPhoto+')'"></div>
                                <div>
                                    <div>{{replyDetail.teacherNickName}}</div>
                                    <div class="content-hd-time">{{comment.createTime}}</div>
                                </div>
                                <div class="content-hd-score">{{comment.score}}<span class="score" v-if="comment.scoreType==0">分</span></div>
                                <svg class="icon content-hd-comment" aria-hidden="true">
                                    <use xlink:href="#icon-dianpingbiaoqian"></use>
                                </svg>
                            </div>
                        </div>
                        <div class="content-bd pd">
                            <div class="content-box comment" 
                                v-if="comment.content"
                                v-html="app.tool.textToHtml(comment.content)"></div>
                            <voice-recording v-if="comment.ListAudioFile.length>0"
                                class="wrapper"
                                :edit="false"
                                :audioFileList="comment.ListAudioFile"></voice-recording>
                            <img-area v-if="comment.ListImgFile.length>0"
                                class="wrapper"
                                :edit="false"
                                :imageType="0"
                                :imageFileList="comment.ListImgFile"
                                @imageLoaded="()=>{this.imgNums++}"></img-area>
                            <video-area v-if="comment.ListVideo.length>0"
                                class="wrapper"
                                :edit="false"
                                :videoFileList="comment.ListVideo"></video-area>
                            <file-area v-if="comment.attachments.length>0"
                                class="wrapper"
                                :edit="false"
                                :fileList="comment.attachments"></file-area>
                        </div>
                        <div class="void"></div>
                    </div>
                </div>
			</scroller-base>
            <div class="footer" v-if="!taskWork||(taskWork&&taskWork.isTemp==1)">
                <div class="save-btn" @click="submit(1)">存为草稿</div>
                <div class="submit-btn" @click="submit(0)">提交</div>
            </div>
		</div>
        <error-page class="error-temp" v-if="errorFlag" :type="600" :text="errorTips"></error-page>
		<loading class="loading" v-show="isLoading" bgType="1"></loading>
	</div>
</template>

<script>
    import {processGet,savePost,getUploadToken} from 'parent/api/common';
    import ErrorPage from 'parent/components/common/error-page/error-page';
	import RichTextArea from 'parent/components/common/rich-text-area/rich-text-area.vue';

	export default {
		name: 'homework-detail',
		mixins: [app.mixin.shareMixin],
		data () {
			return {
				wxTitle: '作业详情',
                isLoading: true,
                errorFlag: false, //作业删除
                errorTips: '',  //作业删除提示语
				queryPara: null,
				detail: null,
                imgNums: 0,
                replyDetail: null,
                comment: null,
                taskWork: null,
                voiceDelete: [], //我的回答-已删除语音
                voiceArr: [], //我的回答-语音
                voiceArrDefault: [], //我的回答-已有语音
                imageDelete: [], //我的回答-已删除图片
                imageArr: [], //我的回答-图片
                imageArrDefault: [], //我的回答-已有图片
                videoDelete: [], //我的回答-已删除视频
                videoArr: [], //我的回答-视频
                videoArrDefault: [], //我的回答-已有视频
                attachmentsDelete: [], //我的回答-已删除文件
                attachmentsArr: [], //我的回答-文件
                attachmentsArrDefault: [], //我的回答-已有文件
                content: '', //我的回答-内容
                showTaskWorkType: 0, //我的回答-展示类型
                isShowMoreTaskWork: false, //我的回答-展示更多
                taskWorkTypeNums: 0,
                showContent: false, //作业-展示更多
			}
		},
		computed: {
			renderData(){
				return {
					imgNums: this.imgNums,
                    detail: this.detail,
                    images: this.imageArr,
                    voices: this.voiceArr,
                    videos: this.videoArr,
                    voices: this.voiceArr,
					attachments: this.attachmentsArr,
                    isShowMoreContent: this.isShowMoreContent,
                    isShowMoreTaskWork: this.isShowMoreTaskWork
				}
            },
            isShowMoreContent(){  //作业-展示更多
                return this.comment ? this.showContent : true;
            }
		},
		methods: {
            ...Vuex.mapMutations([
				'set_homeworkDetailRefresh'
			]),
			getDetail(){ //获取详情
                let getWorkPromise = processGet({
                        pname: 'message_detail',
                        id: this.queryPara.id
                    }),
                    getReplyPromise = processGet({
                        pname: 'message_reply_detail',
                        refMessageId: this.queryPara.id,
                        type: 5
                    })

                Promise.all([getWorkPromise,getReplyPromise]).then(res => {
                    this.isLoading = false;
					if (res[0].errcode == app.errok && res[1].errcode == app.errok) {
                        this.detail = res[0].data;
                        this.replyDetail = res[1];
                        this.comment = res[1].Comment;
                        this.taskWork = res[1].TaskWork;
                        this.content = res[1].TaskWork?res[1].TaskWork.content:'';
                        this.voiceArr = res[1].TaskWork?res[1].TaskWork.ListAudioFile:[];
                        this.imageArr = res[1].TaskWork?res[1].TaskWork.ListImgFile:[];
                        this.videoArr = res[1].TaskWork?res[1].TaskWork.ListVideo:[];
                        this.attachmentsArr = res[1].TaskWork?res[1].TaskWork.attachments:[];

                        this.voiceArrDefault = app.tool.clone(this.voiceArr);
                        this.imageArrDefault = app.tool.clone(this.imageArr);
                        this.videoArrDefault = app.tool.clone(this.videoArr);
                        this.attachmentsArrDefault = app.tool.clone(this.attachmentsArr);
                        this.comment && this.handlerComment();
                        this.taskWork && this.handlerTaskWork();
					}else if (res[0].errcode == 600) { //作业被删除
                        this.errorFlag = true;
                        this.errorTips = res[0].errmsg;
                    }
                })
            },
            handlerComment(){
                //处理分享：老师点评作业后，id需要传taskwork里的id
                this.v_shareResolve({
                    title:'晒作业啦',
                    desc:'今天的成绩是昨天的汗水，明天的成功还须今天的努力',
                    link:`${location.protocol}//${location.host}/weixin/parent/share/homework/homeworkShare.html?id=${this.taskWork.id}`,
                    imgUrl: location.protocol + "//" + location.host + '/weixin/parent/share/homework/imgs/ShareImg.png'
                })
                
                //处理分数
                if (this.comment.score) {
                    this.comment.scoreType = this.comment.score.split('-')[0];
                    this.comment.score = this.comment.score.split('-')[1];
                }
            },
            handlerTaskWork(){
                if (this.taskWork.content) { //文字
                    this.showTaskWorkType = 1;
                }else if (this.taskWork.ListAudioFile.length > 0) { //语音
                    this.showTaskWorkType = 2;
                }else if (this.taskWork.ListImgFile.length > 0) { //图片
                    this.showTaskWorkType = 3;
                }else if (this.taskWork.ListVideo.length > 0) { //视频
                    this.showTaskWorkType = 4;
                }else if (this.taskWork.attachments.length > 0) { //文件
                    this.showTaskWorkType = 5;
                }

                this.taskWork.content!='' && this.taskWorkTypeNums++;
                this.taskWork.ListAudioFile.length>0 && this.taskWorkTypeNums++;
                this.taskWork.ListImgFile.length>0 && this.taskWorkTypeNums++;
                this.taskWork.ListVideo.length>0 && this.taskWorkTypeNums++;
                this.taskWork.attachments.length>0 && this.taskWorkTypeNums++;
            },
            getAppToken() {
                return getUploadToken().then(res => {
                    if (res.ErrorCode) {
                        return res.Data
                    } else {
                        return Promise.reject()
                    }
                })
            },
            voiceFinished(voices, delArr){ //处理语音
                this.voiceArr = voices;
                this.voiceDelete = delArr;
            },
            imageFinished(images, delArr){ //处理图片
                this.imageArr = images;
                this.imageDelete = delArr;
            },
            videoFinished(videos, delvideo) { //处理视频
                this.videoArr = videos;
                this.videoDelete = delvideo;
            },
            fileFinished(attachments, delattachments) { //处理文件
                this.attachmentsArr = attachments;
                this.attachmentsDelete = delattachments;
            },
            submit(tempType){ //存为草稿、提交
				if (app.tool.trim(this.content).length==0&&this.imageArr.length==0&&this.voiceArr.length==0&&this.videoArr.length==0&&this.attachmentsArr.length==0) {
                    app.toast('info','请输入提交内容。');
                    return;
                }

                this.isLoading = true;
                let temp = this.voiceArr.concat(this.imageArr,this.videoArr,this.attachmentsArr),
                    promises = [],
                    mediaIds = [],
                    videoIds = [],
                    attachmentsIds = [];
                temp.forEach(item => {
                    item.promise && promises.push(item.promise);
                });
                if (promises.length>0) {
                    Promise.all(promises).then(res => {
                        res.forEach(item => {
                            if (item.type == 'video') {
                                videoIds.push(item);
                            } else if (item.type == 'file') {
                                attachmentsIds.push(item);
                            } else {
                                mediaIds.push(item);
                            }
                        });
                        this.save(tempType, mediaIds, videoIds, attachmentsIds);
                    }).catch(rej => {
                        this.isLoading = false;
                        app.toast('error','上传附件失败，请在网络畅通时重新尝试。');
                        return;
                    });
                }else{
                    this.save(tempType, mediaIds, videoIds, attachmentsIds);
                }
            },
            save(type, medias, videos, attachments){
                let temp = this.voiceDelete.concat(this.imageDelete,this.videoDelete,this.attachmentsDelete),
                    saveObj = {
                        saveFlag: 'MESSAGE_TASK_REPLY',
                        id: this.taskWork?this.taskWork.id:'', //草稿id
                        refMessageId: this.queryPara.id, //作业id
                        content: app.tool.arrowFilter(this.content),
                        media_ids: medias.join(), //语音图片
                        listVideo: videos.length>0?JSON.stringify(videos):'', //视频
                        attachments: attachments.length>0?JSON.stringify(attachments):'', //附件
                        contentType: (this.voiceArr.length>0||this.imageArr.length>0||this.videoArr.length>0||this.attachmentsArr.length>0)?3:0, //消息类型
                        isFile: (this.voiceArr.length>0||this.imageArr.length>0)?1:0, //是否包含附件（图片或声音）：0否1是
                        isTemp: type, //是否为草稿：1草稿0正式
                        fileIdList: temp.join() //删除的数据库文件
                    }

                savePost(saveObj).then(res => {
                    this.isLoading = false;
                    if (res.errcode == app.errok) {
                        app.toast('success', type==1?'作业保存成功!':'作业提交成功！');
                        this.set_homeworkDetailRefresh();
                        this.$nextTick(() => {
                            if (this.$route.query.push == 1) { //说明是从推送点进来的
                                app.sdk.closeWindow();
                            } else {
                                this.$router.back();
                            }
						})
                    }else{
                        app.toast('error',res.errmsg);
                    }
                });
            }
		},
		created(){
            this.queryPara = this.$route.params;
            this.getDetail();
		},
		components: {
            ErrorPage,
			RichTextArea
		}
	}
</script>