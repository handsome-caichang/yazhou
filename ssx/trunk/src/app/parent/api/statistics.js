import axios from './axios-j';

// 获取上课统计列表
export function getcoursecountrecord(params){
	return axios.smajax('getcoursecountrecord', params);
}
// 获取上课统计详情
export function getcourseconsume(params){
	return axios.smajax('getcourseconsume', params);
}