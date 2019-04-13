import http from './http/http.js'

export function getjoinactshare(params) {//获取用户信息
    return http.ajax({
    	url: 'getjoinactshare',
    	data: params
    })
}

export function getjoinactsharepublic(params) {// 提交小程序使用的数据
    return http.ajax({
    	url: 'getjoinactsharepublic',
    	data: params
    })
}


export function getbargaincompleteinfo(params) { //获取砍价完成情况信息
    return http.ajax({url: 'getbargaincompleteinfo', data:params});
}

export function getjoinacttips(params) {//获取用户信息
    return http.ajax({
    	url: 'getjoinacttips',
    	data: params
    })
}

export function getactinsdetail(params) { //获取实例详情
	return http.ajax({
    	url: 'getactinsdetail',
    	data: params
    })
}

export function getsharedetail(params) {// 获取活动详情
    return http.ajax({
    	url: 'getsharedetail',
    	data: params
    })
}
export function getgroupmember(params) {// 获取团员信息
    return http.ajax({
    	url: 'getgroupmember',
    	data: params
    })
}
export function getgroupcount(params) {// 获取未满的团
    return http.ajax({
    	url: 'getgroupcount',
    	data: params
    })
}
export function creategroupactivityshare(params) {// 开团
    return http.ajax({
    	url: 'creategroupactivityshare',
    	data: params
    })
}

export function joingroupactivityshare(params) { // 加入团 
    return http.ajax({
        url: 'joingroupactivityshare',
        data: params
    })
}

export function gethelpbargainactivityshare(params) { // 获取助力列表 
    return http.ajax({
        url: 'gethelpbargainactivityshare',
        data: params
    })
}
export function helpvargainactivityshare(params) { // 帮忙砍价
    return http.ajax({
        url: 'helpvargainactivityshare',
        data: params
    })
}

export function joinactivity(params) { // 参加活动
    return http.ajax({
        url: 'joinactivity',
        data: params
    })
}

export function getuserinfo(params) { // 获取用户信息
    return http.ajax({
        url: 'getuserinfo',
        data: params
    })
}