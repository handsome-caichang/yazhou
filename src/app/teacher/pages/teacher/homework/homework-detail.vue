<style lang="scss" scoped>
	
	
	.homework-detail {
		.body {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #EEF1F6;
			.scroller {
				@include position-absolute;
				overflow: hidden;
				.s-body {
					padding: 15px;
				}
			}
			.homework-info {
				background: #fff;
				padding: 15px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.title {
					display: flex;
					justify-content: space-between;
					align-items: center;
					span:first-child {
						color: #333333;
						font-size: 16px;
					}
					.delete {
						width: 15px;
						height: 15px;
						color: #999;
					}
				}
				.author {
					font-size: 12px;
					margin-top: 10px;
					span:first-child {
						color: #666666;
					}
					span:last-child {
						color: #999999;
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
				-webkit-user-select: text;
				-moz-user-select: text;
				-ms-user-select: text;
				user-select: text;
                // 富文本详情
                .content {
                    background: #ffffff;
					.rich-text-box {
						padding-top: 0px;
					}
                }
				.video {
					padding: 0 12px 12px;
					.video-tips {
						color: #1e88f5;
					}
				}
				.file-wrap {
					padding: 0 12px 12px;
				}
			}
            .link-wrap{
                padding: 0 12px 12px;
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
	<div class="homework-detail">
		<div class="body" v-if="data">
			<scroller-base class="scroller" ref="hdscroller" :data="contentHtml">

				<div class="s-body">
					<div class="homework-info">

						<!-- 作业名称，删除按钮 -->
						<div class="title">
							<span>{{subject}}</span>
							<span @click.stop.prevent="deleteHomework()" v-if="createTime.ymd == '今天' && app.tool.op('TaskWorkDelete') && getParams.from == 0">
								<svg class="icon delete" aria-hidden="true">
									<use xlink:href="#icon-shanchuyuyin2"></use>
								</svg>
							</span>
						</div>

						<!-- 老师，发布时间 -->
						<div class="author">
							<span>
								<svg class="icon card-next" aria-hidden="true">
									<use xlink:href="#icon-laoshifabu"></use>
								</svg>
								{{createUser}}
							</span>
							<span>
								<svg class="icon card-next" aria-hidden="true">
									<use xlink:href="#icon-riqiicon"></use>
								</svg>
								{{createTime.ymd + ' ' + createTime.time}}
							</span>
						</div>

					</div>
					
					<div class="rich-text-container">
						
						<!-- 作业详情 -->
						<div class="content">
							<rich-text-area v-if="content" 
								:richText="content" 
								@imgLoaded="imgState++"></rich-text-area>
								
							<!-- 视频 -->
							<div class="video" v-if="videoFileList.length>0">
								<span class="video-tips" v-if="clientType==1">请在微信端查看视频</span>
								<video-area v-else
									:edit="false"
									:videoFileList="videoFileList"
								></video-area>
							</div>

							<!-- 文件 -->
							<div class="file-wrap">
								<file-area 
									:edit="false"
									:fileList="fileList"
								></file-area>
							</div>

                            <!--链接-->
                            <div class="link-wrap" v-if="linkList.length">
                                <div class="link" v-for="(item,index) in linkList" :key="index">
                                    <a class="link-address" :href="item.FilePath">{{item.Name}}</a>
                                </div>
                            </div>
						</div>

					</div>
				</div>
				
			</scroller-base>
		</div>
		<error-page class="error-temp" v-if="errorFlag" :type="600" text="无法读取该消息，可能已被删除。"></error-page>
		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>
<script>
	import {processGet} from "teacher/api/common";
	import { homeworkAxios } from 'teacher/api/homework'
	import ErrorPage from 'teacher/components/common/error-page/error-page';
    import RichTextArea from 'teacher/components/common/rich-text-area/rich-text-area.vue';

	export default {
        components: {
        	ErrorPage,
			RichTextArea,
        },
		data() {
			return {
                wxTitle: "作业详情",
                errorFlag: false,
				subject: '',
				shiftName: '',
				createTime: '',
				createUser:'',
				isReadCount: 0,
                isCommentCount: 0,
                isSubmitCount: 0,
				studentCount: 0,
				content: '',
                isLoading: true,
				imgState: 0,
				videoFileList: [],
                linkList:[], //链接
				data: null,
				clientType: app.envType,
				fileList: []
			}
		},
		computed: {
			getParams() {
				// return this.$router.currentRoute.params;
				return this.$route.query;
			},
			getId() {
				return this.$route.params.id;
            },
            contentHtml() {
                return {
                    shiftName: this.shiftName,
                    content: this.content,
					imgState: this.imgState,
					fileList: this.fileList
                }
            }
		},
		created() {
			this.getDetail();
		},
		methods: {
			getDetail() {
                let self = this;
				processGet({
					pname: 'message_detail',
					id: this.getId
				}).then(res => {
					this.isLoading = false;
					if(res.errcode == 200) {
						self.data = res.data;
						self.subject = res.data.subject;
						self.shiftName = res.data.shiftName;
						self.createTime = this.formatDate(res.data.createTime);
						self.createUser = res.data.createUser;
						self.isReadCount = res.data.isReadCount;
                        self.isCommentCount = res.data.isCommentCount;
                        self.isSubmitCount = res.data.isSubmitCount;
						self.studentCount = res.data.studentCount;
						self.videoFileList = [...res.data.listVideo];
						self.linkList = [...res.data.linkList];
						self.content = app.tool.richTextToHtml(res.data.content);
						self.fileList = res.data.attachments;
					} else if (res.errcode == 404) { //作业被删除
                        this.errorFlag = true;
                    }
				});
			},
			deleteHomework() {
                let _confirmTxt = this.isReadCount > 0 ? `已有${this.isReadCount}名学员查看，确定要删除该作业吗？` : '确认要删除吗？'
				app.confirm(_confirmTxt).then(flag => {
					if(flag) {
						homeworkAxios.deleteHomework({
							id: this.getId
						}).then(res => {
                            if(res.ErrorCode == 200) {
                                app.eventDefine.emit('removeItem-homework-list');
                                app.toast('success','已删除。');
                                this.$router.back();
                            } else {
                                app.toast('error',res.ErrorMsg);
                            }
						})
					}
				})
			},
			formatDate(data) {
				// 格式：2017-12-6 17:37:17
				// 截取时间(hh:hmm)
				var _time = data.split(" ")[1];
				// 去掉秒
				_time = _time.split(":").splice(0, 2).join(":");
				// 截取年月日(yy-mm-dd)
				var _ymd = data.split(" ")[0];
				var _y = _ymd.split("-")[0];
				var _m = _ymd.split("-")[1];
				var _d = _ymd.split("-")[2];
				// 是否为今天
				var _date = new Date();
				return {
					ymd: _date.getFullYear() + "" === _y &&
						(_date.getMonth() + 1 < 10 ? "0" + (_date.getMonth() + 1) :
							_date.getMonth() + 1 + "") === _m &&
						(_date.getDate() < 10 ?
							"0" + _date.getDate() :
							_date.getDate() + "") === _d ?
						"今天" :
						_ymd,
					time: _time
				};
			}
		},
	}
</script>