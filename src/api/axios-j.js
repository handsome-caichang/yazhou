import qs from 'qs'

import {httpErrorHandler, serverErrorHandler} from './error-handler.js'

function createXHR (option) {
    let xhr, cancel;

    option.cancelToken = new axios.CancelToken(c => cancel = c)

    xhr = axios(option)
        .then(res => {
            serverErrorHandler(res)
            return res.data
        }).catch(error => {
            httpErrorHandler(error)
            return { "ErrorCode": 1000, "msg": error }
        })

    xhr.cancel = cancel

    return xhr
}

// 通用接口封装
axios.ajax = function (url, args, type = 'post') {
    // 用于解决后端NodeJS识别代理哪个后端；
    let serverQuery = app.tool.parseQuery();
    let qUrl = serverQuery.ip ? `/${serverQuery.ip}${url}` : url
    let newArgs = {_t_: new Date().getTime(), ...args}

    let option = {
        method: type,
        url: qUrl,
        params: (type === 'get' ? newArgs : null),
        paramsSerializer: params => qs.stringify(params),
        data: (type === 'post' ? qs.stringify(newArgs) : null),
    }
    return createXHR(option)
}

// smart接口专用
axios.smajax = function (name, args, type = 'post') {
    return axios.ajax(`/wx.do?appid=2&action=${name}`, args, type)
}

// im中的请求基本都是get,因此单独做出一个方法供其使用;
axios.aget = function (url, args) {
    return axios.ajax(url, args, 'get')
}

export default axios;