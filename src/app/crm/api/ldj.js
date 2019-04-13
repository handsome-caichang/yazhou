import http from './http/http.js'

// 获取文件上传授权token
export function getUploadToken(params) {
    return http.ajax({
        url: 'getuploadtoken',
        data: params
    })
}

//获取 客户状态 诺到访类型 沟通类型(下次跟进类型) 客户来源
export function getCustomerInformationConfigList(params) {
    return http.ajax({
        url: 'getcustomerinformationconfiglist',
        method: 'post',
        data: params
    })
}
//获取沟通详情
export function getCommunicateRecordDetail(params) {
    return http.ajax({
        url: 'getcommunicaterecorddetail',
        data: params
    })
}
// 添加沟通记录
export function getOpCustomerCommunicateRecordInfo(params) {
    return http.ajax({
        url: 'opcustomercommunicaterecordinfo',
        data: params
    })
}
//获取沟通记录||邀约记录 列表
export function getCommunicateRecordList(params) {
    return http.ajax({
        url: 'getcommunicaterecordlist',
        data: params
    })
}
//获取客户资料资料
export function getCustomerDetail(params) {
    return http.ajax({
        url: 'getcustomerdetail',
        data: params
    })
}

//获取主副负责人校区列表
export function getCampusList(params) {
    return http.ajax({
        url: 'getcampuslist',
        data: params
    })
}

//校区下员工列表 
export function getCustomerManagerList(params) {
     return http.ajax({
         url: 'getcustomermanagerlist',
         data: params
     })
}

//手动确认邀约记录到访
export function setCommunicateRecordIsvisit(params) {
    return http.ajax({
        url: 'setcommunicaterecordisvisit',
        data: params
    })
}

//转为客户操作
export function turnCustomer(params) {
    return http.ajax({
        url: 'turncustomer',
        data: params
    })
}