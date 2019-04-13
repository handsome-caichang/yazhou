import http from './http/http.js'


export function getcampus(params) {
    return http.ajax({
        url: '/static/data/getcampus.json',
        data: params,
        method: 'GET'
    })
}

export function getstudentinfobyid(params) {
    return http.ajax({
        url: '/static/data/getstudentinfobyid.json',
        data: params,
        method: 'GET'
    })
}