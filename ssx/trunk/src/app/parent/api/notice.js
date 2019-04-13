import axios from './axios-j'

//获取公告列表
export function getnoticeinfosbyeid(params){
	return axios.smajax('getnoticeinfosbyeid', params);
}

//获取老师通知列表
export function getteachernoticelist(params){
	return axios.smajax('getteachernoticelist', params);
}

//获取公告详情
export function getnotice(params){
	return axios.smajax('getnotice', params);
}

//获取老师通知详情
export function getteachernoticeinfo(params){
	return axios.smajax('getteachernoticeinfo', params);
}

