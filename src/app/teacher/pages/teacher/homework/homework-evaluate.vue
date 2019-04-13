<!--作业点评页-->
<style scoped lang="scss">
    
    

    .homework-evaluate {
        .scroller {
            @include position-absolute(0, 0, 49px, 0);
            background-color: $color-assist-1;
            &.bottom-distance{
                bottom: 0;
            }
            .pad{
                padding: 10px 15px;
            }
            overflow: hidden;
            .homework-msg{
                background-color: $color-white;
                height: 71px;
                padding: 10px 10px 15px 15px;
                @include flex-between;
                .msg-lf{
                    max-width: 94%;
                }
                .title{
                    font-size: 16px;
                    color: $color-primary;
                    margin-bottom: 16px;
                    @include ellipsis-single;
                }
                .teacher-date{
                    display: flex;
                    font-size: 12px;
                    color: $color-6;
                    height: 16px;
                    line-height: 16px;
                    .date{
                        margin-left: 20px;
                    }
                    .icon{
                        margin-right: 5px;
                    }
                }
            }
            .homework-area {
                background-color: $color-white;
                .student-msg{
                    height: 70px;
                    padding: 15px;
                    padding-right: 40px;
                    display: flex;
                    position: relative;
                    .head-img{
                        width: 40px;
                        height: 40px;
                        border-radius: 40px;
                        background-color: $color-assist-1;//默认头像背景色
                        margin-right: 10px;
                        @include background-img(false,cover);
                    }
                    .name{
                        font-size: 15px;
                        color: $color-3;
                        margin-bottom: 10px;
                        @include ellipsis-single;
                    }
                    .date{
                        line-height: 1;
                        font-size: 12px;
                        color: $color-6;
                    }
                    .icon{
                        position: absolute;
                        top: 0;
                        right: 5px;
                        font-size: 44px;
                    }
                }
                .content {
                    padding: 0 12px;
                    padding-bottom: 15px;
                    .content-text {
                        padding: 10px;
                        border: 1px solid #E0E5EE;
                        background-color: #FFFDF5;
                        border-radius: 2px;
                        word-break: break-word;
                        font-size: 15px;
                        color: $color-3;
                    }
                    .voice,.img-judge,.video-show,.file-show {
                        padding-top: 15px;
                        &.top-distance{
                            padding-top: 0;
                        }
                    }
                }
                .show-more{
                    font-size: 12px;
                    height: 52px;
                    line-height: 52px;
                    color:$color-9;
                    text-align: center;
                    .icon{
                        margin-right: 5px;
                    }
                }
            }
            .evaluate-area-title {
                background-color: $color-white;
                height: 40px;
                line-height: 40px;
                @include flex-between;
                padding: 0 15px;
                .words-ins {
                    .icon {
                        width: 16px;
                        height: 16px;
                        font-size: 16px;
                    }
                }
                .date {
                    font-size: 12px;
                    .icon {
                        width: 15px;
                        height: 15px;
                        font-size: 15px;
                    }
                }
            }
            .evaluate-area {
                background-color: $color-white;
                padding: 0 15px 15px 15px;
                .points {
                    @include flex-between;
                    height: 44px;
                    line-height: 44px;
                    padding: 0 12px;
                    border: 1px solid #E0E5EE;
                    border-radius: 2px;
                    .level-box {
                        max-width: 300px;
                        text-align: right;
                    }
                    .level-name {
                        display: inline-block;
                        font-size: 12px;
                        max-width: 260px;
                        color: #bbbbbb;
                        @include ellipsis-single;
                        vertical-align: bottom;
                        &.blue{
                            color: $color-primary;
                        }
                    }
                    input {
                        text-align: right;
                        padding: 0px;
                        padding-right: 2px;
                        margin: 0px;
                        height: 30px;
                        line-height: 30px;
                        color: $color-primary;
                        &.readOnlyInput {
                            disabled: disabled;
                        }
                    }
                }
                .tem {
                    @include flex-between;
                    background-color: $color-white;
                    height: 40px;
                    line-height: 40px;
                }
                .text-wrap {
                    /*padding-bottom: 12px;*/
                    padding-top: 15px;
                    .comment-text, .comment-text-fixed {
                        color: $color-3;
                        border: 1px solid $color-border;
                        border-radius: 2px;
                        padding: 10px;
                        word-break: break-word;
                        resize: none;
                    }
                    .comment-text {
                        font-family: inherit;
                        height: 160px;
                        box-shadow: none;
                        margin-top: 0px;
                        resize: none;
                    }
                    .comment-text-fixed{
                        background-color: #F3F9FF;
                    }
                    &.top-distance {
                        padding-top: 0;
                    }
                }
                .voice-wrap {
                    font-size: 12px;
                    color: $color-primary;
                    text-align: center;
                    /*padding: 12px 0;*/
                    padding-top: 15px;
                    background-color: $color-white;
                }
                .img-box,.just-show,.video-box,.file-wrap{
                    padding-top: 15px;
                }
            }
        }
    }
    .footer{
        position: absolute;
        width: 100%;
        bottom: 0;
        font-size: 16px;
        .edit{
            height: 49px;
            line-height: 49px;
            text-align: center;
            color: $color-white;
            background-color: $color-primary;
        }
        .btn-area {
            .submit-btn {
                height: 49px;
                line-height: 49px;
                text-align: center;
                color: $color-white;
                background-color: $color-primary;
                border-radius: 2px;
            }
            .edit-submits {
                @include flex-around;
                border-radius: 2px;
                div {
                    flex: 1;
                    border-radius: 2px;
                    height: 49px;
                    line-height: 49px;
                    text-align: center;
                }
                .cancel {
                    color: $color-6;
                }
                .sub-btn {
                    color: $color-white;
                    background-color: $color-primary;
                }
            }
        }
    }
    .void {
        width: 100%;
        height: 10px;
        background-color: $color-assist-1;
    }

    .as-points {
        @include position-absolute(0, 0, 0, 0);
        z-index: 2;
    }
