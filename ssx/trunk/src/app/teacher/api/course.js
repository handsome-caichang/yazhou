import axios from './axios-j'

//按时间获取课表详情
export function getcourseinfosbytime(params) {
    return axios.smajax('getcourseinfosbytime', params)
}

//获取排课详情
export function getcourseinfo(params){
	return axios.smajax('getcourseinfo',params)
}

//获取签到记录学员信息
export function getattendance(params){
	return axios.smajax('getattendance',params)
}