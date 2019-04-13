import axios from './axios-j'

// 获取公告列表
export function getAnnouncementList(params) {
    return axios.ajax('/weixin/teacher/Process.ashx', params)
}

// 获取公告详情
export function getAnnouncementDetail(params) {
    return axios.ajaxGet('/weixin/teacher/Process.ashx', params)
}