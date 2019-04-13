import axios from './axios-j';

// 获取微信配置
export function getwxconfig(params) {
    return axios.ajaxGet('/weixin/getconfig.ashx', params);
}

// 获取短信验证码
export function getMsg(params) {
    return axios.ajaxGet('/api/ssx/notsignIn/PostValidate', params);
}

// 获取点评
export function getClassComment(params) {
    return axios.ajaxGet('/weixin/parent/p-show/CourseCommentProcess.ashx', params);
}

// 报名
export function postShareRegisterCommunication(params) {
    return axios.ajaxGet('/api/ssx/notsignIn/PostCustomerStudent', params);
}


// 注册
export function userRegister(params) {
    return axios.ajaxGet("/weixin/parent/register.ashx", params);
}

// 注册验证验证码
export function validateSMSCode(params) {
    return axios.ajax("https://mall.xiaogj.com/test/html/api/register/ValidateSMSCode", params);
}

// 发送短信验证码
export function sendsms(params) {
    return axios.ajax("https://mall.xiaogj.com/test/html/api/register/sendsms", params);
}

// 获取电子推荐卡详情
export function getCardDetail(params) {
    return axios.ajaxGet("/weixin/parent/register.ashx", params);
}

