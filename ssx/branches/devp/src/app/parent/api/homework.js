import http from './http/http.js';

// 查询作业列表
export function getjoblistforstudent(params) {
    return http.ajax({
    	type: 'mock',
    	url: 'getjoblistforstudent',
    	data: params
    });
}
// 获取作业详情
export function getjobinfobyid(params) {
    return http.ajax({
    	type: 'mock',
    	url: 'getjobinfobyid',
    	data: params
    });
}
// 学生提交作业
export function replyjobbystudent(params) {
    return http.ajax({
    	type: 'mock',
    	url: 'replyjobbystudent',
    	data: params
    });
}