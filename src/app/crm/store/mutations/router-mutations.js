/* 路由相关 */
export default {
	// 在单次路由切换过程中，'popstate'事件触发的次数；
	set_popstateNum(state, type) {
		// console.log('输出',type);
		if (type === 'add') {
			state.popstateNum += 1;
		}
		if (type === 'reset') {
			state.popstateNum = 0;
		}
		if (type === 'popstate-stop') {
			state.popstateNum = -1;
		}
	},
	// 在单次路由切换过程中，是更新了当前路由还是跳转了路由；
	// type取值：'goto'表示跳转到新路由、'update'表示更新当前路由 
	set_routeType(state, type) {
		state.routeType = type;
	}
}
