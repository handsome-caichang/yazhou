import axios from './axios-j';

//工作统计
export function getworkinfo(params){
	return axios.smajax('getworkinfo',params)
}

//查询个人工作统计详情
export function getworkdetailinfo(params){
	return axios.smajax('getworkdetailinfo',params)
}