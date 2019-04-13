/* 
 * SDK连接相关
 */

import store from '../'
// import config from 'src/configs'
import util from '../../utils'

import {onMyInfo, onUserInfo} from './userinfo'
import {onSessions, onUpdateSession} from './session'
import {onTeams, onUpdateTeamMember, onUpdateTeam, onAddTeamMembers, onRemoveTeamMembers, onDismissTeam, onTransferTeam, onUpdateTeamMembersMute} from './teams'
import {onRoamingMsgs, onOfflineMsgs, onMsg} from './msgs'
import {onSysMsg, onOfflineSysMsgs, onSysMsgUnread,  onCustomSysMsg, onOfflineCustomSysMsgs} from './sysMsgs'

import {refreshToken} from 'src/api/jie.js'

window.SDK = {NIM: window.NIM};

let _NIM_resolve;
window.NIMPromise = new Promise(resolve => {
    _NIM_resolve = resolve
})

// 重试次数
let retry = 0
function refreshNim(uid) {
    retry += 1
    if (retry < 3) {
        refreshToken().then(res => {
            console.log(res);
            store.dispatch('initNimSDK', {
                uid: uid,
                sdktoken: res.Data.Token
            })
        })

    } else {
        app.alert('帐号或密码错误')
            .then(res => app.sdk.closeWindow())
    }
}

