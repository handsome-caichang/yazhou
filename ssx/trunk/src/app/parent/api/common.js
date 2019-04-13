import axios from './axios-j';

// Process 可以取消的post接口
export function processCPost(params){
	return axios.cajax('/weixin/parent/Process.ashx', params);
}

export function getcourseevaluate(params){
	return axios.smajax('getcourseevaluate', params);
}

export function getcourseevaluatedetail(params){
	return axios.smajax('getcourseevaluatedetail', params);
}

export function savecoursecomment(params){
	return axios.smajax('savecoursecomment', params);
}
