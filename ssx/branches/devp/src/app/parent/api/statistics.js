import http from './http/http.js'


/* 上课统计列表 */
export function getcoursecountrecord(params) {
	return http.ajax({
		type: 'mock',
		url: 'getcoursecountrecord', 
		data: params
	});
}



/* 上课统计详情 */
export function getcourseconsume(params) {
	return http.ajax({
		type: 'mock',
		url: 'getcourseconsume', 
		data: params
	});
}