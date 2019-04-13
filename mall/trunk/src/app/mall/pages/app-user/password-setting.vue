<!-- 设置密码界面 -->

<style lang="scss" scoped>
    .password-setting {
        @include position-absolute;
		background-color: $color-white;
		.ps-form{
			padding: 16px 20px;
			input{
				height: 44px;
				margin-bottom: 15px;
				border-radius: 4px;
				color: $color-3-s;
				background-color: $color-assist-3;
				font-size: $fs-normal-s;
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
    .scroller {
        @include position-absolute;
        overflow: hidden;
    }
</style>

<template>
	<div class="password-setting">
		<scroller-base class="scroller">
			<form class="ps-form">
				<input type="password" placeholder="请输入旧密码" v-model="oldPwd"/>
				<input type="password" placeholder="请输入6位数以上的新密码" v-model="newPwd"/>
				<input type="password" placeholder="请重新输入新密码" v-model="confirmNewPwd"/>
				<div class="btn" :class="{active:isActive}" @click="passwordSubmit($event)">确定</div>
			</form>
		</scroller-base>
	</div>
</template>

<script>
	import { changePassword } from 'api/lc';
	
	export default{
		name:'password-setting',
        mixins: [app.mixin.shareMixin],
		data() {
		    return {
		    	oldPwd: '',
		    	newPwd: '',
		    	confirmNewPwd: '',
		    	wxTitle:"修改密码"
		    }
		},
		computed: {
			isActive(){
				return (this.oldPwd.length>0)&&(this.newPwd.length>0)&&(this.confirmNewPwd.length>0)
			}
        },
        methods: {
        	passwordSubmit(event){ //提交密码
        		let $target = event.target;
        		if (app.dom.hasClass($target,'active')) {
        			if (this._baseValidate()) {
		        		changePassword({
		        			OldPassword: this.oldPwd,
		        			NewPassword: this.newPwd
		        		}).then(res => {
		        			if (res.ErrorCode == app.errok) {
		                    	app.toast('success', '修改密码成功。');
		                    	this.$router.back();
		                    }else{
								app.toast('error', res.ErrorMsg);
		                    }
		        		});
        			}
        		}
        	},
        	_baseValidate(){
        		if ((this.confirmNewPwd.length<6) || (this.newPwd.length<6)){
					app.toast('info', '新密码不能少于6个字符。');
					return;
				}
				if ((this.confirmNewPwd.length>20) || (this.newPwd.length>20)){
					app.toast('info', '新密码不能多于20个字符。');
					return;
				}
        		if (this.confirmNewPwd != this.newPwd) {
        			app.toast('info', '您输入的两次密码不相同，请重新输入。');
					return;
        		}
        		return true;
        	}
        }
	}
</script>