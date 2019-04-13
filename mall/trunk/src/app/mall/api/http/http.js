import {
    httpErrorHandler,
    serverErrorHandler
} from './child/error-handler.js'

import store from "mall/store/index.js";
var http = {}

http.ajax = function(opts) {
    var url = opts.url

    // 接口代理, 用于解决后端NodeJS识别代理哪个后端；
    var serverQuery = app.tool.parseQuery(),
        proxy_url = serverQuery.ip ? `${serverQuery.ip}${url}` : url;

    opts.url = proxy_url

    opts.data = {
        CampusID: getCurCampusId(),
        ...opts.data
    }

    opts.formData = opts.formData === undefined ? true : opts.formData

    var a = app.http.ajax(opts)

    var b = a.then(res => {
        serverErrorHandler(res)
        if (typeof res.data === 'string') return JSON.parse(res.data)

        return res.data
    }).catch(error => {
        return httpErrorHandler(error)
    })

    b.cancel = a.cancel

    return b
}


// 通过vuex获取请求数据的通用校区ID
function getCurCampusId() {
    let id = store.state.curCampus.id;
    return id === "none" ? "" : id;
}



export default http