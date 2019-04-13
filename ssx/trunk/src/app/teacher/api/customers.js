import axios from './axios-j'

export function getCustomers(params) {
    return axios.ajax('/weixin/teacher/Process.ashx', params)
}

export function queryCustomer(params) {
    return axios.cajax('/weixin/teacher/Process.ashx', params)
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

//获取部门人
export function queryEmployee(params) {
    return axios.ajax('/api/Depart/QueryWithEmployeeRight',params)
}

//获取意向客户表单
export function queryCustomerForm(params) {
    return axios.ajax('/api/CustomerForm/QueryCustomerForm', params)
}

//意向客户待分配客户通知汇总详情
export function getCustomerToBeAllocated(params) {
    return axios.ajax('/api/customer/GetAllocatedCustomer', params)
}