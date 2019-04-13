/*
 * @Author: Sa
 * @Date: 2017-12-08 14:46:32
 * @Last Modified by: Sa
 * @Last Modified time: 2018-02-14 13:52:51
 */
<style lang="scss" scoped>
    
    
    .notice-add {
        .body {
            @include position-absolute;
            background-color: #eef1f6;
            ::-webkit-input-placeholder {
                color: rgba(153, 153, 153, 1);
            }
            input {
                outline: none;
            }
            .scroller {
                @include position-absolute(0, 0, 48px, 0);
                overflow: hidden;
            }
            .accept-itme {
                display: flex;
                flex-wrap: wrap;
                background: #fff;
                color: rgba(51, 51, 51, 1);
                padding-bottom: 5px;
            }
            // 弹性列表项
            .flex-space-between {
                background: #ffffff;
                display: flex;
                justify-content: space-between;
                padding-left: 12px;
                padding-right: 12px;
                height: 44px;
                line-height: 44px;
                span {
                    &:last-child {
                        color: rgba(153, 153, 153, 1);
                        text-align: right;
                        max-width: 80%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
                .right-span {
                    @include ellipsis-single;
                    max-width: 95%;
                }
                input[type="text"] {
                    text-align: right;
                }
            }
            .flex-space-between.add-title {
                margin-top: 4px;
            }
            .add-content {
                margin-top: 4px;
                > div {
                    padding: 0 12px 15px 12px;
                    background: #ffffff;
                }
                .txt {
                    textarea {
                        border-radius: 2px;
                        border: 1px solid rgba(224, 229, 238, 1);
                        width: 100%;
                        height: 120px;
                        padding: 12px;
                        margin-top: 12px;
                        font-family: PingFangSC-Regular;
                        resize: none;
                    }
                    .voice {
                        padding-top: 15px;
                        padding-bottom: 15px;
                    }
                }
                .video-tips {
                    color: #1e88f5;
                }
                .img {
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    .img-wrapper {
                        width: 29vw;
                        height: 29vw;
                        max-width: 218px;
                        max-height: 218px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        border-radius: 2px;
                        border: 1px solid rgba(224, 229, 238, 1);
                        color: rgba(187, 187, 187, 1);
                        font-size: 0.625rem;
                        margin-bottom: 12px;
                        .icon-tianjiatupian {
                            width: 27.5229%;
                            height: 27.5229%;
                            margin-bottom: 13px;
                        }
                    }
                }
            }
        }
        .bottom-fixed-button {
            position: absolute;
            height: 48px;
            background: #fff;
            width: 100%;
            bottom: 0;
            font-size: 0.75rem;
            line-height: 48px;
            button {
                border: none;
                outline: none;
                width: 100%;
                height: 100%;
                font-size: 1rem;
                color: #fff;
                background: rgba(30, 136, 245, 1);
            }
        }
    }
</style>

<template>
	<div class="notice-add">
		<div class="body">
			<scroller-base 
				class="scroller" 
				ref="noticeAddScrollerBase" 
				:data="contentHtml">
				<div class="flex-space-between" @click="closeClassAction">
					<span>接收人</span>
					<span>
						<span class="right-span">
							{{ placeholderTxt }}
						</span>
						<svg class="icon card-next" aria-hidden="true">
							<use xlink:href="#icon-youjiantou"></use>
						</svg>
					</span>
				</div>
				<div class="accept-itme" v-html="accpetItemTxt"></div>
				<div class="flex-space-between add-title">
					<span>标题</span>
					<span><input type="text" placeholder="请输入标题" v-model="title"/></span>
				</div>
				<div class="add-content">
					<div class="txt">
						<div>内容</div>
						<textarea 
        			        v-model="content" 
							name="notice-content" 
							id="" 
							cols="30" 
							rows="10" 
							placeholder="写点儿什么吧！"
							@touchstart="app.area.start($event)"
							@touchmove="app.area.move($event)"
							@touchend="app.area.end($event)"
						></textarea>
					</div>
					<!-- 语音 -->
                    <div class="voice">
					  <voice-recording :edit="true" @voiceFinished="voiceFinished"></voice-recording>
                    </div>
					<!-- 图片 -->
					<div class="img-area">
						<img-area 
							:maxImgNum=9 
							@imageFinished="imageFinished">
						</img-area>
					</div>
                    <div class="video">
                        <span class="video-tips" v-if="clientType==1">请在微信端添加视频操作</span>
                        <video-area 
                            v-else
                            :edit="true"
                            :getAppToken="getAppToken"
                            @videoFinished="videoFinished"
                        ></video-area>
                    </div>
				</div>
			</scroller-base>
			<div class="bottom-fixed-button"><button @click="addNoticeFn">提交</button></div>
		</div>

        <loading class="loading" v-show="isLoading" :bgType="1"></loading>

		<!-- 选择接收班级 -->
		<NoticeClassList 
			:opened.sync="opened" 
			@getAccpets="getAccpets" 
			ref="noticeClassList">
		</NoticeClassList>
	</div>
</template>

<script>
    import NoticeClassList from "./child/class-list";
    import {savePost,getUploadToken} from "teacher/api/common";

    export default {
        name: "public-page",
        components: {
            NoticeClassList
        },
        data() {
            return {
                wxTitle: "发布通知",
                accpetItemTxt: "",
                accpetItem: [],
                placeholderTxt: "请选择",
                title: "",
                content: "",
                imgUploadOp: {
                    add: []
                },
                voiceUploadOp: {
                    add: []
                },
                listVideo: [],
                isFile: 0, // 是否包含附件： 不包含0，包含1
                contentType: 0, // 消息类型：文字0， 只有语音1， 只有图片，（html标签或富文本）3
                media_ids: "",
                media_url: "",
                opened: false,
                prevTime: 0,
                clientType: app.envType,
                isLoading: false
            };
        },
        computed: {
            contentHtml() {
                return {
                    img: this.imgUploadOp.add,
                    voice: this.voiceUploadOp.add,
                    classList: this.accpetItemTxt
                }
            }
        },
        methods: {
            // 选择接收班级
            closeClassAction() {
                this.opened = true;
            },
            // 接受选择的班级
            getAccpets(data) {
                let _itme = ""; // 筛选出班级人数大于0的已选班级
                let _filterClass = data.filter(item => item.chooseNum > 0);
                if (_filterClass.length > 0) {
                    _filterClass.forEach(item => {
                        if (item.chooseNum > 0) {
                            _itme +=
                            '<span class="items" style="background: rgba(224,229,238,1);border-radius: 100px;padding: 0 10px;margin: 5px 10px;">' +
                            item.shiftName +
                            " (" +
                            item.chooseNum +
                            ")名学生</span>";
                            this.placeholderTxt = "";
                        }
                    });
                    this.accpetItemTxt = _itme;
                    this.accpetItem = app.tool.clone(_filterClass);
                } else {
                    this.placeholderTxt = "请选择";
                    this.accpetItemTxt = "";
                }
            },
            // 获取图片
            imageFinished(imgs) {
                this.imgUploadOp.add = imgs;
            },
            // 获取语音
            voiceFinished(voices) {
                this.voiceUploadOp.add = voices;
            },
            videoFinished(curr, fileIdList) {
                this.listVideo = [...curr];
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
            // 提交
            addNoticeFn() {
                let currentTime = new Date().getTime();
                if (currentTime - this.prevTime < 1000) {
                    return;
                }
                // 筛选出班级人数大于0的已选班级
                let _filterClass = this.accpetItem.filter(item => item.chooseNum > 0);
                let _students = 0;
                _filterClass.forEach(item => (_students += item.chooseNum));

                if (_filterClass.length == 0) {
                    app.toast("info", "请选择接收人。");
                    return;
                }
                if (_students > app.sysInfo.SendTaskOrNoticeLimit) {
                    app.toast("info","接收人数已超过"+app.sysInfo.SendTaskOrNoticeLimit+"人限制，请重新选择。");
                    return;
                }
                // 标题50
                if (this.title.length == 0) {
                    app.toast("info", "请输入标题。");
                    return;
                } else if (this.title.length > 50) {
                    app.toast("info", "标题长度不超过50。");
                    return;
                }

                // 多媒体promise
                var _promise = [];

                // 语音
                this.voiceUploadOp.add.forEach(item => _promise.push(item.promise));
                // 图片
                this.imgUploadOp.add.forEach(item => _promise.push(item.promise));
                // 视频
                this.listVideo.forEach(item => _promise.push(item.promise));

                // 验证作业内容:(content,文本，_promise,语音和图片)
                if (this.content.length == 0 && _promise.length == 0) {
                    app.toast("info", "请输入通知内容。");
                    return;
                }

                this.isLoading = true;

                if (_promise.length > 0) {
                    // contentType=3， 有附件
                    this.contentType = 3;
                    // isFile=1，有附件
                    this.isFile = 1;
                    Promise.all(_promise).then(res => {
                        let _serverId = [];
                        let _url = [];
                        let _video = [];

                        if (this.clientType==1) {
                            res.forEach((item, key) => {
                                if (item.type == "video") {
                                    _video.push(item);
                                }
                            });
                            this.imgUploadOp.add.forEach((item) => {// 图片
                                _url.push(item.serverId);
                            });
                            this.voiceUploadOp.add.forEach((item) => {// 语音
                                _serverId.push(item.serverId);
                            })
                        }else {
                            res.forEach((item, key) => {
                                if (item.type == "video") {
                                    _video.push(item);
                                }else {
                                    _serverId.push(item);
                                }
                            });
                        }
                        
                        this.media_ids = _serverId.join(","); //微信场景这个字段包含语音和图片地址，钉钉场景不包含图片
                        this.media_url = _url.join(",");
                        // 视频
                        this.listVideo = _video.length ? JSON.stringify(_video) : "";
                        this.send();
                    }).catch(rej => {
                        app.toast("error", "上传附件失败，请在网络畅通时重新尝试。");
                        return;
                    });
                } else {
                    this.contentType = 0;
                    this.isFile = 0;
                    this.prevTime = new Date().getTime();
                    this.send();
                }
            },
            send() {
                let self = this;
                let param = {
                    clientType: this.clientType, //推送新增字段clientType:0微信，1钉钉
                    saveFlag: "TEACHER_MESSAGE",
                    id: 0,
                    subject: this.title,
                    content: app.tool.arrowFilter(this.content),
                    students: JSON.stringify(this.accpetItem),
                    media_ids: this.media_ids,
                    // smart上这个字段保留，用来保存钉钉的图片
                    mediaurl: this.media_url,
                    // 视频
                    listVideo: this.listVideo,
                    contentType: this.contentType,
                    isFile: this.isFile,
                    CurrentRole: app.sysInfo.currole.Id
                };
                savePost(param).then(res => {
                    if (res.errcode == 200) {
                        // 刷新列表
                        app.eventDefine.emit("refresh-notice-list");
                        app.toast("success", res.errmsg);
                        self.$router.back();
                    } else {
                        app.toast("error", res.errmsg);
                    }
                    // 无论成功失败都弹窗提示，关掉loading
                    setTimeout(() => {
                        self.isLoading = false;
                    }, 300);
                });
            }
        },
    };
</script>