<!--上课点评详情页-->
<style scoped lang="scss">
    
    

    .comment-details {
        background-color: $color-assist-1;
        .batch-stus{
            height: 30px;
            line-height: 30px;
            padding: 0 12px;
            background-color: #FFF8A6;
            @include flex-between;
            .batch-m{
                flex: 1;
                @include ellipsis-single;
            }
            .batch-rt{
                margin-left: 5px;
            }
        }
        .scroller {
            @include position-absolute(0, 0, 49px, 0);
            padding: 0 15px;
            &.fullpage {
                @include position-absolute;
            }
            &.batch{
                top:30px;
            }
            .title {
                height: 40px;
                line-height: 40px;
                color: $color-6;
                text-align: left;
                font-size: 15px;
                .icon {
                    width: 15px;
                    height: 15px;
                    font-size: 15px;
                    margin-left: 4px;
                }
            }
            .card-msg {
                background-color: $color-white;
                font-size: 15px;
                .item {
                    min-height: 35px;
                    padding: 7.5px 15px;
                    @include flex-between;
                    .spe-key {
                        width: 40px;
                    }
                    .val {
                        color: $color-primary;
                    }
                    .class-name {
                        flex: 1;
                        text-align: right;
                        line-height: normal;
                        padding-left: 8px;
                    }

                }
            }
            .star-area {
                min-height: 108px;
                background-color: $color-assist-1;
                text-align: center;
                .card {
                    background-color: $color-white;
                    margin-bottom: 12px;
                    position: relative;
                    .card-box {
                        padding: 12px;
                        .icon-area {
                            position: absolute;
                            right: 5px;
                            top: 5px;
                            width: 30px;
                            height: 24px;
                        }
                        .dimension {
                            color: $color-3;
                            font-size: 16px;
                            padding: 0 20px;
                        }
                        .score {
                            @include flex-center;
                            .describe {
                                margin: 8px;
                            }
                        }
                        .star-wrapper {
                            @include flex-center;
                            .five-star {
                                font-size: 25px;
                                margin: 0 10px;
                            }
                        }
                    }
                    .dimension-describe {
                        min-height: 44px;
                        padding: 12px 2px;
                        text-align: center;
                        font-size: 15px;
                        background-color: #F4F4F4;
                        color: $color-6;
                    }
                }
            }
            .content-bg{
                padding: 15px;
                padding-top: 0;
                background-color: $color-white;
                .tem {
                    @include flex-between;
                    background-color: $color-white;
                    height: 40px;
                    line-height: 40px;
                }
                .text-wrap {
                    padding-top: 15px;

                    .comment-text, .comment-text-fixed {
                        color: $color-3;
                        border: 1px solid $color-border;
                        border-radius: 2px;
                        padding: 12px;
                        word-break: break-word;
                    }
                    .comment-text {
                        font-family: inherit;
                        height: 160px;
                        box-shadow: none;
                        margin-top: 0px;
                        resize: none;
                    }
                    &.top-distance {
                        padding-top: 0;
                    }
                }
                .voice-wrap {
                    font-size: 12px;
                    color: $color-primary;
                    text-align: center;
                    padding-top: 15px;
                }
                .img-box {
                    padding-top: 15px;
                }
                .img-show-box{
                    padding-top: 15px;
                }
            }
            .history-card {
                padding: 15px;
                margin-bottom: 10px;
                background-color: $color-white;
                color: $color-9;
                .card-content {
                    font-size: 15px;
                    color: $color-6;
                    line-height: 20px;
                    word-break: break-word;
                }
                .card-star {
                    font-size: 13px;
                    margin: 8px auto;
                }
                .card-voice,.card-img{
                    margin-top: 12px;
                }
                .card-date {
                    text-align: right;
                    font-size: 12px;
                    margin-top: 12px;
                }
                &.unbottom-distance {
                    margin-bottom: 0;
                }
            }
            .history-more {
                padding: 10px 0 20px 0;
                .check-all {
                    margin: auto;
                    width: 150px;
                    height: 28px;
                    line-height: 28px;
                    border-radius: 28px;
                    text-align: center;
                    font-size: 15px;
                    color: $color-9;
                    border: 1px solid $color-border-2;
                }
            }
        }
        .void {
            height: 10px;
            background-color: $color-assist-1;
            width: 100%;
        }
        .footer {
            .footer-box {
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 49px;
                padding: 0 12px;
                background-color: $color-white;
                @include flex-around;
                @include shadow-base;
                justify-content: flex-end;
                .draft, .submit {
                    width: 93px;
                    height: 28px;
                    line-height: 28px;
                    text-align: center;
                    border-radius: 28px;
                    margin-left: 10px;
                }
                .draft {
                    color: $color-primary;
                    border: 1px solid $color-primary;
                }
                .submit {
                    color: $color-white;
                    background-color: $color-primary;
                }
            }
        }
        .as-tips {
            @include position-absolute;
        }
    }
