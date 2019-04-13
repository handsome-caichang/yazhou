import http from './http/http.js';

// 通知详情
export function getNoticeDetail(params){
    return http.ajax({
    	type: 'mock',
    	url: 'getmessageinfo',
    	data: params
    });
}
// 获取通知列表
export function getNoticeList(params){
    return http.ajax({
    	type: 'mock',
    	url: 'getmessagelistforteacher',
    	data: params
    });
}
// 删除通知
export function deleteNotice(params) {
	return http.ajax({
		type: 'mock',
		url: 'deletemessageinfo',
		data: params
	});
}
// 已读未读学员列表
export function getReadMessageStudent(params) {
	return http.ajax({
		type: 'mock',
		url: 'getreadmessagestudent',
		data: params
	});
}

// 发布通知
export function saveMessage(params) {
	return http.ajax({
		type: 'mock',
		url: 'addmessage',
		data: params
	});
}