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
				background: #ffffff;
				padding: 0 15px;
                // 富文本详情
                .content,.img-box,.voice-box {
                    padding-bottom: 15px;
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
		<div class="body">
			<scroller-base class="scroller" :data="contentHtml">
				<div class="s-body">
					<div class="homework-info">
						<!-- 作业名称，删除按钮 -->
						<div class="title">
							<span>{{subject}}</span>
							<span @click.stop.prevent="deleteHomework()" v-if="createTime.ymd == '今天' && app.tool.op('MessageNoticeDelete') && getParams.from == 0">
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
						<div class="content-box">
							<div class="content" v-html="content"></div>
						</div>
						<div class="voice-box" v-if="mp3list.length">
							<voice-recording
                                    :edit="false"
                                    :audioFileList="mp3list"
                                    @voiceFinished="refreshNum++">
                            </voice-recording>
						</div>
						<div class="img-box" v-if="imglist.length">
							<img-area
								:edit="false"
								:imageType="1"
								:imageFileList="imglist"
								@imageLoaded="refreshNum++">
							</img-area>
						</div>
					</div>
				</div>
			</scroller-base>
		</div>
		<loading class="loading" v-show="isLoading" :type="loadingType"></loading>
	</div>
</template>
<script>
    import {gethomeworkdetailforteacher, deletehomework} from "teacher/api/homework";
    import RichTextArea from 'teacher/components/common/rich-text-area/rich-text-area.vue';

	export default {
        components: {
            RichTextArea
        },
		data() {
			return {
				wxTitle: "作业详情",
				isLoading: true,
				loadingType: 0,
				refreshNum: 0,
				
				subject: '',
				shiftName: '',
				createTime: '',
				createUser: '',
				isreadcount: 0,
				content: '',
				mp3list:[],
				imglist:[],
				
			}
		},
		computed: {
			getId() {
				return this.$router.currentRoute.params.id;
			},
			getParams() {
				return this.$route.query;
			},
            contentHtml() {
                return {
                    shiftName: this.shiftName,
                    content: this.content,
                    refreshNum: this.refreshNum
                }
            }
		},
		mounted() {
			this.getDetail();
		},
		methods: {
			getDetail() {
                let self = this;
				gethomeworkdetailforteacher({
					pname: 'message_detail',
					messageid: this.getId
				}).then(res => {
					this.isLoading = false;
					if(res.result.code == 200) {
						self.subject = res.data.title;
						self.createUser = res.data.createuser;
						self.shiftName = res.data.classname;
						self.createTime = this.formatDate(res.data.msgcreatetime);
						self.isreadcount = res.data.isreadcount;
                        self.content = app.tool.richTextToHtml(res.data.content);
                        self.mp3list = res.data.mp3list;
                        self.imglist = res.data.imglist;
					}
				});
			},
			deleteHomework() {
				this.loadingType = 1;
                let _confirmTxt = this.isreadcount > 0 ? `已有${this.isreadcount}名学员查看，确定要删除该作业吗？` : '确认要删除吗？'
				app.confirm(_confirmTxt).then(flag => {
					if(flag) {
						deletehomework({
							messageid: this.getId
						}).then(res => {
                            if(res.result.code == 200) {
                                app.eventDefine.emit('removeItem-homework-list');
                                app.toast('success','已删除。');
                                this.$router.back();
                            } else {
                                app.toast('error',res.ErrorMsg);
							}
							setTimeout(() => {
								this.isLoading = false;
							},300);
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
		}
	}
</script>