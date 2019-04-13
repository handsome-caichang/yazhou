import axios from './axios-j'

export function getCustomers(params) {
    return axios.ajax('/weixin/teacher/Process.ashx', params)
}

export function queryCustomer(params) {
    return axios.ajax('/weixin/teacher/Process.ashx', params)
}

export function saveData(params) {
    return axios.ajax('/weixin/teacher/Save.ashx', params)
}

export function getCommunicationMode(params) {
    return axios.ajax('/api/Dictionary/Get', params)
}

export function getShiftType(params) {
    return axios.ajaxGet('/api/MasterReport/GetShiftType', params)
}