import http from './http/http.js'

export function getwxsysinfos(params) {
    return http.ajax({
        url: 'getwxsysinfos',
        data: params
    })
}

export function getQrcodeInfoById(params) {
    return http.ajax({
        url: 'getqrcodeinfobyid',
        data: params
    })
}

export function addQrcodeInfo(params) {
    return http.ajax({
        url: 'addqrcodeinfo',
        data: params
    })
}

export function getDictListByType(params) {
    return http.ajax({
        url: 'getdictlistbytype',
        data: params
    })
}