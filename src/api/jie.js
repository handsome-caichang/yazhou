import axios from './axios-j.js'

// 统计页面访问
// export function statisticsPV(params) {
//     return axios.ajax('api/statistics/page', params);
// }

// 将未读情况反馈给后端
export function setUnReadMsg(params) {
	return axios.aget('/api/Message/SetUnReadMsg', params)
}

// 获取微信配置
export function getwxconfig(params) {
    return axios.aget('/api/user/getwxconfig', params);
}

// 获取所有配置
export function getallconfig(params) {
    return axios.aget('/api/user/getallconfig', params);
}

// 获取当前登录用户信息
export function getLoginUser(params) {
    return axios.aget('/api/user/GetLoginUser', params);
}

// 通知后台去微信服务器下图片
export function sendimage(params) {
    return axios.aget('/api/message/sendimage', params);
}

// 通知后台去微信服务器下音频
export function sendaudio(params) {
    return axios.aget('/api/message/sendaudio', params);
}

//获取自定义消息
export function queryCustomMsg(params) {
	return axios.ajax('/api/Message/QueryCustomMsg', params)
}

//获取升级IM前老版本历史消息
export function queryHistoryMsg(params) {
	return axios.ajax('/api/Message/QueryHistoryMsg', params)
}

//获取家长端通讯录
export function getParentContacts(params) {
	return axios.aget('/api/user/GetParentContacts', params)
}

//获取老师端通讯录
export function getTeacherContacts(params) {
	return axios.aget('/api/user/GetTeacherContacts', params)
}

// 根据班级id,获取班级学生列表
export function getClassStudents(params) {
	return axios.aget('/api/User/GetClassStudents', params)
}

// 通讯录(老师、班主任)在班级列表搜索时，同时搜索学员的接口；
export function getStudents(params) {
	return axios.aget('/api/User/GetStudents', params)
}

// 根据用户userid获取用户云信账号
export function getAccID(params) {
	return axios.aget('/api/User/getAccID', params)
}

//获取群成员列表
export function getMembers(params) {
	return axios.aget('/api/Group/GetMembers', params)
}

//获取升级前老版历史消息未读数量
export function getHasUnReadHistoryMsg(params) {
	return axios.aget('/api/message/getHasUnReadHistoryMsg', params)
}

// 刷新用户云信Token
export function refreshToken(params) {
    return axios.aget('/api/User/RefreshToken', params)
}

// 获取文件上传授权token
export function getUploadToken(params) {
    return axios.aget('/api/User/GetUploadToken', params)
}

