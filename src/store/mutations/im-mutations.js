import store from '../'
import util from '../../utils'
import config from '../../configs'


// import {checkMsgValid} from '../tool/tool.js'

/* 数据相关 */
export default {
    set_nimAppKey(state, appkey) {
        state.nimAppKey = appkey;
    },
    set_imSync(state, boolean) {
        state.imSync = boolean;
    },
    updateUserUID: function(state, loginInfo) {
        state.userUID = loginInfo.uid
        state.sdktoken = loginInfo.sdktoken
    },
    /* 用户名片 */
    // 更新登陆账号用户自身的用户名片;
    updateMyInfo(state, myInfo) {
        state.myInfo = util.mergeObject(state.myInfo, myInfo)
    },
    updateUserInfo(state, users) {
        let userInfos = state.userInfos
        users.forEach(user => {
            let account = user.account
            if (account) {
                userInfos[account] = util.mergeObject(userInfos[account], user)
            }
        })
        state.userInfos = util.mergeObject(state.userInfos, userInfos)
    },

    /* 会话 */
    // 更新，合并会话列表，并按会话更新时间倒序排列; 同时建立会话ID与会话的map;
    // sessions 会话对象数组；
    updateSessions(state, sessions) {
        const nim = state.nim
        state.sessionlist = nim.mergeSessions(state.sessionlist, sessions)
        /*state.sessionlist = state.sessionlist.filter(item => {
            if (/^team-/.test(item.id)) {
                return false
            }
             return true
        })*/
        state.sessionlist.sort((a, b) => {
            return b.updateTime - a.updateTime
        })
        state.sessionlist.forEach(item => {
            state.sessionMap[item.id] = item
        })
    },
    // 从最近会话列表中删除指定id的会话， 
    // sessionIds 会话id数组；
    deleteSessions(state, sessionIds) {
        let cutSessionsByIds = state.nim.cutSessionsByIds;
        if (cutSessionsByIds instanceof Function) {
            state.sessionlist = state.nim.cutSessionsByIds(state.sessionlist, sessionIds)
        } else { // 如果上面的'cutSessionsByIds'不能用了，可以用如下实现;
            state.sessionlist = state.sessionlist.filter(function(item) {
                return sessionIds.indexOf(item.id) === -1;
            });
        }
    },
    // 更新当前会话id，用于唯一判定是否在current session状态
    updateCurrSessionId(state, obj) {
        let type = obj.type || ''
        if (type === 'destroy') {
            state.currSessionId = null
        } else if (type === 'init') {
            if (obj.sessionId && (obj.sessionId !== state.currSessionId)) {
                state.currSessionId = obj.sessionId
            }
        }
    },
    // 更新当前会话列表的聊天记录，包括历史消息、单聊消息等，不包括聊天室消息
    // replace: 替换idClient的消息
    updateCurrSessionMsgs(state, obj) {
        let type = obj.type || ''
        if (type === 'destroy') { // 清空会话消息
            state.currSessionMsgs = []
            state.currSessionLastMsg = null
            store.commit('updateCurrSessionId', {
                type: 'destroy'
            })
        } else if (type === 'init') { // 初始化会话消息列表
            if (state.currSessionId) {
                let sessionId = state.currSessionId
                let currSessionMsgs = [].concat(state.msgs[sessionId] || [])
                    // 做消息截断
                let limit = config.localMsglimit
                let msgLen = currSessionMsgs.length
                if (msgLen - limit > 0) {
                    state.currSessionLastMsg = currSessionMsgs[msgLen - limit]
                    currSessionMsgs = currSessionMsgs.slice(msgLen - limit, msgLen)
                } else if (msgLen > 0) {
                    state.currSessionLastMsg = currSessionMsgs[0]
                } else {
                    state.currSessionLastMsg = null
                }
                state.currSessionMsgs = []
                let lastMsgTime = 0
                currSessionMsgs.forEach(msg => {
                    // if (checkMsgValid(msg)) {
                        if ((msg.time - lastMsgTime) > 1000 * 60 * 5) {
                            lastMsgTime = msg.time
                            state.currSessionMsgs.push({
                                type: 'timeTag',
                                text: util.formatDate(msg.time, false)
                            })
                        }
                        state.currSessionMsgs.push(msg)
                    // }
                })
            }
        } else if (type === 'put') { // 追加一条消息
            let newMsg = obj.msg
            let lastMsgTime = 0
            let lenCurrMsgs = state.currSessionMsgs.length
            if (lenCurrMsgs > 0) {
                lastMsgTime = state.currSessionMsgs[lenCurrMsgs - 1].time
            }
            if (newMsg) {
                // if (checkMsgValid(newMsg)) {
                    if ((newMsg.time - lastMsgTime) > 1000 * 60 * 5) {
                        state.currSessionMsgs.push({
                            type: 'timeTag',
                            text: util.formatDate(newMsg.time, false)
                        })
                    }
                    state.currSessionMsgs.push(newMsg)
                // }
            }
        } else if (type === 'concat') {
            // 一般用于历史消息拼接
            let currSessionMsgs = []
            let lastMsgTime = 0
            obj.msgs.forEach(msg => {
                // if (checkMsgValid(msg)) {
                    if ((msg.time - lastMsgTime) > 1000 * 60 * 5) {
                        lastMsgTime = msg.time
                        currSessionMsgs.push({
                            type: 'timeTag',
                            text: util.formatDate(msg.time, false)
                        })
                    }
                    currSessionMsgs.push(msg)
                // }                
            })
            currSessionMsgs.reverse()
            currSessionMsgs.forEach(msg => {
                state.currSessionMsgs.unshift(msg)
            })
            if (obj.msgs[0]) {
                state.currSessionLastMsg = obj.msgs[0]
            }
        } else if (type === 'replace') {
            let msgLen = state.currSessionMsgs.length
            let lastMsgIndex = msgLen - 1
            if (msgLen > 0) {
                for (let i = lastMsgIndex; i >= 0; i--) {
                    if (state.currSessionMsgs[i].idClient === obj.idClient) {
                        state.currSessionMsgs.splice(i, 1, obj.msg)
                        break
                    }
                }
            }
        } else if (type === 'delete') {
            store.commit('deleteMsg', obj.msg)
            store.commit('updateCurrSessionMsgs', {type: 'init'})
        }
    },

    updateCurrIamgeArr(state, arr) {
        state.currIamgeArr = arr;
    },

    /* 群组 */
    // 更新群组列表;
    updateTeamList(state, teams) {
        state.teamlist = state.nim.mergeTeams(state.teamlist, teams);
    },
    removeTeam(state, team) {
        // console.log("自己被踢出群了...", team.name);
        state.teamlist = state.teamlist.filter(iteam => {
            return iteam.teamId !== team.teamId
        })
    },

    updateTeamMembers(state, teamMapMembers) {
        // console.log("增加群成员....");
        let teamId = teamMapMembers.teamId,
            members = teamMapMembers.members,
            teamMembers = state.teamMembers[teamId]

        if (!teamMembers) {
            Vue.set(state.teamMembers, teamId, members);
        } else {
            state.teamMembers[teamId] = state.nim.mergeTeamMembers(teamMembers, members);
        }
    },
    // 删除群成员
    removeTeamMembers(state, teamMapMembers) {
        let teamId = teamMapMembers.teamId,
            invalids = teamMapMembers.invalids,
            teamMembers = state.teamMembers[teamId]
            if (teamMembers) {
                state.teamMembers[teamId] = state.nim.cutTeamMembers(teamMembers, invalids)
            }        
    },


    updateSearchlist(state, obj) {
        const type = obj.type
        switch (type) {
            case 'user':
                if (obj.list.length !== 0 || state.searchedUsers.length !== 0) {
                    state.searchedUsers = obj.list
                } else {
                    state.searchedUsers = []
                }
                break
            case 'team':
                if (obj.list.length !== 0 || state.searchedTeams.length !== 0) {
                    state.searchedTeams = obj.list
                } else {
                    state.searchedTeams = []
                }
                break
        }
    },

    /* 消息 */
    // 初始化，收到离线漫游消息时调用
    updateMsgs(state, msgs) {
        const nim = state.nim
        let tempSessionMap = {}
        msgs.forEach(msg => {
            let sessionId = msg.sessionId
            tempSessionMap[sessionId] = true
            if (!state.msgs[sessionId]) {
                state.msgs[sessionId] = []
            }
                
            // if (checkMsgValid(msg)) {
                // sdk会做消息去重
                state.msgs[sessionId] = nim.mergeMsgs(state.msgs[sessionId], [msg])
            // }
        })
        for (let sessionId in tempSessionMap) {
            state.msgs[sessionId].sort((a, b) => {
                if (a.time === b.time) {
                    // 机器人消息，回复消息时间和提问消息时间相同，提问在前，回复在后
                    if (a.type === 'robot' && b.type === 'robot') {
                        if (a.content && a.content.msgOut) {
                            return 1
                        }
                        if (b.content && b.content.msgOut) {
                            return -1
                        }
                    }
                }
                return a.time - b.time
            })
            if (sessionId === state.currSessionId) {
                store.commit('updateCurrSessionMsgs', {
                    type: 'init'
                })
            }
        }
    },
    // 更新追加消息，追加一条消息
    putMsg(state, msg) {
        // if (checkMsgValid(msg)) {
            let sessionId = msg.sessionId
            if (!state.msgs[sessionId]) {
                state.msgs[sessionId] = []
            }
            let tempMsgs = state.msgs[sessionId]
            let lastMsgIndex = tempMsgs.length - 1
            if (tempMsgs.length === 0 || msg.time >= tempMsgs[lastMsgIndex].time) {
                tempMsgs.push(msg)
            } else {
                for (let i = lastMsgIndex; i >= 0; i--) {
                    let currMsg = tempMsgs[i]
                    if (msg.time >= currMsg.time) {
                        state.msgs[sessionId].splice(i, 0, msg)
                        break
                    }
                }
            }
        // }
    },
    // 删除消息列表消息
    deleteMsg(state, msg) {
        console.log(msg);
        let sessionId = msg.sessionId
        let tempMsgs = state.msgs[sessionId]
        console.log(tempMsgs);
        if (!tempMsgs || tempMsgs.length === 0) {
            return
        }
        let lastMsgIndex = tempMsgs.length - 1
        for (let i = lastMsgIndex; i >= 0; i--) {
            let currMsg = tempMsgs[i]
            if (msg.idClient === currMsg.idClient) {
                state.msgs[sessionId].splice(i, 1)
                break
            }
        }
    },
    // 替换消息列表消息，如消息撤回
    replaceMsg(state, obj) {
        let {sessionId, idClient, msg} = obj
        let tempMsgs = state.msgs[sessionId]
        if (!tempMsgs || tempMsgs.length === 0) {
            return
        }
        let lastMsgIndex = tempMsgs.length - 1
        for (let i = lastMsgIndex; i >= 0; i--) {
            let currMsg = tempMsgs[i]
            if (idClient === currMsg.idClient) {
                state.msgs[sessionId].splice(i, 1, msg)
                break
            }
        }
    },

    // 更新未读数
    updateSysMsgUnread (state, obj) {
      state.sysMsgUnread = obj
    },

}