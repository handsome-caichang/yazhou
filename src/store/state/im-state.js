/* 数据状态 */
export default {

    // 发送出去的消息在多长时间内可撤回,单位ms
    // deleteMsgTime: 2*60*1000,
    deleteMsgTime: 2*60*1000,

    // IM相关
    nimAppKey: "",

    // NIM SDK 实例
    nim: null,
    // 登录账户ID
    userUID: null,
    sdktoken: null,

    // 是否同步完成， 会在onsyncdone这个回调里置为true;
    imSync: false,

    // 登陆账号用户自身的用户名片
    myInfo: {},
    // 好友/黑名单/陌生人名片, 数据结构如：{cid: {attr: ...}, ...}
    userInfos: {},

    // 会话列表
    sessionlist: [],
    // 会话ID与会话对象的map关系;
    sessionMap: {},

    // 当前会话ID（即当前聊天列表，只有单聊群聊采用，可用于判别）
    currSessionId: null,
    currSessionMsgs: [],
    // 当前会话中的图片路径数组
    currIamgeArr: [],

    // 群列表
    teamlist: [],
    // 群对象的成员列表，数据结构如：{tid: {members: [...], ...}, ...}
    teamMembers: {},

    // 消息列表
    // msgUnreadTotal: 
    msgs: {}, // 以sessionId作为key


    // 系统消息
    sysMsgs: [],
    customSysMsgs: [],
    sysMsgUnread: {
      total: 0
    },
    customSysMsgUnread: 0,

    // 临时变量
    // 缓存需要获取的用户信息账号,如searchUser
    searchedUsers: [],
    // 缓存需要获取的群组账号
    searchedTeams: [],
}