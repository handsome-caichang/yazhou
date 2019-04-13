<style lang="scss" scoped>
	.register {
        input[type=number], input[type=password], input[type=search], input[type=tel], input[type=text], textarea{
            margin: 0;
            padding: 0;
        }

		background-color: $color-assist-3;
		.title {
			height: 77px;
			color: $color-primary;
			box-shadow: 0 0.5px 1px 0 rgba(0, 0, 0, 0.09);
			background-color: $color-white;
			@include flex-center(row);
			svg {
				font-size: 60px;
			}
		}
		.form {
			margin: 20px 15px 0 15px;
			padding: 20px 18px $h-4 18px;
			box-shadow: 0 0 2px 0 rgba(0, 38, 78, 0.20);
			background-color: $color-white;
			.form-item {
				position: relative;
				border-radius: 4px;
				margin-bottom: 16px;
                padding-left: 12px;
				background-color: $color-assist-3;
				@include flex-center(row);
				font-size: 15px;
				&.select{
					@include flex-between;
				}
                .necessary{
                    font-size: 12px;
                    transform: scale(0.6);
                    color: #FF735C;
                    margin-right: 4px;
                }
				.form-item-bd {
					position: relative;
					flex: 1;

					.input {
						color: $color-3-s;
						font-size: 15px;
						height:40px;
						background-color: $color-assist-3 !important;
					}
					::-webkit-input-placeholder {
						color: $color-9;
						font-size: 15px;
					}
					&.select{
						height:40px;
						line-height:40px;
						color: $color-9;
					    &.active{
					    	color: $color-3-s;
					    }
					}
                    &.single{
                        @include ellipsis-single;
                    }
				}
				.form-item-ft {
					height: 24px;
					line-height: 24px;
					padding: 0 20px;
					@include border-left($color-9);
				}
				.sel{
				    padding-right: 10px;
					font-size: 9px;
					color: $color-3-s;
				}
			}
			.form-code {
				@include flex-center;
				.form-code-bd {
					flex: 1;
				}
				.form-code-ft {
					height:40px;
					line-height:40px;
					margin-bottom: 16px;
					width: 122px;
					padding-left: 15px;
					text-align: center;
					&.pic{
						margin-left: 10px;
						padding-left: 0;
						width: 80px;
						background-size: 100% 100%;
					}
					&.desc{
						padding-left: 10px;
						width: 60px;
						color: $color-assist-2;
					}
					.form-code-ft-btn {
						border-radius: 4px;
						color: $color-white;
						background-color: $color-primary;
						&.forbid{
							background-color: #B2B2B2;
						}
					}
				}
			}
            .form-logo{
                padding: 10px  32px 30px 32px;
                text-align: center;
                img{
                    max-width: 180px;
                    max-height: 75px;
                }
            }
			.form-sex {
				margin: 3px 0 19px 0;
				.form-sex-title{
					padding: 0 40px 0 15px;
				}
                .necessary{
                    font-size: 12px;
                    transform: scale(0.6);
                    color: #FF735C;
                    margin-left: 12px;
                }
				.sex{
					font-size: 15px;
					&.checked{
						color: $color-primary;
					}
				}
			}
            .form-address{
                margin-bottom: 16px;
                display: flex;
                background-color: #F5F5F5;
                .icon{
                    font-size: 12px;
                    transform: scale(0.6);
                    color: #FF735C;
                    margin-left: 12px;
                    margin-top: 10px;
                }
                .form-item-bd{
                    flex: 1;
                    .form-textarea{
                        font-family: PingFang SC,STHeitiSC-Light,Helvetica-Light,arial,sans-serif;
                        border: 1px solid #F5F5F5;
                        font-size: 15px;
                        padding: 5px 12px;
                        height: 90px;
                        box-shadow: none;
                        margin: 0px;
                        resize: none;
                        margin-top: 3px;
                        color: #474747;
                        border-radius: 4px;
                        background-color: #F5F5F5;
                    }
                    ::-webkit-input-placeholder {
                        color: $color-9;
                        font-size: 15px;
                    }
                }
            }
            .form-public-school{
                @include flex-between;
                font-size: 15px;
                position: relative;
                border-radius: 4px;
                margin-bottom: 16px;
                padding-left: 12px;
                background-color: $color-assist-3;
                color: #474747;
                .form-item-bd{
                    height: 40px;
                    line-height: 40px;
                    flex: 1;
                    color: $color-9;
                    &.single{
                        @include ellipsis-single;
                        .single{
                            @include ellipsis-single;
                        }
                    }
                    &.select{
                        &.active{
                            color: $color-3-s;
                        }
                    }
                    .input{
                        color: $color-3-s;
                        font-size: 15px;
                        height:40px;
                        background-color: $color-assist-3 !important;
                    }
                    ::-webkit-input-placeholder {
                        color: $color-9;
                        font-size: 15px;
                    }
                }
                .necessary{
                    font-size: 12px;
                    transform: scale(0.6);
                    color: #FF735C;
                    margin-right: 4px;
                }
                .form-item-rt{
                    height: 24px;
                    line-height: 24px;
                    padding-left:30px;
                    padding-right:10px;
                    position: relative;
                    &.can-in:before{
                        display: block;
                        position: absolute;
                        left: 0;
                        top: 0;
                        bottom: 0;
                        height: 100%;
                        border-left: 1px solid #999;
                        content: ''
                    }
                    .sel{
                        /*padding-right: 10px;*/
                        font-size: 9px;
                        color: #474747;
                    }
                }

            }
            .form-intention{
                height: 40px;
                line-height: 40px;
                border-radius: 4px;
                margin-bottom: 16px;
                padding-left: 12px;
                background-color: #F5F5F5;
                color: $color-9;
                font-size: 15px;
                @include flex-between;
                .necessary{
                    font-size: 12px;
                    transform: scale(0.6);
                    color: #FF735C;
                    margin-right: 4px;
                }
                .form-item-bd{
                    flex: 1;
                    @include flex-between;
                    .icon{
                        font-size: 18px;
                        margin-left: 5px;
                        margin-right: 10px;
                        color: #DDDDDD;
                        &.active{
                            color: #ff8369;
                        }
                    }
                }
            }
			.form-item-title {
				font-size: 15px;
				color: $color-primary;
				margin-bottom: 20px;
			}
			.form-item-tips{
				font-size: 15px;
				color: $color-9;
				margin-bottom: 20px;
				.content{
					font-size: $fs-big;
					color: $color-3-s;
				}
			}
		}
		.void {
			height: 94px;
		}
	}

    .footer{
        padding: 15px 33px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        .form-btn {
            height: 44px;
            line-height: 44px;
            border-radius: 44px;
            text-align: center;
            font-size: 16px;
            box-shadow:0px 2px 16px 0px #759fff;
            &.primary{
                color: $color-white;
                background-color: $color-primary;
            }
            &.back{
                background-color: $color-white;
                margin-top: 20px;
                color: $color-9;
                border: 1px solid #ccc;
            }
        }
    }

	.scroller {
		@include position-absolute(0,0,0,0);
		overflow: hidden;
	}
	
	.as-school,.as-grade {
        @include position-absolute;
        z-index: 2;
    }
