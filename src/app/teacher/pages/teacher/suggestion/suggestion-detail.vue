<style scoped lang="scss">
	
    
	.scroll {
		// @include position-absolute(0,0,0,0);
		.wrapper {
			.item {
				padding: 15px;
				background-color: $color-white;
				border-bottom: 1px solid $color-assist-1;
				.item-top {
					display: flex;
					.avatar {
						width: 40px;
						height: 40px;
						background-color: $color-assist-1;
						margin-right: 12px;
						border-radius: 50%;
						background-repeat: no-repeat;
						background-attachment: scroll;
						background-position: center;
						background-size: 100% 100%;
					}
					.text {
						flex: 1;
						.name {
							font-size: 16px;
							color: $color-3;
						}
						.time {
							font-size: 12px;
							color: $color-9;
						}

					}
					.icon-wrapper {
						width: 25px;
						text-align: right;
					}

				}
				.content {
					margin-top: 10px;
					font-size: 15px;
					color: $color-3;
					line-height: 24px;
					overflow: hidden;
				}
			}
			.record {
				margin-top: 5px;
				height: 44px;
				line-height: 44px;
				padding: 0 10px;
				display: flex;
				background-color: $color-white;
				font-size: 15px;
				color: $color-6;
				border-bottom: 1px solid $color-assist-1;
				.num, .now-reply{
					flex: 1;
				}
				.now-reply {
					font-size: 12px;
					text-align: right;
				}
			}
			.send-msg {
				margin-top: 5px;
				background-color: $color-white;
				padding: 10px;
				.huifu {
					font-size: 15px;
					color: $color-6;
				}
				.textarea {
					margin-top: 15px;
					border: 1px solid $color-assist-1;
					min-height: 159px;
					font-size: 15px;
					color: $color-9;
					padding-top: 5px;
                    resize: none;
				}
				.niming {
					margin-top: 13px;
					font-size: 15px;
					color: $color-6;
				}
				.text {
					margin-top: 10px;
					font-size: 12px;
					color: $color-9;
				}
				.submit {
					margin-top: 20px;
					width: 100%;
					height: 49px;
					background-color: $color-primary;
					color: $color-white;
					font-size: 16px;
					line-height: 49px;
					text-align: center;
					margin-bottom: 20px;
				}
				.submit-two {
					margin-top: 10px;
					display: flex;
					height: 49px;
					line-height: 49px;
					.sure{
						flex: 1;
						text-align: center;
						background-color: $color-primary;
						color: $color-white;
						font-size: 15px;
						margin-right: 10px;
					}
					.cancle {
						flex: 1;
						text-align: center;
						background-color: #ccc;
						color: #888;
						font-size: 15px;
					}
				}
			}
		}
		.noData {
			@include position-absolute;
		}
	}
</style>

<template>
	<scroller-base class="scroll" :data="scrollData" ref="scroll">
		<div class="wrapper" v-if="suggestionDetail">
			<div class="item" >
				<div class="item-top">
					<div class="avatar" :style="{backgroundImage: `url(${suggestionDetail.Photo})`}"></div>
					<div class="text">
						<div class="name">{{suggestionDetail.StudentName}}</div>
						<div class="time">{{suggestionDetail.StudentTime}}</div>
					</div>
				</div>
				<div class="content" ref="content" v-html="suggestionDetail.StudentContent"></div>
				<img-area
						class="img"
				        :edit="false"
				        :imageType="0"
				        :imageFileList="suggestionDetail.ListImgFile"
				        @imageLoaded="imageLoaded">
				</img-area>
			</div>
			<div class="record" v-if="suggestionDetail&&suggestionDetail.EmployeeReceive&&suggestionDetail.EmployeeReceive.length>0">
				<div class="num" >
					回复记录&nbsp({{suggestionDetail.EmployeeReceive&&suggestionDetail.EmployeeReceive.length}}条)
				</div>
				<div class="now-reply" @click="editSuggest" v-if="hasPower">
					立即回复
					<svg class="icon" aria-hidden="true">
					    <use xlink:href="#icon-tousuyujianyi1"></use>
					</svg>
				</div>
			</div>
			<div class="item" 
				v-if="suggestionDetail&&suggestionDetail.EmployeeReceive&&suggestionDetail.EmployeeReceive.length>0" 
				v-for="item in suggestionDetail.EmployeeReceive">
				<div class="item-top" @click="changeSuggest(item)">
					<div class="avatar" :style="{backgroundImage: `url(${item.TeacherPhoto})`}" v-if="!item.IsCryptonym"></div>
					<div class="avatar" :style="{backgroundImage: `url(${defaultIcon})`}" v-if="item.IsCryptonym"></div>
					<div class="text">
						<div class="name">{{item.IsCryptonym?'回复':item.TeacherName}}</div>
						<div class="time">{{item.TeacherTime}}</div>
					</div>
					<div class="icon-wrapper" v-if="hasPower">
						<svg class="icon" aria-hidden="true">
						    <use xlink:href="#icon-xiugai"></use>
						</svg>
					</div>
				</div>
				<div class="content">{{item.TeacherContent}}</div>
			</div>
			<div class="send-msg" v-if="hasPower">
				<div class="huifu">回复</div>
				<textarea 
	                placeholder="输入回复内容(500字以内)"
	                class="textarea"
	                v-model="suggestText"
	                ref="textarea"
	                maxlength="500" 
	                @touchstart="app.area.start($event)"
	                @touchmove="app.area.move($event)"
	                @touchend="app.area.end($event)">
	            </textarea>
				<div class="niming" @click="isTrueName=!isTrueName" v-show="showCryptonym">
					<svg class="icon" aria-hidden="true">
					    <use :xlink:href="isTrueName?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
					</svg>
					匿名回复
				</div>
				<div class="text" v-show="showCryptonym">勾选“匿名回复”后，家长不能看到回复人的真实姓名。否则，系统会显示回复人的真实姓名。</div>
				<div class="submit" 
					 v-show="isShowSubmit"
					 @click="sendSuggest('id')">
					 提交
				</div>
				<div class="submit-two" v-show="!isShowSubmit">
					<div class="sure" @click="sendSuggest('receiveid')">确定</div>
					<div class="cancle" @click="cancleEditSuggest">取消</div>
				</div>
			</div>
		</div>
		<empty-page class="noData" :type="9" v-if="!suggestionDetail"></empty-page>
	</scroller-base>
