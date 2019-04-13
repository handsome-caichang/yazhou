<!--上课点评 班级下的学生列表-->
<style scoped lang="scss">
    
    

    .comment-students-list {
        background-color: $color-white;
        .lecture {
            height: 44px;
            line-height: 44px;
            padding-left: 80px;
            padding-right: 28px;
            position: relative;
            font-size: 15px;
            @include border-bottom;
            .lecture-key {
                color: $color-6;
                position: absolute;
                left: 15px;
            }
            .lecture-val {
                color: $color-3;
                text-align: left;
                @include ellipsis-single;
            }
            .icon {
                position: absolute;
                right: 15px;
                top: 13.5px;
            }
        }
        .parents-reply {
            height: 44px;
            line-height: 44px;
            padding-left: 80px;
            padding-right: 28px;
            position: relative;
            font-size: 15px;
            .reply-key {
                color: $color-6;
                position: absolute;
                left: 15px;
            }
            .reply-val {
                color: #bbbbbb;
                text-align: right;
                @include ellipsis-single;
            }
            .icon {
                position: absolute;
                right: 15px;
                top: 13.5px;
            }
        }
        .void {
            height: 10px;
            background-color: $color-assist-1;;
        }
        .scroller {
            background-color: #EEF1F6;
            @include position-absolute(96px, 0, 49px, 0);
            &.top-heigher {
                top:54px;
            }
            &.bottom-heigher{
                bottom:0;
            }
            .card {
                min-height: 100px;
                padding: 15px;
                padding-left: 64px;
                position: relative;
                background-color: $color-white;
                @include border-bottom;
                .card-lf {
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    width: 40px;
                    max-height: 108px;
                    text-align: center;
                    .img {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        margin-bottom: 12px;
                        border: 1px solid $color-assist-1;
                        background-color: $color-assist-1;
                        @include background-img(false, cover);
                    }
                    .icon {
                        width: 18px;
                        height: 18px;
                        font-size: 18px;
                    }
                }
                .card-rt {
                    padding-right: 16px;
                    .describe {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        min-height: 76px;
                        .des-top {
                            .name {
                                font-size: 16px;
                                height: 16px;
                                line-height: 16px;
                                margin-bottom: 6px;
                                color: $color-3;
                            }
                            .date {
                                color: $color-9;
                                font-size: 12px;
                                height: 12px;
                                line-height: 12px;
                                margin-bottom: 8px;
                            }
                            .star, .content {
                                @include ellipsis-single;
                                color: $color-6;
                                font-size: 13px;
                                height: 15px;
                                line-height: 15px;
                                margin-top: 2px;
                            }
                        }
                        .des-bottom {
                            @include ellipsis-single;
                            color: #8B572A;
                            font-size: 12px;
                            height: 12px;
                            line-height: 12px;
                            margin-top: 6px;
                            .cant-comment{
                                color: #4775C8;
                            }
                        }
                    }
                    .comment-arrow {
                        position: absolute;
                        right: 15px;
                        top: 40%;
                        font-size: 12px;
                        color:#BBBBBB;
                        .icon {
                            font-size: 13px;
                        }
                    }
                }
            }
        }
        .footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 49px;
            padding-left: 23px;
            padding-right: 12px;
            font-size: 15px;
            border-top: 1px solid $color-assist-1;
            @include flex-between;
            @include shadow-base;
            .icon {
                font-size: 18px;
                width: 18px;
                height: 18px;
                vertical-align: bottom;
            }
            .btn {
                width: 140px;
                height: 28px;
                line-height: 28px;
                border-radius: 28px;
                text-align: center;
                color: $color-white;
                background-color: $color-primary;
            }

        }
    }

    .as-reply {
        @include position-absolute;
    }
</style>

<template>
    <div class="comment-students-list">
        <!--上课内容-->
        <div class="lecture" @click="showClassContent">
            <div class="lecture-key">上课内容:</div>
            <div class="lecture-val">{{classContent}}</div>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-youjiantou"></use>
            </svg>
        </div>
        <!--查看家长回复-->
        <div class="parents-reply" @click="parentsReplyList" v-if="amont!=0">
            <div class="reply-key">查看家长回复</div>
            <div class="reply-val">{{studentReview.length}}</div>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-youjiantou"></use>
            </svg>
        </div>
        <!--分割线-->
        <div class="void"></div>

        <!--内容区域-->
        <scroller-base ref="commentStuListScroller" class="scroller" :data="renderData" :class="{'top-heigher': amont==0,'bottom-heigher':canSelectCounts==0}">
            <div class="card" v-for="(item,index) in list" :key="item.id" @click.stop="goToCommentDetails(item)">
                <div class="card-lf" @click.stop>
                    <div class="img" :style="'background-image:url('+item.imgPath+')'"></div>
                    <svg v-show="item.hasSquare" class="icon" aria-hidden="true" @click.stop="selectStudents(index)">
                        <use :xlink:href="item.checked==true?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
                    </svg>
                </div>
                <div class="card-rt">
                    <div class="describe">
                        <div class="des-top">
                            <div class="name" v-show="item.name!=''">{{item.name}}</div>
                            <div class="date" v-show="item.createTime!=''">{{item.createTime}}</div>
                            <div class="content" v-show="item.comment!=''" v-html="item.comment"></div>
                            <div class="star" v-show="item.strStar!=null">{{item.strStar}}</div>
                        </div>
                        <div class="des-bottom" v-show="item.canComment&&item.IsBindWeixin==0">
                            未绑定师生信，无法收到老师点评消息
                        </div>
                        <div class="des-bottom" v-if="!item.canComment">此学生<span class="cant-comment">未绑定</span>师生信，您无法进行点评操作</div>
                    </div>
                    <div class="comment-arrow" v-show="item.canComment">
                        <span v-show="item.commentId==null">立即点评</span>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
            </div>
        </scroller-base>

        <!--批量区域-->
        <div class="footer" v-show="canSelectCounts>0">
            <div class="all" @click="selectAll">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="selectAllActiveFlag == true?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
                </svg>
                全选
            </div>
            <div class="btn-area" @click="batchComment">
                <div class="btn">
                    上课点评 (<span>{{selectedCounts}}</span>)
                </div>
            </div>
        </div>
        <loading class="loading" v-show="isLoading"></loading>
        <CommentParentReply
                class="as-reply"
                :opened.sync="openReview"
                :replylist="studentReview">
        </CommentParentReply>
    </div>