</style>

<template>
	<div class="register">
		<scroller-base ref="scroller" class="scroller" :data="renderData">
			<div>
                <!--姓名、手机号、报名校区-->
				<div class="form">
                    <!--logo-->
                    <div class="form-logo" v-if="user.LogoPath!=''">
                        <img :src="user.LogoPath">
                    </div>

                    <!--姓名-->
                    <div class="form-item" v-if="listObj['Name']">
                        <div class="necessary" v-if="listObj['Name'].Required==1">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-bitianxing"></use>
                            </svg>
                        </div>
                        <div class="form-item-bd">
                            <input class="input" type="text" placeholder="学员姓名" v-model="user.Name" @blur="setName"/>
                        </div>
                    </div>

                    <!--性别-->
                    <div class="form-sex"  v-if="listObj['Sex']">
                        <svg aria-hidden="true" class="icon necessary" v-if="listObj['Sex'].Required==1">
                            <use xlink:href="#icon-bitianxing"></use>
                        </svg>
                        <label class="form-sex-title">性别</label>
                        <span @click="chooseSex(1)">男
							<svg class="icon sex" aria-hidden="true" :class="{checked:(user.Sex==1)}">
								<use :xlink:href="(user.Sex!=1)?'#icon-danxuanweixuanzhong1':'#icon-danxuanxuanzhong1'"></use>
							</svg>
						</span>&emsp;
                        <span @click="chooseSex(2)">女
							<svg class="icon sex" aria-hidden="true" :class="{checked:(user.Sex==2)}">
								<use :xlink:href="(user.Sex==1)?'#icon-danxuanweixuanzhong1':'#icon-danxuanxuanzhong1'"></use>
							</svg>
						</span>
                    </div>

                    <!--出生日期 公历生日-->
                    <div class="form-item select"  v-if="listObj['Birthday']">
                        <div class="necessary" v-if="listObj['Birthday'].Required==1">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-bitianxing"></use>
                            </svg>
                        </div>
                        <div class="form-item-bd select" :class="{active:user.Birthday!='公历生日'}" @click="selectBirthDay">
                            <div>{{user.Birthday}}</div>
                        </div>
                        <svg class="icon sel" aria-hidden="true">
                            <use xlink:href="#icon-xiala"></use>
                        </svg>
                    </div>

                    <!--身份证号-->
					<div class="form-item"  v-if="listObj['IDNumber']">
                        <div class="necessary" v-if="listObj['IDNumber'].Required==1">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-bitianxing"></use>
                            </svg>
                        </div>
						<div class="form-item-bd">
							<input class="input" type="text" placeholder="身份证号" v-model="user.IDNumber" maxlength="18"/>
						</div>
					</div>

                    <!--手机号-->
                    <div class="form-item"  v-if="listObj['SMSTel']">
                        <div class="necessary" v-if="listObj['SMSTel'].Required==1">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-bitianxing"></use>
                            </svg>
                        </div>
                        <div class="form-item-bd">
                            <input class="input" type="tel" placeholder="手机号" v-model.number="user.SMSTel" maxlength="11" @blur="setName"/>
                        </div>
                    </div>

                    <!--家庭住址-->
                    <div class="form-address"  v-if="listObj['LivePlace']">
                        <div class="necessary" v-if="listObj['LivePlace'].Required==1">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-bitianxing"></use>
                            </svg>
                        </div>
                        <div class="form-item-bd">
                            <textarea
                                    v-model="user.LivePlace"
                                    placeholder="家庭住址"
                                    class="form-textarea"
                                    maxlength="100"
                                    @touchstart="app.area.start($event)"
                                    @touchmove="app.area.move($event)"
                                    @touchend="app.area.end($event)">
                            </textarea>
                        </div>
                    </div>

                    <!--英文名-->
                    <div class="form-item"  v-if="listObj['EnglishName']">
                        <div class="necessary" v-if="listObj['EnglishName'].Required==1">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-bitianxing"></use>
                            </svg>
                        </div>
                        <div class="form-item-bd">
                            <input class="input" type="text" placeholder="英文名" v-model="user.EnglishName"/>
                        </div>
                    </div>

                    <!--就读学校-->
                    <div class="form-public-school"  v-if="listObj['FullTimeSchool']">
                        <div class="necessary" v-if="listObj['FullTimeSchool'].Required==1">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-bitianxing"></use>
                            </svg>
                        </div>
                        <div class="form-item-bd select single" :class="{active:user.FullTimeSchool!='就读学校'}">
                            <input class="input" type="text" placeholder="就读学校" v-model="user.FullTimeSchool"  v-if="initData.AllowInputSchool == 1" />
                            <div class="single" @click="openCampusActionsheet(1)" v-else>{{user.FullTimeSchool}}</div>
                        </div>
                        <div class="form-item-rt" :class="{'can-in':initData.AllowInputSchool==1}" @click="openCampusActionsheet(1)">
                            <svg  class="icon sel" aria-hidden="true">
                                <use xlink:href="#icon-xiala"></use>
                            </svg>
                        </div>

                    </div>

                    <!--年级-->
                    <div class="form-item select"  v-if="listObj['Grade']">
                        <div class="necessary" v-if="listObj['Grade'].Required==1">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-bitianxing"></use>
                            </svg>
                        </div>
                        <div class="form-item-bd select" :class="{active:user.Grade!='年级'}" @click="selectGrade">
                            <div>{{user.Grade}}</div>
                        </div>
                        <svg class="icon sel" aria-hidden="true">
                            <use xlink:href="#icon-xiala"></use>
                        </svg>
                    </div>

                    <!--班级-->
                    <div class="form-item"  v-if="listObj['ClassName']">
                        <div class="necessary" v-if="listObj['ClassName'].Required==1">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-bitianxing"></use>
                            </svg>
                        </div>
                        <div class="form-item-bd">
                            <input class="input" type="text" placeholder="班级" v-model="user.ClassName"/>
                        </div>
                    </div>

                    <!--报名校区-->
					<div class="form-item select"  v-if="listObj['CampusID']">
                        <div class="necessary" v-if="listObj['CampusID'].Required==1">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-bitianxing"></use>
                            </svg>
                        </div>
						<div class="form-item-bd single select" :class="{active:user.SelectCampusId!=''}" @click="openCampusActionsheet(0)">{{user.CampusName}}</div>
						<svg class="icon sel" aria-hidden="true">
							<use xlink:href="#icon-xiala"></use>
						</svg>
					</div>

                    <!--意向级别-->
                    <div class="form-intention"  v-if="listObj['WillLevel']">
                        <div class="necessary" v-if="listObj['WillLevel'].Required==1">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-bitianxing"></use>
                            </svg>
                        </div>
                        <div class="form-item-bd">
                            <div class="describe">意向级别</div>
                            <div class="star">
                                <svg aria-hidden="true" class="icon" :class="{'active':user.WillLevel>=num}" v-for="num in 5" @click="selectInterstingLevel(num)">
                                    <use xlink:href="#icon-yixiang"></use>
                                </svg>
                            </div>

                        </div>
                    </div>

                    <!--父亲姓名-->
                    <div class="form-item"  v-if="listObj['Father']">
                        <div class="necessary" v-if="listObj['Father'].Required==1">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-bitianxing"></use>
                            </svg>
                        </div>
                        <div class="form-item-bd">
                            <input class="input" type="text" placeholder="父亲姓名" v-model="user.Father"/>
                        </div>
                    </div>

                    <!--父亲电话-->
                    <div class="form-item"  v-if="listObj['FatherTel']">
                        <div class="necessary" v-if="listObj['FatherTel'].Required==1">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-bitianxing"></use>
                            </svg>
                        </div>
                        <div class="form-item-bd">
                            <input class="input" type="tel" placeholder="父亲电话" v-model.number="user.FatherTel" maxlength="11"/>
                        </div>
                    </div>

                    <!--父亲职业-->
                    <div class="form-item"  v-if="listObj['FatherVocation']">
                        <div class="necessary" v-if="listObj['FatherVocation'].Required==1">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-bitianxing"></use>
                            </svg>
                        </div>
                        <div class="form-item-bd">
                            <input class="input" type="text" placeholder="父亲职业" v-model="user.FatherVocation"/>
                        </div>
                    </div>

                    <!--母亲姓名-->
                    <div class="form-item"  v-if="listObj['Mother']">
                        <div class="necessary" v-if="listObj['Mother'].Required==1">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-bitianxing"></use>
                            </svg>
                        </div>
                        <div class="form-item-bd">
                            <input class="input" type="text" placeholder="母亲姓名" v-model="user.Mother"/>
                        </div>
                    </div>

                    <!--母亲电话-->
                    <div class="form-item"  v-if="listObj['MotherTel']">
                        <div class="necessary" v-if="listObj['MotherTel'].Required==1">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-bitianxing"></use>
                            </svg>
                        </div>
                        <div class="form-item-bd">
                            <input class="input" type="tel" maxlength="11"  placeholder="母亲电话" v-model.number="user.MotherTel"/>
                        </div>
                    </div>

                    <!--母亲职业-->
                    <div class="form-item"  v-if="listObj['MotherVocation']">
                        <div class="necessary" v-if="listObj['MotherVocation'].Required==1">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-bitianxing"></use>
                            </svg>
                        </div>
                        <div class="form-item-bd">
                            <input class="input" type="text" placeholder="母亲职业" v-model="user.MotherVocation"/>
                        </div>
                    </div>

                    <!--QQ-->
                    <div class="form-item"  v-if="listObj['QQ']">
                        <div class="necessary" v-if="listObj['QQ'].Required==1">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-bitianxing"></use>
                            </svg>
                        </div>
                        <div class="form-item-bd">
                            <input class="input" type="tel" maxlength="20" placeholder="QQ" v-model="user.QQ"/>
                        </div>
                    </div>

                    <!--其他联系电话-->
                    <div class="form-item"  v-if="listObj['OtherTel']">
                        <div class="necessary" v-if="listObj['OtherTel'].Required==1">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-bitianxing"></use>
                            </svg>
                        </div>
                        <div class="form-item-bd">
                            <input class="input" type="tel" maxlength="11"  placeholder="其他联系电话" v-model.number="user.OtherTel"/>
                        </div>
                    </div>

                    <!--设置师生信账号 (必填必展示)-->
					<p class="form-item-title" v-if="isRegist">设置师生信账号</p>
					<div class="form-item" v-if="isRegist">
                        <div class="necessary">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-bitianxing"></use>
                            </svg>
                        </div>
						<div class="form-item-bd">
							<input class="input" type="text" placeholder="用户名" v-model="user.SsxName"/></div>
						<div class="form-item-ft">@{{initData.UserNameSuffix}}</div>
					</div>
					<!-- <div class="form-item">
                        <div class="necessary">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-bitianxing"></use>
                            </svg>
                        </div>
						<div class="form-item-bd">
							<input class="input" type="password" placeholder="请输入6位数以上的密码" v-model="user.Pwd"/>
						</div>
					</div>
					<div class="form-item">
                        <div class="necessary">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-bitianxing"></use>
                            </svg>
                        </div>
						<div class="form-item-bd">
							<input class="input" type="password" placeholder="请再次输入密码" v-model="user.RePwd"/>
						</div>
					</div> -->

				</div>
				<div class="void"></div>
			</div>
		</scroller-base>

        <div class="footer">
            <div class="form-btn primary" @click="regMoreSubmit">
                提&emsp;交
            </div>
        </div>

        <!--加载中-->
		<loading v-if='isLoading' :bgType="bgType"></loading>

        <!--报名校区 || 就读学校-->
		<actionsheet-school
			class="as-school"
			:opened.sync="openSelectSheet"
			:data="currentSelect == 0 ? initData.Campuslist : initData.SchoolList"
			:id="currentSelect == 0 ? user.SelectCampusId : user.fullTimeSchoolId" 
			@selected="selectAction"
			ref="actionSheetSelect"
			>
		</actionsheet-school>

        <!--年级-->
        <actionsheet-grade
            class="as-grade"
            :opened.sync="openGradeSheet"
            :data="initData.GradeList"
            @selected="gradeAction">

        </actionsheet-grade>
	</div>
