import http from './http/http.js'


/* 学员积分 */
export function getstudentpoint(params) {
	return http.ajax({
		type: 'mock',
		url: 'getstudentpoint', 
		data: params
	});
}



/* 获取学员积分明细 */
export function getpointlogsdetailbyid(params) {
	return http.ajax({
		type: 'mock',
		url: 'getpointlogsdetailbyid', 
		data: params
	});
}
