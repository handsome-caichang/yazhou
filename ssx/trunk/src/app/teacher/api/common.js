import axios from './axios-j'

// Process post接口
export function processPost(params) {
	return axios.ajax('/weixin/teacher/Process.ashx', params);
}

// Process get接口
export function processGet(params) {
	return axios.ajaxGet('/weixin/teacher/Process.ashx', params);
}

// Process 可以取消的post接口
export function processCPost(params) {
	return axios.cajax('/weixin/teacher/Process.ashx', params);
}

// 登录
export function login(params) {
	return axios.ajax('/api/login/login', params);
}

// 获取用户信息
export function GetUserInfo(params) {
	return axios.cajax('/api/MasterReport/GetUserInfo', params);
}

// 退出登录
export function logout() {
	return axios.ajax('/api/login/logout');
}

// 保存信息 post 接口
export function savePost(params) {
    return axios.ajax('/weixin/teacher/save.ashx',params)
}

// 获取上传OSS之前，应用服务器的token;以便根据这个找文件服务器要STS认证token；
export function getUploadToken(params) {
    return axios.ajax('/api/common/getUploadToken',params)
}
