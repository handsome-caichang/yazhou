import axios from './axios-j'

export function queryConsumeTotal(params) {
    return axios.ajax('/api/MasterReport/QueryConsumeTotal', params)
}


export function queryCampusConsume(params) {
    return axios.ajax('/api/MasterReport/QueryCampusConsume', params)
}


export function queryConsumeTotalOfArea(params) {
    return axios.ajax('/api/MasterReport/QueryConsumeTotalOfArea', params)
}

export function queryConsumeDetail(params) {
    return axios.ajax('/api/MasterReport/QueryConsumeDetail', params)
}