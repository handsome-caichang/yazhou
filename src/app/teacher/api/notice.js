import axios from './axios-j'
// 获取评价模板 班级列表
export function getNoticeDetail(params){
    return axios.ajaxGet('/weixin/teacher/Process.ashx',params)
}
// 获取通知列表
export function getNoticeList(params){
    return axios.ajaxGet('/weixin/teacher/Process.ashx',params)
}
// 删除通知
export function deleteNotice(params) {
	return axios.ajax('/api/SSx/DeleteMessageItem',params)
}