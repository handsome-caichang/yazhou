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
            return { result: {"code": 1000, "msg": error } }
        })

    xhr.cancel = cancel

    return xhr
}

// 通用接口封装
axios.ajax = function (url, args, type = 'post') {
    let serverQuery = app.tool.parseQuery();
    let qUrl = serverQuery.ip ? `${serverQuery.ip}${url}` : url;
    let newArgs = {_t_: new Date().getTime(), ...args}

    let option = {
        method: type,
        url: qUrl,
        params: (type === 'get' ? newArgs : null),
        paramsSerializer: params => qs.stringify(params),
        data: (type === 'post' ? newArgs : null),
    }
    return createXHR(option)
}


// smart接口专用
axios.smajax = function (name, args, type = 'post') {
    return axios.ajax(`/wx.do?appid=2&action=${name}`, args, type)
}


export default axios;