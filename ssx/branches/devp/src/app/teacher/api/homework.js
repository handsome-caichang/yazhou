import http from './http/http.js';

// 获取作业列表
export function getjoblistforteacher(params) {
	return http.ajax({
		type: 'mock',
		url: 'getjoblistforteacher', 
		data: params
	});
}
// 获取作业详情
export function getjobinfobyidforteacher(params) {
    return http.ajax({
    	type: 'mock',
    	url: 'getjobinfobyidforteacher', 
    	data: params
    });
}
// 发布作业时选择班级学员
export function getcoursestudentforhomework(params) {
    return http.ajax({
    	type: 'mock',
    	url: 'getcoursestudentforhomework', 
    	data: params
    });
}
// 删除作业
export function deletehomework(params) {
    return http.ajax({
    	type: 'mock',
    	url: 'deletehomework', 
    	data: params
    });
}
// 发送作业
export function addjobbyteacher(params) {
    return http.ajax({
    	type: 'mock',
    	url: 'addjobbyteacher', 
    	data: params
    });
}
// 作业评价选择分数(按ABCD等级)
export function getcommentscore(params) {
	return http.ajax({
		type: 'mock',
		url: 'getcommentscore', 
		data: params
	});
}
// 老师获取某个学员的作业详情
export function getjobreplyinfo(params) {
    return http.ajax({
    	type: 'mock',
    	url: 'getjobreplyinfo', 
    	data: params
    });
}