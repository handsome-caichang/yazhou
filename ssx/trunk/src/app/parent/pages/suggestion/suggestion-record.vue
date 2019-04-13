<!-- 投诉与建议-我的留言记录 -->
<style scoped lang="scss">
    
    

    .scroller {
        overflow: hidden;
        @include position-absolute;
        background-color: $color-assist-1;
        .card {
            background-color: $color-white;
            margin-bottom: 9px;
            .card-student {
                display: flex;
                min-height: 64px;
                padding: 10px;
                @include border-bottom;
                .head-img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 1px solid #EEF1F6;
                    background-color: #EEF1F6;
                    @include background-img(false, cover);
                }
                .student-msg {
                    flex: 1;
                    position: relative;
                    margin-left: 6px;
                    font-size: 16px;
                    .msg-name {
                        padding-right: 94px;
                        margin-bottom: 4px;
                        color: $color-9;
                    }
                    .msg-content {
                        font-size: 14px;
                        color: $color-3;
                        .content {
                            word-break: break-word;
                            margin-bottom: 5px;
                        }
                    }
                    .msg-date {
                        font-size: 10px;
                        color: $color-border-2;
                        position: absolute;
                        right: 0px;
                        top: 2px;
                    }
                }
            }
            .card-teacher {
                min-height: 64px;
                padding: 10px 10px 10px 0px;
                margin-left: 56px;
                display: flex;
                &.borderlight {
                    border-bottom: 1px solid $color-assist-1;
                }
                .teacher-img {
                    width: 40px;
                    height: 40px;
                    margin-right: 10px;
                    border-radius: 50%;
                    border: 1px solid #EEF1F6;
                    background-color: #EEF1F6;
                    @include background-img(false, cover);
                }
                .teacher-reply {
                    flex: 1;
                    margin-left: 6px;
                    position: relative;
                    .reply-name {
                        font-size: 14px;
                        color: $color-9;
                        margin-top: -2px;
                        margin-bottom: 4px;
                        padding-right: 94px;
                        .describe {
                            font-size: 14px;
                            color: $color-border-2;
                        }
                    }
                    .reply-content {
                        font-size: 14px;
                        color: $color-3;
                        word-break: break-word;
                    }
                    .reply-date {
                        color: $color-border-2;
                        font-size: 10px;
                        position: absolute;
                        top: 0px;
                        right: 0px;
                    }
                }
            }
            .more-reply {
                height: 34px;
                line-height: 34px;
                border-top: 1px solid $color-assist-1;
                text-align: center;
                font-size: 14px;
                color: $color-border-2;
                .icon {
                    width: 12px;
                    height: 14px;
                }
            }
        }
    }

    .noData-temp {
        @include position-absolute;
    }
</style>

<template>
    <div>
        <scroller-base class="scroller" :data="renderData">
            <div class="card" v-for="(item,index) in recordList" :key="index">
                <div class="card-student">
                    <div class="head-img" :style="'backgroundImage:url('+item.Photo+')'">
                    </div>
                    <div class="student-msg borderlight">
                        <div class="msg-name">{{item.StudentName}}</div>
                        <div class="msg-content">
                            <!--文本内容-->
                            <div class="content" v-html="item.StudentContent">
                            </div>
                            <!--图片内容-->
                            <img-area
                                    :edit="false"
                                    :imageType="0"
                                    :imageFileList="item.ListImgFile"
                                    v-if="item.ListImgFile.length>0">
                            </img-area>
                        </div>
                        <span class="msg-date">{{item.StudentTime.replace(/-/g, '.')}}</span>
                    </div>
                </div>

                <div :class="(index+1)<item.showMoreReplyFlag?'borderlight':'' "
                     class="card-teacher"
                     v-for="(reply,index) in (item.EmployeeReceive)"
                     v-if="index<item.showMoreReplyFlag"
                     :key="index">

                    <div v-if="reply.IsCryptonym" class="teacher-img" :style="'backgroundImage:url('+defaultAvatar+')'">
                    </div>
                    <div v-else class="teacher-img" :style="'backgroundImage:url('+reply.TeacherPhoto+')'">
                    </div>
                    <div class="teacher-reply">
                        <div class="reply-name">
                            <span v-if="!reply.IsCryptonym">{{reply.TeacherName}}</span>
                            <span class="describe">回复</span>
                        </div>
                        <div class="reply-content" v-html="reply.TeacherContent">
                        </div>
                        <span class="reply-date">{{reply.TeacherTime}}</span>
                    </div>
                </div>

                <div class="more-reply" v-if="item.EmployeeReceive.length>2" @click="showMoreReply(item)">
                    <span v-if="item.showMoreReplyFlag==2">查看剩余{{item.EmployeeReceive.length-2}}条回复
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-shouqizhankai"></use>
                        </svg>
                    </span>
                    <span v-else>收起回复
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-shouqi1"></use>
                        </svg>
                    </span>
                </div>
            </div>
        </scroller-base>
        <empty-page class="noData-temp" :type="11" v-if="recordList.length == 0"></empty-page>
        <loading class="loading" v-show="isLoading"></loading>
    </div>
</template>

<script>
    import {processPost} from "parent/api/common";
    import EmptyPage from "parent/components/common/empty-page/empty-page";

    export default {
        name: "suggestion-record",
        data() {
            return {
                wxTitle: "我的留言记录",
                recordList: [],
                isLoading: true,
                clickNum: 0,
                defaultAvatar: require('./img/cryptonym.png')
            }
        },
        methods: {
            addScrollNum() {
                this.clickNum++;
            },
            showMoreReply(item) { //查看剩余回复
                item.showMoreReplyFlag = item.showMoreReplyFlag == 2 ? item.EmployeeReceive.length : 2;
                this.clickNum++;
            }
        },
        computed: {
            renderData() {
                return {
                    recordList: this.recordList,
                    clickNum: this.clickNum
                }
            }
        },
        created() {
            // 这里是为了推送查看某一条详细投诉的信息所以才有id
            let para = this.$route.params;
            if (para.id == '00000000-0000-0000-0000-000000000000') {
                para.id = ''
            }
            processPost({
                pname: 'suggestion',
                id: para.id
            }).then(res => {
                this.isLoading = false;
                if (res.errcode == app.errok) {
                    res.data.forEach(item => {
                        item.showMoreReplyFlag = 2;
                        item.StudentContent = app.tool.richTextToHtml(item.StudentContent, false);
                        //回复
                        item.EmployeeReceive.forEach(reply => {
                            reply.TeacherContent = app.tool.richTextToHtml(reply.TeacherContent, false);
                            reply.TeacherTime = reply.TeacherTime.replace(/-/g, '.')
                        })
                    });
                    this.recordList = res.data;
                }
            })
        },
        components: {
            EmptyPage
        }
    }
</script>