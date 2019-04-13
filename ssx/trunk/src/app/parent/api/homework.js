import axios from './axios-j';

//获取作业列表
export function gethomeworkinfos(params) {
    return axios.smajax('gethomeworkinfos', params);
}

//获取作业详情
export function gethomeworkdetailinfo(params) {
    return axios.smajax('gethomeworkdetailinfo', params);
}

//提交作业
export function submithomework(params) {
    return axios.smajax('submithomework', params);
} 