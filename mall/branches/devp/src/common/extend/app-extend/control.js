const control = {};

// 为了在移动端调试方便
control.loginCheck = function(vueexample) {
	if (!vueexample.$store.state.userInfo.Name) {
		vueexample.$router.push('/login');
		return false;
	}
	return true;
}

export default control;