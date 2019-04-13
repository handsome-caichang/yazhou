import {serverCode540} from './child/error-handler.js'

var http = {}

var inter = {
    server: "/wx.do?appid=1&action=",
    mock: "/mock/server/index.php?g=Web&c=Mock&o=mock&projectID=48&uri=",
    json: "/static/data/",
}

function prefixHandler(opts) {
    var url,
     	serverQuery = app.tool.parseQuery(),
        proxy = serverQuery.ip ? `/${serverQuery.ip}` : ''
     	url = proxy + inter.server + opts.url
    if (opts.type == 'home') {
    	url = opts.url
    }
    // url = url.replace('/user', '');
    // url = url.replace('/manage', '');
    // console.log(url)
    return url
}



http.ajax = function(opts) {
    var url = opts.url

    // 接口代理, 用于解决后端NodeJS识别代理哪个后端；
    // var serverQuery = app.tool.parseQuery(),
    //     proxy_url = serverQuery.ip ? `${serverQuery.ip}${url}` : url;

    opts.url = prefixHandler(opts)

    opts.data = {
        ...opts.data
    }

    // opts.formData = opts.formData === undefined ? true : opts.formData

    var a = app.http.ajax(opts)

    var b = a.then(res => {
        serverCode540(res)
        return res.data
    }).catch(error => {
        // return httpErrorHandler(error)
    })

    b.cancel = a.cancel

    return b
}

export default http