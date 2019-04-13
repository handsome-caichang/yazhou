/*
 * @Author: Sa 
 * @Date: 2017-12-08 14:46:32 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-02 11:32:25
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
				.voice {
					padding-top: 15px;
					padding-bottom: 15px;
				}
				.img-box {
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
					<div class="flex-space-between add-title">
						<span>标题</span>
						<span>
						<input type="text" placeholder="请输入标题" v-model="title"/>
					</span>
					</div>
					<div class="add-content">
						<div class="txt">
							<div>内容</div>
							<textarea 
								name="input-text" 
								id="" cols="30" 
								rows="10" 
								placeholder="写点什么吧！" 
								v-model="content"
								@touchmove.stop="" 
								@touchstart="app.area.start($event)"
								@touchmove="app.area.move($event)"
								@touchend="app.area.end($event)"
							></textarea>
						</div>
						<div class="voice">
							<!-- 语音 -->
							<voice-recording :edit="true" @voiceFinished="voiceFinished"></voice-recording>
						</div>
						<div class="img-box">
							<img-area 
								:imageMaxNum=9 
								@imageFinished="imageFinished">
							</img-area>
						</div>
					</div>

				</div>
			</scroller-base>
		</div>
		<div class="bottom-fixed-button"><button @click="addHomeworkFn">提交</button></div>

		<loading class="loading" v-show="isLoading" :bgType="1"></loading>

		<ClassList 
			:opened.sync="selectClass.onSelect" 
			@getAccpets="getAccpets">
		</ClassList>
		
	</div>
</template>

<script>
	import ClassList from "./child/class-list";
    import {ophomework} from "teacher/api/homework";
	
	export default {
		name: "public-page",
		data() {
			return {
                wxTitle: "发布作业",
				selectClass: {
					onSelect: false,
					list: {}
				},
				acceptStudent: "",
				acceptStudentList: [],
				title: '',
				content: '',
				voice: {},
                imgUploadOp: {
                    add: [],
                    del: []
                },
                voiceUploadOp: {
                    add: [],
                    del:[]
                },
                isFile: 0, // 是否包含附件： 不包含0，包含1
                contentType: 0, // 消息类型：文字0， 只有语音1， 只有图片，（html标签或富文本）3
				media_ids: '',
				media_url: '',
				actionSheet: {
					open: false
                },
				prevTime: 0,
				clientType: app.env == 'wx' ? 0 : 1,
                isLoading: false
			};
        },
        computed: {
            richHtml() {
                return {
                    content: this.content,
                    imgs: this.imgUploadOp.add,
                    voice: this.voiceUploadOp.add
                }
            }
        },
		methods: {
			// 选择班级action控制
			closeClassAction() {
				this.selectClass.onSelect = true;
			},
			// 接受选择的班级
			getAccpets(data) {
                if(data.chooseNum > 0) {
					this.acceptStudentList = [data];
					// this.acceptStudentList[0].studentids = this.acceptStudentList[0].studentids.filter(item=>item.checked);
					this.acceptStudent = data.classname + ' (' + data.chooseNum +') ' + "名学生";
				} else {
					this.acceptStudentList = [];
					this.acceptStudent = '';
				}
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
			addHomeworkFn() {
				let currentTime = (new Date()).getTime();
				if(currentTime - this.prevTime < 1000) {
					return;
				}
                // 接收人
                if(this.acceptStudentList.length == 0 || this.acceptStudentList.chooseNum == 0) {
                    app.toast('info','请选择接收人。');
                    return;
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
                let _promise = [];
				var _vl = 0;
                // 语音
                this.voiceUploadOp.add.forEach(item => _promise.push(item.promise));
                // 图片
				this.imgUploadOp.add.forEach(item => _promise.push(item.promise));

                // 验证作业内容:(content,文本，_promise,语音和图片)
                if(this.content.length == 0 && _promise.length == 0) {
					app.toast('info','请输入作业内容。');
                    return;
				}

				this.isLoading = true;
				
				// 用长度来区分是语音还是图片（钉钉场景下需要）
				if(this.clientType == 1) {
					_vl = this.voiceUploadOp.add.length;
				}

                // contentType: HTML和富文本3，只有语音1，只有图片2，只有文字0
                if(_promise.length > 0) {
                    // contentType=3， 有附件
                    this.contentType = 3;
                    // isFile=1，有附件
                    this.isFile = 1;
                    Promise.all(_promise).then(res => {
						let _serverId = [];
						let _url = [];
              			res.forEach((item, key) => {
							  if(this.clientType == 0) {
								  // 返回的数据来自微信
								_serverId.push(item);
							} else {
								// 返回的数据来自钉钉且已经遍历
								if(_vl - 1 < key) {
									// 图片
									_url.push(item);
								} else {
									_serverId.push(item);
								}
							}
						});
                        // 微信场景这个字段包含语音和图片地址，钉钉场景不包含图片
						this.media_ids = _serverId.join(',');
						// 钉钉场景
						if(this.clientType == 1) {
							this.media_url = _url.join(',');
						};
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
				let param = {
					clientType: this.clientType,
                    subject: this.title,
                    content: app.tool.arrowFilter(this.content),
                    contenttype: this.contentType,
                    mediaids: this.media_ids,
					// smart上这个字段保留，用来保存钉钉的图片
					mediaurl: this.media_url,
					isfile: this.isFile,
					studentids: this.acceptStudentList,
					messageid: ''
                };
                ophomework(param).then(res => {
					if(res.result.code == 200) {
						// 刷新列表
                        app.eventDefine.emit('refresh-homework-list');
                        app.toast('success','发送成功。');
						this.$router.back();
						
                    } else {
                        app.toast('error',res.errmsg);
					}
					setTimeout(() => {
						this.isLoading = false;
					},300);
                });
            }
		},
		components: {
			ClassList
		}
	};
</script>