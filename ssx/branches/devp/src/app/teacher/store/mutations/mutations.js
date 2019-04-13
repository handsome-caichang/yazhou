/* 数据相关 */
export default {
	set_systemOverdue: function (state, params){ //系统是否过期
        state.systemOverdue = params;
    },
    set_systemOverdueMsg: function (state, params){//系统即将过期
        state.systemOverdueMsg = params;
    },
	set_currole: function (state, params) { //角色相关
		state.currole = params;
	},
    set_customConfigInfo: function (state, params) {
        state.customConfigInfo = params
    },
    set_cunstomInfo: function (state, params) {
        state.customInfo = params
    },
    set_selectWillCourse: function(state, params) {
        state.selectWillCourse = params
    }
}