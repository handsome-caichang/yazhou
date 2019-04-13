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
        isparent: 0
    });
}

// 老师端切换角色
export function userchangerole(params) {
    return axios.smajax('userchangerole', params);
}

//用户修改密码
export function opuserpwd(params) {
    return axios.smajax('opuserpwd', params);
}

//修改用户头像
export function opuserphoto(params) {
    return axios.smajax('opuserphoto', params);
}

//注销登录接口
export function logout() {
    return axios.smajax('logout');
}

//获取是否即将过期
export function getvaliditymsg() {
    return axios.smajax('getvaliditymsg');
}