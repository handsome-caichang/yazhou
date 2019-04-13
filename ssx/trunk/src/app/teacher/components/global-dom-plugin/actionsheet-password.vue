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
            padding: 0 15px;
			.title{
                padding: 20px 0 10px 0;
			}
			input[type=password]{
				height: 40px;
				background-color: #FDFDFD;
				border: 1px solid $color-border-2;
			}
			.tips{
                padding: 40px 0 10px 0;
				font-size: 14px;
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
			<div class="tips">温馨提示：为保护您的隐私，请修改密码</div>
		</div>
		<div class="card-ft" slot="footer">
			<div @click="cancel">取消</div><div @click="confirm">确认</div>
		</div>
	</action-sheet>
</template>

<script>
	import { processPost } from 'teacher/api/common';
	
	
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
			openFlag(){
                let isChangePwd = app.ls.getStorage('ssxTeacher_pwd_'+app.sysInfo.ID);
				if (app.sysInfo.changePassword==1 && this.opened) {
                    if (!isChangePwd) {
                        return true;
                    }
				}
				return false;
			}
		},
		methods: {
			cancel(){ //取消
                this.opened = false;
                app.ls.setStorage('ssxTeacher_pwd_'+app.sysInfo.ID,true);
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
		},
		components: {
			
		}
	}
</script>