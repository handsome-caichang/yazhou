'use strict'

const path = require('path')

function resolve(dir) {
    return dir 
        ? path.resolve(__dirname, '../../release', dir) 
        : path.resolve(__dirname, '../../release')
}


var port = 9999
// 获取本地IP
var ServerHost = (function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
})()


module.exports = {
    dev: {
        index: resolve('index.html'),        
        assetsRoot: resolve(),
        assetsSubDirectory: '',
        // assetsPublicPath: '/',
        assetsPublicPath: `https://${ServerHost}:${port}/`,

        cacheBusting: true,

        jsSourceMap: true,
        cssSourceMap: true,

        env: {
            NODE_ENV: '"development"'
        }
    },

    build: {
        index: resolve('index.html'),
        assetsRoot: resolve(),
        assetsSubDirectory: '',
        // assetsPublicPath: 'https://cdn01.xiaogj.com/uploads/common/m/',
        assetsPublicPath: 'https://cdn01.xiaogj.com/uploads/mobile/m/',

        jsSourceMap: false,
        cssSourceMap: false,

        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        bundleAnalyzerReport: process.env.npm_config_report,

        env: {
            NODE_ENV: '"production"'
        }
    },

    proxy: {
    }
}