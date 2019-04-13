import axios from './axios-j'

//查看排课
export function getcourseinfosbytime(params){
	return axios.smajax('getcourseinfosbytime', params);
}