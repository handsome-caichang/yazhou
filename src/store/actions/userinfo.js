/*
 * 用户账号信息
 */
import store from '../'
import config from '../../configs'
import util from '../../utils'

import {formatUserInfo} from './tool.js'

export function onMyInfo(obj) {
    obj = util.mergeObject(store.state.myInfo, obj);
    let myInfo = formatUserInfo(obj)
    store.commit('updateMyInfo', myInfo)
}

export function onUserInfo(users) {
    if (!Array.isArray(users)) {
        users = [users]
    }
    users = users.map(formatUserInfo)
    store.commit('updateUserInfo', users)
}