</template>

<script>
    import {getCommentStudentsList,getAmont,getStudentReview} from 'teacher/api/comment';
    import {processGet, savePost} from 'teacher/api/common';
    import CommentParentReply from './child/comment-parents-reply'

    export default {
        name: "comment-students-list",
        data() {
            return {
                wxTitle: '学生列表',
                EnablePostComment: '',//老师上课点评学生，如果该学生没有绑定师生信账号是否能提交点评。（1是(默认)，0否）
                paraid: '',//传过来的参数 也是courseId
                paradate: '',//传过来的参数
                paratime: '',//传过来的参数
                list: [],
                classContent: '',//上课内容
                shiftScheduleList: [],//上课进度
                shiftAmount: '',//初始化的上课进度
                openReview: false,
                openReviewDetail: false,
                studentReview: [],//家长(学员)回复
                isLoading: true,
                selectedCounts: 0, //已选择人数
                selectAllActiveFlag: false, //全选按钮开关
                canSelectCounts: 0, //能够被选择的人数(当天||未评价)
                amont: '' //用于星星的标识
            }
        },
        computed: {
            renderData() {
                return {
                    list: this.list
                }
            }
        },
        methods: {
            _getAmont(id) {
                getAmont().then(res => {
                    this.amont = res.Data.amont;
                    this.$refs.commentStuListScroller.refresh();
                    if (res.Data.amont != 0) {
                        this.getReview(id)
                    }
                })
            },
            // 获取学生列表数据
            getData(id) {
                processGet({
                    pname: "comment_student",
                    id: id
                }).then(res => {
                    this.isLoading = false;
                    if(res.errcode==app.errok) {
                        res.data.studentList.forEach(item => {
                            //没有绑定微信号&&配置项为0  =>  不能点评(canComment) false能点评  true不能点评
                            // checked：//是否勾选上
                            item.createTime = item.createTime.replace(/-/g, '.');
                            item.canComment = ((this.EnablePostComment == 0) && (item.IsBindWeixin == 0)) ? false : true;
                            item.hasSquare = item.canComment && item.commentId == null;
                            if (item.hasSquare) {//有正方形(勾选框)
                                item.checked = false;
                                // 能被勾选的学员数量计算赋值
                                this.canSelectCounts++
                            }
                        });
                        this.classContent = res.data.content;//上课内容赋值
                        this.shiftScheduleList = res.data.shiftScheduleList;//上课进度赋值
                        this.shiftAmount = res.data.shiftAmount;//本节课的上课进度
                        this.list = res.data.studentList;//学员列表赋值
                    }
                })
            },
            getReview(id) {
                getStudentReview({
                    id: id
                }).then(res => {
                    this.studentReview = res.Data;
                })
            },
            //  进入评价详情页
            goToCommentDetails(item) {
                // 没有绑定微信且配置项EnablePostComment为0
                if(!item.canComment){
                    return
                }
                app.ls.setStorage('commentIsBatch',false);
                this.$router.push({path: `/commentDetail/${item.courseId}/${item.id}`})
            },
            // 进入家长回复
            parentsReplyList() {
                this.openReview = !this.openReview;
                this.openReview ? app.tool.setDocTitle('回复列表') : app.tool.setDocTitle('学生列表');
            },
            // 进入上课进度
            showClassContent() {
                app.contentSchedule({
                    content: this.classContent,
                    schedule: this.shiftScheduleList,
                    shiftAmount: this.shiftAmount	//本节课的上课进度
                }).then(res => {
                    this.saveClassProgress(res)
                });
            },
            //保存上课进度
            saveClassProgress(obj) {
                let para = {
                    saveFlag: "COURSE_CONTENT",
                    course: this.paraid,
                    shiftAmount: obj.schedule.ShiftAmount,
                    ShiftScheduleID: obj.schedule.ID,
                    Content: obj.content,
                    LastClasstime: this.getLastTime(this.paradate, this.paratime == '00:00~23:59' ? '' : this.paratime),
                };
                savePost(para).then(res => {
                    if (res.errcode == app.errok) {
                        app.toast('success', '保存成功。');
                        this.classContent = obj.schedule.Title || '' + obj.content;
                        this.shiftAmount = obj.schedule.ShiftAmount;
                    } else {
                        app.toast('error', '保存失败。');
                    }
                })
            },
            //保存上课进度<-时间获取
            getLastTime(date, time) {
                let t = time.replace("~", "-"),
                    week = ["[周日]", "[周一]", "[周二]", "[周三]", "[周四]", "[周五]", "[周六]"],
                    day = new Date(date).getDay();
                return date + t + week[day]
            },
            //单选学生
            selectStudents(index) {
                if (this.list[index].checked) {
                    this.selectedCounts--
                } else {
                    this.selectedCounts++
                }
                this.list[index].checked = !this.list[index].checked;
            },
            //全选学生
            selectAll() {
                if (this.canSelectCounts < 1) {
                    app.toast('info', '暂无可全选的学员。');
                    return
                }

                if (this.selectAllActiveFlag) { //取消全选
                    this.list.forEach(item => {
                        if (item.hasSquare) {
                            item.checked = false;
                            this.selectedCounts = 0;
                        }
                    })
                } else { //全选
                    this.list.forEach(item => {
                        if (item.hasSquare) {
                            item.checked = true;
                            this.selectedCounts = this.canSelectCounts;
                        }
                    })
                }

            },
            //批量点评(批量进入评价详情页)
            batchComment() {
                // 没有选择不能点全选
                if (this.selectedCounts < 1) {
                    app.toast('info', '请选择批量操作的学员。');
                    return
                } else {

                    let studentId = [],
                        name = [],
                        str = '';// 保存id数组的字符串
                    this.list.forEach(item => {
                        if (item.checked) {
                            studentId.push(item.id);
                            name.push(item.name);
                        }
                    });

                    if(studentId.length>50){
                        app.alert({
                            'text': '一次最多评价50个学员，您的选择已超限哦~',
                            btn: {
                                'text': '知道了',
                                'style': {},
                                'action': true
                            }
                        });
                        return
                    }

                    str = studentId.join(',');

                    //提示批量操作覆盖草稿
                    processGet({
                        pname: "batchCommentQuery",
                        studentId: str,//学生id
                        id:this.list[0].courseId //courseID都相同
                    }).then(res=>{

                        if(res.errcode == app.errok){
                            //有学员存了草稿
                            if(res.data&&res.data.length){
                                app.confirm({
                                    title: "提示",
                                    text: res.data.join(',')+' 已有上课点评草稿，点击确定内容会被覆盖。',
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
                                        app.ls.setStorage('commentIsBatch', true);
                                        app.ls.setStorage('commentBatchStudentName', name);//用于详情页头部显示
                                        //不给定时器页面路由会有问题
                                        setTimeout(()=>{
                                            this.$router.push({path: `/commentDetail/${this.paraid}/${str}`})
                                        },50)
                                    }
                                });
                            }else{
                                app.ls.setStorage('commentIsBatch', true);
                                app.ls.setStorage('commentBatchStudentName', name);//用于详情页头部显示
                                this.$router.push({path: `/commentDetail/${this.paraid}/${str}`})
                            }

                        }else{
                            app.toast('error',res.errmsg)
                        }
                    });


                }
            },
            render() {
                this.paraid = this.$route.params.id;
                this.paradate = this.$route.params.date;
                this.paratime = this.$route.params.time;
                this._getAmont(this.paraid);
                this.getData(this.paraid);
                // this.getReview(); //根据amont确定
            },
            handleEmit() {
                //重置
                this.selectedCounts = 0;//重置已选人数
                this.canSelectCounts = 0;//重置能批量的人数
                this.selectAllActiveFlag = false;//全选高亮标志
                //渲染
                // this.render();
                this.isLoading = true;
                this._getAmont(this.paraid);
                this.getData(this.paraid);
            }
        },
        created() {
            // 配置项赋值
            this.EnablePostComment = app.sysInfo.EnablePostComment;
            this.render();
        },
        mounted() {
            app.eventDefine.on('commentSave', this.handleEmit);
            app.eventDefine.on('commentRevoke', this.handleEmit);
        },
        beforeDestroy() {
            app.eventDefine.off('commentSave', this.handleEmit);
            app.eventDefine.off('commentRevoke', this.handleEmit);
        },
        components: {
            CommentParentReply
        },
        watch: {
            selectedCounts() {
                // 当选择的学员数量和能够被选择的学员数量相等(当天||未点评) => 全选按钮高亮
                this.selectAllActiveFlag = (this.selectedCounts == this.canSelectCounts)&&(this.canSelectCounts!=0) ? true : false;
            },
            openReview(newVal,oldVal){
                if (!newVal) {
                    app.tool.setDocTitle('学生列表');
                }
            }

        }

    }
</script>