</style>

<template>
    <div class="homework-evaluate">

        <scroller-base
                :data="renderData"
                class="scroller"
                :class="{'bottom-distance':!isToday}"
                ref="homeworkEvaluateScroller">
            <div class="pad">
                <!--作业概况-->
                <div class="homework-msg" @click="goToHomeworkDetail(homeworkMsg.taskId)">
                    <div class="msg-lf">
                        <div class="title">{{homeworkMsg.taskTitle}}</div>
                        <div class="teacher-date">
                            <div class="teacher">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-laoshiicon1"></use>
                                </svg>
                                {{homeworkMsg.teacherName}}
                            </div>
                            <div class="date">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-shangkeshijianicon"></use>
                                </svg>
                                {{homeworkMsg.taskCreateTime.replace(/-/g,'.')}}
                            </div>
                        </div>
                    </div>
                    <div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
                <div class="void"></div>

                <!--学生作业区域-->
                <div class="homework-area" v-if="!app.tool.isEmptyObject(homeworkObj)">
                    <div class="student-msg">
                        <div class="head-img" :style="'background-image:url('+homeworkObj.studentPhoto+')'"></div>
                        <div>
                            <div class="name">{{homeworkObj.studentName}}</div>
                            <div class="date">{{homeworkObj.createTime.replace(/-/g,'.')}}</div>
                        </div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-huidabiaoqian"></use>
                        </svg>
                    </div>
                    <!--学生回复内容-->
                    <div class="content">
                        <div v-if="homeworkObj.content!=''" v-show="complexFlag===1">
                            <div class="content-text" v-html="homeworkObj.content">
                            </div>
                        </div>
                        <div class="voice"
                             :class="{'top-distance':complexFlag===2}"
                             v-if="!app.tool.isEmptyObject(homeworkObj)&&homeworkObj.ListAudioFile.length>0"
                             v-show="complexFlag===2||showDetailsFlag">
                            <voice-recording
                                    :edit="false"
                                    :audioFileList="homeworkObj.ListAudioFile">
                            </voice-recording>
                        </div>
                        <div class="img-judge"
                             :class="{'top-distance':complexFlag===3}"
                             v-if="!app.tool.isEmptyObject(homeworkObj)&&homeworkObj.ListImgFile.length>0"
                             v-show="complexFlag===3||showDetailsFlag">
                            <img-area
                                    :edit="false"
                                    :imageType="0"
                                    :imageFileList="homeworkObj.ListImgFile"
                                    @imageLoaded="imageLoaded"
                                    v-if="!app.tool.isEmptyObject(homeworkObj)&&homeworkObj.ListImgFile.length>0">
                            </img-area>
                        </div>
                        <div class="video-show"
                             :class="{'top-distance':complexFlag===4}"
                             v-show="complexFlag===4||showDetailsFlag">
                            <video-area
                                    :edit="false"
                                    :videoFileList="homeworkObj.ListVideo">
                            </video-area>
                        </div>
                        <div class="file-show"
                             v-if="!app.tool.isEmptyObject(homeworkObj)&&homeworkObj.attachments.length>0"
                             :class="{'top-distance':complexFlag===5}"
                             v-show="complexFlag===5||showDetailsFlag">
                            <file-area
                                    :edit="false"
                                    :fileList="homeworkObj.attachments"
                            ></file-area>
                        </div>
                    </div>
                    <div class="show-more" v-if="showMoreNum>1" @click="switchTap">
                        <div v-if="showDetailsFlag">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-shangla"></use>
                            </svg>
                            收起
                        </div>
                        <div v-else>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-xiala"></use>
                            </svg>
                            展开更多内容
                        </div>
                    </div>
                </div>
                <div class="void"></div>
                <!--老师-->
                <div class="evaluate-area-title">
                    <div class="words-ins">
                        <svg aria-hidden="true" class="icon">
                            <use xlink:href="#icon-wodedianping">
                            </use>
                        </svg>
                        我的点评
                    </div>
                    <div class="date" v-if="!(app.tool.isEmptyObject(evaluateObj))">
                        {{evaluateObj.createTime.replace(/-/g,'.')}}
                    </div>
                </div>
                <!--老师点评部分区域-->
                <div class="evaluate-area">
                    <!--分数-->
                    <div class="points" v-show="!(hadHomeWorkComment&&point==''&&!isEdit)"><!-- 已点评&&无此项&&非编辑 时不展示  -->
                        <div class="words-ins">分数</div>
                        <div>
                            <div class="level-box" @click="openPointsActionsheet" v-if="isSelectLevel">
                                <span class="level-name blue" v-if="scoreClone">{{scoreClone}}</span>
                                <span class="level-name" v-else>{{curPointsText}}</span>
                                <svg aria-hidden="true" class="icon"
                                     v-if="(hadHomeWorkComment&&isEdit)||(!hadHomeWorkComment)">
                                    <use xlink:href="#icon-youjiantou">
                                    </use>
                                </svg>
                            </div>
                            <input type="text" :disabled="hadHomeWorkComment&&(!isEdit)" v-model="scoreClone"
                                   placeholder="请输入作业分数" v-else>
                        </div>
                    </div>
                    <!--选择评价模板-->
                    <div class="tem" @click="showEvaluationTem" v-show="(!hadHomeWorkComment)||isEdit">
                        <div>选择评价模板</div>
                        <div>
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-youjiantou">
                                </use>
                            </svg>
                        </div>
                    </div>

                    <!--评价文本域-->
                    <div class="text-wrap" :class="{'top-distance':(!hadHomeWorkComment)||isEdit}"
                         v-if="(!hadHomeWorkComment)||isEdit">
                        <textarea
                                class="comment-text"
                                maxlength="500"
                                v-model="contentMsgModel"
                                placeholder="写点评价吧，您的评价对这位学生会有更大的帮助哟！（500字以内）"
                                @touchstart="app.area.start($event)"
                                @touchmove="app.area.move($event)"
                                @touchend="app.area.end($event)">
                        </textarea>
                    </div>
                    <div class="text-wrap" v-else-if="contentMsg">
                        <div class="comment-text-fixed" v-html="app.tool.richTextToHtml(contentMsg)">
                        </div>
                    </div>

                    <!--语音按钮-->
                    <div class="voice-wrap" v-if="(ListAudioFileClone.length)||(!hadHomeWorkComment)||isEdit">
                        <voice-recording
                                :edit="(!hadHomeWorkComment)||isEdit"
                                :audioFileList="ListAudioFileClone"
                                @voiceFinished="voiceFinished">
                        </voice-recording>
                    </div>
                    <!--添加图片-->
                    <div class="img-box" v-show="(!hadHomeWorkComment)||isEdit">
                        <img-area
                                :imageFileList="ListImgFileClone"
                                :imageMaxNum=9
                                @imageFinished="imgUpload"
                                @imageLoaded="imageLoaded">
                        </img-area>
                    </div>
                    <div class="just-show"
                         v-show="ListImgFile.length>0&&(!isEdit)"
                         v-if="ListImgFile.length">
                        <img-area
                                :edit="false"
                                :imageType="0"
                                :imageFileList="ListImgFile"
                                v-show="ListImgFile.length>0&&(!isEdit)"
                                @imageLoaded="imageLoaded">
                        </img-area>
                    </div>

                    <!--添加视频-->
                    <div class="video-box" v-if="(ListVideoFileClone.length)||(!hadHomeWorkComment)||isEdit">
                        <video-area
                                :edit="(!hadHomeWorkComment)||isEdit"
                                :videoFileList="ListVideoFileClone"
                                :getAppToken="getAppToken"
                                @videoFinished="videoFinished">
                        </video-area>
                    </div>

                    <!-- 文件 -->
                    <div class="file-wrap" v-if="(fileListClone.length)||(!hadHomeWorkComment)||isEdit">
                        <file-area
                                :edit="(!hadHomeWorkComment)||isEdit"
                                :fileList="fileListClone"
                                :getAppToken="getAppToken"
                                @fileFinished="fileFinished"
                        ></file-area>
                    </div>
                </div>
            </div>

        </scroller-base>
        <div class="footer">
            <div class="edit" @click="editComment" v-if="(!(app.tool.isEmptyObject(evaluateObj)))&&(isToday)&&(!isEdit)">修改</div>
            <!--提交按钮(取消&提交)-->
            <div class="btn-area" v-if="(!hadHomeWorkComment)||(isEdit)">
                <div class="submit-btn" @click="submit" v-show="!hadHomeWorkComment">
                    提交
                </div>
                <div class="edit-submits" v-show="isEdit">
                    <div class="cancel" @click="cancelEdit">取消</div>
                    <div class="sub-btn" @click="submit">提交</div>
                </div>
            </div>
        </div>
        <loading class="loading" v-show="isLoading" :bgType="bgType"></loading>
        <!--选择分数(子组件)-->
        <points-filter
                class="as-points"
                :opened.sync="openPointsTem"
                :levelList="levelList"
                @homeworkLevelPoint="setPoint">
        </points-filter>

        <evaluation-template
                :goalType="1"
                :opened.sync="openEvaluationTem"
                :temOptions="temOptions"
                @eva-tem="acceptEvaTem">
        </evaluation-template>
    </div>
