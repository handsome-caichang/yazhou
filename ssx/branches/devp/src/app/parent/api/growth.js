import axios from './axios-j'
import http from './http/http.js'

/* 我的成长列表 */
export function getstudentgrowupinfos(params) {
	return http.ajax({
		type: 'mock',
		url: 'getstudentgrowupinfos', 
		data: params
	});
}

/* 获取班级 */
export function getStudentClass(params) {
	return axios.cajax('/api/ReportExtension/QueryStudentClass', params);
}
