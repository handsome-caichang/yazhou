import qs from 'qs'

var http = {}


/*opts: {    
    formData: true || false
    method: "get || post"
    url: "/url"
    data: {},
    timeout: 100000
}*/
http.ajax = function (opts) {
    let cancel, xhr, extOpt,
        method = opts.method || 'post',
        data = {_t_: new Date().getTime(), ...opts.data},
        option = {
            method: method,
            url: opts.url,
            cancelToken: new axios.CancelToken(c => cancel = c),
            timeout: opts.timeout || null
        }

    if (method === 'get') {
        extOpt = {
            params: data,
            paramsSerializer: obj => qs.stringify(obj)
        }
    } else if (method === 'post') {
        extOpt = {
            data: (opts.formData ? qs.stringify(data) : data)
        }
    }

    Object.assign(option, extOpt)

    xhr = axios(option)
    xhr.cancel = cancel

    return xhr
}

// 判断请求是否被取消
// 传入axios请求的响应，用于判断该请求是否是被取消了
http.isCancel = function (response) {
    return axios.isCancel(response)
}

export default http