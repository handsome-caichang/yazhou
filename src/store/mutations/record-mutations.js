/* 录音相关状态 */
export default {
	// 设置录音提示状态
	set_record(state, obj) {
		state.record = Object.assign({}, state.record, obj);
	},
    set_palyAudioMsg(state, msg) {
        state.palyAudioMsg = msg
    }
}
