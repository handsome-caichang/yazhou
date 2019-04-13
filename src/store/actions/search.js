import store from '../'

import {formatUserInfo} from './tool.js'

export function searchUsers ({state, commit}, obj) {
    let {accounts, done } = obj
    const nim = state.nim
    if (!Array.isArray(accounts)) {
        accounts = [accounts]
    }
    nim.getUsers({
        accounts,
        done: function searchUsersDone(error, users) {
            if (error) {
                console.log(error)
                return
            }
            commit('updateSearchlist', {
                type: 'user',
                list: users
            })
            let updateUsers = users.filter(item => {
                let account = item.account
                if (item.account === state.userUID) {
                    return false
                }
                let userInfo = state.userInfos[account] || {}
                if (userInfo.isFriend) {
                    return false
                }
                return true
            })
            updateUsers = updateUsers.map(item => {
                return formatUserInfo(item)
            })
            commit('updateUserInfo', updateUsers)
            if (done instanceof Function) {
                done(users)
            }
        }
    })
}

export function getUsers(sUsers) {
    let len = sUsers.length
    if (len === 0) return
    // console.log('............ ', len);

    if (len > 150) {
        let n = Math.floor(len/150), searchArr = []
        for (var i = 0; i < n; i++) {
            searchArr = sUsers.slice(i*150, (i+1)*150)
            store.dispatch('searchUsers', {accounts: searchArr})
        }
        searchArr = sUsers.slice(n*150, len)
        store.dispatch('searchUsers', {accounts: searchArr})            
    } else {
        store.dispatch('searchUsers', {accounts: sUsers})
    }
}