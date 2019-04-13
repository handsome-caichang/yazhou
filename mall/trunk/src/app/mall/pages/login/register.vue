<!-- 注册页面 -->
<style lang="scss" scoped>
	.register {
		@include position-absolute;
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
			margin: 20px $edge-x 0 $edge-x;
			padding: 20px 18px $h-4 18px;
			box-shadow: 0 0 2px 0 rgba(0, 38, 78, 0.20);
			background-color: $color-white;
			.form-item {
				position: relative;
				border-radius: 4px;
				margin-bottom: 16px;
				background-color: $color-assist-3;
				@include flex-center(row);
				font-size: $fs-normal-x;
				&.select{
					@include flex-between;
				}
				.form-item-bd {
					position: relative;
					flex: 1;
					input {
						color: $color-3-s;
						font-size: $fs-normal-x;
						height: $h-3;
						background-color: $color-assist-3 !important;
					}
					::-webkit-input-placeholder {
						color: $color-9;
						font-size: $fs-normal-x;
					}
					&.select{
						height: $h-3;
						line-height: $h-3;
						color: $color-9;
					    padding: 0 $edge-x*2 0 $edge-x;
					    &.active{
					    	color: $color-3-s;
					    }
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
					height: $h-3;
					line-height: $h-3;
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
			.form-sex {
				margin: 3px 0 19px 0;
				.form-sex-title{
					padding: 0 40px 0 15px;
				}
				svg{
					font-size: $fs-normal-x;
					&.checked{
						color: $color-primary;
					}
				}
			}
			.form-btn {
				margin-top: 4px;
				height: $h-3;
				line-height: $h-3;
				text-align: center;
				font-size: $fs-normal-x;
				border-radius: $border-radius-normal;
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
			.form-item-title {
				font-size: $fs-normal-x;
				color: $color-primary;
				margin-bottom: 20px;
			}
			.form-item-tips{
				font-size: $fs-normal-x;
				color: $color-9;
				margin-bottom: 20px;
				.content{
					font-size: $fs-big;
					color: $color-3-s;
				}
			}
		}
		.void {
			height: 20px;
		}
	}
	
	.scroller {
		@include position-absolute;
		overflow: hidden;
	}
	
	.as-select {
        @include position-absolute;
        z-index: 2;
    }
</style>

<template>
	<div class="register">
		<scroller-base ref="scroller" class="scroller" :data="stepFlag">
			<div>
				<div class="title">
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-zhuce"></use>
					</svg>
				</div>
				<!-- 第一步 -->
				<div class="form" v-if="stepFlag == 0">
					<div class="form-item">
						<div class="form-item-bd">
							<input type="tel" placeholder="手机号" v-model="user.phone" @input="phoneInputEvent" maxlength="11"/>
						</div>
					</div>
					<div class="form-code">
						<div class="form-code-bd">
							<div class="form-item">
								<div class="form-item-bd">
									<input type="text" placeholder="图片验证码" v-model="user.picCode"/>
								</div>
							</div>
						</div>
						<div class="form-code-ft pic" :style="'background-image: url(api/register/GetValidationImage?'+timeStamp+')'" @click="changeRegImage"></div>
						<div class="form-code-ft desc" @click="changeRegImage">换一张</div>
					</div>
					<div class="form-btn primary" @click="regPhoneSubmit">下一步</div>
				</div>
				
				
				<!-- 第二步 -->
				<div class="form" v-if="stepFlag == 1">
					<div class="form-item-tips">您注册的手机号码为&nbsp;<span class="content">{{user.phone}}</span></div>
					<div class="form-code">
						<div class="form-code-bd">
							<div class="form-item">
								<div class="form-item-bd">
									<input type="tel" placeholder="验证码" v-model="user.smsCode"/>
								</div>
							</div>
						</div>
						<div class="form-code-ft">
							<div class="form-code-ft-btn" @click="sendMsgCode" :class="{forbid:sendMsg}">{{sendMsg?time+'s后重发':'获取验证码'}}</div>
						</div>
					</div>
					<div class="form-btn primary" @click="regCodeSubmit">下一步</div>
					<div class="form-btn back" @click="backRegPhone">返回</div>
				</div>
				
				
				<!-- 第三步 -->
				<div class="form"  v-if="stepFlag == 2">
					<div class="form-item">
						<div class="form-item-bd">
							<input type="text" placeholder="学员姓名" v-model="user.uname" @blur="checkCustomer"/>
						</div>
					</div>
					<div class="form-sex">
						<label class="form-sex-title">性别</label>
						<span @click="chooseSex(1)">男
							<svg class="icon" aria-hidden="true" :class="{checked:(user.sex==1)}">
								<use :xlink:href="(user.sex==1)?'#icon-danxuanxuanzhong1':'#icon-danxuanweizhong'"></use>
							</svg>
						</span>&emsp;
						<span @click="chooseSex(2)">女
							<svg class="icon" aria-hidden="true" :class="{checked:(user.sex==2)}">
								<use :xlink:href="(user.sex==2)?'#icon-danxuanxuanzhong1':'#icon-danxuanweizhong'"></use>
							</svg>
						</span>
					</div>
					<div class="form-item select" v-if="config.EnableBirthdayCondition===1 || source">
						<div class="form-item-bd select" :class="{active:user.birthday!='出生日期'}" @click="selectBirthDay">
							<div>{{user.birthday}}</div>
						</div>
						<svg class="icon sel" aria-hidden="true">
							<use xlink:href="#icon-xiala"></use>
						</svg>
					</div>
					<div class="form-item select">
						<div class="form-item-bd select" :class="{active:user.SelectCampusId}" @click="openCampusActionsheet"><div>{{user.campus}}</div></div>
						<svg class="icon sel" aria-hidden="true">
							<use xlink:href="#icon-xiala"></use>
						</svg>
					</div>
					<div class="form-item">
						<div class="form-item-bd">
							<input type="text" :placeholder="fullTimeSchoolText" v-model="user.fullTimeSchool"/>
						</div>
					</div>
					<div class="form-item" v-if="!source">
						<div class="form-item-bd select" :class="{active:user.gradeId!='00000000-0000-0000-0000-000000000000'}" @click="openGradeActionsheet">
							<div>{{user.grade}}</div>
						</div>
						<svg class="icon sel" aria-hidden="true">
							<use xlink:href="#icon-xiala"></use>
						</svg>
					</div>
					<p class="form-item-title" v-if="isRegist">设置师生信账号</p>
					<div class="form-item" v-if="isRegist">
						<div class="form-item-bd">
							<input type="text" placeholder="用户名" v-model="user.ssxName"/></div>
						<div class="form-item-ft">@{{companySuffix}}</div>
					</div>
					<!-- <div class="form-item">
						<div class="form-item-bd">
							<input type="password" placeholder="请输入6位数以上的密码" v-model="user.pwd"/>
						</div>
					</div>
					<div class="form-item">
						<div class="form-item-bd">
							<input type="password" placeholder="请重新输入密码" v-model="user.rePwd"/>
						</div>
					</div> -->
					<div class="form-btn primary" @click="regMoreSubmit">提&emsp;交</div>
				</div>

				<div class="void"></div>
			</div>
		</scroller-base>
		
		<loading v-if='isLoading' :bgType='1'></loading>
		
		<actionsheet-select
			class="as-select"
			:opened.sync="openSelectSheet"
			:flag="selectFlag" 
			:data="selectFlag==1?campuslist:gradeList"
			:id="selectFlag==1?user.SelectCampusId:user.gradeId" 
			@selected="selectAction"
			ref="actionSheetSelect"
			>
		</actionsheet-select>
		
		<actionsheet-user class="as-select" 
			:opened.sync="openUserSheet" 
			:data="userList" 
			@selected="selectUserAction" 
			@goStep="goStepAction">
		</actionsheet-user>
	</div>
</template>

<script>
	import actionsheetSelect from './children/actionsheet-select.vue';
	import actionsheetUser from './children/actionsheet-user.vue';
	import { mapState, mapMutations } from 'vuex';
	import { getRegImage,getGradeList,getCustomerUserInfo,sendsms,getUserByMobile,validateSMSCode,userRegister } from 'api/lc';
					
	export default {
		name: 'register',
		mixins: [app.mixin.shareMixin],
		data() {
			return {
				wxTitle: '手机商城',
				timeStamp: new Date().getTime(),
				stepFlag: 0, //注册的步骤
				sendMsg: false, //是否正在发送验证码
				openSelectSheet: false, //是否打开下拉选择框
				openUserSheet: false, //是否打开用户选择框
				isLoading: false,
				selectFlag: -1, //1为选择校区，2为选择年级
				time: 0, //倒计时时长
				userList: [], //注册时手机号码已绑定的用户
				gradeList: [], //年级列表
				timeout: null,
				user:{
					uname: '', //用户名
					smsCode: '', //短信验证码
					picCode: '', //图片验证码
					sex: 1, //性别，1-男，2-女
					campus: '报名校区', //校区
					SelectCampusId: '', //校区ID
					fullTimeSchool: '', //公立学校名
					ssxName: '', //师生信用户名
					pwd: '', //密码
					grade: '', //年级
					gradeId: '00000000-0000-0000-0000-000000000000', //年级ID
					phone: '',
					rePwd: '',
					CustomerID: "",
					birthday: '出生日期'
				},
				source: false, // true 代表微信扫码注册 地址栏加上 source = scan
				isRegist: false, // true 代表 已经点击注册了，并且是注册失败用户名一样的原因
			}
		},
		computed: {
			...Vuex.mapState([
				'config',//配置项SmsVerify：是否开启短信验证：1是（默认），0否
        		'campuslist',
				'companySuffix'
        	]),
        	fullTimeSchoolText() {
        		if (this.companySuffix === 'xiaogj.com') {
        			return "机构名称"
        		} else {
        			return this.source ? '公立学校' : '公立学校(选填)'
        		}
        		
        	}
		},
		methods: {
			...Vuex.mapMutations(['set_registerUser']),
			changeRegImage(){ //换一张
				this.timeStamp = new Date().getTime();
			},
			regPhoneSubmit(){ //第一步：验证手机号码是否已经注册
				if (this._phoneValidate()) {
					this.isLoading = true;
					getUserByMobile({
						Mobile: this.user.phone,
						ValidationCode: this.user.picCode
					}).then(res => {
						this.isLoading = false;
						if (res.ErrorCode == app.errok) {
							if (res.Data.ValidationResult) {
								this.userList = res.Data.Users;
								if (this.userList.length>0) { //存在绑定过的用户
									this.openUserSheet = true;
								}else{
									this.stepFlag = (this.config.SmsVerify==1) ? 1 : 2;
								}
							}else{
								app.toast('error', '图片验证码不正确。');
							}
						}else{
							app.toast('error', res.ErrorMsg);
						}
					});
				}
			},
			selectUserAction(user){ //选择了一个已经注册的用户登录
				// 如果选中的用户存在'SSXUserName'说明有登陆账号，可以直接去登陆;
				if (user.SSXUserName) {
					this.set_registerUser(user);
					if (app.mallApp.allPages['login']) {
						this.$router.back();
					} else {
						this.$router.replace('/login')
					}
				} else { // 如果不存在'SSXUserName'，说明是还只是意向客户，还没有师生信账号，进入下一步填写详细信息的注册界面;
					this.goStepAction();
					this.user.uname = user.FullName;
					this.user.sex = user.Sex || 1;
					this.user.fullTimeSchool = user.PublicCampusName;
					this.user.CustomerID = user.CustomerID;
					if (user.GradeID) {
						this.user.gradeId = user.GradeID;
						this.gradeList.forEach(item => {
							if (item.ID === user.GradeID) {
								this.user.grade = item.Name;
							}
						})
					}
					if (user.CampusId) {
						this.user.SelectCampusId = user.CampusId;
						this.campuslist.forEach(item => {
							if (item.ID === user.CampusId) {
								this.user.campus = item.Name;
							}
						})
					}

					if (this.config.DefaultUserNameRule === 1) {
						this.user.ssxName = this.user.phone;
					} else {
						this.user.ssxName = this.user.uname;
					}
				}
			},
			goStepAction(){ //选择继续注册
				this.stepFlag = (this.config.SmsVerify==1) ? 1:2;
			},
			sendMsgCode(){	//发送短信验证码
				if (!this.sendMsg) {
					sendsms({
						Mobile: this.user.phone,
						Tick: new Date().getTime(),
						ValidationCode: this.user.picCode
					}).then(res => {
						if (res.ErrorCode == app.errok) {
							document.addEventListener("visibilitychange", this._diffTime);
							clearTimeout(this._timeout);
							this.sendMsg = true;
							this.time = 60;
							this._beginReCheck(this.time);
						}else{
							app.toast('error', res.ErrorMsg);
						}
					});
				}
			},
			phoneInputEvent(){ //手机号码改变可重新发送短信验证码
				this._resetCode();
			},
			backRegPhone(){ //返回上一步
				this.stepFlag = 0;
				this._resetCode();
			},
			regCodeSubmit(){ //第二步：验证手机验证码是否正确
				if (!this.user.smsCode) {
					app.toast('info','验证码不能为空。');
					return;
				}
				this.isLoading = true;
				validateSMSCode({
					Mobile: this.user.phone,
					SMSCode: this.user.smsCode
				}).then(res => {
					this.isLoading = false;
					if (res.ErrorCode == app.errok) {
						if (res.Data) {
							this.stepFlag = 2;
						}else{
							app.toast('error', '验证码错误。');
						}
					}else{
						app.toast('error', res.ErrorMsg);
					}
				})
			},
			chooseSex(sex){ //选择性别
				this.user.sex = sex;
			},
			selectBirthDay() {
				app.datetimePicker().then(res => {
					this.user.birthday = res
				})
			},
			openCampusActionsheet(){ //选择校区
				this.openSelectSheet = true;
				this.selectFlag = 1;
				this.$refs.actionSheetSelect.refreshScroll();
			},
			openGradeActionsheet(){ //选择年级
				this.openSelectSheet = true;
				this.selectFlag = 2;
				this.$refs.actionSheetSelect.refreshScroll();
			},
			selectAction(arr){	//选择校区为1，选择年级为2
				if (arr[1] == 1) {
					this.user.campus = arr[0].Name;
					this.user.SelectCampusId = arr[0].ID;
				}else if(arr[1] == 2){
					this.user.grade = arr[0].Name;
					this.user.gradeId = arr[0].ID;				
				}
			},
			regMoreSubmit(){ //提交更多信息的表单	
				if (this._moreValidate()) {
					this.isLoading = true;
					userRegister({
						UserName: this.user.uname,
						SMSCode: (this.config.SmsVerify==1) ? this.user.smsCode : null,
						Sex: this.user.sex,
						SelectCampusId: this.user.SelectCampusId,
						PublicCampusName: this.user.fullTimeSchool,
						SSXUserName: this.user.ssxName,
						Password: this.user.pwd,
						GradeID: this.user.gradeId,
						Mobile: this.user.phone,
						CustomerID: this.user.CustomerID,
						Birthday: (this.config.EnableBirthdayCondition === 1 || this.source) ? this.user.birthday : ''
					}).then(res => {
						this.isLoading = false;
						if (res.ErrorCode == app.errok) {
							app.toast('success', '注册成功。');
							this.set_registerUser({
								SSXUserName: res.Data.UserName,
								SSXUserPwd: res.Data.Password
							})
							if (app.mallApp.allPages['login']) {
								this.$router.back();
							} else {
								this.$router.replace('/login')
							}
						}else if (res.ErrorCode == 421) {
							app.toast('error', res.ErrorMsg);
							this.isRegist = true;
						}else{
							app.toast('error', res.ErrorMsg);
						}
					});
				}	
			},
			checkCustomer(){ //根据手机号和姓名获取意向客户
				if (this.config.DefaultUserNameRule === 0) {
					this.user.ssxName = this.user.uname;
				}
				if ((this.config.RegistLimit==2)&&(this.user.uname)&&(this.user.phone)) {
					getCustomerUserInfo({
						Mobile: this.user.phone,
						Name: this.user.uname
					}).then(res => {
						if (res.ErrorCode == app.errok) {
							let data = res.Data;
							
							if (data) {
								this.user.sex = data.Sex;
								this.user.fullTimeSchool = data.FullTimeSchool;
								this.campuslist.forEach((cam) => {
									if (cam.ID == data.CampusID) {
										this.user.SelectCampusId = data.CampusID;
										this.user.campus = cam.Name;
									}
								});
								this.gradeList.forEach((gra) => {
									if (gra.ID == data.GradeID) {
										this.user.gradeId = data.GradeID;
										this.user.grade = gra.Name;
									}
								});
							}else{
								app.alert('该用户不满足自助注册条件，请联系学校。').then(res => {
									setTimeout(()=>{
										this.$router.replace({path:'/login'});
									},50);
								});
							}
						}else{
							app.toast('error', res.ErrorMsg);
						}
					});
				}
			},
			_phoneValidate(){ //验证手机号码
				if (!this.user.phone) {
					app.toast('info','手机号不能为空。');
					return;
				}else if(!app.telReg.test(this.user.phone)){
					app.toast('info','手机号码格式不正确，请重新输入。');
					return;
				}
				if (!this.user.picCode) {
					app.toast('info','图片验证码不能为空。');
					return;
				}
				return true;
			},
			_moreValidate(){ //验证更多信息
				if (!this.user.uname) {
					app.toast('info','姓名不能为空。');
					return;
				}
				if ( (this.config.EnableBirthdayCondition === 1 || this.source) && this.user.birthday === '出生日期') {
					app.toast('info','出生日期不能为空');
					return;
				}
				if (this.user.SelectCampusId == '00000000-0000-0000-0000-000000000000') {
					app.toast('info', '报名校区不能为空。');
					return;
				}
				if (this.companySuffix === 'xiaogj.com' && !this.user.fullTimeSchool) {
					app.toast('info', `${this.fullTimeSchoolText}不能为空。`)
					return;
				}
				if (!this.source && this.user.gradeId == '00000000-0000-0000-0000-000000000000') {
					app.toast('info',  `${this.user.grade}不能为空。`);
					return;
				}
				if (this.source && !this.user.fullTimeSchool) {
					app.toast('info','公立学校不能为空。');
					return;
				}
				// if (!this.user.ssxName) {
				// 	app.toast('info','用户名不能为空。');
				// 	return;
				// }
				// if ((this.user.pwd.length<6) || (this.user.rePwd.length<6)){
				// 	app.toast('info', '密码不能少于6个字符。');
				// 	return;
				// }
				// if ((this.user.pwd.length>20) || (this.user.rePwd.length>20)){
				// 	app.toast('info', '密码不能多于20个字符。');
				// 	return;
				// }
        		// if (this.user.pwd != this.user.rePwd) {
        		// 	app.toast('info', '您输入的两次密码不相同，请重新输入。');
				// 	return;
        		// }
				return true;
			},
			_beginReCheck(t){
				let $this = this;
				
				this.timeout = setTimeout(function () {
					if (t<=0) {
						$this._resetCode();
					}else{
						$this.time = t - 1;
						$this._beginReCheck($this.time);
					}
				},1000);
			},
			_diffTime(){ //计算页面可见/不可见的时间差
				let hideArr = [];
				if(document.hidden){ //页面不可见状态
			        this.hideArr[0] = new Date().getTime();
			    	clearTimeout(this.timeout);
			    }else{ //页面可见状态
			        this.hideArr[1] = new Date().getTime();
					this._beginReCheck(this.time-parseInt((this.hideArr[1] - this.hideArr[0])/1000));
			    }
			},
			_resetCode(){ //重置倒计时的相关信息
				this.timeout&&clearTimeout(this.timeout);
				this.sendMsg = false;
				document.removeEventListener("visibilitychange", this._diffTime);
			}
		},
		created(){
			// start 针对内部系统'https://mall.xiaogj.com/xiaogj.com/html/index.html'做的专门的处理;
			this.user.grade = this.companySuffix==='xiaogj.com' ? '职务' : '年级'
			// end 针对内部系统'https://mall.xiaogj.com/xiaogj.com/html/index.html'做的专门的处理;

			console.log(this.$route.query);
			this.source = (this.$route.query.source && this.$route.query.source == "scan")  ? true : false;
			this.user.SelectCampusId = this.$route.query.cid  ? this.$route.query.cid : "";
			this.user.SelectCampusId && this.campuslist.forEach((cam) => {
				if (cam.ID == this.user.SelectCampusId) {
					this.user.campus = cam.Name;
				}
			});
			// this.user.campus = this.$route.query.cid  ? this.$route.query.cid : "";
			!this.source && getGradeList().then(res => {
				if (res.ErrorCode == app.errok) {
					this.gradeList = res.Data ;
				}else{
					app.toast('error', res.ErrorMsg);
				}
            })
		},
		components: {
			actionsheetSelect,
			actionsheetUser
		},
		watch: {
			// 刷新对输入框表单元素进行input的监听,以做到在ipnut输入内容时,可以动态的滚动到相应的表单元素;
			stepFlag(val) {
				this.$nextTick(() => {
					this.$refs.scroller.refresh();
					console.log(val);
					if (val === 2 && this.config.DefaultUserNameRule === 1) {
						this.user.ssxName = this.user.phone;
					}
				})
			}
		}
	}
</script>