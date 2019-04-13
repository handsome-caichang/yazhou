import {
    httpErrorHandler,
    serverErrorHandler
} from './error-handler.js'

var http = {}

var inter = {
    server: "/wx.do?appid=2&action=",
    mock: "/mock/server/index.php?g=Web&c=Mock&o=mock&projectID=48&uri=",
    json: "/static/data/teacher/"
}

function prefixHandler(opts) {
    var url
    if (!opts.type || opts.type === 'server') {
        var serverQuery = app.tool.parseQuery(),
        proxy = serverQuery.ip ? `/${serverQuery.ip}` : ''
        url = proxy + inter.server + opts.url;
    } else if (opts.type === 'mock') {
        url = inter.mock + opts.url
    } else if (opts.type === 'wone') {
        url = opts.url
    } else {
        url = inter.json + opts.url + '.json'
        opts.method = "get"
    }

    return url
}

http.ajax = function(opts) {

    opts.url = prefixHandler(opts)

    opts.data = {
        ...opts.data
    }
    var a = app.http.ajax(opts)
    var b = a.then(res => {
        serverErrorHandler(res)
        return res.data;
    }).catch(error => {
        return httpErrorHandler(error)
    })

    b.cancel = a.cancel

    return b
}

export default http
