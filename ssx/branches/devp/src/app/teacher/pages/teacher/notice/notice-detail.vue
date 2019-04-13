<style lang="scss" scoped>
    
    
    .notice-detail {
        .body {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: #eef1f6;
            .scroller {
                @include position-absolute;
                overflow: hidden;
            }
            .notice-info {
                min-height: 70px;
                text-align: center;
                background: #fff;
                padding: 15px 12px 15px 12px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .color3 {
                    color: #666666;
                }
                >div {
                    &:first-child {
                        font-size: 16px;
                        color: rgba(51, 51, 51, 1);
                    }
                    &:last-child {
                        margin-top: 10px;
                        color: rgba(153, 153, 153, 1);
                    }
                }
            }
            .to-students {
                width: 100%;
                height: 44px;
                line-height: 44px;
                margin-top: 4px;
                background: #ffffff;
                padding-left: 12px;
                padding-right: 12px;
                display: inline-flex;
                em {
                    font-style: normal;
                    &.strong {
                        color: rgba(30, 136, 245, 1);
                    }
                }
                div:last-child {
                    color: rgba(153, 153, 153, 1);
                    flex: 1.5;
                    text-align: right;
                }
                div:first-child {
                    flex: 8;
                }
            }
            .rich-text-container {
                margin-top: 4px;
                >div {
                    background: #ffffff;
                    padding-left: 12px;
                    padding-right: 12px;
                    // 通知内容
                    &:first-child {
                        display: flex;
                        justify-content: space-between;
                        height: 40px;
                        line-height: 40px;
                        // 删除按钮
                        >div:last-child {
                            color: rgba(30, 136, 245, 1);
                            word-wrap: break-word;
                            .icon-shanchu {
                                font-size: 0.9375rem;
                            }
                        }
                    }
                    // 富文本详情
                    &:last-child {
                        @include border-top;
                        padding-top: 15px;
                        padding-bottom: 15px;
                    }
                }

                .rta {
                    margin-left: 0;
                    margin-right: 0;
                    padding-top: 0;
                }
                .video-tips {
                    color: #1e88f5;
                }
                .content-box {
                    -webkit-user-select: text;
                    -moz-user-select: text;
                    -ms-user-select: text;
                    user-select: text;
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
        <div class="body" v-if="data">
            <scroller-base class="scroller" :data="contentHtml" ref="ndscroller">
                <div class="notice-info">
                    <div>{{title}}</div>
                    <div>
                        <span>{{date}}</span>
                        <span class="color3">{{createUser}}</span>
                    </div>
                </div>
                <div @click="toReadStatus()" class="to-students">
                    <div>
                        <span>已读<em :class="{ strong: read != total }">{{ read }}</em>/{{ total }}人</span>
                    </div>
                    <div>
                        详情
                        <svg class="icon card-next" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
                <div class="rich-text-container">
                    <div>
                        <div>通知内容</div>
                        <div @click="deleteHomework" v-if="isToday && app.tool.op('MessageNoticeDelete')">
                            <svg class="icon icon-shanchu" aria-hidden="true">
                                <use xlink:href="#icon-shanchu"></use>
                            </svg>删除
                        </div>
                    </div>
                    <div class="content-box">
                        <rich-text-area class="rta" v-if="content" :richText="content" @imgLoaded="imgState++"></rich-text-area>
                        <div class="video" v-if="videoFileList.length > 0">
                            <span class="video-tips" v-if="clientType==1">请在微信端查看视频</span>
                            <video-area 
                                :edit="false" v-else
                                :videoFileList="videoFileList"
                            ></video-area>
                        </div>
                    </div>
                </div>
            </scroller-base>
        </div>
        <error-page class="error-temp" v-if="errorFlag" :type="600" :text="errorTips"></error-page>
    </div>
</template>

<script>
    import { getNoticeDetail, deleteNotice } from "teacher/api/notice";
    import ErrorPage from 'teacher/components/common/error-page/error-page';
    import RichTextArea from 'teacher/components/common/rich-text-area/rich-text-area.vue';

    export default {
        name: "notice-detail",
        components: {
            ErrorPage,
            RichTextArea,
        },
        data() {
            return {
                wxTitle: "通知详情",
                errorFlag: false, 
                errorTips: '无法读取该消息，可能已被删除。',
                title: "",
                content: "",
                date: "",
                createUser: '',
                read: 0,
                total: 0,
                shiftName: "",
                isToday: false,
                id: "",
                imgState: 0,
                contentpreview: '',
                data: null,
				clientType: app.envType,
            };
        },
        computed: {
            getId() {
                return this.$router.currentRoute.params.id;
            },
            contentHtml() {
                return {
                    shiftName: this.shiftName,
                    content: this.content,
                    imgState: this.imgState
                }
            }
        },
        methods: {
            loadDtail() {
                getNoticeDetail({
                    usertype: 1,
                    messageid: this.getId
                }).then(res => {
                    // if(res.errcode == app.errok) {
                        console.log(res)

                        this.data = res.data;
                        this.id = res.data.messageid;
                        this.title = res.data.title;
                        this.total = res.data.studentcount;
                        this.read = res.data.isread;
                        this.date = res.data.createtime;
                        this.createUser = res.data.nickname;
                        this.content = app.tool.richTextToHtml(res.data.content);
                        this.shiftName = res.data.classname;
                        this.videoFileList = res.data.contentpreview;

                        // classname: "89mL4C";//班级名称
                        // content: "hkH7oU";//
                        // contentpreview: "s*6F";//
                        // courseendttime: "OBZZv^5";//
                        // coursestarttime: "jbF";//
                        // createtime: "fxD";//
                        // isfile: 7077142601558244;//
                        // isread: 7200275469680572;//
                        // isreadcount: "3^^s0S";//
                        // messageid: -3402390069940136;//
                        // nickname: "5HWGro";//
                        // studentcount: "UtsMg";//
                        // title: "XrM";//
                        // type: 6699991728510548;//

                        // // 判断是不是今天
                        // let _date = this.date.split(' ')[0].split('-'),
                        //     _today = new Date();
                        // this.isToday = _date[0] == _today.getFullYear() && _date[1] == _today.getMonth() + 1 && _date[2] == _today.getDate() ? true : false;
                    // } else if (res.errcode == 404) {
                    //     this.errorFlag = true;
                    // }
                });
            },
            toReadStatus() {
                this.$router.push({path: `/noticeStudentList/${this.id}`})
            },
            // 删除,只能删除当天的通知
            deleteHomework() {
                let _tips = this.read > 0 ? `当前消息已经有${this.read}人查看，确定要删除吗？` : '确认删除吗？';
                app.confirm(_tips).then(flag => {
                    if(flag) {
                        deleteNotice({
                            messageid: this.id
                        }).then(res => {
                            if(res.result.code == app.errok) {
                                // 删除成功后返回到列表页
                                app.eventDefine.emit('removeItem-notice-list', this.id);
                                
                                app.toast('success','已删除。');
                                this.$router.back();
                            } else {
                                app.toast('error',res.result.msg);
                            }
                        });
                    }
                })
            }
        },
        mounted() {
            this.loadDtail();    
        },

    };
</script>