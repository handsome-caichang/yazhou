import http from './http/http.js';

// 获取微信配置
export function getwxsysinfos(params) {
    return http.ajax({
        // type: 'mock',
        url: 'getwxsysinfos', 
        data: params
    });
}
// 获取登录用户信息
export function getuserinfobyuid(params) {
    return http.ajax({
        // type: 'mock',
        url: 'getuserinfobyuid', 
        data: params
    });
}
// 获取首页未读信息数
export function gethomepageinfo(params) {
    return http.ajax({
        // type: 'mock',
        url: 'gethomepageinfo', 
        data: params
    });
}
// 获取系统过期信息
export function getexpireinfo(params) {
    return http.ajax({
        type: 'mock', 
        url:'getexpireinfo', 
        data: params
    });
}
// 查询个人工作统计
export function getworkinfo(params) {
    return http.ajax({
        type: 'mock', 
        url:'getworkinfo', 
        data: params
    });
}
// 查询个人工作统计详情(老师端)
export function getworkdetailinfo(params) {
    return http.ajax({
        type: 'mock', 
        url:'getworkdetailinfo', 
        data: params
    });
}
// 修改密码
export function opuserpwd(params) {
    return http.ajax({
        type: 'mock', 
        url:'opwxuserpwd', 
        data: params
    });
}
// 注销登录
export function logout(params) {
    return http.ajax({
        type: 'mock', 
        url:'logout', 
        data: params
    });
}