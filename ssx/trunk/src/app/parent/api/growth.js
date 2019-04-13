import axios from './axios-j'

/* 我的成长列表 */
export function getGrowthList(params) {
	return axios.ajax('/api/ReportExtension/QueryUserGrowUp', params);
}

/* 获取班级 */
export function getStudentClass(params) {
	return axios.cajax('/api/ReportExtension/QueryStudentClass', params);
}
