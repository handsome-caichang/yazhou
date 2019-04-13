<!-- 修改密码界面 -->
<style lang="scss" scoped>
    
    
    .password-modify {
		background-color: $color-white;
		.ps-form{
			padding: 0 20px;
			.title{
				padding: 20px 0;
				text-align: center;
				font-size: 12px;
				color: #999999;
				.title-name{
					padding-top: 8px;
					color: #333333;
					font-size: 16px;
				}
			}
			input{
				height: 44px;
				margin-bottom: 15px;
				border-radius: 4px;
				color: $color-3-s;
				font-size: $fs-normal-s;
				background-color: #F5F5F5;
                caret-color: #1E88F5;
                &:focus{ 
                    border:1px solid #1E88F5;
                    box-shadow:0px 0px 3px 0px rgba(74,144,226,0.41);
                }
				&:last-child{
					margin-bottom: 0;
				}
			}
			::-webkit-input-placeholder {
				color: #BBBBBB;
			}
			.btn{
				height: $h-2;
				line-height: $h-2;
				margin-top: 30px;
				border-radius: 4px;
				text-align: center;
				color: $color-white;
				font-size: $fs-big-s;
				background-color: #E2E2E2;
				&.active{
					background-color: $color-primary;
				}
			}
		}
    }
</style>

<template>
	<scroller-base class="password-modify">
		<div class="ps-form">
			<div class="title">
				<div>用户名</div>
				<div class="title-name">{{app.sysInfo.UserName}}</div>
			</div>
			<input type="password" placeholder="请输入旧密码" v-model="oldPwd"/>
			<input type="password" placeholder="请输入4位数以上的新密码" v-model="newPwd"/>
			<input type="password" placeholder="请重新输入新密码" v-model="confirmPwd"/>
			<div class="btn" :class="{active:isActive}" @click="confirm($event)">确定</div>
		</div>
		<loading class="loading" v-show="isLoading"></loading>
	</scroller-base>
</template>

<script>
	import { processPost } from 'teacher/api/common';

	export default{
		name:'password-modify',
		computed: {
			isActive(){
				return (this.oldPwd.length>0)&&(this.newPwd.length>0)&&(this.confirmPwd.length>0)
			}
        },
        data() {
            return {
                wxTitle: '修改密码',
            	oldPwd: '',
            	newPwd: '',
				confirmPwd: '',
				isLoading: false
            }
        },
        methods: {
        	confirm(event){ //修改密码
        		let $target = event.target;
        		if (app.dom.hasClass($target,'active')) {
        			if (this._baseValidate()) {
		        		processPost({
		        			pname: 'password',
							action: 'change',
							oldpwd: this.oldPwd,
							newpwd: this.newPwd
		        		}).then(res => {
							this.isLoading = false;
		        			if (res.errcode == app.errok) {
		                    	app.toast('success', '修改密码成功。');
		                    	this.$router.back();
		                    }else{
								app.toast('error', res.errmsg);
		                    }
		        		});
        			}
        		}
        	},
        	_baseValidate(){
        		if (!(this.confirmPwd==this.newPwd)) {
        			app.toast('info', '您输入的两次密码不一致，请重新输入。');
					return;
        		}else if (!app.regExp.pwdReg.test(this.newPwd)) {
                	app.toast('info', '新密码格式不正确，请重新输入。');
                	return;
        		}
        		return true;
        	}
		}
	}
</script>