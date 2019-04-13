import {
    httpErrorHandler,
    serverErrorHandler
} from './child/error-handler.js'

var http = {}

http.ajax = function(opts) {
    var url = opts.url
    url = `/wx.do?appid=2&action=${url}`
    /*if (typeof url === "object") {
        url = `${url.path}?appid=${url.appid}&action=${url.action}`
    } else {
        url = `/wx.do?appid=2&action=${url}`
    }*/

    // 接口代理
    var serverQuery = app.tool.parseQuery(),
        proxy_url = serverQuery.ip ? `/${serverQuery.ip}${url}` : url;

    opts.url = proxy_url

    var a = app.http.ajax(opts)

    var b = a.then(res => {
        serverErrorHandler(res)
        return res.data
    }).catch(error => {
        httpErrorHandler(error)
        // return { result: {"code": 1000, "msg": error } }
        return Promise.reject(error)
    })

    b.cancel = a.cancel

    return b
}


export default http