</style>

<template>
    <div class="comment-details">
        <div class="batch-stus" v-if="isBatch">
            <div class="batch-lf">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yichangtishi-hong"></use>
                </svg>
                正在对：
            </div>
            <div class="batch-m">
                <span class="name" v-for="(name,index) in batchStudentName" :key="index">
                    {{name}}
                </span>
            </div>
            <div class="batch-rt">
                {{batchStudentName.length}}人进行点评
            </div>
        </div>
        <scroller-load class="scroller"
                       :class="{fullpage:CommentID!==NoComment&&!canEdit,batch:isBatch}"
                       :data="renderData"
                       :enable="enable"
                       @loadData="loadData"
                       :pagingOption="pagingOption"
                       ref="commentDetailScroller">
            <!--上课详情小标题-->
            <div class="title" v-show="showClassDetailCard">
                <svg aria-hidden="true" class="icon">
                    <use xlink:href="#icon-shangkexiangqing"></use>
                </svg> 上课详情</div>
            <!--班级、老师（学生）信息-->
            <div class="card-msg" v-show="showClassDetailCard">
                <div class="item" v-show="!isBatch">
                    <div>学生</div>
                    <div class="val">{{list.studentname}}</div>
                </div>
                <div class="item">
                    <div class="spe-key">班级</div>
                    <div class="val class-name">{{list.classname}}</div>
                </div>
                <div class="item">
                    <div>老师</div>
                    <div class="val">{{list.teachername}}</div>
                </div>
            </div>
            <!--上课评价小标题-->
            <div class="title" v-show="starList.length>0">
                <svg aria-hidden="true" class="icon">
                    <use xlink:href="#icon-shangkepingjia"></use>
                </svg> 上课评价
                <span @click="showStarRule">
                    <svg class="icon icon-youjiantou" aria-hidden="true">
                        <use xlink:href="#icon-help"></use>
                    </svg>
                </span>
            </div>
            <!--打星评分-->
            <div class="star-area" v-show="starList.length>0">
                <div class="card" v-for="(item,index) in starList" :key="index">
                    <div class="card-box">
                        <div class="icon-area" v-if="item.describe!=''" @click="showDimensionDescribe(item)">
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="item.describeSwitch==false?'#icon-xiala':'#icon-shangla'"></use>
                            </svg>
                        </div>
                        <div class="dimension">{{item.name}}</div>
                        <div class="score">
                            <div class="describe">人均:{{item.avgpeople}}</div>
                            <div class="describe">班平:{{item.avgclass}}</div>
                            <div class="describe">满星:{{item.maxcount}}/{{item.counteva}}</div>
                        </div>
                        <div class="star-wrapper">
                            <div class="five-star" v-for="num in startCounts" @click="selectStar(item,num)">
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="item.scope>num?'#icon-xingxingxuanzhong':'#icon-xingxingweixuanzhong'"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="dimension-describe" v-show="item.describe&&item.describeSwitch">
                        {{item.describe}}
                    </div>
                </div>

            </div>
            <!--尚未点评||正在编辑||有文本||有语音||有图片-->
            <div class="content-bg" v-if="(CommentID==NoComment)||isEdit||(contentMsg!='')||ListAudioFile.length>0||ListImgFile.length>0">
                <!--选择评价模板-->
                <div class="tem" @click="showEvaluationTem"
                     v-show="CommentID==NoComment||isEdit">
                    <div>选择评价模板</div>
                    <div>
                        <svg aria-hidden="true" class="icon">
                            <use xlink:href="#icon-youjiantou">
                            </use>
                        </svg>
                    </div>
                </div>
                <!--评价文本域-->
                <div class="text-wrap" :class="{'top-distance':CommentID==NoComment||isEdit}"
                     v-if="CommentID==NoComment||isEdit">
                    <!--编辑用-->
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
                    <!--disabled:有评价&&没有在编辑-->
                    <div class="comment-text-fixed" v-html="app.tool.richTextToHtml(contentMsg)">
                    </div>
                </div>

                <!--语音-->
                <div class="voice-wrap" v-show="CommentID==NoComment||isEdit||ListAudioFileClone.length>0">
                    <voice-recording
                        :edit="(CommentID==NoComment||isEdit)"
                        :audioFileList="ListAudioFileClone"
                        @voiceFinished="voiceFinished">
                    </voice-recording>
                </div>
                <!--添加图片-->
                <div class="img-box" v-show="CommentID==NoComment||isEdit">
                    <img-area
                        :imageFileList="ListImgFileClone"
                        :imageMaxNum=9
                        @imageFinished="imgUpload"
                        @imageLoaded="imageLoaded">
                    </img-area>
                </div>
                <div class="img-show-box" v-show="ListImgFile.length>0&&CommentID!==NoComment&&!isEdit">
                    <img-area
                        :edit="false"
                        :imageType="1"
                        :imageFileList="ListImgFile"
                        @imageLoaded="imageLoaded"
                        v-if="ListImgFile.length>0&&CommentID!==NoComment&&!isEdit">
                    </img-area>
                </div>
            </div>
            <div class="void" v-show="historyList.length==0"></div>

            <!--点评历史-->
            <div class="title" v-show="!isBatch&&historyList.length">
                <svg class="icon icon-youjiantou" aria-hidden="true">
                    <use xlink:href="#icon-pingjialishi"></use>
                </svg> 点评历史</div>
            <div class="history" v-show="!isBatch&&historyList.length">
                <div class="history-card"
                     v-for="(item,index) in historyList"
                     :key="index"
                     :class="{'unbottom-distance':(historyList.length<4&&index==2)||(historyList.length>3&&index==historyList.length-1)}">
                    <!--文本-->
                    <div class="card-content" v-html="item.content">
                    </div>
                    <!--星星-->
                    <div class="card-star" v-if="item.strstar!==''">
                        {{item.strstar}}
                    </div>
                    <!--语音-->
                    <div v-show="item.listaudiofile.length" class="card-voice">
                        <voice-recording
                                :edit="false"
                                :audioFileList="item.listaudiofile">
                        </voice-recording>
                    </div>
                    <!--图片-->
                    <div class="card-img">
                        <img-area
                            :edit="false"
                            :imageType="0"
                            @imageLoaded="imageLoaded"
                            :imageFileList="item.listimgfile"
                            v-if="item.listimgfile.length>0">
                        </img-area>
                    </div>
                    <!--时间-->
                    <div class="card-date">
                        {{item.createtime}}
                    </div>
                </div>
                <div class="void" v-show="historyList.length"></div>
                <div class="history-more" v-show="historyList.length>2&&isFirst">
                    <div class="check-all" @click="showFullHistory">
                        查看全部
                    </div>
                </div>
            </div>
        </scroller-load>

        <div class="footer"
             v-show="CommentID==NoComment||CommentID!==NoComment&&!isEdit&&canEdit||CommentID!==NoComment&&isEdit">
            <div class="footer-box" v-show="CommentID==NoComment">
                <div class="draft" @click="submit('draft')" v-show="!isBatch">存为草稿</div>
                <div class="submit" @click="submit">提交</div>
            </div>

            <div class="footer-box" v-show="CommentID!==NoComment&&!isEdit&&canEdit">
                <div class="draft" @click="revoke">
                    撤销点评
                </div>
                <div class="submit" @click="reedit">
                    重新编辑
                </div>
            </div>
            <!--一定是已点评过&&-->
            <div class="footer-box" v-show="CommentID!==NoComment&&isEdit">
                <div class="draft" @click="cancelbtn">
                    取消
                </div>
                <div class="submit" @click="submit">确定
                </div>
            </div>

        </div>
        <loading v-show="isLoading"></loading>
        <tips-filter
                class="as-tips"
                :opened.sync="openTips">
        </tips-filter>
        <evaluation-template
                :goalType="0"
                :opened.sync="openEvaluationTem"
                :temOptions="temOptions"
                @eva-tem="acceptEvaTem">
        </evaluation-template>
    </div>
