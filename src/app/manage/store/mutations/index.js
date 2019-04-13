export default {
    // 设置模板数据  params{type:模板名字,data:data}
    setEndTime: function(state, params) {
        params = params.replace(/-/g, '/');
        state.endTime = Math.floor(new Date(params).getTime() / 1000);
    },
    setCurTime: function(state, params) {
        state.curTime = params;
    },
    //设置用户信息
    setUserInfo: function(state, params) {
        state.userInfo = params
    },
    setAddress: function(state, params) { //设置机构信息
        state.addressInfo = params
    },
    setBindinginfo: function(state, params) {
        state.bindinginfo = params
    }
}