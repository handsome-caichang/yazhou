<!--作业详情页-->
<style scoped lang="scss">
	
	
	.homework-detail{
		.section{
			.scroller{
				@include position-absolute;
				overflow: hidden;
                background-color: #EDF1F7;
                &.no-submit{
                    bottom: 49px;
                }
                .header{
                    padding: 11px 15px 0 15px;
                    background-color: #ffffff;
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
                
                .body{
                    padding: 10px 15px
                }
                .void{
                    height: 10px;
                }
                .content{
                    background-color: $color-white;
                    border-radius: 4px;
                    .img-box,.voice-wrap,.rich-text{
                        padding: 5px 15px;
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
                            word-break: break-word;
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
                    text-align: center;
                    .submit-btn{
                        color: $color-white;
                        background-color: $color-primary;
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
    <div class="homework-detail">
		<div class="section" v-if="detail">
			<!-- 内容部分 -->
			<scroller-base 
                class="scroller" 
                :class="{'no-submit':!taskWork}"
                :data="renderData">
                <div class="body">
                    <!-- 标题部分 -->
                    <div class="header">
                        <div class="title">{{detail.title}}</div>
                        <div class="info">
                            <span>
                                <svg class="icon time-icon" aria-hidden="true">
                                    <use xlink:href="#icon-shangkeshijianicon"></use>
                                </svg>{{detail.createtime|formatDatetime('yyyy.MM.dd hh:mm')}}
                            </span>
                            <span class="info-user">{{detail.nickname}}
                            </span>
                        </div>
                    </div>
                    <!-- 老师发布 -->
                    <div class="content">
                        <div class="rich-text"
                            v-html="app.tool.richTextToHtml(detail.content)" 
                            v-show="isShowMoreContent">
                        </div>
                        <div class="voice-wrap" v-if="detail.mp3list.length" v-show="isShowMoreContent">
                            <voice-recording
                                    :edit="false"
                                    :audioFileList="detail.mp3list"
                                    @voiceFinished="refreshNum++">
                            </voice-recording>
                        </div>
                        <div class="img-box" v-if="detail.imglist.length"  v-show="isShowMoreContent">
                            <img-area
                                    :edit="false"
                                    :imageType="1"
                                    :imageFileList="detail.imglist"
                                    @imageLoaded="refreshNum++">
                            </img-area>
                        </div>
                        <div class="content-feedback-more" 
                            v-if="comment"
                            @click="()=>{showContent=!showContent}">
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="isShowMoreContent?'#icon-shangla':'#icon-xiala'"></use>
                            </svg>{{isShowMoreContent?'收起':'展开完整内容'}}
                        </div>
                    </div>

                    <!-- 我的回答 -->
                    <div class="void"></div>
                    <div class="content">
                        <div class="content-hd task">
                            <span class="content-hd-icon bg2">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-wodezuoye"></use>
                                </svg>
                            </span>我的回答
                            <span class="content-hd-time" v-if="taskWork">{{taskWork.createtime&&taskWork.createtime.substring(0,16)}}</span>
                        </div>
                       
                        <!-- 我的回答：编辑 -->
                        <div class="content-bd pd" v-if="!taskWork">
                            <textarea 
                                v-model="myreplyContent"
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
                                @imageLoaded="()=>{this.refreshNum++}"
                                @imageFinished="imageFinished">
                            </img-area>
                            <div class="void"></div>
                        </div>
                        <!-- 我的回答：展示 -->
                        <div class="content-bd pd" v-else>
                            <div class="content-box" 
                                 v-if="taskWork.content"
                                 v-show="showTaskWorkType==1"
                                 v-html="app.tool.textToHtml(taskWork.content)">
                            </div>
                            <voice-recording
                                class="wrapper"
                                :edit="false"
                                :audioFileList="taskWork.mp3list"
                                v-if="taskWork.mp3list.length>0"
                                v-show="showTaskWorkType==2||isShowMoreTaskWork"></voice-recording>
                            <img-area
                                class="wrapper"
                                :edit="false"
                                :imageType="0"
                                :imageFileList="taskWork.imglist"
                                @imageLoaded="()=>{this.refreshNum++}"
                                v-if="taskWork.imglist.length>0"
                                v-show="showTaskWorkType==3||isShowMoreTaskWork"></img-area>
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
                                <div class="content-hd-avatar" :style="'background-image:url('+detail.photo+')'"></div>
                                <div>
                                    <div>{{detail.nickname}}</div>
                                    <div class="content-hd-time">{{comment.createtime.substring(0,16)}}</div>
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
                            <voice-recording v-if="comment.mp3list.length>0"
                                class="wrapper"
                                :edit="false"
                                @voiceFinished="refreshNum++"
                                :audioFileList="comment.mp3list"></voice-recording>
                            <img-area v-if="comment.imglist.length>0"
                                class="wrapper"
                                :edit="false"
                                :imageType="0"
                                :imageFileList="comment.imglist"
                                @imageLoaded="()=>{this.refreshNum++}"></img-area>
                        </div>
                        <div class="void"></div>
                    </div>
                </div>
			</scroller-base>
            <div class="footer" v-if="!taskWork">
                <div class="submit-btn" @click="submit()">提交</div>
            </div>
		</div>
        <error-page class="error-temp" v-if="errorFlag" :type="600" :text="errorTips"></error-page>
		<loading class="loading" v-show="isLoading" :bgType="2"></loading>
	</div>
</template>

<script>
	import {gethomeworkdetailinfo,submithomework} from 'parent/api/homework';
    import ErrorPage from 'parent/components/common/error-page/error-page';
	import RichTextArea from 'parent/components/common/rich-text-area/rich-text-area.vue';
    
	export default {
		name: 'homework-detail',
		data () {
			return {
				wxTitle: '作业详情',
                isLoading: true,
                errorFlag: false, //作业删除
                errorTips: '',  //作业删除提示语
                refreshNum: 0,
                queryPara: null,//路由参数
                
                detail: null,//老师布置的作业详情
                showContent: false, //作业-展示更多

                taskWork: null,//我的回答
                myreplyContent:'',//我的回答内容
                voiceArr: [], //我的回答-语音
                voiceArrDefault: [], //我的回答-已有语音
                imageArr: [], //我的回答-图片
                imageArrDefault: [], //我的回答-已有图片
                taskWorkTypeNums:0,
                isShowMoreTaskWork:false,

                comment: null,
			}
		},
		computed: {
			renderData(){
				return {
					refreshNum: this.refreshNum,
                    detail: this.detail,
                    isShowMoreContent: this.isShowMoreContent,
                    isShowMoreTaskWork: this.isShowMoreTaskWork
				}
            },
            isShowMoreContent(){  //作业-展示更多
                return this.comment ? this.showContent : true;
            }
		},
		methods: {
            voiceFinished(voices, delArr){ //处理语音
                this.voiceArr = voices;
                this.refreshNum ++;
            },
            imageFinished(images, delArr){ //处理图片
                this.imageArr = images;
            },
            handlerTaskWork(){
                if (this.taskWork.content) { //文字
                    this.showTaskWorkType = 1;
                }else if (this.taskWork.mp3list.length > 0) { //语音
                    this.showTaskWorkType = 2;
                }else if (this.taskWork.imglist.length > 0) { //图片
                    this.showTaskWorkType = 3;
                }

                this.taskWork.content!='' && this.taskWorkTypeNums++;
                this.taskWork.mp3list.length>0 && this.taskWorkTypeNums++;
                this.taskWork.imglist.length>0 && this.taskWorkTypeNums++;
               
            },
          
			getDetail(){ //获取详情
                gethomeworkdetailinfo({
                    messageid: this.queryPara.id
                }).then(res => {
                    this.isLoading = false;
                    if(res.result.code == app.errok) {
                        this.detail = res.data;
                        // 我的回答
                        if(res.data.issubmit==1){
                            // 已写作业
                            this.taskWork = res.data.submitinfo;
                            this.handlerTaskWork();
                        }
                    
                        //老师点评
                        if(res.data.evalinfo.id){
                            this.comment = res.data.evalinfo;
                        }

                    }else if (res.result.code == 400) { //消息已删除
                        this.errorFlag = true;
                        this.errorTips = res.result.msg;
                    }else {
                        app.toast('error', res.result.msg);
                    }
                })
            },
            submit(){
                console.log('提交this',this)
                if(app.tool.trim(this.myreplyContent)==''&&this.voiceArr.length==0&&this.imageArr.length==0){
                    app.toast('info','请输入提交内容。');
                    return;
                }
                this.isLoading = true;
                let temp = this.voiceArr.concat(this.imageArr),
                    promises = [],
                    mediaIds = [];
                
                temp.forEach(item => {
                    item.promise && promises.push(item.promise);
                });
                if (promises.length>0) {
                    Promise.all(promises).then(res => {
                        res.forEach(item => {
                            mediaIds.push(item); 
                        });
                        this.send({
                            refmessageid:this.queryPara.id,
                            subject:this.detail.title,
                            content:app.tool.arrowFilter(this.myreplyContent),
                            mediaids:mediaIds.join(','),
                        });
                    }).catch(rej => {
                        this.isLoading = false;
                        app.toast('error','上传附件失败，请在网络畅通时重新尝试。');
                        return;
                    });
                }else{
                    this.send({
                        refmessageid:this.queryPara.id,
                        subject:this.detail.title,
                        content:app.tool.arrowFilter(this.myreplyContent),
                        mediaids:'',
                    });
                }
                
            },
            send(params){
                submithomework(params).then((res)=>{
                    this.isLoading = false;
                    console.log(res)
                    if (res.result.code == app.errok) {
                        app.toast('success','作业提交成功！');
                        app.eventDefine.emit('homeworkSave');
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
                })
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