/*
 * 会话列表
 */
import store from '../'
import router from 'src/router'
import {updateTeamList} from './teams.js'
import {getUsers} from './search.js'



// 如果会话对象不是好友，需要更新好友名片
function updateSessionAccount (sessions) {
    let accountsNeedSearch = []
    sessions.forEach(item => {
        if (item.scene === 'p2p') {
            // 如果不存在缓存资料
            if (!store.state.userInfos[item.to]) {
                accountsNeedSearch.push(item.to)
            }
        }
    })

    accountsNeedSearch.length > 0 && getUsers(accountsNeedSearch)
}

// onSessions只在初始化完成后回调
export function onSessions (sessions) {
    // console.log("... 同步会话 ... ", sessions);
    updateSessionAccount(sessions)
    store.commit('updateSessions', sessions)
}

// 更新会话的回调, 会传入会话对象
export function onUpdateSession (session) {
    // console.log("更新会话.... onUpdateSession... ", session);
    let sessions = [session]
    updateSessionAccount(sessions)
    store.commit('updateSessions', sessions)

    closeTeamHandler(session)
}

// 关闭群聊的处理; 
// 备注: 由于SDK现在收不到‘onUpdateTeam’回调；故先在更新会话时做判断;
window._teamEvents = {}
function closeTeamHandler(session) {
    if (session.scene === "team") {
        let msg = session.lastMsg
        if (msg.type === 'notification' && msg.attach.type === 'updateTeam') {
            let ateam = msg.attach.team,
                teamId = ateam.teamId,
                serverCustom = ateam.serverCustom

            nim.getTeam({
                teamId: teamId,
                done: function (error, teams) {
                    console.log('更新群资料...', teams);
                    updateTeamList([teams])
                }
            })

            if (serverCustom) {
                let cus = JSON.parse(serverCustom)
                // 是否自定义关闭群
                if (cus.valid === false && !window._teamEvents[teamId]) {
                    window._teamEvents[teamId] = true;
                    setTimeout(() => window._teamEvents[teamId] = false, 1000)

                    let team = store.getters.validTeamListMap[teamId]
                    console.log("emit close-team ......");
                    app.event.emit('close-team', team)
                }
            }
        }
    }
}

// 从最近会话列表中删除指定会话
export function deleteSession ({state, commit}, sessionId) {
    const nim = state.nim
    sessionId = sessionId || ''
    let scene = null
    let account = null
    if (/^p2p-/.test(sessionId)) {
        scene = 'p2p'
        account = sessionId.replace(/^p2p-/, '')
    } else if (/^team-/.test(sessionId)) {
        scene = 'team'
        account = sessionId.replace(/^team-/, '')
    }
    if (account && scene) {
        nim.deleteSession({
            scene,
            to: account,
            done: function deleteServerSessionDone(error, obj) {
                if (error) {
                    alert(error)
                    return
                }
                nim.deleteLocalSession({
                    id: sessionId,
                    done: function deleteLocalSessionDone(error, obj) {
                        if (error) {
                            alert(error)
                            return
                        }
                        commit('deleteSessions', [sessionId])
                    }
                })
            }
        })
    }
}

export function setCurrSession ({state, commit, dispatch}, sessionId) {
    const nim = state.nim
    if (sessionId) {
        commit('updateCurrSessionId', {
            type: 'init',
            sessionId
        })
        if (nim) {
            // 如果在聊天页面刷新，此时还没有nim实例，需要在onSessions里同步
            nim.setCurrSession(sessionId)
            commit('updateCurrSessionMsgs', {
                type: 'init',
                sessionId
            })
        }
    }
}

export function resetCurrSession ({state, commit}) {
    const nim = state.nim
    nim.resetCurrSession()
    commit('updateCurrSessionMsgs', {
        type: 'destroy'
    })
}