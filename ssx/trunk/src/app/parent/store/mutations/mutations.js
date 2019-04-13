/* 数据相关 */
export default {
    set_systemOverdue: function (state, params) { //系统是否过期
		state.systemOverdue = params;
    },
    set_systemOverdueMsg: function (state, params) { //系统即将过期
        state.systemOverdueMsg = params;
    },
	set_userConfig: function (state, params) { //配置项相关
		state.userConfig = params;
	},
	set_homeworkDetailRefresh: function (state) { //作业相关，修改刷作业详情标志
		state.homeworkDetailRefreshFlag += 1;
	}
}