</template>

<script>
    import TipsFilter from './child/tips-filter';
    import EvaluationTemplate from 'teacher/components/common/evaluation-template/evaluation-template';
    import {getcommentdetail,getcommenttemplate,modifycoursecomment,getcoursecommentscopehistory,removecoursecomment} from "teacher/api/comment";

    export default {
        name: 'comment-details',
        data() {
            return {
                wxTitle: '上课点评',
                showClassDetailCard: false,//页面优化
                isEdit: false,//只有在有评价的时候 才会有可能未true
                openTips: false,
                openEvaluationTem: false,
                isBatch: false, //是否批量点评
                canEdit: false,//是否能编辑
                batchStudentName:null,//批量点评时学生名称数组
                CommentID: '',//评价id
                NoComment: '00000000-0000-0000-0000-000000000000',
                // NoComment: null,
                startCounts: [0, 1, 2, 3, 4],
                starList: [],//打星
                starListClon: [],//打星Clone
                list: [],//主数据
                enable:false,
                historyList: [],//历史
                pagingOption: {
                    api: getcoursecommentscopehistory,
                    autoLoadFirst:false,
                    params: {
                        teacherid: app.sysInfo.id,
                        studentid: this.$route.params.studentId
                    }
                },
                isFirst: true,
                contentMsg: '',
                contentMsgModel: '',//双向绑定
                temOptions: {
                    apiTemTitle: getcommenttemplate,
                    apiTemCon: getcommenttemplate,
                    apiTemQuery: getcommenttemplate
                },
                scrollerRefreshNum: 1,
                isVoice: false,
                voices: [],//接收语音组件新增数据
                imgs: [],//接收图片组件数据
                delvoice: [],//接收语音组件删除数据
                delimg: [],//删除的图片数组对象
                ListAudioFile: [],
                ListAudioFileClone: [],//回显 从listfile提取
                ListImgFile: [],
                ListImgFileClone: [],//回显 从listfile提取
                savePara: {
                    content: "",//2.评价内容
                    contenttype: 0,//
                    // jsonStar: "",//1.评价星星
                    jsonstar:[],
                    mediaids: "",//  3.评价媒体
                    // isFile: 0,//是否有附件(声音||图片等)
                    fileldlist: "",//以逗号分隔的文件id(数据库文件id)
                    istemp: 0 //1表示存草稿 0表示提交
                },
                isLoading: true
            }
        },
        computed: {
            renderData() {
                return {
                    starList: this.starList,
                    historyList: this.historyList,
                    imgs: this.imgs,
                    isEdit: this.isEdit,
                    ListImgFile: this.ListImgFile,
                    ListImgFileClone: this.ListImgFile,
                    ListAudioFile : this.ListAudioFile,
                    ListAudioFileClone:this.ListAudioFileClone,
                    contentMsg: this.contentMsg,
                    contentMsgModel: this.contentMsgModel,
                    scrollerRefreshNum: this.scrollerRefreshNum
                }
            }
        },
        methods: {
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
            //图片上传
            imgUpload(arr, del) {
                this.imgs = arr;
                this.delimg = del;
            },
            //图片完成
            imageLoaded(){
                this.scrollerRefreshNum++;
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
                    this.scrollerRefreshNum++;
                }, 301)
            },
            //选择星星
            selectStar(obj, num) {
                //obj为某行星星的对象，num为星星数量的索引0表示第一颗以此类推
                let flag = (this.CommentID == this.NoComment) || (!(this.CommentID == this.NoComment) && this.isEdit);
                //能编辑：CommentID为0 || 有CommentID&&isEdit
                if (!flag) {
                    return
                }
                let objog = app.tool.clone(obj);
                //点击某颗星星则高亮至某颗星星。特殊情况：只有一颗星星高亮然后再次点击第一颗星星时则取消高亮
                if(objog.scope==1&&num==0){//特殊情况
                    objog.scope = 0;
                }else{
                    objog.scope = num + 1;
                }

                //必填的打星在打星小于最小值时提示
                if (this.validScope(objog)) {
                    obj.scope = objog.scope
                }
            },
            // 星星打分的判断
            validScope(com) {
                if (com.scope < com.min) {
                    app.toast("info", com.name + "不能少于" + com.min + "星。");
                    return false
                }
                if (com.scope > com.max) {
                    app.toast("info", com.name + "不能多于" + com.max + "星。");
                    return false
                }
                return true
            },
            //展开打星维度的描述信息
            showDimensionDescribe(item) {
                item.describeSwitch = !item.describeSwitch;
                this.scrollerRefreshNum++;
            },
            //提示规则
            showStarRule() {
                this.openTips = !this.openTips;
            },
            //评价模板
            showEvaluationTem() {
                this.openEvaluationTem = !this.openEvaluationTem;
            },
            acceptEvaTem(con) {
                if(app.tool.trim(con)==''){
                    return
                }else{
                    this.contentMsgModel = con;//覆盖原内容
                }
            },
            //查看全部历史点评
            showFullHistory() {
                this.isFirst = false;
                this.$refs.commentDetailScroller.pagingLoad();
              
            },
            getData(para) {
               
                let params = {
                    courseid: para.courseId,
                    teacherid: app.sysInfo.id,
                    studentid: para.studentId
                };
                getcommentdetail(params).then(res => {
                    this.isLoading = false;
                    if (res.result.code == app.errok) {
                        this.showClassDetailCard = true;//为了避免部分html先出现
                        this.list = res;
                        this.contentMsg = res.content;
                        this.contentMsgModel = res.content && app.dom.parseDom(res.content);//用于编辑双休绑定
                        res.listscopedetail.length && res.listscopedetail.forEach(item => {
                            item.describeSwitch = false;//打星维度描述开关初始化为关闭
                        });
                        this.starList = res.listscopedetail;//2.星星
                        this.starListClon = app.tool.clone(res.listscopedetail);//2.星星
                        this.CommentID = res.commentid;//3.评价ID 评价id有时为id，无时为‘00000000-0000-0000-0000-000000000000’

                        this.canEdit = res.createtime && (res.createtime.indexOf(this.formatDate(new Date(), 'yyyy-MM-dd')) !== -1);
                        //图片
                        this.imgs = res.filelistinfo.listimgfile;
                        this.ListImgFile = res.filelistinfo.listimgfile;
                        this.ListImgFileClone = app.tool.clone(res.filelistinfo.listimgfile);//回显克隆
                        // 语音
                        this.voices = res.filelistinfo.listaudiofile;
                        this.ListAudioFile = res.filelistinfo.listaudiofile;
                        this.ListAudioFileClone = app.tool.clone(res.filelistinfo.listaudiofile);//回显克隆
                        // 历史
                        if (!this.isBatch && res.listscopehistory && res.listscopehistory.length > 0) {
                            res.listscopehistory.forEach(item => {
                                item.createtime = item.createtime.replace(/-/g, '.');//格式化时间
                                item.content = app.tool.richTextToHtml(item.content, false);

                            });
                            this.historyList = res.listscopehistory;
                        }
                    } else {
                        app.toast('error', '获取评论失败，请返回重试。');
                    }
                })
            },
            loadData(ajaxPromise){
                ajaxPromise.then(res=>{
                    if (res.result.code == app.errok) {
                        if(res.page.pageindex==res.page.totalpage){
                            app.toast('success', '已加载全部。');
                        }
                        res.data.forEach(item => {
                            item.createtime = item.createtime.replace(/-/g, '.');//格式化时间
                            item.content = app.tool.richTextToHtml(item.content, false);
                        });
                        if(res.page.pageindex==1){
                            this.historyList = res.data;
                        }else{
                            this.historyList = this.historyList.concat(res.data)
                        }
                        //避免全部历史数据为0页面下留过多空白
                        this.scrollerRefreshNum++;
                    } else {
                        app.toast('error', res.result.msg);
                    }
                })
            },
            send() {
                modifycoursecomment(this.savePara).then(res => {
                    if (res.result.code == 200) {
                        app.eventDefine.emit('commentSave');
                        app.toast('success', '提交成功。');
                        this.$router.back();
                        this.isLoading = false;
                    } else {
                        this.isLoading = false;
                        app.toast('error', res.result.msg);
                    }
                })
            },
            submit(para) {
                this.isLoading = true;
                this.savePara.istemp = para == "draft" ? 1 : 0;//存为草稿
                this.savePara.courseid = this.$route.params.courseId;
                this.savePara.studentid = this.$route.params.studentId;
                if (this.isEdit) {//编辑的话把id带上
                    this.savePara.id = this.CommentID;
                    this.savePara.saveFlag = "COURSE_COMMENT_REPLY_PUT";
                }
                // 1.星星
                let tempList = [];//未序列化的提交scope信息
                let flag = false;//是否选择了评价维度

                if(this.starList && this.starList.length){
                    this.starList.forEach(item => {
                        if (!this.validScope(item)) {
                            return
                        }
                        if (item.scope > 0) {
                            flag = true;
                        }
                        let temppara = {
                            scope: item.scope,
                            settingid: item.id
                        };
                        if (this.isEdit) {
                            temppara.scopeId = item.scopeid;
                        }
                        tempList.push(temppara);
                    });
                    this.savePara.jsonstar = tempList;
                }else{
                    this.savePara.jsonstar = {};
                }

                // 存草稿||提交||编辑 -->只有选择 评价维度||填写评价||语音||图片 ，才能提交评价信息
                if (!flag && ((this.contentMsgModel==null)||(app.tool.trim(this.contentMsgModel) == '')) && (this.voices.length == 0) && (this.imgs.length == 0)) {
                    this.isLoading = false;
                    app.toast('info', '请填写评价信息。');
                    return
                }
                // 2.内容
                this.savePara.content = app.tool.arrowFilter(this.contentMsgModel);//转义html

                // 3.媒体
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

                this.savePara.contenttype = ((this.imgs.length> 0) || (this.voices.length> 0)) ? 3 : 0;
                this.savePara.fileldlist = ls_filedlist.length > 0 ? ls_filedlist.join(",") : "";//删除的参数赋值完成
                // this.savePara.isFile = (this.imgs.length > 0 || this.voices.length > 0) ? 1 : 0;

                if (pro.length > 0) {//有新增项
                    Promise.all(pro).then(res => {
                        let ls_obj = [];
                        res.forEach(item => {
                            ls_obj.push(item);
                        });
                        this.savePara.mediaids = ls_obj.join(",");
                        this.send();
                    })
                } else {
                    this.savePara.mediaids = "";
                    this.send()
                }
            },
            //重新编辑
            reedit() {
                this.isEdit = true;
                this.$refs.commentDetailScroller.scroller.scrollTo(0, 0);
            },
            //取消
            cancelbtn() {
                this.isEdit = false;
                this.contentMsgModel = app.dom.parseDom(this.contentMsg);//文本内容取消
                this.starList = app.tool.clone(this.starListClon);//打星取消
                this.ListImgFileClone = app.tool.clone(this.ListImgFile);//图片取消
                this.ListAudioFileClone = app.tool.clone(this.ListAudioFile);//语音取消
                this.delvoice = [];//语音删除取消
                this.delimg = [];//图片删除取消
                this.voices = [];//图片接收取消
                this.imgs = [];//图片接收取消
            },
            //撤销评价
            revoke() {
                app.confirm({
                    title: "提示",
                    text: "确定要撤销点评吗？",
                    btns: [{
                        text: '取消',
                        style: {color: '#333'},
                        action: false // 'cancel'
                    }, {
                        text: '确定',
                        style: {},
                        action: true // 'confirm'
                    }]
                }).then(sel => {
                    if (sel) {
                        removecoursecomment({
                            // saveFlag: "COURSE_COMMENT_REPLY_DELETE",
                            messageid: this.CommentID,
                            courseid: this.$route.params.courseId,
                            studentid: this.$route.params.studentId
                        }).then(res => {
                            console.log(res)
                            if (res.result.code == app.errok) {
                                app.eventDefine.emit('commentRevoke');
                                app.toast("success", "操作成功。");
                                this.$router.back();
                            } else {
                                app.toast("error", res.result.msg);
                            }
                        })
                    }
                });

            }
        },
        created() {
            // 判断是否批量点评
            let id = this.$route.params.studentId;
            if (id.length == 36) {
                //单个||全选只选中一人
                this.isBatch = false;
                this.getData(this.$route.params);
            } else {
                //批量
                this.isBatch = true;
                this.getData(this.$route.params);
                this.batchStudentName = app.ls.getStorage('commentBatchStudentName');
            }
        },
        components: {
            TipsFilter,
            EvaluationTemplate
        }
    };
</script>

