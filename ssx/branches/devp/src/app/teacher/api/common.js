import axios from './axios-j';
import http from './http/http.js';

// Process post接口
export function processPost(params) {
	return axios.ajax('/weixin/teacher/Process.ashx', params);
}

// Process get接口
export function processGet(params) {
	return axios.ajaxGet('/weixin/teacher/Process.ashx', params);
}

// Process 可以取消的post接口
export function processCPost(params) {
	return axios.cajax('/weixin/teacher/Process.ashx', params);
}

// 登录
export function login(params) {
	return axios.ajax('/api/login/login', params);
}

// 获取用户信息
export function GetUserInfo(params) {
	return axios.cajax('/api/MasterReport/GetUserInfo', params);
}

// 注销登录
export function logout(params) {
	return http.ajax({
		type: 'mock',
		url: 'logoutwx', 
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

// 保存信息 post 接口
export function savePost(params) {
    return axios.ajax('/weixin/teacher/save.ashx',params);
}

// 获取上传OSS之前，应用服务器的token;以便根据这个找文件服务器要STS认证token；
export function getUploadToken(params) {
    return axios.ajax('/api/common/getUploadToken',params);
}


//移动端通过基础参数类型获取参数列表
export function getdicinfobytypem(params){
	return http.ajax({
		type:'mock',
		url:'getdicinfobytypem',
		data:params
	})
}

// 获取作业评价模板列表
export function getCoursecommenttemplatelist(params){
    return http.ajax({
    	type: 'mock',
    	url: 'getcoursecommenttemplatelist',
    	data: params
    });
}



// 获取作业评价模板基本信息
export function getCoursecommenttemplatebyid(params){
    return http.ajax({
    	type: 'mock',
    	url: 'getcoursecommenttemplatebyid',
    	data: params
    });
}

// 作业评价模板操作
export function opCoursecommenttemplate(params){
    return http.ajax({
    	type: 'mock',
    	url: 'opcoursecommenttemplate',
    	data: params
    });
}




// 获取学校公告-获取公告列表（分页）

export function getnoticelist(params){
	return http.ajax({
		type: 'mock',
		url: 'getnoticelist',
		data: params
	});
}

export function getnotice(params){
	return http.ajax({
		type: 'mock',
		url: 'getnotice',
		data: params
	});
}


export function getclassroomlistmobile(params){
	return http.ajax({
		type: 'mock',
		url: 'getclassroomlistmobile',
		data: params
	});
}