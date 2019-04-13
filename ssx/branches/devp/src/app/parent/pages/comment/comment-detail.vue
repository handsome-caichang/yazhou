<!-- 课堂评价详情 -->
<style lang="scss" scoped>
	
	
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
				display: flex;
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
				    // margin: auto 0;
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
					}
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
				}
				.voice-content,.img-content {
					margin-top: 10px;
				}
			}
			.stu-content-wrapper {
				border-top: 1px solid $color-assist-1;
				background-color: $color-white;
				word-break: break-word;
				color: $color-6;
				font-size: 14px;
				padding: 10px;
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
</style>

<template>
	<div>
		<scroller-base 
			v-if="detail"
			class="comment-detail" 
			:data="renderData">
			<!-- 上课详情 -->
			<div class="card">
				<div class="card-hd">上课详情</div>
				<div class="cinfo">
					<div class="cinfo-item">
						<div class="cinfo-item-title">班级</div>
						<div class="cinfo-item-content">
							{{detail.classname}}<span v-if="detail.subjectname">-{{detail.subjectname}}</span>
						</div>
					</div>
					<div class="cinfo-item">
						<div class="cinfo-item-title">老师</div>
						<div class="cinfo-item-content">
                            {{detail.teachername}}
                        </div>
					</div>
					<div class="cinfo-item">
						<div class="cinfo-item-title">信息</div>
						<div class="cinfo-item-content">
							<div>{{dateStr}}</div>
							<div v-if="detail.ShiftContent">{{detail.datedetail}}</div>
						</div>
					</div>
					<div class="cinfo-item" v-if="detail.content">
						<div class="cinfo-item-title"></div>
						<div class="cinfo-item-content">
							<div>{{detail.content}}</div>
						</div>
					</div>
				</div>
			</div>
			
			<!-- 老师点评 -->
			<div class="void"></div>
			<div class="card-gray">
				<div class="card-gray-wrapper">
					<div class="card-hd">
						<span class="content-hd-icon bg1">
						    <svg class="icon" aria-hidden="true">
						        <use xlink:href="#icon-laoshidianping"></use>
						    </svg>
						</span>
						老师点评
					</div>
					<div class="tcomment" v-if="(detail.isteacherevad==1&&teacherScope>0)||(detail.isteacherevad==0)">
						<!-- 老师未评 -->
						<div v-if="detail.isteacherevad==0" class="teacher-no-comment">暂未评价</div>
						<!-- 老师已评 -->
						<div class="content-wrapper" v-if="detail.isteacherevad==1&&teacherScope>0">
							<star v-for="(tstar, index) in detail.teacherscope"
								  :key="index"
								  :title="tstar.name"
								  :desc="tstar.describe"
								  :starsDesc="detail.listscopedesc"
								  :selectedStarsNum="tstar.scope">
							</star>
						</div>
					</div>
					<div class="line" v-if="(detail.isteacherevad==1&&teacherScope>0)||(detail.isteacherevad==0)"></div>
					<!-- 老师已经评论内容 -->
					<div class="comment-content" 
		                v-if="detail.teachercontent||detail.listaudiofile.length>0||detail.listimgfile.length>0">
		                <div class="teacher-content" v-html="app.tool.textToHtml(detail.teachercontent)"></div>
		                <!-- <div>{{detail.data.TeacherContent}}</div> -->
		                <div class="voice-content">
							<voice-recording 
			                    :edit="false" 
			                    :audioFileList="detail.listaudiofile"
			                    v-if="detail.listaudiofile.length>0">
			                </voice-recording>
		                </div>
		                <div class="img-content">
			                <img-area
			                    :edit="false"
			                    :imageType="1"
			                    :imageFileList="detail.listimgfile"
			                    @imageLoaded="addScrollNum"
			                    v-if="detail.listimgfile.length>0">
			                </img-area>
		                </div>
					</div>
				</div>
			</div>
			
			<!-- 学习之星 -->
			<!-- <div class="void" v-if="detail.ListScopeStar.length>0"></div> -->
			<div class="card-gray" v-if="detail.scopestar.length>0">
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
						<div v-for="student in detail.scopestar" class="topstar-item">
							<div :style="'backgroundImage:url('+student.photo+')'" class="topstar-item-img"></div>
							<div class="topstar-item-name">{{student.name}}</div>
						</div>
					</div>
				</div>
			</div>
			
			<!-- 学生点评 -->
			<div class="void"></div>
			<div class="card-gray" v-if="!(detail.isfinished==1&&detail.isstudentevad==0)">
				<div class="card-gray-wrapper">
					
					<div class="card-hd" v-if="detail.isstudentevad==1">
						<span class="content-hd-icon bg3">
						    <svg class="icon" aria-hidden="true">
						        <use xlink:href="#icon-xueshengdianping"></use>
						    </svg>
						</span>
						学生点评
					</div>
					<div class="card-hd-stu" v-if="detail.isstudentevad==0">
						<span class="content-hd-icon bg3">
						    <svg class="icon" aria-hidden="true">
						        <use xlink:href="#icon-xueshengdianping"></use>
						    </svg>
						</span>
						学生点评
						<div class="describe" v-if="detail.studentscope.length">问下孩子的感受，给老师评个分吧（匿名评价）</div>
					</div>
					<!-- 未评价老师 -->
					<div class="scomment" v-if="detail.isstudentevad==0">
						<star v-for="(commentScope,index) in detail.studentscope"
							  :title="commentScope.name"
							  :desc="commentScope.describe"
							  :key="index"
							  :starsDesc="detail.listscopedesc"
							  :isClick="true"
							  :groupIndex="index"
							  :isFinished="detail.isfinished"
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
						<div v-if="detail.remark" class="remark">
							<div class="remark-title">评价说明：</div>
							<div class="remark-intro" v-html="app.tool.changeLine(detail.remark)"></div>
						</div>
					</div>

					<!-- 已评价老师 -->
					<div class="scomment" v-if="detail.isstudentevad==1">
						<star v-for="(star, index) in detail.studentscope"
							  :key="index"
							  :starsDesc="detail.listscopedesc"
							  :title="star.name"
							  :desc="star.describe"
							  :selectedStarsNum="star.scope"
							  :groupIndex="index"
							  @addScrollNum="addScrollNum">
						</star>
					</div>
					<div class="stu-content-wrapper"  v-html="app.tool.textToHtml(detail.studentcontent)" v-if="detail.studentcontent">
	                   
	                </div>
				</div>
			</div>
            <div class="void"></div>

		</scroller-base>
		<loading class="loading" v-show="isLoading" bgType="1"></loading>
	</div>
</template>

<script>
	/*
	 TODO:记得处理已结业的班级家长通过推送消息进来、
	 		按月计费的时间显示、
	 		评价说明要换行、
	 		跟后台确认ListScopeHistory判断需不需要展示历史评价
	 * */
	import { getcourseevaluatedetail, savecoursecomment } from 'parent/api/common';
	import Star from './child/star'
	
	export default {
		name: 'comment-detail',
		computed: {
			...Vuex.mapState(['userConfig']),
			dateStr() {
				let str = ''
				if (this.detail.unit === 3) {
					let arr 
					arr = this.detail.datedetail.split(' ')
					if (arr.length) {
						for (let i = 0; i < arr.length; i++) {
							if (arr[i].indexOf('~') < 0) {
								str = str + ' ' + arr[i]
							}
						}
					}
				} else {
					str = this.detail.datedetail
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
				if(this.detail.studentscope.length>0){
					tips += '其他'
				}
				tips += '意见和建议（匿名发送，请放心填写';
				if (this.detail.addpoint) {
					tips += '，还可以获得'+this.detail.addpoint+'个积分哦！'
				}
				tips += '）';
				return tips;
			}
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
                queryPara: null
			}
		},
		methods: {
			addScrollNum() {
				this.clickNum++;
			},
			selectStar(obj) {
				this.selectStars[obj.scopIndex].scope = obj.scope
			},
			sendComment() {
                this.isLoading = true;
				let params = {
					courseId: this.queryPara.courseid,
                    studentId: this.userConfig.userId,
                    content: app.tool.arrowFilter(this.content),
                    contenttype: 0,
                    coursecommentscopeinfos: this.selectStars
				}
				savecoursecomment(params).then(res => {
					if (res.result.code == app.errok) {
						this.$nextTick(() => {
							if(history.length>1){
								this.$router.go(-1)
							}else{
								this.$router.replace("/home/0");
							}
						})
						app.event.emit('selectStar')
					} else {
						app.toast('info', res.result.msg)
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
                if (this.detail.studentscope.length) {

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
					for (let i = 0; i < this.detail.studentscope.length; i++) {
						if (this.selectStars[i].scope === 0 && this.detail.studentscope[i].ismust == 1) {
							app.toast('info', `请对${this.detail.studentscope[i].name}进行评价。`)
							return
						} 
					}
					for (let i = 0; i < this.selectStars.length; i++) {
						if (this.selectStars[i].scope > this.detail.low) {
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
				
			}
		},
		created() {
			this.queryPara = this.$route.params;
			let params = {
				courseid: this.queryPara.courseid,
				companyid: this.userConfig.companyID,
				studentid: app.sysInfo.userId
			}
			getcourseevaluatedetail(params).then(res => {
				this.isLoading = false;
				if (res.result.code == app.errok) {
					this.detail = res.data
					// this.detail.studentscope = []
					this.detail.teacherscope = this.detail.teacherscope.filter(obj => {
						return obj.scope > 0
					})
					if (this.detail.isfinished == 1 && this.detail.isstudentevad == 0) {
						app.confirm({
							title: '班级结业',
							text: '该班级已经结业,不能继续评价，点击关闭页面'
						}).then(res => {
							if (res) this.$router.push({path:`/commentList`})
						})
					}
					this.selectStars = this.detail.studentscope.map(obj => {
						return {
							scope: obj.scope,
							settingID: obj.id
						}
					})
					for (var i = 0; i < this.detail.teacherscope.length; i++) {
						this.teacherScope += this.detail.teacherscope[i].scope
					}
				} 
			})
		},
		components: {
			Star
		}
	}
</script>