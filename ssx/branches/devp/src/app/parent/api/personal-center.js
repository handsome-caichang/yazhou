import http from './http/http.js';

// 获取微信配置
export function getwxsysinfos(params) {
    return http.ajax({
    	type: 'mock',
    	url: 'getwxsysinfos', 
    	data: params
    });
}
// 获取登录用户信息
export function getuserinfobyuid(params) {
    return http.ajax({
    	type: 'mock',
    	url: 'getuserinfobyuid', 
    	data: params
    });
}
// 获取首页未读信息数
export function gethomepageinfo(params) {
    return http.ajax({
    	type: 'mock',
    	url: 'gethomepageinfo', 
    	data: params
    });
}
// 修改密码
export function opuserpwd(params) {
    return http.ajax({
    	type: 'mock',
    	url: 'opwxuserpwd', 
    	data: params
    });
}
// 修改头像
export function modifyuserphoto() {
	return http.ajax({
		type: 'mock',
		url: 'modifyuserphoto', 
		data: params
	});
}