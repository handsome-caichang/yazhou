/* 数据相关 */
export default {
    set_myInfo(state, param) {
        state.myInfo = param
        state.myInfo = Object.assign({}, state.myInfo, param)
    }
}