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
        .submit-btn {
            height: 49px;
            line-height: 49px;
            text-align: center;
            color: $color-white;
            background-color: $color-primary;
            border-radius: 2px;
        }
    }
    .void {
        width: 100%;
        height: 10px;
        background-color: $color-assist-1;
    }
    .error-temp{
        @include position-absolute;
        background-color: $color-white;
        z-index: 99999;
    }
</style>

<template>
    <div class="homework-evaluate">

        <scroller-base
                :data="renderData"
                :class="{'bottom-distance':hadHomeWorkComment}"
                class="scroller">
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
                                {{homeworkMsg.taskCreateTime&&homeworkMsg.taskCreateTime.substring(0,16)}}
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
                <div class="homework-area">
                    <div class="student-msg">
                        <div class="head-img" :style="'background-image:url('+homeworkObj.photo+')'"></div>
                        <div>
                            <div class="name">{{homeworkObj.studentname}}</div>
                            <div class="date">{{homeworkObj.createtime&&homeworkObj.createtime.substring(0,16)}}</div>
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
                             v-if="homeworkObj.mp3list&&homeworkObj.mp3list.length"
                             v-show="complexFlag===2||showDetailsFlag">
                            <voice-recording
                                    :edit="false"
                                    :audioFileList="homeworkObj.mp3list">
                            </voice-recording>
                        </div>
                        <div class="img-judge"
                             :class="{'top-distance':complexFlag===3}"
                             v-if="homeworkObj.imglist&&homeworkObj.imglist.length"
                             v-show="complexFlag===3||showDetailsFlag">
                            <img-area
                                    :edit="false"
                                    :imageType="0"
                                    :imageFileList="homeworkObj.imglist"
                                    @imageLoaded="imageLoaded">
                            </img-area>
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
                    <div class="date" v-if="hadHomeWorkComment">
                        {{evaluateObj.createtime&&evaluateObj.createtime.substring(0,16)}}
                    </div>
                </div>
                <!--老师点评部分区域-->
                <div class="evaluate-area">
                    <!--分数-->
                    <div class="points">
                        <div class="words-ins">分数</div>
                        <div>
                            <input type="number" :disabled="hadHomeWorkComment" v-model="score"
                                   placeholder="请输入作业分数">
                        </div>
                    </div>
                   
                    <!--评价文本域-->
                    <div class="text-wrap" v-if="!hadHomeWorkComment">
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
                    <div class="text-wrap " v-else-if="contentMsg!=''">
                        <div class="comment-text-fixed" v-html="contentMsg">
                        </div>
                    </div>

                    <!--语音按钮-->
                    <div class="voice-wrap" v-if="hadHomeWorkComment&&mp3listClone.length">
                        <voice-recording
                                :edit="false"
                                :audioFileList="mp3listClone"
                                @voiceFinished="this.refreshNum++">
                        </voice-recording>
                    </div>
                    <div class="voice-wrap" v-else-if="!hadHomeWorkComment">
                        <voice-recording
                                :edit="true"
                                :audioFileList="voiceArr"
                                @voiceFinished="voiceFinished">
                        </voice-recording>
                    </div>
                    <!--添加图片-->
                    <div class="just-show" v-if="hadHomeWorkComment&&imglistClone.length">
                        <img-area
                                :edit="false"
                                :imageType="0"
                                :imageFileList="imglistClone"
                                @imageLoaded="imageLoaded">
                        </img-area>
                    </div>
                    <div class="img-box" v-else-if="!hadHomeWorkComment">
                        <img-area
                                :imageFileList="imageArr"
                                @imageFinished="imgUpload"
                                @imageLoaded="imageLoaded">
                        </img-area>
                    </div>
                   

                </div>
            </div>

        </scroller-base>
        <div class="footer"  v-if="(!hadHomeWorkComment)">
            <!--提交按钮(取消&提交)-->
            <div class="submit-btn" @click="submit">
                提交
            </div>
        </div>
        <loading class="loading" v-show="isLoading" :bgType="bgType"></loading>
        <error-page class="error-temp" v-if="errorFlag" :type="600" :text="errorTips"></error-page>

    </div>
</template>

