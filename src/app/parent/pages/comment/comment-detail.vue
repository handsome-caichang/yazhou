<!-- 课堂评价详情 -->
<style lang="scss" scoped>
	$duration:0.1s;
	
	.comment-detail {
		line-height: 1;
        background-color: $color-assist-1;
		@include position-absolute;
		.void{
			height: 10px;
			background-color: $color-assist-1;
		}
		.card{
            background-color: $color-white;
			.card-hd{
				height: 44px;
				padding: 15px;
				font-size: 13px;
				color: $color-3;
				@include border-bottom;
				display: flex;
				.describe{
					margin-left: 10px;
					color: $color-9;
					font-size: 11px;
					text-align: center;
					padding-bottom: 10px;
				}
			}
			.cinfo{
				padding: 7px 15px;
				.cinfo-item{
					padding: 8px 0;
					display: flex;
					.cinfo-item-title{
						width: 45px;
						color: $color-9;
					}
					.cinfo-item-content{
						flex: 1;
						color: $color-3;
                        -webkit-user-select: text;
                        -moz-user-select: text;
                        -ms-user-select: text;
                        user-select: text;
					}
				}
			}
		}
		.card-gray {
			background-color: $color-assist-1;
			padding: 0 10px;
			.card-gray-wrapper {
				overflow: hidden;
				border-radius: 4px;
			}
			.xuexi-star-wrapper {
				padding-top: 10px;
				overflow: hidden;
				border-radius: 4px;
			}
			.card-hd{
				height: 49px;
				padding: 0 15px 0 40px;
				line-height: 49px;
				font-size: 16px;
				color: $color-3;
				@include border-bottom;
                @include flex-between;
				background-color: $color-white;
				.content-hd-icon{
				    position: absolute;
				    top: 0;
				    bottom: 0;
				    left: 15px;
				    margin: auto 0;
				    width: 16px;
				    height: 16px;
				    border-radius: 4px;
				    @include flex-center;
				    svg{
				        width: 9px;
				        height: 9px;
				        color: #ffffff;
				    }
				    &.bg1{
				        background: linear-gradient(#FF5370, #FF78A0);
				    }
				    &.bg2{
				        background: linear-gradient(#3C76EA, #71E2FF);
				    }
				    &.bg3{
				        background: linear-gradient(#39D397, #8AFFC3);
				    }
			    }
			}
			.card-hd-stu {
				height: 65px;
				padding: 15px 15px 15px 40px;
				font-size: 16px;
				color: $color-3;
				@include border-bottom;
				background-color: $color-white;
				.content-hd-icon{
				    position: absolute;
				    top: 0;
				    bottom: 0;
				    left: 15px;
				    top: 15px;
				    width: 16px;
				    height: 16px;
				    border-radius: 4px;
				    @include flex-center;
				    svg{
				        width: 9px;
				        height: 9px;
				        color: #ffffff;
				    }
				    &.bg3{
				        background: linear-gradient(#39D397, #8AFFC3);
				    }
			    }
				.describe{
					margin-top: 6px;
					color: $color-9;
					font-size: 11px;
				}
			}
			.tcomment{
				background-color: $color-white;
				padding: 15px 0 10px 15px;
				.teacher-no-comment {
					color: $color-9;
				}
				.tcomment-star{
					display: flex;
					align-items: center;
					padding: 4px 0;
					.star-name{
						flex: 1;
					}
					.star-content{
						width: 150px;
						text-align: right;
					}
					svg{
						font-size: 18px;
						padding-left: 12px;
					}
				}
			}
			.line {
				height: 1px;
				background: $color-assist-1;
			}
			.comment-content{
				background-color: $color-white;
				padding: 10px 15px;
				.teacher-content {
					word-break: break-all;
                    -webkit-user-select: text;
                    -moz-user-select: text;
                    -ms-user-select: text;
                    user-select: text;
				}
				.voice {
					margin-top: 15px;
				}
				.img {
					margin-top: 15px;
				}
                .video{
                    margin-top: 15px;
                }
			}
			.stu-content-wrapper {
				border-top: 1px solid $color-assist-1;
				background-color: $color-white;
				word-break: break-word;
				color: $color-6;
				font-size: 14px;
				padding: 10px;
                -webkit-user-select: text;
                -moz-user-select: text;
                -ms-user-select: text;
                user-select: text;
			}
			.textarea-wrapper {
				margin-right: 15px;
				height: 85px;
	            .not-comment-yet{
	            	padding: 12px 10px;
	                border: 1px solid #dddddd;
	                background-color: #FAFCFF;
	                font-size: 14px;
	                color: $color-9;
	                resize: none;
	            }
			}
			.topstar{
				background-color: $color-white;
				display: flex;
				flex-wrap: wrap;
				padding: 5px;
				.topstar-item{
					padding: 10px;
					width: 60px;
				}
				.topstar-item-img{
					width: 40px;
					height: 40px;
					border: 1px solid $color-white;
					border-radius: 100%;
					margin-bottom: 5px;
                    background-size: contain;
                    background-color: #EEF1F6;
				}
				.topstar-item-name{
					text-align: center;
					font-size: 12px;
				}
			}
			.none{
				display: none;
			}
			.scomment{
				padding: 10px 0 10px 15px;
				background-color: $color-white;
				.scomment-submit{
					height: 40px;
					margin-top: 20px;
					margin-right: 15px;
					font-size: 16px;
					color: $color-white;
					@include flex-center;
					background-color: #1A97F2;
				}
				.remark{
					margin-top: 20px;
					.remark-title{
						color: $color-3;
						font-size: 13px;
						margin-bottom: 10px;
						word-break: break-word;
					}
					.remark-intro{
						font-size: 11px;
						line-height: 16px;
						word-break: break-word;
					}
				}
			}
		}
	}
    .share{
        @include position-absolute;
        .share-shadow{
            @include position-absolute;
            background-color: #000000;
            opacity: 0.7;
            z-index: 2;
        }
        .share-box{
            @include position-absolute;
            z-index: 3;
            .finger{
                text-align: right;
                font-size: 36px;
                padding-right: 15px;
                padding-top: 5px;
            }
            .content{
                display: flex;
                flex-direction:row-reverse;
                .describe{
                    height: 44px;
                    line-height: 44px;
                    background-color: $color-primary;
                    border-radius: 44px;
                    font-size: 15px;
                    color: $color-white;
                    width: 150px;
                    text-align: center;
                    margin-right: 10px;
                    margin-top: 5px;
                }

            }
        }
    }
	.guide-btn{
		.btn-shadow{
			position:absolute;
			bottom: 2px;
			right: 0;
			left: 0;
			height: 44px;
			margin: 0 10px;
			background-color:#000000;
			opacity: 0.75;
			border-radius: 4px;
			transition: all $duration linear 0s;
			&.close{
				left: 100%;
			}
			.describe{
				padding: 5px 85px 5px 10px;
				line-height: 18px;
				color: $color-white;
				font-size: 12px;
				height: 40px;
				@include ellipsis-multi(2);
			}
		}
		.btn{
			position:absolute;
			bottom:10px;
			right: 20px;
			width: 65px;
			height: 28px;
			line-height: 28px;
			font-size: 14px;
			text-align: center;
			color:$color-white;
			background-color: $color-primary;
			transition: all $duration linear 0s;
			&.change{
				right: -5px;
				box-shadow: #666 0px 0px 8px; 
			}
		}
	}
</style>

<template>
	<div>
		<scroller-base 
			v-if="detail"
			class="comment-detail" 
			:data="renderData"
            ref="commentDetailScroller">
			<!-- 上课详情 -->
			<div class="card">
				<div class="card-hd">上课详情</div>
				<div class="cinfo">
					<div class="cinfo-item">
						<div class="cinfo-item-title">班级</div>
						<div class="cinfo-item-content">
							{{detail.data.ClassName}}<span v-if="detail.data.SubjectName">-{{detail.data.SubjectName}}</span>
						</div>
					</div>
					<div class="cinfo-item">
						<div class="cinfo-item-title">老师</div>
						<div class="cinfo-item-content" @click="()=>{app.gotoIM({toUserID: detail.data.TeacherUserID})}">
                            {{detail.data.TeacherNames}}
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-lianxilaoshi1"></use>
                            </svg>
                        </div>
					</div>
					<div class="cinfo-item">
						<div class="cinfo-item-title">信息</div>
						<div class="cinfo-item-content">
							<div>{{dateStr}}</div>
							<div v-if="detail.ShiftContent">{{detail.data.DateDetail}}</div>
						</div>
					</div>
					<div class="cinfo-item" v-if="detail.data.ShiftContent">
						<div class="cinfo-item-title"></div>
						<div class="cinfo-item-content">
							<div>{{detail.data.ShiftContent}}</div>
						</div>
					</div>
				</div>
			</div>
			
			<!-- 老师点评 -->
			<div class="void"></div>
			<div class="card-gray">
				<div class="card-gray-wrapper">
					<div class="card-hd">
                        <div class="title">
                            <span class="content-hd-icon bg1">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-laoshidianping"></use>
                                </svg>
                            </span>
                                老师点评
                        </div>
						
					</div>
					<div class="tcomment" v-if="(detail.data.IsTeacherEvad==1&&teacherScope>0)||(detail.data.IsTeacherEvad==0)">
						<!-- 老师未评 -->
						<div v-if="detail.data.IsTeacherEvad==0" class="teacher-no-comment">暂未评价</div>
						<!-- 老师已评 -->
						<div class="content-wrapper" v-if="detail.data.IsTeacherEvad==1&&teacherScope>0">
							<star v-for="(tstar, index) in detail.ListScopeTeacherDetail"
								  :key="index"
								  :title="tstar.CourseCommentScopeSettingName"
								  :desc="tstar.Describe"
								  :starsDesc="detail.ListScopeDesc"
								  :selectedStarsNum="tstar.Scope">
							</star>
						</div>
					</div>
					<div class="line" v-if="(detail.data.IsTeacherEvad==1&&teacherScope>0)||(detail.data.IsTeacherEvad==0)"></div>
					<!-- 老师已经评论内容 -->
					<div class="comment-content" 
		                v-if="detail.data.TeacherContent||detail.ListAudioFile.length>0||detail.ListImgFile.length>0||detail.ListVideo.length>0">
		                <div class="teacher-content" v-html="app.tool.textToHtml(detail.data.TeacherContent)"></div>
		                <!-- <div>{{detail.data.TeacherContent}}</div> -->
		                <div class="voice" v-if="detail.ListAudioFile.length>0">
							<voice-recording 
			                    :edit="false" 
			                    :audioFileList="detail.ListAudioFile"
			                    >
			                </voice-recording>
		                </div>
		                <div class="img" v-if="detail.ListImgFile.length>0">
			                <img-area
			                    :edit="false"
			                    :imageType="1"
			                    :imageFileList="detail.ListImgFile"
			                    @imageLoaded="addScrollNum"
			                    >
			                </img-area>
		                </div>
                        <div class="video" v-if="detail.ListVideo.length>0">
                            <video-area
                                    :edit="false"
                                    :videoFileList="detail.ListVideo"
                            ></video-area>
                        </div>
					</div>
				</div>
			</div>
			
			<!-- 学习之星 -->
			<!-- <div class="void" v-if="detail.ListScopeStar.length>0"></div> -->
			<div class="card-gray" v-if="detail.ListScopeStar.length>0">
				<div class="xuexi-star-wrapper">
					
					<div class="card-hd">
						<span class="content-hd-icon bg2">
						    <svg class="icon" aria-hidden="true">
						        <use xlink:href="#icon-xuexizhixing"></use>
						    </svg>
						</span>
						学习之星
					</div>
					<div class="topstar">
						<div v-for="student in detail.ListScopeStar" class="topstar-item">
							<div :style="'backgroundImage:url('+student.ImgPath+')'" class="topstar-item-img"></div>
							<div class="topstar-item-name">{{student.FullName}}</div>
						</div>
					</div>
				</div>
			</div>
			
			<!-- 学生点评 -->
			<div class="void"></div>
			<div class="card-gray" v-if="!(detail.data.IsFinished==1&&detail.data.IsStudentEvad==0)">
				<div class="card-gray-wrapper">
					
					<div class="card-hd" v-if="detail.data.IsStudentEvad==1">
						<span class="content-hd-icon bg3">
						    <svg class="icon" aria-hidden="true">
						        <use xlink:href="#icon-xueshengdianping"></use>
						    </svg>
						</span>
						学生点评
					</div>
					<div class="card-hd-stu" v-if="detail.data.IsStudentEvad==0">
						<span class="content-hd-icon bg3">
						    <svg class="icon" aria-hidden="true">
						        <use xlink:href="#icon-xueshengdianping"></use>
						    </svg>
						</span>
						学生点评
						<div class="describe" v-if="detail.ListScopeDetail.length">问下孩子的感受，给老师评个分吧（匿名评价）</div>
					</div>
					<!-- 未评价老师 -->
					<div class="scomment" v-if="detail.data.IsStudentEvad==0">
						<star v-for="(commentScope,index) in detail.ListScopeDetail"
							  :title="commentScope.CourseCommentScopeSettingName"
							  :desc="commentScope.Describe"
							  :key="index"
							  :starsDesc="detail.ListScopeDesc"
							  :isClick="true"
							  :groupIndex="index"
							  :isFinished="detail.data.IsFinished"
							  @selectStar="selectStar"
							  @addScrollNum="addScrollNum">
						</star>
						<div class="textarea-wrapper">
							<textarea 
								class="not-comment-yet"
								maxlength="500"
								v-model="content"
								:placeholder="commentTips" 
								@touchstart="app.area.start($event)"
								@touchmove="app.area.move($event)"
								@touchend="app.area.end($event)" 
								ref="textarea">
							</textarea>
						</div>
						<div class="scomment-submit" @click="submitComment">提交匿名评价</div>
						<div v-if="detail.data.Remark" class="remark">
							<div class="remark-title">评价说明：</div>
							<div class="remark-intro" v-html="app.tool.changeLine(detail.data.Remark)"></div>
						</div>
					</div>

					<!-- 已评价老师 -->
					<div class="scomment" v-if="detail.data.IsStudentEvad==1">
						<star v-for="(star, index) in detail.ListScopeDetail"
							  :key="index"
							  :starsDesc="detail.ListScopeDesc"
							  :title="star.CourseCommentScopeSettingName"
							  :desc="star.Describe"
							  :selectedStarsNum="star.Scope"
							  :groupIndex="index"
							  @addScrollNum="addScrollNum">
						</star>
					</div>
					<div class="stu-content-wrapper"  v-html="app.tool.textToHtml(detail.data.Content)" v-if="detail.data.Content!==''">
	                   
	                </div>
				</div>
			</div>
            <div class="void"></div>

		</scroller-base>
		<loading class="loading" v-show="isLoading" bgType="1"></loading>
		
		<!-- 分享引导遮罩页 -->
        <div class="share" v-show="showShare" @click="closeShareBox">
            <div class="share-shadow"></div>
            <div class="share-box">
                <div class="finger">
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-zhixiang"></use>
                    </svg>
                </div>
                <div class="content">
                    <div class="describe">点击此处完成分享</div>
                </div>
            </div>
        </div>
		<!-- ‘晒一波’按钮 -->
		<div class="guide-btn" v-if="enableShare">
			<div class="btn-shadow" :class="{close:!guide}">
				<div class="describe">
					孩子的点滴进步需要大家一起见证，赶紧晒一晒评价吧~
				</div>
			</div>
			<div class="btn" :class="{change:!guide}" @click="openShareBox">晒一波</div>
		</div>
	</div>
</template>

<script>
	/*
	 TODO:记得处理已结业的班级家长通过推送消息进来、
	 		按月计费的时间显示、
	 		评价说明要换行、
	 		跟后台确认ListScopeHistory判断需不需要展示历史评价
	 * */

	// 分享规则：
	// 1.有老师评价时，开启手机右上角三点的分享功能
    // 2.初次进入界面时，显示‘晒一晒’的说明描述性文字，滚动界面后文字消失，且再次进入界面之前不会再展示
    // 3.手动点击‘晒一晒’触发分享引导显示与否

	import { processGet, savePost, getCompanyLogo } from 'parent/api/common.js';
	import Star from './child/star.vue';

	export default {
		name: 'comment-detail',
		mixins: [app.mixin.shareMixin],
		computed: {
			dateStr() {
				let str = ''
				if (this.detail.data.Unit === 3) {
					let arr 
					arr = this.detail.data.DateDetail.split(' ')
					if (arr.length) {
						for (let i = 0; i < arr.length; i++) {
							if (arr[i].indexOf('~') < 0) {
								str = str + ' ' + arr[i]
							}
						}
					}
				} else {
					str = this.detail.data.DateDetail
				}
				return str
			},
			renderData(){
				return{
					detail: this.detail,
					clickNum: this.clickNum
				}
			},
			commentTips(){
				let tips = '';
				if(this.detail.ListScopeDetail.length>0){
					tips += '其他'
				}
				tips += '意见和建议（匿名发送，请放心填写';
				if (this.detail.data.AddPoint) {
					tips += '，还可以获得'+this.detail.data.AddPoint+'个积分哦！'
				}
				tips += '）';
				return tips;
			},			
		},
		data() {
			return {
				detail: null,
				clickNum: 0,
				isLoading: true,
				clickIndex: 0,
				content: '',
                selectStars:[], //选中的星星
                wxTitle: '评价详情',
				teacherScope: 0,
                title: '',
                queryPara: null,
                enableShare:false,//是否能分享（有老师点评就可以分享）
                showShare:false,//手动点击打开的引导(遮罩+手势icon)
                guide:true,//滚动之后改变的值（只显示一次）
			}
		},
		methods: {
			getPreview(schoolName) {
				let arr = [{
					id: this.detail.CommentID,
					title: `我家${this.$store.state.userConfig.username}在老师眼里原来这么棒！`,
					desc: `在${schoolName}学校学习，孩子点滴进步看得见！`
				},{
					id: this.detail.CommentID,
					title: `原来我家${this.$store.state.userConfig.username}上课的时候是这样的......老师评价得太到位啦！`,
					desc: `在${schoolName}学校学习，孩子点滴进步看得见！`
				},{
					id: this.detail.CommentID,
					title: `老师对我家${this.$store.state.userConfig.username}评价这么好，不炫耀下真说不过去！`,
					desc: `自从上了${schoolName}学校，再也不用担心孩子的学习！`
				}];
				return arr[Math.round(Math.random() * (arr.length-1))];
			},
			addScrollNum() {
				this.clickNum++;
			},
			selectStar(obj) {
				this.selectStars[obj.scopIndex].scope = obj.scope
			},
			sendComment() {
                this.isLoading = true;
				let params = {
					saveFlag: 'COURSE_COMMENT_REPLY',
					courseId: this.queryPara.id,
					studentId: this.queryPara.studentId,
					content: app.tool.arrowFilter(this.content),
					contentType: 0,
					jsonStar: JSON.stringify(this.selectStars)
				}
				savePost(params).then(res => {
					if (res.ErrorCode == app.errok || res.errcode == app.errok) {
						this.$nextTick(() => {
							if(history.length>1){
								this.$router.go(-1)
							}else{
								this.$router.replace("/home/0");
							}
						})
						app.event.emit('selectStar')
					} else {
						app.toast('info', res.errmsg)
                    }
                    setTimeout(() => {
                        this.isLoading = false;
					}, 300);
				})
			},
			submitComment() {
			    //判断每条评价维度是否必须评价，是但没有评价，则提示并return掉。
                //统计至少有一个评分（所有scope之和不为0，为0则提示‘给老师评个分吧^_^’。），而不是每条都需要评分
                //统计满足差评标准的维度，即scope>0&&scope<=标准&&没有填写内容，则提示‘您的评分很低，请给出差评理由’。提示按钮分别为‘直接提交’，‘好’。选择‘好’时评论框聚焦。选择‘直接提交’时直接提交。
                if (this.detail.ListScopeDetail.length) {
	                let isComment = false, isLowScope = false
	                for (var i = 0; i < this.selectStars.length; i++) {
	                	if(this.selectStars[i].scope > 0) {
	                		isComment = true
	                		break
	                	}
	                }
	                if (!isComment) {
	                	app.toast('info', `给老师评个分吧^_^。`)
	                	return
	                }
					for (let i = 0; i < this.detail.ListScopeDetail.length; i++) {
						if (this.selectStars[i].scope === 0 && this.detail.ListScopeDetail[i].IsMust == 1) {
							app.toast('info', `请对${this.detail.ListScopeDetail[i].CourseCommentScopeSettingName}进行评价。`)
							return
						} 
					}
					for (let i = 0; i < this.selectStars.length; i++) {
						if (this.selectStars[i].scope > this.detail.data.Low) {
							isLowScope = true
							break
						}
					}
					if (!isLowScope && this.content === '') {
						
						app.confirm({
						  	title: '提示',
						  	text: '您的评分很低,请给出差评理由',
						  	btns: [{
						      	text: '直接提交',
					      		style: {
					      		},
					      		action: 'submit'
						  	}, {
						      	text: '好',
	                           	style: {
	                               color: '#1E88F5'
	                           	},
	                           	action: 'giveup'
						  	}]
						}).then(res => {
							if (res === 'submit') {
								this.sendComment()
							} else {
								this.$nextTick(() => this.$refs.textarea.focus())
							}
						})
						return
					}
                }

				this.sendComment()
				
			},
			handlerDetail(){
				// 获取分享出去的学校logo
				getCompanyLogo().then(res => {
					let _shareLogo = res.Data.LogoPath;
					
					let params = this.getPreview(res.Data.Title);
					let _link = '';
					 if(app.sysInfo.ShowCustomerCommentSharePage == 1 ){
						 _link = `${location.protocol}//${location.host}/weixin/parent/share.html?id=${params.id}&companyId=${app.sysInfo.companyID}&studentId=${this.$store.state.userConfig.userId}&terminal=1#/xyxCommentShare`;
					 }else{
						_link = `${location.protocol}//${location.host}/weixin/parent/share.html?id=${params.id}&companyId=${app.sysInfo.companyID}&studentId=${this.$store.state.userConfig.userId}&terminal=1#/classCommentShare`
					}
					let that = this;
					this.v_shareResolve({
						title: params.title,
						desc: params.desc,
						link:_link,
						imgUrl: _shareLogo.length > 0 ? `${ _shareLogo.indexOf('http') < 0 ? 'https:' : ''}${_shareLogo}` : location.protocol + "//" + location.host + '/weixin/parent/static/img/Group-2@3x.f0e0b64.png',
						success:function(){
							that.closeShareBox();
						}
					})
				})
				// 参数 id:公告ID
			},
			openShareBox(){
				this.showShare = true;
			},
            closeShareBox(){
			    this.showShare = false;
            }
		},
		created() {
			this.queryPara = this.$route.params;
			let params = {
				pname: 'comment_detail',
				page: 1,
				id: this.$route.params.id,
				studentId: this.$route.params.studentId
			}
			processGet(params).then(res => {
				this.isLoading = false;
				if (res.errcode == app.errok) {
					this.detail = res;
					// this.detail.data.IsFinished = 1
					this.detail.ListScopeTeacherDetail = this.detail.ListScopeTeacherDetail.filter(obj => {
						return obj.Scope > 0
					});
					if (this.detail.data.IsFinished == 1 && this.detail.data.IsStudentEvad == 0) {
						app.confirm({
							title: '班级结业',
							text: '该班级已经结业,不能继续评价，点击关闭页面'
						}).then(res => {
							if (res) this.$router.push({path:`/commentList`})
						})
					}
					this.selectStars = this.detail.ListScopeDetail.map(obj => {
						return {
							scope: obj.Scope,
							settingID: obj.CourseCommentScopeSettingID
						}
					})
					for (var i = 0; i < this.detail.ListScopeTeacherDetail.length; i++) {
						this.teacherScope += this.detail.ListScopeTeacherDetail[i].Scope
					}

					// 分享   老师未评价时不能分享
                    if(res.data.IsTeacherEvad!=0){
                        this.handlerDetail();
                        this.enableShare = true;//有 ‘晒一波’ 按钮
                    }

				}
			});
		},
        mounted(){
		    let s = null;
			let scrollendCallBack = () => {	
                if(s.y<-49){
                    this.guide = false;
                    s.off('scrollEnd',scrollendCallBack);
                }
			};
            setTimeout(()=>{
				s = this.$refs.commentDetailScroller.scroller;
				//滑动之后消失
				s&&s.on('scrollEnd',scrollendCallBack);
            },301)
            //3s之后自动消失
            setTimeout(()=>{
				 this.guide = false;
			},3000)

        },
		components: {
			Star
		}
	}
</script>