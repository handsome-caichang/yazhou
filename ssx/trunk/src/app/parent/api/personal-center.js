import axios from './axios-j';

//获取用户个人信息
export function getuserinfobyuid(params) {
    return axios.smajax('getuserinfobyuid', params);
}

//获取微信端配置项
export function getwxsysinfos(params) {
    return axios.smajax('getwxsysinfos', params);
}

// 获取主页各个未读信息数量
export function gethomepageinfo() {
    return axios.smajax('gethomepageinfo', {
        IsParent: 1
    });
}

//用户修改密码
export function opuserpwd(params) {
    return axios.smajax('opuserpwd', params);
}

//修改用户头像
export function opuserphoto(params) {
    return axios.smajax('opuserphoto', params);
}

//获取公立学校
export function getschoolandgrade(params) {
    return axios.smajax('getschoolandgrade', params);
}

//修改和人信息
export function opstudentinfoforwx(params){
	return axios.smajax('opstudentinfoforwx',params)
}

//注销登录接口
export function logout() {
    return axios.smajax('logout');
}