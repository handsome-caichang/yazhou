<style scoped lang="scss">
	.home {
		.scroll {
		    @include position-absolute(0, 0, 49px, 0);
		    background-color: #F7F8FA;
		    padding: 15px 16px;
		    .item-mg {
		        margin-top: 8px;
		    }
		    .item {
		        height: 49px;
		        border: 1px solid #F7F8FA;
		        border-radius: 6px;
		        background-color: $color-white;
		        color: $color-9;
		        padding: 0 15px;
		        &:nth-child(n+2) {
		            margin-top: 8px;
		        }
		        @include flex-between;
		        .text {
		            // width: 40px;
		            font-size: 14px;
		        }
		        .spec {
		            color: #FF735C;
		        }
		        .input {
		            flex: 1;
		            font-size: 15px;
		            text-align: right;
		            color: $color-3;
		        }
		        .mid {
		            flex: 1;
		            text-align: right;
		            @include ellipsis-single;
		            margin-left: 30px; 
		            font-size: 14px;
		            color: $color-3;
		        }
		        .mid-spec {
		            font-size: 14px;
		            color: $color-3;
		        }
		        .spec-mid {
		            flex: 1;
		            text-align: right;
		            span {
		                display: inline-block;
		                width: 25px;
		                height: 49px;
		                line-height: 49px;
		                text-align: center;
		                font-size: 18px;
		            }
		            .active {
		                color: #FFD427;
		            }
		        }
		        .right {
		            width: 20px;
		            text-align: right;
		        }
		        .right-sex {
		            width: 120px;
		            display: flex;
		            justify-content: space-between;
		            .icon {
		                font-size: 54px;
		            }
		        }
		    }
		    .more {
		        margin-top: 16px;
		        text-align: center;
		        font-size: 12px;
		        color: $color-primary;
		    }
		    .remark {
		        margin-top: 10px;
		        .remark-text {
		            font-size: 14px;
		            color: $color-3;
		            border-radius: 6px;
		            height: 71px;
		            padding: 13px 16px; 
		        }
		    }

		    .void {
		        height: 25px;
		        background-color: #F7F8FA;
		    }
		}
		.bottom {
		    @include position-absolute(false, 0, 0, 0);
		    height: 49px;
		    border-top: 1px solid #C2CCDC;
		    @include flex-between;
		    padding: 0 8px;
		    .content {
		        height: 40px;
		        line-height: 40px;
		        background-color: #5991FF;
		        border: 1px solid #5991FF;
		        border-radius: 2px;
		        color: $color-white;
		        font-size: 17px;
		        text-align: center;
		        width: 100%;
		    }
		}
	}
</style>

