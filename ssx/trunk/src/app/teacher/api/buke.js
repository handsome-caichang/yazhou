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