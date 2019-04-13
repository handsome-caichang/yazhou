import axios from './axios-j'

/* 我的成长列表 */
export function getstudentgrowingalbuminfo(params) {
	return axios.smajax('getstudentgrowingalbuminfo', params);
}

/* 获取班级 */
export function getclassinfobystudentid(params) {
	return axios.smajax('getclassinfobystudentid', params);
}