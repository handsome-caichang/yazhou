import axios from './axios-j';

// 获取上课点评 amont值 post接口
export function getAmont(params) {
    return axios.ajax('/api/ssx/Comment/QueryIsAmont',params)
}
// 获取上课点评 老师回评
export function getStudentReview(params) {
    return axios.ajax('/api/ssx/Comment/QueryStudentReview',params)
}

// 获取评价模板
export function getEvaluationTem(params) {
    return axios.ajax('/api/ssx/QueryComment',params)
}