// 重新初始化 NIM SDK
export function initNimSDK({state, commit, dispatch}, loginInfo) {
    if (state.nim) {
        state.nim.disconnect()
    }

    console.log("初始化SDK..........");
    // 初始化SDK
    window.nim = state.nim = SDK.NIM.getInstance({
        // debug: { api: 'info', style: 'font-size:12px;color:blue;background-color:rgba(0,0,0,0.1)' },
        // debug: true,
        appKey: store.state.nimAppKey,
        account: loginInfo.uid,
        token: loginInfo.sdktoken,

        // 是否使用数据库
        db: false,
        // 是否自动标记消息为已收到
        autoMarkRead: true,

        // 连接建立后的回调,
        onconnect: function onConnect(es) {
            console.log("connect nim  连接建立。。", es);

            store.commit('set_net', true)
            // 连接上以后更新uid
            if (loginInfo) commit('updateUserUID', loginInfo)
        },
        // 即将重连的回调
        onwillreconnect: function onWillReconnect() {
            store.commit('set_net', false)
        },
        // 断开连接后的回调，在微信环境下则直接关闭微信浏览器;
        ondisconnect: function onDisconnect(error) {
            switch (error.code) {
                // 账号或者密码错误, 请跳转到登录页面并提示错误
                case 302:
                    refreshNim(loginInfo.uid)
                    break;
                case 417:
                    app.alert('该帐号已在其它端登录, 您已被踢下线。')
                        .then(res => app.sdk.closeWindow()())
                    break;
                // 被踢, 请提示错误后跳转到登录页面
                case 'kicked':
                    let map = {
                        PC: '电脑版',
                        Web: '网页版',
                        Android: '手机版',
                        iOS: '手机版',
                        WindowsPhone: '手机版'
                    }
                    let str = error.from
                    let errorMsg = `你的帐号于${util.formatDate(new Date())}被${(map[str]||'其他端')}踢出下线，请确定帐号信息安全！`
                    
                    app.alert(errorMsg)
                        .then(res => app.sdk.closeWindow()())
                    break
                default:
                    app.alert('连接已断开')
                        .then(res => app.sdk.closeWindow()())
                    break
            }
        },

        // 发生错误的回调, 会传入错误对象
        onerror: function onError(err) {
            console.log(err);
        },

        /* 同步开关 */
        // 是否同步黑名单和静音列表, 默认true
        syncRelations: false,
        // 是否同步好友列表, 默认true
        syncFriends: false,
        // 是否同步好友对应的用户名片列表, 默认true 
        syncFriendUsers: false,        
        // 是否同步漫游消息, 默认true. 如果传false就收不到漫游消息, 即不会收到onroamingmsgs回调.
        syncRoamingMsgs: true,
        // 是否同步已读回执时间戳, 默认true
        syncMsgReceipts: true,

        // 同步完成, SDK完成了数据同步工作, 此时开发者可以进行渲染UI等操作了
        onsyncdone: function onSyncDone() {
            console.log("同步完成......");

            _NIM_resolve({code: 200, msg:"同步完成"})

            store.commit('set_imSync', true)
            // 说明在聊天列表页
            if (store.state.currSessionId) {
                dispatch('setCurrSession', store.state.currSessionId)
            }
        },

        // 同步当前登录用户名片的回调, 会传入用户名片
        onmyinfo: onMyInfo,
        // 当前登录用户在其它端修改自己的个人名片之后的回调, 会传入用户名片
        onupdatemyinfo: onMyInfo,
        // 同步好友用户名片的回调, 会传入用户名片数组
        onusers: onUserInfo,
        // 用户名片更新后的回调, 会传入用户名片
        onupdateuser: onUserInfo,

        /* 会话 */
        // 是否同步会话的未读数, 默认false
        syncSessionUnread: true,
        // 同步最近会话列表回调, 会传入会话列表
        onsessions: onSessions,
        // 更新会话的回调, 会传入会话对象,以下情况会收到此回调：收到消息、发送消息、设置当前会话、重置会话未读数
        onupdatesession: onUpdateSession,

        /* 群组 */
        // 是否同步群列表, 默认true.
        syncTeams: true,
        // 是否同步群成员, 默认true; 只有在syncTeams=true的时候才起作用
        syncTeamMembers: false,
        // 是否同步额外的群信息, 默认true
        syncExtraTeamInfo: true,
        // 同步群列表的回调, 会传入群数组
        onteams: onTeams,
        // 群成员信息更新后的回调, 会传入群成员对象, 不过此时的信息是不完整的, 只会包括被更新的字段。
        onupdateteammember: onUpdateTeamMember,
        // 更新群的回调, 此方法接收一个参数, 更新后的群信息
        onUpdateTeam: onUpdateTeam, 
        // 新成员入群的回调, 此方法接收一个参数, 包含群信息和群成员信息
        onAddTeamMembers: onAddTeamMembers,
        // 有人出群的回调, 此方法接收一个参数, 包含群信息和群成员账号
        onRemoveTeamMembers: onRemoveTeamMembers,
        // 解散群的回调, 此方法接收一个参数, 包含被解散的群id
        onDismissTeam: onDismissTeam,
        // 移交群的回调, 此方法接收一个参数, 包含群信息和新老群主信息
        onTransferTeam, onTransferTeam,
        // 更新群成员禁言状态的回调, 此方法接收一个参数, 包含群信息和禁言状态信息
        onUpdateTeamMembersMute: onUpdateTeamMembersMute,
        //  当前登录帐号在其它端创建群之后, 会收到此回调, 会传入群对象
        // onsynccreateteam: onCreateTeam,
        // 群消息通知是否加入未读数开关，是一个函数，如果返回true，则计入未读数，否则不计入
        shouldCountNotifyUnread: function(msg) {
            // 根据msg的属性自己添加过滤器
            if (msg.type === "notification" && msg.attach.type === "removeTeamMembers") {
                return false
            }

            return true
        },


        /* 消息 */
        // 收到消息的回调
        onmsg: onMsg,
        // 同步漫游消息的回调, 每个会话对应一个回调, 会传入消息数组
        onroamingmsgs: onRoamingMsgs,
        // 同步离线消息的回调, 每个会话对应一个回调, 会传入消息数组
        onofflinemsgs: onOfflineMsgs,


        // 系统通知
        onsysmsg: onSysMsg,
        onofflinesysmsgs: onOfflineSysMsgs,
        onupdatesysmsg: onSysMsg, // 通过、拒绝好友申请会收到此回调

        // 收到自定义系统通知的回调, 会传入系统通知
        oncustomsysmsg: onCustomSysMsg,
        // 同步离线自定义系统通知的回调, 会传入系统通知数组
        onofflinecustomsysmsgs: onOfflineCustomSysMsgs,

        // 收到系统通知未读数的回调
        onsysmsgunread: onSysMsgUnread,
        // 更新系统通知未读数的回调
        onupdatesysmsgunread: onSysMsgUnread,
    })
}