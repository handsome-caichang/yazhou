var opn = require('opn')
var path = require('path')
var express = require('express')
// express接收'post'请求的参数处理插件
// var bodyParser = require("body-parser")
var proxyMiddleware = require('http-proxy-middleware')

var config = require('../config')
var build = config.build
var proxys = config.proxy

var app = express()
var port = 3001

// app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json())

// 接口代理
Object.keys(proxys).forEach(function(context) {
    var options = proxys[context]
    if (typeof options === 'string') {
        options = {
            target: options
        }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})


app.use(build.assetsPublicPath, express.static(build.assetsRoot))

var uri = `http://localhost:${port}/im/html/index.html`

console.log('> Listening at ' + uri + '\n')
opn(uri)

var server = app.listen(port)