</template>

<script>
	import actionsheetSchool from './children/actionsheet-school.vue';
	import ActionsheetGrade from './children/actionsheet-grade.vue';
	import loading from 'parentShare/components/common/loading/loading.vue';
	import { userRegister } from 'parentShare/api/share.js';
	export default {
		name: 'register',
		data() {
			return {
				wxTitle: '学员信息录入',
                refreshNum:0,
                isLoading: true,
                bgType: 0,//0不透明  1透明
                openGradeSheet: false, //是否打开年级下拉框
                openSelectSheet: false, //是否打开下拉选择框
                currentSelect: 0, // 当前下拉的是校区还是就读学校 0 校区，1 就读学校
                enableSelfImg: require('./children/no.png'), //暂未开启功能图标
                user: {
                    LogoPath:'',
                    Name:'',
                    EnglishName:'',
                    Sex:1, //性别，1-男，2-女
                    Birthday:'公历生日',
                    IDNumber:'',

                    SelectCampusId: '', //---  校区ID
                    CampusName:'报名校区',

                    SMSTel:'',
                    QQ:'',
                    OtherTel:'',
                    LivePlace:'',

                    FullTimeSchoolId:'',//---
                    FullTimeSchool:'',

                    Grade:'年级',
                    GradeKey:0,//---
                    ClassName:'',
                    Father:'',
                    FatherTel:'',
                    FatherVocation:'',
                    Mother:'',
                    MotherTel:'',
                    MotherVocation:'',
                    WillLevel:0,

                    SsxName: '', //师生信用户名
                    Pwd: '', //密码
                    // phone: '',
                    RePwd: '',
				},
                listObj:{

                },
				initData: {
					AllowInputSchool: 1, //  1 输入 ， 0 下拉
					DefaultUserNameRule: 0, // 0 根据姓名， 1 根据手机号码
					EnableSelfEntryStudentInformation: 0, // 0 不开启 1 开启
					UserNameSuffix: "",//账号后缀
					Campuslist: [
					],
					SchoolList: [
					],
                    GradeList:{}
                },
				companyId: '',//公司id
				campusId: '', //校区id
				openId: '',
                aredId:'',    //区域id
                teacherid:'',//老师id
                comeFrom:'',//来源  如果是xyx 则修改标题
                isRegist: false,
            }
		},
        computed: {
            renderData() {
                return {
                    listObj:this.listObj,
                    refreshNum: this.refreshNum
                }
            }
        },
		// components: [loading],
		methods: {
			setName() {
				if (this.initData.DefaultUserNameRule == 1) {
					this.user.SsxName = this.user.SMSTel;
				}else {
					this.user.SsxName = this.user.Name;
				}
			},
            //选择性别
			chooseSex(sex){
				this.user.Sex = sex;
			},
            //选择生日
			selectBirthDay() {
				app.datetimePicker({format: 'YYYY-MM-DD',minYear:1940}).then(res => {
					this.user.Birthday = res;
				})
			},
            //选择年级
            selectGrade(){
                this.openGradeSheet = !this.openGradeSheet;
            },
            gradeAction(obj){
			    this.user.Grade = obj.Name;
			    this.user.GradeKey = obj.Key;
            },
            //选择校区||学校
			openCampusActionsheet(currentSelect){ //选择校区
				this.currentSelect = currentSelect;
				this.openSelectSheet = true;
				this.$refs.actionSheetSelect.refreshScroll();
			},
			selectAction(item){	//选择校区为1，选择就读学校为2
				if (this.currentSelect == 0) {
					this.user.CampusName = item.Name;
					this.user.SelectCampusId = item.ID;
				}else {
					this.user.FullTimeSchool = item.Name;
					this.user.FullTimeSchoolId = item.ID;
				}
			},
            // 选择意向级别
            selectInterstingLevel(num){
                if(num==1&&this.user.WillLevel==1){
                    this.user.WillLevel=0;
                }else{
                    this.user.WillLevel = num;
                }
            },
			regMoreSubmit(){ //提交更多信息的表单
				if (this._moreValidate()) {
				    this.bgType =  1;
					this.isLoading = true;
					userRegister({
						pname: "register",
						data: JSON.stringify({
							UserName: this.user.Name,
							Sex: this.user.Sex,
							SelectCampusId: this.user.SelectCampusId,
							PublicCampusName: this.user.FullTimeSchool=='就读学校'?'':this.user.FullTimeSchool,
							SSXUserName: this.user.SsxName,
							Password: this.user.Pwd,
							Mobile: this.user.SMSTel,
							Birthday: this.user.Birthday=='公历生日'?'':this.user.Birthday,
							companyId: this.companyId,
							OpenId: this.openId,
                            Teacherid:this.teacherid,

                            EnglishName:this.user.EnglishName,
                            IDNumber:this.user.IDNumber,
                            QQ:this.user.QQ,
                            OtherTel:this.user.OtherTel,
                            LivePlace:this.user.LivePlace,

                            Grade:this.user.GradeKey,
                            ClassName:this.user.ClassName,
                            Father:this.user.Father,
                            FatherTel:this.user.FatherTel,
                            FatherVocation:this.user.FatherVocation,
                            Mother:this.user.Mother,
                            MotherTel:this.user.MotherTel,
                            MotherVocation:this.user.MotherVocation,
                            WillLevel:this.user.WillLevel,

						})
					}).then(res => {
						this.isLoading = false;
                        this.bgType =  0;
						if (res.errcode == 200 || res.errcode == 422) {
							if (res.data) {
								app.alert({
									title: '',
									type: "confirm",
									text: res.errmsg,
									btns: [
										{
											text: '关闭',
											style: {
											},
											action: false
										},
										{
											text: '去选课报名',
											style: {
												color: '#1E88F5'
											},
											action: true
										}
									]
								}).then(action => {
                                    if (action) {
                                        setTimeout(() => {
                                            location.href = res.data;
                                        }, 301)
                                    }else {
										WeixinJSBridge && WeixinJSBridge.call('closeWindow')
									}
								})
							}else {
								app.alert({
									title: '',
									text: res.errmsg,
								}).then(action => {
									WeixinJSBridge && WeixinJSBridge.call('closeWindow')
								})
							}
						}else if (res.errcode == 400) {
							app.alert({
								title: '',
								text: res.errmsg,
							})
						}else if (res.errcode == 421) {
                            app.toast('error', res.errmsg)
                            this.isRegist = true;
                            this.$nextTick(() => {
                                this.$refs.scroller.refresh();
                                this.$refs.scroller.scroller.scrollTo(0,  this.$refs.scroller.scroller.maxScrollY, 300);
                            })
                        }
					});
				}	
			},
			_moreValidate(){ //验证更多信息
                let regExpPhoneNum=/^1\d{10}$/;//电话号码
                
                let regExpIdNum=/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;//二代身份证号码为18位，18位前17位为数字，最后一位是校验位，可能为数字或字符

                if (this.listObj.Name&&this.listObj.Name.Required==1&&app.tool.trim(this.user.Name)=='') {
					app.toast('info','姓名不能为空');
					return;
				}
                this.user.Sex+="";//防止trim解析出错
                if (this.listObj.Sex&&this.listObj.Sex.Required==1&&app.tool.trim(this.user.Sex)=='') {
                    app.toast('info','性别不能为空');
                    return;
                }

                if (this.listObj.Birthday&&this.listObj.Birthday.Required==1&&app.tool.trim(this.user.Birthday)=='公历生日') {
                    app.toast('info','公历生日不能为空');
                    return;
                }

                if(this.listObj.IDNumber&&this.listObj.IDNumber.Required==1){
                    if(app.tool.trim(this.user.IDNumber)==''){
                        app.toast('info', '身份证号码不能为空');
                        return
                    }
                    if(!regExpIdNum.test(app.tool.trim(this.user.IDNumber))){
                        app.toast('info', '请填写正确的身份证号码');
                        return
                    }
                }else{
                    if(app.tool.trim(this.user.IDNumber)!=''){
                        if(!regExpIdNum.test(app.tool.trim(this.user.IDNumber))){
                            app.toast('info', '请填写正确的身份证号码');
                            return
                        }
                    }
                }

                this.user.SMSTel += "";//防止trim解析出错
                if(this.listObj.SMSTel&&this.listObj.SMSTel.Required==1){
                    if(app.tool.trim(this.user.SMSTel)==''){
                        app.toast('info', '手机号码不能为空')
                        return
                    }
                    if(!regExpPhoneNum.test(this.user.SMSTel)){
                        app.toast('info', '请填写正确的手机号码')
                        return
                    }
                }else{
                    if(app.tool.trim(this.user.SMSTel)!=''){
                        if(!regExpPhoneNum.test(this.user.SMSTel)){
                            app.toast('info', '请填写正确的手机号码')
                            return
                        }
                    }
                }

                if (this.listObj.LivePlace&&this.listObj.LivePlace.Required==1&&app.tool.trim(this.user.LivePlace)=='') {
                    app.toast('info','家庭住址不能为空');
                    return;
                }

                if (this.listObj.EnglishName&&this.listObj.EnglishName.Required==1&&app.tool.trim(this.user.EnglishName)=='') {
                    app.toast('info','英文名不能为空');
                    return;
                }


                if (this.listObj.FullTimeSchool&&this.listObj.FullTimeSchool.Required==1&&((app.tool.trim(this.user.FullTimeSchool)=='')||(this.user.FullTimeSchool=='就读学校'))) {
                    app.toast('info','就读学校不能为空');
                    return;
                }

                if (this.listObj.Grade&&this.listObj.Grade.Required==1&&this.user.GradeKey==0) {
                    app.toast('info','年级不能为空');
                    return;
                }

                if (this.listObj.ClassName&&this.listObj.ClassName.Required==1&&app.tool.trim(this.user.ClassName)=='') {
                    app.toast('info','班级不能为空');
                    return;
                }

                if (this.listObj.CampusID&&this.listObj.CampusID.Required==1&&((app.tool.trim(this.user.CampusName)=='')||this.user.CampusName=='报名校区')) {
                    app.toast('info','报名校区不能为空');
                    return;
                }

                if (this.listObj.WillLevel&&this.listObj.WillLevel.Required==1&&this.user.WillLevel<1) {
                    app.toast('info','请选择意向级别');
                    return;
                }

                if (this.listObj.Father&&this.listObj.Father.Required==1&&app.tool.trim(this.user.Father)=='') {
                    app.toast('info','父亲姓名不能为空。');
                    return;
                }

                this.user.FatherTel+="";//防止trim解析出错
                if(this.listObj.FatherTel&&this.listObj.FatherTel.Required==1){
                    if(app.tool.trim(this.user.FatherTel)==''){
                        app.toast('info', '父亲电话不能为空');
                        return
                    }
                    if(!regExpPhoneNum.test(app.tool.trim(this.user.FatherTel))){
                        app.toast('info', '请填写正确的父亲电话');
                        return
                    }
                }else{
                    if(app.tool.trim(this.user.FatherTel)!=''){
                        if(!regExpPhoneNum.test(app.tool.trim(this.user.FatherTel))){
                            app.toast('info', '请填写正确的父亲电话');
                            return
                        }
                    }
                }

                if (this.listObj.FatherVocation&&this.listObj.FatherVocation.Required==1&&app.tool.trim(this.user.FatherVocation)=='') {
                    app.toast('info','父亲职业不能为空');
                    return;
                }

                if (this.listObj.Mother&&this.listObj.Mother.Required==1&&app.tool.trim(this.user.Mother)=='') {
                    app.toast('info','母亲姓名不能为空');
                    return;
                }

                this.user.MotherTel+="";//防止trim解析出错
                if(this.listObj.MotherTel&&this.listObj.MotherTel.Required==1){
                    if(app.tool.trim(this.user.MotherTel)==''){
                        app.toast('info', '母亲电话不能为空');
                        return
                    }
                    if(!regExpPhoneNum.test(app.tool.trim(this.user.MotherTel))){
                        app.toast('info', '请填写正确的母亲电话');
                        return
                    }
                }else{
                    if(app.tool.trim(this.user.MotherTel)!=''){
                        if(!regExpPhoneNum.test(app.tool.trim(this.user.MotherTel))){
                            app.toast('info', '请填写正确的母亲电话');
                            return
                        }
                    }
                }

                if (this.listObj.MotherVocation&&this.listObj.MotherVocation.Required==1&&app.tool.trim(this.user.MotherVocation)=='') {
                    app.toast('info','母亲职业不能为空');
                    return;
                }

                this.user.QQ+="";//防止trim解析出错
                if (this.listObj.QQ&&this.listObj.QQ.Required==1&&app.tool.trim(this.user.QQ)=='') {
                    app.toast('info','QQ不能为空');
                    return;
                }

                this.user.OtherTel+="";//防止trim解析出错
                if(this.listObj.OtherTel&&this.listObj.OtherTel.Required==1){
                    if(app.tool.trim(this.user.OtherTel)==''){
                        app.toast('info', '其他联系电话不能为空');
                        return
                    }
                    if(!regExpPhoneNum.test(app.tool.trim(this.user.OtherTel))){
                        app.toast('info', '请填写正确的其他联系电话');
                        return
                    }
                }else{
                    if(app.tool.trim(this.user.OtherTel)!=''){
                        if(!regExpPhoneNum.test(app.tool.trim(this.user.OtherTel))){
                            app.toast('info', '请填写正确的其他联系电话');
                            return
                        }
                    }
                }

				if (!this.user.SsxName) {
					app.toast('info','用户名不能为空。');
					return;
				}
                // 需求变更 ： 1548 【WONE V9.3.1】通用需求-学员注册页面优化
				// if (!this.user.Pwd ) {
				// 	app.toast('info','密码不能为空');
				// 	return;
				// }
				// if (!this.user.RePwd) {
				// 	app.toast('info','再次输入密码不能为空');
				// 	return;
				// }
				// if ((this.user.Pwd.length<6) || (this.user.RePwd.length<6)){
				// 	app.toast('info', '密码不能少于6个字符');
				// 	return;
				// }
				// if ((this.user.Pwd.length>20) || (this.user.RePwd.length>20)){
				// 	app.toast('info', '密码不能多于20个字符');
				// 	return;
				// }
        		// if (this.user.Pwd != this.user.RePwd) {
        		// 	app.toast('info', '您输入的两次密码不相同，请重新输入。');
				// 	return;
        		// }
				return true;
			},
            loadAll() {
                // 1.获取配置项权限弹框列表 2.自定义表单数组
                let loadInitPageData = userRegister({
                    pname: "getinitpagedata",
                    companyId: this.companyId,
                    aredId: this.aredId,
                    Teacherid:this.teacherid
                }).then(res => {
                    return res
                }), loadFormData = userRegister({
                    pname: "getcustomerform",
                    companyId: this.companyId
                }).then(res => {
                    return res
                });

                Promise.all([loadInitPageData, loadFormData]).then(res => {
                    if (res[0].errcode == app.errok && res[1].errcode == app.errok) {
                        this.initPageData(res[0]);
                        this.initFormData(res[1]);
                    }
                    setTimeout(()=>{
                        this.isLoading = false;
                    });

                })
            },
            initPageData(res){
                this.initData = res.data;
                if (this.initData.EnableSelfEntryStudentInformation == 0) {
                    app.alert({
                        title: '',
                        html: `<div style="text-align: center;"><img src="${this.enableSelfImg}" style="width: 150px;margin-bottom: 10px;"><p>暂未开启此功能</p></div>`,
                        btn: {
                            text: '我知道了',
                            style: {
                                color: '#1E88F5'
                            },
                            action: true
                        }
                    }).then(action => {
                        WeixinJSBridge && WeixinJSBridge.call('closeWindow')
                    })
                }

                if(this.initData.AllowInputSchool==0){
                    this.user.FullTimeSchool = '就读学校';
                }
                // 默认校区展示
                this.user.SelectCampusId && this.initData.Campuslist.forEach((cam) => {
                    if (cam.ID == this.user.SelectCampusId) {
                        this.user.CampusName = cam.Name;
                    }
                });
                this.refreshNum++;
            },
            initFormData(res){
                this.user.LogoPath = res.data.LogoPath;//学校logo赋值 纯展示

                res.data.List.forEach(item=>{
                    this.listObj[item.Field] = item;
                });
            }
		},
		created(){

		    //初始化路由带来的参数
			this.companyId = this.$route.query.companyId  ? this.$route.query.companyId : "";
			this.openId = this.$route.query.openid  ? this.$route.query.openid : "";
			this.user.SelectCampusId = this.$route.query.campusId  ? this.$route.query.campusId : "";
			this.aredId = this.$route.query.areaId  ? this.$route.query.areaId : "";
			this.teacherid = this.$route.query.teacherid  ? this.$route.query.teacherid : '';

            this.comeFrom = this.$route.query.comeFrom ? this.$route.query.comeFrom:'';
            if(this.comeFrom == 'xyxShare'){
                this.wxTitle = '我要登记'
            }

			this.loadAll();

		},
		components: {
			actionsheetSchool,
            ActionsheetGrade,
                loading
		},
	}
</script>