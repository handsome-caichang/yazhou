import axios from './axios-j';

//获取校区列表
export function getallcampusidsbysid(params) {
	return axios.smajax('getallcampusidsbysid',params)
}

//投诉与建议
export function addsuggestion(params){
	return axios.smajax('addsuggestion',params)
}

//获取当前用户投诉与建议列表
export function getsuggestioninfos(params){
	return axios.smajax('getsuggestioninfos',params)
}