<template>
	<div class="home">
		<scroller-base class="scroll" v-if="showLoading">
			<div class="item" v-if="map['cName']&&map['cName'].isuse">
			    <div class="text">学员</div>
			    <span class="spec" v-if="map['cName'].isallowempty">*</span>
			    <input type="text" class="input" placeholder="请输入" v-model="cName">
			</div>
			<div class="item" v-if="map['cPhone']&&map['cPhone'].isuse">
			    <div class="text">手机号码</div>
			    <span class="spec" v-if="map['cPhone'].isallowempty">*</span>
			    <input type="text" class="input" placeholder="请输入" v-model="cPhone">
			</div>
			<div class="item" v-if="map['cIntentionLevel']&&map['cIntentionLevel'].isuse">
			    <div class="text">意向级别</div>
			    <span class="spec" v-if="map['cIntentionLevel'].isallowempty">*</span>
			    <div class="spec-mid">
			        <span v-for="(i, num) in 5" @click="selectLevel(i)" :class="{active:i<=cIntentionLevel}">
			            <svg aria-hidden="true" class="icon" >
			                <use xlink:href="#icon-wuxing"></use>
			            </svg>
			        </span>
			    </div>
			</div>
			<div class="item" @click="openCommAction('statusList')" v-if="map['cCustomStatus']&&map['cCustomStatus'].isuse">
			    <div class="text">客户状态</div>
			    <span class="spec" v-if="map['cCustomStatus'].isallowempty">*</span>
			    <div class="mid">{{cCustomStatus.describe}}</div>
			    <div class="right">
			        <svg aria-hidden="true" class="icon">
			            <use xlink:href="#icon-jiantou"></use>
			        </svg>
			    </div>
			</div>
			<div class="item" v-if="map['cSex']&&map['cSex'].isuse">
			    <div class="text">性别</div>
			    <span class="spec" v-if="map['cSex'].isallowempty">*</span>
			    <div class="mid"></div>
			    <div class="right-sex">
			        <div class="sex" @click="cSex=1">
			            <svg aria-hidden="true" class="icon">
			                <use :xlink:href="cSex==1?'#icon-nanxuanzhong':'#icon-nan'"></use>
			            </svg>
			        </div>
			        <div class="sex" @click="cSex=2">
			            <svg aria-hidden="true" class="icon">
			                <use :xlink:href="cSex==2?'#icon-nvxuanzhong':'#icon-nv'"></use>
			            </svg>
			        </div>
			    </div>
			</div>
			<div class="item" @click="selectBirthDay" v-if="map['cBrithday']&&map['cBrithday'].isuse">
			    <div class="text">出生日期</div>
			    <span class="spec" v-if="map['cBrithday'].isallowempty">*</span>
			    <div class="mid">{{cBrithday}}</div>
			    <div class="right">
			        <svg aria-hidden="true" class="icon">
			            <use xlink:href="#icon-jiantou"></use>
			        </svg>
			    </div>
			</div>
			<div class="item" v-if="map['cIdCard']&&map['cIdCard'].isuse">
			    <div class="text">身份证号码</div>
			    <span class="spec" v-if="map['cIdCard'].isallowempty">*</span>
			    <input type="text" class="input" placeholder="请输入" v-model="cIdCard">
			</div>
			<div class="item" v-if="map['cQQ']&&map['cQQ'].isuse">
			    <div class="text">QQ号码</div>
			    <span class="spec" v-if="map['cQQ'].isallowempty">*</span>
			    <input type="text" class="input" placeholder="请输入" v-model="cQQ">
			</div>
			<div class="item" @click="openCommAction('schoolList')" v-if="map['cShool']&&map['cShool'].isuse">
			    <div class="text">公立学校</div>
			    <span class="spec" v-if="map['cShool'].isallowempty">*</span>
			    <div class="mid">{{cShool.describe}}</div>
			    <div class="right">
			        <svg aria-hidden="true" class="icon">
			            <use xlink:href="#icon-jiantou"></use>
			        </svg>
			    </div>
			</div>
			<div class="item" @click="openCommAction('gradeList')" v-if="map['cGrade']&&map['cGrade'].isuse">
			    <div class="text">年级</div>
			    <span class="spec" v-if="map['cGrade'].isallowempty">*</span>
			    <div class="mid">{{cGrade.describe}}</div>
			    <div class="right">
			        <svg aria-hidden="true" class="icon">
			            <use xlink:href="#icon-jiantou"></use>
			        </svg>
			    </div>
			</div>
			<div class="item" v-if="map['cClass']&&map['cClass'].isuse">
			    <div class="text">班级</div>
			    <span class="spec" v-if="map['cClass'].isallowempty">*</span>
			    <input type="text" class="input" placeholder="请输入" v-model="cClass">
			</div>
			<div class="item" v-if="map['cEnglishName']&&map['cEnglishName'].isuse">
			    <div class="text">英文姓名</div>
			    <span class="spec" v-if="map['cEnglishName'].isallowempty">*</span>
			    <input type="text" class="input" placeholder="请输入" v-model="cEnglishName">
			</div>
			<div class="item" @click="relatedWx" v-if="false">
			    <!-- <div class="text">关联微信号</div>
			    <span class="spec" v-if="map['cWebchat'].isallowempty">*</span>
			    <input type="text" class="input" placeholder="请输入" v-model="cWebchat"> -->

			    <div class="text">关联微信号</div>
			    <span class="spec" v-if="map['cWebchat'].isallowempty">*</span>
			    <div class="mid">{{wxText}}</div>
			    <div class="right">
			        <svg aria-hidden="true" class="icon">
			            <use xlink:href="#icon-jiantou"></use>
			        </svg>
			    </div>
			</div>

			<div class="item" v-if="map['cFatherPhone']&&map['cFatherPhone'].isuse">
               <div class="text">父亲电话</div>
               <span class="spec" v-if="map['cFatherPhone'].isallowempty">*</span>
               <input type="text" class="input" placeholder="请输入" v-model="cFatherPhone">
           </div>
			<div class="item" v-if="map['cfathername']&&map['cfathername'].isuse">
			    <div class="text">父亲姓名</div>
			    <span class="spec" v-if="map['cfathername'].isallowempty">*</span>
			    <input type="text" class="input" placeholder="请输入" v-model="cfathername">
			</div>
			<div class="item" v-if="map['cFatherwork']&&map['cFatherwork'].isuse">
			    <div class="text">父亲职业</div>
			    <span class="spec" v-if="map['cFatherwork'].isallowempty">*</span>
			    <input type="text" class="input" placeholder="请输入" v-model="cFatherwork">
			</div>

			<div class="item" v-if="map['cMotherPhone']&&map['cMotherPhone'].isuse">
                <div class="text">母亲电话</div>
                <span class="spec" v-if="map['cMotherPhone'].isallowempty">*</span>
                <input type="text" class="input" placeholder="请输入" v-model="cMotherPhone">
            </div>
			<div class="item" v-if="map['cmothername']&&map['cmothername'].isuse">
			    <div class="text">母亲姓名</div>
			    <span class="spec" v-if="map['cmothername'].isallowempty">*</span>
			    <input type="text" class="input" placeholder="请输入" v-model="cmothername">
			</div>
			<div class="item" v-if="map['cMotherwork']&&map['cMotherwork'].isuse">
			    <div class="text">母亲职业</div>
			    <span class="spec" v-if="map['cMotherwork'].isallowempty">*</span>
			    <input type="text" class="input" placeholder="请输入" v-model="cMotherwork">
			</div>

			<div class="item" v-if="map['cHomeTel']&&map['cHomeTel'].isuse">
			    <div class="text">家庭电话</div>
			   <span class="spec" v-if="map['cHomeTel'].isallowempty">*</span>
			   <input type="text" class="input" placeholder="请输入" v-model="cHomeTel">
   			</div>
   			<div class="item" v-if="map['cHomeAddress']&&map['cHomeAddress'].isuse">
   			    <div class="text">家庭住址</div>
   			    <span class="spec" v-if="map['cHomeAddress'].isallowempty">*</span>
   			    <input type="text" class="input" placeholder="请输入" v-model="cHomeAddress">
   			</div>

   			<!-- <div class="remark">
   						   	<textarea placeholder="备注：" 
   						       class="remark-text" 
   						       v-model="descText"
   						       @touchstart="app.area.start($event)"
   						       @touchmove="app.area.move($event)"
   						       @touchend="app.area.end($event)">
   						   	</textarea>
   			</div> -->
			<div class="void"></div>
		</scroller-base>
		<div class="bottom">
			<div class="content" @click="submit">确定</div>
		</div>

		<!-- 选择校区、学校、班级、年级 -->
        <comm-action :opened.sync="showCommAction" ref="commAction"></comm-action>
	</div>