<script>
    import {gethomeworkdetailforteacher,evalhomework} from 'teacher/api/homework.js';
    import ErrorPage from 'teacher/components/common/error-page/error-page';
    
    export default {
        name: 'homework-evaluate',
        data() {
            return {
                wxTitle: '作业详情',
                isLoading: true,
                bgType:0,
                // isToday: true,//是否为今天
                refreshNum: 0,
                errorFlag: false, //排课被删除删除
                errorTips: '',  //排课被删除提示语

                complexFlag:null,
                showMoreNum:0,//‘展开更多内容’按钮标志
                showDetailsFlag: false, //  展示||隐藏学生回复内容的标记变量

                messageid: "",//作业id
                studentid: "",//学生id
                homeworkMsg:{
                    taskTitle:'',
                    teacherName:'',
                    taskCreateTime:''
                },//作业标题 老师 时间的对象
                hadHomeWorkComment: false,//是否有作业评价
                homeworkObj: {}, // 1.作业数据
                evaluateObj: {}, // 2.评论数据

                score:null,
                contentMsgModel:'',//点评内容
                voiceArr:[],//点评的语音
                imageArr:[],//点评的图片

                contentMsg:'',//仅展示
                mp3listClone:[],//仅展示
                imglistClone:[],//仅展示
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
                    voiceArr: this.voiceArr,
                    imageArr: this.imageArr,
                }
            }
        },
        methods: {
            //作业详情
            goToHomeworkDetail(id){
                this.$router.push({path: `/homeworkDetail/${this.messageid}`, query: {from: 1}})
            },
           
            // 获取数据
            _getHomeworkEvaluate() {
                //能进入页面必然有作业信息
                gethomeworkdetailforteacher({
                    pname: 'message_detail',
                    messageid: this.messageid,
                    studentid:this.studentid,
                }).then(res => {
                    if(res.result.code == app.errok){
                        this.homeworkMsg.taskTitle = res.data.title;
                        this.homeworkMsg.teacherName = res.data.createuser;
                        this.homeworkMsg.taskCreateTime = res.data.msgcreatetime;

                        //作业 submitinfo.id 默认值为null
                        
                        res.data.submitinfo.content = app.tool.richTextToHtml(res.data.submitinfo.content);

                        if (res.data.submitinfo.content) { //文字
                            this.complexFlag = 1;
                        }else if (res.data.submitinfo.mp3list.length > 0) { //语音
                            this.complexFlag = 2;
                        }else if (res.data.submitinfo.imglist.length > 0) { //图片
                            this.complexFlag = 3;
                        }

                        (res.data.submitinfo.content!=='')&&this.showMoreNum++;
                        (res.data.submitinfo.mp3list.length>0)&&this.showMoreNum++;
                        (res.data.submitinfo.imglist.length>0)&&this.showMoreNum++;
                        
                        this.homeworkObj = res.data.submitinfo;//作业赋值

                        // 点评
                        if (res.data.iseval == 0) {
                            this.evaluateObj = {}
                        } else {
                            res.data.evalinfo.content = app.tool.richTextToHtml(res.data.evalinfo.content);
                            this.contentMsg = res.data.evalinfo.content;

                            this.score = res.data.evalinfo.score;

                            this.mp3listClone = app.tool.clone(res.data.evalinfo.mp3list);//回显
                            this.imglistClone = app.tool.clone(res.data.evalinfo.imglist);//回显

                            this.evaluateObj = res.data.evalinfo;//点评赋值
                        }
                        this.hadHomeWorkComment = res.data.iseval==1;//是否点评阈值

                        this.isLoading = false;
                    }else if(res.result.code==400){
                        this.errorFlag = true;
                        this.errorTips = res.result.msg;
                    }else{
                        app.toast('error', res.result.msg);
                    } 
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
            // judgeIsToday(time) {
            //     let flag = time.indexOf(this.formatDate(new Date(), 'yyyy-MM-dd')) !== -1;
            //     return flag
            // },
            // //展开||收起 学生作业
            switchTap() {
                this.showDetailsFlag = !this.showDetailsFlag;
                this.refreshNum++;
            },
           
          
            //语音
            voiceFinished(voices, delvoice) {
                this.voiceArr = voices;
                setTimeout(()=>{
                    this.refreshNums ++;
                })
                
            },
            //图片上传
            imgUpload(arr, del) {
                this.imageArr = arr;
            },
            //图片完成
            imageLoaded() {
                this.refreshNum++;
            },
           
            // '提交'
            submit() {
                this.bgType = 1;
                this.isLoading = true;
                
                if((!this.score)||(app.tool.trim(this.score)=='')){
                    app.toast('info', '请填写分数。');
                    this.isLoading = false;
                    return
                }
                if(parseInt(this.score)<0||parseInt(this.score)>100){
                    app.toast('info','请填写0~100整数作为分数。');
                    this.isLoading = false;
                    return
                }

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
                            submitmessageid:this.homeworkObj.id,//学员提交的作业id
                            homeworkid:this.messageid,//老师发布的作业id
                            subject:this.homeworkMsg.taskTitle,
                            content:app.tool.arrowFilter(this.contentMsgModel),
                            mediaids:mediaIds.join(','),
                            score:parseInt(this.score)
                        });
                    }).catch(rej => {
                        this.isLoading = false;
                        app.toast('error','上传附件失败，请在网络畅通时重新尝试。');
                        return;
                    });
                }else{
                    this.send({
                        submitmessageid:this.homeworkObj.id,//学员提交的作业id
                        homeworkid:this.messageid,//老师发布的作业id
                        subject:this.homeworkMsg.taskTitle,
                        content:app.tool.arrowFilter(this.contentMsgModel),
                        mediaids:'',
                        score:parseInt(this.score)
                    });
                }
                
                
            },
            send(params) {

                evalhomework(params).then((res)=>{
                    this.isLoading = false;
                    if (res.result.code == app.errok) {
                        app.toast('success', '提交成功');
                        if (this.$route.query.push == 1) { //说明是从推送点进来的
                            app.sdk.closeWindow();
                        } else {
                            this.$router.back();
                        }
                        app.eventDefine.emit('refresh-homework-student-list');
                        app.eventDefine.emit('refresh-homework-list');//作业列表页
                    } else {
                        app.toast('error', res.errmsg);
                    }
                })
            },
        
        },
        created() {
            this.messageid = this.$route.params.messageid;//作业id
            this.studentid = this.$route.params.studentid;//学生id

            // 获取数据 ()
            this._getHomeworkEvaluate();
        },
        components: {
            ErrorPage
        }
    }
</script>