</template>

<script>
    import PointsFilter from './child/points-filter.vue';
    import RichTextArea from 'teacher/components/common/rich-text-area/rich-text-area.vue';
    import EvaluationTemplate from 'teacher/components/common/evaluation-template/evaluation-template';
    import {getEvaluationTem} from 'teacher/api/comment';
    import {processGet, savePost ,getUploadToken} from 'teacher/api/common'

    export default {
        name: 'homework-evaluate',
        data() {
            return {
                wxTitle: '作业详情',
                isLoading: true,
                bgType:0,
                complexFlag:null,//1有文本 2没文本 3只有图片
                showMoreNum:0,//‘展开更多内容’按钮标志
                showDetailsFlag: false, //  展示||隐藏学生回复内容的标记变量
                refMessageId: "",//作业id
                studentId: "",//学生id
                homeworkMsg:{
                    taskId:'',
                    taskTitle:'',
                    teacherName:'',
                    taskCreateTime:''
                },//作业标题 老师 时间的对象
                homeworkObj: {}, // 1.作业数据
                evaluateObj: {}, // 2.评论数据
                isEdit: false, // '编辑'相关
                isToday: true,//是否为今天
                hadHomeWorkComment: false,//是否有作业评价
                point: '',//填分
                scoreClone:'',//展示编辑
                levelList: [], //保存选择分数的分数列表
                isSelectLevel: false, // 是否为选择分数的标记变量(true:分数填写为选择ABCD等级;false:分数直接填写)。
                openPointsTem: false, //是否展开 ‘分数’ 组件,
                openEvaluationTem: false, //是否展开‘评价模板’组件
                curPointsText: '请选择作业分数',
                contentMsg: '', //评价内容数据参数
                contentMsgModel: '',//双向绑定
                isVoice: false,
                voices: [],//接收语音组件新增数据
                imgs: [],//接收图片组件数据
                videos: [],//接收视频组件新增数据
                files:[],//接收文件

                delvoice: [],//接收语音组件删除数据
                delimg: [],//删除的图片数组对象
                delvideo: [],//删除视频
                delfiles:[],//删除文件


                ListAudioFileClone: [],
                ListAudioFile: [],//回显 从listfile提取
                ListImgFile: [],
                ListImgFileClone: [],//回显 从listfile提取
                ListVideoFile:[],
                ListVideoFileClone:[],//回显 从listfile提取
                fileList:[],
                fileListClone:[],

                temOptions: { //评价模板组件需要的参数
                    apiTemTitle: getEvaluationTem,
                    apiTemCon: getEvaluationTem,
                    apiTemQuery: getEvaluationTem
                },
                refreshNum: 0,
                savePara: {
                    saveFlag: "MESSAGE_TASK_REPLY",
                    id: "",//修改才需要
                    refMessageId: "",//作业id
                    studentId: "",//学生id
                    score: "",//分数
                    content: "",//2.评价内容
                    contentType: 0,//
                    media_ids: "",// 3.评价媒体 （钉钉语音）
                    mediaUrl:"",//钉钉 保存图片字段
                    isFile: 0,//是否有附件(声音||图片等)
                    fileIdList: "",//以逗号分隔的文件id(数据库文件id)
                    isTemp: 0, //0表示提交
                    clientType: '',//微信||钉钉环境
                    listVideo:'', //视频
                    attachments:''//文件
                },
            }
        },
        computed: {
            renderData() {
                return {
                    showDetailsFlag: this.showDetailsFlag,
                    refreshNum: this.refreshNum,
                    homeworkObj: this.homeworkObj,
                    evaluateObj: this.evaluateObj,
                    contentMsg: this.contentMsg,
                    contentMsgClone: this.contentMsgClone,
                    contentMsgDoubleClone: this.contentMsgDoubleClone
                }
            }
        },
        methods: {
            //作业详情
            goToHomeworkDetail(id){
                this.$router.push({path: `/homeworkDetail/${id}`, query: {from: 1}})
            },
            //获取type
            //未点评：根据queryMessageCommentScore的type值确定规则 0：分数 1：等级
            //已点评：根据作业分数前缀判断即可 无视queryMessageCommentScore的type值
            getType() {
                processGet({
                    pname: 'queryMessageCommentScore'
                }).then(res => {
                    if(app.tool.isEmptyObject(this.evaluateObj)){
                        // 未点评过
                        if (res.data.type == 1) {
                            this.isSelectLevel = true;//选等级
                            this.levelList = res.data.data;
                            //不用回显
                        } else {
                            this.isSelectLevel = false;//填分数
                        }
                    }else{
                        // 点评过
                        let score = this.evaluateObj.score.substring(0,1);
                        if (score == 1) {
                            this.isSelectLevel = true;//选等级
                            this.levelList = res.data.data;
                            //不用回显
                        } else {
                            this.isSelectLevel = false;//填分数
                        }
                    }
                    this.isLoading = false;
                })
            },
            // 获取数据
            _getHomeworkEvaluate(refMessageId, studentId) {
                //能进入页面必然有作业信息
                processGet({
                    pname: 'message_reply_detail',
                    type: 5,
                    studentId: studentId,
                    refMessageId: refMessageId
                }).then(res => {
                    this.homeworkMsg.taskId = res.taskId;
                    this.homeworkMsg.taskTitle = res.taskTitle;
                    this.homeworkMsg.teacherName = res.teacherName;
                    this.homeworkMsg.taskCreateTime = res.taskCreateTime;

                    //作业
                    if (res.TaskWork == null) {
                        this.homeworkObj = {}
                    } else {
                        res.TaskWork.content = app.tool.richTextToHtml(res.TaskWork.content);
                        this.homeworkObj = res.TaskWork || {};//没有数据为Null

                        if (res.TaskWork.content) { //文字
                            this.complexFlag = 1;
                        }else if (res.TaskWork.ListAudioFile.length > 0) { //语音
                            this.complexFlag = 2;
                        }else if (res.TaskWork.ListImgFile.length > 0) { //图片
                            this.complexFlag = 3;
                        }else if (res.TaskWork.ListVideo.length > 0) { //视频
                            this.complexFlag = 4;
                        }else if(res.TaskWork.attachments.length > 0){ //文件
                            this.complexFlag = 5;
                        }
                        (res.TaskWork.content!=='')&&this.showMoreNum++;
                        (res.TaskWork.ListAudioFile.length>0)&&this.showMoreNum++;
                        (res.TaskWork.ListImgFile.length>0)&&this.showMoreNum++;
                        (res.TaskWork.ListVideo.length>0)&&this.showMoreNum++;
                        (res.TaskWork.attachments.length>0)&&this.showMoreNum++;
                    }
                    // 点评
                    if (res.Comment == null) {
                        this.evaluateObj = {}
                    } else {
                        res.Comment.content = app.tool.richTextToHtml(res.Comment.content);
                        this.evaluateObj = res.Comment || {};//没有数据为Null
                        this.isToday = this.judgeIsToday(res.Comment.createTime);
                        //分数  去掉‘0-xxx分’的‘0-’和‘分’
                        //等级  去掉‘1-xxx’的‘1-’
                        this.savePara.score = res.Comment.score && res.Comment.score.substring(2);//用于接口参数保存
                        this.point = res.Comment.score && res.Comment.score.substring(2);//取消时赋值给score
                        this.scoreClone = res.Comment.score && res.Comment.score.substring(2);//用于展示编辑

                        // 语音
                        this.voices = res.Comment.ListAudioFile;
                        this.ListAudioFile = res.Comment.ListAudioFile;
                        this.ListAudioFileClone = app.tool.clone(res.Comment.ListAudioFile);//回显

                        //图片
                        this.imgs = res.Comment.ListImgFile;
                        this.ListImgFile = res.Comment.ListImgFile;
                        this.ListImgFileClone = app.tool.clone(res.Comment.ListImgFile);//回显

                        //视频
                        this.videos = res.Comment.ListVideo;
                        this.ListVideoFile = res.Comment.ListVideo;
                        this.ListVideoFileClone = app.tool.clone(res.Comment.ListVideo);//回显克隆

                        //文件
                        this.files = res.Comment.attachments;
                        this.fileList = res.Comment.attachments;
                        this.fileListClone = app.tool.clone(res.Comment.attachments);//回显克隆

                    }
                    this.hadHomeWorkComment = (app.tool.isEmptyObject(this.evaluateObj)) ? false : true;
                    this.contentMsg = res.Comment ? res.Comment.content : '';
                    this.contentMsgModel = res.Comment ? app.dom.parseDom(res.Comment.content) : '';
                    // this.isLoading = false;
                    this.getType();
                })
            },
            formatDate(date, format) {
                let o =
                    {
                        "M+": date.getMonth() + 1, //month
                        "d+": date.getDate(),    //day
                        "h+": date.getHours(),   //hour
                        "m+": date.getMinutes(), //minute
                        "s+": date.getSeconds(), //second
                        "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
                        "S": date.getMilliseconds() //millisecond
                    }
                if (/(y+)/.test(format))
                    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(format))
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                return format;
            },
            // 是否今天 只能修改当天的点评
            judgeIsToday(time) {
                let flag = time.indexOf(this.formatDate(new Date(), 'yyyy-MM-dd')) !== -1;
                return flag
            },
            // //展开||收起 学生作业
            switchTap() {
                this.showDetailsFlag = !this.showDetailsFlag;
                this.refreshNum++;
            },
            //展开||收起 成绩选择
            openPointsActionsheet() {
                //有评价且非编辑状态
                if ((this.hadHomeWorkComment && !this.isEdit)) {
                    return
                }
                if (this.levelList.length < 1) {
                    app.toast('info', '请先设置分数等级。');
                    return
                }
                this.openPointsTem = !this.openPointsTem;
            },
            //从子组件获取成绩
            setPoint(newVal) {
                this.scoreClone = newVal.Rank;
                this.curPointsText = newVal.Rank;
            },
            //打开录音组件
            openVoice(status) {
                this.isVoice = status;
            },
            //语音
            voiceFinished(voices, delvoice) {
                this.openVoice(false);
                this.voices = voices;
                this.delvoice = delvoice;
                setTimeout(() => {
                    this.refreshNum++;
                }, 301)
            },
            //图片上传
            imgUpload(arr, del) {
                this.imgs = arr;
                this.delimg = del;
            },
            //图片完成
            imageLoaded() {
                this.refreshNum++;
            },
            //视频完成
            videoFinished(videos, delvideo) {
                this.videos = videos;
                this.delvideo = delvideo;
                this.refreshNum++;
            },
            //文件完成
            fileFinished(files,delfiles){
                this.files = files;
                this.delfiles = delfiles;
                this.refreshNum++;
            },
            //视频 通信
            getAppToken() {
                return getUploadToken().then(res => {
                    if (res.ErrorCode) {
                        let t = res.Data;
                        return {
                            appid: t.appid,
                            timestamp: t.timestamp,
                            nonceStr: t.nonceStr,
                            signature: t.signature
                        }
                    } else {
                        return Promise.reject()
                    }
                })
            },
            // 评价模板
            showEvaluationTem() {
                this.openEvaluationTem = !this.openEvaluationTem;
            },
            // 接受评价模板所选择的模板内容
            acceptEvaTem(con) {
                if(app.tool.trim(con)==''){
                    return
                }else{
                    this.contentMsgModel = con;//覆盖原内容
                }
            },
            //编辑
            editComment() {
                this.isEdit = !this.isEdit;
                this.refreshNum++;
                if (this.isEdit && this.isSelectLevel) {
                    app.eventDefine.emit('homeworkCommentResetPointChosed')
                }
            },
            // '提交'
            submit() {
                this.bgType = 1;
                this.isLoading = true;
                if ((app.tool.trim(this.scoreClone) == '')
                    && (app.tool.trim(this.contentMsgModel) == '')
                    && (this.voices.length == 0)
                    && (this.imgs.length == 0)
                    && (this.videos.length == 0)
                    && (this.files.length == 0)) {
                    this.isLoading = false;
                    app.toast('info', '请填写评价信息。');
                    return
                }
                //id 编辑时
                this.savePara.id = this.hadHomeWorkComment ? this.evaluateObj.id : '';
                this.savePara.refMessageId = this.refMessageId;
                this.savePara.studentId = this.studentId;
                //分数
                // 为了保证家长端作业分享界面有分数，这里点评时分数必填
                if (app.tool.trim(this.scoreClone) == '') {
                    this.isLoading = false;
                    app.toast('info', '请填写分数。');
                    return
                } else {
                    if (!this.isSelectLevel) {//填写分数
                        let reg = /^[0-9]\d*$/;

                        if (!reg.test(app.tool.trim(this.scoreClone))) {
                            this.isLoading = false;
                            app.toast('info', '请填写0~100整数作为分数。');
                            return
                        }

                        if (parseInt(this.scoreClone) > 100 || parseInt(this.scoreClone) < 0) {
                            this.isLoading = false;
                            app.toast('info', '请填写0~100整数作为分数。');
                            return
                        }
                    }
                    // 1:等级；0:分数
                    let type = this.isSelectLevel ? 1 : 0;
                    this.savePara.score = type + '-' + this.scoreClone;
                }

                //内容
                this.savePara.content = app.tool.arrowFilter(this.contentMsgModel);//转义html
                //媒体
                let ls_filedlist = [],//保存删除对象的临时数组
                    pro = [],//一个promise数组
                    deleteFun = function (arr) {
                        arr.forEach(id => {
                            id && ls_filedlist.push(id);
                        })
                    },
                    addFun = function (arr) {
                        arr.forEach(item => {
                            item.promise && pro.push(item.promise);//只有新增媒体有promise
                        })
                    };
                this.delvoice.length > 0 && deleteFun(this.delvoice);
                this.delimg.length > 0 && deleteFun(this.delimg);
                this.voices.length > 0 && addFun(this.voices);
                this.imgs.length > 0 && addFun(this.imgs);
                this.delvideo.length > 0 && deleteFun(this.delvideo);
                this.videos.length > 0 && addFun(this.videos);
                this.delfiles.length > 0 && deleteFun(this.delfiles);
                this.files.length > 0 && addFun(this.files);

                this.savePara.contentType = ((this.imgs.length > 0) || (this.voices.length > 0)) ? 3 : 0;
                this.savePara.fileIdList = ls_filedlist.length > 0 ? ls_filedlist.join(",") : "";//删除的参数赋值完成
                this.savePara.isFile = (this.imgs.length > 0 || this.voices.length > 0) ? 1 : 0;

                if (pro.length > 0) {//有新增项
                    Promise.all(pro).then(res => {
                        if(this.savePara.clientType==1){
                            //钉钉 这里循环的是this.imgs || this.voices
                            let ls_v = [];
                            let ls_i = [];
                            let ls_vd = [];
                            let ls_f = [];
                            //视频
                            res.forEach(item => {
                                if (item.type == 'video') {
                                    ls_vd.push(item);
                                }else if(item.type == 'file'){
                                    ls_f.push(item)
                                }
                            });
                            this.savePara.listVideo = ls_vd.length ? JSON.stringify(ls_vd) : '';
                            this.savePara.attachments = ls_f.length ? JSON.stringify(ls_f) : '';

                            this.voices.forEach(item => {
                                item.promise && ls_v.push(item.serverId);
                            });
                            this.savePara.media_ids = ls_v.join(",");

                            this.imgs.forEach(item => {
                                item.promise && ls_i.push(item.serverId);
                            });
                            this.savePara.mediaUrl = ls_i.join(",");
                            this.send();

                        }else{
                            //微信 这里循环的res
                            let ls_obj = [],ls_vd = [],ls_f=[];
                            res.forEach(item => {
                                if(item.type == 'video'){
                                    ls_vd.push(item);
                                }else if(item.type == 'file'){
                                    ls_f.push(item)
                                }else{
                                    ls_obj.push(item);
                                }
                            });
                            this.savePara.media_ids = ls_obj.join(",");
                            this.savePara.listVideo = ls_vd.length ? JSON.stringify(ls_vd) : '';
                            this.savePara.attachments = ls_f.length ? JSON.stringify(ls_f) : '';
                            this.send();
                        }
                    }).catch(rej => {
                        this.isLoading = false;
                        app.toast('error', '上传附件失败，请在网络畅通时重新尝试。');
                        return;
                    });

                } else {
                    this.savePara.media_ids = "";
                    this.savePara.mediaUrl = "";
                    this.savePara.listVideo = "";
                    this.savePara.attachments = "";
                    this.send()
                }
            },
            send() {
                savePost(this.savePara).then(res => {
                    this.isLoading = false;
                    if (res.errcode == 200) {
                        app.toast('success', '提交成功');
                        if (this.$route.query.push == 1) { //说明是从推送点进来的
                            app.sdk.closeWindow();
                        } else {
                            this.$router.back();
                        }
                        app.eventDefine.emit('homeworkCommentSave');
                        app.eventDefine.emit('refresh-homework-list');//作业列表页
                    } else {
                        app.toast('error', res.errmsg);
                    }
                })
            },
            //取消
            cancelEdit() {
                this.isEdit = false;
                this.contentMsgModel = app.dom.parseDom(this.contentMsg);//文本内容取消;//文本内容取消
                this.ListImgFileClone = app.tool.clone(this.ListImgFile);//图片取消
                this.ListAudioFileClone = app.tool.clone(this.ListAudioFile);//语音取消
                this.ListVideoFileClone = app.tool.clone(this.ListVideoFile);//视频取消
                this.fileListClone = app.tool.clone(this.fileList );//文件取消
                this.delvoice = [];
                this.delimg = [];
                this.delvideo= [];
                this.delfiles= [];

                this.voices = [];//语音接收取消
                this.imgs = [];//图片接收取消
                this.videos = [];//视频接收取消
                this.files = [];//文件接收取消

                this.scoreClone = this.point;//此项放在参数重置之后
                this.refreshNum++;
            }

        },
        created() {

            this.savePara.clientType = app.envType;// 钉钉1 其他0
            //获取type 0表示按分数 1表示按等级
            // this.getType(); //为了避免作业评分规则在编辑时改变做处理
            // 获取数据 (作业id)
            this._getHomeworkEvaluate(this.$route.params.refMessageId, this.$route.params.studentId);
            // this.getData(); //用promise 避免界面的分数出问题
            this.refMessageId = this.$route.params.refMessageId;//作业id
            this.studentId = this.$route.params.studentId;//作业id
        },
        components: {
            RichTextArea,
            PointsFilter,
            EvaluationTemplate
        }
    }
</script>