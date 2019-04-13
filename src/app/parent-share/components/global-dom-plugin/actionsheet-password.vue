<!-- 修改密码弹窗 -->
<style lang="scss" scoped>
	
	
	
	.actionsheet-password{
		z-index: 10;
		line-height: 1;
		@include position-absolute;
		.card-hd{
			font-size: 20px;
			line-height: 40px;
			text-align: center;
			color: $color-white;
			background-color: $color-primary;
		}
		.card-bd{
			padding: 12px 15px 9px 15px;
			.title{
				line-height: 42px;
			}
			input[type=password]{
				height: 40px;
				background-color: #FDFDFD;
				border: 1px solid $color-border-2;
			}
			.tips{
				padding: 18px 0;
				font-size: 14px;
                line-height: 18px;
				&:before{
					content: "*";
					color: #FC311B;
				}
			}
		}
		.card-ft{
			line-height: 44px;
			@include flex-center;
			@include border-top(#DEDEDE);
			background-color: #FDFDFD;
			*{
				flex: 1;
				text-align: center;
				&:first-child{
					color: #7B7B7B;
					@include border-right(#DEDEDE);
				}
				&:last-child{
					color: $color-primary;
				}
			}
		}
	}
</style>
<style>
    .actionsheet-password .actionsheet-wrap .as-box.middle.center {
        left: 15px !important;
        right: 15px !important;
    }
</style>

<template>
	<action-sheet 
		v-show="openFlag"
		position="center"
		class="actionsheet-password">
		<div class="card-hd" slot="header">修改密码</div>
		<div class="card-bd">
			<div class="title">初始密码</div>
			<input type="password" v-model="oldPwd"/>
			<div class="title">新密码</div>
			<input type="password" placeholder="至少4位" v-model="newPwd"/>
			<div class="title">确认新密码</div>
			<input type="password" placeholder="至少4位" v-model="confirmPwd"/>
			<div class="tips">温馨提示：为保护您孩子的隐私，请修改密码</div>
		</div>
		<div class="card-ft" slot="footer">
			<div @click="cancel">取消</div><div @click="confirm">确认</div>
		</div>
	</action-sheet>
</template>

<script>
	import {processPost} from 'parent/api/common';
	
	export default{
		name: 'actionsheet-password',
		data(){
			return{
				oldPwd: '', //旧密码
				newPwd: '', //新密码
				confirmPwd: '',
				opened: true
			}
		},
		computed: {
			...Vuex.mapState([
                'userConfig'
            ]),
			openFlag(){
                let isChangePwd = app.ls.getStorage('ssxParent_pwd_'+app.sysInfo.userId);
                // EnableSSXStudentInfo  0关闭 1开启
                // perfectUserInfo  0不需要完善 1需要完善
                // isStudent 0非正式学员 1正式学员
                if(this.userConfig.EnableSSXStudentInfo==1 && this.userConfig.perfectUserInfo==1 && this.userConfig.isStudent==1){
                    return false
                }else{
                    if (this.userConfig && this.userConfig.changePassword && this.opened) {
                        if (!isChangePwd) {
                            return true;
                        }
                    }
                    return false;
                }
			}
		},
		methods: {
			...Vuex.mapMutations([
                'set_userConfig',
            ]),
			cancel(){ //取消
                this.opened = false;
                app.ls.setStorage('ssxParent_pwd_'+app.sysInfo.userId,true);
			},
			confirm(){ //确认
				if (this.oldPwd.length===0 || this.newPwd.length===0 || this.confirmPwd.length===0) {
					app.toast('info', '密码不能为空，请输入。');
                    return;
				}
				if (this.newPwd!==this.confirmPwd) {
					app.toast('info', '您输入的两次密码不一致，请重新输入。');
                    return;                    
				}else if (!this.newPwd.match(app.regExp.pwdReg)) {
					app.toast('info', '新密码格式不正确，请重新输入。');
                    return;                    
				}else{
					processPost({
						pname: 'password',
						action: 'change',
						oldpwd: this.oldPwd,
						newpwd: this.newPwd
					}).then(res => {
						if (res.errcode == app.errok) {
							this.opened = false;
							app.toast('success', '修改密码成功。');
						}else{
							app.toast('error', res.errmsg);
						}
					})
				}
			}
		}
	}
</script>