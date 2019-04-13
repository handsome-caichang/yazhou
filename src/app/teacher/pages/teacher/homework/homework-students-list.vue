<!--作业详情~学生列表页-->
<style scoped lang="scss">
    
    

    .homework-students-list {
        background-color: $color-assist-1;
        .header {
            position: absolute;
            display: flex;
            top: 0;
            left: 0;
            height: 49px;
            width: 100%;
            background-color: $color-white;
            padding: 10px 15px 11px 15px;
            @include border-bottom;
            .header-item-wrap {
                flex: 1;
                height: 27px;
                line-height: 27px;
                border: 1px solid $color-primary;
                color: $color-primary;
                @include flex-center;
                &.active{
                    background-color: $color-primary;
                    color: $color-white;
                }
            }
        }

        .body {
            @include position-absolute(49px, 0, 0, 0);
            .student {
                position: relative;
                background-color: $color-white;
                height: 60px;
                box-sizing: border-box;
                padding-left: 64px;
                width: 100%;
                @include border-bottom;
                .img {
                    position: absolute;
                    top: 10px;
                    left: 12px;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 1px solid #eef1f6;
                    background-color: #eef1f6;
                    @include background-img(false, cover);
                }
                .text-part {
                    height: 60px;
                    line-height: 60px;
                    padding-right: 12px;
                    @include flex-between;
                    .stu-name {
                        max-width: 36%;
                        font-size: 15px;
                        color: $color-3;
                        padding-right: 5px;
                        @include ellipsis-single;
                    }
                    .describe {
                        display: flex;
                        text-align: right;
                        font-size: 12px;
                        color: $color-9;
                        vertical-align: top;
                        .item{
                            margin: 0 2px;
                        }
                        .score{
                            line-height: 60px;
                            max-width: 100px;
                            @include ellipsis-single;
                        }
                        .icon{
                            display: inline-block;
                            height: 60px;
                            line-height: 60px;
                        }
                        .blue{
                            color: $color-primary;
                        }
                        .notyet{
                            color: #F5A623;
                        }
                    }
                }
            }
            .card-void{
                background-color: $color-assist-1;
                height: 10px;
                width: 100%;
            }
        }
    }

    .as-body, .noData-temp {
        @include position-absolute;
        overflow: hidden;
    }
</style>

<template>
    <div class="homework-students-list">
        <!--头部选项卡-->
        <div class="header">
            <div class="header-item-wrap"
                 :class="{active:stype==index}"
                 v-for="(item, index) in headerList"
                 :key="index"
                 @click="changeStatus(index)">
                {{item}}
                <span v-show="index==0">({{listAll.length}})</span>
                <span v-show="index==1">({{listSubmited.length}})</span>
                <span v-show="index==2">({{listSubmit.length}})</span>
            </div>
        </div>
        <!--学员情况列表-->
        <div class="body">
            <scroller-base class="as-body" :data="list">
                <div v-for="(item,index) in list" :key="index">
                    <div class="student" @click="item.isSubmit==1||item.isComment==1?goToHomeworkEvaluatePage(item.id):''">
                        <div class="img" :style="'background-image:url('+item.photo+')'"></div>
                        <div class="text-part">
                            <div class="stu-name">{{item.name}}</div>
                            <div class="describe">
                                <!--已交 已评 =》分数-->
                                <span v-if="item.isSubmit==1&&item.isComment==1">
                                    {{item.score}}<span v-if="item.scoreFlag==0">分</span>
                                </span>
                                <!--已交 未评 =》‘待评价’-->
                                <span class="blue" v-if="item.isSubmit==1&&item.isComment==0">
                                    待评价
                                </span>
                                <!--未交 未读 =》‘未读’-->
                                <span class="notyet" v-if="item.isSubmit==0&&item.isRead==0">
                                    未读
                                </span>
                                <!--未交 已读 =》‘已读’-->
                                <span v-if="item.isSubmit==0&&item.isRead==1">
                                    已读
                                </span>
                                <svg aria-hidden="true" class="icon" v-if="item.isSubmit==1||item.isComment==1">
                                    <use xlink:href="#icon-youjiantou">
                                    </use>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="card-void"></div>
                </div>
                <empty-page class="noData-temp" v-show="!list.length" :type="1001"></empty-page>
            </scroller-base>
        </div>

        <!--加载中-->
        <loading class="loading" v-show="isLoading"></loading>
    </div>
</template>

<script>
    // 下面详情页要刷新的在此页面要监听
    import {processGet} from 'teacher/api/common';
    import EmptyPage from 'teacher/components/common/empty-page/empty-page'

    export default {
        name: 'homework-students-list',
        data() {
            return {
                wxTitle: '学生完成情况',
                homeworkId: '00000000-0000-0000-0000-000000000000',//作业id。学生作业详情需要。
                headerList: ['全部', '已提交', '未提交'],
                stype: 0, //选项卡 0-全部 1-已交 2-未交,
                list: [],
                listAll: [],
                listSubmited: [],
                listSubmit: [],
                isLoading: true
            }
        },
        methods: {
            _getStudentsList(id, index) {
                processGet({
                    pname: 'message_detail',
                    studentList: 1,
                    id: id //作业id
                }).then(res => {
                    this.isLoading = false;
                    if (res.errcode == app.errok) {
                        this.list = this.listAll = res.data;
                        res.data.forEach(item => {
                            if(item.score){
                                // 没有时为null
                                item.scoreFlag = this.judgeScore(item.score);
                                item.score = this.handleScore(item.score);
                            }
                            item.isSubmit == 1 ? this.listSubmited.push(item) : this.listSubmit.push(item);//已交 未交
                        })
                    } else {
                        app.toast('error', res.errmsg);
                    }

                })
            },
            changeStatus(index) {
                this.stype = index;
                switch (index) {
                    case 0:
                        this.list = this.listAll;
                        break;
                    case 1:
                        this.list = this.listSubmited;
                        break;
                    case 2:
                        this.list = this.listSubmit;
                        break;
                }
            },
            goToHomeworkEvaluatePage(studentId) {
                this.$router.push({path: `/homeworkEvaluate/${this.homeworkId}/${studentId}`})
            },
            handleEmit() {
                this.list = [];
                this.listAll = [];
                this.listSubmited = [];
                this.listSubmit = [];
                this.stype=0;
                this._getStudentsList(this.homeworkId)
            },
            judgeScore(str){
                let flag = str.substring(0,1);
                return Number(flag)
            },
            handleScore(str){
                // score字段默认返回的是null值
                return str.substring(2)
            }
        },
        created() {
            this._getStudentsList(this.$route.params.id);
            this.homeworkId = this.$route.params.id;//作业id  在
        },
        mounted() {
            app.eventDefine.on('homeworkCommentSave', this.handleEmit);
        },
        beforeDestroy() {
            app.eventDefine.off('homeworkCommentSave', this.handleEmit);
        },
        components: {
            EmptyPage
        }
    }
</script>