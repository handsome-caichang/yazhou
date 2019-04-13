import axios from './axios-j'

// 获取作业列表
export function gethomeworkforteacher(params) {
	return axios.smajax('gethomeworkforteacher', params)
}
// 获取作业详情
export function gethomeworkdetailforteacher(params) {
	return axios.smajax('gethomeworkdetailforteacher', params)
}
// 发送作业时选择学员
export function getcoursestudentforhomework(params) {
	return axios.smajax('getcoursestudentforhomework')
}
// 发送作业
export function ophomework(params) {
	return axios.smajax('ophomework', params)
}
// 删除作业
export function deletehomework(param) {
	/* messageid */
	return axios.smajax('deletehomework', param);
}
// 获取已读未读学员信息
export function getmessagereadinfos(param) {
	return axios.smajax('getmessagereadinfos', param);
}
// 老师评价学员提交的作业
export function evalhomework(param) {
	return axios.smajax('evalhomework', param);
}
