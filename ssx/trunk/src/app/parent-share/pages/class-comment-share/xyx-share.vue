/* 小银星上课点评分享 */

<style lang="scss" scoped>
    .comment-share {
        background: url("./imgs/bg.png") repeat;

        .empty-box {
            @include position-absolute;
            @include flex-center(column);
            background-color: $color-assist-1;

            .empty-img {
                width: 206px;
                height: 160px;
                @include background-img("./imgs/shixiao.png", cover);
            }

            .empty-tips {
                margin-top: 28px;
                font-size: $fs-normal-x;
                color: $color-9;
            }
        }

        .top {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            z-index: -1;

            img {
                width: 100%;
            }
        }

        .comment-wrap {
            padding-top: 65.87%;

            .comment {
                background: linear-gradient(#1B0041, #533083);

                .comment-top {
                    margin: 0 13px;
                    padding: 0 12px;
                    border: 6px solid #b7a0d5;
                    border-radius: 5px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    background-color: #f8f2ff;

                    .img-box {
                        width: 102px;
                        height: 102px;
                        background-color: transparent;
                        border-radius: 100%;
                        margin-top: -48px;
                        padding: 7px;

                        .img {
                            width: 100%;
                            height: 100%;
                            border-radius: 100%;
                            background-color: #f3f3f3;
                            border: 7px solid #b7a0d5;
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                        }
                    }

                    .info {
                        margin-top: 15px;
                        text-align: center;

                        .student-name {
                            font-size: 16px;
                            color: #333;
                            font-weight: bold;
                            letter-spacing: 2px;
                        }

                        .classroom {
                            font-size: 13px;
                            color: #333;
                            margin-top: 7px;
                        }
                    }

                    .rate {
                        margin-top: 20px;
                        width: 100%;

                        .item {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: center;
                            margin-top: 10px;

                            div {
                                width: 50%;

                                &:first-child {
                                    text-align: right;
                                }

                                &:last-child {
                                    margin-left: 20px;
                                    text-align: left;

                                    .icon {
                                        color: #fce59e;
                                    }
                                }
                            }
                        }
                    }

                    .content {
                        font-size: 16px;
                        color: #280a51;
                        text-align: left;
                        line-height: 29px;
                        margin-top: 20px;
                    }

                    .voice {
                        margin-top: 20px;
                        align-self: flex-start;

                        .itemVoice {
                            width: 175px;
                            height: 40px;
                            background: #ffffff;
                            border-radius: 4px;
                            border: 1px solid #D0D0D0;
                            text-align: right;
                            line-height: 40px;
                            padding: 0 14px;
                            color: #777;
                            position: relative;
                            margin: 0 8px;

                            background-image: url("./imgs/voice-fff-bg.png");
                            background-size: 12px 17px;
                            background-position: 10px 11px;
                            background-repeat: no-repeat;
                            margin-bottom: 15px;

                            &::before {
                                position: absolute;
                                left: -18px;
                                top: 10px;
                                content: "";
                                border: 9px solid #D0D0D0;
                                border-top-color: transparent;
                                border-bottom-color: transparent;
                                border-left-color: transparent;
                            }

                            &::after {
                                position: absolute;
                                left: -17px;
                                top: 10px;
                                content: "";
                                border: 9px solid #ffffff;
                                border-top-color: transparent;
                                border-bottom-color: transparent;
                                border-left-color: transparent;
                            }
                        }

                        .play {
                            background-image: url("./imgs/voice-fff-bg.gif");
                            background-size: 18px 17px;
                            background-position: 7px 11px;
                        }
                    }
                }

                .comment-photo {
                    margin: 40px 13px 0;

                    .li-wrap {
                        .li-item {
                            position: relative;
                            border: 6px solid #b7a0d5;
                            border-radius: 5px;
                            background-color: #fff;
                            display: flex;
                            flex-direction: column;
                            align-items: center;

                            .photo-display {
                                width: 189px;
                                height: 55px;
                                position: absolute;
                                top: -25px;

                                .img {
                                    width: 100%;
                                    height: 100%;
                                    background: url("./imgs/photo-display.png") no-repeat;
                                    background-size: cover;
                                }
                            }

                            .left-leaf {
                                width: 41px;
                                height: 50px;
                                background: url("./imgs/left-leaf.png") no-repeat;
                                background-size: cover;
                                position: absolute;
                                right: -19px;
                                bottom: 0px;
                            }

                            .right-leaf {
                                width: 41px;
                                height: 50px;
                                background: url("./imgs/right-leaf.png") no-repeat;
                                background-size: cover;
                                position: absolute;
                                left: -19px;
                                bottom: 0px;
                            }

                            .double-leaf {
                                position: absolute;
                                left: -19px;
                                right: -19px;
                                top: 0;
                                bottom: 0;
                                background: url("./imgs/left-leaf.png") 100% 100% no-repeat,
                                url("./imgs/right-leaf.png") 0 100% no-repeat;
                                background-size: 41px 50px, 41px 50px;
                            }

                            .img-item {
                                display: block;
                                width: 100%;
                            }

                            .bottoom-logo {
                                width: 314px;
                                height: 36px;
                                margin-top: 8px;
                                margin-bottom: 13px;
                                background: url("./imgs/logo.png") no-repeat;
                                background-size: cover;
                            }
                        }

                        .link {
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            margin: 0 25px;

                            > div {
                                width: 8px;
                                height: 24px;
                                background-color: #b7a0d5;
                            }
                        }
                    }
                }

                .comment-video {
                    margin: 40px 13px;

                    .video-box {
                        position: relative;
                        border: 6px solid #b7a0d5;
                        border-radius: 5px;
                        background-color: #fff;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-bottom: 24px;
                        padding-bottom: 60px;

                        &:nth-child(1) {
                            padding-top: 35px;
                        }

                        .video-display {
                            width: 189px;
                            height: 55px;
                            position: absolute;
                            top: -25px;

                            .img {
                                width: 100%;
                                height: 100%;
                                background: url("./imgs/video-display.png") no-repeat;
                                background-size: cover;
                            }
                        }

                        .video-wrap {
                            position: relative;
                            width: 100%;
                            height: 0;
                            padding-top: 61.54%;
                            display: flex;
                            justify-content: center;

                            .video {
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                background-repeat: no-repeat;
                                background-attachment: scroll;
                                background-size: cover;
                                background-position: center;

                                .video-task {
                                    position: absolute;
                                    width: 100%;
                                    height: 100%;
                                    background-color: rgba(0, 0, 0, 0.5);
                                    @include flex-center;

                                    .icon {
                                        font-size: 55px;
                                        height: 1em;
                                    }
                                }
                            }

                            .bottoom-logo {
                                width: 314px;
                                height: 36px;
                                margin-top: 8px;
                                margin-bottom: 13px;
                                background: url("./imgs/logo.png") no-repeat;
                                background-size: cover;
                            }
                        }
                    }
                }
            }
        }

        .join-us{
            padding:10px 0;
            margin: 0 20px;
            background-color:$color-white;
            border-radius:45px;
            .btn{            
                width: 140px;
                margin: 0 auto;
                background:$color-white;
                .img{
                    width: 140px;
                }
            }
        }

        .qr-code {
            display: flex;
            justify-content: center;
            margin-top: 56px;

            .img {
                width: 150px;
                height: 150px;
                background: url("./imgs/qr-code.png") no-repeat;
                background-size: cover;
            }
        }

        .footer {
            width: 100%;
            margin-top: 3px;

            .img {
                padding-top: 55.2%;
                background: url("./imgs/bottom-bg.png") no-repeat;
                background-size: cover;
            }
        }
    }
</style>

<template>
    <scroller-base class="comment-share" :data="renderData" ref="ShareFrame">

        <div v-if="isshow">
            <div class="top">
                <img src="./imgs/xyx-header-bg.png" alt="">
            </div>
        </div>
        <!-- 评论展示部分 -->
        <div class="comment-wrap">
            <div class="comment" v-if="detail">
                <!-- 文字与语音 -->
                <div class="comment-top">
                    <div class="img-box">
                        <div class="img" :style="`backgroundImage:url('${schoolInfo.studentPhoto}')`"></div>
                    </div>
                    <div class="info">
                        <div class="student-name">{{ schoolInfo.studentName }}</div>
                        <div class="classroom">{{ detail.data &&detail.data.ClassName }}</div>
                    </div>
                    <div class="rate">
                        <star v-for="(tstar, index) in detail.ListScopeTeacherDetail.filter((item) => { return item.Scope > 0;})"
                              :key="index" :title="tstar.CourseCommentScopeSettingName" :desc="tstar.Describe"
                              :starsDesc="detail.ListScopeDesc" :selectedStarsNum="tstar.Scope">
                        </star>
                    </div>
                    <div class="content" v-html="app.tool.textToHtml(detail.data.TeacherContent)"></div>
                    <div class="voice" ref="voiceBox">
                        <div :data-url="item.FilePath" class="itemVoice" v-for="(item, index) in detail.ListAudioFile"
                             :key="index">
                            <span>{{ item.FileLength }}"</span>
                        </div>
                    </div>
                </div>
                <!-- 照片 -->
                <div class="comment-photo" id="commentPhoto">
                    <ul>
                        <div class="li-wrap" v-for="(img,index) in detail.ListImgFile" :key="index">
                            <li class="li-item">
                                <div class="photo-display" v-if="index === 0">
                                    <div class="img"></div>
                                </div>
                                <div class="left-leaf" v-if="index%2 ===0">
                                </div>
                                <div class="right-leaf" v-if="index%2 ===1">
                                </div>
                                <div class="double-leaf" v-if="index === detail.ListImgFile.length-1"></div>
                                <img :src="img.FilePath||img.filepath" alt="" class="img-item" @click="previewImg(img)">
                                <div class="bottoom-logo"></div>
                            </li>
                            <div class="link" v-if="index !== detail.ListImgFile.length-1">
                                <div class="left-link"></div>
                                <div class="right-link"></div>
                            </div>
                        </div>
                    </ul>
                </div>
                <!-- 视频 -->
                <div class="comment-video">
                    <div class="video-box" v-for="(item, index) in detail.ListVideo" :key="index">
                        <div class="video-display" v-if="index === 0">
                            <div class="img"></div>
                        </div>
                        <div class="video-wrap">
                            <div class="video" :style="{backgroundImage: `url(${getThumbUrl(item)})`}"
                                 :data-src="item.FilePath" @touchstart="app.video.setSrc(item.FilePath)"
                                 @mousedown="app.video.setSrc(item.FilePath)" @click="openVideo">
                                <div class="video-task">
                                    <svg aria-hidden="true" class="icon">
                                        <use xlink:href="#icon-bofang"></use>
                                    </svg>
                                </div>
                            </div>
                            <div class="bottoom-logo"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 跳转去学员信息录入 -->
        <div class="join-us" @click="joinUs">
            <div class="btn">
                <img class="img" src="./imgs/register-bg.png">
            </div>
        </div>

        <!-- 二维码 -->
        <div class="qr-code">
            <div class="img"></div>
        </div>
        <!-- 底图 -->
        <div class="footer">
            <div class="img"></div>
        </div>

        <!-- 失效 -->
        <div class="empty-box" v-if="!isshow">
            <div class="empty-img"></div>
            <div class="empty-tips">此评价已失效</div>
        </div>
        <loading class="loading" v-show="isLoading"></loading>
    </scroller-base>
</template>

<script>
    import {
        getClassComment,
        postShareRegisterCommunication,
        getCompanyLogo
    } from "parentShare/api/share";
    import EmptyPage from "parentShare/components/common/empty-page/empty-page.vue";
    import Star from "./child/star";

    var urlQuery = app.tool.parseQuery();

    export default {
        name: "xyxshare",
        mixins: [app.mixin.shareMixin],
        components: {
            EmptyPage,
            Star
        },
        data() {
            return {
                wxTitle: "上课点评",
                detail: null,
                schoolInfo: null,
                timer: {
                    isLive: false,
                    durtion: 5,
                    btnTxt: "获取验证码",
                    startTime: null
                },
                tel: "",
                telCode: "",
                studentName: "",
                imgCode: "",
                studentInfo: {
                    name: "",
                    photo: ""
                },
                id: urlQuery.id,
                // 学校id
                companyId: urlQuery.companyId,
                // 校区id,报名必须
                campusid: "",
                topic: "courseCommentRegister",
                codebase64: "",
                // 分享出去的学校名称
                title: "",

                _voice: "",
                status: 0,
                isLoading: true,

                jumpUrl:'',
            };
        },
        computed: {
            renderData() {
                return {
                    detail: this.detail,
                    schoolInfo: this.schoolInfo,
                    imgArr: this.schoolInfo && this.schoolInfo.companyImages
                };
            },
            isshow() {
                return this.detail;
            },
            getSchoolName() {
                return this.schoolInfo.companyName;
            },
            getPreview() {
                let arr = [{
                    title: `我家${this.schoolInfo.studentName}在老师眼里原来这么棒！`,
                    desc: `在${this.getSchoolName}学习，孩子点滴进步看得见！`
                },
                    {
                        title: `原来我家${
                            this.schoolInfo.studentName
                            }上课的时候是这样的......老师评价得太到位啦！`,
                        desc: `在${this.getSchoolName}学习，孩子点滴进步看得见！`
                    },
                    {
                        title: `老师对我家${
                            this.schoolInfo.studentName
                            }评价这么好，不炫耀下真说不过去！`,
                        desc: `自从上了${this.getSchoolName}，再也不用担心孩子的学习！`
                    }
                ];
                return arr[Math.round(Math.random() * (arr.length - 1))];
            }
        },
        created() {
            // 分享
            getClassComment({
                id: this.id,
                companyId: this.companyId
            }).then(res => {
                this.isLoading = false;

                this.jumpUrl = res.data.JumpUrl;

                if (res.errorcode === 600) {
                    this.detail = null;
                }
                this.detail = res.data.commentDetail;
                this.schoolInfo = res.data.detail;
                // 校区id
                this.campusid = this.detail.data.CampusId;

                // 分享
                this.handlerDetail(this.getPreview);
                this.$nextTick(() => {
                    let imgBox = this.$refs.ShareFrame.$el.querySelector("#commentPhoto");
                    let imgs = imgBox.querySelectorAll("img");
                    Array.prototype.forEach.call(imgs, (img, index) => {
                        img.addEventListener("load", () => {
                            setTimeout(() => {
                                this.$refs.ShareFrame.refresh();
                            }, 10);
                        });
                    });
                });
            });

            window.setSchoolInfoToClassCommentShare = this.setData;
        },
        mounted() {
            setTimeout(() => {
                this.playVoice();
            }, 2000);
        },
        methods: {
            previewImg(img) {
                //预览图片
                let curClickTime = new Date().getTime();
                if (curClickTime - this.preClickTime < 500) {
                    //保证在500ms内不会重复打开两次预览(用户快速双击时), 造成不好的体验;
                    return;
                }
                this.preClickTime = curClickTime;

                let current =
                    img.localId || app.tool.getAbsUrl(img.FilePath || img.filepath),
                    urls = this.detail.ListImgFile.map(img => {
                        return (
                            img.localId || app.tool.getAbsUrl(img.FilePath || img.filepath)
                        );
                    });

                app.sdk.previewImage({
                    current: current,
                    urls: urls
                });
            },
            // 播放视频
            openVideo() {
                app.voice.flag && app.voice.stop();
                app.video.play();
            },
            // 播放语音
            playVoice() {
                let voiceBox = this.$refs.voiceBox,
                    opt = {
                        // 语音加载中
                        loading: () => {
                            this.status = 1;
                            this._voice.classList.add("loading");
                        },
                        // 语音播放中
                        playing: () => {
                            this.status = 2;
                            this._voice.classList.add("play");
                        },
                        // 回到默认状态
                        end: () => {
                            this.status = 0;
                            this._voice.classList.remove("loading");
                            this._voice.classList.remove("play");
                        },
                        // 回到默认状态
                        endAuto: () => {
                            this.status = 0;
                            this._voice.classList.remove("loading");
                            this._voice.classList.remove("play");
                        },
                        // 回到默认状态
                        error: () => {
                            this.status = 0;
                            this._voice.classList.remove("loading");
                            this._voice.classList.remove("play");
                        }
                    };
                voiceBox &&
                voiceBox.addEventListener("click", event => {
                    // 点击播放中的语音时，停止播放
                    if (this._voice && this._voice == event.target && this.status == 2) {
                        app.voice.stop();
                        return;
                    }
                    // 停止之前正在播放的语音,播放当前点击的语音
                    this._voice && this._voice != event.target && app.voice.stop();

                    this._voice = event.target;

                    if (this._voice.className === "itemVoice") {
                        // 播放语音
                        app.voice.play(this._voice.getAttribute("data-url"), opt);
                    }
                });
            },
            handlerDetail(params) {
                // 分享出去的学校logo
                let _shareLogo = this.schoolInfo.companyLogoPath;

                this.v_shareResolve({
                    title: params.title,
                    desc: params.desc,
                    link: `${location.href}`,
                    imgUrl: _shareLogo.length > 0 ?
                        `${_shareLogo.indexOf("http") < 0 ? "https:" : ""}${_shareLogo}` :
                        location.protocol +
                        "//" +
                        location.host +
                        "/weixin/parent/static/img/Group-2@3x.f0e0b64.png"
                });
            },
            setData(obj) {
                this.schoolInfo = obj.detail;
                this.detail = obj.commentDetail;
            },
            getThumbUrl(item) {
                // 老的数据是FilePath,改版后统一成Url;
                return (
                    item.ThumbPath ||
                    `${item.FilePath}?x-oss-process=video/snapshot,t_1000,f_jpg,w_300`
                );
            },
            // 去登记
            joinUs(){
                // 后台确认要直接跳转 jumpurl , 不用前端路由跳转。
                location.href = this.jumpUrl;
                
            }
         
        }
    };
</script>
