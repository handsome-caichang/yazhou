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
				.img-box,.voice-box{
					padding-top: 10px;
				}
			}
		}
	}
</style>

<template>
	<div class="notice-detail">
		<div class="body">
			<scroller-base class="scroller" :data="contentHtml">
				<div class="notice-info">
					<div>{{title}}</div>
					<div>
						<span>{{date}}</span>
						<span class="color3">{{createUser}}</span>
						</div>
				</div>
				<div @click="toReadStatus(id)" class="to-students">
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
						<div @click="removemessage" v-if="isToday">
							<svg class="icon icon-shanchu" aria-hidden="true">
								<use xlink:href="#icon-shanchu"></use>
							</svg>删除
						</div>
					</div>
					<div >
                        <div class="content-box">
							<div class="content" v-html="content"></div>
						</div>
						<div class="voice-box" v-if="mp3list.length">
							<voice-recording
                                    :edit="false"
                                    :audioFileList="mp3list"
                                    @voiceFinished="imgState++">
                            </voice-recording>
						</div>
						<div class="img-box" v-if="imglist.length">
							<img-area
								:edit="false"
								:imageType="1"
								:imageFileList="imglist"
								@imageLoaded="imgState++">
							</img-area>
						</div>
						
                    </div>
				</div>
			</scroller-base>
		</div>
	</div>
</template>

<script>
    import { getteachernoticeinfo, removemessage } from "teacher/api/notice";

	export default {
		name: "notice-detail",
		data() {
			return {
				wxTitle: "详情",
				title: "",
				createUser: "",
				content: "",
				imglist:[],
				mp3list:[],
				date: "",
				read: 0,
				total: 0,
				studentList: [],
				shiftName: "",
				isToday: false,
                id: "",
                imgState: 0
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
				getteachernoticeinfo({
					id: this.getId
				}).then(res => {
					if(res.result.code == 200) {
						this.id = res.data.messageid;
						this.title = res.data.title;
						this.createUser = res.data.nickname;
						this.total = res.data.studentcount;
						this.read = res.data.isreadcount;
						this.date = res.data.createtime;
						this.content = app.tool.richTextToHtml(res.data.content);
						this.shiftName = res.data.classname;
						this.imglist = res.data.imglist;
						this.mp3list = res.data.mp3list;
						// this.studentList.push(...res.data.studentList);

						// 判断是不是今天
						let _date = this.date.split(' ')[0].split('-'),
							_today = new Date();
						this.isToday = _date[0] == _today.getFullYear() && _date[1] == _today.getMonth() + 1 && _date[2] == _today.getDate() ? true : false;
					}
				});
			},
			toReadStatus(messageid) {
				// 当前班级没有学生
				// 当前班级有学生
				this.$router.push({path: `/noticeStudentList/${messageid}/${this.shiftName}`});
			},
			// 删除,只能删除当天的通知
			removemessage() {
				let _tips = this.read > 0 ? `当前消息已经有${this.read}人查看，确定要删除吗？` : '确认删除吗？';
				app.confirm(_tips).then(flag => {
					if(flag) {
						removemessage({
							messageid: this.id
						}).then(res => {
							if(res.result.code == 200) {
								// 删除成功后返回到列表页
								app.eventDefine.emit('removeItem', true);
								app.toast('success','已删除。');
								this.$router.back();
							} else {
                                app.toast('error',res.ErrorMsg);
                            }
						});
					}
				})
			}
		},
		mounted() {
			this.loadDtail();
		},
		beforeDestroy() {
			app.eventDefine.off('removeItem');
		}
	};
</script>