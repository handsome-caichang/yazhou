
import http from './http/http.js'

export function gettemplateinfos(params) {
    return http.ajax({ url: 'gettemplateinfos', data: params });
}

export function getactinspagelist(params) { //获取活动实例集合（分页）
    return http.ajax({ url: 'getactinspagelist', data: params });
}

export function opactins(params) { //操作活动实例（增删改）
    return http.ajax({ url: 'opactins', data: params });
}

export function getuserinfo(params) {//获取用户信息
    return http.ajax({ url: 'getuserinfo', data: params })
}

export function userbinding(params) {//登录机构
    return http.ajax({ url: 'userbinding', data: params })
}
export function getsignuplist(params) { //获得报名名单
    return http.ajax({ url: 'getsignuplist', data: params })
}

export function followshareenter(params) { //修改跟进状态
    return http.ajax({ url: 'followshareenter', data: params })
}

export function getactinsbaselist(params) { //获取活动实例基础信息集合（不分页）
    return http.ajax({ url: 'getactinsbaselist', data: params })
}
export function getconfigcompany(params) {//获取机构信息
    return http.ajax({ url: 'getconfigcompany', data: params })
}

export function postNew(params) {//获取验证码
    return http.ajax({ url: 'home/PostNewdata:', data: params })
}
export function addactivityshare(params) {  // 管理端分享
    return http.ajax({ url: 'addactivityshare', data: params })
}

export function getactinsdetail(params) {
    return http.ajax({ url: 'getactinsdetail', data: params })

}
// 获取模板数据
export function gettemplateinfo(params) {
    return http.ajax({ url: 'gettemplateinfo', data: params })
}
// 获取拼团模板的未满团数据
export function gettemplategroupcount(params) {
    return http.ajax({ url: 'gettemplategroupcount', data: params })
}
// 获取拼团模板当前团的数据
export function gettemplategroupmember(params) {
    return http.ajax({ url: 'gettemplategroupmember', data: params })
}
// 获取砍价模板的助力用户信息
export function gettemplatehelpbargainshare(params) {
    return http.ajax({ url: 'gettemplatehelpbargainshare', data: params })
}