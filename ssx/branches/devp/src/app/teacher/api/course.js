import http from './http/http.js'

/* 排课列表 */
export function getcourseinfoapplist(params){
	return http.ajax({
		type: 'mock',
		url: 'getcourseinfoapplist',
		data: params
	});
}

/*  */
export function getcourseattendancemobile(params){
	return http.ajax({
		type:'mock',
		url:'getcourseattendancemobile',
		data:params
	})
}

/* // 获取老师端排课列表
export function getcourseattendancewx(params){
	return http.ajax({
		type: 'mock',
		url: 'getcourseattendancewx',
		data: params
	})
}

//获取老师端排课明细信息
export function getcourseattendancedetailwx(params){
	return http.ajax({
		type: 'mock',
		url: 'getcourseattendancedetailwx',
		data: params
	});
} */