</template>

<script>
	import {getSuggestDetail, receiveSuggest} from 'teacher/api/suggestion'
	import EmptyPage from 'teacher/components/common/empty-page/empty-page'
	import defaultIcon from './img/cryptonym.png'
	export default {
		data() {
			return {
				wxTitle: "投诉与建议",
				isTrueName: true,
				isShowSubmit: true,
				suggestionDetail: null,
				suggestText: '',
				receiveid: null,
				defaultIcon: defaultIcon,
				showCryptonym: true,
				hasPower: true,
				scrollNum: 0
			}
		},
		computed: {
			scrollData() {
				return {
					detail: this.suggestionDetail,
					num: this.scrollNum
				}
			}
		},
		methods: {
			renderData() {
				getSuggestDetail({id: this.$route.params.id}).then(res => {
					if (res.ErrorCode === app.errok) {
						this.suggestionDetail = res.Data
						// this.suggestionDetail = null
						this.suggestionDetail.StudentContent = app.tool.textToHtml(this.suggestionDetail.StudentContent)
					}
				})
			},
			sendSuggest(id) {
				
				if (this.suggestText == '') {
					app.toast('info', '请输入内容。')
					return
				}
				
				let obj = {}
				obj[id] = id === 'id' ? this.$route.params.id : this.receiveid
				receiveSuggest(Object.assign(obj, {
					teacherContent: this.suggestText,
					isCryptonym: this.isTrueName
				})).then(res => {
						if (res.ErrorCode === app.errok) {
							this.suggestText = ''
							this.isShowSubmit = true
							this.renderData()
							app.toast('info', '您的回复提交成功。')
							if (id === 'id' || id.id) {
								app.event.emit('refresh')
							}
							if (id === 'receiveid') {
								this.showCryptonym = true
								this.isTrueName = true
							}
						}
					})
			},
			changeSuggest(item) {
				this.editSuggest()
				if (item) {
					this.isShowSubmit = false
					this.receiveid = item.ReceiveID
					this.suggestText = item.TeacherContent
					this.showCryptonym = false
					this.isTrueName = item.IsCryptonym
				}
			},
			editSuggest() {
				this.isShowSubmit = true
				this.suggestText = ''
				this.$nextTick(() => {
					this.$refs.scroll.scroller.scrollTo(0, this.$refs.scroll.scroller.maxScrollY)
					this.$refs.textarea.focus()
				})
			},
			cancleEditSuggest() {
				this.isShowSubmit = true
				this.suggestText = ''
				this.showCryptonym = true
			},
			imageLoaded() {
				this.scrollNum ++
			}
		},
		watch: {
		},
		created() {
			this.renderData()
			if (!app.tool.op('SuggestionsReply')) this.hasPower = false
		},
		components: {
			EmptyPage
		}
	}
</script>