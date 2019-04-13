// api / Class / QueryFullClassRand
import axios from './axios-j.js';

export function getClassFull(params) {
    return axios.ajax('/api/Class/QueryFullClassRand', params)
}

export function setClassFull(params) {
    return axios.ajax('/api/Class/SettingRuleOfFullClassRand', params)
}

export function getClassDetail(params) {
    return axios.ajax("/api/Class/QueryFullClassRandOfDetail", params);
}

// // 获取评价模板
// export function getEvaluationTem(params) {
//     return axios.ajax('/api/ssx/QueryComment', params)
// }
