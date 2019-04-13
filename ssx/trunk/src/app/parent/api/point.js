import axios from './axios-j'

//获取积分
export function getstudentpointinfo(params){
	return axios.smajax('getstudentpointinfo', params);
}

//获取积分日志
export function gettotalpointloginfos(params){
	return axios.smajax('gettotalpointloginfos', params);
}

//获取积分规则
export function getpointlist(params){
	return axios.smajax('getpointlist', params);
}