</template>

<script>
	import {getQrcodeInfoById, addQrcodeInfo, getDictListByType} from 'share/api/yy.js'
	import CommAction from './child/commAction.vue'
	import logo from './img/share.png'

	export default {
		mixins: [app.mixin.shareMixin],
		data() {
			return {
				wxTitle: '填写资料',
				
				//关联微信
				map: {},
				showLoading: false,
				
				showCommAction: false,

				
				actionList: [],//根据点击不同获取的动态数组

				statusList: [],
				// cCustomStatus: {},
				cCustomStatus: '',
				
				gradeList: [],
				cGrade: '',
				
				schoolList: [],
				cShool: '',
				
				campus: '',
				source: '',
				liablepersons: '',
				
				 

				//表单字段
				cName: '',
				cPhone: '',
				cIdCard: '',
				cQQ: '',
				cEnglishName: '',
				cClass: '',

				cFatherPhone: '',
				cfathername: '',
				cFatherwork: '',

				cMotherPhone: '',
				cmothername: '',
				cMotherwork: '',

				cHomeAddress: '',
				cHomeTel: '',
				cSex: 0,
				cIntentionLevel: 0, //意向级别
				cBrithday: '',
				// cWebchat: '',

				list: [],
				cusId: ''
			}
		},
		computed: {
			/*wxText() {
			    return this.cWebchat ? '已关联' : ''
			}*/
		},
		methods: {
			/*relatedWx() {
                wx.invoke('selectExternalContact', {
                    "filterType": 0, //0表示展示全部外部联系人列表，1表示仅展示未曾选择过的外部联系人
                }, (res) => {
                    if (res.err_msg == "selectExternalContact:ok") {
                        // userIds  = res.userIds ; //返回此次选择的外部联系人userId列表，数组类型
                        if (res.userIds.length > 1) {
                            app.toast('info', '只能关联一个外部联系人')
                            this.cWebchat = ''
                            return
                        }
                        this.cWebchat = res.userIds[0]
                    } else {
                        //错误处理
                    }
                });
            },*/
			getAbsoluteUrl(url) {
			    var img = document.createElement("img")
			    img.src = url
			    return img.src;
			},
			selectLevel(i) {
			    if (this.cIntentionLevel == 1 && i == 1) {
			        this.cIntentionLevel = 0
			    } else {
			        this.cIntentionLevel = i
			    }
			},
			selectBirthDay() {
                app.datetimePicker({format:'YYYY-MM-DD', minYear: 1985}).then(res => {
                    // console.log(res)
                    this.cBrithday = res
                })
            },
			openCommAction(str) {
			    if (!str) return
			    this.showCommAction = true
			    let title = ''
			    switch(str) {
			        case 'statusList': 
			            title = '客户状态'
			            break
			        case 'gradeList':
			            title = '选择年级'
			            break
			        case 'schoolList':
			            title = '选择公立学校'
			            break
			    }
			    this.actionList = this[str]
			    
			    this.$refs.commAction.show({
			        title: title,
			        list: this.actionList
			    }).then(res => {
			        res && this[str].forEach(obj => {
			            if (obj.id === res.id) {
			                obj.isSelect = true
			            } else {
			                obj.isSelect = false
			            }
			        })
			        switch(str) {
			            case 'statusList': 
			                this.cCustomStatus = res
			                break
			            case 'gradeList':
			                this.cGrade = res
			                break
			            case 'schoolList':
			                this.cShool = res
			                break
			        }
			    })
			    
			},
			bindIsSelect(list, selectObj) {
			    list.forEach(obj => {
			        // obj.describe ? '' : obj.describe = obj.name
			        obj.describe = obj.value
			        if (this.optype === 2 && obj.id === selectObj.id) {
			            this.$set(obj, 'isSelect', true)    
			        } else {
			            this.$set(obj, 'isSelect', false)
			        }
			    })
			},
			getData() {
				getQrcodeInfoById({
					companyid: this.$route.query.companyid,
					id: this.$route.query.id
				}).then(res => {
					if (res.result.code === app.errok) {
						this.list = res.data.configforminfo.filter(obj => {
							return obj.field !== 'cCampusID' && obj.field !== 'cCustomerManagerID' && obj.field !== 'cNotCustomerManager'
						})
						this.list.forEach(obj => {
							this.map[obj.field] = obj
						})
						this.campus = res.data.systemsetting.campus
						this.liablepersons = res.data.systemsetting.liablepersons
						this.source = res.data.systemsetting.source
						this.showLoading = true
						this.cusId = res.data.configqrcodeinfo.customermanagerid
					}
				})
				getDictListByType({type: 'CustomerStatus',companyid: this.$route.query.companyid}).then(res => {
				    if (res.result.code === app.errok) {
				        this.statusList = res.data
				        this.bindIsSelect(this.statusList, this.cCustomStatus)
				    }
				})
				getDictListByType({type: 'PublishSchool',companyid: this.$route.query.companyid}).then(res => {
				    if (res.result.code === app.errok) {
				        this.schoolList = res.data
				        this.bindIsSelect(this.schoolList, this.cShool)
				    }
				})
				getDictListByType({type: 'Grade',companyid: this.$route.query.companyid}).then(res => {
                    if (res.result.code === app.errok) {
                        this.gradeList = res.data
                        this.bindIsSelect(this.gradeList, this.cGrade)
                    }
                })
			},
			submit() {
				let regExpPhoneNum=/^1\d{10}$/,
                    regExpNum=/^-?\d+\.?\d*$/,
                    regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
                    today = new Date(),
                    year = today.getFullYear(),
                    mouth = today.getMonth() + 1 > 9 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1),
                    day = today.getDate() > 9 ? today.getDate() : '0' + today.getDate(),
                    str = `${year}-${mouth}-${day}`
              	
				let len = this.list.length, i = 0
				for(i; i< len; i++) {
					let str = this.list[i].field
					if (this.list[i].isallowempty && !this[str]) {
						app.toast('info', `${this.list[i].fieldname}是必填项，请填写`)
						return
					}
				}

                if (this.cPhone&&!regExpPhoneNum.test(this.cPhone)) {
                    app.toast('info', '请输入正确的的手机号码')
                    return
                }
                if (this.cBrithday > str) {
                    app.toast('info', '出生日期不能大于今日')
                    return
                }
                if (this.cQQ && !regExpNum.test(this.cQQ)) {
                    app.toast('info', '请输入正确的QQ号码')
                    return
                }
                if (this.cIdCard && !regIdCard.test(this.cIdCard)) {
                    app.toast('info', '请输入正确的身份证号码')
                    return
                }
				let params = {
				    optype: 1,
				    id: '',
				    userid: this.cusId,
				    companyid: app.tool.parseQuery(location.href).companyid,
				     
				    campus: this.campus,
				    source:this.source,
				    liablepersons: this.liablepersons,
				    status: this.cCustomStatus.id,
				    grade: {
				    	id: this.cGrade.id,
				    	describe: this.cGrade.describe
				    },
				    publicschool: {
				        id: this.cShool.id,
				        name: this.cShool.describe
				    },
				    name: this.cName,
				    mobile: this.cPhone,
				    intentionallevel: this.cIntentionLevel,
				    wxuserid: '',
				    wxusername:'',
				    sex: this.cSex,
				    birthday: this.cBrithday,
				    identification: this.cIdCard,
				    qq: this.cQQ,
				    classname: this.cClass,

				    fathername: this.cfathername,
				    fathermobile: this.cFatherPhone,
				    fatherjob: this.cFatherwork,
				    
				    mothername: this.cmothername,
				    motherjob: this.cMotherwork,
				    mothermobile: this.cMotherPhone,
					
					familyaddress: this.cHomeAddress,
				    familymobile: this.cHomeTel,

					englishname: this.cEnglishName,
				    desc: this.descText
				}
				addQrcodeInfo(params).then(res => {
					if (res.result.code == 200) {
						app.toast('info', '提交成功')
						setTimeout(() => {
							location.reload()
						}, 1000)
					} else {
						app.toast('info', res.result.msg)
					}
				})
			}
		},
		created() {
			window.a = this
			this.getData()
		},
		mounted() {
			this.v_shareResolve({
			    title: '快速报名', // 分享标题
			    desc: location.href, // 分享描述
			    link: location.href, // 分享链接
			    imgUrl: this.getAbsoluteUrl(logo) // 分享封面
			})
        },
		components: {
			CommAction
		}
	}
</script>