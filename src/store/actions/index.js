import store from 'src/store'
import router from '../../router'

import {initNimSDK} from './initNimSDK'

import {deleteSession, setCurrSession, resetCurrSession} from './session'
import {searchUsers} from './search'
import {getTeamMembersById} from './teams'
import {sendLocalCustomMsg, sendMsg, resendMsg, previewFile, sendFileMsg, getHistoryMsgs, revocateMsg} from './msgs'


function connectNim({state, commit, dispatch}) {
    // 操作为内容页刷新页面，此时无nim实例
    if (state.nim) {
        return;
    } else {
        if (store.state.userWone.AccID) {
            let loginInfo = {
                uid: store.state.userWone.AccID,
                sdktoken: store.state.userWone.Token,
            }

            dispatch('initNimSDK', loginInfo)
        }
    }
}

export default {
    // 连接sdk请求，false表示强制重连
    connect(store) {
        connectNim(store)
    },
    initNimSDK,
    getTeamMembersById,
    searchUsers,
    deleteSession,
    setCurrSession,
    resetCurrSession,
    sendLocalCustomMsg,
    sendMsg,
    resendMsg,
    previewFile,
    sendFileMsg,
    getHistoryMsgs,
    revocateMsg
}