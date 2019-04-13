import axios from './axios-j';

//获取校区列表
export function getCampusList(params) {
    return axios.ajax('/api/Student/QueryCampusOfStuID', params);
}