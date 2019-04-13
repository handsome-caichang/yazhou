import axios from './axios-j';

// 登录
export function login(params) {
    return axios.ajax('/weixin/login.ashx', params);
}

// Process post接口
export function processPost(params){
	return axios.cajax('/weixin/parent/Process.ashx', params);
}

// Process get接口
export function processGet(params){
	return axios.ajaxGet('/weixin/parent/Process.ashx', params);
}

// Process 可以取消的post接口
export function processCPost(params){
	return axios.cajax('/weixin/parent/Process.ashx', params);
}

// Save post接口
export function savePost(params){
	return axios.ajax('/weixin/parent/Save.ashx', params);
}

// 获取公司logo
export function getCompanyLogo(){
	return axios.ajax('/api/sysconfig/getCompanyEx');
}

// 获取上传OSS之前，应用服务器的token;以便根据这个找文件服务器要STS认证token；
export function getUploadToken(params) {
    return axios.ajax('/api/common/getUploadToken',params)
}