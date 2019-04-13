'use strict'

const path = require('path')

function resolve(dir) {
    return dir ?
        path.resolve(__dirname, '../../release', dir) :
        path.resolve(__dirname, '../../release')
}

module.exports = {
    resolve: resolve,

    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/winxin/',
        cacheBusting: true,
        jsSourceMap: true,
        cssSourceMap: true,
        env: {
            NODE_ENV: '"development"'
        }
    },

    build: {
        assetsRoot: resolve('../release/winxin'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/winxin/',
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
        '/wx.do': {
            target: 'http://smarttest2.xiaogj.com',
            changeOrigin: true,
        },
        //其他人
        /*'/99/wx.do': {
            target: 'http://10.0.0.99:10010',
            changeOrigin: true,
            pathRewrite: {'^/99/wx.do': '/wx.do'}
        },*/
    }
}