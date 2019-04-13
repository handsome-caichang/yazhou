import http from './http/http.js'

/* 我的-交费记录-查询学员的缴费记录 */
export function getstudentfeechargelist(params) {
	return http.ajax({
		type: 'mock',
		url: 'getstudentfeechargelist', 
		data: params
	});
}
