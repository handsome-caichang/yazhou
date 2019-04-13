<!-- 登录页面 -->
<style lang="scss" scoped>    
	.login {
		@include position-absolute;
		@include background-img(false, contain);
		background-position: bottom;
		background-color: $color-assist-3;
		.title {
			height: 77px;
			color: $color-primary;
			box-shadow: 0 0.5px 1px 0 rgba(0, 0, 0, 0.09);
			background-color: $color-white;
			@include flex-center;
			svg{
				font-size: 60px;
			}
		}
		.form {
			margin: 20px $edge-x 0 $edge-x;
			padding: 20px 18px $h-3 18px;
			box-shadow: 0 0 2px 0 rgba(0, 38, 78, 0.20);
			background-color: $color-white;
			.form-item {
				@include flex-center(row);
				padding: 7px 0;
				border-radius: 4px;
				margin-bottom: 20px;
				background-color: $color-assist-3;
				.form-item-bd {
					position: relative;
					height: $h-4;
					line-height: $h-4;
					flex: 1;
					input {
						padding-left: $h-3;
						font-size: $fs-big-s;
						color: #474747 !important;
						background-color: $color-assist-3 !important;
					}
					::-webkit-input-placeholder {
						color: $color-9;
					}
					svg {
						position: absolute;
						line-height: $h-4;
						height: $h-4;
						font-size: $fs-big-s;
						padding: 0 8px 0 15px;
					}
				}
				.form-item-ft {
					height: 29px;
					line-height: 29px;
					padding: 0 10px;
					@include border-left($color-9);
				}
			}
			.form-btn {
				height: $h-1;
				color: $color-white;
				@include flex-center;
				border-radius: 34px;
				font-size: $fs-big-s;
				background-color: #B2B2B2;
				&.active{
					background-color: $color-primary;
				}
			}
			.form-tips {
				margin-top: $edge-x;
				text-align: center;
				color: $color-primary;
				a {
					color: $color-primary;
					text-decoration: underline;
				}
			}
		}
	}
	
	.scroller {
		@include position-absolute;
		overflow: hidden;
	}
</style>

<template>
	<div class="login" :style="'backgroundImage:url('+loginBg+')'">
		<scroller-base class="scroller">
			<div>
				<div class="title">
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-denglu"></use>
					</svg>
				</div>
				<div class="form">
					<div class="form-item">
						<div class="form-item-bd">
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-wode"></use>
							</svg>
							<input type="text" placeholder="用户名" v-model="uname"/></div>
						<div class="form-item-ft">@{{companySuffix}}</div>
					</div>
					<div class="form-item">
						<div class="form-item-bd">
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-mima"></use>
							</svg>
							<input type="password" placeholder="密码" v-model="pwd"/>
						</div>
					</div>
					<div class="form-btn" @click="loginSubmit($event)" :class="{active:isActive}">登&emsp;录</div>
					<!-- <div class="form-tips" v-if="config.RegistLimit==0||config.RegistLimit==2">您还没有注册？ -->
					<div class="form-tips" v-if="!compCanRegist">您还没有注册？
						<router-link to="/register">&nbsp;注册&nbsp;</router-link>
					</div>
				</div>
			</div>
		</scroller-base>
		<loading v-if="isLoading" :bgType="1"></loading>
	</div>
</template>

<script>
	 
	import { userLogin,getAddressList } from 'api/lc';
	import loginBg from './login.png';
	
	export default {
		name: 'login',
		mixins: [app.mixin.shareMixin],
		data() {
			return {
				wxTitle: '手机商城',
				uname:'',
				pwd:'',
				loginBg,
				isLoading: false
			}
		},
		computed: {
			...Vuex.mapState([
				'config',//配置项RegistLimit：注册限制：0不限制（默认值），1，不开放注册，2只允许意向客户进行注册| 	配置项ClassOnlineLoginMode： 1允许注册 2 不允许
				'companySuffix',
				'registerUser'
			]),
			isActive(){
				return (this.uname.length>0)&&(this.pwd.length>0)
			},
			compCanRegist() {
				return this.config.RegistLimit == 1 || this.config.LoginMode == 2
			}
       	},
		methods: {
			...Vuex.mapMutations([
				'set_userInfo',
				'set_addressList',
				'set_cartListRefreshFlag',
				'set_userPageRefreshFlag'
			]),
			gotoPage() {
				let pArr = [];
				for (let key in app.mallApp.allPages) {
					if (key !== 'login' &&key !== 'register' && app.mallApp.allPages[key]) {
						pArr.push(key)
					}
				}
				if (pArr.length > 0) {
					this.$router.back();
				} else {
					setTimeout(() => {
						this.$router.replace('/')
					}, 600)
				}
			},
			loginSubmit(event){
				if (!this.isActive) return
				this.isLoading = true;
				
				userLogin({
					LoginName: this.uname,
					Password: this.pwd
				}).then(res => {
					this.isLoading = false;
					if (res.ErrorCode == app.errok) {
						this.set_userInfo(res.Data);
						this._updateInfo();
						this.gotoPage();
					}else{
						app.toast('error', res.ErrorMsg);
					}
				})
			},
			_updateInfo(){ //刷新购物车，"我的"，地址列表
				getAddressList().then(res => {
					if (res.ErrorCode==app.errok) {
						this.set_addressList(res.Data);
					}
				});
				this.set_cartListRefreshFlag();
				this.set_userPageRefreshFlag();
			},
			autoLogin() {
				if (this.registerUser.SSXUserName && this.registerUser.SSXUserPwd) {
					this.uname = this.registerUser.SSXUserName
					this.pwd = this.registerUser.SSXUserPwd
					this.loginSubmit()
				}
			}
		},
		created() {
			window.a = this
			this.autoLogin()
		},
		watch:{
			$route(to, from) {
				if (from.name === 'register') {
					setTimeout(() => {
						this.autoLogin()
					}, 300)
				}
			}
		}
	}
</script>