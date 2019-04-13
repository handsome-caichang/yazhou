/* 数据相关 */
export default {
    //配置项相关
    set_userConfig: function(state, params) {
        state.userConfig = params;
    },
    //作业相关
    //修改刷作业详情标志
    set_homeworkDetailRefresh: function(state) {
        state.homeworkDetailRefreshFlag += 1;
    },

    // 是否需要刷新"订单列表"界面
    set_orderListRefreshFlag: function(state) {
        state.orderListRefreshFlag += 1;
    },
    set_orderDetailRefreshFlag: function(state) {
        state.orderDetailRefreshFlag += 1;
    },
    set_couponFlag: function (state, params) {
        state.couponFlag = params;
    }
};