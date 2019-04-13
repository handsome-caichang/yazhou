/* 数据相关 */
export default {
	//角色相关
	set_currole: function (state, params) {
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
    },
    set_saleModeInfo: function (state, params) {
        state.saleModeInfo = params
    }
}