import axios from './axios-j'
// 获取通知列表
export function getnoticelistforteacher(params){
    return axios.smajax('getnoticelistforteacher',params)
}
// 获取通知详情
export function getteachernoticeinfo(params){
    return axios.smajax('getteachernoticeinfo',params)
}
// 获取评价模板 班级列表
export function getreadmessagestudent(params){
    return axios.smajax('getreadmessagestudent',params)
}
// 删除通知
export function removemessage(params) {
	return axios.smajax('removemessage',params)
}
// 发布通知
export function addpublishmessage(params) {
	return axios.smajax('addpublishmessage',params)
}
// 获取可发送通知的对象
export function getclassstudentformessage(params) {
	return axios.smajax('getclassstudentformessage',params)
}