<!-- 发送作业 -->
<style lang="scss" scoped>
	.homework-add {
		.body {
			position: absolute;
			top: 0;
			bottom: 48px;
			left: 0;
			right: 0;
			background-color: #eef1f6;
			 ::-webkit-input-placeholder {
				color: rgba(153, 153, 153, 1);
			}
			input {
				outline: none;
			}
			.scroller {
				@include position-absolute;
				overflow: hidden;
				.s-body {
					padding: 15px;
				}
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
						width: 80%;
						display: flex;
						justify-content: flex-end;
						align-items: center;
					}
				}
				.right-span {
                    color: #333333;
					@include ellipsis-single;
					max-width: 95%;
				}
				input[type="text"] {
					text-align: right;
				}
			}
			.flex-space-between.add-title {
				margin-top: 10px;
			}
            // .homework-tem{
            //     @include flex-between;
            //     padding: 0 12px;
            //     margin-top: 10px;
            //     height: 44px;
            //     line-height: 44px;
            //     background-color: $color-white;
            // }
			.add-content {
				margin-top: 10px;
				>div {
					padding: 0 12px;
					background: #ffffff;
				}
				.txt {
					padding-top: 12px;
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
				}
				.video-tips {
					color: #1e88f5;
				}
				>div:not(:last-child) {
					padding-bottom: 15px;
				}
				>div:last-child {
					padding-bottom: 15px;
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
            // .link-wrap{
            //     .link{
            //         @include flex-between;
            //         padding: 5px 0;
            //         font-size: 14px;
            //         .link-address{
            //             text-decoration: underline;
            //             color: $color-primary;
            //             flex: 1;
            //             @include ellipsis-single;
            //         }
            //         .icon{
            //             font-size: 14px;
            //             margin-left: 5px;
            //             flex: 1;
            //         }
            //     }
            // }
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
		.action-sheet {
			@include position-absolute(0, 0, 0, 0);
			z-index: 2;
		}
	}
</style>

<template>
	<div class="homework-add">
		<div class="body">
			<scroller-base class="scroller" :data="richHtml">
				<div class="s-body">
                    <!--选择接收人-->
					<div class="flex-space-between">
						<span>接收人</span>
						<span @click="closeClassAction">
						<span class="right-span">
						{{ acceptStudent != '' ? acceptStudent : '请选择' }}
						</span>
						<svg class="icon card-next" aria-hidden="true">
							<use xlink:href="#icon-youjiantou"></use>
						</svg>
						</span>
					</div>
					<!--标题-->
					<div class="flex-space-between add-title">
						<span>标题</span>
						<span>
						<input type="text" placeholder="请输入标题" v-model="title"/>
					</span>
					</div>
					<!--作业模板 配置项控制
                    <div class="homework-tem" v-if="EnableJobTemplate">
                        <span>作业模板</span>
						<span class="tem-name" @click="selectTem">{{temName}}<svg class="icon card-next" aria-hidden="true">
							<use xlink:href="#icon-youjiantou"></use>
						</svg>
                        </span>
                    </div>
                    -->
					<div class="add-content">
						<div class="txt">
							<div>内容</div>
							<textarea
								name="input-text"
								id=""
								cols="30"
								rows="10"
								placeholder="写点什么吧！"
								v-model="content"
								@touchstart="app.area.start($event)"
								@touchmove="app.area.move($event)"
								@touchend="app.area.end($event)"
							></textarea>
						</div>
						<div class="voice">
							<!-- 语音 -->
							<voice-recording
                                :edit="true"
                                :audioFileList="temVoice"
                                @voiceFinished="voiceFinished">
                            </voice-recording>
						</div>
						<!-- 图片 -->
						<div class="img-area">
							<img-area
								:imageMaxNum=9
                                :imageFileList="temImg"
								@imageFinished="imageFinished">
							</img-area>
						</div>
						<!-- 视频 -->
						<div class="video">
							<span class="video-tips" v-if="clientType==1">请在微信端添加视频操作</span>
							<video-area
                                v-else
								:edit="true"
                                :videoFileList="temVideo"
                                :getAppToken="getAppToken"
								@videoFinished="videoFinished"
							></video-area>
						</div>
                        <!-- 文件 -->
                        <div class="file-wrap">
                            <file-area
                                :edit="true"
                                :fileList = "temFile"
                                :getAppToken="getAppToken"
                                @fileFinished="fileFinished"
                            ></file-area>
                        </div>
					</div>
				</div>
			</scroller-base>
		</div>
		<div class="bottom-fixed-button"><button @click="addHomeworkFn">提交</button></div>

		<loading class="loading" v-show="isLoading" :bgType="1"></loading>
		<ClassList
			:opened.sync="selectClass.onSelect"
            :echoData = "classData"
			@getAccpets="getAccpets">
		</ClassList>
	</div>
</template>

<script>
    import {getUploadToken} from "teacher/api/common.js";
    import {addjobbyteacher} from 'teacher/api/homework.js';
    import ClassList from "./child/class-list.vue";

	export default {
		name: "homework-add",
		data() {
			return {
                wxTitle: "发布作业",
                isLoading: false,
				selectClass: {
					onSelect: false,
					list: {}
				},
                classData:{},
				acceptStudent: "",
				acceptStudentList: [],
				title: '',
				content: '',
                //图片
                imgUploadOp: {
                    add: [],
                    del: []
                },
                temImg: [],
                //语音
                voiceUploadOp: {
                    add: [],
                    del:[]
                },
                temVoice: [],
				// 视频信息
                temVideo:[],//从模板过来的图片  这里必须多一个参数
				listVideo: [],
                // 文件信息
                temFile:[],//从模板过来的文件  这里必须多一个参数
                listFile: [],
                // 以下是ajax参数
                isFile: 0, // 是否包含附件： 不包含0，包含1
                contentType: 0, // 消息类型：文字0， 只有语音1， 只有图片，（html标签或富文本）3
                media_ids: '',
				media_url: '',
				attachments: [],
				prevTime: 0,
				clientType: app.envType,
			};
        },
        computed: {
            richHtml() {
                return {
                    content: this.content,
                    imgs: this.imgUploadOp.add,
					voice: this.voiceUploadOp.add,
					listFile: this.listFile,
                }
            }
		},
		methods: {
			closeClassAction() { //选择班级
				this.selectClass.onSelect = true;
			},
			getAccpets(data) { //接受选择的班级
				if(data.checkedNum > 0) {
                    this.classData = app.tool.clone(data);
					this.acceptStudent = data.classname + ' (' + data.checkedNum + ') ' + "名学生";
				} else {
					this.classData = {};
					this.acceptStudent = '';
				}
			},
			voiceFinished(voice, del) { //结束录音获取录音数据，object
                this.voiceUploadOp.add = voice;
			},
			imageFinished(imgs, del) {
                this.imgUploadOp.add = imgs;
			},
			videoFinished(curr, fileIdList) {
				this.listVideo = [...curr];
            },
            fileFinished(curr,del) {
                this.listFile = [...curr];
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
			addHomeworkFn() {
				let currentTime = (new Date()).getTime(),
                    fnDealStudents = function(arr){ // 只拿取选择了的学员
                        if (!arr||arr.length<1){
                            return
                        }
                        let _arr = [];
                        arr.forEach((item)=>{
                            item.checked && _arr.push(item.studentid)
                        })
                        return _arr
                    };

				if(currentTime - this.prevTime < 1000) {
					return;
				}
                if((!this.classData.checkedNum)||this.classData.checkedNum <1) {
                    app.toast('info','请选择接收人。');
                    return;
                }else{
                    this.students={
                        "courseid": this.classData.courseid,
                        "classid": this.classData.classid,
                        "classname": this.classData.classname,
                        "studentlist":fnDealStudents(this.classData.homeworkstudentinfos)
                    };
                }
                // 标题50
                if(this.title.length == 0) {
					app.toast('info','请输入标题。');
                    return;
                }else if(this.title.length > 50) {
                    app.toast('info','标题长度不超过50。');
                    return;
                }

                // 多媒体promise
                let _promise = [],
                    tem_voice = [],//存放编辑后剩下的模板 语音，用于后续resolve之后与res合并作为参数
                    tem_img = [],//存放编辑后剩下的模板 图片，用于后续resolve之后与res合并作为参数
                    tem_video = [],//存放编辑后剩下的模板 视频，用于后续resolve之后与res合并作为参数
                    tem_file = [],//存放编辑后剩下的模板 文件，用于后续resolve之后与res合并作为参数
                    // tem_link = [],//存放编辑后剩下的模板 链接（手机不能增加超链接，只能在文本编辑字符串，固没有promise）
                    temNum=0;//用于判断 如果只选择了模板而没有新增的时候
                //语音
                this.voiceUploadOp.add.forEach(item => {
                    if(item.promise){
                        _promise.push(item.promise)
                    }else{
                        tem_voice.push(item);
                        temNum++;
                    }
                });
                // 图片
                this.imgUploadOp.add.forEach(item => {
                    if(item.promise){
                        _promise.push(item.promise)
                    }else{
                        tem_img.push(item);
                        temNum++;
                    }
                });
                // 视频
                this.listVideo.forEach(item =>  {
                    if(item.promise){
                        _promise.push(item.promise)
                    }else{
                        tem_video.push(item);
                        temNum++;
                    }
                });
                // 文件
                this.listFile.forEach(item => {
                    if(item.promise){
                        _promise.push(item.promise)
                    }else{
                        tem_file.push(item);
                        temNum++;
                    }
                });
				// 验证作业内容:(content,文本，_promise,语音和图片)
                if(this.content.length == 0 && _promise.length == 0) {
					app.toast('info','请输入作业内容。');
                    return;
				}

                this.isLoading = true;
                // 配置项不开启时 处理视频Suffix
                if(_promise.length > 0) {
                    // contentType=3， 有附件
                    this.contentType = 3;
                    // isFile=1，有附件
                    this.isFile = 1;
                    Promise.all(_promise).then(res => {
                        let _serverId = [];
                        let _url = [];
                        let _video = [];
                        let _file = [];

                        // 无论是钉钉还是微信，视频和文件都有统一的出口和type，但是图片和语音存在差异
                        // res中处理了视频，文件，和微信环境的图片图片语音
                        if (this.clientType == 1) {
                            res.forEach((item, key) => {
                                if(item.type == 'video') {// 视频
                                    _video.push(item);
                                }else if(item.type == 'file'){// 文件
                                    _file.push(item);
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
                                if(item.type == 'video') {// 视频
                                    _video.push(item);
                                }else if(item.type == 'file'){// 文件
                                    _file.push(item);
                                }else {
                                    _serverId.push(item);
                                }
                            });
                        }
                        this.dealPara(_video,'video');
                        this.listVideo = _video.length ? JSON.stringify(_video) : '';// 视频
                        this.attachments = _file.length ? JSON.stringify(_file) : '';// 文件
                        this.media_url = _url.join(',');// 图片
                        this.media_ids = _serverId.join(',');// 语音
                        this.send();
                    }).catch(rej => {
                        app.toast('error','上传附件失败，请在网络畅通时重新尝试。');
                        return;
                    });
                } else {
                    this.contentType = 0;
                    this.isFile = 0;
                    // 记录调用请求的时间
                    this.prevTime = (new Date()).getTime();
                    this.send();
                }
            },
            send() {
				// 推送新增字段clientType:0微信，1钉钉
				let self = this;
                let param = {
                    content: app.tool.arrowFilter(this.content),
                    studentids: this.students.studentlist.join(),
                    istemp: 0, //1草稿0直接提交，TODO:这个字段要吗？
                    jobid: 0, //作业id
                    imagemediaids: this.media_ids, //图片mediaid
                    audiomediaids: '', //音频mediaid
                    vediofilelist: this.listVideo, //视频
                    filefilelist: this.attachments, //附件
                    linkfilelist: [], //链接
                    title: this.title, //标题
                    contentpreview: '', //预览内容
                    contentlength: '', //内容长度
                    courseid: this.classData.courseid, //排课id
                    isfile: this.isFile, 
                };
                console.log(param)
                addjobbyteacher(param).then(res => {
                    if(res.result.code == app.errok) {
                        app.eventDefine.emit('refresh-homework-list'); // 刷新列表
						app.toast('success',res.result.msg);
						self.$router.back();
                    } else {
						app.toast('error',res.result.msg);
					}
					setTimeout(() => {
						self.isLoading = false;
					}, 300);
                });
            },
            // 给每个视频对象 新增或者修改 Suffix 属性，值为type(视频为'video')
            dealPara(arr,type){
			    let afterArr=[];
                if(arr.length<1){
                    return arr
                };
                arr.forEach(item=>{
                        item.Suffix = type;
                    afterArr.push(item)
                })
                return afterArr
            }
		},
        mounted(){
		    app.eventDefine.on('acceptHomeworkTem',(type,item)=>{
                this.homeworkTem(item);
            })
        },
        beforeDestroy(){
            app.eventDefine.off('acceptHomeworkTem');
        },
		components: {
			ClassList
		}
	};
</script>