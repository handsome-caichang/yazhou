import axios from './axios-j';

// 补课详情查看 post
export function getBukeDetail(params) {
    return axios.ajax('/api/course/Get',params)
}

// 新开班补课教室 get
export function getBukeClassroom(params) {
    return axios.ajaxGet('/api/Classroom/Query',params)
}

// 新开班补课教室 get
export function getBukeFollowList(params) {
    return axios.ajaxGet('/api/Course/query',params)
}

// 筛选弹窗课程数据 post
export function getBukeFilterProject(params) {
    return axios.cajax('/api/Shift/Query',params)
}

// 筛选弹窗班级数据 post
export function getBukeFilterClass(params) {
    return axios.cajax('/api/class/query',params)
}

import http from './http/http.js';

//补课管理-查询补课管理列表（分页）
export function getmendinfolistbymobile(params){
    return http.ajax({
        type:'mock',
        url:'getmendinfolistbymobile',
        data:params
    })
}

// 补课管理-撤销补课（移动端）
export function backmendbymobile(params) {
    return http.ajax({
    	type: 'mock',
    	url: 'backmendbymobile',
    	data: params
    });
}
// 补课管理-删除补课
export function removemendbymobile(params) {
    return http.ajax({
    	type: 'mock',
    	url: 'removemendbymobile',
    	data: params
    });
}

//补课管理-获取补课详情
export function getmendinfobymobile(params) {
    return http.ajax({
    	type: 'mock',
    	url: 'getmendinfobymobile',
    	data: params
    });
}