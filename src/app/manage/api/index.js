import http from './http/http.js'

export function getuserinfo(params) { //获取用户信息
    return http.ajax({
        url: 'getuserinfo',
        data: params
    })
}

export function getconfigcompany(params) { //获取机构信息
    return http.ajax({
        url: 'getconfigcompany',
        data: params
    })
}

export function opconfigcompany(params) { //操作机构信息（增删改）
    return http.ajax({
        url: 'opconfigcompany',
        data: params
    })
}
export function sendPhoneValidateApply(params) { //获取验证码
    return http.ajax({
        url: 'home/SendPhoneValidateApply',
        data: params,
        type: 'home'
    })
}

export function postNew(params) { //提交注册小瑞星
    return http.ajax({
        url: 'home/PostNew',
        data: params,
        type: 'home'
    })
}

export function userbinding(params) { //登录机构
    return http.ajax({
        url: 'userbinding',
        data: params
    })
}

export function opactins(params) { //操作活动实例（增删改）
    return http.ajax({
        url: 'opactins',
        data: params
    })
}

export function getwechatconfiginfo(params) { //获取微信配置信息
    return http.ajax({
        url: 'getwechatconfiginfo',
        data: params
    })
}


export function userunbinding(params) { //解綁機構信息
    return http.ajax({
        url: 'userunbinding',
        data: params
    })
}

export function gettmplistbymaxtake(params) { //分组查询模板集合
    return http.ajax({
        url: 'gettmplistbymaxtake',
        data: params
    })
}