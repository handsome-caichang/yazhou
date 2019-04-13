/*
 * @Author: Sa 
 * @Date: 2017-12-08 14:46:32 
 * @Last Modified by: Sa
 * @Last Modified time: 2018-02-24 09:54:43
 */
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
                    .multi-class{
                        background-color: $color-white;
                        padding: 0 12px;
                        .multi-class-top{
                            @include flex-between;
                            height: 44px;
                        }
                        .multi-class-bottom{
                            display: flex;
                            flex-wrap: wrap;
                            .item-class{
                                background-color:#E0E5EE;
                                border-radius: 100px;
                                padding: 0 10px;
                                margin-bottom: 10px;
                                margin-right: 5px;
                            }
                        }
                        
                    }
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
            .homework-tem{
                @include flex-between;
                padding: 0 12px;
                margin-top: 10px;
                height: 44px;
                line-height: 44px;
                background-color: $color-white;
            }
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

            .link-wrap{
                .link{
                    @include flex-between;
                    padding: 5px 0;
                    font-size: 14px;
                    .link-address{
                        text-decoration: underline;
                        color: $color-primary;
                        flex: 1;
                        @include ellipsis-single;
                    }
                    .icon{
                        font-size: 14px;
                        margin-left: 5px;
                        flex: 1;
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
                    <div class="multi-class" v-if="AllowMultipleClass">
                        <div class="multi-class-top" @click="openMultiClass">
                            <div>接收人</div>
                            <svg class="icon card-next" aria-hidden="true">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                        <div class="multi-class-bottom">
                            <div class="item-class" v-for="(item,index) in acceptMultiClassList" :key="index">
                                {{item.ClassName}} {{item.checkedNum}}名学生
                            </div>
                        </div>
                    </div>
					<div class="flex-space-between" v-else>
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

					<!--作业模板 配置项控制-->
                    <div class="homework-tem" v-if="EnableJobTemplate">
                        <span>作业模板</span>
						<span class="tem-name" @click="selectTem">{{temName}}<svg class="icon card-next" aria-hidden="true">
							<use xlink:href="#icon-youjiantou"></use>
						</svg>
                        </span>
                    </div>

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
                        <!--链接-->
                        <div class="link-wrap" v-if="EnableJobTemplate">
                            <div class="link" v-for="(item,index) in linkList" :key="index">
                                <a class="link-address" :href="item.FilePath">{{item.Name}}</a>
                                <div class="btn" @click="deleteLink(item)">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-shanchu2"></use>
                                    </svg>
                                </div>
                            </div>
                        </div>
					</div>

				</div>
			</scroller-base>
		</div>
		<div class="bottom-fixed-button"><button @click="addHomeworkFn">提交</button></div>

		<loading class="loading" v-show="isLoading" :bgType="1"></loading>

        <!-- 单选班级 -->
		<single-class-list
			:opened.sync="selectClass.onSelect"
            :echoData = "acceptSingleClassData"
			@getAccpets="getAccpets">
		</single-class-list>

        <!-- 多选班级 -->
        <multi-class-list :opened.sync="isOpenHomeworkClssList"
            :echoList="acceptMultiClassList"
            @acceptClassData="acceptClassData"
            v-if="AllowMultipleClass">
        </multi-class-list>    

        <!--作业模板-->
        <Tem
            :classid="classid"
            :opened.sync="openTem"
            @homeworkTem = homeworkTem>
        </Tem>
	</div>
</template>

<script>

    import {savePost,getUploadToken} from "teacher/api/common.js";
    import SingleClassList from "./child/single-class-list.vue";
    import MultiClassList from "./child/multi-class-list";
    import Tem from "./child/tem.vue";

	export default {
		name: "public-page",
		data() {
			return {
                wxTitle: "发布作业",
                EnableJobTemplate:app.sysInfo.EnableJobTemplate==1,//配置项 1开启 0关闭
                AllowMultipleClass:app.sysInfo.AllowMultipleClass==1, //能否多选班级 配置项 1开启 0关闭
                isOpenHomeworkClssList:false,//班级选择弹窗
                classid:'', //子组件接口所需的classid
                openTem:false,
                isLoading: false,
				selectClass: {
					onSelect: false,
					list: {}
				},
				acceptStudent: "",
                acceptSingleClassData:{},

                acceptMultiClassList:[], //多选班级 用于展示接收人的列表
                students:[], // 多选||单选班级 用于传参的数组 

                temName:'请选择作业模板',//作业模板名称

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

                //链接
                linkList:[],//只有模板可以选,无法在手机编辑

                // 以下是ajax参数
                isFile: 0, // 是否包含附件： 不包含0，包含1
                contentType: 0, // 消息类型：文字0， 只有语音1， 只有图片，（html标签或富文本）3
                media_ids: '',
				media_url: '',
				attachments: [],
				actionSheet: {
					open: false
				},
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
                    linkList: this.linkList,
                    acceptMultiClassList:this.acceptMultiClassList
                }
            }
		},
		methods: {
			// 选择班级action控制
			closeClassAction() {
                this.selectClass.onSelect = true;
            },
            // 多选班级
            openMultiClass(){
                this.isOpenHomeworkClssList = !this.isOpenHomeworkClssList;
            },
			// 接受选择的班级
			getAccpets(data) {
				if(data.checkedNum > 0) {
                    this.acceptSingleClassData = app.tool.clone(data);
					this.acceptStudent = data.ClassName + ' (' + data.checkedNum + ') ' + "名学生";
				} else {
					this.acceptSingleClassData = {};
					this.acceptStudent = '';
				}
            },
            acceptClassData(data){
                this.acceptMultiClassList = app.tool.clone(data);
            },
			// 打开或关闭录音面板
			opened(newVal) {
				this.actionSheet.open = newVal;
			},
			// 结束录音获取录音数据，object
			voiceFinished(voice, del) {
                this.voiceUploadOp.add = voice;
			},
			imageFinished(imgs, del) {
                this.imgUploadOp.add = imgs;
			},
			videoFinished(curr, fileIdList) {
				this.listVideo = [...curr]
            },
            fileFinished(curr,del) {
                this.listFile = [...curr];
            },
            // 选择作业模板
            selectTem(){
			    // 音频3个 图片9个 视频3个 文件5个
                //每次选模板都只覆盖

                if((!this.acceptSingleClassData.checkedNum)||this.acceptSingleClassData.checkedNum<1){
                    app.toast('info','请先选择接收人');
                    return
                }

                this.classid = this.acceptSingleClassData.ClassID;
                this.openTem = !this.openTem;

            },
            //接受作业模板
            homeworkTem(item){
                this.title = item.Title;                        //作业标题
                this.temName = item.Name;                       //  模板名称
                this.content = item.Content;                    //内容文本
				//手动将自动置为0(后台为int类型),为了是显示的时候不展示时长(实际上是音频大小),后台做起来麻烦所以在前端处理.
                if(item.AudioList && item.AudioList.length>0){
                	item.AudioList.forEach((i)=>{
                		i.FileLength = 0;
                	})
                }
                
                // 语音
                this.voiceUploadOp.add = item.AudioList;
                this.temVoice = item.AudioList;

                // 图片
                this.imgUploadOp.add = item.ImageList;
                this.temImg = item.ImageList;

                // 视频
                this.listVideo = item.VideoList;
                this.temVideo = item.VideoList;

                // 文件
                this.listFile = item.AttachmentsList;
                this.temFile = item.AttachmentsList;

                // 链接                
                this.linkList = item.LinkList;
            },
            //删除链接
            deleteLink(item){

                let ids = this.linkList.map(link => {
                        return link.ID;
                    }),
                    index = ids.indexOf(item.ID);

                if(index !== -1) {
                    this.linkList.splice(index, 1);
                }

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
               
				let currentTime = (new Date()).getTime();
				if(currentTime - this.prevTime < 1000) {
					return;
                }

                // 只拿取选择了的学员
                let fnDealStudents = function(arr){
                    if (!arr||arr.length<1){
                        return
                    }
                    let _arr = [];
                    arr.forEach((item)=>{
                        item.checked && _arr.push(item)
                    })
                    return _arr
                }
                
				// 接收人
                if(this.AllowMultipleClass){
                    // 多选
                    let flag = 0;//选择人数少于1则toast提示
                    let ls_students=[];
                    let ls_ids=[];//去重的判断数组
                    
                    // 根据courseID去重
                    this.acceptMultiClassList.length && this.acceptMultiClassList.forEach((item)=>{
                        // acceptMultiClassList一定是选择item.checkedNum>0
                        if(ls_ids.indexOf(item.CourseID)==-1){
                            ls_students.push({
                                "CourseID": item.CourseID,
                                "ClassID": item.ClassID,
                                "shiftName": item.ClassName,
                                "StudentList":fnDealStudents(item.Students)
                            });
                            ls_ids.push(item.CourseID);
                            flag++
                        }
                    })

                    if(flag<1){
                        app.toast('info','请选择接收人。');
                        return;
                    }else{
                        this.students = ls_students;
                    }
                }else{
                    // 单选
                    if((!this.acceptSingleClassData.checkedNum)||this.acceptSingleClassData.checkedNum <1) {
                        app.toast('info','请选择接收人。');
                        return;
                    }else{
                        this.students=[{
                            "CourseID": this.acceptSingleClassData.CourseID,
                            "ClassID": this.acceptSingleClassData.ClassID,
                            "shiftName": this.acceptSingleClassData.ClassName,
                            "StudentList":fnDealStudents(this.acceptSingleClassData.Students)
                        }];
                    }
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
			
                if(this.EnableJobTemplate){
                    // 配置开启

                    if(_promise.length >0){
                        // 有新增 (语音||图片||视频||文件)
                        this.contentType = 3;
                        this.isFile = 1;

                        Promise.all(_promise).then(res => {
                            let _serverId = [];
                            let _url = [];
                            let _video = [];
                            let _file = [];

                            // 无论是钉钉还是微信，视频和文件都有统一的出口和type，但是图片和语音存在差异
                            // res中处理了视频，文件，和微信环境的图片图片语音
                            if (this.clientType == 1) {

                                //钉钉环境下清空模板视频
                                tem_video = [];

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

                            tem_video = this.dealPara(tem_video,'video');//改变属性值
                            _video = this.dealPara(_video,'video');//改变属性值

                            let combArrLikeVideo=[],combArrLikeAtta=[];
                            combArrLikeVideo = _video.concat(tem_voice,tem_img,tem_video,this.linkList);//手机添加的+模板
                            combArrLikeAtta = tem_file.concat(_file);                     //手机添加的文件+模板文件

                            this.listVideo = combArrLikeVideo.length ? JSON.stringify(combArrLikeVideo) : '';// 视频
                            this.attachments = combArrLikeAtta.length ? JSON.stringify(combArrLikeAtta) : '';// 文件
                            this.media_url = _url.join(',');// 图片
                            this.media_ids = _serverId.join(',');// 语音
                            this.send();
                        }).catch(rej => {
                            app.toast('error','上传附件失败，请在网络畅通时重新尝试。');
                            return;
                        });

                    }else if(temNum>0){
                        // 没有在手机上新增
                        // 有模板 (语音||图片||视频||文件)
                        this.contentType = 3;
                        this.isFile = 1;

                        //钉钉发不了视频  把模板视频清空
                        if(this.clientType==1){
                            tem_video=[];
                        }

                        // 模板的 语音 图片 视频 链接 都是一个字段传递 （改变属性值↓）
                        tem_video = this.dealPara(tem_video,'video');

                        let combArr=[];
                        combArr = combArr.concat(tem_voice,tem_img,tem_video,this.linkList);

                        this.listVideo = combArr.length ? JSON.stringify(combArr) : '';// 视频 图片 语音
                        this.attachments = tem_file.length ? JSON.stringify(tem_file) : '';// 文件
                        // this.media_url = _url.join(',');// 图片
                        // this.media_ids = _serverId.join(',');// 语音


                        this.send();


                    }else{
                        // 没有新增也没有模板
                        this.contentType = 0;
                        this.isFile = 0;
                        // 记录调用请求的时间
                        this.prevTime = (new Date()).getTime();
                        this.send();
                    }

                }else{
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
                }

            },
            send() {
				// 推送新增字段clientType:0微信，1钉钉
				let self = this;
                let param = {
					clientType: this.clientType,
                    saveFlag: 'MESSAGE_TASK',
                    id: 0,
                    subject: this.title,
                    content: app.tool.arrowFilter(this.content),
                    media_ids: this.media_ids,
					// smart上这个字段保留，用来保存钉钉的图片
					mediaurl: this.media_url,
					// 视频  如有选择模板的配置，那么语音图片和链接都放在listVideo字段里
					listVideo: this.listVideo,
					// 文件
					attachments: this.attachments,
                    contentType: this.contentType,
                    isFile: this.isFile,
                    students: JSON.stringify(this.students),
                    CurrentRole: app.sysInfo.currole.Id
                };
                savePost(param).then(res => {
                    if(res.errcode == 200) {
						// 刷新列表
                        app.eventDefine.emit('refresh-homework-list');
						app.toast('success',res.errmsg);
						self.$router.back();
                    } else {
						app.toast('error',res.errmsg);
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
                this.homeworkTem(item)
            })
        },
        beforeDestroy(){
            app.eventDefine.off('acceptHomeworkTem')
        },
		components: {
            SingleClassList,
            MultiClassList,
            Tem
		},
	};
</script>