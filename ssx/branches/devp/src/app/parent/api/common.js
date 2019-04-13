import axios from './axios-j';
import http from './http/http.js'

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

// 通知公告列表
export function getnoticelist(params){
	return http.ajax({
		type:'mock',
		url:'getnoticelist',
		data: params
	})
}

// 通知公告详情
export function getnotice(params){
	return http.ajax({
		type:'mock',
		url:'getnotice',
		data: params
	})
}

//获取老师通知列表
export function getmessagelistforstudent(params){
	return http.ajax({
		type:'mock',
		url:'getmessagelistforstudent',
		data:params
	})
}

//获取老师通知详情
export function getmessageinfo(params){
	return http.ajax({
		type:'mock',
		url:'getmessageinfo',
		data:params
	})
}

//获取首页未读消息
export function gethomepageinfo(params){
	return http.ajax({
		type:'mock',
		url:'gethomepageinfo',
		data:params
	})
}

//到校离校
export function getstudentsignrecordinfos(params){
	return http.ajax({
		type:'mock',
		url:'getstudentsignrecordinfos',
		data:params
	})
	// .then(res => {
	// 	return {
	// 		result: { code: 200, msg: "UunX" },
	// 		data: [
	// 			{
	// 				id: 5376134163785380,
	// 				campusid: 8267761194274460,
	// 				time: "1993-08-18 11:21:53",
	// 				flag: -4234457136162200,
	// 				signmode: -1824235021098000,
	// 				describe: "aaaa"
	// 			}
	// 		],
	// 		page: {
	// 			pageindex: 1,
	// 			totalpage: 1,
	// 			recordcount: 22
	// 		}
	// 	};
	// })
}