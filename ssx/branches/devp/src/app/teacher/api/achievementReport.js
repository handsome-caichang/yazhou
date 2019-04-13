import axios from './axios-j'

// 业绩报表
export function QueryTeacherPerformance(params) {
    return axios.cajax('/api/MasterReport/QueryTeacherPerformance', params);
}