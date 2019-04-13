import http from './http/http.js'

//获取列表
export function getCustomerList(params) {
    return http.ajax({
        url: 'getcustomerlist',
        data: params
    })
}

//获取详情
export function getCustomerDetail(params) {
    return http.ajax({
        url: 'getcustomerdetail',
        data: params
    })
}

//添加、修改意向客户
export function opCustomerInfo(params) {
    return http.ajax({
        url: 'opcustomerinfo',
        data: params
    })
}
export function getwxsysinfos(params) {
    return http.ajax({
        url: {
            // path: '/workwx.do',
            path: '/wx.do',
            appid: 2,
            // action: 'getjsconfig',
            action: 'getwxsysinfos',
        },
        data: params
    })
}

export function getcustomerinformationconfiglist(params) {
    return http.ajax({
        url: 'getcustomerinformationconfiglist',
        data: params
    })
}

//公害认领客户
export function claimCustomer(params) {
    return http.ajax({
        url: 'claimcustomer',
        data: params
    })
}
//转化客户
export function becomeFormalStudent(params) {
    return http.ajax({
        url: 'becomeformalstudent',
        data: params
    })
}

//获取校区
export function getCampuslist(params) {
    return http.ajax({
        url: 'getcampuslist',
        data: params
    })
}

//转化客户
export function turnCustomer(params) {
    return http.ajax({
        url: 'turncustomer',
        data: params
    })
}


//丢弃客户
export function discardCustomer(params) {
    return http.ajax({
        url: 'discardcustomer',
        data: params
    })
}

//获取客户经理
export function getCurrentManager(params) {
    return http.ajax({
        url: 'getcurrentmanager',
        data: params
    })
}

//获取邀约 今日计划 
export function getPlanCustomerList(params) {
    return http.ajax({
        url: 'getplancustomerlist',
        data: params
    })
}

//登陆  
export function bindCustomerManager(params) {
    return http.ajax({
        url: 'bindcustomermanager',
        data: params
    })
}

//绑定微信
export function bindWechat(params) {
    return http.ajax({
        url: 'bindwechat',
        data: params
    })
}

//获取意向客户级别报表
export function getCustomerLevelReport(params) {
    return http.ajax({
        url: 'getcustomerlevelreport',
        data: params
    })
}

//获取业绩目标和销售业绩报表
export function getAcheveMentReport(params) {
    return http.ajax({
        url: 'getachievementreport',
        data: params
    })
}

//获取销售漏斗报表
export function getSalesFunnelReport(params) {
    return http.ajax({
        url: 'getsalesfunnelreport',
        data: params
    })
}

//获取客户状态报表
export function getCustomerStatusReport(params) {
    return http.ajax({
        url: 'getcuctomerstatusreport',
        data: params
    })
}

//获取执行力报表
export function getExecutiveReport(params) {
    return http.ajax({
        url: 'getexecutivereport',
        data: params
    })
}

//获取线索转化
export function getClueturnReport(params) {
    return http.ajax({
        url: 'getclueturnreport',
        data: params
    })
}

//获取客户渠道来源和转化报表
export function getCustsrctranReport(params) {
    return http.ajax({
        url: 'getcustsrctranreport',
        data: params
    })
}

//获取客户表单配置信息
export function getQrcodeFormList(params) {
    return http.ajax({
        url: 'getqrcodeformlist',
        data: params
    })
}

//获取二维码
export function getQrcode(params) {
    return http.ajax({
        url: 'getqrcode',
        data: params
    })
}

//操作二维码招生
export function opConfigQrcode(params) {
    return http.ajax({
        url: 'opconfigqrcode',
        data: params
    })
}

//获取二维码招生配置信息
export function getQrcodeInfo(params) {
    return http.ajax({
        url: 'getqrcodeinfo',
        data: params
    })
}

//获取客户表单配置信息
export function getConfigFormList(params) {
    return http.ajax({
        url: 'getconfigformlist',
        data: params
    })
}